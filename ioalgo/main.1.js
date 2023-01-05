class IOALGO {
    funcL = [
        function inc1(n){return n + 1}
    ];
    inputL = [0,1,2];
    outputL = [1,2,3];
    assertL = [];
    func_output;
    test(){
        this.funcL.forEach((func)=>{
            this.inputL.forEach((input, index)=>{
                this.func_output = func(input)
                this.expected_output = this.outputL[index]
                this.assertion = this.func_output === this.expected_output
                this.assertL[index] = this.assertion
            })
        });
        console.log(this.assertL)
    }
}

new IOALGO().test();