import {Map} from "../../../source/main";
import sinon = require("sinon");
import {fakeGlobalFunction, initializeStartMap, removeFakeNativeTypeMethod} from "../helpers";

UnitUnderTest('Map.mapToArray()', function () {
    Given('the Map.mapToArray() function', function () {
        let startMap: Map<string, number> = initializeStartMap(),
            expectedArray: Array<string> = initializeExpectedArray(),
            actualArray: Array<string>;

        And('the Map.mapToArray() does not exist on global.Map', function () {
            When('executed with a mapper function', function () {
                Then('it should produce a new Array according the mapping function', function () {
                    actualArray = startMap.mapToArray<string>(combineKeyValueIntoString);
                    expect(actualArray).to.deep.equal(expectedArray)
                });
            });
        });

        And('the Map.mapToArray() function does exist on global.Map', function () {
            beforeEach(function () {
                fakeGlobalFunction('Map', 'mapToArray');
            });

            When('executed with a mapper function', function () {
                let oldLog: typeof console.log;
                const warningMessage = 'Warning: Map.mapToArray() exists as part of the native implementation in your environment consider using that.';

                beforeEach(function () {
                    oldLog = console.log;
                    console.log = sinon.spy();
                    actualArray = startMap.mapToArray(combineKeyValueIntoString);
                });

                Then('Then should produce a new Array according the mapping function', function () {
                    expect(actualArray).to.deep.equal(expectedArray)
                });

                Then('it should log a warning message to the console', function () {
                    expect(console.log).to.have.been.calledWith(warningMessage)
                });

                afterEach(function () {
                    console.log = oldLog;
                });
            });

            afterEach(function () {
                removeFakeNativeTypeMethod('Map', 'mapToArray');
            });
        })
    });
});


function initializeExpectedArray() : Array<string> {
    return [
        `The number 1 can be written as one in english`,
        `The number 2 can be written as two in english`,
        `The number 3 can be written as three in english`,
        `The number 4 can be written as four in english`,
        `The number 5 can be written as five in english`,
        `The number 6 can be written as six in english`,
    ];
}

function combineKeyValueIntoString(value: number, key: string): string {
    return `The number ${value} can be written as ${key} in english`
}