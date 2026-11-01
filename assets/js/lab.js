/* POC lab engine (any case): upgrades the generic POC page (.pl[data-pl=slug], rendered by poc-lab.js) into a lab notebook.
   Each candidate registers a factory: window.LABFX[slug]=function(api){ return cfg } (see c/<case>/lab-<slug>.js).
   api: {H, sleep, tm, reduce}. cfg:
     intro      html replacing the hero (what is a POC, what we test here, the character explains one term)
     labsTitle  e.g. 'ארבע מעבדות' · labsSub
     labs       [{id, n, t, hyp, var, who:[name, story], proves:[claim indexes], sci?, free?:{label, min, max, step, value, unit}}]
     claims     [[claim, why it matters, lab index]]
     panel(lb)  html of the instrument panel for a lab (must contain <div class="ip-tape" aria-live="polite"><p class="ip-th">THE DIFFERENTIAL · LAB</p></div>)
     run(lb, ctx, free)  async; ctx={panel, add(text, 'ok'|'bad'), stamp(cls, text), sleep, H}; returns a short result for the lab journal
     reset(panel) optional, before "run again"
     machine    {h, sub, stations:[[key, he, en, what, without]], icons:{key: svg inner}}
     fence      {sub, inside:[[a,b]], outside:[[a,b]]}
     vs         {a: html, b: html, q}
     ethics     {headline, intro, feed:[...], note, ask, choices:[a,b], verdict:[ifA, ifB], why, headline2}
     envelopes  {h, sub, items:[[title, text]]}
     code       {sub, cards:[[title, [[code, hebrew]]]], chips:[[a,b]]}
     dl         {slug, extra:[[href,label]]} */
