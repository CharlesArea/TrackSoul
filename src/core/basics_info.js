/**
 * @Author: Charles Lo <charlesu>
 * @Date:   2020-06-29 10:43
 * @Email:  Developer.CharlesLo@gmail.com
 * @Project: NotesCLI
 * @Last modified by:   charlesu
 * @Last modified time: 2020-06-29 10:45
 */


 import {ajax} from '../lib/general_functions.js';


 // Getting trace api from cloudflare to get client IP and turn string to useable variable
 function get_client_ip_address() {
   var client_info = ajax('https://www.cloudflare.com/cdn-cgi/trace', 'get', function(client_info) {
     var client_information = client_info.responseText;
     var split_client_info = client_information.split("\n");;
     var client_ip = split_client_info[2].split('=')[1];;
     var client_country_zone = split_client_info[8];

     return client_ip;
   });
 };


export {get_client_ip_address};
