/* Stronger at 57: optional looping MP4 exercise demonstrations.
   Videos live at videos/<slug>.mp4. If a clip is missing, the existing PNG remains visible. */
(()=>{
  const slugs={
    'Squats':'squats','Incline Push-ups':'incline-push-ups','Reverse Lunges':'reverse-lunges',
    'Supported Split Squats':'reverse-lunges','Glute Bridges':'glute-bridges','Bird Dogs':'bird-dogs',
    'Plank':'plank','Dead Bugs':'dead-bugs','Side Plank':'side-plank','Single-Leg Balance':'single-leg-balance',
    'Good Mornings':'good-mornings','Calf Stretch':'calf-stretch','Hamstring Stretch':'hamstring-stretch',
    'Hip Flexor Stretch':'hip-flexor-stretch','Shoulder Stretch':'shoulder-stretch'
  };
  const reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function enhance(){
    const detail=document.getElementById('detail');
    const title=document.getElementById('detailTitle');
    const hero=document.getElementById('detailHero');
    if(!detail||!title||!hero||!detail.classList.contains('active')) return;
    const name=title.textContent.trim(), slug=slugs[name];
    if(!slug||hero.querySelector('video.exerciseDemo')) return;
    const fallback=hero.querySelector('img');
    const video=document.createElement('video');
    video.className='exerciseDemo'; video.muted=true; video.loop=true; video.playsInline=true; video.preload='metadata';
    video.setAttribute('aria-label',name+' exercise demonstration');
    if(fallback) video.poster=fallback.getAttribute('src')||'';
    video.src='videos/'+slug+'.mp4';
    video.style.cssText='width:100%;height:100%;object-fit:cover;display:none;background:#e9eeef;cursor:pointer';
    video.addEventListener('loadeddata',()=>{if(fallback)fallback.style.display='none';video.style.display='block';if(!reduce)video.play().catch(()=>{});});
    video.addEventListener('error',()=>{video.remove();if(fallback)fallback.style.display='block';});
    video.addEventListener('click',()=>{if(video.paused)video.play().catch(()=>{});else video.pause();});
    hero.appendChild(video);
    const badge=document.createElement('div'); badge.className='videoHint'; badge.textContent=reduce?'Tap to play':'Tap video to pause / play';
    badge.style.cssText='position:absolute;right:10px;bottom:10px;background:#10233bcc;color:white;padding:6px 9px;border-radius:999px;font-size:11px;font-weight:700;z-index:3';
    if(getComputedStyle(hero).position==='static')hero.style.position='relative'; hero.appendChild(badge);
  }
  new MutationObserver(enhance).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
  document.addEventListener('click',()=>setTimeout(enhance,0),true);
})();