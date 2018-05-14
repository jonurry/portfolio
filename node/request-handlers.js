const querystring = require('querystring');
const emailSender = require('./send-email');

const start = response => {
  console.log('Request handler \'start\' was called.');
  let body = `
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      </head>
      <body>
        <form action="/upload" method="post">
          <textarea name="text" rows="20" cols="60"></textarea>
          <input type="submit" value="Submit text" />
        </form>
      </body>
    </html>`;
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(body);
  response.end();
};

const upload = (response, postData) => {
  console.log('Request handler \'upload\' was called.');
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write('You\'ve sent the text: ' + querystring.parse(postData).text);
  response.end();
};

const sendEmail = (response, postData) => {
  console.log('Request handler \'sendEmail\' was called.');
  console.log(`postData: ${postData}`);
  emailSender.sendEmail(response, postData);
};

exports.start = start;
exports.upload = upload;
exports.sendEmail = sendEmail;
