const person = window.prompt("qual seu nome")
const input = document.querySelector(".image-reference input")
let productRecipe = [false,false,false]
let url = ''
input.addEventListener("keyup",() =>{
    verifyForm()
})


function getProducts(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts")
    promise.then(caseSuccess)
    promise.catch(caseError)
}
function caseSuccess(response){
    const infos = response.data
    renderProducts(infos)
}
function caseError(){
    window.alert("Houve um erro ao carregar os produtos! Recarregue a página ou continue navegando :)")
}
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
    const container = element.parentNode
    const arrayOption = container.querySelectorAll(".option-container")
    const childrenList = element.children
    for(i = 0; i < arrayOption.length;i++){
        let children = arrayOption[i].children
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
    verifyForm()
}
function verifyInput(){
    const link = input.value
    const https = /^https/.test(link)
    const png = /.png$/.test(link)
    const jpg = /.jpg$/.test(link)
    if (https){
        if (png || jpg){
            url = link
            return true
        }
    }
}
function verifyProductForm(){
    const modelContainer = document.querySelector(".model-container")
    const arrayModel = modelContainer.querySelectorAll(".option-container")
    
    const neckContainer = document.querySelector(".neck-container")
    const arrayNeck = neckContainer.querySelectorAll(".option-container")
    
    const materialContainer = document.querySelector(".material-container")
    const arrayMaterial = materialContainer.querySelectorAll(".option-container")
    
    let verifyModelIsTrue = false
    for(i = 0; i < arrayModel.length;i++){
        let arrayChildren = arrayModel[i].children
        for(c = 0; c < arrayChildren.length;c++){
            if(arrayChildren[c].classList.contains("selected")){
                productRecipe[0] = arrayChildren[1]
                verifyModelIsTrue = true
            }
        }
    }
    let verifyNeckIsTrue = false
    for(i = 0; i < arrayNeck.length;i++){
        let arrayChildren = arrayNeck[i].children
        for(c = 0; c < arrayChildren.length;c++){
            if(arrayChildren[c].classList.contains("selected")){
                productRecipe[1] = arrayChildren[1]
                verifyNeckIsTrue = true
            }
        }
    }

    
    let verifyMaterialIsTrue = false
    for(i = 0; i < arrayMaterial.length;i++){
        let arrayChildren = arrayMaterial[i].children
        for(c = 0; c < arrayChildren.length;c++){
            if(arrayChildren[c].classList.contains("selected")){
                productRecipe[2] = arrayChildren[1]
                verifyMaterialIsTrue = true
            }
        }
    }
    if(verifyModelIsTrue && verifyNeckIsTrue && verifyMaterialIsTrue){
        return true
    }
}
function turnPostButtonAvaible(){
    const finishButton = document.querySelector(".image-reference button")
    finishButton.style.backgroundColor = '#404EED'
    finishButton.setAttribute("onclick","postProduct()")
}
function postProduct(){
    const model = productRecipe[0].textContent
    const neck = productRecipe[1].textContent
    const material = productRecipe[2].textContent
    const object = {
        "model": model,
        "neck": neck,
        "material": material,
        "image": url,
        "owner": person,
        "author": person
    }

    const promise = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts',object)
    promise.then(() => {window.alert("produto postado!")})
    promise.catch((response) =>{
        window.alert("Houve algum erro!, tente novamente mais tarde :)")
        getProducts()
    })
    
}
function clearProductInfos(){
    productRecipe = []
}
function verifyForm(){
    const productFormIsTrue = verifyProductForm()
    const inputIsTrue = verifyInput()
    if(productFormIsTrue && inputIsTrue){
        turnPostButtonAvaible()
    }
}


getProducts()
setInterval(getProducts,3000)