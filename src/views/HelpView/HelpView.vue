<template>
    <v-md-preview :text="text"></v-md-preview>
</template>

<script lang="ts">
export default {
    data() {
        return {
            text: '待替换为HTML',
        };
    },
};
</script>
  