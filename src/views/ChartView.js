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

  renderSeoSummaryChart(lines, activePoint = null) {
    if (!this.seoCanvas) return;
    const ctx = this.seoCanvas.getContext("2d");
    this.seoCanvas.width = 909;
    this.seoCanvas.height = 375;

    ctx.clearRect(0, 0, 909, 375);

    const drawCurve = (line) => {
      const { points, color } = line;
      if (!points || points.length < 2) return;

      // Draw Fill
      const fillGradient = ctx.createLinearGradient(0, 0, 0, 375);
      fillGradient.addColorStop(0, this.hexToRgbA(color, 0.22));
      fillGradient.addColorStop(1, this.hexToRgbA(color, 0.01));

      ctx.beginPath();
      ctx.moveTo(points[0].x, 375);
      ctx.lineTo(points[0].x, points[0].y);

      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i - 1] || points[i];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2] || p2;

        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;

        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
      }

      ctx.lineTo(points[points.length - 1].x, 375);
      ctx.closePath();
      ctx.fillStyle = fillGradient;
      ctx.fill();

      // Draw Stroke
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i - 1] || points[i];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2] || p2;

        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;

        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
      }

      ctx.strokeStyle = color;
      ctx.lineWidth = 3.5;
      ctx.stroke();

      // Draw Dots
      points.forEach(pt => {
        if (pt.x >= 0 && pt.x <= 909) {
          const isActive = activePoint && activePoint.x === pt.x && activePoint.y === pt.y;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, isActive ? 6 : 4.5, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.fill();
          ctx.strokeStyle = color;
          ctx.lineWidth = isActive ? 4 : 3;
          ctx.stroke();

          if (isActive) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 10, 0, Math.PI * 2);
            ctx.strokeStyle = this.hexToRgbA(color, 0.4);
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        }
      });
    };

    lines.forEach(line => drawCurve(line));
  }

  bindChartHover(lines, onHover) {
    if (!this.seoCanvas) return;

    this.seoCanvas.addEventListener("mousemove", (e) => {
      const rect = this.seoCanvas.getBoundingClientRect();
      const scaleX = this.seoCanvas.width / rect.width;
      const scaleY = this.seoCanvas.height / rect.height;
      const mouseX = (e.clientX - rect.left) * scaleX;
      const mouseY = (e.clientY - rect.top) * scaleY;

      let closestPt = null;
      let closestLine = null;
      let minDistance = 35; // max threshold radius

      lines.forEach(line => {
        line.points.forEach(pt => {
          if (pt.x >= 0 && pt.x <= 909) {
            const dist = Math.hypot(mouseX - pt.x, mouseY - pt.y);
            if (dist < minDistance) {
              minDistance = dist;
              closestPt = pt;
              closestLine = line;
            }
          }
        });
      });

      if (closestPt && closestLine) {
        const percentX = (closestPt.x / this.seoCanvas.width) * 100;
        const percentY = (closestPt.y / this.seoCanvas.height) * 100;
        onHover({
          name: closestLine.name,
          value: closestPt.value,
          color: closestLine.color,
          x: closestPt.x,
          y: closestPt.y,
          percentX,
          percentY
        });
      } else {
        onHover(null);
      }
    });

    this.seoCanvas.addEventListener("mouseleave", () => {
      onHover(null);
    });
  }

  renderPagesCrawledDonut(config) {
    if (!this.crawledCanvas) return;
    const ctx = this.crawledCanvas.getContext("2d");
    const { size, segments } = config;
    this.crawledCanvas.width = size;
    this.crawledCanvas.height = size;
    const cx = size / 2;
    const cy = size / 2;

    ctx.clearRect(0, 0, size, size);

    segments.forEach(seg => {
      const startRad = (seg.startDeg * Math.PI) / 180;
      const endRad = (seg.endDeg * Math.PI) / 180;
      ctx.beginPath();
      ctx.arc(cx, cy, seg.radius, startRad, endRad, false);
      ctx.strokeStyle = seg.color;
      ctx.lineWidth = seg.lineWidth;
      ctx.lineCap = "butt";
      ctx.stroke();
    });

    // Transparent Inner Cutout
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark' || document.body.getAttribute('data-theme') === 'dark';
    const innerRadius = 77;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(cx, cy, innerRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Inner Border Line
    ctx.beginPath();
    ctx.arc(cx, cy, innerRadius, 0, Math.PI * 2);
    ctx.strokeStyle = isDark ? "#30363d" : "#e0e0e0";
    ctx.lineWidth = 4;
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

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark' || document.body.getAttribute('data-theme') === 'dark';
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(cx, cy, radius - lineWidth / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.beginPath();
    ctx.arc(cx, cy, radius - lineWidth / 2, 0, Math.PI * 2);
    ctx.strokeStyle = isDark ? "#30363d" : "#e0e0e0";
    ctx.lineWidth = 3;
    ctx.stroke();
  }
}
