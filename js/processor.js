export default class Processor {
    constructor(quantum) {
        this.quantum = quantum;
    }

    executeProcess(process) {
        let executionTime = process.getExecutionTime();
        const executedTime = Math.min(executionTime, this.quantum);
        let remainingTime = executionTime - executedTime;
        process.setExecutionTime(remainingTime);
        return executedTime;
    }
}