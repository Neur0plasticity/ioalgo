const constraintLow = -5;
const constraintHigh = 5;
class IOALGO {

    tests = [ // RENAME RENAME RENAME
        "ioassertion",              // asserts inputs and outputs of algorithm
        "ioequivalents",            // algs are grouped together with common outputs.
        "iosearch",                 // searches algorithms that produce io set given
        "diffneighboranalysis",     // differential neighbor analysis
        "algogenbrute",             // creates algo based on io set with no strategy
        "algogensolve",             // creates algo based on io set with strategy
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
    iosearchresult;

    paramsdb = {
        "a":{
            type:   "number",
            i:      constraintLow || Number.MIN_VALUE,
            lim:    constraintHigh || Number.MAX_VALUE,
            inc:    (i)=>{ return i+1 },
            description: "integers"
        },
        "b":{
            type:   "number",
            i:      Number.MIN_VALUE,
            lim:    Number.MAX_VALUE,
            inc:    (i)=>{ return i+1 },
            description: "integers"
        },
        "direction":{
            type: "number",
            i: 0,
            lim: 1,
            inc: (i)=>{ return i },
        }
    };

    corefuncs = [

        /**
         * 
         * add and sub are the same, except direction,
         * 
         * which makes me believe there tangled.
         * 
         * I'll classify them as slider
         * 
         */
        {
            func: function slider(direction,a,b){
                if (direction===0) {
                    return a + b;
                } else {
                    return a - b;
                }
            }
        },
        {
            func: function scaler(direction,a,b){
                if (direction===0) {
                    return a * b;
                } else {
                    return a / b;
                }
            }
        },
        {
            func: function spatial(a,b){ // or contiguous
                // if (direction===0) {
                    return Math.pow(a,b)
                // } else {
                //     return Math.log()
                // }
            }
        }
        // {
        //     func: function add(a,b){return a + b},
        //     params: ["a","b"]
        // },
        // {
        //     func: function sub(a,b){return a - b},
        //     params: ["a","b"]
        // }
    ];


    numerstruct = {};

    // structclockwork
    // structdimensional
    // structabacus
    // structrelational


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
    paramLooper(params, cb, args=[]){
        let param = this.paramsdb[params.shift()]
        for (var i = param.i; i < param.lim; i = param.inc(i)) {
            if (params.length > 0) {
                args.push(i);
                this.paramLooper(params, cb, args)
            } else {
                cb(...args)
            }
        }
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
    iosearch(input, output){
        // currently searches algoequivlents instead of testing algs.

        let outputfound = (output in this.ioequivalentsdb)
        // console.log(outputfound)
        // if (!outputfound) {return;}
        // console.log("bl")
        let outputobj = this.ioequivalentsdb[output];
        this.iosearchresult = outputobj.filter((funcelem)=>{
            return funcelem.input === input;
        })
    }
    diffneighboranalysis(inputL,outputL,diffsarr = []){
        let assessarr;
        let diffresultarr = [];
        if (diffsarr.length === 0) {
            assessarr = outputL;
        } else {
            assessarr = diffsarr[diffsarr.length - 1];
        }

        let zrocnt = 0;
        assessarr.sort((a,b)=>{
            let diffresult = a - b;
            diffresultarr.push(diffresult)
            if (0 === diffresult) zrocnt += 1;
            return 0
        });
        diffsarr[diffsarr.length] = diffresultarr;
        if (zrocnt === (diffresultarr.length)) {        // UH OHOHOHOHOHOHOH, INFINITE LOOP IF NEVER EQUAL
            return diffsarr
        } else {
            return this.diffneighboranalysis(inputL,outputL,diffsarr)
        }
    }
    algogenbrute(inputL,outputL){
        // creates algorithm based on io set.
        /**
         *      master the plus operator
         */
        // let constraintedrange = [-5,-4,-3,-2,-1,0,1,2,3,4,5]
        // let funcobj = {
        //     func: function add(a,b){return a + b},
        //     params: ["a","b"]
        // }
        // inputL.forEach((input,index)=>{
        //     this.paramLooper(funcobj.params, ()=>{
        //         if (funcobj.func(input, b) === outputL[index]) {
        //             console.log({input, b, output: outputL[index]})
        //         }
        //     })
        // })
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

ioalgo0.iosearch(1,2);
console.log(ioalgo0.iosearchresult);


console.log(
    ioalgo0.diffneighboranalysis(
        [0,1,2,3,4,5],
        [1,2,3,4,5,6],
    )
)


ioalgo0.algogenbrute(
    [0,1,2],
    [0,1,2]
)

ioalgo0.algogenbrute(
    [0,1,2],
    [1,2,3]
)

ioalgo0.algogenbrute(
    [0,1,2],
    [2,3,4]
)
ioalgo0.algogenbrute(
    [0,1,2],
    [-1,0,1]
)