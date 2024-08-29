document.addEventListener("DOMContentLoaded", function () {
  // Handle add to cart button clicks
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const menuItem = this.closest(".menu-item");
      const productName = menuItem.querySelector(".item-details p").textContent;
      const quantitySelect = menuItem.querySelector(".quantity-select");
      const selectedQuantity = quantitySelect.value;
      const price = menuItem.querySelector(
        ".item-details p:nth-of-type(2)"
      ).textContent;

      if (selectedQuantity === "default") {
        alert("Please choose a quantity before adding to cart.");
        return;
      }

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      let itemFound = false;

      // Check if item is already in the cart
      cart = cart.map((item) => {
        if (item.name === productName && item.price === price) {
          item.quantity = (
            parseInt(item.quantity) + parseInt(selectedQuantity)
          ).toString();
          itemFound = true;
        }
        return item;
      });

      if (!itemFound) {
        // Add new item if not found
        cart.push({
          name: productName,
          quantity: selectedQuantity,
          price: price,
        });
      }

      // Save updated cart to local storage
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${productName} x${selectedQuantity} added to cart.`);
    });
  });
});
