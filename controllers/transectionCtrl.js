const transectionModel = require("../models/transectionModel");
const moment  =require("moment")
const getAllTransection = async (req, res) => {
  try {
    const { frequency } = req.body;
    const transections = await transectionModel.find({
        date:{
            $gt:moment().subtract((Number(frequency),"d")).toDate(),
        },
      userid: req.body.userid,
    });
    res.status(200).json(transections);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const addTransection = async (req, res) => {
  try {
    const newTransection = new transectionModel(req.body);
    await newTransection.save();
    res.status(201).send("Transection Created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { getAllTransection, addTransection };
