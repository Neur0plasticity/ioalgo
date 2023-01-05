class IOALGO {
    funcL = [];
    inputL = [];
    outputL = [];
    assertL = [];
    func_output;

    constructor(funcL,inputL,outputL){
        this.funcL = funcL;
        this.inputL = inputL;
        this.outputL = outputL;
    }

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