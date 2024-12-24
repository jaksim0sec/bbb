function setCok2(val,age) {
  if (!val) return;
  document.cookie = `${encodeURIComponent(val)}; path=/; max-age=${age};`;
  console.log('SetCook Log')
}

function getCok(name) {

  if(!document.cookie.includes(name)){return null};
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
}
function delCok(name, path = '/') {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path}`;
}
