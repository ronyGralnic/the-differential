/* Case 06 · spec "knob" widgets (engine: spec-lab.js calls window.SPEC_WIDGETS[name](section, knobx, helpers)).
   Both are illustrations calibrated to points measured in the case's POC runs (assets/py), and say so on screen. */
window.SPEC_WIDGETS=window.SPEC_WIDGETS||{};

/* ---------- Second Call: how much of a fixed budget goes to the random anchor ---------- */
window.SPEC_WIDGETS.scanchor=function(ks,KX,U){
  const H=U.H, K=KX.K, D=KX.data;
  const lg=H('div','sp-lg'); KX.legend.forEach((l,i)=>{ const d=H('div','s'+(i?2:1)); d.append(H('b','',l[0]),H('span','',l[1])); lg.append(d); }); ks.append(lg);
  const w=H('div','eh-wrap'); ks.append(w);
  const row=H('div','eh-row'); const lab=H('label'); const sp=H('span','',K.size); const val=H('b'); const r=H('input'); r.type='range'; r.min=0; r.max=2000; r.step=100; r.value=0; r.setAttribute('aria-label',K.size); lab.append(sp,val,r); row.append(lab); w.append(row);
  const pot=H('div','eh-qs'); pot.setAttribute('aria-hidden','true'); const cells=[]; for(let i=0;i<60;i++){ const c=H('span','eh-q'); pot.append(c); cells.push(c); } w.append(pot);
  const bars=H('div','eh-bars'); const mk=(name,cls)=>{ const b=H('div','eh-bar '+cls); const i=H('i'); b.append(i); const n=H('b'); bars.append(H('span','',name),b,n); return [i,n]; };
  const [bi,bn]=mk(K.bias,'m'), [ni,nn]=mk(K.noise,'g'), [ti,tn]=mk(K.total,'r'); w.append(bars);
  const out=H('p','eh-out'); out.setAttribute('aria-live','polite'); w.append(out);
  w.append(H('p','eh-note','מודל להמחשה: ההטיה מכוילת לשתי נקודות מה-POC (בלי עוגן 3.1+, עוגן של 800: 0.8+). מרווח הטעות לפי מספר התשובות בפאנל ואפקט התכנון. לא תחזית.'));
  const bias=n=>0.6+2.5*Math.exp(-n/300);
  const moe=n=>{ const att=D.budget-n*D.cost, resp=Math.max(200,1374*att/D.budget); const deff=n?1.5+300/(n+100):1.5; return 1.96*Math.sqrt(.25/resp)*100*Math.sqrt(deff); };
  function draw(){ const n=+r.value, b=bias(n), m=moe(n), t=Math.sqrt(b*b+(m/1.96)*(m/1.96)); val.textContent=n;
    const k=Math.round(n/2000*60); cells.forEach((c,i)=>{ c.className='eh-q'+(i<k?' g':' m'); });
    bi.style.width=(b/3.2*100)+'%'; bn.textContent=b.toFixed(1); ni.style.width=(m/6*100)+'%'; nn.textContent='±'+m.toFixed(1); ti.style.width=(t/3.6*100)+'%'; tn.textContent=t.toFixed(1);
    out.textContent=n===0?'בלי עוגן: הפאנל גדול, הרעש קטן, וההטיה של מי שעונה נשארת כולה (3.1 נקודות).':('עוגן של '+n+' איש עולה כמו '+(n*D.cost).toLocaleString('he-IL')+' ניסיונות בפאנל. ההטיה יורדת ל-'+b.toFixed(1)+', מרווח הטעות '+(m>3?'עולה':'כמעט לא זז')+' (±'+m.toFixed(1)+'). טעות כוללת צפויה: '+t.toFixed(1)+'.'); }
  r.addEventListener('input',draw); draw();
};

/* ---------- Turnout Signal: how many non-habitual voters show up this time ---------- */
window.SPEC_WIDGETS.tsmobilize=function(ks,KX,U){
  const H=U.H, K=KX.K, D=KX.data;
  const lg=H('div','sp-lg'); KX.legend.forEach((l,i)=>{ const d=H('div','s'+(i?2:1)); d.append(H('b','',l[0]),H('span','',l[1])); lg.append(d); }); ks.append(lg);
  const w=H('div','eh-wrap'); ks.append(w);
  const row=H('div','eh-row'); const lab=H('label'); const sp=H('span','',K.mob); const val=H('b'); const r=H('input'); r.type='range'; r.min=0; r.max=30; r.step=2; r.value=0; r.setAttribute('aria-label',K.mob); lab.append(sp,val,r); row.append(lab); w.append(row);
  const crowd=H('div','eh-seats'); const people=[]; for(let i=0;i<20;i++){ const e=H('div','eh-seat',i<14?'רגיל':'חדש'); crowd.append(e); people.push(e); } w.append(crowd);
  const bars=H('div','eh-bars'); const mk=(name,cls)=>{ const b=H('div','eh-bar '+cls); const i=H('i'); b.append(i); const n=H('b'); bars.append(H('span','',name),b,n); return [i,n]; };
  const [mi,mn]=mk(K.model,'g'), [si,sn]=mk(K.screen,'m'); w.append(bars);
  const out=H('p','eh-out'); out.setAttribute('aria-live','polite'); w.append(out);
  w.append(H('p','eh-note','קווים ישרים בין שתי נקודות מה-POC (בלי גיוס, ו-18 נקודות תוספת הגעה), בשאלת ההגעה לבדה. המחשה, לא תחזית.'));
  const lerp=(a,b,m)=>a+(b-a)*m/18;
  function draw(){ const m=+r.value, em=lerp(D.m0,D.m18,m), es=lerp(D.s0,D.s18,m); val.textContent='+'+m;
    people.forEach((e,i)=>e.classList.toggle('new',i>=14&&(i-14)<Math.round(m/5)));
    mi.style.width=Math.min(100,Math.abs(em)/10*100)+'%'; mn.textContent=(em>0?'+':'')+em.toFixed(1); si.style.width=Math.min(100,Math.abs(es)/10*100)+'%'; sn.textContent=(es>0?'+':'')+es.toFixed(1);
    out.textContent=m===0?'שנה רגילה: ההיסטוריה כמעט מדויקת (0.2+), הסולם מפספס ב-1.3-.':(Math.abs(em)>Math.abs(es)?'מכאן, המודל מפספס יותר מהסולם: ':'המודל עדיין מנצח, אבל מאבד: ')+'מודל '+em.toFixed(1)+', סולם '+es.toFixed(1)+'. מי שלא הצביע קודם מקבל אצל המודל משקל נמוך, בדיוק כשהוא בא.'; }
  r.addEventListener('input',draw); draw();
};
