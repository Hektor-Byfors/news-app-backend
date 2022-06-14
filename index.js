const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user.js");
const cors = require("cors");

const app = express();
app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
const port = 3001;
const dbURI = "mongodb+srv://nodeDB:Nlfr7lsygbMhdcBb@nodedb.0wfhner.mongodb.net/nodeNewsLetter?retryWrites=true&w=majority"

mongoose.connect(dbURI)
    .then(() => {
        app.listen(port);
        console.log("App is running at port: " + port);
    })
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
    User.find()
    .then((result) => {
        res.render("index", { result });
    })
    .catch((err) => {
        console.log(err);
        res.send("error has occurred:" + err);
    })
});

app.get("/users", (req, res) => {
    
    User.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
        res.send("error has occurred:" + err);
    })
})

app.post("/create-user", (req, res) => {
    let user = new User({
        email: req.body.email,
        password: req.body.password,
        newsLetterSub: req.body.newsLetterSub
    });

    user.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
})