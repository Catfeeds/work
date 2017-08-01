function pxToRem(num) {
  let baseFontSize = 100;
  let baseDpr = 2;
  let res = num / baseFontSize / baseDpr * 1 + 'rem';
  return res;
}
export { pxToRem };
