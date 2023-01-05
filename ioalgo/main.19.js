const constraintLow = -5;
const constraintHigh = 5;
class IOALGO {

    objective;
    valuesystem;
    search;
    stepstoachievegoal;

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
        "instruct",                 // 
        "study",                    // 
        "debug",                    //
        "abacus",                   // generates multibase counting problems                
        "knowthyops",               // generates code for you to practice mental computer math
        "error911",                 // generates algs that throw errors
        "debugcogceil",             // generates buggy code to practice debugging
        "solverandalgo",            // generates random algorithm
        "loopsrurfriend",           // generates random algorithm
        "followtherules",           // generates buggy code to hack
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
        {
            func: function eqd(a,b){return a == b},
            params: ["a","b"],
        },
        {
            func: function eqv(a,b){return a === b},
            params: ["a","b"],
        },
        {
            func: function nqd(a,b){return a != b},
            params: ["a","b"],
        },
        {
            func: function nqv(a,b){return a !== b},
            params: ["a","b"],
        },
        {
            func: function gt(a,b){return a > b },
            params: ["a","b"],
        },
        {
            func: function lt(a,b){return a < b},
            params: ["a","b"],
        },
        {
            func: function gte(a,b){return a >= b},
            params: ["a","b"],
        },
        {
            func: function lte(a,b){return a <= b},
            params: ["a","b"],
        },
        {
            func: function aan(a,b){return a && b},
            params: ["a","b"],
        },
        {
            func: function oor(a,b){return a || b},
            params: ["a","b"],
        },
        {
            func: function not(a){return !a},
            params: [],
        },
        {
            func: function _typeof(_0){return typeof _0},
            params: ["_0"],
        },
        {
            func: function _typeof(_0,_1){return _0 instanceof _1},
            params: ["_0"],
        },


