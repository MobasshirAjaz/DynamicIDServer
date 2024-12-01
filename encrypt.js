const cryptojs = require("crypto-js");

function encrypt(obj) {
  let str = "";

  for (const key in obj) {
    str += obj[key] + "#";
  }
  str = str.slice(0, -1);
  const key = cryptojs.enc.Utf8.parse("mysecretaeskey16");
  const iv = cryptojs.lib.WordArray.random(16);
  const encrypted = cryptojs.AES.encrypt(str, key, { iv: iv });

  const combined =
    iv.toString(cryptojs.enc.Hex) +
    "#" +
    encrypted.ciphertext.toString(cryptojs.enc.Hex);

  console.log(combined);
  return combined;
}

exports.encrypt;
