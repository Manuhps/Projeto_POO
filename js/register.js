// Função para salvar um utilizador no Local Storage
function saveUser(user) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }
  
  // Evento de registro
  document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
  
    const user = { username, password, userType: 'regular' };
  
    // Verifica se o utilizador já existe
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.username === username)) {
      alert('Este username já está em uso. Escolha outro.');
      return;
    }
  
    saveUser(user);
  
    alert('Utilizador registrado com sucesso!');
    this.reset(); // Limpa o formulário
    window.location.href = '../html/login.html'; // Redireciona para a página de login
  });