const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), './src/index.html'));
});

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
