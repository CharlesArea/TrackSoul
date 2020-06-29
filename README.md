[![Build Status](https://travis-ci.com/CharlesArea/TrackSoul.svg?token=pxmW9t2DsBfasrmRRuDf&branch=master)](https://travis-ci.com/CharlesArea/TrackSoul)
<p align="center">
  <a href="https://github.com/CharlesArea/TrackSoul//">
    <img width=50% style="padding-top:0px" src="https://i.ibb.co/YppXqKY/logo-transparent-1-1.png">
  </a>
</p>



TrackSoul is an open-source, cross-platform solution for Event Tracking. It supports Website, Web APP, IOS, Android or even mini-program on WeChat. For more information on using TrackSoul, see the [TrackSoul Website](https://github.com/CharlesArea/TrackSoul/)

##### Codeless Tracking Demo Site- [JsFiddle](https://jsfiddle.net/beatyoup/0dga8L52/7/)

# Table of Contents

* [Usage demo screenshots](#Usage-demo-screenshots)
	* [Requesting demo screenshot](#Requesting-demo-screenshot-IP-address-hidden)
	* [Click event demo screenshot](#Click-event-demo-screenshot-IP-address-hidden)
	* [Input event demo screenshot](#Input-event-demo-screenshot-IP-address-hidden)
* [SDK Config](#SDK-Config)
* [Module bundler](#Module-bundler)
* [Contributors](#Contributors)


## Usage demo screenshots
#### Requesting demo screenshot (IP address hidden)
<p align="center">
  <a href="https://jsfiddle.net/beatyoup/0dga8L52/7/">
    <img style="padding-top:0px" src="https://i.ibb.co/vJdJJQh/Screenshot-2020-06-29-at-2-15-31-PM.png">
  </a>
</p>

#### Click event demo screenshot (IP address hidden)
<p align="center">
  <a href="https://jsfiddle.net/beatyoup/0dga8L52/7/">
    <img style="padding-top:0px" src="https://i.ibb.co/94wr1PS/Screenshot-2020-06-29-at-2-17-53-PM.png">
  </a>
</p>

#### Input event demo screenshot (IP address hidden)
<p align="center">
  <a href="https://jsfiddle.net/beatyoup/0dga8L52/7/">
    <img style="padding-top:0px" src="https://i.ibb.co/Kyp35bB/Screenshot-2020-06-29-at-2-19-16-PM.png">
  </a>
</p>
<br>

## SDK Config
| Name | Type | Example | Description|
|--|--|--|--|
| sdk_name | string | TrackSoul | Our Javascript SDK name |
| data_endpoint | string | https://tracksoul.com/tracking/data | Set the endpoint where the tracking data send to |
| input_tracking | boolean | true | Enable / Disable tracking input data |
| behaviour_tracking | boolean | true | Enable / Disable tracking click data |

## Module bundler
I have chosen [Roll.js](https://github.com/rollup/rollup) and fall in love ♥ with it
Simple just run the script below in your terminal / cmd
```bash
# compile to a <script> containing a self-executing function
rollup -c
```

## Contributors

[//]: contributor-faces

<a href="https://github.com/CharlesArea"><img src="https://avatars0.githubusercontent.com/u/39610333?v=3" title="CharlesArea" width="80" height="80"></a>

[//]: contributor-faces
