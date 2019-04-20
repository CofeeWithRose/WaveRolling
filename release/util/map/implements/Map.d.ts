import { IMap } from "../interface/IMap";
export interface Index {
    [index: string]: any;
}
export declare class Map<K extends string, V> implements IMap<K, V> {
    private map;
    get(key: K): V;
    set(key: K, value: V): void;
    clear(): void;
}
