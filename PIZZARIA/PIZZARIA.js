let pizzaria = [];
let pizzaParaAlterar = null;
let vendas = [];

let timerMensagem;

function exibirMensagem(idElemento, texto, tipo) {
  clearTimeout(timerMensagem);
  
  const mensagem = document.getElementById(idElemento);
  mensagem.textContent = texto;
  
  mensagem.className = `mensagem ${tipo}`;
  mensagem.classList.remove("hidden");

  timerMensagem = setTimeout(() => {
    mensagem.classList.add("hidden");
  }, 5000);
}

function mostrarAba(aba) {
  document.getElementById("adicionar").classList.add("hidden");
  document.getElementById("cardapio").classList.add("hidden");
  document.getElementById("pedido").classList.add("hidden");
  document.getElementById("alterar").classList.add("hidden");
  document.getElementById("relatorio").classList.add("hidden");

  document.getElementById(aba).classList.remove("hidden");
}

function adicionarPizza() {
  const sabor = document.getElementById("sabor").value;
  const ingredientes = document.getElementById("ingredientes").value;
  const valor = parseFloat(document.getElementById("valor").value);

  if (sabor && ingredientes && valor) {
    pizzaria.push({ sabor, ingredientes, valor });
    document.getElementById("sabor").value = "";
    document.getElementById("ingredientes").value = "";
    document.getElementById("valor").value = "";
    atualizarTabela();
    exibirMensagem("mensgAdicionar", "Pizza adicionada com sucesso!", "sucesso");
  } else {
    exibirMensagem("mensgAdicionar", "Erro nas informações!", "erro");
  }
}

function pesquisarPizza() {
  const pesquisa = document.getElementById("pesquisar").value.toLowerCase();
  const resultados = pizzaria.filter((pizza) =>
    pizza.sabor.toLowerCase().includes(pesquisa)
  );
  atualizarTabela(resultados);
}

function buscarPizzaAlterar() {
  const busca = document.getElementById("busca-alterar").value.toLowerCase();
  pizzaParaAlterar = pizzaria.find((pizza) =>
    pizza.sabor.toLowerCase().includes(busca)
  );

  if (pizzaParaAlterar) {
    document.getElementById("form-alterar").classList.remove("hidden");
    document.getElementById("novo-sabor").value = pizzaParaAlterar.sabor;
    document.getElementById("novo-ingredientes").value = pizzaParaAlterar.ingredientes;
    document.getElementById("novo-preco").value = pizzaParaAlterar.valor;
  } else {
    exibirMensagem("mensgAlterar", "Pizza não encontrada!", "erro");
  }
}

function alterarPizza() {
  if (pizzaParaAlterar) {
    const novoSabor = document.getElementById("novo-sabor").value;
    const novoIngredientes = document.getElementById("novo-ingredientes").value;
    const novoPreco = parseFloat(document.getElementById("novo-preco").value);

    if (novoSabor && novoIngredientes && novoPreco) {
      pizzaParaAlterar.sabor = novoSabor;
      pizzaParaAlterar.ingredientes = novoIngredientes;
      pizzaParaAlterar.valor = novoPreco;

      atualizarTabela();
      exibirMensagem("mensgAlterar", "Pizza alterada com sucesso!", "sucesso");
      document.getElementById("form-alterar").classList.add("hidden");
    } else {
      exibirMensagem("mensgAlterar", "Por favor, preencha todos os campos.", "erro");
    }
  }
}

function atualizarTabela(lista = pizzaria) {
  const tabela = document.getElementById("tabela-pizzas");
  tabela.innerHTML = "";

  lista.forEach((pizza) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${pizza.sabor}</td>
      <td>${pizza.ingredientes}</td>
      <td>R$ ${pizza.valor.toFixed(2)}</td>
    `;
    tabela.appendChild(linha);
  });
}

function fazerPedido() {
  const pizzaPedido = document.getElementById("pizza-pedido").value.toLowerCase();
  const quantidade = parseInt(document.getElementById("quantidade-pedido").value);
  const clientePedido = document.getElementById("cliente-pedido").value.toLowerCase();

  if (!pizzaPedido) {
    exibirMensagem("mensgPedido", "Por favor, digite o sabor da pizza.", "erro");
    return;
  }

  if (!clientePedido) {
    exibirMensagem("mensgPedido", "Por favor, digite o nome do cliente.", "erro");
    return;
  }

  if (!quantidade || quantidade < 1) {
    exibirMensagem("mensgPedido", "Por favor, digite uma quantidade válida (1 ou mais).", "erro");
    return;
  }

  const pizzaEncontrada = pizzaria.find(pizza => pizza.sabor.toLowerCase() === pizzaPedido);

  if (!pizzaEncontrada) {
    exibirMensagem("mensgPedido", `A pizza "${pizzaPedido}" não foi encontrada na pizzaria.`, "erro");
    return;
  }

  for (let i = 0; i < quantidade; i++) {
    vendas.push({
      cliente: clientePedido,
      sabor: pizzaPedido,
      valor: pizzaEncontrada.valor,
    });
  }


  const vendasCliente = vendas.filter(venda => venda.cliente === clientePedido);
  const totalPizzas = vendasCliente.length;
  const totalGasto = quantidade * pizzaEncontrada.valor;


  exibirMensagem(
    "mensgPedido",
    `O cliente "${clientePedido}" fez um pedido de ${quantidade} pizza(s) ${pizzaPedido}. Valor total gasto: R$ ${totalGasto.toFixed(2)}.`,
    "sucesso"
  );
  
  atualizarRelatorio();


  document.getElementById("pizza-pedido").value = "";
  document.getElementById("quantidade-pedido").value = 1;
  document.getElementById("cliente-pedido").value = "";
}

function atualizarRelatorio() {
  const tabela = document.getElementById("tabela-relatorio");
  const totalSpan = document.getElementById("total-faturado");
  
  tabela.innerHTML = "";
  
  let total = 0;

  vendas.forEach(venda => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${venda.cliente}</td>
      <td>${venda.sabor}</td>
      <td>R$ ${venda. valor.toFixed(2)}</td>
    `;
    tabela.appendChild(linha);
    total += venda.valor;
  });

  totalSpan.textContent = total.toFixed(2);
}

function alternarTema() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}
