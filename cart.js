const getItemsCart=()=>{
    
db.collection("cart-items").onSnapshot((snapshot) => {
  let cartItems=[]
    snapshot.docs.forEach((doc)=>{
        cartItems.push({
            id:doc.id,
            ...doc.data()
        })
    })
    generateCartItems(cartItems)
    
})

}

const generateCartItems=(cartItems)=>{
let itemsHTML='';
cartItems.forEach((item)=>{
    itemsHTML += `
            <div class="cart-item flex items-center pb-4 border-b border-gray-100">
                <div class="cart-item-image w-40 h-24 bg-white p-4 rounded-lg">
                    <img class="w-full h-full object-contain" src="${item.image}">
                </div>
                <div class="cart-item-details flex-grow">
                    <div class="cart-item-title font-bold text-sm text-gray-600">
                    ${item.name}
                    </div>
                  
                </div>
                <div class="cart-item-counter w-48 flex items-center">
                    <div  class="cart-item-decrease text-gray-400 bg-gray-100 rounded h-6 w-6 flex justify-center items-center hover:bg-gray-200 mr-2 cursor-pointer">
                        <i class="fas fa-chevron-left fa-xs"></i>
                    </div>
                    <h4 class="text-gray-400">x ${item.quantity}</h4>
                    <div  class="cart-item-increase text-gray-400 bg-gray-100 rounded h-6 w-6 flex justify-center items-center hover:bg-gray-200 ml-2 cursor-pointer">                                
                        <i class="fas fa-chevron-right fa-xs"></i>
                    </div>
                </div>
                <div class="cart-item-total-cost w-48 font-bold text-gray-400">
                    ${item.price * item.quantity}
                </div>
                <div   class="cart-item-delete w-10 font-bold text-gray-300 cursor-pointer hover:text-gray-400">
                    <i class="fas fa-times"></i>
                </div>
            </div>
    
    
    `

})
document.querySelector(".cart-items").innerHTML=itemsHTML

}
getItemsCart()