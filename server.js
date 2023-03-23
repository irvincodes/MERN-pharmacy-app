const express = require("express");
const path = require("path");
const logger = require("morgan");
const app = express();

const port = 3000;

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

app.listen(port, () => {
  console.log(`Express app running on port ${port}`);
});
