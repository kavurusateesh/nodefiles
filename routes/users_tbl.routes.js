module.exports = app => {
  const Users = require("../controllers/users_tbl.controller.js");
  const VerifyToken = require('../config/verifyToken');

  var router = require("express").Router();


  // Create Login
  router.post("/login", Users.login);

  app.use('/api/Users', router);
};
