import {Map} from "../../../source/main";
import {initializeStartMap, restoreGlobalMap} from "../helpers";
import sinon = require("sinon");

describe('Unit Under Test: Map.filter()', function () {
    describe('Given the Map.filter() function', function () {
        let startMap: Map<string, number> = initializeStartMap(),
            expectedMap: Map<string, number> = initializeExpectedMap(),
            actualMap: Map<string, number>;

        describe('And the Map.filter() does not exist on global.Map', function () {
            describe('When executed with a predicate function', function () {
                it('Then it should produce a Map filtered according to the predicate function', function () {
                    actualMap = startMap.filter(filterOutEvenNumbers);
                    expect(actualMap).to.deep.equal(expectedMap)
                });
            });
        });

        describe('And the Map.filter() function does exist on global.Map', function () {
            beforeEach(function () {
                fakeFilterFunctionOnGlobalMap();
            });

            describe('When executed with a predicate function', function () {
                let oldLog;
                const warningMessage = 'Warning: Map.filter() exists as part of the native implementation in your environment consider using that.';

                beforeEach(function () {
                    oldLog = console.log;
                    console.log = sinon.spy();
                    actualMap = startMap.filter(filterOutEvenNumbers);
                });

                it('Then it should produce a Map filtered according to the predicate function', function () {
                    console.log(actualMap, expectedMap);
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

function initializeExpectedMap() {
    const expectedMap = new Map<string, number>();
    expectedMap.set('one', 1);
    expectedMap.set('three', 3);
    expectedMap.set('five', 5);
    return expectedMap;
}

function fakeFilterFunctionOnGlobalMap() {
    global.Map.prototype['filter'] = function (predicate: (value?, key?, map?: Map<any, any>) => boolean): Map<any,any> {
        return undefined;
    }
}

function filterOutEvenNumbers(value) : boolean{
    return value%2 !== 0;
}