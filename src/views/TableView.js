export default class TableView {
  constructor() {
    this.filterButtons = document.querySelectorAll(".ftab");
    this.tableRows = document.querySelectorAll("#tableBody tr");
    this.tabItems = document.querySelectorAll(".tab");
  }

  setActiveFilterButton(activeBtn) {
    this.filterButtons.forEach(btn => btn.classList.remove("active"));
    if (activeBtn) activeBtn.classList.add("active");
  }

  filterTableRows(filterValue) {
    this.tableRows.forEach(row => {
      const rowCategory = row.getAttribute("data-cat");
      if (filterValue === "all" || filterValue === rowCategory) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }

  setActiveTab(activeTabElement) {
    this.tabItems.forEach(tab => tab.classList.remove("active"));
    if (activeTabElement) activeTabElement.classList.add("active");
  }
}
