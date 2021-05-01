const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { Ticket } = require("../../db/models");

router.get(
  "/:userId(\\d+)",
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const userTickets = await Ticket.findAll({
      where: { userId },
      order: [["id", "ASC"]],
    });

    return res.json(userTickets);
  })
);

router.post(
  "/:userId(\\d+)",
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { eventId } = req.body;
    const ticket = await Ticket.create({ userId, eventId });
    return res.json(ticket);
  })
);

router.delete(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const ticket = await Ticket.findByPk(id);
    await ticket.destroy();
    res.json({ success: "success" });
  })
);
module.exports = router;
