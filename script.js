const PASSWORD = "PRASE_TO_THE_SPAWN"; // <- Replace this with your shared password

function checkPassword() {
  const input = document.getElementById("password").value;
  if (input === PASSWORD) {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("app-screen").style.display = "block";
  } else {
    document.getElementById("login-error").innerText = "❌ Incorrect password!";
  }
}

function vigenereEncrypt(text, key) {
  let result = "";
  key = key.toUpperCase();
  let j = 0;
  for (let i = 0; i < text.length; i++) {
    let c = text[i];
    if (c.match(/[A-Z]/i)) {
      let isLower = c === c.toLowerCase();
      let offset = isLower ? 97 : 65;
      let pi = c.toUpperCase().charCodeAt(0) - 65;
      let ki = key[j % key.length].charCodeAt(0) - 65;
      let ci = (pi + ki) % 26;
      result += String.fromCharCode(ci + offset);
      j++;
    } else {
      result += c;
    }
  }
  return result;
}

function vigenereDecrypt(text, key) {
  let result = "";
  key = key.toUpperCase();
  let j = 0;
  for (let i = 0; i < text.length; i++) {
    let c = text[i];
    if (c.match(/[A-Z]/i)) {
      let isLower = c === c.toLowerCase();
      let offset = isLower ? 97 : 65;
      let ci = c.toUpperCase().charCodeAt(0) - 65;
      let ki = key[j % key.length].charCodeAt(0) - 65;
      let pi = (ci - ki + 26) % 26;
      result += String.fromCharCode(pi + offset);
      j++;
    } else {
      result += c;
    }
  }
  return result;
}

function encode() {
  const input = document.getElementById("input-message").value;
  const key = document.getElementById("key").value;
  if (!key) {
    alert("Please enter a key!");
    return;
  }
  const encrypted = vigenereEncrypt(input, key);
  const encoded = btoa(encrypted); // Base64
  document.getElementById("output").value = encoded;
}

function decode() {
  const input = document.getElementById("input-message").value;
  const key = document.getElementById("key").value;
  if (!key) {
    alert("Please enter a key!");
    return;
  }
  try {
    const decoded = atob(input); // Base64 decode
    const decrypted = vigenereDecrypt(decoded, key);
    document.getElementById("output").value = decrypted;
  } catch (e) {
    alert("Failed to decode. Check your key and input.");
  }
}
