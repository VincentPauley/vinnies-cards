const express = require('express');
const app = express();

// temp
const fs = require('fs');

app.get('/', (req, res) => {
  fs.readFile('seed.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    res.json(JSON.parse(data));
  });
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
