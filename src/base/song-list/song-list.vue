<template>
  <div class="song-list" :style="top">
    <!-- <div class="bg-layer"  ref="layer"></div> -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad()"
      class="van-clearfix"
    >
      <van-cell
        v-for="(song,index) in this.songslist"
        :key="index"
        :title="song.name"
        :border="false"
        size="large"
        :label="`${song.singer} ${song.album}`"
        @click="selectItem(song,index)"
      />
    </van-list>
  </div>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default: []
    },
        newTop: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      songslist: [],
      error: false,
      loading: false,
      finished: false
    };
  },
  computed:{
    top(){
      return `padding-top:${this.newTop}px`
    }
  },

  methods: {
    onLoad() {
      // 异步更新数据
      let gg = parseInt(this.songs.length / 10) * 10;
      let tt = this.songs.length % 10;
      let pre = this.songs.slice(0, gg);
      let next = this.songs.slice(-tt);
      setTimeout(() => {
        if (this.songslist.length != pre.length) {
          for (let i = 0; i < 10; i++) {
            this.songslist.push(pre[this.songslist.length]);
          }
        } else {
          this.songslist = this.songslist.concat(next);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.songslist.length >= this.songs.length) {
          this.finished = true;
        }
      }, 1000);
    },

    selectItem(item, index) {
      this.$emit("select", item, index);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable';
@import '../../common/stylus/mixin';

.song-list>>>.van-cell {
  background-color: rgba(0, 0, 0, 0);
  padding: 16px 31px 8px;
}

.song-list>>>.van-cell__title {
  color: $color-text;
}

.bg-layer {
  width: 100%;
  position: absolute;
  background: $color-background;
}
</style>