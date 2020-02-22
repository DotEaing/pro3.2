
import { getSOG_url, getSOG_lyric, getAL_mag } from "../common/js/axios";

export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getSOG_lyric(this.id).then((res) => {
        if (res.code === 200 && !res.nolyric) {
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
    mid: musicData.al.id,
    singer: filterSinger(musicData.ar),
    name: musicData.name,
    album: musicData.al.name,
    duration: musicData.dt / 1000,
    image: getAL_face(musicData.al.id),
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

function getAL_face(mid) {
  let tt = []
  getAL_mag(mid).then((res) => {

    if (res.code == 200) {
      tt.push(res.album.picUrl)
    }
  })
  return tt;
}