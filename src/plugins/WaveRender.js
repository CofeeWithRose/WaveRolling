

/**
 * @class  Options
 *  
 * 
 * 
 */

/**
 * create canvas and rend the data of audo on it.
 */
export class WaveRender {
 
    /**
     * initial the canvas.
     * @param { HTMLElement } container 
     * @param { { color: Color | Array<Color>| Array<Offset: number, value: Color >, Definition: 1 | 2 } } options 
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
        this._color = color;
        this.reset();
        container.appendChild(this._canvas);
    }
    // _color;
    // _context;
    // _canvas;
    // _halfHeight;
    _setColor(){
        let result;
        if(this._color instanceof Array){
            result = this._context.createLinearGradient(0, this._halfHeight,this._canvas.width, this._halfHeight);
            this._color.forEach( ( item, index ) => {
                if('string' === typeof item){
                    result.addColorStop(index/(this._color.length-1), item);
                }else{
                    const {offset, value} = item;
                    result.addColorStop(offset, value);
                }
                
            });
        }else{
            result = this._color;
        }
        this._context.strokeStyle = result;
    }
    reset(){
        this._setColor();
        // this._context.beginPath();
        // this._context.strokeStyle = this._color;
        // this._context.lineWidth = 1;
        // this._context.moveTo(0, this._halfHeight);
        // this._context.lineTo(this._canvas.width, this._halfHeight);
        // this._context.stroke()
        // this._context.beginPath();
        // this._context.lineWidth = 1;
        // this._context.moveTo(0, this._halfHeight);
    }

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

    render(audioBuffer, startPercent, endPercent){
        
        let floatArrayData = audioBuffer.getChannelData(0);
        floatArrayData = floatArrayData.map( val => Math.abs(val));
        // if(!this._isReset){
        //     this._canvas.width = Math.min(30766,floatArrayData.length * 1/(endPercent - startPercent));
        //     this._context = this._canvas.getContext('2d');
        //     this.reset();
        //     this._isReset = true;
        // }
        const startX = Math.floor(this._canvas.width * startPercent);
        const endX = Math.ceil(this._canvas.width * endPercent);
        const width = (endX - startX)||10;
        const yIndexStep = Math.floor(floatArrayData.length/ width)||1;
        this._context.beginPath();
        this._context.strokeStyle = this._color;
        this._context.lineWidth = 1;
        for(let i = 0; i <= width; i++){
            const x = startX + i;
            const yIndex = Math.floor(yIndexStep * i);
            const dtY =  this._halfHeight * floatArrayData[yIndex];
            this._context.moveTo(x, this._halfHeight);
            this._context.lineTo( x,  this._halfHeight + dtY);
            this._context.moveTo(x, this._halfHeight);
            this._context.lineTo( x,  this._halfHeight - dtY);
        }
        this._context.stroke();
        
    }

    clear(){
        this._context.clearRect( 0,0,this._canvas.width, this._canvas.height);
    }


}