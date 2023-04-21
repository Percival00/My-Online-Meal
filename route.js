const http = require('http');
const fs = require('fs');
const { URLSearchParams } = require('url');
const mongoose = require('mongoose');
const internal = require('stream');
mongoose.connect('mongodb://127.0.0.1:27017/onlineMeal')
    .then(function () {
        console.log('DB Connected')
    })
const contactSchema = new mongoose.Schema({ name: String, email: String, phone: String, message: String });
const contactmodel = mongoose.model('contactCollection', contactSchema);


const server = http.createServer(function (req, res) {
    let url = req.url;
    if (req.url === '/') {
        fs.readFile('index.html', (err, data) => {
      if (err) {
        // If there is an error reading the file, send a 500 status code and error message
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end(`Error loading index.html: ${err}`);
      } else {
        // If the file is read successfully, send a 200 status code and the file contents
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      }
    });
    }
    else if (req.url === '/senddata' && req.method === 'POST') {
        console.log("######")
        var rawdata = '';
        req.on('data', function (data) {
            rawdata += data;
        })
        req.on('end', function () {
            var formdata = new URLSearchParams(rawdata);
            res.writeHead(200, { 'Content-Type': 'index/html' })
            console.log(formdata.get('email'))
            contactmodel.create({
                name: formdata.get('name'),
                phone: formdata.get('phone'),
                email: formdata.get('email'),
                message: formdata.get('message')
            }).then((err)=>{console.log(err)})

            res.end();
        })
   }
    else if (req.url === '/signup' && req.method==="GET") {
        fs.readFile('signup.html', (err, data) => {
            if (err) {
              // If there is an error reading the file, send a 500 status code and error message
              res.writeHead(500, {'Content-Type': 'text/plain'});
              res.end(`Error loading index.html: ${err}`);
            } else {
              // If the file is read successfully, send a 200 status code and the file contents
              res.writeHead(200, {'Content-Type': 'text/html'});
              res.end(datatoString());
            }
          });
    }
})

server.listen('8004', function () {
    console.log('server started at 8003');
})
