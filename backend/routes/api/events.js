const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const asyncHandler = require("express-async-handler");
const { Event } = require("../../db/models");

router.get(
  "/:userId(\\d+)",
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const eventsList = await Event.findAll();
    const userEventsList = await Event.findAll({ where: { userId } });
    let events = { eventsList, userEventsList };

    return res.json(events);
  })
);

router.post(
  "/:userId(\\d+)",
  asyncHandler(async (req, res) => {
    const { payload } = req.body;

    const userEvent = await Event.create({ payload });
    return res.json(userEvent);
  })
);

router.post(
  "/filter",
  asyncHandler(async (req, res) => {
    let { payload } = req.body;
    let filterEvents = await Event.findAll({
      where: { categoryId: { [Op.or]: payload } },
    });
    return res.json(filterEvents);
  })
);

router.delete(
  "/:eventId(\\d+)",
  asyncHandler(async (req, res) => {
    const { eventId } = req.params;
    let event = await Event.findByPk(eventId);
    console.log(event);
    await event.destroy();
    return res.json({ success: "success" });
  })
);
module.exports = router;
