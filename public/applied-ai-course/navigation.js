// Keep lesson URLs shared before the curriculum was combined.
const curriculumLink = document.querySelector('[data-curriculum-destination]');
if (curriculumLink) {
  const destination = new URL(curriculumLink.href);
  destination.search = location.search;
  const oldTab = /^#(?:lab-title|tab)-(\d+)$/.exec(location.hash);
  if (oldTab) {
    destination.hash = 'week-' + oldTab[1];
  } else if (/^#(?:(?:week|agenda|case-title|notes)-\d+|pre-course-survey|course-project)$/.test(location.hash)) {
    destination.hash = location.hash;
  }
  location.replace(destination.href);
}

// Older overview cards linked to portraits on the audience page.
if (/^#persona-[1-4]$/.test(location.hash) && document.getElementById('fit-questions')) {
  const audienceUrl = new URL(location.href);
  audienceUrl.hash = '';
  history.replaceState(history.state, '', audienceUrl);
}

// The full navigation stays available until the compact menu can be operated.
const menuToggle = document.querySelector('.menu-toggle');
if (menuToggle) {
  const nav = document.getElementById(menuToggle.getAttribute('aria-controls'));
  const header = menuToggle.closest('header');
  const compact = window.matchMedia('(max-width: 48rem)');

  function setMenu(open) {
    menuToggle.setAttribute('aria-expanded', String(open));
    nav.hidden = compact.matches && !open;
  }
  function syncMenu() {
    const wasOnToggle = document.activeElement === menuToggle;
    menuToggle.hidden = !compact.matches;
    setMenu(compact.matches && nav.contains(document.activeElement));
    if (!compact.matches && wasOnToggle) nav.querySelector('[aria-current="page"]').focus();
  }
  menuToggle.addEventListener('click', () => setMenu(nav.hidden));
  header.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      event.preventDefault();
      setMenu(false);
      menuToggle.focus();
    }
  });
  document.addEventListener('focusin', event => {
    if (compact.matches && !header.contains(event.target)) setMenu(false);
  });
  document.addEventListener('click', event => {
    if (compact.matches && !header.contains(event.target)) setMenu(false);
  });
  compact.addEventListener('change', syncMenu);
  window.addEventListener('pageshow', syncMenu);
  syncMenu();
}

// Native details owns the open state. Animate ordinary toggles, not bookmark arrivals.
document.addEventListener('click', event => {
  const summary = event.target.closest('summary');
  if (summary) summary.parentElement.classList.add('user-toggled');
}, true);

