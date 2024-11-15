const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs/promises");
const htmlPath = path.join(__dirname, "index.html");
const PORT = 3000;
app.use("/static", express.static(path.join(__dirname, "static")));

app.get([
    "/",
    "/home/:id",
    "/about"
], async (req, res, next) => {
    return res.contentType("text/html").send(await fs.readFile(htmlPath));
});

app.get("*", async (req, res, next) => {
    return res.contentType("text/html").send(await fs.readFile(htmlPath));
});

app.listen(PORT, () => {
    console.log(`dev server started at port ${PORT}`);
});