import { getUsers, saveUser } from "../js/models/loginModel.js";

// Evento de registro
document.getElementById('register-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('register-username').value.trim();
  const password = document.getElementById('register-password').value.trim();

  // Validação básica
  if (username.length < 3 || password.length < 6) {
    alert('O username deve ter pelo menos 3 caracteres e a password pelo menos 6 caracteres.');
    return;
  }

  // Verifica se o utilizador já existe
  const users = getUsers();
  if (users.some(u => u.username === username)) {
    alert('Este username já está em uso. Escolha outro.');
    return;
  }

  // Salvar o utilizador
  const user = { username, password, userType: 'regular' };
  saveUser(user);

  alert('Utilizador registrado com sucesso!');
  setTimeout(() => {
    window.location.href = '../html/login.html';
  }, 2000); // Redireciona após 2 segundos
});