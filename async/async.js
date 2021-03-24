const fs = require("fs");

fs.appendFile("toto.txt", "hello async\n", (err) => {
  if (err) {
    console.log("err: ", err);
    return;
  }
  fs.appendFile("toto.txt", "hello async\n", (err) => {
    if (err) {
      console.log("err: ", err);
      return;
    }
    fs.appendFile("toto.txt", "hello async\n", (err) => {
      if (err) {
        console.log("err: ", err);
        return;
      }
      fs.appendFile("toto.txt", "hello async\n", (err) => {
        if (err) {
          console.log("err: ", err);
          return;
        }
      });
    });
  });
});
