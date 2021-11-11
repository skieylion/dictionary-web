class ContextFilter {
    constructor(list){
        this.list=list.slice();
        this.maxCountWord=Math.min(list.length,5);

    }

    getFilteredList(){
        //console.log("getFilteredList", this.list);
        var list=[];
        for(var i=0;i<this.list.length;i++){
            var context=this.list[i];
            var rep=new Repeater(context.repeater);
            //console.log("rep.getInfo()",rep.getInfo());
            switch(rep.getInfo().state){
                case "repeat":
                    list.unshift(context);
                    break;
                case "new":
                    list.push(context);
                    break;
            }
        }
        this.list=list.slice(0,this.maxCountWord);
        return this.list;
    }

}