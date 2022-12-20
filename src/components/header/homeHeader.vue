<template>
  <div class="bg-[#fafafa]">
    <!-- 웹 팔래요/살래요/검색/등록 -->
    <!-- 검색 : 메인 페이지 & 검색 결과 페이지 -->
    <div>
      <div class="flex cursor-default inline-block">
        <div class="flex-1 hidden md:block"></div>
        <div class="flex-none hidden md:block">
          <div class="flex-none bg-[#fafafa] w-[1180px] px-4 pt-9 relative">
            <div class="flex justify-between items-center h-[3.75em]">
              <div class="flex space-x-4 text-xl">
                <!-- 팔래요 활성화 -->
                <div class="flex space-x-2" v-if="storeSellBuy == 'sell'">
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
                <div class="flex space-x-2" v-if="storeSellBuy == 'sell'">
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
                <div class="flex space-x-2" v-if="storeSellBuy == 'buy'">
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
                <div class="flex space-x-2" v-if="storeSellBuy == 'buy'">
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
              <search
                class="w-[760px] absolute top-[37px] right-[205px]"
                @click.stop=""
              />
              <button
                class="hidden md:block w-[180px] rounded-lg border-everly-dark_grey border h-full"
                @click="router.push(`/write`)"
              >
                거래등록
              </button>
            </div>
            <div class="w-full flex pt-0" v-if="conditionBadge_mobile">
              <div class="flex-1 pr-2"></div>
              <div class="flex-none w-[760px] flex p-3 space-x-3 h-12">
                <!-- 게임머니 베찌 -->
                <div
                  class="flex items-center space-x-2 bg-everly-dark_grey text-everly-white p-2 rounded-xl text-xs font-light cursor-default"
                  v-if="storeCategoryGamemoney"
                >
                  <span>게임머니</span
                  ><img
                    src="@/assets/icon/close_white.svg"
                    class="w-2"
                    alt=""
                    @click="closeFilterBadge(`gamemoney`)"
                  />
                </div>
                <!-- 아이템 베찌-->
                <div
                  class="flex items-center space-x-2 bg-everly-dark_grey text-everly-white p-2 rounded-xl text-xs font-light cursor-default"
                  v-if="storeCategoryItem"
                >
                  <span>아이템</span
                  ><img
                    src="@/assets/icon/close_white.svg"
                    class="w-2"
                    alt=""
                    @click="closeFilterBadge(`item`)"
                  />
                </div>
                <!-- 캐릭터 베찌-->
                <div
                  class="flex items-center space-x-2 bg-everly-dark_grey text-everly-white p-2 rounded-xl text-xs font-light cursor-default"
                  v-if="storeCategoryCharacter"
                >
                  <span>캐릭터</span
                  ><img
                    src="@/assets/icon/close_white.svg"
                    class="w-2"
                    alt=""
                    @click="closeFilterBadge(`character`)"
                  />
                </div>
                <!-- 기타 베찌-->
                <div
                  class="flex items-center space-x-2 bg-everly-dark_grey text-everly-white p-2 rounded-xl text-xs font-light cursor-default"
                  v-if="storeCategoryEtc"
                >
                  <span>기타</span
                  ><img
                    src="@/assets/icon/close_white.svg"
                    class="w-2"
                    alt=""
                    @click="closeFilterBadge(`etc`)"
                  />
                </div>
                <!-- 게임/게임서버 베찌-->
                <div
                  class="flex items-center space-x-2 bg-everly-dark_grey text-everly-white p-2 rounded-xl text-xs font-light cursor-default"
                  v-if="storeServerKeyword != ''"
                >
                  <span>{{ storeGameKeyword }} - {{ storeServerKeyword }}</span
                  ><img
                    src="@/assets/icon/close_white.svg"
                    class="w-2"
                    alt=""
                    @click="closeFilterBadge(`gameServer`)"
                  />
                </div>
              </div>
              <div class="flex-1"></div>
            </div>
            <div v-else class="p-4"></div>
            <div>
              <!-- 웹 필터 -->
              <div
                class="flex cursor-default fixed w-full bg-[#fafafa] w-full min-w-[1180px] pt-2 left-0 top-[186px] border-b-2"
                v-if="storeShowFilter_web"
              >
                <div class="flex-1 hidden md:block"></div>
                <div
                  class="flex-none ml-2 w-[760px] border-everly-main border rounded-lg overflow-hidden bg-everly-white mb-12"
                >
                  <div
                    class="flex justify-between items-center py-2 px-5 text-lg bg-everly-main text-everly-white"
                  >
                    <div>필터를 설정해주세요</div>
                    <div>
                      <img
                        src="@/assets/icon/close_white.svg"
                        alt=""
                        @click="closeFilter()"
                      />
                    </div>
                  </div>
                  <div class="p-1 py-6">
                    <div class="flex w-full">
                      <div class="flex-none px-5 py-10">카테고리</div>
                      <div
                        class="grid grid-cols-4 gap-4 flex-grow justify-items-center"
                      >
                        <!-- 게임머니 -->
                        <div
                          class="border border-everly-mid_grey w-[100px] h-[100px] rounded-xl flex items-center justify-center cursor-default"
                          v-if="!storeCategoryGamemoney"
                          @click="toggleCategory(`gamemoney`)"
                        >
                          <div class="text-center">
                            <img
                              src="@/assets/icon/gamemoney.svg"
                              alt=""
                              class="inline-block w-12"
                            />
                            <div class="flex items-center">
                              <div
                                class="rounded-full bg-everly-mid_grey w-2.5 h-2.5 mx-1"
                              ></div>
                              <div>게임머니</div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="border border-everly-main w-[100px] h-[100px] rounded-xl flex items-center justify-center cursor-default"
                          @click="toggleCategory(`gamemoney`)"
                          v-else
                        >
                          <div class="text-center">
                            <img
                              src="@/assets/icon/gamemoney_active.svg"
                              alt=""
                              class="inline-block w-12"
                            />
                            <div class="flex items-center">
                              <img
                                class="w-2.5 mx-1"
                                src="@/assets/icon/check_circle_blue.svg"
                                alt=""
                              />
                              <div>게임머니</div>
                            </div>
                          </div>
                        </div>
                        <!-- 아이템 -->
                        <div
                          class="border border-everly-mid_grey w-[100px] h-[100px] rounded-xl flex items-center justify-center"
                          v-if="!storeCategoryItem"
                          @click="toggleCategory(`item`)"
                        >
                          <div class="text-center">
                            <img
                              src="@/assets/icon/item.svg"
                              alt=""
                              class="inline-block w-12"
                            />
                            <div class="flex items-center">
                              <div
                                class="rounded-full bg-everly-mid_grey w-2.5 h-2.5 mx-1"
                              ></div>
                              <div>아이템</div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="border border-everly-main w-[100px] h-[100px] rounded-xl flex items-center justify-center cursor-default"
                          @click="toggleCategory(`item`)"
                          v-else
                        >
                          <div class="text-center">
                            <img
                              src="@/assets/icon/item_active.svg"
                              alt=""
                              class="inline-block w-12"
                            />
                            <div class="flex items-center">
                              <img
                                class="w-2.5 mx-1"
                                src="@/assets/icon/check_circle_blue.svg"
                                alt=""
                              />
                              <div>아이템</div>
                            </div>
                          </div>
                        </div>
                        <!-- 캐릭터 -->
                        <div
                          class="border border-everly-mid_grey w-[100px] h-[100px] rounded-xl flex items-center justify-center"
                          v-if="!storeCategoryCharacter"
                          @click="toggleCategory(`character`)"
                        >
                          <div class="text-center">
                            <img
                              src="@/assets/icon/character.svg"
                              alt=""
                              class="inline-block w-12"
                            />
                            <div class="flex items-center">
                              <div
                                class="rounded-full bg-everly-mid_grey w-2.5 h-2.5 mx-1"
                              ></div>
                              <div>캐릭터</div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="border border-everly-main w-[100px] h-[100px] rounded-xl flex items-center justify-center cursor-default"
                          @click="toggleCategory(`character`)"
                          v-else
                        >
                          <div class="text-center">
                            <img
                              src="@/assets/icon/character_active.svg"
                              alt=""
                              class="inline-block w-12"
                            />
                            <div class="flex items-center">
                              <img
                                class="w-2.5 mx-1"
                                src="@/assets/icon/check_circle_blue.svg"
                                alt=""
                              />
                              <div>캐릭터</div>
                            </div>
                          </div>
                        </div>
                        <!-- 기타 -->
                        <div
                          class="border border-everly-mid_grey w-[100px] h-[100px] rounded-xl flex items-center justify-center"
                          v-if="!storeCategoryEtc"
                          @click="toggleCategory(`etc`)"
                        >
                          <div class="text-center">
                            <img
                              src="@/assets/icon/etc.svg"
                              alt=""
                              class="inline-block w-12 py-3"
                            />
                            <div class="flex items-center">
                              <div
                                class="rounded-full bg-everly-mid_grey w-2.5 h-2.5 mx-1"
                              ></div>
                              <div>기타</div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="border border-everly-main w-[100px] h-[100px] rounded-xl flex items-center justify-center cursor-default"
                          @click="toggleCategory(`etc`)"
                          v-else
                        >
                          <div class="text-center">
                            <img
                              src="@/assets/icon/etc_active.svg"
                              alt=""
                              class="inline-block w-12 py-3"
                            />
                            <div class="flex items-center">
                              <img
                                class="w-2.5 mx-1"
                                src="@/assets/icon/check_circle_blue.svg"
                                alt=""
                              />
                              <div>기타</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="flex p-5">
                        <div class="flex w-1/2">
                          <div class="flex-none py-2">게임검색</div>
                          <div class="flex-grow pl-10">
                            <filterSearch
                              @click.stop=""
                              :smiliarlist="storeGameSimilar"
                              :status="storeShowGameSimilar"
                              :type="`game`"
                            />
                          </div>
                        </div>

                        <div class="flex w-1/2" v-show="storeShowServerFilter">
                          <div class="flex-none py-2">서버검색</div>
                          <div class="flex-grow pl-10">
                            <filterSearch
                              @click.stop=""
                              :smiliarlist="storeServerSimilar"
                              :status="storeShowServerSimilar"
                              :type="`server`"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="flex w-full justify-end px-5 space-x-3">
                      <div
                        class="bg-everly-mid_grey text-everly-white px-4 py-2 rounded-lg flex hover:bg-[#3f52fc] cursor-default"
                        @click="refresh"
                      >
                        <img
                          src="@/assets/icon/refresh_white.svg"
                          alt=""
                          class="pr-2"
                        />
                        초기화
                      </div>
                      <div
                        class="bg-everly-main text-everly-white px-4 py-2 rounded-lg flex cursor-default"
                        @click="setFilter"
                      >
                        <img
                          src="@/assets/icon/check_web_white.svg"
                          alt=""
                          class="pr-2"
                        />필터적용
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex-1 hidden md:block"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-1 hidden md:block"></div>
      </div>
    </div>
    <!-- 모바일 팔래요/살래요 -->
    <div
      class="bg-everly-white cursor-default md:hidden z-50 border-b w-full fixed top-[49px]"
    >
      <div class="flex w-full space-x-4 border-b p-4">
        <!--팔래요 활성화 -->
        <div class="flex space-x-1 w-[66px]" v-if="storeSellBuy == 'sell'">
          <img src="@/assets/icon/check_mobile_blue.svg" alt="" />
          <span
            class="text-everly-main font-bold"
            @click="toggleSellBuy('sell')"
            >팔래요</span
          >
        </div>
        <div class="flex space-x-1 w-[66px]" v-if="storeSellBuy == 'sell'">
          <img src="@/assets/icon/check_mobile_grey.svg" alt="" />
          <span class="text-everly-dark_grey" @click="toggleSellBuy('buy')"
            >살래요</span
          >
        </div>

        <!--살래요 활성화 -->
        <div class="flex space-x-1 w-[66px]" v-if="storeSellBuy == 'buy'">
          <img src="@/assets/icon/check_mobile_grey.svg" alt="" />
          <span class="text-everly-dark_grey" @click="toggleSellBuy('sell')"
            >팔래요</span
          >
        </div>
        <div class="flex space-x-1 w-[66px]" v-if="storeSellBuy == 'buy'">
          <img src="@/assets/icon/check_mobile_red.svg" alt="" />
          <span class="text-everly-red font-bold" @click="toggleSellBuy('buy')"
            >살래요</span
          >
        </div>
      </div>
    </div>

    <!-- 모바일 뱃지 -->
    <div
      class="bg-[#fafafa] overflow-x-auto fixed md:hidden top-[106px] w-full bg-opacity-50"
      v-if="conditionBadge_mobile"
    >
      <div class="flex p-3 space-x-3 h-12 px-6">
        <!-- 게임머니 베찌 -->
        <div
          class="flex items-center space-x-2 bg-everly-dark_grey text-everly-white p-2 rounded-xl text-xs font-light cursor-default whitespace-nowrap pr-4"
          v-if="storeCategoryGamemoney"
          @click="closeFilterBadge(`gamemoney`)"
        >
          <span>게임머니</span
          ><img src="@/assets/icon/close_white.svg" class="w-2" alt="" />
        </div>
        <!-- 아이템 베찌-->
        <div
          class="flex items-center space-x-2 bg-everly-dark_grey text-everly-white p-2 rounded-xl text-xs font-light cursor-default whitespace-nowrap pr-4"
          v-if="storeCategoryItem"
          @click="closeFilterBadge(`item`)"
        >
          <span>아이템</span
          ><img src="@/assets/icon/close_white.svg" class="w-2" alt="" />
        </div>
        <!-- 캐릭터 베찌-->
        <div
          class="flex items-center space-x-2 bg-everly-dark_grey text-everly-white p-2 rounded-xl text-xs font-light cursor-default whitespace-nowrap pr-4"
          v-if="storeCategoryCharacter"
          @click="closeFilterBadge(`character`)"
        >
          <span>캐릭터</span
          ><img src="@/assets/icon/close_white.svg" class="w-2" alt="" />
        </div>
        <!-- 기타 베찌-->
        <div
          class="flex items-center space-x-2 bg-everly-dark_grey text-everly-white p-2 rounded-xl text-xs font-light cursor-default whitespace-nowrap pr-4"
          v-if="storeCategoryEtc"
          @click="closeFilterBadge(`etc`)"
        >
          <span>기타</span
          ><img src="@/assets/icon/close_white.svg" class="w-2" alt="" />
        </div>
        <!-- 게임/게임서버 베찌-->
        <div
          class="flex items-center space-x-2 bg-everly-dark_grey text-everly-white p-2 rounded-xl text-xs font-light cursor-default whitespace-nowrap pr-4"
          v-if="storeServerKeyword != '' && storeGameKeyword != ''"
          @click="closeFilterBadge(`gameServer`)"
        >
          <span>{{ storeGameKeyword }} - {{ storeServerKeyword }}</span
          ><img src="@/assets/icon/close_white.svg" class="w-2" alt="" />
        </div>
      </div>
    </div>

    <!-- 모바일 필터 -->
    <transition name="slide-down" move="out-in">
      <div
        class="md:hidden sticky fixed w-full bg-everly-white min-h-[700px] h-screen flex flex-col pt-[105px] z-10"
        v-if="storeShowFilter_mobile"
      >
        <!-- 카테고리 -->
        <div class="flex-none">
          <div
            class="text-xs text-everly-dark_grey bg-everly-light_grey w-full text-center py-3"
          >
            필터를 미리 설정하면 검색 정확도가 높아집니다.
          </div>
          <div class="px-4 text-xs sm:text-sm">
            <div class="text-center text-evelry_dark-grey py-3 sm:py-5">
              카테고리
            </div>
            <div class="grid grid-cols-4 gap-4">
              <!-- 게임머니 -->
              <div
                class="flex justify-center text-everly-dark cursor-default"
                v-if="storeCategoryGamemoney"
                @click="toggleCategory(`gamemoney`)"
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
                class="flex justify-center text-everly-dark_grey cursor-default"
                @click="toggleCategory(`gamemoney`)"
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
                class="flex justify-center text-everly-dark cursor-default"
                @click="toggleCategory(`item`)"
                v-if="storeCategoryItem"
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
                class="flex justify-center text-everly-dark_grey cursor-default"
                @click="toggleCategory(`item`)"
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
                class="flex justify-center text-everly-dark cursor-default"
                @click="toggleCategory(`character`)"
                v-if="storeCategoryCharacter"
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
                class="flex justify-center text-everly-dark_grey cursor-default"
                @click="toggleCategory(`character`)"
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
                class="flex justify-center text-everly-dark cursor-default"
                @click="toggleCategory(`etc`)"
                v-if="storeCategoryEtc"
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
                class="flex justify-center text-everly-dark_grey cursor-default"
                @click="toggleCategory(`etc`)"
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
        </div>
        <!-- 게임/게임서버 검색 -->
        <div class="flex-none">
          <div class="flex flex-col px-5">
            <div
              class="text-center text-xs text-evelry_dark-grey py-3 sm:py-5 mt-10 sm:text-sm"
            >
              게임검색
            </div>
            <filterSearch
              @click.stop=""
              :smiliarlist="storeGameSimilar"
              :status="storeShowGameSimilar"
              :type="`game`"
            />
          </div>
          <div
            class="flex-none flex flex-col px-5"
            v-show="storeShowServerFilter"
          >
            <div
              class="text-center text-xs text-evelry_dark-grey py-3 sm:py-5 mt-10 sm:text-sm"
            >
              서버검색
            </div>
            <filterSearch
              @click.stop=""
              :smiliarlist="storeServerSimilar"
              :status="storeShowServerSimilar"
              :type="`server`"
            />
          </div>
        </div>
        <div
          class="flex-none flex w-full justify-end px-5 space-x-3 absolute bottom-5 pb-10"
        >
          <div
            class="bg-everly-mid_grey text-everly-white px-4 py-2 rounded-lg flex hover:bg-[#3f52fc] cursor-default"
            @click="refresh"
          >
            <img src="@/assets/icon/refresh_white.svg" alt="" class="pr-2" />
            초기화
          </div>
          <div
            class="bg-everly-main text-everly-white px-4 py-2 rounded-lg flex cursor-default"
            @click="setFilter"
          >
            <img
              src="@/assets/icon/check_web_white.svg"
              alt=""
              class="pr-2"
            />필터적용
          </div>
        </div>
      </div>
    </transition>

    <!-- 웹 필터 있던곳 -->

    <!-- 필터가 없을때 생기는 공백 -->

    <!-- 뱃지가 있을때 -->
    <div v-if="storeShowFilter_web && conditionBadge" class="p-5"></div>
    <!-- 뱃지가 없을때 -->
    <div v-if="storeShowFilter_web && !conditionBadge" class=""></div>
  </div>
  <div class="absolute bottom-0"></div>
