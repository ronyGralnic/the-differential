/* Stage 02 engine (any case). Content: window.CORK[case] factory (c/<case>/cork.js). the cork board. Far view (notes + peeking evidence), zoom-in evidence boards per note, guided tour. */
(function(){
  const board=document.getElementById('ck-board'); if(!board) return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const H=(t,c,x)=>{ const e=document.createElement(t); if(c) e.className=c; if(x!=null) e.textContent=x; return e; };
  const T=(x,y,s,c,a)=>`<text x="${x}" y="${y}" class="${c||'ck-t'}" text-anchor="${a||'middle'}">${s}</text>`;

  const CASE=document.body.dataset.case; const F=(window.CORK||{})[CASE]; if(!F) return; const {CH,P,POL,POS,ROT,PEEK,DEC}=F({H,T});

  /* ---------- far view ---------- */
  const inner=H('div','ck-inner'); board.append(inner);
  const notes=P.map((p,i)=>{
    const n=H('button','ck-note '+p.color+(p.id==='main'?' main':'')); n.type='button'; n.dataset.id=p.id;
    n.style.setProperty('--x',POS[p.id][0]+'%'); n.style.setProperty('--y',POS[p.id][1]+'%'); n.style.setProperty('--r',ROT[p.id]+'deg'); n.style.setProperty('--i',i);
    n.setAttribute('aria-label',p.tag+': '+p.title+'. '+p.q+' לחצו כדי להיכנס לממצאים');
    n.append(H('span',(i%2?'ck-tape':'ck-pin')),H('span','ck-tag',p.tag),H('strong','ck-title',p.title),H('span','ck-q',p.q),H('span','ck-enter','לממצאים ←'));
    const pk=H('span','ck-peek '+PEEK[p.id]); pk.setAttribute('aria-hidden','true'); n.append(pk);
    n.addEventListener('click',()=>dive(i)); inner.append(n); return n; });
  // strings
  const sv=document.createElementNS('http://www.w3.org/2000/svg','svg'); sv.setAttribute('class','ck-strings'); sv.setAttribute('aria-hidden','true'); inner.prepend(sv);
  function strings(){ const r=inner.getBoundingClientRect(); sv.setAttribute('viewBox',`0 0 ${r.width} ${r.height}`); sv.innerHTML='';
    if(innerWidth<=700) return;
    const c=n=>{ const b=n.querySelector('.ck-pin,.ck-tape').getBoundingClientRect(); return [b.left+b.width/2-r.left,b.top+b.height/2-r.top]; };
    const m=c(notes[0]); notes.slice(1).forEach((n,k)=>{ const [x,y]=c(n); const p=document.createElementNS('http://www.w3.org/2000/svg','path'); p.setAttribute('d',`M${m[0]} ${m[1]} Q${(m[0]+x)/2} ${(m[1]+y)/2+40} ${x} ${y}`); p.setAttribute('pathLength','1'); p.style.setProperty('--n',k); sv.append(p); });
    requestAnimationFrame(()=>sv.classList.add('on')); }
  // decor
  DEC.forEach(([c,pos,t])=>{ const e=H(c==='ck-old'?'a':'span','ck-dec '+c,t||null); Object.assign(e.style,pos); if(c==='ck-old'){ e.href='../model-kill-switch/index.html'; e.title='שארית מהתיק הקודם: Case 01'; e.setAttribute('aria-label','שארית מהתיק הקודם, Case 01: מי מחזיק את המתג? לחצו כדי לפתוח'); } else e.setAttribute('aria-hidden','true'); inner.append(e); });
  if('IntersectionObserver' in window && !reduce){ board.classList.add('arm'); new IntersectionObserver((es,o)=>es.forEach(e=>{ if(e.isIntersecting){ board.classList.add('go'); setTimeout(strings,900); o.disconnect(); } }),{threshold:.2}).observe(board); } else { board.classList.add('go'); setTimeout(strings,50); }
  addEventListener('resize',()=>{ if(sv.classList.contains('on')) strings(); });

  /* ---------- evidence boards (zoomed in) ---------- */
  let ov=null, cur=-1, tour=false;
  function evItem(e,p){
    const [k,a,cap,extra]=e; const it=H('figure','ck-ev ev-'+k); it.style.setProperty('--r',(Math.random()*5-2.5).toFixed(1)+'deg');
    if(k==='chart'){ it.innerHTML=CH[a](); }
    else if(k==='polar'){ const ph=H('div','ck-ph'); ph.innerHTML=POL[a]||''; it.append(ph); it.append(H('blockquote','ck-quote',extra)); }
    else if(k==='list'){ const ul=H('ul','ck-list'); extra.forEach(x=>ul.append(H('li',x.startsWith('✗')?'no':'yes',x))); it.append(ul); }
    else if(k==='clip'){ it.append(H('p','ck-clip',extra)); }
    else if(k==='calc'){ it.append(H('p','ck-calc',extra)); }
    else if(k==='sticky'){ it.append(H('p','ck-stick',extra)); }
    else if(k==='chat'){ const c=H('div','ck-chat'); extra.forEach((m,i)=>c.append(H('p','ck-msg '+(i%2?'me':'them'),m))); c.append(H('span','ck-time','09:41')); it.append(c); }
    it.append(H('figcaption','ck-cap',cap)); return it; }
  function openBoard(i){
    cur=i; const p=P[i];
    if(!ov){ ov=H('div','ck-ov'); ov.setAttribute('role','dialog'); ov.setAttribute('aria-modal','true'); document.body.append(ov); document.addEventListener('keydown',onKey); }
    ov.innerHTML='';
    const hd=H('div','ck-ovh'); const back=H('button','ck-back','→ חזרה ללוח'); back.type='button'; back.addEventListener('click',closeBoard);
    const ttl=H('div','ck-ovt'); ttl.append(H('span','ck-tag',p.tag),H('h3','',p.title)); ov.setAttribute('aria-label',p.tag+': '+p.title);
    const nav=H('div','ck-nav'); const pv=H('button','ck-nb','‹ הקודם'), nx=H('button','ck-nb go',i===P.length-1?(tour?'סוף הסיור ✓':'לשלב 03 ←'):'הבא ›'); pv.type=nx.type='button';
    pv.disabled=i===0; pv.addEventListener('click',()=>openBoard(i-1));
    nx.addEventListener('click',()=>{ if(i<P.length-1) openBoard(i+1); else if(tour){ closeBoard(); } else location.href='ideas.html'; });
    nav.append(pv,H('span','ck-cnt',(tour?'סיור · ':'')+(i+1)+' / '+P.length),nx); hd.append(back,ttl,nav); ov.append(hd);
    const body=H('div','ck-ovb'); const g=H('div','ck-grid');
    const def=H('article','ck-def '+p.color); def.append(H('span','ck-pin'),H('span','ck-tag','הגדרת הבעיה'),H('p','',p.def),H('p','ck-defq',p.q)); g.append(def);
    p.ev.forEach((e,k)=>{ const it=evItem(e,p); it.style.setProperty('--k',k); g.append(it); });
    body.append(g); ov.append(body);
    requestAnimationFrame(()=>ov.classList.add('on')); ttl.querySelector('h3').tabIndex=-1; ttl.querySelector('h3').focus({preventScroll:true}); body.scrollTop=0;
    try{ history.replaceState(null,'','#'+p.id); }catch(e){}
  }
  function dive(i){ tour=false; zoomTo(i,()=>openBoard(i)); }
  function zoomTo(i,cb){ if(reduce||innerWidth<=700){ cb(); return; }
    const n=notes[i], r=inner.getBoundingClientRect(), b=n.getBoundingClientRect();
    const dx=r.width/2-(b.left+b.width/2-r.left), dy=r.height/2-(b.top+b.height/2-r.top);
    inner.style.transition='transform .6s cubic-bezier(.5,0,.3,1), opacity .6s'; inner.style.transformOrigin='50% 50%';
    inner.style.transform=`translate(${dx}px,${dy}px) scale(2.6)`; board.classList.add('diving');
    setTimeout(()=>{ cb(); inner.style.transition='none'; inner.style.transform=''; board.classList.remove('diving'); },560); }
  function closeBoard(){ if(!ov) return; const n=notes[cur]; ov.classList.remove('on'); const o=ov; ov=null; document.removeEventListener('keydown',onKey); setTimeout(()=>o.remove(),300);
    try{ history.replaceState(null,'',location.pathname); }catch(e){}
    if(n){ n.focus({preventScroll:true}); if(!reduce && innerWidth>700){ const r=inner.getBoundingClientRect(), b=n.getBoundingClientRect(); const dx=r.width/2-(b.left+b.width/2-r.left), dy=r.height/2-(b.top+b.height/2-r.top);
      inner.style.transition='none'; inner.style.transform=`translate(${dx}px,${dy}px) scale(2.6)`; void inner.offsetWidth; inner.style.transition='transform .6s cubic-bezier(.5,0,.3,1)'; inner.style.transform=''; } } }
  function onKey(e){ if(e.key==='Escape') closeBoard(); if(e.key==='ArrowLeft'&&cur<P.length-1) openBoard(cur+1); if(e.key==='ArrowRight'&&cur>0) openBoard(cur-1); }
  document.getElementById('ck-tour').addEventListener('click',()=>{ tour=true; board.scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'}); setTimeout(()=>zoomTo(0,()=>openBoard(0)),reduce?0:500); });
  const h=location.hash.slice(1); const hi=P.findIndex(p=>p.id===h); if(hi>=0) setTimeout(()=>openBoard(hi),300);
})();
