/* Case 05 spec knob widgets: pmalloc (payback-meter) and rntruth (revenue-nowcaster).
   spec-lab.js calls SPEC_WIDGETS[name](section, knobx, helpers). Data comes from the POC runs (assets/py). */
window.SPEC_WIDGETS=window.SPEC_WIDGETS||{};
(function(){
  if(!document.getElementById('fn-wg-css')){
    const st=document.createElement('style'); st.id='fn-wg-css';
    st.textContent=`
.fw-wrap{margin:14px 0;display:flex;flex-direction:column;gap:12px}
.fw-tabs{display:flex;flex-wrap:wrap;gap:8px}
.fw-tabs button{font:inherit;font-size:14px;padding:6px 12px;border-radius:18px;border:1px solid var(--line,#ccd);background:var(--surface,#fff);cursor:pointer}
.fw-tabs button.on{background:var(--ink,#1e2422);color:var(--paper,#fff);border-color:var(--ink,#1e2422)}
.fw-bars{display:grid;grid-template-columns:auto minmax(0,1fr) 3.4em;gap:6px 10px;align-items:center;font-size:14px}
.fw-bar{height:16px;border-radius:8px;background:var(--line,#dde);position:relative;overflow:hidden}
.fw-bar i{position:absolute;inset:0 0 0 auto;border-radius:8px;background:#1a9a6a;transition:width .55s,background .3s}
.fw-bar i.thin{background:var(--risk,#c0392b)}
.fw-avg{position:absolute;top:-3px;bottom:-3px;width:2px;background:var(--ink,#1e2422);opacity:.55}
.fw-out{margin:0;font-size:14.5px;min-height:2.6em}
.fw-note{margin:0;font-size:12.5px;opacity:.8}
.fw-rng label{display:flex;flex-direction:column;gap:4px;font-size:14px}
.fw-rng input{width:100%}
.fw-meters{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.fw-meter{border:1px solid var(--line,#ccd);border-radius:12px;padding:10px;text-align:center;background:var(--surface,#fff)}
.fw-meter b{display:block;font:700 26px/1.1 ui-monospace,Consolas,monospace}
.fw-meter.bad b{color:var(--risk,#c0392b)}
.fw-gauge{height:10px;border-radius:5px;background:var(--line,#dde);position:relative;margin-top:8px;overflow:hidden}
.fw-gauge i{position:absolute;inset:0 0 0 auto;background:#1a9a6a;transition:width .5s}
.fw-gauge.bad i{background:var(--risk,#c0392b)}
.fw-gauge u{position:absolute;top:0;bottom:0;width:2px;background:var(--ink,#1e2422)}
@media (prefers-reduced-motion: reduce){.fw-bar i,.fw-gauge i{transition:none}}
`; document.head.append(st);
  }
})();

