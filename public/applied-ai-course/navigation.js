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

const lessons = document.querySelector('.curriculum-lessons');
if (lessons) {
  function openLinkedLesson() {
    const target = document.getElementById(location.hash.slice(1));
    if (!target || !lessons.contains(target)) return;
    for (let parent = target.closest('details'); parent; parent = parent.parentElement.closest('details')) {
      parent.open = true;
    }
    requestAnimationFrame(() => target.scrollIntoView({ block: 'start', behavior: 'instant' }));
  }
  window.addEventListener('hashchange', openLinkedLesson);
  openLinkedLesson();

  // A lesson opened by hand can be bookmarked or sent to someone else.
  lessons.querySelectorAll('.week-accordion > summary').forEach(summary => {
    summary.addEventListener('click', () => {
      const lesson = summary.parentElement;
      const url = new URL(location.href);
      if (!lesson.open) {
        url.hash = lesson.id;
      } else if (lesson.contains(document.getElementById(url.hash.slice(1)))) {
        url.hash = '';
      } else {
        return;
      }
      history.replaceState(null, '', url);
    });
  });
}

// Enlarge portfolio screenshots without leaving the instructor page.
const projectDialog = document.querySelector('.project-dialog');
if (projectDialog) {
  document.querySelectorAll('.project-preview').forEach(button => {
    button.addEventListener('click', () => {
      const thumbnail = button.querySelector('img');
      const fullImage = projectDialog.querySelector('img');
      fullImage.src = thumbnail.src;
      fullImage.alt = thumbnail.alt;
      projectDialog.querySelector('h2').textContent = button.dataset.projectTitle;
      projectDialog.showModal();
    });
  });
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
    const filter = () => {
      const query = search.value.trim().toLocaleLowerCase();
      let visible = 0;
      items.forEach(item => {
        const matches = (!category.value || item.dataset.category === category.value) && (!query || item.dataset.search.includes(query));
        item.hidden = !matches;
        if (matches) visible++;
      });
      count.textContent = `${visible} of ${items.length} ${section.dataset.noun}`;
      empty.hidden = visible !== 0;
      if (table) table.hidden = visible === 0;
    };
    search.addEventListener('input', filter);
    category.addEventListener('change', filter);
    controls.querySelector('[data-reference-reset]').addEventListener('click', () => {
      search.value = ''; category.value = ''; filter(); search.focus();
    });
    controls.hidden = false;
    filter();
  });
  showReference(location.hash);
}
