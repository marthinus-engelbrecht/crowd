import {Array} from "../../main";
import {RecursiveArrayType} from "../../main/Array";

let startArray: RecursiveArrayType<number> = new Array<any>(...[1, [2, 3], 4, 5, 8, [9, 10, [11, 12, 13], 14, 15], 16]);
const flatArray = startArray.flatten();
console.log(flatArray);
//[1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16]