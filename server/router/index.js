const UserController = require('../controllers/UserController')
const MovieController = require('../controllers/MovieController')
const AuthenticatePolicy = require('../policies/AuthenticatePolicy')

module.exports = (app) => {
  app.get('/api', (req, res) => {
    res.send({
      msg: 'Hello node'
    })
  })

  // 用户 AuthenticatePolicy.isValidToken:登陆了的用户才可以新增
  app.post('/users/login', UserController.login)
  app.get('/users/:id',
    AuthenticatePolicy.isValidToken,
    UserController.getUserById)
  app.put('/users/:id', UserController.update)
  app.delete('/users/:id', UserController.delete)
  app.post('/users', UserController.register)

  //movie
  app.post('/movies',
    AuthenticatePolicy.isValidToken,
    MovieController.create
  )

  app.put('/movies/:id',
    AuthenticatePolicy.isValidToken,
    MovieController.update
  )

  app.delete('/movies/:id',
    AuthenticatePolicy.isValidToken,
    MovieController.delete
  )

  app.get('/movies/:id', MovieController.getByid)
  app.get('/movies', MovieController.getAll)
}
