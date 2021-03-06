import * as General from '../lib/general_functions.js';
import * as Cookie from '../lib/cookie_functions.js';
import {get_client_ip_address} from '../core/basics_info.js';
import * as Config from '../tracksoul.config.js'

 //Getting the visitor information when accessing the site
 function visitor_information(domain_name) {
   var visitor_data = {};
   var current_visiting_url = window.location.href,
       visitor_from = document.referrer,
       visitor_browser = navigator.userAgent,
       visitor_browser_language = navigator.language,
       visitor_os_platform = navigator.platform,
       data_type = 'visitor_visiting',
       server_time = General.currect_date_time(),
       currect_domain = window.location.hostname,
       client_cookie_id = Cookie.checkCookie(),
       client_ip_address = get_client_ip_address().then((response) =>{

           visitor_data = {result: {
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
            },
            status_code: 200
          }

           console.log(visitor_data);
           if (domain_name == currect_domain) {
             General.post_tracking_data(Config.data_endpoint+'request', visitor_data);
             console.log('Data has been successfully logged');
           } else {
             console.log('I cannot post data from another domain');
           }
           return visitor_data;
         })
       };

 export {visitor_information};
