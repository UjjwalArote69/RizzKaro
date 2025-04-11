const express = require("express");
const router = express.Router();
// const { body } = require('express-validator')
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

router.get("/protected", authMiddleware.authUser, (req, res) => {
  res.status(200).json({
    message: "You accessed a protected route!",
    user: req.user,
  });
});

router.put("/follow/:id", authMiddleware.authUser, userController.followUser);
router.put("/unfollow/:id", authMiddleware.authUser, userController.unfollowUser);
router.get("/profile/:username", authMiddleware.authUser, userController.getUserProfile);

// router.get("/profile", authMiddleware.authUser, userController.getUserProfile);


module.exports = router;
