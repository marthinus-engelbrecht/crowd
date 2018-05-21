import {Map} from '../../main';

const starMap = new Map<string, number>();
starMap.set('one', 1);
starMap.set('two', 2);
starMap.set('three', 3);
starMap.set('four', 4);
starMap.set('five', 5);
starMap.set('six', 6);

function swapKeyAndValue(value: number, key: string) : {value: string, key: number} {
    return {
        key: value,
        value: key
    }
}

const newMap: Map<number, string> = starMap.map<number, string>(swapKeyAndValue);

console.log(newMap);

//Map {
//  1 => 'one',
//  2 => 'two',
//  3 => 'three',
//  4 => 'four',
//  5 => 'five',
//  6 => 'six' }
