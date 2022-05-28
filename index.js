const express = require("express");
const fs = require("fs");
const port = 3000;

const app = express();

app.listen(port, () => {
    console.log("app is running at port: " + port);
});

app.get("/", (req, res) => {
    res.send("<h1>HOME PAGE</h1>")
});

app.get("/all-users", (req, res) => {
    res.sendFile("./adminView/index.html", { root: __dirname});
});