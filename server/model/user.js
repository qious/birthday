'use strict'

const Sequelize = require('sequelize')

const sequelize = require('../lib/sequelize')

module.exports = sequelize.define('user', {
  userId: {
    type: Sequelize.STRING(32),
    allowNull: false,
    primaryKey: true,
    comment: '用户 Id'
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '姓名'
  },
  gender: {
    type: Sequelize.ENUM,
    values: ['UNKNOWN', 'MAN', 'WOMAN'],
    defaultValue: 'UNKNOWN',
    allowNull: false,
    comment: '性别',
    get: function () {
      let transform = {
        UNKNOWN: '未知',
        MAN: '男',
        WOMAN: '女'
      }
      let gender = this.getDataValue('gender')
      return transform[gender]
    },
    set: function (gender) {
      if (gender === '男') {
        gender = 'MAN'
      } else if (gender === '女') {
        gender = 'WOMAN'
      } else {
        gender = 'UNKNOWN'
      }
      this.setDataValue('gender', gender)
    }
  },
  mobile: {
    type: Sequelize.STRING(20),
    allowNull: true,
    comment: '手机'
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    comment: '邮箱'
  },
  avatar: {
    type: Sequelize.TEXT,
    allowNull: true,
    comment: '头像'
  }
}, {
  createdAt: 'registAt',
  updatedAt: 'loginAt'
})