</template>

<script setup lang="ts">
import filterSearch from "../common/searchGameServer.vue";
import search from "../header/search/searchComponent.vue";
import { useSearchStore } from "../../store/modules/home/searchStore";
import { useCommonStore } from "../../store/modules/common/commonStore";
import { useFilterStore } from "../../store/modules/home/filterStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
//검색 store 가져오기
const searchStore = useSearchStore();

//살래요/팔래요 값 가져오기
const { storeSellBuy } = storeToRefs(searchStore);

function toggleSellBuy(type: string) {
  if (type == `sell`) searchStore.setstoreSellBuy("sell");
  else searchStore.setstoreSellBuy("buy");
}

//필터 store 가져오기
const commonStore = useCommonStore();
const {
  storeGameSimilar,
  storeServerSimilar,
  storeShowGameSimilar,
  storeShowServerSimilar,
  storeShowServerFilter,
  storeGameKeyword,
  storeServerKeyword,
} = storeToRefs(commonStore);

const filterStore = useFilterStore();
const {
  storeShowFilter_web,
  storeCategoryGamemoney,
  storeCategoryItem,
  storeCategoryCharacter,
  storeCategoryEtc,
  storeShowFilter_mobile,
} = storeToRefs(filterStore);

//초기화
function refresh() {
  filterStore.refresh();
}

