import * as General from '../lib/general_functions.js';
import * as Cookie from '../lib/cookie_functions.js';
import {
  get_client_ip_address
} from '../core/basics_info.js';


function input_tracking(domain_name, enabled) {
  const input_box = document.querySelector('input');

  if (input_box != null) {
    // Track user input when Config.input_tracking is enabled
    if (enabled) {
      input_box.addEventListener('input', function(event) {
        var data_type = 'visitor_typing',
          client_cookie_id = Cookie.checkCookie(),
          element_xpath = General.getXPathForElement(event.srcElement),
          current_visiting_url = window.location.href,
          input_time = General.millisToMinutesAndSeconds(performance.now()),
          input_data = event.data,
          input_type = event.inputType,

          input_data = {result:{
            data_type: data_type,
            current_visiting_url: current_visiting_url,
            client_cookie_id: client_cookie_id,
            element_xpath: element_xpath,
            input_time: input_time,
            input_type: input_type,
            input_data: input_data,
          },
          status_code: 200
        }

        var currect_domain = window.location.hostname;
        if (domain_name == currect_domain) {
          console.log(input_data)
          console.log('Data has been successfully logged')
          General.post_tracking_data(page_data)
        } else {
          console.log(input_data)
          console.log('I cannot post data from another domain')
        }
      });
  }
} else {
  return null;
}
}

export {
  input_tracking
}
