const _url = require('url');
const { HTTP_STATUS, writeHeader, error, CODE } = require('../module/status.js');
const api = require('./api.js');
const { distributionModule } = require('../module/module.js');
const Interface = [
    '/',
    '/sendMessage',
    '/getMessage',
    '/addUesr',
    '/exitUser',
];

// route
function analysisPath(req) {
    const urlData = _url.parse(req.url);
    const { query, pathname } = urlData;
    return {isOk:Interface.includes(pathname), query, pathname };
}

function analysisGet(req,res) {
   const data = analysisPath(req);
   if (data.isOk) {
       writeHeader(HTTP_STATUS.OK,res);
       distributionModule(data,res);
   } else {
       writeHeader(HTTP_STATUS.NOT_FOUND,res);
       res.end(error(CODE.SERVER_OVER));
   }
}

module.exports = {
    analysisGet,
}