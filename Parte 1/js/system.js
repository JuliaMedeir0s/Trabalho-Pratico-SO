export default class System {
    constructor(processor, memory) {
        this.processor = processor;
        this.memory = memory;
    }

    run(processes) {
        let currentTime = 0;
        let dadosGantt = processes.map(p => ({ name: p.getName(), timeline: [] }));

        while (processes.some(p => p.getExecutionTime() > 0) || this.memory.hasProcesses()) {
            const newProcesses = [];

            processes.forEach((process) => {
                if (process.getArrivalTime() <= currentTime && process.getExecutionTime() > 0 && !this.memory.getProcesses().includes(process)) {
                    this.memory.getProcesses().push(process);
                } else {
                    newProcesses.push(process);
                }
            });

            if (this.memory.hasProcesses()) {
                let currentProcess = this.memory.getProcesses().shift();
                const executedTime = this.processor.executeProcess(currentProcess);
                currentTime += executedTime;

                for (let i = 0; i < executedTime; i++) {
                    dadosGantt.find(p => p.name === currentProcess.getName()).timeline.push('lightblue');
                }

                if (currentProcess.getExecutionTime() > 0) {
                    newProcesses.push(currentProcess);
                }
            } else {
                currentTime++;
            }

            processes = newProcesses;

            dadosGantt.forEach(process => {
                while (process.timeline.length < currentTime) {
                    process.timeline.push('white');
                }
            });
        }

        return dadosGantt;
    }
}