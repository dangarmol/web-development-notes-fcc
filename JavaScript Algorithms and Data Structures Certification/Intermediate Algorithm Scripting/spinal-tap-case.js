function spinalCase(str) {
  let lowUp = str.match(/[a-z][A-Z]/g);
  let corrected = str;

  if(lowUp) {
    for(let elem of lowUp) {
      corrected = corrected.replace(elem, elem.split("").join(" "))
    }
  }

  return corrected.trim().toLowerCase().split(/[^A-Za-z0-9]/).join("-");
}

console.log(spinalCase("This Is Spinal Tap"));
