'use strict';
const config = window.THRIVE_CONFIG;
const track = (name, props) => window.ThriveAnalytics.track(name, props);
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];
const contentDialog = $('#content-dialog');
const screenshotDialog = $('#screenshot-dialog');
const content = $('#dialog-content');
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const icon = name => `<svg aria-hidden="true"><use href="#${name}"/></svg>`;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let manualReduced = false;
const activeAnimations = new Set();
const canAnimate = () => !manualReduced && !reducedMotion.matches;
function animate(element, frames, options) {
  if (!canAnimate() || !element?.animate) return;
  const animation = element.animate(frames, options);
  activeAnimations.add(animation);
  const clear = () => activeAnimations.delete(animation);
  animation.addEventListener('finish', clear, {once:true});
  animation.addEventListener('cancel', clear, {once:true});
}

// Preview is intentionally public-safe. Sample labels never disappear by URL parameter.
if (!config.previewMode && !config.launchVerified) config.previewMode = true;
$('#preview-notice').hidden = !config.previewMode;
if (!config.previewMode && config.launchVerified) {
  $('meta[name="robots"]').content = 'index,follow';
}
const screens = {
  cycle: { title:'Cycle tracking', src:'assets/cycle-light.webp', frame:'original-phone cycle-phone', alt:'THRIVE cycle calendar and recorded days' },
  daily: { title:'Daily check-in', src:'assets/today-light.webp', dark:'assets/today-dark.webp', frame:'device', alt:'THRIVE daily sleep, energy, mood and stress check-in' },
  nutrition: { title:'Nutrition diary', src:'assets/nutrition-light.webp', dark:'assets/nutrition-dark.webp', frame:'nutrition-device', darkFrame:'nutrition-phone', alt:'THRIVE food, water and nutrition diary' },
  movement: { title:'Strength Club', src:'assets/strength-club.webp', frame:'original-phone workout-phone', alt:'THRIVE Strength Club workout library' }
};
function screenMarkup(key, theme='light', extra='') {
  const screen = screens[key];
  const isDark = theme === 'dark' && screen.dark;
  return `<span class="${isDark && screen.darkFrame ? screen.darkFrame : screen.frame} ${extra}"><img src="${isDark ? screen.dark : screen.src}" alt="${escapeHTML(screen.alt)}${isDark ? ' in dark mode' : ''}"></span>`;
}
function showDialog(title, markup, className='dialog-copy') {
  if (screenshotDialog.open) screenshotDialog.close();
  if (contentDialog.open) contentDialog.close();
  $('#dialog-title').textContent = title;
  content.className = className;
  content.innerHTML = markup;
  contentDialog.showModal();
  contentDialog.scrollTop = 0;
}
function openScreenshot(key, theme='light') {
  const screen = screens[key];
  if (!screen) return;
  if (contentDialog.open) contentDialog.close();
  $('#screenshot-title').textContent = screen.title + (theme === 'dark' && screen.dark ? ' · Dark appearance' : ' · Light appearance');
  $('#full-screenshot').src = theme === 'dark' && screen.dark ? screen.dark : screen.src;
  $('#full-screenshot').alt = screen.alt;
  screenshotDialog.showModal();
  screenshotDialog.scrollTop = 0;
}
$$('dialog').forEach(dialog => {
  $('.dialog-close',dialog).addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => { $$('video',dialog).forEach(video => video.pause()); updateSticky(); });
});

