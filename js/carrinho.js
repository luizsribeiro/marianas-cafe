var listaCompra = getLista();
let tamanhoCarrinho = defineCarrinho();
let count = 0;

$.getJSON('../js/produtos/produtos.json', function (produtos) {
  exibeProdutos(produtos);
});

function exibeProdutos(produtos) {
  var listaDeProdutos = produtos;
  let arrayProdutos = JSON.parse(listaCompra);

  if (arrayProdutos !== null) {
    var tbl = document.getElementById('tabela-carrinho');
    var valorTotal = 0;

    tbl.innerHTML = '';

    let produtosLista = document.createElement('tbody');
    produtosLista.classList.add('produtosLista');

    for (let i = 0; i < arrayProdutos.length; i++) {
      let tr = document.createElement('tr');

      let produto = listaDeProdutos.find(function (item) {
        return item.Id === arrayProdutos[i].idProduto;
      });

      let precoFinal = produto.Preco * arrayProdutos[i].quant;
      valorTotal += precoFinal;
      precoFinal = precoFinal.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      });

      tr.innerHTML = `<td class="imagem-produto">
                        <img src="${produto.Imagem}" alt="">
                      </td>
                      <td class="divisor">|</td>
                      <td class="nome-produto">
                        <p>${produto.Nome}</p>
                        <span>(${produto.Marca})</span>
                      </td>
                      <td class="divisor">|</td>
                      <td class="descricao-produto">${produto.Descricao}</td>
                      <td class="divisor">|</td>
                      <td class="quantidade-produto">Quant: ${arrayProdutos[i].quant}</td>
                      <td class="incremento"><a onclick="mudaQuantidade(${arrayProdutos[i].idProduto}, 'inc')"><i class="fas fa-plus"></i></a></td>
                      <td class="decremento"><a onclick="mudaQuantidade(${arrayProdutos[i].idProduto}, 'dec')"><i class="fas fa-minus"></i></a></td>
                      <td class="divisor">|</td>
                      <td class="preco-final">${precoFinal}</td>
                      <td class="divisor">|</td>
                      <td class="apagar"><a onclick="apagarProduto(${arrayProdutos[i].idProduto})"><img src="../img/lixeira.png" alt=""></a></td>`;

      produtosLista.appendChild(tr);
    }

    tbl.appendChild(produtosLista);

    localStorage.setItem('valorTotal', valorTotal);

    document.getElementById('valorTotal').innerHTML = valorTotal.toLocaleString(
      'pt-br',
      {
        style: 'currency',
        currency: 'BRL',
      }
    );
  } else {
    alert('Insira ao menos 1 item ao carrinho de compras');
    window.location.href = 'index.html';
  }
}

function getLista() {
  let aux = localStorage.getItem('listaDeCompras');
  return aux;
}

function defineCarrinho() {
  let tamanho = JSON.parse(localStorage.getItem('listaDeCompras'));
  let total = 0;
  if (tamanho) {
    tamanho.forEach((element) => {
      total += element.quant;
    });

    document.getElementById('produtosQuant').innerHTML = '(' + total + ')';
  }
}

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById('botaoModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = 'flex';
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

function validaFormulario(value) {
  if (value == 'bol') {
    document.getElementById('form-cartao').style.display = 'none';
  } else {
    document.getElementById('form-cartao').style.display = 'block';
    geraParcelas();
  }
}

function geraParcelas() {
  var select = document.getElementById('parcelamento');
  var valorTotal = localStorage.getItem('valorTotal');
  var parcelas = 0;

  if (valorTotal > 150) {
    parcelas = 12;
  } else if (valorTotal < 150 && valorTotal > 80) {
    parcelas = 8;
  } else {
    parcelas = 3;
  }

  for (let i = 0; i < parcelas; i++) {
    let option = document.createElement('option');
    option.value = i;

    let valorParcela = valorTotal / (i + 1);

    option.innerHTML =
      i +
      1 +
      ' parcela(s) : ' +
      valorParcela.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      }) +
      ', sem juros.';

    select.appendChild(option);
  }
}

function finalizarPedido() {
  localStorage.clear();
  window.location.href = 'obrigado.html';
}

function apagarProduto(produto) {
  let arrayProdutos = JSON.parse(listaCompra);

  arrayProdutos.find(function (item) {
    if (item.idProduto === produto) {
      const index = arrayProdutos.indexOf(item);
      arrayProdutos.splice(index, 1);

      localStorage.setItem('listaDeCompras', JSON.stringify(arrayProdutos));
      document.location.reload(true);
    }
  });
}

function mudaQuantidade(produto, tipo) {
  let arrayProdutos = JSON.parse(listaCompra);

  arrayProdutos.find(function (item) {
    if (item.idProduto === produto && tipo === 'inc') {
      item.quant++;
    } else if (item.idProduto === produto && tipo === 'dec') {
      if (item.quant > 1) {
        item.quant--;
      } else {
        const index = arrayProdutos.indexOf(item);
        arrayProdutos.splice(index, 1);
      }
    }

    localStorage.setItem('listaDeCompras', JSON.stringify(arrayProdutos));
    document.location.reload(true);
  });
}
