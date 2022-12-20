<template>
  <div>
    <ModalSmall
      :propsShowModal="true"
      :propsButtonText="`메인으로 가기`"
      :propsContentText="`준비 중인 페이지입니다.`"
      :propsLink="`/`"
    />
  </div>
</template>

<script setup lang="ts">
import ModalSmall from "@/components/modal/modalSmall.vue";
import {
  IsNumber,
  IsString,
  Min,
  validate,
  validateOrReject,
} from "class-validator";

class GameDto {
  @IsNumber()
  @Min(1)
  idx: number;
  @IsString()
  name: string;
}

const a = new GameDto();
a.idx = 1;
a.name = "2";

validate(a).then((errors) => {
  // errors is an array of validation errors
  if (errors.length > 0) {
    console.log("validation failed. errors: ", errors);
  } else {
    console.log("validation succeed");
  }
});

validateOrReject(a).catch((errors) => {
  console.log("Promise rejected (validation failed). Errors: ", errors);
});
console.log(a);
</script>

<style scoped></style>