function safeStoreURL(platform) { return window.ThriveRouting.storeURL(platform,config.stores[platform]); }
function safeWebURL(value) {
  if (!value) return null;
  try { const url = new URL(value, location.href); return url.protocol === 'https:' || url.origin === location.origin ? url.href : null; } catch (_) { return null; }
}
function detectPlatform() { return window.ThriveRouting.platformFrom(navigator.userAgent,navigator.platform,navigator.maxTouchPoints); }
function storeButton(platform, locationName='dialog') {
  return `<button type="button" class="store-badge" data-store="${platform}" data-location="${locationName}">${icon(platform === 'apple' ? 'apple' : 'google')}<span><small>${platform === 'apple' ? 'For iPhone' : 'For Android'}</small><strong>${platform === 'apple' ? 'App Store' : 'Google Play'}</strong></span></button>`;
}
let lastStoreOrigin = 'direct';
function storeChoiceDialog(origin=lastStoreOrigin) {
  lastStoreOrigin=origin;
  const pending = !config.launchVerified;
  showDialog('Your THRIVE starts here.', `<p class="dialog-status">${pending ? 'Design preview · Store listings not connected' : 'Choose your app store'}</p><p>Your first 14 days are for exploring. Download THRIVE, create your account and activate your trial in the app.</p><div class="dialog-store-options">${storeButton('apple',origin)}${storeButton('google',origin)}</div><p class="dialog-disclosure">${pending ? 'This preview cannot download the app, create an account, activate a trial or take payment. Verified THRIVE listings and subscription details will be connected before launch.' : 'Downloading the app does not activate a trial. Review the complete subscription terms in the app before you start.'}</p>`);
}
function routeToStore(platform, locationName='unknown', explicit=true) {
  if(explicit)track('store_option_select', {platform, location:locationName});
  const url = safeStoreURL(platform);
  if (url && config.launchVerified) {
    track('store_redirect', {platform, location:locationName});
    window.location.assign(url);
  } else {
    showDialog(platform === 'apple' ? 'THRIVE for iPhone.' : 'THRIVE for Android.', `<p class="dialog-status">Store link placeholder · Not connected</p><p>The verified THRIVE ${platform === 'apple' ? 'App Store' : 'Google Play'} listing will be linked here before launch.</p><p>Your intended offer is 14 days free. Pricing, billing requirements and cancellation instructions are still being confirmed.</p><p class="dialog-disclosure">No download, account, trial or payment has been started. This is a visual-review preview.</p><button type="button" class="text-link" data-back-stores>View both store options ${icon('arrow')}</button>`);
  }
}
function startTrial(locationName) {
  closeMenu();
  track('primary_cta_click', {location:locationName});
  const platform = detectPlatform();
  if (platform && config.launchVerified && safeStoreURL(platform)) routeToStore(platform,locationName,false);
  else storeChoiceDialog(locationName);
}
document.addEventListener('click', event => {
  const trial = event.target.closest('[data-trial]');
  const store = event.target.closest('[data-store]');
  const info = event.target.closest('[data-info]');
  const screen = event.target.closest('[data-screenshot]');
  if (trial) startTrial(trial.dataset.trial);
  else if (store) routeToStore(store.dataset.store,store.dataset.location || 'dialog');
  else if (info) openInfo(info.dataset.info);
  else if (screen) openScreenshot(screen.dataset.screenshot,screen.dataset.theme || 'light');
  else if (event.target.closest('[data-back-stores]')) storeChoiceDialog();
});

