<template >
    <div>
      <p>{{ time }}</p>
      <button @click="startTimer">Start Timer</button>
    </div>
</template>
<script lang="ts" setup>

import { ref } from 'vue';
const time = ref(0);

const startTimer = () => {
    const intervalId = setInterval(() => {
    time.value++;
    }, 1000);
    return () => clearInterval(intervalId);
};

</script>

<style>
    
</style>