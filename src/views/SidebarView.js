export default class SidebarView {
  constructor() {
    this.mobileToggle = document.getElementById("mobileToggle");
    this.sidebar = document.getElementById("sidebar");
    this.planCheckboxes = document.querySelectorAll(".checkbox-container input[type='checkbox']");
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
