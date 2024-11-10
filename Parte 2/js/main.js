import Memory from "./memory.js";
import System from "./system.js";
import Page from "./page.js";
import VirtualMemory from "./virtualMemory.js";
import {
    readFile,
    processFile,
    showProcesses,
    showPageTable,
    showPhysicalMemory,
    showVirtualMemory,
} from "./uiGerenciador.js";

const memory = new Memory(4);
const virtualMemory = new VirtualMemory();
const system = new System(memory, virtualMemory);
let processes;

const onFileUpload = async (event) => {
    const content = await readFile(event);
    processes = processFile(content);
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
};

const paginateProcesses = (processes, pageSize) => {
    for (let i = 0; i < processes.length; i++) {
        const pages = [];
        let pageNumber = 0;
        for (let j = 0; j < processes[i].getSize(); j += pageSize) {
            const page = new Page(processes[i], pageNumber);
            pages.push(page);
            virtualMemory.addPage(page);
            pageNumber++;
        }
        processes[i].setPages(pages);
    }
};

const startSimulation = () => {
    document.getElementById("proximoPasso").style.display = "inline";
    document.getElementById("resetarSimulacao").style.display = "inline";
    document.getElementById("iniciarSimulacao").style.display = "none";

    paginateProcesses(processes, 4);
    showProcesses(processes);
};

const nextStep = () => {
    const hasMoreSteps = system.nextStep();
    showPageTable(processes, memory, virtualMemory);
    showPhysicalMemory(memory);
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
    document.querySelector("#listaProcessos tbody").innerHTML = ""; // Limpa a lista de processos
    document.querySelector("#tabelaPaginas tbody").innerHTML = ""; // Limpa a tabela de páginas
    document.getElementById("graficoGantt").innerHTML = ""; // Limpa o gráfico de Gantt
    document.getElementById("memoriaFisica").innerHTML = ""; // Limpa a memória física
    document.getElementById("memoriaVirtual").innerHTML = ""; // Limpa a memória virtual
    document.getElementById("fileInput").files = null; // Limpa o input de arquivo

    // Reseta as variáveis do sistema
    showVirtualMemory(new VirtualMemory());
    processes = []; // Limpa a lista de processos carregados
};

document.addEventListener("DOMContentLoaded", function () {
    document
        .getElementById("fileInput")
        .addEventListener("change", onFileUpload);
    document
        .getElementById("iniciarSimulacao")
        .addEventListener("click", startSimulation);
    document.getElementById("proximoPasso").addEventListener("click", nextStep);
    document
        .getElementById("resetarSimulacao")
        .addEventListener("click", resetSimulation);
});
