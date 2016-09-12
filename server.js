/**
 * Created by jianglei on 2016-08-30.
 */
"use strict";
let fs = require('fs');
let Codeness = require('./2345/2345.js');
var app = require('http').createServer(handler);
var io = require('socket.io')(app);
app.listen(18080);

function handler(req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}

io.on('connection', function (socket) {
    console.log = function (log) {
        socket.emit('message', {content: log});
        process.stdout.write(log + '\n');
    };
});

Codeness.Init('k27683724');//www.2345.com/?k25547392 k54644866http://www.2345.com/?k27683724
Codeness.Start(0.2);
