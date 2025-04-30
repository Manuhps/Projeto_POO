function exibirResultados(sugestoes) {
  const resultadosDiv = document.getElementById("resultados");
  resultadosDiv.innerHTML = ""; // Limpar resultados anteriores

  if (sugestoes.length === 0) {
    resultadosDiv.innerHTML = "<p>Nenhum resultado encontrado.</p>";
    return;
  }

  sugestoes.forEach(sugestao => {
    const caminhoDiv = document.createElement("div");
    caminhoDiv.classList.add("caminho");

    const titulo = document.createElement("h3");
    titulo.textContent = sugestao.nome;
    caminhoDiv.appendChild(titulo);

    sugestao.etapas.forEach(etapa => {
      const etapaDiv = document.createElement("div");
      etapaDiv.classList.add("etapa");

      etapaDiv.innerHTML = `
        <h4>${etapa.nome}</h4>
        <p><strong>Partida:</strong> ${etapa.partida}</p>
        <p><strong>Destino:</strong> ${etapa.destino}</p>
        <p><strong>Distância:</strong> ${etapa.distancia} km</p>
        <p><strong>Motivos de Interesse:</strong> ${etapa.motivosInteresse.join(", ")}</p>
        <p><strong>Alojamentos:</strong> ${etapa.alojamentos.join(", ")}</p>
      `;

      caminhoDiv.appendChild(etapaDiv);
    });

    resultadosDiv.appendChild(caminhoDiv);
  });
}

export { exibirResultados };