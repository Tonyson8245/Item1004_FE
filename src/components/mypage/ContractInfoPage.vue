<template>
  <div class="py-[3rem] flex h-auto bg-everly-light_grey md:bg-everly-white">
    <div class="flex-grow"></div>
    <div class="flex-grow-0 w-full md:w-[73.75rem] md:mt-10 spy-2 md:space-y-4">
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
                <span>ASDFQWERT11235</span>
              </div>
              <div>
                <span class="font-bold pr-2 md:pr-4">거래일시</span>
                <span>2022/12/06 17:20:57</span>
              </div>
            </div>
            <div class="hidden md:flex items-center space-x-2">
              <div><img src="@/assets/icon/report_grey.svg" alt="" /></div>
              <div>신고하기</div>
            </div>
          </div>
          <div class="space-y-1 md:space-y-3 p-3 bg-everly-white">
            <div class="flex space-x-2 text-xs md:text-sm">
              <div>메이플스토리</div>
              <span>></span>
              <div>서버명</div>
              <span>></span>
              <div>아이템머니</div>
            </div>
            <div class="md:text-lg">
              국교는인정되지아니하며종교와정치는분리된다대통령후보자가1인일때에는그득표수가선거권총총총총총총총총
            </div>
          </div>
          <div
            class="md:flex text-xs md:space-x-7 md:text-base bg-everly-wbg_grey md:bg-everly-white p-3 border-t"
          >
            <div class="flex justify-between md:space-x-4">
              <div class="md:font-bold">수량당 금액</div>
              <div class="font-bold md:font-normal">2,000원</div>
            </div>
            <div class="flex justify-between md:space-x-4">
              <div class="md:font-bold">주문수량</div>
              <div class="font-bold md:font-normal">8</div>
            </div>
            <div class="flex justify-between md:space-x-4">
              <div class="md:font-bold">판매금액</div>
              <div class="font-bold md:font-normal">16,000원</div>
            </div>
          </div>
        </div>
      </div>
      <div class="sm:flex sm:h-[22rem] sm:space-x-4">
        <!-- 남의정보 -->
        <div class="p-4 md:px-0 text-sm md:text-base sm:flex-1">
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
              <div class="font-bold md:text-lg">구매자정보</div>
            </div>
            <div class="md:hidden">
              <img src="@/assets/icon/dice_grey.svg" alt="" />
            </div>
          </div>
          <div
            class="mt-2 md:border rounded-lg shadow-md overflow-hidden sm:h-[15rem]"
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
                <div class="flex items-center font-bold">
                  <div>이걸닉네임이라고짓다니말도안돼</div>
                  <div>
                    <img
                      src="@/assets/icon/check_circle_blue.svg"
                      alt=""
                      class="w-3 md:w-4 ml-1"
                    />
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <div>#A2379F56GH</div>
                  <div @click="toggleshowbuyerInfo()" class="md:hidden">
                    <img
                      src="@/assets/icon/arrow_up.svg"
                      alt=""
                      v-if="showbuyerInfo"
                    />
                    <img src="@/assets/icon/arrow_down.svg" alt="" v-else />
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
                <div>거래등급아이콘</div>
              </div>
              <div class="flex">
                <!-- TODO 인수인계 : 초기에 핸드폰 빠짐 -->
                <!-- <div
                  class="font-bold text-right w-[3.25rem] md:w-[4.5rem] md:text-left mr-2"
                >
                  핸드폰번호
                </div> -->
                <div class="flex">
                  <div>0502-1234-5789</div>
                  <div class="flex items-center ml-2">
                    <div>
                      <img
                        src="@/assets/icon/safephone_grey.svg"
                        alt=""
                        class="w-3"
                      />
                    </div>
                    <div class="text-xs pl-1">안심번호사용중</div>
                  </div>
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
                    class="border-everly-main px-2 py-1 rounded-lg text-everly-main border"
                  >
                    휴대폰
                  </div>
                  <div
                    class="border-everly-main px-2 py-1 rounded-lg text-everly-main border"
                  >
                    이메일
                  </div>
                  <div
                    class="border-everly-main px-2 py-1 rounded-lg text-everly-main border"
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
                <div>띠용때용띠용때용띠용때용띠용때용띠용때용</div>
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
              <div class="font-bold md:text-lg">구매자정보</div>
            </div>
            <div class="md:hidden">
              <img src="@/assets/icon/dice_grey.svg" alt="" />
            </div>
          </div>
          <div
            class="mt-2 md:border rounded-lg shadow-md overflow-hidden sm:h-[15rem]"
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
                <div class="flex items-center font-bold">
                  <div>호날두는우리팀</div>
                </div>
                <div class="flex justify-between items-center">
                  <div>#A2379F56GH</div>
                  <div @click="toggleshowuserInfo()" class="md:hidden">
                    <img
                      src="@/assets/icon/arrow_up.svg"
                      alt=""
                      v-if="showuserInfo"
                    />
                    <img src="@/assets/icon/arrow_down.svg" alt="" v-else />
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
                <!-- <div
                  class="font-bold text-right w-[3.25rem] md:w-[4.5rem] md:text-left mr-2"
                >
                  핸드폰번호
                </div> -->
                <div class="flex">
                  <div>0502-1234-5789</div>
                  <div class="flex items-center ml-2">
                    <div>
                      <img
                        src="@/assets/icon/safephone_grey.svg"
                        alt=""
                        class="w-3"
                      />
                    </div>
                    <div class="text-xs pl-1">안심번호사용중</div>
                  </div>
                </div>
              </div>

              <div class="flex">
                <div
                  class="font-bold text-right w-[3.25rem] md:w-[4.5rem] md:text-left mr-2"
                >
                  캐릭터명
                </div>
                <div>띠용때용띠용때용띠용때용띠용때용띠용때용</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-grow"></div>
  </div>
</template>
<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import { useToggle } from "@vueuse/shared";
import { ref, computed } from "vue";

const showbuyerInfo = ref(false);
const showuserInfo = ref(false);

const toggleshowbuyerInfo = useToggle(showbuyerInfo);
const toggleshowuserInfo = useToggle(showuserInfo);

let isLargeScreen = computed(() => useMediaQuery("(min-width: 800px)"));

showbuyerInfo.value = isLargeScreen.value.value;
showuserInfo.value = isLargeScreen.value.value;
</script>

<style scoped></style>
