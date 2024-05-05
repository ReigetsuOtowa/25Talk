<script setup lang="ts">
import SettingIcon from './components/icons/IconSetting.vue'
import StudentIcon from './components/icons/IconStudent.vue'
import MessageIcon from './components/icons/IconMessage.vue'
import ListIcon from './components/icons/IconList.vue'
import ResetIcon from './components/icons/IconReset.vue'
</script>

<template>
    <div id="root">
        <!--顶栏-->
        <div id="header">
            <!--顶栏左侧内容-->
            <div id="header__left">
                <!--<MomoIcon class="icon momo" />-->
                <span id="header__title">25Talk</span>
                <RouterLink to="/help" title="Help">
                    <button class="help">?</button>
                </RouterLink>
            </div>

            <!--顶栏右侧内容-->
            <div id="header__right">
                <SettingIcon class="icon setting"/>
            </div>
        </div>

        <!--侧边栏-->
        <div id="sidebar">
            <!--侧边栏上侧内容-->
            <div id="sidebar__up">
                <RouterLink to="/" title="Info">
                    <StudentIcon class="icon info" />
                </RouterLink>
                <RouterLink to="/chat" @click="deactiveStudent" title="Chat">
                    <MessageIcon class="icon message" />
                </RouterLink>
            </div>

            <!--侧边栏下侧内容-->
            <div id="sidebar__down">
                <div style="cursor: pointer" @click="store.resetData()" title="Reset">
                    <ResetIcon class="icon reset" />
                </div>
            </div>
        </div>

        <!--学生列表卡片-->
        <div id="listcard">
            <!--学生列表头部功能，暂时不实现-->
            <div id="listcard__header">
                <div class="search-group">
                    <input
                        type="text"
                        placeholder="Type / to search"
                        class="search-group__text"
                        v-model="searchText"
                        id="searchBox"
                    />
                </div>
                <div
                    class="student-list__button"
                    @click="switchStudentList"
                    title="Switch Student List"
                >
                    <ListIcon class="icon list" />
                </div>
            </div>
            <!--学生列表主体-->
            <div id="listbody">
                <div
                    class="list-item"
                    v-for="(item, index) in dataDisplay"
                    :key="index"
                    :class="{ active: item === studentSelected }"
                    @click="selectStudent(item)"
                >
                    <!--学生头像-->
                    <div class="list-item__avatar">
                        <img v-lazy="item.Avatars[item.cnt]" />
                    </div>
                    <!--学生姓名-->
                    <span class="list-item__name">{{ item.Name }}</span>
                    <!--学生简介-->
                    <span class="list-item__bio">{{ item.Bio }}</span>
                </div>
            </div>
        </div>

        <!--右栏信息-->
        <RouterView id="chatcard" @deactive="deactiveStudent()" :studentInfo="studentSelected" :student="student"/>
    </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { baseStudent, studentInfo } from '@/assets/utils/interface'
import { getStudents } from '@/assets/utils/request'
import { store } from '@/assets/storeUtils/store'
import { talkHistory } from '@/assets/storeUtils/talkHistory'
import { search } from './assets/utils/search'

store.getData()

// 获取学生数据
const database = ref<studentInfo[][]>(await getStudents(store.language))
const dataDisplayIndex = ref<number>(0)
const dataDisplay = ref<studentInfo[]>(database.value[dataDisplayIndex.value])
watch(dataDisplayIndex, async (flag: number) => {
    dataDisplay.value = database.value[flag]
})
const switchStudentList = () => {
    dataDisplayIndex.value = (dataDisplayIndex.value + 1) % database.value.length
    searchText.value = ''
    searchSchool.value = ''
    deactiveStudent()
}

// 搜索过滤
const searchText = ref<string>('')
const searchSchool = ref<string>('')
watch(
    () => [searchText.value, searchSchool.value],
    () => {
        dataDisplay.value = search(
            database.value[dataDisplayIndex.value],
            searchText.value,
            searchSchool.value
        )
        deactiveStudent()
    }
)

// 列表项
const studentSelected = ref<studentInfo | null>(null)
const student = ref<baseStudent | null>(null)
const selectStudent = (item: studentInfo) => {
    studentSelected.value = item
    student.value = {
        Id: studentSelected.value.Id,
        Name: studentSelected.value.Name,
        Avatar: studentSelected.value.Avatars[studentSelected.value.cnt]
    }
}
const deactiveStudent = () => {
    student.value = null
}

// 快捷键
document.onkeyup = (e) => {
    // 在输入框中不激活快捷键
    if (e.key === '/' && document.activeElement?.id !== 'textarea') {
        var box = document.getElementById('searchBox') as HTMLInputElement
        box.focus()
    }
    if (e.ctrlKey && e.key === 'z') {
        e.preventDefault()
        talkHistory.undo()
    }
    if (e.ctrlKey && e.shiftKey && e.key === 'Z') {
        e.preventDefault()
        talkHistory.redo()
    }
}
</script>

<style scoped lang="scss">
@import './app.scss';
@import '@/assets/css/icons.scss';
@import '@/assets/css/mobile.scss';
</style>
