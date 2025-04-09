const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const replyController = require("../controllers/reply.controller");

router.post("/reply", authMiddleware.authUser, replyController.generateReply);
router.get("/myreplies", authMiddleware.authUser, replyController.getReplies)

module.exports = router;
