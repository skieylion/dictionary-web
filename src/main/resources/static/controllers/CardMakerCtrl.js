app.controller('CardMakerCtrl', function($scope,cardMakerCtrlFactory,setSelectCtrlFactory) {

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

    $scope.meaningDtoList=[{
         photo:undefined,
         exampleDtoList:[{
             text:""
         }]
    }];
    $scope.counter=0;
    $scope.formType="1";
    $scope.processAudio=function(event){
        $scope.audio = event.target.files[0];
        console.log($scope.audio);
    };

    $scope.processPhotoValue=function(event,vIndex){
        $scope.meaningDtoList[vIndex].photo = event.target.files[0];
        console.log($scope.meaningDtoList[vIndex].photo);
    };
    $scope.processVideoExample=function(event,vIndex,eIndex){
        $scope.meaningDtoList[vIndex].exampleDtoList[eIndex].video = event.target.files[0];
        console.log($scope.meaningDtoList[vIndex].exampleDtoList[eIndex].video);
    };
    $scope.processAudioExample=function(event,vIndex,eIndex){
        $scope.meaningDtoList[vIndex].exampleDtoList[eIndex].audio = event.target.files[0];
        console.log($scope.meaningDtoList[vIndex].exampleDtoList[eIndex].audio);
    };
    $scope.addNewValue=function(){
         $scope.meaningDtoList.push({
             exampleDtoList:[{
                 text:""
             }]
         });
    };
    $scope.addNewExample=function(vIndex){
        $scope.meaningDtoList[vIndex].exampleDtoList.push({
            text:""
        });
    };
    $scope.removeValue=function(vIndex){
        $scope.meaningDtoList.splice(vIndex,1);
    };
    $scope.removeExample=function(eIndex,vIndex){
        $scope.meaningDtoList[vIndex].exampleDtoList.splice(eIndex,1);
    };

    $scope.cardMakerCtrlFactory=cardMakerCtrlFactory;
    $scope.cardMakerCtrlFactory.save=function(f){
        var t=getPlugin().val();
        console.log("save",[
            $scope.value,
            t,
            $scope.transcription,
            $scope.meaningDtoList
        ])
        axios.post("/form",{
            value:$scope.value,
            typeId:t,
            transcription:$scope.transcription,
            meta:"{}",
            sets:$scope.setSelectCtrlFactory.getSelectedSetList(),
            meaningDtoList:$scope.meaningDtoList
        }).then((response) => {
            console.log(response);
            if(f) f();
        });
    }
});

