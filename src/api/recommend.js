import { getREC_Banner, getREC_List } from '../common/js/axios';

export const banners = []
export const songList = []

export function getREC_banners() {
    getREC_Banner().then(res => {
        res.banners.forEach(t => {
            let obj = {
                name: t.typeTitle,
                src: t.imageUrl
            }
            banners.push(obj)
        });
    })
}

export function getREC_SongList() {
    getREC_List().then(res => {
        if (res.code === 200) {
            res.playlists.forEach(t => {
                let obj = {
                    id: t.id,
                    name: t.name,
                    sm_src: `${t.coverImgUrl}?param=250y250`,
                    bg_src: `${t.coverImgUrl}?param=400y400`,
                    description: t.description,
                }
                songList.push(obj)
            })
        }
    })
}



