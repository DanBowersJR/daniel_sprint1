document.addEventListener("DOMContentLoaded", function () {
  // Handle add to cart button clicks
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const menuItem = this.closest(".menu-item");
      const productId = menuItem.getAttribute("data-productid");
      const productName = menuItem.querySelector("p").textContent;
      const quantitySelect = menuItem.querySelector(".quantity-select");
      const selectedQuantity = quantitySelect.value;

      if (selectedQuantity === "default") {
        alert("Please choose a quantity before adding to cart.");
        return;
      }

      const cartItem = document.createElement("li");
      cartItem.innerHTML = `${productName} x${selectedQuantity} <button class="remove-from-cart">Remove</button>`;
      cartItem.setAttribute("data-productid", productId);

      document.getElementById("cart").appendChild(cartItem);
    });
  });

  // Handle remove from cart button clicks
  document.getElementById("cart").addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-from-cart")) {
      e.target.parentElement.remove();
    }
  });
});
