$(document).ready(function () {
  const $form = $("#customer-form");

  $form.on("submit", function (e) {
    e.preventDefault();

    // Collect form data
    const formData = {
      customer: $("#customer").val(),
      shipping: $("#shipping").val(),
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
    $("#customer").val(savedData.customer);
    $("#shipping").val(savedData.shipping);
    $("#contact").val(savedData.contact);
    $("#delivery-date").val(savedData.deliveryDate);
    $("#delivery-field").val(savedData.deliveryField);
    $("#delivery-well").val(savedData.deliveryWell);
    $("#delivery-location").val(savedData.deliveryLocation);
    $("#delivery-state").val(savedData.deliveryState);
  }
});
