/* eslint-disable comma-dangle */
/**
 * Sequelize : npm i sequelize
 * 數據庫文件配置
 */
const path = require('path')

module.exports = {
  db: {
    database: process.env.DATABASE || 'movie',
    username: 'movie',
    password: 'movie',
    options: {
      host: 'localhost',
      dialect: 'sqlite',
      storage: path.resolve(__dirname, '../db/movie.sqlite'), // sqlite需要指定目錄
      define: {
        underscored: true,
        paranoid: true,
      },
    },
  },
  token: {
    secretOrPrivateKey: 'movie',
    options: {
      expiresIn: '24h'
    }
  }
}
