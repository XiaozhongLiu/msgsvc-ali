const AliMNS = require('ali-mns')
const config = require('./config')

regularReceive()

function regularReceive() {
    const account = new AliMNS.Account(
        config.AccountID,
        config.AccessKey,
        config.SecretKey
    )
    const mq = new AliMNS.MQ(config.MQName, account, 'hangzhou')
    mq.recvP(5).then(data => {
        console.log(data)
        mq.deleteP(data.Message.ReceiptHandle).then(console.log)
        setTimeout(regularReceive, 100)
    }, err => {
        console.error(err.Error.Code)
        setTimeout(regularReceive, 100)
    })
}