export class GamificacaoModel {
  constructor() {
    this.pontos = 0;
    this.badges = [];
  }

  adicionarPontos(valor) {
    // Lógica para adicionar pontos
  }

  atribuirBadge(badge) {
    // Lógica para atribuir badge
  }

  listarBadges() {
    // Lógica para listar badges
    return this.badges;
  }
}

class UsuarioProgresso {
  constructor(username) {
    this.username = username;
    this.pontosTotal = 0;
    this.caminhosCompletados = [];
    this.etapasCompletadas = [];
    this.nivel = 1;
  }

  adicionarPontos(pontos) {
    this.pontosTotal += pontos;
    this.atualizarNivel();
  }

  atualizarNivel() {
    this.nivel = Math.floor(this.pontosTotal / 100) + 1;
  }
}

function salvarProgresso(progresso) {
  localStorage.setItem(`progresso_${progresso.username}`, JSON.stringify(progresso));
}

function carregarProgresso(username) {
  const data = localStorage.getItem(`progresso_${username}`);
  return data ? JSON.parse(data) : new UsuarioProgresso(username);
}

export { UsuarioProgresso, salvarProgresso, carregarProgresso };