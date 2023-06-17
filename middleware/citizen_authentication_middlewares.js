const jwt = require("jsonwebtoken");
const user = require("../models/user_schema");
const citizen_auth = async (req, res, next) => {
  try {
    console.log("Citizen auth");
    console.log(req.headers.user);
    console.log(req.headers.tocken);
    const tocken = req.headers.tocken;
    const verified = jwt.verify(tocken, process.env.JWT);
    console.log(verified);
    const user_data = user.findOne({ _id: verified.id });
    if (user_data === null) {
      return res.status(401).json({ msg: "User Not Found" });
    }

    if (verified.id == req.headers.user && user_data.user_Role === "Citizen") {
      console.log("yes");
      next();
    } else {
      return res.status(401).json({ msg: " Citizen User Not Authenticated" });
    }
  } catch (e) {
    console.log(e);
    return res.status(401).json({ msg: e.message });
  }
};

module.exports = { citizen_auth };
