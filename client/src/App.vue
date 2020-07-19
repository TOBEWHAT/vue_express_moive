<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import UserService from './services/UserService'
export default {
  name: 'app',
  data () {
    return {
      isRouterAlive: true,
      envs: process.env.VUE_APP_MOCK_SERVER
    }
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
    async test () {
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
