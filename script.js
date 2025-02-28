async function fetchProducts() {
  try {
    console.log("Fetching products...");

    const response = await fetch("https://fakestoreapi.com/products");

    console.log("Response Status:", response.status); 

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const products = await response.json();
    console.log("Fetched Products:", products);

    createProductCard(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    document.getElementById("products").innerHTML = `
      <div class="error">
        Failed to load products. Please try again later.
      </div>
    `;
  }
}

function createProductCard(products) {
  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = "";
  if (products.length === 0) {
    productsContainer.innerHTML = '<div class="error">No products found</div>';
    return;
  }
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.title}">
      </div>
      <div class="product-info">
        <h2 class="product-name" title="${product.title}">${product.title}</h2>
        <p class="product-description" title="${product.description}">${
      product.description
    }</p>
        <div class="product-footer">
          <span class="product-price">$${product.price.toFixed(2)}</span>
          <button class="add-to-cart" data-id="${
            product.id
          }">Add to Cart</button>
        </div>
      </div>
    `;
    productsContainer.appendChild(productCard);
  });
  // document.querySelectorAll(".add-to-cart").forEach((button) => {
  //   button.addEventListener("click", handleAddToCart);
  // });
}
// function handleAddToCart(event) {
//   const productId = event.target.getAttribute("data-id");
//   console.log(`Product ${productId} added to cart`);
// }

document.addEventListener("DOMContentLoaded", fetchProducts);
