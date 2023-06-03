const express = require("express");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), register);

router.get("/verify/:verificationCode", verifyEmail);

router.post("/verify", validateBody(schemas.emailSchema), resendVerifyEmail);

router.post("/login", validateBody(schemas.registerSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch(
  "/:id/subscription",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  updateSubscription
);
router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
