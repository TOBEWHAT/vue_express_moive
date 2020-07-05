<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <p>
        If Element is successfully added to this project, you'll see an
        <code v-text="'<el-button>'"></code>
        below
      </p>
      {{envs}}
      <el-button @click="test">el-button</el-button>
    </div>
  </div>
</template>

<script>
import UserService from './services/UserService'
export default {
  name: 'app',
  data () {
    return {
      envs: process.env.VUE_APP_MOCK_SERVER
    }
  },
  methods: {
    async test () {
      const user = await UserService.getUserById()
      console.log(user)
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
