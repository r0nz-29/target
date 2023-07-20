const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");
const {config} = require('dotenv');
const mongoose = require('mongoose');

config();

const app = express()

app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.status(200).send('<img src="https://res.cloudinary.com/daa4wqa2h/image/upload/v1689840737/afj_jhrf75.png" alt="pogger" />')
})

mongoose
	.connect(process.env.DB, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log("Backend running at port: " + process.env.PORT);
		});
	})
	.catch((err) => {
		console.log(err);
	});
