export default class FilterModel {
  constructor() {
    this.activeFilter = "all";
    this.activeTab = "overview";
  }

  setFilter(filter) {
    this.activeFilter = filter;
  }

  getFilter() {
    return this.activeFilter;
  }

  setTab(tab) {
    this.activeTab = tab;
  }

  getTab() {
    return this.activeTab;
  }
}
