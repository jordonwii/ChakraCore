//-------------------------------------------------------------------------------------------------------
// Copyright (C) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
//-------------------------------------------------------------------------------------------------------




WScript.LoadScriptFile("..\\UnitTestFramework\\UnitTestFramework.js");

var tests = [
    {
        name: "Object has getOwnPropertyDescriptors method",
            body: function() {
                assert.isTrue(Object.hasOwnProperty("getOwnPropertyDescriptors"), 'Object.hasOwnProperty("getOwnPropertyDescriptors")');

            }
    },
    {
        name: "Correctly handles bad parameters.",
        body: function() {
            assert.throws(function() {
                WScript.Echo(Object.getOwnProperties());
            }, TypeError, "");

            assert.throws(function() {
                WScript.Echo(Object.getOwnProperties(null));
            }, TypeError, "");
        }
    },
    {
        name: "The resulting get and set are identical with the original get and set.",
        body: function() {
            // This test is taken from https://github.com/tc39/proposal-object-getownpropertydescriptors/blob/master/test/built-ins/Object/getOwnPropertyDescriptors/has-accessors.js


            var a = {
                get a() {},
                set a(value) {}
            };
            var b = Object.getOwnPropertyDescriptors(a);


            assert.isTrue(b.a.get === Object.getOwnPropertyDescriptor(a, 'a').get);
            assert.isTrue(b.a.set === Object.getOwnPropertyDescriptor(a, 'a').set);
        }
    },
    {
        name: "The list of property descriptors includes all own properties with correct descriptors",
        body: function() {
            var foo = {}

            Object.defineProperties(foo, {
                "fooAllTrue": {
                    configurable: true,
                    enumerable: true,
                    value: "fooAllTrue",
                    writable: true
                },
                "fooAllFalse": {
                    configurable: false,
                    enumerable: false,
                    value: "fooAllFalse",
                    writable: false
                }
            });

            var desc = Object.getOwnPropertyDescriptors(foo);
            assert.isTrue(desc instanceof Object, "Result must be an object");


            assert.areEqual(Object.keys(desc), ["fooAllTrue", "fooAllFalse"], "Result should have one descriptor for each own property");

            assert.isTrue(desc.hasOwnProperty("fooAllTrue"), "Result should contain all own properties");
            assert.areEqual(desc.fooAllTrue.value, "fooAllTrue", "Result value attribute should match the value set by defineProperties");
            assert.isTrue(desc.hasOwnProperty("fooAllFalse"), "Result should contain all own properties");
            assert.areEqual(desc.fooAllFalse.value, "fooAllFalse", "Result value attribute should match the value set by defineProperties");

            var expectedProps = ['configurable', 'writable', 'enumerable'];
            for (var i in expectedProps) {
                assert.isTrue(desc.fooAllTrue[expectedProps[i]], "Result value attribute should match the value set by defineProperties");
                assert.isFalse(desc.fooAllFalse[expectedProps[i]], "Result value attribute should match the value set by defineProperties");
            }
        }
    }
]
