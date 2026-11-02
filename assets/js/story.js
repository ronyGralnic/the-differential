/* Stage 01 engine (any case). Content: window.STORY[case] factory (c/<case>/story.js). timeline, the two characters, nine scenes that follow the text (scrollytelling, no scroll-jacking), count-ups, quiz. */
(function(){
  const wrap=document.getElementById('st-wrap'); if(!wrap) return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const H=(t,c,x)=>{ const e=document.createElement(t); if(c) e.className=c; if(x!=null) e.textContent=x; return e; };
  const NS='http://www.w3.org/2000/svg';
  const fmt=(v,dec)=>dec?v.toFixed(dec):Math.round(v).toLocaleString('he-IL');
  function countUp(el){ const to=+el.dataset.to||+el.dataset.count, dec=+(el.dataset.dec||0), t0=performance.now(), dur=reduce?1:1300;
    (function step(t){ const k=Math.min(1,(t-t0)/dur), v=to*(1-Math.pow(1-k,3)); el.textContent=fmt(v,dec); if(k<1) requestAnimationFrame(step); })(t0); }

  /* ---------- characters ---------- */
  const CASE=document.body.dataset.case; const F=(window.STORY||{})[CASE]; if(!F) return;
  const T=(x,y,s,c,a,extra)=>`<text x="${x}" y="${y}" class="${c||'sv-t'}" text-anchor="${a||'middle'}"${extra||''}>${s}</text>`;
  const d=(s)=>` style="--d:${s}s"`;
  const coin=(x,y,r,c,ex)=>`<g class="${c||''}"${ex||''}><circle cx="${x}" cy="${y}" r="${r||10}" class="sv-coin"/><text x="${x}" y="${y+4}" text-anchor="middle" class="sv-coin-t">€</text></g>`;
  const C=F({H,T,d,coin,NS,reduce}); const {AV,CAST,WHO,SC,QZ,EV,ICO}=C;
  const cast=document.getElementById('st-cast');
  if(cast){ cast.append(H('p','st-cast-k',C.castLabel));
    const g=H('div','st-cast-g'); CAST.forEach(([k,n,t])=>{ const c=H('div','st-cast-c '+k); const a=H('span','st-av'); a.innerHTML=AV[k]; const b=H('div'); b.append(H('strong','',n),H('p','',t)); c.append(a,b); g.append(c); }); cast.append(g); }
  wrap.querySelectorAll('.st-ch').forEach(ch=>{
    const w=WHO[ch.dataset.ch]; if(!w) return;
    const c=H('div','st-who '+w[0]); const a=H('span','st-av');
    a.innerHTML=w[0]==='both'?C.bothKeys.map(k=>AV[k]).join(''):AV[w[0]];
    const b=H('div'); b.append(H('span','st-who-k',C.whoLabel[w[0]]),H('p','',w[1])); c.append(a,b); ch.append(c);
  });

  /* ---------- svg helpers ---------- */

  /* ---------- the nine scenes ---------- */

  /* ---------- build the stage ---------- */
  const scenesEl=document.getElementById('st-scenes'), dots=document.getElementById('st-dots'), sname=document.getElementById('st-sname');
  const chs=[...wrap.querySelectorAll('.st-ch')];
  const sEls=SC.map((s,i)=>{ const el=H('div','st-scene'); el.dataset.i=i; el.innerHTML=`<svg viewBox="0 0 400 290" class="st-svg" role="img" aria-label="${s.n}">${s.svg()}</svg>`; scenesEl.append(el); return el; });
  SC.forEach((s,i)=>{ const b=H('button','st-dot'); b.type='button'; b.setAttribute('aria-label','פרק '+(i+1)+': '+s.n); b.addEventListener('click',()=>chs[i].scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'})); dots.append(b); });
  let cur=-1;
  function play(i){ const el=sEls[i]; el.classList.remove('play'); void el.offsetWidth; el.classList.add('play'); el.querySelectorAll('[data-to]').forEach(countUp); }
  function show(i){ if(i===cur) return; cur=i; sEls.forEach((e,j)=>e.classList.toggle('on',j===i)); [...dots.children].forEach((b,j)=>{ b.classList.toggle('on',j===i); b.setAttribute('aria-current',j===i?'step':'false'); });
    chs.forEach((c,j)=>c.classList.toggle('on',j===i)); if(window.__stRG) window.__stRG.hidden=(i!==(C.interAt==null?5:C.interAt)); sname.textContent=(i+1)+' · '+SC[i].n; play(i); markTL(i+1); }
  document.getElementById('st-replay').addEventListener('click',()=>{ if(cur>=0) play(cur); });
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(es=>{ es.forEach(e=>{ if(e.isIntersecting) show(chs.indexOf(e.target)); }); },{rootMargin:'-45% 0px -45% 0px'});
    chs.forEach(c=>io.observe(c));
    const cio=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.querySelectorAll('[data-count]').forEach(el=>{ el.dataset.to=el.dataset.count; countUp(el); }); cio.unobserve(e.target); } }),{threshold:.4});
    chs.forEach(c=>cio.observe(c));
  }

  /* interactive scene (r vs g in Case 02, appeal queue in Case 03) */
  if(typeof C.inter==="function") C.inter(sEls);

  /* ---------- timeline ---------- */
  const tl=document.getElementById('st-timeline');
  if(tl){
    const s=C.tlSvg();
    tl.innerHTML=`<p class="tl-hint">גררו הצידה כדי לראות את כל השנים</p><div class="tl-scroll"><div class="tl-inner">${s}</div></div><div class="tl-card" id="tl-card" aria-live="polite"><span class="tl-k">ציר הזמן</span><p>לחצו על אייקון בציר כדי לקרוא מה קרה, ולקפוץ לפרק שלו.</p></div>`;
    const card=tl.querySelector('#tl-card');
    tl.querySelectorAll('.tl-ev').forEach(g=>{ const go=()=>{ const e=EV[+g.dataset.i]; tl.querySelectorAll('.tl-ev').forEach(x=>x.classList.toggle('sel',x===g));
      card.innerHTML=''; card.append(H('span','tl-k',e[2]),H('p','',e[3])); const b=H('button','tl-go','לפרק '+e[4]+' ←'); b.type='button'; b.addEventListener('click',()=>chs[e[4]-1].scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'})); card.append(b); };
      g.addEventListener('click',go); g.addEventListener('keydown',ev=>{ if(ev.key==='Enter'||ev.key===' '){ ev.preventDefault(); go(); } }); });
    
    if('IntersectionObserver' in window && !reduce){ tl.classList.add('arm'); new IntersectionObserver((es,o)=>es.forEach(e=>{ if(e.isIntersecting){ tl.classList.add('go'); o.disconnect(); } }),{threshold:.3}).observe(tl); } else tl.classList.add('go');
  }
  function markTL(ch){ if(!tl) return; tl.querySelectorAll('.tl-ev').forEach(g=>g.classList.toggle('ch',EV[+g.dataset.i][4]===ch)); }

  show(0);

  /* ---------- mode: just read ---------- */
  const mode=document.getElementById('st-mode');
  if(mode){ let plain=false; try{ plain=localStorage.getItem('td-plain')==='1'; }catch(e){}
    const set=v=>{ plain=v; document.body.classList.toggle('st-plain',v); mode.setAttribute('aria-pressed',String(v)); mode.textContent=v?'להחזיר את האנימציות':'רק לקרוא, בלי אנימציות'; try{ localStorage.setItem('td-plain',v?'1':'0'); }catch(e){} };
    set(plain); mode.addEventListener('click',()=>set(!plain)); }

  /* ---------- three questions ---------- */
  const qz=document.getElementById('st-quiz');
  if(qz){ qz.append(H('p','section-label','בדיקה קטנה לפני שממשיכים'),H('h3','qz-h','שלוש שאלות. בלי ציון, רק כדי לבדוק שהתמונה ברורה'));
    let ok=0, done=0; const fin=H('div','qz-fin'); fin.hidden=true;
    QZ.forEach(([q,opts,ans,why],i)=>{ const c=H('div','qz-q'); c.append(H('p','qz-n','שאלה '+(i+1)+' מתוך 3'),H('p','qz-t',q)); const g=H('div','qz-opts'); const ex=H('p','qz-ex'); ex.hidden=true;
      opts.forEach((o,j)=>{ const b=H('button','qz-o',o); b.type='button'; b.addEventListener('click',()=>{ if(c.classList.contains('answered')) return; c.classList.add('answered'); done++; if(j===ans) ok++;
        g.querySelectorAll('.qz-o').forEach((x,k)=>{ x.disabled=true; x.classList.toggle('right',k===ans); x.classList.toggle('wrong',k===j&&j!==ans); });
        ex.textContent=(j===ans?'נכון. ':'לא בדיוק. התשובה היא "'+opts[ans]+'". ')+why; ex.hidden=false; if(done===QZ.length){ fin.hidden=false; fin.querySelector('b').textContent=ok+' מתוך 3'; } }); g.append(b); });
      c.append(g,ex); qz.append(c); });
    fin.innerHTML=C.qzFin;
    qz.append(fin); }
})();
