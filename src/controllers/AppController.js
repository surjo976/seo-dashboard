export default class AppController {
  constructor(sidebarView) {
    this.sidebarView = sidebarView;
    this.urlData = {
      "www.example.com/blog/seo-audit-guide": {
        issue: "Generic Anchor Text",
        desc: "This page has 12 internal links using generic anchor texts like \"Click here\" or \"Read more\".",
        examples: [
          { anchor: "\"Click here\"", dest: "www.example.com/seo-tools", colorClass: "bg-gray-bullet" },
          { anchor: "\"Read more\"", dest: "www.example.com/seo-checker", colorClass: "bg-gray-bullet" },
          { anchor: "\"Learn more\"", dest: "www.example.com/backlink-guide", colorClass: "bg-gray-bullet" }
        ],
        viewAllText: "View all 12 links",
        aiRec: "Replace generic anchor texts with descriptive, keyword-rich anchors to improve relevance and help search engines understand context.",
        suggested: [
          { anchor: "\"SEO Audit Tools\"", dest: "www.example.com/seo-tools", colorClass: "bg-green" },
          { anchor: "\"SEO Checker\"", dest: "www.example.com/seo-checker", colorClass: "bg-green" },
          { anchor: "\"Learn more\"", dest: "www.example.com/backlink-guide", colorClass: "bg-green" }
        ],
        impactGainValue: "+14%",
        impactLevelValue: "High",
        impactTimeValue: "~20 Min"
      },
      "www.example.com/blog/keyword-cannibalization": {
        issue: "Missing Internal Links",
        desc: "This page contains high-value content but has 0 incoming internal links from other blog posts.",
        examples: [
          { anchor: "\"SEO strategies\"", dest: "www.example.com/blog/keyword-cannibalization", colorClass: "bg-gray-bullet" },
          { anchor: "\"keyword mapping\"", dest: "www.example.com/blog/keyword-cannibalization", colorClass: "bg-gray-bullet" }
        ],
        viewAllText: "View all 2 links",
        aiRec: "Add at least 3 incoming internal links from topically relevant pages using descriptive anchor texts to pass link authority.",
        suggested: [
          { anchor: "\"keyword cannibalization guide\"", dest: "www.example.com/blog/keyword-cannibalization", colorClass: "bg-green" },
          { anchor: "\"rank cannibalization\"", dest: "www.example.com/blog/keyword-cannibalization", colorClass: "bg-green" }
        ],
        impactGainValue: "+12%",
        impactLevelValue: "High",
        impactTimeValue: "~15 Min"
      },
      "www.example.com/blog/technical-seo": {
        issue: "Generic Anchor Text",
        desc: "This page has 8 internal links using generic anchor texts like \"Go here\" or \"Read\".",
        examples: [
          { anchor: "\"Go here\"", dest: "www.example.com/technical-seo-guide", colorClass: "bg-gray-bullet" },
          { anchor: "\"Read\"", dest: "www.example.com/technical-seo-guide", colorClass: "bg-gray-bullet" }
        ],
        viewAllText: "View all 8 links",
        aiRec: "Replace generic anchor texts with descriptive, keyword-rich anchors to improve technical context.",
        suggested: [
          { anchor: "\"Technical SEO Guide\"", dest: "www.example.com/technical-seo-guide", colorClass: "bg-green" },
          { anchor: "\"technical audit checklist\"", dest: "www.example.com/technical-seo-guide", colorClass: "bg-green" }
        ],
        impactGainValue: "+8%",
        impactLevelValue: "Medium",
        impactTimeValue: "~10 Min"
      },
      "www.example.com/blog/on-page-optimization": {
        issue: "Weak Anchor Text",
        desc: "This page has 5 links with weak anchor text that doesn't convey context.",
        examples: [
          { anchor: "\"Link\"", dest: "www.example.com/blog/on-page-seo-checklist", colorClass: "bg-gray-bullet" },
          { anchor: "\"this post\"", dest: "www.example.com/blog/on-page-seo-checklist", colorClass: "bg-gray-bullet" }
        ],
        viewAllText: "View all 5 links",
        aiRec: "Improve anchor text quality by integrating target keywords instead of vague phrases.",
        suggested: [
          { anchor: "\"On-Page SEO Checklist\"", dest: "www.example.com/blog/on-page-seo-checklist", colorClass: "bg-green" },
          { anchor: "\"on-page optimization\"", dest: "www.example.com/blog/on-page-seo-checklist", colorClass: "bg-green" }
        ],
        impactGainValue: "+6%",
        impactLevelValue: "Medium",
        impactTimeValue: "~10 Min"
      },
      "www.example.com/blog/content-audit": {
        issue: "Missing Internal Links",
        desc: "This page is orphaned or has low internal link visibility, limiting its crawl frequency.",
        examples: [
          { anchor: "\"content auditing\"", dest: "www.example.com/blog/content-audit-guide", colorClass: "bg-gray-bullet" }
        ],
        viewAllText: "View all 1 links",
        aiRec: "Add internal links from your core services pages and relevant blogs to boost its SEO value.",
        suggested: [
          { anchor: "\"Content Audit Guide\"", dest: "www.example.com/blog/content-audit-guide", colorClass: "bg-green" },
          { anchor: "\"how to audit content\"", dest: "www.example.com/blog/content-audit-guide", colorClass: "bg-green" }
        ],
        impactGainValue: "+10%",
        impactLevelValue: "Medium",
        impactTimeValue: "~15 Min"
      },
      "www.example.com/blog/link-building": {
        issue: "Weak Anchor Text",
        desc: "This page has 3 links with vague keywords in anchor texts.",
        examples: [
          { anchor: "\"click here\"", dest: "www.example.com/blog/link-building-strategies", colorClass: "bg-gray-bullet" }
        ],
        viewAllText: "View all 3 links",
        aiRec: "Optimize link anchor text to use target keywords like 'link building strategies'.",
        suggested: [
          { anchor: "\"Link Building Strategies\"", dest: "www.example.com/blog/link-building-strategies", colorClass: "bg-green" }
        ],
        impactGainValue: "+4%",
        impactLevelValue: "Low",
        impactTimeValue: "~5 Min"
      },
      "www.example.com/blog/site-structure": {
        issue: "Orphan Page",
        desc: "This page has no incoming internal links from crawled pages.",
        examples: [],
        viewAllText: "No links to display",
        aiRec: "Link to this page from your homepage or header/footer navigation to ensure it gets crawled.",
        suggested: [
          { anchor: "\"Site Structure Best Practices\"", dest: "www.example.com/blog/site-structure-best-practices", colorClass: "bg-green" }
        ],
        impactGainValue: "+5%",
        impactLevelValue: "Low",
        impactTimeValue: "~5 Min"
      }
    };
  }

  init() {
    this.bindSidebarEvents();
    this.bindCheckboxEvents();
    this.bindMenuClickEvents();
    this.bindDetailNavigationEvents();
    this.bindTableSelectionEvents();
  }

  bindSidebarEvents() {
    if (this.sidebarView.mobileToggle && this.sidebarView.sidebar) {
      this.sidebarView.mobileToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        this.sidebarView.toggleSidebar();
      });

      if (this.sidebarView.backdrop) {
        this.sidebarView.backdrop.addEventListener("click", () => {
          this.sidebarView.closeSidebar();
        });
      }

      document.addEventListener("click", (e) => {
        if (!this.sidebarView.sidebar.contains(e.target) && e.target !== this.sidebarView.mobileToggle) {
          this.sidebarView.closeSidebar();
        }
      });
    }
  }

  bindMenuClickEvents() {
    this.sidebarView.menuItems.forEach(item => {
      item.addEventListener("click", (e) => {
        const menuSection = item.closest(".menu-section");
        if (menuSection) {
          e.preventDefault();
          this.sidebarView.toggleSubmenu(menuSection);
        }
        this.sidebarView.setActiveMenuItem(item);
      });
    });

    const submenuItems = document.querySelectorAll(".submenu-item");
    submenuItems.forEach(subItem => {
      subItem.addEventListener("click", (e) => {
        e.preventDefault();
        this.sidebarView.setActiveSubmenuItem(subItem);
      });
    });
  }

  bindCheckboxEvents() {
    this.sidebarView.planCheckboxes.forEach(checkbox => {
      checkbox.addEventListener("change", () => {
        this.sidebarView.updateCheckboxStyle(checkbox);
      });
    });
  }

  bindDetailNavigationEvents() {
    const viewDetailsBtns = document.querySelectorAll(".priority-card .pc-btn");
    const backBtn = document.getElementById("backToOverview");
    const overviewView = document.getElementById("overview-view");
    const detailsViewInternal = document.getElementById("details-view");
    const detailsViewCannibalization = document.getElementById("details-view-cannibalization");
    const breadcrumbText = document.querySelector(".breadcrumb span");

    let currentActiveDetailsView = null;

    if (viewDetailsBtns.length > 0 && overviewView) {
      viewDetailsBtns.forEach(btn => {
        btn.addEventListener("click", () => {
          const cardType = btn.getAttribute("data-card");
          let targetView = detailsViewInternal;
          let breadcrumbTitle = "Dashboard / Audit suite / Internal linking";

          if (cardType === "cannibalization" && detailsViewCannibalization) {
            targetView = detailsViewCannibalization;
            breadcrumbTitle = "Dashboard / Audit suite / Fix Keyword Cannibalization";
          }

          currentActiveDetailsView = targetView;

          this.transitionViews(overviewView, targetView, true, () => {
            if (breadcrumbText) {
              breadcrumbText.textContent = breadcrumbTitle;
            }
            if (typeof lucide !== 'undefined') {
              lucide.createIcons();
            }
          });
        });
      });

      // Click Back Button if exists
      if (backBtn) {
        backBtn.addEventListener("click", () => {
          const activeView = currentActiveDetailsView || detailsViewInternal || detailsViewCannibalization;
          if (activeView) {
            this.transitionViews(activeView, overviewView, false, () => {
              if (breadcrumbText) {
                breadcrumbText.textContent = "Dashboard / Audit suite";
              }
            });
          }
        });
      }
    }
  }

  transitionViews(fromView, toView, showBackButton, callback) {
    const backBtn = document.getElementById("backToOverview");

    // Fade out active view
    fromView.style.opacity = 0;
    fromView.style.transform = "translateY(15px)";

    if (backBtn) {
      backBtn.style.opacity = showBackButton ? 1 : 0;
    }

    setTimeout(() => {
      fromView.style.display = "none";
      fromView.classList.remove("active");

      toView.style.display = "flex";
      // Force reflow
      toView.offsetHeight;

      toView.style.opacity = 1;
      toView.style.transform = "translateY(0)";
      toView.classList.add("active");

      if (showBackButton && backBtn) {
        backBtn.style.display = "flex";
        // Force reflow
        backBtn.offsetHeight;
        backBtn.style.opacity = 1;
      } else if (backBtn) {
        backBtn.style.display = "none";
      }

      if (callback) callback();
    }, 350);
  }

  bindTableSelectionEvents() {
    const tableRows = document.querySelectorAll("#detailsTableBody tr.clickable-row");

    tableRows.forEach(row => {
      row.addEventListener("click", () => {
        // Remove active class from other rows
        tableRows.forEach(r => r.classList.remove("active"));
        // Add active class to clicked row
        row.classList.add("active");

        // Get key data-url attribute
        const url = row.getAttribute("data-url");
        if (this.urlData[url]) {
          this.updateSidebarContent(url, this.urlData[url]);
        }
      });
    });
  }

  updateSidebarContent(url, data) {
    const selectedUrlText = document.getElementById("selectedUrlText");
    const sidebarIssueBadge = document.getElementById("sidebarIssueBadge");
    const sidebarIssueDesc = document.getElementById("sidebarIssueDesc");
    const sidebarExamplesContainer = document.getElementById("sidebarExamplesContainer");
    const sidebarAiRec = document.getElementById("sidebarAiRec");
    const sidebarSuggestedContainer = document.getElementById("sidebarSuggestedContainer");
    const sidebarImpactGain = document.getElementById("sidebarImpactGain");
    const sidebarImpactLevel = document.getElementById("sidebarImpactLevel");
    const sidebarImpactTime = document.getElementById("sidebarImpactTime");

    if (selectedUrlText) selectedUrlText.textContent = url;
    if (sidebarIssueBadge) {
      sidebarIssueBadge.textContent = data.issue;
      // Style badge according to issue types
      if (data.issue === "Orphan Page") {
        sidebarIssueBadge.className = "badge badge-orange-bg text-red border-red-light";
      } else {
        sidebarIssueBadge.className = "badge badge-orange-bg";
      }
    }
    if (sidebarIssueDesc) sidebarIssueDesc.textContent = data.desc;

    // Render examples
    if (sidebarExamplesContainer) {
      let examplesHtml = `<span class="examples-title">Examples on this page</span>`;

      if (!data.examples || data.examples.length === 0) {
        examplesHtml += `<div class="example-item text-gray">None</div>`;
      } else {
        data.examples.forEach(ex => {
          examplesHtml += `
            <div class="example-item">
              <span class="bullet-dot ${ex.colorClass}"></span>
              <span class="ex-anchor">${ex.anchor}</span>
              <span class="ex-arrow">→</span>
              <span class="ex-dest">${ex.dest}</span>
            </div>
          `;
        });
        examplesHtml += `<a href="#" class="view-all-links">${data.viewAllText}</a>`;
      }
      sidebarExamplesContainer.innerHTML = examplesHtml;
    }

    // Render AI recommendation text
    if (sidebarAiRec) {
      sidebarAiRec.innerHTML = `<p>${data.aiRec}</p>`;
    }

    // Render suggested anchors
    if (sidebarSuggestedContainer) {
      let suggestedHtml = `<span class="examples-title">Suggested Anchors</span>`;
      data.suggested.forEach(sug => {
        suggestedHtml += `
          <div class="example-item">
            <span class="bullet-dot ${sug.colorClass}"></span>
            <span class="ex-anchor">${sug.anchor}</span>
            <span class="ex-arrow">→</span>
            <span class="ex-dest">${sug.dest}</span>
          </div>
        `;
      });
      sidebarSuggestedContainer.innerHTML = suggestedHtml;
    }

    // Render Expected Impact sidebar circles
    if (sidebarImpactGain) sidebarImpactGain.textContent = data.impactGainValue;

    if (sidebarImpactLevel) {
      sidebarImpactLevel.textContent = data.impactLevelValue;
      const card = sidebarImpactLevel.closest(".sidebar-impact-circle-card");
      const circle = card.querySelector(".sic-circle");

      // Reset text class
      sidebarImpactLevel.className = "sic-num";

      if (data.impactLevelValue === "High") {
        circle.className = "sic-circle circle-red";
        sidebarImpactLevel.classList.add("text-red");
      } else if (data.impactLevelValue === "Medium") {
        circle.className = "sic-circle circle-orange";
        sidebarImpactLevel.classList.add("text-orange");
      } else {
        circle.className = "sic-circle circle-green";
        sidebarImpactLevel.classList.add("text-green");
      }
    }

    if (sidebarImpactTime) sidebarImpactTime.textContent = data.impactTimeValue;

    // Refresh icons inside updated sidebar containers
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
}
