const productInfo = document.querySelector(".products-info")
const count = document.querySelector(".cart-count")
const cartPage = document.querySelector(".cart-page")
const cartOptions = document.querySelector(".cart-options")
const shoppingCart = document.querySelector(".shopping-cart ")
const closeCart = document.querySelector(".close-cart")
let cart = [];

const currency = (price) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
    }).format(price);
};

const getProducts = async () => {
    const res = await fetch("https://dummyjson.com/products")
    const data = await res.json()
    const dataItems = data.products
    renderProducts(dataItems)
}
getProducts()

const renderProducts = (dataItems) => {
    dataItems.forEach((item) => {
        const html = `
          <div class="card shadow-xl">
          <img src="${item.thumbnail}" alt="Shoes" class="w-full h-52" />
          <div class="card-body font-semibold text-gray-800 py-8 px-6">
          <h2 class="card-title truncate">${item.title}</h2>
          <p class="truncate py-4">${item.description}</p>
          <p class="pb-4">${currency(item.price)}</p>
          <div class="card-actions flex items-center justify-between">
          <button id="${item.id}" class="cart-btn rounded bg-gray-200 p-2">Add to Cart</button>
          </div>
          </div>
          </div>
        `
        productInfo.insertAdjacentHTML("beforeend", html)
    })
    const addToCart = document.querySelectorAll(".cart-btn")
    const viewBtn = document.querySelectorAll(".view-btn")
    getProduct(addToCart,viewBtn)
}

const getProduct = async (addToCart,viewBtn) => {
    addToCart.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = e.target.id
            getCartPost(id)
            const cartItem = { quantity: 1 }
            cart = [...cart, cartItem]
            itemQuantity(cart)
        })
    })
}

const getCartPost = async (id) => {
    const res = await fetch(`https://dummyjson.com/products/${id}`)
    const item = await res.json()
    const html = `
     <div class="flex py-6 px-4">
  <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
    <img src="${item.thumbnail}" alt="${item.title}" class="h-full w-full object-cover object-center">
  </div>
  <div class="ml-4 flex flex-1 flex-col">
    <div class="flex justify-between">
      <h3>
        <a href="/">${item.title}</a>
      </h3>
      <p class="ml-4">${currency(item.price)}</p>
    </div>
    <p class="mt-1 text-sm text-gray-500"></p>
    <div class="flex flex-1 items-end justify-between text-sm">
      <p class="text-gray-500">Qty 1</p>
      <div class="flex">
        <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
      </div>
    </div>
  </div>
</div>
    `
    cartPage.insertAdjacentHTML("afterbegin", html)
}



const itemQuantity = (cart) => {
    let totalItem = 0
    cart.map(item => {
        totalItem += item.quantity;
    });
    count.innerText = totalItem
}

const cartInfo = () => {
    cartOptions.addEventListener("click", () => {
        shoppingCart.classList.remove("hidden")
    })
    closeCart.addEventListener("click", () => {
        shoppingCart.classList.add("hidden")
    })
}
cartInfo()
