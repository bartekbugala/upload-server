'use strict';
const fs = require('fs');
const formidable = require('formidable');

exports.welcome = function(request, response) {
  console.log('Rozpoczynam obsługę żądania welcome.');
  fs.readFile('templates/start.html', function(err, html) {
    if (err) throw err;
    response.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
    response.write(html);
    response.end();
  });
};

exports.upload = function(request, response) {
  console.log('Rozpoczynam obsługę żądania upload.');
  let form = new formidable.IncomingForm();
  form.parse(request, function(error, fields, files) {
    if (error) throw error;
    fs.renameSync(files.upload.path, 'test.png');
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write('recieved image:</br>');
    response.write('<img src="/show" />');
    response.end();
  });
};

exports.show = function(request, response) {
  fs.readFile('test.png', 'binary', function(error, file) {
    if (error) throw error;
    response.writeHead(200, { 'Content-Type': 'image/png' });
    response.write(file, 'binary');
    response.end();
  });
};

exports.error = function(request, response) {
  console.log('Nie wiem co robić.');
  response.write('404 :(');
  response.end();
};
