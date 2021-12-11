app.directive("confirm",function(setCtrlFactory){
    return {
        restrict:'E',
        transclude:true,
        scope:false,
        templateUrl:'components/ConfirmDialog.html',
        link:function(scope, element, attrs){
            scope.confirm={};
            scope.confirm.identifier=attrs.identifier;
            scope.confirm.caption=attrs.caption?attrs.caption:"Заголовок модального окна";

            var setVisible=function(name,flag){
                scope.confirm[name]=flag?"":"d-none";
            }
            var setName=function(name,value){
                scope.confirm[name]=value;
            }
            scope.confirm.setVisible=function(name,flag){
                setVisible(name,flag);
            }
            scope.confirm.setName=function(name,value){
                setName(name,value);
            }

            scope.confirm.cancel=attrs.cancel;
            attrs.cancel?setVisible("cancelVisible",true):setVisible("cancelVisible",false);
            scope.confirm.ok=attrs.ok;
            attrs.ok?setVisible("okVisible",true):setVisible("okVisible",false);
            scope.confirm.prev=attrs.prev;
            attrs.prev?setVisible("prevVisible",true):setVisible("prevVisible",false);
            scope.confirm.next=attrs.next;
            attrs.next?setVisible("nextVisible",true):setVisible("nextVisible",false);
            scope.confirm.service=attrs.service;
            attrs.service?setVisible("serviceVisible",true):setVisible("serviceVisible",false);

            scope.confirm.open=function(){
                Metro.dialog.open(document.getElementById(attrs.identifier));
            };
            scope.confirm.clickOk=function(){
                exec(scope.clickOk);
            }
            scope.confirm.clickPrev=function(){
                exec(scope.clickPrev);
            }
            scope.confirm.clickNext=function(){
                exec(scope.clickNext);
            }
            scope.confirm.clickService=function(){
                exec(scope.clickService);
            }

            console.log("attrs",attrs);

        }
    }
});