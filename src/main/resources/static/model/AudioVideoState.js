class AudioVideoState extends State {
    constructor(context){
        super(context);
        context.setIndex(0);
        var list=context.getList();
        console.log(4,list);
        var listCard=[];
        for(var i=0;i<list.length;i++){
            var word=list[i];
            console.log("audio",word.form.audioFile?word.form.audioFile.dataStr:"")
            listCard.push({
                listObj:word,
                isVisible:i==0?true:false,
                templateName:"components/AudioVideoView.html",
                context:word.form.value,
                srcAudioFile:word.form.audioFile?word.form.audioFile.dataStr:"",
                srcAudioFileUID:word.form.audioFile?word.form.audioFile.uid:"",
                isResult:null,
                definition:word.def,
                srcImage:this.sourceImage,//
                contextBuffer:"",
                checkAudio:function(){
                    var word1=this.contextBuffer;
                    var word2=this.context;
                    this.isResult=word1==word2?true:false;
                    context.equals(this.isResult);
                }
            });
        }
        context.setListCard(listCard);
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
            return new AudioVideoState(context);
        });
    }

}