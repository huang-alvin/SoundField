const express = require("express");
const router = express.Router();
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
    // const { userId } = req.params;
    const { payload } = req.body;
    console.log(payload);
    const userEvent = await Event.create({ payload });
    return res.json(userEvent);
  })
);

// router.put(
//   "/:eventId(\\d+)",
//   asyncHandler(async (req, res) => {
//     const eventId = req.params;
//     let event = await Event.findByPk(eventId);
//   })
// );

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
