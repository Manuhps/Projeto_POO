export class Etapa {
    constructor(id, nome, distancia, duracao, pontosInteresse, albergues) {
        this.id = id;
        this.nome = nome;
        this.distancia = distancia;
        this.duracao = duracao;
        this.pontosInteresse = pontosInteresse;
        this.albergues = albergues;
    }

    static fromJSON(json) {
        return new Etapa(
            json.id,
            json.nome,
            json.distancia,
            json.duracao,
            json.pontosInteresse,
            json.albergues
        );
    }
} 