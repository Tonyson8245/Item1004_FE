<template>
  <router-view v-slot="{ Component }">
    <transition :name="$route.meta.transition">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
<script lang="ts" setup></script>
<style>
/* .slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}

.slide-right-leave-from {
  right: 0%;
}
.slide-right-leave-to {
  right: 100%;
}
/*  */
/* .slide-left-enter-active,
.slide-left-leave-active {
  position: absolute;
  transition: all 0.3s ease;
}
.slide-left-enter-from {
  right: 100%;
}
.slide-left-enter-to {
  right: 0px;
}  */
</style>
