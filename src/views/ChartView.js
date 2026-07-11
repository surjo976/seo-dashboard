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

  renderSeoSummaryChart(lines, activePoint = null, progress = 1.0) {
    if (!this.seoCanvas) return;
    const ctx = this.seoCanvas.getContext("2d");
    this.seoCanvas.width = 909;
    this.seoCanvas.height = 375;

    ctx.clearRect(0, 0, 909, 375);

    // Save context and apply clipping rectangle to animate from left to right
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, 909 * progress, 375);
    ctx.clip();

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
          const isActive = activePoint && activePoint.x === pt.x && Math.abs(activePoint.y - pt.y) < 0.5;
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
    ctx.restore();
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

  renderPagesCrawledDonut(config, progressGrey = 1.0, progressBlue = 1.0) {
    if (!this.crawledCanvas) return;
    const ctx = this.crawledCanvas.getContext("2d");
    const { size, segments } = config;
    this.crawledCanvas.width = size;
    this.crawledCanvas.height = size;
    const cx = size / 2;
    const cy = size / 2;

    ctx.clearRect(0, 0, size, size);

    const blueSeg = segments[0]; // Blue progress ring (drawn on top)
    const greySeg = segments[1]; // Grey background ring

    // 1. Draw grey background ring (full circle, animated sweep)
    if (progressGrey > 0 && greySeg) {
      const startAngle = -Math.PI / 2; // Start from top (12 o'clock)
      const sweepAngle = 2 * Math.PI * progressGrey;

      ctx.beginPath();
      ctx.arc(cx, cy, greySeg.radius, startAngle, startAngle + sweepAngle, false);
      ctx.strokeStyle = greySeg.color;
      ctx.lineWidth = greySeg.lineWidth;
      ctx.lineCap = "butt";
      ctx.stroke();
    }

    // 2. Draw blue progress ring on top (93% = ~335° of 360°, animated sweep)
    if (progressBlue > 0 && blueSeg) {
      const progressDeg = blueSeg.progressDeg || 335;
      const startAngle = -Math.PI / 2; // Start from top (12 o'clock)
      const fullSweep = (progressDeg * Math.PI) / 180;
      const sweepAngle = fullSweep * progressBlue;

      ctx.beginPath();
      ctx.arc(cx, cy, blueSeg.radius, startAngle, startAngle + sweepAngle, false);
      ctx.strokeStyle = blueSeg.color;
      ctx.lineWidth = blueSeg.lineWidth;
      ctx.lineCap = "butt";
      ctx.stroke();
    }

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
    const { size, radius, lineWidth, segments } = config;

    // Set canvas dimensions explicitly to match size
    this.issuesCanvas.width = size;
    this.issuesCanvas.height = size;
    const cx = size / 2;
    const cy = size / 2;

    ctx.clearRect(0, 0, size, size);

    segments.forEach(seg => {
      // Use model's start/end degrees directly
      const startAngle = (seg.start * Math.PI) / 180;
      const endAngle   = (seg.end   * Math.PI) / 180;

      let currentLineWidth = lineWidth;
      let currentRadius = radius;

      // Make the Blue segment (#3594ee) 1.5x thicker
      if (seg.color === "#3594ee") {
        currentLineWidth = lineWidth * 1.5;
        // Adjust radius so the inner radius remains exactly aligned with others (radius - lineWidth/2)
        // Others innerR: 73 - 13.5 = 59.5
        // Blue innerR: 79.75 - 20.25 = 59.5
        currentRadius = radius + (lineWidth * 0.25);
      }

      const outerR = currentRadius + currentLineWidth / 2;
      const innerR = currentRadius - currentLineWidth / 2;

      ctx.save();
      ctx.beginPath();
      // Draw outer arc
      ctx.arc(cx, cy, outerR, startAngle, endAngle, false);
      // Connect to inner arc
      ctx.lineTo(cx + innerR * Math.cos(endAngle), cy + innerR * Math.sin(endAngle));
      // Draw inner arc counter-clockwise
      ctx.arc(cx, cy, innerR, endAngle, startAngle, true);
      ctx.closePath();
      
      ctx.fillStyle = seg.color;
      ctx.fill();
      ctx.restore();
    });
  }
}
