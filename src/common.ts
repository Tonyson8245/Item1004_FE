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

export default {
  inputNumberFormat,
  inputNumberFormatWithLimit,
  uncomma,
  comma,
};
