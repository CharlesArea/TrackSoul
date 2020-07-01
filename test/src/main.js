import * as Config from './tracksoul.config.js'
import {visitor_information} from './core/request_tracking.js';
import {input_tracking} from './core/input_tracking.js';
import {click_tracking} from './core/click_tracking.js';
import {specific_tracking} from './core/specific_tracking.js';


visitor_information(Config.script_domain);
input_tracking(Config.script_domain, Config.input_tracking);
click_tracking(Config.script_domain, Config.behaviour_tracking);

//User can define Specific tracking point based on their needs
specific_tracking(Config.script_domain, Config.specific_tracking, 'http://localhost:3000/index.html', '/html[1]/body[1]/h1[3]', 'Test Specifc path');

