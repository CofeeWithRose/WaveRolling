import { AWaveRolling } from './AWaveRolling';
import { WaveRollingOptions, WaveRollingLoadOptions } from '../interfaces/IWaveRolling';
import { IWavDecoder } from '../../plugins/decoder/interfaces/IWavDecoder';





export class WaveRolling extends AWaveRolling{

    protected constructor(){
        super();
    }

    static create(containner?: HTMLElement, options?: WaveRollingOptions){
        if(containner instanceof HTMLElement){
            const waveRolling = new this()
            waveRolling.init(containner, options);
            return waveRolling;    
        }else{
            throw `Type ERROR: container ${containner} must be HTMLElement!`
        }
        
    }

    /**
     * load resouce and draw wave in canvas.
     * 
     * @param audioUrl 
     * @param options 
     */
    load(audioUrl: string, options?: WaveRollingLoadOptions){

        this.initDecoder();
    
        const { data, method } = (options||{data: null, method: null});
        this.loadAudio(this.decoder, audioUrl, data, method||'GET');
        
    }

    loadBlob(arrayBuffer: ArrayBuffer){
        this.initDecoder();
        this.decoder.decode(arrayBuffer);

        this.append = arrayBuffer => {
            this.decoder.appendBuffer(arrayBuffer);
        }
    }

    protected initDecoder(){
        if(this.decoder){
            this.decoder.abort();
        }
        if(this.plugins.Decorder){
            this.decoder =  new this.plugins.Decorder();
        }else{
            throw `Decorder can not be ${ this.decoder }.`
        }
        
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


    private loadAudio(decoder: IWavDecoder, srcUrl: string, srcData: any, method?: 'GET'|'POST'|'PUT'|'DELETE' ){
        const controller: AbortController = (<any>window).AbortController && new AbortController()||{ signal: null, abort: () => {}};
        const signal = controller.signal;
        if(this.plugins.DataTransformer){
            const { url, fetchOptions } = this.plugins.DataTransformer( srcUrl, srcData, method  );
            const option = {
                signal,
                method,
                ...fetchOptions,
            }
            fetch( url, option ).then( rsp => {
        
                const rspBody = rsp.body;
                if(rspBody){

                    const fetchReader = rspBody.getReader();
        
                    decoder.onwaitting = () => fetchReader.read().then(data => {
                        if(!data.done){
                            const buffer = new ArrayBuffer(data.value.length);
                            const view = new Uint8Array(buffer);
                            view.set(data.value);
                            decoder.appendBuffer(buffer);
                        }
            
                    }).catch(e => {
                        console.error(e);
                    });
                    decoder.onabort = () => { 
                        controller.abort(); 
                        fetchReader.cancel().catch( error => {
                            console.warn('WaveVisual load canceld.');
                        });
                    };
            
                    fetchReader.read().then( data => {
                        const buffer = new ArrayBuffer(data.value.length);
                        const view = new Uint8Array(buffer);
                        view.set(data.value);
                        decoder.decode(buffer);
                    });
                }else{
                    console.warn('no response body.');
                }
               
            }).catch(e =>{
                console.error(e)
            })
        }else{
            throw `DataTransformer Can not be ${this.plugins.DataTransformer}`;
        }
        
    }
}