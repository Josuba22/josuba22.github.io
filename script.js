async function busca(){
    let procura = await fetch("listaProdutos.json")
    let produtos = await procura.json()
    //console.log(produtos)
    let listaDiv = document.getElementById("lista_card")

    for(let produto of produtos){
        listaDiv.innerHTML +=`
            <div class="cards" data-id="${produto.id}">
                <div class="cards-img">
                        <img 
                            src="${produto.img[0]}"
                            width="30%"
                            height="auto"
                        >
                </div>

                <div class="cards-info">
                    <div class="nome">
                        <h3> ${produto.nome} </h3>
                    </div>

                    <div class="descricao">
                        <p class="produto-descricao"> ${produto.descricaoBreve} </p>
                    </div>

                    <div class="cards-info-valores">
                        <span class="produto-sem-desconto"> R$ ${(produto.valorSemDesconto).toFixed(2).replace(".",",")} </span>
                        <span class="produto-com-desconto"> R$ ${(produto.valorComDesconto).toFixed(2).replace(".",",")} </span>
                    </div>
                </div>
            </div>
        `
    }

    let elementosCards = document.querySelectorAll(".cards")
    //se for usar o IN a estrutura é desse modo:
    /*for(let card in elementosCards){
        elementosCards[card].addEventListener()
    }*/
    for(let card of elementosCards){
        card.addEventListener("click", cliqueCard)
    }
}

busca()

//a função é colocada fora da função busca() pq ñ será gerada uma promessa;
function cliqueCard(){
    let elementoId = this.getAttribute("data-id")
    //alert(elementoId)
    //para "debugar" o cód basta adicionar uma alert na frente do cód ==> alert(window.location.href);
    window.location.href = "detalhes.html?prod-id=" + elementoId
}