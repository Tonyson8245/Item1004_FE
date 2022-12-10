<template>
  <ModalSmall />
  <div class="" :class="overflowControl">
    <div class="flex">
      <div class="grow"></div>
      <div
        class="mt-14 flex-none md:w-[1180px] w-full md:py-10 pt-2 px-4 md:px-0"
      >
        <!-- 올린 시각 / 웹 - 수정삭제 / 모바일 - 신고 -->
        <div
          class="flex justify-between items-center md:justify-end gap-8 text-everly-dark_grey"
        >
          <span class="text-sm md:text-lg">10분전 올림</span>
          <div class="hidden md:flex gap-5">
            <div
              class="border-everly-mid_grey py-2 px-4 rounded-md flex border"
              @click="toggle()"
            >
              <img
                src="@/assets/icon/pencil_grey.svg"
                alt=""
                class="w-3 mr-2"
              />
              수정하기
            </div>
            <div
              class="border-everly-mid_grey py-2 px-4 rounded-md flex border"
              @click="
                changeModalSetting(`delete`);
                toggle();
              "
            >
              <img src="@/assets/icon/bin_grey.svg" alt="" class="w-3 mr-2" />
              삭제하기
            </div>
          </div>
          <div class="md:hidden">
            <img src="@/assets/icon/report_grey.svg" alt="" class="w-6" />
          </div>
        </div>
        <!-- 팔래요/살래요 제목 -->
        <div class="flex my-4 md:my-7 items-center">
          <div
            class="text-everly-white w-[64px] md:w-[68px] text-center text-sm md:text-lg"
          >
            <div
              class="bg-everly-main rounded-md py-1 w-full"
              v-if="SellBuy == `sell`"
            >
              팔래요
            </div>
            <div class="bg-everly-red rounded-md py-1 w-full" v-else>
              살래요
            </div>
          </div>
          <div class="text-lg md:text-2xl md:px-4 px-2">
            8억 ~ 580억 메이플 메소 판매 합니다.
          </div>
        </div>
        <hr
          class="border-everly-light_grey md:border-[#707070] border-px w-full absolute left-0 md:static"
        />
        <!-- 웹 물품정보,수량 / 모바일 - 물품정보 -->
        <div class="flex md:pt-10 md:pb-12 py-4">
          <!-- 물품정보 -->
          <div
            class="flex-1 md:flex-none md:w-[38.34375rem] md:border-r-[1px] md:border-[#c7c7c7] text-base md:text-lg space-y-2 md:space-y-9"
          >
            <div class="flex md:pt-[0.5em]">
              <div
                class="w-[60px] md:w-[63px] mr-2 md:mr-6 flex-none font-bold text-right"
              >
                카테고리
              </div>
              <div class="grow md:text-xl">게임머니</div>
            </div>
            <div class="flex md:pt-[0.5em]">
              <div
                class="w-[60px] md:w-[63px] mr-2 md:mr-6 flex-none font-bold text-right"
              >
                게임명
              </div>
              <div class="grow md:text-xl">메이플스토리</div>
            </div>
            <div class="flex md:pt-[0.5em]">
              <div
                class="w-[60px] md:w-[63px] mr-2 md:mr-6 flex-none font-bold text-right"
              >
                서버명
              </div>
              <div class="grow md:text-xl">엘리시움</div>
            </div>
            <div class="flex md:pt-[1.5rem]">
              <div
                class="w-[60px] md:w-[63px] mr-2 md:mr-6 flex-none font-bold text-right"
              >
                판매정보
              </div>
              <div class="grow md:text-xl">
                <div class="flex flex-wrap pb-3 gap-x-10">
                  <div class="">최소구매수량 &nbsp;&nbsp;&nbsp; 8억매소</div>
                  <div>최대구매수량 &nbsp;&nbsp;&nbsp; 580억메소</div>
                </div>
                <div class="font-bold space-x-5 md:block hidden">
                  <span>8억메소당</span
                  ><span class="text-lg md:text-xl">26,046 원</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 웹 결제 페이지 -->
          <div class="flex-1 text-lg pl-20 hidden md:block">
            <div class="flex items-center">
              <div class="flex-1 font-bold">수량</div>
              <counter
                @getValue="updateQty($event)"
                :qty="qty"
                class="flex-none md:w-32 md:h-9"
              />
              <div class="flex-1 text-right">64억 메소</div>
            </div>
            <div>
              <div class="text-everly-dark_grey text-xs py-3 px-2">
                * 최소구매수량 X 수량
              </div>
              <hr class="border-[#c7c7c7] border-px w-full mt-2 mb-10" />
            </div>
            <div class="flex justify-between items-center">
              <div class="font-bold">총 결제금액</div>
              <div class="flex space-x-4 items-center">
                <div class="text-everly-dark_grey">총수량 (8개) / 64억메소</div>
                <div class="flex text-2xl font-bold items-center">
                  208,368<span class="pl-2 text-xl font-normal">원</span>
                </div>
              </div>
            </div>
            <div
              class="mt-12 w-full text-center bg-everly-main text-everly-white py-4 rounded-lg"
            >
              구매하기
            </div>
            <div class="mt-3 w-full flex space-x-2">
              <div
                class="flex-1 flex py-3 rounded-lg justify-center items-center bg-everly-white text-everly-dark_grey border-everly-dark_grey border"
              >
                <img
                  src="@/assets/icon/like_mid-grey.svg"
                  alt=""
                  class="mr-3 w-[1.25rem]"
                />
                <div>찜하기</div>
              </div>
              <div
                class="flex-1 flex py-3 rounded-lg justify-center items-center bg-everly-white text-everly-dark_grey border-everly-dark_grey border"
              >
                <img
                  src="@/assets/icon/chat_mid-grey.svg"
                  alt=""
                  class="mr-3 w-[1.25rem]"
                />
                <div>채팅하기</div>
              </div>
            </div>
          </div>
        </div>
        <hr
          class="border-everly-light_grey md:border-[#707070] border-px w-full absolute left-0 md:static"
        />

        <!-- 모바일용 단위가격당 가겨 -->
        <div class="block md:hidden">
          <div class="font-bold space-x-5 flex justify-between py-3">
            <span>8억메소당</span
            ><span class="text-lg md:text-xl">26,046 원</span>
          </div>
          <hr
            class="border-everly-light_grey md:border-[#707070] border-px w-full absolute left-0 md:static"
          />
        </div>

        <div class="md:mt-[2.848rem] mt-[1.8rem] space-y-4">
          <div class="hidden md:block text-xl">상세설명</div>
          <div
            class="md:border-[#000000] w-full md:p-3 p-1 text-everly-dark_grey md:text-base text-sm md:border md:min-h-[8.938rem]"
          >
            메소 판매 합니다! 구매 후 채팅 주시면 바로 보내드립니다
          </div>
        </div>
        <!-- 웹 안전 확인 -->
        <div class="mt-[2.848rem] space-y-4 hidden md:block">
          <div class="text-xl">안전거래를 위한 필수확인!</div>
          <div
            class="w-full text-everly-dark_grey text-base border min-h-[8.938rem] bg-everly-light_grey flex flex-col justify-center items-start space-y-4 px-5"
          >
            <div>
              ⦁ 판매 시 주의 > 결제 문자를 받더라도 ‘마이페이지’에서
              입금(결제)여부를 꼭 확인하세요
            </div>
            <div>
              ⦁ 구매 시 주의 > 판매자로부터 물품을 전달받을 후에 다시 돌려달라는
              사기에 유위하세요
            </div>
            <div>
              ⦁ 이용하지 않는 다른게임. 서버 신청 제안을 받은 경우 사고 위험이
              높습니다.
            </div>
          </div>
        </div>
        <div class="mt-5 block md:hidden">
          <div
            class="w-full text-everly-dark_grey text-base border bg-everly-light_grey flex flex-col justify-center items-start space-y-2 px-5 py-3 rounded-lg"
          >
            <div class="text-sm sm:text-base text-center w-full">
              안전거래를 위한 필수확인!
            </div>
            <div class="text-xs sm:text-sm">
              <span class="font-bold">판매 시</span> 결제 문자를 받더라도
              ‘마이페이지’에서 입금(결제) 여부를 꼭 확인하세요.
              <span class="font-bold">구매 시 </span>판매자로부터 물품을
              전달받을 후에 다시 돌려달라는 사기에 유의하세요
              <span class="font-bold"
                >이용하지 않는 다른게임, 서버 신청 제안</span
              >을 받은 경우 사고 위험이 높습니다.
            </div>
          </div>
        </div>
        <div class="mt-5">
          <div class="text-base sm:text-xl">판매자정보</div>
          <div class="md:flex h-32 mt-3">
            <div
              class="flex-1 border-r border-everly_mid-grey flex bg-blue-100"
            >
              <img
                src="@/dummy/home/img/profile_img.png"
                alt=""
                class="w-8 h-8"
              />
              <div>
                <div class="flex">
                  <div class="flex justify-between items-center">
                    <span>아이디</span
                    ><img src="@/assets/icon/check_mobile_blue.svg" alt="" />
                  </div>
                  <div>(#A2379F56GH)</div>
                </div>
                <div>인증상태</div>
              </div>
            </div>
            <div class="flex-1 bg-red-100">사기조회 / 판매글 구매글</div>
          </div>
        </div>
      </div>
      <div class="grow"></div>
    </div>

    <!-- 모바일 결제 - 밑에서 올라오는 페이지 -->
    <transition name="slide-down" move="out-in">
      <div
        class="flex-1 text-sm sticky md:hidden bg-everly-white bottom-0 z-50 p-3 rounded-t-lg w-full sm:text-base"
        v-if="showBuy"
      >
        <div class="w-full flex justify-center pb-4 items-center">
          <span @click="toggleShowbuy(false)"
            ><img src="@/assets/icon/down_grey.svg" alt=""
          /></span>
        </div>
        <div class="flex">
          <div class="grow font-bold text-center">수량</div>
          <counter
            @getValue="updateQty($event)"
            :qty="qty"
            class="grow max-w-[6.875em]"
          />
          <div class="text-everly-dark_grey w-1/2 text-right">
            * 최소구매수량 X 수량
          </div>
        </div>
        <div>
          <div class="text-right py-3 text-base sm:text-xl">64억 메소</div>
          <hr class="border-[#c7c7c7] border-px w-full mt-2 mb-6" />
        </div>
        <div class="flex justify-between items-center pb-8">
          <div class="font-bold px-2">총 결제금액</div>
          <div class="text-everly-dark_grey">총수량 (8개) / 64억메소</div>
        </div>
        <div class="flex text-2xl font-bold items-center justify-end">
          208,368<span class="pl-2 text-base sm:text-xl font-normal">원</span>
        </div>

        <div class="mt-6 w-full flex space-x-2">
          <div class="w-1/6 flex justify-center items-center">
            <img src="@/assets/icon/like_mid-grey.svg" alt="" class="pr-1" />
            <div class="text-xs hidden">+99</div>
            <div class="text-sm">10</div>
          </div>
          <div
            class="flex-1 flex py-3 rounded-lg justify-center items-center bg-everly-light_blue text-everly-dark_grey border"
          >
            <div class="text-everly-main">채팅하기(10)</div>
          </div>
          <div
            class="flex-1 flex py-3 rounded-lg justify-center items-center bg-everly-main"
          >
            <div class="font-bold text-everly-white">바로구매</div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade" move="out-in">
      <div
        class="bg-black bg-opacity-30 h-screen w-full md:hidden absolute top-0 z-40"
        v-if="showBuy"
        @click="toggleShowbuy(false)"
      ></div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import counter from "@/components/common/counter.vue";
import { usePostStore } from "@/store/modules/home/postStore";
import { storeToRefs } from "pinia";
import { ref, watch, computed } from "vue";
import ModalSmall from "../modal/modalSmall.vue";
import { useModal } from "@/store/modules/ui/modal";
import { useToggle } from "@vueuse/shared";

const postStore = usePostStore();
const modalStore = useModal();

const { storeShowBuy } = storeToRefs(postStore);
const { showModalSmall } = storeToRefs(modalStore);

let SellBuy = "sell";
const qty = ref(1);
function updateQty(event: number) {
  qty.value = event;
}

const showBuy = storeShowBuy;
let overflowControl = ref("");

function toggleShowbuy(status: boolean) {
  postStore.setstoreShowBuy(status);
}

watch(showBuy, () => {
  if (showBuy.value) {
    overflowControl.value = "h-screen overflow-hidden";
  } else {
    overflowControl.value = "";
  }
});

const toggle = useToggle(showModalSmall);

function changeModalSetting(type: string) {
  if (type == "delete") {
    modalStore.setModalSmall({ button_content: `a`, detail_content: "2" });
  } else {
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/*  */
/*  */
.slide-down-enter-active {
  transition: all 0.3s ease-out;
}

.slide-down-leave-active {
  transition: all 0.3s ease-in;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(1000px);
}
</style>
