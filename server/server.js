const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { sequelize } = require('./models') // 数据库配置引入

const app = express()
app.use(bodyParser.json())
app.use(morgan('combined'))

app.get('/api', (req, res) => {
  res.send({
    // eslint-disable-next-line comma-dangle
    msg: 'Hello node',
  })
})

app.post('/users', (req, res) => {
  console.log(req.body)
  res.send({
    code: 200,
    // eslint-disable-next-line comma-dangle
    data: req.body,
  })
})

// 数据库配置执行
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
    app.listen(3000, () => console.log('Server has been started on port 3000'))
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err)
  })
