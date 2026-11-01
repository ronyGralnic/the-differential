/* Stage 04 · the reel, upgraded (engine, any case). Content: window.REEL_FX / REEL_FX_EXTRA keyed by candidate name (c/<case>/reel-fx*.js):
   - every chapter looks like its document (ideation = napkin sketch, POC = lab bench, spec = feature cards, architecture = blueprint)
   - a live background per candidate, a peek at the real PDF, one interactive moment per chapter, and the recurring character
   - the journey tree fills its side branches as the reader finishes reels (stored per viewer, no spoilers up front) */
(function(){
  const reel=document.getElementById('reel'), scenes=document.getElementById('reel-scenes'), titleEl=document.getElementById('reel-title');
  if(!reel||!scenes) return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const H=(t,c,x)=>{ const e=document.createElement(t); if(c) e.className=c; if(x!=null) e.textContent=x; return e; };
  const KIND={'ייזום':'ideation','מחקר ו-POC':'poc','אפיון':'spec','ארכיטקטורה':'arch','מסמך עיצוב':'design','על הלוח':'board'};
  const KLAB={board:'על הלוח · כרטיס בטוש',ideation:'מסמך ייזום · שרטוט על מפית',poc:'מחקר ו-POC · שולחן המעבדה',spec:'אפיון · כרטיסי הפיצ\'רים',arch:'ארכיטקטורה · השרטוט ההנדסי',design:'מסמך עיצוב · מחברת המהנדס'};
  const tm=(id,w)=>`<button class="tm" data-t="${id}">${w}</button>`;

  const FX=Object.assign({},window.REEL_FX||{},window.REEL_FX_EXTRA||{});

  const VIS=window.REEL_VIS||{};

  /* ---------------- decorate scenes as they appear ---------------- */
  function peek(cfg,kind){ const p=H('div','rx-peek'); const fr=H('button','rx-paper'); fr.type='button'; fr.setAttribute('aria-label','הצצה למסמך האמיתי: לחצו כדי להפוך את הדף');
    const a=H('img'); a.src=cfg.peek+kind+'-p1.jpg'; a.alt='העמוד הראשון של המסמך'; a.loading='lazy'; const b=H('img','back'); b.src=cfg.peek+kind+'-p2.jpg'; b.alt='עמוד מתוך המסמך'; b.loading='lazy';
    fr.append(a,b); fr.addEventListener('click',()=>fr.classList.toggle('flip')); const l=H('a','rx-open','לפתוח את המסמך (PDF) ←'); l.href=cfg.pdf+kind+'-he.pdf'; l.target='_blank'; l.rel='noopener';
    p.append(H('span','rx-pk','הצצה למסמך האמיתי'),fr,l); return p; }
  function enhance(scene,i){
    const name=titleEl.textContent, cfg=FX[name]; const kick=scene.querySelector('.reel-kicker'); const kk=kick?kick.textContent.split('·').pop().trim():''; const kind=KIND[kk]||'';
    if(kind) scene.classList.add('rk-'+kind);
    if(!cfg||!cfg.ch[i]) return;
    const c=cfg.ch[i]; scene.classList.add('rx');
    const brief=scene.querySelector('.reel-brief'); const wrap=H('div','rx-body');
    wrap.append(H('p','rx-lab',KLAB[c.kind]||''));
    const ctx=H('div','rx-blk'); ctx.append(H('span','rx-k','רקע, למי שמגיע לכאן ראשון'),H('p','',c.ctx)); wrap.append(ctx);
    const ex=H('div','rx-blk'); ex.append(H('span','rx-k',c.exH||(c.kind==='ideation'?'דוגמה':c.kind==='poc'?'הניסוי':c.kind==='spec'?'מה המוצר יודע':c.kind==='board'?'הרעיון, בפירוט':'מה גילינו'))); const ol=H('ol','rx-steps'); c.ex.forEach(t=>{ const li=H('li'); li.innerHTML=t; ol.append(li); }); ex.append(ol); wrap.append(ex);
    if(c.punch) wrap.append(H('p','rx-punch',c.punch));
    if(c.idea){ const id=H('div','rx-blk'); id.append(H('span','rx-k',c.ideaH||cfg.ideaH||'הרעיון: לבנות שוק שלם בתוך המחשב')); const g=H('div','rx-idea'); c.idea.forEach(([h,t])=>{ const d=H('div','rx-ic'); d.append(H('b','',h)); const p=H('p'); p.innerHTML=t; d.append(p); g.append(d); }); id.append(g); wrap.append(id); }
    const vis=H('div','rx-vis rx-'+c.kind); const VF=(cfg.vis&&cfg.vis[c.kind])||VIS[c.kind]; if(VF) VF(vis);
    const side=H('div','rx-side'); side.append(vis);
    const CH=cfg.char||{name:'',svg:''}; const sr=H('div','rx-sarah'); const av=H('span','rx-av'); av.innerHTML=CH.svg; const st=H('div'); st.append(H('span','rx-k',CH.name),H('p','',c.sarah)); sr.append(av,st);
    const grid=H('div','rx-grid'); grid.append(wrap,side);
    if(brief) brief.replaceWith(grid); else scene.append(grid);
    side.append(sr); if(cfg.peek) side.append(peek(cfg,c.kind));
    if(window.TermWin) window.TermWin.wire(scene);
  }
  function enhanceCut(cut){
    const cfg=FX[titleEl.textContent]; if(!cfg||!cfg.cut) return; const C=cfg.cut;
    const p=cut.querySelector('p:not(.kick)'); if(!p) return;
    const box=H('div','rx-cut'); C.lines.forEach(t=>box.append(H('p','',t))); if(C.like){ const lk=H('div','rx-like'); lk.append(H('span','rx-k','כמו ש...'),H('p','',C.like)); box.append(lk); }
    const fig=H('div','rx-cutfig'); fig.innerHTML=C.fig||'';
    if(C.fig!==false) box.append(fig); box.append(H('p','rx-punch',C.punch));
    const CH=cfg.char||{name:'',svg:''}; const sr=H('div','rx-sarah dark'); const av=H('span','rx-av'); av.innerHTML=CH.svg; const st=H('div'); st.append(H('span','rx-k',CH.name),H('p','',C.sarah)); sr.append(av,st); box.append(sr,H('p','rx-q',C.q));
    p.replaceWith(box);
  }
  new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{ if(n.nodeType!==1) return;
    if(n.classList.contains('reel-scene')) enhance(n,[...scenes.querySelectorAll('.reel-scene')].indexOf(n));
    if(n.classList.contains('reel-cut')) enhanceCut(n); }))).observe(scenes,{childList:true});
  // live background per candidate
  const bg=H('div','rx-bg'); bg.setAttribute('aria-hidden','true'); reel.prepend(bg);
  new MutationObserver(()=>{ const nm=titleEl.textContent; bg.innerHTML=''; reel.dataset.cand='';
    if(FX[nm]&&FX[nm].bg){ reel.dataset.cand=FX[nm].cand||'x'; FX[nm].bg(bg,H); }
  }).observe(titleEl,{childList:true,characterData:true,subtree:true});

  /* ---------------- journey tree: fill branches from finished reels ---------------- */
  const jv=document.querySelector('.jv'); const caseSlug=document.body.dataset.case||'';
  const KEY='td-fell-'+caseSlug; let fell={}; try{ fell=JSON.parse(localStorage.getItem(KEY)||'{}'); }catch(e){ fell={}; }
  const STN=['לוח','ייזום','POC','אפיון','ארכיטקטורה'];
  function paint(){ if(!jv) return; jv.querySelectorAll('.jv-br[data-at]').forEach(br=>{ if(br.dataset.at==='board') return; br.textContent='';
      const at=+br.dataset.at; const here=Object.entries(fell).filter(([n,a])=>a===at).map(([n])=>n);
      if(!here.length){ const q=H('span','jv-leaf unknown','?'); q.title='צפו בהקרנות כדי לגלות'; br.append(q); }
      here.forEach(n=>br.append(H('span','jv-leaf',n))); });
    const cnt=Object.values(fell).filter(v=>v!=='board').length; let s=jv.querySelector('.jv-prog'); if(!s){ s=H('p','jv-prog'); jv.append(s); } s.textContent=cnt?('ענפים שנחשפו: '+cnt+' מתוך 4 הקרנות'):''; }
  document.addEventListener('reel:done',e=>{ const d=e.detail&&e.detail.data; if(!d||!d.st) return; const x=d.st.indexOf('x'); fell[e.detail.name]=x>0?x:(x===0?'board':'go');
    try{ localStorage.setItem(KEY,JSON.stringify(fell)); }catch(err){} paint(); });
  paint();
})();
