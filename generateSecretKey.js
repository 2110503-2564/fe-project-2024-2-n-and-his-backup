const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const randomKey = crypto.randomBytes(32).toString('hex');

const envFilePath = path.join(__dirname, '.env.local');

fs.readFile(envFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  if (!data.includes('NEXTAUTH_SECRET=')) {
    fs.appendFile(envFilePath, `\nNEXTAUTH_SECRET='${randomKey}'\n`, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Completed");
    });
  } else {
    console.log("Finished");
  }
});
