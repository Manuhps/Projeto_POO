import { CaminhoService } from '../services/caminhoService.js';

export class CaminhosController {
    constructor() {
        this.service = new CaminhoService();
        this.container = document.getElementById('caminhos-container');
        this.modal = document.getElementById('login-modal');
        this.closeModal = document.querySelector('.close-modal');
        
        if (!this.container) {
            console.error("O elemento 'caminhos-container' não foi encontrado no DOM.");
            return;
        }

        this.inicializar();
    }

    async inicializar() {
        await this.service.carregarDados();
        this.mostrarCaminhos();
        this.inicializarEventos();
    }

    inicializarEventos() {
        // Fechar modal ao clicar no X
        this.closeModal?.addEventListener('click', () => this.fecharModal());
        
        // Fechar modal ao clicar fora dele
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.fecharModal();
            }
        });
    }

    mostrarCaminhos() {
        const caminhos = this.service.caminhos;
        this.renderCaminhos(caminhos);

        // Adicionar eventos aos botões de detalhes
        this.container.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('btn-details')) {
                this.verificarLogin(e);
            }
        });
    }

    renderCaminhos(caminhos) {
        this.container.innerHTML = ''; // Limpa o container
        caminhos.forEach(caminho => {
            const card = document.createElement('div');
            card.className = 'caminho-card';
            card.innerHTML = `
                <img src="${caminho.imagem || '../img/default-image.jpg'}" alt="Imagem do ${caminho.nome}">
                <div class="caminho-card-content">
                    <h3>${caminho.nome}</h3>
                    <p>${caminho.descricao}</p>
                    <div class="info-boxes">
                        <div class="info-box">
                            <span>Dificuldade</span>
                            <strong>${caminho.dificuldade}</strong>
                        </div>
                        <div class="info-box">
                            <span>Distância</span>
                            <strong>${caminho.distancia}</strong>
                        </div>
                    </div>
                    <button class="btn-details" data-id="${caminho.id}">Ver Detalhes</button>
                </div>
            `;
            this.container.appendChild(card);
        });
    }

    verificarLogin(event) {
        const isLoggedIn = sessionStorage.getItem('loggedUser') !== null;
        if (!isLoggedIn) {
            event.preventDefault(); // Impede a ação padrão
            
            // Ativa o modal de login/registo
            const modal = document.getElementById('login-required-modal');
            if (modal) {
                modal.style.display = 'block';
            }
        } else {
            // Se logado, continua para a página de detalhes
            const caminhoId = event.target.dataset.id;
            window.location.href = `detalhes.html?id=${caminhoId}`;
        }
    }

    abrirModal() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Previne rolagem do body
    }

    fecharModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = ''; // Restaura rolagem do body
    }
}

// Garante que o DOM está carregado antes de instanciar o controller
document.addEventListener('DOMContentLoaded', () => {
    new CaminhosController();
});