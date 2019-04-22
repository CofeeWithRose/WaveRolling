import { AWaveRender } from "./AWaveRender";
import { WaveWheelEventTrigger, WaveWheelEvent } from "../interfaces/IWaveRenderEvents";
import { WaveRenderOptions } from "../interfaces/IWaveRender";
export declare class SVGWaveRender extends AWaveRender {
    constructor();
    protected container: HTMLElement;
    protected svg: SVGElement;
    protected scaleX: number;
    protected scaleDelta: number;
    protected pointArray: number[];
    protected clientWidth: number;
    protected halfHeight: number;
    protected drawTimer: number;
    protected color: string;
    protected svgListener: (mutations: MutationRecord[], observer: MutationObserver) => void;
    init(container: HTMLElement, options?: WaveRenderOptions): void;
    protected getPoints(): string;
    protected setColor({ color }: WaveRenderOptions): void;
    protected draw(): void;
    reset(): void;
    render(audioBuffer: AudioBuffer, startPercent: number, endPercent: number): void;
    protected firstRender(audioBuffer: AudioBuffer, startPercent: number, endPercent: number): void;
    protected afterRender(audioBuffer: AudioBuffer, startPercent: number, endPercent: number): void;
    protected wheelProcesser: ({ viewPercent, event, isScale }: WaveWheelEventTrigger) => WaveWheelEvent;
    protected getBoddyLeftOffset(element: HTMLElement | SVGElement): number;
    protected onWheel: ({ startPercent, endPercent, totalPercent, isScale }: WaveWheelEvent) => void;
    clear(): void;
}
