class ImageContextState extends State {
    constructor(context){
        super(context);
        this.sourceImage="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZwAAAE6CAIAAACtZnOdAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPzSURBVHhe7dRBDQAwCACxCeGJf2d4mI9Lk2rou1mADKkBKVIDUqQGpEgNSJEakCI1IEVqQIrUgBSpASlSA1KkBqRIDUiRGpAiNSBFakCK1IAUqQEpUgNSpAakSA1IkRqQIjUgRWpAitSAFKkBKVIDUqQGpEgNSJEakCI1IEVqQIrUgBSpASlSA1KkBqRIDUiRGpAiNSBFakCK1IAUqQEpUgNSpAakSA1IkRqQIjUgRWpAitSAFKkBKVIDUqQGpEgNSJEakCI1IEVqQIrUgBSpASlSA1KkBqRIDUiRGpAiNSBFakCK1IAUqQEpUgNSpAakSA1IkRqQIjUgRWpAitSAFKkBKVIDUqQGpEgNSJEakCI1IEVqQIrUgBSpASlSA1KkBqRIDUiRGpAiNSBFakCK1IAUqQEpUgNSpAakSA1IkRqQIjUgRWpAitSAFKkBKVIDUqQGpEgNSJEakCI1IEVqQIrUgBSpASlSA1KkBqRIDUiRGpAiNSBFakCK1IAUqQEpUgNSpAakSA1IkRqQIjUgRWpAitSAFKkBKVIDUqQGpEgNSJEakCI1IEVqQIrUgBSpASlSA1KkBqRIDUiRGpAiNSBFakCK1IAUqQEpUgNSpAakSA1IkRqQIjUgRWpAitSAFKkBKVIDUqQGpEgNSJEakCI1IEVqQIrUgBSpASlSA1KkBqRIDUiRGpAiNSBFakCK1IAUqQEpUgNSpAakSA1IkRqQIjUgRWpAitSAFKkBKVIDUqQGpEgNSJEakCI1IEVqQIrUgBSpASlSA1KkBqRIDUiRGpAiNSBFakCK1IAUqQEpUgNSpAakSA1IkRqQIjUgRWpAitSAFKkBKVIDUqQGpEgNSJEakCI1IEVqQIrUgBSpASlSA1KkBqRIDUiRGpAiNSBFakCK1IAUqQEpUgNSpAakSA1IkRqQIjUgRWpAitSAFKkBKVIDUqQGpEgNSJEakCI1IEVqQIrUgBSpASlSA1KkBqRIDUiRGpAiNSBFakCK1IAUqQEpUgNSpAakSA1IkRqQIjUgRWpAitSAFKkBKVIDUqQGpEgNSJEakCI1IEVqQIrUgBSpASlSA1KkBqRIDUiRGpAiNSBFakCK1IAUqQEpUgNSpAakSA1IkRqQIjUgRWpAitSAFKkBKVIDUqQGpEgNSJEakCI1IEVqQIrUgBSpASlSA1KkBqRIDUiRGpAiNSBFakCK1IAUqQEpUgNSpAakSA1IkRqQIjUgRWpAitSAFKkBKVIDUqQGpEgNSJEakCI1IEVqQIrUgBSpASlSA1KkBqRIDUiRGpAiNSBFakCK1IAUqQEpUgNSpAakSA1IkRqQIjUgRWpAitSAFKkBIbMfroVPR1s3+VwAAAAASUVORK5CYII=";
        console.log("ImageContextState constructor")
        context.setIndex(0);
        var list=context.getList();
        var listCard=[];
        for(var i=0;i<list.length;i++){
            var word=list[i];
            console.log("word",word);
            listCard.push({
                listObj:word,
                isVisible:i==0?true:false,
                templateName:"components/ImageContextView.html",
                context:word.form.value,
                isResult:null,
                definition:word.def,
                srcImage:word.photoFile?word.photoFile.dataStr:null,
                contextBuffer:"",
                checkImageContext:function(){
                    var word1=this.contextBuffer;
                    var word2=this.context;
                    this.isResult=word1==word2?true:false;
                    context.equals(this.isResult);
                }
            });
        }
        context.setListCard(listCard);
        console.log("listCard",listCard)
        context.getNext().show("пропустить");
        context.getPrev().hide();
        context.getService().hide();
    }
    clickNext(){
        this.clickNextDefault();
    }
    clickService(){
        this.clickServiceDefault(function(context){
            return new EndState(context);
        },function(context){
            return new ImageContextState(context);
        });
    }
}