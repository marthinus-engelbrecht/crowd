export namespace Crowd {
    export class Map<K,V> extends global.Map<K,V>{
        map<NK, NV>(mapper: (value?, key?, map?: Map<K, V>) => {key: NK, value:NV}) : Map<NK, NV> {
            Map.warnIfNativeFunctionExists(this.map.name);

            const newMap = new Map<NK, NV>();

            this.forEach((value, key)=> {
                let {key: newKey, value: newValue} = mapper(value, key);
                newMap.set(newKey, newValue)
            });

            return newMap
        };

        mapToArray<T>(mapper: (value?, key?, map?: Map<K, V>) => T) : Array<T> {
            Map.warnIfNativeFunctionExists(this.mapToArray.name);

            const newArray: Array<T> = [];

            this.forEach((value, key)=> {
                newArray.push(mapper(value, key));
            });

            return newArray
        };

        filter(predicate: (value?, key?, map?: Map<K, V>) => boolean) : Map<K,V> {
            Map.warnIfNativeFunctionExists(this.filter.name);

            let newMap = new Map<K,V>();
            this.forEach((value, key) => {
                if(predicate(value, key))
                    newMap.set(key, value)
            });
            return newMap
        }

        private static warnIfNativeFunctionExists(functionName) {
            if (global.Map.prototype.hasOwnProperty(functionName)) {
                console.log(`Warning: Map.${functionName}() exists as part of the native implementation in your environment consider using that.`)
            }
        }
    }
}

export const Map = Crowd.Map;