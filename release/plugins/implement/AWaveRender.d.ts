import { IWaveRender, WaveRenderOptions, IWaveRenderEvents } from "../interface/IWaveRender";
export declare abstract class AWaveRender implements IWaveRender {
    constructor();
    private listeners;
    abstract init(container: HTMLElement, options?: WaveRenderOptions): void;
    abstract reset(): void;
    abstract render(audioBuffer: AudioBuffer, startPercent: number, endPercent: number): void;
    abstract clear(): void;
    addListener<N extends keyof IWaveRenderEvents>(name: N, callback: (info?: IWaveRenderEvents[N]) => void): void;
    removeListener<N extends keyof IWaveRenderEvents>(name: N, callback: (info?: IWaveRenderEvents[N]) => void): void;
    trigger<N extends keyof IWaveRenderEvents>(name: N, info?: IWaveRenderEvents[N]): void;
}
