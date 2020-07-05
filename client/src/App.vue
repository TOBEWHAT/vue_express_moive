<template>
  <div id="app">
    <h1 v-if="$store.state.user">Welcome!!{{ $store.state.user.email }}</h1>
    <router-link to="/user/register">
      register
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import UserService from './services/UserService'
export default {
  name: 'app',
  data() {
    return {
      envs: process.env.VUE_APP_MOCK_SERVER
    }
  },
  methods: {
    async test() {
      const user = await UserService.getUserById()
      console.log(user)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
