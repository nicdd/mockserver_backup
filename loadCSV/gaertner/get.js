module.exports = {


    get: function (req, res) {

        console.log('function called get ');
        let fs = require('fs');
        const csvv = require('fast-csv');
        //console.log('Endpoint GET:' + req.path + ' Datenladen versuch:' + JSON.stringify(req.body));
        let loadFromFile = '../testods1.csv';
        let myJsonResponse = [];
        let stream = null;
        try {
            console.log('es wird das lasen der csv datei versucht')
            stream = fs.createReadStream(loadFromFile);

        } catch (err) {
            console.log('leider nicht geklappt' + JSON.stringify(err))

        }


        csvv
            .fromStream(stream)
            .on("data", function (data) {
                //console.log(data);
                myJsonResponse.push(data);
            })
            .on("end", function () {
                console.log("done");
                res.send(myJsonResponse)
            });
    }
};