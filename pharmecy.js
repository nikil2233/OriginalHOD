document.addEventListener("DOMContentLoaded", () => {

  //array
  const cart = [];
  const cartBody = document.getElementById("cart-body");
  const totalPriceElement = document.getElementById("total-price");

  // add items to the cart
  const addToCart = (name, price, quantity) => {
    if (quantity <= 0) { 
      alert("Please enter a valid quantity.");
      return;
    }

    // Checking the item alredy exist in the shopping cart
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ name, price, quantity });
    }

    updateCart(); // Update the cart display
  };

  //remove items from the cart
  const removeFromCart = index => {
    cart.splice(index, 1); 
    updateCart(); 
  };

  //update the cart table and total price
  const updateCart = () => {
    cartBody.innerHTML = ""; 
    let totalPrice = 0; 

    cart.forEach((item, index) => {
      const row = document.createElement("tr"); // Create a table row

 
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>Rs ${item.price * item.quantity}</td>
        <td><button class="remove-item" data-index="${index}">Remove</button></td>
      `;

      cartBody.appendChild(row); 

  
      totalPrice += item.price * item.quantity;
    });

    // Update the total price
    totalPriceElement.textContent = `Rs ${totalPrice}`;

    attachRemoveHandlers(); 
  };

 
  const attachRemoveHandlers = () => {
    const removeButtons = document.querySelectorAll(".remove-item");

    removeButtons.forEach(button => {
      button.addEventListener("click", () => {
        const index = parseInt(button.dataset.index); 
        removeFromCart(index); 
      });
    });
  };

  // Add event listeners to all Add to Cart buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const name = button.dataset.name; 
      const price = parseFloat(button.dataset.price); 
      const quantityInput = button.previousElementSibling; 
      const quantity = parseInt(quantityInput.value) || 0; 

      addToCart(name, price, quantity); 
    });
  });

  // "Buy Now" button click
  const buyNowButton = document.getElementById("buy-now");

  buyNowButton.addEventListener("click", () => {
    if (cart.length === 0) { 
      alert("Your cart is empty!");
    } else {
      // Save the cart to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

    
      window.location.href = "check.html";
    }
  });
});


// Checkout page code
document.addEventListener("DOMContentLoaded", () => {

 
  const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
  const cartSummaryBody = document.getElementById("cart-summary").querySelector("tbody");

  //display the cart summary on the check page
  const displayCartSummary = () => {
    let totalPrice = 0; 

    cartData.forEach(item => {
      const row = document.createElement("tr"); 

      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>Rs ${item.price * item.quantity}</td>
      `;

      totalPrice += item.price * item.quantity; 
      cartSummaryBody.appendChild(row); 
    });

    // Add a row for the total price
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `
      <td colspan="2"><strong>Total</strong></td>
      <td><strong>Rs ${totalPrice}</strong></td>
    `;

    cartSummaryBody.appendChild(totalRow);
  };

  displayCartSummary(); 


  const checkoutForm = document.getElementById("checkout-form");

  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault(); 

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const paymentMethod = document.getElementById("payment-method").value;
    const cardNumber = document.getElementById("card-number").value;

 
    if (!name || !email || !address || !paymentMethod || !cardNumber) {
      alert("Please fill in all required fields.");
      return;
    }

    // thank you massage and crearing the shopping cart
    alert(`Thank you for your purchase, ${name}! Your order will be delivered soon.`);
    localStorage.removeItem("cart"); 
    window.location.href = "thankyou.html"; //rederecting 
  });
});
