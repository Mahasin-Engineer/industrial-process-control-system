class PIDController {
    constructor(kp, ki, kd, setpoint) {
        this.kp = kp;
        this.ki = ki;
        this.kd = kd;
        this.setpoint = setpoint;

        this.integral = 0;
        this.previousError = 0;
        this.previousTime = Date.now();
    }

    update(measuredValue) {
        const currentTime = Date.now();
        const dt = (currentTime - this.previousTime) / 1000;

        const error = this.setpoint - measuredValue;

        this.integral += error * dt;

        const derivative =
            dt > 0 ?
            (error - this.previousError) / dt :
            0;

        let output =
            (this.kp * error) +
            (this.ki * this.integral) +
            (this.kd * derivative);

        // Limit controller output to 0-100%
        output = Math.max(0, Math.min(100, output));

        this.previousError = error;
        this.previousTime = currentTime;

        return output;
    }
}

module.exports = PIDController;