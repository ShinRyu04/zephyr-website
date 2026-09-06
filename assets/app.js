// Zephyr website — interaksi minimal.
// Sticky header + accordion FAQ. Tidak ada animasi scroll-reveal,
// tidak ada counter angka, tidak ada parallax.

const header = document.getElementById('site-header');
if (header) {
  const onScroll = () => header.classList.toggle('is-sticky', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  const btn = item.querySelector('.faq-q');
  const ans = item.querySelector('.faq-a');
  if (!btn || !ans) return;
  btn.addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    faqItems.forEach((other) => {
      other.classList.remove('open');
      const oa = other.querySelector('.faq-a');
      const ob = other.querySelector('.faq-q');
      if (oa) oa.style.maxHeight = null;
      if (ob) ob.setAttribute('aria-expanded', 'false');
    });
    if (!wasOpen) {
      item.classList.add('open');
      ans.style.maxHeight = ans.scrollHeight + 'px';
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});
