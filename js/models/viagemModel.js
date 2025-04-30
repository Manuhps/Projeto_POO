class Etapa {
  constructor(id, nome, partida, destino, distancia, motivosInteresse, alojamentos) {
    this.id = id;
    this.nome = nome;
    this.partida = partida;
    this.destino = destino;
    this.distancia = distancia;
    this.motivosInteresse = motivosInteresse;
    this.alojamentos = alojamentos;
  }
}

class Caminho {
  constructor(id, nome, etapas) {
    this.id = id;
    this.nome = nome;
    this.etapas = etapas;
  }
}

const caminhos = [
  new Caminho(1, "Caminho Francês", [
    new Etapa(1, "Etapa 1", "Saint-Jean-Pied-de-Port", "Roncesvalles", 25, ["Paisagens montanhosas", "Igreja de Roncesvalles"], ["Albergue Roncesvalles"]),
    new Etapa(2, "Etapa 2", "Roncesvalles", "Pamplona", 27, ["Catedral de Pamplona", "Praça de Touros"], ["Hostel Pamplona"]),
  ]),
  new Caminho(2, "Caminho Português", [
    new Etapa(1, "Etapa 1", "Porto", "Barcelos", 30, ["Ponte de Barcelos", "Centro Histórico"], ["Albergue Barcelos"]),
    new Etapa(2, "Etapa 2", "Barcelos", "Ponte de Lima", 20, ["Ponte Romana", "Centro Histórico"], ["Hostel Ponte de Lima"]),
  ]),
];

export { caminhos };