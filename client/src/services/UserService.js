import request from './index'

export default {
  async getUserById() {
    const response = await request.get('/users/8')
    return response.data
  },
  register(data) {
    return request.post('/users', data)
  },
  login(data) {
    return request.post('/users/login', data)
  }
}
