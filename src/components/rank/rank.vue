<template>
  <div class="rank">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="box" v-for="(item,index) in rank" :key="index" @click="selectRank(item)">
        <div class="title">
          <van-image width="100" height="100" :src="item.avatar" />
        </div>

        <div class="txt" >
          <span class="name">{{item.name}}</span>
          <div>
            <img src="./first.png" alt srcset />
            <!-- {{`${item.topSong[0].name}--${item.topSong[0].singer}`}} -->
          </div>
          <div>
            <img src="./second.png" alt />
            <!-- {{`${item.topSong[1]}`}} -->
          </div>
          <div>
            <img src="./third.png" alt />
            <!-- {{`${item.topSong[2]}`}} -->
          </div>
        </div>
      </div>
    </van-list>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { Toplist, get_RANK } from "../../api/rank";
import { getDiscDetail } from "../../api/disc";
import { filterSinger } from "../../api/song";
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      rank: [],
      error: false,
      loading: false,
      finished: false
    };
  },
  methods: {
    _get_RANK() {
      get_RANK();
    },
    // computed: {
    //   first() {
    //     return;
    //   },
    //   second() {},
    //   third() {}
    // },

    getTop() {
      Toplist.forEach(t => {
        getDiscDetail(t.id).then(res => {
          res.playlist.tracks.splice(0, 3).forEach(y => {
            let obj = {
              name: y.name,
              singer: filterSinger(y.ar)
            };
            
            Toplist.topSong.push(obj);
          });
        });
      });
    },

    onLoad() {
      // 异步更新数据
      let gg = parseInt(Toplist.length / 10) * 10;
      let tt = Toplist.length % 10;
      let pre = Toplist.slice(0, gg);
      let next = Toplist.slice(-tt);

      setTimeout(() => {
        if (this.rank.length != pre.length) {
          for (let i = 0; i < 10; i++) {
            this.rank.push(pre[this.rank.length]);
          }
        } else {
          this.rank = this.rank.concat(next);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.rank.length >= Toplist.length) {
          this.finished = true;
        }
      }, 1000);
    },
    selectRank(rank) {
      this.$router.push({
        path: `/rank/${rank.id}`
      });
      this.setRank(rank);
      this.setShow();
    },
    ...mapMutations({
      setRank: "SET_RANK",
      setShow: "SET_SHOW"
    })
  },
  created() {
    this._get_RANK();
    this.getTop();
    console.log(Toplist);
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/variable';

.rank {
  color: $color-theme;

  .box {
    background-color: $color-background-d;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 8px 15px;

    &:first-child {
      padding-top: 15px;
    }

    .title {
      margin: 0 12px;
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

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>