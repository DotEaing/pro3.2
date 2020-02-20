<template>
  <scroll
    ref="suggest"
    class="suggest"
    :data="result"
    :pullup="pullup"
    :beforeScroll="beforeScroll"
    @scrollToEnd="searchMore"
    @beforeScroll="listScroll"
  >
    <ul class="suggest-list">
      <li
        @click="selectItem(item)"
        class="suggest-item"
        v-for="(item,index) in result"
        :key="index"
      >
        <div class="icon">
          <i class="icon-music"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from "../../base/scroll/scroll";
import Loading from "../../base/loading/loading";
import NoResult from "../../base/no-result/no-result";
// import { search } from "api/search";
import { ERR_OK } from "../../api/config";
import { createSong } from "../../api/song";
import { mapMutations, mapActions } from "vuex";
// import Singer from "common/js/singer";
import { getSEACH_con } from "../../common/js/axios";

const TYPE_SINGER = "singer";
const perpage = 20;

export default {
  props: {
    query: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      page: 0,
      pullup: true,
      beforeScroll: true,
      hasMore: true,
      result: []
    };
  },
  methods: {
    refresh() {
      this.$refs.suggest.refresh();
    },
    search(key) {
      this.page = 0;
      this.hasMore = true;
      this.$refs.suggest.scrollTo(0, 0);
      getSEACH_con(key, perpage, this.page, 1).then(res => {
        if (res.code === 200 && res.result.songCount > 0) {
          this.result = this._genResult(res);
        }
        this._checkMore(res);
      });
    },
    searchMore() {
      if (!this.hasMore) {
        return;
      }
      this.page += perpage;
      getSEACH_con(this.query, perpage, this.page, 1).then(res => {
        if (res.code === 200) {
          this.result = this.result.concat(this._genResult(res));
          this._checkMore(res);
        }
      });
    },
    listScroll() {
      this.$emit("listScroll");
    },

    selectItem(item) {
      this.insertSong(item);
      this.$emit("select", item);
    },

    getDisplayName(item) {
      return `${item.name}-${item.singer}`;
    },

    _genResult(data) {

      if (data.code == 200) {
        let ret = [];

        data.result.songs.forEach(t => {
          t.ar = t.artists;
          t.al = t.album;
          t.dt = t.duration;
          t.al.picUrl = t.album.artist.img1v1Url;
        });
        ret = ret.concat(this._normalizeSongs(data.result.songs));
        return ret;
      }
    },

    _normalizeSongs(list) {
      let ret = [];
      list.forEach(musicData => {
        if (musicData.id && musicData.al) {
          ret.push(createSong(musicData));
        }
      });

      return ret;
    },

    _checkMore(data) {
      const song = data.result.songs;
      if (data.result.songCount == 0) {
        this.result.length = 0;
        this.hasMore = false;
      }
      if (100 < this.result.length || this.result.length < 20) {
        this.hasMore = false;
      }
    },
    ...mapMutations({
      setSinger: "SET_SINGER"
    }),
    ...mapActions(["insertSong"])
  },

  watch: {
    query(newQuery) {
      this.result.length = 0;
      this.search(newQuery);
    }
  },
  components: {
    Scroll,
    Loading,
    NoResult
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/variable';
@import '../../common/stylus/mixin';

.suggest {
  height: 100%;
  overflow: hidden;

  .suggest-list {
    padding: 0 30px;

    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
    }

    .icon {
      flex: 0 0 30px;
      width: 30px;

      [class^='icon-'] {
        font-size: 14px;
        color: $color-text-d;
      }
    }

    .name {
      flex: 1;
      font-size: $font-size-medium;
      color: $color-text-d;
      overflow: hidden;

      .text {
        no-wrap();
      }
    }
  }

  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>