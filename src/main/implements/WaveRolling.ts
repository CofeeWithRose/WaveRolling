import { AWaveRolling } from './AWaveRolling';
import { WaveRollingOptions, WaveRollingLoadOptions } from '../interfaces/IWaveRolling';





export class WaveRolling extends AWaveRolling{

    protected constructor(){
        super();
    }

    static create(containner: HTMLElement, options?: WaveRollingOptions){
        const waveRolling = new this()
        waveRolling.init(containner, options);
        return waveRolling;
    }

    /**
     * load resouce and draw wave in canvas.
     * 
     * @param audioUrl 
     * @param options 
     */
    load(audioUrl: string, options?: WaveRollingLoadOptions){

        if(this.decoder){
            this.decoder.abort();
        }
        this.decoder = new this.plugins.Decorder();
        
        this.render.clear();
        this.render.reset();
        this.decoder.onprocess = info => {
            const {   audioBuffer, startTime, endTime, duration } = info;
            this.render.render( audioBuffer, startTime/duration,  endTime/duration );
        }
        this.decoder.onerror = (error: Error) => {
            this.onerror(error);
            this.trigger('error', error);
        };
    
        const { data, method } = (options||{data: null, method: null});
        this.loadAudio(audioUrl, data, method);
        
    }

    loadBlob(arrayBuffer: ArrayBuffer){

        this.decoder.decode(arrayBuffer);

        this.append = arrayBuffer => {
            this.decoder.appendBuffer(arrayBuffer);
        }
    }

    /**
     * it can be user only after load ArrayBuffer.
     * @param {ArrayBuffer} arrayBuffer 
     */
    append(arrayBuffer: ArrayBuffer){
        
    }

    abort(){
        if(this.decoder){
            this.decoder.abort();
        }
        this.trigger('abort');
        this.onabort();
    }

    onerror(error: Error){
        console.error(error);
    }

    onabort(){
        // console.warn('WaveVisual abort.');
    }


    private loadAudio(srcUrl: string, srcData: any, method?: 'GET'|'POST'|'PUT'|'DELETE' ){
        const controller = new AbortController()
        const signal = controller.signal;
        const { url, fetchOptions } = this.plugins.DataTransformer( srcUrl, srcData, method  );
        const option = {
            signal,
            method,
            ...fetchOptions,
        }
        fetch( url, option ).then( rsp => {
    
            const fetchReader = rsp.body.getReader();
    
            this.decoder.onwaitting = () => fetchReader.read().then(data => {
                if(!data.done){
                    const buffer = new ArrayBuffer(data.value.length);
                    const view = new Uint8Array(buffer);
                    view.set(data.value);
                    this.decoder.appendBuffer(buffer);
                }
    
            }).catch(e => {
                console.error(e);
            });
            this.decoder.onabort = () => { 
                controller.abort(); 
                fetchReader.cancel().catch( error => {
                    console.warn('WaveVisual load canceld.');
                });
            };
    
            fetchReader.read().then( data => {
                const buffer = new ArrayBuffer(data.value.length);
                const view = new Uint8Array(buffer);
                view.set(data.value);
                this.decoder.decode(buffer);
            });
    
                
    
        }).catch(e =>{
            console.error(e)
        })
    }
}