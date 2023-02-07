<template>
  <metainfo></metainfo>
  <div :class="lock">
    <modalNotify
      :propsShowModal="storeshowNotify"
      @update:propsShowModal="toggle($event)"
    />
    <router-view v-slot="{ Component }">
      <transition name="$route.meta.transition">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
<script lang="ts" setup>
import modalNotify from "@/components/modal/modalNotify.vue";
import { ref, watch } from "vue";
import { useComponentStore } from "./store/modules/common/componentStore";
import { storeToRefs } from "pinia";

const componentStore = useComponentStore();
const { scrollLock } = storeToRefs(componentStore);
const lock = ref("");

const { storeshowNotify } = storeToRefs(componentStore);

watch(scrollLock, () => {
  if (scrollLock.value) lock.value = "h-screen overflow-hidden";
  else lock.value = "";
});

function toggle(value: boolean) {
  componentStore.setstoreshowNotify(value);
  lock.value = "";
}

// var accessToken = localStorage.getItem("accessToken");
// console.log(accessToken);

//로그 없애기
const MODE = import.meta.env.MODE;
console.log(MODE);

if (MODE == "production") {
  console.log = function () {};
  console.error = function () {};
  console.warn = function () {};
  console.debug = function () {};
}
</script>

<style></style>
