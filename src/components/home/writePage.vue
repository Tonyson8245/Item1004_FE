<template>
  <div class="">
    <div class="flex">
      <div class="flex-grow"></div>
      <div
        class="flex-none w-full md:w-[1180px] pt-16 text-sm md:text-base mt-10 md:mt-1"
      >
        <!-- 모바일 팔래요 살래요 -->
        <div
          class="bg-everly-white cursor-pointer md:hidden z-50 border-b w-full fixed top-[49px]"
        >
          <div class="flex w-full space-x-4 border-b p-4">
            <!--팔래요 활성화 -->
            <div
              class="flex space-x-1 w-[66px]"
              v-if="storepostType == 'sell'"
              @click="toggleSellBuy('sell')"
            >
              <img src="@/assets/icon/check_mobile_blue.svg" alt="" />
              <span class="text-everly-main font-bold">팔래요</span>
            </div>
            <div
              class="flex space-x-1 w-[66px]"
              v-if="storepostType == 'sell'"
              @click="toggleSellBuy('buy')"
            >
              <img src="@/assets/icon/check_mobile_grey.svg" alt="" />
              <span class="text-everly-dark_grey">살래요</span>
            </div>

            <!--살래요 활성화 -->
            <div
              class="flex space-x-1 w-[66px]"
              v-if="storepostType == 'buy'"
              @click="toggleSellBuy('sell')"
            >
              <img src="@/assets/icon/check_mobile_grey.svg" alt="" />
              <span class="text-everly-dark_grey">팔래요</span>
            </div>
            <div
              class="flex space-x-1 w-[66px]"
              v-if="storepostType == 'buy'"
              @click="toggleSellBuy('buy')"
            >
              <img src="@/assets/icon/check_mobile_red.svg" alt="" />
              <span class="text-everly-red font-bold">살래요</span>
            </div>
          </div>
        </div>
        <!-- 웹 팔래요 살래요 -->
        <div class="hidden md:block md:p-5">
          <div class="grid gap-4 w-full grid-cols-12">
            <div class="col-span-2">거래종류를<br />선택해주세요</div>
            <div class="col-span-1"></div>
            <div class="col-span-9">
              <div class="flex space-x-28 text-xl cursor-pointer">
                <!-- 팔래요 활성화 -->
                <div class="flex space-x-2" v-if="storepostType == 'sell'">
                  <img
                    src="@/assets/icon/check_web_blue.svg"
                    alt=""
                    class="w-6"
                  />
                  <span
                    class="text-everly-main font-bold w-13"
                    @click="toggleSellBuy('sell')"
                    >팔래요</span
                  >
                </div>
                <div class="flex space-x-2" v-if="storepostType == 'sell'">
                  <img
                    src="@/assets/icon/check_web_grey.svg"
                    alt=""
                    class="w-6"
                  />
                  <span
                    class="text-everly-dark-grey w-13"
                    @click="toggleSellBuy('buy')"
                    >살래요</span
                  >
                </div>

                <!-- 살래요 활성화 -->
                <div class="flex space-x-2" v-if="storepostType == 'buy'">
                  <img
                    src="@/assets/icon/check_web_grey.svg"
                    alt=""
                    class="w-6"
                  />
                  <span
                    class="text-everly-dark-grey w-13"
                    @click="toggleSellBuy('sell')"
                    >팔래요</span
                  >
                </div>
                <div class="flex space-x-2" v-if="storepostType == 'buy'">
                  <img
                    src="@/assets/icon/check_web_red.svg"
                    alt=""
                    class="w-6"
                  />
                  <span
                    class="text-everly-red font-bold w-13"
                    @click="toggleSellBuy('buy')"
                    >살래요</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="p-5 md:space-y-20 space-y-8">
          <div class="grid gap-4 w-full md:grid-cols-12 grid-cols-1">
            <!-- 모바일 -->
            <div class="col-span-2 block md:hidden">카테고리</div>
            <div class="col-span-9 block md:hidden">
              <div class="grid grid-cols-4 md:gap-4 gap-1">
                <!-- 게임머니 -->
                <div
                  class="flex justify-center text-everly-dark cursor-pointer"
                  v-if="storeCategory == 'gameMoney'"
                  @click="setCategory(`gameMoney`)"
                >
                  <div
                    class="w-16 h-16 sm:w-32 sm:h-32 border rounded-xl border-everly-main"
                  >
                    <div
                      class="flex flex-col items-center justify-center h-full w-full"
                    >
                      <img
                        src="@/assets/icon/gamemoney_active_mobile.svg"
                        class="w-6 h-6 sm:w-20 sm:h-20 m-1 sm:m-2"
                      />
                      <div>게임머니</div>
                    </div>
                  </div>
                </div>
                <div
                  class="flex justify-center text-everly-dark_grey cursor-pointer"
                  @click="setCategory(`gameMoney`)"
                  v-else
                >
                  <div class="w-16 h-16 sm:w-32 sm:h-32 border rounded-xl">
                    <div
                      class="flex flex-col items-center justify-center h-full w-full"
                    >
                      <img
                        src="@/assets/icon/gamemoney_mobile.svg"
                        class="w-6 h-6 sm:w-20 sm:h-20 m-1 sm:m-2"
                      />
                      <div>게임머니</div>
                    </div>
                  </div>
                </div>
                <!-- 아이템 -->
                <div
                  class="flex justify-center text-everly-dark cursor-pointer"
                  @click="setCategory(`item`)"
                  v-if="storeCategory == 'item'"
                >
                  <div
                    class="w-16 h-16 sm:w-32 sm:h-32 border rounded-xl border-everly-main"
                  >
                    <div
                      class="flex flex-col items-center justify-center h-full w-full"
                    >
                      <img
                        src="@/assets/icon/item_active_mobile.svg"
                        class="w-6 h-6 sm:w-20 sm:h-20 m-1 sm:m-2"
                      />
                      <div>아이템</div>
                    </div>
                  </div>
                </div>
                <div
                  class="flex justify-center text-everly-dark_grey cursor-pointer"
                  @click="setCategory(`item`)"
                  v-else
                >
                  <div class="w-16 h-16 sm:w-32 sm:h-32 border rounded-xl">
                    <div
                      class="flex flex-col items-center justify-center h-full w-full"
                    >
                      <img
                        src="@/assets/icon/item_mobile.svg"
                        class="w-6 h-6 sm:w-20 sm:h-20 m-1 sm:m-2"
                      />
                      <div>아이템</div>
                    </div>
                  </div>
                </div>
                <!-- 캐릭터 -->
                <div
                  class="flex justify-center text-everly-dark cursor-pointer"
                  @click="setCategory(`character`)"
                  v-if="storeCategory == 'character'"
                >
                  <div
                    class="w-16 h-16 sm:w-32 sm:h-32 border rounded-xl border-everly-main"
                  >
                    <div
                      class="flex flex-col items-center justify-center h-full w-full"
                    >
                      <img
                        src="@/assets/icon/character_active_mobile.svg"
                        class="w-6 h-6 sm:w-20 sm:h-20 m-1 sm:m-2"
                      />
                      <div>아이템</div>
                    </div>
                  </div>
                </div>
                <div
                  class="flex justify-center text-everly-dark_grey cursor-pointer"
                  @click="setCategory(`character`)"
                  v-else
                >
                  <div class="w-16 h-16 sm:w-32 sm:h-32 border rounded-xl">
                    <div
                      class="flex flex-col items-center justify-center h-full w-full"
                    >
                      <img
                        src="@/assets/icon/character.svg"
                        class="w-6 h-6 sm:w-20 sm:h-20 m-1 sm:m-2"
                      />
                      <div>캐릭터</div>
                    </div>
                  </div>
                </div>
                <!-- 기타 -->
                <div
                  class="flex justify-center text-everly-dark cursor-pointer"
                  @click="setCategory(`etc`)"
                  v-if="storeCategory == 'etc'"
                >
                  <div
                    class="w-16 h-16 sm:w-32 sm:h-32 border rounded-xl border-everly-main"
                  >
                    <div
                      class="flex flex-col items-center justify-center h-full w-full"
                    >
                      <img
                        src="@/assets/icon/etc_active_mobile.svg"
                        class="w-6 h-6 sm:w-20 sm:h-20 m-1 sm:m-2"
                      />
                      <div>기타</div>
                    </div>
                  </div>
                </div>
                <div
                  class="flex justify-center text-everly-dark_grey cursor-pointer"
                  @click="setCategory(`etc`)"
                  v-else
                >
                  <div class="w-16 h-16 sm:w-32 sm:h-32 border rounded-xl">
                    <div
                      class="flex flex-col items-center justify-center h-full w-full"
                    >
                      <img
                        src="@/assets/icon/etc_mobile.svg"
                        class="w-6 h-6 sm:w-20 sm:h-20 m-1 sm:m-2"
                      />
                      <div>기타</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 웹 -->
            <div class="col-span-2 hidden md:block">
              카테고리를<br />선택해주세요
            </div>
            <div class="col-span-1 hidden md:block"></div>
            <div class="col-span-9 hidden md:block">
              <div class="grid grid-cols-4 gap-4 flex-grow justify-items-left">
                <!-- 게임머니 -->
                <div
                  class="border border-everly-mid_grey w-[160px] h-[160px] rounded-xl flex items-center justify-center cursor-pointer"
                  v-if="storeCategory != 'gameMoney'"
                  @click="setCategory(`gameMoney`)"
                >
                  <div class="text-center">
                    <img
                      src="@/assets/icon/gamemoney.svg"
                      alt=""
                      class="inline-block w-20"
                    />
                    <div class="flex items-center">
                      <div
                        class="rounded-full bg-everly-mid_grey w-[18px] h-[18px] text-everly-dark_grey mx-1"
                      ></div>
                      <div>게임머니</div>
                    </div>
                  </div>
                </div>
                <div
                  class="border border-everly-main w-[160px] h-[160px] rounded-xl flex items-center justify-center cursor-pointer"
                  @click="setCategory(`gameMoney`)"
                  v-else
                >
                  <div class="text-center">
                    <img
                      src="@/assets/icon/gamemoney_active.svg"
                      alt=""
                      class="inline-block w-20"
                    />
                    <div class="flex items-center">
                      <img
                        class="w-[18px] mx-1"
                        src="@/assets/icon/check_circle_blue.svg"
                        alt=""
                      />
                      <div>게임머니</div>
                    </div>
                  </div>
                </div>
                <!-- 아이템 -->
                <div
                  class="border border-everly-mid_grey w-[160px] h-[160px] rounded-xl flex items-center justify-center"
                  v-if="storeCategory != 'item'"
                  @click="setCategory(`item`)"
                >
                  <div class="text-center">
                    <img
                      src="@/assets/icon/item.svg"
                      alt=""
                      class="inline-block w-20"
                    />
                    <div class="flex items-center">
                      <div
                        class="rounded-full bg-everly-mid_grey w-[18px] h-[18px] text-everly-dark_grey mx-1"
                      ></div>
                      <div>아이템</div>
                    </div>
                  </div>
                </div>
                <div
                  class="border border-everly-main w-[160px] h-[160px] rounded-xl flex items-center justify-center cursor-pointer"
                  @click="setCategory(`item`)"
                  v-else
                >
                  <div class="text-center">
                    <img
                      src="@/assets/icon/item_active.svg"
                      alt=""
                      class="inline-block w-20"
                    />
                    <div class="flex items-center">
                      <img
                        class="w-[18px] mx-1"
                        src="@/assets/icon/check_circle_blue.svg"
                        alt=""
                      />
                      <div>아이템</div>
                    </div>
                  </div>
                </div>
                <!-- 캐릭터 -->
                <div
                  class="border border-everly-mid_grey w-[160px] h-[160px] rounded-xl flex items-center justify-center"
                  v-if="storeCategory != 'character'"
                  @click="setCategory(`character`)"
                >
                  <div class="text-center">
                    <img
                      src="@/assets/icon/character.svg"
                      alt=""
                      class="inline-block w-20"
                    />
                    <div class="flex items-center">
                      <div
                        class="rounded-full bg-everly-mid_grey w-[18px] h-[18px] text-everly-dark_grey mx-1"
                      ></div>
                      <div>캐릭터</div>
                    </div>
                  </div>
                </div>
                <div
                  class="border border-everly-main w-[160px] h-[160px] rounded-xl flex items-center justify-center cursor-pointer"
                  @click="setCategory(`character`)"
                  v-else
                >
                  <div class="text-center">
                    <img
                      src="@/assets/icon/character_active.svg"
                      alt=""
                      class="inline-block w-20"
                    />
                    <div class="flex items-center">
                      <img
                        class="w-[18px] mx-1"
                        src="@/assets/icon/check_circle_blue.svg"
                        alt=""
                      />
                      <div>캐릭터</div>
                    </div>
                  </div>
                </div>
                <!-- 기타 -->
                <div
                  class="border border-everly-mid_grey w-[160px] h-[160px] rounded-xl flex items-center justify-center"
                  v-if="storeCategory != 'etc'"
                  @click="setCategory(`etc`)"
                >
                  <div class="text-center">
                    <img
                      src="@/assets/icon/etc.svg"
                      alt=""
                      class="inline-block w-20 py-3"
                    />
                    <div class="flex items-center">
                      <div
                        class="rounded-full bg-everly-mid_grey w-[18px] h-[18px] text-everly-dark_grey mx-1"
                      ></div>
                      <div>기타</div>
                    </div>
                  </div>
                </div>
                <div
                  class="border border-everly-main w-[160px] h-[160px] rounded-xl flex items-center justify-center cursor-pointer"
                  @click="setCategory(`etc`)"
                  v-else
                >
                  <div class="text-center">
                    <img
                      src="@/assets/icon/etc_active.svg"
                      alt=""
                      class="inline-block w-20 py-3"
                    />
                    <div class="flex items-center pl-2">
                      <img
                        class="w-[18px] mx-1"
                        src="@/assets/icon/check_circle_blue.svg"
                        alt=""
                      />
                      <div>기타</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="grid gap-4 w-full md:grid-cols-12 grid-cols-1 pt-0">
            <!-- 모바일 게임/서버 검색-->
            <div
              class="text-xs text-everly-dark_grey col-span-9 flex md:hidden"
            >
              <img src="@/assets/icon/info_grey.svg" alt="" class="w-3 pr-1" />
              원하는 게임 및 서버명이 없다면 "기타"를 입력해주세요
            </div>
            <div class="col-span-2 block md:hidden">게임명</div>
            <div class="col-span-9 block md:hidden">
              <div class="flex">
                <div class="flex-grow">
                  <searchItem
                    @click.stop=""
                    :smiliarlist="storeGameSimilar"
                    :status="storeShowGameSimilar"
                    :type="`game`"
                  />
                </div>
              </div>
            </div>
            <div
              class="col-span-2 block md:hidden pt-5"
              v-show="storeShowServerFilter"
            >
              서버명
            </div>
            <div class="col-span-9 block md:hidden">
              <div class="flex" v-show="storeShowServerFilter">
                <div class="flex-grow">
                  <searchItem
                    @click.stop=""
                    :smiliarlist="storeServerSimilar"
                    :status="storeShowServerSimilar"
                    :type="`server`"
                  />
                </div>
              </div>
            </div>
            <!-- 웹 게임/서버 검색-->
            <div class="col-span-2 hidden md:block">
              게임명 서버명을<br />선택해주세요
            </div>
            <div class="col-span-1 hidden md:block"></div>
            <div class="col-span-9 hidden md:block">
              <div class="text-xs text-everly-dark_grey hidden md:flex">
                <img
                  src="@/assets/icon/info_grey.svg"
                  alt=""
                  class="w-4 pr-1"
                />
                원하는 게임 및 서버명이 없다면 "기타"를 입력해주세요
              </div>
              <div class="flex">
                <div class="flex w-1/2">
                  <div class="flex-none py-2">게임검색</div>
                  <div class="flex-grow pl-10 pr-20">
                    <searchItem
                      @click.stop=""
                      :smiliarlist="storeGameSimilar"
                      :status="storeShowGameSimilar"
                      :type="`game`"
                    />
                  </div>
                </div>

                <div class="flex w-1/2" v-show="storeShowServerFilter">
                  <div class="flex-none py-2">서버검색</div>
                  <div class="flex-grow pl-10 pr-20">
                    <searchItem
                      @click.stop=""
                      :smiliarlist="storeServerSimilar"
                      :status="storeShowServerSimilar"
                      :type="`server`"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 키워드가 있고 선택하는 것에 따라 내용이 달라짐 -->
        <div
          v-if="commonStoreGameKeyword != '' && commonStoreServerKeyword != ''"
          class="p-5"
        >
          <div v-if="storeCategory == 'gameMoney'"><writeGamemoney /></div>
          <div v-else-if="storeCategory == 'item'"><writeItem /></div>
          <div v-else-if="storeCategory == 'character'"><WriteCharacter /></div>
          <div v-else-if="storeCategory == 'etc'"><WriteEtc /></div>
          <div v-else class="p-28"></div>
        </div>
        <div v-else class="p-28"></div>
      </div>
      <div class="flex-grow"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWriteStore } from "@/store/modules/home/writeStore";
