const typefuncs = [
    {
        func: function _typeof(_0){return typeof _0},
        params: ["_0"],
    },
    {
        func: function _instanceof(_0,_1){return _0 instanceof _1},
        params: ["_0","_1"],
    },
];

try {
    module.exports = typefuncs;
} catch (e) {
    console.error(e);
}
