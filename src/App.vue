<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import VConsole from 'vconsole/dist/vconsole.min.js'
export default {
  name: 'App',
  created(){
    // let vConsole = new VConsole()
  }
}
</script>

<style>
#app {
  font-family: '-apple-system', "Helvetica Neue", "Roboto", "Segoe UI", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
.van-nav-bar .van-icon{
  color:white!important
}
.navBarStyle{
  color:white!important;
  background-color: #CC3300!important;
}
.van-button--danger{
  background-color: #CC3300!important;
  border: 1px solid #cc3300
}
.van-field__control:disabled{
  color:black;
}
</style>
