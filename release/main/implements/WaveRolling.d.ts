import { AWaveRolling } from './AWaveRolling';
import { WaveRollingOptions, WaveRollingLoadOptions } from '../interfaces/IWaveRolling';
export declare class WaveRolling extends AWaveRolling {
    protected constructor();
    static create(containner: HTMLElement, options?: WaveRollingOptions): WaveRolling;
    /**
     * load resouce and draw wave in canvas.
     *
     * @param audioUrl
     * @param options
     */
    load(audioUrl: string, options?: WaveRollingLoadOptions): void;
    loadBlob(arrayBuffer: ArrayBuffer): void;
    protected initDecoder(): void;
    /**
     * it can be user only after load ArrayBuffer.
     * @param {ArrayBuffer} arrayBuffer
     */
    append(arrayBuffer: ArrayBuffer): void;
    abort(): void;
    onerror(error: Error): void;
    onabort(): void;
    private loadAudio;
}
