# Search Duplicate Files

## How to use

Please send the path where you want to search duplicate files

```javascript
const fileinfo = require("./fileinfo");
fileinfo.getDuplicateFiles("./files", (err, duplicateFiles) => {});
```

## How to run service

Service will run on port 3000

```sh
npm run service
```

## Documentation to use REST service

It will return all files duplicates including the path where is located the file.

```postman
GET /duplicateFiles
```

Example Response

```json
["/files/test.txt", "/files/test1.txt", "/files/tmp/test3.txt"]
```

## Run Unit tests

```sh
npm run test
```
