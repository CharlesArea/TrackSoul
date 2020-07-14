import * as General from '../lib/general_functions.js';
import * as Cookie from '../lib/cookie_functions.js';
import {get_client_ip_address} from '../core/basics_info.js';
import * as Config from '../tracksoul.config.js'

// Track user click when Config.behaviour_tracking is enabled
async function specific_tracking(domain_name, enabled, active_domain, xpath, value_for){
  if (enabled) {
   var specific_data = {};
   var xpath_element = General.getElementByXPath(xpath);
   if(window.location.href == active_domain){
    xpath_element.addEventListener("click", function(event) {
        var current_visiting_url = window.location.href,
            client_position_x = event.clientX,
            client_position_y = event.clientY,
            page_position_x = event.pageX,
            page_position_y = event.pageY,
            client_action = event.type,
            client_cookie_id = Cookie.checkCookie(),
            click_time = General.millisToMinutesAndSeconds(performance.now()),
            data_type = 'visitor_specific_behaviour',
            client_cookie_id = Cookie.checkCookie(),
            element_xpath = General.getXPathForElement(event.srcElement);
            value_for = value_for;

            specific_data = {
            data_type: data_type,
            current_visiting_url: current_visiting_url,
            client_position_x: client_position_x,
            client_position_y: client_position_y,
            page_position_x: page_position_x,
            page_position_y: page_position_y,
            client_action: client_action,
            element_xpath: element_xpath,
            click_time: click_time,
            client_cookie_id: client_cookie_id,
            value_for: value_for
            }

            var currect_domain = window.location.hostname;
            if (domain_name == currect_domain) {
                console.log(specific_data)
                console.log('Data has been successfully logged')
                // TODO
                General.post_tracking_data(Config.data_endpoint, specific_data)
            } else {
                console.log(specific_data)
                console.log('I cannot post data from another domain')
            }
        });
    }
    else{
        console.log('Specific tracking unabled due to the href incorrect');
        return null;
    };

}};

export {specific_tracking}
