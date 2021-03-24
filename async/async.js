const fs = require("fs");

fs.appendFile("toto.txt", "hello async\n", (err) => {
  fs.appendFile("toto.txt", "hello async\n", (err) => {
    fs.appendFile("toto.txt", "hello async\n", (err) => {
      fs.appendFile("toto.txt", "hello async\n", (err) => {});
    });
  });
});
