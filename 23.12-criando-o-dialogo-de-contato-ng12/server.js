const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist'));

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(4200);
