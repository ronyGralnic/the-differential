/* Spec city engine (any case): the spec as three acts on one isometric island. Mount: .sp[data-sp=slug] with window.CITY[slug] (c/<case>/city-<slug>.js).
   Act 1 · a parallel story everyone knows (config hook act1.setup draws on the ring road and returns {stop})
   Act 2 · the feature city (10 buildings from SPEC[slug].features, 4 districts = SPEC layers, PLAY tour, a pulse travelling the ring)
   Act 3 · a room per feature (one sentence, the ballot vs ours, a small live model, a comic strip, a cutaway, the full text)
   The original spec stays whole under "המסמך המלא". */
(function(){
  function boot(){
  document.querySelectorAll('.sp[data-sp]').forEach(mount); }
  function mount(root){ const slug=root.dataset.sp; const C=(window.CITY||{})[slug]; const D=window.SPEC&&window.SPEC[slug]; if(!C) return;
  if(!root||!D||root.dataset.city) return; if(!root.classList.contains('sp-root')){ setTimeout(()=>mount(root),60); return; } root.dataset.city='1'; root.classList.add('cy-rg',C.cls||'cy-gen');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const H=(t,c,x)=>{ const e=document.createElement(t); if(c) e.className=c; if(x!=null) e.textContent=x; return e; };
  const NS='http://www.w3.org/2000/svg'; const S=(t,a,p)=>{ const e=document.createElementNS(NS,t); for(const k in a) e.setAttribute(k,a[k]); if(p) p.append(e); return e; };
  const F={}; D.features.forEach(f=>F[f.n]=f); (D.nodes||[]).forEach(([n,l])=>{ if(F[n]&&!F[n].layer) F[n].layer=l; }); const LAY={}; D.layers.forEach(([k,n])=>LAY[k]=n);
  const tm=(id,w)=>`<button class="tm" data-t="${id}">${w}</button>`;

  /* ---------- the original document, kept whole ---------- */
  const orig=[...root.children]; const full=H('details','cy-full'); const sm=H('summary','','המסמך המלא, כמו שהוא: כל החלקים, ההחלטות והמחוון'); full.append(sm);
  const dl=orig.find(e=>e.classList.contains('sp-dl'));
  orig.forEach(e=>{ if(e!==dl) full.append(e); });
  const top=H('div','cy'); root.textContent=''; root.append(top,full); if(dl) root.append(dl);

  /* ---------- intro ---------- */
  const intro=H('div','cy-intro'); intro.innerHTML=C.intro(tm); top.append(intro);

  /* ---------- the island scene ---------- */
  const stage=H('div','cy-stage'); top.append(stage);
  const svg=S('svg',{viewBox:'0 0 1000 620',class:'cy-svg',role:'img','aria-label':'אי איזומטרי עם כביש טבעתי'}); stage.append(svg);
  const cam=S('g',{id:'cy-cam'},svg);
  const CX=500, CY=300, SC=50; const iso=(x,y)=>[CX+(x-y)*0.866*SC, CY+(x+y)*0.5*SC-5*SC*0.5*2];
  const P=(x,y)=>{ const [a,b]=iso(x,y); return a.toFixed(1)+','+b.toFixed(1); };
  // water & island
  S('rect',{x:-500,y:-400,width:2000,height:1400,class:'cy-water'},cam);
  for(let i=0;i<14;i++) S('path',{d:`M${-100+i*90} ${560+ (i%3)*14} q20 -8 40 0 q20 8 40 0`,class:'cy-wave',style:`--i:${i}`},cam);
  S('polygon',{points:[P(-0.6,-0.6),P(10.6,-0.6),P(10.6,10.6),P(-0.6,10.6)].join(' '),class:'cy-cliff'},cam);
  S('polygon',{points:[P(-0.6,-0.6),P(10.6,-0.6),P(10.6,10.6),P(-0.6,10.6)].join(' '),class:'cy-land',transform:'translate(0,-14)'},cam);
  // districts (sectors) by layer
  const ANGS=[[-165,-75],[-60,30],[40,100],[110,195]]; const DIST={}; const LIX={}; D.layers.forEach(([k],i)=>{ DIST[k]=ANGS[i]; LIX[k]=i; });
  const sector=(a0,a1,r0,r1)=>{ const pts=[]; for(let a=a0;a<=a1;a+=5){ const t=a*Math.PI/180; pts.push(P(5+r1*Math.cos(t),5+r1*Math.sin(t))); } for(let a=a1;a>=a0;a-=5){ const t=a*Math.PI/180; pts.push(P(5+r0*Math.cos(t),5+r0*Math.sin(t))); } return pts.join(' '); };
  const distG=S('g',{class:'cy-dists',transform:'translate(0,-14)'},cam);
  Object.entries(DIST).forEach(([k,[a0,a1]])=>{ S('polygon',{points:sector(a0,a1,3.65,5.35),class:'cy-dist '+k+' d'+LIX[k]},distG); const am=(a0+a1)/2*Math.PI/180; const [lx,ly]=iso(5+5.75*Math.cos(am),5+5.75*Math.sin(am)); const t=S('text',{x:lx,y:ly-8,class:'cy-dlab','text-anchor':'middle'},distG); t.textContent='שכונת '+LAY[k]; });
  // ring road
  const R=3.1; const ring=[]; for(let a=0;a<=360;a+=4){ const t=a*Math.PI/180; ring.push(P(5+R*Math.cos(t),5+R*Math.sin(t))); }
  const roadG=S('g',{transform:'translate(0,-14)'},cam);
  S('polyline',{points:ring.join(' '),class:'cy-road'},roadG); S('polyline',{points:ring.join(' '),class:'cy-lane'},roadG);
  const ringPath=S('path',{d:'M'+ring.join(' L'),id:'cy-ringpath',fill:'none',stroke:'none'},roadG);
  // trees & center
  [[1,1.3],[8.9,1.2],[1.2,8.8],[8.8,8.9],[5,5],[4.2,5.6],[5.8,4.3]].forEach(([x,y],i)=>{ const [a,b]=iso(x,y); const g=S('g',{class:'cy-tree',transform:`translate(${a} ${b-14})`},cam); S('ellipse',{cx:0,cy:2,rx:9,ry:4,class:'cy-sh'},g); S('rect',{x:-2,y:-10,width:4,height:12,class:'cy-trunk'},g); S('circle',{cx:0,cy:-16,r:10,class:'cy-leaf'},g); });
  // landmarks: decisions signpost (center), observation tower, bridge under construction
  const LM=[['dc',5,5.9,'צומת ההחלטות','הכיוונים שבחרנו, ומה שוויתרנו עליו'],['kn',6.6,6.9,'מגדל התצפית',C.lmKn||'המחוון החי'],['cl',10.4,7.6,'הגשר','מה האפיון סגר, ומה נשאר פתוח']];
  const lmG=S('g',{class:'cy-lms'},cam);
  LM.forEach(([k,x,y,t,d])=>{ const [a,b]=iso(x,y); const g=S('g',{class:'cy-lm '+k,transform:`translate(${a} ${b-14})`,tabindex:'0',role:'button','aria-label':t+': '+d},lmG);
    if(k==='dc'){ S('rect',{x:-2,y:-46,width:4,height:46,class:'cy-pole'},g); S('path',{d:'M2 -42 h26 l6 5 l-6 5 h-26z',class:'cy-sign a'},g); S('path',{d:'M-2 -28 h-26 l-6 5 l6 5 h26z',class:'cy-sign b'},g); }
    else if(k==='kn'){ S('path',{d:'M-10 0 L-5 -62 L5 -62 L10 0z',class:'cy-tower'},g); S('rect',{x:-12,y:-74,width:24,height:12,rx:3,class:'cy-tower-top'},g); S('path',{d:'M-8 -68 q8 -10 16 0',class:'cy-spiral'},g); }
    else { S('path',{d:'M-40 0 L0 -18 L14 -12',class:'cy-bridge'},g); S('path',{d:'M14 -12 L24 -8',class:'cy-bridge gap'},g); S('rect',{x:-4,y:-48,width:4,height:44,class:'cy-pole'},g); S('path',{d:'M0 -46 L22 -46 L22 -38',class:'cy-crane'},g); }
    const lb=S('text',{x:0,y:16,class:'cy-lml','text-anchor':'middle'},g); lb.textContent=t;
    g.addEventListener('click',()=>openSection(k,t)); g.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); openSection(k,t); } }); });
  // buildings
  const ANG={1:-150,2:-120,3:-90,4:-45,5:-15,6:15,7:55,8:85,9:130,10:165};
  const ICON=C.icons;
  const bG=S('g',{class:'cy-blds'},cam); const BLD={};
  for(let n=1;n<=10;n++){ const f=F[n]; const t=ANG[n]*Math.PI/180; const x=5+4.45*Math.cos(t), y=5+4.45*Math.sin(t); const [a,b]=iso(x,y); const h=34+(n%3)*14;
    const g=S('g',{class:'cy-b l-'+f.layer+' li-'+LIX[f.layer],transform:`translate(${a} ${b-14})`,tabindex:'0',role:'button','aria-label':'פיצ\'ר '+n+': '+f.title+'. '+f.line,style:`--n:${n}`},bG);
    const w=22; const top=[[0,-h-w*0.5],[w*0.87,-h],[0,-h+w*0.5],[-w*0.87,-h]];
    S('ellipse',{cx:0,cy:4,rx:26,ry:11,class:'cy-sh'},g);
    const body=S('g',{class:'cy-bb'},g);
    S('polygon',{points:`${-w*0.87},${-h} 0,${-h+w*0.5} 0,${w*0.5} ${-w*0.87},0`,class:'cy-f l'},body);
    S('polygon',{points:`${w*0.87},${-h} 0,${-h+w*0.5} 0,${w*0.5} ${w*0.87},0`,class:'cy-f r'},body);
    S('polygon',{points:top.map(p=>p.join(',')).join(' '),class:'cy-f t'},body);
    for(let k=0;k<Math.floor(h/14);k++){ S('rect',{x:-w*0.6,y:-h+10+k*14,width:5,height:6,class:'cy-win',transform:`skewY(30)`},body); S('rect',{x:w*0.25,y:-h+16+k*14,width:5,height:6,class:'cy-win',transform:`skewY(-30)`},body); }
    const badge=S('g',{class:'cy-badge',transform:`translate(0 ${-h-34})`},g); S('circle',{r:17,class:'cy-bc'},badge); const ic=S('g',{class:'cy-ic'},badge); ic.innerHTML=ICON[n];
    const num=S('text',{x:16,y:-10,class:'cy-num','text-anchor':'middle'},badge); num.textContent=n;
    const lab=S('text',{x:0,y:24,class:'cy-bl','text-anchor':'middle'},g); lab.textContent=f.title;
    const lw=S('text',{x:0,y:38,class:'cy-bl waze','text-anchor':'middle'},g); lw.textContent='';
    g.addEventListener('click',()=>openRoom(n)); g.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); openRoom(n); } });
    BLD[n]={g,x:a,y:b-14-h/2,ang:ANG[n],lw}; }
  let act=null;

  /* ---------- side panel ---------- */
  const side=H('div','cy-side'); stage.append(side);
  const modeBar=H('div','cy-modes'); modeBar.setAttribute('role','tablist');
  const MODES=C.modes;
  MODES.forEach(([k,l])=>{ const b=H('button','cy-mode',l); b.type='button'; b.dataset.m=k; b.addEventListener('click',()=>setMode(k)); modeBar.append(b); });
  stage.prepend(modeBar);
  const pW=H('div','cy-panel waze'), pM=H('div','cy-panel market'); side.append(pW,pM);
  // act 1 text + controls
  pW.innerHTML=C.act1.html;
  pM.innerHTML=C.act2;

  const list=pM.querySelector('.cy-list');
  for(let n=1;n<=10;n++){ const li=H('li'); const b=H('button','cy-li'); b.type='button'; b.append(H('b','',String(n)),H('span','',F[n].title),H('small','',LAY[F[n].layer])); b.addEventListener('click',()=>openRoom(n)); b.addEventListener('mouseenter',()=>BLD[n].g.classList.add('hl')); b.addEventListener('mouseleave',()=>BLD[n].g.classList.remove('hl')); li.append(b); list.append(li); }
  const card=H('div','cy-card'); card.hidden=true; stage.append(card);


  /* ---------- modes ---------- */
  let mode='waze'; const WAZE=C.waze;
  function setMode(m){ mode=m; stage.dataset.mode=m; modeBar.querySelectorAll('.cy-mode').forEach(b=>{ b.classList.toggle('on',b.dataset.m===m); b.setAttribute('aria-selected',b.dataset.m===m); });
    for(let n=1;n<=10;n++) BLD[n].lw.textContent=m==='both'?C.wazeLabel+': '+WAZE[n]:'';
    if(m==='market'&&act&&act.stop){ act.stop(); }
    if(m!=='waze' && !stage.dataset.risen){ stage.dataset.risen='1'; } }
  act=C.act1.setup({S,H,iso,R,cam,ringPath,pW,stage,reduce,setMode});
  setMode('waze');

  /* ---------- camera ---------- */
  const MOB=innerWidth<700; const HOME=MOB?[170,20,660,560]:[0,0,1000,620]; let vb=HOME.slice(), anim=null; svg.setAttribute('viewBox',HOME.join(' '));
  function camTo(t,dur){ const from=vb.slice(); const t0=performance.now(); dur=reduce?1:(dur||900); cancelAnimationFrame(anim);
    const st=(now)=>{ const k=Math.min(1,(now-t0)/dur), e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2; vb=from.map((v,i)=>v+(t[i]-v)*e); svg.setAttribute('viewBox',vb.map(v=>v.toFixed(1)).join(' ')); if(k<1) anim=requestAnimationFrame(st); }; anim=requestAnimationFrame(st); }
  const home=()=>camTo(HOME); const zoomB=n=>{ const b=BLD[n]; camTo([b.x-210,b.y-140,420,260]); };

  /* ---------- tour ---------- */
  const EX=C.ex;
  let tour=null;
  function tourShow(i){ const n=i+1, f=F[n]; zoomB(n); Object.values(BLD).forEach(b=>b.g.classList.remove('hl')); BLD[n].g.classList.add('hl');
    card.hidden=false; card.innerHTML=''; const hd=H('div','cy-ch'); hd.append(H('span','cy-cn',n+' / 10'),H('strong','',f.title),H('small','','שכונת '+LAY[f.layer])); card.append(hd);
    const r1=H('p'); r1.innerHTML='<b>מה זה:</b> '; r1.append(f.line); card.append(r1);
    const r2=H('p'); r2.innerHTML='<b>למה צריך:</b> '; r2.append(f.hook.split(/(?<=[.!?])\s/)[0]); card.append(r2);
    const r3=H('p','cy-wz'); r3.innerHTML='<b>'+C.wazeLabel+':</b> '; r3.append(WAZE[n]); card.append(r3);
    const r4=H('p','cy-ex'); r4.append(EX[n]); card.append(r4);
    const ctl=H('div','cy-cc'); const pv=H('button','cy-btn','‹'), pp=H('button','cy-btn',tour&&tour.t?'❚❚':'▶'), nx=H('button','cy-btn go','›'), rm=H('button','cy-btn','לחדר ←'), ex=H('button','cy-btn','✕'); [pv,pp,nx,rm,ex].forEach(b=>b.type='button'); pv.setAttribute('aria-label','הקודם'); nx.setAttribute('aria-label','הבא'); ex.setAttribute('aria-label','יציאה מהסיור');
    pv.addEventListener('click',()=>{ tourGo(Math.max(0,tour.i-1),true); }); nx.addEventListener('click',()=>{ tourGo(Math.min(9,tour.i+1),true); }); pp.addEventListener('click',()=>{ if(tour.t){ clearInterval(tour.t); tour.t=null; pp.textContent='▶'; } else { tour.t=setInterval(()=>tourGo(tour.i+1),6500); pp.textContent='❚❚'; } }); rm.addEventListener('click',()=>openRoom(n)); ex.addEventListener('click',tourEnd);
    const dots=H('span','cy-dots'); for(let k=0;k<10;k++){ const d=H('i',k===i?'on':''); dots.append(d); } ctl.append(pv,pp,nx,dots,rm,ex); card.append(ctl); }
  function tourGo(i,manual){ if(i>9){ tourEnd(); return; } tour.i=i; if(manual&&tour.t){ clearInterval(tour.t); tour.t=null; } tourShow(i); }
  function tourEnd(){ if(tour&&tour.t) clearInterval(tour.t); tour=null; card.hidden=true; Object.values(BLD).forEach(b=>b.g.classList.remove('hl')); home(); }
  pM.querySelector('[data-a="play"]').addEventListener('click',()=>{ if(mode!=='market') setMode('market'); tour={i:0,t:null}; stage.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'}); camTo(MOB?HOME:[60,40,880,545],700); setTimeout(()=>{ tourShow(0); tour.t=reduce?null:setInterval(()=>tourGo(tour.i+1),6500); tourShow(0); },reduce?0:800); });
  pM.querySelector('[data-a="home"]').addEventListener('click',()=>{ tourEnd(); });
  // shock pulse around the ring
  pM.querySelector('[data-a="shock"]').addEventListener('click',()=>{ const dot=S('circle',{r:12,class:'cy-pulse'},roadG); const t0=performance.now(), dur=reduce?10:5200;
    const lit=new Set(); const go=(now)=>{ const k=Math.min(1,(now-t0)/dur); const L=k*pathLen; const p=ringPath.getPointAtLength(L); dot.setAttribute('cx',p.x); dot.setAttribute('cy',p.y);
      const deg=(k*360); for(let n=1;n<=10;n++){ let a=(BLD[n].ang+360)%360; if(deg>=a&&!lit.has(n)){ lit.add(n); BLD[n].g.classList.add('zap'); setTimeout(()=>BLD[n].g.classList.remove('zap'),1600); } }
      if(k<1) requestAnimationFrame(go); else dot.remove(); }; requestAnimationFrame(go); });

  /* ---------- rooms ---------- */
  const KIND={shelf:'טכנולוגיה קיימת',compose:'חיבור שבנינו',ours:'החלטה שלנו'};
  let ov=null, cur=0;
  function shell(title,tag){ if(!ov){ ov=H('div','cy-ov'); ov.setAttribute('role','dialog'); ov.setAttribute('aria-modal','true'); document.body.append(ov); document.addEventListener('keydown',key); }
    ov.innerHTML=''; const hd=H('div','cy-ovh'); const back=H('button','cy-back','→ חזרה לעיר'); back.type='button'; back.addEventListener('click',closeOv);
    const tt=H('div','cy-ovt'); tt.append(H('span','cy-tag',tag),H('h3','',title)); hd.append(back,tt); ov.append(hd); const body=H('div','cy-ovb'); ov.append(body); ov.setAttribute('aria-label',title);
    requestAnimationFrame(()=>ov.classList.add('on')); back.focus({preventScroll:true}); return {hd,body}; }
  function key(e){ if(e.key==='Escape') closeOv(); }
  let moved=null;
  function closeOv(){ if(!ov) return; if(moved){ moved.home.insertBefore(moved.el,moved.next); moved=null; } ov.classList.remove('on'); const o=ov; ov=null; document.removeEventListener('keydown',key); setTimeout(()=>o.remove(),250); }
  function openSection(k,t){ const map={dc:'sp-dc',kn:'sp-kn',cl:'sp-cl'}; const el=full.querySelector('.'+map[k]); if(!el) return;
    const {body}=shell(t,k==='dc'?'צומת':k==='kn'?'מגדל':'גשר'); moved={el,home:el.parentNode,next:el.nextSibling}; el.classList.add('in'); body.append(el); }
  function openRoom(n){ cur=n; const f=F[n]; if(tour&&tour.t){ clearInterval(tour.t); tour.t=null; }
    const {hd,body}=shell(f.title,'פיצ\'ר '+n+' · שכונת '+LAY[f.layer]);
    const nav=H('div','cy-nav'); const pv=H('button','cy-btn','‹ הקודם'), nx=H('button','cy-btn go','הבא ›'); pv.type=nx.type='button'; pv.disabled=n===1; nx.disabled=n===10; pv.addEventListener('click',()=>openRoom(n-1)); nx.addEventListener('click',()=>openRoom(n+1));
    const mini=H('div','cy-mini'); for(let k=1;k<=10;k++){ const d=H('button',k===n?'on':''); d.type='button'; d.textContent=k; d.setAttribute('aria-label','פיצ\'ר '+k+': '+F[k].title); d.addEventListener('click',()=>openRoom(k)); mini.append(d); }
    nav.append(pv,mini,nx); hd.append(nav);
    const g=H('div','cy-room');
    const a=H('section','cy-r1'); a.append(H('p','cy-one',f.line)); const pair=H('div','cy-pair'); const w=H('div','cy-pw'); w.append(H('span','cy-k',C.wazeLabel),H('p','',WAZE[n])); const o=H('div','cy-po'); o.append(H('span','cy-k','אצלנו'),H('p','',f.hook)); pair.append(w,o); a.append(pair,H('p','cy-ex',EX[n])); g.append(a);
    const m=H('section','cy-r2'); m.append(H('span','cy-k','מודל קטן לשחק בו')); const mb=H('div','cy-model'); m.append(mb); MODEL[n](mb); g.append(m);
    const c=H('section','cy-r3'); c.append(H('span','cy-k','איך זה עובד, בתמונות')); const strip=H('div','cy-comic'); (f.how||[]).slice(0,4).forEach((t,i)=>{ const p=H('div','cy-cp'); p.style.setProperty('--i',i); p.append(H('b','',String(i+1)),H('p','',t)); strip.append(p); }); c.append(strip); g.append(c);
    const cut=H('section','cy-r4'); cut.append(H('span','cy-k','חתך של הבניין: הקומות הן הטכנולוגיות'));
    const bld=H('div','cy-cut'); (f.built||[]).slice().reverse().forEach(b=>{ const fl=H('div','cy-floor '+b.kind); fl.append(H('b','',b.name),H('small','',KIND[b.kind]||'')); bld.append(fl); }); bld.append(H('div','cy-ground'));
    const lg=H('div','cy-lg'); Object.entries(KIND).forEach(([k,l])=>lg.append(H('span','cy-floor-k '+k,l))); cut.append(bld,lg); g.append(cut);
    const deep=H('details','cy-deep'); deep.append(H('summary','','לרדת לעומק: כל הטקסט של הפיצ\'ר'));
    deep.append(H('p','',f.hook)); if(f.explain&&f.explain.length===2){ const ex=H('p'); ex.innerHTML='<b></b> '; ex.querySelector('b').textContent=f.explain[0]; ex.append(f.explain[1]); deep.append(ex); }
    const ol=H('ol'); (f.how||[]).forEach(t=>ol.append(H('li','',t))); deep.append(ol);
    if(f.threat){ const th=H('p','cy-threat'); th.innerHTML='<b>מה יכול להשתבש:</b> '; th.append(f.threat); deep.append(th); const an=H('p'); an.innerHTML='<b>התשובה שלנו:</b> '; an.append(f.answer||''); deep.append(an); }
    if(f.io){ const io=H('p'); io.innerHTML='<b>נכנס:</b> '; io.append(f.io[0]); io.append(H('br')); const b2=H('b','','יוצא:'); io.append(b2,' '+f.io[1]); deep.append(io); }
    if(f.data){ const tb=H('table','cy-data'); const cap=H('caption','',f.data.rec); tb.append(cap); f.data.fields.forEach(([k,v])=>{ const tr=H('tr'); const td=H('td'); const cd=H('code','',k); cd.setAttribute('dir','ltr'); td.append(cd); tr.append(td,H('td','',v)); tb.append(tr); }); deep.append(tb); }
    g.append(deep); body.append(g); body.scrollTop=0;
    if(window.TermWin) window.TermWin.wire(body); }

  const MODEL=C.models({H,S});

  if(window.TermWin) window.TermWin.wire(top);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,0)); else setTimeout(boot,0);
})();
