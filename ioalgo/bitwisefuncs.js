const bitwisefuncs = [
    {
        func: function and(a,b){return a & b},
        params: ["a","b"],
    },
    {
        func: function or(a,b){return a | b},
        params: ["a","b"],
    },
    {
        func: function xor(a,b){return a ^ b},
        params: ["a","b"],
    },
    {
        func: function _not(a,b){return ~a},
        params: ["a","b"],
    },
    {
        func: function bls(a,b){return a << b},
        params: ["a","b"],
    },
    {
        func: function brs(a,b){return a >> b},
        params: ["a","b"],
    },
    {
        func: function _brs(a,b){return a >>> b},
        params: ["a","b"],
    },
];

try {
    module.exports = bitwisefuncs;
} catch (e) {
    console.error(e);
}