const express = require("express");
const app = express();

const fileinfo = require("./fileinfo");

app.get("/duplicateFiles", (req, res) => {
  const duplicateFiles = fileinfo.getDuplicateFiles("./files");
  res.json(duplicateFiles);
});

app.listen(3000, () => {
  console.log("server is running on port 3000 ");
});
