<template>
  <div>
    <div>아이템천사 마일리지 안내</div>
    <div class="grid md:grid-cols-2 gap-5 text-sm">
      <div class="md:flex">
        <div class="font-bold md:font-normal md:w-[9rem]">전체 마일리지</div>
        <div>출금가능 + 구매 전용 + 거래 사용중 + 출금 요청중</div>
      </div>
      <div class="md:flex">
        <div class="font-bold md:font-normal md:w-[9rem]">
          사용가능 마일리지
        </div>
        <div>구매전용 마일리지 + 출금가능 마일리지</div>
      </div>
      <div class="md:flex">
        <div class="font-bold md:font-normal md:w-[9rem]">
          소멸예정 마일리지
        </div>
        <div>기간 내에 소멸 예정인 마일리지</div>
      </div>
      <div class="md:flex">
        <div class="font-bold md:font-normal md:w-[9rem]">
          출금가능 마일리지
        </div>
        <div>아이템천사 내 거래에서 사용가능하며 출금 가능한 마일리지</div>
      </div>
      <div class="md:flex">
        <div class="font-bold md:font-normal md:w-[9rem]">
          구매전용 마일리지
        </div>
        <div>아이템천사 내 거래에서만 사용가능한 마일리지</div>
      </div>
      <div class="md:flex">
        <div class="font-bold md:font-normal md:w-[9rem]">
          거래 사용중 마일리지
        </div>
        <div>거래에 이미 사용중인 마일리지</div>
      </div>
      <div class="md:flex">
        <div class="font-bold md:font-normal md:w-[9rem]">
          출금 요청중 마일리지
        </div>
        <div>출금가능 마일리지에서 출금을 요청한 마일리지</div>
      </div>
      <div class="md:hidden">
        <div>마일리지 입출금 내역</div>
        <div>
          <span>기간 · 유형 필터</span>를 통해 조회기간을 조정할 수 있으며 입금
          내역, 출금 내역을 구분해서 보실 수 있습니다.
        </div>
        <div>
          입/출금 된 마일리지에서 구매전용 마일리지와 출금가능 마일리지를
          구분해서 표시해드립니다.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
