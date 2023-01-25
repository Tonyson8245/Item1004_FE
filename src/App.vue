<template>
  <div :class="lock">
    <modalNotify
      :propsShowModal="showNotify"
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
import { useCookie } from "vue-cookie-next";
const { getCookie } = useCookie();

const componentStore = useComponentStore();
const { scrollLock } = storeToRefs(componentStore);
const lock = ref("");

const showNotify = ref(true);
//초기 상태
if (getCookie("noti") == "stop") {
  showNotify.value = false;
  lock.value = "";
} else {
  showNotify.value = true;
  lock.value = "h-screen overflow-hidden";
}

watch(scrollLock, () => {
  if (scrollLock.value) lock.value = "h-screen overflow-hidden";
  else lock.value = "";
});

function toggle(value: boolean) {
  showNotify.value = value;
  lock.value = "";
}
</script>

<style></style>
