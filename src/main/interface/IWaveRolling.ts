import { DataTransformer } from '../../plugins/implement/DataTransformer';
import { WaveRenderOptions, IWaveRender } from '../../plugins/interface/IWaveRender';
import { WavDecoder } from '../../plugins/implement/WavDecoder';
import { WaveRender } from '../../plugins/implement/WaveRender';
import { IWavDecoder } from '../../plugins/interface/IWavDecoder';
import { HDWaveRender } from '../../plugins/implement/HDWaveRender';

let PLUGINS: WaveRollingPlugins = {

    Decorder: WavDecoder,
    
    Render: WaveRender,
    
    HDRender: HDWaveRender,

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

    Decorder: new  ()=>  IWavDecoder;

    Render: new () => IWaveRender;

    HDRender: new () => IWaveRender;

    DataTransformer:   ( url: string, data: any, method: 'GET'|'POST'|'PUT'|'DELETE' ) => 
                        { url: string, fetchOptions: RequestInit };
    
}

export interface WaveRolling {


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

}