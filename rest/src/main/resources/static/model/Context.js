class Context {
    constructor(scope,list){
        this.scope=scope;
        this.index=0;
        this.stageIndex=1;
        this.list=list;

        console.log("List",this.list);
        this.startList=this.list.slice();
        console.log("startList",this.startList)
    }
    getStartList(){
        return this.startList.slice();
    }
    getIndex(){
        return this.index;
    }
    setIndex(index){
        this.index=index;
    }
    getScope(){
        return this.scope;
    }
    getEndIndex(){
        return this.maxCountWord*this.stageIndex;
    }
    getStartIndex(){
        return this.getEndIndex()-this.maxCountWord;
    }
    getList(){
        return this.list;
    }
    setList(list){
        this.list=list;
    }
    setListCard(listCard){
        this.getScope().listCard=listCard;
    }
    getListCard(){
        return this.getScope().listCard;
    }
    setState(state){
        this.state=state;
    }
    getState(){
        return this.state;
    }
    getButton(name){
        var scope=this.getScope();
        var obj= {
            name:name,
            nameVisible:name+"Visible",
            setName:function(value){
                scope.confirm.setName(obj.name,value);
            },
            show:function(value){
                scope.confirm.setVisible(obj.nameVisible,true);
                if(value&&value!=""){
                    scope.confirm.setName(obj.name,value);
                }
            },
            hide:function(){
                scope.confirm.setVisible(obj.nameVisible,false);
            }
        }
        return obj;
    }
    getNext(){
        return this.getButton("next");
    }
    getPrev(){
        return this.getButton("prev");
    }
    getService(){
        return this.getButton("service");
    }
    setDisplayByIndex(index,value){
            this.getListCard()[index].isVisible=value;
    }
    equals(result){
        var size=this.getList().length;
        var index=this.getIndex();
        var button=this.getNext();
        button.hide();
        if(index==size-1){
             button=this.getService();
        }
        var isResult=result;
        console.log("Result",isResult)

        if(isResult) {
            button.show("продолжить");
        } else {
            button.show("пропустить");
        }
    }
}