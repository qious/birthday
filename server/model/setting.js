'use strict'

const Sequelize = require('sequelize')

const sequelize = require('../lib/sequelize')

module.exports = sequelize.define('setting', {
  settingId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    comment: '日期 Id'
  },
  birthId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '生日 Id'
  },
  advance: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '提前的天数'
  },
  time: {
    type: Sequelize.TIME,
    allowNull: false,
    comment: '提醒的时间',
    get: function () {
      let time = this.getDataValue('time')
      return time && time.slice(0, 5)
    }
  }
}, {
  freezeTableName: true
})
