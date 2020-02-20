<template>
  <div class="search">
    <van-search v-model="query" shape="round" background="#222" :placeholder="this.default" />

    <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query_con">
      <div class="shortcut">
        <div class="hot-key">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li
              @click="addQuery(item.first)"
              class="item"
              v-for="(item,index) in hotKey"
              :key="index"
            >
              <span>{{item.first}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="search-result" v-show="query_con" ref="searchResult">
      <suggest ref="suggest" :query="query_con"></suggest>
    </div>
  </div>
</template>

<script>
import { getSEACH_word, getSEACH_default } from "../../common/js/axios";
import { debounce } from "../../common/js/util";
import suggest from "../suggest/suggest";
export default {
  components: { suggest },
  data() {
    return {
      query: "",
      query_con: "",
      default: "",
      hotKey: []
    };
  },

  methods: {
    _getSEACH_word() {
      getSEACH_word().then(res => {
        res.result.hots.forEach(t => {
          this.hotKey.push(t);
        });
      });
    },
    _getSEACH_default() {
      getSEACH_default().then(res => {
        if (res.code == 200) {
          this.default = res.data.showKeyword;
        }
      });
    },

    addQuery(key) {
      this.query = key;
    },

    change_query_con(key) {
      this.query_con = key;
    }
  },

  watch: {
    query(newQuery) {}
  },
  created() {
    this._getSEACH_word();
    this._getSEACH_default();

    this.$watch(
      "query",
      debounce(newQuery => {
        this.change_query_con(newQuery);
      }, 200)
    );
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/variable';
@import '../../common/stylus/mixin';

.search {
  .search-box-wrapper {
    margin: 20px;
  }

  .shortcut-wrapper {
    position: fixed;
    top: 178px;
    bottom: 0;
    width: 100%;

    .shortcut {
      height: 100%;
      overflow: hidden;

      .hot-key {
        margin: 0 10px 20px 20px;

        .title {
          margin-bottom: 20px;
          font-size: $font-size-medium;
          color: $color-text-l;
        }

        .item {
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          background: $color-highlight-background;
          font-size: $font-size-small;
          color: $color-text-d;
        }
      }

      .search-history {
        position: relative;
        margin: 0 20px;

        .title {
          display: flex;
          align-items: center;
          height: 40px;
          font-size: $font-size-medium;
          color: $color-text-l;

          .text {
            flex: 1;
          }

          .clear {
            extend-click();

            .icon-clear {
              font-size: $font-size-medium;
              color: $color-text-d;
            }
          }
        }
      }
    }
  }

  .search-result {
    position: fixed;
    width: 100%;
    top: 178px;
    bottom: 0;
  }
}
</style>