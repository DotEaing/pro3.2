
import { getSOG_url, getSOG_lyric } from "../common/js/axios";

export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id
    // this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = `${image} ? param = 250y250`
    this.url = url
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.code === 200) {
          this.lyric = res.lrc.lyric
          resolve(this.lyric)
        }
        else {
          reject('no lyric')
        }
      })
    })
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.id,
    // mid: musicData.songmid,
    singer: filterSinger(musicData.ar),
    name: musicData.name,
    album: musicData.al.name,
    duration: musicData.dt / 1000,
    image: musicData.al.picUrl,
    url: get_songUrl(musicData.id)
  })
}


 function get_songUrl(id) {
  let tt = []
  getSOG_url(id).then(res => {
    if (res.code == 200) {
      res.data.forEach(t => {
        tt.push(t.url)
      })
    }
  })
  return tt;
}

export function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}

