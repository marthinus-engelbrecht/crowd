import {Map} from "../../../source/main";
import sinon = require("sinon");
import {fakeGlobalFunction, initializeStartMap, removeFakeNativeTypeMethod} from "../helpers";

UnitUnderTest('Map.map()', function () {
    Given('the Map.map() function', function () {
        let startMap: Map<string, number> = initializeStartMap(),
            expectedMap: Map<number, string> = initializeExpectedMap(),
            actualMap: Map<number, string>;

        And('the Map.map() does not exist on global.Map', function () {
            When('executed with a mapper function', function () {
                Then('it should produce a new Map according the mapping function', function () {
                    actualMap = startMap.map<number, string>(swapKeyAndValue);
                    expect(actualMap).to.deep.equal(expectedMap)
                });
            });
        });

        And('the Map.map() function does exist on global.Map', function () {
            beforeEach(function () {
                fakeGlobalFunction('Map', 'map');
            });

            When('executed with a mapper function', function () {
                let oldLog: typeof console.log;
                const warningMessage = 'Warning: Map.map() exists as part of the native implementation in your environment consider using that.';

                beforeEach(function () {
                    oldLog = console.log;
                    console.log = sinon.spy();
                    actualMap = startMap.map<number, string>(swapKeyAndValue);
                });

                Then('Then it should produce a new Map according the mapping function', function () {
                    expect(actualMap).to.deep.equal(expectedMap)
                });

                Then('Then it should log a warning message to the console', function () {
                    expect(console.log).to.have.been.calledWith(warningMessage)
                });

                afterEach(function () {
                    console.log = oldLog;
                });
            });

            afterEach(function () {
               removeFakeNativeTypeMethod('Map', 'map');
            });
        })
    });
});


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

function swapKeyAndValue(value: number, key: string): { value: string, key: number } {
    return {
        key: value,
        value: key
    }
}