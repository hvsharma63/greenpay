const {
    createmenu,
    getmenu,
    getMenuById
  } = require("./menu.controller");
  const router = require("express").Router();
  const { checkToken } = require("../../auth/token_validation");
  
  router.post("/", checkToken, createmenu);
  router.get("/", checkToken, getmenu);
  router.get("/getmenubyid", checkToken, getMenuById);
  
  module.exports = router;
  