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

    window.addEventListener("resize", () => {
      this.renderAll();
    });
  }

  startEntranceAnimation() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    // Render the Chart.js donut chart once so it runs its native entry animation
    this.view.renderIssuesOverviewDonut(this.model.issuesOverviewConfig);

    const startTime = performance.now();
    const durationLine = 2400; // 2.4s for line chart rise
    const durationGrey = 1200; // 1.2s for grey circle clockwise
    const durationBlue = 2000; // 2.0s for blue circle counter-clockwise
    const delayBlue = 800;    // starts 0.6s after animation starts
    const durationIssues = 2500; // 2.2s for issues donut sweep

    // Easing functions
    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

    const animate = (now) => {
      const elapsed = now - startTime;

      // 1. Line chart progress
      const tLine = Math.min(elapsed / durationLine, 1);
      const progressLine = easeOutQuint(tLine);

      // 2. Pages Crawled donut
      const tGrey = Math.min(Math.max(elapsed / durationGrey, 0), 1);
      const progressGrey = easeInOutCubic(tGrey);
      const tBlue = Math.min(Math.max((elapsed - delayBlue) / durationBlue, 0), 1);
      const progressBlue = easeOutQuint(tBlue);

      // 3. Issues Overview donut
      const tIssues = Math.min(Math.max(elapsed / durationIssues, 0), 1);
      const progressIssues = easeOutQuint(tIssues);

      // Render frame
      this.view.renderSeoSummaryChart(this.model.seoSummaryLines, null, progressLine);
      this.view.renderPagesCrawledDonut(this.model.pagesCrawledConfig, progressGrey, progressBlue);
      this.view.renderIssuesOverviewDonut(this.model.issuesOverviewConfig, progressIssues);

      const totalDuration = Math.max(durationLine, delayBlue + durationBlue, durationIssues);
      if (elapsed < totalDuration) {
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
      const clampedX = Math.max(15, Math.min(85, info.percentX));
      const clampedY = Math.max(10, Math.min(90, info.percentY));
      this.tooltipEl.style.left = `${clampedX}%`;
      this.tooltipEl.style.top = `${clampedY}%`;

      if (info.percentY < 35) {
        this.tooltipEl.style.transform = "translate(-50%, 14px)";
      } else {
        this.tooltipEl.style.transform = "translate(-50%, -100%) translateY(-10px)";
      }

      this.tooltipEl.style.display = "flex";
    }

    this.view.renderSeoSummaryChart(this.model.seoSummaryLines, { x: info.x, y: info.y }, 1.0);
  }
}
