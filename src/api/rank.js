import { getRANK_list } from '../common/js/axios';

export const Toplist = []

export function get_RANK() {
    getRANK_list().then((res) => {
        if (res.code == 200) {
            console.log(res.list);
            let list = res.list
            list.forEach(t => {
                
                let obj = {
                    id: t.id,
                    name: t.name,
                    title: t.updateFrequency,
                    avatar: t.coverImgUrl
                }
                Toplist.push(obj)
            });
        }
        console.log(Toplist);
        

    })
}