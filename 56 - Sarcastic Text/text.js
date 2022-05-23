const inputHook = document.querySelector('[name="text"]');
const resHook = document.querySelector('.result');
const arrFilter = [...document.querySelectorAll('[name="filter"]')];
const funkyLetters = {
  '-': '₋',
  '!': 'ᵎ',
  '?': 'ˀ',
  '(': '⁽',
  ')': '₎',
  '+': '⁺',
  '=': '₌',
  '0': '⁰',
  '1': '₁',
  '2': '²',
  '4': '₄',
  '5': '₅',
  '6': '₆',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
  a: 'ᵃ',
  A: 'ᴬ',
  B: 'ᴮ',
  b: 'ᵦ',
  C: '𝒸',
  d: 'ᵈ',
  D: 'ᴰ',
  e: 'ₑ',
  E: 'ᴱ',
  f: '𝒻',
  F: 'ᶠ',
  g: 'ᵍ',
  G: 'ᴳ',
  h: 'ʰ',
  H: 'ₕ',
  I: 'ᵢ',
  i: 'ᵢ',
  j: 'ʲ',
  J: 'ᴶ',
  K: 'ₖ',
  k: 'ₖ',
  l: 'ˡ',
  L: 'ᴸ',
  m: 'ᵐ',
  M: 'ₘ',
  n: 'ₙ',
  N: 'ᴺ',
  o: 'ᵒ',
  O: 'ᴼ',
  p: 'ᵖ',
  P: 'ᴾ',
  Q: 'ᵠ',
  q: 'ᑫ',
  r: 'ʳ',
  R: 'ᵣ',
  S: 'ˢ',
  s: 'ˢ',
  t: 'ᵗ',
  T: 'ₜ',
  u: 'ᵘ',
  U: 'ᵤ',
  v: 'ᵛ',
  V: 'ᵥ',
  w: '𝓌',
  W: 'ʷ',
  x: 'ˣ',
  X: 'ˣ',
  y: 'y',
  Y: 'Y',
  z: '𝓏',
  Z: 'ᶻ'
};

let tmpVal = inputHook.value;
let tmpFilter;

function writeToScreen() {
  if (tmpVal !== '') {
    resHook.textContent = tmpVal;
  }
}
writeToScreen();

function handleTexts(e) {
  tmpVal = e.target.value;
}
inputHook.addEventListener('change', handleTexts);


function handleFilter(e = null) {
  tmpFilter = e ? e.target.value : '';
  tmpVal = inputHook.value;
  let splitText = tmpVal.split('');

  switch(tmpFilter) {
    case 'sarcastic':
      tmpVal = splitText.map((letter, index) => {
        return index % 3 ? letter.toUpperCase() : letter.toLowerCase();
      }).join('');

      writeToScreen();

      break;
    case 'funky':
      tmpVal = splitText.map((letter, index) => {
        if (index % 2 === 0 && funkyLetters[letter]) {
          return funkyLetters[letter];
        }
        return letter;
      }).join('');

      writeToScreen();

      break;
    case 'unable':
      tmpVal = tmpVal.replace(/\s/g, '...');

      writeToScreen();
      break;
    default:
      console.log('default')
  }
}
handleFilter();

arrFilter.forEach(filter => {
  if (filter.checked) {
    tmpFilter = filter.value;
  }
  filter.addEventListener('change', handleFilter);
});
console.log(tmpFilter)