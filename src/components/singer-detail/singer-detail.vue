<template>
  <div class="singer-detail">
    <music-list :songs="hotSongs" :bg-image="bgImage" :title="title"></music-list>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { SingerSong, getSingerDetail } from "../../api/singer";
import { createSong } from "../../api/song";
import MusicList from "../music-list/music-list";
export default {
  data() {
    return {
      hotSongs: [],
      SingerMessage: []
    };
  },

  components: { MusicList },
  computed: {
    title() {
      return this.singer.name;
    },
    bgImage() {
      return this.singer.avatar;
    },
       ...mapGetters([
        'singer',
      ])
  },
  methods: {
    _getSingerDetail() {
      if (!this.singer.id) {
        this.$router.push("/singer");
      } else {
        getSingerDetail(this.singer.id).then(res => {
          for (var tt of this._normalizeSong(res.hotSongs)) {
            this.hotSongs.push(tt);
          };
          
        });
      }
    },

    _normalizeSong(list) {
      let ret = [];
      list.forEach(item => {
        let musicData = item;
        ret.push(createSong(musicData));
      });
      return ret;
    }
  },
  created() {
    this._getSingerDetail();
  },
  mounted() {}
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable';

.singer-detail {
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $color-background;
}
</style>
