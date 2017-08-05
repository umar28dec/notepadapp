var express = require('express');
var router = express.Router();
router.get('/', function (req, res) {
    req.session.uk = "xxxx";
    req.session.user = {
        name: "umar",
        user_id: 1,
        email: "umar@umar.com",
    };
    if (req.session.uk) {
        console.log("ok");
    } else {
        console.log("no");
    }
    res.sendFile(__dirname + "/public/" + "index1.html");
})


router.get('/temp', function (req, res) {
    req.session.uk = "xxxx";
    console.log(req.session.uk);
    res.end("uk hjsdf dshjfesfdsjfj sdfdsfj");
})


router.get('/uk', function (req, res) {
    req.session.uk = "xxxx";
    console.log(req.session.uk);
    res.end("uk hjsdf dshjfesfdsjfj sdfdsfj");
})


router.get('/save1', function (req, res) {
    fs.writeFile('input.txt', 'the quick brown fox jumps over the lazy dog', function (err) {
        if (err) {
            return console.error(err);
        } else {
            console.log("Data written successfully!");
        }
        fs.readFile('input.txt', function (err, data) {
            if (err) {
                return console.error(err);
            }
            console.log("Asynchronous read: " + data.toString());
        });
    });
    res.send('Hello World');

})

router.post('/save', function (req, res) {
    console.log(req.session.uk)
    var saveData = req.body;
    var fileName = "public/uk/" + saveData.title + ".txt";
    checkDirectorySync("public/uk/");
    if (checkExist(saveData, fileName) == 2) {
        var data = {
            status: "fail",
            code: 401,
            msg: "File Already Exist !"
        };
        var response = sendMsg(data);
        res.send(response);
    } else {

        fs.writeFile(fileName, saveData.data, function (err) {
            if (err) {
                return console.error(err);
                var data = {
                    status: "fail",
                    code: 404,
                    msg: "File not saved !"
                };
                var response = sendMsg(data);
                res.send(response);
            } else {
                res.setHeader('Content-Type', 'application/json');
                var data = {
                    status: "success",
                    code: 200,
                    msg: "File saved successfully"
                };
                var response = sendMsg(data);
                res.send(response);
                console.log("Data written successfully!");
            }
        });
    }



})
function checkDirectorySync(directory) {
    try {
        fs.statSync(directory);
    } catch (e) {
        fs.mkdirSync(directory);
    }
}

function sendMsg(data) {
    return JSON.stringify(data);
}

function checkExist(data, fileName) {
    var returnDta = "";
    var oldfileName = "public/uk/" + data.old_title + ".txt";
    if (data.isSave == 0) {
        if (fs.existsSync(fileName)) {
            console.log("file already exist");
            returnDta = 2;
        } else {
            returnDta = 1;
        }
    } else {
        if (data.old_title == data.title) {
            returnDta = 1;
        } else {
            fs.unlink(oldfileName, function (err) {
                if (err) {
                    return console.error(err);
                }
                console.log("File deleted successfully!");
            });
            if (fs.existsSync(fileName)) {
                console.log("file already exist");
                returnDta = 2;
            } else {
                returnDta = 1;
            }
        }

    }
    return returnDta;
}

router.post('/open', function (req, res) {
    var data = req.body;
    var folder = "./public/" + data.user + "/";
    fs.readdir(folder, function (err, files) {
        if (err) {
            return console.error(err);
        }
        var response = {};
        var myJsonString = JSON.stringify(files);
        res.end(myJsonString);
    });
});


router.post('/getfile', function (req, res) {
    var d = req.body;
    var fileName = "public/" + "uk" + "/" + d.fileName;
    fs.readFile(fileName, function (err, data) {
        if (err) {
            return console.error(err);
        }
        var k = data.toString();
        var data1 = {
            status: "success",
            code: 200,
            msg: "File saved successfully",
            data: k
        };
        res.end(sendMsg(data1));
    });
});

router.post('/removefile', function (req, res) {
    var d = req.body;
    var fileName = "public/" + "uk" + "/" + d.fileName;

    if (fs.existsSync(fileName)) {
        fs.unlink(fileName, function (err) {
            if (err) {
                return console.error(err);
            }
            var data1 = {
                status: "success",
                code: 403,
                msg: "File deleted successfully!",
            };
            res.end(sendMsg(data1));
        });

    } else {
        var data1 = {
            status: "success",
            code: 402,
            msg: "File does not exist!",
        };
        res.end(sendMsg(data1));
    }

});


router.post('/saveas', function (req, res) {
    var saveData = req.body;
    var fileName = "public/uk/" + saveData.title + ".txt";
    if (fs.existsSync(fileName)) {
        var data = {
            status: "fail",
            code: 401,
            msg: "File Already Exist !"
        };
        var response = sendMsg(data);
        res.send(response);
    } else {

        fs.writeFile(fileName, saveData.data, function (err) {
            if (err) {
                return console.error(err);
                var data = {
                    status: "fail",
                    code: 404,
                    msg: "File not saved !"
                };
                var response = sendMsg(data);
                res.send(response);
            } else {
                res.setHeader('Content-Type', 'application/json');
                var data = {
                    status: "success",
                    code: 200,
                    msg: "File saved successfully"
                };
                var response = sendMsg(data);
                res.send(response);
                console.log("Data written successfully!");
            }
        });
    }
})
module.exports = router;