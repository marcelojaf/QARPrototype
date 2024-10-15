$(document).ready(function () {
  const $form = $("#customer-form");
  const $customerList = $("#customer-list");
  const $customerName = $("#customer-name");
  const $customerAddress = $("#customer-address");
  const $selectedCustomer = $("#selected-customer");
  const $itemsList = $("#items-list");

  function formatCustomerName(name) {
    return name
      .split(" ")
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  // Load saved data if available
  const savedData = JSON.parse(localStorage.getItem("customerData"));
  if (savedData) {
    // Set the customer name and address in the display area
    $customerName.text(formatCustomerName(savedData.customer));
    $customerAddress.text(savedData.address);
    $selectedCustomer.show();

    // Set the selected customer in the <select> list
    $customerList.val(savedData.customerValue);

    // Load other form fields
    $("#contact").val(savedData.contact);
    $("#delivery-date").val(savedData.deliveryDate);
    $("#delivery-field").val(savedData.deliveryField);
    $("#delivery-well").val(savedData.deliveryWell);
    $("#delivery-location").val(savedData.deliveryLocation);
    $("#delivery-state").val(savedData.deliveryState);

    // Load items
    if (savedData.items) {
      savedData.items.forEach((item) => addItemToList(item));
    }
  }

  // Update customer details when a customer is selected
  $customerList.on("change", function () {
    const selectedCustomer = $(this).val();

    if (selectedCustomer) {
      const customerDetails = selectedCustomer.split("|");
      $customerName.text(formatCustomerName(customerDetails[0]));
      $customerAddress.text(`${customerDetails[1]}, ${customerDetails[2]}`);
      $selectedCustomer.show();
    } else {
      $customerName.text("None selected");
      $customerAddress.text("Please select a customer");
      $selectedCustomer.hide();
    }
  });

  // Rest of the code remains the same...

  // Save form data on submit
  $form.on("submit", function (e) {
    e.preventDefault();

    // Collect form data
    const formData = {
      customerValue: $customerList.val(),
      customer: $customerList.find("option:selected").text(),
      address: $customerAddress.text(),
      contact: $("#contact").val(),
      deliveryDate: $("#delivery-date").val(),
      deliveryField: $("#delivery-field").val(),
      deliveryWell: $("#delivery-well").val(),
      deliveryLocation: $("#delivery-location").val(),
      deliveryState: $("#delivery-state").val(),
      items: $itemsList
        .children()
        .map(function () {
          return {
            id: $(this).data("id"),
            name: $(this).find("strong").text(),
            quantity: parseInt($(this).find("span").text().split(": ")[1]),
          };
        })
        .get(),
    };

    // Save form data to localStorage
    localStorage.setItem("customerData", JSON.stringify(formData));

    // Here you would typically make an API call to save the data
    console.log("Saving ticket:", formData);
    alert("Ticket saved successfully!");

    // Redirect to the list page or show a confirmation message
    window.location.href = "index.html";
  });
});
