export namespace Crowd {
    export class Map<K,V> extends global.Map<K,V>{
        map<NK, NV>(mapper: (value?, key?, map?: Map<any, any>) => {key: NK, value:NV}) : Map<NK, NV> {
            const newMap = new Map<NK, NV>();

            this.forEach((value, key)=> {
                let {key: newKey, value: newValue} = mapper(value, key);
                newMap.set(newKey, newValue)
            });

            return newMap
        };
    }
}

export const Map = Crowd.Map;