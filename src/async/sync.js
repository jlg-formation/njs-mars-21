const fs = require('fs');

try {
  fs.appendFileSync('toto.txt', 'coucou sync\n');
  fs.appendFileSync('toto.txt', 'coucou sync\n');
  fs.appendFileSync('toto.txt', 'coucou sync\n');
  fs.appendFileSync('toto.txt', 'coucou sync\n');
} catch (err) {
  console.log('err: ', err);
}
