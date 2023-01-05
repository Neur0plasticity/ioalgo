class IOALGO {

    tests = [
        "ioassertion",              // asserts inputs and outputs of algorithm
        "ioequivalents",            // algs are grouped together with common outputs.
        "iosearch",                 // searches algorithms that produce io set given
        "diffanalysis",             // differential neighbor analysis
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
            i:      Number.MIN_VALUE,
            lim:    Number.MAX_VALUE,
            inc:    (i)=>{ return i+1 },
            description: "integers"
        },
        "b":{
            type:   "number",
            i:      Number.MIN_VALUE,
            lim:    Number.MAX_VALUE,
            inc:    (i)=>{ return i+1 },
            description: "integers"
        }
    };



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
    diffanalysis(inputL,outputL,diffsarr = []){
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
        if (zrocnt === (diffresultarr.length)) {
            return diffsarr
        } else {
            return this.diffanalysis(inputL,outputL,diffsarr)
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
    ioalgo0.diffanalysis(
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