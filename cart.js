
// let userdata = JSON.parse(localStorage.getItem('cartItems'));
// let container = document.querySelector(".container-1");

// fetch('https://dummyjson.com/products/${userdata}')
// .then(res => res.json())
// .then((res)=>{
//     console.log(res)
// })
// .catch((err)=>{
//     console.log(err)
// })

let userdata = JSON.parse(localStorage.getItem("cartItems")) || []; // Ensure userdata is an array
let container = document.querySelector(".container-1");

if (userdata.length === 0) {
  container.innerHTML = `<p>No items in your cart.</p>`;
} else {
  userdata.forEach((id) => {
    fetch(`https://dummyjson.com/products/${id}`) // Use backticks for template literal
      .then((res) => {
        return res.json();
      })
      .then((product) => {
        console.log(product); // Debugging
        // Display product details in the container
        container.innerHTML += `
          <div class="card" style="width: 18rem; margin: 10px;">
            <img class="card-img-top" src="${product.thumbnail}" alt="${product.title}">
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">${product.description}</p>
              <p class="card-price">Price: $${product.price}</p>
            </div>
          </div>
        `;
      })
      .catch((err) => {
        console.error(err);
        container.innerHTML += `<p>Error loading product with ID ${id}. ${err.message}</p>`;
      });
  });
}
