import ImageDefault from './ImageDefault';


const imageDefault=ImageDefault.imageModule;

let Service =  {
    getTextByExampleListAndExpressionValue:(exampleList,expressionValue)=>{
        for(let j=0;j<exampleList.length;j++){
            let exampleText=exampleList[j].text;
            if(exampleText&&exampleText.toLowerCase().indexOf(expressionValue.toLowerCase())>-1){
                let str="";
                for(let k=0;k<expressionValue.length;k++) {
                    str+="_";
                }
                let v=exampleText.replace(expressionValue,str);
                return v;
            }
        }
        return "";
    },
    replaceSubtextBySymbols:(text,subText,symbol)=>{
        if(text.toLowerCase().indexOf(subText.toLowerCase())>-1){
            let str="";
            for(let k=0;k<subText.length;k++) str+=symbol;
            return text.replace(subText,str);
        }
        return text;
    },
    imageDefault:imageDefault
}

export default Service;