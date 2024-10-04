$(document).ready(function () {
  const $itemsList = $("#items-list");
  const $totalAmount = $(".total-amount p");

  function renderItems() {
    $itemsList.empty();
    const selectedItems =
      JSON.parse(localStorage.getItem("selectedItems")) || [];
    let totalAmount = 0;

    selectedItems.forEach((item, index) => {
      const $itemElement = $(`
              <div class="item" data-index="${index}">
                  <div class="item-content">
                      <strong>${item.ComponentName}</strong>
                      <p>${item.SupplierPartNumber}</p>
                      <p>Quantity: ${item.quantity}</p>
                  </div>
                  <div class="swipe-menu">
                      <button class="remove-item"><i class="fas fa-trash"></i></button>
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
          $swipeMenu.css("right", "-80px");
        }
      });

      totalAmount += item.quantity * 10;
    });

    $totalAmount.text(`Total Amount: $${totalAmount.toFixed(2)}`);
  }

  function removeItem(index) {
    let selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
    selectedItems.splice(index, 1);
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    renderItems();
  }

  $itemsList.on("click", ".remove-item", function () {
    const index = $(this).closest(".item").data("index");
    removeItem(index);
  });

  renderItems();
});
