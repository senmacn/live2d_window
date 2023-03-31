function loadWidget() {
  localStorage.removeItem('waifu-display');
  sessionStorage.removeItem('waifu-text');
  setTimeout(() => {
    document.getElementById('waifu').style.bottom = 0;
  }, 0);
}

function initWidget() {
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div id="waifu-toggle">
            <span>看板娘</span>
        </div>`,
  );
  const toggle = document.getElementById('waifu-toggle');
  toggle.addEventListener('click', () => {
    toggle.classList.remove('waifu-toggle-active');
    if (toggle.getAttribute('first-time')) {
      loadWidget();
      toggle.removeAttribute('first-time');
    } else {
      localStorage.removeItem('waifu-display');
      document.getElementById('waifu').style.display = '';
      setTimeout(() => {
        document.getElementById('waifu').style.bottom = 0;
      }, 0);
    }
  });
  if (localStorage.getItem('waifu-display') && Date.now() - localStorage.getItem('waifu-display') <= 86400000) {
    toggle.setAttribute('first-time', true);
    setTimeout(() => {
      toggle.classList.add('waifu-toggle-active');
    }, 0);
  } else {
    loadWidget();
  }
}

export default initWidget;
