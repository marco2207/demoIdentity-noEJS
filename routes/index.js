'use strict';

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.sendFile('index.html', { root: "public"});
    });

    app.get('/about', function(req, res) {
        res.sendFile('about.html', { root: "public"});
    });
};