function toggleCategory(category: string) {
  switch (category) {
    case "gamemoney":
      filterStore.setCategory([
        !storeCategoryGamemoney.value,
        storeCategoryItem.value,
        storeCategoryCharacter.value,
        storeCategoryEtc.value,
      ]);
      break;
    case "item":
      filterStore.setCategory([
        storeCategoryGamemoney.value,
        !storeCategoryItem.value,
        storeCategoryCharacter.value,
        storeCategoryEtc.value,
      ]);
      break;
    case "character":
      filterStore.setCategory([
        storeCategoryGamemoney.value,
        storeCategoryItem.value,
        !storeCategoryCharacter.value,
        storeCategoryEtc.value,
      ]);
      break;
    case "etc":
      filterStore.setCategory([
        storeCategoryGamemoney.value,
        storeCategoryItem.value,
        storeCategoryCharacter.value,
        !storeCategoryEtc.value,
      ]);
      break;
  }
}
// 필터 닫기
function closeFilter() {
  filterStore.cancelstoreFilter();
  filterStore.setstoreShowFilter_web(false);
}

// 필터 설정
function setFilter() {
  filterStore.setstoreShowFilter_web(false);
  filterStore.setstoreShowFilter_mobile(false);
}

//필터 뱃지 설정
function closeFilterBadge(type: string) {
  if (type == "gameServer") {
    commonStore.setstoreGameKeyword("");
    commonStore.setstoreShowServerFilter(false);
    commonStore.setstoreServerKeyword("");
  } else filterStore.changeCategory(type);
}

//필터가 있을때만 뱃지가 보이는 값
const conditionBadge_mobile = computed(() => {
  if (filterStore.storeShowFilter_mobile || filterStore.storeShowFilter_web)
    return false;
  else if (
    !filterStore.storeCategoryGamemoney &&
    !filterStore.storeCategoryEtc &&
    !filterStore.storeCategoryItem &&
    !filterStore.storeCategoryCharacter &&
    commonStore.storeGameKeyword == "" &&
    commonStore.storeServerKeyword == ""
  )
    return false;
  else return true;
});

const conditionBadge = computed(() => {
  if (
    !filterStore.storeTempCategory[0] &&
    !filterStore.storeTempCategory[1] &&
    !filterStore.storeTempCategory[2] &&
    !filterStore.storeTempCategory[3] &&
    filterStore.storeTempKeyword == "-"
  )
    return false;
  else return true;
});
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-1000px);
}
/*  */
.slide-down-enter-active {
  transition: all 0.2s ease-out;
}

.slide-down-leave-active {
  transition: all 0.2s ease-out;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-1000px);
}
</style>
