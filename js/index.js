// Seleciona o botão "Voltar ao topo"
const goTopButton = document.querySelector('.go-top');

// Adiciona o evento de clique para rolar ao topo
goTopButton.addEventListener('click', function () {
  window.scrollTo({
    top: 0, // Define a posição para o topo da página
    behavior: 'smooth' // Adiciona uma rolagem suave
  });
});
 // Seleciona o botão do menu hambúrguer e o menu lateral
const navToggle = document.querySelector('.nav-toggle');
const sideNav = document.querySelector('.side-nav');

// Abre o menu lateral ao clicar no botão hambúrguer
navToggle.addEventListener('click', function () {
  sideNav.classList.add('active'); // Adiciona a classe 'active' para mostrar o menu
});

// Fecha o menu lateral ao mover o cursor para fora da área do menu
sideNav.addEventListener('mouseleave', function () {
  sideNav.classList.remove('active'); // Remove a classe 'active' para esconder o menu
});

// Verificar se o utilizador está logado
let loggedInUser = null; // Declare a variável globalmente

document.addEventListener('DOMContentLoaded', function () {
  const authButtons = document.getElementById('auth-buttons');
  const sideNav = document.querySelector('.side-nav');
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  if (loggedInUser) {
    // Ocultar os botões de Login e Registo
    authButtons.style.display = 'none';

    // Exibir uma mensagem de boas-vindas
    const sideNavList = document.querySelector('.side-nav ul');
    const welcomeMessage = document.createElement('li');
    welcomeMessage.textContent = `Bem-vindo, ${loggedInUser.username}!`;
    welcomeMessage.style.color = '#e0a419'; // Estilo opcional
    sideNavList.prepend(welcomeMessage);

    // Adicionar botão de logout na parte inferior
    const logoutContainer = document.createElement('div');
    logoutContainer.className = 'logout-container';
    logoutContainer.innerHTML = `<button id="logout-button" class="btn btn-logout">Logout</button>`;
    sideNav.appendChild(logoutContainer);

    // Evento de logout
    document.getElementById('logout-button').addEventListener('click', function () {
      localStorage.removeItem('loggedInUser');
      window.location.reload(); // Recarregar a página
    });
  }
});
// Seleciona os elementos do modal
const modal = document.getElementById('travel-modal');
const openFormButton = document.getElementById('open-form');
const closeButton = document.querySelector('.close-button');

// Abre o modal ao clicar no botão
openFormButton.addEventListener('click', function (e) {
  e.preventDefault(); // Evita o comportamento padrão do link
  modal.style.display = 'block';
});

// Fecha o modal ao clicar no botão de fechar
closeButton.addEventListener('click', function () {
  modal.style.display = 'none';
});

// Fecha o modal ao clicar fora do conteúdo
window.addEventListener('click', function (e) {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});