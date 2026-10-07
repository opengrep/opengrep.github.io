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

// docs: contents tree, closed on narrow screens, filterable, scrolled to the current page
const toc = document.querySelector('.docs-toc');
if (toc) {
  const narrow = matchMedia('(max-width: 1299px)');
  const fit = () => { toc.open = !narrow.matches; };
  fit();
  narrow.addEventListener('change', fit);

  const tree = toc.querySelector('.toc');
  const current = tree.querySelector('[aria-current="page"]');
  if (current && !narrow.matches) tree.scrollTop = current.offsetTop - tree.clientHeight / 3;

  const filter = toc.querySelector('.docs-filter');
  const sections = [...toc.querySelectorAll('.toc > ul > li')];
  const wasOpen = new Map([...toc.querySelectorAll('.toc details')].map((d) => [d, d.open]));
  const has = (el, q) => el.textContent.toLowerCase().includes(q);
  filter.hidden = false;
  filter.addEventListener('input', () => {
    const q = filter.value.trim().toLowerCase();
    for (const section of sections) {
      const details = section.querySelector('details');
      if (!details) { section.hidden = q && !has(section, q); continue; }
      // a matching section title shows the whole section; otherwise only the matching entries
      const whole = !q || has(details.querySelector('summary'), q);
      let any = false;
      for (const li of details.querySelectorAll('li')) {
        li.hidden = !whole && !has(li, q);
        any ||= !li.hidden;
      }
      section.hidden = !whole && !any;
      details.open = q ? !section.hidden : wasOpen.get(details);
    }
  });
  filter.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { filter.value = ''; filter.dispatchEvent(new Event('input')); }
  });
  // "/" jumps to the filter, as on many docs sites
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'SELECT') {
      e.preventDefault();
      toc.open = true;
      filter.focus();
    }
  });
}
