export default class VirtualMemory {
    constructor(frameCount) {
        this.frames = Array(frameCount).fill(null); // Inicializa os quadros vazios
        this.pageQueue = []; // Fila para o algoritmo FIFO
    }

    addPage(page) {
        if (this.isFull()) {
            this.removePageFIFO();
        }
        const emptyFrameIndex = this.frames.indexOf(null);
        this.frames[emptyFrameIndex] = page;
        this.pageQueue.push(page);
    }

    removePageFIFO() {
        const pageToRemove = this.pageQueue.shift();
        const index = this.frames.indexOf(pageToRemove);
        this.frames[index] = null;
    }

    isFull() {
        return this.frames.every(frame => frame !== null);
    }

    containsPage(page) {
        return this.frames.some(frame => frame && frame.getProcessName() === page.getProcessName() && frame.getPageNumber() === page.getPageNumber());
    }
}
