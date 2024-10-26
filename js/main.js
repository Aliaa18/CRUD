    /*****STart CRUD*****/
var productNameInput= document.getElementById("productName")
var productPriceInput= document.getElementById("productPrice")
var productCategoryInput= document.getElementById("productCategory")
var productDescriptionInput= document.getElementById("productDescription")
var searchInput = document.getElementById("searchInput")
var updateBtn = document.getElementById('updateBtn')
var addBtn = document.getElementById('addBtn')
var warn = document.getElementById('warn')
 var indexUpdate =0
 console.log(productCategoryInput , productDescriptionInput , productNameInput , productPriceInput);
    
     
  var productContainer =[]
  if(localStorage.getItem('products')!=null){
  productContainer = JSON.parse(localStorage.getItem('products'))
  display()
  }
     function add(){
   //  console.log(productNameInput.value);
   if(nameValidation() == true && priceValidation()==true && catValidation() && descValidation() ){
     var product ={
       productName : productNameInput.value ,
       productPrice : productPriceInput.value ,
       productCategory : productCategoryInput.value,
       productDescription : productDescriptionInput.value,
     }
          console.log(product);
         
          productContainer.push(product)
          localStorage.setItem("products" , JSON.stringify(productContainer))
          console.log(productContainer);
            display()
            clearForm()
        
     }
    }
      
     function display(){
                  var cartona =' '
                  for (var i = 0; i < productContainer.length; i++) {
                      cartona+=`
                      <tr>
                          <td>${productContainer[i].productName}</td>
                           <td>${productContainer[i].productPrice}</td>
                           <td>${productContainer[i].productCategory}</td>
                           <td>${productContainer[i].productDescription}</td>
                           <td> <button class="btn btn-outline-warning btn-sm" onclick="setData(${i})">Update</button>
                                <button class="btn btn-outline-danger btn-sm" onclick= "deleteProduct(${i})">Delete</button>
                            </td>
                            
                        </tr>
                      `
                     
                  }
                  document.getElementById("tableData").innerHTML=cartona
               }

   
              function deleteProduct(itemNumber){
               console.log(itemNumber);
               productContainer.splice(itemNumber , 1)
               localStorage.setItem('products' , JSON.stringify(productContainer))
                console.log(productContainer);
                display()

                   
              }

          function search (){
              var term = searchInput.value
               var cartona =' '
                  for (var i = 0; i < productContainer.length; i++) {
                     if(productContainer[i].productName.toLowerCase().includes(term.toLowerCase())){
                      cartona+=`
                      <tr>
                          <td>${productContainer[i].productName}</td>
                           <td>${productContainer[i].productPrice}</td>
                           <td>${productContainer[i].productCategory}</td>
                           <td>${productContainer[i].productDescription}</td>
                           <td> <button class="btn btn-outline-warning btn-sm">Update</button>
                                <button class="btn btn-outline-danger btn-sm" onclick= "deleteProduct(${i})">Delete</button>
                            </td>
                            
                        </tr>
                      `
                     }
                  }

                  document.getElementById("tableData").innerHTML=cartona 
          }

          function clearForm(){
          productNameInput.value=""
          productCategoryInput.value=""
          productPriceInput.value=""
          productDescriptionInput.value=""
          productNameInput.classList.remove('is-valid')
          productCategoryInput.classList.remove('is-valid')
          productPriceInput.classList.remove('is-valid')
          productDescriptionInput.classList.remove('is-valid')
          }

          function setData(index){
            indexUpdate =index
             var currentProduct= productContainer[index]   
             productNameInput.value = currentProduct.productName
             productPriceInput.value = currentProduct.productPrice
             productCategoryInput.value = currentProduct.productCategory
             productDescriptionInput.value = currentProduct.productDescription
             updateBtn.classList.remove("d-none")
             addBtn.classList.add("d-none")
                
          }

          function update() {

            var product ={
               productName : productNameInput.value ,
               productPrice : productPriceInput.value ,
               productCategory : productCategoryInput.value,
               productDescription : productDescriptionInput.value,
             }
                    productContainer.splice( indexUpdate , 1 , product)
                    localStorage.setItem("products" , JSON.stringify(productContainer))

                  //  console.log(indexUpdate);
                    display()
                    updateBtn.classList.add("d-none")
                    addBtn.classList.remove("d-none")
                    clearForm()


          }

    // Validation.
          function nameValidation(){
            var warn = document.getElementById('warn')
                   var text = productNameInput.value
                   var regexName =/^[A-Z][a-z]{3,8}$/
                        if(regexName.test(text)==true){
                   productNameInput.classList.add('is-valid')
                   productNameInput.classList.remove('is-invalid')
                   warn.classList.add('d-none')
              return true
                        }else{
                   productNameInput.classList.add('is-invalid')
                   productNameInput.classList.remove('is-valid')
                   warn.classList.remove('d-none')
              return false
                        } 
          }
          function priceValidation(){
            var PriceWarn = document.getElementById('PriceWarn')
            if(productPriceInput.value <= 20000){
              productPriceInput.classList.add('is-valid')
              productPriceInput.classList.remove('is-invalid')
              PriceWarn.classList.add('d-none')
              return true
            }else{
              productPriceInput.classList.add('is-invalid')
                   productPriceInput.classList.remove('is-valid')
                   PriceWarn.classList.remove('d-none')
              return false
            }
          }
          function catValidation(){
            var catWarn=document.getElementById('catWarn')
            var text = productCategoryInput.value
            var regexName =/^[A-Z][a-z]{2,8}$/
                 if(regexName.test(text)==true){
            productCategoryInput.classList.add('is-valid')
            productCategoryInput.classList.remove('is-invalid')
            catWarn.classList.add('d-none')
       return true
                 }else{
            productCategoryInput.classList.add('is-invalid')
            productCategoryInput.classList.remove('is-valid')
            catWarn.classList.remove('d-none')
       return false
                 } 
          }

          function descValidation(){
            var descWarn=document.getElementById('descWarn')
            var text = productDescriptionInput.value
            var regexName =/^[^]{20,1000}$/
                 if(regexName.test(text)==true){
            productDescriptionInput.classList.add('is-valid')
            productDescriptionInput.classList.remove('is-invalid')
            descWarn.classList.add('d-none')
       return true
                 }else{
            productDescriptionInput.classList.add('is-invalid')
            productDescriptionInput.classList.remove('is-valid')
            descWarn.classList.remove('d-none')
       return false
                 } 
            
          }