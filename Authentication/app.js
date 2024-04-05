const express = require("express");
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const credentials = require('./credentials.json');

app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.json())

app.post("/authenticate", (req, res) => {
    const { username, password } = req.body;
    if (credentials.user.hasOwnProperty(username) && credentials.user[username] === password) {
        res.status(200).json({ status: 200 })
    } else {
        res.status(401).send({ message: "Incorrect credentials" });
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})