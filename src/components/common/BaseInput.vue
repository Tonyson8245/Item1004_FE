<!--  v-model 한글 인식 못하는 문제를 수정하기 위함 이걸로 input 대신해서 쓰면 -->

<template>
    <input v-bind:value="value" v-on:input="updateInput">
  </template>
<script lang="ts" setup>
    
const props = defineProps<{
    value: string;
}>();
const emit = defineEmits(["update:input"]);

function updateInput(event:Event) {
    const value = event.target as HTMLInputElement;
    const input = value.value;
    emit('update:input', input);
}



</script>
<style lang="">
    
</style>