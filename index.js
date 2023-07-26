const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const server = express();
server.set('view engine', 'ejs');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(express.static(path.join(__dirname, 'public')));


server.post('/submit', (req, res) => {
  let jsonData;
  try {
    jsonData = JSON.parse(req.body.jsonData);
  } catch (error) {
    return res.status(400).send('Invalid JSON format!');
  }

  
  res.redirect('/display-response?jsonData=' + encodeURIComponent(JSON.stringify(jsonData)));
});


server.get('/display-response', (req, res) => {
  const jsonData = req.query.jsonData;

  res.render('submit', { jsonData });
});

server.listen(3000,()=>{
  console.log("Server started");
});
