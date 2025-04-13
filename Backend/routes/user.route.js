const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");
const multer = require("multer");
// const upload = multer({ dest: '/' });

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

router.get("/protected", authMiddleware.authUser, (req, res) => {
  res.status(200).json({
    message: "You accessed a protected route!",
    user: req.user,
  });
});

router.put("/follow/:id", authMiddleware.authUser, userController.followUser);
router.put(
  "/unfollow/:id",
  authMiddleware.authUser,
  userController.unfollowUser
);
router.get(
  "/profile/:username",
  authMiddleware.authUser,
  userController.getUserProfile
);
router.put(
  "/update-profile",
  authMiddleware.authUser,
  userController.updateUserProfile
);
router.put(
  "/update-password",
  authMiddleware.authUser,
  userController.updatePassword
);
router.put(
  "/avatar",
  authMiddleware.authUser,
  upload.single("avatar"),
  userController.updateAvatar,
);

module.exports = router;
