"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * create canvas and rend the data of audo on it.
 */
var WaveRender = /** @class */ (function () {
    /**
     * initial the canvas.
     * @param { HTMLElement } container
     * @param { { color: Color | Array<Color>| Array<offset: number, value: Color >, Definition: 1 | 2 } } options
     */
    function WaveRender(container, options) {
        var optionColor = (options || { color: 'black' }).color;
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = devicePixelRatio * Math.max(window.screen.width, window.screen.height);
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.height = container.clientHeight;
        this.halfHeight = this.canvas.height * 0.5;
        this.color = optionColor;
        this.reset();
        container.appendChild(this.canvas);
    }
    WaveRender.prototype.setColor = function () {
        var _this = this;
        var result;
        if (this.color instanceof Array) {
            result = this.context.createLinearGradient(0, this.halfHeight, this.canvas.width, this.halfHeight);
            this.color.forEach(function (item, index) {
                if ('string' === typeof item) {
                    result.addColorStop(index / (_this.color.length - 1), item);
                }
                else {
                    var offset = item.offset, value = item.value;
                    result.addColorStop(offset, value);
                }
            });
        }
        else {
            result = this.color;
        }
        this.context.strokeStyle = result;
    };
    WaveRender.prototype.reset = function () {
        this.setColor();
        // this._context.beginPath();
        // this._context.strokeStyle = this._color;
        // this._context.lineWidth = 1;
        // this._context.moveTo(0, this._halfHeight);
        // this._context.lineTo(this._canvas.width, this._halfHeight);
        // this._context.stroke()
        // this._context.beginPath();
        // this._context.lineWidth = 1;
        // this._context.moveTo(0, this._halfHeight);
    };
    // render(audioBuffer, startPercent, endPercent){
    //     const floatArrayData = audioBuffer.getChannelData(0);
    //     const startX = this._canvas.width * startPercent;
    //     const endX = this._canvas.width * endPercent;
    //     const stepnum = Math.max (Math.floor( 100 *  (endX - startX) ) , 10);
    //     const stepIndex = Math.max( Math.floor(floatArrayData.length/stepnum), 1);
    //     const stepX = ( endX - startX )/ stepnum;
    //     this._context.beginPath();
    //     this._context.strokeStyle = this._color;
    //     for(let i = 0; i < stepnum; i++){
    //         const x = startX+ stepX*i;
    //         this._context.lineTo( x,  this._halfHeight + this._halfHeight*floatArrayData[i * stepIndex]);
    //     }
    //     this._context.stroke();
    // }
    WaveRender.prototype.render = function (audioBuffer, startPercent, endPercent) {
        var floatArrayData = audioBuffer.getChannelData(0);
        floatArrayData = floatArrayData.map(function (val) { return Math.abs(val); });
        // if(!this._isReset){
        //     this._canvas.width = Math.min(30766,floatArrayData.length * 1/(endPercent - startPercent));
        //     this._context = this._canvas.getContext('2d');
        //     this.reset();
        //     this._isReset = true;
        // }
        var startX = Math.floor(this.canvas.width * startPercent);
        var endX = Math.ceil(this.canvas.width * endPercent);
        var width = (endX - startX) || 10;
        var yIndexStep = Math.floor(floatArrayData.length / width) || 1;
        this.context.beginPath();
        // this.context.strokeStyle = this.color;
        this.context.lineWidth = 1;
        for (var i = 0; i <= width; i++) {
            var x = startX + i;
            var yIndex = Math.floor(yIndexStep * i);
            var dtY = this.halfHeight * floatArrayData[yIndex];
            this.context.moveTo(x, this.halfHeight);
            this.context.lineTo(x, this.halfHeight + dtY);
            this.context.moveTo(x, this.halfHeight);
            this.context.lineTo(x, this.halfHeight - dtY);
        }
        this.context.stroke();
    };
    WaveRender.prototype.clear = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    return WaveRender;
}());
exports.WaveRender = WaveRender;
//# sourceMappingURL=WaveRender.js.map