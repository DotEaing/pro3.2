<template>
  <div>
    <van-tabs v-model="activeName" :border="false">
      <van-tab title="推荐" name="a" to="/recommend"></van-tab>
      <van-tab title="歌手榜" name="b" to="/singer"></van-tab>
      <van-tab title="排行榜" name="c" to="/rank"></van-tab>
      <van-tab title="搜索" name="d" to="/search"></van-tab>
    </van-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      activeName: "a"
    };
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/variable';

.van-tabs>>>.van-tabs__nav {
  background-color: $color-background;
}

.van-tabs>>>.van-tabs__line {
  background-color: $color-theme;
}

.van-tabs>>>.van-tab {
  color: $color-theme;
}

.tab {
  display: flex;
  height: 44px;
  line-height: 44px;
  font-size: $font-size-medium;

  .tab-item {
    flex: 1;
    text-align: center;

    .tab-link {
      padding-bottom: 5px;
      color: $color-text-l;
    }

    &.router-link-active {
      .tab-link {
        color: $color-theme;
        border-bottom: 2px solid $color-theme;
      }
    }
  }
}
</style>