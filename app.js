const APPKEY = "344b9b661e9a45f4ccc25fe77379ac0f";
var el = function(e){
  if(e.charAt(0)=="#"){
    return document.querySelector(e);
  }
  return document.querySelectorAll(e);
}

var sbox = el("#sbox"),
    sbut = el("#sbut"),
    lcn = el("#lcn"),
    tmp = el("#tmp"),
    hmdt = el("#hmdt"),
    wnd = el("#wnd");

let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + sbox.value + "&appid="+APPKEY;

sbut.onclick = function() {
  httpRequestAsync(searchLink, theResponse);
};

function theResponse(response) {
  let jsonObject = JSON.parse(response);
  lcn.innerHTML = jsonObject.name +", " + jsonObject.sys.country;
  tmp.innerHTML = parseInt(jsonObject.main.temp - 273) + "°";
  hmdt.innerHTML = jsonObject.main.humidity + "%";
  wnd.innerHTML = jsonObject.wind.speed;
}

function httpRequestAsync(url, callback)
{
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState == 4 && httpRequest.status == 200)
            callback(httpRequest.responseText);
    }
    httpRequest.open("GET", url, true); // true for asynchronous
    httpRequest.send();
}
