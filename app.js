const async = require('async');
const request = require('request');
const RequestHandler = require('./app/RequestHandler');
const mainProcess = require('./app/MainProcess');

try {
    mainProcess.start();
    const urls = [
        {
            url: 'http://www.glamourparis.com/feed/selectionnist/askglamour.xml',
            time: true,
            timeout: 5000,
            name: 'askglamour'
        },
        {
            url: 'http://www.glamourparis.com/feed/selectionnist/recettes.xml',
            time: true,
            timeout: 5000,
            name: 'recettes'
        },
        {
            url: 'http://www.glamourparis.com/feed/selectionnist/foodforme.xml',
            time: true,
            timeout: 5000,
            name: 'foodforme'
        },
        {
            url: 'http://www.glamourparis.com/feed/selectionnist/topglamour.xml',
            time: true,
            timeout: 5000,
            name: 'topglamour'
        }
    ];

    function getXML(item, callback) {
        console.log('Processing xml ' + item.name);
        request(item, function(error, response, body) {
            RequestHandler.saveFromRequest(item.name, error, response);
            callback();
        });
    }

    async.each(urls, getXML, function(err) {
        if (err) {
            mainProcess.fail(err);
        } else {
            mainProcess.end();
        }
    });
} catch (e) {
    mainProcess.fail(e);
}