const lessons = document.querySelector('.curriculum-lessons');
if (lessons) {
  const weeks = [...lessons.querySelectorAll('.week-accordion')];
  const finder = lessons.querySelector('.week-finder');
  const query = finder.querySelector('input');
  const clear = finder.querySelector('button');
  const matches = finder.querySelector('[role="status"]');
  const topics = weeks.map(week => week.dataset.topics.toLowerCase());
  function filterWeeks() {
    const text = query.value.trim().toLowerCase();
    const number = /^(?:week\s*)?0*(\d+)$/.exec(text);
    const terms = text.split(/\s+/);
    let count = 0;
    weeks.forEach((week, i) => {
      const visible = number ? i + 1 === Number(number[1]) : terms.every(term => topics[i].includes(term));
      week.hidden = !visible;
      if (visible) count++;
    });
    const linkedWeek = document.getElementById(location.hash.slice(1))?.closest('.week-accordion');
    if (linkedWeek?.hidden) {
      const url = new URL(location.href);
      url.hash = '';
      history.replaceState(history.state, '', url);
    }
    clear.hidden = !query.value;
    if (!text) matches.textContent = '';
    else if (!count) matches.textContent = 'No weeks match. Try another topic or clear the search.';
    else matches.textContent = `${count} of ${weeks.length} weeks`;
  }
  function resetSearch() {
    query.value = '';
    filterWeeks();
  }
  query.addEventListener('input', filterWeeks);
  clear.addEventListener('click', () => {
    query.focus();
    resetSearch();
  });
  query.addEventListener('keydown', event => {
    if (event.key === 'Escape' && query.value) {
      event.preventDefault();
      resetSearch();
    }
  });
  finder.hidden = false;

  function openLinkedLesson() {
    const target = document.getElementById(location.hash.slice(1));
    if (!target || !lessons.contains(target)) return;
    const detail = target.closest('details');
    if (!detail) return;
    if (detail.closest('.week-accordion')?.hidden) resetSearch();
    for (let parent = detail; parent; parent = parent.parentElement.closest('details')) {
      parent.classList.remove('user-toggled');
      parent.open = true;
    }
    const summary = detail.querySelector(':scope > summary');
    requestAnimationFrame(() => {
      if (!detail.open) return;
      summary.focus({ preventScroll: true });
      summary.scrollIntoView({ block: 'start', behavior: 'instant' });
    });
  }
  window.addEventListener('hashchange', openLinkedLesson);
  // Fragment navigation can reset focus after the first lesson reveal.
  window.addEventListener('pageshow', event => {
    if (!event.persisted && document.activeElement === document.body) openLinkedLesson();
  });
  openLinkedLesson();

  weeks.forEach((week, index) => {
    week.querySelector('summary').addEventListener('click', () => {
      const url = new URL(location.href);
      if (!week.open) url.hash = week.id;
      else if (week.contains(document.getElementById(url.hash.slice(1)))) url.hash = '';
      else return;
      history.replaceState(history.state, '', url);
    });

    const permalink = week.querySelector('.week-permalink');
    if (!navigator.clipboard?.writeText) return;
    const url = new URL(document.querySelector('link[rel="canonical"]').href);
    url.hash = week.id;
    const copy = document.createElement('button');
    copy.type = 'button';
    copy.className = 'week-copy';
    copy.textContent = `Copy link to week ${index + 1}`;
    permalink.replaceWith(copy);
    const status = week.querySelector('.share-status');
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(url.href);
        status.textContent = 'Link copied';
      } catch {
        let field = week.querySelector('.manual-link');
        if (!field) {
          field = document.createElement('input');
          field.className = 'manual-link';
          field.readOnly = true;
          field.value = url.href;
          field.setAttribute('aria-label', `Link to week ${index + 1}`);
          copy.parentElement.append(field);
        }
        status.textContent = 'Select and copy the link.';
        field.focus();
        field.select();
      }
    });
  });
}

function ordinaryClick(event) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

