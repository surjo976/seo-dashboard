import ChartModel from './models/ChartModel.js';
import FilterModel from './models/FilterModel.js';
import ThemeModel from './models/ThemeModel.js';

import ChartView from './views/ChartView.js';
import TableView from './views/TableView.js';
import ThemeView from './views/ThemeView.js';
import SidebarView from './views/SidebarView.js';

import ChartController from './controllers/ChartController.js';
import TableController from './controllers/TableController.js';
import ThemeController from './controllers/ThemeController.js';
import AppController from './controllers/AppController.js';

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
  const themeController = new ThemeController(themeModel, themeView);
  const appController = new AppController(sidebarView);

  // Initialize Controllers
  chartController.init();
  tableController.init();
  themeController.init();
  appController.init();
});
