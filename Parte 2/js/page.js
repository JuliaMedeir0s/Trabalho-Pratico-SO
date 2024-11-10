export default class Page {
    constructor(process, pageNumber) {
        this.process = process;
        this.pageNumber = pageNumber;
    }

    getProcessName() {
        return this.process.getName();
    }

    getPageNumber() {
        return this.pageNumber;
    }
}