// The screenshot itself is a regular link when a dialog is unavailable.
const projectDialog = document.querySelector('.project-dialog');
if (projectDialog && typeof projectDialog.showModal === 'function') {
  const previews = [...document.querySelectorAll('.project-preview')];
  const fullImage = projectDialog.querySelector('.project-dialog-image');
  const frame = fullImage.parentElement;
  const zoom = projectDialog.querySelector('.gallery-zoom');
  const title = projectDialog.querySelector('h2');
  const count = projectDialog.querySelector('.gallery-count');
  const label = projectDialog.querySelector('.gallery-label');
  let current = 0;
  let opener;
  function setZoom(zoomed) {
    zoom.setAttribute('aria-pressed', String(zoomed));
    frame.classList.toggle('is-zoomed', zoomed);
    frame.tabIndex = zoomed ? 0 : -1;
    frame.scrollTo(0, 0);
  }
  zoom.addEventListener('click', () => setZoom(zoom.getAttribute('aria-pressed') === 'false'));
  function showProject(index) {
    current = (index + previews.length) % previews.length;
    const preview = previews[current];
    title.textContent = preview.dataset.projectTitle;
    const thumbnail = preview.querySelector('img');
    fullImage.alt = thumbnail.alt;
    fullImage.width = Number(thumbnail.getAttribute('width'));
    fullImage.height = Number(thumbnail.getAttribute('height'));
    fullImage.src = preview.href;
    setZoom(false);
    count.textContent = `${current + 1} of ${previews.length}`;
    label.textContent = `, ${title.textContent}`;
  }
  previews.forEach((preview, index) => {
    preview.setAttribute('aria-haspopup', 'dialog');
    preview.addEventListener('click', event => {
      if (!ordinaryClick(event)) return;
      event.preventDefault();
      opener = preview;
      showProject(index);
      projectDialog.showModal();
    });
  });
  projectDialog.querySelectorAll('[data-gallery-step]').forEach(button => {
    button.addEventListener('click', () => showProject(current + Number(button.dataset.galleryStep)));
  });
  projectDialog.addEventListener('keydown', event => {
    if (frame.contains(event.target) && frame.tabIndex === 0) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showProject(current + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  projectDialog.addEventListener('close', () => opener?.focus({ preventScroll: true }));
  projectDialog.addEventListener('click', event => {
    const bounds = projectDialog.getBoundingClientRect();
    if (event.target === projectDialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) projectDialog.close();
  });
}

// Explore the larger reference without adding required coursework.
const referenceTabs = [...document.querySelectorAll('[data-reference-tab]')];
if (referenceTabs.length) {
  const referenceSections = [...document.querySelectorAll('[data-reference-section]')];
  const referenceNav = document.querySelector('.reference-nav');
  referenceNav.setAttribute('role', 'tablist');
  referenceTabs.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', referenceSections[index].id);
    referenceSections[index].setAttribute('role', 'tabpanel');
    referenceSections[index].setAttribute('aria-labelledby', tab.id);
    referenceSections[index].tabIndex = 0;
  });
  function showReference(hash) {
    const selected = Math.max(0, referenceSections.findIndex(section => `#${section.id}` === hash));
    referenceTabs.forEach((tab, index) => {
      tab.setAttribute('aria-selected', String(index === selected));
      tab.tabIndex = index === selected ? 0 : -1;
      referenceSections[index].hidden = index !== selected;
    });
  }
  referenceTabs.forEach((tab, index) => {
    tab.addEventListener('click', event => {
      if (!ordinaryClick(event)) return;
      event.preventDefault();
      if (location.hash !== tab.hash) history.pushState(null, '', tab.hash);
      showReference(tab.hash);
    });
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % referenceTabs.length;
      if (event.key === 'ArrowLeft') next = (index + referenceTabs.length - 1) % referenceTabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = referenceTabs.length - 1;
      if (event.key === ' ') { event.preventDefault(); tab.click(); }
      if (next !== undefined) {
        event.preventDefault(); referenceTabs[next].focus(); referenceTabs[next].click();
      }
    });
  });
  window.addEventListener('hashchange', () => showReference(location.hash));
  window.addEventListener('popstate', () => showReference(location.hash));
  referenceSections.forEach(section => {
    const controls = section.querySelector('.reference-controls');
    const search = controls.querySelector('[data-reference-search]');
    const category = controls.querySelector('[data-reference-category]');
    const items = [...section.querySelectorAll('[data-reference-item]')];
    const count = controls.querySelector('[data-reference-count]');
    const empty = section.querySelector('.reference-empty');
    const table = section.querySelector('.reference-table');
    const reset = controls.querySelector('[data-reference-reset]');
    const filter = () => {
      const query = search.value.trim().toLocaleLowerCase();
      let visible = 0;
      items.forEach(item => {
        const matches = (!category.value || item.dataset.category === category.value) && (!query || item.dataset.search.includes(query));
        item.hidden = !matches;
        if (matches) visible++;
      });
      count.textContent = `${visible} of ${items.length} ${section.dataset.noun}`;
      reset.disabled = !search.value && !category.value;
      empty.hidden = visible !== 0;
      if (table) table.hidden = visible === 0;
    };
    search.addEventListener('input', filter);
    category.addEventListener('change', filter);
    reset.addEventListener('click', () => {
      search.value = ''; category.value = ''; filter(); search.focus();
    });
    controls.hidden = false;
    filter();
  });
  showReference(location.hash);
}
