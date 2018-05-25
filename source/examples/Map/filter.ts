import {Map} from '../../main';

const startMap = new Map<string, number>();
startMap.set('one', 1);
startMap.set('two', 2);
startMap.set('three', 3);
startMap.set('four', 4);
startMap.set('five', 5);
startMap.set('six', 6);

function filterOutEvenNumbers(value: number) : boolean{
    return value%2 !== 0;
}

const newMap: Map<string, number> = startMap.filter(filterOutEvenNumbers);

console.log(newMap);
//Map { 'one' => 1, 'three' => 3, 'five' => 5 }
