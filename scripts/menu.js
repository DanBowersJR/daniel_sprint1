// JavaScript for the menu page
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", function () {
    const itemContainer = this.closest(".menu-item");
    const itemName = itemContainer.querySelector(".item-details p").textContent;
    const itemPrice = parseFloat(
      itemContainer
        .querySelector(".item-details p:nth-of-type(2)")
        .textContent.replace("$", "")
    );
    const quantity = parseInt(
      itemContainer.querySelector(".quantity-select").value
    );

    if (quantity > 0) {
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

      cartItems.push({ name: itemName, price: itemPrice, quantity: quantity });

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      alert(`${itemName} (x${quantity}) has been added to your cart.`);
    } else {
      alert("Please select a quantity.");
    }
  });
});
