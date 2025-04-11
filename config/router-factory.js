const express = require("express");
const routes = express.Router('./router-file.js');
const path = require("path");

let app = express();

app.use((_, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/public', express.static(path.join(__dirname, "/public")));
app.use('/public/images', express.static(path.join(__dirname, "..", "public", "images")));


routes.forEach(filename => app.use(require(filename)));

app.get("/", (_, res) => res.send("Hello World!"));

app.set("view engine", "ejs");
app.set("views", '.');

module.exports = app;