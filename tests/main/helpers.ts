import {Map, Array} from "../../source/main";
import Global = NodeJS.Global;
import {CollectionKeys} from "../../source/main/helpers";

export {removeFakeNativeTypeMethod, initializeStartMap, fakeGlobalFunction}

function initializeStartMap() : Map<string, number>{
    const starMap = new Map<string, number>();
    starMap.set('one', 1);
    starMap.set('two', 2);
    starMap.set('three', 3);
    starMap.set('four', 4);
    starMap.set('five', 5);
    starMap.set('six', 6);
    return starMap;
}

function removeFakeNativeTypeMethod(NativeType: keyof Global, methodName: CollectionKeys) {
    delete global[NativeType].prototype[methodName];
}

function fakeGlobalFunction(NativeType: keyof Global, methodName: CollectionKeys) {
    global[NativeType].prototype[methodName] = function (): CollectionKeys {
        return undefined;
    }
}