import { useCommonStore } from "@/store/modules/common/commonStore";
import { storeToRefs } from "pinia";
import searchItem from "@/components/common/searchGameServer.vue";
import writeGamemoney from "./components/writeCategory/writeGamemoney.vue";
import writeItem from "./components/writeCategory/writeItem.vue";
import WriteCharacter from "./components/writeCategory/writeCharacter.vue";
import WriteEtc from "./components/writeCategory/writeEtc.vue";
import { onUnmounted } from "vue";

const commonStore = useCommonStore();
const {
  storeGameSimilar,
  storeShowGameSimilar,
  storeShowServerFilter,
  storeServerSimilar,
  storeShowServerSimilar,
  storeCategory,
  commonStoreGameKeyword,
  commonStoreServerKeyword,
} = storeToRefs(commonStore);

// router에 emit이 있어서 warning에 뜨는 데, 이를 없애기 위한 emit
const emit = defineEmits([`goPay`]);
function goPay() {}

function toggleSellBuy(status: string) {
  writeStore.setstorepostType(status);
}

function setCategory(Category: string) {
  commonStore.setstoreCategory(Category);
  writeStore.setstoreCategory(Category);
}

// 생명주기, 들어가고 나갈때 초기화
// onMounted(() => {
//   commonStore.reset();
//   console.log(`초기화`);
// });
onUnmounted(() => {
  commonStore.reset();
  console.log(`초기화`);
});

const writeStore = useWriteStore();
const { storepostType } = storeToRefs(writeStore);
</script>

<style scoped></style>
