$(document).ready(function () {
  const $searchInput = $("#search-input");
  const $searchButton = $("#search-button");
  const $loading = $("#loading");
  const $resultsList = $("#results-list");
  const $quantityModal = $("#quantity-modal");
  const $quantityInput = $("#quantity-input");
  const $confirmQuantity = $("#confirm-quantity");

  let selectedItem = null;

  // Test data
  const testData = [
    { ComponentName: "SandMaze", SupplierPartNumber: "800-400-280-L8" },
    { ComponentName: "SandMaze", SupplierPartNumber: "800-400-280-K8-NP" },
    { ComponentName: "Cup Packer", SupplierPartNumber: "811-400-7015-280-P8" },
    { ComponentName: "SandMaze", SupplierPartNumber: "800-400-280-L8-A" },
    { ComponentName: "Cup Packer", SupplierPartNumber: "811-400-7015-280-P9" },
  ];

  $searchButton.on("click", performSearch);

  function performSearch() {
    const searchTerm = $searchInput.val().toLowerCase();

    $loading.removeClass("hidden");
    $resultsList.empty();

    // Simulate API call with a 2-second delay
    setTimeout(() => {
      const filteredResults = testData.filter(
        (item) =>
          item.SupplierPartNumber.toLowerCase().includes(searchTerm) ||
          item.ComponentName.toLowerCase().includes(searchTerm)
      );

      $loading.addClass("hidden");

      filteredResults.forEach((item) => {
        const $li = $(`
                  <li>
                      <strong>${item.ComponentName}</strong>
                      ${item.SupplierPartNumber}
                  </li>
              `);
        $li.on("click", () => showQuantityModal(item));
        $resultsList.append($li);
      });

      if (filteredResults.length === 0) {
        $resultsList.append("<li>No results found</li>");
      }
    }, 2000);
  }

  function showQuantityModal(item) {
    selectedItem = item;
    $quantityModal.modal("show");
  }

  $confirmQuantity.on("click", () => {
    const quantity = parseInt($quantityInput.val());
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
      $quantityModal.modal("hide");

      // Redirect to the select-items page
      window.location.href = "select-items.html";
    } else {
      alert("Please enter a valid quantity");
    }
  });

  $quantityModal.on("hidden.bs.modal", () => {
    $quantityInput.val(1);
  });
});
