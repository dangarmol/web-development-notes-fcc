function translatePigLatin(str) {
  if(str[0].match(/[aeiou]/)) {
    return str + "way";
  } else {
    let cluster = str.match(/^[^aeiou]+/)[0];
    return str.split("").slice(cluster.length, str.length).join("") + cluster + "ay";
  }
  return str;
}

console.log(translatePigLatin("glove"));
