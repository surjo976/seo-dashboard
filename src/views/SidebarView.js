export default class SidebarView {
  constructor() {
    this.mobileToggle = document.getElementById("mobileToggle");
    this.sidebar = document.getElementById("sidebar");
    this.planCheckboxes = document.querySelectorAll(".checkbox-container input[type='checkbox']");
    this.menuItems = document.querySelectorAll(".sidebar-menu .menu-item");
  }

  toggleSidebar() {
    const dashboardContainer = document.querySelector(".dashboard-container");
    if (window.innerWidth <= 768) {
      if (this.sidebar) {
        this.sidebar.classList.toggle("active");
      }
    } else {
      if (dashboardContainer) {
        dashboardContainer.classList.toggle("sidebar-closed");
      }
    }
  }

  closeSidebar() {
    if (window.innerWidth <= 768 && this.sidebar && this.sidebar.classList.contains("active")) {
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

  setActiveSubmenuItem(clickedItem) {
    const allSubmenuItems = document.querySelectorAll(".submenu-item");
    allSubmenuItems.forEach(item => {
      item.classList.remove("active");
      const dot = item.querySelector(".submenu-dot");
      if (dot) dot.classList.remove("filled");
    });
    if (clickedItem) {
      clickedItem.classList.add("active");
      const dot = clickedItem.querySelector(".submenu-dot");
      if (dot) dot.classList.add("filled");
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
