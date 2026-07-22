import ChartModel from './models/ChartModel.js?v=6.4';
import FilterModel from './models/FilterModel.js?v=6.4';
import ThemeModel from './models/ThemeModel.js?v=6.4';

import ChartView from './views/ChartView.js?v=6.4';
import TableView from './views/TableView.js?v=6.4';
import ThemeView from './views/ThemeView.js?v=6.4';
import SidebarView from './views/SidebarView.js?v=6.4';

import ChartController from './controllers/ChartController.js?v=6.4';
import TableController from './controllers/TableController.js?v=6.4';
import ThemeController from './controllers/ThemeController.js?v=6.4';
import AppController from './controllers/AppController.js?v=6.4';

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Instantiate Models & Views
  const chartModel = new ChartModel();
  const filterModel = new FilterModel();
  const themeModel = new ThemeModel();

  const chartView = new ChartView();
  const tableView = new TableView();
  const themeView = new ThemeView();
  const sidebarView = new SidebarView();

  // Instantiate Controllers
  const chartController = new ChartController(chartModel, chartView);
  const tableController = new TableController(filterModel, tableView);
  const themeController = new ThemeController(themeModel, themeView, chartController);
  const appController = new AppController(sidebarView);

  // Initialize Controllers
  themeController.init();
  themeView.applyTheme(themeModel.getTheme());
  chartController.init();
  tableController.init();
  appController.init();
});
