export default class ThemeView {
  constructor() {
    this.themeToggleBtn = document.getElementById("themeToggle");
  }

  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (this.themeToggleBtn) {
      const icon = this.themeToggleBtn.querySelector("i");
      if (icon) {
        icon.setAttribute("data-lucide", theme === "dark" ? "moon" : "sun");
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      }
    }
  }
}
