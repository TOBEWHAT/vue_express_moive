const path = require('path')
const fs = require('fs')
const config = require('../config')
const Sequelize = require('sequelize')
const db = {}

const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  config.db.options
)

// eslint-disable-next-line no-path-concat
// const User = sequelize.import('./User.js')
// 引入db里的文件 ps:import 无效只能使用define
// const User = sequelize.define('./User.js')

fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.js')
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

db.Sequelize = Sequelize
db.sequelize = sequelize
// db.User = User
// db['Movie'].sync({ force: true }) //更改了表结构就需要重新生成

module.exports = db
