const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { Category } = require("../../db/models");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    let categories = await Category.findAll();

    return res.json(categories);
  })
);
module.exports = router;
