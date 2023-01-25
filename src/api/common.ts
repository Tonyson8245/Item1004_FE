import { TokenDto } from "@/domain/auth";
import { useLocalStorage } from "@vueuse/core";

export function checkTokenStatus() {
  var refreshTokenData = localStorage.getItem("refreshToken");
  var accessTokenData = localStorage.getItem("accessToken");
  //refreshToken 이 존재 하지 않는 경우
  if (refreshTokenData == null) {
    // 전체 토큰 정보지우기
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    alert("다시 로그인 해주세요.");
    // 기존 정보 지우기
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    location.href = "/account/login";
  }
  //accessToken 값만 없을 경우
  else if (accessTokenData == null) {
    //새로운 토큰값을 넣어서 실해이 가능하게 한다.
    var token = new TokenDto("accessToken", 1);
    localStorage.removeItem("accessToken");
    useLocalStorage("accessToken", token);
  }
}
