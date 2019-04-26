!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var r=e();for(var n in r)("object"==typeof exports?exports:t)[n]=r[n]}}(window,function(){return function(r){var n={};function o(t){if(n[t])return n[t].exports;var e=n[t]={i:t,l:!1,exports:{}};return r[t].call(e.exports,e,e.exports,o),e.l=!0,e.exports}return o.m=r,o.c=n,o.d=function(t,e,r){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=0)}([function(t,e,r){"use strict";r.r(e);var n,o,i,a,h=function(){},s=function(){function t(){this.eventMap={}}return t.prototype.addListener=function(t,e){(this.eventMap[t]=this.eventMap[t]||[]).push(e)},t.prototype.removeListeners=function(t){delete this.eventMap[t]},t.prototype.removeListener=function(t,e){var r=this.eventMap[t];if(r)if(r.length){var n=r.indexOf(e);-1<n&&r.splice(n,1)}else delete this.eventMap[t]},t.prototype.emit=function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];(this.eventMap[t]||[]).slice().forEach(function(t){try{t.apply(void 0,e)}catch(t){console.error(t)}})},t}(),c=function(){function t(){this.triggerProcess={},this.listeners=new s}return t.prototype.addListener=function(t,e){document.body.click,this.listeners.addListener(t,e)},t.prototype.removeListener=function(t,e){this.listeners.removeListener(t,e)},t.prototype.removeListeners=function(t){this.listeners.removeListeners(t)},t.prototype.trigger=function(t,e){var r=this.triggerProcess[t];r?this.listeners.emit(t,r(e)):console.warn("Trigger Error. you must setTriggerProcesser for [ "+t+" ].")},t.prototype.setTriggerProcesser=function(t,e){this.triggerProcess[t]=e},t.prototype.clearListener=function(){this.listeners=new s},t}(),f=(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),u=function(t){function e(){var e=t.call(this)||this;return e.setTriggerProcesser("process",function(t){return t}),e.setTriggerProcesser("waitting",function(){}),e.setTriggerProcesser("complete",function(){}),e.setTriggerProcesser("abort",function(){}),e.setTriggerProcesser("error",function(t){return t}),e.addListener("process",function(t){return e.onprocess(t)}),e.addListener("waitting",function(){return e.onwaitting()}),e.addListener("complete",function(){return e.oncomplete()}),e.addListener("abort",function(){return e.onabort()}),e.addListener("error",function(t){return e.onerror(t)}),e}return f(e,t),e.prototype.decode=function(t){this.dataBufferCache=[],this.dataBufferRangeList=[];var e=this.getWavInfo(t),r=e.sampleRate,n=e.numOfChannels,o=e.headBuffer,i=e.dataBuffer,a=e.totalDataByteLength,s=e.bitWide,c=e.byteSpeed,f=e.duration;this.perDataBufferPiceLength=1*r*n*s/8,this.byteSpeed=c,this.duration=f;var h=window.OfflineAudioContext||window.webkitOfflineAudioContext;if(!h)throw this.onerror(new Error("Not Suport Error")),"Not Suport Error";this.audioContext=new h(1,this.perDataBufferPiceLength,44100),this.totalDataBufferLength=a,this.headerBuffer=o,this.decodedDataByteLength=0,this.lastCacheIndex=0,this.cachedDataByteLength=0,this.cacheOffset=0,this.cacheDataBufferList(i),this.decodeBufferPice(),this.decode=function(){}},e.prototype.appendBuffer=function(t){var e=this.cachedDataByteLength>=this.totalDataBufferLength,r=!this.dataBufferRangeList.length;this.cacheDataBufferList(t),!e&&r&&this.decodeBufferPice()},e.prototype.abort=function(){this.trigger("abort"),this.release()},e.prototype.release=function(){this.dataBufferCache=[],this.dataBufferRangeList=[],this.perDataBufferPiceLength=0,this.byteSpeed=0,this.duration=0,this.totalDataBufferLength=0,this.headerBuffer=new ArrayBuffer(0),this.decodedDataByteLength=0,this.lastCacheIndex=0,this.cachedDataByteLength=0,this.cacheOffset=0,this.decodeBufferPice=function(){},this.appendBuffer=function(){},this.removeListeners("process"),this.removeListeners("waitting"),this.removeListeners("complete")},e.prototype.cacheDataBufferList=function(t){this.dataBufferCache.push(t);var e=this.dataBufferCache.length-1,r=0;if(this.tempBufferRange){var n=this.totalDataBufferLength-this.cachedDataByteLength,o=this.perDataBufferPiceLength-this.tempBufferRange.length;o=o<=n?o:n,t.byteLength>=o?(this.tempBufferRange.segments.push({cacheIndex:e,offset:r,length:o,cacheOffset:this.cacheOffset}),this.tempBufferRange.length+=o,this.cachedDataByteLength+=o,r+=o,this.dataBufferRangeList.push(this.tempBufferRange),this.tempBufferRange=new h):(this.tempBufferRange.segments.push({cacheIndex:e,offset:r,length:t.byteLength,cacheOffset:this.cacheOffset}),this.tempBufferRange.length+=t.byteLength,this.cachedDataByteLength+=t.byteLength,r+=t.byteLength)}for(var i=Math.floor((t.byteLength-r)/this.perDataBufferPiceLength),a=0;a<i;a++)this.dataBufferRangeList.push({segments:[{cacheIndex:e,offset:r,length:this.perDataBufferPiceLength,cacheOffset:this.cacheOffset}],length:this.perDataBufferPiceLength}),r+=this.perDataBufferPiceLength,this.cachedDataByteLength+=this.perDataBufferPiceLength;var s=t.byteLength-r;if(s)if(this.cachedDataByteLength+s>=this.totalDataBufferLength){var c=this.totalDataBufferLength-this.cachedDataByteLength;this.dataBufferRangeList.push({segments:[{cacheIndex:e,offset:r,length:c,cacheOffset:this.cacheOffset}],length:c}),this.cachedDataByteLength=this.totalDataBufferLength}else{var f=t.byteLength-r;this.tempBufferRange={segments:[{cacheIndex:e,offset:r,length:f,cacheOffset:this.cacheOffset}],length:f},this.cachedDataByteLength+=f}},e.prototype.decodeBufferPice=function(){var n=this,o=this.dataBufferRangeList.shift();if(o){var t=this.getRangeAuidoBuffer(o);this.audioContext.decodeAudioData(t,function(t){var e=n.decodedDataByteLength/n.byteSpeed;n.decodedDataByteLength+=o.length;var r=n.decodedDataByteLength>=n.totalDataBufferLength;r||n.decodeBufferPice(),n.trigger("process",{audioBuffer:t,startTime:e,endTime:n.decodedDataByteLength/n.byteSpeed,duration:n.duration}),r&&(n.dataBufferCache=[],n.trigger("complete"),n.release())},function(t){return n.trigger("error",new Error("Format Error"))})}else this.trigger("waitting")},e.prototype.getRangeAuidoBuffer=function(t){var c=this,e=t.segments,r=t.length,n=new ArrayBuffer(this.headerBuffer.byteLength+r),f=new Uint8Array(n),h=0;this.setWavHeadDataLength(r);var o=new Uint8Array(this.headerBuffer);return f.set(o),h+=this.headerBuffer.byteLength,e.forEach(function(t){var e=t.cacheIndex,r=t.offset,n=t.length,o=t.cacheOffset;e-o!==c.lastCacheIndex&&(c.dataBufferCache.shift(),c.cacheOffset--,c.lastCacheIndex=e-o);var i=e+c.cacheOffset-o,a=c.dataBufferCache[i],s=new Uint8Array(a,r,n);f.set(s,h),h+=n}),n},e.prototype.setWavHeadDataLength=function(t){new DataView(this.headerBuffer).setUint32(this.dataLengthOffset,t,!0)},e.prototype.getWavInfo=function(t){var e=new DataView(t),r=this.getString(e,0,4),n=this.getString(e,8,4);if("RIFF"!==r||"WAVE"!==n)throw this.trigger("error",new Error("Format Error.")),"Format Error";this.dataLengthOffset=this.getDataOffset(e);var o=e.getUint32(this.dataLengthOffset,!0),i=e.getUint16(22,!0),a=e.getUint16(34,!0),s=e.getUint32(24,!0),c=e.getUint32(28,!0);return{bitWide:a,sampleRate:s,numOfChannels:i,headBuffer:t.slice(0,this.dataLengthOffset+4),dataBuffer:t.slice(this.dataLengthOffset+4,this.dataLengthOffset+4+o),totalDataByteLength:o,byteSpeed:c,duration:o/c}},e.prototype.getDataOffset=function(t){for(var e=20+t.getUint32(16,!0);;){if("data"===this.getString(t,e,4))return 4+e;e+=t.getUint32(e+4,!0)+4+4}},e.prototype.getString=function(t,e,r){for(var n="",o=0;o<r;o++)n+=String.fromCharCode(t.getUint8(e+o));return n},e.prototype.onprocess=function(t){},e.prototype.onwaitting=function(){},e.prototype.oncomplete=function(){},e.prototype.onabort=function(){},e.prototype.onerror=function(t){console.error(t)},e}(c),l=(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),p=function(t){function e(){return t.call(this)||this}return l(e,t),e}(c),d=(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),g=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return d(e,t),e.prototype.init=function(t,e){var r=(e||{color:"black"}).color;this.canvas=document.createElement("canvas");var n=this.canvas.getContext("2d");n?(this.context=n,this.canvas.width=devicePixelRatio*Math.max(window.screen.width,window.screen.height),this.canvas.style.width="100%",this.canvas.style.height="100%",this.canvas.height=t.clientHeight,this.halfHeight=.5*this.canvas.height,this.color=r||"black",this.reset(),t.appendChild(this.canvas)):console.warn("cont get Context2D from canvas")},e.prototype.setColor=function(){var o,i=this;this.color instanceof Array?(o=this.context.createLinearGradient(0,this.halfHeight,this.canvas.width,this.halfHeight),this.color.forEach(function(t,e){if("string"==typeof t)o.addColorStop(e/(i.color.length-1),t);else{var r=t.offset,n=t.value;o.addColorStop(r,n)}})):o=this.color,this.context.strokeStyle=o},e.prototype.reset=function(){this.setColor()},e.prototype.render=function(t,e,r){var n=t.getChannelData(0),o=Math.floor(this.canvas.width*e),i=Math.floor(this.canvas.width*r)-o||10,a=Math.floor(n.length/i)||1;this.context.beginPath(),this.context.lineWidth=.5;for(var s=0;s<=i;s+=.25){var c=o+s,f=Math.floor(a*s),h=Math.ceil(this.halfHeight*n[f]);this.context.moveTo(c,this.halfHeight+h),this.context.lineTo(c,this.halfHeight-h)}this.context.stroke()},e.prototype.clear=function(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)},e}(p),y=(a=function(t,e){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}a(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),v=function(t){function e(){var f=t.call(this)||this;return f.scaleX=1,f.scaleDelta=1,f.pointArray=new Array,f.offsetPercent=0,f.svgListener=function(t,e){for(var r=0;r<t.length;r++){var n=t[r];if(f.container===n.target){console.log(t);break}}},f.wheelProcesser=function(t){var e=t.viewPercent,r=t.event,n=t.isScale;if(r instanceof WheelEvent){r.returnValue=!1;var o=f.getBoddyLeftOffset(r.target),i=f.getBoddyLeftOffset(f.svg);n=r.deltaY<0,e=(r.clientX+o-i)/f.svg.clientWidth}if(!e)throw"Wheel Event Error: you must has a  viewPercent or event attribuite";var a=e*f.container.clientWidth/f.pointArray.length,s=f.offsetPercent+a,c=a+f.offsetPercent;return{endPercent:c+2*a,startPercent:c,totalPercent:s,isScale:n||!1}},f.onWheel=function(t){var e=t.startPercent,r=(t.endPercent,t.totalPercent,t.isScale);f.scaleX+=r?f.scaleDelta:-f.scaleDelta,f.scaleX=Math.max(f.scaleDelta,f.scaleX),f.offsetPercent=e,f.draw()},f.setTriggerProcesser("wheel",f.wheelProcesser),f.addListener("wheel",f.onWheel),f}return y(e,t),e.prototype.init=function(t,e){var r=this;this.container=t,this.svg=document.createElementNS("http://www.w3.org/2000/svg","svg"),this.svg.style.width="100%",this.clientWidth=t.clientWidth,this.svg.style.height=t.clientHeight+"px",this.halfHeight=.5*t.clientHeight,this.setColor(e||{}),t.appendChild(this.svg),this.svg.addEventListener("wheel",function(t){return r.trigger("wheel",{event:t})}),new MutationObserver(this.svgListener).observe(t,{attributeOldValue:!0,attributes:!0,characterData:!0,characterDataOldValue:!0,childList:!0,subtree:!0})},e.prototype.getPoints=function(){for(var t="",e=Math.floor(this.offsetPercent*this.pointArray.length),r=.1/devicePixelRatio,n=0;n<this.clientWidth;n+=r){var o=Math.ceil(n/this.scaleX+e);t+=n+","+this.pointArray[o]+" "}return t},e.prototype.setColor=function(t){var r=t.color;if(r instanceof Array){var e='<linearGradient id="wave_rolling_color" x1="0%" y1="0%" x2="100%" y2="0%">\n                    '+r.map(function(t,e){return"string"==typeof t?'<stop offset="'+(100*e/r.length-1)+'%" style="stop-color:'+t+';stop-opacity:1"/>':'<stop offset="'+100*t.offset+'%" style="stop-color:'+t.value+';stop-opacity:1"/>'}).join("\n")+"\n                </linearGradient>",n=document.createElementNS("http://www.w3.org/2000/svg","defs");n.innerHTML=e,this.svg.appendChild(n),this.color="url(#wave_rolling_color)"}else this.color=r||"black"},e.prototype.draw=function(){var t=this.svg.querySelector("#waverolling_line");t||((t=document.createElementNS("http://www.w3.org/2000/svg","polyline")).id="waverolling_line",t.setAttribute("style","stroke-width:"+1/devicePixelRatio+"; stroke: "+this.color+";"),this.svg.appendChild(t)),t.setAttribute("points",this.getPoints())},e.prototype.reset=function(){this.scaleX=1,this.scaleDelta=1,this.pointArray=new Array,this.render=this.firstRender},e.prototype.render=function(t,e,r){this.firstRender(t,e,r)},e.prototype.firstRender=function(t,e,r){var n=t.length/r-e;this.scaleX=this.clientWidth/n,this.scaleDelta=this.scaleX,this.afterRender(t,e,r),this.render=this.afterRender},e.prototype.afterRender=function(t,e,r){for(var n=t.getChannelData(0),o=0;o<n.length;o++)this.pointArray.push(this.halfHeight+this.halfHeight*n[o]);this.draw()},e.prototype.getBoddyLeftOffset=function(t){for(var e=0;t!==document.body;)t instanceof HTMLElement&&(e+=t.offsetLeft||0),t=t.parentElement||document.body;return e},e.prototype.clear=function(){},e}(p);function w(t,n,o){return t.forEach(function(t,e){var r=o?o+"["+e+"]":""+e;t instanceof Array?n=w(t,n,r):t instanceof Object?n=b(t,n,r):n+=n?"&"+r+"="+t:r+"="+t}),n}function b(t,e,r){for(var n in t){var o=t[n],i=r?r+"["+n+"]":""+n;o instanceof Array?e=w(o,e,i):o instanceof Object?e=b(o,e,i):e+=e?"&"+i+"="+o:i+"="+o}return e}var L,B,m=(L=function(t,e){return(L=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}L(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),O=function(){return(O=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)},P={Decorder:u,Render:g,HDRender:v,DataTransformer:function(t,e,r){var n,o;return t=t||"",e="GET"===(r=r||"GET")?(t=t+"?"+(e=e instanceof FormData?null:(o="",(n=e)instanceof Array?o=w(n,o,""):n instanceof Object&&(o=b(n,o,"")),o)),null):e instanceof FormData?e:JSON.stringify(e),{url:t,fetchOptions:{body:e,method:r}}}},D=function(e){function t(){var t=e.call(this)||this;return t.setTriggerProcesser("error",function(t){return t}),t.setTriggerProcesser("abort",function(){return null}),t.setTriggerProcesser("click",function(t){return{totalPercent:t.viewPercent||0}}),t.setTriggerProcesser("wheel",function(t){return{totalPercent:t.viewPercent||0,startPercent:0,endPercent:1,isScale:!0}}),t}return m(t,e),t.use=function(t){var e=Object.keys(t||{}).filter(function(t){return!P[t]});if(e.length)throw"[ "+e.join(" , ")+" ] is not support.";P=O({},P,t)},t.plugins=function(){return O({},P)},t.prototype.init=function(t,e){this.plugins=O({},P);var r=e||{color:"",scalable:!1},n=r.color,o=r.scalable;this.render=o?new this.plugins.HDRender:new this.plugins.Render,this.render.init(t,{color:n})},t}(c),_=(B=function(t,e){return(B=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}B(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),x=function(){return(x=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)},A=function(e){function t(){var t=e.call(this)||this;return t.processError=function(t){"AbortError"!==t.name?console.error(t.name):console.warn("WaveVisual load canceld.")},t}return _(t,e),t.create=function(t,e){if(t instanceof HTMLElement){var r=new this;return r.init(t,e),r}throw"Type ERROR: container "+t+" must be HTMLElement!"},t.prototype.load=function(t,e){var r=this.createDecoder(),n=e||{data:null,method:null},o=n.data,i=n.method;this.loadAudio(r,t,o,i||"GET")},t.prototype.loadBlob=function(t){var e=this.createDecoder();e.decode(t),this.append=function(t){e.appendBuffer(t)}},t.prototype.createDecoder=function(){var i=this;if(this.decoder&&this.decoder.abort(),this.plugins.Decorder)return this.decoder=new this.plugins.Decorder,this.render.clear(),this.render.reset(),this.decoder.onprocess=function(t){var e=t.audioBuffer,r=t.startTime,n=t.endTime,o=t.duration;i.render.render(e,r/o,n/o)},this.decoder.onerror=function(t){i.onerror(t),i.trigger("error",t)},this.decoder;throw"Decorder can not be "+this.decoder+"."},t.prototype.append=function(t){},t.prototype.abort=function(){this.decoder&&this.decoder.abort(),this.trigger("abort"),this.onabort()},t.prototype.onerror=function(t){console.error(t)},t.prototype.onabort=function(){},t.prototype.loadAudio=function(n,t,e,r){var o=this,i=window.AbortController&&new AbortController||{signal:null,abort:function(){}},a=i.signal;if(!this.plugins.DataTransformer)throw"DataTransformer Can not be "+this.plugins.DataTransformer;var s=this.plugins.DataTransformer(t,e,r),c=s.url,f=s.fetchOptions,h=x({signal:a,method:r},f);n.addListener("abort",function(){i.abort()}),fetch(c,h).then(function(t){var e=t.body;if(e){var r=e.getReader();n.addListener("abort",function(){r.cancel().catch(o.processError)}),n.onwaitting=function(){return r.read().then(function(t){if(!t.done){var e=new ArrayBuffer(t.value.length);new Uint8Array(e).set(t.value),n.appendBuffer(e)}}).catch(o.processError)},r.read().then(function(t){var e=new ArrayBuffer(t.value.length);new Uint8Array(e).set(t.value),n.decode(e)})}else console.warn("no response body.")}).catch(this.processError)},t}(D);r.d(e,"WaveRolling",function(){return A})}])});