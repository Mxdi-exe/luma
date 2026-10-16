'use strict';
const FLOW_URL = 'https://flow.google.com/';
const CONTENT_SCRIPT_ID = 'flow-helper';
const STATES = {
  enabled: ['ok', 'برای اعمال تغییرات، صفحه را بارگذاری مجدد کنید.'],
  disabled: ['idle', 'دسترسی غیرفعال است.'],
  active: ['ok', 'دسترسی روی این صفحه فعال است.'],
  armed: ['armed', 'در انتظار پاسخ صفحه…'],
  awaitingSpec: ['armed', 'در حال آماده‌سازی…'],
  specUnavailable: ['warn', 'اتصال برقرار نشد؛ دوباره تلاش کنید.'],
  schemaMismatch: ['bad', 'افزونه به به‌روزرسانی نیاز دارد.'],
  reloadTab: ['warn', 'صفحه را بارگذاری مجدد کنید.'],
  saving: ['armed', 'در حال ذخیره…'],
  saved: ['ok', 'ذخیره شد؛ صفحه را بارگذاری مجدد کنید.']
};
const toggle = document.getElementById('toggle');
const statusEl = document.getElementById('status');
const mode = document.getElementById('mode');
const error = document.getElementById('error');
const reload = document.getElementById('reload');
let tab;
function isFlow(url) {
  try { return new URL(url).origin === new URL(FLOW_URL).origin; } catch { return false; }
}
function setStatus(state) {
  const [dot, text] = STATES[state];
  statusEl.querySelector('.status-dot').className = 'status-dot status-dot--' + dot;
  statusEl.querySelector('.status-text').textContent = text;
}
function setEnabled(enabled) {
  toggle.setAttribute('aria-checked', String(enabled));
  mode.textContent = enabled ? 'روشن' : 'خاموش';
}
async function init() {
  const registrations = await chrome.scripting.getRegisteredContentScripts({ids: [CONTENT_SCRIPT_ID]});
  const enabled = registrations.length > 0;
  setEnabled(enabled);
  [tab] = await chrome.tabs.query({active:true,currentWindow:true});
  reload.hidden = !isFlow(tab?.url);
  setStatus(enabled ? 'enabled' : 'disabled');
  if (isFlow(tab?.url) && enabled) {
    try {
      const result = await chrome.tabs.sendMessage(tab.id, {type:'status'});
      if (result.applied) setStatus('active');
      else if (result.state === 'armed') setStatus('armed');
      else if (result.state === 'awaiting-spec') setStatus('awaitingSpec');
      else if (/^spec (unavailable|invalid)/.test(result.state || '')) setStatus('specUnavailable');
      else if (result.state?.startsWith('schema mismatch')) setStatus('schemaMismatch');
      else setStatus('reloadTab');
    } catch { setStatus('reloadTab'); }
  }
  toggle.disabled = false;
}
toggle.addEventListener('click', async () => {
  if (toggle.disabled) return;
  const previous = toggle.getAttribute('aria-checked') === 'true';
  const enabled = !previous;
  toggle.disabled = true;
  toggle.setAttribute('aria-busy', 'true');
  error.textContent = '';
  // Respond to the gesture immediately; revert if saving fails.
  setEnabled(enabled);
  setStatus('saving');
  try {
    const result = await chrome.runtime.sendMessage({type:'setEnabled',enabled});
    if (!result?.ok) throw new Error('save failed');
    setStatus('saved');
  } catch {
    setEnabled(previous);
    setStatus(previous ? 'enabled' : 'disabled');
    error.textContent = 'تنظیمات ذخیره نشد؛ دوباره تلاش کنید.';
  } finally {
    toggle.setAttribute('aria-busy', 'false');
    toggle.disabled = false;
  }
});
reload.addEventListener('click', async () => {
  reload.disabled = true;
  error.textContent = '';
  try {
    const current = await chrome.tabs.get(tab.id);
    if (!isFlow(current.url)) throw new Error('wrong tab');
    const url = new URL(current.url);
    if (/\/unsupported-country\/?$/.test(url.pathname)) {
      url.pathname = url.pathname.replace(/unsupported-country\/?$/, '');
      await chrome.tabs.update(tab.id, {url:url.href});
    } else await chrome.tabs.reload(tab.id);
    window.close();
  } catch { error.textContent = 'تب Flow را انتخاب کنید و دوباره تلاش کنید.'; }
  finally { reload.disabled = false; }
});
init().catch(() => {
  mode.textContent = 'در دسترس نیست';
  setStatus('specUnavailable');
  error.textContent = 'افزونه را ببندید و دوباره باز کنید.';
});
