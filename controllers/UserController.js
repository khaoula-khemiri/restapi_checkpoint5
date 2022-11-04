const User = require("../models/User");
<<<<<<< HEAD
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
=======
const bcrypt = require("bcryptjs");
>>>>>>> b1304edb26d8831749d15873966c3191c9545b84

//create user
const createUser = async (req, res) => {

  const { email } = req.body;
  const { password } = req.body;
  //   const email1 = req.body.email;
  const existe = await User.findOne({ email });
  if (existe) {
    return res.status(400).json("user with this email already existe");
  }
<<<<<<< HEAD

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
  });

  const newUser = await user.save();

=======
  const hashedPsw = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...user,
    password: hashedPsw,
  });
>>>>>>> b1304edb26d8831749d15873966c3191c9545b84
  return res.status(201).json(newUser);
};

//get all users 
const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};


//get user by id
const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    return res.status(400).json("user not found");
  }
};

//delete user by id
const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.status(200).json("user removed");
  } else {
    return res.status(400).json("user not found");
  }
};


//update user 
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    Object.assign(user, req.body);
    await user.save();
    res.send({ data: user });
  } catch (error) {
    res.status(404).send({ error: "user not found try again" });
  }
};

//update password 
const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    if (OriginalPassword !== oldPassword) {
      res.status(401).json("wrong Password!")
    }
    else {
      Object.assign(user, { password: CryptoJS.AES.encrypt(newPassword, process.env.PASS_SEC).toString() });
      await user.save();
      res.status(202).json({ data: user });
    }
  }
  catch (error) {
    res.status(404).send({ error: "user not found try again" });
  }
}


//login
const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("wrong credentials!")

    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    OriginalPassword !== req.body.password &&
      res.status(401).json("wrong password")

    const accessToken = jwt.sign({
      id: user.id
    }, process.env.JWT_SEC,
      { expiresIn: "3d" });

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  updatePassword,
  login
};
