class TranslateState extends State{
    constructor(context){
        super(context);
        console.log("TranslateState constructor")
        context.setIndex(0);
        var list=context.getList();
        var listCard=[];
        for(var i=0;i<list.length;i++){
           var word=list[i];
           listCard.push({
               isResult:null,
               listObj:list[i],
               isVisible:i==0?true:false,
               templateName:"components/TranslateView.html",
               translate:word.translate,
               translateBuffer:"",
               context:word.form.value,
               checkTwoWord:function(word1,word2){
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
            return new ImageContextState(context);
        },function(context){
            return new TranslateState(context);
        });
    }
}