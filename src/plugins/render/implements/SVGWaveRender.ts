import { AWaveRender } from "./AWaveRender";
import { WaveWheelEventTrigger, WaveWheelEvent } from "../interfaces/IWaveRenderEvents";
import { WaveRenderOptions } from "../interfaces/IWaveRender";

export class SVGWaveRender extends AWaveRender{

    constructor(){
        super();
        this.setTriggerProcesser('wheel', this.wheelProcesser);
        this.addListener('wheel', this.onWheel);

       
    }

    protected container: HTMLElement;

    protected svg: SVGElement;

    protected scaleX = 1;

    protected scaleDelta = 1;

    protected pointArray = new Array<number>();

    protected clientWidth: number;

    protected halfHeight: number;

    protected drawTimer: number;

    protected color: string;

    // protected startXPercent = 0;

    // protected endXPercent = 1;

    protected offsetPercent = 0;

    // protected transScaleX = 0;

    protected svgListener = ( mutations: MutationRecord[], observer: MutationObserver ) => {
        for( let i = 0; i < mutations.length; i++ ){
            const mutation = mutations[i];
            if( this.container === mutation.target ){
                // TODO set translate in svg onresize.
                console.log( mutations );
                break;
            }
        }
    }

    // protected svgListener = ( event: Event ) => {
    //     console.log( event );
    // }

    init(container: HTMLElement, options?: WaveRenderOptions) {
        // document.addEventListener
        this.container = container;
        this.svg = document.createElementNS( "http://www.w3.org/2000/svg",'svg');
        this.svg.style.width = '100%';
        this.clientWidth = container.clientWidth;
        this.svg.style.height = `${container.clientHeight}px`;
        this.halfHeight = 0.5 * container.clientHeight;
        this.setColor(options||{});
        container.appendChild(this.svg);
        this.svg.addEventListener('wheel', event => this.trigger('wheel', {event}));

        const observer = new MutationObserver(this.svgListener);
        observer.observe( container, {  
            attributeOldValue: true,
            attributes: true,
            characterData: true,
            characterDataOldValue: true,
            childList: true,
            subtree: true 
        } );
    };
    
    protected getPoints(){
        let result = '';
        const startIndex = Math.floor( this.offsetPercent * this.pointArray.length);
        const deltaX = 0.1/devicePixelRatio
        for(let x = 0; x< this.clientWidth; x+= deltaX){
            const index = Math.ceil(x/this.scaleX + startIndex);
            result +=`${x},${this.pointArray[index]} `;
        }
        return result;
    }

    protected setColor({ color } :  WaveRenderOptions ){

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
            this.color = color||'black';
        }
        
    }

    protected draw(){

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

    protected firstRender(audioBuffer: AudioBuffer, startPercent: number, endPercent: number){
        const waveWidth = audioBuffer.length/ endPercent - startPercent;
        this.scaleX = this.clientWidth / waveWidth;
        this.scaleDelta = this.scaleX;
        this.afterRender(audioBuffer, startPercent, endPercent);
        this.render = this.afterRender;
    };

    protected afterRender(audioBuffer: AudioBuffer, startPercent: number, endPercent: number){
        const dataArray = audioBuffer.getChannelData(0);
        for(let i = 0; i< dataArray.length; i++){
            this.pointArray.push(this.halfHeight +　this.halfHeight * dataArray[i]);
        }
        this.draw();
    }

    protected wheelProcesser = ({viewPercent, event, isScale }: WaveWheelEventTrigger): WaveWheelEvent => {
        
        if( event instanceof WheelEvent){ 
            event.returnValue = false;
            const targetOffsetLeft = this.getBoddyLeftOffset(<HTMLElement>event.target);
            const svgOffsetLeft = this.getBoddyLeftOffset(this.svg);
            
            isScale =  event.deltaY < 0;
            viewPercent = (event.clientX + targetOffsetLeft - svgOffsetLeft)/this.svg.clientWidth;
        }
        if(!viewPercent){
            throw `Wheel Event Error: you must has a  viewPercent or event attribuite`;
        }
        const halfViewTotalPercent = viewPercent * this.container.clientWidth/this.pointArray.length ;
        const totalPercent = this.offsetPercent + halfViewTotalPercent;
        const startPercent = halfViewTotalPercent + this.offsetPercent;
        const endPercent = startPercent + 2*halfViewTotalPercent;
        debugger

        return  { 
            endPercent, 
            startPercent, 
            totalPercent, 
            isScale: isScale || false, 
        };
    };

    protected getBoddyLeftOffset(element: HTMLElement|SVGElement):number {
        let offsetLeft = 0;
        while(element !== document.body){

            if(element instanceof HTMLElement){
                offsetLeft += element.offsetLeft||0;
            }
            element = element.parentElement|| document.body;
        }
        return offsetLeft;
    }

    protected onWheel = ({ startPercent, endPercent, totalPercent, isScale }: WaveWheelEvent) => {
       
        this.scaleX+= isScale?  this.scaleDelta : -this.scaleDelta;

        this.scaleX = Math.max(this.scaleDelta, this.scaleX);
        this.offsetPercent = startPercent;
        // this.startXPercent = startPercent;
        
        // this.endXPercent = endPercent;

        // this.totalPercent = totalPercent;
        
        // if(this.drawTimer){
        //     clearTimeout(this.drawTimer);
        // }
        // this.drawTimer = setTimeout( () =>this.draw(), 200);
        this.draw();
    }

    clear(){
        
    };


}