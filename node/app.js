'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const sendMail = require('./send-email').sendEmail;

const app = express();

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

app.post('/sendmail', (req, res) => {
  console.log(req.body);
  sendMail(req, res);
});

app.get('/', (req, res) => res.send('Hello world!'));
module.exports = app;
