import { WavDecoder } from './plugins/WavDecoder';
import { WaveRender, WaveRenderOptions } from './plugins/WaveRender';
import { DataTransformer } from './plugins/DataTransformer';

let PLUGINS = {

    Decorder: WavDecoder,
    Render: WaveRender,
    DataTransformer,

}
export interface WaveRollingOptions extends WaveRenderOptions{

}

export interface WaveRollingLoadOptions {
    
    data?: object;
    
    method?: 'GET'|'POST'|'PUT'|'DELETE';
}

export interface WaveRollingPlugins {

    Decorder: typeof WavDecoder;

    Render: typeof WaveRender;

    DataTransformer: typeof DataTransformer;
}

export class WaveRolling {
    

    constructor(containner: HTMLElement, options: WaveRollingOptions){
        this.plugins = { ...PLUGINS };
        const { color } = options || { color: 'black' };
        this.render = new this.plugins.Render( containner, { color } );
    }

    plugins: WaveRollingPlugins;
    render: WaveRender;
    decoder: WavDecoder;

    /**
     * after use pugins, it will effect all the instance of WaveVisual later.
     * 
     * @param { { Decorder?, Render?, DataTransformer? } } plugins. 
     */
    static use(plugins: WaveRollingPlugins){
        const plugsKeys = Object.keys(plugins||{});
        const extraPluginKeys = plugsKeys.filter( name => !(<any>PLUGINS)[name]);
        if(extraPluginKeys.length){
            throw `[ ${ extraPluginKeys.join(' , ') } ] is not support.` 
        }
        PLUGINS = {
            ...PLUGINS,
            ...plugins,
        }
    }

    /**
     * list all plugins.
     */
    static plugins(){
        return { ...PLUGINS };
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
        this.decoder.onerror = this.onerror;
    
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