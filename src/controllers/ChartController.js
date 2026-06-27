export default class ChartController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.tooltipEl = document.getElementById("chartTooltip");
    this.ttLabelEl = document.getElementById("ttLabel");
    this.ttValEl = document.getElementById("ttVal");
  }

  init() {
    this.renderAll();

    this.view.bindChartHover(this.model.seoSummaryLines, (info) => {
      this.handleChartHover(info);
    });
  }

  renderAll() {
    this.view.renderSeoSummaryChart(this.model.seoSummaryLines);
    this.view.renderPagesCrawledDonut(this.model.pagesCrawledConfig);
    this.view.renderIssuesOverviewDonut(this.model.issuesOverviewConfig);
  }

  handleChartHover(info) {
    if (!info) {
      if (this.tooltipEl) this.tooltipEl.style.display = "none";
      this.view.renderSeoSummaryChart(this.model.seoSummaryLines, null);
      return;
    }

    if (this.tooltipEl && this.ttLabelEl && this.ttValEl) {
      this.ttLabelEl.textContent = info.name;
      this.ttValEl.textContent = `${info.value}%`;
      this.ttValEl.style.color = info.color;
      this.tooltipEl.style.left = `${info.percentX}%`;
      this.tooltipEl.style.top = `${info.percentY}%`;
      this.tooltipEl.style.transform = "translate(-50%, -100%) translateY(-10px)";
      this.tooltipEl.style.display = "flex";
    }

    this.view.renderSeoSummaryChart(this.model.seoSummaryLines, { x: info.x, y: info.y });
  }
}
