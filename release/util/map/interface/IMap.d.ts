export interface IMap<K, V> {
    get(key: K): V;
    set(key: K, value: V): void;
    clear(): void;
}
