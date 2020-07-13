import * as General from '../lib/general_functions.js';
import * as Cookie from '../lib/cookie_functions.js';
import {get_client_ip_address} from '../core/basics_info.js';

// Track user click when Config.behaviour_tracking is enabled
async function click_tracking(data_endpoint, domain_name, enabled){
  if (enabled) {
   var page_data = {};
   document.addEventListener("click", function(event) {
     var current_visiting_url = window.location.href,
         client_position_x = event.clientX,
         client_position_y = event.clientY,
         page_position_x = event.pageX,
         page_position_y = event.pageY,
         client_action = event.type,
         client_cookie_id = Cookie.checkCookie(),
         click_time = General.millisToMinutesAndSeconds(performance.now()),
         data_type = 'visitor_behaviour',
         data_type_code = 1,
         client_cookie_id = Cookie.checkCookie(),
         element_xpath = General.getXPathForElement(event.srcElement);
         
         page_data = {result: {
           data_type_code:data_type_code,
           data_type: data_type,
           client_cookie_id: client_cookie_id,
           current_visiting_url: current_visiting_url,
           client_position_x: client_position_x,
           client_position_y: client_position_y,
           page_position_x: page_position_x,
           page_position_y: page_position_y,
           client_action: client_action,
           element_xpath: element_xpath,
           click_time: click_time
         },
         status_code: 200
        }

           var currect_domain = window.location.hostname;
           if (domain_name == currect_domain) {
             console.log(page_data)
             console.log('Data has been successfully logged')
             General.post_tracking_data(pdata_endpoint, age_data)
           } else {
             console.log(page_data)
             console.log('I cannot post data from another domain')
           }
       });
     }};

export {click_tracking}
