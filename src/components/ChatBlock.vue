<template>
    <span v-html="props.element.content" :data-flag="true"></span>
</template>

<script setup lang="ts">
const props = defineProps(['element'])
</script>
