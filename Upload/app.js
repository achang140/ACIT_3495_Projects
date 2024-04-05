const express = require("express");
const port = 3060;
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2/promise");
require("dotenv").config();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const FormData = require("form-data");
const axios = require("axios");
const app = express();
const upload = multer()

app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("./"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/login.html");
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    await fetch("http://acit3495_a1-auth-1:3000/authenticate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: username, password: password})
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 200) {
            res.status(200);
        }
    });
});

const createConnection = async () => {
    try {
        const connection = await mysql.createConnection({
            host: "acit3495_a1-db-1",
            user: "videouser",
            password: "Password",
            database: "videos_db"
        });
        console.log(`MySQL Connected`);
        return connection;
    } catch (error) {
        console.error(`MySQL Connection Error: ${error.message}`);
        throw error;
    }
};


app.post("/upload", upload.single("video"), async (req, res) => {
    const connection = await createConnection();
    const title = req.file.originalname;
    const path = `http://acit3495_a1-filesystem-1:3090/uploads/${title}`;

    try {
        const sql = `INSERT INTO videos (title, path) VALUES (?, ?)`;
        const values = [title, path];
        const [rows] = await connection.execute(sql, values);
        console.log(`Video information added to database`);
    } catch (error) {
        console.error(`MySQL Query Error: ${error.message}`);
        res.status(500).send(`Error uploading video`);
    } finally {
        connection.end();
    }

    try {
        const formData = new FormData();
        formData.append("video", req.file.buffer, {
            filename: title,
        });

        await axios.post(`http://acit3495_a1-filesystem-1:3090/upload`, formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });
    } catch (error) {
        console.error("Failed to forward file: ", error);
        return res.status(500).send("Failed to forward file to FS");
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});