// Classe para representar um utilizador
class User {
    constructor(username, password, userType) {
      this.username = username;
      this.password = password;
      this.userType = userType;
    }
  }
  
  // Função para salvar utilizadores no Local Storage
  function saveUser(user) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }
  
  // Função para obter todos os utilizadores do Local Storage
  function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
  }
  
  // Função para verificar login
  function loginUser(username, password) {
    const users = getUsers();
    return users.find(user => user.username === username && user.password === password);
  }
  
  // Criar utilizadores padrão (admin e regular) no Local Storage
  if (!localStorage.getItem('users')) {
    saveUser(new User('admin', 'admin', 'admin'));
    saveUser(new User('user', '123', 'regular'));
  }
  
  export { saveUser, getUsers, loginUser };