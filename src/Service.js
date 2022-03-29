let Service =  {
    getTextByExampleListAndExpressionValue:(exampleList,expressionValue)=>{
        for(let j=0;j<exampleList.length;j++){
            let exampleText=exampleList[j].text;
            if(exampleText&&exampleText.toLowerCase().indexOf(expressionValue.toLowerCase())>-1){
                let str="";
                for(let k=0;k<expressionValue.length;k++) {
                    str+="☐";
                }
                let v=exampleText.replace(expressionValue,str);
                return v;
            }
        }
        return "";
    },
}

export default Service;