import { showVirtualMemory } from './uiGerenciador.js';
import VirtualMemory from './virtualMemory.js';
import Page from './page.js';

export default class System {
    constructor(processor, memory, virtualMemory) {
        this.processor = processor;
        this.memory = memory;
        this.virtualMemory = virtualMemory;
        this.currentTime = 0;
        this.processes = [];
        this.dadosGantt = [];
    }

    initialize(processes) {
        this.processes = processes.slice(); // Clona a lista de processos para reiniciar a simulação
        this.dadosGantt = processes.map(p => ({ name: p.getName(), timeline: [] }));
        this.currentTime = 0;
    }

    nextStep() {
        if (this.processes.length === 0 && !this.memory.hasProcesses()) {
            return false; // Simulação concluída
        }

        // Executa uma etapa da simulação
        this.processes.forEach(process => {
            if (process.getArrivalTime() <= this.currentTime && process.getExecutionTime() > 0 && !this.memory.getProcesses().includes(process)) {
                this.memory.getProcesses().push(process);
                this.loadProcessIntoVirtualMemory(process);
            }
        });

        if (this.memory.hasProcesses()) {
            let currentProcess = this.memory.getProcesses().shift();
            const executedTime = this.processor.executeProcess(currentProcess);
            this.currentTime += executedTime;

            for (let i = 0; i < executedTime; i++) {
                this.dadosGantt.find(p => p.name === currentProcess.getName()).timeline.push('lightblue');
            }

            if (currentProcess.getExecutionTime() > 0) {
                this.processes.push(currentProcess);
            }
        } else {
            this.currentTime++;
        }

        this.dadosGantt.forEach(process => {
            while (process.timeline.length < this.currentTime) {
                process.timeline.push('white');
            }
        });

        return true; // Ainda há etapas para executar
    }
    
    loadProcessIntoVirtualMemory(process) {
        const pageSize = 10; // Tamanho de cada página em unidades de tempo
        const pageCount = Math.ceil(process.getExecutionTime() / pageSize); // Número de páginas do processo
    
        for (let i = 0; i < pageCount; i++) {
            const page = new Page(process, i); // `i` representa o número da página (P0, P1, etc.)
            if (!this.virtualMemory.containsPage(page)) {
                this.virtualMemory.addPage(page);
                showVirtualMemory(this.virtualMemory); // Atualiza a visualização da memória
            }
        }
    }
    

    getGanttData() {
        return this.dadosGantt;
    }
}