// ARIA tabs have one tab stop; arrows and Home/End select without scrolling the page.
function connectTabs(selector, select) {
  const tabs = $$(selector);
  function choose(tab, focus=false) {
    tabs.forEach(item => { item.setAttribute('aria-selected',String(item === tab)); item.tabIndex = item === tab ? 0 : -1; });
    select(tab);
    if (focus) tab.focus({preventScroll:true});
  }
  tabs.forEach((tab,index) => {
    tab.addEventListener('click',() => choose(tab));
    tab.addEventListener('keydown',event => {
      const moves = { ArrowRight:(index+1)%tabs.length, ArrowLeft:(index+tabs.length-1)%tabs.length, Home:0, End:tabs.length-1 };
      if (moves[event.key] !== undefined) { event.preventDefault(); choose(tabs[moves[event.key]],true); }
    });
  });
}
connectTabs('[data-tracking]',tab => {
  const key = tab.dataset.tracking;
  $('#tracking-panel').setAttribute('aria-labelledby',tab.id);
  $('.tracking-phone').hidden = key !== 'cycle';
  $('#symptom-preview').hidden = key !== 'symptoms';
  $('#patterns-preview').hidden = key !== 'patterns';
  $('#tracking-caption').textContent = key === 'cycle' ? 'Your cycle, in the context of you. Tap the screen to look closer.' : 'Illustrative product screen. Sample content, not real health data.';
  track('feature_preview',{feature:key});
  animate($('#tracking-panel'),[{transform:'translateY(6px)'},{transform:'translateY(0)'}],{duration:250,easing:'ease-out'});
});
$('#sample-report').addEventListener('click', () => {
  const report = 'THRIVE — ILLUSTRATIVE SAMPLE REPORT\nDEMO CONTENT: NOT A REAL PERSON OR HEALTH RECORD\n\nPurpose: visual preview of the reporting feature.\nSeven example check-ins.\nMon: Energy low\nTue: Energy steady\nWed: Energy low\nThu: Energy high\nFri: Energy steady\nSat: Energy high\nSun: Energy high\n\nThis sample is not medical advice, a clinical assessment or a product outcome.\nFinal reporting functionality and trial entitlement require verification.\n';
  const url = URL.createObjectURL(new Blob([report],{type:'text/plain;charset=utf-8'}));
  const link = document.createElement('a'); link.href = url; link.download = 'THRIVE-illustrative-sample-report.txt'; document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url),1000);
  track('sample_report_download',{feature:'patterns'});
});
let dailyFeature = 'nutrition';
let dailyTheme = 'light';
function renderDaily() {
  const button = $('#daily-enlarge');
  button.innerHTML = screenMarkup(dailyFeature,dailyTheme);
  button.dataset.screenshot = dailyFeature;
  button.dataset.theme = dailyTheme;
  button.setAttribute('aria-label','Enlarge '+screens[dailyFeature].title+' in '+dailyTheme+' mode');
  $$('[data-app-theme]').forEach(item => item.setAttribute('aria-pressed',String(item.dataset.appTheme === dailyTheme)));
}
$('#daily-frame').setAttribute('role','tabpanel');
$('#daily-frame').tabIndex=0;
$('#daily-frame').setAttribute('aria-labelledby','daily-tab-nutrition');
connectTabs('[data-daily]',tab => {dailyFeature = tab.dataset.daily; $('#daily-frame').setAttribute('aria-labelledby',tab.id); renderDaily(); track('feature_preview',{feature:dailyFeature});});
$$('[data-app-theme]').forEach(button => button.addEventListener('click',() => {dailyTheme = button.dataset.appTheme; renderDaily();}));
const movementCopy = {
  strength:['Your kind of strong.','Guided strength programs and workouts for home or the gym, with different levels and durations.'],
  yoga:['Find a little flow.','Yoga, Pilates and mobility sessions to make space for movement, at your own pace.'],
  mindful:['Move. Breathe. Unwind.','Mindful movement and gentle practices, alongside relaxation and meditation in your wellbeing library.']
};
connectTabs('[data-movement]',tab => {
  const [title,description] = movementCopy[tab.dataset.movement];
  $('#movement-subtitle').textContent = title;
  $('#movement-description').textContent = description;
  $('#movement-panel').setAttribute('aria-labelledby',tab.id);
  track('feature_preview',{feature:tab.dataset.movement});
});

