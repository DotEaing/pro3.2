<template>
  <div class="search">
    <van-search v-model="query" shape="round" background="#222" :placeholder="this.default" />

    <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query_con">
      <scroll class="shortcut" :data="shortcut" ref="shortcut">
        <div>
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
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showConfirm">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list :searches="searchHistory" @delete="deleteOne" @select="addQuery"></search-list>
          </div>
        </div>
      </scroll>
    </div>

    <div class="search-result" v-show="query_con" ref="searchResult">
      <suggest ref="suggest" :query="query_con" @select="saveSearch"></suggest>
    </div>
    <confirm ref="confirm" @confirm="clearSearchHistory" text="是否清空所有搜索历史" confirmBtnText="清空"></confirm>
  </div>
</template>

<script>
import { getSEACH_word, getSEACH_default } from "../../common/js/axios";
import { mapGetters, mapActions } from "vuex";
import { debounce } from "../../common/js/util";
import suggest from "../suggest/suggest";
import searchList from "../../base/search-list/search-list";
import confirm from "../../base/confirm/confirm";
import scroll from "../../base/scroll/scroll";
export default {
  components: { suggest, searchList, confirm, scroll },
  data() {
    return {
      query: "",
      query_con: "",
      default: "",
      hotKey: []
    };
  },
  computed: {
    shortcut() {
      return this.hotKey.concat(this.searchHistory);
    },
    ...mapGetters(["searchHistory"])
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
    },
    saveSearch() {
      this.saveSearchHistory(this.query);
    },
    deleteOne(item) {
      this.deleteSearchHistory(item);
    },
    deleteAll() {
      this.clearSearchHistory();
    },
    showConfirm() {
      this.$refs.confirm.show();
    },

    ...mapActions([
      "saveSearchHistory",
      "deleteSearchHistory",
      "clearSearchHistory"
    ])
  },

  watch: {
    query_con(newQuery) {
      if (!newQuery) {
        setTimeout(() => {
          this.$refs.shortcut.refresh();
        }, 20);
      }
    }
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