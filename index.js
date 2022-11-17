const express = require("express");
const path = require("path");

const PORT = process.env.PORT || "8080";
const app = express();

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.all("/api", (request, response) => {
  response.json({
    message: "hello world",
  });
});

app.all("*", (request, response) => {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}...`);
});
