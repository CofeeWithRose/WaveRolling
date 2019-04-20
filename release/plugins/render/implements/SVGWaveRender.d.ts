import { AWaveRender } from "./AWaveRender";
import { WaveRenderOptions } from "../interfaces/IWaveRender";
export declare class SVGWaveRender extends AWaveRender {
    constructor();
    private svg;
    private scaleX;
    private scaleDelta;
    private pointArray;
    private clientWidth;
    private halfHeight;
    private drawTimer;
    private color;
    init(container: HTMLElement, options?: WaveRenderOptions): void;
    private getPoints;
    private setColor;
    private draw;
    reset(): void;
    render(audioBuffer: AudioBuffer, startPercent: number, endPercent: number): void;
    private firstRender;
    private afterRender;
    private wheelProcesser;
    private getBoddyLeftOffset;
    private onWheel;
    clear(): void;
}
