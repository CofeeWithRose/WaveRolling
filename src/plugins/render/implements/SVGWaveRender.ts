import { WaveRenderOptions } from "../interfaces/IWaveRender";
import { AWaveRender } from "./AWaveRender";
import { WaveWheelEventTrigger, WaveWheelEvent } from "../interfaces/IWaveRenderEvents";

export class SVGWaveRender extends AWaveRender{

    constructor(){
        super();
        this.setTriggerProcesser('wheel', this.wheelProcesser);
        this.addListener('wheel', this.onWheel);
    }

    private svg: SVGElement;

    private scaleX = 1;

    private scaleDelta = 1;

    private pointArray = new Array<number>();

    private clientWidth: number;

    private halfHeight: number;

    private drawTimer: number;

    private color: string;

    init(container: HTMLElement, options?: WaveRenderOptions) {
        document.addEventListener
        this.svg = document.createElementNS( "http://www.w3.org/2000/svg",'svg');
        this.svg.style.width = '100%';
        this.clientWidth = container.clientWidth;
        this.svg.style.height = `${container.clientHeight}px`;
        this.halfHeight = 0.5 * container.clientHeight;
        this.setColor(options||{});
        container.appendChild(this.svg);
        this.svg.addEventListener('wheel', event => this.trigger('wheel', {event}));
    };
    
    private getPoints(){
        let result = '';
        const detIndex = Math.floor(0.1/(this.scaleX*devicePixelRatio))||1;
        for(let i = 0; i< this.pointArray.length && i * this.scaleX< this.clientWidth *devicePixelRatio; i+=detIndex){
            result +=`${i * this.scaleX},${this.pointArray[i]} `;
        }
        return result;
    }

    private setColor({ color } :  WaveRenderOptions ){

        if(color instanceof Array){
            const linearGradientContent = color.map<string>( (item, index) => {
                if( 'string' == typeof item){
                    return `<stop offset="${index*100/color.length-1}%" style="stop-color:${item};stop-opacity:1"/>`;
                }else{
                    const { offset, value } = item;
                    return  `<stop offset="${100 * offset}%" style="stop-color:${value};stop-opacity:1"/>`;
                }
            }).join('\n');
            const colorDefine = 
                `<linearGradient id="wave_rolling_color" x1="0%" y1="0%" x2="100%" y2="0%">
                    ${linearGradientContent}
                </linearGradient>`;
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            defs.innerHTML = colorDefine;
            this.svg.appendChild(defs);
            this.color = 'url(#wave_rolling_color)';
        }else{
            this.color = color;
        }
        
    }

    private draw(){

        let polyline = this.svg.querySelector('#waverolling_line');
        if(!polyline){
            polyline = document.createElementNS('http://www.w3.org/2000/svg','polyline');
            polyline.id = 'waverolling_line';
            polyline.setAttribute('style',`stroke-width:${1/devicePixelRatio}; stroke: ${this.color};`);
            this.svg.appendChild(polyline);
        }
        polyline.setAttribute('points', this.getPoints());
        
    }

    
    reset(){
        this.scaleX = 1;

        this.scaleDelta = 1;
    
        this.pointArray = new Array<number>();

        this.render = this.firstRender;
    };

    render(audioBuffer: AudioBuffer, startPercent: number, endPercent: number){
        this.firstRender(audioBuffer, startPercent, endPercent);
    }

    private firstRender(audioBuffer: AudioBuffer, startPercent: number, endPercent: number){
        const waveWidth = audioBuffer.length/ endPercent - startPercent;
        this.scaleX = this.clientWidth / waveWidth;
        this.scaleDelta = this.scaleX;
        this.afterRender(audioBuffer, startPercent, endPercent);
        this.render = this.afterRender;
    };

    private afterRender(audioBuffer: AudioBuffer, startPercent: number, endPercent: number){
        const dataArray = audioBuffer.getChannelData(0);
        for(let i = 0; i< dataArray.length; i++){
            this.pointArray.push(this.halfHeight +　this.halfHeight * dataArray[i]);
        }
        this.draw();
    }

    private wheelProcesser = ({viewPercent, event, isScale }: WaveWheelEventTrigger): WaveWheelEvent => {
        
        if( event instanceof WheelEvent){ 
            event.returnValue = false;
            const targetOffsetLeft = this.getBoddyLeftOffset(<HTMLElement>event.target);
            const svgOffsetLeft = this.getBoddyLeftOffset(this.svg);
            
            isScale =  event.deltaY < 0;
            viewPercent = (event.clientX + targetOffsetLeft - svgOffsetLeft)/this.svg.clientWidth;
        }

        const totalPercent = viewPercent;
        const startPercent = 0;
        const endPercent = 1;
        return  { 
            endPercent, 
            startPercent, 
            totalPercent, 
            isScale 
        };
    };

    private getBoddyLeftOffset(element: HTMLElement|SVGElement):number {
        let offsetLeft = 0;
        while(element !== document.body){

            if(element instanceof HTMLElement){
                offsetLeft += element.offsetLeft||0;
            }
            element = element.parentElement;
        }
        return offsetLeft;
    }

    private onWheel = ({ startPercent, endPercent, totalPercent, isScale }: WaveWheelEvent) => {
       
        this.scaleX+= isScale?  this.scaleDelta : -this.scaleDelta;

        this.scaleX = Math.max(this.scaleDelta, this.scaleX);
        
        // if(this.drawTimer){
        //     clearTimeout(this.drawTimer);
        // }
        // this.drawTimer = setTimeout( () =>this.draw(), 200);
        this.draw();
    }

    clear(){
        
    };


}