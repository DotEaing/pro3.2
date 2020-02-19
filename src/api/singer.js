import { get_Hotsinger, getSOG_list } from "../common/js/axios";

export default class Singer {
    constructor({ id, name, avatar, musicSize, albumSize, score }) {
        this.id = id
        this.name = name
        this.avatar = `${avatar}?param=250y250`
        this.musicSize = musicSize,
            this.albumSize = albumSize,
            this.score = score
    }
}

export function createSinger(singerData) {
    return new Singer({
        id: singerData.id,
        name: singerData.name,
        avatar: singerData.picUrl,
        musicSize: singerData.musicSize,
        albumSize: singerData.albumSize,
        score: singerData.score
    })
}

export function get_singerList() {

    return new Promise((resolve, reject) => {
        get_Hotsinger().then(res => {
            if (res.code == 200) {
                resolve(res.list.artists);
            }
        })

    })
}


export function getSingerDetail(id) {
    return new Promise((resolve, reject) => {
        getSOG_list(id).then(res => {

            if (res.code == 200) {
                resolve(res);
            }
        })

    })
}