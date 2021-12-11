app.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                console.log("changeEvent",changeEvent);
                var reader = new FileReader();
                var file=changeEvent.target.files[0];
                if(file) {
                    var format=file.name.substring(file.name.lastIndexOf('.') + 1);

                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileread = {
                                name:file.name,
                                format:format,
                                dataStr:loadEvent.target.result
                            }
                        });
                    }

                    reader.readAsDataURL(file);
                }
            });
        }
    }
}]);