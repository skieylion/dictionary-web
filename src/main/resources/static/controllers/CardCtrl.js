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
            for(var i=0;i<$scope.listWord.length;i++){
                var word=$scope.listWord[i];
                word.status="-";
                var rep=new Repeater(word.repeater);
                var info=rep.getInfo();
                switch(info.state){
                    case "new":
                        word.status="-";
                        break;
                    case "repeated":
                        word.status="через "+String(info.offset)+info.unit;
                        break;
                    case "repeat":
                        word.status="повторить!!!";
                        break;
                    case "studied":
                        word.status="выучено";
                        break;
                }
            }

            $scope.$apply();
            if(f) f();

        });
    }

    $scope.getAllBySets=function(){
        $scope.cardCtrlFactory.findBySets();
    }


    //$scope.getAllBySets();

    $scope.addContext=function(){
        $scope.cardMakerCtrlFactory.open(function(){
            $scope.confirm.open();
        });

    }
    $scope.editContext=function(){
        for(var i=0;i<$scope.listWord.length;i++){
            var word=$scope.listWord[i];
            if(word.checkedRow){
                var obj={
                    id:word.form.id,
                    value:word.form.value,
                    audioFile:word.form.audioFile,
                    transcription:word.form.transcription,
                    formType:word.form.type.id,
                    contextDtoList:[{
                         id:word.id,
                         photoFile:word.photoFile,
                         def:word.def,
                         translate:word.translate,
                         exampleDtoList:word.examples
                    }]
                };
                $scope.cardMakerCtrlFactory.edit(obj,function(){
                    $scope.confirm.open();
                });

                break;
            }
        }

    }

    $scope.removeContext=function(){
        var rec=function(index){
            if(index<$scope.listWord.length) {
                if($scope.listWord[index].checkedRow) {
                    axios.delete("/context/"+$scope.listWord[index].id).then((response) => {
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

