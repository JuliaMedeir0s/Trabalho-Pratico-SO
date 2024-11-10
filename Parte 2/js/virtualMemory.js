export default class VirtualMemory {
    constructor() {
        this.frames = []; // Inicializa os quadros vazios
    }

    addPage(page) {
        this.frames.push(page);
    }

    removePageFIFO() {
        const page = this.frames.shift();
        return page;
    }

    isEmpty() {
        return this.frames.length === 0;
    }

    getFrames() {
        return this.frames;
    }

    hasProcessPage(processName, pageNumber) {
        return this.frames.some(page => page.getProcessName() === processName && page.getPageNumber() === pageNumber);
    }
}
