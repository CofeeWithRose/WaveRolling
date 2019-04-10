import { WavDecoder } from './plugins/WavDecoder.js';
import { WaveRender } from './plugins/WaveRender.js';
import { DataTransformer } from './plugins/DataTransformer.js';

let PLUGINS = {
    Decorder: WavDecoder,
    Render: WaveRender,
    DataTransformer,
}

export class WaveVisual {
    
    /**
     * @param { HTMLElement } containner 
     * @param { {color} } options 
     */
    constructor(containner, options){
        this._plugins = { ...PLUGINS };
        const { color } = options||{};
        this._render = new this._plugins.Render( containner, { color } );
    }

    // _plugins;
    // _render;
    // _decoder;

    /**
     * after use pugins, it will effect all the instance of WaveVisual later.
     * 
     * @param { { Decorder?, Render?, DataTransformer? } } plugins. 
     */
    static use(plugins){
        const plugsKeys = Object.keys(plugins||{});
        const extraPluginKeys = plugsKeys.filter( name => !PLUGINS[name]);
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
      * @param { string|ArrayBuffer } audioUrl 
      * @param { {data?: object, method?: 'GET'|'POST'|'PUT'|'DELETE'}} [ options ] 
      */
    load(audioUrl, options){

        if(this._decoder){
            this._decoder.abort();
        }
        this._decoder = new this._plugins.Decorder();
        
        this._render.clear();
        this._render.reset();
        this._decoder.onprocess = info => {
            const {   audioBuffer, startTime, endTime, duration } = info;
            this._render.render( audioBuffer, startTime/duration,  endTime/duration );
        }
        this._decoder.onerror = this.onerror;
        if(audioUrl instanceof ArrayBuffer){

            this._decoder.decode(audioUrl);
            this.append = arrayBuffer => {
                this._decoder.appendBuffer(arrayBuffer);
            }

        }else{
            const { data, method } = (options||{});
            this._loadAudio(audioUrl, data, method);
        }
        
    }

    /**
     * it can be user only after load ArrayBuffer.
     * @param {ArrayBuffer} arrayBuffer 
     */
    append(arrayBuffer){

    }

    abort(){
        if(this._decoder){
            this._decoder.abort();
        }
        this.onabort();
    }

    onerror(error){
        console.error(error);
    }

    onabort(){
        // console.warn('WaveVisual abort.');
    }


    _loadAudio(srcUrl, srcData, method ){
        const controller = new AbortController()
        const signal = controller.signal;
        const { url, fetchOptions } = this._plugins.DataTransformer( srcUrl, srcData, method  );
        const option = {
            signal,
            method,
            ...fetchOptions,
        }
        fetch( url, option ).then( rsp => {
    
            const fetchReader = rsp.body.getReader();
    
            this._decoder.onwaitting = () => fetchReader.read().then(data => {
                if(!data.done){
                    const buffer = new ArrayBuffer(data.value.length);
                    const view = new Uint8Array(buffer);
                    view.set(data.value);
                    this._decoder.appendBuffer(buffer);
                    
                }
    
            }).catch(e => {
                console.error(e);
            });
            this._decoder.onabort = () => { 
                controller.abort(); 
                fetchReader.cancel().catch( error => {
                    console.warn('WaveVisual load canceld.');
                });
            };
    
            fetchReader.read().then( data => {
                const buffer = new ArrayBuffer(data.value.length);
                const view = new Uint8Array(buffer);
                view.set(data.value);
                this._decoder.decode(buffer);
            });
    
                
    
        }).catch(e =>{
            console.error(e)
        })
    }
}