document.addEventListener("DOMContentLoaded", () => {
  const cartBody = document.getElementById("cart-body");
  const totalPriceElement = document.getElementById("total-price");
  const buyNowButton = document.getElementById("buy-now");
  const addFavoriteButton = document.getElementById("add-favorite");
  const applyFavoritesButton = document.getElementById("apply-favorites");
  const resetFavoritesButton = document.getElementById("reset-favorites");

  let cart = [];

  const updateCartDisplay = () => {
      cartBody.innerHTML = "";
      let total = 0;

      cart.forEach((item, index) => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${item.name}</td>
              <td>${item.quantity}</td>
              <td>Rs ${item.price * item.quantity}</td>
              <td><button class="remove-item" data-index="${index}">Remove</button></td>
          `;
          cartBody.appendChild(row);
          total += item.price * item.quantity;
      });

      totalPriceElement.textContent = `Rs ${total}`;
  };

  document.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", () => {
          const name = button.dataset.name;
          const price = parseInt(button.dataset.price);
          const quantityInput = button.previousElementSibling;
          const quantity = parseInt(quantityInput.value);

          if (!quantity || quantity <= 0) {
              alert("Please enter a valid quantity.");
              return;
          }

          const existingItem = cart.find(item => item.name === name);
          if (existingItem) {
              existingItem.quantity += quantity;
          } else {
              cart.push({ name, price, quantity });
          }

          updateCartDisplay();
          quantityInput.value = "";
      });
  });

  
  cartBody.addEventListener("click", e => {
      if (e.target.classList.contains("remove-item")) {
          const index = e.target.dataset.index;
          cart.splice(index, 1);
          updateCartDisplay();
      }
  });

  addFavoriteButton.addEventListener("click", () => {
      if (cart.length === 0) {
          alert("The cart is empty.");
          return;
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Cart saved to favorites!");
  });

  applyFavoritesButton.addEventListener("click", () => {
      const favorites = localStorage.getItem("cart");
      if (!favorites) {
          alert("No favorites found.");
          return;
      }
      localStorage.setItem("checkoutCart", favorites);
      window.location.href = "check.html";
  });

  resetFavoritesButton.addEventListener("click", () => {
      if (confirm("Reset cart and favorites?")) {
          cart = [];
          updateCartDisplay();
          localStorage.removeItem("cart");
          alert("Cart reset!");
      }
  });

  updateCartDisplay();
});




document.addEventListener("DOMContentLoaded", () => {
  const cartData = JSON.parse(localStorage.getItem("checkoutCart") || "[]");
  const cartSummaryBody = document.querySelector("#cart-summary tbody");

  const displayCartSummary = () => {
      let totalPrice = 0;

      cartData.forEach(item => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${item.name}</td>
              <td>${item.quantity}</td>
              <td>Rs ${item.price * item.quantity}</td>
          `;
          cartSummaryBody.appendChild(row);
          totalPrice += item.price * item.quantity;
      });

      const totalRow = document.createElement("tr");
      totalRow.innerHTML = `
          <td colspan="2"><strong>Total</strong></td>
          <td><strong>Rs ${totalPrice}</strong></td>
      `;
      cartSummaryBody.appendChild(totalRow);
  };

  displayCartSummary();

  document.getElementById("checkout-form").addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const address = document.getElementById("address").value;
      const paymentMethod = document.getElementById("payment-method").value;
      const cardNumber = document.getElementById("card-number").value;

      if (!name || !email || !address || !paymentMethod || !cardNumber) {
          alert("Please fill in all fields.");
          return;
      }

      alert(`Thank you, ${name}! Your order has been placed.`);
      localStorage.removeItem("checkoutCart");
      window.location.href = "thankyou.html";
  });
});
