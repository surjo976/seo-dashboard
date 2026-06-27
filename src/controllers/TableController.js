export default class TableController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    this.bindTabEvents();
    this.bindFilterEvents();
  }

  bindTabEvents() {
    this.view.tabItems.forEach(tab => {
      tab.addEventListener("click", () => {
        this.view.setActiveTab(tab);
      });
    });
  }

  bindFilterEvents() {
    this.view.filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        const filterValue = button.getAttribute("data-filter");
        this.model.setFilter(filterValue);
        this.view.setActiveFilterButton(button);
        this.view.filterTableRows(filterValue);
      });
    });
  }
}
