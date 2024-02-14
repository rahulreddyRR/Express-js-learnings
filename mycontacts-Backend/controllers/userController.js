const asyncHandler = require("express-async-handler");
const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* 
@desc Post a user
@routes Post /api/users/register
@access public
*/
const registeruser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are manditory");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("user Email is already registered");
  }

  const hasedPassword = await bcrypt.hash(password, 10);
  const createdUser = await User.create({
    username,
    email,
    password: hasedPassword,
  });
  if (createdUser) {
    res.status(201).json({ _id: createdUser.id, email: createdUser.email });
  } else {
    res.status(400);
    throw new Error("user Data is not vaild");
  }
});

/* 
@desc Post a user
@routes Post /api/users/login
@access public
*/
const loginuser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are manditory");
  }

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accesstoken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      {
        expiresIn: "15m",
      }
    );
    res.status(200).json({ accesstoken });
  } else {
    res.status(401);
    throw new Error("email or password is not vaild");
  }
});
/* 
@desc GET current user
@routes GET /api/users/Current
@access private
*/
const currentuser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  registeruser,
  loginuser,
  currentuser,
};
