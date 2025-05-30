function exibirMensagem(texto, tipo) {
    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = texto;
    // Adiciona a classe de estilo (sucesso ou erro)
    mensagem.className = `mensagem ${tipo}`;
    mensagem.classList.remove("hidden");

    // Remove a mensagem após 3 segundos
    setTimeout(() => {
        mensagem.classList.add("hidden")
    }, 3000);
}

function validarLogin() {
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    // Usuário e senha fixos para validação
    // (Você pode substituir por algo mais avançado)
    const usuarioCorreto = "admin";
    const senhaCorreta = "1234";

    if (usuario === usuarioCorreto && senha === senhaCorreta) {
        exibirMensagem("Login realizado com sucesso!", "sucesso");
        setTimeout (() => {
            // Redireciona para a pagina principal
            window.location.href ="login.html";
        }, 1000); // Aguarda 1 segundo antes de redirecionar
    }else {
        exibirMensagem("Usuario ou senha incorretos.", "erro");
    }
}  
