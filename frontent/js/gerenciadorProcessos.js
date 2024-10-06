export let processos = [];

export function adicionarProcesso(nome, tempoChegada, tempoExecucao, tempoQuantum) {
    const processo = {
        nome: nome,
        tempoChegada: parseInt(tempoChegada),
        tempoExecucao: parseInt(tempoExecucao),
        tempoRestante: parseInt(tempoExecucao),
        tempoQuantum: parseInt(tempoQuantum)
    };
    processos.push(processo);
}

export function listarProcessos() {
    return processos;
}
