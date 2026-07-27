export default class SidebarView {
  constructor() {
    this.mobileToggle = document.getElementById("mobileToggle");
    this.sidebar = document.getElementById("sidebar");
    this.backdrop = document.getElementById("sidebarBackdrop");
    this.planCheckboxes = document.querySelectorAll(".checkbox-container input[type='checkbox']");
    this.menuItems = document.querySelectorAll(".sidebar-menu .menu-item");
    this.initPopoverPositioning();
  }

  initPopoverPositioning() {
    const menuSections = document.querySelectorAll(".menu-section");
    menuSections.forEach(section => {
      const updatePos = () => {
        const container = document.querySelector(".dashboard-container");
        if (container && container.classList.contains("sidebar-closed")) {
          const rect = section.getBoundingClientRect();
          const submenu = section.querySelector(".submenu");
          if (submenu) {
            submenu.style.position = "fixed";
            submenu.style.top = `${rect.top}px`;
            submenu.style.left = `${rect.right + 8}px`;
            submenu.style.transform = "none";
          }
        }
      };
      section.addEventListener("mouseenter", updatePos);
      section.addEventListener("focusin", updatePos);
    });
  }

  toggleSidebar() {
    const dashboardContainer = document.querySelector(".dashboard-container");
    if (window.innerWidth <= 1024) {
      if (this.sidebar) {
        const isActive = this.sidebar.classList.toggle("active");
        if (this.backdrop) {
          this.backdrop.classList.toggle("active", isActive);
        }
      }
    } else {
      if (dashboardContainer) {
        dashboardContainer.classList.toggle("sidebar-closed");
      }
    }
  }

  closeSidebar() {
    if (window.innerWidth <= 1024 && this.sidebar && this.sidebar.classList.contains("active")) {
      this.sidebar.classList.remove("active");
      if (this.backdrop) {
        this.backdrop.classList.remove("active");
      }
    }
  }

  setActiveMenuItem(clickedItem) {
    this.menuItems.forEach(item => item.classList.remove("active"));
    if (clickedItem) {
      clickedItem.classList.add("active");
      const section = clickedItem.closest(".menu-section");
      if (!section) {
        document.querySelectorAll(".menu-section").forEach(sec => sec.classList.remove("open"));
      }
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

      const parentSection = clickedItem.closest(".menu-section");
      if (parentSection) {
        const parentMenuItem = parentSection.querySelector(".menu-item");
        if (parentMenuItem) {
          this.menuItems.forEach(item => item.classList.remove("active"));
          parentMenuItem.classList.add("active");
        }
      }
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
