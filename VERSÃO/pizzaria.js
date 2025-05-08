function mostrarConteudo(conteudo) {
    // Esconde todas as seções
    document.getElementById("adicionar").classList.add("hidden");
    document.getElementById("cardapio").classList.add("hidden");

    // Mostra a seção correspondente ao botão clicado
    document.getElementById(conteudo).classList.remove("hidden");
}
