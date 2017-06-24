'use strict'

const userPlugin = require('../../lib/plugin').user()

const BASE_PATH = '/api/births'

describe('middleware/security/wechat', function () {
  before(function* () {
    yield userPlugin.before()
  })

  after(function* () {
    yield userPlugin.after()
  })

  it('should throw unauthorized error', function* () {
    yield api.get(BASE_PATH).expect(401)
  })

  it('should return birth list', function* () {
    yield api.get(BASE_PATH)
      .use(userPlugin.plugin())
      .expect(200)
  })
})
