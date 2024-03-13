async function procurar(){
    let buscar = await fetch("listaProdutos.json")
    let produtos = await buscar.json()

    let parametrosURL = new URLSearchParams(window.location.search)
    //alert(window.location.search) //Debug do código
    let idProduto = parametrosURL.get("prod-id")

    let indiceProd = null
    for(let x in produtos){
        if(produtos[x].id == idProduto){
            indiceProd = x
        }
    }

    document.title = produtos[indiceProd].nome

    document.getElementById("detalhes").innerHTML += `
        <div class="cards-detalhes">
            <h1> ${produtos[indiceProd].nome} </h1>
            <img src="${produtos[indiceProd].img[0]}" id="img-frame" height="250" width="auto" style="border: 1px solid #c1c1c1; border-radius: 10px;">
            <div class="mini-img" id="mini-img">
                
            </div>

            <p class="produto-descricao"> ${produtos[indiceProd].descricaoBreve} </p>
            <div class="grupoValores">
                <span class="produto-com-desconto"> R$ ${(produtos[indiceProd].valorComDesconto).toFixed(2).replace(".", ",")} </span>
                <span class="produto-sem-desconto"> R$ ${(produtos[indiceProd].valorSemDesconto).toFixed(2).replace(".", ",")} </span>
            </div>
        </div>
    `

    let divMini = document.getElementById("mini-img")
    for(let i of produtos[indiceProd].img){
        divMini.innerHTML +=`<img src="${i}" class="miniatura" onclick="trocaImagem('${i}')" width="80" height="80" style="border: 1px solid #c1c1c1; border-radius: 8px;"/>`
    }

    /*let miniCards = document.getElementsByClassName("miniatura")*/ //outra forma de selecionar todos os elementos da lista
    let miniCards = document.querySelectorAll(".miniatura")
    for (let card of miniCards){
        card.addEventListener("mouseover", alteraImg);
    }
}

function alteraImg(){
    let frame = document.getElementById("img-frame");
    frame.src = this.getAttribute("src");
    /*document.getElementById("img-frame").src = this.getAttribute("src");*/ //outra forma de fazer
}

procurar()