const WeDeploy = require('wedeploy');
const WEDEPLOY_DB_URL = 'https://xmlvalidatortest-brusvalidator.wedeploy.io';

function save(xmlRequest) {
    WeDeploy.data(WEDEPLOY_DB_URL)
        .create('request', xmlRequest)
        .then(function(req) {
            console.log('Saved - ', req.name, ' - ', req.id);
        });
}

function saveFromRequest(name, error, response) {
    const xmlRequest = {
        name: name,
        createdAt: new Date().toISOString()
    };

    if (error) {
        xmlRequest.success = false;
        console.log('ERROR Save From ', error);
    } else {
        const time = response.timingPhases;
        xmlRequest.success = true;
        xmlRequest.wait = time.wait;
        xmlRequest.dns = time.dns;
        xmlRequest.tcp = time.tcp;
        xmlRequest.firstByte = time.firstByte;
        xmlRequest.download = time.download;
        xmlRequest.total = time.total;
    }
    save(xmlRequest);
}

module.exports = {
    save: save,
    saveFromRequest: saveFromRequest
};
