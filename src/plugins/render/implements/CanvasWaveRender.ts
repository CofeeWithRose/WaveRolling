import { AWaveRender } from "./AWaveRender";
import { WaveRenderOptions } from "../interfaces/IWaveRender";


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
        const context = this.canvas.getContext('2d');
        if(context){
            this.context = context;
            this.canvas.width = devicePixelRatio * Math.max (window.screen.width, window.screen.height); 
            this.canvas.style.width = '100%';
            this.canvas.style.height = '100%';
            this.canvas.height = container.clientHeight;
            this.halfHeight = this.canvas.height * 0.5;
            this.color = optionColor || 'black';
            this.reset();
            container.appendChild(this.canvas);
        }else{
            console.warn('cont get Context2D from canvas');
        }
       
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
    }


    render(audioBuffer: AudioBuffer, startPercent: number, endPercent: number){
        const floatArrayDataList = [];
        for(let i =0 ; i< audioBuffer.numberOfChannels; i++){
            floatArrayDataList.push(audioBuffer.getChannelData(i));
        }

        const startX = Math.floor(this.canvas.width * startPercent);
        const endX = Math.floor(this.canvas.width * endPercent);
        const width = (endX - startX)||10;
        const yIndexStep = Math.floor(floatArrayDataList[0].length/ width)||1;

        this.context.beginPath();
        this.context.lineWidth = 0.5;
        for(let i = 0; i <= width; i+= 0.25){
            const x = startX + i;
            const yIndex = Math.floor(yIndexStep * i);
            const dtY = Math.max( 0.7, ...floatArrayDataList.map( floatArrayData => Math.abs( this.halfHeight * floatArrayData[yIndex] ) )  );
            this.context.moveTo( x,  this.halfHeight + dtY);
            this.context.lineTo( x,  this.halfHeight - dtY);
        }
        this.context.stroke();
    }

    clear(){
        this.context.clearRect( 0,0,this.canvas.width, this.canvas.height);
    }
    
    


}