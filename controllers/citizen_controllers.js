const { model } = require("mongoose");
const user = require("../models/user_schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// to get the list of all the citizens

const get_all_citizen = async (req, res) => {
  data = await user.find();
  return res.status(200).json(data);
};

// to add new citizens

const add_new_citizen = async (req, res) => {
  data = req.body;
  try {
    const citizen = await user.create({
      UID: data.UID,
      name: data.name,
      address: data.address,
      phNo: data.ph,
      email: data.email,
      user_Role: "Citizen",
      password: data.password,
      mycase: [],
    });
    return res.status(200).json({
      msg: "Citizen Added",
      data: citizen,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      msg: err.message,
    });
  }
};

// for login for citizen

const citizen_login = async (req, res) => {
  const data = req.body;
  try {
    citizen_user = await user.findOne({ UID: data.UID });
    if (citizen_user === null) {
      return res.status(404).json({ msg: "User Not Found" });
    }
  } catch (e) {
    return res.status(404).json({ msg: "citizon not found", err: e.message });
  }

  const passwordEnteredByUser = data.password;
  const hash = citizen_user.password;

  try {
    bcrypt.compare(passwordEnteredByUser, hash, function (error, isMatch) {
      if (error) {
        console.log(error);
        return res.status(400).json({ error: error.message });
      } else if (!isMatch) {
        console.log("Password doesn't match!");
        return res.status(400).json({ msg: "Password Does Not Mached" });
      } else {
        console.log("Password matches!");
        id = citizen_user._id;
        const tocken_data = { id: id };
        const tocken = jwt.sign(tocken_data, process.env.JWT);
        return res.status(200).json({
          msg: "Password mathced User Logined",
          tocken: tocken,
          user: id,
        });
      }
    });
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
};

const get_indudual_citizen = async (req, res) => {
  try {
    const citizen = await user.findOne({ _id: req.params.id });
    return res.status(200).json({ msg: "data get", data: citizen });
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
};

module.exports = {
  get_all_citizen,
  add_new_citizen,
  citizen_login,
  get_indudual_citizen,
};
