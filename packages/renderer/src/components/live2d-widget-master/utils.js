import showMessage from './message';
import { randomSelection } from '@/utils/index';

function welcomeMessage(time) {
  if (location.pathname === '/') {
    // 如果是主页
    for (let { hour, text } of time) {
      const now = new Date(),
        after = hour.split('-')[0],
        before = hour.split('-')[1] || after;
      if (after <= now.getHours() && now.getHours() <= before) {
        return text;
      }
    }
  }
  const text = `欢迎阅读<span>「${document.title.split(' - ')[0]}」</span>`;
  let from;
  if (document.referrer !== '') {
    const referrer = new URL(document.referrer),
      domain = referrer.hostname.split('.')[1];
    const domains = {
      baidu: '百度',
      so: '360搜索',
      google: '谷歌搜索',
    };
    if (location.hostname === referrer.hostname) return text;

    if (domain in domains) from = domains[domain];
    else from = referrer.hostname;
    return `Hello！来自 <span>${from}</span> 的朋友<br>${text}`;
  }
  return text;
}

export function registerEventListener(result) {
  // 检测用户活动状态，并在空闲时显示消息
  let userAction = false,
    userActionTimer,
    messageArray = result.message.default,
    lastHoverElement;
  window.addEventListener('mousemove', () => (userAction = true));
  window.addEventListener('keydown', () => (userAction = true));
  setInterval(() => {
    if (userAction) {
      userAction = false;
      clearInterval(userActionTimer);
      userActionTimer = null;
    } else if (!userActionTimer) {
      userActionTimer = setInterval(() => {
        showMessage(messageArray, 6000, 9);
      }, 20000);
    }
  }, 1000);
  showMessage(welcomeMessage(result.time), 7000, 11);
  window.addEventListener('mouseover', event => {
    for (let { selector, text } of result.mouseover) {
      if (!event.target.closest(selector)) continue;
      if (lastHoverElement === selector) return;
      lastHoverElement = selector;
      text = randomSelection(text);
      text = text.replace('{text}', event.target.innerText);
      showMessage(text, 4000, 8);
      return;
    }
  });
  window.addEventListener('click', event => {
    for (let { selector, text } of result.click) {
      if (!event.target.closest(selector)) continue;
      text = randomSelection(text);
      text = text.replace('{text}', event.target.innerText);
      showMessage(text, 4000, 8);
      return;
    }
  });
  result.seasons.forEach(({ date, text }) => {
    const now = new Date(),
      after = date.split('-')[0],
      before = date.split('-')[1] || after;
    if (
      after.split('/')[0] <= now.getMonth() + 1 &&
      now.getMonth() + 1 <= before.split('/')[0] &&
      after.split('/')[1] <= now.getDate() &&
      now.getDate() <= before.split('/')[1]
    ) {
      text = randomSelection(text);
      text = text.replace('{year}', now.getFullYear());
      messageArray.push(text);
    }
  });

  window.addEventListener('copy', () => {
    showMessage(result.message.copy, 6000, 9);
  });
  window.addEventListener('visibilitychange', () => {
    if (!document.hidden) showMessage(result.message.visibilitychange, 6000, 9);
  });
}
