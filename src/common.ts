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

function comma(str: string) {
  str = String(str);
  return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
}

function uncomma(str: string) {
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

export default {
  inputNumberFormat,
  inputNumberFormatWithLimit,
  uncomma,
  comma,
  numberToKorean,
  timeForToday,
};
