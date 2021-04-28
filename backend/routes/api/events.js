const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { Event } = require("../../db/models");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    console.log("back-end");
    const eventsList = await Event.findAll();
    return res.json(eventsList);
  })
);

router.get(
  "/:userId(\\d+)",
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const userEventList = await Event.findAll({ where: { userId } });
    return res.json(userEventList);
  })
);

module.exports = router;
