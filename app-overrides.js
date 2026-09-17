/* Stronger at 57 — robust iPhone/Safari exercise video support */
(()=>{
  const slugs={
    'Incline Push-ups':'incline-push-ups','Reverse Lunges':'reverse-lunges',
    'Supported Split Squats':'reverse-lunges','Glute Bridges':'glute-bridges',
    'Plank':'plank','Side Plank':'side-plank'
  };
  let lastName='';
  function enhance(){
    const detail=document.getElementById('detail');
    const title=document.getElementById('detailTitle');
    const hero=document.getElementById('detailHero');
    if(!detail||!title||!hero||!detail.classList.contains('active')) return;
    const name=title.textContent.trim();
    const slug=slugs[name];
    if(!slug) return;
    if(hero.dataset.videoFor===name && hero.querySelector('video')) return;
    hero.dataset.videoFor=name;
    hero.querySelectorAll('.exerciseDemo,.videoHint').forEach(n=>n.remove());
    const fallback=hero.querySelector('img');
    const video=document.createElement('video');
    video.className='exerciseDemo';
    video.controls=true;
    video.muted=true;
    video.defaultMuted=true;
    video.loop=true;
    video.autoplay=true;
    video.playsInline=true;
    video.setAttribute('playsinline','');
    video.setAttribute('webkit-playsinline','');
    video.setAttribute('muted','');
    video.setAttribute('preload','auto');
    video.setAttribute('aria-label',name+' exercise demonstration');
    if(fallback?.src) video.poster=fallback.src;
    const source=document.createElement('source');
    source.src='./videos/'+slug+'.mp4?v=10';
    source.type='video/mp4';
    video.appendChild(source);
    video.style.cssText='position:absolute;inset:0;width:100%;height:100%;object-fit:contain;background:#101820;z-index:2;display:block';
    hero.style.position='relative';
    hero.appendChild(video);
    video.addEventListener('canplay',()=>{
      if(fallback) fallback.style.visibility='hidden';
      video.play().catch(()=>{});
    },{once:true});
    video.addEventListener('error',()=>{
      video.remove();
      hero.dataset.videoFor='';
      if(fallback) fallback.style.visibility='visible';
    });
    video.load();
    const badge=document.createElement('div');
    badge.className='videoHint';
    badge.textContent='Video demo • tap ▶ if needed';
    badge.style.cssText='position:absolute;left:10px;top:10px;background:#10233bcc;color:#fff;padding:6px 9px;border-radius:999px;font-size:11px;font-weight:700;z-index:4;pointer-events:none';
    hero.appendChild(badge);
  }
  const observer=new MutationObserver(()=>requestAnimationFrame(enhance));
  observer.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
  document.addEventListener('click',()=>setTimeout(enhance,30),true);
  window.addEventListener('pageshow',()=>setTimeout(enhance,50));
})();