<template>
  <div class="rank">
    <music-list :title="title" :bg-image="bgImage" :songs="Songs"></music-list>
  </div>
</template>

<script>
import MusicList from "../music-list/music-list";
import { mapGetters, mapMutations } from "vuex";
import { DiscSong, getDiscDetail } from "../../api/disc";
import { createSong } from "../../api/song";
export default {
  components: { MusicList },
  computed: {
    id() {
      return this.rank.id;
    },
    title() {
      return this.rank.name;
    },
    bgImage() {
      return this.rank.avatar;
    },
    ...mapGetters(["rank"])
  },
  data() {
    return {
      Songs: [],
      SingerMessage: []
    };
  },
  methods: {
    _getDiscDetail() {
      if (!this.id) {
        this.$router.push("/rank");
      } else {
        getDiscDetail(this.id).then(res => {
          for (var tt of this._normalizeSong(res.playlist.tracks)) {
            this.Songs.push(tt);
          }
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
    this._getDiscDetail();
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable';

.rank {
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $color-background;
}
</style>