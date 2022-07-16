let shop = document.getElementById('shop');

let shopItemsData = [
    {
        id: 1,
        name:'Casual Shirt',
        price:45,
        desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        img : 'images/img-1.jpg'
    },
    {
        id: 2,
        name:'Office Shirt',
        price:50,
        desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        img : 'images/img-2.jpg'
    },
    {
        id: 3,
        name:'T-Shirt',
        price:45,
        desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        img : 'images/img-3.jpg'
    },
    {
        id: 4,
        name:'Mens Suit',
        price:300,
        desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        img : 'images/img-4.jpg'
    }
]

let basket = [];

let generateShop = () => {
return (shop.innerHTML = shopItemsData.map((x) => {
 let { id,name,price,desc,img } = x
  return ` <div id=product-id-${id} class="item">
  <img width="220" src=${img} alt="">
  <div class="details">
      <h3>${name}</h3>
      <p>${desc}</p>
      <div class="price-quantity">
          <h2>${price}</h2>
           <div class="button">
              <i onclick="decreament(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">0</div>
              <i onclick="increament(${id})" class="bi bi-plus-lg"></i>
           </div>
      </div>
  </div>
  </div>`
}).join(""))
};

generateShop();

let increament = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem);
  if(search === undefined){
      basket.push({id:selectedItem,item:1})
  } else {
      search.item += 1;
  }
  update(selectedItem);
}

let decreament = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem);
  if(search.item === 0) return 
   else {
      search.item -= 1;
  }
  update(selectedItem);
}

let update = (id) => {
 console.log(id);
 let search = basket.find((x) => x.id === id);
 document.getElementById(id).innerHTML=search.item;
 calculation();
}

let calculation = () => {
let cartIcon = document.getElementById("cartAmount");
cartIcon.innerHTML = basket.map((x) =>  x.item).reduce((x,y) =>  x + y,0);
}