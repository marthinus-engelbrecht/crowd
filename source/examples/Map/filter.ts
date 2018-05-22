import {Map} from '../../main';

const starMap = new Map<string, number>();
starMap.set('one', 1);
starMap.set('two', 2);
starMap.set('three', 3);
starMap.set('four', 4);
starMap.set('five', 5);
starMap.set('six', 6);

function filterOutEvenNumbers(value) : boolean{
    return value%2 !== 0;
}

const newMap: Map<string, number> = starMap.filter(filterOutEvenNumbers);

console.log(newMap);
//Map { 'one' => 1, 'three' => 3, 'five' => 5 }
