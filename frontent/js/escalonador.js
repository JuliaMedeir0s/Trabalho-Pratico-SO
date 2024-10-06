import { processos } from './gerenciadorProcessos.js';

const QUANTUM_FIXO = 2;  

const PREENCHIDO = 'lightblue'; 

export function escalonamentoRoundRobin() {
    let tempoAtual = 0;
    let filaProcessos = [];
    let dadosGantt = processos.map(p => ({ nome: p.nome, linhaTempo: [] }));

    // ordena os processos por hora de chegada
    let processosOrdenados = [...processos].sort((a, b) => a.tempoChegada - b.tempoChegada);

    while (processosOrdenados.some(p => p.tempoRestante > 0) || filaProcessos.length > 0) {
        processosOrdenados.forEach(processo => {
            if (processo.tempoChegada <= tempoAtual && processo.tempoRestante > 0 && !filaProcessos.includes(processo)) {
                filaProcessos.push(processo);
            }
        });

        if (filaProcessos.length > 0) {
            let processoAtual = filaProcessos.shift(); 
            const tempoExecutado = Math.min(processoAtual.tempoRestante, QUANTUM_FIXO);
            processoAtual.tempoRestante -= tempoExecutado;
            tempoAtual += tempoExecutado;

            for (let i = 0; i < tempoExecutado; i++) {
                dadosGantt.find(p => p.nome === processoAtual.nome).linhaTempo.push(PREENCHIDO); 
            }

            // se o processo ainda não terminou, volta para a fila
            if (processoAtual.tempoRestante > 0) {
                filaProcessos.push(processoAtual);
            }
        } else {
            // se não há processos prontos, avança no tempo
            tempoAtual++;
        }

        // preenche os espaços em branco para os processos que não estão em execução
        dadosGantt.forEach(processo => {
            while (processo.linhaTempo.length < tempoAtual) {
                processo.linhaTempo.push('white'); 
            }
        });
    }

    return dadosGantt;
}
