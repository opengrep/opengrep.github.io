// install tabs (WAI-ARIA tabs pattern, arrow keys move between tabs)
const tabs = [...document.querySelectorAll('[role="tab"]')];

function selectTab(tab) {
  for (const t of tabs) {
    const selected = t === tab;
    t.setAttribute('aria-selected', selected);
    t.tabIndex = selected ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !selected;
  }
}

tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', (e) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    const next = tabs[(i + step + tabs.length) % tabs.length];
    selectTab(next);
    next.focus();
  });
});

// preselect the tab that matches the visitor's OS
if (/Win/.test(navigator.userAgentData?.platform ?? navigator.platform)) {
  selectTab(document.getElementById('tab-win'));
}

// copy buttons: data-copy, or else the lines of the file panel the button sits in
function copyText(btn) {
  if (btn.dataset.copy) return btn.dataset.copy;
  const lines = btn.closest('.file').querySelectorAll('.line');
  return [...lines].map((l) => l.textContent).join('\n') + '\n';
}

for (const btn of document.querySelectorAll('.copy')) {
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(copyText(btn));
      btn.textContent = 'copied';
      btn.classList.add('done');
    } catch {
      btn.textContent = 'failed';
    }
    setTimeout(() => {
      btn.textContent = 'copy';
      btn.classList.remove('done');
    }, 1600);
  });
}

// live repo stats (home page only); the line stays hidden if GitHub doesn't answer
const stats = document.querySelector('.stats');
const repo = 'https://api.github.com/repos/opengrep/opengrep';
const getJSON = (url) => fetch(url).then((r) => (r.ok ? r.json() : Promise.reject(r.status)));
const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });

if (stats) Promise.allSettled([getJSON(repo), getJSON(`${repo}/releases/latest`)]).then(([info, release]) => {
  if (info.status === 'fulfilled') {
    stats.querySelector('[data-stat="stars"]').textContent =
      `★ ${compact.format(info.value.stargazers_count).toLowerCase()} stars`;
  }
  if (release.status === 'fulfilled') {
    stats.querySelector('[data-stat="release"]').textContent = `latest: ${release.value.tag_name}`;
  }
  if (info.status === 'fulfilled' || release.status === 'fulfilled') stats.hidden = false;
});
