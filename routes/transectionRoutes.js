const express = require("express");
const { addTransection, getAllTransection } = require("../controllers/transectionCtrl");

//router object
const router = express.Router();

//routers
//add transection POST Method
router.post("/add-transection", addTransection);

//get transection
router.post("/get-transection",getAllTransection);

module.exports = router;
