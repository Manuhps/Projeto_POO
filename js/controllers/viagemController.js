import { caminhos } from "../models/viagemModel.js";
import { exibirResultados } from "../views/viagemView.js";

// Função para preencher os menus suspensos
function preencherMenus() {
  const departureSelect = document.getElementById("departure");
  const destinationSelect = document.getElementById("destination");

  // Criar conjuntos para evitar duplicação de locais
  const locaisPartida = new Set();
  const locaisDestino = new Set();

  // Iterar pelos caminhos e etapas para preencher os menus
  caminhos.forEach(caminho => {
    caminho.etapas.forEach(etapa => {
      locaisPartida.add(etapa.partida);
      locaisDestino.add(etapa.destino);
    });
  });

  // Adicionar as opções ao menu de partida
  locaisPartida.forEach(local => {
    const option = document.createElement("option");
    option.value = local;
    option.textContent = local;
    departureSelect.appendChild(option);
  });

  // Adicionar as opções ao menu de destino
  locaisDestino.forEach(local => {
    const option = document.createElement("option");
    option.value = local;
    option.textContent = local;
    destinationSelect.appendChild(option);
  });
}

// Chamar a função para preencher os menus ao carregar a página
document.addEventListener("DOMContentLoaded", preencherMenus);

// Evento de submissão do formulário
document.getElementById("travel-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Evitar o comportamento padrão do formulário

  console.log("Formulário submetido"); // Log para verificar o evento

  // Obter os valores do formulário
  const departure = document.getElementById("departure").value;
  const destination = document.getElementById("destination").value;
  const days = parseInt(document.getElementById("days").value);

  console.log("Dados do formulário:", { departure, destination, days }); // Log para verificar os dados

  // Validar se os campos foram preenchidos
  if (!departure || !destination) {
    alert("Por favor, selecione um local de partida e um local de destino.");
    return;
  }

  // Filtrar os caminhos com base nos dados do formulário
  const caminhosFiltrados = caminhos.filter(caminho =>
    caminho.etapas.some(etapa =>
      etapa.partida === departure && etapa.destino === destination
    )
  );

  console.log("Caminhos filtrados:", caminhosFiltrados); // Log para verificar os caminhos filtrados

  // Gerar sugestões de etapas com base no número de dias
  const sugestoes = caminhosFiltrados.map(caminho => {
    const etapas = caminho.etapas.slice(0, days); // Selecionar etapas com base nos dias
    return {
      nome: caminho.nome,
      etapas: etapas
    };
  });

  console.log("Sugestões geradas:", sugestoes); // Log para verificar as sugestões

  // Atualizar a View com os resultados
  exibirResultados(sugestoes);
});