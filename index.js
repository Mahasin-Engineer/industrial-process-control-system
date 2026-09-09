const express = require("express");

const { getProcessData, plc } = require("./process");

const app = express();
const PORT = 3000;

// Serve dashboard
app.use(express.static(__dirname));

// Process data API
app.get("/api/process", (req, res) => {
    res.json(getProcessData());
});

// START PLC
app.post("/api/plc/start", (req, res) => {

    plc.digitalInputs.start = true;
    plc.digitalInputs.stop = false;
    plc.digitalInputs.emergencyStop = false;

    plc.executeLogic();

    res.json({
        success: true,
        command: "START",
        plc: plc.getStatus()
    });
});

// STOP PLC
app.post("/api/plc/stop", (req, res) => {

    plc.digitalInputs.start = false;
    plc.digitalInputs.stop = true;

    plc.executeLogic();

    res.json({
        success: true,
        command: "STOP",
        plc: plc.getStatus()
    });
});

// EMERGENCY STOP
app.post("/api/plc/emergency-stop", (req, res) => {

    plc.digitalInputs.start = false;
    plc.digitalInputs.stop = false;
    plc.digitalInputs.emergencyStop = true;

    plc.executeLogic();

    res.json({
        success: true,
        command: "EMERGENCY STOP",
        plc: plc.getStatus()
    });
});

// RESET PLC
app.post("/api/plc/reset", (req, res) => {

    plc.reset();

    res.json({
        success: true,
        command: "RESET",
        plc: plc.getStatus()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(
        `Industrial Process Control System running on port ${PORT}`
    );
});