// Clearly marked sample resources and testimonials, never simulated endorsements.
$('#resources').innerHTML = config.resources.map((resource,index) => `<article class="resource-card"><span class="sample-label">${escapeHTML(resource.category)} · Sample resource</span><h3>${escapeHTML(resource.title)}</h3><p>${escapeHTML(resource.duration)}</p><button type="button" data-resource="${index}" aria-label="Preview ${escapeHTML(resource.title)}">${icon('arrow')}</button></article>`).join('');
$('#testimonials').innerHTML = config.testimonials.filter(item => config.previewMode || item.verified).map(item => `<article class="testimonial"><p class="sample-label">${item.verified ? 'Verified member experience' : 'Sample story · Not a real review'}</p><blockquote>“${escapeHTML(item.quote)}”</blockquote><div class="testimonial-person"><span class="avatar-placeholder" aria-hidden="true">${escapeHTML(item.initials)}</span><div><strong>${escapeHTML(item.name)}</strong><p>${escapeHTML(item.context)}</p></div></div></article>`).join('');
if (!$('#testimonials').children.length) $('.stories-section').hidden = true;
const trialRows = [ ['After the trial',config.trial.priceAfter || 'Price to be confirmed'], ['Billing starts',config.trial.billingStarts || 'To be confirmed'], ['Payment details',config.trial.paymentRequired === null ? 'Requirement to be confirmed' : config.trial.paymentRequired ? 'Required' : 'Not required'], ['Cancellation',config.trial.cancellation || 'Instructions to be confirmed'] ];
$('#subscription-details').innerHTML = trialRows.map(([term,detail]) => `<div><dt>${escapeHTML(term)}</dt><dd>${escapeHTML(detail)}</dd></div>`).join('');
const subscriptionConfirmed = trialRows.every(([,value]) => !/to be confirmed/i.test(value));
if(subscriptionConfirmed) {
  $('#subscription-status').textContent='Subscription details';
  $('#faq-billing').textContent=`After your 14-day trial: ${config.trial.priceAfter}. Billing starts: ${config.trial.billingStarts}. Payment details ${config.trial.paymentRequired ? 'are required' : 'are not required'}. Review the full terms before starting.`;
  $('#faq-cancel').textContent=config.trial.cancellation;
}
if(config.founder.name) $('#founder-name').textContent='Meet '+config.founder.name;
if (config.founder.credentialsVerified) $('#founder-credential').textContent = config.founder.credentials;
if (config.founder.photo) {
  const src = safeWebURL(config.founder.photo);
  if (src) { const img = document.createElement('img'); img.src=src; img.alt=config.founder.name || 'THRIVE founder'; img.className='authentic-founder-photo'; $('.founder-video-thumb').prepend(img); $('.founder-monogram').hidden=true; }
}
function openInfo(key) {
  const legal = config.legal;
  if (key === 'privacy' && safeWebURL(legal.privacy)) { location.assign(safeWebURL(legal.privacy)); return; }
  if (key === 'terms' && safeWebURL(legal.terms)) { location.assign(safeWebURL(legal.terms)); return; }
  if (key === 'support' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(legal.supportEmail || '')) { location.assign('mailto:'+legal.supportEmail); return; }
  const info = {
    preview:['About this preview.', '<p class="dialog-status">Complete visual review · Launch details pending</p><p>This page presents the full planned THRIVE experience. App screens supplied by the team appear alongside clearly labeled illustrative screens, lifestyle photography, sample stories and video placeholders.</p><p>The portrait is illustrative, not the founder or a customer. Sample testimonials are not real endorsements. All product availability, trial entitlements and subscription details must be checked before launch.</p><p>No account, payment, download or trial activation is connected. Analytics currently runs as a local development stub without cookies or a tracking service.</p>'],
    privacy:['Privacy.', '<p class="dialog-status">Privacy policy placeholder</p><p>The approved THRIVE privacy policy will be linked here before launch, including how app health information is handled.</p><p>This preview does not collect health logs, create accounts or take payments. Its interactive selections stay in this tab. The analytics integration is disabled. The hosting provider may process ordinary website requests.</p>'],
    terms:['Your trial & subscription.', `<p class="dialog-status">Terms placeholder · Requires launch confirmation</p><p>Intended offer: 14 days free, with cancellation before your trial ends. Final price, payment requirements, billing start date and exact cancellation steps are awaiting confirmation.</p><dl class="dialog-terms">${trialRows.map(([term,detail]) => `<dt>${escapeHTML(term)}</dt><dd>${escapeHTML(detail)}</dd>`).join('')}</dl><p>The complete terms and trial inclusions will be shown before you subscribe. Nothing on this preview creates a subscription or charges you.</p>`],
    support:['A little help.', '<p class="dialog-status">Support contact placeholder</p><p>The official support email and help resources will be published here before launch.</p><p>For design-preview feedback, contact the person who shared this page with you.</p>']
  };
  if (info[key]) showDialog(...info[key]);
}
document.addEventListener('click',event => {
  const resource = event.target.closest('[data-resource]');
  if (resource) {
    const item = config.resources[Number(resource.dataset.resource)];
    if (!item) return;
    track('resource_preview',{resource:item.category});
    showDialog(item.title, `<p class="dialog-status">${escapeHTML(item.category)} · Sample resource placeholder</p><div class="video-placeholder-player">${icon('play')}<strong>${escapeHTML(item.title)}</strong><p>${escapeHTML(item.duration)}</p></div><p>${escapeHTML(item.description)}</p><p class="dialog-disclosure">This demonstrates the library layout. The approved resource, its author and its media will be connected before launch.</p>`);
  }
});

