app.controller('SetsSelectCtrl',function($scope,setSelectCtrlFactory){
    $scope.uid=uuidv4();

    $scope.selected="";
    $scope.listSets=[ ];
    $scope.setSelectCtrlFactory=setSelectCtrlFactory;

    var getContext=function(){
        return document.getElementById($scope.uid)
    }

    var getComponent=function() {
        return Metro.getPlugin(getContext(), 'select');
    };

    angular.element(document).ready(function() {
       $(getContext()).on("change", function(e){
           console.log("change")
           var list=$scope.setSelectCtrlFactory.getSubscriberList();
           for(var i=0;i<list.length;i++) { exec(list[i]); }
       });
    });

    $scope.setSelectCtrlFactory.getSelectedIdList=function(){
        return getComponent().val();
    }
    $scope.setSelectCtrlFactory.getSelectedSetList=function(){
        var ids=getComponent().val();
        var currentSetList=[ ];
        for(var i=0;i<$scope.listSets.length;i++){
            for(var j=0;j<ids.length;j++){
                if($scope.listSets[i].id==ids[j]){
                    var buff=$scope.listSets[i];
                    var currentSet={
                        id:buff.id,
                        name: buff.name,
                        description:buff.description
                    };
                    currentSetList.push(currentSet);
                }
            }
        }
        return currentSetList;
    }


    $scope.setSelectCtrlFactory.getSets=function(f){
        console.log("get sets")
        Rest.getSets(function(response){
            $scope.listSets=[ ];
            let data=response.data;
            var list={};
            if(data&&data.length>0){
                for(var i=0;i<data.length;i++){
                    var buff=data[i];
                    $scope.listSets.push({
                        id:buff.id,
                        name:buff.name,
                        description:buff.description
                    });
                    list[buff.id]=buff.name;
                }
            }
            var comp=getComponent();
            var old=comp.val();
            comp.data(list);
            comp.val(old);
            exec(f);
        });
    };

    $scope.setSelectCtrlFactory.removeSets=function(ids,f){
        var list=ids;
        var recursive=function(index){
            if(index<list.length) {
                var id=list[index];
                Rest.deleteSetById(id,function(response){
                    recursive(++index);
                })
            } else {
                $scope.setSelectCtrlFactory.getSets(f);
            }
        }
        recursive(0);
    };

    $scope.setSelectCtrlFactory.getSets();

});

