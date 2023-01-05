
class SearchTrie {
    branches = {};
    // traverser(){
        
    // }
    store(value){

        /**
         * instead of traversing tree with recursive calls.
         * a standard for loop will be used to save memory.
         */

        if (value.length === 0) return false;

        let depth = value.length;
        let branches = this.branches;
        let branch = null;
        let char = value[0];
        let i = depth;
        let cnt = 0;

        // console.log(this.branches);
        // console.log(branches);

        for (i = depth; i; i--) {
            // console.log("loop")
            // access charNode in branches
            // access nextBranches in charNode
            // repeat
            char = value[cnt];
            this.enterBranch(char,branches,
                ()=>{
                    branch = branches[char];
                },
                ()=>{
                    branches[char] = this.makebranchnode();
                    branch = branches[char];
                });
            this.enterBranches(branch,
                ()=>{
                    branches = branch.branches;
                });
            cnt++;
        }
        return i === 0;
    }
    search(value){
        /**
         * instead of traversing tree with recursive calls.
         * a standard for loop will be used to save memory.
         */

        if (value.length === 0) return false;

        let depth = value.length;
        let branches = this.branches;
        let branch = null;
        let char = value[0];
        let i = depth;
        let cnt = 0;

        // console.log(this.branches);
        // console.log(branches);

        for (i = depth; i; i--) {
            // console.log("loop")
            // access charNode in branches
            // access nextBrachnes in charNode
            // repeat
            char = value[cnt];
            this.enterBranch(char,branches,
                ()=>{
                    branch = branches[char];
                },
                ()=>{
                    i = false;
                });

            if (i === false) break;

            this.enterBranches(branch,
                ()=>{
                    branches = branch.branches;
                });
            cnt++;
        }
        return i === 0;
    }
    delete(value){
        // /**
        //  * instead of traversing tree with recursive calls.
        //  * a standard for loop will be used to save memory.
        //  */

        // if (value.length === 0) return false;

        // let depth = value.length;
        // let branches = this.branches;
        // let branch = null;
        // let char = value[0];
        // let i = depth;
        // let cnt = 0;

        // // console.log(this.branches);
        // // console.log(branches);

        // for (i = depth; i; i--) {
        //     // console.log("loop")
        //     // access charNode in branches
        //     // access nextBrachnes in charNode
        //     // repeat
        //     char = value[cnt];
        //     this.enterBranch(char,branches,
        //         ()=>{
        //             branch = branches[char];
        //         },
        //         ()=>{
        //             i = false;
        //         });

        //     if (i === false) break;

        //     this.enterBranches(branch,
        //         ()=>{
        //             branches = branch.branches;
        //         });
        //     cnt++;
        // }
        // if (i === 0) return delete branches[char];
        // else         return false;
        // /** CAUTION POSSIBLE MEMORY LEAK
        //         do all the linked nodes get deleted?
        // */

        // // return i === 0;
    }
    makebranchnode(){
        return {
            branches: {},
            value: null,
        }
    }
    enterBranch(char,branches, cb0, cb1){
        if (branches.hasOwnProperty(char)) cb0();
        else cb1();
    }
    enterBranches(branch,cb0,cb1){
        // if (typeof branch.branches === "object") {
            cb0();
        // } else {
        //     cb1();
        // }
    }

}

class TrieHugger {
    tries = {}; ///// each trie represents key field
    store(dataObj){
        if (typeof dataObj !== "object") return false;
        let value;
        for (let key in dataObj) {
            if (!this.tries.hasOwnProperty(key)) this.tries[key] = new SearchTrie()
            value = dataObj[key];
            this.tries[key].store(value)
        }
    }
    search(dataObj){
        for (let key in dataObj) {
            if (!this.tries.hasOwnProperty(key)) return false;
            if (!this.tries[key].search(dataObj[key])) return false;
        }
        return true;
    }
    delete(dataObj){
        for (let key in dataObj) {
            if (!this.tries.hasOwnProperty(key)) return false;
            if (!this.tries[key].delete(dataObj[key])) return false;
        }
        return true;
    }
}



let st = new SearchTrie()
st.store("abc");
st.store("aa");
console.log(st.branches);
console.log(st.search("abc"))
console.log(st.search("abd"))
console.log(st.delete("abc"))           // delete c node
console.log(st.branches.a.branches.b)



let th = new TrieHugger()
th.store({
    "name": "bob",
    "age": "12"
})

console.log(th.tries)