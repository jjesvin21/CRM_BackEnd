const express = require("express");
const {
  add_new_case,
  getallcases,
  getindudual_case,
  updatestatus,
} = require("../controllers/case_controlleres");
const {
  autnority_auth,
} = require("../middleware/authority_authentication_middleware");
const {
  citizen_auth,
} = require("../middleware/citizen_authentication_middlewares");
const {
  citizen_authority_middleware,
} = require("../middleware/citizen_or_authority_middleware");
const Router = express.Router;

const case_routes = Router();

case_routes.get("/cases", autnority_auth, getallcases);
case_routes.post("/cases", autnority_auth, add_new_case);
case_routes.get("/cases/:id", citizen_authority_middleware, getindudual_case);
case_routes.put("/cases/:id", autnority_auth, updatestatus);

module.exports = case_routes;
