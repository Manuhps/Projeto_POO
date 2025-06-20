export class Caminho {
    constructor(id, nome, descricao, dificuldade, distancia, etapas) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.dificuldade = dificuldade;
        this.distancia = distancia;
        this.etapas = etapas;
    }

    static fromJSON(json) {
        return new Caminho(
            json.id,
            json.nome,
            json.descricao,
            json.dificuldade,
            json.distancia,
            json.etapas
        );
    }
} 