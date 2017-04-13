const co = require('co')
const AliMNS = require('ali-mns')
const config = require('./config')

const account = new AliMNS.Account(config.AccountID, config.AccessKey, config.SecretKey)
const topic = new AliMNS.Topic("topic-biz-callback", account, "hangzhou")

showSubscribers()
function showSubscribers() {
    co(function *() {
        let rawSubscribers = (yield topic.listP()).Subscriptions.Subscription
        if (!rawSubscribers) return
        if (rawSubscribers && !rawSubscribers.length) {
            rawSubscribers = [rawSubscribers]
        }

        const subscribers = rawSubscribers.map(item => {
            const nameIndex = item.SubscriptionURL.lastIndexOf('/') + 1
            const name = item.SubscriptionURL.substr(nameIndex)
            return new AliMNS.Subscription(name, topic)
        })

        for (let item of subscribers) {
            console.log(yield item.getAttrsP())
        }
    }).catch(console.log)
}

//createSubscribe()
function createSubscribe() {
    topic.subscribeP(
        'subsciber-biz-callback',
        'acs:mns:cn-hangzhou:1336279792771392:queues/queue-biz-callback',
        'BACKOFF_RETRY',
        'JSON'
    ).then(console.log, console.error)
}