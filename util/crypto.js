let crypto = require('crypto')
let config = require('../config')

exports.hash = (target) => {
    let md5 = crypto.createHash('md5')
    md5.update(target)
    return md5.digest('hex')
};

exports.sign = (target) => {
    let hmac = crypto.createHmac('sha1', config.SecretKey)
    return hmac.update(target).digest().toString('base64')
}