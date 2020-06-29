/**
 * @Author: Charles Lo <charlesu>
 * @Date:   2020-06-27 11:30
 * @Email:  Developer.CharlesLo@gmail.com
 * @Project: NotesCLI
 * @Last modified by:   charlesu
 * @Last modified time: 2020-06-29 10:58
 */

const sdk_name = 'TrackSoul'
const data_endpoint = 'https://0a08e46e402c.ngrok.io/users_data'
const script_domain = document.getElementById(sdk_name).getAttribute("domain_name");
const client_id = document.getElementById(sdk_name).getAttribute("client_id");
const client_key = document.getElementById(sdk_name).getAttribute("client_key");
const input_tracking = true
const behaviour_tracking = true


export {sdk_name, data_endpoint, script_domain, client_id, client_key, input_tracking, behaviour_tracking}
