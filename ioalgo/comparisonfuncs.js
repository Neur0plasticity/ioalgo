const comparisonfuncs = [
    {
        func: function eqd(a,b){return a == b},
        params: ["a","b"],
    },
    {
        func: function eqv(a,b){return a === b},
        params: ["a","b"],
    },
    {
        func: function nqd(a,b){return a != b},
        params: ["a","b"],
    },
    {
        func: function nqv(a,b){return a !== b},
        params: ["a","b"],
    },
    {
        func: function gt(a,b){return a > b },
        params: ["a","b"],
    },
    {
        func: function lt(a,b){return a < b},
        params: ["a","b"],
    },
    {
        func: function gte(a,b){return a >= b},
        params: ["a","b"],
    },
    {
        func: function lte(a,b){return a <= b},
        params: ["a","b"],
    },
];

try {
    module.exports = comparisonfuncs;
} catch (e) {
    console.error();
}