import axios from "axios"

// 推荐页面

// 轮播图
export function getREC_Banner() {
  return new Promise((resolve, reject) => {
    axios.get('/banner', { param: { type: 2 } }).then(res => {
      resolve(res.data);
    })
  })
}

// 获得华语热门歌单
export function getREC_List(pno) {
  return new Promise((resolve, reject) => {
    axios.get('/top/playlist', { params: { limit: pno, order: "hot", cat: "流行" } }).then(res => {
      resolve(res.data);
    })
  })
}

// 获取歌单列表
export function getRED_sogList(id) {
  return new Promise((resolve, reject) => {
    axios.get("/playlist/detail", { params: { id: id } }).then(res => {
      resolve(res.data);
    })
  })
}


// 热门歌手
export function get_Hotsinger() {
  return new Promise((resolve, reject) => {
    axios.get("/toplist/artist").then(res => {
      resolve(res.data);
    })
  })
}

// 歌手歌曲
export function getSOG_list(id) {
  return new Promise((resolve, reject) => {
    axios.get('/artists', { params: { id: id } }).then(res => {
      resolve(res.data);
    })
  })
}

// 查询url
export function getSOG_url(id) {
  return new Promise((resolve, reject) => {
    axios.get('/song/url', { params: { id: id } }).then(res => {
      resolve(res.data);
    })
  })
}
// 获得所有排行榜

export function getRANK_list() {
  return new Promise((resolve, reject) => {
    axios.get('/toplist').then(res => {
      resolve(res.data);
    })
  })
}

// 获得歌词
export function getSOG_lyric(id) {
  return new Promise((resolve, reject) => {
    axios.get('/lyric', { params: { id: id } }).then(res => {
      resolve(res.data);
    })
  })
}

// 获得歌单
export function getDisc_list(id) {
  return new Promise((resolve, reject) => {
    axios.get('/playlist/detail', { params: { id: id } }).then(res => {
      resolve(res.data);
    })
  })
}