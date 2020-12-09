const { User } = require("../models/User");

let auth = (req, res, next) => {
  let token = req.cookies.w_auth;

  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true,
      });
    // req..가 프론트앤드에서 발생시키는데.. 정보주세요!
    // 이건 중간 과정이라..미들웨어.. req에 유저정보를 담아서 다음 친구한테
    // req를 넘겨준다!
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
