
export class WaveRender {
 
    constructor(container, options ){
        const { color } = options ||{};
        this.color = color || '#000000';
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = window.screen.width; 
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.height = container.clientHeight;
        this.halfHeight = this.canvas.height * 0.5;
        this.drawCenterLine();
        container.appendChild(this.canvas);
    }
    // color;
    // context;
    // canvas;
    // halfHeight;

    drawCenterLine(){
        this.context.beginPath();
        this.context.moveTo(0, this.halfHeight);
        this.context.lineTo(this.canvas.width, this.halfHeight);
        this.context.stroke()
    }
    render(audioBuffer, startPercent, endPercent){
        const floatArrayData = audioBuffer.getChannelData(0);
        const startX = this.canvas.width * startPercent;
        const endX = this.canvas.width * endPercent;
        const stepnum = Math.max (Math.floor( devicePixelRatio * 100 *  (endX - startX) ) , 10);
        const stepIndex = Math.max( Math.floor(floatArrayData.length/stepnum), 1);
        const stepX = ( endX - startX )/ stepnum;
        this.context.beginPath();
        this.context.strokeStyle = this.color;
        for(let i = 0; i < stepnum; i++){
            const x = startX+ stepX*i;
            // console.log('x/devicePixelRatio： ', x, 'this.halfHeight + this.halfHeight*floatArrayData[i * stepIndex]: ', this.halfHeight + this.halfHeight*floatArrayData[i * stepIndex] )
            this.context.lineTo( x,  this.halfHeight + this.halfHeight*floatArrayData[i * stepIndex]);
        }
        this.context.stroke()
    }

    clear(){
        this.context.clearRect( 0,0,this.canvas.width, this.canvas.height);
    }


}