<template>
  <div
    v-if="props.showModal"
    class="opacity-25 fixed inset-0 z-50 bg-black h-screen"
  ></div>
  <div class="cursor-pointer">
    <div
      v-if="props.showModal"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 justify-center items-center flex"
    >
      <div
        class="w-11/12 md:w-[666px] lg:w-[1000px] bg-white rounded-xl overflow-hidden"
      >
        <div
          class="bg-everly-main text-everly-white text-xl py-3 text-center lg:text-[28px] lg:py-5"
        >
          π€ μ κΉ μ΄ μ λ³΄κ° λ§λμ?
        </div>
        <div
          class="p-5 text-everly-dark_grey md:p-10 md:pb-5 lg:text-base lg:pt-9"
        >
          <div class="lg:text-center text-left">
            κ±°λ λ±λ‘ μ νμμ λ³΄ νμ΄μ§μ λ±λ‘λ ν΄λν° λ²νΈ, μ΄λ©μΌ μ£Όμλ₯Ό
            μ νν νμΈ ν μ΄μ©μ λΆν λλ¦½λλ€.
          </div>
          <div
            class="flex md:flex-row flex-col text-left py-3 whitespace-nowrap lg:px-40 lg:py-6"
          >
            <div class="none flex md:justify-center items-center w-full py-1">
              <img src="@/assets/icon/profile_grey.svg" class="pr-2" alt="" />
              <div>μ΄λ¦ : {{ storeUserInfo.name }}</div>
            </div>
            <div class="grow flex md:justify-center items-center w-full py-1">
              <img src="@/assets/icon/phone_grey.svg" class="pr-2" alt="" />
              <div>νΈλν°λ²νΈ : {{ storeUserInfo.phone }}</div>
            </div>
            <!-- TODO μμ¬λ²νΈ μΆκ°ν  λ λ£κΈ° -->
            <!-- <div class="none flex md:justify-center items-center w-full py-1">
              <img src="@/assets/icon/safephone_grey.svg" class="pr-2" alt="" />
              <div>μμ¬λ²νΈ μ¬μ© μ€</div>
            </div> -->
          </div>
          <hr class="h-px bg-everly-drak_grey border-px" />
          <div
            class="h-[120px] overflow-y-scroll md:h-auto md:overflow-y-hidden py-3 bg-everly-light_grey md:bg-white px-1 md:py-8"
          >
            λ¬Όνμ λ΄μ©, κ±°λ, κ²°μ  λ± κ΄λ ¨λ λͺ¨λ  μ±μ(λ―Ό.νμ¬μ)μ νλ§€μ λλ
            κ΅¬λ§€μμκ² μμ΅λλ€. <br /><br />2015λ 3μ 9μΌλΆν° νλ§€ μ κ΅­μΈμ²­
            κ³ μ (νλ§€λν λλ μ€κ°λ₯Ό νλ λΆκ°ν΅μ μ¬μμκ° μ§μΌμΌ ν  μ¬ν­)μ
            <br class="hidden lg:block" />
            μκ±°νμ¬ νλ§€μμ ν΄λν° λ²νΈμ μ΄λ©μΌ μ£Όμκ° μ κ³ λ©λλ€.
            <br /><br />λ¬Όνμ κ²°μ νκ±°λ, κ²°μ μ  λ¬Έμμ¬ν­μ μ§μ  μ±νμ ν΅ν΄
            λνκ° κ°λ₯ν©λλ€.
          </div>
        </div>
        <div
          class="flex gap-3 text-center text-everly-white pt-0 p-2 lg:p-10 lg:pt-0 lg:text-xl"
        >
          <div
            class="flex-1 rounded-lg py-2 bg-everly-mid_grey cursor-pointer"
            @click="emit('select', `cancel`)"
          >
            μ·¨μ
          </div>
          <div
            class="flex-1 rounded-lg py-2 bg-everly-main cursor-pointer"
            @click="
              create();
              emit('select', `comfirm`);
            "
          >
            νμΈμλ£
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useauthStore } from "@/store/modules/auth/authStore";
import { useWriteStore } from "@/store/modules/home/writeStore";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { usemypageStore } from "@/store/modules/mypage/mypageStore";
import { isEmpty } from "class-validator";

const emit = defineEmits(["select"]);
const props = defineProps({
  showModal: Boolean,
  postType: String,
});
const writeStore = useWriteStore();
const route = useRoute();

function create() {
  var idx = route.query.postId;

  if (props.postType != undefined) {
    if (route.meta.name == "edit") {
      if (!isEmpty(idx?.toString()) && idx != null)
        writeStore.editPost(props.postType, idx.toString());
    } else writeStore.createPost(props.postType);
  }
}

//μ μ  μ λ³΄ κ°μ Έμ€κΈ°
const mypageStore = usemypageStore();
const { storeUserInfo } = storeToRefs(mypageStore);
</script>
<style scoped></style>