(function(){
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const H=(t,c,x)=>{ const e=document.createElement(t); if(c) e.className=c; if(x!=null) e.textContent=x; return e; };
  const sleep=ms=>new Promise(r=>setTimeout(r,reduce?Math.min(ms,20):ms));
  const tm=(id,w)=>`<button class="tm" data-t="${id}">${w}</button>`;
  function mount(root){
    const f=(window.LABFX||{})[root.dataset.pl]; if(!f||root.dataset.fx) return; const C=f({H,sleep,tm,reduce}); if(!C) return; root.dataset.fx='1';
    const secBy=k=>[...root.querySelectorAll('.pl-sec')].find(s=>{ const h=s.querySelector('.pl-h'); return h&&h.textContent.startsWith(k); });
    const hero=root.querySelector('.pl-hero'); const intro=H('div','lb-intro'); intro.innerHTML=C.intro;
    if(hero) hero.replaceWith(intro); else root.prepend(intro);
    const LABS=C.labs, CL=C.claims;
    const labS=secBy('הרצה חיה'); const sec=H('section','pl-sec lb-sec'); sec.append(H('h5','pl-h',C.labsTitle),H('p','lb-sub',C.labsSub||'כל מעבדה היא עמוד במחברת: השערה, מה משנים, מי עומד מאחורי הניסוי, ואז מרימים את מכסה הבטיחות ומפעילים.'));
    const tabs=H('div','lb-tabs'); sec.append(tabs); const page=H('div','lb-page'); sec.append(page);
    const journal=H('div','lb-journal'); journal.append(H('p','lb-jh','יומן מעבדה'),H('ol','lb-jl')); journal.querySelector('ol').append(H('li','lb-jempty','עוד לא הורצו ניסויים.'));
    const claims=H('div','lb-claims'); claims.append(H('p','lb-jh','לוח ההשערות')); const proved=new Set();
    const cEls=CL.map(([t,why,lab])=>{ const r=H('div','lb-claim'); r.append(H('span','lb-cst','ממתין'),H('b','',t),H('span','lb-cwhy',why)); const a=H('button','lb-cgo','נבדק במעבדה '+(lab+1)+' ←'); a.type='button'; a.addEventListener('click',()=>open(lab)); r.append(a); claims.append(r); return r; });
    const prove=i=>{ if(proved.has(i)) return; proved.add(i); cEls[i].classList.add('ok'); cEls[i].querySelector('.lb-cst').textContent='הוכח ✓'; };
    sec.append(claims,journal); if(labS) labS.replaceWith(sec); else root.append(sec); root.querySelectorAll('.pl-checks').forEach(x=>x.remove());
    LABS.forEach((lb,i)=>{ const b=H('button','lb-tab'); b.type='button'; b.append(H('small','',lb.n),H('strong','',lb.t)); b.addEventListener('click',()=>open(i)); tabs.append(b); });
    function open(i,quiet){ [...tabs.children].forEach((b,j)=>b.classList.toggle('on',j===i)); build(LABS[i]); if(!quiet) page.scrollIntoView({behavior:reduce?'auto':'smooth',block:'nearest'}); }
    function build(lb){ page.innerHTML=''; const nb=H('div','lb-nb'); const left=H('div','lb-notes'); left.append(H('p','lbx-title',lb.n+' · '+lb.t));
      [['השערה',lb.hyp],['מה משנים',lb.var]].forEach(([k,v])=>{ const r=H('div','lb-row'); r.append(H('span','lb-k',k),H('p','',v)); left.append(r); });
      const wh=H('div','lb-who'); wh.append(H('strong','',lb.who[0]),H('p','',lb.who[1])); left.append(wh); if(lb.sci){ const sc=H('div','lb-sci'); sc.append(H('span','lb-k','רגע של מדע'),H('p','',lb.sci)); left.append(sc); }
      const ctl=H('div','lb-ctl'); const cover=H('button','lb-cover'); cover.type='button'; cover.innerHTML='<span class="lid">להרים מכסה</span><span class="btn">הפעלה</span>'; const again=H('button','lb-again','↻ להריץ שוב'); again.type='button'; again.hidden=true; ctl.append(cover,again);
      if(lb.free){ const F=lb.free; const fr=H('div','lb-free'); fr.innerHTML=`<label>${F.label} <b>${F.value}${F.unit||''}</b><input type="range" min="${F.min}" max="${F.max}" step="${F.step}" value="${F.value}"></label>`; ctl.append(fr); }
      left.append(ctl); const panel=H('div','lb-panel rgl '+(C.panelClass||'')); nb.append(left,panel); page.append(nb);
      panel.innerHTML=C.panel(lb);
      const tape=panel.querySelector('.ip-tape'); const add=(t,c)=>{ const l=H('p','ip-l '+(c||''),t); tape.append(l); tape.scrollTop=tape.scrollHeight; };
      const stamp=(c,t)=>{ let s=panel.querySelector('.ip-stamp'); if(!s){ s=H('div','ip-stamp'); panel.append(s); } s.hidden=false; s.className='ip-stamp '+c; s.textContent=t; };
      const runLab=async(free)=>{ tape.querySelectorAll('.ip-l').forEach(x=>x.remove()); panel.querySelectorAll('.ip-stamp').forEach(x=>x.hidden=true); return C.run(lb,{panel,add,stamp,sleep,H},free); };
      let armed=false; const go=async(free)=>{ const res=await runLab(free); lb.proves.forEach(prove); const jl=journal.querySelector('ol'); const em=jl.querySelector('.lb-jempty'); if(em) em.remove(); const t=new Date(); jl.prepend(H('li','',[t.getHours(),t.getMinutes(),t.getSeconds()].map(x=>String(x).padStart(2,'0')).join(':')+' · '+lb.t+' · '+res)); };
      cover.addEventListener('click',async()=>{ if(!armed){ armed=true; cover.classList.add('open'); return; } if(cover.disabled) return; cover.disabled=true; await go(); cover.disabled=false; again.hidden=false; });
      again.addEventListener('click',async()=>{ again.disabled=true; if(C.reset) C.reset(panel); await go(); again.disabled=false; });
      const fr=page.querySelector('.lb-free input'); if(fr){ const F=lb.free; fr.addEventListener('input',()=>{ page.querySelector('.lb-free b').textContent=(+fr.value).toFixed(F.dec==null?1:F.dec)+(F.unit||''); }); fr.addEventListener('change',()=>go(+fr.value)); }
    }
    open(0,true);
    /* machine */
    const compS=secBy('מי משתתף'); const M=C.machine;
    if(compS&&M){ const s=H('section','pl-sec mc-sec'); s.append(H('h5','pl-h',M.h),H('p','lb-sub',M.sub||'בתוך הקוד עובדות כמה תחנות, ממש כמו מכונה. לחצו על תחנה כדי לקרוא מה היא עושה, ונסו להוציא אותה מהמכונה.'));
      const m=H('div','mc'); const det=H('div','mc-det'); det.setAttribute('aria-live','polite'); det.innerHTML='<p>לחצו על תחנה.</p>'; const out=new Set();
      M.stations.forEach(([k,he,en,what,without],i)=>{ const st=H('div','mc-st'); st.style.setProperty('--i',i); const b=H('button','mc-b'); b.type='button'; b.innerHTML=`<svg viewBox="0 0 52 52" aria-hidden="true">${M.icons[k]||''}</svg>`; b.append(H('strong','',he),H('small','',en)); const pull=H('button','mc-pull','להוציא מהמכונה'); pull.type='button';
        b.addEventListener('click',()=>{ m.querySelectorAll('.mc-st').forEach(x=>x.classList.toggle('sel',x===st)); det.innerHTML=''; det.append(H('strong','',he+' · '+en),H('p','',what)); if(out.has(k)) det.append(H('p','mc-bad',without)); });
        pull.addEventListener('click',()=>{ if(out.has(k)){ out.delete(k); st.classList.remove('out'); pull.textContent='להוציא מהמכונה'; } else { out.add(k); st.classList.add('out'); pull.textContent='להחזיר'; } m.classList.toggle('broken',out.size>0); det.innerHTML=''; det.append(H('strong','',out.has(k)?'הוצאתם את '+he:'החזרתם את '+he),H('p',out.has(k)?'mc-bad':'',out.has(k)?without:'המכונה עובדת שוב.')); });
        st.append(b,pull); m.append(st); if(i<M.stations.length-1) m.append(H('span','mc-belt')); });
      s.append(m,det); compS.replaceWith(s); }
    /* fence */
    const limS=secBy('גבולות ה-POC'); const FN=C.fence;
    if(limS&&FN){ const s=H('section','pl-sec fn-sec'); s.append(H('h5','pl-h','גבולות ה-POC'),H('p','lb-sub',FN.sub||'POC בודק דבר אחד, ומשאיר בכוונה את כל השאר בחוץ. מה שבחוץ לא נשכח: הוא רק נדחה לשלב הבא, לאפיון.'));
      const f=H('div','fn'); const inside=H('div','fn-in'); inside.append(H('span','fn-tag','בתוך הגדר: מה שבדקנו'));
      FN.inside.forEach(([a,b])=>{ const c=H('div','fn-item'); c.append(H('b','',a),H('span','',b)); inside.append(c); });
      const outside=H('div','fn-out'); FN.outside.forEach(([a,b],i)=>{ const c=H('div','fn-note'); c.style.setProperty('--i',i); c.append(H('span','fn-stk','לאפיון'),H('b','',a),H('span','',b)); outside.append(c); });
      f.append(outside,inside); s.append(f); limS.replaceWith(s); }
    /* split screen */
    const vsS=secBy('במה זה שונה'); const VS=C.vs;
    if(vsS&&VS){ const s=H('section','pl-sec'); s.append(H('h5','pl-h','במה זה שונה')); const g=H('div','vs2');
      const a=H('div','vs-side official'); a.innerHTML=VS.a; const b=H('div','vs-side ours'); b.innerHTML=VS.b;
      g.append(a,H('span','vs-vs','מול'),b); s.append(g,H('p','vs-q',VS.q)); vsS.replaceWith(s); }
    /* ethics */
    const ethS=secBy('שאלה אתית'); const ET=C.ethics;
    if(ethS&&ET){ const s=H('section','pl-sec et-sec'); s.append(H('h5','pl-h','שאלה אתית: מה הייתם עושים?'));
      const ph=H('div','et-phone'); const sc=H('div','et-screen'); ph.append(sc); const head=H('div','et-news'); head.append(H('span','et-src','חדשות · עכשיו'),H('strong','',ET.headline)); sc.append(head); const feed=H('div','et-feed'); sc.append(feed);
      const side=H('div','et-side'); side.append(H('p','',ET.intro)); const play=H('button','et-play','לראות מה קורה ←'); play.type='button'; side.append(play);
      const ch=H('div','et-choice'); ch.hidden=true; ch.append(H('p','',ET.ask)); const a=H('button','et-c',ET.choices[0]), b=H('button','et-c',ET.choices[1]); a.type=b.type='button'; ch.append(a,b); side.append(ch); const ans=H('div','et-ans'); ans.hidden=true; side.append(ans);
      play.addEventListener('click',async()=>{ play.disabled=true; for(const t of ET.feed){ feed.append(H('p','et-n',t)); await sleep(650); } side.insertBefore(H('p','et-note',ET.note),ch); ch.hidden=false; });
      const decide=x=>{ ans.hidden=false; ans.innerHTML=''; ans.append(H('strong','',ET.verdict[x?0:1]),H('p','',ET.why)); if(ET.headline2) head.querySelector('strong').textContent=ET.headline2; };
      a.addEventListener('click',()=>decide(true)); b.addEventListener('click',()=>decide(false)); const w=H('div','et'); w.append(ph,side); s.append(w); ethS.replaceWith(s); }
    /* envelopes */
    const openS=secBy('מה עובר לאפיון'); const EN=C.envelopes;
    if(openS&&EN){ const s=H('section','pl-sec'); s.append(H('h5','pl-h',EN.h),H('p','lb-sub',EN.sub||'מה שה-POC לא פתר לא נזרק. הוא נכנס למעטפה, ונמסר לשלב הבא. לחצו כדי לפתוח.')); const g=H('div','env-g');
      EN.items.forEach(([t,d],i)=>{ const e=H('button','env'); e.type='button'; e.style.setProperty('--i',i); e.innerHTML='<span class="env-back"></span><span class="env-flap"></span><span class="env-seal">לאפיון</span><span class="env-letter"><b></b><span></span></span>'; e.querySelector('.env-letter b').textContent=t; e.querySelector('.env-letter span').textContent=d; e.append(H('span','env-lab',t)); e.addEventListener('click',()=>e.classList.toggle('open')); g.append(e); });
      s.append(g); openS.replaceWith(s); }
    /* code */
    const techS=secBy('מה בקוד'); const CD=C.code;
    if(techS&&CD){ const s=H('section','pl-sec cd-sec'); s.append(H('h5','pl-h','מה בקוד'),H('p','lb-sub',CD.sub||'קטעים מהקוד האמיתי. ליד כל שורה חשובה יש הסבר בעברית.'));
      CD.cards.forEach(([h,rows])=>{ const c=H('div','cd-card'); c.append(H('p','cd-h',h)); rows.forEach(([code,he])=>{ const r=H('div','cd-row'); const cd=H('code','',code); cd.setAttribute('dir','ltr'); r.append(cd,H('span','cd-he',he)); c.append(r); }); s.append(c); });
      if(CD.chips){ const chips=H('div','cd-chips'); CD.chips.forEach(([a,b])=>{ const d=H('div','cd-chip'); d.append(H('b','',a),H('span','',b)); chips.append(d); }); s.append(chips); }
      const det=techS.querySelector('details'); if(det) s.append(det); techS.replaceWith(s); }
    const dlS=secBy('הורדה'); if(dlS&&window.fxDownloads&&C.dl){ const s=H('section','pl-sec'); s.append(H('h5','pl-h','הורדה'),window.fxDownloads(C.dl.slug,'poc','מסמך ה-POC','The POC document','המטרה, הרכיבים, הגבולות והמסקנה.','Goal, components, limits and conclusion.',null,C.dl.extra||[])); dlS.replaceWith(s); }
    if(window.TermWin) window.TermWin.wire(root);
  }
  function boot(){ document.querySelectorAll('.pl[data-pl]').forEach(mount); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,0)); else setTimeout(boot,0);
})();
