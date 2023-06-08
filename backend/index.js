global.__basedir = __dirname;

require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const expressStaticGzip = require("express-static-gzip");
const cors = require("cors");
const compression = require('compression');
const path = require('path');
const app =  express();

// Use body-parser to get POST requests for API use
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// enable brotli compression
app.use(compression({
  encoding: 'br'  // use Brotli compression
}));

//cors
var corsOptions = {
  origin: "http://localhost:8082"
};
app.use(cors(corsOptions));

// Use gzip compression to serve static files
app.use('/', expressStaticGzip(__dirname +'/build/', {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
  setHeaders: function (res) {
    res.setHeader('Cache-Control', 'public, max-age=31536000');
  }
}));

// to get the frontend routes
app.get('*', (req, res) => {
    return res.sendFile(path
      .join(__dirname + '/build/', 'index.html'))
});

//backend running port, 3000 for frontend
const PORT= 4001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
});
