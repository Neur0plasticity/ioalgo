const constraintLow = 0;
const constraintHigh = 10;

const PARAMs = {
    "mem": {},
    "val": {},
    // "_0":{
    //     type: "any",
    //     i: constraintLow || Number.MIN_VALUE,
    //     lim: constraintHigh || Number.MAX_VALUE,
    //     inc: (i)=>{ return i + 1 },
    //     description: "any datatype"
    // },
    // "_1":{
    //     type: "any",
    //     i: constraintLow || Number.MIN_VALUE,
    //     lim: constraintHigh || Number.MAX_VALUE,
    //     inc: (i)=>{ return i + 1 },
    //     description: "any datatype"
    // },
    "a":{
        type:   "number",
        i:      constraintLow, // || Number.MIN_VALUE,
        lim:    constraintHigh,// || Number.MAX_VALUE,
        inc:    (i)=>{ return i+1 },
        description: "integers"
    },
    "b":{
        type:   "number",
        i:      constraintLow,// || Number.MIN_VALUE,
        lim:    constraintHigh,// || Number.MAX_VALUE,
        inc:    (i)=>{ return i+1 },
        description: "integers"
    },
};

try {
    module.exports = PARAMs;
} catch (e) {
    console.error(e)
}