const authority = require("../models/authority_schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const get_all = async (req, res) => {
  const authorities = await authority.find();
  return res.status(200).json(authorities);
};

const get_induduvel = async (req, res) => {
  try {
    const authoritie = await authority.findOne({ _id: req.params.id });
    return res.status(200).json(authoritie);
  } catch (e) {
    console.log(e);
  }
};

const add_authority = async (req, res) => {
  try {
    const authority_added = await authority.create({
      username: req.body.username,
      password: req.body.password,
    });
    // authority_added = req.body
    // console.log(req.body);
    return res.status(200).json(authority_added);
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
};

const login = async (req, res) => {
  const data = req.body;
  try {
    user = await authority.findOne({ username: data.username });
  } catch (e) {
    return res.status(404).json({ msg: "citizon not found", err: e.message });
  }

  const passwordEnteredByUser = data.password;
  const hash = user.password;

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
        id = user._id;
        const tocken_data = { id: id };
        const tocken = jwt.sign(tocken_data, process.env.JWT);
        return res
          .status(200)
          .json({
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

module.exports = { add_authority, get_induduvel, get_all, login };
