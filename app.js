document.documentElement.classList.add('js');
const root = document.documentElement;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const gatherMedia = matchMedia('(min-width: 801px) and (min-height: 850px)');
const clamp = (value,min=0,max=1) => Math.min(max,Math.max(min,value));
let manualReduced = false;
const motionReduced = () => reducedMotion.matches || manualReduced;
const animations = new Set();
function animate(element,frames,options) {
  if(motionReduced()) return null;
  const animation = element.animate(frames,options);
  animations.add(animation);
  const clear = () => animations.delete(animation);
  animation.addEventListener('finish',clear,{once:true});
  animation.addEventListener('cancel',clear,{once:true});
  return animation;
}
const features = {
  cycle:{label:'Cycle tracking',title:'Your cycle.<br> <em>With context.</em>',description:'Record your cycle and symptoms. Keep your calendar alongside the rest of your day.',points:['Recorded days & cycle estimates','Body & lifestyle logs together'],alt:'Thrive cycle calendar and recorded days',light:'assets/cycle-light.webp',frame:'original-phone cycle-phone',hero:'Your cycle, with context'},
  daily:{label:'Daily check-in',title:'A moment.<br> <em>To check in.</em>',description:'Sleep, energy, mood and stress. Give how you feel a place to go, alongside symptoms and supplements.',points:['Sleep, energy, mood & stress','Quick symptom & supplement logs'],alt:'Thrive daily sleep, energy, mood and stress check-in',light:'assets/today-light.webp',dark:'assets/today-dark.webp',frame:'device device-daily',hero:'A moment for yourself'},
  movement:{label:'Strength Club',title:'Move how<br> <em>you want.</em>',description:'Pilates, yoga, strength and mobility. Explore a session for the day you’re having.',points:['Different durations and levels','Beginner sessions included'],alt:'Thrive Strength Club workout library',light:'assets/strength-club.webp',frame:'original-phone workout-phone',hero:'Your kind of movement'},
  nutrition:{label:'Food & water',title:'The everyday<br> <em>essentials.</em>',description:'Meals, water and supplements. Keep a record without keeping it all in your head.',points:['Food diary & nutrition totals','Water & supplement logs'],alt:'Thrive food, water and nutrition diary',light:'assets/nutrition-light.webp',dark:'assets/nutrition-dark.webp',frame:'nutrition-device',darkFrame:'nutrition-phone',hero:'The everyday essentials'}
};
const keys = Object.keys(features);
const tabs = [...document.querySelectorAll('[role=tab]')];
const cards = [...document.querySelectorAll('.deck-card')];
const panel = document.getElementById('app-panel');
const deck = document.querySelector('.screen-deck');
deck.querySelectorAll('img').forEach(image=>{image.draggable=false;});
deck.addEventListener('dragstart',event=>event.preventDefault());
let currentFeature = 'cycle';
let appTheme = 'light';
function themeFor(key) { return appTheme==='dark' && features[key].dark ? 'dark' : 'light'; }
function renderDeck() {
  const selectedIndex = keys.indexOf(currentFeature);
  cards.forEach((card,index) => {
    const key = card.dataset.feature;
    const f = features[key];
    const theme = themeFor(key);
    const img = card.querySelector('[data-screen]');
    img.parentElement.className = theme==='dark' && f.darkFrame ? f.darkFrame : f.frame;
    img.src = f[theme];
    img.alt = f.alt + ' in ' + theme + ' mode';
    let offset = index - selectedIndex;
    if(offset > 2) offset -= keys.length;
    if(offset < -2) offset += keys.length;
    card.style.setProperty('--offset',offset);
    card.style.setProperty('--abs',Math.abs(offset));
    const active = key === currentFeature;
    card.setAttribute('aria-current',String(active));
    card.tabIndex = active ? 0 : -1;
    card.setAttribute('aria-label',active ? 'Open full-size ' + f.label + ' screenshot' : 'Explore ' + f.label);
  });
  const f = features[currentFeature];
  const actual = themeFor(currentFeature);
  document.querySelectorAll('[data-preview-theme]').forEach(button => {
    button.disabled = button.dataset.previewTheme === 'dark' && !f.dark;
    button.setAttribute('aria-pressed',String(button.dataset.previewTheme === actual));
    button.setAttribute('aria-describedby','app-mode-note');
  });
  document.getElementById('app-mode-note').textContent = f.dark ? 'Light or dark. The app is yours either way.' : 'Showing a light screenshot here. The app has both modes.';
}
function selectFeature(key,focus=false) {
  if(!features[key]) return;
  const changed = currentFeature !== key;
  currentFeature = key;
  const f = features[key];
  tabs.forEach(tab => {
    const active = tab.dataset.feature === key;
    tab.setAttribute('aria-selected',String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  panel.setAttribute('aria-labelledby','tab-' + key);
  panel.dataset.feature = key;
  document.querySelector('.app-count').textContent = f.label;
  document.getElementById('feature-title').innerHTML = f.title;
  document.getElementById('feature-description').textContent = f.description;
  document.getElementById('feature-points').replaceChildren(...f.points.map(text => {const li=document.createElement('li');li.textContent=text;return li;}));
  renderDeck();
  if(changed) animate(document.querySelector('.app-detail'),[{translate:'0 9px'},{translate:'0 0'}],{duration:350,easing:'cubic-bezier(.2,.75,.2,1)'});
  if(focus) document.getElementById('tab-' + key).focus({preventScroll:true});
}
function nextFeature(direction,focus=false) {
  selectFeature(keys[(keys.indexOf(currentFeature) + keys.length + direction)%keys.length]);
  if(focus) cards[keys.indexOf(currentFeature)].focus({preventScroll:true});
}
tabs.forEach((tab,index) => {
  tab.addEventListener('click',() => selectFeature(tab.dataset.feature));
  tab.addEventListener('keydown',event => {
    let next;
    if(event.key==='ArrowRight') next=(index+1)%keys.length;
    if(event.key==='ArrowLeft') next=(index+keys.length-1)%keys.length;
    if(event.key==='ArrowDown') next=(index+(innerWidth<=600?2:1))%keys.length;
    if(event.key==='ArrowUp') next=(index+keys.length-(innerWidth<=600?2:1))%keys.length;
    if(event.key==='Home') next=0;
    if(event.key==='End') next=keys.length-1;
    if(next!==undefined){event.preventDefault();selectFeature(keys[next],true);}
  });
});
document.querySelector('.deck-prev').addEventListener('click',() => nextFeature(-1));
document.querySelector('.deck-next').addEventListener('click',() => nextFeature(1));
document.querySelectorAll('[data-preview-theme]').forEach(button => button.addEventListener('click',() => {appTheme=button.dataset.previewTheme;renderDeck();}));
let suppressCardClickUntil = 0;
cards.forEach(card => {
  card.addEventListener('click',event => {
    if(performance.now()<suppressCardClickUntil){event.preventDefault();return;}
    if(card.dataset.feature===currentFeature) openScreenshot(currentFeature);
    else selectFeature(card.dataset.feature);
  });
  card.addEventListener('keydown',event => {
    if(event.key==='ArrowRight'){event.preventDefault();nextFeature(1,true);}
    if(event.key==='ArrowLeft'){event.preventDefault();nextFeature(-1,true);}
  });
});
let drag = null;
deck.addEventListener('pointerdown',event => {
  if(!event.isPrimary || event.button!==0) return;
  drag={id:event.pointerId,x:event.clientX,y:event.clientY,dx:0,active:false};
});
deck.addEventListener('pointermove',event => {
  if(!drag || event.pointerId!==drag.id) return;
  const dx=event.clientX-drag.x,dy=event.clientY-drag.y;
  if(!drag.active && Math.abs(dy)>14 && Math.abs(dy)>Math.abs(dx)){drag=null;return;}
  if(!drag.active && Math.abs(dx)>7 && Math.abs(dx)>Math.abs(dy)*1.1) {
    drag.active=true;deck.setPointerCapture(event.pointerId);deck.classList.add('is-dragging');
  }
  if(drag.active){
    if(event.cancelable) event.preventDefault();
    drag.dx=dx;deck.style.setProperty('--drag',clamp(dx,-250,250)*.7+'px');
  }
});
function endDrag(event) {
  if(!drag || event.pointerId!==drag.id) return;
  const state=drag;drag=null;
  deck.classList.remove('is-dragging');deck.style.setProperty('--drag','0px');
  if(deck.hasPointerCapture(event.pointerId)) deck.releasePointerCapture(event.pointerId);
  if(state.active){
    suppressCardClickUntil=performance.now()+400;
    if(event.type!=='pointercancel' && Math.abs(state.dx)>42) nextFeature(state.dx<0?1:-1);
  }
}
deck.addEventListener('pointerup',endDrag);
deck.addEventListener('pointercancel',endDrag);
renderDeck();

const days = {
  slow:{prefix:'For your',word:'slower days.',feature:'daily',response:'Take a breath. Start with a check-in.'},
  balanced:{prefix:'For every',word:'kind of day.',feature:'cycle',response:'Your cycle, in the context of your life.'},
  energy:{prefix:'For your',word:'stronger days.',feature:'movement',response:'Pilates, yoga, strength & mobility. Your call.'}
};
let currentDay='balanced';
function setDay(key,transition=true) {
  if(!days[key]) return;
  const previous=currentDay;currentDay=key;
  const day=days[key],f=features[day.feature];
  document.querySelector('.hero').dataset.day=key;
  document.getElementById('hero-prefix').textContent=day.prefix;
  document.getElementById('day-word').textContent=day.word;
  document.getElementById('day-response').textContent=day.response;
  document.querySelectorAll('.day-options button').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.day===key)));
  const nextPhoto=document.querySelector('[data-photo="'+key+'"]');
  const prevPhoto=document.querySelector('[data-photo="'+previous+'"]');
  document.querySelectorAll('.day-photo').forEach(photo=>{
    photo.getAnimations().forEach(animation=>animation.cancel());
    photo.classList.remove('is-current','is-leaving');
    photo.setAttribute('aria-hidden',String(photo!==nextPhoto));
  });
  if(previous!==key && transition && !motionReduced()){
    prevPhoto.classList.add('is-leaving');
    nextPhoto.classList.add('is-current');
    const a=animate(nextPhoto,[{clipPath:'circle(4% at 70% 48%)'},{clipPath:'circle(145% at 70% 48%)'}],{duration:850,easing:'cubic-bezier(.2,.75,.2,1)'});
    if(a) a.addEventListener('finish',()=>{if(!prevPhoto.classList.contains('is-current'))prevPhoto.classList.remove('is-leaving');},{once:true});
  } else nextPhoto.classList.add('is-current');
  const heroDevice=document.querySelector('.hero-device');
  heroDevice.className='hero-device '+f.frame;
  const heroImage=document.getElementById('hero-screen');
  heroImage.src=f.light;heroImage.alt=f.alt;
  heroImage.removeAttribute('width');heroImage.removeAttribute('height');
  document.getElementById('hero-app-caption').innerHTML=f.hero+' <svg aria-hidden="true"><use href="#expand"/></svg>';
  if(transition && previous!==key){
    animate(heroDevice,[{translate:'0 17px',rotate:'4deg'},{translate:'0 0',rotate:'0deg'}],{duration:600,easing:'cubic-bezier(.2,.75,.2,1)'});
    animate(document.getElementById('day-word'),[{translate:'0 7px'},{translate:'0 0'}],{duration:400,easing:'ease-out'});
  }
  selectFeature(day.feature);
}
document.querySelectorAll('.day-options button').forEach(button => button.addEventListener('click',()=>setDay(button.dataset.day)));
setDay('balanced',false);

