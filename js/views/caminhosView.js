function exibirCaminhos(caminhos) {
  const container = document.getElementById("caminhos-grid");
  container.innerHTML = "";

  caminhos.forEach(caminho => {
    const card = criarCaminhoCard(caminho);
    container.appendChild(card);
  });
}

function criarCaminhoCard(caminho) {
  const card = document.createElement("div");
  card.className = "caminho-card";
  card.onclick = () => abrirDetalhesCaminho(caminho.id);

  card.innerHTML = `
    <img src="${caminho.imagem}" alt="${caminho.nome}" onerror="this.src='img/default-caminho.jpg'">
    <div class="caminho-card-content">
      <h3>${caminho.nome}</h3>
      <p>${caminho.descricao}</p>
      <div class="caminho-stats">
        <div class="stat">
          <div class="stat-value">${caminho.distanciaTotal}km</div>
          <div>Distância</div>
        </div>
        <div class="stat">
          <div class="stat-value">${caminho.duracao}</div>
          <div>Duração</div>
        </div>
        <div class="stat">
          <div class="stat-value">${caminho.pontos}</div>
          <div>Pontos</div>
        </div>
      </div>
    </div>
  `;

  return card;
}

function abrirDetalhesCaminho(caminhoId) {
  window.location.href = `detalhes-caminho.html?id=${caminhoId}`;
}

export { exibirCaminhos };