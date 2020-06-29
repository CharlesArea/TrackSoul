import * as General from '../lib/general_functions.js';
import * as Cookie from '../lib/cookie_functions.js';
import {get_client_ip_address} from '../core/basics_info.js';


function input_tracking(domain_name, enabled){
  const input_box = document.querySelector('input');

  if(input_box != null){
  // Track user input when Config.input_tracking is enabled
    if (enabled) {
      input_box.addEventListener('input', function(event) {
       var data_type = 'visitor_typing',
           client_cookie_id = Cookie.checkCookie(),
           client_action_on_element = event.srcElement,
           current_visiting_url = window.location.href,
           input_time = General.millisToMinutesAndSeconds(performance.now()),
           input_data = event.data,
           client_ip_address = get_client_ip_address();

       input_data = {
         data_type: data_type,
         current_visiting_url: current_visiting_url,
         client_cookie_id: client_cookie_id,
         client_ip_address: client_ip_address,
         input_time: input_time,
         client_action_on_element: client_action_on_element,
         input_data: input_data,
       }
       console.log(input_data);
      });
      }
    }
    else{
      return null;
    }
}

export {input_tracking}
