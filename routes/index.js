'use strict';

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.sendFile('index.html', { root: "public"});
    });

    app.get('/about', function(req, res) {
        res.sendFile('about.html', { root: "public"});
    });
    
    app.get('/style.css', function(req, res) {
        res.sendFile('style.css', { root: "public"});
    });

    app.get('/_callback', function(req, res) {
        res.sendFile('_callback.html', { root: "public"});
    });
};
