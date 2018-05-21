import {Map} from "../../source/main";
import sinon = require("sinon");

describe('Unit Under Test: Map.map', function () {
    describe('Given the Map.map() function', function () {
        let startMap: Map<string, number> = initializeStartMap(),
            expectedMap: Map<number, string> = initializeExpectedMap(),
            actualMap: Map<number, string>;

        describe('And the Map.map() does not exist on global.Map', function () {
            describe('When executed with a mapper function', function () {
                it('Then it should produced a new Map according the mapping function', function () {
                    actualMap = startMap.map<number, string>(swapKeyAndValue);
                    expect(actualMap).to.deep.equal(expectedMap)
                });
            });
        });

        describe('And the Map.map() function does exist on global.Map', function () {
            beforeEach(function () {
                mockMapFunctionOnGlobalMap();
            });

            describe('When executed with a mapper function', function () {
                let oldLog;
                const warningMessage = 'Warning: Map.map exists as part of the native implementation in your environment consider using that.';

                beforeEach(function () {
                    oldLog = console.log;
                    console.log = sinon.spy();
                    actualMap = startMap.map<number, string>(swapKeyAndValue);
                });

                it('Then it should produced a new Map according the mapping function', function () {
                    expect(actualMap).to.deep.equal(expectedMap)
                });

                it('Then it should log a warning message to the console', function () {
                    expect(console.log).to.have.been.calledWith(warningMessage)
                });

                afterEach(function () {
                    console.log = oldLog;
                });
            });

            afterEach(function () {
               restoreGlobalMap();
            });
        })
    });
});

function swapKeyAndValue(value: number, key: string): { value: string, key: number } {
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

function mockMapFunctionOnGlobalMap() {
    global.Map.prototype['map'] = function <NK, NV>(mapper: (value?, key?, map?: Map<any, any>) => { key: NK, value: NV }): Map<NK, NV> {
        return undefined;
    }
}

function restoreGlobalMap() {
    delete global.Map.prototype['map']
}
