import { IEmiter, EventMap } from "./IEmiter";
export declare class Emiter implements IEmiter {
    protected eventMap: EventMap;
    addListener(name: string | number, fun: (...params: Array<any>) => void): void;
    removeListeners(name: string | number): void;
    removeListener(name: string | number, fun: (...params: Array<any>) => void): void;
    emit(name: string, ...params: Array<any>): void;
}
