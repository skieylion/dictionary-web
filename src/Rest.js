import Utils from './Utils';

const axios=require('axios').default;

const lexical_categories=[
	{
		cat_value:"adjective",
		cat_id:4,
	},
	{
		cat_value:"adverb",
		cat_id:5,
	},
	{
		cat_value:"verb",
		cat_id:2,
	},
	{
		cat_value:"determiner",
		cat_id:13,
	},
	{
		cat_value:"preposition",
		cat_id:6,
	},
	{
		cat_value:"noun",
		cat_id:3,
	},
	{
		cat_value:"conjunction",
		cat_id:11,
	},
	{
		cat_value:"pronoun",
		cat_id:14,
	}
];
const concat=function(arr){
    let strs="";
    for(let i=0;i<arr.length;i++) {
        strs+=arr[i];
    }
    return strs;
}
const back=function() {
    return "http://localhost:8081"+concat(arguments);
}
const front=function() {
    return "http://localhost:3000"+concat(arguments);
}

let Rest =  {
    getStudentCards:function(slotId,limit){
        return axios({
            method:"GET",
            url:back("/student/slots/",slotId,"/cards?limit=",limit)
        }).then(res => {
            console.log("slots:",res);
            return res.data;
        })
        .catch(err => console.error(err));
    },
    findPhotos:function(query){
        return axios({
            method:"GET",
            url:back("/search/photos?query=",query)
        }).then(res => {
            let arr=[];
            if(res.data && res.data.length>0){
                for(let i=0;i<Math.min(res.data.length,10);i++){
                    arr.push({
                        source:res.data[i]
                    });
                }
            }
            return arr;
        })
        .catch(err => console.error(err));
    },
    getCatIdByValue:function(cat_value){
        for(let i=0;i<lexical_categories.length;i++){
            if(lexical_categories[i].cat_value==cat_value){
                return lexical_categories[i].cat_id;
            }
        }
        return null;
    },
    getAudio:function(url,callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                callback(xmlHttp.response);
            }
        }
        
        xmlHttp.open("GET", back("/loader/audio?url=",url), true);
        xmlHttp.send(null);
    },
    getAudioByURL:function(url,callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                callback(xmlHttp.response);
            }
        }
        xmlHttp.open("GET", url, true);
        xmlHttp.send(null);
    },
    getPhoto:function(url,callback) {
        const params = new URLSearchParams(url)
        let format="."+params.get("fm");
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                callback(xmlHttp.response,format);
            }
        }
        
        xmlHttp.open("GET", back("/loader/photo?url=",url), true); // true for asynchronous 
        xmlHttp.send(null);
    },
    entries:function(wordId){
        return axios({
            method:"GET",
            url:back("/entries?wordId=",wordId)
        }).then(res => res.data)
        .catch(err => console.error(err));
    },
    toLink:function(link){
        window.location.href=front(link);
    },
    getCardsBySlotId:function(slotId,offset,limit,f){
        axios({
            method:"GET",
            url:back("/slots/",slotId,"/cards?offset=",offset,"&limit=",limit)
        }).then(response=>{
            f(response);
        }).catch(error=>{
            console.log("rest: ",error);
        });
    },
    getContextByContextListId:function(f, contextListId, status) {
        var url=back("/ContextList/", contextListId, "/Context", (status?"?status="+status:""));
        axios
            .get(url)
            .then(response=>{
                if(f) f(response);
            }).catch(error=>{
                console.log("rest: ",error);
            });
    },
    getCardList:function(f,ferr) {
            axios({
                method:"GET",
                url:back("/slots")
            }).then(response=>{
                f(response);
            }).catch(error=>{
                console.log("rest: ",error);
                if(ferr) ferr();
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
        var url=back("/repeat/cards/",contextId);
        axios
            .post(url)
            .then(response=>{
                console.log("ok: ",response);
                f();
            }).catch(error=>{
                console.log("error: ",error);
            });
    },
    saveCard:function(card,f){
        axios({
            method:"POST",
            url:back("/cards"),
            data:card,
            headers: { 
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin":"*"
            }
        }).then(response=>{
            console.log("response");
        }).catch(error=>{
            console.log(error);
        });
    },
    saveFileV2:function(bytes,fs) {
        let guid=Utils.uuidv4();
        const file = new File([bytes], "photo");
        var bodyFormData = new FormData();
        bodyFormData.append('file', file);

        axios({
            method:"POST",
            url:back("/Files?fileId=", guid),
            data:bodyFormData,
            headers: { 
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin":"*"
            }
        }).then(response=>{
            console.log("response",response);
            fs(guid);
        }).catch(error=>{
            console.log(error);
        });
    },
    saveFile:function(fileIn, fs) {
        let guid=Utils.uuidv4();
        const file = Utils.dataURLtoFile(fileIn,guid+'.png');
        var bodyFormData = new FormData();
        bodyFormData.append('file', file);

        axios({
            method:"POST",
            url:back("/Files?fileId=", guid),
            data:bodyFormData,
            headers: { 
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin":"*"
            }
        }).then(response=>{
            console.log("response",response);
            fs(guid);
        }).catch(error=>{
            console.log(error);
        });
    },
    deleteCard:function(cardId){
        axios({
            method:"DELETE",
            url:back("/cards/",cardId),
            headers: { 
                "Content-Type": "text/plain",
                "Access-Control-Request-Method":"DELETE",
                "Access-Control-Allow-Origin":front()
            }
        }).then(response=>{
            console.log("response",response);
        }).catch(error=>{
            console.log(error);
        });
    },
    deleteSlot:function(slotId,f){
        axios({
            method:"DELETE",
            url:back("/slots/", slotId),
            headers: { 
                "Content-Type": "text/plain",
                "Access-Control-Request-Method":"DELETE",
                "Access-Control-Allow-Origin":front()
            }
        }).then(response=>{
            console.log("response",response);
            f();
        }).catch(error=>{
            console.log(error);
        });
    },
    getCard:function(cardId){
        return axios.get(back("/cards/",cardId))
        .then(res => res.data)
        .catch(err => console.error(err));
    },
    saveFileToServer:function(data8,mime) {
        var uid=Utils.uuidv4();
        var file= new File([data8], uid+"."+mime, {type:mime});
        var bodyFormData = new FormData();
        bodyFormData.append('file', file,file.name);
        return axios({
            method:"POST",
            url:"http://localhost:8081/Files?fileId="+uid,
            data:bodyFormData,
            headers: { 
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin":"*"
            }
        }).then(res => uid)
        .catch(err => console.error(err));
    },
    saveFileListToServer:function(files,mime,loaded, f, ferr) {
        if(files && files.length > 0) {
            let filesCopy=[...files];
            let element=filesCopy.pop();
            Rest.saveFileToServer(element.file, mime)
            .then((fileId)=>{
                element.fileId=fileId;
                loaded.push(element);
                Rest.saveFileListToServer(filesCopy,loaded);
            }).catch(err => {ferr(err);});
        } else {
            f();
        }
    },
    file:function(fileId) {
        return back("/Files", fileId);
    },
    search:function(query) {
        return axios({
            method:"GET",
            url:back("/search?query=",query)
        }).then(res => res.data)
        .catch(err => console.error(err));
    }
}

export default Rest;