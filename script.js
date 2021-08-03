const getItems=()=>{
    db.collection("items").get().then((querySnapshot) => {
    //    console.log(querySnapshot)
       let items=[]
        querySnapshot.forEach((doc) => {
            items.push({
                id:doc.id,
                image:doc.data().image,
                name:doc.data().name,
                price:doc.data().price
            })
         });

        //  console.log(items)
        generateItems(items)
    });

}

const generateItems=(items)=>{
    let itemsHTML=""
    items.forEach((item)=>{
        itemsHTML+=`
        <div class="main-product mx-2 ">
        <div class="product-image w-48 h-52 bg-white rounded-lg p-4">
             <img class="w-full h-full object-contain" src="${item.image}" alt="">
        </div>
        <div class="product-name text-gray-700
        font-bold mt-2 text-sm
        ">
            ${item.name}
        </div>
        
       
      
        <div class="product-price font-bold text-gray-700
        text-lg">
           $  ${item.price} 
        </div>
        <div class="add-to-cart h-8 w-28 bg-yellow-500 flex items-center justify-center cursor-pointer text-white
        hover:bg-yellow-600 rounded text-md">
             Add  to cart
        </div>
    </div>      
        `
    })
    document.querySelector(".main-section-products").
    innerHTML=itemsHTML
    
    
}

getItems()
