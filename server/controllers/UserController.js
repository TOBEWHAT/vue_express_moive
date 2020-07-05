/* eslint-disable no-useless-catch */
/* eslint-disable comma-dangle */
/* eslint-disable space-before-function-paren */
const { User } = require('../models')
const config = require('../config')
const Jwt = require('jsonwebtoken')

function tokenSign({ id, email }) {
  try {
    return Jwt.sign(
      { id, email },
      config.token.secretOrPrivateKey,
      config.token.options
    )
  } catch (error) {
    throw error
  }
}

module.exports = {
  async register(req, res) {
    try {
      const user = await User.create(req.body)
      res.status(201).send({
        code: 200,
        user: {
          email: user.email,
          id: user.id,
        },
        token: tokenSign(user),
      })
    } catch (error) {
      const err = []
      if (error.errors) {
        error.errors.forEach((ValidationError) => {
          err.push(ValidationError.message)
        })
      }
      res.status(400).send({
        code: 400,
        error: err.join('<br/>'),
      })
    }
  },
  async getUserById(req, res) {
    try {
      const user = await User.findByPk(req.params.id)
      if (user) {
        res.status(200).send({
          user,
        })
      } else {
        res.status(400).send({
          code: 400,
          error: '没有找到对应用户',
        })
      }
    } catch (error) {
      res.status(500).send({
        code: 500,
        error: '數據查詢失敗',
      })
    }
  },
  async update(req, res) {
    try {
      const user = await User.update(req.body, {
        where: {
          id: req.params.id,
        },
      })
      res.status(200).send({
        user,
        message: '数据更新成功',
      })
    } catch (error) {
      res.status(500).send({
        code: 500,
        error: '數據更新失敗',
      })
    }
  },
  async delete(req, res) {
    try {
      await User.destroy({
        where: {
          id: req.params.id,
        },
      })
      res.status(200).send({
        message: '数据删除成功',
      })
    } catch (error) {
      res.status(500).send({
        code: 500,
        error: '数据删除失败',
      })
    }
  },
  async login(req, res) {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      })
      const isValidPassword = user.comparePassword(req.body.password)
      if (isValidPassword) {
        res.send({
          code: 200,
          user: {
            email: user.email,
            id: user.id,
          },
          token: tokenSign(user),
        })
      } else {
        res.status(403).send({
          code: 403,
          error: '用户名或密码错误',
        })
      }
    } catch (error) {
      res.status(403).send({
        code: 403,
        error: '登录有误',
      })
    }
  },
}
