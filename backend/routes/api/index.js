// backend/routes/api/index.js
const asyncHandler = require("express-async-handler");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const sessionRouter = require("./session");
const usersRouter = require("./users");
const router = require("express").Router();

router.use("/session", sessionRouter);
router.use("/users", usersRouter);

//----------------  TESTING AUTH MIDDLEWARE -----------------
// router.get(
//   "/set-token-cookie",
//   asyncHandler(async (req, res) => {
//     const user = await User.findOne({
//       where: {
//         username: "Demo-lition",
//       },
//     });
//     setTokenCookie(res, user);
//     return res.json({ user });
//   })
// );
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