const fileinfo = require("./fileinfo");

test("get Hash file to have the signature using sha1 of the file ./files/test.txt", () => {
  expect(fileinfo.getHashFile("./files/test.txt")).toBe(
    "a94a8fe5ccb19ba61c4c0873d391e987982fbbd3"
  );
});

test("get files hashes ", () => {
  let data = new Map();
  data.set("a94a8fe5ccb19ba61c4c0873d391e987982fbbd3", [
    __dirname + "/files/test.txt",
    __dirname + "/files/test1.txt",
    __dirname + "/files/tmp/test3.txt",
  ]);
  data.set("dc5555b3c0023af8c1b98b9669d3589d4a393e60", [
    __dirname + "/files/test2.txt",
  ]);

  expect(fileinfo.getFilesHashes("./files")).toEqual(data);
});

test("get duplicate files", () => {
  let duplitateFiles = [
    __dirname + "/files/test.txt",
    __dirname + "/files/test1.txt",
    __dirname + "/files/tmp/test3.txt",
  ];
  expect(fileinfo.getDuplicateFiles("./files")).toEqual(duplitateFiles);
});
