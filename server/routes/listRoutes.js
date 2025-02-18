const express = require("express");
const router = express.Router();
const moment = require("moment");

const List = require("../models/List");

router.get("/all", async (request, response) => {
  try {
    const lists = await List.find({}).populate("items").sort({ date: -1 });
    lists.forEach((list) => list._updateExpiredField());
    return response.status(200).json(lists);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

router.get("/:date", async (request, response) => {
  try {
    const { date } = request.params;
    const formattedDate = moment(date, "DD-MM-YYYY").startOf("day").toDate();

    const list = await List.findOne({ date: formattedDate });

    return response.status(200).json(list);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

router.post("/create/:date", async (request, response) => {
  try {
    const { date } = request.params;
    const formattedDate = moment(date, "DD-MM-YYYY").startOf("day").toDate();

    const newList = new List({
      date: formattedDate,
      ...request.body,
    });

    const savedList = await newList.save();

    request.io.emit("listAdded", {
      ...savedList.toObject(),
      date: moment(savedList.date).format("DD-MM-YYYY"),
    });

    return response.status(201).json(savedList);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

module.exports = router;
