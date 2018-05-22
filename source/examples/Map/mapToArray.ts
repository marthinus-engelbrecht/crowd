import {Map} from '../../main';

const starMap = new Map<string, number>();
starMap.set('one', 1);
starMap.set('two', 2);
starMap.set('three', 3);
starMap.set('four', 4);
starMap.set('five', 5);
starMap.set('six', 6);

function combineKeyValueIntoString(value: number, key: string): string {
    return `The number ${value} can be written as ${key} in english`
}

const newArray: Array<string> = starMap.mapToArray<string>(combineKeyValueIntoString);

console.log(newArray);

//[ 'The number 1 can be written as one in english',
//    'The number 2 can be written as two in english',
//    'The number 3 can be written as three in english',
//    'The number 4 can be written as four in english',
//    'The number 5 can be written as five in english',
//    'The number 6 can be written as six in english' ]