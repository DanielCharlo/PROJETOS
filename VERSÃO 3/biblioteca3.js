let biblioteca = [];
    let livroParaAlterar = null;
    let vendas = [];

    function mostrarSecao(secao) {
      // Esconde todas as seções
      document.getElementById("cadastro").classList.add("hidden");
      document.getElementById("consulta").classList.add("hidden");
      document.getElementById("alterar").classList.add("hidden");
      document.getElementById("emprestimo").classList.add("hidden");
      document.getElementById("venda").classList.add("hidden");
      document.getElementById("relatorio").classList.add("hidden");

      // Mostra a seção selecionada
      document.getElementById(secao).classList.remove("hidden");
    }

    function adicionarLivro() {
      const titulo = document.getElementById("titulo").value;
      const autor = document.getElementById("autor").value;
      const ano = parseInt(document.getElementById("ano").value);

      if (titulo && autor && ano) {
        biblioteca.push({ titulo, autor, ano });
        document.getElementById("titulo").value = "";
        document.getElementById("autor").value = "";
        document.getElementById("ano").value = "";
        atualizarLista();
        alert("Livro adicionado com sucesso!");
      } else {
        alert("Por favor, preencha todos os campos.");
      }
    }

    function buscarLivro() {
      const busca = document.getElementById("busca").value.toLowerCase();
      const resultados = biblioteca.filter((livro) =>
        livro.titulo.toLowerCase().includes(busca)
      );
      atualizarLista(resultados);
    }

    function buscarLivroParaAlterar() {
      const busca = document.getElementById("busca-alterar").value.toLowerCase();
      livroParaAlterar = biblioteca.find((livro) =>
        livro.titulo.toLowerCase().includes(busca)
      );

      if (livroParaAlterar) {
        document.getElementById("form-alterar").classList.remove("hidden");
        document.getElementById("novo-titulo").value = livroParaAlterar.titulo;
        document.getElementById("novo-autor").value = livroParaAlterar.autor;
        document.getElementById("novo-ano").value = livroParaAlterar.ano;
      } else {
        alert("Livro não encontrado.");
      }
    }

    function alterarLivro() {
      if (livroParaAlterar) {
        const novoTitulo = document.getElementById("novo-titulo").value;
        const novoAutor = document.getElementById("novo-autor").value;
        const novoAno = parseInt(document.getElementById("novo-ano").value);

        if (novoTitulo && novoAutor && novoAno) {
          livroParaAlterar.titulo = novoTitulo;
          livroParaAlterar.autor = novoAutor;
          livroParaAlterar.ano = novoAno;

          atualizarLista();
          alert("Livro alterado com sucesso!");
          document.getElementById("form-alterar").classList.add("hidden");
        } else {
          alert("Por favor, preencha todos os campos.");
        }
      }
    }

    function atualizarLista(lista = biblioteca) {
      const tabela = document.getElementById("lista-livros");
      tabela.innerHTML = "";

      lista.forEach((livro) => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
          <td>${livro.titulo}</td>
          <td>${livro.autor}</td>
          <td>${livro.ano}</td>
        `;
        tabela.appendChild(linha);
      });
    }

    //Empréstimo
    function emprestarlivro() {
      const livroparaemprestar = document.getElementById("livro-emprestimo").value;
      const usuarioemprestimo = document.getElementById("usuario-emprestimo").value;
      const memprestimo = document.getElementById("mensagememprestimo");

      const livroEncontrado = biblioteca.find(
        (livro) => livro.titulo.toLowerCase() === livroparaemprestar.toLowerCase()
      );

      if (livroEncontrado) {
        memprestimo.textContent = `O livro "${livroparaemprestar}" foi emprestado para ${usuarioemprestimo}.`;
      } else {
        memprestimo.textContent = `O livro "${livroparaemprestar}" não foi encontrado na biblioteca.`;
      }
    }

    //Venda
    function gerarrelatorio() {
      let titulo = document.getElementById("venda-titulo").value.trim();
      let preco = parseFloat(document.getElementById("venda-preco").value);
      let comprador = document.getElementById("venda-comprador").value.trim();
    
      const livroExiste = biblioteca.some(
        (livro) => livro.titulo.toLowerCase() === titulo.toLowerCase()
      );
    
      if (!livroExiste) {
        alert("Livro não encontrado na biblioteca.");
        document.getElementById("venda-titulo").value = "";
        document.getElementById("venda-preco").value = "";
        document.getElementById("venda-comprador").value = "";
        return;
      }
    
      if (titulo && !isNaN(preco) && comprador) {
        vendas.push({ titulo, preco, comprador });
    
        document.getElementById("venda-titulo").value = "";
        document.getElementById("venda-preco").value = "";
        document.getElementById("venda-comprador").value = "";
    
        atualizarRelatorioVendas();
        alert("Venda registrada com sucesso!");
      } else {
        alert("Preencha todos os campos para registrar a venda.");
      }
    }
    
    function atualizarRelatorioVendas() {
      const lista = document.getElementById("lista-vendas");
      const totalSpan = document.getElementById("total-vendas");
      lista.innerHTML = "";
    
      let total = 0;
      vendas.forEach(venda => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
          <td>${venda.titulo}</td>
          <td>R$ ${venda.preco.toFixed(2)}</td>
          <td>${venda.comprador}</td>
        `;
        lista.appendChild(linha);
        total += venda.preco;
      });
    
      totalSpan.textContent = total.toFixed(2);
    }
        