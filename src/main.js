import * as Config from './tracksoul.config.js'
import {visitor_information} from './core/request_tracking.js';
import {input_tracking} from './core/input_tracking.js';
import {click_tracking} from './core/click_tracking.js';

// Run user tracking functions when page got loaded
window.onload = function() {
  input_tracking(Config.script_domain, Config.input_tracking);
  click_tracking(Config.script_domain, Config.behaviour_tracking);
  visitor_information(Config.script_domain);
};
