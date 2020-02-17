<template>
  <div class="singer">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="box" v-for="(item,index) in singerList_con" :key="index" @click="selectSinger">
        <div class="title">
          <i>{{index+1}}</i>
        </div>

        <van-image width="100" height="100" :src="item.avatar" />

        <div class="txt">
          <span class="name">{{item.name}}</span>
          <div>
            <img src="./music.png" alt srcset />
            {{`音乐数：${item.musicSize}`}}
          </div>
          <div>
            <img src="./cd.png" alt />
            {{`专辑数：${item.albumSize}`}}
          </div>
          <div>
            <img src="./fire.png" alt />
            {{`热度：${item.score}`}}
          </div>
        </div>
      </div>
    </van-list>

   
      <router-view class="son"></router-view>
  
  </div>
</template>

<script>
import { get_singerList, createSinger } from "../../api/singer";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      singer_con: [],
      singerList: [],
      singerList_con: [],
      error: false,
      loading: false,
      finished: false
    };
  },
  methods: {
    _get_singerList() {
      get_singerList().then(singerData => {

        singerData.forEach(t => {
          let singer = createSinger(t);
          this.singerList.push(singer);
        });
      });
    },

    onLoad() {
      // 异步更新数据
      let gg = parseInt(this.singerList.length / 10) * 10;
      let tt = this.singerList.length % 10;
      let pre = this.singerList.slice(0, gg);
      let next = this.singerList.slice(-tt);

      setTimeout(() => {
        if (this.singerList_con.length != pre.length) {
          for (let i = 0; i < 10; i++) {
            this.singerList_con.push(pre[this.singerList_con.length]);
          }
        } else {
          this.songslist = this.singerList_con.concat(next);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.singerList_con.length >= this.singerList.length) {
          this.finished = true;
        }
      }, 1000);
    },

    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      });
      this.setSinger(singer);
    },
    ...mapMutations({
      setSinger: "SET_SINGER"
    })
  },
  created() {
    this._get_singerList();
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/variable';

.singer {
  color: $color-theme;

  .box {
    background-color: $color-background-d;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 8px 15px;

    &:first-child {
      padding-top: 15px;
    }

    .title {
      text-align: center;
      width: 40px;

      i {
        font-size: 30px;
      }
    }

    .txt {
      .name {
        font-size: 16px;
        padding-bottom: 15px;
        display: block;
      }

      div {
        padding-bottom: 5px;
        color: $color-text-l;
        font-size: 10px;

        img {
          width: 15px;
        }
      }
    }
  }


}
</style>

<style scoped lang="stylus">

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter-to, .slide-leave {

  transform: translate3d(100%, 0, 0);
}
.son {
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $color-background;
}

</style>