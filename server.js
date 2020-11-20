const express = require("express");
const app = express();

const fileInfo = require("./fileInfo");

app.get("/duplicateFiles", (req, res) => {
  fileInfo.getDuplicateFiles("./files", (error, data) => {
    if (error) {
      res.status(500).json(error);
    }
    res.json(data);
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000 ");
});
