export default class ThemeController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    if (this.view.themeToggleBtn) {
      this.view.themeToggleBtn.addEventListener("click", () => {
        const newTheme = this.model.toggleTheme();
        this.view.applyTheme(newTheme);
      });
    }
  }
}
