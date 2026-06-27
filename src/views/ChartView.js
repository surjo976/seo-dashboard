export default class ChartView {
  constructor() {
    this.seoCanvas = document.getElementById("seoSummaryChart");
    this.crawledCanvas = document.getElementById("pagesCrawledDonut");
    this.issuesCanvas = document.getElementById("issuesOverviewDonut");
  }

  hexToRgbA(hex, alpha) {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
    }
    return hex;
  }

  renderSeoSummaryChart(lines) {
    if (!this.seoCanvas) return;
    const ctx = this.seoCanvas.getContext("2d");
    this.seoCanvas.width = 909;
    this.seoCanvas.height = 375;

    const drawCurve = (points, color) => {
      // Draw Fill
      const fillGradient = ctx.createLinearGradient(0, 0, 0, 375);
      fillGradient.addColorStop(0, this.hexToRgbA(color, 0.15));
      fillGradient.addColorStop(1, this.hexToRgbA(color, 0.01));

      ctx.beginPath();
      ctx.moveTo(points[0][0], 375);
      ctx.lineTo(points[0][0], points[0][1]);

      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i - 1] || points[i];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2] || p2;

        const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
        const cp1y = p1[1] + (p2[1] - p0[1]) / 6;

        const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
        const cp2y = p2[1] - (p3[1] - p1[1]) / 6;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2[0], p2[1]);
      }

      ctx.lineTo(points[points.length - 1][0], 375);
      ctx.closePath();
      ctx.fillStyle = fillGradient;
      ctx.fill();

      // Draw Stroke
      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);

      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i - 1] || points[i];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2] || p2;

        const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
        const cp1y = p1[1] + (p2[1] - p0[1]) / 6;

        const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
        const cp2y = p2[1] - (p3[1] - p1[1]) / 6;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2[0], p2[1]);
      }

      ctx.strokeStyle = color;
      ctx.lineWidth = 3.5;
      ctx.stroke();

      // Draw Dots
      points.forEach(pt => {
        if (pt[0] >= 0 && pt[0] <= 909) {
          ctx.beginPath();
          ctx.arc(pt[0], pt[1], 4.5, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.fill();
          ctx.strokeStyle = color;
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      });
    };

    ctx.clearRect(0, 0, 909, 375);
    lines.forEach(line => drawCurve(line.points, line.color));
  }

  renderPagesCrawledDonut(config) {
    if (!this.crawledCanvas) return;
    const ctx = this.crawledCanvas.getContext("2d");
    const { size, radius, lineWidth, segments } = config;
    this.crawledCanvas.width = size;
    this.crawledCanvas.height = size;
    const cx = size / 2;
    const cy = size / 2;

    ctx.clearRect(0, 0, size, size);

    segments.forEach(seg => {
      const startRad = (seg.startDeg * Math.PI) / 180;
      const endRad = (seg.endDeg * Math.PI) / 180;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, startRad, endRad, false);
      ctx.strokeStyle = seg.color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "butt";
      ctx.stroke();
    });

    // Inner white circle and outline
    ctx.beginPath();
    ctx.arc(cx, cy, radius - lineWidth / 2, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.strokeStyle = "#e5e5e5";
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  renderIssuesOverviewDonut(config) {
    if (!this.issuesCanvas) return;
    const ctx = this.issuesCanvas.getContext("2d");
    const { size, radius, lineWidth, shiftDist, segments } = config;
    this.issuesCanvas.width = size;
    this.issuesCanvas.height = size;
    const cx = size / 2;
    const cy = size / 2;

    ctx.clearRect(0, 0, size, size);

    const dx = shiftDist * Math.cos(-Math.PI / 4);
    const dy = shiftDist * Math.sin(-Math.PI / 4);

    segments.forEach(seg => {
      ctx.beginPath();
      const currentCx = seg.explode ? cx + dx : cx;
      const currentCy = seg.explode ? cy + dy : cy;
      ctx.arc(currentCx, currentCy, radius, (seg.start * Math.PI) / 180, (seg.end * Math.PI) / 180);
      ctx.strokeStyle = seg.color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "butt";
      ctx.stroke();
    });

    // Inner white circle outline
    ctx.beginPath();
    ctx.arc(cx, cy, radius - lineWidth / 2, 0, Math.PI * 2);
    ctx.strokeStyle = "#e5e5e5";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}