/* ---------- Payback Meter: the same hour, three ways to split a shared decode step ---------- */
window.SPEC_WIDGETS.pmalloc=function(ks,KX,U){
  const H=U.H, K=KX.K, D=KX.data;
  const lg=H('div','sp-lg'); KX.legend.forEach((l,i)=>{ const d=H('div','s'+(i?2:1)); d.append(H('b','',l[0]),H('span','',l[1])); lg.append(d); }); ks.append(lg);
  const w=H('div','fw-wrap'); ks.append(w);
  const tabs=H('div','fw-tabs'); tabs.setAttribute('role','group'); tabs.setAttribute('aria-label',K.method); w.append(tabs);
  const M=[[K.per_req,3],[K.per_tok,2],[K.meter,1]]; const btns=M.map(([l,col])=>{ const b=H('button','',l); b.type='button'; b.dataset.col=col; tabs.append(b); return b; });
  const bars=H('div','fw-bars'); w.append(bars); const rows=D.rows.map(r=>{ const b=H('div','fw-bar'); const i=H('i'); const a=H('span','fw-avg'); a.style.right=D.avg+'%'; b.append(i,a); const n=H('b'); bars.append(H('span','',r[0]),b,n); return [r,i,n]; });
  const out=H('p','fw-out'); out.setAttribute('aria-live','polite'); w.append(out);
  w.append(H('p','fw-note','הנתונים: אותה שעה של האשכול המדומה מה-POC. הקו האנכי הוא הממוצע, '+D.avg+'%, זהה בכל השיטות.'));
  function show(col){ btns.forEach(b=>b.classList.toggle('on',+b.dataset.col===col));
    let best=null, worst=null;
    rows.forEach(([r,i,n])=>{ const v=r[col]; i.style.width=v+'%'; i.classList.toggle('thin',v<D.avg-15); n.textContent=v+'%'; if(!best||v>best[1]) best=[r[0],v]; if(!worst||v<worst[1]) worst=[r[0],v]; });
    const name=M.find(m=>m[1]===col)[0];
    out.textContent=(col===1?'המונה: ':name+': ')+'הכי רווחי נראה "'+best[0]+'" ('+best[1]+'%), הכי דליל "'+worst[0]+'" ('+worst[1]+'%).'+(col===1?' זו התמונה שהשרת עצמו רואה.':' המונה רואה תמונה אחרת.'); }
  btns.forEach(b=>b.addEventListener('click',()=>show(+b.dataset.col))); show(3);
};

/* ---------- Revenue Nowcaster: what happens to error and coverage, by the source of truth ---------- */
window.SPEC_WIDGETS.rntruth=function(ks,KX,U){
  const H=U.H, K=KX.K, D=KX.data, T=D.table;
  const lg=H('div','sp-lg'); KX.legend.forEach((l,i)=>{ const d=H('div','s'+(i?2:1)); d.append(H('b','',l[0]),H('span','',l[1])); lg.append(d); }); ks.append(lg);
  const w=H('div','fw-wrap'); ks.append(w);
  const lab=H('label'); const sp=H('span','',K.points+': '); const val=H('b'); const r=H('input'); r.type='range'; r.min=0; r.max=T.length-1; r.step=1; r.value=0; r.setAttribute('aria-label',K.points); lab.append(sp,val,r); const rg=H('div','fw-rng'); rg.append(lab); w.append(rg);
  const ms=H('div','fw-meters'); w.append(ms);
  const mk=(title)=>{ const m=H('div','fw-meter'); m.append(H('span','',title)); const b=H('b'); m.append(b); const g=H('div','fw-gauge'); const i=H('i'); const u=H('u'); g.append(i,u); m.append(g); ms.append(m); return [m,b,g,i,u]; };
  const [em,eb,eg,ei]=mk(K.err), [cm,cb,cg,ci,cu]=mk(K.cov); cu.style.right='90%';
  const out=H('p','fw-out'); out.setAttribute('aria-live','polite'); w.append(out);
  w.append(H('p','fw-note','כל שורה הורצה בפייתון על השוק המדומה של ה-POC; בהכרזות, ממוצע של 30 בחירות אקראיות של חודשים.'));
  function draw(){ const [n,kind,e,c]=T[+r.value]; val.textContent=kind==='exact'?K.exact:(n+' '+K.rr);
    eb.textContent=e+'%'; ei.style.width=Math.min(100,e*8)+'%'; const eBad=e>3; em.classList.toggle('bad',eBad); eg.classList.toggle('bad',eBad);
    cb.textContent=c+'%'; ci.style.width=c+'%'; const cBad=c<90; cm.classList.toggle('bad',cBad); cg.classList.toggle('bad',cBad);
    out.textContent=kind==='exact'?'עם אמת מדויקת בכל חודש, המכ"ם טועה ב-'+e+'% והטווח מכיל את האמת '+c+'% מהזמן.':(n+' הכרזות של קצב שנתי בשנתיים: טעות '+e+'%, והטווח מכיל את האמת רק '+c+'% מהזמן, כשהוא מבטיח 90%.'); }
  r.addEventListener('input',draw); draw();
};
