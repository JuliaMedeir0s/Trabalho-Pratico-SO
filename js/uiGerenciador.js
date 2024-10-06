import Process from './process.js';

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
    const linhas = conteudo.split('\n');
    const processos = [];

    linhas.forEach(linha => {
        const [name, arrivalTime, executionTime] = linha.split(',');

        if (name && arrivalTime && executionTime) {
            const process = new Process(name.trim(), parseInt(executionTime), parseInt(arrivalTime));
            processos.push(process);
        }
    });

    return processos;
}

export function showProcesses(processos) {
    const tabelaProcessos = document.querySelector('#listaProcessos tbody');
    tabelaProcessos.innerHTML = '';

    processos.forEach(process => {
        tabelaProcessos.innerHTML += `
            <tr>
                <td>${process.getName()}</td>
                <td>${process.getArrivalTime()}</td>
                <td>${process.getExecutionTime()}</td>
            </tr>
        `;
    });
}

export function showGanttChart(dadosGantt) {
    const ganttChart = document.getElementById('graficoGantt');
    ganttChart.innerHTML = '';

    let header = '<tr><th>Processo</th>';
    const maxTime = Math.max(...dadosGantt.map(p => p.timeline.length));
    for (let i = 0; i < maxTime; i++) {
        header += `<th>${i + 1}</th>`;
    }
    header += '</tr>';
    ganttChart.innerHTML += header;

    dadosGantt.forEach(process => {
        let row = `<tr><td>${process.name}</td>`;
        process.timeline.forEach(cor => {
            row += `<td style="background-color:${cor};"></td>`;
        });
        row += '</tr>';
        ganttChart.innerHTML += row;
    });
}