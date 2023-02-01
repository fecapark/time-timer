export function splitIntAndFloatPartWithFixed(num: number, fixed: number = 1) {
  const fixedNum = num.toFixed(fixed);

  return {
    int: fixedNum.slice(0, fixedNum.length - (fixed + 1)),
    float: fixedNum.slice(fixedNum.length - (fixed + 1), fixedNum.length),
  };
}
