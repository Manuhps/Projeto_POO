import { CaminhoService } from '../services/caminhoService.js';

export class AdminController {
    constructor() {
        this.service = new CaminhoService();
        this.form = document.getElementById('caminho-form');
        this.caminhosLista = document.getElementById('caminhos-lista');
        
        this.inicializar();
    }

    async inicializar() {
        await this.service.carregarDados();
        this.inicializarEventos();
        this.atualizarLista();
        this.atualizarEstatisticas();
    }

    inicializarEventos() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        
        const caminhoId = document.getElementById('caminho-id').value;
        const caminho = {
            id: caminhoId ? parseInt(caminhoId) : this.service.caminhos.length + 1,
            nome: document.getElementById('nome').value,
            descricao: document.getElementById('descricao').value,
            dificuldade: document.getElementById('dificuldade').value,
            distancia: parseInt(document.getElementById('distancia').value),
            etapas: []
        };

        // Aqui você implementaria a lógica para salvar no servidor
        // Por enquanto, vamos apenas atualizar a interface
        if (caminhoId) {
            const index = this.service.caminhos.findIndex(c => c.id === parseInt(caminhoId));
            if (index !== -1) {
                this.service.caminhos[index] = caminho;
            }
        } else {
            this.service.caminhos.push(caminho);
        }

        this.atualizarLista();
        this.atualizarEstatisticas();
        this.form.reset();
        document.getElementById('caminho-id').value = '';
    }

    atualizarLista() {
        if (!this.caminhosLista) return;

        this.caminhosLista.innerHTML = this.service.caminhos.map(caminho => `
            <div class="caminho-item">
                <h3>${caminho.nome}</h3>
                <p>${caminho.descricao}</p>
                <p>Dificuldade: ${caminho.dificuldade}</p>
                <p>Distância: ${caminho.distancia}km</p>
                <div class="acoes">
                    <button onclick="editarCaminho(${caminho.id})">Editar</button>
                    <button onclick="excluirCaminho(${caminho.id})">Excluir</button>
                </div>
            </div>
        `).join('');
    }

    atualizarEstatisticas() {
        document.getElementById('total-caminhos').textContent = this.service.caminhos.length;
        document.getElementById('total-etapas').textContent = this.service.etapas.length;
        
        const totalAlbergues = this.service.etapas.reduce((total, etapa) => 
            total + etapa.albergues.length, 0);
        document.getElementById('total-albergues').textContent = totalAlbergues;
    }
}

// Inicializar o controller quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new AdminController();
});

// Funções globais para os botões
window.editarCaminho = function(id) {
    const caminho = this.service.caminhos.find(c => c.id === id);
    if (caminho) {
        document.getElementById('caminho-id').value = caminho.id;
        document.getElementById('nome').value = caminho.nome;
        document.getElementById('descricao').value = caminho.descricao;
        document.getElementById('dificuldade').value = caminho.dificuldade;
        document.getElementById('distancia').value = caminho.distancia;
    }
};

window.excluirCaminho = function(id) {
    if (confirm('Tem certeza que deseja excluir este caminho?')) {
        this.service.caminhos = this.service.caminhos.filter(c => c.id !== id);
        this.atualizarLista();
        this.atualizarEstatisticas();
    }
}; 