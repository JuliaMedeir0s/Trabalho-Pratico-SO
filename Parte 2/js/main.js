import Memory from './memory.js';
import Processor from './processor.js';
import System from './system.js';
import VirtualMemory from './virtualMemory.js';
import { readFile, processFile, showProcesses, showGanttChart, showPageTable, showPhysicalMemory, showVirtualMemory } from './uiGerenciador.js';

const memory = new Memory();
const processor = new Processor(10);
const virtualMemory = new VirtualMemory(4); 
const system = new System(processor, memory, virtualMemory);
let processes;

const onFileUpload = async (event) => {
    const content = await readFile(event);
    processes = processFile(content);
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    showProcesses(processes);
};

const startSimulation = () => {
    system.initialize(processes);
    document.getElementById("proximoPasso").style.display = "inline";
    document.getElementById("resetarSimulacao").style.display = "inline";
    document.getElementById("iniciarSimulacao").style.display = "none";
};

const nextStep = () => {
    const hasMoreSteps = system.nextStep();
    showGanttChart(system.getGanttData());
    showPageTable(processes, virtualMemory);
    showPhysicalMemory(virtualMemory);
    showVirtualMemory(virtualMemory);

    if (!hasMoreSteps) {
        document.getElementById("proximoPasso").style.display = "none";
    }
};

const resetSimulation = () => {
    // Oculta os botões de controle e exibe o botão de iniciar
    document.getElementById("proximoPasso").style.display = "none";
    document.getElementById("resetarSimulacao").style.display = "none";
    document.getElementById("iniciarSimulacao").style.display = "inline";

    // Limpa as tabelas e áreas de visualização
    document.querySelector('#listaProcessos tbody').innerHTML = ''; // Limpa a lista de processos
    document.querySelector('#tabelaPaginas tbody').innerHTML = ''; // Limpa a tabela de páginas
    document.getElementById('graficoGantt').innerHTML = ''; // Limpa o gráfico de Gantt
    document.getElementById('memoriaFisica').innerHTML = ''; // Limpa a memória física
    document.getElementById('memoriaVirtual').innerHTML = ''; // Limpa a memória virtual

    // Reseta as variáveis do sistema
    showGanttChart([]); 
    showVirtualMemory(new VirtualMemory(4)); 
    processes = []; // Limpa a lista de processos carregados
};

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('fileInput').addEventListener('change', onFileUpload);
    document.getElementById('iniciarSimulacao').addEventListener('click', startSimulation);
    document.getElementById('proximoPasso').addEventListener('click', nextStep);
    document.getElementById('resetarSimulacao').addEventListener('click', resetSimulation);
});
