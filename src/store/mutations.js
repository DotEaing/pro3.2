import * as types from './mutation-types';
import state from './state';

const mutations = {
    [types.SET_SINGER](state, singer) {
        state.singer = singer
    },
    [types.SET_DISC](state, disc) {
        state.disc = disc
    },
    [types.SET_RANK](state, rank) {
        state.rank = rank
    },
    [types.SET_SHOW](state) {
        state.show == 1 ? state.show = 0 : state.show = 1
    },
    [types.SET_PLAYING_STATE](state, flag) {
        state.playing = flag
    },
    [types.SET_FULL_SCREEN](state, flag) {
        state.fullScreen = flag
    },
    [types.SET_PLAYLIST](state, list) {
        state.playlist = list
    },
    [types.SET_SEQUENCE_LIST](state, list) {
        state.sequenceList = list
    },
    [types.SET_PLAY_MODE](state, mode) {
        state.mode = mode
    },
    [types.SET_CURRENT_INDEX](state, index) {
        state.currentIndex = index
    },
    [types.SET_SEARCH_HISTORY](state, histroy) {
        state.searchHistory = histroy
    }

}
export default mutations