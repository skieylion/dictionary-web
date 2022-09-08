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


let Rest =  {
    getStudentCards:function(slotId,limit){
        return axios({
            method:"GET",
            url:"http://localhost:8081/student/slots/"+slotId+"/cards?limit="+limit
        }).then(res => {
            console.log("slots:",res);
            return res.data;
        })
        .catch(err => console.error(err));
    },
    findPhotos:function(query){
        return axios({
            method:"GET",
            url:"http://localhost:8081/search/photos?query="+query
        }).then(res => {
            let arr=[];
            if(res.data && res.data.length>0){
                for(let i=0;i<Math.min(res.data.length,10);i++){
                    arr.push({
                        imgPath:res.data[i]
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
        //let path=theUrl.replace("https://audio.oxforddictionaries.com","");
        
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                callback(xmlHttp.response);
            }
        }
        
        xmlHttp.open("GET", "http://localhost:8081/loader/audio?url="+url, true); // true for asynchronous 
        xmlHttp.send(null);
    },
    getAudioByURL:function(url,callback) {
        //let path=theUrl.replace("https://audio.oxforddictionaries.com","");
        
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                callback(xmlHttp.response);
            }
        }
        
        xmlHttp.open("GET", url, true); // true for asynchronous 
        xmlHttp.send(null);
    },

    getPhoto:function(url,callback) {
        //let path=theUrl.replace("https://audio.oxforddictionaries.com","");
        const params = new URLSearchParams(url)
        let format="."+params.get("fm");
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                callback(xmlHttp.response,format);
            }
        }
        
        xmlHttp.open("GET", "http://localhost:8081/loader/photo?url="+url, true); // true for asynchronous 
        xmlHttp.send(null);
    },
    find:function(query){
        return axios({
            method:"GET",
            url:"http://localhost:8081/entries?query="+query
        })
        .then(res => res.data)
        .catch(err => console.error(err));
    },
    toLink:function(link){
        window.location.href="http://localhost:3000"+link;
    },
    getCardsBySlotId:function(slotId,offset,limit,f){
        axios({
            method:"GET",
            url:"http://localhost:8081//slots/"+slotId+"/cards?offset="+offset+"&limit="+limit
        }).then(response=>{
            f(response);
        }).catch(error=>{
            console.log("rest: ",error);
        });
    },
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
    getCardList:function(f,ferr) {
            axios({
                method:"GET",
                url:"http://localhost:8081/slots"
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
        var url="http://localhost:8081/repeat/cards/"+contextId;
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
            url:"http://localhost:8081/cards",
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

        // axios.post("http://localhost:8081/card",card)
        // .then(response=>{
        //     f(response);
        // }).catch(error=>{
        //     console.log(error);
        // });
    },
    dataURLtoFile:function(dataurl, filename) {
 
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        console.log("mime",mime)
        return new File([u8arr], filename, {type:mime});
    },
    uuidv4:function(){
        function uuidv4() {
            return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            );
        }
        return uuidv4();
    },
    saveFileV2:function(bytes,fs){
        function uuidv4() {
            return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            );
        }

        let guid=uuidv4();

        const file = new File([bytes], "photo");

        var bodyFormData = new FormData();
        bodyFormData.append('file', file);
        //file.name
        axios({
            method:"POST",
            url:"http://localhost:8081/Files?fileId="+guid,
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
    saveFile:function(fileIn, fs){
        function uuidv4() {
            return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            );
        }

        let guid=uuidv4();
        
        const file = Rest.dataURLtoFile(fileIn,guid+'.png');

        var bodyFormData = new FormData();
        bodyFormData.append('file', file);
        //file.name
        axios({
            method:"POST",
            url:"http://localhost:8081/Files?fileId="+guid,
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
    base64ToArrayBuffer:function(base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    },
    cut:function(str,size){
        if(str.length<size) return str;
        return str.substring(0,size)+"...";
    },
    deleteCard:function(cardId){
        axios({
            method:"DELETE",
            url:"http://localhost:8081/cards/"+cardId,
            headers: { 
                "Content-Type": "text/plain",
                "Access-Control-Request-Method":"DELETE",
                "Access-Control-Allow-Origin":"http://localhost:3000/"
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
            url:"http://localhost:8081/slots/"+slotId,
            headers: { 
                "Content-Type": "text/plain",
                "Access-Control-Request-Method":"DELETE",
                "Access-Control-Allow-Origin":"http://localhost:3000/"
            }
        }).then(response=>{
            console.log("response",response);
            f();
        }).catch(error=>{
            console.log(error);
        });
    },
    getCard:function(cardId){
        return axios.get("http://localhost:8081/cards/"+cardId)
        .then(res => res.data)
        .catch(err => console.error(err));
    }
    

}

export default Rest;