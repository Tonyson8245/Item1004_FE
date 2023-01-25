import { isEmpty } from "class-validator";

function inputNumberFormat(obj: HTMLInputElement) {
  obj.value = comma(uncomma(obj.value));
}

function inputNumberFormatWithLimit(
  obj: HTMLInputElement,
  limit1: number,
  limit2: number
) {
  //둘중에 큰값을 리밋으로 둠
  let limit = limit1 > limit2 ? limit2 : limit1;
  if (parseInt(uncomma(obj.value)) > limit)
    obj.value = comma(uncomma(limit.toString()));
  else obj.value = comma(uncomma(obj.value));
}

function comma(str: string | number) {
  str = String(str);
  return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
}

function uncomma(str: string | number) {
  str = String(str);
  return str.replace(/[^\d]+/g, "");
}

export function numberToKorean(number: number) {
  var inputNumber: number = number < 0 ? 0 : number;
  var unitWords = ["", "만", "억", "조", "경"];
  var splitUnit = 10000;
  var splitCount = unitWords.length;
  var resultArray = [];
  var resultString = "";

  for (var i = 0; i < splitCount; i++) {
    var unitResult =
      (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult.toLocaleString();
    }
  }

  for (var i = 0; i < resultArray.length; i++) {
    if (!resultArray[i]) continue;
    resultString = String(resultArray[i]) + unitWords[i] + resultString;
  }

  return resultString;
}
function timeForToday(value: string | Date) {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return "방금전";
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour} 시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay} 일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
}
//특수 문자 유무 체크 정규식
function checkTitle(title: string) {
  var regExp = /^[a-zA-Z0-9ㄱ-힣()\[\]'",./\s]+$/;

  return !regExp.test(title); // 형식에 맞는 경우 true 리턴
}

//최대 최소 확인 정규식
function checkMinMax(min: string, max: string) {
  if (parseInt(max) < parseInt(min)) return true;
  else return false;
}

export function alertMSG(string?: string) {
  if (isEmpty(string)) string = "준비중입니다.";
  alert(string);
}

export function moveExternalLink(
  value:
    | "서비스이용약관"
    | "개인정보처리방침"
    | "청소년보호정책"
    | "거래글신고하기"
    | "유저신고하기"
    | "문의하기"
    | "공지사항"
) {
  var url;
  switch (value) {
    case "서비스이용약관":
      url =
        "https://sites.google.com/view/item1004-terms/서비스-이용약관/service-term-20230126";
      break;
    case "개인정보처리방침":
      url =
        "https://sites.google.com/view/item1004-terms/개인정보-처리방침/개인정보-처리방침-v20230126";
      break;
    case "청소년보호정책":
      url =
        "https://sites.google.com/view/item1004-terms/youth-protection-policy";
      break;
    case "거래글신고하기":
      url =
        "https://docs.google.com/forms/d/e/1FAIpQLScHPtBZasALZuXKsYvLtiMyNr1BqgGSIQ072VXn0NRhPMTBmg/viewform";
      break;
    case "유저신고하기":
      url =
        "https://docs.google.com/forms/d/e/1FAIpQLSe0qobsdPj6sCIe88ssSV2M3j5pZ-lKen45Qu7z72bzgA5yMA/viewform";
      break;
    case "문의하기":
      url =
        "https://docs.google.com/forms/d/e/1FAIpQLSe0qobsdPj6sCIe88ssSV2M3j5pZ-lKen45Qu7z72bzgA5yMA/viewform";
      break;
    case "공지사항":
      url = "https://blog.naver.com/item1004official";
      break;
  }
  window.open(url);
}

export default {
  alertMSG,
  inputNumberFormat,
  inputNumberFormatWithLimit,
  uncomma,
  comma,
  numberToKorean,
  timeForToday,
  checkMinMax,
  checkTitle,
};
