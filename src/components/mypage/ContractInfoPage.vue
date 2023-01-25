<template>
  <div
    class="py-[3rem] pb-[4rem] flex h-full bg-everly-light_grey md:bg-everly-white"
    @click="setshowMore(false)"
  >
    <div class="flex-1"></div>
    <div class="flex-none w-full md:w-[73.75rem] md:mt-10 spy-2 md:space-y-4">
      <div class="p-4 md:px-0 space-y-5" v-if="getterContractStageStatus != 3">
        <div class="flex space-x-2">
          <img
            src="@/assets/icon/check_special_blue.svg"
            alt=""
            class="w-5 md:w-6"
          />
          <span class="font-bold text-sm md:text-lg">거래진행단계 </span>
        </div>
        <div class="w-full flex justify-center pb-8">
          <div v-if="!getterContractDetail.my.isSeller">
            <img
              :src="`/assets/img/contractProcess/take_${getterContractStageStatus}.svg`"
              class="hidden md:block"
              alt=""
            />
            <img
              :src="`/assets/img/contractProcess/take_mobile_${getterContractStageStatus}.svg`"
              class="md:hidden"
              alt=""
            />
          </div>
          <div v-else>
            <img
              :src="`/assets/img/contractProcess/takeover_${getterContractStageStatus}.svg`"
              class="hidden md:block"
              alt=""
            />
            <img
              :src="`/assets/img/contractProcess/takeover_mobile_${getterContractStageStatus}.svg`"
              class="md:hidden"
              alt=""
            />
          </div>
          <!-- <div v-if="getterContractStageStatus == 'takeover_complete'">
            <img
              src="@/assets/img/contractProcess_complete_mobile.svg"
              alt=""
              class="md:hidden"
            />
            <img
              src="@/assets/img/contractProcess_complete_web.svg"
              alt=""
              class="hidden md:block"
            />
          </div>
          <div v-else-if="getterContractStageStatus == 'takeover_ongoing'">
            <img
              src="@/assets/img/contractProcess_takeover_ongoing_web.svg"
              alt=""
              class="hidden md:block"
            />
            <img
              src="@/assets/img/contractProcess_takeover_ongoing_mobile.png"
              alt=""
              class="block md:hidden"
            />
          </div>
          <div v-else-if="getterContractStageStatus == 'take_ongoing'">
            <img
              src="@/assets/img/contractProcess_take_ongoing_web.svg"
              alt=""
              class="hidden md:block"
            />
            <img
              src="@/assets/img/contractProcess_take_ongoing_mobile.svg"
              class="md:hidden"
              alt=""
            />
          </div> -->
        </div>
      </div>
      <!-- 판매정보 -->
      <div class="p-4 md:px-0 text-sm md:text-base">
        <!-- 헤더 -->
        <div class="flex justify-between w-full">
          <div class="flex items-center">
            <div class="pr-2">
              <div
                class="md:hidden rounded-full bg-everly-light_blue w-6 h-6 items-center justify-center flex"
              >
                <img src="@/assets/icon/contract_info.svg" alt="" class="w-5" />
              </div>
              <img
                src="@/assets/icon/contract_info.svg"
                alt=""
                class="w-7 hidden md:block"
              />
            </div>
            <div class="font-bold md:text-lg">물품정보</div>
          </div>
          <div class="md:hidden">
            <img src="@/assets/icon/report_grey.svg" alt="" />
          </div>
        </div>
        <div class="mt-2 md:border rounded-lg shadow-md overflow-hidden">
          <div
            class="flex w-full justify-between bg-everly-white md:bg-everly-light_grey md:border-b p-3 pb-0 md:p-3"
          >
            <div class="md:flex text-xs md:text-base md:space-x-10">
              <div>
                <span class="font-bold pr-2 md:pr-4">거래번호</span>
                <span>{{ getterContractDetail.contract.ordNm }}</span>
              </div>
              <div>
                <span class="font-bold pr-2 md:pr-4">거래일시</span>
                <span>{{ getterContractDetail.contract.createdAt }}</span>
              </div>
            </div>
            <div class="hidden md:flex items-center space-x-2">
              <div><img src="@/assets/icon/report_grey.svg" alt="" /></div>
              <div class="text-everly-dark_grey">신고하기</div>
            </div>
          </div>
          <div class="space-y-1 md:space-y-3 p-3 bg-everly-white">
            <div class="flex space-x-2 text-xs md:text-sm">
              <div>{{ getterContractDetail.post.gameName }}</div>
              <span>></span>
              <div>{{ getterContractDetail.post.serverName }}</div>
              <span>></span>
              <div>{{ getterContractDetail.post.productType }}</div>
            </div>
            <div class="md:text-lg">
              {{ getterContractDetail.post.title }}
            </div>
          </div>
          <div
            class="md:flex text-xs md:space-x-7 md:text-base bg-everly-wbg_grey md:bg-everly-white p-3 border-t"
          >
            <div class="flex justify-between md:space-x-4">
              <div class="md:font-bold">수량당 금액</div>
              <div class="font-bold md:font-normal">
                {{
                  commonFunction.comma(
                    getterContractDetail.contract.pricePerUnit
                  )
                }}원
              </div>
            </div>
            <div class="flex justify-between md:space-x-4">
              <div class="md:font-bold">주문수량</div>
              <div class="font-bold md:font-normal">
                {{
                  commonFunction.comma(
                    getterContractDetail.contract.purchaseNumber
                  )
                }}
              </div>
            </div>
            <div class="flex justify-between md:space-x-4">
              <div class="md:font-bold">판매금액</div>
              <div class="font-bold md:font-normal">
                {{
                  commonFunction.comma(
                    getterContractDetail.contract.purchaseTotalPrice
                  )
                }}원
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sm:flex sm:h-[22rem] sm:space-x-8 relative">
        <!-- 남의정보 -->
        <div class="p-4 md:px-0 text-sm md:text-base sm:flex-1 relative">
          <div
            class="border bg-everly-white absolute right-4 md:right-3 top-[1rem] md:top-[4rem] w-[6rem] md:w-[10rem] text-center divide-y rounded-lg text-xs md:text-sm text-everly-dark_grey"
            v-if="showMore"
          >
            <!-- TODO 1차 출시 주석 2023-01-25 20:31:17 -->
            <div class="px-4 py-2" @click="alertMSG()">사기조회</div>
            <div class="px-4 py-2" @click="alertMSG()">신고하기</div>
            <div class="px-4 py-2">채팅하기</div>
          </div>
          <!-- 헤더 -->
          <div class="flex justify-between w-full">
            <div class="flex items-center">
              <div class="pr-2">
                <div
                  class="md:hidden rounded-full bg-everly-light_blue w-6 h-6 items-center justify-center flex"
                >
                  <img
                    src="@/assets/icon/buyer_info_web.png"
                    alt=""
                    class="w-5 md:w-5"
                  />
                </div>

                <img
                  src="@/assets/icon/buyer_info_mobile.svg"
                  alt=""
                  class="w-7 hidden md:block"
                />
              </div>
              <div
                class="font-bold md:text-lg"
                v-if="!getterContractDetail.my.isSeller"
              >
                판매자정보
              </div>
              <div class="font-bold md:text-lg" v-else>구매자정보</div>
            </div>
            <div
              class="md:hidden w-3 flex justify-end"
              @click="setshowMore(true)"
              @click.stop=""
            >
              <img
                src="@/assets/icon/dice_grey.svg"
                alt=""
                class="w-[0.2rem]"
              />
            </div>
          </div>
          <div
            class="mt-2 md:border rounded-lg shadow-md overflow-hidden sm:h-[15rem] bg-everly-wbg_grey md:bg-everly-white"
          >
            <!-- 프로필  -->
            <div
              class="flex w-full md:border-b p-3 md:p-3 space-x-4 bg-everly-white"
            >
              <div>
                <img
                  src="@/assets/img/profile_red.jpeg"
                  class="w-10 rounded-lg"
                  alt=""
                />
              </div>
              <div class="flex-1">
                <div class="flex justify-between items-center font-bold">
                  <div class="flex items-center">
                    <div>{{ getterContractDetail.otherUser.nickname }}</div>
                    <div v-if="getterContractDetail.otherUser.isVerified">
                      <img
                        src="@/assets/icon/check_circle_blue.svg"
                        alt=""
                        class="w-3 md:w-4 ml-1"
                      />
                    </div>
                  </div>
                  <div
                    @click="setshowMore(true)"
                    @click.stop=""
                    class="hidden md:block w-3 justify-end"
                  >
                    <img src="@/assets/icon/dice_grey.svg" alt="" class="" />
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <div>#{{ getterContractDetail.otherUser.code }}</div>
                  <div @click="toggleshowbuyerInfo()" class="md:hidden">
                    <img
                      src="@/assets/icon/arrow_up_card.svg"
                      alt=""
                      v-if="showbuyerInfo"
                    />
                    <img
                      src="@/assets/icon/arrow_down_card.svg"
                      alt=""
                      v-else
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- 정보 -->
            <div
              class="text-xs md:text-base bg-everly-wbg_grey md:bg-everly-white p-3 space-y-3 border-t md:pl-[4.3rem]"
              v-if="showbuyerInfo"
            >
              <div class="flex">
                <div
                  class="font-bold text-right w-[3.25rem] md:w-[4.5rem] md:text-left mr-2"
                >
                  거래등급
                </div>
                <div>거래등급 아이콘</div>
              </div>
              <div class="flex">
                <div
                  class="font-bold text-right w-[3.25rem] md:w-[4.5rem] md:text-left mr-2"
                >
                  핸드폰번호
                </div>
                <div class="flex">
                  <div>0502-1234-5789</div>

                  <!-- TODO 안심번호 추가할 때 넣기 -->
                  <!-- <div class="flex items-center ml-2">
                    <div>
                      <img
                        src="@/assets/icon/safephone_grey.svg"
                        alt=""
                        class="w-3"
                      />
                    </div>
                    <div class="text-xs pl-1">안심번호사용중</div>
                  </div> -->
                </div>
              </div>
              <div class="flex items-center">
                <div
                  class="font-bold text-right w-[3.25rem] md:w-[4.5rem] md:text-left mr-2"
                >
                  인증상태
                </div>
                <div class="flex space-x-1">
                  <div
                    class="border-everly-main px-2 md:px-4 py-1 rounded-lg md:text-xs text-everly-main border"
                    v-if="getterContractDetail.otherUser.isPhoneValid"
                  >
                    휴대폰
                  </div>
                  <div
                    class="border-everly-mid_grey px-2 md:px-4 py-1 rounded-lg md:text-xs text-everly-mid_grey border"
                    v-else
                  >
                    휴대폰
                  </div>
                  <div
                    class="border-everly-main px-2 md:px-4 py-1 rounded-lg md:text-xs text-everly-main border"
                    v-if="getterContractDetail.otherUser.isEmailValid"
                  >
                    이메일
                  </div>
                  <div
                    class="border-everly-mid_grey px-2 md:px-4 py-1 rounded-lg md:text-xs text-everly-mid_grey border"
                    v-else
                  >
                    이메일
                  </div>
                  <div
                    class="border-everly-main px-2 md:px-4 py-1 rounded-lg md:text-xs text-everly-main border"
                    v-if="getterContractDetail.otherUser.isAccountValid"
                  >
                    출금계좌
                  </div>
                  <div
                    class="border-everly-mid_grey px-2 md:px-4 py-1 rounded-lg md:text-xs text-everly-mid_grey border"
                    v-else
                  >
                    출금계좌
                  </div>
                </div>
              </div>
              <div class="flex">
                <div
                  class="font-bold text-right w-[3.25rem] md:w-[4.5rem] md:text-left mr-2"
                >
                  캐릭터명
                </div>
                <div>캐릭터이름</div>
              </div>
            </div>
          </div>
        </div>
        <!--  내 정보 -->
        <div class="p-4 md:px-0 text-sm md:text-base sm:flex-1">
          <!-- 헤더 -->
          <div class="flex justify-between w-full">
            <div class="flex items-center">
              <div
                class="md:hidden rounded-full bg-everly-light_blue w-6 h-6 items-center justify-center flex"
              >
                <img
                  src="@/assets/icon/user_info_mobile.svg"
                  alt=""
                  class="w-3"
                />
              </div>

              <img
                src="@/assets/icon/user_info_web.svg"
                alt=""
                class="w-7 hidden md:block"
              />
              <div class="font-bold md:text-lg">내정보</div>
            </div>
          </div>
          <div
            class="mt-2 md:border rounded-lg shadow-md overflow-hidden sm:h-[15rem] bg-everly-wbg_grey md:bg-everly-white"
          >
            <!-- 프로필  -->
            <div
              class="flex w-full md:border-b p-3 md:p-3 space-x-4 bg-everly-white"
            >
              <div>
                <img
                  src="@/assets/img/profile_green.jpeg"
                  class="w-10 rounded-lg"
                  alt=""
                />
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between font-bold">
                  <div class="flex items-center">
                    <div>{{ userNickname }}</div>
                    <div>
                      <img
                        src="@/assets/icon/check_circle_blue.svg"
                        alt=""
                        class="w-3 md:w-4 ml-1"
                      />
                    </div>
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <div>#{{ getterContractDetail.my.code }}</div>
                  <div @click="toggleshowuserInfo()" class="md:hidden">
                    <img
                      src="@/assets/icon/arrow_up_card.svg"
                      alt=""
                      v-if="showuserInfo"
                    />
                    <img
                      src="@/assets/icon/arrow_down_card.svg"
                      alt=""
                      v-else
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- 정보 -->
            <div
              class="text-xs md:text-base bg-everly-wbg_grey md:bg-everly-white p-3 space-y-3 border-t md:pl-[4.3rem]"
              v-if="showuserInfo"
            >
              <div class="flex">
                <div
                  class="font-bold text-right w-[3.25rem] md:w-[4.5rem] md:text-left mr-2"
                >
                  거래등급
                </div>
                <div>거래등급아이콘</div>
              </div>
              <div class="flex">
                <!-- TODO 인수인계 : 초기에 핸드폰 빠짐 -->
                <div
                  class="font-bold text-right w-[3.25rem] md:w-[4.5rem] md:text-left mr-2"
                >
                  핸드폰번호
                </div>
                <div class="flex">
                  <div>0502-1234-5789</div>
                  <!-- TODO 안심번호 추가할 때 넣기 -->
                  <!-- <div class="flex items-center ml-2">
                    <div>
                      <img
                        src="@/assets/icon/safephone_grey.svg"
                        alt=""
                        class="w-3"
                      />
                    </div>
                    <div class="text-xs pl-1">안심번호사용중</div>
                  </div> -->
                </div>
              </div>

              <div class="flex">
                <div
                  class="font-bold text-right w-[3.25rem] md:w-[4.5rem] md:text-left mr-2"
                >
                  캐릭터명
                </div>
                <div>캐릭터명</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="p-4 md:p-0"
        v-if="
          getterContractStageStatus != 2 &&
          getterContractStageStatus != 2 &&
          getterContractStageStatus != 3
        "
      >
        <div
          class="flex space-x-2 items-center text-sm md:text-lg font-bold pb-2 md:pb-4"
        >
          <img
            src="@/assets/icon/warning_yellow.svg"
            alt=""
            class="w-4 md:w-5"
          />
          <div>잠깐! 물품을 넘겨주기 전 꼭 확인하세요!</div>
        </div>
        <div
          class="w-full bg-everly-white md:bg-everly-light_grey p-5 space-y-4 text-xs md:text-base"
        >
          <div>
            1. 구매자의 연락처가 다를경우 거래를 중지 하시고 고객센터를 통해
            문의해 주시기 바랍니다.
          </div>
          <div>
            2. 게임상에서 거래할 캐릭터명이 위의 구매자 캐릭터명과 같은지
            확인하기시 바랍니다.
          </div>
          <div>
            3. 거래에는 게임상에서 채팅이나 귓말은 삼가하시고 가능하시면
            채팅으로 대화하기실 바랍니다.
          </div>
          <div>
            4. 반드시 물품을 정상적으로 인계하신 후 물품인계확인을 하시기
            바랍니다.
          </div>
          <div>
            5. 거래취소 SMS 수신 후 1시간 이내 인계확인이 되지 않은 경우 거래가
            자동취소 될 수 있으니 유의하시기 바랍니다.
          </div>
        </div>
      </div>
      <!-- 거래취소 + 인계/인수 -->
      <div
        class="hidden md:flex w-full px-48 space-x-5 py-24"
        v-if="
          (getterContractDetail.my.isSeller &&
            getterContractStageStatus == 0) ||
          (!getterContractDetail.my.isSeller && getterContractStageStatus == 1)
        "
      >
        <div
          class="bg-everly-light_blue text-everly-main flex-1 text-center rounded-lg py-3 font-bold cursor-pointer"
        >
          거래취소
        </div>
        <div
          class="bg-everly-main text-everly-white flex-1 text-center rounded-lg py-3 font-bold cursor-pointer"
          @click="putContractStatus(getterButtonContent)"
        >
          {{ getterButtonContent }}
        </div>
      </div>
      <!-- 거래 취소만 -->
      <div
        class="hidden md:flex w-full px-72 space-x-5 py-24"
        v-else-if="
          (getterContractDetail.my.isSeller &&
            getterContractStageStatus == 1) ||
          (!getterContractDetail.my.isSeller && getterContractStageStatus == 0)
        "
      >
        <div
          class="bg-everly-light_blue text-everly-main flex-1 text-center rounded-lg py-3 font-bold cursor-pointer"
        >
          거래취소
        </div>
      </div>
      <!-- 거래 종료 -->
      <div
        class="hidden md:flex w-full px-72 space-x-5 py-24"
        v-else-if="
          getterContractStageStatus == 2 || getterContractStageStatus == 2
        "
      >
        <div
          class="bg-everly-mid_grey text-everly-white flex-1 text-center rounded-lg py-3 font-bold"
        >
          종료된 거래입니다
        </div>
      </div>
      <!-- 거래 취소 -->
      <div
        class="hidden md:flex w-full px-72 space-x-5 py-24"
        v-else-if="getterContractStageStatus == 3"
      >
        <div
          class="bg-everly-mid_grey text-everly-white flex-1 text-center rounded-lg py-3 font-bold"
        >
          취소된 거래입니다
        </div>
      </div>
    </div>
    <div class="flex-1"></div>
  </div>