        {
            func: function _if(condition,ifcb,elsecb){
                if(condition){
                    return ifcb();
                } else {
                    return elsecb();
                }
            }
        },



    ];


    numerstruct = {};

    // structclockwork
    // structdimensional
    // structabacus
    // structrelational

    orderofprecedence = {
        "js": {
            // Precedence 	Operator	Description	Associativity	Example
            // 1	()	Grouping	–	(1+2)
            // 2	.	Member	left to right	obj.function
            // []	Member	left to right	obj[“func”]	
            // new	Create	–	new Date()	
            // ()	Function call	left to right	func()	
            // 3	++	Postfix increment	–	i++
            // —	Postfix decrement	–	i–	
            // 4	++	Prefix increment	right to left	++i
            // —	Prefix decrement	–i		
            // !	Logical NOT	!TRUE		
            // typeof	Type	typeof a		
            // 5	**	Exponentiation	right to left	4**2
            // 6	*	Multiplication	left to right	2*3
            // /	Division	18/9		
            // %	Remainder	4%2		
            // 7	+	Addition	left to right	2+4
            // –	Subtraction	4-2		
            // 8	<< 	Left shift 	left to right	y<<2
            // >> 	Right shift	y>>2		
            // >>> 	Unsigned Right shift 	y>>>2		
            // 9	< 	Less than	left to right	3<4
            // <= 	Less than or equal	3<=4		
            // > 	Greater than	4>3		
            // >= 	Greater than or equal	4>=3		
            // in	In	“PI” in MATH		
            // instanceof	Instance of 	A instanceof B		
            // 10	==	Equality	left to right	x==y
            // !=	Inequality	x!=y		
            // ===	Strictly equal	x===y		
            // !==	Strictly unequal	x!==y		
            // 11	&	Bitwise AND	left to right	x&y
            // 12	^	Bitwise XOR	left to right	x^y
            // 13	|	Bitwise OR	left to right	x|y
            // 14	&&	Logical AND	left to right	x&&y
            // 15	||	Logical OR	left to right	x||y
            // 16	? :	Conditional	right to left	(x>y)?x:y
            // 17	 	Assignment	right to left	x=5
            // +=	x+=3			
            // -=	x-=3			
            // *=	x*=3			
            // /=	x/=3			
            // %=	x%=3			
            // <<= 	x<<=2			
            // >>= 	x>>=2			
            // >>>= 	x>>>=2			
            // &=	x&=y			
            // ^=	x^=y			
            // |=	x|=y			
            // 18	yield	Pause function 	right to left	yield x
            // 19	,	Comma	left to right	x,y
            
        },
        "math": [
            // https://www.w3schools.com/charsets/ref_utf_math.asp
            // ()      1
            // **      2
            // *       3
            // /       4
            // +       5
            // -       6
        ],
        "bitwise":[],
        "logical": [],
        "comparison":[],
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
    diffneighboranalysis(inputL,outputL,diffsarr = []){
        /**
         * 
         * keep in mind of order of precedence.
         * 
         * ................ the machine needs to come to these conclusion .....
         * 
         * +,-,*,\,pow    --- when evaluated by ( - ) last diffarr elem ends in 0.
         * 
         * >>, <<, when evaluated by ( - ) last diffarr elem ends in left hand value with multiples  
         * 
         * &&, ||, ^, when evaluated by ( - ) 
         * 
         * 
         * 
         */
        let assessarr;
        let diffresultarr = [];
        if (diffsarr.length === 0) {
            assessarr = outputL;
        } else {
            assessarr = diffsarr[diffsarr.length - 1];
        }

        let zrocnt = 0;
        assessarr.sort((a,b)=>{
            // let diffresult = a - b;                  // good for -,+,*,\,pow
            // let diffresult = a | b;
            console.log("a",a,"b",b)
            // let diffresult = a & b;                  // produced zeros when used on bitshift operators
            let diffresult = a ^ b;
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
        // creates algorithm based on io set with brute force
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
    algogensolve(){
        /**
         * // creates algorithm based on io set withoutbrute force
         */
    }
    algoequivalents(){
        // tests algorithm, generates io equivalent algorithm
    }
    algometrics(){
        iosummary={}
        perio={
            input,
            output,
            executiontime,
            compressionratio,
            memoryhigh,
            memorylow,
            memoryavg,
            cpuhigh,
            cpulow,
            cpuavg,
            os,
            hardware,
            jsversion,
        }
    }
    ioinspector(){}
    specdev(){
        // inputs, outputs, along with io predictions from frequently used human io search space.
    }

    instruct(){}
    study(){}






    abacus(){}
    knowthyops(){}
    error911(){}
    debugcogceil(){}
    solverandalgo(){}
    loopsrurfriend(){}
    followthrules(){}
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

// ioalgo0.ioassertion()
// console.log(ioalgo0.assertL)

// ioalgo0.ioequivalents();
// console.log(ioalgo0.ioequivalentsdb);

// ioalgo0.iosearch(1,2);
// console.log(ioalgo0.iosearchresult);


// console.log(
//     ioalgo0.diffneighboranalysis(
//         [0,1,2,3,4,5],
//         [1,2,3,4,5,6],
//     )
// )

// bitwise left shift diff assessment
// for (var a = 1; a < 2; a++) {
//     let inputL = [];
//     let outputL = [];
//     for (let b = 0; b <= 10; b++) {
//         inputL.push(b);
//         outputL.push(a << b);
//     }
//     console.log(
//         ioalgo0.diffneighboranalysis(inputL, outputL)
//     )
// }


// // bitwise right shift diff assessment
// for (var a = 10; a >= 0; a--) {
//     let inputL = [];
//     let outputL = [];
//     for (let b = 0; b <= (a + 1); b++) {
//         inputL.push(b);
//         outputL.push(a >> b);
//     }
//     console.log(
//         ioalgo0.diffneighboranalysis(inputL, outputL)
//     )
// }


// bitwise or diff assessment
/** 
 * 1st diffarr elem displays pattern.
 * 
 * [ // 1st diffarr elem of a = 2
     0,  0, 0, 4, 0, 0, 0,
    12,  0, 0, 0, 4, 0, 0,
     0, 28, 0, 0, 0, 4
  ],
  [  // 1st difarr elem of a = 3
    1,   1, 1, 5, 1, 1, 1,
    13,  1, 1, 1, 5, 1, 1,
     1, 29, 1, 1, 1, 5
  ],
  [  // 1st diffarr elem of a = 4
     1,  3, 1, 3, 1, 3, 1,
    11,  1, 3, 1, 3, 1, 3,
     1, 27, 1, 3, 1, 3
  ],
  [ // 1st difarr elem of a = 5
     0,  2, 0, 2, 0, 2, 0,
    10,  0, 2, 0, 2, 0, 2,
     0, 26, 0, 2, 0, 2
  ],
  
 * 
*/
// for (var a = 5; a < 6; a++) {
//     let inputL = [];
//     let outputL = [];
//     for (let b = 0; b <= 20; b++) {
//         inputL.push(b);
//         outputL.push(a | b);
//     }
//     console.log(
//         ioalgo0.diffneighboranalysis(inputL, outputL)
//     )
// }




// slider diff assessment
for (var a = 1; a < 10; a++) {
    let inputL = [];
    let outputL = [];
    for (let b = 0; b <= (a + 1); b++) {
        inputL.push(b);
        outputL.push(a + b);
    }
    console.log(
        ioalgo0.diffneighboranalysis(inputL, outputL)
    )
    console.log(`\n\n\n`)
}


// // scaler diff assessment - multiplication only.
// for (var a = 1; a < 10; a++) {
//     let inputL = [];
//     let outputL = [];
//     for (let b = 0; b <= 10; b++) {
//         inputL.push(b);
//         outputL.push(a * b);
//     }
//     console.log(
//         ioalgo0.diffneighboranalysis(inputL, outputL)
//     )
// }


// // spatial diff assessment
// for (var e = 1; e < 10; e++) {
//     let inputL = [];
//     let outputL = [];
//     for (let b = 0; b <= (e + 3); b++) {
//         inputL.push(b);
//         outputL.push(Math.pow(b,e));
//     }
//     console.log(
//         ioalgo0.diffneighboranalysis(inputL, outputL)
//     )
// }

// ioalgo0.algogenbrute(
//     [0,1,2],
//     [0,1,2]
// )

// ioalgo0.algogenbrute(
//     [0,1,2],
//     [1,2,3]
// )

// ioalgo0.algogenbrute(
//     [0,1,2],
//     [2,3,4]
// )
// ioalgo0.algogenbrute(
//     [0,1,2],
//     [-1,0,1]
// )
