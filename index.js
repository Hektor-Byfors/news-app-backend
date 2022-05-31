const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user.js");

const port = 3000;
const dbURI = "mongodb+srv://nodeDB:Nlfr7lsygbMhdcBb@nodedb.0wfhner.mongodb.net/nodeNewsLetter?retryWrites=true&w=majority"

mongoose.connect(dbURI)
    .then(() => {
        app.listen(port);
        console.log("App is running at port: " + port);
    })
    .catch((err) => console.log(err));

const app = express();

//mongoose route
app.get("/add-user", (req, res) => {
    const user = new User({
        userName: "New user 2",
        password: "New password",
        newsLetterSub: true
    });

    user.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/all-users", (req, res) => {
    User.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/", (req, res) => {
    res.sendFile("./adminView/index.html", { root: __dirname });
});
