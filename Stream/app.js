const express = require("express");
const port = 3030;
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2")
require("dotenv").config();
const app = express();
const path = require("path")
const fs = require("fs")

app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.json())
app.use(express.json())
app.use(express.static("./"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/login.html")
})


app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    await fetch("http://authentication-service:3000/authenticate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: username, password: password})
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 200) {
            res.status(200)
        }
    })
});

const connection = mysql.createConnection({
    host: "mysql-service",
    user: "videouser",
    password: "Password",
    database: "videos_db",
});

connection.connect((err) => {
    if (err) {
        console.log(err);
        return
    }
    console.log(`MySQL Connected`)
});

app.get("/videos", (req, res) => {
    connection.query(`SELECT title, path FROM videos`, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send(`Error retrieving videos.`);
            return
        }
        res.status(200).json(results)
    })
})

app.get("/videosfs", (req, res) => {
    const videoDirectory = path.join(__dirname, 'uploads');

    fs.readdir(videoDirectory, (err, files) => {
        if (err) {
        return res.status(500).send(err);
        }

    const videos = [];
    files.forEach(file => {
      const video = {
        title: file,
        path: `./uploads/${file}`
      };
      videos.push(video);
    });

    res.json(videos);
  });
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})