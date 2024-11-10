export default class Memory {
    constructor(frameCount) {
        this.frames = [];
        this.frameCount = frameCount;
    }

    addFrame(frame) {
        this.frames.push(frame);
    }

    getFrames() {
        return this.frames;
    }

    hasFrames() {
        return this.frames.length > 0;
    }

    hasEmptyFrames() {
        return this.frames.length < this.frameCount;
    }

    clear() {
        this.frames = [];
    }

    hasProcessPage(processName, pageNumber) {
        return this.frames.some(
            (page) =>
                page.getProcessName() === processName &&
                page.getPageNumber() === pageNumber
        );
    }
}
