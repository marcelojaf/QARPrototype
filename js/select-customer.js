$(document).ready(function () {
  const $form = $("#customer-form");
  const $customerList = $("#customer-list");
  const $customerName = $("#customer-name");
  const $customerAddress = $("#customer-address");

  // Save form data on submit
  $form.on("submit", function (e) {
    e.preventDefault();

    // Collect form data
    const formData = {
      customer: $customerName.text(),
      address: $customerAddress.text(),
      contact: $("#contact").val(),
      deliveryDate: $("#delivery-date").val(),
      deliveryField: $("#delivery-field").val(),
      deliveryWell: $("#delivery-well").val(),
      deliveryLocation: $("#delivery-location").val(),
      deliveryState: $("#delivery-state").val(),
    };

    // Save form data to localStorage
    localStorage.setItem("customerData", JSON.stringify(formData));

    // Redirect to the next page
    window.location.href = "select-items.html";
  });

  // Load saved data if available
  const savedData = JSON.parse(localStorage.getItem("customerData"));
  if (savedData) {
    // Set the customer name and address in the display area
    $customerName.text(savedData.customer);
    $customerAddress.text(savedData.address);

    // Set the selected customer in the <select> list
    $("#customer-list option").each(function () {
      if ($(this).text().includes(savedData.customer)) {
        $(this).prop("selected", true);
      }
    });

    // Load other form fields
    $("#contact").val(savedData.contact);
    $("#delivery-date").val(savedData.deliveryDate);
    $("#delivery-field").val(savedData.deliveryField);
    $("#delivery-well").val(savedData.deliveryWell);
    $("#delivery-location").val(savedData.deliveryLocation);
    $("#delivery-state").val(savedData.deliveryState);
  }

  // Update customer details when a customer is selected
  $customerList.on("change", function () {
    const selectedCustomer = $(this).val();

    if (selectedCustomer) {
      const customerDetails = selectedCustomer.split("|");
      $customerName.text(customerDetails[0]);
      $customerAddress.text(`${customerDetails[1]}, ${customerDetails[2]}`);
    } else {
      $customerName.text("None selected");
      $customerAddress.text("Please select a customer");
    }
  });
});
