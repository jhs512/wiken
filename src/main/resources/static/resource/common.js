const getFormData = object => Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
}, new FormData());

function strToHtmlHash(str)
{
  str = str
    .trim()
    .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
    .replace(/ /gi, "-");

  if ( str.substr(1, 1) == '-' ) {
    str = str.substr(2);
  }

  return str;
}

let needToGoHashLater = false;
let urlHash = '';
let urlHashEl = null;

if(window.location.hash) {
  urlHash = decodeURI(window.location.hash.substr(1));
  urlHash = urlHash.replace(/ /gi, "-");
  urlHashEl = document.getElementById(urlHash);
}
