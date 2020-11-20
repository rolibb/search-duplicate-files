const fileInfo = require("./fileInfo");

test("get Hash file to have the signature using sha1 of the file ./files/test.txt", (done) => {
  function callback(error, data) {
    if (error) {
      done(error);
    }
    expect(data).toEqual("a94a8fe5ccb19ba61c4c0873d391e987982fbbd3");
    done();
  }
  fileInfo.getHashFile("./files/test.txt", callback);
});

test("get files hashes ", (done) => {
  function callback(error, dataRes) {
    if (error) {
      done(error);
    }

    let data = new Map();
    data.set("a94a8fe5ccb19ba61c4c0873d391e987982fbbd3", [
      __dirname + "/files/test.txt",
      __dirname + "/files/test1.txt",
      __dirname + "/files/tmp/test3.txt",
    ]);
    data.set("dc5555b3c0023af8c1b98b9669d3589d4a393e60", [
      __dirname + "/files/test2.txt",
    ]);

    expect(dataRes).toEqual(data);
    done();
  }

  fileInfo.getFilesHashes("./files", callback);
});

test("get duplicate files", (done) => {
  function callback(error, res) {
    if (error) {
      done(error);
    }

    let duplitateFiles = [
      __dirname + "/files/test.txt",
      __dirname + "/files/test1.txt",
      __dirname + "/files/tmp/test3.txt",
    ];
    expect(res).toEqual(duplitateFiles);

    done();
  }

  fileInfo.getDuplicateFiles("./files", callback);
});
