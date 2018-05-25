import {Map} from "../../../source/main";
import {fakeGlobalFunction, initializeStartMap, removeFakeNativeTypeMethod} from "../helpers";
import sinon = require("sinon");

UnitUnderTest('Map.filter()', function () {
    Given('the Map.filter() function', function () {
        let startMap: Map<string, number> = initializeStartMap(),
            expectedMap: Map<string, number> = initializeExpectedMap(),
            actualMap: Map<string, number>;

        And('the Map.filter() does not exist on global.Map', function () {
            When('executed with a predicate function', function () {
                it('Then it should produce a Map filtered according to the predicate function', function () {
                    actualMap = startMap.filter(filterOutEvenNumbers);
                    expect(actualMap).to.deep.equal(expectedMap)
                });
            });
        });

        And('the Map.filter() function does exist on global.Map', function () {
            beforeEach(function () {
                fakeGlobalFunction('Map', 'filter');
            });

            When('executed with a predicate function', function () {
                let oldLog: typeof console.log;
                const warningMessage = 'Warning: Map.filter() exists as part of the native implementation in your environment consider using that.';

                beforeEach(function () {
                    oldLog = console.log;
                    console.log = sinon.spy();
                    actualMap = startMap.filter(filterOutEvenNumbers);
                });

                Then('it should produce a Map filtered according to the predicate function', function () {
                    console.log(actualMap, expectedMap);
                    expect(actualMap).to.deep.equal(expectedMap)
                });

                Then('it should log a warning message to the console', function () {
                    expect(console.log).to.have.been.calledWith(warningMessage)
                });

                afterEach(function () {
                    console.log = oldLog;
                });
            });

            afterEach(function () {
                removeFakeNativeTypeMethod('Map', 'filter');
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



function filterOutEvenNumbers(value: number) : boolean{
    return value%2 !== 0;
}