const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
import { Ticket } from "../../db/models";

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const userTickets = await Ticket.findAll({
      where: { userId },
      order: [["id", "ASC"]],
    });
    res.json({ userTickets });
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
