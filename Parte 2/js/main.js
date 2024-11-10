import Memory from './memory.js';
import Processor from './processor.js';
import System from './system.js';
import { readFile, processFile, showProcesses, showGanttChart } from './uiGerenciador.js';

const memory = new Memory();
const processor = new Processor(10);
let processes;

const onFileUpload = async (event) => {
    const content = await readFile(event);
    processes = processFile(content);
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    showProcesses(processes);
};

const main = () => {
    const system = new System(processor, memory);
    const ganttData = system.run(processes);
    showGanttChart(ganttData);
};

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('fileInput').addEventListener('change', onFileUpload);

    document.getElementById('iniciarEscalonamento').addEventListener('click', main);
});