# Industrial Process Control System

A software-based simulation of an industrial process monitoring and control system using Node.js, JavaScript and a SCADA/HMI-style web dashboard.

## Project Overview

The system simulates an industrial process with:

- Temperature measurement
- Pressure measurement
- Flow-rate measurement
- Level measurement
- PID temperature control
- PLC control logic simulation
- Pump and control-valve control
- Start/Stop operation
- Emergency-stop interlock
- Process alarms
- Live process trends
- Historical process data logging
- SCADA/HMI-style monitoring dashboard

## System Architecture

```text
Process Simulation
       |
       v
   PID Controller
       |
       v
   PLC Simulation
       |
       +------> Pump / Control Valve
       |
       v
 SCADA / HMI Dashboard
       |
       v
 Historical Data Logger