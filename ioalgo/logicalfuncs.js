const logicalfuncs = [
    {
        func: function aan(a,b){return a && b},
        params: ["a","b"],
    },
    {
        func: function oor(a,b){return a || b},
        params: ["a","b"],
    },
    {
        func: function not(a){return !a},
        params: ["a"],
    },
];

try {
    module.exports = logicalfuncs;
} catch(e) {
    console.error(e);
}