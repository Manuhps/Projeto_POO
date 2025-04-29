// Função para salvar um utilizador no Local Storage
function saveUser(user) {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
  console.log('Utilizador salvo:', user); // Log para verificar o utilizador salvo
}

// Função para verificar login
function loginUser(username, password) {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  console.log('Utilizadores no Local Storage:', users); // Log para verificar os utilizadores no Local Storage
  return users.find(user => user.username === username && user.password === password);
}

// Criar utilizadores padrão (admin e regular) no Local Storage
if (!localStorage.getItem('users')) {
  saveUser({ username: 'admin', password: 'admin', userType: 'admin' });
  saveUser({ username: 'user', password: '123', userType: 'regular' });
  console.log('Utilizadores padrão criados:', JSON.parse(localStorage.getItem('users')));
}

// Evento de login
document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  console.log('Tentativa de login:', { username, password }); // Log para verificar os dados inseridos

  const user = loginUser(username, password);

  if (user) {
    console.log('Login bem-sucedido:', user); // Log para verificar o utilizador logado
    alert(`Bem-vindo, ${user.username}! Você é um ${user.userType}.`);
    // Salvar o utilizador logado no Local Storage
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    // Redirecionar para a página principal ou dashboard
    window.location.href = '../index.html';
  } else {
    console.log('Login falhou: Credenciais inválidas'); // Log para depuração
    alert('Credenciais inválidas. Tente novamente.');
  }
});