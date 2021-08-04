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
    getTotalCost(cartItems)
})

}
const getTotalCost=(items)=>{
    let totalCost=0;
    items.forEach((item)=>{
        totalCost += (item.price * item.quantity);
    })
    document.querySelector(".total-cost-number").innerText=
    ` $ ${totalCost}`
    

}

 const decreaseCount=(itemId)=>{
     let cartItem=db.collection("cart-items").doc(itemId)
     cartItem.get().then(function(doc){
         if(doc.exists){
             if(doc.data().quantity>1){
                cartItem.update({
                    quantity:doc.data().quantity-1 
                })
             }
             else{
                 deleteItem(itemId)
             }
           
         }
     })
 }

 const increaseCount=(itemId)=>{
    let cartItem=db.collection("cart-items").doc(itemId)
    cartItem.get().then(function(doc){
        if(doc.exists){
            if(doc.data().quantity>0){
               cartItem.update({
                   quantity:doc.data().quantity+1 
               })
            }
          
        }
    })
}
const deleteItem=(itemId)=>{
    db.collection("cart-items").doc(itemId).delete();
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
                    <div data-id="${item.id}" class="cart-item-decrease text-gray-400 bg-gray-100 rounded h-6 w-6 flex justify-center items-center hover:bg-gray-200 mr-2 cursor-pointer">
                        <i class="fas fa-chevron-left fa-xs"></i>
                    </div>
                    <h4 class="text-gray-400">x ${item.quantity}</h4>
                    <div data-id="${item.id}" class="cart-item-increase text-gray-400 bg-gray-100 rounded h-6 w-6 flex justify-center items-center hover:bg-gray-200 ml-2 cursor-pointer">                                
                        <i class="fas fa-chevron-right fa-xs"></i>
                    </div>
                </div>
                <div class="cart-item-total-cost w-48 font-bold text-gray-400">
                    ${item.price * item.quantity}
                </div>
                <div  data-id="${item.id}"  class="cart-item-delete w-10 font-bold text-gray-300 cursor-pointer hover:text-gray-400">
                    <i class="fas fa-times"></i>
                </div>
            </div>
    
    
    `

})
document.querySelector(".cart-items").innerHTML=itemsHTML
createEventListeners()
}
const createEventListeners=()=>{
let decreaseButtons=document.querySelectorAll(".cart-item-decrease")
let increaseButtons=document.querySelectorAll(".cart-item-increase")
let deleteButtons=document.querySelectorAll(".cart-item-delete")
deleteButtons.forEach((btn_del)=>{
    btn_del.addEventListener("click",function(){
        deleteItem(btn_del.dataset.id)
    })
})
decreaseButtons.forEach((button)=>{
    button.addEventListener("click",function(){
       decreaseCount(button.dataset.id)
    })
    
})
increaseButtons.forEach((btn)=>{
   btn.addEventListener("click",function(){
       increaseCount(btn.dataset.id)
     })
})
}




getItemsCart()