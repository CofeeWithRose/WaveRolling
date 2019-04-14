"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* An audio progresive decoder, only surport wav format in pacm encoding.
*/
var WavDecoder = /** @class */ (function () {
    function WavDecoder() {
    }
    /**
     * start decode when this method execute, if this method excute more than once, nothing will happend.
     *
     * @param {ArrayBuffer} firstPiceArrayBuffer the first splice ArrayBuffer of wave audio data from xhr\fetch\file,
     *  also receive the whole ArrayBuffer.
     */
    WavDecoder.prototype.decode = function (firstPiceArrayBuffer) {
        this._dataBufferCache = [];
        this._dataBufferRangeList = [];
        var _a = this._getWavInfo(firstPiceArrayBuffer), sampleRate = _a.sampleRate, numOfChannels = _a.numOfChannels, headBuffer = _a.headBuffer, dataBuffer = _a.dataBuffer, totalDataByteLength = _a.totalDataByteLength, bitWide = _a.bitWide, byteSpeed = _a.byteSpeed, duration = _a.duration;
        this._perDataBufferPiceLength = 1 * sampleRate * numOfChannels * bitWide / 8;
        this._byteSpeed = byteSpeed;
        this._duration = duration;
        var OfflineAudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
        if (!OfflineAudioContext) {
            this.onerror(new Error('Not Suport Error'));
            throw 'Not Suport Error';
        }
        this._audioContext = new OfflineAudioContext(1, this._perDataBufferPiceLength, 44100);
        this._totalDataBufferLength = totalDataByteLength;
        this._headerBuffer = headBuffer;
        this._decodedDataByteLength = 0;
        this._lastCacheIndex = 0;
        this._cachedDataByteLength = 0;
        this._cacheOffset = 0;
        this._cacheDataBufferList(dataBuffer);
        this._decodeBufferPice();
        this.decode = function () { };
    };
    /**
    * add the rest data to decode.
    *
    * @param {ArrayBuffer} buffer the next pices ArrayBuffer of wave audio, you can append several times before complete,
    * when you append extra data, it will be iignore.
    */
    WavDecoder.prototype.appendBuffer = function (buffer) {
        var isCacheComplete = this._cachedDataByteLength >= this._totalDataBufferLength;
        var isWaitting = !this._dataBufferRangeList.length;
        this._cacheDataBufferList(buffer);
        if (!isCacheComplete && isWaitting) {
            this._decodeBufferPice();
        }
    };
    WavDecoder.prototype.abort = function () {
        this._release();
        this.onabort();
    };
    WavDecoder.prototype._release = function () {
        this._dataBufferCache = null;
        this._dataBufferRangeList = null;
        this._perDataBufferPiceLength = null;
        this._byteSpeed = 0;
        this._duration = 0;
        this._audioContext = null;
        this._totalDataBufferLength = 0;
        this._headerBuffer = null;
        this._decodedDataByteLength = 0;
        this._lastCacheIndex = 0;
        this._cachedDataByteLength = 0;
        this._cacheOffset = 0;
        this._decodeBufferPice = function () { };
        this.appendBuffer = function () { };
        this.onprocess = function () { };
        this.onwaitting = function () { };
    };
    WavDecoder.prototype._cacheDataBufferList = function (bufferPiece) {
        this._dataBufferCache.push(bufferPiece);
        var cacheIndex = this._dataBufferCache.length - 1;
        var offset = 0;
        if (this._tempBufferRange) {
            var maxLength = this._totalDataBufferLength - this._cachedDataByteLength;
            var needLength = this._perDataBufferPiceLength - this._tempBufferRange.length;
            needLength = needLength <= maxLength ? needLength : maxLength;
            if (bufferPiece.byteLength >= needLength) {
                this._tempBufferRange.segments.push({ cacheIndex: cacheIndex, offset: offset, length: needLength, cacheOffset: this._cacheOffset });
                this._tempBufferRange.length += needLength;
                this._cachedDataByteLength += needLength;
                offset += needLength;
                this._dataBufferRangeList.push(this._tempBufferRange);
                this._tempBufferRange = null;
            }
            else {
                this._tempBufferRange.segments.push({ cacheIndex: cacheIndex, offset: offset, length: bufferPiece.byteLength, cacheOffset: this._cacheOffset });
                this._tempBufferRange.length += bufferPiece.byteLength;
                this._cachedDataByteLength += bufferPiece.byteLength;
                offset += bufferPiece.byteLength;
            }
        }
        var segmentNumber = Math.floor((bufferPiece.byteLength - offset) / this._perDataBufferPiceLength);
        for (var i = 0; i < segmentNumber; i++) {
            this._dataBufferRangeList.push({
                segments: [{ cacheIndex: cacheIndex, offset: offset, length: this._perDataBufferPiceLength, cacheOffset: this._cacheOffset }],
                length: this._perDataBufferPiceLength,
            });
            offset += this._perDataBufferPiceLength;
            this._cachedDataByteLength += this._perDataBufferPiceLength;
        }
        var restCacheLength = bufferPiece.byteLength - offset;
        if (restCacheLength) {
            if (this._cachedDataByteLength + restCacheLength >= this._totalDataBufferLength) {
                var length_1 = this._totalDataBufferLength - this._cachedDataByteLength;
                this._dataBufferRangeList.push({
                    segments: [{ cacheIndex: cacheIndex, offset: offset, length: length_1, cacheOffset: this._cacheOffset }],
                    length: length_1,
                });
                this._cachedDataByteLength = this._totalDataBufferLength;
            }
            else {
                var length_2 = bufferPiece.byteLength - offset;
                this._tempBufferRange = {
                    segments: [{ cacheIndex: cacheIndex, offset: offset, length: length_2, cacheOffset: this._cacheOffset }],
                    length: length_2,
                };
                this._cachedDataByteLength += length_2;
            }
        }
    };
    WavDecoder.prototype._decodeBufferPice = function () {
        var _this = this;
        var dataRange = this._dataBufferRangeList.shift();
        if (dataRange) {
            var audioData = this._getRangeAuidoBuffer(dataRange);
            // const audio = document.createElement('audio');
            // audio.controls = true;
            // audio.src = URL.createObjectURL(new File([audioData], 'audio.wav',{type: 'audo/wav'}));
            // document.body.appendChild(audio);
            this._audioContext.decodeAudioData(audioData, function (audioBuffer) {
                var startTime = _this._decodedDataByteLength / _this._byteSpeed;
                _this._decodedDataByteLength += dataRange.length;
                var isComplete = _this._decodedDataByteLength >= _this._totalDataBufferLength;
                if (!isComplete) {
                    _this._decodeBufferPice();
                }
                _this.onprocess({
                    audioBuffer: audioBuffer,
                    startTime: startTime,
                    endTime: _this._decodedDataByteLength / _this._byteSpeed,
                    duration: _this._duration,
                });
                if (isComplete) {
                    _this._dataBufferCache = null;
                    _this.oncomplete();
                    _this._release();
                }
            }, this.onerror);
        }
        else {
            this.onwaitting();
        }
    };
    WavDecoder.prototype._getRangeAuidoBuffer = function (_a) {
        var _this = this;
        var segments = _a.segments, rangeLength = _a.length;
        var dataBuffer = new ArrayBuffer(this._headerBuffer.byteLength + rangeLength);
        var dataView = new Uint8Array(dataBuffer);
        var viewOffset = 0;
        this._setWavHeadDataLength(rangeLength);
        var headView = new Uint8Array(this._headerBuffer);
        dataView.set(headView);
        viewOffset += this._headerBuffer.byteLength;
        segments.forEach(function (_a) {
            var cacheIndex = _a.cacheIndex, offset = _a.offset, length = _a.length, cacheOffset = _a.cacheOffset;
            if (cacheIndex - cacheOffset != _this._lastCacheIndex) {
                _this._dataBufferCache.shift();
                _this._cacheOffset--;
                _this._lastCacheIndex = cacheIndex - cacheOffset;
            }
            var curCacheIndex = cacheIndex + _this._cacheOffset - cacheOffset;
            var buffer = _this._dataBufferCache[curCacheIndex];
            var view = new Uint8Array(buffer, offset, length);
            dataView.set(view, viewOffset);
            viewOffset += length;
        });
        return dataBuffer;
    };
    WavDecoder.prototype._setWavHeadDataLength = function (byteLength) {
        var view = new DataView(this._headerBuffer);
        view.setUint32(this._dataLengthOffset, byteLength, true);
    };
    WavDecoder.prototype._getWavInfo = function (buffer) {
        var view = new DataView(buffer);
        var RIFF = this._getString(view, 0, 4);
        var WAVE = this._getString(view, 8, 4);
        // const encodeType = view.getUint16(20, true);
        if ('RIFF' !== RIFF || 'WAVE' !== WAVE) {
            this.onerror(new Error('Format Error.'));
            throw 'Format Error';
        }
        this._dataLengthOffset = this._getDataOffset(view);
        var totalDataByteLength = view.getUint32(this._dataLengthOffset, true);
        var numOfChannels = view.getUint16(22, true);
        var bitWide = view.getUint16(34, true);
        var sampleRate = view.getUint32(24, true);
        var byteSpeed = view.getUint32(28, true);
        var headBuffer = buffer.slice(0, this._dataLengthOffset + 4);
        var dataBuffer = buffer.slice(this._dataLengthOffset + 4, this._dataLengthOffset + 4 + totalDataByteLength);
        return {
            bitWide: bitWide,
            sampleRate: sampleRate,
            numOfChannels: numOfChannels,
            headBuffer: headBuffer,
            dataBuffer: dataBuffer,
            totalDataByteLength: totalDataByteLength,
            byteSpeed: byteSpeed,
            duration: totalDataByteLength / byteSpeed,
        };
    };
    WavDecoder.prototype._getDataOffset = function (headView) {
        var offset = 16 + 4 + headView.getUint32(16, true);
        var flag = '';
        while (true) {
            flag = this._getString(headView, offset, 4);
            if ('data' === flag) {
                return 4 + offset;
            }
            else {
                offset += headView.getUint32(offset + 4, true) + 4 + 4;
            }
        }
    };
    WavDecoder.prototype._getString = function (dataview, offset, length) {
        var str = '';
        for (var extraOffset = 0; extraOffset < length; extraOffset++) {
            str += String.fromCharCode(dataview.getUint8(offset + extraOffset));
        }
        return str;
    };
    WavDecoder.prototype.onprocess = function (info) {
    };
    WavDecoder.prototype.onwaitting = function () {
    };
    WavDecoder.prototype.oncomplete = function () {
    };
    WavDecoder.prototype.onabort = function () {
    };
    WavDecoder.prototype.onerror = function (error) {
        console.error(error);
    };
    return WavDecoder;
}());
exports.WavDecoder = WavDecoder;
//# sourceMappingURL=WavDecoder.js.map