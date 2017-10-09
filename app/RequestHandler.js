const WeDeploy = require('wedeploy');
const WEDEPLOY_DB_URL = 'https://xmlvalidatortest-brusvalidator.wedeploy.io';

function save(xmlRequest) {
    WeDeploy.data(WEDEPLOY_DB_URL)
        .create('request', xmlRequest)
        .then(function(req) {
            console.log('Saved - ', req.name, ' - ', req.id);
        });
}

function getSize(body) {
    let size = Buffer.byteLength(body, 'utf8') / 1000;
    if (size > 1000) {
        size = size / 1000 + ' Mb';
    } else {
        size = size + ' Kb';
    }
    return size;
}

function processRequest(name, error, response, body) {
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
        xmlRequest.size = getSize(body);
    }
    save(xmlRequest);
}

module.exports = {
    processRequest: processRequest
};
