import {Map} from '../../main';

const startMap = new Map<string, number>();
startMap.set('one', 1);
startMap.set('two', 2);
startMap.set('three', 3);
startMap.set('four', 4);
startMap.set('five', 5);
startMap.set('six', 6);

function combineKeyValueIntoString(value: number, key: string): string {
    return `The number ${value} can be written as ${key} in english`
}

const newArray: Array<string> = startMap.mapToArray<string>(combineKeyValueIntoString);

console.log(newArray);

//[ 'The number 1 can be written as one in english',
//    'The number 2 can be written as two in english',
//    'The number 3 can be written as three in english',
//    'The number 4 can be written as four in english',
//    'The number 5 can be written as five in english',
//    'The number 6 can be written as six in english' ]