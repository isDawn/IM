const http = require('http');
const url = require('url');
const api = require('./route/api.js');
// http://192.168.253.4:8080 外部
const start = function() {
    const server = (request,response)=> {
        api.init(request,response);
    }

    const listenBack = () => {
        console.log('success start');
    }

    http.createServer(server).listen(3002,listenBack);
}

exports.start = start;