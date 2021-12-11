app.controller('SetWindowCtrl', function($scope,$timeout,setWindowFactory) {

    $scope.setWindowFactory=setWindowFactory;

    var getComponent=function(){
        return Metro.getPlugin(document.getElementById("SetWindowSelect"), 'select');
    }

    $scope.setWindowFactory.open=function(close) {
        console.log("factory")
        Rest.getSets(function(response){
            console.log("factory2")
            let data=response.data;
            var list={};
            if(data&&data.length>0){
                for(var i=0;i<data.length;i++){
                    var buff=data[i];
                    list[buff.id]=buff.name;
                }
            }
            getComponent().data(list);
            $scope.confirm.open();
            $scope.clickOk=function(){
                var sets=getComponent().val();
                exec(close,sets);
            };

        });

    }


});

