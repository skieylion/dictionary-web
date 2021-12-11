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
    getContext:function(id,f){
        axios.delete("/context/"+id).then((response) => {
            exec(f,response);
        });
    },
    getContextByListId:function(list,f){
        axios.get("/context/",{
            params: {
                ids: list
            }
        }).then((response) => {
            exec(f,response.data);
        });
    },
    getTypes:function(f){
        axios.get("/typeform").then((response) => {
            exec(f,response);
        });
    },
    findForStudying:function(setId,f){
        axios.get("/context/set/"+setId+"/studying")
        .then((response) => {
            exec(f,response);
        });
    },
    findBySet:function(setId,f){
        axios.get("/context/set/"+setId)
        .then((response) => {
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
        axios.post("/context/"+contextId+"/repetition").then(() => {
            console.log("saved");
            exec(f);
        });
    },
    studiedContext:function(contextId,f) {
        axios.post("/context/"+contextId+"/event").then(() => {
            console.log("saved");
            exec(f);
        });
    },
    unknownContext:function(contextId,f) {
        axios.delete("/context/"+contextId+"/event").then(() => {
            console.log("saved");
            exec(f);
        });
    },
    attachToSet:function(contextId,setId,f){
        axios.post("/context/"+contextId+"/set/"+setId).then(()=>{
            console.log("attached");
            exec(f);
        });
    },
    detachFromSet:function(contextId,setId,f){
        axios.delete("/context/"+contextId+"/set/"+setId).then(()=>{
            console.log("detached");
            exec(f);
        });
    }
}