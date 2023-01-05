const mathfuncs = [
    {
        func: function add(a,b){return a + b},
        params: ["a","b"],
    },
    {
        func: function sub(a,b){return a - b},
        params: ["a","b"],
    },
    {
        func: function mul(a,b){return a * b},
        params: ["a","b"],
    },
    {
        func: function div(a,b){return a / b},
        params: ["a","b"],
    },
    {
        func: function pow(a,b){return a**b},
        params: ["a","b"],
    },
    {
        func: function mod(a,b){return a%b},
        params: ["a","b"],
    },
    {
        func: function inc(a){return a++},
        params: ["a"],
    },
    {
        func: function dec(a){return a--},
        params: ["a"],
    },
];


try {
    module.exports = mathfuncs;
} catch (e) {
    console.error(e)
}