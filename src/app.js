const express = require('express');

const app = express();

const items = [
  { id: 1, name: 'item1' },
  { id: 2, name: 'item2' },
];

app.get('/things', (req, res) => {
  console.log('handling GET /things');
  res.send(items);
});

module.exports.app = app;
