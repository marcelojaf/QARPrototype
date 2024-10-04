// Dados de teste
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

  searchButton.addEventListener("click", performSearch);

  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();

    loadingElement.classList.remove("hidden");
    resultsList.innerHTML = "";

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
      localStorage.setItem("selectedItem", JSON.stringify(itemData));
      window.location.href = "select-items.html";
    } else {
      alert("Please enter a valid quantity");
    }
  });
});
