class State {
    constructor(context){
        console.log("State constructor")
        this.context=context;
    }
    clickNextDefault(){
        console.log("State click next")
        var context=this.context;
        var size=context.getList().length;
        var index=context.getIndex();
        if(index<size){
            context.getNext().show("пропустить");
            context.setIndex(index+1);
            context.setDisplayByIndex(index,false);
            if(index+1<size){
                context.setDisplayByIndex(index+1,true);
            }

            if(index+1==size-1) {
                context.getNext().hide();
                context.getService().show("пропустить");
            }
        }
    }
    clickClose(){
        this.context.setDisplayByIndex(this.context.getIndex(),false);
    }
    clickServiceDefault(f,self){
        console.log("State click service")
        var listCard=this.context.getListCard();
        var list=this.context.getList();
        var count=0;
        for(var i=0;i<listCard.length;i++){
            if(listCard[i].isResult==true) {
                listCard[i].listObj.isResult=true;
                list.splice(i-count,1);
                count++;
            }
        }
        if(list.length==0){
            var l=this.context.getStartList();
            this.context.setList(l);
            this.context.setState(f(this.context));
        } else {
            this.context.setList(list);
            var s=new ReadingState(this.context);
            s.preState=self;
            this.context.setState(s);
        }
    }
}