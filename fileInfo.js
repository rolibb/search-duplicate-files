const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const hash = crypto.createHash("md5");
const DIR = "./files";
// const DIR = "/";

const getHashFile = (filePath) => {
  // const stream = fs.createReadStream(filePath);

  // stream.on("data", function (data) {
  //   hash.update(data, "utf8");
  // });

  // stream.on("end", function () {
  //   const res = hash.digest("hex"); // 34f7a3113803f8ed3b8fd7ce5656ebec
  //   console.log(res);
  // });

  let res = "";

  try {
    const data = fs.readFileSync(filePath);
    res = crypto.createHash("sha1").update(data, "utf8").digest("hex");
  } catch (err) {
    console.error(err);
  }

  return res;
};

const getAllFiles = (dirPath, arrayOfFiles) => {
  files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach((file) => {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(__dirname, dirPath, "/", file));
    }
  });
  return arrayOfFiles;
};

const getFilesHashes = (dir) => {
  let filesHashes = new Map();
  try {
    const files = getAllFiles(dir);
    files.map((file) => {
      const hashFile = getHashFile(file);
      const files = filesHashes.get(hashFile);
      if (files && files.length > 0) {
        filesHashes.set(hashFile, [...files, file]);
      } else {
        filesHashes.set(hashFile, [file]);
      }
    });
  } catch (err) {
    console.error(err);
  }
  // console.log(filesHashes);
  return filesHashes;
};

const getDuplicateFiles = (dir) => {
  const filesHashes = getFilesHashes(dir);

  let res = [];
  const filesNames = Array.from(filesHashes.values());
  filesNames.map((files) => {
    if (files.length > 1) {
      res = [...res, ...files];
    }
  });

  return res;
};

getDuplicateFiles("./files");

exports.getHashFile = getHashFile;
exports.getAllFiles = getAllFiles;
exports.getFilesHashes = getFilesHashes;
exports.getDuplicateFiles = getDuplicateFiles;
