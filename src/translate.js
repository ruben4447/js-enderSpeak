export const data = [
  {
    latin: "A",
    ender: "⏃",
    phonetic: "mm",
  },
  {
    latin: "B",
    ender: "⏚",
    phonetic: "yu"
  },
  {
    latin: "C",
    ender: "☊",
    phonetic: "ch"
  },
  {
    latin: "D",
    ender: "⎅",
    phonetic: "h"
  },
  {
    latin: "E",
    ender: "⟒",
    phonetic: "dd"
  },
  {
    latin: "F",
    ender: "⎎",
    phonetic: "rr"
  },
  {
    latin: "G",
    ender: "☌",
    phonetic: "hf"
  },
  {
    latin: "H",
    ender: "⊑",
    phonetic: "o"
  },
  {
    latin: "I",
    ender: "⟟",
    phonetic: "ya"
  },
  {
    latin: "J",
    ender: "⟊",
    phonetic: "ua"
  },
  {
    latin: "K",
    ender: "☍",
    phonetic: "a"
  },
  {
    latin: "L",
    ender: "⌰",
    phonetic: "i"
  },
  {
    latin: "M",
    ender: "⋔",
    phonetic: "î"
  },
  {
    latin: "N",
    ender: "⋏",
    phonetic: "w"
  },
  {
    latin: "O",
    ender: "⍜",
    phonetic: "ae"
  },
  {
    latin: "P",
    ender: "⌿",
    phonetic: "uo"
  },
  {
    latin: "Q",
    ender: "⍾",
    phonetic: "bv"
  },
  {
    latin: "R",
    ender: "⍀",
    phonetic: "g"
  },
  {
    latin: "S",
    ender: "⌇",
    phonetic: "n"
  },
  {
    latin: "T",
    ender: "⏁",
    phonetic: "ss"
  },
  {
    latin: "U",
    ender: "⎍",
    phonetic: "ai"
  },
  {
    latin: "V",
    ender: "⎐",
    phonetic: "pf"
  },
  {
    latin: "W",
    ender: "⍙",
    phonetic: "jz"
  },
  {
    latin: "X",
    ender: "⌖",
    phonetic: "t"
  },
  {
    latin: "Y",
    ender: "⊬",
    phonetic: "yo"
  },
  {
    latin: "Z",
    ender: "⋉",
    phonetic: "kh"
  },
];

export const vowelStart = ["H", "J", "K", "L", "M", "O", "P", "U"];
export const vowelEnd = ["B", "H", "I", "J", "K", "L", "M", "O", "P", "U", "Y"];

/** Return true if glottal stop required between two characters (latin given) */
export function reqGlottal(c1, c2) {
  let a1 = c1.toUpperCase().charCodeAt(0);
  if (a1 >= 65 && a1 <= 90) {
    let a2 = c2.toUpperCase().charCodeAt(0);
    if (a2 >= 65 && a2 <= 90) {
      return vowelEnd.includes(data[a1 - 65].latin) === vowelStart.includes(data[a2 - 65].latin);
    }
  }
}

/** Given input in Endlish, return Enderian Script and Enderian Phonetic translations */
export function englishToEnder(english) {
  english = english.toUpperCase();
  let ender = "", phonetic = "";
  for (let i = 0; i < english.length; ++i) {
    let ascii = english[i].charCodeAt(0);
    if (ascii >= 65 && ascii <= 90) {
      ender += data[ascii - 65].ender;
      phonetic += data[ascii - 65].phonetic;
      if (english[i + 1] && reqGlottal(english[i], english[i + 1])) phonetic += "'";
    } else {
      ender += english[i];
      phonetic += english[i];
    }
  }
  return { ender, phonetic };
}

/** Given input in Enderian Script, return Enderian Phonetic and English translations */
export function enderScriptToEnglish(ender) {
  let english = "", capital = true, phonetic = "";
  for (let i = 0; i < ender.length; ++i) {
    let c = ender[i], char = data.find(char => char.ender === c);
    if (char) {
      english += capital ? char.latin : char.latin.toLowerCase();
      phonetic += char.phonetic;
      capital = false;
      if (ender[i + 1]) {
        let nchar = data.find(char => char.ender === ender[i + 1]);
        if (nchar && reqGlottal(char.latin, nchar.latin)) phonetic += "'";
      }
    } else {
      english += c;
      phonetic += c;
      if (c === "." || c === ";" || c === "?" || c === "!") capital = true;
    }
  }
  return { english, phonetic };
}

/** Given input in Enderian Phonetic, return Enderian Script and English translations */
export function enderPhoneticToEnglish(phonetic) {
  phonetic = phonetic.toLowerCase();
  let english = "", ender = "", curr = "", capital = true;
  for (let i = 0; i < phonetic.length; i++) {
    let c = phonetic[i], a = c.charCodeAt(0);
    if (a >= 97 && a <= 122) {
      curr += c;
      let char = data.find(char => char.phonetic === curr);
      if (char) {
        curr = "";
        english += capital ? char.latin : char.latin.toLowerCase();
        capital = false;
        if (c === "." || c === ";" || c === "?" || c === "!") capital = true;
        ender += char.ender;
      } else {

      }
    } else {
      curr = ""; // Clear curr
      if (c !== "'") {
        english += c;
        ender += c;
      }
    }
  }
  if (curr !== "") {
    english += curr;
    phonetic += curr;
  }
  return { english, ender };
}