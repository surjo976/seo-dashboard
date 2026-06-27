export default class ChartController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    this.view.renderSeoSummaryChart(this.model.seoSummaryLines);
    this.view.renderPagesCrawledDonut(this.model.pagesCrawledConfig);
    this.view.renderIssuesOverviewDonut(this.model.issuesOverviewConfig);
  }
}
