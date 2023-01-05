const controlflowfuncs = [
    {
        func: function if0(condition,ifcb){
            if (condition) {
                return ifcb();
            }
        },
        params: ["condition","ifcb"],
    },
    {
        func: function if1(condition,ifcb,elsecb){
            if (condition) {
                return ifcb();
            } else {
                return elsecb();
            }
        },
        params: ["condition","ifcb","elsecb"],
    }
];

try {
    module.exports = controlflowfuncs;
} catch (e) {
    console.error(e);
}