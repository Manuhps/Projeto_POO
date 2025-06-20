import { Caminho } from '../models/Caminho.js';
import { Etapa } from '../models/Etapa.js';

export class CaminhoService {
    constructor() {
        this.caminhos = [];
        this.etapas = [];
        this.carregarDados();
    }

    async carregarDados() {
        try {
            const response = await fetch('../js/data/caminhos.json');
            const data = await response.json();
            
            this.caminhos = data.caminhos.map(c => Caminho.fromJSON(c));
            this.etapas = data.etapas.map(e => Etapa.fromJSON(e));
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    }

    buscarCaminhos(filtros) {
        return this.caminhos.filter(caminho => {
            // Aqui você pode adicionar mais filtros conforme necessário
            if (filtros.dificuldade && caminho.dificuldade !== filtros.dificuldade) {
                return false;
            }
            return true;
        });
    }

    obterEtapasDoCaminho(caminhoId) {
        const caminho = this.caminhos.find(c => c.id === caminhoId);
        if (!caminho) return [];

        return caminho.etapas.map(etapaId => 
            this.etapas.find(e => e.id === etapaId)
        ).filter(etapa => etapa !== undefined);
    }
} 