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
function selectOption(element){
    let container = element.parentNode
    let arrayContainer = container.querySelectorAll(".option-container")
    const childrenList = element.children
    for(i = 0; i < arrayContainer.length;i++){
        let children = arrayContainer[i].children
        for(c = 0; c < childrenList.length;c++){
            if (children[c].classList.contains("selected")){
                children[c].classList.remove("selected")
            }
        }
    }
    for(i = 0; i < childrenList.length;i++){
        if(childrenList[i].classList.contains("circle-background")){
            childrenList[i].classList.add("selected")
        }
    }
}
function verifyInput(){
    console.log("entrei")
    const input = document.querySelector(".image-reference input")
    const link = input.value
    const https = /^https/.test(link)
    const png = /.png$/.test(link)
    const jpg = /.jpg$/.test(link)
    if (https){
        if (png || jpg){
            postProduct(link)
        }
    }
}

// setInterval(getProducts,3000)