const screenshotDialog=document.getElementById('screenshot-dialog');
function openScreenshot(key=currentFeature,forcedTheme) {
  const f=features[key];
  const theme=forcedTheme || themeFor(key);
  document.getElementById('screenshot-title').textContent=f.label+' · '+(theme==='dark'?'Dark':'Light')+' appearance';
  const img=document.getElementById('full-screenshot');
  img.src=f[theme]||f.light;img.alt=f.alt;
  screenshotDialog.showModal();screenshotDialog.scrollTop=0;
}
document.querySelector('.expand-screen').addEventListener('click',()=>openScreenshot());
document.querySelector('.hero-app').addEventListener('click',()=>openScreenshot(days[currentDay].feature,'light'));
const information={
  release:{title:'A little note about the launch',html:'<p class="dialog-status">Coming soon to iOS &amp; Android</p><p>Thrive is preparing for launch. We’re planning 14 days free, so you can explore the app at your own pace.</p><p>The price after the trial, renewal and cancellation details are still to be announced. You’ll be able to review the full terms before subscribing.</p><p>This preview cannot create an account, start a subscription or take payment.</p>'},
  privacy:{title:'Privacy',html:'<p class="dialog-status">App privacy policy · Coming before launch</p><p>The full app privacy policy is being prepared and will be linked here before Thrive launches.</p><p>The day choices and gallery selections on this preview stay in your browser tab. They aren’t sent to Thrive. This preview doesn’t create an account or collect payment details.</p>'},
  terms:{title:'Terms & subscription',html:'<p class="dialog-status">App terms · Coming before launch</p><p>The app terms, price after the planned 14-day trial, renewal and cancellation details are still to be announced.</p><p>Full subscription details will be available before you start. This preview cannot create a subscription or take payment.</p>'},
  support:{title:'Contact & support',html:'<p class="dialog-status">Official support contact · Coming soon</p><p>We’ll publish Thrive’s support contact before the app launches.</p><p>For feedback on this preview, contact the person who shared the page with you.</p><p><a href="#questions">Read the common questions</a></p>'}
};
const infoDialog=document.getElementById('info-dialog');
function openInfo(key,store) {
  const info=information[key];if(!info)return;
  document.getElementById('info-title').textContent=store?'Coming soon to '+store:info.title;
  document.getElementById('info-content').innerHTML=info.html;
  infoDialog.showModal();infoDialog.scrollTop=0;
}
document.querySelectorAll('[data-info]').forEach(button=>button.addEventListener('click',()=>openInfo(button.dataset.info)));
document.querySelectorAll('[data-store]').forEach(button=>button.addEventListener('click',()=>openInfo('release',button.dataset.store)));
document.querySelectorAll('dialog').forEach(dialog=>{
  dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{
    if(event.target!==dialog)return;
    const rect=dialog.getBoundingClientRect();
    if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();
  });
});
infoDialog.addEventListener('click',event=>{if(event.target.closest('a[href^="#"]'))infoDialog.close();});
const menuToggle=document.querySelector('.menu-toggle'),mobileMenu=document.getElementById('mobile-menu');
function closeMenu(){menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Open menu');mobileMenu.hidden=true;}
menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')!=='true';menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Close menu':'Open menu');mobileMenu.hidden=!open;});
mobileMenu.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
addEventListener('keydown',event=>{if(event.key==='Escape'&&!mobileMenu.hidden){closeMenu();menuToggle.focus();}});
matchMedia('(min-width: 901px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
document.querySelectorAll('.faq-list details').forEach(detail=>detail.addEventListener('toggle',()=>{if(detail.open)document.querySelectorAll('.faq-list details').forEach(other=>{if(other!==detail)other.open=false;});}));

const hero=document.querySelector('.hero');
const gather=document.querySelector('.gather');
const gatherPin=document.querySelector('.gather-pin');
let rafPending=false;
function updateScroll(){
  rafPending=false;
  const distance=root.scrollHeight-innerHeight;
  root.style.setProperty('--read',distance>0?clamp(scrollY/distance):0);
  if(motionReduced())return;
  const heroRect=hero.getBoundingClientRect();
  hero.style.setProperty('--hero-p',clamp(-heroRect.top/heroRect.height));
  if(gatherMedia.matches){
    const rect=gather.getBoundingClientRect();
    const header=document.querySelector('.site-header').offsetHeight;
    const travel=gather.offsetHeight-gatherPin.offsetHeight;
    gather.style.setProperty('--gather',clamp((header-rect.top)/Math.max(1,travel)));
  }else gather.style.setProperty('--gather',1);
}
function requestScrollUpdate(){if(!rafPending){rafPending=true;requestAnimationFrame(updateScroll);}}
addEventListener('scroll',requestScrollUpdate,{passive:true});
addEventListener('resize',requestScrollUpdate,{passive:true});
gatherMedia.addEventListener('change',requestScrollUpdate);
if(finePointer.matches){
  hero.addEventListener('pointermove',event=>{if(motionReduced())return;const rect=hero.getBoundingClientRect();hero.style.setProperty('--px',((event.clientX-rect.left)/rect.width-.5)*2);},{passive:true});
  hero.addEventListener('pointerleave',()=>hero.style.setProperty('--px',0));
}
const motionToggle=document.querySelector('.motion-toggle');
function syncMotion(){
  const off=motionReduced();root.dataset.motion=off?'off':'on';
  motionToggle.textContent=reducedMotion.matches?'Reduced motion (system)':off?'Restore motion':'Reduce motion';
  motionToggle.setAttribute('aria-pressed',String(off));motionToggle.disabled=reducedMotion.matches;
  if(off){
    animations.forEach(a=>a.cancel());animations.clear();
    document.getAnimations().forEach(a=>a.cancel());
    document.querySelectorAll('.day-photo.is-leaving').forEach(photo=>photo.classList.remove('is-leaving'));
  }
  requestScrollUpdate();
}
motionToggle.addEventListener('click',()=>{manualReduced=!manualReduced;syncMotion();});
reducedMotion.addEventListener('change',syncMotion);
syncMotion();
const preload=()=>Object.values(features).forEach(f=>[f.light,f.dark].filter(Boolean).forEach(src=>{const image=new Image();image.src=src;}));
if('requestIdleCallback'in window)requestIdleCallback(preload);else setTimeout(preload,1200);
