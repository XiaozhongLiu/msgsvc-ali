const co = require('co')
const AliMNS = require('ali-mns')
const config = require('./config')

const account = new AliMNS.Account(config.AccountID, config.AccessKey, config.SecretKey)
const mns = new AliMNS.MNS(account, "hangzhou");

showQueues()
function showQueues() {
    co(function *() {
        let rawQueues = (yield mns.listP()).Queues.Queue
        if (!rawQueues) return
        if (rawQueues && !rawQueues.length) {
            rawQueues = [rawQueues]
        }

        const queues = rawQueues.map(item => {
            const nameIndex = item.QueueURL.lastIndexOf('/') + 1
            const name = item.QueueURL.substr(nameIndex)
            return new AliMNS.MQ(name, account, "hangzhou")
        })

        for (let item of queues) {
            console.log(yield item.getAttrsP())
        }
    }).catch(console.log)
}

//createQueue()
function createQueue() {
    mns.createP('queue-test').then(console.log, console.error)
}

//deleteQueue()
function deleteQueue() {
    mns.deleteP("queue-test").then(console.log, console.error)
}