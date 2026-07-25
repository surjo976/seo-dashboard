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
  // Global Event Delegation for Interactive UI Elements
  document.addEventListener('click', (e) => {
    // 1. Pagination numbers (.pg-num)
    const pgNum = e.target.closest('.pg-num');
    if (pgNum) {
      const container = pgNum.closest('.pagination-btns');
      if (container) {
        container.querySelectorAll('.pg-num').forEach(b => b.classList.remove('active'));
        pgNum.classList.add('active');
      }
      return;
    }

    // 2. Pagination prev/next (.pg-btn)
    const pgBtn = e.target.closest('.pg-btn');
    if (pgBtn && !pgBtn.classList.contains('disabled')) {
      const container = pgBtn.closest('.pagination-btns');
      if (container) {
        const activeNum = container.querySelector('.pg-num.active');
        const allNums = Array.from(container.querySelectorAll('.pg-num'));
        if (activeNum && allNums.length > 0) {
          let idx = allNums.indexOf(activeNum);
          if (pgBtn.innerHTML.includes('chevron-left') || pgBtn.querySelector('[data-lucide="chevron-left"]')) {
            if (idx > 0) {
              activeNum.classList.remove('active');
              allNums[idx - 1].classList.add('active');
            }
          } else if (pgBtn.innerHTML.includes('chevron-right') || pgBtn.querySelector('[data-lucide="chevron-right"]')) {
            if (idx < allNums.length - 1) {
              activeNum.classList.remove('active');
              allNums[idx + 1].classList.add('active');
            }
          }
        }
      }
      return;
    }

    // 3. Tab switching (.audit-tabs .tab)
    const tab = e.target.closest('.audit-tabs .tab');
    if (tab) {
      const tabNav = tab.closest('.audit-tabs');
      if (tabNav) {
        tabNav.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      }
      return;
    }

    // 4. View Details navigation (.pc-btn[data-card])
    const cardBtn = e.target.closest('.pc-btn[data-card]');
    if (cardBtn) {
      const target = cardBtn.getAttribute('data-card');
      document.querySelectorAll('.view-container').forEach(v => v.classList.remove('active'));
      const targetView = document.getElementById('details-view-' + target);
      if (targetView) targetView.classList.add('active');
      return;
    }
  });
});

