const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const async = require("async");

const getHashFile = (filePath, cb) => {
  const stream = fs.createReadStream(filePath);
  const hash = crypto.createHash("sha1");

  stream.on("data", function (data) {
    hash.update(data, "utf8");
  });

  stream.on("end", function () {
    const res = hash.digest("hex");
    cb(null, res);
  });
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

const getFilesHashes = (dir, cb) => {
  let filesHashes = new Map();
  const files = getAllFiles(dir);
  async.map(
    files,
    (file, cbx) => {
      const hashFile = getHashFile(file, (err, fileHash) => {
        if (err) {
          cbx(err);
        }

        const files = filesHashes.get(fileHash);
        if (files && files.length > 0) {
          filesHashes.set(fileHash, [...files, file]);
        } else {
          filesHashes.set(fileHash, [file]);
        }
        cbx();
      });
    },
    (err) => {
      cb(null, filesHashes);
    }
  );
};

const getDuplicateFiles = (dir, cb) => {
  getFilesHashes(dir, (err, filesHashes) => {
    let res = [];
    const filesNames = Array.from(filesHashes.values());
    filesNames.map((files) => {
      if (files.length > 1) {
        res = [...res, ...files];
      }
    });
    cb(null, res);
  });
};

exports.getHashFile = getHashFile;
exports.getAllFiles = getAllFiles;
exports.getFilesHashes = getFilesHashes;
exports.getDuplicateFiles = getDuplicateFiles;
