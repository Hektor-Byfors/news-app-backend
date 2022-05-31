const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user.js");

const app = express();
app.set("view engine", "ejs");

const port = 3000;
const dbURI = "mongodb+srv://nodeDB:Nlfr7lsygbMhdcBb@nodedb.0wfhner.mongodb.net/nodeNewsLetter?retryWrites=true&w=majority"

mongoose.connect(dbURI)
    .then(() => {
        app.listen(port);
        console.log("App is running at port: " + port);
    })
    .catch((err) => console.log(err));


//mongoose route
app.get("/add-user", (req, res) => {
    const user = new User({
        email: "usernumber2@email.com",
        password: "New password",
        newsLetterSub: false
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
            res.render("users", { result });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/subscribed-users", (req, res) => {
    User.find()
    .then((result) => {
        res.render("subscribers", { result });
    })
    .catch((err) => {
        console.log(err);
    })
})

app.get("/", (req, res) => {
    res.render("index");
});
