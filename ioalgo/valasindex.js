class ValAsIndexStorage {
    paramcabinets = {}; // each param has it's own cabinet.
    translate(param,value){
        let ipos = this.getIterationPosition(param,value)
        return ipos
    }
    search(param,value){
        
    }
    store(param, value){

    }
    getIterationPosition(param,value){
        let i = param.i;
        let lim = param.lim;
        let skip = param.skip;
        let pos = 0;
        for (let i = 0; i < lim; i += skip) {
            if (i === value) {
                break;
            }
            pos++;
        }
        return pos;
    }

}
