// Lista com as pizzas cadastradas
let pizzaria = [];

// Guarda temporariamente uma pizza que será alterada
let pizzaParaAlterar = null;

// Lista com os pedidos/vendas feitas
let vendas = [];

// Temporizador para esconder mensagem depois de um tempo
let timerMensagem;

// Função para mostrar uma mensagem (verde ou vermelha) por 5 segundos
function exibirMensagem(idElemento, texto, tipo) {
  clearTimeout(timerMensagem); // cancela mensagem anterior se ainda estiver visível
  
  const mensagem = document.getElementById(idElemento);
  mensagem.textContent = texto; // define o texto da mensagem
  mensagem.className = `mensagem ${tipo}`; // aplica classe CSS com a cor (sucesso ou erro)
  mensagem.classList.remove("hidden"); // mostra a mensagem

  // Esconde a mensagem depois de 5 segundos
  timerMensagem = setTimeout(() => {
    mensagem.classList.add("hidden");
  }, 5000);
}

// Função que mostra a aba clicada e esconde as outras
function mostrarAba(aba) {
  // esconde todas as abas
  document.getElementById("adicionar").classList.add("hidden");
  document.getElementById("cardapio").classList.add("hidden");
  document.getElementById("pedido").classList.add("hidden");
  document.getElementById("alterar").classList.add("hidden");
  document.getElementById("relatorio").classList.add("hidden");

  // mostra só a aba clicada
  document.getElementById(aba).classList.remove("hidden");
}

// Adiciona nova pizza ao cardápio
function adicionarPizza() {
  // pega os valores dos campos
  const sabor = document.getElementById("sabor").value;
  const ingredientes = document.getElementById("ingredientes").value;
  const valor = parseFloat(document.getElementById("valor").value);

  // se tudo estiver preenchido
  if (sabor && ingredientes && valor) {
    pizzaria.push({ sabor, ingredientes, valor }); // adiciona a pizza
    // limpa os campos
    document.getElementById("sabor").value = "";
    document.getElementById("ingredientes").value = "";
    document.getElementById("valor").value = "";
    atualizarTabela(); // atualiza a tabela
    exibirMensagem("mensgAdicionar", "Pizza adicionada com sucesso!", "sucesso");
  } else {
    exibirMensagem("mensgAdicionar", "Erro nas informações!", "erro");
  }
}

// Filtra pizzas pelo nome (sabor) enquanto digita
function pesquisarPizza() {
  const pesquisa = document.getElementById("pesquisar").value.toLowerCase();
  const resultados = pizzaria.filter((pizza) =>
    pizza.sabor.toLowerCase().includes(pesquisa)
  );
  atualizarTabela(resultados); // mostra só os resultados encontrados
}

// Busca pizza para alterar os dados
function buscarPizzaAlterar() {
  const busca = document.getElementById("busca-alterar").value.toLowerCase();
  pizzaParaAlterar = pizzaria.find((pizza) =>
    pizza.sabor.toLowerCase().includes(busca)
  );

  if (pizzaParaAlterar) {
    // mostra o formulário de alteração e preenche com os dados atuais
    document.getElementById("form-alterar").classList.remove("hidden");
    document.getElementById("novo-sabor").value = pizzaParaAlterar.sabor;
    document.getElementById("novo-ingredientes").value = pizzaParaAlterar.ingredientes;
    document.getElementById("novo-preco").value = pizzaParaAlterar.valor;
  } else {
    exibirMensagem("mensgAlterar", "Pizza não encontrada!", "erro");
  }
}

// Salva os dados novos da pizza alterada
function alterarPizza() {
  if (pizzaParaAlterar) {
    // pega os novos valores digitados
    const novoSabor = document.getElementById("novo-sabor").value;
    const novoIngredientes = document.getElementById("novo-ingredientes").value;
    const novoPreco = parseFloat(document.getElementById("novo-preco").value);

    if (novoSabor && novoIngredientes && novoPreco) {
      // atualiza os dados da pizza
      pizzaParaAlterar.sabor = novoSabor;
      pizzaParaAlterar.ingredientes = novoIngredientes;
      pizzaParaAlterar.valor = novoPreco;

      atualizarTabela(); // mostra os dados atualizados
      exibirMensagem("mensgAlterar", "Pizza alterada com sucesso!", "sucesso");
      document.getElementById("form-alterar").classList.add("hidden"); // esconde formulário
    } else {
      exibirMensagem("mensgAlterar", "Por favor, preencha todos os campos.", "erro");
    }
  }
}

// Atualiza a tabela com as pizzas (todas ou filtradas)
function atualizarTabela(lista = pizzaria) {
  const tabela = document.getElementById("tabela-pizzas");
  tabela.innerHTML = ""; // limpa a tabela

  // adiciona linha por linha na tabela
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

// Registra um novo pedido do cliente
function fazerPedido() {
  const pizzaPedido = document.getElementById("pizza-pedido").value.toLowerCase();
  const quantidade = parseInt(document.getElementById("quantidade-pedido").value);
  const clientePedido = document.getElementById("cliente-pedido").value.toLowerCase();

  // Validações
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

  // Procura a pizza pelo nome
  const pizzaEncontrada = pizzaria.find(pizza => pizza.sabor.toLowerCase() === pizzaPedido);

  if (!pizzaEncontrada) {
    exibirMensagem("mensgPedido", `A pizza "${pizzaPedido}" não foi encontrada na pizzaria.`, "erro");
    return;
  }

  // Adiciona venda à lista de vendas
  vendas.push({
    cliente: clientePedido,
    sabor: pizzaPedido,
    quantidade: quantidade,
    valorUnitario: pizzaEncontrada.valor,
    valorTotal: quantidade * pizzaEncontrada.valor
  });

  // Mensagem com resumo do pedido
  const totalGasto = quantidade * pizzaEncontrada.valor;
  exibirMensagem(
    "mensgPedido",
    `O cliente "${clientePedido}" fez um pedido de ${quantidade} pizza(s) ${pizzaPedido}. Valor total gasto: R$ ${totalGasto.toFixed(2)}.`,
    "sucesso"
  );

  atualizarRelatorio(); // atualiza o relatório

  // limpa os campos do pedido
  document.getElementById("pizza-pedido").value = "";
  document.getElementById("quantidade-pedido").value = "";
  document.getElementById("cliente-pedido").value = "";
}

// Mostra todas as vendas feitas no relatório
function atualizarRelatorio() {
  const tabela = document.getElementById("tabela-relatorio");
  const totalSpan = document.getElementById("total-faturado");

  tabela.innerHTML = ""; // limpa tabela
  let total = 0;

  // adiciona cada venda na tabela
  vendas.forEach(pedido => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${pedido.cliente}</td>
      <td>${pedido.sabor} (x${pedido.quantidade})</td>
      <td>R$ ${pedido.valorTotal.toFixed(2)}</td>
    `;
    tabela.appendChild(linha);
    total += pedido.valorTotal;
  });

  // mostra o total de dinheiro arrecadado
  totalSpan.textContent = total.toFixed(2);
}
