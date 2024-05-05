<script setup lang="ts">
import TypingAnimation from '@/components/TypingAnimation.vue'
import ChatBlock from './ChatBlock.vue'
</script>

<template>
    <div>
        <template>
            <draggable :list="tasks" :group="{ name: 'g1' }" item-key="id" :disabled="true">
                <template #item="{ element }">
                    <div
                        :class="{
                            student: element.type === 0,
                            sensei: element.type === 1,
                            message: element.type === 4,

                            first: element.type <= 1 && element.flag > 0
                        }"
                    >
                        <!-- 学生信息 -->
                        <div class="avatar" v-if="element.type === 0 && element.flag > 0">
                            <img :src="element.Avatar" />
                        </div>
                        <div
                            class="name"
                            v-if="element.type === 0 && element.flag > 0"
                        >
                            {{ element.Name }}
                        </div>

                        <div class="container">
                            <!-- 系统通知 -->
                            <div class="box-message" v-if="element.type === 4">
                                <div class="content">
                                    <chat-block :element="element"/>
                                </div>
                            </div>

                            <!-- 文本消息 -->
                            <div class="box" v-else>
                                <typing-animation
                                    class="loading"
                                    v-if="store.typing > 0 && element.Id === talkHistory.talkId - 1"
                                ></typing-animation>
                                <chat-block v-else :element="element"/>
                            </div>
                        </div>
                    </div>
                </template>
            </draggable>
        </template>
    </div>
</template>


<script lang="ts">
import { store } from '@/assets/storeUtils/store'
import { talkHistory } from '@/assets/storeUtils/talkHistory'

export default {
    props: {
        tasks: {
            required: true,
            type: Array
        }
    },
    components: {
    TypingAnimation,
    ChatBlock
}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/chat-draggable.scss';
</style>
