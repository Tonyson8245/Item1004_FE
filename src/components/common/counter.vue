<template>
  <div class="overflow-hidden w-full h-full">
    <div class="wrapper flex h-full">
      <button
        class="bg-everly-light_grey btn btn--minus rounded-l-lg text-everly-dark_grey"
        @click="
          changeCounter(-1);
          emit('getValue', counter);
        "
        type="button"
        name="button"
      >
        -
      </button>
      <div
        class="font-bold bg-everly-light_grey quantity flex-grow flex items-center justify-center"
      >
        <div>{{ props.qty }}</div>
      </div>
      <button
        class="bg-everly-light_grey btn btn--plus rounded-r-lg text-everly-dark_grey"
        @click="
          changeCounter(1);
          emit('getValue', counter);
        "
        type="button"
        name="button"
      >
        +
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const emit = defineEmits([`getValue`]);
const props = defineProps({
  qty: Number,
  maxQty: Number,
});

let counter = ref(1);
function changeCounter(num: number) {
  counter.value += num;

  !isNaN(counter.value) && counter.value > 1
    ? counter.value
    : (counter.value = 1);

  if (props.maxQty != undefined) {
    !isNaN(counter.value) && counter.value <= props.maxQty
      ? counter.value
      : (counter.value = props.maxQty);
  }
}
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}
/* For decoration only */
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  box-sizing: border-box;
}
/* Product Quantity */
.wrapper {
  display: flex;
}
.quantity {
  -webkit-appearance: none;
  border: none;
  text-align: center;
  width: 30px;

  color: #43484d;
}

.btn {
  width: 30px;
  cursor: pointer;
}
button:focus,
input:focus {
  outline: 0;
}
</style>
