<template>
  <div class="disc">
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
    title() {
      return this.disc.name;
    },
    bgImage() {
      return this.disc.src;
    },
    ...mapGetters(["disc"])
  },
  data() {
    return {
      Songs: [],
      SingerMessage: []
    };
  },
  methods: {
    _getDiscDetail() {
      if (!this.disc.id) {
        this.$router.push("/recommend");
      } else {
        getDiscDetail(this.disc.id).then(res => {
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
  created(){
      this._getDiscDetail()
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable';

.disc {
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $color-background;
}
</style>