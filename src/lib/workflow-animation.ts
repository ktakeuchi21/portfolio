import { gsap } from 'gsap';

/** Enhance the complete still illustration; never hide content while JS loads. */
export function setupWorkflowAnimation(visual: HTMLElement) {
  const illustration = visual.querySelector<HTMLElement>('[data-workflow-illustration]');
  const button = visual.querySelector<HTMLButtonElement>('[data-workflow-play]');
  const label = button?.querySelector<HTMLElement>('[data-workflow-play-label]');
  if (!illustration || !button || !label) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let timeline: gsap.core.Timeline | undefined;
  let panelVisible = true;
  let state: 'idle' | 'playing' | 'paused' | 'complete' = 'idle';
  const update = () => {
    const action = { idle: 'Play', playing: 'Pause', paused: 'Resume', complete: 'Replay' }[state];
    label.textContent = action;
    button.setAttribute('aria-label', `${action} workflow animation`);
    button.dataset.state = state;
    button.hidden = reduced.matches || !panelVisible;
  };
  const pause = () => {
    if (state !== 'playing') return;
    timeline?.pause();
    state = 'paused';
    update();
  };
  const finish = () => {
    if (!timeline) return;
    timeline.progress(1).pause();
    state = 'complete';
    update();
  };

  const play = () => {
    if (reduced.matches || !panelVisible) return;
    if (state === 'paused') {
      state = 'playing';
      update();
      timeline?.play();
      return;
    }
    timeline?.revert();
    const part = (name: string) => illustration.querySelectorAll<SVGElement>(`[data-motion="${name}"]`);
    const reveal = { opacity: 1, x: 0, y: 0, duration: .4, immediateRender: false };
    timeline = gsap.timeline({
      paused: true,
      defaults: { ease: 'power2.out', immediateRender: false },
      onComplete: () => { state = 'complete'; update(); },
    });
    ['capture', 'understand', 'price', 'listings', 'sync', 'fulfill'].forEach((step, index) => {
      const outline = illustration.querySelector(`[data-highlight="${step}"]`);
      timeline!.addLabel(step, index)
        .to(outline, { opacity: 1, duration: .18 }, step)
        .to(outline, { opacity: 0, duration: .25 }, `${step}+=.75`);
    });
    timeline
      .fromTo(part('camera'), { scale: .82, transformOrigin: '50% 50%', smoothOrigin: false }, { scale: 1, duration: .4 }, 'capture')
      .fromTo(part('voice'), { scaleY: .35, transformOrigin: '50% 50%', smoothOrigin: false }, { scaleY: 1, duration: .35 }, 'capture+=.35')
      .fromTo(part('magnifier'), { x: -24, y: 8 }, { x: 0, y: 0, duration: .45 }, 'understand')
      .fromTo(part('identity'), { opacity: .15, y: 6 }, reveal, 'understand+=.4')
      .fromTo(illustration.querySelectorAll('[data-bar]'), { scaleY: .15, transformOrigin: '50% 100%', smoothOrigin: false }, { scaleY: 1, duration: .4, stagger: .1 }, 'price')
      .fromTo(part('price-tag'), { opacity: .15, x: -8 }, reveal, 'price+=.5')
      .fromTo(part('listing-back'), { x: 17, y: 10 }, { x: 0, y: 0, duration: .4 }, 'listings')
      .fromTo(part('listing-front'), { x: -12, y: -6 }, { x: 0, y: 0, duration: .4 }, 'listings')
      .fromTo(part('review'), { opacity: .15, y: 6 }, reveal, 'listings+=.4')
      .fromTo(part('sold'), { opacity: .15, y: -8 }, reveal, 'sync')
      .fromTo(part('closed-listing'), { opacity: .15 }, { opacity: 1, duration: .4 }, 'sync+=.4')
      .fromTo(part('parcel'), { y: -9 }, { y: 0, duration: .4 }, 'fulfill')
      .fromTo(part('truck'), { x: -16 }, { x: 0, duration: .6 }, 'fulfill+=.25');
    state = 'playing';
    update();
    timeline.play(0);
  };

  button.addEventListener('click', () => state === 'playing' ? pause() : play());
  reduced.addEventListener('change', () => {
    // Move focus before hiding the control when the OS preference changes.
    if (reduced.matches && document.activeElement === button) {
      visual.querySelector<HTMLButtonElement>('[role="tab"][aria-selected="true"]')?.focus();
    }
    if (reduced.matches) finish();
    update();
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
  const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) pause(); });
  observer.observe(illustration);
  window.addEventListener('pagehide', pause);
  update();

  return {
    setVisible(visible: boolean) {
      panelVisible = visible;
      if (!visible) finish();
      update();
    },
  };
}
