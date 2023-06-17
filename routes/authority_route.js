const express = require("express");
const {
  get_all,
  get_induduvel,
  add_authority,
  login,
} = require("../controllers/authority_controllers");
const {
  autnority_auth,
} = require("../middleware/authority_authentication_middleware");
const Router = express.Router;

const authority_router = Router();

authority_router.get("/get_all", get_all);

authority_router.post("/new", add_authority);
authority_router.post("/login", login);

// authority_router.use(autnority_auth);

authority_router.get("/get_all/:id", get_induduvel);

module.exports = authority_router;
