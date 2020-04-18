const HTTP_STATUS = {
    OK: 200,
    MOVED_PERMANENTLY: 301,
    NOT_FOUND: 404,
    CONFLICT: 409,
    BAD_REQUEST: 500,
}

const CODE = {
    SERVER_OVER: 0,
    SUCCESS: 1,
    SERVER_ERR: 2,
    PARAM_ERR: 3,
    SIGN_ERR: 4,
}

function error(code) {
    let m = '异常请求';
    switch (code) {
        case 0:
            m = '请求路径or请求方式不正确'
            break;
        case 2:
            m = '服务异常'
            break;
        case 3:
            m = '参数错误'
            break;
        case 4:
            m = '签名错误'
            break;
        default:
            break;
    }
    return JSON.stringify({ code:code, message:m });
}

function success() {
    return JSON.stringify({ code: 1, message: 'successful' });
}

function writeHeader(status,response) {
   response.setHeader('Access-Control-Allow-Origin', '*');
   response.writeHeader(status,{'Content-Type' : 'text/palin; charset=utf-8'});
}

module.exports = {
    error,
    success,
    CODE,
    HTTP_STATUS,
    writeHeader,
}