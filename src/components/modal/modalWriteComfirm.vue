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
          🤚 잠깐 이 정보가 맞나요?
        </div>
        <div
          class="p-5 text-everly-dark_grey md:p-14 md:pb-5 lg:text-base lg:pt-9"
        >
          <div class="lg:text-center text-left">
            거래 등록 시 회원정보 페이지에 등록된 휴대폰 번호, 이메일 주소를
            정확히 확인 후 이용을 부탁 드립니다.
          </div>
          <div
            class="flex md:flex-row flex-col text-left py-3 whitespace-nowrap lg:px-40 lg:py-6"
          >
            <div class="none flex md:justify-center items-center w-full py-1">
              <img src="@/assets/icon/profile_grey.svg" class="pr-2" alt="" />
              <div>아이디 item1004</div>
            </div>
            <div class="grow flex md:justify-center items-center w-full py-1">
              <img src="@/assets/icon/phone_grey.svg" class="pr-2" alt="" />
              <div>핸드폰번호 010-1234-56**</div>
            </div>
            <div class="none flex md:justify-center items-center w-full py-1">
              <img src="@/assets/icon/safephone_grey.svg" class="pr-2" alt="" />
              <div>안심번호 사용 중</div>
            </div>
          </div>
          <hr class="h-px bg-everly-drak_grey border-px" />
          <div
            class="h-[120px] overflow-y-scroll md:h-auto md:overflow-y-hidden py-3 bg-everly-light_grey md:bg-white px-1 md:py-8"
          >
            물품의 내용, 거래, 결제 등 관련된 모든 책임(민.형사상)은 판매자 또는
            구매자에게 있습니다. <br /><br />2015년 3월 9일부터 판매 시 국세청
            고시 (판매대행 또는 중개를 하는 부가통신사업자가 지켜야 할 사항)에
            <br class="hidden lg:block" />
            의거하여 판매자의 휴대폰 번호와 이메일 주소가 신고됩니다.
            <br /><br />물품을 결제하거나, 결제전 문의사항은 직접 채팅을 통해
            대화가 가능합니다.
          </div>
        </div>
        <div
          class="flex gap-3 text-center text-everly-white pt-0 p-2 lg:p-10 lg:pt-0 lg:text-xl"
        >
          <div
            class="grow rounded-lg py-2 bg-everly-mid_grey cursor-pointer"
            @click="emit('select', `cancel`)"
          >
            취소
          </div>
          <div
            class="grow rounded-lg py-2 bg-everly-main cursor-pointer"
            @click="emit('select', `comfirm`)"
          >
            확인완료
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const emit = defineEmits(["select"]);
const props = defineProps({
  showModal: Boolean,
});
</script>
<style scoped></style>
