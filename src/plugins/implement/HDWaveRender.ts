import { IWaveRender, WaveRenderOptions } from "../interface/IWaveRender";

export class HDWaveRender implements IWaveRender{

    private svg: SVGElement;

    private scaleX = 1;

    private scaleDelta = 1;

    private pointArray = new Array<number>();

    private clientWidth: number;

    private halfHeight: number;

    private drawTimer: number;
    


    init(container: HTMLElement, options?: WaveRenderOptions) {

        this.svg = document.createElementNS( "http://www.w3.org/2000/svg",'svg');
        this.svg.style.width = '100%';
        this.clientWidth = container.clientWidth;
        this.svg.style.height = `${container.clientHeight}px`;
        this.halfHeight = 0.5 * container.clientHeight;
        container.appendChild(this.svg);
        this.svg.addEventListener('wheel', this.onScroll);
    };
    
    private getPoints(){
        let result = '';
        const detIndex = Math.floor(0.1/this.scaleX)||1;
        for(let i = 0; i< this.pointArray.length && i * this.scaleX< this.clientWidth; i+=detIndex){
            result +=`${i * this.scaleX},${this.pointArray[i]} `;
        }
        return result;
    }

    private draw(){
        const polylineStr = `<polyline points="${this.getPoints()}" style="stroke-width:1; stroke: red;" ></polyline>`;
        this.svg.innerHTML = polylineStr;
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

    private onScroll = (event: Event) => {
        event.returnValue = false;
        const deltaY = event && (<any>event).deltaY;
        if(deltaY){
            deltaY < 0? this.scaleX+= this.scaleDelta : this.scaleX -= this.scaleDelta;
        }
        this.scaleX = Math.max(this.scaleDelta, this.scaleX);
        if(this.drawTimer){
            clearTimeout(this.drawTimer);
        }
        this.drawTimer = setTimeout( () =>this.draw(), 200);
    }

    clear(){
        
    };


}