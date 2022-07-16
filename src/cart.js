let label = document.getElementById('label');
let ShippingCart = document.getElementById('shopping-cart');


let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) =>  x.item).reduce((x,y) =>  x + y,0);
    }
    
calculation();

let generateCartItems = () => {
    if(basket.length != 0) {
        return (ShippingCart.innerHTML = basket.map((x) => {
            let {id,item} = x;
            let search = shopItemsData.find((y) => y.id === id) || []
            return `
            <div class="cart-item">
             <img width="100" src=${search.img} />
             <div class="details">
             <div class="title-price-x">
             <h4 class="title-price">
             <p>${search.name}</p>
             <p class="cart-item-price">$ ${search.price}</p>
             </h4>
             <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
             </div>
             <div class="button">
              <i onclick="decreament(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increament(${id})" class="bi bi-plus-lg"></i>
           </div>
             <h3>$ ${item * search.price}</h3>
             </div>
            </div>`
        }).join(""))
    }
    else {
      ShippingCart.innerHTML = ``;
      label.innerHTML = `<h2>Cart is Empty</h2>
      <a href="index.html">
      <button class="HomeBtn">Back to home</button>
      </a>`  
    }
}

generateCartItems();

let increament = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);
    if(search === undefined){
        basket.push({id:selectedItem,item:1})
    } else {
        search.item += 1;
    }
    generateCartItems();
    update(selectedItem);
    localStorage.setItem("data",JSON.stringify(basket));
  }
  
  let decreament = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);
    if (search === undefined) return;
    else if (search.item === 0) return 
     else {
        search.item -= 1;
    }
   
    update(selectedItem);
    basket = basket.filter((x) => x.item !== 0 );
    generateCartItems();
    localStorage.setItem("data",JSON.stringify(basket));
  }
  
  let update = (id) => {
   console.log(id);
   let search = basket.find((x) => x.id === id);
   document.getElementById(id).innerHTML=search.item;
   calculation();
   Totalamount();
  }

  let removeItem = (id) => {
      let selectedItem = id;
      basket = basket.filter((x) => x.id !== selectedItem);
      generateCartItems();
      Totalamount();
      localStorage.setItem("data",JSON.stringify(basket));
  }

  let clearCart = () =>{
      basket = [];
      generateCartItems();
      localStorage.setItem("data",JSON.stringify(basket));
  }

  let Totalamount = () => {
      if(basket.length !== 0){
      let amount = basket.map((x) => {
          let {item,id} = x;
          let search = shopItemsData.find((y) => y.id === id) || [];
          return item * search.price;
      }).reduce((x,y) => x+y,0);
      label.innerHTML = `<h2>Total Bill : $ ${amount}</h2>
      <button class="checkout"> Checkout</button>
      <button onclick="clearCart()" class="removeAll">Clear Cart</button>
      `
      }else return;
  }

  Totalamount();