function openVideo(key) {
  const video = config.videos[key];
  if (!video) return;
  track('video_opened',{video:key});
  const src = safeWebURL(video.src);
  if (src) {
    showDialog(video.title, `<video class="dialog-video" controls playsinline preload="metadata" ${safeWebURL(video.poster) ? `poster="${escapeHTML(safeWebURL(video.poster))}"` : ''}><source src="${escapeHTML(src)}">${safeWebURL(video.captions) ? `<track kind="captions" src="${escapeHTML(safeWebURL(video.captions))}" srclang="en" label="English" default>` : ''}Your browser does not support this video.</video><p class="dialog-disclosure">Use the video controls to play and enable captions.</p>`);
    return;
  }
  if (key === 'app') {
    showDialog(video.title, `<p class="dialog-status">App video placeholder · Interactive screen preview</p><p>The walkthrough film is coming. Explore the supplied app screens below in the meantime.</p><div class="video-preview-chapters" role="group" aria-label="App demonstration chapters">${Object.entries(screens).map(([id,screen],index) => `<button type="button" data-demo-screen="${id}" aria-pressed="${index===0}">${escapeHTML(screen.title)}</button>`).join('')}</div><div class="demo-mini-screen" id="demo-mini-screen">${screenMarkup('cycle')}</div><p class="dialog-disclosure">Authentic team-supplied design screenshots. This is a screen preview, not a recording of working app interactions.</p>`);
  } else {
    showDialog(video.title, '<p class="dialog-status">Founder film & portrait placeholder</p><div class="video-placeholder-player">'+icon('play')+'<strong>A personal introduction.</strong><p>Founder video coming here.</p></div><p>This space is reserved for the founder’s authentic introduction, with captions and an approved transcript.</p><details class="dialog-transcript"><summary>Preview the planned film outline</summary><ol><li>Why THRIVE was created for women navigating a changing body.</li><li>How tracking, nutrition, fitness and wellbeing fit together.</li><li>The founder’s verified professional training background.</li><li>A personal invitation to explore the 14-day trial.</li></ol></details><p class="dialog-disclosure">Placeholder outline, not a founder quote. Name, portrait, footage and experience statement require approval before launch.</p>');
  }
}
$$('[data-video]').forEach(button => {
  const item = config.videos[button.dataset.video];
  if (safeWebURL(item.poster)) {
    const poster = document.createElement('img'); poster.src=safeWebURL(item.poster);poster.alt='';poster.className='video-poster';button.prepend(poster);
  }
  if (safeWebURL(item.src)) $('.video-status',button).textContent='Watch video';
  else if(button.dataset.video==='founder' && safeWebURL(config.founder.photo)) $('.video-status',button).textContent='Founder video placeholder';
  button.addEventListener('click',() => openVideo(button.dataset.video));
});
content.addEventListener('click',event => {
  const chapter = event.target.closest('[data-demo-screen]');
  if (chapter) {
    $$('[data-demo-screen]',content).forEach(button => button.setAttribute('aria-pressed',String(button===chapter)));
    $('#demo-mini-screen').innerHTML = screenMarkup(chapter.dataset.demoScreen);
  }
});

