const jwt = require("jsonwebtoken");

const citizen_authority_middleware = async (req, res, next) => {
  try {
    if (req.headers.role === "authority") {
      const tocken = req.headers.tocken;
      const verified = jwt.verify(tocken, process.env.JWT);
      console.log(verified);
      if (verified.id == req.headers.user) {
        console.log("yes Authority");
        next();
      } else {
        console.log("No");
        return res
          .status(401)
          .json({ msg: " Authority User Not Authenticated" });
      }
    } else if (req.headers.role === "citizen") {
      console.log("Citizen auth");
      console.log(req.headers.user);
      console.log(req.headers.tocken);
      const tocken = req.headers.tocken;
      const verified = jwt.verify(tocken, process.env.JWT);
      console.log(verified);
     

      if (
        verified.id == req.headers.user 
      ) {
        console.log("yes");
        next();
      } else {
        return res.status(401).json({ msg: " Citizen User Not Authenticated" });
      }
    }
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ msg: e.message });
  }
};

module.exports = { citizen_authority_middleware };
