<template>
  <div class="flex items-center w-full">
    <img src="@/assets/icon/check_circle.svg" alt="" class="pr-2 w-5 h-5" />
    <div class="text-xs flex-1">{{ text }}</div>
    <img
      src="@/assets/icon/arrow_right.svg"
      alt=""
      class="pr-2"
      @click="moveToLink(link)"
    />
  </div>
</template>

<script lang="ts">
export default {
  props: ["data"],
  setup(props) {
    const text = props.data.text;
    const link = props.data.link;

    const moveToLink = (link: string) => {
      console.log(link + "로 이동");
    };

    return { text, link, moveToLink };
  },
};
</script>

<style scoped></style>
