const AliMNS = require('ali-mns')
const config = require('./config')

const account = new AliMNS.Account(
    config.AccountID,
    config.AccessKey,
    config.SecretKey
)
const mq = new AliMNS.MQ(config.MQName, account, 'hangzhou')

// // multi msgs
// for (let i = 0; i < 10; i++) {
//     mq.sendP(`Hello ali-mns ${i}`, 16, 5).then(console.log, console.error)
// }

// single msg
mq.sendP('Hello from node', 16, 0).then(console.log, console.error)