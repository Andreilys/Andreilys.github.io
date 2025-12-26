---
layout: page
title: Insights
permalink: /insights/
---

<p>Daily correlations between health metrics and your wellness score.</p>

<div class="correlation-meta">
  <p>Last refreshed: <span id="correlation-refreshed">--</span></p>
  <p class="correlation-note">Correlations only appear with at least 14 days of data, |r| ≥ 0.3, and p &lt; 0.05.</p>
</div>

<p id="correlation-empty" class="correlation-empty" hidden>
  Add at least 14 days of data to see statistically significant correlations.
</p>

<ul id="correlation-insights" class="correlation-list"></ul>

<script src="{{ '/assets/js/correlation-insights.js' | prepend: site.baseurl | prepend: site.url }}"></script>
