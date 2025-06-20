// Função para carregar dados do arquivo JSON
async function carregarCaminhos() {
  try {
    const response = await fetch('../data/caminhos-data.json');
    const data = await response.json();
    return data.caminhos;
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
    return [];
  }
}

export { carregarCaminhos };