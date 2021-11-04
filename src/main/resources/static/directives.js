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
            scope.confirm.cancel=attrs.cancel?attrs.cancel:"Отмена";
            scope.confirm.ok=attrs.ok?attrs.ok:"Сохранить";

            scope.confirm.open=function(){
                Metro.dialog.open(document.getElementById(attrs.identifier));
            };
            scope.confirm.clickOk=function(){
                if(scope.clickOk) scope.clickOk();
            }

            console.log("attrs",attrs);

        }
    }
});