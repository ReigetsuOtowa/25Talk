// 下述TypeScript代码来自: https://github.com/yuzutalk/yuzutalk 的开源实现

import { reactive } from 'vue'
import { talkHistory } from './talkHistory'
import { selectList } from './selectList'

export const store = reactive({
    language: 'zh',
    theme: 'yuzutalk',
    fullScreen: false,

    typing: 0,
    text: '',
    insertId: -1,
    showPlayerDialog: false,
    showSettingDialog: false,
    storyKey: '10005',
    storyList: {} as { [key: string]: string[] },
    storyFile: '1000501',

    setData() {
        talkHistory.setData()
        selectList.setData()
        localStorage.setItem('language', JSON.stringify(this.language))
        localStorage.setItem('render-theme', JSON.stringify(this.theme))
        localStorage.setItem('full-screen', JSON.stringify(this.fullScreen))
    },
    getData() {
        talkHistory.getData()
        selectList.getData()
        const data = ['language', 'arona-apikey', 'arona-host', 'render-theme', 'draggable', 'full-screen']
            .map((x) => localStorage.getItem(x))
        this.language  = data[0] != null ? JSON.parse(data[0]) : 'zh'
        this.theme     = data[3] != null ? JSON.parse(data[3]) : 'yuzutalk'
        this.fullScreen = data[5] != null ? JSON.parse(data[5]) : false
    },
    resetData() {
        talkHistory.resetData()
        selectList.resetData()
        this.setData()
    }
})
