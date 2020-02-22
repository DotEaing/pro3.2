import { playMode } from '../common/js/config';
import { loadSearch } from '../common/js/cache';

const state = {
    show: 1,
    singer: {},
    disc: {},
    rank: {},
    playing: false,//正在播放
    fullScreen: false,//全屏
    playlist: [],//播放列表
    sequenceList: [],//顺序列表
    mode: playMode.sequence,//播放模式
    currentIndex: -1,//播放索引
    searchHistory: loadSearch() //调用本地存储
}

export default state