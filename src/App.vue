<template>
  <div id="app">
    <m-header></m-header>
    <van-sticky>
      <Tab></Tab>
    </van-sticky>
    <Player></Player>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from './components/m-header/m-header'
  import Player from './components/player/player' 
  import Tab from './components/tab/tab'

  export default {
    components: {
      MHeader,
      Tab,
      Player
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>