import {warnIfNativeFunctionExists} from "./helpers";
import {CollectionKeys} from "./helpers";

function warnIfNativeFunctionExistsOnMap(functionName: CollectionKeys) {
    return warnIfNativeFunctionExists('Map', functionName)
}

export class Map<K, V> extends global.Map<K, V> {
    map<NK, NV>(mapper: (value?: V, key?: K, map?: Map<K, V>) => { key: NK, value: NV }): Map<NK, NV> {
        warnIfNativeFunctionExistsOnMap('map');

        const newMap = new Map<NK, NV>();

        this.forEach((value, key) => {
            let {key: newKey, value: newValue} = mapper(value, key);
            newMap.set(newKey, newValue)
        });

        return newMap
    };

    mapToArray<T>(mapper: (value?: V, key?: K, map?: Map<K, V>) => T): Array<T> {
        warnIfNativeFunctionExistsOnMap('mapToArray');

        const newArray: Array<T> = [];

        this.forEach((value, key) => {
            newArray.push(mapper(value, key));
        });

        return newArray
    };

    filter(predicate: (value?: V, key?: K, map?: Map<K, V>) => boolean): Map<K, V> {
        warnIfNativeFunctionExistsOnMap('filter');

        let newMap = new Map<K, V>();
        this.forEach((value, key) => {
            if (predicate(value, key))
                newMap.set(key, value)
        });
        return newMap
    }
}