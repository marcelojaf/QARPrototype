$(document).ready(function () {
  // Sample data - Field Ticket list
  const tickets = [
    {
      id: "003",
      company: "Acme Industries",
      date: "2024-08-15",
      amount: 5430.0,
      responsible: "Michael Johnson",
      status: "Draft",
    },
    {
      id: "007",
      company: "TechCorp Solutions",
      date: "2024-08-10",
      amount: 2750.0,
      responsible: "William Smith",
      status: "Checked-Out",
    },
    {
      id: "012",
      company: "Global Dynamics",
      date: "2024-09-01",
      amount: 8920.0,
      responsible: "James Davis",
      status: "Draft",
    },
    {
      id: "015",
      company: "Stark Enterprises",
      date: "2024-09-05",
      amount: 4350.0,
      responsible: "Robert Wilson",
      status: "Submitted",
    },
    {
      id: "018",
      company: "Wayne Industries",
      date: "2024-09-12",
      amount: 6780.0,
      responsible: "John Anderson",
      status: "Submitted",
    },
    {
      id: "021",
      company: "Umbrella Corp",
      date: "2024-09-20",
      amount: 3290.0,
      responsible: "David Thompson",
      status: "Draft",
    },
    {
      id: "024",
      company: "Cyberdyne Systems",
      date: "2024-09-25",
      amount: 9150.0,
      responsible: "Christopher Brown",
      status: "Checked-Out",
    },
    {
      id: "027",
      company: "Initech",
      date: "2024-10-01",
      amount: 7420.0,
      responsible: "Richard Taylor",
      status: "Submitted",
    },
    {
      id: "030",
      company: "Hooli",
      date: "2024-10-05",
      amount: 5890.0,
      responsible: "Thomas Martinez",
      status: "Submitted",
    },
    {
      id: "033",
      company: "Pied Piper",
      date: "2024-10-10",
      amount: 4670.0,
      responsible: "Daniel Clark",
      status: "Submitted",
    },
  ];

  // State variables
  let filteredTickets = [...tickets]; // tickets is defined in tickets-data.js
  let showSubmitted = false;
  let searchTerm = "";

  // Function to format date from yyyy-MM-dd to locale date string
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  }

  // Function to format currency
  function formatCurrency(amount) {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }

  // Function to create ticket HTML
  function createTicketHtml(ticket) {
    return `
           <div class="ticket" data-ticket-id="${ticket.id}">
               <strong>${ticket.id}</strong>
               <div class="company-name">${ticket.company}</div>
               <div>${formatDate(ticket.date)}</div>
               <div>${formatCurrency(ticket.amount)}</div>
               <div>${ticket.responsible}</div>
               <span class="badge badge-${ticket.status.toLowerCase()}">${ticket.status}</span>
           </div>
       `;
  }

  // Function to update ticket list based on filters
  function updateTicketList() {
    const container = $(".ticket-list-container");
    container.empty();

    const visibleTickets = filteredTickets
      .filter((ticket) => showSubmitted || ticket.status !== "Submitted")
      .filter((ticket) => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return (
          ticket.id.toLowerCase().includes(term) ||
          ticket.company.toLowerCase().includes(term)
        );
      });

    visibleTickets.forEach((ticket) => {
      container.append(createTicketHtml(ticket));
    });

    // Reattach click handlers
    attachTicketClickHandlers();
  }

  // Function to attach click handlers to tickets
  function attachTicketClickHandlers() {
    $(".ticket").on("click", function () {
      const ticketId = $(this).data("ticket-id");
      window.location.href = "edit-fieldticket.html?id=" + ticketId;
    });
  }

  // Event handler for Include Submitted checkbox
  $("#includeSubmitted").on("change", function () {
    showSubmitted = $(this).is(":checked");
    $("#searchButton").toggle(showSubmitted);
    updateTicketList();
  });

  // Event handler for Search button click
  $("#searchButton button").on("click", function () {
    $("#searchModal").modal("show");
  });

  // Event handler for Search confirmation in modal
  $("#searchConfirm").on("click", function () {
    searchTerm = $("#searchInput").val();
    updateTicketList();
    $("#searchModal").modal("hide");

    // Show/hide clean filter button based on search term
    $("#cleanFilterButton").toggle(searchTerm.length > 0);
  });

  // Event handler for modal hidden event
  $("#searchModal").on("hidden.bs.modal", function () {
    // Keep the search term and list state when closing the modal
    // Only clear the input field
    $("#searchInput").val("");
  });

  // Event handler for clean filter button
  $("#cleanFilterButton").on("click", function () {
    searchTerm = "";
    $("#searchInput").val("");
    updateTicketList();
    $(this).hide();
  });

  // Initialize the list
  updateTicketList();
});
