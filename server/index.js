
// Main starting point of the application

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');

// app server

app.use(morgan('combined')); // morgan logs incoming requests
app.use(bodyParser.json({ type: '*/*'})); // used to parse all requests into json, in this case it will do so no matter the request type, which can cause some problems but it's fine for this application.
router(app);


// server setup

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);

