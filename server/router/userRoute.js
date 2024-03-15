const express = require("express");

const router = express.Router();
const {signUp,login}=require("../controller/userController")
router.post("/signUp",signUp);
router.post("/signIn",login);
module.exports = router;
