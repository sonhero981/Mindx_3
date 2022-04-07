const UserModel = require("./user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const HTTPError = require("../../common/httpError");
const { valid } = require("joi");

const register = async (req, res) => {
  const { username, password, role } = req.body;
  const existedUser = await UserModel.findOne({ username });
  if (existedUser) {
    throw new HTTPError(400, "Username dulicate");
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await UserModel.create({
    username,
    password: hashPassword,
    role,
  });

  res.send({
    success: 1,
    data: {
      _id: newUser._id,
      username: newUser.username,
    },
  });

  //Lý do không được sent "...newUser"
  // send => JSON.stringify({})
  // hydrate document => JSON hóa => bỏ các trường linh tinh mongoose đi
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const existedUser = await UserModel.findOne({
    username,
  });
  if (!existedUser) {
    throw new HTTPError(400, "Username hoặc password không đúng");
  }

  const matchedPassword = await bcrypt.compare(password, existedUser.password);

  if (!matchedPassword) {
    throw new HTTPError(400, "Username hoặc Password không đúng");
  }

  const { userId } = existedUser._id;

  //token
  //header: định danh thuật toán
  //payload: thông tin mã hóa => base64
  //signature: chữ ký sha256( header+ payload )
  //2 key: public key, private key

  const token = jwt.sign(
    {
      userId,
      username: "web@gmail.com",
    },
    process.env.SECRET_KEY,
    {
      expiresIn: 60 * 60 * 24 * 3,
    }
  );

  res.send({
    success: 1,
    data: { _id: userId, token },
  });
};

module.exports = { register, login };
