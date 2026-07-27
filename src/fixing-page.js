(function () {
  'use strict';

  var cannibalizationData = {
    "seo audit tool": {
      intent: "Informational", score: "85", impact: "High", gain: "+520",
      overview: "This keyword is targeted by 3 pages. Consolidate to a single best page and redirect or update the others.",
      pages: [
        { icon: "crown", link: "www.example.com/blog/seo-audit-tool", meta: "Word Count 2,450 • Updated: May 8, 2025", pos: "5" },
        { icon: null, link: "www.example.com/tools/seo-audit", meta: "Word Count 1,890 • Updated: Apr 20, 2025", pos: "11" },
        { icon: null, link: "www.example.com/website-audit-guide", meta: "Word Count 1,520 • Updated: Mar 15, 2025", pos: "19" }
      ],
      recText: "Keep the best ranking page and redirect or update the other 2 pages with unique content and internal linking.",
      actions: ["Keep: /blog/seo-audit-tool (Best ranking)", "Redirect: /tools/seo-audit → /blog/seo-audit-tool", "Update: /blog/website-audit-guide (Different angle)"],
      impactGain: "+520", impactLevel: "High", impactTime: "-48 Min."
    },
    "keyword research tool": {
      intent: "Informational", score: "75", impact: "High", gain: "+320",
      overview: "This keyword is targeted by 2 pages. Consolidate to a single page and redirect the other.",
      pages: [
        { icon: "crown", link: "www.example.com/blog/keyword-research", meta: "Word Count 3,120 • Updated: May 1, 2025", pos: "8" },
        { icon: null, link: "www.example.com/tools/keyword-generator", meta: "Word Count 1,200 • Updated: Apr 15, 2025", pos: "14" }
      ],
      recText: "Consolidate search visibility under the main blog post to avoid rankings splitting.",
      actions: ["Keep: /blog/keyword-research (Strongest authority)", "Redirect: /tools/keyword-generator → /blog/keyword-research"],
      impactGain: "+320", impactLevel: "High", impactTime: "-30 Min."
    },
    "backlink checker": {
      intent: "Commercial", score: "65", impact: "Medium", gain: "+180",
      overview: "This keyword is targeted by 2 pages. Consolidate to boost overall page strength.",
      pages: [
        { icon: "crown", link: "www.example.com/tools/backlink-check", meta: "Word Count 1,450 • Updated: Apr 10, 2025", pos: "12" },
        { icon: null, link: "www.example.com/blog/best-backlink-checkers", meta: "Word Count 2,300 • Updated: Mar 22, 2025", pos: "18" }
      ],
      recText: "Improve content segregation between product/tool pages and informational resources.",
      actions: ["Keep: /tools/backlink-check (Tool focus)", "Update: /blog/best-backlink-checkers (Internal link target)"],
      impactGain: "+180", impactLevel: "Medium", impactTime: "-20 Min."
    },
    "on page seo": {
      intent: "Informational", score: "55", impact: "Medium", gain: "+150",
      overview: "This keyword is targeted by 2 pages. Merge content to avoid self-competition.",
      pages: [
        { icon: "crown", link: "www.example.com/blog/on-page-seo", meta: "Word Count 4,000 • Updated: May 5, 2025", pos: "7" },
        { icon: null, link: "www.example.com/blog/on-page-checklist", meta: "Word Count 1,500 • Updated: Apr 28, 2025", pos: "15" }
      ],
      recText: "Create a single high-quality guide on On-Page SEO and redirect secondary posts to it.",
      actions: ["Keep: /blog/on-page-seo (Core pillar page)", "Redirect: /blog/on-page-checklist → /blog/on-page-seo"],
      impactGain: "+150", impactLevel: "Medium", impactTime: "-18 Min."
    },
    "technical seo checklist": {
      intent: "Informational", score: "45", impact: "Medium", gain: "+90",
      overview: "This keyword is targeted by 2 pages. Focus optimization on the key checklist.",
      pages: [
        { icon: "crown", link: "www.example.com/blog/technical-seo-checklist", meta: "Word Count 2,200 • Updated: Mar 30, 2025", pos: "10" },
        { icon: null, link: "www.example.com/blog/technical-guide", meta: "Word Count 1,800 • Updated: Feb 18, 2025", pos: "22" }
      ],
      recText: "Re-structure pages so the checklist acts as the primary landing page.",
      actions: ["Keep: /blog/technical-seo-checklist (Primary landing)", "Update: /blog/technical-guide (Differentiate content)"],
      impactGain: "+90", impactLevel: "Medium", impactTime: "-15 Min."
    },
    "increase website traffic": {
      intent: "Navigational", score: "35", impact: "Low", gain: "+60",
      overview: "This keyword is targeted by 2 pages. Consolidate to target this high volume keyword.",
      pages: [
        { icon: "crown", link: "www.example.com/blog/increase-traffic", meta: "Word Count 3,500 • Updated: May 12, 2025", pos: "13" },
        { icon: null, link: "www.example.com/blog/more-visitors", meta: "Word Count 1,100 • Updated: Jan 24, 2025", pos: "26" }
      ],
      recText: "Consolidate content and redirect weak pages to the primary pillar article.",
      actions: ["Keep: /blog/increase-traffic (Best authority)", "Redirect: /blog/more-visitors → /blog/increase-traffic"],
      impactGain: "+60", impactLevel: "Low", impactTime: "-10 Min."
    },
    "seo tips": {
      intent: "Navigational", score: "30", impact: "Low", gain: "+40",
      overview: "This keyword is targeted by 2 pages. Differentiate or merge the tips list.",
      pages: [
        { icon: "crown", link: "www.example.com/blog/seo-tips", meta: "Word Count 1,900 • Updated: Apr 5, 2025", pos: "16" },
        { icon: null, link: "www.example.com/blog/seo-best-practices", meta: "Word Count 2,400 • Updated: Mar 10, 2025", pos: "24" }
      ],
      recText: "Consolidate all tips lists into one comprehensive, updated guide.",
      actions: ["Keep: /blog/seo-tips (Consolidated list)", "Redirect: /blog/seo-best-practices → /blog/seo-tips"],
      impactGain: "+40", impactLevel: "Low", impactTime: "-8 Min."
    }
  };

  function el(id)   { return document.getElementById(id); }
  function qs(sel)  { return document.querySelector(sel); }
  function qsa(sel) { return document.querySelectorAll(sel); }

  function updateSidebar(keyword, data) {
    if (el('cannibalizationSelectedKeywordText'))  el('cannibalizationSelectedKeywordText').textContent  = keyword;
    if (el('cannibalizationSelectedIntentText'))   el('cannibalizationSelectedIntentText').textContent   = 'Intent: ' + data.intent;
    if (el('cannibalizationScoreNum'))             el('cannibalizationScoreNum').textContent             = data.score;
    if (el('cannibalizationImpactValue'))          el('cannibalizationImpactValue').textContent          = data.impact;
    if (el('cannibalizationGainNum'))              el('cannibalizationGainNum').textContent              = data.gain;
    if (el('cannibalizationSidebarOverviewDesc'))  el('cannibalizationSidebarOverviewDesc').textContent  = data.overview;

    var pagesList = el('cannibalizationAffectedPagesList');
    if (pagesList && data.pages) {
      pagesList.innerHTML = data.pages.map(function (page, idx) {
        var iconHtml = page.icon === 'crown'
          ? '<i data-lucide="crown" style="width:12px;height:12px;color:#F5C527;flex-shrink:0;margin-top:2px;"></i>'
          : '<span style="font-size:12px;color:#808080;width:12px;text-align:center;display:inline-block;">' + (idx + 1) + '</span>';
        return '<div class="ap-item-row"><div class="ap-item-left">' + iconHtml +
          '<div><a href="#" class="ap-link">' + page.link + '</a>' +
          '<span class="ap-meta">' + page.meta + '</span></div></div>' +
          '<span class="ap-pos-val">' + page.pos + '</span></div>';
      }).join('');
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    var aiRecBox = qs('.ai-rec-box');
    if (aiRecBox) {
      var recDesc = aiRecBox.querySelector('.ai-rec-desc');
      var recList = aiRecBox.querySelector('.ai-rec-action-list');
      if (recDesc) recDesc.textContent = data.recText;
      if (recList && data.actions) {
        recList.innerHTML = data.actions.map(function (action) {
          var parts = action.split(':');
          return parts.length > 1
            ? '<li><span class="bullet-dot"></span><span class="lbl-dark">' + parts[0].trim() + ':</span><span class="lbl-gray"> ' + parts.slice(1).join(':').trim() + '</span></li>'
            : '<li><span class="bullet-dot"></span><span class="lbl-gray">' + action + '</span></li>';
        }).join('');
      }
    }

    var eicCard = qs('.eic-card-wrap') || qs('.expected-impact-card');
    if (eicCard) {
      var vals = eicCard.querySelectorAll('.eic-card-val, .sic-num');
      if (vals.length >= 3) {
        vals[0].textContent = data.impactGain;
        vals[1].textContent = data.impactLevel;
        vals[2].textContent = data.impactTime;
      }
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof lucide !== 'undefined') lucide.createIcons();

    /* 1. PAGINATION click — toggle active */
    qsa('.pagination').forEach(function (container) {
      var pageBtns = container.querySelectorAll('.pg-btn:not(.pg-arrow)');
      pageBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          pageBtns.forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
        });
      });
    });

    /* 2. TABLE ROW click — select + sidebar update */
    var tableRows = qsa('#cannibalizationDetailsTableBody tr.clickable-row');
    tableRows.forEach(function (row) {
      row.addEventListener('click', function () {
        tableRows.forEach(function (r) { r.classList.remove('active'); });
        row.classList.add('active');
        var keyword = row.getAttribute('data-keyword');
        if (keyword && cannibalizationData[keyword]) updateSidebar(keyword, cannibalizationData[keyword]);
      });
    });

    /* 3. SEARCH + FILTERS */
    var searchInput    = el('cannibalizationDetailsSearch');
    var intentFilter   = el('cannibalizationIntentFilter');
    var priorityFilter = el('cannibalizationPriorityFilter');

    function applyFilters() {
      var term      = searchInput    ? searchInput.value.toLowerCase().trim() : '';
      var intentV   = intentFilter   ? intentFilter.value   : 'all';
      var priorityV = priorityFilter ? priorityFilter.value : 'all';
      tableRows.forEach(function (row) {
        var kw   = (row.getAttribute('data-keyword')  || '').toLowerCase();
        var intn = (row.getAttribute('data-intent')   || '').toLowerCase();
        var pri  = (row.getAttribute('data-priority') || '').toLowerCase();
        var show = (!term || kw.includes(term)) &&
                   (intentV   === 'all' || intn === intentV) &&
                   (priorityV === 'all' || pri  === priorityV);
        row.style.display = show ? '' : 'none';
      });
    }

    if (searchInput)    searchInput.addEventListener('input',   applyFilters);
    if (intentFilter)   intentFilter.addEventListener('change', applyFilters);
    if (priorityFilter) priorityFilter.addEventListener('change', applyFilters);
  });
})();
