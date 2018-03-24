
export function transform(value: any) {
  return durationFromMsHelper(value);
}
function pad2(num: any) {
  if (num <= 99) {
    num = ('0' + num).slice(-2);
  }
  return num;
}
function durationFromMsHelper(ms: number) {
  let x: number = ms / 1000;
  let seconds: number = pad2(Math.floor(x % 60));
  x /= 60;
  let minutes: number = pad2(Math.floor(x % 60));
  x /= 60;
  let hours: number = Math.floor(x % 24);
  let newHours = hours ? pad2(hours) + ':' : '';
  return newHours + minutes + ':' + seconds;
}
