const fs = require("fs");
const path = require("path");

const logDirectory = path.join(__dirname, "data");
const logFile = path.join(logDirectory, "process-log.csv");

if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

if (!fs.existsSync(logFile)) {
    fs.writeFileSync(
        logFile,
        "timestamp,temperature,pressure,flowRate,level,controlOutput,status\n"
    );
}

function logProcessData(data) {
    const row = [
        data.timestamp,
        data.temperature,
        data.pressure,
        data.flowRate,
        data.level,
        data.controlOutput,
        data.status
    ].join(",") + "\n";

    fs.appendFileSync(logFile, row);
}

module.exports = {
    logProcessData
};