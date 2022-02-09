/* eslint-disable no-restricted-syntax */
const pths = { '<': '>', '[': ']', '(': ')' };

const verify = (str) => {
  const stack = [];
  for (const e of str) {
    if ('[]<>()'.includes(e)) {
      if (Object.keys(pths).includes(e)) stack.push(e);
      else if (pths[stack.pop()] !== e) return 0;
    }
  }
  return stack.length === 0 ? 1 : 0;
};

console.log(verify('---(++++)----'));
console.log(verify(''));
console.log(verify('before ( middle []) after'));
console.log(verify('<( >)'));
console.log(verify('( [ <> () ] <> )'));
console.log(verify(' (   [)'));
