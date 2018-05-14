const rp = require('request-promise');
const config = require('./config.json');

const YOUR_API_KEY = config.YOUR_API_KEY;

const sendEmail = (req, res) => {
  console.log(`body: ${req.body}`);
  rp({
    method: 'POST',
    uri: 'https://api.sendgrid.com/v3/mail/send',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${YOUR_API_KEY}1`
    },
    body: req.body,
    json: true
  })
    .then(data => {
      console.log('mail sent');
      res.send('mail sent');
      //res.render('mail sent');
    })
    .catch(err => {
      console.log(err);
      res.status(err.statusCode).send(err.message);
    });
};

exports.sendEmail = sendEmail;
