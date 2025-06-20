import { CaminhoService } from '../services/caminhoService.js';

export class DetalhesController {
    constructor() {
        this.service = new CaminhoService();
        this.caminhoId = new URLSearchParams(window.location.search).get('id');
        
        this.inicializar();
    }

    async inicializar() {
        await this.service.carregarDados();
        this.carregarDetalhes();
        this.inicializarEventos();
    }

    carregarDetalhes() {
        const caminho = this.service.caminhos.find(c => c.id === parseInt(this.caminhoId));
        if (!caminho) return;

        // Preencher informações básicas
        document.getElementById('caminho-nome').textContent = caminho.nome;
        document.getElementById('caminho-dificuldade').textContent = caminho.dificuldade;
        document.getElementById('caminho-dificuldade').classList.add(`dificuldade-${caminho.dificuldade}`);
        document.getElementById('caminho-distancia').textContent = `${caminho.distancia}km`;
        document.getElementById('caminho-descricao').textContent = caminho.descricao;

        // Carregar etapas
        const etapas = this.service.obterEtapasDoCaminho(caminho.id);
        document.getElementById('etapas-lista').innerHTML = etapas.map(etapa => `
            <div class="etapa-card">
                <h3>${etapa.nome}</h3>
                <p>Distância: ${etapa.distancia}km</p>
                <p>Duração: ${etapa.duracao}</p>
                <div class="pontos-interesse">
                    <h4>Pontos de Interesse:</h4>
                    <ul>
                        ${etapa.pontosInteresse.map(ponto => `<li>${ponto}</li>`).join('')}
                    </ul>
                </div>
                <div class="albergues">
                    <h4>Albergues:</h4>
                    <ul>
                        ${etapa.albergues.map(albergue => `<li>${albergue}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `).join('');

        // Carregar mapa (imagem do Google Maps)
        document.getElementById('mapa-imagem').src = `../img/mapas/${caminho.id}.jpg`;

        // Definir pontos de gamificação
        document.getElementById('pontos-caminho').textContent = caminho.distancia; // 1 ponto por km
    }

    inicializarEventos() {
        const btnFavorito = document.getElementById('btn-favorito');
        if (btnFavorito) {
            btnFavorito.addEventListener('click', () => this.adicionarFavorito());
        }
    }

    adicionarFavorito() {
        const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
        if (!favoritos.includes(this.caminhoId)) {
            favoritos.push(this.caminhoId);
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
            alert('Caminho adicionado aos favoritos!');
        } else {
            alert('Este caminho já está nos favoritos!');
        }
    }
}

// Inicializar o controller quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new DetalhesController();
}); 