import { caminhos, carregarCaminhos } from '../models/caminhosModel.js';

export class CaminhosController {
    constructor() {
        this.caminhos = [];
        this.inicializar();
    }

    async inicializar() {
        await carregarCaminhos();
        this.caminhos = caminhos;
        this.setupEventListeners();
        this.renderizarCaminhos();
    }

    setupEventListeners() {
        const searchInput = document.getElementById('search');
        const dificuldadeSelect = document.getElementById('dificuldade');

        searchInput.addEventListener('input', () => this.filtrarCaminhos());
        dificuldadeSelect.addEventListener('change', () => this.filtrarCaminhos());
    }

    filtrarCaminhos() {
        const searchTerm = document.getElementById('search').value.toLowerCase();
        const dificuldade = document.getElementById('dificuldade').value;

        const caminhosFiltrados = this.caminhos.filter(caminho => {
            const nomeMatch = caminho.nome.toLowerCase().includes(searchTerm);
            const dificuldadeMatch = !dificuldade || caminho.dificuldade === dificuldade;
            return nomeMatch && dificuldadeMatch;
        });

        this.renderizarCaminhos(caminhosFiltrados);
    }

    renderizarCaminhos(caminhos = this.caminhos) {
        const container = document.getElementById('caminhos-container');
        container.innerHTML = '';

        if (caminhos.length === 0) {
            container.innerHTML = '<p class="sem-resultados">Nenhum caminho encontrado.</p>';
            return;
        }

        caminhos.forEach(caminho => {
            const card = document.createElement('div');
            card.className = 'caminho-card';
            card.innerHTML = `
                <h2>${caminho.nome}</h2>
                <span class="dificuldade dificuldade-${caminho.dificuldade.toLowerCase()}">
                    ${caminho.dificuldade}
                </span>
                <p class="info">${caminho.descricao}</p>
                <p class="info">Distância total: ${caminho.distancia_total} km</p>
                <p class="info">Número de etapas: ${caminho.etapas.length}</p>
                <a href="detalhes.html?id=${caminho.id}" class="btn-detalhes">Ver Detalhes</a>
            `;
            container.appendChild(card);
        });
    }
}

// Inicializar o controller quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new CaminhosController();
}); 