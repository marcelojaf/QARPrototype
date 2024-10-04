document.addEventListener("DOMContentLoaded", () => {
  const itemsList = document.getElementById("items-list");
  const totalAmountElement = document.querySelector(".total-amount p");

  // Function to render the items
  function renderItems() {
    // Clear the current list
    itemsList.innerHTML = "";

    // Get items from localStorage
    const selectedItems =
      JSON.parse(localStorage.getItem("selectedItems")) || [];

    // Variable to store the total amount
    let totalAmount = 0;

    // Render each item
    selectedItems.forEach((item, index) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("item");
      itemElement.innerHTML = `
          <strong>${item.ComponentName}</strong>
          <p>${item.SupplierPartNumber}</p>
          <p>Quantity: ${item.quantity}</p>
          <button class="remove-item" data-index="${index}">Remove</button>
        `;
      itemsList.appendChild(itemElement);

      // Add to total (assuming each item has a price of $10 for this example)
      totalAmount += item.quantity * 10;
    });

    // Update the total on the screen
    totalAmountElement.textContent = `Total Amount: $${totalAmount.toFixed(2)}`;
  }

  // Function to remove an item
  function removeItem(index) {
    let selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
    selectedItems.splice(index, 1);
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    renderItems();
  }

  // Add click event to remove items
  itemsList.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-item")) {
      const index = e.target.getAttribute("data-index");
      removeItem(index);
    }
  });

  // Initially render the items
  renderItems();
});
