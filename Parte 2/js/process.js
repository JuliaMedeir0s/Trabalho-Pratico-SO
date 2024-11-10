export default class Process {
    constructor(name, size, arrivalTime) {
        this.name = name;
        this.size = size;
        this.arrivalTime = arrivalTime;
        this.pages = [];
    }

    getName() {
        return this.name;
    }

    getSize() {
        return this.size;
    }

    getArrivalTime() {
        return this.arrivalTime;
    }

    setPages(pages) {
        this.pages = pages;
    }

    getPages() {
        return this.pages;
    }
}
