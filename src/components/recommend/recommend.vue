<template>
  <div class="recommend">
    <div>
      <div>
        <van-swipe :autoplay="4000" indicator-color="#ffcd32">
          <van-swipe-item v-for="(image, index) in banners_con" :key="index">
            <img :src="image.src" v-lazy="image" height="180px" width="100%" />
          </van-swipe-item>
        </van-swipe>
      </div>

      <div class="recommend-list">
        <h1 class="list-title">热门流行歌单推荐</h1>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div v-for="(items,index) of songslist" :key="index" class="item" @click="tt(items.id)">
            <div class="icon">
              <van-image width="70" height="70" fit="cover" lazy-load :src="items.sm_src" />
            </div>
            <div class="text">
              <h2 class="name" v-html="items.name"></h2>
              <p class="desc van-multi-ellipsis--l2" v-html="items.description"></p>
            </div>
          </div>
        </van-list>
      </div>

      <!-- <transition name="slide">
      <router-view class="long"></router-view>
      </transition>-->
    </div>
  </div>
</template>

<script>
import {
  banners,
  songList,
  getREC_banners,
  getREC_SongList
} from "../../api/recommend";
export default {
  data() {
    return {
      banners_con: [],
      songslist: [],
      error: false,
      loading: false,
      finished: false
    };
  },
  methods: {
    // 获得轮播
    _getREC_banners() {
      getREC_banners();
      this.banners_con = banners;
    },
    // 获得歌单
    _getREM_SongList() {
      getREC_SongList();
    },

    onLoad() {
      // 异步更新数据
      let gg = parseInt(songList.length / 10) * 10;
      let tt = songList.length % 10;
      let pre = songList.slice(0, gg);
      let next = songList.slice(-tt);

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
        if (this.songslist.length >= songList.length) {
          this.finished = true;
        }
      }, 1000);
    }
  },
  created() {
    this._getREC_banners();
    this._getREM_SongList();
  },
  mounted() {}
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable';

.recommend >>> .van-cell {
  background: #222;
  padding: 0px 0px;
}

.recommend {
  background-color $color-background-d
  .recommend-list {
    .list-title {
      height: 65px;
      line-height: 65px;
      text-align: center;
      font-size: $font-size-medium;
      color: $color-theme;
    }

    .item {
      display: flex;
      box-sizing: border-box;
      align-items: center;
      padding: 0 20px 20px 20px;

      .icon {
        flex: 0 0 60px;
        width: 60px;
        padding-right: 20px;
      }

      .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        line-height: 20px;
        overflow: hidden;
        font-size: $font-size-medium;

        .name {
          margin-bottom: 10px;
          color: $color-text;
        }

        .desc {
          color: $color-text-d;
          font-size: $font-size-small;
        }
      }
    }
  }
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>