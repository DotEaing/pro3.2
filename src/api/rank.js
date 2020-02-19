import { getRANK_list, getDisc_list } from '../common/js/axios';
import { filterSinger } from "./song";

export const Toplist = []

export function get_RANK() {
    getRANK_list().then((res) => {
        if (res.code == 200) {
            let list = res.list
            list.forEach(t => {
                let obj = {
                    id: t.id,
                    name: t.name,
                    title: t.updateFrequency,
                    avatar: t.coverImgUrl,
                    topSong: []
                }
                getDiscDetail(t.id).then((t) => {
                    obj.topSong.push(...t)
                    // console.log(Toplist);
                })
                Toplist.push(obj)
            });
        }
    })
}



function getDiscDetail(id) {
    return new Promise((resolve, reject) => {
        getDisc_list(id).then(res => {

            if (res.code == 200) {
                let tt = res.playlist.tracks.splice(0, 3)
                let jj = []
                let obj
                tt.forEach((t) => {
                    obj = {
                        name: t.name,
                        singer: filterSinger(t.ar)
                    }
                    jj.push(obj)
                })
                resolve(jj);

            }
        })

    })
}