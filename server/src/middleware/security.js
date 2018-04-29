const _ = require('lodash')
const config = require('config')

const errors = require('../lib/errors')
const securityHandlers = {
  oauth: require('./security/oauth')
}

const baseUrl = config.get('server.baseUrl')
const extra = {
  appid: config.get('wechat.corpId'),
  response_type: 'code',
  scope: 'snsapi_base',
  redirect_uri: _.trimEnd(baseUrl, '/') + '/api/wechat/oauth'
}

// 检查权限校验
let accessCheck = async (ctx) => {
  let securities = ctx.operation.getSecurity()
  if (!securities || !securities.length) {
    return true
  }

  for (let security of securities) {
    let canAccess = true
    for (let handler in security) {
      let scope = security[handler]
      if (!securityHandlers[handler]) {
        throw new errors.SystemError(`security ${handler} not found`)
      }
      canAccess = canAccess && await securityHandlers[handler](ctx, scope)
    }
    if (canAccess) {
      return true
    }
  }
  return false
}

module.exports = async (ctx, next) => {
  if (ctx.operation) {
    let canAccess = await accessCheck(ctx)
    if (!canAccess) {
      throw new errors.Unauthorized('授权后访问', 'Unauthorized', extra)
    }
  }

  await next()
}
