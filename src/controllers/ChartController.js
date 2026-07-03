export default class ChartController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.tooltipEl = document.getElementById("chartTooltip");
    this.ttLabelEl = document.getElementById("ttLabel");
    this.ttValEl = document.getElementById("ttVal");
    this.animationFrameId = null;
  }

  init() {
    this.startEntranceAnimation();

    this.view.bindChartHover(this.model.seoSummaryLines, (info) => {
      this.handleChartHover(info);
    });
  }

  startEntranceAnimation() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    const startTime = performance.now();
    const durationLine = 1200; // 1.2s for line chart rise
    const durationGrey = 600; // 0.6s for grey circle clockwise
    const durationBlue = 900; // 0.9s for blue circle counter-clockwise
    const delayBlue = 500;    // starts 0.5s after animation starts

    // Easing functions
    const easeInQuad = (t) => t * t; // Acceleration style
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3); // Smooth ease out

    const animate = (now) => {
      const elapsed = now - startTime;

      // 1. Line chart progress
      const tLine = Math.min(elapsed / durationLine, 1);
      const progressLine = easeOutCubic(tLine);

      // 2. Pages Crawled donut progress
      const tGrey = Math.min(Math.max(elapsed / durationGrey, 0), 1);
      const progressGrey = easeInQuad(tGrey);

      const tBlue = Math.min(Math.max((elapsed - delayBlue) / durationBlue, 0), 1);
      const progressBlue = easeOutCubic(tBlue);

      // Render frame
      this.view.renderSeoSummaryChart(this.model.seoSummaryLines, null, progressLine);
      this.view.renderPagesCrawledDonut(this.model.pagesCrawledConfig, progressGrey, progressBlue);
      this.view.renderIssuesOverviewDonut(this.model.issuesOverviewConfig);

      if (elapsed < Math.max(durationLine, delayBlue + durationBlue)) {
        this.animationFrameId = requestAnimationFrame(animate);
      } else {
        this.animationFrameId = null;
      }
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  renderAll() {
    // Stop any running animations
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    // Render static state
    this.view.renderSeoSummaryChart(this.model.seoSummaryLines, null, 1.0);
    this.view.renderPagesCrawledDonut(this.model.pagesCrawledConfig, 1.0, 1.0);
    this.view.renderIssuesOverviewDonut(this.model.issuesOverviewConfig);
  }

  handleChartHover(info) {
    // If animation is active, don't allow hover details to interrupt rendering
    if (this.animationFrameId) return;

    if (!info) {
      if (this.tooltipEl) this.tooltipEl.style.display = "none";
      this.view.renderSeoSummaryChart(this.model.seoSummaryLines, null, 1.0);
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

    this.view.renderSeoSummaryChart(this.model.seoSummaryLines, { x: info.x, y: info.y }, 1.0);
  }
}
