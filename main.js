let products=[
    {
        name: "Banana",
        description: "A yellow banana.Some say its a berry",
        price:9
    },
    {
        name: "Apple",
        description: "A red apple, sweet and tasty",
        price:7
    },
    {
        name: "Orange",
        description: "An orange. It's a orange",
        price:10
    }
];
// Display all products
function showProducts()
{
    let html='';
    //loop over products
    for (let product of products){
        html+=`
        <div class="product">
        <h2>${product.name}</h2>
        <div class="info">
        <p>${product.description}</p>
        <p>Price:<b>${product.price}</b></p>
        </div>
        <button class="remove" data-product-name="${product.name}"> Remove</button>
        <hr>
        </div>
        `;
    }
    //Add html to the document, products div
    document.querySelector('.products').innerHTML=html;
}


//Handle all click events
function handleEvents(){
    // Add event listener to entire body an listen for clicks
    document.querySelector('body').addEventListener('click',function(event){
        //Get the closest  product-class to where we clicked 
        let productClicked =event.target.closest('.product');
        //If you clikc somewhere unrelated, we just return
        if(!productClicked){return;}
        //Get the info-div from the clciked product
        let infoProduct= productClicked.querySelector('.info');
        //Ternary operator, if block-go none , if none-go block
        infoProduct.style.display=infoProduct.style.display==='block'? 'none':'block';
        // If the closest element is the remove button
        let removeButton=event.target.closest('.remove');
        if(removeButton){
            //Get the attribute data-product-name
        let productName = removeButton.getAttribute('data-product-name')
        // Remove product by name from array
            products = products.filter((product) =>  product.name!==productName);
            productClicked.remove();
           
        }
    });
        //Event listener for the add product form that listens for submit, and not click
    let addProductForm= document.querySelector('#add-product-form');
    addProductForm.addEventListener('submit', function(event){
        //Dont let the site reload when the  submit is clicked
        event.preventDefault();
        
        //get the values form the form
        let name = document.querySelector('#name').value;
        let description = document.querySelector('#description').value;
        let price = Number(document.querySelector('#price').value);
         //Error Handling,checks that all fields that are checked out
        if(name && description && price){
            //New product
            let newProduct={
                name: name,
                description: description,
                price: price
             };
            // Add the product to the products array
            products.push(newProduct);

            //Reset the form and show new div
            let productsDiv= document.querySelector('.products');
            productsDiv.innerHTML=' ';
            //Render the products again
            showProducts();
            console.log(products); //For debugging 
            //Reset the form
            addProductForm.reset();
        }else{
            alert ('please fill in all fields!');
        }


    });

    
}
    
showProducts();
handleEvents();