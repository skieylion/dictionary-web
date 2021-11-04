app.controller('CardCtrl', function($scope,$timeout,cardCtrlFactory,cardMakerCtrlFactory,setSelectCtrlFactory,setCtrlFactory) {

    $scope.setCtrlFactory=setCtrlFactory;
    $scope.setSelectCtrlFactory=setSelectCtrlFactory;
    $scope.cardMakerCtrlFactory=cardMakerCtrlFactory;
    $scope.cardCtrlFactory=cardCtrlFactory;
    $scope.checkedHeader=false;

    $scope.listWord=[ ];
    var oldFlag=false;

    $scope.cardCtrlFactory.findBySets=function(f){
        var flag=$scope.setCtrlFactory.isUnionAll;
        var selected=$scope.setSelectCtrlFactory.getSelectedIdList();
        Rest.findBySets(flag,selected,function(response){
            console.log("get words",response);
            $scope.listWord=response.data;
            $scope.$apply();
            if(f) f();

        });
    }

    $scope.getAllBySets=function(){
        $scope.cardCtrlFactory.findBySets();
    }


    //$scope.getAllBySets();

    $scope.addContext=function(){
        $scope.confirm.open();
    }

    $scope.removeContext=function(){
        var rec=function(index){
            if(index<$scope.listWord.length) {
                if($scope.listWord[index].checkedRow) {
                    axios.delete("/meaning/"+$scope.listWord[index].id).then((response) => {
                        rec(++index);
                    });
                } else {
                    rec(++index);
                }
            } else {
                $scope.getAllBySets();
            }
        };
        rec(0);
    }

    $scope.changeCheckboxHeader=function(){
        for(var i=0;i<$scope.listWord.length;i++){
            $scope.listWord[i].checkedRow=$scope.checkedHeader;
        }
    }



    $scope.clickOk=function(){
        console.log("clickOk")
        $scope.cardMakerCtrlFactory.save(function(){
            $scope.getAllBySets();
        });
    }
});

