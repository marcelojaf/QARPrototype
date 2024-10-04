// Dados de teste
const testData = [
  { ComponentName: "SandMaze", SupplierPartNumber: "800-400-280-L8" },
  { ComponentName: "SandMaze", SupplierPartNumber: "800-400-280-K8-NP" },
  { ComponentName: "Cup Packer", SupplierPartNumber: "811-400-7015-280-P8" },
  { ComponentName: "SandMaze", SupplierPartNumber: "800-400-280-L8-A" },
  { ComponentName: "Cup Packer", SupplierPartNumber: "811-400-7015-280-P9" },
];

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const loadingElement = document.getElementById("loading");
  const resultsList = document.getElementById("results-list");

  searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.toLowerCase();

    loadingElement.classList.remove("hidden");
    resultsList.innerHTML = "";

    setTimeout(() => {
      const filteredResults = testData.filter(
        (item) =>
          item.SupplierPartNumber.toLowerCase().includes(searchTerm) ||
          item.ComponentName.toLowerCase().includes(searchTerm)
      );

      loadingElement.classList.add("hidden");

      filteredResults.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${item.ComponentName}</strong>${item.SupplierPartNumber}`;
        resultsList.appendChild(li);
      });

      if (filteredResults.length === 0) {
        resultsList.innerHTML = "<li>No results found</li>";
      }
    }, 2000);
  });
});
