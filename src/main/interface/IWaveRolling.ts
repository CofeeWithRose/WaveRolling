import { DataTransformer } from '../../plugins/data_transformer/DataTransformer';
import { WaveRenderOptions, IWaveRender, IWaveRenderEvents } from '../../plugins/wave_render/interface/IWaveRender';
import { WavDecoder } from '../../plugins/decoder/implement/WavDecoder';
import { WaveRender } from '../../plugins/wave_render/implement/WaveRender';
import { IWavDecoder } from '../../plugins/decoder/interface/IWavDecoder';
import { SVGWaveRender } from '../../plugins/wave_render/implement/SVGWaveRender';

let PLUGINS: WaveRollingPlugins = {

    Decorder: WavDecoder,
    
    Render: WaveRender,
    
    HDRender: SVGWaveRender,

    DataTransformer,

}
export interface WaveRollingOptions extends WaveRenderOptions{

    /**
     * 是否可缩放
     */
    scalable?: boolean;
}

export interface WaveRollingLoadOptions {
    
    data?: object;
    
    method?: 'GET'|'POST'|'PUT'|'DELETE';
}

export interface WaveRollingPlugins {

    Decorder?: new  ()=>  IWavDecoder;

    Render?: new () => IWaveRender;

    HDRender?: new () => IWaveRender;

    DataTransformer?:   ( url: string, data: any, method: 'GET'|'POST'|'PUT'|'DELETE' ) => 
                        { url: string, fetchOptions: RequestInit };
    
}

export interface WaveRollingEvents extends IWaveRenderEvents {

    error:  Error;

    abort: null;

}

export interface IWaveRolling {


    /**
     * load resouce and draw wave in canvas.
     * 
     * @param audioUrl 
     * @param options 
     */
    load(audioUrl: string, options?: WaveRollingLoadOptions): void;

    loadBlob(arrayBuffer: ArrayBuffer): void;

    /**
     * it can be user only after load ArrayBuffer.
     * @param {ArrayBuffer} arrayBuffer 
     */
    append(arrayBuffer: ArrayBuffer): void;

    abort(): void;

    onerror(error: Error): void;
    
    onabort(): void;

    addListener<N extends keyof WaveRollingEvents>( name: N, callback: ( info?: WaveRollingEvents[N]) => void ): void;

    removeListener<N extends keyof WaveRollingEvents>( name: N, callback: ( info?: WaveRollingEvents[N]) => void): void;

    trigger<N extends keyof WaveRollingEvents>(name: N,  info?: WaveRollingEvents[N]): void;

}