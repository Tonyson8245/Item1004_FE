interface card {
  idx: number; // idx
  profile_img: string; // 프로필 이미지
  nickname: string; //닉네일
  certified: boolean; // 인증 여부
  category: string; // 카테고리 (게임머니, 아이템,캐릭터,기타)
  uploadTime: string; //업로드 시간
  game: string; // 게임종류
  server: string; // 서버종류
  title: string; // 제목
  minQty: number; //최소 구매수량
  maxQty: number; // 최대 구매수량
  unit: string; // 단위
  price: string; // 가격
  chatQty: number; // 채팅 갯수
  likeQty: number; // 좋아요 건수
}

export default card;
