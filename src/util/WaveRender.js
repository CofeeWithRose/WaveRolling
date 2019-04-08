
export class WaveRender {
 
    constructor(container){
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
       
        this.canvas.width = container.clientWidth; 
        this.canvas.height = container.clientHeight;
        this.halfHeight = this.canvas.height * 0.5;
        this.context.beginPath();
        this.context.moveTo(0, this.halfHeight);
        this.context.lineTo(this.canvas.width, this.halfHeight);
        this.context.stroke()
        container.appendChild(this.canvas);
    }

    // context;
    // canvas;
    // halfHeight;

    render(audioBuffer, startPercent, endPercent){
        const floatArrayData = audioBuffer.getChannelData(0);
        const startX = this.canvas.width * startPercent;
        const endX = this.canvas.width * endPercent;
        const stepnum = Math.max (Math.floor( devicePixelRatio * 100 *  (endX - startX) ) , 10);
        const stepIndex = Math.max( Math.floor(floatArrayData.length/stepnum), 1);
        const stepX = ( endX - startX )/ stepnum;
        this.context.beginPath();
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