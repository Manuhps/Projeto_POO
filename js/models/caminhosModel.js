class Etapa {
  constructor(data) {
    this.id = data.id;
    this.nome = data.nome;
    this.partida = data.partida;
    this.destino = data.destino;
    this.distancia = data.distancia;
    this.dificuldade = data.dificuldade;
    this.pontos_interesse = data.pontos_interesse;
    this.albergues = data.albergues;
  }
}

class Caminho {
  constructor(data) {
    this.id = data.id;
    this.nome = data.nome;
    this.descricao = data.descricao;
    this.dificuldade = data.dificuldade;
    this.distancia_total = data.distancia_total;
    this.etapas = data.etapas.map(etapa => new Etapa(etapa));
  }

  getEtapasPorDia(dias) {
    const etapasPorDia = Math.ceil(this.etapas.length / dias);
    return this.etapas.reduce((acc, etapa, index) => {
      const dia = Math.floor(index / etapasPorDia) + 1;
      if (!acc[dia]) {
        acc[dia] = [];
      }
      acc[dia].push(etapa);
      return acc;
    }, {});
  }
}

let caminhos = [];

// Função para carregar os dados do JSON
async function carregarCaminhos() {
  try {
    const response = await fetch('../js/data/caminhos.json');
    const data = await response.json();
    caminhos = data.caminhos.map(caminho => new Caminho(caminho));
  } catch (error) {
    console.error('Erro ao carregar caminhos:', error);
  }
}

// Carregar os caminhos imediatamente
carregarCaminhos();

export { Caminho, Etapa, caminhos }; 