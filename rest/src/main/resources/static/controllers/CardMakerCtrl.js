app.controller('CardMakerCtrl', function($scope,$timeout,cardMakerCtrlFactory,setSelectCtrlFactory) {

    $scope.setSelectCtrlFactory=setSelectCtrlFactory;
    $scope.value="";
    $scope.isModeSingle=true;
    $scope.forms=[ ];
    $scope.transcription="";

    var getPlugin=function(){
        return Metro.getPlugin(document.getElementById("formTypes"), 'select');
    }

    Rest.getTypes(function(response){
        console.log("types:",response.data)
        var plugin=getPlugin();
        console.log(plugin)
        $scope.forms=response.data;
        var list={};
        for(var i=0;i<$scope.forms.length;i++){
            var buff=$scope.forms[i];
            console.log(buff)
            list[buff.id]=buff.name;
        }
        plugin.data(list);

        $scope.$apply();
    });




    $scope.addNewValue=function(){
         $scope.contextDtoList.push({
             exampleDtoList:[{
                 text:""
             }]
         });
    };
    $scope.addNewExample=function(vIndex){
        $scope.contextDtoList[vIndex].exampleDtoList.push({
            text:""
        });
    };
    $scope.removeValue=function(vIndex){
        $scope.contextDtoList.splice(vIndex,1);
    };
    $scope.removeExample=function(eIndex,vIndex){
        $scope.contextDtoList[vIndex].exampleDtoList.splice(eIndex,1);
    };

    $scope.cardMakerCtrlFactory=cardMakerCtrlFactory;
    $scope.cardMakerCtrlFactory.save=function(f){
        var t=getPlugin().val();
        console.log("save",[
            $scope.value,
            t,
            $scope.transcription,
            $scope.contextDtoList
        ])
        axios.post("/form",{
            value:$scope.value,
            typeId:t,
            id:$scope.id?$scope.id:null,
            audioFile:$scope.audioFile,
            transcription:$scope.transcription,
            meta:"{}",
            sets:$scope.setSelectCtrlFactory.getSelectedSetList(),
            contextDtoList:$scope.contextDtoList
        }).then((response) => {
            console.log(response);
            if(f) f();
        });
    }
    $scope.cardMakerCtrlFactory.open=function(f){
        $scope.value="";
        $scope.id=null;
        $scope.audioFile=null;
        $scope.transcription="";
        $scope.contextDtoList=[{
             photo:undefined,
             exampleDtoList:[{

                 text:""
             }]
        }];
        $scope.counter=0;
        $scope.formType="1";
        $scope.isModeSingle=true;
        $timeout(function(){
            $scope.$apply();
            exec(f);
        },150);
    }
    $scope.cardMakerCtrlFactory.edit=function(obj,f){
        console.log("123123")
        $scope.value=obj.value;
        $scope.audioFile=obj.audioFile;
        $scope.transcription=obj.transcription;
        $scope.contextDtoList=obj.contextDtoList;
        $scope.id=obj.id;
        $scope.counter=0;
        $scope.formType=obj.formType;
        $scope.isModeSingle=true;
        $timeout(function(){
            $scope.$apply();
            exec(f);
        },150);
    }
});

