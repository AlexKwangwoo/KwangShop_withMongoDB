const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Product } = require("../models/Product");

//=================================
//             Product
//=================================

//multer사용 다큐먼트 예시를 보고 했다!
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  }, //어디에 파일이 저장되는지 여기에 저장을해서 파일업로드시 미리보기 로컬에 저장한거
  // 확인할수있음!!
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }, //파일 이름은 무엇으로 할건지
});

var upload = multer({ storage: storage }).single("file"); //멀터 사용법!

router.post("/image", (req, res) => {
  //가져온 이미지를 저장을 해주면 된다.
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    // console.log("리스폰보기 프로덕트 res.req.file.path");
    // console.log(res.req);
    return res.json({
      success: true,
      filePath: res.req.file.path, //리스폰스한거에 리퀘스트쪽가서 파일패스를 받아온다!
      fileName: res.req.file.filename,
    });
  });
});

//이미 /api/product 가포함되어있다.. uploadProductpage에서 submit으로 post할때!
router.post("/", (req, res) => {
  //받아온 정보들을 DB에 넣어 준다.
  const product = new Product(req.body);

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/products", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  // product collection에 들어 있는 모든 상품 정보를 가져오기
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let term = req.body.searchTerm;

  let findArgs = {};

  for (let key in req.body.filters) {
    //선택된값들 차례대로 돌아간다!
    if (req.body.filters[key].length > 0) {
      //값이 있다면!
      // console.log(req.body.filters);
      // console.log("key", key);
      //key는 continents 또는 price가 될수있다!
      if (key === "price") {
        findArgs[key] = {
          //findArgs { price: [0, 199]} 이런식으로 온다!
          //Greater than equal 몽고디비 사용법임!!!
          //즉 0보다 크거나 같고 199보다 같거나 작다! 라는뜻임!
          $gte: req.body.filters[key][0],
          //Less than equal
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
      // console.log("ARGs!", findArgs);
    }
  }

  if (term) {
    //몽고디비 방법임!! 그럼 검색은 어떤단어를
    //받아서오는걸까? PRODUCT모델에가서 index보면된다!
    Product.find(findArgs)
      .find({ $text: { $search: term } })
      .populate("writer") //writer 를 통해 상품 모든정보를 가져온다!
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
          success: true,
          productInfo,
          postSize: productInfo.length,
        });
      });
  } else {
    Product.find(findArgs)
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit) //파일 몇개씩 가져올건지,,,8개로 해놨음!
      .exec((err, productInfo) => {
        //쿼리를 돌린다! 모든정보가 productInfo에 있음!
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
          success: true,
          productInfo,
          postSize: productInfo.length,
        });
      });
  }
});

//id=123123123,324234234,324234234  type=array
router.get("/products_by_id", (req, res) => {
  let type = req.query.type; //필요한값을 프론트앤드에서 가져올때는 body인데
  // 쿼리를 이용해서 가져올때는 query라고 써야한다!
  let productIds = req.query.id;

  if (type === "array") {
    //id=123123123,324234234,324234234 이거를
    //productIds = ['123123123', '324234234', '324234234'] 이런식으로 바꿔주기
    // id=123123123,324234234,324234234  type=array 이거는 안됨!!
    let ids = req.query.id.split(",");
    productIds = ids.map((item) => {
      return item;
    });
  }

  //productId를 이용해서 DB에서  productId와 같은 상품의 정보를 가져온다.
  //productIds = ['123123123', '324234234', '324234234']
  //이것을 $in 통해 어레이로 넣어서 값 다받아오기
  Product.find({ _id: { $in: productIds } })
    .populate("writer")
    .exec((err, product) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(product);
    });
});

module.exports = router;
