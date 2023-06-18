// import { Router } from "express";
const express = require("express");
const {
  get_all_citizen,
  add_new_citizen,
  citizen_login,
  get_indudual_citizen,
} = require("../controllers/citizen_controllers");
const {
  citizen_auth,
} = require("../middleware/citizen_authentication_middlewares");
const { updatestatus } = require("../controllers/case_controlleres");
const {
  autnority_auth,
} = require("../middleware/authority_authentication_middleware");
const { citizen_authority_middleware } = require("../middleware/citizen_or_authority_middleware");

const citizen_routes = express.Router();

citizen_routes.get(
  "/all_citizens",
  citizen_authority_middleware,
  get_all_citizen
);
citizen_routes.post("/add_new_citizen", add_new_citizen);
citizen_routes.post("/login", citizen_login);

citizen_routes.get(
  "/all_citizens/:id",
  citizen_authority_middleware,
  get_indudual_citizen
);

module.exports = citizen_routes;
