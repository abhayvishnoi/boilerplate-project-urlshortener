require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
const dbMap={}
counter=0
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/shorturl/:shortUrl', function(req, res) {
  res.redirect(dbMap[req.params.shortUrl])
});

app.post('/api/shorturl', function(req, res) {
  // URL regex pattern
  const {url}=req.body
const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/;

if (!urlRegex.test(url)) {
  res.json({ error: 'invalid url' });
}
else{

  dbMap[counter]=url
  res.json({ original_url : url, short_url : counter});
  counter+=1
}
  
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
