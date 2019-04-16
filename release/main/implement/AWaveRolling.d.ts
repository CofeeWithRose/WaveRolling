import { WaveRollingPlugins, WaveRollingOptions } from "../interface/IWaveRolling";
import { IWaveRender } from "../../plugins/interface/IWaveRender";
import { IWavDecoder } from "../../plugins/interface/IWavDecoder";
export declare abstract class AWaveRolling {
    protected constructor();
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
        DataTransformer?: (url: string, data: any, method: "GET" | "POST" | "PUT" | "DELETE") => {
            url: string;
            fetchOptions: RequestInit;
        };
    };
    protected init(containner: HTMLElement, options?: WaveRollingOptions): void;
}
