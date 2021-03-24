const fs = require("fs");

function appendFilePromise(filename, content) {
  return new Promise((resolve, reject) => {
    fs.appendFile(filename, content, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

appendFilePromise("toto.txt", "promise\n")
  .then(() => appendFilePromise("toto.txt", "promise\n"))
  .then(() => appendFilePromise("toto.txt", "promise\n"))
  .then(() => appendFilePromise("toto.txt", "promise\n"))
  .catch((err) => console.log(err));
