const {promises} = require('fs');

async function main() {
  try {
    await promises.appendFile('toto.txt', 'await\n');
    await promises.appendFile('toto.txt', 'await\n');
    await promises.appendFile('toto.txt', 'await\n');
    await promises.appendFile('toto.txt', 'await\n');
  } catch (err) {
    console.log('err: ', err);
  }
}

main();
