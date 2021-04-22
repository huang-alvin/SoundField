// backend/routes/api/index.js
const asyncHandler = require("express-async-handler");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const router = require("express").Router();

router.get(
  "/set-token-cookie",
  asyncHandler(async (req, res) => {
    const user = await User.findOne({
      where: {
        username: "Demo-lition",
      },
    });
    setTokenCookie(res, user);
    return res.json({ user });
  })
);

//----------------  TESTING AUTH MIDDLEWARE -----------------
// router.post("/test", function (req, res) {
//   res.json({ requestBody: req.body });
// });
// router.get("/restore-user", restoreUser, (req, res) => {
//   return res.json(req.user);
// });
// router.get("/require-auth", requireAuth, (req, res) => {
//   return res.json(req.user);
// });
module.exports = router;
