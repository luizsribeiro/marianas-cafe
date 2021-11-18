const chavePedidos = 'pedidos'
const divPedidos = document.getElementById('pedidos')
let pedidos = []

function carregarPedidosPorUsuario(id){
    $.getJSON('../js/usuarios/pedidos.json', function (pedidos) {
        let listaPedidos = []
        for(let pedido of pedidos){
            if(pedido.idUsuario == id){
                listaPedidos.push(pedido)
            }
        }
        saveObject(chavePedidos, listaPedidos)
    });
    pedidos = getObject(chavePedidos)
}

function gerarCardsDePedido(){
    for(let pedido of pedidos){
        let html = `<div class="card-pedido">
        <div class="info-pedido">
            <h3>COD: ${pedido.id}</h3>
            <small>${pedido.data}</small>
        </div>
        <div class="itens-pedido">`
        
        html += gerarCardsItemPedido(pedido.id)

        html += `</div>
            <div class="total-pedido">
                <h3>Total:</h3>
            <span>R$ ${pedido.total}</span>
            <small>${pedido.status}</small>
            </div>
        </div>`

        divPedidos.innerHTML += html
    }
}

function gerarCardsItemPedido(idPedido){
    let html = ''
    for(let pedido of pedidos){
        if(pedido.id == idPedido){
            for(let item of pedido.itens){
                html += `<div class="item-pedido" data-tooltip="${item.nome}">
                    <img src="${item.imagem}">
                    <span>x${item.quantidade}</span>
                </div>`
            }
        }
    }
    return html
}

carregarPedidosPorUsuario(1)
gerarCardsDePedido()