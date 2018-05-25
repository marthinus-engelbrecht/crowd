import {Map} from '../../main';

const startMap = new Map<string, number>();
startMap.set('one', 1);
startMap.set('two', 2);
startMap.set('three', 3);
startMap.set('four', 4);
startMap.set('five', 5);
startMap.set('six', 6);

function swapKeyAndValue(value: number, key: string) : {value: string, key: number} {
    return {
        key: value,
        value: key
    }
}

const newMap: Map<number, string> = startMap.map<number, string>(swapKeyAndValue);

console.log(newMap);

//Map {
//  1 => 'one',
//  2 => 'two',
//  3 => 'three',
//  4 => 'four',
//  5 => 'five',
//  6 => 'six' }
