require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const PORT = process.env.PORT || "8080";
const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to mongodb server"));

// apis
const notes = require("./routes/notes");

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use(express.json());

app.use("/api/note", notes);

app.all("*", (request, response) => {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}...`);
});
