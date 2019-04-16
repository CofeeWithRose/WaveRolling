import { IWaveRender, WaveRenderOptions } from "../interface/IWaveRender";
export declare class HDWaveRender implements IWaveRender {
    private svg;
    private scaleX;
    private scaleDelta;
    private pointArray;
    private clientWidth;
    private halfHeight;
    private drawTimer;
    init(container: HTMLElement, options?: WaveRenderOptions): void;
    private getPoints;
    private draw;
    reset(): void;
    render(audioBuffer: AudioBuffer, startPercent: number, endPercent: number): void;
    private firstRender;
    private afterRender;
    private onScroll;
    clear(): void;
}
