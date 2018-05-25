import {fakeGlobalFunction, removeFakeNativeTypeMethod} from "../helpers";
import sinon = require("sinon");
import {RecursiveArray, Array} from "../../../source/main/Array";

UnitUnderTest('Array.flatten()', function () {
    Given('the Array.flatten() function', function () {
        let startArray: RecursiveArray<number> = new Array<number>(...[1, [2, 3], 4, 5, 8, [9, 10, [11, 12, 13], 14, 15], 16]),
            expectedArray: Array<number> = new Array<number>(...[1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16]),
            actualArray: Array<number>;

        And('the Array.flatten() does not exist on global.Map', function () {
            When('executed on an multi-dimensional array', function () {
                Then('it should produce a flattened array', function () {
                    actualArray = new Array<any>(...[1,2,3,4]);
                    actualArray = startArray.flatten<number>();

                    expect(actualArray).to.deep.equal(expectedArray)
                });
            });
        });

        And('the Array.flatten() function does exist on global.Map', function () {
            beforeEach(function () {
                fakeGlobalFunction('Array', 'flatten');
            });

            When('executed with on an multi-dimensional array', function () {
                let oldLog: typeof console.log;

                const warningMessage = 'Warning: Array.flatten() exists as part of the native implementation in your environment consider using that.';

                beforeEach(function () {
                    oldLog = console.log;
                    console.log = sinon.spy();
                    actualArray = startArray.flatten();
                });


                Then('Then it should log a warning message to the console', function () {
                    expect(console.log).to.have.been.calledWith(warningMessage)
                });

                afterEach(function () {
                    console.log = oldLog;
                });
            });

            afterEach(function () {
                removeFakeNativeTypeMethod('Array', 'flatten');
            });
        })

    });
});
