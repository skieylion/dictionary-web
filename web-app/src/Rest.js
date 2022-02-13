const axios=require('axios').default;

let Rest =  {
    getContextByContextListId:function(f, contextListId, status) {
        var url="http://localhost:8081/ContextList/"+contextListId+"/Context"+(status?"?status="+status:"");
        axios
            .get(url)
            .then(response=>{
                if(f) f(response);
            }).catch(error=>{
                console.log("rest: ",error);
            });
    },
    getContextListForStudent:function(f, contextListId,maxCount) {

        let rec=function(list,status) {
            Rest.getContextByContextListId(function(response){
                if(response&&response.data&&response.data.length>0){
                    for(var i=0;i<response.data.length;i++) {
                        if(list.length<maxCount) {
                            list.push(response.data[i]);
                        }
                    }
                }
                
                if(list.length<maxCount && status != "NEW") {
                    rec(list,"NEW");
                } else {
                    f(list);
                }
            },contextListId,status);
        };
        rec([],"UNREPEATED");
    },
    setRepeatContext:function(contextId,f){
        var url="http://localhost:8081/Context/"+contextId+"/ContextStatus/REPEATED";
        axios
            .post(url)
            .then(response=>{
                console.log("ok: ",response);
                f();
            }).catch(error=>{
                console.log("error: ",error);
            });
    }

}

export default Rest;