import { WaveRollingPlugins, IWaveRolling, WaveRollingEvents, WaveRollingEventsTrigger, WaveRollingOptions, InitWaveRollingPlugins } from "../interfaces/IWaveRolling";
import { IWaveRender } from "../../plugins/render/interfaces/IWaveRender";
import { IWavDecoder } from "../../plugins/decoder/interfaces/IWavDecoder";
import { EventHandle } from "./EventHandle";
export declare abstract class AWaveRolling extends EventHandle<WaveRollingEventsTrigger, WaveRollingEvents> implements IWaveRolling {
    protected constructor();
    protected plugins: InitWaveRollingPlugins;
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
        Decorder: new () => IWavDecoder;
        Render: new () => IWaveRender;
        DataTransformer: (url: string, data: any, method?: "GET" | "POST" | "PUT" | "DELETE" | undefined) => {
            url: string;
            fetchOptions: RequestInit;
        };
    };
    protected init(containner: HTMLElement, options?: WaveRollingOptions): void;
    abstract load(url: string): void;
    abstract loadBlob(arrayBuffer: ArrayBuffer): void;
    abstract append(arrayBuffer: ArrayBuffer): void;
    abstract abort(): void;
    abstract onerror(error: Error): void;
    abstract onabort(): void;
}
