<template>
  <div id="app">
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
}
</style>
