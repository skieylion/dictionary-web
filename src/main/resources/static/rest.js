var Rest = {
    getSets:function(f){
        console.log("rest get sets")
        axios.get("/sets").then((response) => {
            exec(f,response);
        });
    },
    deleteSetById:function(id,f){
        axios.delete("/sets/"+id).then((response) => {
            exec(f,response);
        });
    },
    getTypes:function(f){
        axios.get("/typeform").then((response) => {
            exec(f,response);
        });
    },
    findBySets:function(flag,list,f){
        axios.get("/context/set",{
             params: {
                isUnionAll:flag,
                ids: list
             }
        }).then((response) => {
            exec(f,response);
        });
    },
    saveSets:function(input,f) {
        axios.post("/sets", input).then(() => {
            console.log("saved");
            exec(f);
        });
    },
    saveRepeater:function(contextId,f) {
        axios.post("/repeater/context/"+contextId).then(() => {
            console.log("saved");
            exec(f);
        });
    }
}