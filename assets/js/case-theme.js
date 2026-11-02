/* Case-themed dark backdrops (engine, any case). Content: window.CASE_THEME[case] from c/<case>/theme.js:
   { reel:{ bg:'<css background>', items:[ITEM] }, sky:{ bg:'<css background>', items:[ITEM] } }
   ITEM = { svg:'<svg …>', at:0..1 (scroll progress at which it appears), x:'%' (from the left), y:'%' (from the top) or b:'%' (from the bottom),
            w:px (width), op:0..1 (opacity when shown), depth:px (parallax over the whole scroll), cls:'spin|float|drift|pulse|sway' }
   - reel: a fixed layer behind the stage-04 reel (#reel), progress = scroll of .reel-scroll. Items fade in as the reader scrolls down.
   - sky: a layer behind stage 07 (#epilogue), progress = how far the reader has scrolled through it.
   Everything stays dark and decorative (aria-hidden); with prefers-reduced-motion items appear without motion. */
(function(){
  const CASE=document.body&&document.body.dataset.case; const T=window.CASE_THEME&&window.CASE_THEME[CASE]; if(!T) return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const st=document.createElement('style'); st.textContent=`
  .ct-layer{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:0}
  .ct-it{position:absolute;opacity:0;transform:translateY(24px) scale(.96);transition:opacity 1.1s ease,transform 1.4s cubic-bezier(.2,.8,.2,1);will-change:transform,opacity}
  .ct-it.in{opacity:var(--op,.25);transform:translateY(var(--py,0px)) scale(1)}
  .ct-it svg{width:100%;height:auto;display:block}
  .ct-it.spin svg{animation:ctSpin 60s linear infinite}
  .ct-it.float svg{animation:ctFloat 7s ease-in-out infinite}
  .ct-it.drift svg{animation:ctDrift 14s ease-in-out infinite}
  .ct-it.sway svg{animation:ctSway 6s ease-in-out infinite;transform-origin:50% 0}
  .ct-it.pulse svg{animation:ctPulse 3.2s ease-in-out infinite}
  @keyframes ctSpin{to{transform:rotate(360deg)}}
  @keyframes ctFloat{50%{transform:translateY(-10px)}}
  @keyframes ctDrift{0%,100%{transform:translate(0,0) rotate(-4deg)}50%{transform:translate(-26px,14px) rotate(5deg)}}
  @keyframes ctSway{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}
  @keyframes ctPulse{50%{opacity:.55}}
  .reel.ct-on{background:var(--ct-bg)}
  .reel.ct-on .reel-scroll{z-index:1}
  .ep.ct-on{background:var(--ct-bg)}
  .ep .ct-layer{z-index:-1}
  @media (max-width:640px){.ct-it:not(.wide){max-width:40vw}.ct-it.in{opacity:calc(var(--op,.25)*.45)}}
  @media (prefers-reduced-motion:reduce){.ct-it,.ct-it svg{animation:none!important;transition:opacity .3s!important;transform:none!important}}`;
  document.head.append(st);
  function build(host,cfg){
    const L=document.createElement('div'); L.className='ct-layer'; L.setAttribute('aria-hidden','true');
    const els=(cfg.items||[]).map(o=>{ const d=document.createElement('div'); d.className='ct-it '+(o.cls||''); d.innerHTML=o.svg;
      d.style.cssText=`left:${o.x};${o.b!=null?'bottom:'+o.b:'top:'+o.y};width:${o.w}px;--op:${o.op==null?.25:o.op}`; L.append(d); return [d,o]; });
    host.prepend(L); if(cfg.bg){ host.style.setProperty('--ct-bg',cfg.bg); host.classList.add('ct-on'); }
    return p=>els.forEach(([d,o])=>{ if(p>=(o.at||0)-1e-6) d.classList.add('in'); else d.classList.remove('in'); if(!reduce&&o.depth) d.style.setProperty('--py',(-p*o.depth).toFixed(1)+'px'); });
  }
  // stage 04 reel
  const reel=document.getElementById('reel');
  if(reel&&T.reel){ const sc=reel.querySelector('.reel-scroll'); const upd=build(reel,T.reel);
    const f=()=>{ const m=sc.scrollHeight-sc.clientHeight; upd(m>40?sc.scrollTop/m:0); };
    if(sc){ sc.addEventListener('scroll',()=>requestAnimationFrame(f),{passive:true}); new MutationObserver(()=>setTimeout(f,50)).observe(reel,{attributes:true,attributeFilter:['hidden','class']}); new MutationObserver(()=>setTimeout(f,80)).observe(sc,{childList:true,subtree:true}); f(); } }
  // stage 07
  function sky(){ const root=document.getElementById('epilogue'); if(!root||!T.sky) return; const host=root.querySelector('.ep')||root; if(host.dataset.ct) return; host.dataset.ct='1';
    const upd=build(host,T.sky); const f=()=>{ const r=host.getBoundingClientRect(), vh=innerHeight; upd(Math.max(0,Math.min(1,(vh*.85-r.top)/Math.max(1,r.height)))); };
    addEventListener('scroll',()=>requestAnimationFrame(f),{passive:true}); addEventListener('resize',f); f(); }
  if(document.readyState==='complete') setTimeout(sky,200); else addEventListener('load',()=>setTimeout(sky,200));
  // reduced motion: freeze SMIL animations inside fall figures too
  if(reduce) new MutationObserver(()=>document.querySelectorAll('.rx-cutfig svg').forEach(s=>{ try{ s.pauseAnimations(); s.setCurrentTime(99); }catch(e){} })).observe(document.body,{childList:true,subtree:true});
})();
