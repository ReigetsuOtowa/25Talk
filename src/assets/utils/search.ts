import { studentInfo } from './interface'

const search = (data: studentInfo[], key: string, filter: string) => {
    //搜索实现来自:https://www.cnblogs.com/caozhenfei/p/14882122.html

    let reg_text = new RegExp(
        key
            .toLowerCase()
            .trim()
    )

    return data.filter((item) => {
        // 进行搜索部分匹配
        if (reg_text.test(item.Name.toLowerCase())) return item
        for (let nickname of item.Nickname) {
            if (reg_text.test(nickname.toLowerCase())) return item
        }
    })
}

export { search }
