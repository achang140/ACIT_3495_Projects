const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3090;

app.use(express.static(path.join(__dirname, "/uploads")));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("video"), (req, res) => {
    const title = req.file.originalname;
    const path = `http://filesystem-service:3090/uploads/${title}`;

    res.send(`Video ${title} added with path ${path}`);
});

app.get("/uploads", (req, res) => {
    const uploadDir = path.join(__dirname, "uploads")

    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            console.error("Error: ", err);
            return res.status(500).send("Error while reading directory");
        }

        res.json({ videos: files });
    });
});

app.get("/uploads/:filename", (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, "uploads", filename);

    if (fs.existsSync(filepath)) {
        res.sendFile(filepath);
    } else {
        res.status(404).send("File not found");
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});