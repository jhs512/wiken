const getFormData = object => Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
}, new FormData());

function strToHtmlHash(str)
{
    return str.replace(/ /gi, "-");
}

let needToGoHashLater = false;
let urlHash = '';
let urlHashEl = null;

if(window.location.hash) {
  urlHash = decodeURI(window.location.hash.substr(1));
  urlHash = urlHash.replace(/ /gi, "-");
  urlHashEl = document.getElementById(urlHash);
}
