export default class SidebarView {
  constructor() {
    this.mobileToggle = document.getElementById("mobileToggle");
    this.sidebar = document.getElementById("sidebar");
    this.planCheckboxes = document.querySelectorAll(".checkbox-container input[type='checkbox']");
    this.menuItems = document.querySelectorAll(".sidebar-menu .menu-item");
  }

  toggleSidebar() {
    if (this.sidebar) {
      this.sidebar.classList.toggle("active");
    }
  }

  closeSidebar() {
    if (this.sidebar && this.sidebar.classList.contains("active")) {
      this.sidebar.classList.remove("active");
    }
  }

  setActiveMenuItem(clickedItem) {
    this.menuItems.forEach(item => item.classList.remove("active"));
    if (clickedItem) {
      clickedItem.classList.add("active");
    }
  }

  toggleSubmenu(menuSection) {
    if (menuSection) {
      menuSection.classList.toggle("open");
    }
  }

  updateCheckboxStyle(checkbox) {
    const label = checkbox.nextElementSibling;
    if (label) {
      if (checkbox.checked) {
        label.style.textDecoration = "line-through";
        label.style.opacity = "0.6";
      } else {
        label.style.textDecoration = "none";
        label.style.opacity = "1";
      }
    }
  }
}
