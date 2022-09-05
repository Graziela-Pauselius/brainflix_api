const fs = require("fs");
const uniqid = require("uniqid");

const dotenv = require("dotenv");
dotenv.config();

//----- Data --------
const videos = JSON.parse(fs.readFileSync(`${__dirname}/../data/videos.json`));
const imageData = fs.readdirSync("${__dirname}/../public");

//------- Middleware -------------

// Check Post Body
exports.checkPost = (req, res, next) => {
	if (!req.body.title || !req.body.description) {
		return res.status(404).json({
			status: "fail",
			message: "Missing name or description",
		});
	}
	next();
};

// --------- Functions ---------------
// Generate ramdom number
const randomNum = (n) => {
	return Math.floor(Math.random() * n) + 1;
};

// Generate ramdom comment
const randomComment = () => {
	const commentsData = JSON.parse(
		fs.readFileSync(`${__dirname}/../data/comments.json`)
	);
	let commentsIndex = Math.floor(Math.random() * commentsData.length);
	let comment = commentsData[commentsIndex];
	return comment;
};

// Generate ramdon image
const Image_URL = process.env.IMAGE_URL;

const randomImage = () => {
	let image = imageData[Math.floor(Math.random() * imageData.length)];
	const imageURL = `${Image_URL}/${image}`;
	return imageURL;
};

randomImage();

//-------- Router Handlers -------------

// Get All Videos
exports.getAllVideos = (req, res) => {
	res.status(200).json({
		status: "sucess",
		results: videos.length,
		data: {
			videos,
		},
	});
};

// Get a Video
exports.getVideoId = (req, res) => {
	const id = req.params.id;
	const video = videos.find((el) => el.id === id);

	res.status(200).json({
		status: "sucess",
		data: {
			video,
		},
	});
};

// Create a Video
exports.uploadVideo = (req, res) => {
	const newVideo = {
		title: req.body.title,
		channel: "Red Cow",
		image: randomImage(),
		description: req.body.description,
		views: randomNum(100000),
		likes: randomNum(1000),
		duration: randomNum(5),
		video: "https://project-2-api.herokuapp.com/stream",
		timestamp: Date.now(),
		comments: [randomComment(), randomComment(), randomComment()],
		id: uniqid(),
	};

	videos.push(newVideo);
	fs.writeFile(`./data/videos.json`, JSON.stringify(videos), () => {
		res.status(201).json({
			status: "sucess",
			data: {
				videos,
			},
		});
	});
};
