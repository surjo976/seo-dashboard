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

    this.cannibalizationData = {
      "seo audit tool": {
        intent: "Intent: Informational",
        intentClass: "intent-tag informational",
        score: "85/100",
        impact: "High",
        gain: "+520 Visits/mo",
        overview: "This keyword is targeted by 3 pages. Consolidate to a single best page and redirect or update the others.",
        pages: [
          { iconClass: "api-icon-wrap crown", icon: "crown", link: "www.example.com/blog/seo-audit-tool", meta: "Word Count 2,450 • Updated: May 8, 2025", pos: "5" },
          { iconClass: "api-icon-wrap number", text: "2", link: "www.example.com/tools/seo-audit", meta: "Word Count 1,890 • Updated: Apr 20, 2025", pos: "11" },
          { iconClass: "api-icon-wrap number", text: "3", link: "www.example.com/website-audit-guide", meta: "Word Count 1,520 • Updated: Mar 15, 2025", pos: "19" }
        ],
        recText: "Keep the best ranking page as the page and redirect or update the other 2 pages with unique content and internal linking.",
        actions: [
          "Keep: /blog/seo-audit-tool (Best ranking)",
          "Redirect: /tools/seo-audit → /blog/seo-audit-tool",
          "Update: /blog/website-audit-guide (Different angle)"
        ],
        impactGain: "+520",
        impactLevel: "High",
        impactTime: "-48 Min."
      },
      "keyword research tool": {
        intent: "Intent: Informational",
        intentClass: "intent-tag informational",
        score: "75/100",
        impact: "High",
        gain: "+320 Visits/mo",
        overview: "This keyword is targeted by 2 pages. Consolidate to a single page and redirect the other.",
        pages: [
          { iconClass: "api-icon-wrap crown", icon: "crown", link: "www.example.com/blog/keyword-research", meta: "Word Count 3,120 • Updated: May 1, 2025", pos: "8" },
          { iconClass: "api-icon-wrap number", text: "2", link: "www.example.com/tools/keyword-generator", meta: "Word Count 1,200 • Updated: Apr 15, 2025", pos: "14" }
        ],
        recText: "Consolidate search visibility under the main blog post to avoid rankings splitting between tools and blog sections.",
        actions: [
          "Keep: /blog/keyword-research (Strongest authority)",
          "Redirect: /tools/keyword-generator → /blog/keyword-research"
        ],
        impactGain: "+320",
        impactLevel: "High",
        impactTime: "-30 Min."
      },
      "backlink checker": {
        intent: "Intent: Commercial",
        intentClass: "intent-tag commercial",
        score: "65/100",
        impact: "Medium",
        gain: "+180 Visits/mo",
        overview: "This keyword is targeted by 2 pages. Consolidate to boost overall page strength.",
        pages: [
          { iconClass: "api-icon-wrap crown", icon: "crown", link: "www.example.com/tools/backlink-check", meta: "Word Count 1,450 • Updated: Apr 10, 2025", pos: "12" },
          { iconClass: "api-icon-wrap number", text: "2", link: "www.example.com/blog/best-backlink-checkers", meta: "Word Count 2,300 • Updated: Mar 22, 2025", pos: "18" }
        ],
        recText: "Improve content segregation between product/tool pages and informational resources.",
        actions: [
          "Keep: /tools/backlink-check (Tool focus)",
          "Update: /blog/best-backlink-checkers (Internal link target)"
        ],
        impactGain: "+180",
        impactLevel: "Medium",
        impactTime: "-20 Min."
      },
      "on page seo": {
        intent: "Intent: Informational",
        intentClass: "intent-tag informational",
        score: "55/100",
        impact: "Medium",
        gain: "+150 Visits/mo",
        overview: "This keyword is targeted by 2 pages. Merge content to avoid self-competition.",
        pages: [
          { iconClass: "api-icon-wrap crown", icon: "crown", link: "www.example.com/blog/on-page-seo", meta: "Word Count 4,000 • Updated: May 5, 2025", pos: "7" },
          { iconClass: "api-icon-wrap number", text: "2", link: "www.example.com/blog/on-page-checklist", meta: "Word Count 1,500 • Updated: Apr 28, 2025", pos: "15" }
        ],
        recText: "Create a single high-quality guide on On-Page SEO and redirect secondary posts to it.",
        actions: [
          "Keep: /blog/on-page-seo (Core pillar page)",
          "Redirect: /blog/on-page-checklist → /blog/on-page-seo"
        ],
        impactGain: "+150",
        impactLevel: "Medium",
        impactTime: "-18 Min."
      },
      "technical seo checklist": {
        intent: "Intent: Informational",
        intentClass: "intent-tag informational",
        score: "45/100",
        impact: "Medium",
        gain: "+90 Visits/mo",
        overview: "This keyword is targeted by 2 pages. Focus optimization on the key checklist.",
        pages: [
          { iconClass: "api-icon-wrap crown", icon: "crown", link: "www.example.com/blog/technical-seo-checklist", meta: "Word Count 2,200 • Updated: Mar 30, 2025", pos: "10" },
          { iconClass: "api-icon-wrap number", text: "2", link: "www.example.com/blog/technical-guide", meta: "Word Count 1,800 • Updated: Feb 18, 2025", pos: "22" }
        ],
        recText: "Re-structure pages so the checklist acts as the primary landing page.",
        actions: [
          "Keep: /blog/technical-seo-checklist (Primary landing)",
          "Update: /blog/technical-guide (Differentiate content)"
        ],
        impactGain: "+90",
        impactLevel: "Medium",
        impactTime: "-15 Min."
      },
      "increase website traffic": {
        intent: "Intent: Navigational",
        intentClass: "intent-tag navigational",
        score: "35/100",
        impact: "Low",
        gain: "+60 Visits/mo",
        overview: "This keyword is targeted by 2 pages. Consolidate to target this high volume keyword.",
        pages: [
          { iconClass: "api-icon-wrap crown", icon: "crown", link: "www.example.com/blog/increase-traffic", meta: "Word Count 3,500 • Updated: May 12, 2025", pos: "13" },
          { iconClass: "api-icon-wrap number", text: "2", link: "www.example.com/blog/more-visitors", meta: "Word Count 1,100 • Updated: Jan 24, 2025", pos: "26" }
        ],
        recText: "Consolidate content and redirect weak pages to the primary pillar article.",
        actions: [
          "Keep: /blog/increase-traffic (Best authority)",
          "Redirect: /blog/more-visitors → /blog/increase-traffic"
        ],
        impactGain: "+60",
        impactLevel: "Low",
        impactTime: "-10 Min."
      },
      "seo tips": {
        intent: "Intent: Navigational",
        intentClass: "intent-tag navigational",
        score: "30/100",
        impact: "Low",
        gain: "+40 Visits/mo",
        overview: "This keyword is targeted by 2 pages. Differentiate or merge the tips list.",
        pages: [
          { iconClass: "api-icon-wrap crown", icon: "crown", link: "www.example.com/blog/seo-tips", meta: "Word Count 1,900 • Updated: Apr 5, 2025", pos: "16" },
          { iconClass: "api-icon-wrap number", text: "2", link: "www.example.com/blog/seo-best-practices", meta: "Word Count 2,400 • Updated: Mar 10, 2025", pos: "24" }
        ],
        recText: "Consolidate all tips lists into one comprehensive, updated guide.",
        actions: [
          "Keep: /blog/seo-tips (Consolidated list)",
          "Redirect: /blog/seo-best-practices → /blog/seo-tips"
        ],
        impactGain: "+40",
        impactLevel: "Low",
        impactTime: "-8 Min."
      }
    };
  }

  init() {
    this.bindSidebarEvents();
    this.bindCheckboxEvents();
    this.bindMenuClickEvents();
    this.bindDetailNavigationEvents();
    this.bindTableSelectionEvents();
    this.bindCannibalizationTableSelectionEvents();
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

  bindCannibalizationTableSelectionEvents() {
    const tableRows = document.querySelectorAll("#cannibalizationDetailsTableBody tr.clickable-row");

    tableRows.forEach(row => {
      row.addEventListener("click", () => {
        tableRows.forEach(r => r.classList.remove("active"));
        row.classList.add("active");

        const keyword = row.getAttribute("data-keyword");
        if (this.cannibalizationData[keyword]) {
          this.updateCannibalizationSidebarContent(keyword, this.cannibalizationData[keyword]);
        }
      });
    });
  }

  updateCannibalizationSidebarContent(keyword, data) {
    const selectedKeywordText = document.getElementById("cannibalizationSelectedKeywordText");
    const selectedIntentText = document.getElementById("cannibalizationSelectedIntentText");
    const scoreNum = document.getElementById("cannibalizationScoreNum");
    const impactValue = document.getElementById("cannibalizationImpactValue");
    const gainNum = document.getElementById("cannibalizationGainNum");
    const overviewDesc = document.getElementById("cannibalizationSidebarOverviewDesc");
    const pagesList = document.getElementById("cannibalizationAffectedPagesList");
    const aiRecBox = document.querySelector("#details-view-cannibalization .ai-rec-box");

    if (selectedKeywordText) selectedKeywordText.textContent = keyword;
    if (selectedIntentText) {
      selectedIntentText.textContent = "Intent: " + data.intent.replace("Intent: ", "");
    }
    if (scoreNum) scoreNum.textContent = data.score.replace("/100", "").trim();
    if (impactValue) impactValue.textContent = data.impact;
    if (gainNum) gainNum.textContent = data.gain.replace("Visits/mo", "").replace("Visits / month", "").trim();
    if (overviewDesc) overviewDesc.textContent = data.overview;

    if (pagesList) {
      let pagesHtml = "";
      data.pages.forEach((page, idx) => {
        const iconHtml = page.icon === "crown" 
          ? `<i data-lucide="crown" style="width: 12px; height: 12px; color: #F5C527; flex-shrink: 0; margin-top: 2px;"></i>` 
          : `<span style="font-size: 12px; color: #808080; width: 12px; text-align: center; display: inline-block;">${idx + 1}</span>`;
        pagesHtml += `
          <div class="ap-item-row">
            <div class="ap-item-left">
              ${iconHtml}
              <div>
                <a href="#" class="ap-link">${page.link}</a>
                <span class="ap-meta">${page.meta}</span>
              </div>
            </div>
            <span class="ap-pos-val">${page.pos}</span>
          </div>
        `;
      });
      pagesList.innerHTML = pagesHtml;
    }

    if (aiRecBox) {
      const recDesc = aiRecBox.querySelector(".ai-rec-desc");
      const recList = aiRecBox.querySelector(".ai-rec-action-list");
      if (recDesc) recDesc.textContent = data.recText;
      if (recList) {
        let listHtml = "";
        data.actions.forEach(action => {
          const parts = action.split(":");
          if (parts.length > 1) {
            listHtml += `
              <li>
                <span class="bullet-dot"></span>
                <span class="lbl-dark">${parts[0].trim()}:</span>
                <span class="lbl-gray">${parts.slice(1).join(":").trim()}</span>
              </li>
            `;
          } else {
            listHtml += `
              <li>
                <span class="bullet-dot"></span>
                <span class="lbl-gray">${action}</span>
              </li>
            `;
          }
        });
        recList.innerHTML = listHtml;
      }
    }

    // Update bottom Expected Impact Card
    const expectedImpactCard = document.querySelector("#details-view-cannibalization .expected-impact-card");
    if (expectedImpactCard) {
      const nums = expectedImpactCard.querySelectorAll(".sic-num");
      if (nums.length >= 3) {
        nums[0].textContent = data.impactGain;
        nums[1].textContent = data.impactLevel;
        nums[2].textContent = data.impactTime;
      }
    }

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
}
