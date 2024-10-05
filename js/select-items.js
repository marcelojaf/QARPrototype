$(document).ready(function () {
  const $itemsList = $("#items-list");
  const $totalAmount = $(".total-amount");
  const $serialNumberModal = $("#serial-number-modal");
  const $serialNumberInput = $("#serial-number-input");
  const $confirmSerialNumber = $("#confirm-serial-number");
  const $cancelSerialNumber = $(
    "#serial-number-modal .modal-footer .btn-secondary"
  );

  let currentItemIndex = -1;

  function renderItems() {
    $itemsList.empty();
    const selectedItems =
      JSON.parse(localStorage.getItem("selectedItems")) || [];
    let totalAmount = 0;

    selectedItems.forEach((item, index) => {
      const serialNumberStatus = item.hasSerialNumber
        ? `<span class="serial-number-status assigned">Serial Number Assigned</span>`
        : '<span class="serial-number-status pending">Serial Number Pending</span>';

      const serialNumberDisplay = item.hasSerialNumber
        ? `<p>Serial Number: ${item.serialNumber}</p>`
        : "";

      const $itemElement = $(`
        <div class="item" data-index="${index}">
          <div class="item-content">
            <strong>${item.ComponentName}</strong>
            <p>${item.SupplierPartNumber}</p>
            <p>Quantity: ${item.quantity}</p>
            ${serialNumberDisplay}
            ${serialNumberStatus}
          </div>
          <div class="swipe-menu">
            <button class="remove-item"><i class="fas fa-trash"></i></button>
            <button class="assign-serial-number"><i class="fas fa-barcode"></i></button>
          </div>
        </div>
      `);

      $itemsList.append($itemElement);

      const hammer = new Hammer($itemElement[0]);
      hammer.on("swipeleft swiperight", function (ev) {
        const $swipeMenu = $itemElement.find(".swipe-menu");
        if (ev.type === "swipeleft") {
          $swipeMenu.css("right", "0");
        } else if (ev.type === "swiperight") {
          $swipeMenu.css("right", "-160px");
        }
      });

      totalAmount += 0; // You might want to update this with actual price calculation
    });

    $totalAmount.text(`Total Amount: $${totalAmount.toFixed(2)}`);
  }

  function removeItem(index) {
    let selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
    selectedItems.splice(index, 1);
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    renderItems();
  }

  function showSerialNumberModal(index) {
    currentItemIndex = index;
    $serialNumberModal.modal("show");
  }

  function assignSerialNumber(serialNumber) {
    let selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
    selectedItems[currentItemIndex].hasSerialNumber = true;
    selectedItems[currentItemIndex].serialNumber = serialNumber;
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    renderItems();
  }

  function closeSwipeMenu() {
    $(".swipe-menu").css("right", "-160px");
  }

  $itemsList.on("click", ".remove-item", function () {
    const index = $(this).closest(".item").data("index");
    removeItem(index);
  });

  $itemsList.on("click", ".assign-serial-number", function () {
    const index = $(this).closest(".item").data("index");
    showSerialNumberModal(index);
  });

  $confirmSerialNumber.on("click", function () {
    const serialNumber = $serialNumberInput.val().trim();
    if (serialNumber) {
      assignSerialNumber(serialNumber);
      $serialNumberModal.modal("hide");
      $serialNumberInput.val("");
      closeSwipeMenu();
    } else {
      alert("Please enter a valid serial number");
    }
  });

  $cancelSerialNumber.on("click", function () {
    closeSwipeMenu();
  });

  $serialNumberModal.on("hidden.bs.modal", function () {
    closeSwipeMenu();
  });

  renderItems();
});
