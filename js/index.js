$(document).ready(function () {
  $(".ticket").on("click", function () {
    var ticketId = $(this).data("ticket-id");
    window.location.href = "edit-fieldticket.html?id=" + ticketId;
  });
});
