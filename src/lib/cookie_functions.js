import {make_tracking_id, ajax} from './general_functions.js';

//Setting the cookie with value
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

  //Get Cookie value
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

  //Checking if the Cookie exsit, generate one if none
function checkCookie() {
    var visitor = getCookie("shiling_tracking");
    if (visitor != "") {
      return visitor;
    } else {
      var visitor_id = make_tracking_id();
      if (visitor_id != "" && visitor_id != null) {
        setCookie("shiling_tracking", visitor_id, 365);
        return false;
      }
    }
}

export {
  setCookie,
  getCookie,
  checkCookie
}
