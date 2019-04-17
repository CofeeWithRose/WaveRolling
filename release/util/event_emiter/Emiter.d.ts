import { IEmiter, EventMap } from "./IEmiter";
export declare class Emiter implements IEmiter {
    protected eventMap: EventMap;
    addListener(name: string, fun: (...params: Array<any>) => void): void;
    removeListener(name: string, fun: (...params: Array<any>) => void): void;
    emit(name: string, ...params: Array<any>): void;
}
