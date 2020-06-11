import { IWaveRender, WaveRenderOptions } from '../../plugins/render/interfaces/IWaveRender';
import { IWavDecoder, WaveDecoderEventsTrigger, WaveDecoderEvents } from '../../plugins/decoder/interfaces/IWavDecoder';
import { IEventHandle } from './IEventHandle';
import { WaveRenderEvents, WaveRenderEventsTrigger } from '../../plugins/render/interfaces/IWaveRenderEvents';
export interface WaveRollingOptions extends WaveRenderOptions {
}
export interface WaveRollingLoadOptions {
    data?: object;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
}
export interface InitWaveRollingPlugins {
    Decorder: new () => IWavDecoder;
    Render: new () => IWaveRender;
    DataTransformer: (url: string, data: any, method?: 'GET' | 'POST' | 'PUT' | 'DELETE') => {
        url: string;
        fetchOptions: RequestInit;
    };
}
export interface WaveRollingPlugins {
    Decorder?: new () => IWavDecoder;
    Render?: new () => IWaveRender;
    HDRender?: new () => IWaveRender;
    DataTransformer?: (url: string, data: any, method?: 'GET' | 'POST' | 'PUT' | 'DELETE') => {
        url: string;
        fetchOptions: RequestInit;
    };
}
export declare type WaveRollingEvents = WaveRenderEvents & WaveDecoderEvents;
export declare type WaveRollingEventsTrigger = WaveRenderEventsTrigger & WaveDecoderEventsTrigger;
export interface IWaveRolling extends IEventHandle<WaveRollingEventsTrigger, WaveRollingEvents> {
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
