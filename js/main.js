var slideIndex = 1;
showSlides(slideIndex);
var listaCompra = getLista();
let carrinhoDeCompras = [];
let tamanhoCarrinho = defineCarrinho();
let count = 0;

$.getJSON('../js/produtos/produtos.json', function (data) {
  exibeProdutos(data);
});

function getUsuario() {
  let usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  if (usuario != undefined) {
    document.getElementById('login').hidden = true;
    let usuarioHtml = document.getElementById('usuarioLogado');
    usuarioHtml.hidden = false;
    usuarioHtml.innerHTML = usuario.nome;
  }
}

function changeImage(e, numImg) {
  var elems = document.querySelector('.active');
  if (elems !== null && numImg !== '') {
    elems.classList.remove('active');
    e.target.className = 'active';
  }

  var servicesCarousel = document.getElementById('servicesCarousel');
  switch (numImg) {
    case '1':
      servicesCarousel.src = 'img/nossos-produtos/1.png';
      break;
    case '2':
      servicesCarousel.src = 'img/nossos-produtos/2.png';
      break;
    case '3':
      servicesCarousel.src = 'img/nossos-produtos/3.png';
      break;
    case '4':
      servicesCarousel.src = 'img/nossos-produtos/4.png';
      break;
    case '5':
      servicesCarousel.src = 'img/nossos-produtos/5.png';
      break;
    default:
      break;
  }
}

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName('mySlides');
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  slides[slideIndex - 1].style.display = 'block';
}

function exibeProdutos(result) {
  let arrayProdutos = result;

  if (arrayProdutos !== null) {
    var tbl = document.getElementById('lista-produtos');

    tbl.innerHTML = '';

    let produtosLista = document.createElement('tbody');
    produtosLista.classList.add('produtosLista');

    var lastId = 0;

    for (let i = 0; i < 3; i++) {
      let tr = document.createElement('tr');

      for (let y = 0; y < 3; y++) {
        let cell = document.createElement('td');
        let cellText = document.createElement('div');
        cellText.classList.add('item-produto');
        let precoFinal = arrayProdutos[lastId].Preco.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        });

        cellText.innerHTML = `<img
          src="${arrayProdutos[lastId].Imagem}"
          alt=""
        />
        <p class="title-produto">${arrayProdutos[lastId].Nome}</p>
        <p class="marca-produto">(${arrayProdutos[lastId].Marca})</p>
        <p class="desc-produto">
        ${arrayProdutos[lastId].Descricao}
        </p>
        <p class="preco-produto">${precoFinal}</p>
        <button class="botao-comprar" onclick="adicionaProduto(${arrayProdutos[lastId].Id})">Comprar</button>`;

        cell.appendChild(cellText);
        tr.appendChild(cell);

        lastId = arrayProdutos[lastId].Id;
      }

      produtosLista.appendChild(tr);
    }

    tbl.appendChild(produtosLista);
  } else {
    alert('Insira ao menos 1 valor para a lista');
  }
}

function adicionaProduto(idProduto) {
  let aux = { count, idProduto, quant: 1 };
  count++;

  if (listaCompra) {
    carrinhoDeCompras = JSON.parse(listaCompra);

    if (carrinhoDeCompras.some((item) => item.idProduto === idProduto)) {
      let produto = carrinhoDeCompras.find(function (item) {
        return item.idProduto === idProduto;
      });
      produto.quant++;
    } else {
      carrinhoDeCompras.push(aux);
    }
  } else {
    carrinhoDeCompras.push(aux);
  }

  localStorage.setItem('listaDeCompras', JSON.stringify(carrinhoDeCompras));
  listaCompra = getLista();
  defineCarrinho();
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

function abrirPopup() {
  document.getElementById('popup').style.display = 'block';
}

function fecharPopup() {
  document.getElementById('popup').style.display = 'none';
}

function sucesso() {
  alert('Assinatura realizada com sucesso!');
}

//Chat Suporte
function abrirForm() {
  document.getElementById("myForm").style.display = "block";
}

function fecharForm() {
  document.getElementById("myForm").style.display = "none";
}

function enviar() {
  alert("Recebemos sua mensagem, e logo retornaremos!");
}

