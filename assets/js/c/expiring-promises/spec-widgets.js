/* Case 04 spec knob widgets: dmhandover (desk-memory) and crturnover (crisis-rehearsal).
   spec-lab.js calls SPEC_WIDGETS[name](section, knobx, helpers). */
window.SPEC_WIDGETS=window.SPEC_WIDGETS||{};
(function(){
  if(!document.getElementById('ep-wg-css')){
    const st=document.createElement('style'); st.id='ep-wg-css';
    st.textContent=`
.eh-wrap{margin:14px 0;display:flex;flex-direction:column;gap:12px}
.eh-row{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.eh-row label{display:flex;flex-direction:column;gap:4px;font-size:14px;flex:1 1 220px;min-width:0}
.eh-row label b{font:600 15px/1.2 ui-monospace,Consolas,monospace}
.eh-row input[type=range]{width:100%}
.eh-qs{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:4px}
.eh-q{aspect-ratio:1;border-radius:4px;border:1px solid var(--line,#ccd);background:var(--surface,#fff);transition:background .25s,border-color .25s}
.eh-q.m{background:color-mix(in srgb,#c47a12 45%,var(--surface,#fff));border-color:#c47a12}
.eh-q.g{background:color-mix(in srgb,#1a9a6a 45%,var(--surface,#fff));border-color:#1a9a6a}
.eh-bars{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:6px 10px;align-items:center;font-size:14px}
.eh-bar{height:14px;border-radius:7px;background:var(--line,#dde);position:relative;overflow:hidden}
.eh-bar i{position:absolute;inset:0 auto 0 0;border-radius:7px;transition:width .5s}
[dir=rtl] .eh-bar i{inset:0 0 0 auto}
.eh-bar.m i{background:#c47a12} .eh-bar.g i{background:#1a9a6a} .eh-bar.r i{background:var(--risk,#d33)}
.eh-out{margin:0;font-size:14.5px;min-height:2.6em}
.eh-seats{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:6px}
.eh-seat{border:1px solid var(--line,#ccd);border-radius:10px 10px 4px 4px;padding:8px 2px;text-align:center;font-size:11.5px;line-height:1.3;background:var(--surface,#fff);transition:background .3s,border-color .3s;min-width:0;overflow:hidden}
.eh-seat.new{background:color-mix(in srgb,var(--risk,#d33) 18%,var(--surface,#fff));border-color:var(--risk,#d33)}
.eh-note{margin:0;font-size:12.5px;opacity:.8}
@media (max-width:520px){.eh-qs{grid-template-columns:repeat(10,minmax(0,1fr))}.eh-seats{grid-template-columns:repeat(4,minmax(0,1fr))}}
@media (prefers-reduced-motion: reduce){.eh-bar i,.eh-q,.eh-seat{transition:none}}
`; document.head.append(st);
  }
})();

/* ---------- Desk Memory: memo pages vs. the thread graph, on the 60 day-one questions ---------- */
window.SPEC_WIDGETS.dmhandover=function(ks,KX,U){
  const H=U.H, K=KX.K, D=KX.data;
  const lg=H('div','sp-lg'); KX.legend.forEach((l,i)=>{ const d=H('div','s'+(i?2:1)); d.append(H('b','',l[0]),H('span','',l[1])); lg.append(d); }); ks.append(lg);
  const w=H('div','eh-wrap'); ks.append(w);
  const row=H('div','eh-row'); const lab=H('label'); const sp=H('span','',K.pages); const val=H('b'); const r=H('input'); r.type='range'; r.min=1; r.max=20; r.step=1; r.value=4; r.setAttribute('aria-label',K.pages); lab.append(sp,val,r); row.append(lab);
  const go=H('button','sp-btn','▶ '+K.go); go.type='button'; row.append(go); w.append(row);
  const qs=H('div','eh-qs'); qs.setAttribute('aria-hidden','true'); const cells=[]; for(let i=0;i<D.questions;i++){ const c=H('span','eh-q'); qs.append(c); cells.push(c); } w.append(qs);
  const bars=H('div','eh-bars'); const mk=(name,cls)=>{ const b=H('div','eh-bar '+cls); const i=H('i'); b.append(i); const n=H('b'); bars.append(H('span','',name),b,n); return [i,n]; };
  const [mi,mn]=mk(K.memo,'m'), [gi,gn]=mk(K.graph,'g'); w.append(bars);
  const out=H('p','eh-out'); out.setAttribute('aria-live','polite'); w.append(out);
  w.append(H('p','eh-note','המזכר: מודל להמחשה, מכויל לנקודה אחת מה-POC (4 עמודים: 8 מתוך 60). החוטים: 58 מתוך 60, מה-POC.'));
  let graphOn=false;
  const memoAns=p=>Math.round(32*(1-Math.exp(-0.0719*p)));
  function draw(){ const p=+r.value, m=memoAns(p), g=graphOn?D.graph:0; val.textContent=p;
    cells.forEach((c,i)=>{ c.className='eh-q'+(i<m?' m':(graphOn&&i<g?' g':'')); });
    mi.style.width=(m/D.questions*100)+'%'; mn.textContent=m+'/'+D.questions; gi.style.width=(g/D.questions*100)+'%'; gn.textContent=graphOn?g+'/'+D.questions:'·';
    out.textContent=graphOn?('המזכר עונה על '+m+' שאלות. החוטים עונים על '+g+', כל תשובה עם מקור. שתי השאלות שנשארו: הבטחות שנאמרו ולא סוכמו.'):('מזכר של '+p+' עמודים עונה על '+m+' מתוך '+D.questions+' השאלות של היום הראשון.'); }
  r.addEventListener('input',draw); go.addEventListener('click',()=>{ graphOn=true; draw(); }); draw();
};

