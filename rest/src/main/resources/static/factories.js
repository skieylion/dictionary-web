app.factory('cardMakerCtrlFactory',function(){
    return {
        save:function(f){},
        open:function(){},
        edit:function(obj,f){}
    }
});

app.factory('setSelectCtrlFactory',function(){
    var list=[];
    return {
        getSubscriberList:function(){
            return list
        },
        getSets:function(f){},
        removeSets:function(ids,f){},
        getSelectedSets:function(){},
        getSelectedIdList:function(){},
        listenToChanges:function(f){
            list.push(f);
        }
    }
});

app.factory('cardCtrlFactory',function(){
    return {
        findBySets:function(f){}
    }
});

app.factory('setCtrlFactory',function(){
    var list=[];
    var listLearn=[];
    return {
        isUnionAll:false,
        produceOpenDialog:function(arg){
            for(var i=0;i<list.length;i++) { exec(list[i],arg); }
        },
        subscribeToOpenDialog:function(func){
            list.push(func);
        },
        produceLearnDialog:function(){
            for(var i=0;i<listLearn.length;i++) { exec(listLearn[i]); }
        },
        subscribeToLearnDialog:function(func){
            listLearn.push(func);
        }
    }
});

app.factory('setsMakerDialogFactory',function(){
    var list=[];
    return {
        produceSaveSets:function(){
            for(var i=0;i<list.length;i++) { exec(list[i]); }
        },
        subscribeToSaveSets:function(func){
            list.push(func);
        }
    }
});

app.factory('learnDialogFactory',function(){
    return {
        findBySets:function(f){}
    }
});

app.factory('setWindowFactory',function(){
    return {
        open:function(close){}
    }
});