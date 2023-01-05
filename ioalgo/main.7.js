class IOALGO {

    tests = [
        "ioassertion",              // asserts inputs and outputs of algorithm
        "ioequivalents",            // algs are grouped together with common outputs.
        "algoequivalents",          // produces io equivalent algorithms
        "algometrics / algoureka",  // measures algorithms to understand what it solves such as accidentally creating a compression algorithm.
        "ioinspector",              // algo io comparison tool to eliminate duplications
        "specdev",                  // produces code based on specifications
    ];

    funcL = [];
    inputL = [];
    outputL = [];
    expectL = [];
    assertL = [];
    assertion;
    expected_output;



    ioequivalentsdb = {};




    constructor({funcs}){
        // this.funcL = funcL;
        // this.inputL = inputL;
        // this.outputL = outputL;
        this.funcL = funcs.filter((funcobj)=>{return funcobj.func });
    }
    funcLooper(cb){
        this.funcL.forEach((funcobj)=>{
            this.expectL = funcobj.outputL;
            funcobj.inputL.forEach((input, index)=>{
                cb(funcobj, input, index)
            })
        });
    }
    ioassertion(){
        // tested alg supports only parameter
        this.funcLooper((funcobj, input, index)=>{
            this.outputL[index] = funcobj.func(input)
            this.assertion = (this.outputL[index] === this.expectL[index])
            this.assertL[index] = this.assertion;
        });
    }
    ioequivalents(){
        console.warn("constrainted by ioset range for now.")
        // algs are grouped together with common outputs.
        this.funcLooper((funcobj, input, index)=>{
            let output = funcobj.func(input);
            if (!(output in this.ioequivalentsdb)) {
                this.ioequivalentsdb[output] = []
            }
            this.ioequivalentsdb[output].push({
                func: funcobj.func,
                input
            });
        });
    }
    algoequivalents(){
        // tests algorithm, generates io equivalent algorithm
    }
    algometrics(){}
    ioinspector(){}
    specdev(){
        // inputs, outputs, along with io predictions from frequently used human io search space.
    }
}










let ioalgo0 = new IOALGO({
    funcs: [
        {
            func: function inc1(n){
                return n + 1
            },
            inputL: [0,1,2],
            outputL:[1,2,3],
        },
        {
            func: function inc2(n){
                return n + 2
            },
            inputL: [0,1,2],
            outputL:[1,2,3],
        },
    ]
})

ioalgo0.ioassertion()
console.log(ioalgo0.assertL)

ioalgo0.ioequivalents();
console.log(ioalgo0.ioequivalentsdb);