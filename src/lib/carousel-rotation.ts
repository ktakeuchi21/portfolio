interface RotationOptions {
  root: HTMLElement;
  caption: HTMLElement;
  advance: () => void;
  stop: () => void;
  canAdvance: () => boolean;
  interval?: number;
}

// Visibility drives playback; only an explicit Pause keeps it stopped.
export function setupCarouselRotation({ root, caption, advance, stop, canAdvance, interval = 5000 }: RotationOptions) {
  const control = root.querySelector<HTMLButtonElement>('[data-carousel-rotation]');
  if (!control) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = false;
  let keyboardBrowsing = false;
  const pointers = new Set<number>();
  let visible = false;
  let onPage = true;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const sync = () => {
    clearTimeout(timer);
    const running = !paused && !keyboardBrowsing && !pointers.size && visible && onPage && !document.hidden && !reduced.matches && canAdvance();
    root.dataset.rotationState = reduced.matches ? 'reduced-motion' : paused ? 'paused' : running ? 'playing' : 'waiting';
    const label = reduced.matches ? 'Automatic rotation disabled for reduced motion' : `${paused ? 'Play' : 'Pause'} ${control.dataset.collection} rotation`;
    control.disabled = reduced.matches;
    control.setAttribute('aria-label', label);
    control.title = label;
    control.querySelector<HTMLElement>('[data-rotation-play]')!.hidden = !paused && !reduced.matches;
    control.querySelector<HTMLElement>('[data-rotation-pause]')!.hidden = paused || reduced.matches;
    // Announce deliberate selections only, never automatic changes.
    caption.setAttribute('aria-live', paused || keyboardBrowsing || reduced.matches ? 'polite' : 'off');
    if (running) timer = setTimeout(() => { advance(); sync(); }, interval);
    else stop();
  };
  control.hidden = false;
  control.addEventListener('click', () => { paused = !paused; sync(); });
  // Briefly yield during a gesture, then restart without requiring Play.
  root.addEventListener('pointerdown', event => {
    if (control.contains(event.target as Node)) return;
    pointers.add(event.pointerId);
    keyboardBrowsing = false;
    sync();
  }, { capture: true, passive: true });
  const releasePointer = (event: PointerEvent) => {
    if (pointers.delete(event.pointerId)) sync();
  };
  window.addEventListener('pointerup', releasePointer);
  window.addEventListener('pointercancel', releasePointer);
  root.addEventListener('lostpointercapture', releasePointer);
  root.addEventListener('wheel', () => { stop(); sync(); }, { capture: true, passive: true });
  root.addEventListener('keydown', event => {
    if (event.key === 'Escape') paused = true;
    if (['ArrowLeft', 'ArrowRight', 'Home', 'End', 'Escape', 'Enter', ' '].includes(event.key)) {
      stop();
      sync();
    }
  }, true);
  root.addEventListener('focusin', event => {
    const target = event.target as HTMLElement;
    // Section-heading focus from an anchor is not active keyboard browsing.
    keyboardBrowsing = !control.contains(target) && target.matches('a:focus-visible, button:focus-visible, [role="tab"]:focus-visible');
    sync();
  });
  root.addEventListener('focusout', () => { keyboardBrowsing = false; sync(); });
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', sync);
  window.addEventListener('blur', () => { if (pointers.size) { pointers.clear(); sync(); } });
  window.addEventListener('pagehide', () => { onPage = false; pointers.clear(); sync(); });
  window.addEventListener('pageshow', () => { onPage = true; sync(); });
  const observer = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    sync();
  }, { threshold: 0 });
  observer.observe(root);
  sync();
}

// Measure real, fully readable captions at their current width, once per resize.
// Reserving that space prevents automatic title changes from shifting the page.
export function stabilizeCarouselCaption(caption: HTMLElement, items: Array<{ title: string; creator: string }>) {
  let measuredWidth = 0;
  const measure = () => {
    const width = caption.getBoundingClientRect().width;
    if (!width) return;
    measuredWidth = width;
    const probes = items.map(item => {
      const probe = caption.cloneNode(true) as HTMLElement;
      probe.removeAttribute('aria-live');
      probe.setAttribute('aria-hidden', 'true');
      probe.inert = true;
      probe.style.cssText = `position:fixed;left:0;top:0;visibility:hidden;pointer-events:none;width:${width}px;min-height:0;max-width:none;`;
      probe.querySelector('h3,h4')!.textContent = item.title;
      probe.querySelector('[data-shelf-creator],[data-crate-creator]')!.textContent = item.creator;
      return probe;
    });
    const fragment = document.createDocumentFragment();
    probes.forEach(probe => fragment.append(probe));
    caption.parentElement!.append(fragment);
    const height = Math.max(...probes.map(probe => probe.getBoundingClientRect().height));
    probes.forEach(probe => probe.remove());
    caption.style.minHeight = `${Math.ceil(height)}px`;
  };
  new ResizeObserver(() => {
    if (Math.abs(caption.getBoundingClientRect().width - measuredWidth) > .5) measure();
  }).observe(caption);
  void document.fonts.ready.then(measure);
}
