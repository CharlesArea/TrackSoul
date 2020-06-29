import * as Config from './tracksoul.config.js'
import {visitor_information} from './core/request_tracking.js';
import {input_tracking} from './core/input_tracking.js';
import {click_tracking} from './core/click_tracking.js';

input_tracking(Config.script_domain, Config.input_tracking, Config.data_endpoint);
click_tracking(Config.script_domain, Config.behaviour_tracking, Config.data_endpoint);
visitor_information(Config.script_domain);
