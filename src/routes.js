var Table = require('./model/table');

module.exports = function (app) {

    app.get('/tables', function (req, res) {
        Table.find({}, function (tables) {
            res.json(tables); 
        });
    });

    app.get('*', function (req, res) {
        res.sendfile('./public/views/index.html');
    });

};
