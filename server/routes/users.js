const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { Product } = require("../models/Product");
const { Payment } = require("../models/Payment");

const { auth } = require("../middleware/auth");
const async = require("async");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
  //이부분을 통해.. auth가 있을때
  // 리덕스에 state를 넣어준다!
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
    cart: req.user.cart,
    history: req.user.history,
  });
});

router.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found",
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("w_authExp", user.tokenExp);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

router.post("/addToCart", auth, (req, res) => {
  //먼저  User Collection에 해당 유저의 정보를 가져오기
  //auth(쿠키에 저장이 되어있음..) 쿠키속에 저장되어있는 토큰을 이용해 유저정보 가져옴
  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    //req.token = token;
    //req.user = user; 이 auth에 있어서 req를 통해 유저아이디 가져올수있음!
    //한명이니 findOne!!
    // 가져온 정보에서 카트에다 넣으려 하는 상품이 이미 들어 있는지 확인
    //userInfo 유저 정보가 들어감..거기중 cart에 뭐가 있는지 배열로 있을꺼임!
    let duplicate = false;
    userInfo.cart.forEach((item) => {
      if (item.id === req.body.productId) {
        //item.id는 하나의 cart[0].id라보면됨!
        duplicate = true;
      }
    });

    //상품이 이미 있을때
    if (duplicate) {
      User.findOneAndUpdate(
        { _id: req.user._id, "cart.id": req.body.productId },
        // 먼저 사람을 찾고.. 그다음 프로덕트 아이디를 통해 물건을 선택한다!
        { $inc: { "cart.$.quantity": 1 } }, //$inc 는 몽고디비 방법이다!
        { new: true }, //맡에서 결과값 받을때... new:true 써줘야
        // 업데이트 포함해서 정보 결과를 받을수있따!
        (err, userInfo) => {
          if (err) return res.status(200).json({ success: false, err });
          res.status(200).send(userInfo.cart); //여기가 action.payload가됨!
        }
      );
    }
    //상품이 이미 있지 않을때
    else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            //여기는 새 내용을 넣을꺼기 떄문에 push!!
            cart: {
              id: req.body.productId,
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).send(userInfo.cart); //여기가 action.payload가됨!
        }
      );
    }
  });
});

router.get("/removeFromCart", auth, (req, res) => {
  //먼저 cart안에 내가 지우려고 한 상품을 지워주기
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: { cart: { id: req.query.id } }, //넣을땐 push 뺼땐 pull
    },
    { new: true }, //업데이트 내용 가져오기!
    (err, userInfo) => {
      let cart = userInfo.cart;
      let array = cart.map((item) => {
        return item.id;
      }); //array로 옮긴뒤 밑에서 in으로 다 찾아오기.!!

      //product collection에서  현재 남아있는 상품들의 정보를 가져오기

      //productIds = ['5e8961794be6d81ce2b94752', '5e8960d721e2ca1cb3e30de4'] 이런식으로 바꿔주기
      Product.find({ _id: { $in: array } })
        .populate("writer")
        .exec((err, productInfo) => {
          return res.status(200).json({
            productInfo,
            cart,
          }); //cardDetail 을 위해.. 두개를 합쳐줘야한다!
        });
    }
  );
});

//여기서 user몽고의 history 내용도 넣고 payment몽고디비의 내용도 넣는다
router.post("/successBuy", auth, (req, res) => {
  //1. User Collection 안에  History 필드 안에  간단한 결제 정보 넣어주기
  let history = [];
  let transactionData = {};

  req.body.cartDetail.forEach((item) => {
    history.push({
      dateOfPurchase: Date.now(),
      name: item.title,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentID,
    });
  });

  //2. Payment Collection 안에  자세한 결제 정보들 넣어주기
  transactionData.user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  }; //미들웨어 통해서 오는 정보들임! auth

  transactionData.data = req.body.paymentData;
  transactionData.product = history;

  //history 정보 저장
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { history: history }, $set: { cart: [] } }, //변화 할정보 set
    //set은 다 지우는것이다..결제후에는 지워야하기 때문에!!
    { new: true }, //업데이트!
    (err, user) => {
      //업데이트정보 user에 넣어줌!
      if (err) return res.json({ success: false, err });

      //payment에다가  transactionData정보 저장
      const payment = new Payment(transactionData); //모델 가져오는것임!
      payment.save((err, doc) => {
        if (err) return res.json({ success: false, err });

        //3. Product Collection 안에 있는 sold 필드 정보 업데이트 시켜주기

        //상품 당 몇개의 quantity를 샀는지

        let products = [];
        doc.product.forEach((item) => {
          products.push({ id: item.id, quantity: item.quantity });
        });

        async.eachSeries(
          //products 의 하나하나 객체를 item에 넣음!
          products,
          (item, callback) => {
            Product.update(
              { _id: item.id }, //몽고디비product업데이트.. id찾고!
              {
                $inc: {
                  sold: item.quantity, //몽고디비product업데이트.. id찾고! 수량업데이트
                },
              },
              { new: false }, //구지 업데이트 바로 보여주지 않아도 돼서 괜찮음!
              callback //이걸 통해 다시 id: item.id로 돌아감!
            );
          },
          (err) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).json({
              success: true,
              cart: user.cart,
              //맨튀...리덕스 user정보안에 cart가 있어서.. cart를 업데이트해줌
              cartDetail: [],
            });
          }
        );
      });
    }
  );
});

module.exports = router;
