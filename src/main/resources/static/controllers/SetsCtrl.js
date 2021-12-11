app.controller('SetsCtrl',function($scope,$timeout,setSelectCtrlFactory,cardCtrlFactory,setCtrlFactory,setsMakerDialogFactory){
    $scope.isDisabledDelete=true;
    $scope.isDisabledEdit=true;
    $scope.isDisabledUnit=true;
    $scope.isLearn=true;
    $scope.id="setsList";
    $scope._id="#"+$scope.id;
    $scope.listSets=[ ];
    $scope.switcher=false;//false - пересечение
    $scope.switcherCaption="∩"; //
    $scope.setSelectCtrlFactory=setSelectCtrlFactory;
    $scope.cardCtrlFactory=cardCtrlFactory;
    $scope.setCtrlFactory=setCtrlFactory;
    $scope.setsMakerDialogFactory=setsMakerDialogFactory;

    $scope.changeSwitcher=function(){
        $scope.setCtrlFactory.isUnionAll=$scope.switcher;
        if($scope.switcher) $scope.switcherCaption="∪";
        else $scope.switcherCaption="∩";
    }
    $scope.learnDialog=function(){
        console.log("produce")
        $scope.setCtrlFactory.produceLearnDialog();
    }

    let getSelected=function(){
        return $scope.setSelectCtrlFactory.getSelectedIdList();
    }
    let getSelectedSetList=function(){
        return $scope.setSelectCtrlFactory.getSelectedSetList();
    }

    $scope.findSets=function(){
        console.log("find");
        $scope.cardCtrlFactory.findBySets();
    };

    $scope.addDialogSets=function(){
        $scope.setCtrlFactory.produceOpenDialog({
            mode:"add"
        });
    };
    $scope.editDialogSets=function(){
        var currentSet=getSelectedSetList()[0];
        $scope.setCtrlFactory.produceOpenDialog({
            mode:"edit",
            currentSet:currentSet
        });
    };

    $scope.removeDialogSets=function(){
        var list=getSelected();
        $scope.setSelectCtrlFactory.removeSets(list);
    }

    $scope.getAll=function(){
        $scope.setSelectCtrlFactory.getSets();
    }

    $scope.setsMakerDialogFactory.subscribeToSaveSets(function(){
        $scope.getAll();
    });

    $scope.setSelectCtrlFactory.listenToChanges(function(){
        console.log("listen change");
        console.log("getSelected()",getSelected());
        var size = Object.keys(getSelected()).length;
        console.log("size",size);
        if(size>0) {
            $scope.isDisabledDelete=false;
            $scope.isLearn=false;
        } else $scope.isDisabledDelete=true;

        if(size==1) $scope.isDisabledEdit=false;
        else $scope.isDisabledEdit=true;
        if(size>1) $scope.isDisabledUnit=false;
        else $scope.isDisabledUnit=true;

        $scope.$apply();
    });
});
