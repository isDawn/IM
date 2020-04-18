const ws = require('nodejs-websocket');

// 启动ws监听
function start() {
   const service = ws.createServer((conn) => {
       console.log('conn----------'+ JSON.stringify(conn))
        watchGetMessage(conn);
        watchClose(conn);
        watchError(conn);
    }).listen(3000, () => {
        console.log('ws start')
    });

    function watchGetMessage(conn) {
        conn.on('text', (data) => {
            data = JSON.parse(data);
            switch (data.type) {
                case 1 :
                    addUserCallback(conn, data);
                    break;
                case 2 :
                    sendMessageCallback(conn, data);
                    break;
                case 3 :
                    closeUserCallback(conn, data);
                    break;
                default :
            }
        })
    }

    function watchClose(conn) {
        conn.on('close', (data) => {
            broadcast({ name: 'Service', text: conn.nextName + '离开了房间' });
        })
    }

    function watchError(conn) {
        conn.on('error', (data) => {
            console.log('error----'+data)
        })
    }

    function addUserCallback(conn, data) {
        conn.nextName = data.userId;
        console.log('addUserCallback')
        broadcast({ name: 'Service', text:  data.userId + '加入了房间' });
    }

    function sendMessageCallback(conn, data) {
        broadcast({ name: conn.nextName, text:  data.text })
        console.log('sendMessageCallback');
    }

    function closeUserCallback() {
        console.log('sendMessageCallback')
    }

    // 发广播通知其他人
    function broadcast(text) {
        service.connections.forEach(function(conn) {
            conn.sendText(JSON.stringify(text));//发送消息给客户端
        })
    }
}

exports.start = start;