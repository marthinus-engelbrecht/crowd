import Global = NodeJS.Global;
import {Array, Map} from "./index";

export {warnIfNativeFunctionExists, CollectionKeys}

// let rawArrayProps = Object.getOwnPropertyNames(Map);
// let rawMapProps = Object.getOwnPropertyNames(Array);

//const props: Array<string> = new Array<string>(...rawArrayProps, ...rawMapProps);

type CollectionKeys = keyof Map<any, any> | keyof Array<any>;

function warnIfNativeFunctionExists(Type: keyof Global, functionName: CollectionKeys) {
    if (global[Type].prototype.hasOwnProperty(functionName)) {
        console.log(`Warning: ${Type}.${functionName}() exists as part of the native implementation in your environment consider using that.`)
    }
}


