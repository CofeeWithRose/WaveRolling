import { WaveRenderOptions, IWaveRender, WaveRenderEvents } from "../interfaces/IWaveRender";
import { AWaveRender } from "./AWaveRender";


/**
 * create canvas and rend the data of audo on it.
 */
export class WaveRender extends AWaveRender {
 
    /**
     * initial the canvas.
     * @param { HTMLElement } container 
     * @param { { color: Color | Array<Color>| Array<offset: number, value: Color >, Definition: 1 | 2 } } options 
     */
    init(container: HTMLElement, options?: WaveRenderOptions){
        const { color: optionColor } = options || { color: 'black' };
       
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = devicePixelRatio * Math.max (window.screen.width, window.screen.height); 
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.height = container.clientHeight;
        this.halfHeight = this.canvas.height * 0.5;
        this.color = optionColor;
        this.reset();
        container.appendChild(this.canvas);
    }
    private color: string | Array<string>| Array<{offset: number, value: string }|string>;
    private context: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    private halfHeight: number;

    private setColor(){
        let result: CanvasGradient | string;
        if(this.color instanceof Array){
            result = this.context.createLinearGradient(0, this.halfHeight,this.canvas.width, this.halfHeight);
            (<Array<{offset: number, value: string }|string>>this.color).forEach( ( item: string| {offset: number, value: string }, index: number ) => {
                if('string' === typeof item){
                    (<CanvasGradient>result).addColorStop(index/(this.color.length-1), item);
                }else{
                    const {offset, value} = item;
                    (<CanvasGradient>result).addColorStop(offset, value);
                }
                
            });
        }else{
            result = this.color;
        }
        this.context.strokeStyle = result;
    }
    reset(){
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

    render(audioBuffer: AudioBuffer, startPercent: number, endPercent: number){
        
        let floatArrayData = audioBuffer.getChannelData(0);
        floatArrayData = floatArrayData.map( val => Math.abs(val));
        // if(!this._isReset){
        //     this._canvas.width = Math.min(30766,floatArrayData.length * 1/(endPercent - startPercent));
        //     this._context = this._canvas.getContext('2d');
        //     this.reset();
        //     this._isReset = true;
        // }
        const startX = Math.floor(this.canvas.width * startPercent);
        const endX = Math.ceil(this.canvas.width * endPercent);
        const width = (endX - startX)||10;
        const yIndexStep = Math.floor(floatArrayData.length/ width)||1;
        this.context.beginPath();
        // this.context.strokeStyle = this.color;
        this.context.lineWidth = 1;
        for(let i = 0; i <= width; i++){
            const x = startX + i;
            const yIndex = Math.floor(yIndexStep * i);
            const dtY =  this.halfHeight * floatArrayData[yIndex];
            this.context.moveTo(x, this.halfHeight);
            this.context.lineTo( x,  this.halfHeight + dtY);
            this.context.moveTo(x, this.halfHeight);
            this.context.lineTo( x,  this.halfHeight - dtY);
        }
        this.context.stroke();
        
    }

    clear(){
        this.context.clearRect( 0,0,this.canvas.width, this.canvas.height);
    }
    
    


}