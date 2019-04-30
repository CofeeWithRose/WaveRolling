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
    load(audioUrl?: string, options?: WaveRollingLoadOptions){

        const decoder = this.createDecoder();
    
        const { data, method } = (options||{data: null, method: null});
        this.loadAudio( decoder, audioUrl||'', data, method||'GET');
        
    }

    loadBlob(arrayBuffer: ArrayBuffer){
        const decoder = this.createDecoder();
        decoder.decode(arrayBuffer);

        this.append = arrayBuffer => {
            if(arrayBuffer){
                decoder.appendBuffer(arrayBuffer);
            }
        }
    }

    protected createDecoder(){

        if(this.decoder){
            this.decoder.abort();
        }

        if(this.plugins.Decorder){
            
            this.decoder =  new this.plugins.Decorder();
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
            return this.decoder;
        }else{
            throw `Decorder can not be ${ this.decoder }.`
        }
        
    }

    /**
     * it can be user only after load ArrayBuffer.
     * @param {ArrayBuffer} arrayBuffer 
     */
    append(arrayBuffer?: ArrayBuffer){
        
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
    }

    private processError = (e: Error) => {
        if('AbortError' !== e.name){
            console.error(e)
        }else{
            console.warn('WaveRolling load canceld.');
        }
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
            decoder.addListener('abort', () => { 
                controller.abort(); 
            });
            fetch( url, option ).then( rsp => {
                if(rsp.ok){
                    const rspBody = rsp.body;
                    if(rspBody){
    
                        const fetchReader = rspBody.getReader();
                        decoder.addListener('abort', () => { 
                            fetchReader.cancel().catch(this.processError); 
                        });

                        let readData = () => fetchReader.read().then(data => {
                            if(!data.done){
                                const buffer = new ArrayBuffer(data.value.length);
                                const view = new Uint8Array(buffer);
                                view.set(data.value);
                                decoder.appendBuffer(buffer);
                                readData();
                            }
                
                        }).catch(this.processError);
                       
                
                        fetchReader.read().then( data => {
                            const buffer = new ArrayBuffer(data.value.length);
                            const view = new Uint8Array(buffer);
                            view.set(data.value);
                            decoder.decode(buffer);
                            readData();
                        });
                    }else{
                        console.warn('no response body.');
                    }
                }else{
                    this.onerror(new Error(`Request Error:  ${rsp.status}, url is [ ${url} ].`))
                }
               
               
            }).catch(this.processError);
        }else{
            throw `DataTransformer Can not be ${this.plugins.DataTransformer}`;
        }
        
    }
}