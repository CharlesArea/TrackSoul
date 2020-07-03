[![Build Status](https://travis-ci.com/CharlesArea/TrackSoul.svg?token=pxmW9t2DsBfasrmRRuDf&branch=master)](https://travis-ci.com/CharlesArea/TrackSoul)
[![star](https://gitee.com/CharlesArea/TrackSoul/badge/star.svg?theme=dark)](https://gitee.com/CharlesArea/TrackSoul/stargazers)
<p align="center">
  <a href="https://github.com/CharlesArea/TrackSoul//">
    <img width=50% style="padding-top:0px" src="https://images.gitee.com/uploads/images/2020/0703/201740_3cd703d0_7753386.png">
  </a>
</p>
 
Readme - [中文](https://github.com/CharlesArea/TrackSoul/blob/master/README.CN.md)

TrackSoul is an open-source, cross-platform solution for Event Tracking. It supports Website, Web APP, IOS, Android or even mini-program on WeChat. For more information on using TrackSoul, see the [TrackSoul Website](https://github.com/CharlesArea/TrackSoul/)

##### Codeless Tracking Demo Site- [JsFiddle](https://jsfiddle.net/beatyoup/0dga8L52/7/) (Remember to open console in order to see the effect)

# Table of Contents

* [Description](#Description)
* [Platform architecture](#Platform-architecture)
* [Codeless tracking Usage example screenshots](#Codeless-Usage-demo-screenshots)
	* [Requesting demo screenshot](#Requesting-demo-screenshot-IP-address-hidden)
	* [Click event demo screenshot](#Click-event-demo-screenshot-IP-address-hidden)
	* [Input event demo screenshot](#Input-event-demo-screenshot-IP-address-hidden)
* [Specific tracking path Usage demo example](#Specific-tracking-Usage-demo-example)
* [SDK Config](#SDK-Config)
* [Module bundler](#Module-bundler)
* [SDK script usage](#SDK-script-usage)
* [SDK Releases](#SDK-Releases)
* [Application analysis panel](#Application-analysis-panel)
	* [Adding a tracking point](#Adding-a-tracking-point)

## Description

This is a user behavior Javascript SDK planned to support Website, Web APP, WeChat mini-program, and Native APP Both Android and IOS in the coming future.

The only stable method to improve your user experience for your audience is to rely on user behavior data. No matter deciding on enhancing user interface, marketing, make sales, and even predictive analytics. 

Collecting data is not hard, to maximum the efficiency of the data usage is what we wanted to focus on, we wanted to provide a total solution from collecting to analysing.

We wanted to build a long-going maintainable ecosystem for this project to spread out for the freedom of user behavior.

## Platform architecture

<p align="center">
  <a href="https://github.com/CharlesArea/TrackSoul//">
    <img style="padding-top:0px" src="https://images.gitee.com/uploads/images/2020/0703/201740_681af1ef_7753386.png">
  </a>
</p>

## Codeless Usage demo screenshots
#### Requesting demo screenshot (IP address hidden)
<p align="center">
  <a href="https://jsfiddle.net/beatyoup/0dga8L52/7/">
    <img style="padding-top:0px" src="https://images.gitee.com/uploads/images/2020/0703/201740_7ba8064d_7753386.png">
  </a>
</p>

#### Click event demo screenshot (IP address hidden)
<p align="center">
  <a href="https://jsfiddle.net/beatyoup/0dga8L52/7/">
    <img style="padding-top:0px" src="https://images.gitee.com/uploads/images/2020/0703/201741_304aec0c_7753386.png">
  </a>
</p>

#### Input event demo screenshot (IP address hidden)
<p align="center">
  <a href="https://jsfiddle.net/beatyoup/0dga8L52/7/">
    <img style="padding-top:0px" src="https://images.gitee.com/uploads/images/2020/0703/201740_79cfe9a0_7753386.png">
  </a>
</p>
<br>

## Specific tracking Usage demo example

```js
specific_tracking(Config.script_domain, Config.specific_tracking, 'http://localhost:3000/index.html', '/html[1]/body[1]/h1[3]', 'Test Specifc path');

```

## SDK Config
| Name | Type | Example | Description|
|--|--|--|--|
| sdk_name | string | TrackSoul | Our Javascript SDK name |
| data_endpoint | string | https://tracksoul.com/tracking/data | Set the endpoint where the tracking data send to |
| input_tracking | boolean | true | Enable / Disable tracking input data |
| behaviour_tracking | boolean | true | Enable / Disable tracking click data |

## Module bundler
I have chosen [Roll.js](https://github.com/rollup/rollup) and had fall in love ♥ with it
Simple just install via npm and run the script below in your terminal / cmd
```bash
# installing rollup
npm install --global rollup
```
```bash
# compile to a <script> containing a self-executing function
rollup -c
```

## SDK script usage
Point to an external/internal JavaScript file like below
```html
<html>
    <head>
    <!-- Link our Tracksoul dist javascript sdk like below --> 
    <script src="tracksoul-0.0.1.min.js"></script>
    </head>

    <body></body>
</html>
```
## SDK Releases

Coming soon

## Application analysis panel
#### Adding a tracking point
<p align="center">
  <a href="https://github.com/CharlesArea/TrackSoul//">
    <img width=100% style="padding-top:0px" src="https://images.gitee.com/uploads/images/2020/0703/201741_132b39cf_7753386.png">
  </a>
</p>
 
