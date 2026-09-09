class PLC {
    constructor() {

        this.digitalInputs = {
            start: false,
            stop: false,
            emergencyStop: false
        };

        this.inputs = {
            temperature: 0,
            pressure: 0,
            flowRate: 0,
            level: 0
        };

        this.status = {
            running: false,
            fault: false
        };

        this.outputs = {
            controlOutput: 0,
            pumpRunning: false,
            valveOpen: false
        };
    }

    updateInputs(processData) {

        this.inputs = {
            temperature: processData.temperature,
            pressure: processData.pressure,
            flowRate: processData.flowRate,
            level: processData.level
        };
    }

    setControlOutput(value) {

        this.outputs.controlOutput =
            Math.max(
                0,
                Math.min(100, Number(value) || 0)
            );
    }

    executeLogic() {

        // Emergency stop has highest priority
        if (this.digitalInputs.emergencyStop) {

            this.status.running = false;
            this.status.fault = true;

            this.outputs.controlOutput = 0;
            this.outputs.pumpRunning = false;
            this.outputs.valveOpen = false;

            return;
        }

        // Stop command
        if (this.digitalInputs.stop) {

            this.status.running = false;

            this.outputs.controlOutput = 0;
            this.outputs.pumpRunning = false;
            this.outputs.valveOpen = false;

            return;
        }

        // Safety interlocks while running
        if (this.status.running) {

            if (this.inputs.temperature >= 90) {
                this.status.fault = true;
            }

            if (this.inputs.pressure >= 6) {
                this.status.fault = true;
            }

            if (this.inputs.level >= 90) {
                this.status.fault = true;
            }

            if (this.inputs.flowRate < 80) {
                this.status.fault = true;
            }

            // Enter safe state if fault occurs
            if (this.status.fault) {

                this.status.running = false;

                this.outputs.controlOutput = 0;
                this.outputs.pumpRunning = false;
                this.outputs.valveOpen = false;

                return;
            }
        }

        // Start command
        if (
            this.digitalInputs.start &&
            !this.status.fault
        ) {
            this.status.running = true;
        }

        // Equipment operation
        if (this.status.running) {

            this.outputs.pumpRunning = true;

            this.outputs.valveOpen =
                this.outputs.controlOutput > 0;

        } else {

            this.outputs.controlOutput = 0;
            this.outputs.pumpRunning = false;
            this.outputs.valveOpen = false;
        }
    }

    reset() {

        this.digitalInputs.start = false;
        this.digitalInputs.stop = false;
        this.digitalInputs.emergencyStop = false;

        this.status.running = false;
        this.status.fault = false;

        this.outputs.controlOutput = 0;
        this.outputs.pumpRunning = false;
        this.outputs.valveOpen = false;
    }

    getStatus() {

        return {
            running: this.status.running,
            fault: this.status.fault,
            inputs: this.inputs,
            digitalInputs: this.digitalInputs,
            outputs: this.outputs
        };
    }
}

module.exports = PLC;