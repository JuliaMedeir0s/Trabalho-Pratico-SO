export default class Process {
    constructor(name, executionTime, arrivalTime) {
        this.name = name;
        this.executionTime = executionTime;
        this.arrivalTime = arrivalTime;
    }

    getName() {
        return this.name;
    }

    getExecutionTime() {
        return this.executionTime;
    }

    getArrivalTime() {
        return this.arrivalTime;
    }

    setExecutionTime(executionTime) {
        this.executionTime = executionTime;
    }
}
