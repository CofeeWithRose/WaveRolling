!function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=2)}([function(e,t,r){"use strict";var n=Object.prototype.hasOwnProperty,a=Array.isArray,i=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),o=function(e,t){for(var r=t&&t.plainObjects?Object.create(null):{},n=0;n<e.length;++n)void 0!==e[n]&&(r[n]=e[n]);return r};e.exports={arrayToObject:o,assign:function(e,t){return Object.keys(t).reduce(function(e,r){return e[r]=t[r],e},e)},combine:function(e,t){return[].concat(e,t)},compact:function(e){for(var t=[{obj:{o:e},prop:"o"}],r=[],n=0;n<t.length;++n)for(var i=t[n],o=i.obj[i.prop],c=Object.keys(o),s=0;s<c.length;++s){var f=c[s],u=o[f];"object"==typeof u&&null!==u&&-1===r.indexOf(u)&&(t.push({obj:o,prop:f}),r.push(u))}return function(e){for(;e.length>1;){var t=e.pop(),r=t.obj[t.prop];if(a(r)){for(var n=[],i=0;i<r.length;++i)void 0!==r[i]&&n.push(r[i]);t.obj[t.prop]=n}}}(t),e},decode:function(e,t,r){var n=e.replace(/\+/g," ");if("iso-8859-1"===r)return n.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(n)}catch(e){return n}},encode:function(e,t,r){if(0===e.length)return e;var n="string"==typeof e?e:String(e);if("iso-8859-1"===r)return escape(n).replace(/%u[0-9a-f]{4}/gi,function(e){return"%26%23"+parseInt(e.slice(2),16)+"%3B"});for(var a="",o=0;o<n.length;++o){var c=n.charCodeAt(o);45===c||46===c||95===c||126===c||c>=48&&c<=57||c>=65&&c<=90||c>=97&&c<=122?a+=n.charAt(o):c<128?a+=i[c]:c<2048?a+=i[192|c>>6]+i[128|63&c]:c<55296||c>=57344?a+=i[224|c>>12]+i[128|c>>6&63]+i[128|63&c]:(o+=1,c=65536+((1023&c)<<10|1023&n.charCodeAt(o)),a+=i[240|c>>18]+i[128|c>>12&63]+i[128|c>>6&63]+i[128|63&c])}return a},isBuffer:function(e){return!(!e||"object"!=typeof e||!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e)))},isRegExp:function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},merge:function e(t,r,i){if(!r)return t;if("object"!=typeof r){if(a(t))t.push(r);else{if(!t||"object"!=typeof t)return[t,r];(i&&(i.plainObjects||i.allowPrototypes)||!n.call(Object.prototype,r))&&(t[r]=!0)}return t}if(!t||"object"!=typeof t)return[t].concat(r);var c=t;return a(t)&&!a(r)&&(c=o(t,i)),a(t)&&a(r)?(r.forEach(function(r,a){if(n.call(t,a)){var o=t[a];o&&"object"==typeof o&&r&&"object"==typeof r?t[a]=e(o,r,i):t.push(r)}else t[a]=r}),t):Object.keys(r).reduce(function(t,a){var o=r[a];return n.call(t,a)?t[a]=e(t[a],o,i):t[a]=o,t},c)}}},function(e,t,r){"use strict";var n=String.prototype.replace,a=/%20/g;e.exports={default:"RFC3986",formatters:{RFC1738:function(e){return n.call(e,a,"+")},RFC3986:function(e){return e}},RFC1738:"RFC1738",RFC3986:"RFC3986"}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.WaveRolling=void 0;var n=r(3),a=r(4),i=r(5);function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.forEach(function(t){c(e,t,r[t])})}return e}function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var f={Decorder:n.WavDecoder,Render:a.WaveRender,DataTransformer:i.DataTransformer},u=function(){function e(t,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._plugins=o({},f);var n=(r||{}).color;this._render=new this._plugins.Render(t,{color:n})}var t,r,n;return t=e,n=[{key:"use",value:function(e){var t=Object.keys(e||{}).filter(function(e){return!f[e]});if(t.length)throw"[ ".concat(t.join(" , ")," ] is not support.");f=o({},f,e)}},{key:"plugins",value:function(){return o({},f)}}],(r=[{key:"load",value:function(e,t){var r=this;if(this._decoder&&this._decoder.abort(),this._decoder=new this._plugins.Decorder,this._render.clear(),this._render.reset(),this._decoder.onprocess=function(e){var t=e.audioBuffer,n=e.startTime,a=e.endTime,i=e.duration;r._render.render(t,n/i,a/i)},this._decoder.onerror=this.onerror,e instanceof ArrayBuffer)this._decoder.decode(e),this.append=function(e){r._decoder.appendBuffer(e)};else{var n=t||{},a=n.data,i=n.method;this._loadAudio(e,a,i)}}},{key:"append",value:function(e){}},{key:"abort",value:function(){this._decoder&&this._decoder.abort(),this.onabort()}},{key:"onerror",value:function(e){console.error(e)}},{key:"onabort",value:function(){}},{key:"_loadAudio",value:function(e,t,r){var n=this,a=new AbortController,i=a.signal,c=this._plugins.DataTransformer(e,t,r),s=c.url,f=o({signal:i,method:r},c.fetchOptions);fetch(s,f).then(function(e){var t=e.body.getReader();n._decoder.onwaitting=function(){return t.read().then(function(e){if(!e.done){var t=new ArrayBuffer(e.value.length);new Uint8Array(t).set(e.value),n._decoder.appendBuffer(t)}}).catch(function(e){console.error(e)})},n._decoder.onabort=function(){a.abort(),t.cancel().catch(function(e){console.warn("WaveVisual load canceld.")})},t.read().then(function(e){var t=new ArrayBuffer(e.value.length);new Uint8Array(t).set(e.value),n._decoder.decode(t)})}).catch(function(e){console.error(e)})}}])&&s(t.prototype,r),n&&s(t,n),e}();t.WaveRolling=u},function(e,t,r){"use strict";function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}Object.defineProperty(t,"__esModule",{value:!0}),t.WavDecoder=void 0;var a=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,r,a;return t=e,(r=[{key:"decode",value:function(e){this._dataBufferCache=[],this._dataBufferRangeList=[];var t=this._getWavInfo(e),r=t.sampleRate,n=t.numOfChannels,a=t.headBuffer,i=t.dataBuffer,o=t.totalDataByteLength,c=t.bitWide,s=t.byteSpeed,f=t.duration;this._perDataBufferPiceLength=1*r*n*c/8,this._byteSpeed=s,this._duration=f;var u=window.OfflineAudioContext||window.webkitOfflineAudioContext;if(!u)throw this.onerror("Not Suport Error"),"Not Suport Error";this._audioContext=new u(1,this._perDataBufferPiceLength,44100),this._totalDataBufferLength=o,this._headerBuffer=a,this._decodedDataByteLength=0,this._lastCacheIndex=0,this._cachedDataByteLength=0,this._cacheOffset=0,this._cacheDataBufferList(i),this._decodeBufferPice(),this.decode=function(){}}},{key:"appendBuffer",value:function(e){var t=this._cachedDataByteLength>=this._totalDataBufferLength,r=!this._dataBufferRangeList.length;this._cacheDataBufferList(e),!t&&r&&this._decodeBufferPice()}},{key:"abort",value:function(){this._release(),this.onabort()}},{key:"_release",value:function(){this._dataBufferCache=null,this._dataBufferRangeList=null,this._perDataBufferPiceLength=null,this._byteSpeed=0,this._duration=0,this._audioContext=null,this._totalDataBufferLength=0,this._headerBuffer=null,this._decodedDataByteLength=0,this._lastCacheIndex=0,this._cachedDataByteLength=0,this._cacheOffset=0,this._decodeBufferPice=function(){},this.appendBuffer=function(){},this.onprocess=function(){},this.onwaitting=function(){}}},{key:"_cacheDataBufferList",value:function(e){this._dataBufferCache.push(e);var t=this._dataBufferCache.length-1,r=0;if(this._tempBufferRange){var n=this._totalDataBufferLength-this._cachedDataByteLength,a=this._perDataBufferPiceLength-this._tempBufferRange.length;a=a<=n?a:n,e.byteLength>=a?(this._tempBufferRange.segments.push({cacheIndex:t,offset:r,length:a,cacheOffset:this._cacheOffset}),this._tempBufferRange.length+=a,this._cachedDataByteLength+=a,r+=a,this._dataBufferRangeList.push(this._tempBufferRange),this._tempBufferRange=null):(this._tempBufferRange.segments.push({cacheIndex:t,offset:r,length:e.byteLength,cacheOffset:this._cacheOffset}),this._tempBufferRange.length+=e.byteLength,this._cachedDataByteLength+=e.byteLength,r+=e.byteLength)}for(var i=Math.floor((e.byteLength-r)/this._perDataBufferPiceLength),o=0;o<i;o++)this._dataBufferRangeList.push({segments:[{cacheIndex:t,offset:r,length:this._perDataBufferPiceLength,cacheOffset:this._cacheOffset}],length:this._perDataBufferPiceLength}),r+=this._perDataBufferPiceLength,this._cachedDataByteLength+=this._perDataBufferPiceLength;var c=e.byteLength-r;if(c)if(this._cachedDataByteLength+c>=this._totalDataBufferLength){var s=this._totalDataBufferLength-this._cachedDataByteLength;this._dataBufferRangeList.push({segments:[{cacheIndex:t,offset:r,length:s,cacheOffset:this._cacheOffset}],length:s}),this._cachedDataByteLength=this._totalDataBufferLength}else{var f=e.byteLength-r;this._tempBufferRange={segments:[{cacheIndex:t,offset:r,length:f,cacheOffset:this._cacheOffset}],length:f},this._cachedDataByteLength+=f}}},{key:"_decodeBufferPice",value:function(){var e=this,t=this._dataBufferRangeList.shift();if(t){var r=this._getRangeAuidoBuffer(t);this._audioContext.decodeAudioData(r,function(r){var n=e._decodedDataByteLength/e._byteSpeed;e._decodedDataByteLength+=t.length;var a=e._decodedDataByteLength>=e._totalDataBufferLength;a||e._decodeBufferPice(),e.onprocess({audioBuffer:r,startTime:n,endTime:e._decodedDataByteLength/e._byteSpeed,duration:e._duration}),a&&(e._dataBufferCache=null,e.oncomplete(),e._release())},this.onerror)}else this.onwaitting()}},{key:"_getRangeAuidoBuffer",value:function(e){var t=this,r=e.segments,n=e.length,a=new ArrayBuffer(this._headerBuffer.byteLength+n),i=new Uint8Array(a),o=0;this._setWavHeadDataLength(n);var c=new Uint8Array(this._headerBuffer);return i.set(c),o+=this._headerBuffer.byteLength,r.forEach(function(e){var r=e.cacheIndex,n=e.offset,a=e.length,c=e.cacheOffset;r-c!=t._lastCacheIndex&&(t._dataBufferCache.shift(),t._cacheOffset--,t._lastCacheIndex=r-c);var s=r+t._cacheOffset-c,f=t._dataBufferCache[s],u=new Uint8Array(f,n,a);i.set(u,o),o+=a}),a}},{key:"_setWavHeadDataLength",value:function(e){new DataView(this._headerBuffer).setUint32(this._dataLengthOffset,e,!0)}},{key:"_getWavInfo",value:function(e){var t=new DataView(e),r=this._getString(t,0,4),n=this._getString(t,8,4);if("RIFF"!==r||"WAVE"!==n)throw this.onerror(new Error("Format Error.")),"Format Error";this._dataLengthOffset=this._getDataOffset(t);var a=t.getUint32(this._dataLengthOffset,!0),i=t.getUint16(22,!0),o=t.getUint16(34,!0),c=t.getUint32(24,!0),s=t.getUint32(28,!0);return{bitWide:o,sampleRate:c,numOfChannels:i,headBuffer:e.slice(0,this._dataLengthOffset+4),dataBuffer:e.slice(this._dataLengthOffset+4,this._dataLengthOffset+4+a),totalDataByteLength:a,byteSpeed:s,duration:a/s}}},{key:"_getDataOffset",value:function(e){for(var t=20+e.getUint32(16,!0);;){if("data"===this._getString(e,t,4))return 4+t;t+=e.getUint32(t+4,!0)+4+4}}},{key:"_getString",value:function(e,t,r){for(var n="",a=0;a<r;a++)n+=String.fromCharCode(e.getUint8(t+a));return n}},{key:"onprocess",value:function(e){}},{key:"onwaitting",value:function(){}},{key:"oncomplete",value:function(){}},{key:"onabort",value:function(){}},{key:"onerror",value:function(e){console.error(e)}}])&&n(t.prototype,r),a&&n(t,a),e}();t.WavDecoder=a},function(e,t,r){"use strict";function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}Object.defineProperty(t,"__esModule",{value:!0}),t.WaveRender=void 0;var a=function(){function e(t,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e);var n=(r||{}).color;this._canvas=document.createElement("canvas"),this._context=this._canvas.getContext("2d"),this._canvas.width=devicePixelRatio*Math.max(window.screen.width,window.screen.height),this._canvas.style.width="100%",this._canvas.style.height="100%",this._canvas.height=t.clientHeight,this._halfHeight=.5*this._canvas.height,this._color=n,this.reset(),t.appendChild(this._canvas)}var t,r,a;return t=e,(r=[{key:"_setColor",value:function(){var e,t=this;this._color instanceof Array?(e=this._context.createLinearGradient(0,this._halfHeight,this._canvas.width,this._halfHeight),this._color.forEach(function(r,n){if("string"==typeof r)e.addColorStop(n/(t._color.length-1),r);else{var a=r.offset,i=r.value;e.addColorStop(a,i)}})):e=this._color,this._context.strokeStyle=e}},{key:"reset",value:function(){this._setColor()}},{key:"render",value:function(e,t,r){var n=e.getChannelData(0);n=n.map(function(e){return Math.abs(e)});var a=Math.floor(this._canvas.width*t),i=Math.ceil(this._canvas.width*r)-a||10,o=Math.floor(n.length/i)||1;this._context.beginPath(),this._context.strokeStyle=this._color,this._context.lineWidth=1;for(var c=0;c<=i;c++){var s=a+c,f=Math.floor(o*c),u=this._halfHeight*n[f];this._context.moveTo(s,this._halfHeight),this._context.lineTo(s,this._halfHeight+u),this._context.moveTo(s,this._halfHeight),this._context.lineTo(s,this._halfHeight-u)}this._context.stroke()}},{key:"clear",value:function(){this._context.clearRect(0,0,this._canvas.width,this._canvas.height)}}])&&n(t.prototype,r),a&&n(t,a),e}();t.WaveRender=a},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.DataTransformer=function(e,t,r){e=e||"","GET"===(r=r||"GET")?(t=t instanceof FormData?null:(0,n.stringify)(t),e="".concat(e,"?").concat(t),t=null):t=t instanceof FormData?t:JSON.stringify(t);return{url:e,fetchOptions:{}}};var n=r(6)},function(e,t,r){"use strict";var n=r(7),a=r(8),i=r(1);e.exports={formats:i,parse:a,stringify:n}},function(e,t,r){"use strict";var n=r(0),a=r(1),i=Object.prototype.hasOwnProperty,o={brackets:function(e){return e+"[]"},comma:"comma",indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},c=Array.isArray,s=Array.prototype.push,f=function(e,t){s.apply(e,c(t)?t:[t])},u=Date.prototype.toISOString,l={addQueryPrefix:!1,allowDots:!1,charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encoder:n.encode,encodeValuesOnly:!1,formatter:a.formatters[a.default],indices:!1,serializeDate:function(e){return u.call(e)},skipNulls:!1,strictNullHandling:!1},h=function e(t,r,a,i,o,s,u,h,d,p,g,y,v){var _=t;if("function"==typeof u?_=u(r,_):_ instanceof Date?_=p(_):"comma"===a&&c(_)&&(_=_.join(",")),null===_){if(i)return s&&!y?s(r,l.encoder,v):r;_=""}if("string"==typeof _||"number"==typeof _||"boolean"==typeof _||n.isBuffer(_))return s?[g(y?r:s(r,l.encoder,v))+"="+g(s(_,l.encoder,v))]:[g(r)+"="+g(String(_))];var b,m=[];if(void 0===_)return m;if(c(u))b=u;else{var O=Object.keys(_);b=h?O.sort(h):O}for(var B=0;B<b.length;++B){var w=b[B];o&&null===_[w]||(c(_)?f(m,e(_[w],"function"==typeof a?a(r,w):r,a,i,o,s,u,h,d,p,g,y,v)):f(m,e(_[w],r+(d?"."+w:"["+w+"]"),a,i,o,s,u,h,d,p,g,y,v)))}return m};e.exports=function(e,t){var r,n=e,s=function(e){if(!e)return l;if(null!==e.encoder&&void 0!==e.encoder&&"function"!=typeof e.encoder)throw new TypeError("Encoder has to be a function.");var t=e.charset||l.charset;if(void 0!==e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var r=a.default;if(void 0!==e.format){if(!i.call(a.formatters,e.format))throw new TypeError("Unknown format option provided.");r=e.format}var n=a.formatters[r],o=l.filter;return("function"==typeof e.filter||c(e.filter))&&(o=e.filter),{addQueryPrefix:"boolean"==typeof e.addQueryPrefix?e.addQueryPrefix:l.addQueryPrefix,allowDots:void 0===e.allowDots?l.allowDots:!!e.allowDots,charset:t,charsetSentinel:"boolean"==typeof e.charsetSentinel?e.charsetSentinel:l.charsetSentinel,delimiter:void 0===e.delimiter?l.delimiter:e.delimiter,encode:"boolean"==typeof e.encode?e.encode:l.encode,encoder:"function"==typeof e.encoder?e.encoder:l.encoder,encodeValuesOnly:"boolean"==typeof e.encodeValuesOnly?e.encodeValuesOnly:l.encodeValuesOnly,filter:o,formatter:n,serializeDate:"function"==typeof e.serializeDate?e.serializeDate:l.serializeDate,skipNulls:"boolean"==typeof e.skipNulls?e.skipNulls:l.skipNulls,sort:"function"==typeof e.sort?e.sort:null,strictNullHandling:"boolean"==typeof e.strictNullHandling?e.strictNullHandling:l.strictNullHandling}}(t);"function"==typeof s.filter?n=(0,s.filter)("",n):c(s.filter)&&(r=s.filter);var u,d=[];if("object"!=typeof n||null===n)return"";u=t&&t.arrayFormat in o?t.arrayFormat:t&&"indices"in t?t.indices?"indices":"repeat":"indices";var p=o[u];r||(r=Object.keys(n)),s.sort&&r.sort(s.sort);for(var g=0;g<r.length;++g){var y=r[g];s.skipNulls&&null===n[y]||f(d,h(n[y],y,p,s.strictNullHandling,s.skipNulls,s.encode?s.encoder:null,s.filter,s.sort,s.allowDots,s.serializeDate,s.formatter,s.encodeValuesOnly,s.charset))}var v=d.join(s.delimiter),_=!0===s.addQueryPrefix?"?":"";return s.charsetSentinel&&("iso-8859-1"===s.charset?_+="utf8=%26%2310003%3B&":_+="utf8=%E2%9C%93&"),v.length>0?_+v:""}},function(e,t,r){"use strict";var n=r(0),a=Object.prototype.hasOwnProperty,i={allowDots:!1,allowPrototypes:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decoder:n.decode,delimiter:"&",depth:5,ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1},o=function(e){return e.replace(/&#(\d+);/g,function(e,t){return String.fromCharCode(parseInt(t,10))})},c=function(e,t,r){if(e){var n=r.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,i=/(\[[^[\]]*])/g,o=/(\[[^[\]]*])/.exec(n),c=o?n.slice(0,o.index):n,s=[];if(c){if(!r.plainObjects&&a.call(Object.prototype,c)&&!r.allowPrototypes)return;s.push(c)}for(var f=0;null!==(o=i.exec(n))&&f<r.depth;){if(f+=1,!r.plainObjects&&a.call(Object.prototype,o[1].slice(1,-1))&&!r.allowPrototypes)return;s.push(o[1])}return o&&s.push("["+n.slice(o.index)+"]"),function(e,t,r){for(var n=t,a=e.length-1;a>=0;--a){var i,o=e[a];if("[]"===o&&r.parseArrays)i=[].concat(n);else{i=r.plainObjects?Object.create(null):{};var c="["===o.charAt(0)&&"]"===o.charAt(o.length-1)?o.slice(1,-1):o,s=parseInt(c,10);r.parseArrays||""!==c?!isNaN(s)&&o!==c&&String(s)===c&&s>=0&&r.parseArrays&&s<=r.arrayLimit?(i=[])[s]=n:i[c]=n:i={0:n}}n=i}return n}(s,t,r)}};e.exports=function(e,t){var r=function(e){if(!e)return i;if(null!==e.decoder&&void 0!==e.decoder&&"function"!=typeof e.decoder)throw new TypeError("Decoder has to be a function.");if(void 0!==e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new Error("The charset option must be either utf-8, iso-8859-1, or undefined");var t=void 0===e.charset?i.charset:e.charset;return{allowDots:void 0===e.allowDots?i.allowDots:!!e.allowDots,allowPrototypes:"boolean"==typeof e.allowPrototypes?e.allowPrototypes:i.allowPrototypes,arrayLimit:"number"==typeof e.arrayLimit?e.arrayLimit:i.arrayLimit,charset:t,charsetSentinel:"boolean"==typeof e.charsetSentinel?e.charsetSentinel:i.charsetSentinel,comma:"boolean"==typeof e.comma?e.comma:i.comma,decoder:"function"==typeof e.decoder?e.decoder:i.decoder,delimiter:"string"==typeof e.delimiter||n.isRegExp(e.delimiter)?e.delimiter:i.delimiter,depth:"number"==typeof e.depth?e.depth:i.depth,ignoreQueryPrefix:!0===e.ignoreQueryPrefix,interpretNumericEntities:"boolean"==typeof e.interpretNumericEntities?e.interpretNumericEntities:i.interpretNumericEntities,parameterLimit:"number"==typeof e.parameterLimit?e.parameterLimit:i.parameterLimit,parseArrays:!1!==e.parseArrays,plainObjects:"boolean"==typeof e.plainObjects?e.plainObjects:i.plainObjects,strictNullHandling:"boolean"==typeof e.strictNullHandling?e.strictNullHandling:i.strictNullHandling}}(t);if(""===e||null==e)return r.plainObjects?Object.create(null):{};for(var s="string"==typeof e?function(e,t){var r,c={},s=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,f=t.parameterLimit===1/0?void 0:t.parameterLimit,u=s.split(t.delimiter,f),l=-1,h=t.charset;if(t.charsetSentinel)for(r=0;r<u.length;++r)0===u[r].indexOf("utf8=")&&("utf8=%E2%9C%93"===u[r]?h="utf-8":"utf8=%26%2310003%3B"===u[r]&&(h="iso-8859-1"),l=r,r=u.length);for(r=0;r<u.length;++r)if(r!==l){var d,p,g=u[r],y=g.indexOf("]="),v=-1===y?g.indexOf("="):y+1;-1===v?(d=t.decoder(g,i.decoder,h),p=t.strictNullHandling?null:""):(d=t.decoder(g.slice(0,v),i.decoder,h),p=t.decoder(g.slice(v+1),i.decoder,h)),p&&t.interpretNumericEntities&&"iso-8859-1"===h&&(p=o(p)),p&&t.comma&&p.indexOf(",")>-1&&(p=p.split(",")),a.call(c,d)?c[d]=n.combine(c[d],p):c[d]=p}return c}(e,r):e,f=r.plainObjects?Object.create(null):{},u=Object.keys(s),l=0;l<u.length;++l){var h=u[l],d=c(h,s[h],r);f=n.merge(f,d,r)}return n.compact(f)}}]);