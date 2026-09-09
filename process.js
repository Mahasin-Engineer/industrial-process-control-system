const PIDController = require("./controller");
const { logProcessData } = require("./logger");
const PLC = require("./plc");

// Create software PLC
const plc = new PLC();

// Simulated industrial process
const processData = {
    temperature: 72.5,
    pressure: 4.2,
    flowRate: 125.0,
    level: 68.0,
    controlOutput: 50.0
};

// Temperature control target
const temperatureSetpoint = 75.0;

// PID controller
const temperatureController = new PIDController(
    2.0,
    0.5,
    0.1,
    temperatureSetpoint
);

// Simulate the physical process
function simulateProcess() {

    // Send process measurements to PLC
    plc.updateInputs(processData);

    // PID calculates required control output
    const controlOutput =
        temperatureController.update(processData.temperature);

    // Send PID output to PLC
    plc.setControlOutput(controlOutput);

    // Execute PLC logic
    plc.executeLogic();

    // Get actual PLC output
    processData.controlOutput =
        Number(plc.outputs.controlOutput.toFixed(2));

    // Process responds only when PLC is running
    if (plc.status.running) {

        const temperatureChange =
            (processData.controlOutput - 50) * 0.015;

        const naturalCooling = 0.08;

        processData.temperature +=
            temperatureChange - naturalCooling;

        processData.temperature = Math.max(
            20,
            Math.min(120, processData.temperature)
        );

        // Simulated process variables
        processData.pressure =
            4.0 + (processData.controlOutput * 0.01);

        processData.flowRate =
            100 + (processData.controlOutput * 0.5);

        processData.level +=
            (processData.flowRate - 125) * 0.0005;

        processData.level = Math.max(
            0,
            Math.min(100, processData.level)
        );

    } else {

        // Safe process state when stopped
        processData.controlOutput = 0;

        processData.pressure = 4.0;
        processData.flowRate = 100;
    }
}

// Process alarms
function evaluateProcess(data) {

    const alarms = [];

    if (data.temperature >= 90) {
        alarms.push("HIGH TEMPERATURE");
    }

    if (data.pressure >= 6) {
        alarms.push("HIGH PRESSURE");
    }

    if (data.flowRate < 80) {
        alarms.push("LOW FLOW RATE");
    }

    if (data.level >= 90) {
        alarms.push("HIGH LEVEL");
    }

    if (plc.status.fault) {
        alarms.push("PLC FAULT");
    }

    if (plc.digitalInputs.emergencyStop) {
        alarms.push("EMERGENCY STOP");
    }

    const status =
        alarms.length > 0 ? "ALARM" : "NORMAL";

    return {
        ...data,
        status,
        alarms
    };
}

// API data
function getProcessData() {

    return {
        timestamp: new Date().toISOString(),

        ...evaluateProcess(processData),

        plc: plc.getStatus()
    };
}

// Run simulation every second
setInterval(() => {
    simulateProcess();
    logProcessData(getProcessData());
}, 1000);

// Export everything needed by the server
module.exports = {
    processData,
    plc,
    evaluateProcess,
    getProcessData
};