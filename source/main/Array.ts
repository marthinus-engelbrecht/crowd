import {warnIfNativeFunctionExists} from "./helpers";

export type NativeArray = typeof global.Array;

export class Array<T> extends global.Array<T> {
    flatten<R extends T>() : Array<R> {
        warnIfNativeFunctionExists('Array', 'flatten');

        let result: Array<R>;
        result = new Array<R>(...[]);
        this.forEach((value: T) => {
            if (!(value instanceof global.Array)) {
                result.push(<R> value)
            } else {
                const myValue = new Array<R>(...value);
                result.push(...myValue.flatten<R>())
            }
        });

        return result
    }
}

export class RecursiveArrayType<R> extends Array<R | RecursiveArrayType<R>> {

}