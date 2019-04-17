import { WaveRollingPlugins, WaveRollingOptions, IWaveRolling, WaveRollingEvents } from "../interface/IWaveRolling";
import { IWaveRender } from "../../plugins/wave_render/interface/IWaveRender";
import { IWavDecoder } from "../../plugins/decoder/interface/IWavDecoder";
import { IEmiter } from "../../util/event_emiter/IEmiter";
export declare abstract class AWaveRolling implements IWaveRolling {
    protected constructor();
    protected listeners: IEmiter;
    protected plugins: WaveRollingPlugins;
    protected render: IWaveRender;
    protected decoder: IWavDecoder;
    /**
     * after use pugins, it will effect all the instance of WaveVisual later.
     *
     * @param { { Decorder?, Render?, DataTransformer? } } plugins.
     */
    static use(plugins: WaveRollingPlugins): void;
    /**
     * list all plugins.
     */
    static plugins(): {
        Decorder?: new () => IWavDecoder;
        Render?: new () => IWaveRender;
        HDRender?: new () => IWaveRender;
        DataTransformer?: (url: string, data: any, method: "GET" | "PUT" | "DELETE" | "POST") => {
            url: string;
            fetchOptions: RequestInit;
        };
    };
    protected init(containner: HTMLElement, options?: WaveRollingOptions): void;
    addListener<N extends keyof WaveRollingEvents>(name: N, callback: (info?: WaveRollingEvents[N]) => void): void;
    removeListener<N extends keyof WaveRollingEvents>(name: N, callback: (info?: WaveRollingEvents[N]) => void): void;
    trigger<N extends keyof WaveRollingEvents>(name: N, info?: WaveRollingEvents[N]): void;
    abstract load(url: string): void;
    abstract loadBlob(arrayBuffer: ArrayBuffer): void;
    abstract append(arrayBuffer: ArrayBuffer): void;
    abstract abort(): void;
    abstract onerror(error: Error): void;
    abstract onabort(): void;
}
