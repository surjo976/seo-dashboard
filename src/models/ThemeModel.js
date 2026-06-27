export default class ThemeModel {
  constructor() {
    this.theme = document.documentElement.getAttribute("data-theme") || "light";
  }

  toggleTheme() {
    this.theme = this.theme === "dark" ? "light" : "dark";
    return this.theme;
  }

  getTheme() {
    return this.theme;
  }
}
