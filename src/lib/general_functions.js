/**
 * @Author: Charles Lo <charlesu>
 * @Date:   2020-06-27 11:35
 * @Email:  Developer.CharlesLo@gmail.com
 * @Project: NotesCLI
 * @Last modified by:   charlesu
 * @Last modified time: 2020-06-29 10:28
 */



  //Get the currect server time
function currect_date_time() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();;
    return date;
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
    }
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


export {
  currect_date_time,
  ajax,
  make_tracking_id,
  post_tracking_data,
  millisToMinutesAndSeconds
}