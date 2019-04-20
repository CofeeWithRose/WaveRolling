import { IEventHandle } from "../../../main/interfaces/IEventHandle";
import { WaveRenderEventsTrigger, WaveRenderEvents } from "./IWaveRenderEvents";
export interface WaveRenderOptions {
    color?: string | Array<string | {
        offset: number;
        value: string;
    }>;
}
/**
 *  rend the data in browser.
 */
export interface IWaveRender extends IEventHandle<WaveRenderEventsTrigger, WaveRenderEvents> {
    init(container: HTMLElement, options?: WaveRenderOptions): void;
    reset(): void;
    render(audioBuffer: AudioBuffer, startPercent: number, endPercent: number): void;
    clear(): void;
}
