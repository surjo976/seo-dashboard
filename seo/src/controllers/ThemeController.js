export default class ThemeController {
  constructor(model, view, chartController = null) {
    this.model = model;
    this.view = view;
    this.chartController = chartController;
  }

  init() {
    if (this.view.themeToggleBtn) {
      this.view.themeToggleBtn.addEventListener("click", () => {
        const newTheme = this.model.toggleTheme();
        this.view.applyTheme(newTheme);
        if (this.chartController) {
          this.chartController.renderAll();
        }
      });
    }
  }
}
