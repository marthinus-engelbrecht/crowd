import {Map} from "../../source/main/Map";

describe('Unit Under Test: Map.map', function () {
    describe('Given the Map.map() function', function () {
        describe('When executed with a mapper function', function () {
            it('Then it should produced a new Map according the mapping function', function () {
                const starMap = initializeStartMap();
                const expectedMap = initializeExpectedMap();
                const actualMap: Map<number, string> = starMap.map<number, string>(swapKeyAndValue);
                expect(actualMap).to.deep.equal(expectedMap)
            });
        });
    });
});

function swapKeyAndValue(value: number, key: string) : {value: string, key: number} {
    return {
        key: value,
        value: key
    }
}

function initializeStartMap() {
    const starMap = new Map<string, number>();
    starMap.set('one', 1);
    starMap.set('two', 2);
    starMap.set('three', 3);
    starMap.set('four', 4);
    starMap.set('five', 5);
    starMap.set('six', 6);
    return starMap;
}

function initializeExpectedMap() {
    const expectedMap = new Map<number, string>();
    expectedMap.set(1, 'one');
    expectedMap.set(2, 'two');
    expectedMap.set(3, 'three');
    expectedMap.set(4, 'four');
    expectedMap.set(5, 'five');
    expectedMap.set(6, 'six');
    return expectedMap;
}