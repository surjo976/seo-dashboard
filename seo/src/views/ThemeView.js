export default class ThemeView {
  constructor() {
    this.themeToggleBtn = document.getElementById("themeToggle");
  }

  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (this.themeToggleBtn) {
      this.themeToggleBtn.innerHTML = `<i data-lucide="${theme === "dark" ? "moon" : "sun"}"></i>`;
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }
  }
}
