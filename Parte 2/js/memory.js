export default class Memory {
    constructor() {
        this.processes = [];
    }

    addProcess(process) {
        this.processes.push(process);
    }

    addProcesses(processes) {
        this.processes = this.processes.concat(processes);
    }

    removeProcess(process) {
        const index = this.processes.indexOf(process);
        this.processes.splice(index, 1);
    }

    getProcesses() {
        return this.processes;
    }

    hasProcesses() {
        return this.processes.length > 0;
    }
}