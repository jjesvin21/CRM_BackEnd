const jwt = require("jsonwebtoken");
const autnority_auth = async (req, res, next) => {
  try {
    console.log("Authority");

    console.log(req.headers.user);
    console.log(req.headers.tocken);
    const tocken = req.headers.tocken;
    const verified = jwt.verify(tocken, process.env.JWT);
    console.log(verified);
    // const user = user.findOne({_id:verified.id})
    if (verified.id == req.headers.user) {
      console.log("yes");
      next();
    } else {
      console.log("No");
      return res.status(401).json({ msg: " Authority User Not Authenticated" });
    }
  } catch (e) {
    console.log(e);
    return res.status(401).json({ msg: e.message });
  }
};

module.exports = { autnority_auth };
