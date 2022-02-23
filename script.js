const person = window.prompt("qual seu nome")
const lista = [1,3,2345,3245,3456,34,634,6346,346,34643,2,34,14,1]
function getProducts(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts")
    promise.then(caseSuccess)
    promise.catch(caseError)
}
function caseSuccess(response){
    const infos = response.data
    console.log(infos)
    renderProducts(infos)
}
function caseError(){
    console.log("deuruim")
}
getProducts()


function renderProducts(infos){
    const productContainer = document.querySelector(".product-container")
    productContainer.innerHTML = ''
    for(i = 0; i < infos.length;i++)
    productContainer.innerHTML += `
        <div class="product">
        <img src="${infos[i].image}" alt="">
        <span><b>criador:</b> ${infos[i].owner}</span>
        </div>
    `
}
setInterval(getProducts,3000)