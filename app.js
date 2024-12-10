let globalArray = []
let container = document.querySelector("#container");
let userinput = document.querySelector("#userinput");
let serachItem = document.querySelector("#search-item")
let checkbtn = document.querySelector('#CHECK')
let addCount = 0;
let icon = document.querySelector("#icon")
fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then((res) => {
    let data = res.products; 
    container.innerHTML = "";

    data.map((item,index) => {
      // Append each card to the container
      container.innerHTML += `
        <div class="card" style="width: 18rem; margin: 10px;">
          <img class="card-img-top" src="${item.thumbnail}" alt="${item.title}">
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">${item.description}</p>
            <p class="card-price">Price: $${item.price}</p>
              <a href="#" class="btn btn-primary" onclick="addtoCart(${item.id})">Buy Now</a>

          </div>
        </div>
      `;
    });
  })
  .catch((error) => {
    container.innerHTML = `<p>Error loading products. Please try again later.</p>`;
  });

function addtoCart(id){
  console.log(id)
  addCount++; 
  globalArray.push(id);
  console.log("Items in Cart:", globalArray);
  icon.innerHTML = `
    <a class="nav-link" href="#" id="icon">
      <i class="fa-solid fa-truck"></i> <span>${addCount}</span>
    </a>
  `;

  console.log(`Item added to cart: ${id}`);
}

userinput.addEventListener('input', () => {
  userSearch();
});



function userSearch() {
  let query = userinput.value.toLowerCase().trim();
  console.log("Search Query:", query);

  fetch(`https://dummyjson.com/products/search?q=${query}`)
    .then((res) => res.json())
    .then((res) => {
      console.log("API Response:", res);

      const searchResults = res.products;
      serachItem.innerHTML = ""; // Clear previous results

      if (searchResults.length > 0) {
        searchResults.forEach((item) => {
          serachItem.innerHTML += `
            <div class="card" style="width: 18rem; margin: 10px;">
              <img class="card-img-top" src="${item.thumbnail}" alt="${item.title}">
              <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text">${item.description}</p>
                <p class="card-price">Price: $${item.price}</p>
              </div>
            </div>
          `;
  checkbtn.disabled = true

        });
        container.innerHTML = " "
      } else {
        serachItem.innerHTML = `
          <div style="margin: 20px; font-size: 18px; color: red;">
            No products found matching "${query}". Please try different keywords.
          </div>
        `;
      }

    })
    .catch((error) => {
      console.error("Error fetching search results:", error);
      serachItem.innerHTML = `<p>Error fetching search results. Please try again later.</p>`;
    });
    container.innerHTML = ""


    
}

function checkout(){
  localStorage.setItem('cartItems', JSON.stringify(globalArray)); 
   window.location = 'check.html'
   console.log(globalArray)
}