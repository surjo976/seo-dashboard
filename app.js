document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ==============================
  // DRAW SEO SUMMARY AREA CHART
  // ==============================
  const seoCanvas = document.getElementById("seoSummaryChart");
  if (seoCanvas) {
    const ctx = seoCanvas.getContext("2d");
    
    // Set internal resolution to 909x375
    seoCanvas.width = 909;
    seoCanvas.height = 375;

    const lines = [
      { // Technical SEO (Green)
        color: "#30b8a4",
        points: [[-263, 295.9], [-113, 295.9], [59, 325], [183, 284], [433, 330], [653, 107], [808, 255], [1005, 295.9], [1156, 295.9]]
      },
      { // SEO Health (Blue)
        color: "#3594ee",
        points: [[-263, 242], [-113, 242], [6, 229], [195, 329], [367, 187], [536, 315], [721, 48], [902, 248], [1005, 242], [1156, 242]]
      },
      { // AI Visibility (Purple)
        color: "#6645c7",
        points: [[-260, 265], [-110, 265], [12, 331], [168, 329], [342, 270], [472, 183], [640, 291], [839, 332], [1008, 265], [1159, 265]]
      },
      { // Content Quality (Orange)
        color: "#ff9f4e",
        points: [[-260, 265], [-110, 265], [55, 273], [274, 223], [506, 117], [687, 240], [843, 270], [1159, 265]]
      }
    ];

    // Helper to convert hex to rgba
    function hexToRgbA(hex, alpha) {
      let c;
      if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
          c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x' + c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+alpha+')';
      }
      return hex;
    }

    // Function to draw smooth Catmull-Rom curve
    function drawCurve(points, color) {
      // Draw Fill
      const fillGradient = ctx.createLinearGradient(0, 0, 0, 375);
      fillGradient.addColorStop(0, hexToRgbA(color, 0.15));
      fillGradient.addColorStop(1, hexToRgbA(color, 0.01));

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
    }

    // Clear canvas
    ctx.clearRect(0, 0, 909, 375);

    // Draw curves
    lines.forEach(line => drawCurve(line.points, line.color));
  }

  // ==============================
  // DRAW PAGES CRAWLED DONUT
  // ==============================
  const crawledCanvas = document.getElementById("pagesCrawledDonut");
  if (crawledCanvas) {
    const ctx = crawledCanvas.getContext("2d");
    const size = 160;
    crawledCanvas.width = size;
    crawledCanvas.height = size;
    const cx = size / 2;
    const cy = size / 2;
    const radius = 56;
    const lineWidth = 40;

    // Clear canvas first
    ctx.clearRect(0, 0, size, size);

    // Blue segment: clockwise from 295 degrees to 172 degrees
    const startBlue = (295 * Math.PI) / 180;
    const endBlue = (172 * Math.PI) / 180;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, startBlue, endBlue, false);
    ctx.strokeStyle = "#3594ee";
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "butt";
    ctx.stroke();

    // Gray segment: clockwise from 188 degrees to 278 degrees
    const startGray = (188 * Math.PI) / 180;
    const endGray = (278 * Math.PI) / 180;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, startGray, endGray, false);
    ctx.strokeStyle = "#e0e0e0";
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "butt";
    ctx.stroke();

    // Inner white circle and outline
    ctx.beginPath();
    ctx.arc(cx, cy, radius - lineWidth / 2, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.strokeStyle = "#e5e5e5";
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  // ==============================
  // DRAW ISSUES OVERVIEW DONUT
  // ==============================
  const issuesCanvas = document.getElementById("issuesOverviewDonut");
  if (issuesCanvas) {
    const ctx = issuesCanvas.getContext("2d");
    const size = 200;
    issuesCanvas.width = size;
    issuesCanvas.height = size;
    const cx = size / 2;
    const cy = size / 2;
    const radius = 75;
    const lineWidth = 22;

    // Draw the 5 specific segments matching the design
    const segments = [
      { start: -90, end: 0, color: "#3594ee" },    // Blue segment
      { start: 0, end: 120, color: "#2bb755" },    // Green segment
      { start: 120, end: 210, color: "#ff9f4e" },  // Orange segment
      { start: 210, end: 255, color: "#a37a4c" },  // Brown segment
      { start: 255, end: 270, color: "#ff4b55" }   // Red segment
    ];

    segments.forEach(seg => {
      ctx.beginPath();
      ctx.arc(cx, cy, radius, (seg.start * Math.PI) / 180, (seg.end * Math.PI) / 180);
      ctx.strokeStyle = seg.color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "butt";
      ctx.stroke();
    });
  }

  // ==============================
  // SIDEBAR INTERACTIONS
  // ==============================
  // Don't change active states for the menu items in the sidebar since they're pre-set

  // ==============================
  // AUDIT TAB SWITCHING
  // ==============================
  const tabItems = document.querySelectorAll(".tab");
  tabItems.forEach(tab => {
    tab.addEventListener("click", () => {
      tabItems.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });

  // ==============================
  // TABLE FILTER LOGIC
  // ==============================
  const filterButtons = document.querySelectorAll(".ftab");
  const tableRows = document.querySelectorAll("#tableBody tr");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      tableRows.forEach(row => {
        const rowCategory = row.getAttribute("data-cat");
        if (filterValue === "all") {
          row.style.display = "";
        } else if (filterValue === rowCategory) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  });

  // ==============================
  // DARK/LIGHT THEME TOGGLE
  // ==============================
  const themeToggleBtn = document.getElementById("themeToggle");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", nextTheme);

      const icon = themeToggleBtn.querySelector("i");
      if (icon) {
        icon.setAttribute("data-lucide", nextTheme === "dark" ? "moon" : "sun");
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      }
    });
  }

  // ==============================
  // MOBILE SIDEBAR TOGGLE
  // ==============================
  const mobileToggle = document.getElementById("mobileToggle");
  const sidebar = document.getElementById("sidebar");

  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      sidebar.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (sidebar.classList.contains("active") && !sidebar.contains(e.target) && e.target !== mobileToggle) {
        sidebar.classList.remove("active");
      }
    });
  }

  // ==============================
  // CHECKBOX INTERACTIVITY
  // ==============================
  const planCheckboxes = document.querySelectorAll(".checkbox-container input[type='checkbox']");
  planCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      const label = checkbox.nextElementSibling;
      if (checkbox.checked) {
        label.style.textDecoration = "line-through";
        label.style.opacity = "0.6";
      } else {
        label.style.textDecoration = "none";
        label.style.opacity = "1";
      }
    });
  });
});
