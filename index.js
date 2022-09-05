const express = require("express");
const cors = require("cors");

const videos = require("./routes/videos");

const app = express();

const dotenv = require("dotenv");
dotenv.config();

//------- Middlewares --------
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

//------- Router --------------
app.use("/", videos);

//------ Port --------------
const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on ${PORT}...`);
});
