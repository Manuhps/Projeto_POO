import { CaminhoService } from '../services/caminhoService.js';

export class ItinerarioController {
    constructor() {
        this.caminhoService = new CaminhoService();

        this.form = document.getElementById('travel-form');
        this.partidaSelect = document.getElementById('departure');
        this.destinoSelect = document.getElementById('destination');
        this.resultadosDiv = document.getElementById('resultados');

        this.initialize();
    }

    async initialize() {
        // Espera que os dados do serviço estejam carregados
        await this.caminhoService.carregarDados();
        
        // Só adiciona o listener se o formulário existir na página
        if (this.form) {
            this.populateFormOptions();
            this.form.addEventListener('submit', this.handleFormSubmit.bind(this));
        }
    }

    populateFormOptions() {
        const caminhos = this.caminhoService.caminhos;
        const partidasUnicas = new Set();
        const destinosUnicos = new Set();

        caminhos.forEach(caminho => {
            const etapas = this.caminhoService.obterEtapasDoCaminho(caminho.id);
            if (etapas.length > 0) {
                partidasUnicas.add(etapas[0].partida);
                destinosUnicos.add(etapas[etapas.length - 1].destino);
            }
        });

        partidasUnicas.forEach(local => {
            const option = new Option(local, local);
            this.partidaSelect.add(option);
        });

        destinosUnicos.forEach(local => {
            const option = new Option(local, local);
            this.destinoSelect.add(option);
        });
    }

    handleFormSubmit(event) {
        event.preventDefault();

        // Verifica se o utilizador está logado
        const isLoggedIn = sessionStorage.getItem('loggedUser') !== null;

        if (!isLoggedIn) {
            // Se não estiver logado, mostra um alerta e redireciona
            alert('Por favor, faça login ou registe-se para planear a sua viagem.');
            window.location.href = 'html/login.html';
            return;
        }

        const diasViagem = parseInt(document.getElementById('days').value, 10);
        
        // Fecha o modal após a submissão
        const modal = document.getElementById('travel-modal');
        if (modal) modal.style.display = 'none';

        // Lógica de sugestão simplificada: sugere o primeiro caminho da lista
        const caminhoSugerido = this.caminhoService.caminhos[0];
        if (!caminhoSugerido) {
            this.resultadosDiv.innerHTML = '<p>Não foi possível encontrar caminhos.</p>';
            return;
        }

        const etapasDoCaminho = this.caminhoService.obterEtapasDoCaminho(caminhoSugerido.id);
        const totalEtapas = etapasDoCaminho.length;
        const etapasPorDia = Math.ceil(totalEtapas / diasViagem);
        
        const itinerarioDiario = [];
        for (let i = 0; i < diasViagem; i++) {
            const inicio = i * etapasPorDia;
            const fim = inicio + etapasPorDia;
            const etapasDoDia = etapasDoCaminho.slice(inicio, fim);
            
            if (etapasDoDia.length > 0) {
                itinerarioDiario.push({ dia: i + 1, etapas: etapasDoDia });
            }
        }
        
        this.renderResultados(caminhoSugerido, itinerarioDiario);
    }

    renderResultados(caminho, itinerario) {
        this.resultadosDiv.innerHTML = `
            <div class="itinerario-card">
                <h3>Sugestão de Viagem: ${caminho.nome}</h3>
                <p>${caminho.descricao}</p>
                <hr>
                ${itinerario.map(diaInfo => `
                    <div class="dia-etapa">
                        <h4>Dia ${diaInfo.dia}</h4>
                        <ul>
                            ${diaInfo.etapas.map(etapa => `<li>${etapa.nome} (${etapa.distancia} km)</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        `;
        this.resultadosDiv.scrollIntoView({ behavior: 'smooth' });
    }
}

// Garante que o DOM está carregado antes de instanciar o controller
document.addEventListener('DOMContentLoaded', () => {
    new ItinerarioController();
}); 