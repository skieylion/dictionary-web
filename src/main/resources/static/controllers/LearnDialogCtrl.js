app.controller('LearnDialogCtrl', function($scope,setCtrlFactory) {

    $scope.setCtrlFactory=setCtrlFactory;
    $scope.setCtrlFactory.subscribeToLearnDialog(function(){
        $scope.confirm.open();
    });

});

