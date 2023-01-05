





let funcL = [
    function inc1(n){return n + 1}
];
let inputL = [0,1,2];
let outputL = [1,2,3];
let assertL = [];

funcL.forEach((func)=>{
    inputL.forEach(function(input, index){
        let func_output = func(input)
        let expected_output = outputL[index]
        let assertion = func_output === expected_output
        assertL[index] = assertion
    })
});

console.log(assertL)
