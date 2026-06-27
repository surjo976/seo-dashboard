export default class AppController {
  constructor(sidebarView) {
    this.sidebarView = sidebarView;
  }

  init() {
    this.bindSidebarEvents();
    this.bindCheckboxEvents();
    this.bindMenuClickEvents();
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

  bindMenuClickEvents() {
    this.sidebarView.menuItems.forEach(item => {
      item.addEventListener("click", (e) => {
        const menuSection = item.closest(".menu-section");
        if (menuSection) {
          e.preventDefault();
          this.sidebarView.toggleSubmenu(menuSection);
        }
        this.sidebarView.setActiveMenuItem(item);
      });
    });
  }

  bindCheckboxEvents() {
    this.sidebarView.planCheckboxes.forEach(checkbox => {
      checkbox.addEventListener("change", () => {
        this.sidebarView.updateCheckboxStyle(checkbox);
      });
    });
  }
}
