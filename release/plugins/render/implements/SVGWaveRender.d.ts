import { WaveRenderOptions } from "../interfaces/IWaveRender";
import { AWaveRender } from "./AWaveRender";
export declare class SVGWaveRender extends AWaveRender {
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
    private onScroll;
    clear(): void;
}
