<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="$route.meta.transition">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
  <!-- <div>
    <iframe
      src="https://service.dongledongle.com/everly"
      frameborder="0"
      width="100%"
      height="500"
    ></iframe>
  </div> -->
</template>
<script lang="ts" setup></script>

<style></style>
