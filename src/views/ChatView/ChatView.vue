<template>
    <main class="talk-wrapper">
        <!--聊天主界面-->
        <div class="talk-list" id="talkList">
            <chat-main :tasks="talkHistory.talkHistory" />
        </div>

        <div class="add" id="sendBar">
            <div class="input-bar">
                <!--指定发送对象-->
                <Popper placement="top">
                    <div class="sticker" id="sticker">
                        <div v-if="selected === 1" title="Send a Sticker">
                            <ProfileIcon class="icon profile" />
                        </div>
                        <div v-else-if="selected === 4">
                            <BellIcon class="heart bell" />
                        </div>
                        <div
                            v-else-if="typeof selected != 'number'"
                            style="padding: 0px; margin: 0px"
                            class="item"
                            title="Send a Sticker"
                        >
                            <img :src="selected.Avatar" />
                        </div>
                    </div>
                </Popper>

                <!--发送-->
                <textarea class="text" placeholder="Aa" v-model="store.text" id="textarea"></textarea>
                <div class="message" title="Send the Message">
                    <SendIcon @click="_text()" class="send icon"/>
                </div>
            </div>

            <div class="g-wrap">
                <div class="g-scroll">
                    <div class="g-content selected-student">
                        <!-- 身份选择 -->
                        <div class="item-sensei" @click="selectChar(1)">
                            <div title="send Sensei message">
                                <ProfileIcon class="icon profile" />
                            </div>
                        </div>
                        <div class="item-sensei" @click="selectChar(4)">
                            <div title="send System message">
                                <BellIcon class="heart bell" />
                            </div>
                        </div>

                        <div
                            class="item"
                            v-for="(student, index) in selectList.selectList"
                            :key="index"
                            @click="selectChar(student)"
                            title="Select the student"
                        >
                            <img :src="student.Avatar" />
                            <CloseIcon
                                class="delete-button"
                                @click="deleteStudent(student.Id)"
                                @click.stop=""
                                title="Remove from list"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import ProfileIcon from '@/components/icons/IconProfile.vue'
import SendIcon from '@/components/icons/IconSend.vue'
import CloseIcon from '@/components/icons/IconClose2.vue'
import BellIcon from '@/components/icons/IconBell.vue'
// ======================= Icon
import ChatMain from '@/components/ChatMain.vue'
import Popper from 'vue3-popper'
import { useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue'

import { baseStudent } from '@/assets/utils/interface'
import { getMessage } from '@/assets/utils/request'
import { store } from '@/assets/storeUtils/store'
import { talkHistory } from '@/assets/storeUtils/talkHistory'
import { selectList } from '@/assets/storeUtils/selectList'
import { sendText } from '@/assets/chatUtils/send'

const props = defineProps(['student'])
const emits = defineEmits(['deactive'])

const selected = ref<baseStudent | number>(1)

// 添加到尾部与插入到中间
const _text = ()=>{
    sendText(selected.value, store.text)
}

// 添加到列表
watch(props, (newProps) => {
    if (newProps.student) {
        selectList.pushStudent(newProps.student)
        selectChar(newProps.student)
    }
})
const selectChar = (student: baseStudent | number) => {
    selected.value = student
}

// 从列表删除
const deleteStudent = (id: number) => {
    emits('deactive')
    selectList.deleteStudent(id)
    selectChar(1)
}

onMounted(async () => {
    // 滚动 & 判断播放
    var scroll_to_bottom = document.getElementById('talkList') as HTMLElement
    scroll_to_bottom.scrollTop = scroll_to_bottom.scrollHeight
    const route = useRoute()
    let id = route.query.id as string
    if (id) {
        store.storyKey = id
        store.storyList = (await getMessage(store.storyKey, 'index')) as {}
        if (store.storyList) {
            if (!Object.keys(store.storyList).find((ele) => ele === store.storyFile))
                store.storyFile = Object.keys(store.storyList)[0]
            store.showPlayerDialog = true
        }
    }
    // 软换行
    var textarea = document.querySelector('textarea') as HTMLElement
    textarea.onkeydown = (e) => {
        if (!e.shiftKey && e.key === 'Enter') {
            e.preventDefault()
            _text()
        }
    }
})
</script>

<style scoped lang="scss">
@import './chat-view.scss';
@import '@/assets/css/icons.scss';

// 横向滚动，开源实现来自:https://codepen.io/Chokcoco/pen/PoRLpGO
$bar-height: calc($chatfooter-height/2);

.g-wrap {
    position: relative;
    margin: auto;
    width: 100%;
    height: $bar-height;
    cursor: pointer;
    background-color: white;
}

.g-scroll {
    position: absolute;
    left: -$bar-height;
    width: $bar-height;
    height: calc((var(--view-width) - $sider-width) / 2);
    transform-origin: 100% 0;
    transform: rotate(-90deg);
    overflow: scroll;
    overflow-x: hidden;
}

.g-content {
    position: absolute;
    top: 0;
    left: $bar-height;
    width: fit-content;
    height: $bar-height;
    padding: 10px;
    box-sizing: border-box;
    transform-origin: 0 0;
    box-sizing: border-box;
    transform: rotate(90deg);
}

/* hide scrollbar */
::-webkit-scrollbar {
    display: none;
}

::-webkit-scrollbar-button {
    display: none;
}

@import '@/assets/css/mobile.scss';
</style>
