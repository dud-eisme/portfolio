document.querySelectorAll('.reveal-stagger').forEach(container => {
  Array.from(container.children).forEach((child, i) => {
    child.style.transitionDelay = `${i * 80}ms`;
  });
});

const revealTargets = document.querySelectorAll('.reveal, .reveal-stagger');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('in-view', entry.isIntersecting);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealTargets.forEach(el => observer.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('in-view'));
}

document.querySelectorAll('.expandable').forEach(entry => {
  const trigger = entry.querySelector('.proj-head, .cert-line');
  const panel = entry.querySelector('.proj-panel, .cert-panel');
  if (!trigger || !panel) return;

  trigger.addEventListener('click', () => {
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', String(!isOpen));

    if (isOpen) {
      panel.style.maxHeight = '0px';
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
});

window.addEventListener('resize', () => {
  document.querySelectorAll('.expandable').forEach(entry => {
    const trigger = entry.querySelector('.proj-head, .cert-line');
    const panel = entry.querySelector('.proj-panel, .cert-panel');
    if (trigger && panel && trigger.getAttribute('aria-expanded') === 'true') {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
});
