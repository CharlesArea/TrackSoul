import * as General from '../lib/general_functions.js';
import * as Cookie from '../lib/cookie_functions.js';
import {get_client_ip_address} from '../core/basics_info.js';

// Track user click when Config.behaviour_tracking is enabled
function click_tracking(domain_name, enabled){
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
         client_action_on_element = event.srcElement,
         x_path = getXPathForElement(event.srcElement),
         click_time = General.millisToMinutesAndSeconds(performance.now()),
         data_type = 'visitor_behaviour',
         client_cookie_id = Cookie.checkCookie(),
         client_ip_address = get_client_ip_address(),

     page_data = {
       data_type: data_type,
       current_visiting_url: current_visiting_url,
       client_position_x: client_position_x,
       client_position_y: client_position_y,
       page_position_x: page_position_x,
       page_position_y: page_position_y,
       client_action: client_action,
       client_action_on_element: client_action_on_element,
       xpath:xpath,
       click_time: click_time,
       client_cookie_id: client_cookie_id,
       client_ip_address: client_ip_address
     };
     var currect_domain = window.location.hostname;
     if (domain_name == currect_domain) {
       console.log(page_data);
       console.log('Data has been successfully logged');
       General.post_tracking_data(page_data);
     } else {
       console.log(page_data);
       console.log('I cannot post data from another domain');
     }
   });
  };
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

function getElementByXPath(path) {
    return (new XPathEvaluator())
        .evaluate(path, document.documentElement, null,
                        XPathResult.FIRST_ORDERED_NODE_TYPE, null)
        .singleNodeValue;
}



export {click_tracking}
