'use strict';

const sdk_name = 'TrackSoul';
const script_domain = document.getElementById(sdk_name).getAttribute("domain_name");
const client_id = document.getElementById(sdk_name).getAttribute("client_id");
const client_key = document.getElementById(sdk_name).getAttribute("client_key");
const input_tracking = true;
const behaviour_tracking = true;

//Get the currect server time
function currect_date_time() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();    return date;
  }

  // Ajax function for url getting (For pure javascript without using the whole JQuery library)
function ajax(url, method, callback, params = null) {
    var request_result;
    try {
      request_result = new XMLHttpRequest();
    } catch (e) {
      try {
        request_result = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          request_result = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
          alert("Your browser does not support Ajax.");
          return false;
        }
      }
    }
    request_result.onreadystatechange = function() {
      if (request_result.readyState == 4) {
        callback(request_result);
      }
    };
    request_result.open(method, url, true);
    request_result.send(params);
    return request_result;
  }

  //Generating the tracking ID for cookie
function make_tracking_id(length = 10) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  //Sending data to api endpoint
function post_tracking_data(json_data) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", data_endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify(json_data));
  }

  //ms to readable time
function millisToMinutesAndSeconds(ms){
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

function getXPathForElement(element) {
    const idx = (sib, name) => sib
        ? idx(sib.previousElementSibling, name||sib.localName) + (sib.localName == name)
        : 1;
    const segs = elm => !elm || elm.nodeType !== 1
        ? ['']
        : elm.id && document.getElementById(elm.id) === elm
            ? [`id("${elm.id}")`]
            : [...segs(elm.parentNode), `${elm.localName.toLowerCase()}[${idx(elm)}]`];
    return segs(element).join('/');
}

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

// Getting trace api from cloudflare to get client IP and turn string to useable variable
 function get_client_ip_address() {
   return new Promise(function(resolve, reject) {
   var client_info = ajax('https://www.cloudflare.com/cdn-cgi/trace', 'get', function(client_info) {
     var client_information = client_info.responseText;
     var split_client_info = client_information.split("\n");     var client_ip = split_client_info[2].split('=')[1];
     var client_country_zone = split_client_info[8];
     resolve(client_ip);
     return client_ip;
   });
   });
 }

//Getting the visitor information when accessing the site
 function visitor_information(domain_name) {
   var visitor_data = {};
   var current_visiting_url = window.location.href,
       visitor_from = document.referrer,
       visitor_browser = navigator.userAgent,
       visitor_browser_language = navigator.language,
       visitor_os_platform = navigator.platform,
       data_type = 'visitor_visiting',
       server_time = currect_date_time(),
       currect_domain = window.location.hostname,
       client_cookie_id = checkCookie(),
       client_ip_address = get_client_ip_address().then((response) =>{

           visitor_data = {
             data_type: data_type,
             currect_domain: currect_domain,
             current_visiting_url: current_visiting_url,
             visitor_from: visitor_from,
             visitor_browser: visitor_browser,
             visitor_os_platform: visitor_os_platform,
             visitor_browser_language: visitor_browser_language,
             server_time: server_time,
             client_cookie_id: client_cookie_id,
             client_ip_address: response
           };

           console.log(visitor_data);
           if (domain_name == currect_domain) {
             post_tracking_data(visitor_data);
             console.log('Data has been successfully logged');
           } else {
             console.log('I cannot post data from another domain');
           }
           return visitor_data;
         });
       }

function input_tracking$1(domain_name, enabled) {
  const input_box = document.querySelector('input');

  if (input_box != null) {
    // Track user input when Config.input_tracking is enabled
    if (enabled) {
      input_box.addEventListener('input', function(event) {
        var data_type = 'visitor_typing',
          client_cookie_id = checkCookie(),
          element_xpath = getXPathForElement(event.srcElement),
          current_visiting_url = window.location.href,
          input_time = millisToMinutesAndSeconds(performance.now()),
          input_data = event.data,
          input_type = event.inputType,
          // client_ip_address = get_client_ip_address().then((response) =>{

          input_data = {
            data_type: data_type,
            current_visiting_url: current_visiting_url,
            client_cookie_id: client_cookie_id,
            // client_ip_address: response,
            element_xpath: element_xpath,
            input_time: input_time,
            input_type: input_type,
            input_data: input_data,
          };

        var currect_domain = window.location.hostname;
        if (domain_name == currect_domain) {
          console.log(input_data);
          console.log('Data has been successfully logged');
          post_tracking_data(page_data);
        } else {
          console.log(input_data);
          console.log('I cannot post data from another domain');
        }
      });
    // });
  }
} else {
  return null;
}
}

// Track user click when Config.behaviour_tracking is enabled
async function click_tracking(domain_name, enabled){
  if (enabled) {
   var page_data = {};
   document.addEventListener("click", function(event) {
     var current_visiting_url = window.location.href,
         client_position_x = event.clientX,
         client_position_y = event.clientY,
         page_position_x = event.pageX,
         page_position_y = event.pageY,
         client_action = event.type,
         client_cookie_id = checkCookie(),
         click_time = millisToMinutesAndSeconds(performance.now()),
         data_type = 'visitor_behaviour',
         client_cookie_id = checkCookie(),
         element_xpath = getXPathForElement(event.srcElement);
         
         // Disable getting ip address for each clicking behavior
         // client_ip_address = get_client_ip_address().then((response) =>{

         page_data = {
           data_type: data_type,
           current_visiting_url: current_visiting_url,
           client_position_x: client_position_x,
           client_position_y: client_position_y,
           page_position_x: page_position_x,
           page_position_y: page_position_y,
           client_action: client_action,
           element_xpath: element_xpath,
           click_time: click_time,
           client_cookie_id: client_cookie_id
           // client_ip_address: response
         };

           var currect_domain = window.location.hostname;
           if (domain_name == currect_domain) {
             console.log(page_data);
             console.log('Data has been successfully logged');
             post_tracking_data(page_data);
           } else {
             console.log(page_data);
             console.log('I cannot post data from another domain');
           }

         // })
       });
     }}

input_tracking$1(script_domain, input_tracking);
click_tracking(script_domain, behaviour_tracking);
visitor_information(script_domain);
