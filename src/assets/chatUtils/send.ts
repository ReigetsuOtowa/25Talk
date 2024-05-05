// 下述发送聊天的TypeScript代码来自: https://github.com/yuzutalk/yuzutalk 的开源实现

import { baseStudent, Talk } from '../utils/interface'
import { store } from '../storeUtils/store'
import { talkHistory } from '../storeUtils/talkHistory'
import { myReExp } from '../utils/markdown'

const re = new myReExp()

const sendText = (char: baseStudent | number, text: string, flag: number = 2) => {
    if (text.length === 0) return
    let name = ''
    let type = 0
    let avatar = ''

    if (typeof char === 'number') {
        if (char === 1) name = 'sensei'
        else if (char === 4) name = 'systemInfo'
        type = char
    } else {
        // 学生信息
        name = char.Name
        avatar = char.Avatar
        type = 0
    }

    const newTalk: Talk = {
        Id: talkHistory.talkId++,
        Name: name,
        Avatar: avatar,
        type: type,
        flag: flag,
        content: re.md2html(text)
    }
    talkHistory.pushTalk(newTalk)

    // 打字效果，并自动滚动屏幕至最下方
    store.text = ''
    store.typing = 1
    const scroll_to_bottom = document.getElementById('talkList') as HTMLElement
    const timer = setInterval(() => {
        if (store.typing === 1) {
            scroll_to_bottom.scrollTop = scroll_to_bottom.scrollHeight
        }
        if (store.typing < 0) {
            store.typing = 0
            scroll_to_bottom.scrollTop = scroll_to_bottom.scrollHeight
            clearInterval(timer)
        }
        store.typing -= 0.01
    }, 10)
}

export { sendText }