const menuToggle = $('.menu-toggle');
const menu = $('#mobile-menu');
function closeMenu() { menu.hidden=true; menuToggle.setAttribute('aria-expanded','false'); menuToggle.setAttribute('aria-label','Open menu'); }
menuToggle.addEventListener('click',() => { const open = menu.hidden; menu.hidden=!open; menuToggle.setAttribute('aria-expanded',String(open)); menuToggle.setAttribute('aria-label',open?'Close menu':'Open menu'); });
$$('a',menu).forEach(link => link.addEventListener('click',closeMenu));
addEventListener('keydown',event => {if(event.key==='Escape' && !menu.hidden) {closeMenu();menuToggle.focus();}});
matchMedia('(min-width:801px)').addEventListener('change',event => { if(event.matches)closeMenu(); });
$$('.faq-list details').forEach((detail,index) => detail.addEventListener('toggle',() => {if(detail.open) { track('faq_open',{question:index+1}); $$('.faq-list details').forEach(other => { if(other!==detail)other.open=false; });}}));

// Motion never hides content in CSS or reserves oversized scroll sections.
if ('IntersectionObserver' in window) {
  const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {if(entry.isIntersecting) {animate(entry.target,[{opacity:.88,transform:'translateY(15px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'cubic-bezier(.2,.7,.2,1)'});reveal.unobserve(entry.target);}});
  },{threshold:.12});
  $$('[data-reveal]').forEach(element => reveal.observe(element));
}
const motionToggle = $('.motion-toggle');
function syncMotion() {
  const off = !canAnimate();
  document.documentElement.dataset.motion = off?'off':'on';
  motionToggle.textContent = reducedMotion.matches ? 'Reduced motion (system)' : off ? 'Restore motion' : 'Reduce motion';
  motionToggle.setAttribute('aria-pressed',String(off));motionToggle.disabled=reducedMotion.matches;
  if(off) {activeAnimations.forEach(animation => animation.cancel());activeAnimations.clear();}
}
motionToggle.addEventListener('click',() => {manualReduced=!manualReduced;syncMotion();});
reducedMotion.addEventListener('change',syncMotion);
syncMotion();
animate($('.hero-phone'),[{translate:'0 14px'},{translate:'0 0'}],{duration:1000,easing:'cubic-bezier(.2,.7,.2,1)'});
let stickyFrame = 0;
function updateSticky() {
  stickyFrame=0;
  const heroBottom = $('.hero').getBoundingClientRect().bottom;
  const trial = $('#get-thrive').getBoundingClientRect();
  const inTrial = trial.top < innerHeight && trial.bottom > 0;
  $('#mobile-trial').hidden = innerWidth > 600 || heroBottom > 0 || inTrial || contentDialog.open || screenshotDialog.open;
}
function requestSticky() { if(!stickyFrame)stickyFrame=requestAnimationFrame(updateSticky); }
addEventListener('scroll',requestSticky,{passive:true});
addEventListener('resize',requestSticky,{passive:true});
updateSticky();
// Consistent initial view for shared links; in-page navigation still works normally.
if ('scrollRestoration' in history) history.scrollRestoration='manual';
if (location.hash) history.replaceState(null,'',location.pathname+location.search);
addEventListener('pageshow',() => {scrollTo({top:0,left:0,behavior:'instant'});requestSticky();},{once:true});
track('landing_page_view',{location:'landing'});
