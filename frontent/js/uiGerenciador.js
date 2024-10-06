import { adicionarProcesso, listarProcessos } from './gerenciadorProcessos.js';
import { escalonamentoRoundRobin } from './escalonador.js';

function lerArquivo(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const conteudo = e.target.result;
        processarArquivo(conteudo);
    };

    if (file) {
        reader.readAsText(file);
    }
}

function processarArquivo(conteudo) {
    const linhas = conteudo.split('\n');
    linhas.forEach(linha => {
        const [nome, tempoChegada, tempoExecucao] = linha.split(',');

        if (nome && tempoChegada && tempoExecucao) {
            adicionarProcesso(nome.trim(), parseInt(tempoChegada), parseInt(tempoExecucao), 2);
        }
    });

    exibirProcessos();
}

// mostrar os processos na tabela
function exibirProcessos() {
    const tabelaProcessos = document.querySelector('#listaProcessos tbody');
    tabelaProcessos.innerHTML = ''; 

    const processos = listarProcessos();
    processos.forEach(processo => {
        tabelaProcessos.innerHTML += `
            <tr>
                <td>${processo.nome}</td>
                <td>${processo.tempoChegada}</td>
                <td>${processo.tempoExecucao}</td>
            </tr>
        `;
    });
}

// monta o gráfico de Gantt
function exibirGraficoGantt(dadosGantt) {
    const tabelaGantt = document.getElementById('graficoGantt');
    tabelaGantt.innerHTML = ''; 

    let linhaCabecalho = '<tr><th>Processo</th>';
    const maxTempo = Math.max(...dadosGantt.map(p => p.linhaTempo.length));
    for (let i = 0; i < maxTempo; i++) {
        linhaCabecalho += `<th>${i + 1}</th>`; 
    }
    linhaCabecalho += '</tr>';
    tabelaGantt.innerHTML += linhaCabecalho;

    // uma linha pra cada processo
    dadosGantt.forEach(processo => {
        let linha = `<tr><td>${processo.nome}</td>`;
        processo.linhaTempo.forEach(cor => {
            linha += `<td style="background-color:${cor};"></td>`; 
        });
        linha += '</tr>';
        tabelaGantt.innerHTML += linha;
    });
}

document.addEventListener("DOMContentLoaded", function () {
    // captura o evento de upload do arquivo
    document.getElementById('fileInput').addEventListener('change', lerArquivo);

    // inicia o escalonamento ao clicar no botão
    document.getElementById('iniciarEscalonamento').addEventListener('click', function() {
        const dadosGantt = escalonamentoRoundRobin();
        exibirGraficoGantt(dadosGantt);
    });
});