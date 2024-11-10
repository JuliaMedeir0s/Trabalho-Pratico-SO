import Process from "./process.js";

export function readFile(event) {
    return new Promise((resolve, reject) => {
        const file = event.target.files[0];
        const fr = new FileReader();
        fr.onload = (e) => resolve(e.target.result);
        fr.onerror = (err) => reject(err);
        fr.readAsText(file);
    });
}

export function processFile(conteudo) {
    const linhas = conteudo.split("\n");
    const processos = [];

    linhas.forEach((linha) => {
        const [name, arrivalTime, executionTime] = linha.split(",");

        if (name && arrivalTime && executionTime) {
            const process = new Process(
                name.trim(),
                parseInt(executionTime),
                parseInt(arrivalTime)
            );
            processos.push(process);
        }
    });

    return processos;
}

export function showProcesses(processos) {
    const tabelaProcessos = document.querySelector("#listaProcessos tbody");
    tabelaProcessos.innerHTML = "";

    processos.forEach((process) => {
        tabelaProcessos.innerHTML += `
            <tr>
                <td>${process.getName()}</td>
                <td>${process.getArrivalTime()}</td>
                <td>${process.getSize()}</td>
            </tr>
        `;
    });
}

export function showPageTable(processes, memory, virtualMemory) {
    const tabelaPaginas = document
        .getElementById("tabelaPaginas")
        .querySelector("tbody");
    tabelaPaginas.innerHTML = "";

    processes.forEach((process) => {
        process.getPages().forEach((page) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${process.getName()}</td>
                <td>P${page.getPageNumber()}</td>
                <td>
                    ${pageLocation(process, page, memory, virtualMemory)}
                </td>`;
            tabelaPaginas.appendChild(row);
        });
    });
}

const pageLocation = (process, page, memory, virtualMemory) => {
    if (memory.hasProcessPage(process.getName(), page.getPageNumber())) {
        return `Memória Física - Quadro ${memory.frames.indexOf(page) + 1}`;
    }
    if (virtualMemory.hasProcessPage(process.getName(), page.getPageNumber())) {
        return `Memória Virtual - Quadro ${
            virtualMemory.frames.indexOf(page) + 1
        }`;
    }
    return "Executado";
};

export function showPhysicalMemory(memory) {
    const memoriaFisica = document.getElementById("memoriaFisica");
    memoriaFisica.innerHTML = "";

    memory.frames.forEach((frame) => {
        const frameDiv = document.createElement("div");
        frameDiv.classList.add("frame");
        frameDiv.innerText = frame
            ? `${frame.getProcessName()} - P${frame.getPageNumber()}`
            : "Vazio";
        memoriaFisica.appendChild(frameDiv);
    });
}

export function showVirtualMemory(virtualMemory) {
    const memoriaVirtual = document.getElementById("memoriaVirtual");
    memoriaVirtual.innerHTML = "";

    virtualMemory.frames.forEach((page) => {
        const pageDiv = document.createElement("div");
        pageDiv.classList.add("frame");
        pageDiv.innerText = `${page.getProcessName()} - P${page.getPageNumber()}`;
        memoriaVirtual.appendChild(pageDiv);
    });
}
