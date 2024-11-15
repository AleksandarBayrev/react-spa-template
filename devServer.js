const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs/promises");
const htmlPath = path.join(__dirname, "index.html");
app.use("/static", express.static(path.join(__dirname, "static")));

app.get([
    "/",
    "/about"
], async (req, res, next) => {
    return res.contentType("text/html").send(await fs.readFile(htmlPath));
});

app.get("*", async (req, res, next) => {
    return res.contentType("text/html").send(await fs.readFile(htmlPath));
});

app.listen(3000, () => {
    console.log("app started");
});