</template>
<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import { useToggle } from "@vueuse/shared";
import { ref, computed, watch, onMounted } from "vue";
import { usemypageStore } from "@/store/modules/mypage/mypageStore";
import { storeToRefs } from "pinia";
import commonFunction from "@/common";
import type { user } from "@/domain/user/user.interface";
import router from "@/router";
import { alertMSG } from "@/common";
import { useRoute } from "vue-router";
import { post } from "@/domain/payment/contractPostDetailDto.interaface";
import { isEmpty } from "class-validator";

const showbuyerInfo = ref(false);
const showuserInfo = ref(false);
const mypageStore = usemypageStore();
const { getterContractDetail, getterContractStageStatus, getterButtonContent } =
  storeToRefs(mypageStore);

const route = useRoute();

//불러오기 위한 postidx 와 ordNm
const postIdx = route.query.postIdx?.toString();
const ordNm = route.query.ordNm?.toString();

//상세 내용 크고 끼기
const toggleshowbuyerInfo = useToggle(showbuyerInfo);
const toggleshowuserInfo = useToggle(showuserInfo);

//브라우저 크기 변화시 따라가기 위한 코드
const minSize = computed(() => {
  return useMediaQuery("(min-width: 640px)");
});
var isBig = minSize.value.value;
if (isBig) {
  showbuyerInfo.value = isBig;
  showuserInfo.value = isBig;
}

