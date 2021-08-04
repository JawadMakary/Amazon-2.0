function getCartItems() {
    //liveData(change without refreshing using (onsnapshot)
    //snapshot have a eventListener onChange
    //onSnapshot creates a web socket=>listen to any change in the database
    //)
    db.collection("cart-items").onSnapshot((snapshot) => {
        let totalCount = 0;
        snapshot.docs.forEach((doc)=>{
            totalCount += doc.data().quantity;
        })
        // console.log(totalCount)
        setCartCounter(totalCount)
    })
   
}
const setCartCounter=(totalCount)=>{
    document.querySelector(".cart-item-number").innerText = totalCount;

}

getCartItems()