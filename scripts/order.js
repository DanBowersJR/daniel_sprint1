document.addEventListener("DOMContentLoaded", function () {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartList = document.getElementById("cart");

  cartList.innerHTML = ""; // Clear any existing items

  let subtotal = 0;

  cart.forEach((item) => {
    const cartItem = document.createElement("li");
    cartItem.innerHTML = `${item.name} x${item.quantity} - ${item.price} <button class="remove-from-cart">Remove</button>`;
    cartItem.setAttribute("data-name", item.name);
    cartItem.setAttribute("data-quantity", item.quantity);
    cartItem.setAttribute("data-price", item.price);

    cartList.appendChild(cartItem);

    subtotal += parseFloat(item.price.replace("$", "")) * item.quantity;
  });

  // Calculate tax and total
  const taxRate = 0.15;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  // Create and append subtotal, tax, and total elements
  const subtotalElement = document.createElement("p");
  subtotalElement.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
  cartList.appendChild(subtotalElement);

  const taxElement = document.createElement("p");
  taxElement.textContent = `Tax (15%): $${tax.toFixed(2)}`;
  cartList.appendChild(taxElement);

  const totalElement = document.createElement("p");
  totalElement.textContent = `Total: $${total.toFixed(2)}`;
  cartList.appendChild(totalElement);

  // Handle remove from cart button clicks
  cartList.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-from-cart")) {
      const itemName = e.target.parentElement.getAttribute("data-name");
      const itemQuantity = e.target.parentElement.getAttribute("data-quantity");
      const itemPrice = e.target.parentElement.getAttribute("data-price");

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart = cart.filter(
        (item) =>
          !(
            item.name === itemName &&
            item.quantity === itemQuantity &&
            item.price === itemPrice
          )
      );
      localStorage.setItem("cart", JSON.stringify(cart));

      e.target.parentElement.remove();

      // Update subtotal, tax, and total
      subtotal = 0;
      cart.forEach((item) => {
        subtotal += parseFloat(item.price.replace("$", "")) * item.quantity;
      });

      const tax = subtotal * taxRate;
      const total = subtotal + tax;

      subtotalElement.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
      taxElement.textContent = `Tax (15%): $${tax.toFixed(2)}`;
      totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }
  });
});
