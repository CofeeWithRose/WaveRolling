# WaveRolling

流式的绘制wav波形, 快速响应，更高的性能， 更少的内存占用 .

To make it possible to show the wave of  audio size more than 1GB  in canvas.

It is draw while downloading, less memory an fast.

it only support wav format encoded PCM audio.

## 浏览器支持 Browser and encode support.

 由于基于 fetch\offlineAudioContext\ArrayBuffer\DatatView Api 只能在现代浏览器上使用,仅支持wav格式，由于firefox解码实现限制，仅支持8/16位的音频（12/32位音频将解码失败），.
 
 It only suport standard wav audio file (firefox only suport 8/16 bitwide, 12/32 is not suport decode);
 
 because using fetch\offlineAudioContext\ArrayBuffer\DatatView Api, it is only support  modren browser.
 

![demo](https://github.com/CofeeWithRose/WaveRolling/blob/master/source/waverolling.png?raw=true)

## start the demo
---
	npm i
	
	npm start
	
	copy a test.wav file to dist/source directory
	
	http://localhost:3000
	
	tou can also select wav file in browser.

## 基本使用 basic
----

	
	import { WaveRolling } from 'wave-rolling';// you shold execut " npm i wave-rolling " first.

	// instance the WaveVisual.
	const waveRolling = WaveRolling.create(
		document.querySelector('#container'),// the container of canvas.
	);
	
	
	const data = {param1:1, param:2}; // the params while requesting the  audio. 
	// load an draw wave in canvas.
	waveRolling.load(`source/${document.querySelector('#input').value}.wav`, {data});
	
	
### 颜色设置 color
----
	import { WaveRolling } from 'wave-rolling';

	// instance the WaveVisual.
	const waveRolling =  WaveRolling.create(
		document.querySelector('#container'),// the container of canvas.
		{ color: [{ offset: 0.2, value: '#ff7373' }, '#37f5e3', '#fb8531']} // set the color of canvas.
	);
	
	
	const data = {param1:1, param:2}; // the params while requesting the  audio. 
	
	waveRolling.load(`source/${document.querySelector('#input').value}.wav`, {data});// load an draw wave in canvas.
	
