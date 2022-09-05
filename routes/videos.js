const express = require("express");
const videosController = require("../controllers/videosController.js");

const router = express.Router();

//------- Routers -----

router
	.route("/videos")
	.get(videosController.getAllVideos)
	.post(videosController.checkPost, videosController.uploadVideo);

router.route("/videos/:id").get(videosController.getVideoId);

module.exports = router;
