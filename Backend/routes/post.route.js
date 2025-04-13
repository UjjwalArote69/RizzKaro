const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const postController = require("../controllers/post.controller");

router.post("/", authMiddleware.authUser, postController.createPost);
router.get("/discover", authMiddleware.authUser, postController.getDiscoverPosts);
router.get("/following", authMiddleware.authUser, postController.getFollowingPosts);
router.post("/:id/like", authMiddleware.authUser, postController.toggleLike);

module.exports = router;