app.controller("myNoteCtrl", function ($scope, $http, $window) {
    $scope.data = {};
    $scope.words = "";
    $scope.editing = true;
    $scope.tempTitle1 = "";
    $scope.fileData = "";
    $scope.openlist = [];
    $scope.tempKey = 0;
    $scope.dataArray = [{title: "New Document 1", data: " ", tileClass: "normal",
            editing: false, isSave: 0, old_title: "", saveas: false}];

    $scope.clear = function (index) {
        $scope.dataArray[index].data = "";
    };

    $scope.new = function (key) {
        var i = parseInt($scope.dataArray.length);
        i = i + 1;
        $scope.tempdata = {title: "New Document " + i, data: "", tileClass: "normal",
            editing: false, isSave: 0, old_title: "", saveas: false};
        $scope.dataArray.push($scope.tempdata);
        var k = parseInt($scope.dataArray.length);
        k = k - 1;
        var key1 = "#uk_" + k;
        setTimeout(function () {
            $('.nav1_tab_col a[href="' + key1 + '"]').trigger('click');
            $("#khan_" + k).focus();
        }, 1)
        setTimeout(function () {
            document.getElementById("khan_" + k).focus();
        }, 500)
    };
    $scope.save = function (index) {
        var jsonData = $scope.dataArray[index];
        $scope.dataArray[index].tileClass = "normal";
        $http({
            method: 'POST',
            url: "/save",
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(jsonData),
            dataType: 'json',
        }).
                success(function (data, status, headers, config) {

                    if (parseInt(data.code) == 401) {
                        alert(data.msg);
                    } else {
                        $scope.dataArray[index].isSave = 1;
                        $scope.dataArray[index].old_title = $scope.dataArray[index].title;
                        alert(data.msg);
                    }
                }).
                error(function (data, status, headers, config) {
                    alert("failed!");
                });
    };

    $scope.removeFile = function (fileName, key) {
        alert(key);
        var jsonData = {fileName: fileName};
        $http({
            method: 'POST',
            url: "/removefile",
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(jsonData),
            dataType: 'json',
        }).
                success(function (data, status, headers, config) {
                    $scope.openlist.splice(key, 1);
                    alert(data.msg);
                }).
                error(function (data, status, headers, config) {
                    alert(data.msg);
                });

    };


    $scope.close = function (index) {
        var r = confirm("Are you sure you want to close this note ?");
        if (r == true) {
            $scope.dataArray.splice(index, 1);
            var k = parseInt(index);
            k = k - 1;
            var key2 = "#uk_" + k;
            setTimeout(function () {
                $('.nav1_tab_col a[href="' + key2 + '"]').trigger('click');
            }, 1);
            setTimeout(function () {
                document.getElementById("khan_" + k).focus();
            }, 500)

        }
    };

    $scope.change = function (index) {
        $scope.dataArray[index].tileClass = "bold";
        $scope.tempKey = index;
//        alert("dd"+$scope.tempKey);
        var t = $scope.dataArray[index].data;
        console.log(t.substr(0, t.selectionStart).split("\n").length);

    };

    $scope.countLetter = function (key) {
        alert("Total Letter Including space: " + $scope.dataArray[key].data.length);
    }

    $scope.init = function () {

    };
    $scope.countWords = function (key, type) {
        var val = $scope.dataArray[key].data;
        var sep = [' ', "\n\r", '  ', ',', ':', '\n'];
        var temp = sep[0];
        for (i = 0; i < sep.length; i++) {
            val = val.split(sep[i]).join(temp);

        }
        chunk_str = val.split(temp);
        c = 0;
        for (j = 0; j < chunk_str.length; j++) {
            if (chunk_str[j].charCodeAt(0) != 32 && chunk_str[j] != "" && chunk_str[j].charCodeAt(0) != 10) {
                c++;
            }
        }
        $scope.totalWorldCount = c;
        if (type == 1) {
            alert($scope.totalWorldCount);
        }
    }


    $scope.countLine = function (key) {
        try {
            alert("Total Lines:" + ($scope.dataArray[key].data.match(/[^\n]*\n[^\n]*/gi).length));
        } catch (e) {
            alert(1);
        }
    }
    $scope.getLineNumber = function (key) {
        var t = $scope.dataArray[key].data;
        alert("Line No : " + t.substr(0, t.selectionStart).split("\n").length);
    }
    $scope.changeTitle = function (key) {
        $scope.editing = false;
        try {
            $scope.totalline = $scope.dataArray[key].data.match(/[^\n]*\n[^\n]*/gi).length + 1;
        } catch (e) {
            $scope.totalline = 1;
        }
        $scope.countWords(key, 2);
        $scope.totalLetterCount = $scope.dataArray[key].data.length;
    }

    $scope.lineCountOnKeyUp = function (key) {
        try {
            $scope.totalline = $scope.dataArray[key].data.match(/[^\n]*\n[^\n]*/gi).length + 1;
        } catch (e) {
            $scope.totalline = 1;
        }
        $scope.countWords(key, 2);
        $scope.totalLetterCount = $scope.dataArray[key].data.length;
    }


    $scope.saveTitle = function (key) {
        $scope.dataArray[key].editing = false;

    }

    $scope.closeAll = function (key) {
        $scope.dataArray = [{title: "New Document 1", data: "", tileClass: "normal", editing: false}];
        setTimeout(function () {
            $('.nav1_tab_col a[href="#uk_0"]').trigger('click');
        }, 1)
        setTimeout(function () {
            document.getElementById("khan_0").focus();
        }, 500)
    }

    $scope.openFile = function (key) {
        var jsonData = {user: "uk"};
        $http({
            method: 'POST',
            url: "/open",
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(jsonData),
            dataType: 'json',
        }).
                success(function (data, status, headers, config) {
                    $scope.openlist = data;
                    $scope.recent = data;
                    $scope.recent = data;
                }).
                error(function (data, status, headers, config) {
                    alert("failed!");
                });

    };


    $scope.getFile = function (name, key) {
        var jsonData = {fileName: name};
        $http({
            method: 'POST',
            url: "/getfile",
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(jsonData),
            dataType: 'json',
        }).
                success(function (data, status, headers, config) {
                    $scope.fileData = {
                        title: name,
                        data: data.data,
                        tileClass: "normal",
                        editing: false,
                        isSave: 1
                    };
                    $scope.fileData.title = $scope.fileData.title.replace('.txt', "");

                    $scope.dataArray.push($scope.fileData);

                    $(function () {
                        $('#fsModal').modal('toggle');
                    });
                    var len = $scope.dataArray.length;
                    len = parseInt(len);
                    len = len - 1;
                    len1 = "#uk_" + len;
                    setTimeout(function () {
                        $('.nav1_tab_col a[href="' + len1 + '"]').trigger('click');
                    }, 1);

                    setTimeout(function () {
                        document.getElementById("khan_" + len).focus();
                    }, 500)


                }).
                error(function (data, status, headers, config) {
                    alert("failed!");
                });

    };
    $scope.getIndex = function (index) {
        $scope.tempKey = index;
        setTimeout(function () {
            document.getElementById("khan_" + index).focus();
        }, 500)
    }

    $scope.saveAs = function (index) {
        $scope.dataArray[index].editing = true;
        $scope.dataArray[index].saveas = true;
    }


    $scope.saveAsFile = function (key) {
        if ($scope.dataArray[key].isSave == 0) {
            alert("Please save first");
        } else {
            var jsonData = $scope.dataArray[key];
            $scope.dataArray[key].tileClass = "normal";
            $http({
                method: 'POST',
                url: "/saveas",
                headers: {'Content-Type': 'application/json'},
                data: JSON.stringify(jsonData),
                dataType: 'json',
            }).
                    success(function (data, status, headers, config) {

                        if (parseInt(data.code) == 401) {
                            alert(data.msg);
                        } else {
                            $scope.dataArray[key].saveas = false;
                            alert(data.msg);
                        }
                    }).
                    error(function (data, status, headers, config) {
                        alert("failed!");
                    });
        }
    }

    $scope.closeTab = function () {

    }

    $(document).ready(function () {
        setInterval(function () {
            var targArea = document.getElementById("khan_" + $scope.tempKey);
            targArea.addEventListener('keydown', reportKeyEvent);
        }, 100);


        function reportKeyEvent(zEvent) {
            if (zEvent.ctrlKey && (zEvent.code === "KeyS" || zEvent.code === "Keys")) {
                $scope.save($scope.tempKey);
                zEvent.stopPropagation();
                zEvent.preventDefault();
            }

        }
        $(document).on("mousemove", function (event) {
            $("#log").text("X: " + event.pageX + ", Y: " + event.pageY);
        });

    });


});