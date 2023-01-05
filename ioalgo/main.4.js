class IOALGO {

    tests = [
        "ioassertion",              // asserts inputs and outputs of algorithm
        "algoequivalents",          // produces io equivalent algorithms
        "algometrics / algoureka",  // measures algorithms to understand what it solves such as accidentally creating a compression algorithm.
        "ioinspector",              // algo io comparison tool to eliminate duplications
        "specdev",                  // produces code based on specifications
    ];

    funcL = [];
    inputL = [];
    outputL = [];
    assertL = [];
    func_output;

    constructor({funcL,inputL,outputL}){
        this.funcL = funcL;
        this.inputL = inputL;
        this.outputL = outputL;
    }
    
    ioassertion(){
        this.funcL.forEach((func)=>{
            this.inputL.forEach((input, index)=>{
                this.func_output = func(input)
                this.expected_output = this.outputL[index]
                this.assertion = this.func_output === this.expected_output
                this.assertL[index] = this.assertion
            })
        });
    }
    algoequivalents(){}
    algometrics(){}
    ioinspector(){}
    specdev(){}
}












new IOALGO({
    funcL: [
        function inc1(n){
            return n + 1
        }
    ],
    inputL: [0,1,2],
    outputL:[1,2,3],
}).ioassertion();