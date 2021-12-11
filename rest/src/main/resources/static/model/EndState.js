class EndState extends State {
    constructor(context){
        super(context);
        context.setListCard([{
            isVisible:true,
            templateName:"components/EndView.html"
        }]);
        context.getNext().hide();
        context.getPrev().hide();
        context.getService().hide();
        this.context=context;
    }
    clickClose(){
        this.context.setListCard([]);
        var list=this.context.getStartList();
        var f=function(){
            if(list.length>0){
                var e=list.pop();
                Rest.saveRepeater(e.id,f);
            }
        }
        f();
        //сохранить повторения
    }
}