const WeDeploy = require('wedeploy');
const WEDEPLOY_DB_URL = 'https://xmlvalidatortest-brusvalidator.wedeploy.io';
const process = require('process');
const EVENT_START = 10;
const EVENT_END = 11;
const EVENT_FAIL = 12;

function save(mainProcess) {
    WeDeploy.data(WEDEPLOY_DB_URL).create('mainProcess', mainProcess);
}

function start() {
    const mainProcess = {
        pid: process.pid,
        date: new Date().toISOString(),
        event: EVENT_START
    };

    save(mainProcess);
}

function end() {
    const mainProcess = {
        pid: process.pid,
        date: new Date().toISOString(),
        event: EVENT_END,
        uptime: Math.floor(process.uptime())
    };
    save(mainProcess);
}

function fail(error) {
    const mainProcess = {
        pid: process.pid,
        date: new Date().toISOString(),
        event: EVENT_END,
        uptime: Math.floor(process.uptime()),
        error: error
    };
    save(mainProcess);
}

module.exports = {
    start: start,
    end: end,
    fail: fail
};
