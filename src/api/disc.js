import { getDisc_list } from '../common/js/axios';

export const DiscSong = []


export function getDiscDetail(id) {
    return new Promise((resolve, reject) => {
        getDisc_list(id).then(res => {
            
            if (res.code == 200) {
                resolve(res);
            }
        })

    })
}