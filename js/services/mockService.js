export class MockService {
    static async obterCaminhos() {
        const response = await fetch('../js/data/caminhos.json');
        return await response.json();
    }

    static async obterEtapas() {
        const response = await fetch('../js/data/etapas.json');
        return await response.json();
    }

    // Método para obter um caminho já com as etapas completas
    static async obterCaminhoCompleto(id) {
        const caminhos = await this.obterCaminhos();
        const etapas = await this.obterEtapas();
        const caminho = caminhos.find(c => c.id === id);
        if (!caminho) return null;
        caminho.etapasCompletas = caminho.etapas.map(etapaId => etapas.find(e => e.id === etapaId));
        return caminho;
    }
}  