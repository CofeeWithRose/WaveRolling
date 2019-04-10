

export class WaveRender {
 
    /**
     * initial the canvas.
     * @param { HTMLElement } container 
     * @param { { color: Color | Array<Color> } } options 
     */
    constructor(container, options ){
        const { color } = options ||{};
       
        this._canvas = document.createElement('canvas');
        this._context = this._canvas.getContext('2d');
        this._canvas.width = devicePixelRatio * Math.max (window.screen.width, window.screen.height); 
        this._canvas.style.width = '100%';
        this._canvas.style.height = '100%';
        this._canvas.height = container.clientHeight;
        this._halfHeight = this._canvas.height * 0.5;
        this._color = this._createColor(color);
        this.reset();
        container.appendChild(this._canvas);
    }
    // _color;
    // _context;
    // _canvas;
    // _halfHeight;
    _createColor(color){
        let result;
        if(color instanceof Array){
            result = this._context.createLinearGradient(0, this._halfHeight,this._canvas.width, this._halfHeight);
            color.forEach( ( item, index ) => {
                if('string' === typeof item){
                    result.addColorStop(index/(color.length-1), item);
                }else{
                    const {offset, value} = item;
                    result.addColorStop(offset, value);
                }
                
            });
        }else{
            result = color;
        }
        return result;
    }
    reset(){
        this._context.beginPath();
        this._context.strokeStyle = this._color;
        this._context.lineWidth = 2;
        this._context.moveTo(0, this._halfHeight);
        this._context.lineTo(this._canvas.width, this._halfHeight);
        this._context.stroke()
        // this._context.beginPath();
        // this._context.lineWidth = 1;
        // this._context.moveTo(0, this._halfHeight);
    }

    render(audioBuffer, startPercent, endPercent){
        const floatArrayData = audioBuffer.getChannelData(0);
        const startX = this._canvas.width * startPercent;
        const endX = this._canvas.width * endPercent;
        const stepnum = Math.max (Math.floor( 100 *  (endX - startX) ) , 10);
        const stepIndex = Math.max( Math.floor(floatArrayData.length/stepnum), 1);
        const stepX = ( endX - startX )/ stepnum;
        this._context.beginPath();
        this._context.strokeStyle = this._color;

        for(let i = 0; i < stepnum; i++){
            const x = startX+ stepX*i;
            this._context.lineTo( x,  this._halfHeight + this._halfHeight*floatArrayData[i * stepIndex]);
        }
        this._context.stroke();
    }

    clear(){
        this._context.clearRect( 0,0,this._canvas.width, this._canvas.height);
    }


}