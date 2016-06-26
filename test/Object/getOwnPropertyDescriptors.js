//-------------------------------------------------------------------------------------------------------
// Copyright (C) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
//-------------------------------------------------------------------------------------------------------

function TestGetOwnPropertyDescriptors() {
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
    var exists = (desc != undefined);
    WScript.Echo("Found descriptors: " + exists);

    if (exists) {
        for (var propName in desc) {
            WScript.Echo("Found prop: " + propName);
            for (var i in desc[propName]) {
                WScript.Echo(i + "=" + desc[propName][i]);
            }
        }
    }
}

function TestSameGettersAndSetters() {

    var a = {
        get a() {},
        set a(value) {}
    };
    var b = Object.getOwnPropertyDescriptors(a);


    WScript.Echo('descriptors.a.get is exact same of ' + 
            'Object.getOwnPropertyDescriptor(object, "a").get: ' +
            (b.a.get === Object.getOwnPropertyDescriptor(a, 'a').get));
    WScript.Echo('descriptors.a.set is exact same of ' + 
            'Object.getOwnPropertyDescriptor(object, "a").set: ' +
            (b.a.set === Object.getOwnPropertyDescriptor(a, 'a').set));
}



function TestNoParameter() {
    WScript.Echo("no object");
    ExpectException(function() {
        WScript.Echo(Object.getOwnProperties());
    });
}

function TestNullParameter() {
    WScript.Echo("null parameter");
    ExpectException(function() {
        WScript.Echo(Object.getOwnProperties(null));
    });
}

function ExpectException(f) {
    try {
        f();
    }
    catch(e) {
        WScript.Echo("PASS");
    }
}
function CatchAndWriteExceptions(func) {
    try {
        func();
    }
    catch (e) {
        WScript.Echo(e.name + ": " + e.message);
    }
}



tests = [
    TestNoParameter,
    TestNullParameter,
    TestSameGettersAndSetters,
    TestGetOwnPropertyDescriptors
]

for (var i in tests) {
    CatchAndWriteExceptions(tests[i]);
}
