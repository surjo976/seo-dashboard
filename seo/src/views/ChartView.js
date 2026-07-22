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

    const container = this.seoCanvas.parentElement;
    const width = container ? container.clientWidth || 909 : 909;
    const height = container ? (container.clientHeight || 280) : 280;

    if (this.seoCanvas.width !== width || this.seoCanvas.height !== height) {
      this.seoCanvas.width = width;
      this.seoCanvas.height = height;
    }

    ctx.clearRect(0, 0, width, height);

    const scaleX = width / 909;
    const scaleY = height / 375;

    // Save context and apply clipping rectangle to animate from left to right
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, width * progress, height);
    ctx.clip();

    const drawCurve = (line) => {
      const { points, color } = line;
      if (!points || points.length < 2) return;

      const scaledPoints = points.map(pt => ({
        x: pt.x * scaleX,
        y: pt.y * scaleY,
        value: pt.value,
        origX: pt.x
      }));

      // Draw Fill
      const fillGradient = ctx.createLinearGradient(0, 0, 0, height);
      fillGradient.addColorStop(0, this.hexToRgbA(color, 0.22));
      fillGradient.addColorStop(1, this.hexToRgbA(color, 0.01));

      ctx.beginPath();
      ctx.moveTo(scaledPoints[0].x, height);
      ctx.lineTo(scaledPoints[0].x, scaledPoints[0].y);

      for (let i = 0; i < scaledPoints.length - 1; i++) {
        const p0 = scaledPoints[i - 1] || scaledPoints[i];
        const p1 = scaledPoints[i];
        const p2 = scaledPoints[i + 1];
        const p3 = scaledPoints[i + 2] || p2;

        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;

        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
      }

      ctx.lineTo(scaledPoints[scaledPoints.length - 1].x, height);
      ctx.closePath();
      ctx.fillStyle = fillGradient;
      ctx.fill();

      // Draw Stroke
      ctx.beginPath();
      ctx.moveTo(scaledPoints[0].x, scaledPoints[0].y);

      for (let i = 0; i < scaledPoints.length - 1; i++) {
        const p0 = scaledPoints[i - 1] || scaledPoints[i];
        const p1 = scaledPoints[i];
        const p2 = scaledPoints[i + 1];
        const p3 = scaledPoints[i + 2] || p2;

        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;

        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
      }

      const isMobile = width < 600;
      const strokeWidth = isMobile ? 1.8 : 3.5;
      const baseDotRadius = isMobile ? 3.0 : 5;
      const activeDotRadius = isMobile ? 4.5 : 6.5;

      ctx.strokeStyle = color;
      ctx.lineWidth = strokeWidth;
      ctx.stroke();

      // Draw Dots
      scaledPoints.forEach(pt => {
        if (pt.origX >= 0 && pt.origX <= 909) {
          const isActive = activePoint && activePoint.x === pt.origX && Math.abs(activePoint.y - (pt.y / scaleY)) < 0.5;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, isActive ? activeDotRadius : baseDotRadius, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = isActive ? (isMobile ? 1.8 : 2.5) : (isMobile ? 1.2 : 2);
          ctx.stroke();

          if (isActive) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, isMobile ? 7.5 : 11, 0, Math.PI * 2);
            ctx.strokeStyle = this.hexToRgbA(color, 0.4);
            ctx.lineWidth = isMobile ? 1.4 : 2;
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

    const handlePointer = (e) => {
      const rect = this.seoCanvas.getBoundingClientRect();
      const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;

      if (clientX === undefined || clientY === undefined) return;

      const mouseX = (clientX - rect.left) * (909 / rect.width);
      const mouseY = (clientY - rect.top) * (375 / rect.height);

      let closestPt = null;
      let closestLine = null;
      let minDistance = rect.width < 600 ? 110 : 60; // larger hit radius for mobile touch

      lines.forEach(line => {
        line.points.forEach(pt => {
          if (pt.x >= 0 && pt.x <= 909) {
            const dist = Math.hypot(mouseX - pt.x, (mouseY - pt.y) * 0.4);
            if (dist < minDistance) {
              minDistance = dist;
              closestPt = pt;
              closestLine = line;
            }
          }
        });
      });

      if (closestPt && closestLine) {
        const percentX = (closestPt.x / 909) * 100;
        const percentY = (closestPt.y / 375) * 100;
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
    };

    this.seoCanvas.addEventListener("mousemove", handlePointer);
    this.seoCanvas.addEventListener("mouseleave", () => onHover(null));

    this.seoCanvas.addEventListener("touchstart", (e) => {
      handlePointer(e);
    }, { passive: true });

    this.seoCanvas.addEventListener("touchmove", (e) => {
      handlePointer(e);
    }, { passive: true });
  }

  renderPagesCrawledDonut(config, progressGrey = 1.0, progressBlue = 1.0) {
    if (!this.crawledCanvas) return;
    const ctx = this.crawledCanvas.getContext("2d");
    const { size, segments } = config;
    if (this.crawledCanvas.width !== size || this.crawledCanvas.height !== size) {
      this.crawledCanvas.width = size;
      this.crawledCanvas.height = size;
    }
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
    const innerRadius = 68;
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

  renderIssuesOverviewDonut(config, progress = 1.0) {
    if (!this.issuesCanvas) return;
    const ctx = this.issuesCanvas.getContext("2d");
    const { size, segments } = config;

    if (this.issuesCanvas.width !== size || this.issuesCanvas.height !== size) {
      this.issuesCanvas.width = size;
      this.issuesCanvas.height = size;
    }
    const cx = size / 2;
    const cy = size / 2;

    ctx.clearRect(0, 0, size, size);

    const baseRadius = 64;
    const baseLineWidth = 28;

    // Total sweep angle available at this progress step (starts from -90 deg)
    const maxDeg = -90 + (360 * progress);

    segments.forEach(seg => {
      if (seg.start >= maxDeg) return;

      const startAngle = (seg.start * Math.PI) / 180;
      const endDeg = Math.min(seg.end, maxDeg);
      const endAngle = (endDeg * Math.PI) / 180;

      let r = baseRadius;
      let lw = baseLineWidth;

      // Blue segment (#3594EE) pops out thicker and slightly outer
      const isBlue = seg.color.toUpperCase() === "#3594EE";
      if (isBlue) {
        lw = baseLineWidth + 10;
        r = baseRadius + 4;
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, startAngle, endAngle, false);
      ctx.strokeStyle = seg.color;
      ctx.lineWidth = lw;
      ctx.lineCap = "butt";
      ctx.stroke();
      ctx.restore();
    });

    // Clear inner hole for clean donut center
    const innerHoleRadius = baseRadius - (baseLineWidth / 2);
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(cx, cy, innerHoleRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
