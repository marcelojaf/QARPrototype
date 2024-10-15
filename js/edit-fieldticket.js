$(document).ready(function () {
  // Customer data
  const customerData = {
    advantage: {
      name: "Advantage Lift Solutions",
      address: "7670 Woodway Drive Suite 230, Houston TX 77063",
    },
    apache: {
      name: "Apache Corporation",
      address: "303 Veterans Airpark Ln, Midland TX 79705",
    },
    baker: {
      name: "Baker Hughes",
      address: "2001 Rankin Rd, Houston TX 77073",
    },
    chevron: {
      name: "Chevron Corporation",
      address: "1500 Louisiana St, Houston TX 77002",
    },
    exxon: {
      name: "ExxonMobil",
      address: "5959 Las Colinas Blvd, Irving TX 75039",
    },
    halliburton: {
      name: "Halliburton",
      address: "3000 N Sam Houston Pkwy E, Houston TX 77032",
    },
  };

  // Handle customer selection
  $("#customer").on("change", function () {
    const selectedCustomer = $(this).val();
    const customerInfo = customerData[selectedCustomer];

    if (customerInfo) {
      $("#customer-name").text(customerInfo.name);
      $("#customer-address").text(customerInfo.address);
      $("#selected-customer").show();
    } else {
      $("#customer-name").text("None selected");
      $("#customer-address").text("Please select a customer");
      $("#selected-customer").hide();
    }
  });

  // Initialize the selected customer box as hidden
  $("#selected-customer").hide();

  // Load existing field ticket data if editing
  function loadFieldTicketData() {
    // This function would typically make an API call to get the field ticket data
    // For now, we'll use mock data
    const mockData = {
      customer: "apache",
      contact: "John Doe",
      deliveryDate: "2024-07-15",
      deliveryField: "Field A",
      deliveryWell: "Well 1",
      deliveryLocation: "Location X",
      deliveryState: "TX",
      items: [
        { id: 1, name: "Item 1", quantity: 2 },
        { id: 2, name: "Item 2", quantity: 1 },
      ],
    };

    // Populate form fields
    $("#customer").val(mockData.customer).trigger("change");
    $("#contact").val(mockData.contact);
    $("#delivery-date").val(mockData.deliveryDate);
    $("#delivery-field").val(mockData.deliveryField);
    $("#delivery-well").val(mockData.deliveryWell);
    $("#delivery-location").val(mockData.deliveryLocation);
    $("#delivery-state").val(mockData.deliveryState);

    // Populate items list
    renderItems(mockData.items);
  }

  // Render items in the list
  function renderItems(items) {
    const $itemsList = $(".items-list");
    $itemsList.empty();

    items.forEach((item) => {
      const $item = $(`
              <div class="item" data-id="${item.id}">
                  <div class="item-header">
                      <strong>${item.name}</strong>
                      <span>Quantity: ${item.quantity}</span>
                  </div>
                  <div class="item-actions">
                      <button class="btn btn-sm btn-outline-primary edit-item">Edit</button>
                      <button class="btn btn-sm btn-outline-danger remove-item">Remove</button>
                  </div>
              </div>
          `);
      $itemsList.append($item);
    });
  }

  // Handle save draft
  $("#save-draft").on("click", function () {
    // Collect form data
    const formData = {
      customer: $("#customer").val(),
      contact: $("#contact").val(),
      deliveryDate: $("#delivery-date").val(),
      deliveryField: $("#delivery-field").val(),
      deliveryWell: $("#delivery-well").val(),
      deliveryLocation: $("#delivery-location").val(),
      deliveryState: $("#delivery-state").val(),
      // Add logic to collect items data
    };

    // Here you would typically make an API call to save the draft
    console.log("Saving draft:", formData);
    alert("Draft saved successfully!");
  });

  // Handle submit ticket
  $("#submit-ticket").on("click", function () {
    // Collect form data (same as save draft)
    const formData = {
      customer: $("#customer").val(),
      contact: $("#contact").val(),
      deliveryDate: $("#delivery-date").val(),
      deliveryField: $("#delivery-field").val(),
      deliveryWell: $("#delivery-well").val(),
      deliveryLocation: $("#delivery-location").val(),
      deliveryState: $("#delivery-state").val(),
      // Add logic to collect items data
    };

    // Here you would typically make an API call to submit the ticket
    console.log("Submitting ticket:", formData);
    alert("Ticket submitted successfully!");
    // Redirect to the list page or show a confirmation message
    window.location.href = "index.html";
  });

  // Load field ticket data when the page loads
  loadFieldTicketData();
});
