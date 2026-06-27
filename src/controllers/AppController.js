export default class AppController {
  constructor(sidebarView) {
    this.sidebarView = sidebarView;
  }

  init() {
    this.bindSidebarEvents();
    this.bindCheckboxEvents();
  }

  bindSidebarEvents() {
    if (this.sidebarView.mobileToggle && this.sidebarView.sidebar) {
      this.sidebarView.mobileToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        this.sidebarView.toggleSidebar();
      });

      document.addEventListener("click", (e) => {
        if (!this.sidebarView.sidebar.contains(e.target) && e.target !== this.sidebarView.mobileToggle) {
          this.sidebarView.closeSidebar();
        }
      });
    }
  }

  bindCheckboxEvents() {
    this.sidebarView.planCheckboxes.forEach(checkbox => {
      checkbox.addEventListener("change", () => {
        this.sidebarView.updateCheckboxStyle(checkbox);
      });
    });
  }
}
