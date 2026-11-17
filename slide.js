(() => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const nav = Array.from(document.querySelectorAll('.pages a'));
  const prev = document.querySelector('#prev');
  const next = document.querySelector('#next');
  const counter = document.querySelector('#counter');
  function update(){
    const found = slides.findIndex(el => '#' + el.id === location.hash);
    const at = found < 0 ? 0 : found;
    slides.forEach((slide,i) => slide.hidden = i !== at);
    nav.forEach((a,i) => i === at ? a.setAttribute('aria-current','page') : a.removeAttribute('aria-current'));
    prev.disabled = at === 0;
    next.disabled = at === slides.length-1;
    counter.textContent = (at+1)+' / '+slides.length;
    prev.onclick = () => go(at-1);
    next.onclick = () => go(at+1);
  }
  function go(i){ if(slides[i]) location.hash = slides[i].id; }
  window.addEventListener('hashchange',() => {update();window.scrollTo(0,0);});
  document.addEventListener('keydown',e => {
    if (e.altKey || e.metaKey || e.ctrlKey || ['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)) return;
    if(e.key === 'ArrowRight' && !next.disabled) next.click();
    if(e.key === 'ArrowLeft' && !prev.disabled) prev.click();
  });
  update();
})();
