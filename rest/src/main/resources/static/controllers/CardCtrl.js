app.controller('CardCtrl', function($scope,$timeout,cardCtrlFactory,cardMakerCtrlFactory,setSelectCtrlFactory,setCtrlFactory,setWindowFactory) {

    $scope.setWindowFactory=setWindowFactory;
    $scope.setCtrlFactory=setCtrlFactory;
    $scope.setSelectCtrlFactory=setSelectCtrlFactory;
    $scope.cardMakerCtrlFactory=cardMakerCtrlFactory;
    $scope.cardCtrlFactory=cardCtrlFactory;
    $scope.checkedHeader=false;

    $scope.listWord=[ ];
    var oldFlag=false;

    angular.element(document).ready(function () {
        $scope.table=$('#cardTable').DataTable({
            "processing": true,
            "serverSide": true,
            "ordering": false,
            "scrollY":  "700px",
            "ajax": {
                "url":"/context/table",
                "data": function (data) {
                    data.isUnionAll = $scope.setCtrlFactory.isUnionAll;
                    data.ids=$scope.setSelectCtrlFactory.getSelectedIdList();
                }
            },
            "drawCallback" : function() {
                var ids=[ ];
                $("#cardTable tr").each(function(){
                    var id=$(this).attr("id");
                    $(this).find("td:eq(0) input[type='checkbox']").on( 'click', function (e) {
                        var val=$(this).prop("checked")
                        for(var i=0;i<$scope.listWord.length;i++){
                            if($scope.listWord[i].id==id){
                                $scope.listWord[i].checkedRow=val;
                            }
                        }
                    });

                    if(id){
                        ids.push(id);
                    }
                });
                $scope.listWord=[];
                Rest.getContextByListId(ids,function(data){
                    $scope.listWord=data;
                    console.log($scope.listWord);
                });
            },
            "columns": [
                { "data": "checkbox" },
                { "data": "word" },
                { "data": "typeOf" },
                { "data": "status" },
                { "data": "def" },
                { "data": "examples" }
            ]
        });
        $("#divTable  th:eq(0) input[type='checkbox']").on( 'click', function (e) {

            var val=$(this).prop('checked');
            $("#cardTable tr").each(function(){
                $(this).find("td:eq(0) input[type='checkbox']").prop("checked",val);
            });
            if($scope.listWord){
                for(var i=0;i<$scope.listWord.length;i++){
                    $scope.listWord[i].checkedRow=val;
                }
            }
        } );
    });

    $scope.cardCtrlFactory.findBySets=function(f){
        $scope.table.ajax.reload(null,false);
        exec(f);
    }

    $scope.getAllBySets=function(){
        $scope.cardCtrlFactory.findBySets();
    }

    $scope.addContext=function(){
        $scope.cardMakerCtrlFactory.open(function(){
            $scope.confirm.open();
        });
    }

    var getCheckedList=function(){
        var arr=[];
        for(var i=0;i<$scope.listWord.length;i++){
            var word=$scope.listWord[i];
            if(word.checkedRow) {
                arr.push(word);
            }
        }
        return arr;
    }


    $scope.attachToSet=function(){
        console.log("attach")
        $scope.setWindowFactory.open(function(setList) {
            console.log("setList",setList);
            var contextList=getCheckedList();

            var recursive=function(contextIndexId,setIndexId,f){
                var contextId=contextList[contextIndexId].id;
                var setId=setList[setIndexId];
                Rest.attachToSet(contextId,setId,function(){
                    if(contextIndexId+1<contextList.length) {
                        recursive(contextIndexId+1,setIndexId,f);
                    } else if (setIndexId+1<setList.length) {
                        recursive(0,setIndexId+1,f);
                    } else {
                        exec(f);
                    }

                });
            }

            if(setList&&setList.length>0&&contextList&&contextList.length>0) {
                recursive(0,0,$scope.getAllBySets)
            }
        });

    }

    $scope.detach=function(){
        var wordList=$scope.setSelectCtrlFactory.getSelectedSetList();
        var list=getCheckedList();

        for(var i=0;i<wordList.length;i++){
            var setId=wordList[i].id;
            for(var j=0;j<list.length;j++){
                var contextId=list[j].id;
                Rest.detachFromSet(contextId,setId);
            }
        }
        $timeout($scope.getAllBySets,5000);
    }

    $scope.knowContext=function(){
        var list=getCheckedList();
        for(var i=0;i<list.length;i++){
            Rest.studiedContext(list[i].id,function(){
                console.log("know context")
            });
        }
        $timeout($scope.getAllBySets,5000);
    }

    $scope.unknownContext=function(){
        var list=getCheckedList();
        for(var i=0;i<list.length;i++){
            Rest.unknownContext(list[i].id,function(){
                console.log("know context")
            });
        }
        $timeout($scope.getAllBySets,5000);
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
//        var rec=function(index){
//            if(index<$scope.listWord.length) {
//                if($scope.listWord[index].checkedRow) {
//                    axios.delete("/context/"+$scope.listWord[index].id).then((response) => {
//                        rec(++index);
//                    });
//                } else {
//                    rec(++index);
//                }
//            } else {
//                $scope.getAllBySets();
//            }
//        };
//        rec(0);
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

