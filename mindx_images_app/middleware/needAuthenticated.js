// Định danh người dùng
// không phải user => trả luôn kết quả
//user => next()

const jwt = require('jsonwebtoken')
const UserModel = require('../modules/auth/user')
const HTTPError = require('../common/httpError')

async function needAuthenticated(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
      throw new HTTPError(401, "Not found token");
    }

    const jwtToken = token.split(" ")[1];
    //check Token xem có thuộc dự án của mình k
    //check token có hết hạn hay k
    //trả về data payload
    const data = jwt.verify(jwtToken, process.env.SECRET_KEY);
    const { userId } = data;

    if (!userId) {
      throw new HTTPError(401, "Authoriation fail");
    }

    const existedUser = await UserModel.findById(userId);
    if (!existedUser) {
      throw new HTTPError(400,"Username duplicate");
    }

    //Nhét thông tin vào biến req 
    //req là object có sẵn một list key 
    res.user = existedUser

    next();
}


module.exports = needAuthenticated