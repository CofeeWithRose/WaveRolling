"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var WavDecoder_1 = require("./plugins/WavDecoder");
var WaveRender_1 = require("./plugins/WaveRender");
var DataTransformer_1 = require("./plugins/DataTransformer");
var PLUGINS = {
    Decorder: WavDecoder_1.WavDecoder,
    Render: WaveRender_1.WaveRender,
    DataTransformer: DataTransformer_1.DataTransformer,
};
var WaveRolling = /** @class */ (function () {
    function WaveRolling(containner, options) {
        this.plugins = __assign({}, PLUGINS);
        var color = (options || { color: 'black' }).color;
        this.render = new this.plugins.Render(containner, { color: color });
    }
    /**
     * after use pugins, it will effect all the instance of WaveVisual later.
     *
     * @param { { Decorder?, Render?, DataTransformer? } } plugins.
     */
    WaveRolling.use = function (plugins) {
        var plugsKeys = Object.keys(plugins || {});
        var extraPluginKeys = plugsKeys.filter(function (name) { return !PLUGINS[name]; });
        if (extraPluginKeys.length) {
            throw "[ " + extraPluginKeys.join(' , ') + " ] is not support.";
        }
        PLUGINS = __assign({}, PLUGINS, plugins);
    };
    /**
     * list all plugins.
     */
    WaveRolling.plugins = function () {
        return __assign({}, PLUGINS);
    };
    /**
     * load resouce and draw wave in canvas.
     *
     * @param audioUrl
     * @param options
     */
    WaveRolling.prototype.load = function (audioUrl, options) {
        var _this = this;
        if (this.decoder) {
            this.decoder.abort();
        }
        this.decoder = new this.plugins.Decorder();
        this.render.clear();
        this.render.reset();
        this.decoder.onprocess = function (info) {
            var audioBuffer = info.audioBuffer, startTime = info.startTime, endTime = info.endTime, duration = info.duration;
            _this.render.render(audioBuffer, startTime / duration, endTime / duration);
        };
        this.decoder.onerror = this.onerror;
        var _a = (options || { data: null, method: null }), data = _a.data, method = _a.method;
        this.loadAudio(audioUrl, data, method);
    };
    WaveRolling.prototype.loadBlob = function (arrayBuffer) {
        var _this = this;
        this.decoder.decode(arrayBuffer);
        this.append = function (arrayBuffer) {
            _this.decoder.appendBuffer(arrayBuffer);
        };
    };
    /**
     * it can be user only after load ArrayBuffer.
     * @param {ArrayBuffer} arrayBuffer
     */
    WaveRolling.prototype.append = function (arrayBuffer) {
    };
    WaveRolling.prototype.abort = function () {
        if (this.decoder) {
            this.decoder.abort();
        }
        this.onabort();
    };
    WaveRolling.prototype.onerror = function (error) {
        console.error(error);
    };
    WaveRolling.prototype.onabort = function () {
        // console.warn('WaveVisual abort.');
    };
    WaveRolling.prototype.loadAudio = function (srcUrl, srcData, method) {
        var _this = this;
        var controller = new AbortController();
        var signal = controller.signal;
        var _a = this.plugins.DataTransformer(srcUrl, srcData, method), url = _a.url, fetchOptions = _a.fetchOptions;
        var option = __assign({ signal: signal,
            method: method }, fetchOptions);
        fetch(url, option).then(function (rsp) {
            var fetchReader = rsp.body.getReader();
            _this.decoder.onwaitting = function () { return fetchReader.read().then(function (data) {
                if (!data.done) {
                    var buffer = new ArrayBuffer(data.value.length);
                    var view = new Uint8Array(buffer);
                    view.set(data.value);
                    _this.decoder.appendBuffer(buffer);
                }
            }).catch(function (e) {
                console.error(e);
            }); };
            _this.decoder.onabort = function () {
                controller.abort();
                fetchReader.cancel().catch(function (error) {
                    console.warn('WaveVisual load canceld.');
                });
            };
            fetchReader.read().then(function (data) {
                var buffer = new ArrayBuffer(data.value.length);
                var view = new Uint8Array(buffer);
                view.set(data.value);
                _this.decoder.decode(buffer);
            });
        }).catch(function (e) {
            console.error(e);
        });
    };
    return WaveRolling;
}());
exports.WaveRolling = WaveRolling;
//# sourceMappingURL=index.js.map