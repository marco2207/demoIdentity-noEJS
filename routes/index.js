'use strict';

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.sendFile('index.html', { root: "view"});
    });

    app.get('/about', function(req, res) {
        res.sendFile('about.html', { root: "view"});
    });

    app.get('/_callback', function(req, res) {
        res.sendFile('_callback.html', { root: "public"});
    });
};
