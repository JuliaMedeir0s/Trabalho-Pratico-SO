import { showPhysicalMemory, showVirtualMemory } from "./uiGerenciador.js";

export default class System {
    constructor(memory, virtualMemory) {
        this.memory = memory;
        this.virtualMemory = virtualMemory;
    }

    nextStep() {
        this.memory.clear();

        if (this.virtualMemory.isEmpty() && !this.memory.hasFrames()) {
            return false; // Simulação concluída
        }

        showPhysicalMemory(this.memory);
        showVirtualMemory(this.virtualMemory);
        
        while (this.memory.hasEmptyFrames() && !this.virtualMemory.isEmpty()) {
            const page = this.virtualMemory.removePageFIFO();
            this.memory.addFrame(page);
        }

        return true; // Ainda há etapas para executar
    }
}
