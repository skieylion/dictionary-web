app.controller('SetsMakerDialogCtrl', function($scope,setsMakerDialogFactory,setCtrlFactory) {

    $scope.setsMakerDialogFactory=setsMakerDialogFactory;
    $scope.setCtrlFactory=setCtrlFactory;

    $scope.clearDialog=function(){
        $scope.current={
            id:undefined,
            name:"",
            description:""
        };
    }

    $scope.openDialog=function(){
        //Metro.dialog.open('#setsDialog');
        $scope.confirm.open();
    };

    $scope.saveSets=function(){
        let input={
            name:$scope.current.name,
            description:$scope.current.description
        };
        if($scope.current.id){
            input.id=$scope.current.id;
        }
        Rest.saveSets(input,function(){
            $scope.setsMakerDialogFactory.produceSaveSets();
            $scope.current.name="";
            $scope.current.description="";
            $scope.current.id=undefined;
        });

    };
    $scope.editSets=function(){

    };

    $scope.clearDialog();

    $scope.setCtrlFactory.subscribeToOpenDialog(function(args){
        console.log("get edit",args);
        $scope.clearDialog();
        if(args.mode=="edit"){
            $scope.current=args.currentSet;
        }
        $scope.openDialog();
    });

    $scope.clickOk=function(){
        $scope.saveSets();
    }

});

