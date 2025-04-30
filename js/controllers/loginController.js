import { loginUser } from "../models/loginModel.js"; // Importar a função do Model
import { showAlert, redirectTo } from "../views/loginView.js"; // Importar funções da View

document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    console.log('Formulário submetido'); // Verificar se o evento está sendo capturado

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    console.log('Dados inseridos:', { username, password }); // Verificar os dados inseridos

    const user = loginUser(username, password);

    if (user) {
        console.log('Login bem-sucedido:', user); // Verificar o utilizador autenticado
        showAlert(`Bem-vindo, ${user.username}!`);
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        redirectTo('../index.html');
    } else {
        console.log('Login falhou: Credenciais inválidas'); // Verificar falha no login
        showAlert('Credenciais inválidas. Tente novamente.');
    }
});