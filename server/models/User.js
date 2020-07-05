/* eslint-disable space-before-function-paren */
/* eslint-disable comma-dangle */
const Sequelize = require('sequelize')
const MD5 = require('crypto-js/md5')

function hashPassword(user, options) {
  if (user.changed('password')) {
    user.password = MD5(user.password).toString()
  }
}

module.exports = (sequelize, DataTypes) => {
  class Model extends Sequelize.Model {
    // 后台对前端传过来的密码进行加密
    comparePassword(password) {
      return this.password === MD5(password).toString()
    }
  }

  Model.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: {
          msg: '该邮箱地址已被注册，请更换',
        },
        validate: {
          isEmail: {
            msg: '请输入正确的邮箱地址',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            min: 5,
            max: 20,
            msg: '密码长度必须大于5和小于20',
          },
        },
      },
    },
    {
      hooks: {
        afterValidate: hashPassword,
      },
      sequelize,
      modelName: 'User',
    }
  )
  return Model
}
