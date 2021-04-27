const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
import { Bookmark } from "../../db/models";

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const userBookmarks = await Bookmark.findAll({
      where: { userId },
      order: [["id", "ASC"]],
    });
    return res.json({ userBookmarks });
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { userId, eventId } = req.body;
    const bookmark = await Bookmark.create({ userId, eventId });
    return res.json({ success: "success" });
  })
);

router.delete(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const bookmark = await Bookmark.findByPk(id);
    await bookmark.destroy();
    return res.json({ success: "success" });
  })
);
module.exports = router;
