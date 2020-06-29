import {ajax} from '../lib/general_functions.js';


 // Getting trace api from cloudflare to get client IP and turn string to useable variable
 function get_client_ip_address() {
   return new Promise(function(resolve, reject) {
   var client_ip;
   var client_info = ajax('https://www.cloudflare.com/cdn-cgi/trace', 'get', function(client_info) {
     var client_information = client_info.responseText;
     var split_client_info = client_information.split("\n");;
     var client_ip = split_client_info[2].split('=')[1];
     var client_country_zone = split_client_info[8];
     console.log('haha',client_ip);
     resolve(client_ip);
     return client_ip;
   })
   });
 };


export {get_client_ip_address};
