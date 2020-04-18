
const Data = require('./data').Data;

function distributionModule(param, res) {
    const { query, pathname } = param;
    switch (pathname) {
        case '/sendMessage':
            setId(query, res);
            break;
        case '/getMessage':
            submit(query, res);
            break;
        case '/addUesr':
            preSuccess(query, res);
            break;
        case '/exitUser':
            getPreState(query, res);
            break;
        default:
            break;
    }
}

function sendMessage(query, res) {
    let result = '';
    console.log('jquery--',JSON.stringify(query))
    if (query) {
        Data.getInstance().setId(query.split('=')[1]);
        Data.getInstance().setNeedPre(true);
        result = {
            code: 1,
            msg: 'success'
        }
    } else {
        result = {
            code: 0,
            msg: 'err id'
        }
    }
    res.end(JSON.stringify(result));
}

function getMessage(query, res) {
    let result;
    if (Data.getInstance().getNeedPre()) {
        Data.getInstance().setPreState(true);
         result = {
                code: 175000,
                msg: 'pre payment',
                data: {
                    preOrderId: Data.getInstance().getId()
                }
        }
    } else {
        result = {
            code: 1,
            msg: 'success',
        }
    }
    res.end(JSON.stringify(result));
}

function addUesr(query, res) {
    Data.getInstance().setNeedPre(false);
    res.end(JSON.stringify({
        code: 1,
        msg: 'success'
    }))
}

function exitUser(query, res) {
    const result = {
        code: 1,
        data: {
            isPre: Data.getInstance().getPreState()
        }
    }
    res.end(JSON.stringify(result));
}

module.exports = {
    distributionModule,
}