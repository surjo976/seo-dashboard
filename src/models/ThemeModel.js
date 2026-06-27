export default class ThemeModel {
  constructor() {
    this.theme = localStorage.getItem("theme") || document.documentElement.getAttribute("data-theme") || "light";
  }

  toggleTheme() {
    this.theme = this.theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", this.theme);
    return this.theme;
  }

  getTheme() {
    return this.theme;
  }
}
