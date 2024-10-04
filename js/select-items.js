document.addEventListener("DOMContentLoaded", () => {
  const itemsList = document.getElementById("items-list");

  // Verificar se há um item selecionado no localStorage
  const selectedItemJSON = localStorage.getItem("selectedItem");
  if (selectedItemJSON) {
    const selectedItem = JSON.parse(selectedItemJSON);

    // Criar e adicionar o item à lista
    const itemElement = document.createElement("div");
    itemElement.classList.add("item");
    itemElement.innerHTML = `
            <strong>${selectedItem.ComponentName}</strong>
            <p>${selectedItem.SupplierPartNumber}</p>
            <p>Quantity: ${selectedItem.quantity}</p>
        `;
    itemsList.appendChild(itemElement);

    // Limpar o item do localStorage
    localStorage.removeItem("selectedItem");
  }
});
