const { HTTP_STATUS, writeHeader, error, CODE } = require('../module/status.js');
const { analysisGet } = require('./route');
// init
function init(request,response) {
    const method = request.method;
    if (method === 'GET') {
        get(request,response);
    } else if (method === 'POST') {
        post(request,response);
    } else {
        writeHeader(HTTP_STATUS.NOT_FOUND,response);
        response.end(error(CODE.SERVER_OVER));
    }
}

// get请求
function get(req,res) {
    analysisGet(req,res);
}

// post请求
function post(req,res) {
    res.end(JSON.stringify({code:1,meg:'post'}));
}

module.exports = {
    init,
}