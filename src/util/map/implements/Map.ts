import { IMap } from "../interface/IMap";

export interface Index{
    [index: string]: any;
}

export class Map< K extends string ,V> implements IMap<K,V> {


    private map: Index = {};

    get(key: K): V{
        return this.map[key];
    }

    set(key: K, value:V){
        this.map[key] = value;
    }

    clear(){
        this.map = {};
    }
}