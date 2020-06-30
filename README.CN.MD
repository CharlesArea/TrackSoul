

[![Build Status](https://travis-ci.com/CharlesArea/TrackSoul.svg?token=pxmW9t2DsBfasrmRRuDf&branch=master)](https://travis-ci.com/CharlesArea/TrackSoul)
<p align="center">
  <a href="https://github.com/CharlesArea/TrackSoul//">
    <img width=50% style="padding-top:0px" src="https://i.ibb.co/Qcp1Rb7/logo-transparent.png">
  </a>
</p>


 Readme - [English](https://github.com/CharlesArea/TrackSoul/)
 
TrackSoul是用于事件跟踪的开源，跨平台解决方案。 它支持网站，Web APP，IOS，Android甚至微信上的小程序。 有关使用TrackSoul的更多信息，请参见 [TrackSoul Website](https://github.com/CharlesArea/TrackSoul/)

##### 无埋点跟踪演示站点- [JsFiddle](https://jsfiddle.net/beatyoup/0dga8L52/7/)

# 目录

* [项目介绍](#项目介绍)
* [无代码用法演示屏幕截图](#无代码用法演示屏幕截图)
	* [客户端请求演示截图](#客户端请求演示截图-IP-隐藏)
	* [点击事件演示屏幕截图](#点击事件演示屏幕截图-IP-隐藏)
	* [输入事件演示屏幕截图](#输入事件演示屏幕截图-IP-隐藏)
* [平台架构](#平台架构)
* [SDK配置](#SDK配置)
* [模块打包](#模块打包)
* [脚本使用方法](#脚本使用方法)
* [贡献者](#贡献者)

## 项目介绍

这是一种用户行为分析的解决方案，计划在将来支持Android，IOS的移动应用，网站，Web APP，甚至微信小程序。

改善用户体验的唯一稳定方法是依靠用户行为数据。 无论决定增强用户界面，营销，销售量，还是预测性分析。

收集数据并不难，要最大程度地提高数据使用效率是我们要关注的重点，我们希望提供从收集到分析的整体解决方案。

我们希望为该项目构建一个长期可维护的生态系统，以扩展用户行为的自由度。

## 无代码用法演示屏幕截图
#### 客户端请求演示截图 (IP 隐藏)
<p align="center">
  <a href="https://jsfiddle.net/beatyoup/0dga8L52/7/">
    <img style="padding-top:0px" src="https://i.ibb.co/vJdJJQh/Screenshot-2020-06-29-at-2-15-31-PM.png">
  </a>
</p>

#### 点击事件演示屏幕截图 (IP 隐藏)
<p align="center">
  <a href="https://jsfiddle.net/beatyoup/0dga8L52/7/">
    <img style="padding-top:0px" src="https://i.ibb.co/94wr1PS/Screenshot-2020-06-29-at-2-17-53-PM.png">
  </a>
</p>

#### 输入事件演示屏幕截图 (IP 隐藏)
<p align="center">
  <a href="https://jsfiddle.net/beatyoup/0dga8L52/7/">
    <img style="padding-top:0px" src="https://i.ibb.co/Kyp35bB/Screenshot-2020-06-29-at-2-19-16-PM.png">
  </a>
</p>
<br>

## 平台架构

<p align="center">
  <a href="https://github.com/CharlesArea/TrackSoul//">
    <img style="padding-top:0px" src="https://i.ibb.co/L1yrh80/Diagram.png">
  </a>
</p>

## SDK配置
| 参数名称 | 参数类型 | 范例 | 描述|
|--|--|--|--|
| sdk_name | string | TrackSoul | Our Javascript SDK name |
| data_endpoint | string | https://tracksoul.com/tracking/data | Set the endpoint where the tracking data send to |
| input_tracking | boolean | true | Enable / Disable tracking input data |
| behaviour_tracking | boolean | true | Enable / Disable tracking click data |

## 模块打包
我选择了 [Roll.js](https://github.com/rollup/rollup) 并爱♥上了它
只需简单通过npm安装并在终端/ cmd中运行以下脚本
```bash
# installing rollup
npm install --global rollup
```
```bash
# compile to a <script> containing a self-executing function
rollup -c
```

## 脚本使用方法
指向外部/内部JavaScript文件，如下所示
```html
<html>
	
    <head>
    <!-- Link our Tracksoul dist javascript sdk like below --> 
    <script src="tracksoul-0.0.1.min.js"></script>
    </head>
	
    <body></body>
</html>
```

## 贡献者

[//]: contributor-faces

<a href="https://github.com/CharlesArea"><img src="https://avatars0.githubusercontent.com/u/39610333?v=3" title="CharlesArea" width="80" height="80"></a>

[//]: contributor-faces
