import React,{Component,useState, useEffect} from 'react';

const Utils =  {   
    keyIndex:3, 
    getParams:function findGetParameter(parameterName) {
        var result = null,
            tmp = [];
        window.location.search
            .substr(1)
            .split("&")
            .forEach(function (item) {
              tmp = item.split("=");
              if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
            });
        return result;
    },
    getRemoveArray:function(list,key){
        let listNew=[...list];
        for(let i=0;i<listNew.length;i++){
            if(listNew[i].key==key) {
                listNew.splice(i,1);
                break;
            }
        }
        return listNew;
    },
    cut:(str,size)=>{
        if(str.length<size) return str;
        return str.substring(0,size)+"...";
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
    base64ToArrayBuffer:function(base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    },
    getAddArray:function(list,buffer){
        let newArr=[...list];
        let v={};
        Object.assign(v,buffer)
        newArr.push({
            key:Utils.getKeyIndex(),
            text:v
        });
        return newArr;
    },
    getKeyIndex:function() {
        return ++Utils.keyIndex;
    },
    getTranscriptionDtoList:function(transcriptionArrayList){
        let transcriptionDtoList=[];
        for(let tr of transcriptionArrayList) {
            transcriptionDtoList.push({
                value:tr.text.current.value,
                variant:tr.transcription,
                fileId:tr.fileId
            });
        };
        return transcriptionDtoList;
    },
    setArrayBufferFile:function(file,onload){
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = function() {
            onload(reader.result);
        };
        reader.onerror = function() {
            console.log(reader.error);
        };
    },
    getSource:function(data8,type){
        return "data:"+type+";base64,"+Buffer.from(data8).toString('base64');
    }
}

export default Utils;