let pizzaria = [];

function mostrarConteudo(conteudo) {
document.getElementById("adicionar").classList.add("hidden");
document.getElementById("cardapio").classList.add("hidden");

document.getElementById(conteudo).classList.remove("hidden");
}

function adicionarPizza() {
const sabor = document.getElementById("sabor").value;
const ingredientes = document.getElementById("ingredientes").value;
const valor = parseFloat(document.getElementById("valor").value);

if (sabor && ingredientes && valor) {
    pizzaria.push({sabor , ingredientes , valor})
    document.getElementById("sabor").value = ""
    document.getElementById("ingredientes").value = ""
    document.getElementById("valor").value = ""
    alert("Pizza adicionada com sucesso!")
    atualizarTabela();
} else {
    alert("Erro nas informações!")
}
}
function pesquisarPizza(){
    const pesquisa = document.getElementById("pesquisar").value.toLowerCase();
    const resultados = pizzaria.filter((pizza) => pizza.sabor.toLowerCase().includes(pesquisa));
    atualizarTabela(resultados);


function atualizarTabela(lista = pizzaria) {
      const tabela = document.getElementById("tabela-pizzas");
      tabela.innerHTML = "";

      lista.forEach((pizza) => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
          <td>${pizza.sabor}</td>
          <td>${pizza.ingredientes}</td>
          <td>${pizza.valor.toFixed(2)}</td>
        `;
        tabela.appendChild(linha);
      });
    }
}