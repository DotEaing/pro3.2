 <template>
  <div>
    <div class="music-list">
      <van-nav-bar :title="title" left-arrow @click-left="back" fixed />
      <div class="bg-image" :style="bgStyle" ref="bgImage">
        <div class="play-wrapper">
          <div ref="playBtn" v-show="songs.length>0" class="play" @click="random">
            <i class="icon-play"></i>
            <span class="text">随机播放全部</span>
          </div>
        </div>
        <div class="filter" ref="filter"></div>
      </div>

      <div class="bg-layer" ref="layer" :style="top"></div>
      <div class="song-list-wrapper" ref="SLwrapper" :style="sreen_Height"></div>
      <SongList
        class="SongList"
        :songs="songs"
        :rank="rank"
        @select="selectItem"
        :newTop="this.imageHeight"
        ref="list"
      ></SongList>
    </div>
  </div>
</template>

<script>
import SongList from "../../base/song-list/song-list";
import { mapActions, mapMutations, mapGetters } from "vuex";
import { prefixStyle } from "../../common/js/dom";
const RESERVED_HEIGHT = 40;
const transform = prefixStyle("transform");
// const backdrop = prefixStyle("backdrop-filter");
export default {
  props: {
    bgImage: {
      type: String,
      default: ""
    },
    songs: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ""
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  components: { SongList },
  data() {
    return {
      scrollY: 0,
      imageHeight: 0
    };
  },
  methods: {
    back() {
      this.$router.back();
      this.setShow();
    },
    selectItem(item, index) {
      this.selectPlay({
        list: this.songs,
        index
      });
    },
    random() {
      this.randomPlay({
        list: this.songs
      });
    },
    scroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      this.scrollY = scrollTop;

      
    },

    ...mapActions(["selectPlay", "randomPlay"]),
    ...mapMutations({ setShow: "SET_SHOW" })
  },

  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`;
    },
    top() {
      return `top:${this.imageHeight}px`;
    },
    sreen_Height() {
      return `height:${window.screen.height}px ; top:${this.imageHeight}px`;
    },
    ...mapGetters(["show"])
  },

  watch: {
    scrollY(newVal) {
      let zIndex = 0;
      let translateY = Math.min(-this.minTransalteY, newVal);
      console.log(translateY);
      
      this.$refs.SLwrapper.style[
        transform
      ] =  `translate3d(0px,${-newVal}px,0px)`; //  不放在watch而饭在methods中会持续报错=>'style'undefined

      if (newVal > -this.minTransalteY) {
        zIndex = 10;
        this.$refs.bgImage.style.paddingTop = 0;
        this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`;
        this.$refs.playBtn.style.display = "none";
      } else {
        this.$refs.bgImage.style.paddingTop = "80%";
        this.$refs.bgImage.style.height = 0;
        this.$refs.playBtn.style.display = "";
      }
 
      this.$refs.bgImage.style.zIndex = zIndex;
    }
  },

  mounted() {
    window.addEventListener("scroll", this.scroll);

    this.imageHeight = this.$refs.bgImage.clientHeight;
    this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT;
    // this.$refs.list.$el.style.top = `${this.imageHeight}px`;
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/variable';
@import '../../common/stylus/mixin';

.music-list>>>.van-nav-bar {
  background-color: rgba(0, 0, 0, 0);
}

.music-list>>>.van-icon {
  color: $color-theme;
}

.music-list>>>.van-nav-bar__title {
  color: $color-text;
}

.music-list>>> [class*=van-hairline]::after {
  border: 0;
}

.music-list>>> .van-cell__label {
  font-size: 12px;
}

.music-list {
  position: relative;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background-height;

  .van-nav-bar {
    z-index: 50;
  }

  .bg-image {
    position: fixed;
    width: 100%;
    height: 0;
    padding-top: 80%;
    transform-origin: top;
    background-size: cover;

    .play-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 50;
      width: 100%;

      .play {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;

        .icon-play {
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: $font-size-medium-x;
        }

        .text {
          display: inline-block;
          vertical-align: middle;
          font-size: $font-size-small;
        }
      }
    }

    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }

  .bg-layer {
    position: absolute;
    width: 100%;
  }

  .song-list-wrapper {
    position: fixed;
    width: 100%;
    background: $color-background;
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>