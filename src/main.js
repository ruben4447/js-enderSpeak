import { data, englishToEnder, enderScriptToEnglish, enderPhoneticToEnglish } from "./translate.js";

function main() {
  const iEnglish = document.getElementById("english");
  const iEnderScript = document.getElementById("ender-script");
  const iEnderPhonetic = document.getElementById("ender-phonetic");

  iEnglish.addEventListener("input", () => {
    let english = iEnglish.value.trim();
    let { ender, phonetic } = englishToEnder(english);
    iEnderScript.value = ender;
    iEnderPhonetic.value = phonetic;
  });

  iEnderScript.addEventListener("input", () => {
    let ender = iEnderScript.value.trim();
    let { english, phonetic } = enderScriptToEnglish(ender);
    iEnglish.value = english;
    iEnderPhonetic.value = phonetic;
  });

  iEnderPhonetic.addEventListener("input", () => {
    let phonetic = iEnderPhonetic.value.trim();
    let { english, ender } = enderPhoneticToEnglish(phonetic);
    iEnglish.value = english;
    iEnderScript.value = ender;
  });

  let p = document.createElement("p");
  p.innerText = data.map(obj => obj.ender).join("");
  iEnderScript.insertAdjacentElement("afterend", p);
}

window.addEventListener("load", main);