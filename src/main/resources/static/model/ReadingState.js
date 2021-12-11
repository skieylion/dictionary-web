class ReadingState extends State {
    constructor(context){
        super(context);
        console.log("ReadingState constructor")
        this.sourceImage="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZwAAAE6CAIAAACtZnOdAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPzSURBVHhe7dRBDQAwCACxCeGJf2d4mI9Lk2rou1mADKkBKVIDUqQGpEgNSJEakCI1IEVqQIrUgBSpASlSA1KkBqRIDUiRGpAiNSBFakCK1IAUqQEpUgNSpAakSA1IkRqQIjUgRWpAitSAFKkBKVIDUqQGpEgNSJEakCI1IEVqQIrUgBSpASlSA1KkBqRIDUiRGpAiNSBFakCK1IAUqQEpUgNSpAakSA1IkRqQIjUgRWpAitSAFKkBKVIDUqQGpEgNSJEakCI1IEVqQIrUgBSpASlSA1KkBqRIDUiRGpAiNSBFakCK1IAUqQEpUgNSpAakSA1IkRqQIjUgRWpAitSAFKkBKVIDUqQGpEgNSJEakCI1IEVqQIrUgBSpASlSA1KkBqRIDUiRGpAiNSBFakCK1IAUqQEpUgNSpAakSA1IkRqQIjUgRWpAitSAFKkBKVIDUqQGpEgNSJEakCI1IEVqQIrUgBSpASlSA1KkBqRIDUiRGpAiNSBFakCK1IAUqQEpUgNSpAakSA1IkRqQIjUgRWpAitSAFKkBKVIDUqQGpEgNSJEakCI1IEVqQIrUgBSpASlSA1KkBqRIDUiRGpAiNSBFakCK1IAUqQEpUgNSpAakSA1IkRqQIjUgRWpAitSAFKkBKVIDUqQGpEgNSJEakCI1IEVqQIrUgBSpASlSA1KkBqRIDUiRGpAiNSBFakCK1IAUqQEpUgNSpAakSA1IkRqQIjUgRWpAitSAFKkBKVIDUqQGpEgNSJEakCI1IEVqQIrUgBSpASlSA1KkBqRIDUiRGpAiNSBFakCK1IAUqQEpUgNSpAakSA1IkRqQIjUgRWpAitSAFKkBKVIDUqQGpEgNSJEakCI1IEVqQIrUgBSpASlSA1KkBqRIDUiRGpAiNSBFakCK1IAUqQEpUgNSpAakSA1IkRqQIjUgRWpAitSAFKkBKVIDUqQGpEgNSJEakCI1IEVqQIrUgBSpASlSA1KkBqRIDUiRGpAiNSBFakCK1IAUqQEpUgNSpAakSA1IkRqQIjUgRWpAitSAFKkBKVIDUqQGpEgNSJEakCI1IEVqQIrUgBSpASlSA1KkBqRIDUiRGpAiNSBFakCK1IAUqQEpUgNSpAakSA1IkRqQIjUgRWpAitSAFKkBKVIDUqQGpEgNSJEakCI1IEVqQIrUgBSpASlSA1KkBqRIDUiRGpAiNSBFakCK1IAUqQEpUgNSpAakSA1IkRqQIjUgRWpAitSAFKkBKVIDUqQGpEgNSJEakCI1IEVqQIrUgBSpASlSA1KkBqRIDUiRGpAiNSBFakCK1IAUqQEpUgNSpAakSA1IkRqQIjUgRWpAitSAFKkBIbMfroVPR1s3+VwAAAAASUVORK5CYII=";
        this.searchImage="https://www.google.com/search?&tbm=isch&q={{context}}";
        this.youGlish="https://youglish.com/pronounce/{{context}}/english/uk";
        this.cambridge="https://dictionary.cambridge.org/dictionary/english/{{context}}";
        this.reverso="https://context.reverso.net/translation/english-russian/{{context}}";
        this.translate="https://translate.google.com/?sl=en&tl=ru&text={{context}}&op=translate";

        var list=context.getList();
        var listCard=[];
        for(var i=0;i<list.length;i++){
            var word=list[i];
            var ctx=word.form.value;
            listCard.push({
                isResult:false,
                templateName:"components/CardView.html",
                context:ctx,
                translate:word.translate,
                translateBuffer:"",
                transcription:word.form.transcription,
                //checkTwoWord:checkTwoWord,
                contextBuffer:"",
                //checkImageContext:checkImageContext,
                //checkAudio:checkAudio,
                srcImage:word.photoFile?word.photoFile.dataStr:this.sourceImage,
                srcAudioFile:word.form.audioFile?word.form.audioFile.dataStr:"",
                srcAudioFileUID:word.form.audioFile?word.form.audioFile.uid:"",
                linkSearchImage:this.searchImage.replace("{{context}}",ctx),
                linkYouGlish:this.youGlish.replace("{{context}}",ctx),
                linkCambridge:this.cambridge.replace("{{context}}",ctx),
                definition:word.def,
                linkReversoContext:this.reverso.replace("{{context}}",ctx),
                linkTranslate:encodeURI(this.translate.replace("{{context}}",ctx)),
                isVisible:i==0?true:false,
                examples:[]
            });
            for(var j=0;j<word.examples.length;j++){
                listCard[i].examples.push(word.examples[j].text);
            }
        }
        context.setListCard(listCard);
        var index=0;
        context.setIndex(index);

        context.getNext().setName("далее");
        context.getService().setName("проверить");
        context.getPrev().setName("назад");
        context.getPrev().hide();
        context.getService().hide();

        if(list.length>1) {
           context.getNext().show();
        } else if(list.length==1){
            context.getService().show();
            context.getNext().hide();
        }
    }

    clickNext(){
        console.log("ReadingState click next")
        var context=this.context;
        var size=context.getList().length;
        var index=context.getIndex();
        if(index<size-1) {
            if(index+1==size-1) {
                context.getNext().hide();
                context.getService().show();
            } else {
                context.getNext().show();
            }
            context.setIndex(index+1);
            context.getPrev().show();
            context.setDisplayByIndex(index,false);
            context.setDisplayByIndex(index+1,true);
        }
    }

    clickPrev(){
        console.log("ReadingState click prev")
        var context=this.context;
        var size=context.getList().length;
        var index=context.getIndex();
        if(index>0) {
            if(index-1==0){
                context.getPrev().hide();
            } else {
                context.getPrev().show();
            }
            context.setIndex(index-1);
            context.getNext().show();
            context.getService().hide();
            context.setDisplayByIndex(index,false);
            context.setDisplayByIndex(index-1,true);
        }
    }

    clickService(){
        if(this.preState){
            this.context.setState(this.preState(this.context));
        } else {
            this.context.setState(new TranslateState(this.context));
        }
    }
}