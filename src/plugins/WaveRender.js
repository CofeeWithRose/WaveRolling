

export class WaveRender {
 
    /**
     * initial the canvas.
     * @param { HTMLElement } container 
     * @param { { color: Color | Array<Color>, scalable } } options 
     */
    constructor(container, options ){
        const { color } = options ||{};
       
        this._canvas = document.createElement('canvas');
        this._context = this._canvas.getContext('2d');
        this._canvas.width = devicePixelRatio * Math.max (window.screen.width, window.screen.height); 
        // this._canvas.width = 130080zzz
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
        
        const floatArrayData = audioBuffer.getChannelData(0);
        if(!this._isReset){
            this._canvas.width = Math.min(30766,floatArrayData.length * 1/(endPercent - startPercent));
            this._context = this._canvas.getContext('2d');
            this.reset();
            this._isReset = true;
        }
        const startX = Math.floor(this._canvas.width * startPercent);
        const endX = Math.ceil(this._canvas.width * endPercent);
        const stepnum = Math.max (Math.floor( 2 * (endX - startX) ) , 1);
        const stepIndex = Math.max( Math.floor(floatArrayData.length/stepnum), 1);
        const stepX = ( endX - startX )/ stepnum;
        this._context.beginPath();
        this._context.strokeStyle = this._color;

        for(let i = 0; i < stepnum; i++){
            const sample = [];
            for( let j=0; j< stepIndex; j++ ){
                sample.push(Math.abs(floatArrayData[j + i]));
            }
            const x = startX+ stepX*i;
            const y = sample.reduce( (pre, cur) => pre + cur)/sample.length;
            this._context.lineTo( x,  this._halfHeight +  this._halfHeight *  +  y * (i%2 *2 -1) );
        }
        this._context.stroke();
    }

    clear(){
        this._context.clearRect( 0,0,this._canvas.width, this._canvas.height);
    }


}