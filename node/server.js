const http = require('http');
const url = require('url');

const start = (route, handle) => {
  const onRequest = (request, response) => {
    let postData = '';
    let pathname = url.parse(request.url).pathname;
    console.log('Request for ' + pathname + ' received.');
    console.log(`Request method: ${request.method}`);
    request.setEncoding('utf8');
    request.addListener('data', postDataChunk => {
      postData += postDataChunk;
      console.log('Received POST data chunk ' + postDataChunk + '.');
    });
    request.addListener('end', () => {
      console.log(`server.request.rawTrailers: ${request.rawTrailers}`);
      console.log(`server.postData: ${postData}`);
      route(handle, pathname, response, postData);
    });



  };
  http.createServer(onRequest).listen(8888);
  console.log('Server has started.');
};

exports.start = start;
