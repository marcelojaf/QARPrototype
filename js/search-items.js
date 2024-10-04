// Test data
const testData = [
  { ComponentName: "SandMaze", SupplierPartNumber: "800-400-280-L8" },
  { ComponentName: "SandMaze", SupplierPartNumber: "800-400-280-K8-NP" },
  { ComponentName: "Cup Packer", SupplierPartNumber: "811-400-7015-280-P8" },
  { ComponentName: "SandMaze", SupplierPartNumber: "800-400-280-L8-A" },
  { ComponentName: "Cup Packer", SupplierPartNumber: "811-400-7015-280-P9" },
];

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const loadingElement = document.getElementById("loading");
  const resultsList = document.getElementById("results-list");
  const quantityModal = document.getElementById("quantity-modal");
  const quantityInput = document.getElementById("quantity-input");
  const confirmQuantityButton = document.getElementById("confirm-quantity");

  let selectedItem = null;

  // Ensure the modal is hidden when the page loads
  quantityModal.classList.add("hidden");

  // Perform search when the search button is clicked
  searchButton.addEventListener("click", performSearch);

  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();

    loadingElement.classList.remove("hidden");
    resultsList.innerHTML = "";

    // Simulate API call with a 2-second delay
    setTimeout(() => {
      const filteredResults = testData.filter(
        (item) =>
          item.SupplierPartNumber.toLowerCase().includes(searchTerm) ||
          item.ComponentName.toLowerCase().includes(searchTerm)
      );

      loadingElement.classList.add("hidden");

      filteredResults.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${item.ComponentName}</strong>${item.SupplierPartNumber}`;
        li.addEventListener("click", () => showQuantityModal(item));
        resultsList.appendChild(li);
      });

      if (filteredResults.length === 0) {
        resultsList.innerHTML = "<li>No results found</li>";
      }
    }, 2000);
  }

  function showQuantityModal(item) {
    selectedItem = item;
    quantityModal.classList.remove("hidden");
  }

  confirmQuantityButton.addEventListener("click", () => {
    const quantity = parseInt(quantityInput.value);
    if (quantity > 0) {
      const itemData = {
        ...selectedItem,
        quantity: quantity,
      };

      // Get the current list of items or start a new one if it doesn't exist
      let selectedItems =
        JSON.parse(localStorage.getItem("selectedItems")) || [];

      // Add the new item to the list
      selectedItems.push(itemData);

      // Save the updated list to localStorage
      localStorage.setItem("selectedItems", JSON.stringify(selectedItems));

      // Hide the modal
      quantityModal.classList.add("hidden");

      // Reset the quantity input
      quantityInput.value = "1";

      // Redirect to the select-items page
      window.location.href = "select-items.html";
    } else {
      alert("Please enter a valid quantity");
    }
  });

  // Add event listener to close the modal when clicking outside of it
  quantityModal.addEventListener("click", (e) => {
    if (e.target === quantityModal) {
      quantityModal.classList.add("hidden");
    }
  });
});
