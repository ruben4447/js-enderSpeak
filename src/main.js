import { data, englishToEnder, enderScriptToEnglish, enderPhoneticToEnglish, playAudioData, loadSounds } from "./translate.js";

function main() {
  const iEnglish = document.getElementById("english");
  const iEnderScript = document.getElementById("ender-script");
  const iEnderPhonetic = document.getElementById("ender-phonetic");

  // Play english audio
  let playEnglishBtn = document.createElement("button");
  playEnglishBtn.innerHTML = "&#128266;";
  playEnglishBtn.addEventListener("click", () => {
    playEnglishBtn.disabled = true;
    let voice = new SpeechSynthesisUtterance();
    voice.lang = "en-GB";
    voice.text = iEnglish.value.trim();
    speechSynthesis.speak(voice);
    voice.onend = () => {
      playEnglishBtn.disabled = false;
      speechSynthesis.cancel();
    };
  });
  iEnglish.insertAdjacentElement("afterend", playEnglishBtn);
  playEnglishBtn.insertAdjacentHTML("beforebegin", "<br/>");

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

  // Show alphabet in *bold*
  let p = document.createElement("p");
  p.style.fontWeight = "bold";
  p.innerText = data.map(obj => obj.ender).join("");
  iEnderScript.insertAdjacentElement("afterend", p);

  // Option to play each audio sound
  let table = document.querySelector("table");
  table.createTHead().children[0].insertAdjacentHTML("beforeend", "<th/>");
  for (let tr of table.querySelectorAll("tbody > tr")) {
    let idx = tr.children[0].innerText.charCodeAt(0) - 65;
    let td = document.createElement("td");
    let btn = document.createElement("button");
    btn.innerHTML = "&#128266;";
    btn.addEventListener("click", async () => {
      let audio = data[idx].audio;
      btn.disabled = true;
      await playAudioData(audio);
      btn.disabled = false;
    });
    td.appendChild(btn);
    tr.appendChild(td);
  }

  // Load audio
  loadSounds();
}

window.addEventListener("load", main);