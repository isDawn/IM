// 引入 events 模块
const Event = require('events').EventEmitter;
const ex = require('./module.js');
// 创建 eventEmitter 对象
const eventEmitter = new Event();

const defaultFun = () =>{
    console.log('链接成功')
    eventEmitter.emit('rej')
}

eventEmitter.on('res',defaultFun);
eventEmitter.on('rej',()=>{
    console.log('数据接收成功。',ex.ModuleOne);
})
eventEmitter.emit('res');