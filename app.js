document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Sidebar Menu Navigation Active State Toggle
  const menuItems = document.querySelectorAll(".menu-item");
  menuItems.forEach(item => {
    item.addEventListener("click", (e) => {
      // Don't prevent default as some might link, but for dashboard showcase:
      e.preventDefault();
      menuItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
    });
  });

  // Audit Tab switching Active State
  const tabItems = document.querySelectorAll(".tab-item");
  tabItems.forEach(tab => {
    tab.addEventListener("click", () => {
      tabItems.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });

  // Table filtering logic
  const filterButtons = document.querySelectorAll(".filter-btn");
  const tableRows = document.querySelectorAll("#issuesTableBody tr");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      tableRows.forEach(row => {
        const rowCategory = row.getAttribute("data-category");
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

  // Dark/Light Theme Toggle
  const themeToggleBtn = document.querySelector(".theme-toggle");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", nextTheme);

      // Swap the theme icon
      const icon = themeToggleBtn.querySelector("i");
      if (icon) {
        if (nextTheme === "dark") {
          icon.setAttribute("data-lucide", "moon");
        } else {
          icon.setAttribute("data-lucide", "sun");
        }
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      }
    });
  }

  // Mobile Sidebar Toggle
  const mobileToggle = document.getElementById("mobileToggle");
  const sidebar = document.getElementById("sidebar");

  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      sidebar.classList.toggle("active");
    });

    // Close sidebar on clicking outside
    document.addEventListener("click", (e) => {
      if (sidebar.classList.contains("active") && !sidebar.contains(e.target) && e.target !== mobileToggle) {
        sidebar.classList.remove("active");
      }
    });
  }

  // Double Check Checkbox interactivity on Action Plan
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
