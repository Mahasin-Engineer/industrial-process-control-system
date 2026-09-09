# Industrial Process Control System

## 1. Project Overview

This project is a software-based simulation of an industrial process monitoring and control system.

The system demonstrates concepts commonly used in industrial automation and instrumentation, including:

- Process variable monitoring
- Temperature, pressure, flow and level measurement
- PID control
- PLC control logic simulation
- Start/Stop control
- Emergency-stop interlock
- Process alarms
- Pump and control-valve status
- Live process trends
- Historical process logging
- SCADA/HMI-style dashboard

This is a simulation project and does not represent a connection to a physical PLC or industrial plant.

## 2. System Architecture

The system consists of the following layers:

### Process Simulation

The process simulation generates temperature, pressure, flow-rate and level values.

### PID Controller

The PID controller calculates the control output based on the temperature setpoint and measured temperature.

### PLC Simulation

The PLC layer represents basic programmable-controller functions:

- Digital inputs
- Process inputs
- Start command
- Stop command
- Emergency-stop interlock
- Fault handling
- Control outputs
- Pump status
- Control-valve status

### SCADA/HMI Dashboard

The web dashboard displays:

- Current process variables
- PLC operating status
- Pump status
- Control-valve status
- PLC fault status
- Emergency-stop status
- Active alarms
- Live process trends
- Control commands

### Data Logging

Process data is periodically recorded for historical analysis.

## 3. Process Variables

| Variable | Unit | Description |
|---|---|---|
| Temperature | °C | Process temperature |
| Pressure | bar | Process pressure |
| Flow Rate | units/min | Process flow |
| Level | % | Process vessel level |
| Control Output | % | Controller output |

## 4. Control Strategy

Temperature is controlled using a PID controller.

The controller compares the measured process temperature with the configured temperature setpoint.

The controller output is limited between 0% and 100%.

The output is used by the simulated process to determine the process response.

## 5. PLC Logic

The simulated PLC implements basic operating logic.

### Start

When the Start command is active and no fault exists:

- PLC enters RUNNING state
- Pump is enabled
- Control valve is opened

### Stop

When Stop is activated:

- PLC stops the process
- Control output is set to zero
- Pump is stopped
- Control valve is closed

### Emergency Stop

When Emergency Stop is active:

- PLC enters FAULT state
- Process is stopped
- Control output becomes zero
- Pump is stopped
- Control valve is closed

## 6. Alarm Monitoring

The system monitors process conditions and generates alarms when configured limits are exceeded.

Current alarm conditions include:

- High Temperature
- High Pressure
- Low Flow Rate
- High Level

## 7. Technology Stack

- JavaScript
- Node.js
- Express.js
- HTML
- CSS
- Chart.js
- Git

## 8. Project Limitation

This project is a simulation developed for demonstration and portfolio purposes.

It does not communicate with a physical PLC, field instruments, DCS or industrial control network.

The architecture is designed to demonstrate understanding of instrumentation, process control, PLC logic and SCADA/HMI concepts.