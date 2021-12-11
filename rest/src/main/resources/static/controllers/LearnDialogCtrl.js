app.controller('LearnDialogCtrl', function($scope,$timeout,setCtrlFactory,setSelectCtrlFactory,learnDialogFactory) {

    $scope.setCtrlFactory=setCtrlFactory;
    $scope.setSelectCtrlFactory=setSelectCtrlFactory;
    $scope.learnDialogFactory=learnDialogFactory;

    $scope.listCard=[];
    $scope.context=null;

    var findBySet=function(f){
        console.log("123")
        var selected=$scope.setSelectCtrlFactory.getSelectedIdList();
        Rest.findForStudying(selected[0],function(response){
            console.log("get cards",response);
            exec(f,response.data);
        });
    }

    $scope.setCtrlFactory.subscribeToLearnDialog(function(){
        console.log("listen")
        findBySet(function(list){
            var filter=new ContextFilter(list);
            var filterList=filter.getFilteredList();
            var context=new Context($scope,filterList);
            context.setState(new ReadingState(context))
            $scope.context=context;
            $scope.$apply();
            $scope.confirm.open();
        });
    });

    $scope.clickNext=function(){
        $scope.context.getState().clickNext();
    }
    $scope.clickPrev=function(){
        $scope.context.getState().clickPrev();
    }
    $scope.clickOk=function(){
        $scope.context.getState().clickClose();
    }
    $scope.clickService=function(){
         $scope.context.getState().clickService();
    }
});