/* ---------- Crisis Rehearsal: months since the rehearsal vs. mean tenure ---------- */
window.SPEC_WIDGETS.crturnover=function(ks,KX,U){
  const H=U.H, K=KX.K, D=KX.data;
  const lg=H('div','sp-lg'); KX.legend.forEach((l,i)=>{ const d=H('div','s'+(i?2:1)); d.append(H('b','',l[0]),H('span','',l[1])); lg.append(d); }); ks.append(lg);
  const w=H('div','eh-wrap'); ks.append(w);
  const row=H('div','eh-row'); const sl=(t,min,max,v)=>{ const lab=H('label'); const s=H('span','',t); const b=H('b'); const r=H('input'); r.type='range'; r.min=min; r.max=max; r.step=1; r.value=v; r.setAttribute('aria-label',t); lab.append(s,b,r); row.append(lab); return [r,b]; };
  const [mr,mb]=sl(K.months,0,24,12), [tr,tb]=sl(K.tenure,12,36,18); w.append(row);
  const SEATS=['אנרגיה','סייבר','משפטי','דוברות','צבאי','מדיני','מודיעין','יו"ר'];
  const seats=H('div','eh-seats'); const sEls=SEATS.map(n=>{ const e=H('div','eh-seat',n); seats.append(e); return e; }); w.append(seats);
  const bars=H('div','eh-bars'); const b=H('div','eh-bar r'); const bi=H('i'); b.append(bi); const bn=H('b'); bars.append(H('span','',K.out),b,bn); w.append(bars);
  const out=H('p','eh-out'); out.setAttribute('aria-live','polite'); w.append(out);
  w.append(H('p','eh-note','חלק שהתחלף = 1 − e^(−חודשים/ותק). השעות לפי עקומת ה-POC (ממוצע 300 הרצות). המחשה, לא תחזית.'));
  const curve=D.curve; const hoursAt=pct=>{ for(let i=1;i<curve.length;i++){ if(pct<=curve[i][0]){ const [x0,y0]=curve[i-1],[x1,y1]=curve[i]; return y0+(y1-y0)*(pct-x0)/(x1-x0); } } return curve[curve.length-1][1]; };
  function draw(){ const m=+mr.value, t=+tr.value; mb.textContent=m; tb.textContent=t;
    const share=1-Math.exp(-m/t), n=Math.round(share*8), h=hoursAt(share*100);
    sEls.forEach((e,i)=>e.classList.toggle('new',i>=8-n));
    bi.style.width=((h-D.warm)/(D.cold-D.warm)*100).toFixed(0)+'%'; bn.textContent=h.toFixed(1);
    out.textContent=m===0?'ביום שאחרי החזרה: כל הכיסאות חמים, 4.4 שעות.':(Math.round(share*100)+'% מהכיסאות התחלפו ('+n+' מתוך 8). ההחלטות יחזרו לקחת כ-'+h.toFixed(1)+' שעות, מתוך 8.4 של צוות שלא התאמן בכלל.'); }
  mr.addEventListener('input',draw); tr.addEventListener('input',draw); draw();
};
