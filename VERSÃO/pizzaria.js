let pizzaria = [];

function mostrarConteudo(conteudo) {
document.getElementById("adicionar").classList.add("hidden");
document.getElementById("cardapio").classList.add("hidden");

document.getElementById(conteudo).classList.remove("hidden");
}

function adicionarPizza() {
const sabor = document.getElementById("sabor").value;
const igredientes = document.getElementById("igredientes").value;
const valor = parseFloat(document.getElementById("valor").value);

if (sabor && igredientes && valor) {
    pizzaria.push({sabor , igredientes , valor})
    document.getElementById("sabor").value = ""
    document.getElementById("igredientes").value = ""
    document.getElementById("valor").value = ""
    alert("Pizza adicionada com sucesso!")
} else {
    alert("Erro nas informações!")
}


}