watch(minSize.value, () => {
  showbuyerInfo.value = minSize.value.value;
  showuserInfo.value = minSize.value.value;
});

onMounted(() => {
  //데이터 불러오기
  console.log(postIdx, ordNm);

  if (postIdx != undefined && ordNm != undefined)
    mypageStore.getContractPostDetail(parseInt(postIdx), ordNm);
  else router.go(-1);
});

//localstorage 가져오기
const localData = localStorage.getItem("user");
const refreshTokenData = localStorage.getItem("refreshToken");

const userNickname =
  refreshTokenData == null || localData == null
    ? `로그인하기`
    : (JSON.parse(localData) as user).nickname;

//사기조회 채팅하기 신고하기
const showMore = ref(false);
function setshowMore(status: boolean) {
  showMore.value = status;
}

//인수 인계 버튼
function putContractStatus(status: string) {
  if (ordNm != undefined) {
    if (status == "물품인계")
      mypageStore.setContractTakeover(ordNm).then((res) => {
        if (res) alert(status + "가 완료됬습니다.");
        else alert(status + "가 실패했습니다.");
      });
    else
      mypageStore.setContractTake(ordNm).then((res) => {
        if (res) alert(status + "가 완료됬습니다.");
        else alert(status + "가 실패했습니다.");
      });
    mypageStore.resetContractList();
  }
  router.go(-1);
}
</script>

<style scoped></style>
