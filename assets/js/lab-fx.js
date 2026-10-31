/* Fire-Sale POC, redesigned as a lab: four named experiments, an instrument panel, a hypotheses board, a Rube Goldberg machine,
   a fenced field for the limits, a split screen, an ethics dilemma, sealed hand-off envelopes, annotated code.
   Numbers: an exact JS port of cascade() in assets/py/fire_sale_poc.py over the same seeded worlds (window.LAB_FS),
   and an optional check that runs the real Python in the browser (Pyodide + NumPy) and compares. */
(function(){
  const root=document.querySelector('.pl[data-pl="fire-sale"]'); const L=window.LAB_FS; if(!root||!L) return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const H=(t,c,x)=>{ const e=document.createElement(t); if(c) e.className=c; if(x!=null) e.textContent=x; return e; };
  const sleep=ms=>new Promise(r=>setTimeout(r,reduce?Math.min(ms,20):ms));
  const secBy=k=>[...root.querySelectorAll('.pl-sec')].find(s=>{ const h=s.querySelector('.pl-h'); return h&&h.textContent.startsWith(k); });
  const tm=(id,w)=>`<button class="tm" data-t="${id}">${w}</button>`;

  /* ---------- exact port of cascade() ---------- */
  const DUR=18, DEPTH=200;
  function cascade(w,shock,cb){ cb=cb||0; const n=w.A.length; let A=w.A.slice(), E=w.E.slice(); const B=A.map((a,i)=>a-E[i]); const target=w.lev0.slice(); const alive=Array(n).fill(true), forced=Array(n).fill(false);
    let y=shock, cbUsed=0; const path=[+y.toFixed(3)], rounds=[], frames=[{y:0,ratio:w.lev0.map((v,i)=>v/w.lmax[i]),sold:[],dead:[]}];
    A=A.map(a=>a*Math.exp(-DUR*shock/100)); E=A.map((a,i)=>a-B[i]);
    for(let it=0;it<60;it++){ const lev=E.map((e,i)=>e>0?A[i]/Math.max(e,1e-12):Infinity);
      const dead=alive.map((al,i)=>al&&E[i]<=0), need=alive.map((al,i)=>al&&!dead[i]&&lev[i]>w.lmax[i]);
      const sell=A.map((a,i)=>need[i]?a-target[i]*E[i]:dead[i]?a:0);
      frames.push({y:+y.toFixed(3),ratio:lev.map((v,i)=>isFinite(v)?Math.min(v/w.lmax[i],9):9),sold:need.map((v,i)=>v?i:-1).filter(i=>i>=0),dead:dead.map((v,i)=>v?i:-1).filter(i=>i>=0)});
      for(let i=0;i<n;i++){ if(dead[i]) alive[i]=false; if(need[i]||dead[i]) forced[i]=true; }
      const total=sell.reduce((a,b)=>a+b,0); if(total<1e-6) break;
      A=A.map((a,i)=>a-sell[i]); for(let i=0;i<n;i++) B[i]-=Math.min(sell[i],B[i]);
      const absorbed=Math.min(total,Math.max(0,cb-cbUsed)); cbUsed+=absorbed; const dy=(total-absorbed)/DEPTH; y+=dy; path.push(+y.toFixed(3));
      rounds.push({sellers:need.filter((v,i)=>v||dead[i]).length,sold:total,absorbed,y});
      A=A.map(a=>a*Math.exp(-DUR*dy/100)); E=A.map((a,i)=>a-B[i]); if(dy<1e-4) break; }
    return {final:y,amp:y/shock,forced:forced.filter(Boolean).length/n,rounds,path,frames,cbUsed}; }

  /* ---------- 1 · intro ---------- */
  const hero=root.querySelector('.pl-hero');
  const intro=H('div','lb-intro');
  intro.innerHTML=`<div class="lb-what"><span class="lb-k">מה זה POC?</span><p>הוכחת היתכנות היא הגרסה הכי קטנה של הרעיון שעדיין בודקת את הדבר החשוב. כמו לבנות דגם של גשר מקרשים לפני שיוצקים בטון: לא בודקים איך הגשר ייראה, רק אם הוא מחזיק.</p></div>
   <div class="lb-what"><span class="lb-k">מה בודקים כאן?</span><p>שאלה אחת: האם מעגל של מכירות כפויות באמת מגדיל זעזוע קטן בריבית. בנינו לשם כך 60 קרנות מדומות, כולן עם ${tm('leverage','כסף מושאל')}, וכולן מחזיקות את אותה ${tm('bond','אג"ח')} ארוכה.</p></div>
   <div class="lb-sarah"><span class="lb-av" aria-hidden="true"><svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="28" fill="#e4efec"/><path d="M14 26 q2 -16 16 -16 q14 0 16 16 q-4 -6 -16 -6 q-12 0 -16 6z" fill="#8a5a3b"/><circle cx="30" cy="30" r="12" fill="#f2d2b6"/><circle cx="26" cy="29" r="1.6" fill="#1e2422"/><circle cx="34" cy="29" r="1.6" fill="#1e2422"/><path d="M26 35 q4 3 8 0" stroke="#1e2422" stroke-width="1.6" fill="none"/><path d="M12 58 q4 -14 18 -14 q14 0 18 14z" fill="#2f6f68"/></svg></span>
   <div><span class="lb-k">שרה מסבירה מה זה מנוף</span><p>"הקרן שלי מחזיקה 100 פאונד משלה, ולוותה עוד 400. זה מנוף פי 5. כל עוד המחירים יציבים זה מרוויח, אבל ירידה של 5% במחיר מוחקת רבע מהכסף שלה. ואז מתקשרים."</p>
   <div class="lb-lev" aria-hidden="true"><span class="own" style="flex:1">שלה 100</span><span class="bor" style="flex:4">מושאל 400</span></div></div></div>`;
  if(hero) hero.replaceWith(intro); else root.prepend(intro);

  /* ---------- 2 · four labs ---------- */
  const LABS=[
   {id:'uk',n:'מעבדה 1',t:'שחזור ספטמבר',hyp:'זעזוע קטן בריבית, בשוק שבו כולם עובדים עם כסף מושאל, יגדל מעצמו בגלל מכירות כפויות.',var:'זעזוע של 0.6 נקודת אחוז, כמו ביום שאחרי התקציב הבריטי. אף אחד לא מתערב.',
    who:['שרה, 52, מורה ממנצ\'סטר (בדויה)','23 בספטמבר 2022, הבוקר שאחרי התקציב. שרה שותה קפה ושומעת ברדיו שהריבית קפצה. בצהריים הקרן שלה כבר מוכרת, ביחד עם עשרות אחרות.'],proves:[0,4]},
   {id:'cb',n:'מעבדה 2',t:'היד שקונה',hyp:'אם מישהו גדול קונה את מה שנמכר, המעגל נשבר באמצע.',var:'אותו עולם ואותו זעזוע. הפעם בנק מרכזי קונה עד 40 יחידות ממה שנמכר.',
    who:['תום, 41, סוחר בבנק המרכזי (בדוי)','28 בספטמבר. הבוס של תום אומר לו מילה אחת: "תקנה". הוא לוחץ על הכפתור, ובפעם הראשונה השבוע המחיר מפסיק לצנוח. כך זה קרה באמת באותו יום.'],proves:[1,4]},
   {id:'flat',n:'מעבדה 3',t:'קבוצת ביקורת',hyp:'בלי כסף מושאל, אותו זעזוע לא יגרום לאף מכירה. אם הוא כן יגרום, הבעיה במודל ולא במנוף.',var:'60 קרנות כמעט בלי חוב: מנוף ממוצע 1.2.',
    who:['קרן משפחת כהן (בדויה)','לא לוותה שקל. כמו שכן שהדירה שלו כבר שלו: כשהמחירים יורדים, הדירה שווה פחות, אבל אף אחד לא מתקשר אליו לבקש עוד כסף.'],proves:[2],
    sci:'מה זו קבוצת ביקורת? בניסוי רפואי נותנים לחצי מהמשתתפים תרופה ולחצי כדור דמה. אם שתי הקבוצות מבריאות באותה מידה, התרופה לא עשתה כלום. כאן קבוצת הביקורת היא עולם בלי מנוף: אם גם בו הזעזוע גדל, המודל עצמו מנפח מספרים. בלי קבוצת ביקורת אי אפשר לסמוך על שום ניסוי.'},
   {id:'sweep',n:'מעבדה 4',t:'הספרה החסרה',hyp:'אם לא יודעים מה המנוף בשוק, התשובה לא תהיה מספר אחד אלא סיכוי, והסיכוי ישתנה בחדות.',var:'300 עולמות אקראיים לכל רמת מנוף ממוצע, מ-3.5 עד 5.5. בכל עולם אותו זעזוע של 0.6.',
    who:['אמה, 38, אנליסטית ברשות הפיקוח (בדויה)','היא לא יודעת מה המנוף הממוצע בשוק, ואף אחד לא יודע. במקום לנחש מספר אחד, היא מריצה 300 עולמות לכל ניחוש. כמו תחזית מזג אוויר: לא "ירד גשם", אלא "80% סיכוי לגשם".'],proves:[3]}];
  const CLAIMS=[
   ['זעזוע קטן נהיה גדול בגלל המכירות','זה כל הרעיון של הסימולטור: לראות את השרשרת, לא רק את הזעזוע.',0],
   ['קונה גדול שובר את המעגל','אם התערבות לא משנה כלום, אין טעם לבדוק תרחישי התערבות.',1],
   ['בלי מנוף, השוק נשאר שקט','בדיקת שפיות: המעגל צריך לנבוע מהמנוף, לא מהמודל.',2],
   ['התשובה קופצת בתוך נקודה אחת של מנוף','מכאן נולדת השאלה הגדולה: מאיפה יודעים את המנוף?',3],
   ['כל יחידה שנמכרה נספרת','כמו לספור את הקופה בסוף היום: כל יחידה שנמכרה חייבת להופיע אצל מי שקנה אותה. אם הספירה לא מסתדרת, יש באג.',0]];
  const labS=secBy('הרצה חיה'); const sec=H('section','pl-sec lb-sec'); sec.append(H('h5','pl-h','ארבע מעבדות'),H('p','lb-sub','כל מעבדה היא עמוד במחברת: השערה, מה משנים, מי עומד מאחורי הניסוי, ואז מרימים את מכסה הבטיחות ומפעילים. המספרים יוצאים מאותו קוד פייתון שאפשר להוריד למטה.'));
  const tabs=H('div','lb-tabs'); tabs.setAttribute('role','tablist'); sec.append(tabs);
  const page=H('div','lb-page'); sec.append(page);
  const journal=H('div','lb-journal'); journal.append(H('p','lb-jh','יומן מעבדה'),H('ol','lb-jl')); journal.querySelector('ol').append(H('li','lb-jempty','עוד לא הורצו ניסויים.'));
  const claimsBox=H('div','lb-claims'); const proved=new Set();
  claimsBox.append(H('p','lb-jh','לוח ההשערות'));
  const cEls=CLAIMS.map(([t,why,lab],i)=>{ const r=H('div','lb-claim'); r.append(H('span','lb-cst','ממתין'),H('b','',t),H('span','lb-cwhy',why)); const a=H('button','lb-cgo','נבדק במעבדה '+(lab+1)+' ←'); a.type='button'; a.addEventListener('click',()=>open(lab)); r.append(a); claimsBox.append(r); return r; });
  const prove=i=>{ if(proved.has(i)) return; proved.add(i); const r=cEls[i]; r.classList.add('ok'); r.querySelector('.lb-cst').textContent='הוכח ✓'; };
  sec.append(claimsBox,journal);
  if(labS) labS.replaceWith(sec); else root.append(sec);
  const chkS=root.querySelector('.pl-checks'); if(chkS) chkS.remove();
  let runs=0;
  LABS.forEach((lb,i)=>{ const b=H('button','lb-tab'); b.type='button'; b.setAttribute('role','tab'); b.append(H('small','',lb.n),H('strong','',lb.t)); b.addEventListener('click',()=>open(i)); tabs.append(b); });
  function open(i,quiet){ [...tabs.children].forEach((b,j)=>{ b.classList.toggle('on',j===i); b.setAttribute('aria-selected',j===i); }); build(LABS[i]); if(!quiet) page.scrollIntoView({behavior:reduce?'auto':'smooth',block:'nearest'}); }

  function build(lb){
    page.innerHTML=''; page.dataset.lab=lb.id;
    const nb=H('div','lb-nb');
    const left=H('div','lb-notes');
    left.append(H('p','lbx-title',lb.n+' · '+lb.t));
    const hy=H('div','lb-row'); hy.append(H('span','lb-k','השערה'),H('p','',lb.hyp)); left.append(hy);
    const vr=H('div','lb-row'); vr.append(H('span','lb-k','מה משנים'),H('p','',lb.var)); left.append(vr);
    const wh=H('div','lb-who'); wh.append(H('strong','',lb.who[0]),H('p','',lb.who[1])); left.append(wh);
    if(lb.sci){ const sc=H('div','lb-sci'); sc.append(H('span','lb-k','רגע של מדע'),H('p','',lb.sci)); left.append(sc); }
    // safety cover + run
    const ctl=H('div','lb-ctl'); const cover=H('button','lb-cover'); cover.type='button'; cover.setAttribute('aria-label','להרים את מכסה הבטיחות'); cover.innerHTML='<span class="lid">להרים מכסה</span><span class="btn">הפעלה</span>';
    ctl.append(cover); const again=H('button','lb-again','↻ להריץ שוב'); again.type='button'; again.hidden=true; ctl.append(again);
    const verify=H('button','lb-verify','לאמת עם הקוד האמיתי (Python בדפדפן)'); verify.type='button'; verify.hidden=true; ctl.append(verify);
    const vmsg=H('p','lb-vmsg'); vmsg.setAttribute('aria-live','polite'); ctl.append(vmsg);
    if(lb.id==='uk'){ const fx=H('div','lb-free'); fx.innerHTML='<label>ניסוי חופשי: גודל הזעזוע <b>0.6</b> נקודת אחוז<input type="range" min="0.1" max="1.2" step="0.1" value="0.6" aria-label="גודל הזעזוע"></label>'; ctl.append(fx); }
    left.append(ctl);
    const panel=H('div','lb-panel'); nb.append(left,panel); page.append(nb);
    if(lb.id==='sweep') panelSweep(panel); else panelTubes(panel);
    let armed=false;
    cover.addEventListener('click',async()=>{ if(!armed){ armed=true; cover.classList.add('open'); cover.setAttribute('aria-label','הפעלה'); return; } if(cover.disabled) return; cover.disabled=true; await go(); cover.disabled=false; again.hidden=false; verify.hidden=false; });
    again.addEventListener('click',async()=>{ again.disabled=true; await go(); again.disabled=false; vmsg.textContent='אותה תוצאה בדיוק, עד הספרה האחרונה. זו שחזוריות: בזכות seed קבוע, אותו ניסוי נותן תמיד אותה תוצאה.'; });
    verify.addEventListener('click',()=>verifyPy(lb,vmsg,verify));
    const fr=page.querySelector('.lb-free input'); if(fr){ fr.addEventListener('input',()=>{ page.querySelector('.lb-free b').textContent=(+fr.value).toFixed(1); }); fr.addEventListener('change',async()=>{ await go(+fr.value); }); }
    async function go(shock){ runs++; const res=lb.id==='sweep'?await panel._run():await panel._run(lb.id,shock);
      lb.proves.forEach(prove);
      const jl=journal.querySelector('ol'); const em=jl.querySelector('.lb-jempty'); if(em) em.remove();
      const t=new Date(); const hh=String(t.getHours()).padStart(2,'0')+':'+String(t.getMinutes()).padStart(2,'0')+':'+String(t.getSeconds()).padStart(2,'0');
      jl.prepend(H('li','',hh+' · '+lb.t+(shock&&shock!==0.6?' (זעזוע '+shock.toFixed(1)+')':'')+' · '+res));
      return res; }
  }

  /* instrument panel: 60 tubes */
  function panelTubes(p){
    p.innerHTML=`<div class="ip-top"><div class="ip-g"><svg viewBox="0 0 160 96" aria-hidden="true"><path d="M14 86 A66 66 0 0 1 146 86" class="ip-dial"/><path d="M14 86 A66 66 0 0 1 146 86" class="ip-zone" pathLength="1"/><line x1="80" y1="86" x2="80" y2="30" class="ip-needle"/><circle cx="80" cy="86" r="5" class="ip-hub"/></svg><span class="ip-gv">+0.00</span><span class="ip-gl">תשואה (נקודות אחוז)</span></div>
      <div class="ip-amp"><span class="ip-av">×1.00</span><span class="ip-gl">הגברה</span></div>
      <div class="ip-cnt"><span><b class="c-r">0</b>סבב</span><span><b class="c-f">0</b>קרנות מכרו</span><span><b class="c-u">0</b>יחידות נמכרו</span></div><span class="ip-live">LIVE</span></div>
      <div class="ip-tubes" aria-label="60 קרנות: הנוזל הוא המנוף, הקו הוא הסף"></div>
      <div class="ip-bottom"><div class="ip-scope"><svg viewBox="0 0 220 90" aria-hidden="true"><g class="ip-sg">${[0,1,2,3].map(i=>`<line x1="0" x2="220" y1="${i*30}" y2="${i*30}"/>`).join('')}</g><polyline class="ip-tr" points=""/></svg><span class="ip-gl">מוניטור התשואה, סבב אחרי סבב</span></div>
      <div class="ip-tape" aria-live="polite"><p class="ip-th">THE DIFFERENTIAL · LAB</p></div></div>
      <div class="ip-stamp" hidden></div>`;
    const tubes=p.querySelector('.ip-tubes'); const T=[];
    for(let i=0;i<60;i++){ const t=H('span','ip-t'); t.innerHTML='<i class="liq"></i><i class="thr"></i>'; tubes.append(t); T.push(t); }
    const needle=p.querySelector('.ip-needle'), gv=p.querySelector('.ip-gv'), av=p.querySelector('.ip-av'), cr=p.querySelector('.c-r'), cf=p.querySelector('.c-f'), cu=p.querySelector('.c-u'), tr=p.querySelector('.ip-tr'), tape=p.querySelector('.ip-tape'), stamp=p.querySelector('.ip-stamp'), live=p.querySelector('.ip-live');
    const setY=(y,shock)=>{ const a=-80+Math.min(1.4,y)/1.4*160; needle.style.transform=`rotate(${a}deg)`; gv.textContent='+'+y.toFixed(2); av.textContent='×'+(y/(shock||.6)).toFixed(2); av.classList.toggle('hot',y/(shock||.6)>1.5); };
    const fill=(fr,soldSet)=>T.forEach((t,i)=>{ const r=fr.ratio[i]; t.style.setProperty('--h',Math.min(1.25,r)/1.25); t.classList.toggle('over',r>1); t.classList.toggle('sold',soldSet.has(i)); t.classList.toggle('dead',fr.dead.includes(i)); });
    fill(L.frames.uk?{ratio:L.worlds.uk.lev0.map((v,i)=>v/L.worlds.uk.lmax[i]),dead:[]}:{ratio:[],dead:[]},new Set()); setY(0,.6);
    p._run=async(sc,shock)=>{ shock=shock||.6; const w=sc==='flat'?L.worlds.flat:L.worlds.uk; const r=cascade(w,shock,sc==='cb'?40:0);
      stamp.hidden=true; tape.querySelectorAll('.ip-l').forEach(x=>x.remove()); live.classList.add('on'); p.classList.add('running');
      const add=(t,c)=>{ const l=H('p','ip-l '+(c||''),t); tape.append(l); tape.scrollTop=tape.scrollHeight; };
      add('$ python fire_sale_poc.py  # '+(sc==='uk'?'September':sc==='cb'?'central bank':'control')+'  shock +'+shock.toFixed(1));
      const sold=new Set(); let units=0, pts=[[0,0]]; const X=i=>i*36, Yp=y=>88-Math.min(1.8,y)/1.8*84;
      fill(r.frames[0],sold); setY(0,shock); await sleep(500);
      add('זעזוע: +'+shock.toFixed(2)+' · מחיר האג"ח יורד'); setY(shock,shock); pts.push([1,shock]); tr.setAttribute('points',pts.map(([i,y])=>X(i)+','+Yp(y)).join(' '));
      for(let k=1;k<r.frames.length;k++){ const fr=r.frames[k]; fr.sold.forEach(i=>sold.add(i)); fill(fr,sold); await sleep(650);
        const rd=r.rounds[k-1]; if(!rd){ break; }
        units+=rd.sold; cr.textContent=k; cf.textContent=sold.size; cu.textContent=units.toFixed(1);
        add('סבב '+k+': '+rd.sellers+' קרנות מוכרות '+rd.sold.toFixed(1)+' יחידות'+(rd.absorbed>0?' · הבנק המרכזי קונה '+rd.absorbed.toFixed(1):''),rd.absorbed>0?'ok':'bad');
        await sleep(350); setY(rd.y,shock); pts.push([k+1,rd.y]); tr.setAttribute('points',pts.map(([i,y])=>X(i)+','+Yp(y)).join(' '));
        add('תשואה: +'+rd.y.toFixed(2)); await sleep(300); }
      if(r.rounds.length===0){ add('אף קרן לא עברה את הסף. אפס מכירות.','ok'); }
      const ok=Math.abs(r.rounds.reduce((a,b)=>a+b.sold,0)-(r.cbUsed+r.rounds.reduce((a,b)=>a+b.sold-b.absorbed,0)))<1e-6;
      add('סוף: +'+r.final.toFixed(2)+' · הגברה ×'+r.amp.toFixed(2)+' · '+Math.round(r.forced*100)+'% מהקרנות מכרו',r.amp>1.5?'bad':'ok');
      add('ספירת קופה: כל יחידה שנמכרה נקנתה '+(ok?'✓':'✗'),ok?'ok':'bad');
      live.classList.remove('on'); p.classList.remove('running');
      stamp.hidden=false; stamp.className='ip-stamp '+(r.amp>1.5?'hot':'ok'); stamp.textContent=sc==='flat'?'0.6 נכנס, 0.6 יצא · הוכח':sc==='cb'?'המעגל נשבר · הוכח':(r.amp>1.5?'ספירלה · הוכח':'נבלם');
      return '+'+r.final.toFixed(2)+', ×'+r.amp.toFixed(2); };
  }
  /* 300 worlds */
  function panelSweep(p){
    const lv=Object.keys(L.sweep);
    p.innerHTML=`<div class="sw-head"><span class="ip-gl">כל נקודה היא עולם אחד. הקו האדום: ספירלה (תשואה סופית מעל 1.5)</span><span class="ip-live">LIVE</span></div><div class="sw-rows"></div><div class="ip-stamp" hidden></div>`;
    const rows=p.querySelector('.sw-rows'); const R=lv.map(l=>{ const r=H('div','sw-row'); r.append(H('span','sw-l','מנוף '+l)); const s=H('div','sw-strip'); const th=H('i','sw-th'); th.style.insetInlineStart=((1.5-0.5)/(2-0.5)*100)+'%'; s.append(th); r.append(s,H('b','sw-p','?')); rows.append(r); return {s,pv:r.querySelector('.sw-p'),l}; });
    const st=p.querySelector('.ip-stamp'), live=p.querySelector('.ip-live');
    p._run=async()=>{ st.hidden=true; live.classList.add('on');
      for(const r of R){ r.s.querySelectorAll('.sw-d').forEach(x=>x.remove()); r.pv.textContent='…'; }
      for(const r of R){ const vals=L.sweep[r.l]; const frag=document.createDocumentFragment();
        vals.forEach((v,i)=>{ const d=H('i','sw-d'+(v>1.5?' hot':'')); d.style.insetInlineStart=(Math.max(0,Math.min(1,(v-.5)/1.5))*100)+'%'; d.style.top=(8+((i*37)%28))+'px'; d.style.animationDelay=(reduce?0:(i%60)*8)+'ms'; frag.append(d); });
        r.s.append(frag); const p_=vals.filter(v=>v>1.5).length/vals.length; await sleep(700); r.pv.textContent=Math.round(p_*100)+'%'; r.pv.classList.toggle('hot',p_>=.5); }
      live.classList.remove('on'); st.hidden=false; st.className='ip-stamp hot'; st.textContent='זה תלוי · הוכח';
      return '4.0: '+R[1].pv.textContent+' · 5.0: '+R[3].pv.textContent; };
  }
  /* optional: run the real Python and compare */
  let pyP=null;
  function verifyPy(lb,msg,btn){
    btn.disabled=true; msg.textContent='טוען Python ו-NumPy בדפדפן… בפעם הראשונה זה לוקח כמה שניות.';
    if(!pyP){ pyP=new Promise((res,rej)=>{ const s=document.createElement('script'); s.src='https://cdn.jsdelivr.net/npm/pyodide@314.0.7/pyodide.js'; s.onload=async()=>{ try{ const py=await loadPyodide(); await py.loadPackage(['numpy']); py.FS.writeFile('fire_sale_poc.py',(window.POC_SRC&&window.POC_SRC['fire-sale'])||''); res(py); }catch(e){ rej(e); } }; s.onerror=()=>rej(new Error('net')); document.head.append(s); }); pyP.catch(()=>{ pyP=null; }); }
    pyP.then(py=>{ const out=JSON.parse(py.runPython('import json,fire_sale_poc\njson.dumps(fire_sale_poc.run("'+lb.id+'"))'));
      const rec=L.runs[lb.id]; const same=JSON.stringify(out.checks)===JSON.stringify(rec.checks)&&out.events.length===rec.events.length&&out.events.every((e,i)=>e.log===rec.events[i].log);
      msg.textContent=same?'אומת ✓ הפייתון רץ עכשיו בדפדפן שלכם, ונתן בדיוק את אותן שורות ואותן הוכחות.':'הפייתון רץ, אבל התוצאה שונה מההקלטה. זה באג, ונשמח לשמוע עליו.'; btn.disabled=false; })
     .catch(()=>{ msg.textContent='לא הצלחנו לטעון את Python בדפדפן (צריך חיבור לאינטרנט). המספרים כאן הם מאותו קוד, באותו seed.'; btn.disabled=false; });
  }
  open(0,true);

  /* ---------- 3 · who takes part: a Rube Goldberg machine ---------- */
  const compS=secBy('מי משתתף');
  if(compS){ const s=H('section','pl-sec mc-sec'); s.append(H('h5','pl-h','מי משתתף: מכונה של ארבע תחנות'),H('p','lb-sub','בתוך הקוד עובדות ארבע תחנות, ממש כמו מכונה. לחצו על תחנה כדי לקרוא מה היא עושה, ונסו להוציא אותה מהמכונה.'));
    const ST=[['factory','בית החרושת לעולמות','World Builder','בונה 60 קרנות, ולכל אחת כסף משלה, מנוף וסף שמעליו היא חייבת למכור.','בלי בית החרושת אין שוק לדמות. המכונה עומדת ריקה.'],
      ['wheel','הגלגל שמסובב את הסבבים','Cascade Loop','בכל סיבוב: משערך את הקרנות, בודק מי עברה את הסף, ומוכר בשמה. ואז חוזר חלילה.','בלי הגלגל רואים רק את הזעזוע הראשון. אין סבב שני, אין שרשרת.'],
      ['scale','המאזניים','Price Impact','מתרגמים כמה נמכר לכמה התשואה זזה: 200 יחידות שנמכרות מזיזות את התשואה בנקודת אחוז.','בלי המאזניים, מכירה של קרן אחת לא נוגעת באחרת. הדומינו לא נופל.'],
      ['dice','קוביות 300 העולמות','Sweep','מטילות 300 עולמות אקראיים לכל רמת מנוף, ומחזירות סיכוי במקום מספר בודד.','בלי הקוביות נשאר מספר אחד, שנראה בטוח הרבה יותר ממה שהוא.']];
    const m=H('div','mc'); const det=H('div','mc-det'); det.setAttribute('aria-live','polite'); det.innerHTML='<p>לחצו על תחנה.</p>';
    const ICO={factory:'<rect x="6" y="22" width="40" height="22" rx="2"/><path d="M6 22 l10 -8 v8 l10 -8 v8 l10 -8 v8"/><rect x="38" y="6" width="6" height="16"/>',wheel:'<circle cx="26" cy="26" r="17"/><circle cx="26" cy="26" r="4"/><path d="M26 9 v34 M9 26 h34 M14 14 l24 24 M38 14 l-24 24"/>',scale:'<path d="M26 8 v34 M14 42 h24 M8 16 h36"/><path d="M8 16 l-5 10 h10z M44 16 l-5 10 h10z"/>',dice:'<rect x="8" y="8" width="22" height="22" rx="4"/><rect x="22" y="22" width="22" height="22" rx="4"/><circle cx="14" cy="14" r="2"/><circle cx="24" cy="24" r="2"/><circle cx="28" cy="28" r="2"/><circle cx="38" cy="38" r="2"/>'};
    const out=new Set();
    ST.forEach(([k,he,en,what,without],i)=>{ const st=H('div','mc-st'); st.style.setProperty('--i',i);
      const b=H('button','mc-b'); b.type='button'; b.innerHTML=`<svg viewBox="0 0 52 52" aria-hidden="true">${ICO[k]}</svg>`; b.append(H('strong','',he),H('small','',en));
      const pull=H('button','mc-pull','להוציא מהמכונה'); pull.type='button';
      b.addEventListener('click',()=>{ m.querySelectorAll('.mc-st').forEach(x=>x.classList.toggle('sel',x===st)); det.innerHTML=''; det.append(H('strong','',he+' · '+en),H('p','',what)); if(out.has(k)) det.append(H('p','mc-bad',without)); });
      pull.addEventListener('click',()=>{ if(out.has(k)){ out.delete(k); st.classList.remove('out'); pull.textContent='להוציא מהמכונה'; } else { out.add(k); st.classList.add('out'); pull.textContent='להחזיר'; }
        m.classList.toggle('broken',out.size>0); det.innerHTML=''; det.append(H('strong','',out.has(k)?'הוצאתם את '+he:'החזרתם את '+he),H('p',out.has(k)?'mc-bad':'',out.has(k)?without:'המכונה עובדת שוב.')); });
      st.append(b,pull); m.append(st); if(i<ST.length-1) m.append(H('span','mc-belt')); });
    s.append(m,det); compS.replaceWith(s); }

  /* ---------- 4 · the limits: a fenced field ---------- */
  const limS=secBy('גבולות ה-POC');
  if(limS){ const s=H('section','pl-sec fn-sec'); s.append(H('h5','pl-h','גבולות ה-POC'));
    s.append(H('p','lb-sub','POC בודק דבר אחד, ומשאיר בכוונה את כל השאר בחוץ. מה שבחוץ לא נשכח: הוא רק נדחה לשלב הבא, לאפיון.'));
    const f=H('div','fn'); const inside=H('div','fn-in'); inside.append(H('span','fn-tag','בתוך הגדר: מה שבדקנו'));
    [['מעגל של מנוף, מכירה והשפעת מחיר','הלב: קרן מוכרת, המחיר יורד, הקרן הבאה מוכרת.'],['בנק מרכזי עם תקרת קנייה','קונה עד 40 יחידות, כמו ב-28 בספטמבר.'],['סריקה על מנוף לא ידוע','300 עולמות לכל ניחוש.']].forEach(([a,b])=>{ const c=H('div','fn-item'); c.append(H('b','',a),H('span','',b)); inside.append(c); });
    const outside=H('div','fn-out');
    [['בנקים, מבטחים וקרנות כספיות','כל סוג גוף מתנהג אחרת בלחץ, כמו שמשאית בולמת אחרת מאופניים. נוסיף אותם באפיון.'],['חובות ישירים בין גופים','כשקרן אחת לא מחזירה לשנייה, הנזק עובר גם בלי מחירים. ערוץ שני, באפיון.'],['כיול סטטיסטי מול 2022','כאן השחזור הוא "בעין". כיול אמיתי צריך נתונים ושיטה, וזה עבודה של אפיון.']].forEach(([a,b],i)=>{ const c=H('div','fn-note'); c.style.setProperty('--i',i); c.append(H('span','fn-stk','לאפיון'),H('b','',a),H('span','',b)); outside.append(c); });
    f.append(outside,inside); s.append(f); limS.replaceWith(s); }

  /* ---------- 5 · how it differs: split screen ---------- */
  const vsS=secBy('במה זה שונה');
  if(vsS){ const s=H('section','pl-sec'); s.append(H('h5','pl-h','במה זה שונה'));
    const g=H('div','vs2');
    const a=H('div','vs-side official'); a.innerHTML='<span class="vs-k">התרגיל הרשמי (SWES, הבנק המרכזי הבריטי)</span><div class="vs-pics"><span class="vs-cal" aria-hidden="true"><i></i><i></i><i></i><b>חודשים</b></span><span class="vs-safe" aria-hidden="true"><i></i><b>נתונים חסויים</b></span></div><p>עבד עם נתונים אמיתיים וחסויים של הבנקים והקרנות, ולקח חודשים. נעשה פעם אחת.</p>';
    const b=H('div','vs-side ours'); b.innerHTML='<span class="vs-k">המעבדה שלנו</span><div class="vs-pics"><span class="vs-watch" aria-hidden="true"><b>0.28 שנ\'</b><small>ל-1,000 הרצות</small></span><span class="vs-box" aria-hidden="true"><i></i><b>פתוח, אבל ריק</b></span></div><p>סימולציה לוקחת שבריר שנייה, ואפשר לשאול "מה אם" שוב ושוב. אבל בלי הנתונים האמיתיים.</p>';
    g.append(a,H('span','vs-vs','מול'),b); s.append(g); s.append(H('p','vs-q','מה שווה מהירות, בלי הנתונים שהתשובה תלויה בהם?')); vsS.replaceWith(s); }

  /* ---------- 6 · ethics: what would you do? ---------- */
  const ethS=secBy('שאלה אתית');
  if(ethS){ const s=H('section','pl-sec et-sec'); s.append(H('h5','pl-h','שאלה אתית: מה הייתם עושים?'));
    const ph=H('div','et-phone'); const sc=H('div','et-screen'); ph.append(sc);
    const head=H('div','et-news'); head.append(H('span','et-src','חדשות · עכשיו'),H('strong','','סימולציה: "קרן הפנסיה של עובדי הנמל תקרוס"')); sc.append(head);
    const feed=H('div','et-feed'); sc.append(feed);
    const side=H('div','et-side'); side.append(H('p','','דמיינו שהסימולטור מראה שקרן מסוימת, בשמה, עלולה לקרוס, והתוצאה מתפרסמת. מה קורה בבוקר שאחרי?'));
    const play=H('button','et-play','לראות מה קורה ←'); play.type='button'; side.append(play);
    const ch=H('div','et-choice'); ch.hidden=true; ch.append(H('p','','אתם מחליטים: מה הכלי שלנו צריך לעשות?'));
    const pub=H('button','et-c','לפרסם שמות של קרנות'), anon=H('button','et-c','להסתיר שמות'); pub.type=anon.type='button'; ch.append(pub,anon); side.append(ch);
    const ans=H('div','et-ans'); ans.hidden=true; side.append(ans);
    play.addEventListener('click',async()=>{ play.disabled=true; const M=['📲 "שמעת על הקרן של הנמל?"','📲 "אני מושך את הכסף, ליתר ביטחון"','📲 עוד 200 בקשות משיכה בשעה האחרונה','📲 "הקרן מוכרת אג"ח כדי לשלם למושכים"','📲 המחיר יורד. עכשיו גם הקרן השכנה בלחץ'];
      for(const t of M){ const n=H('p','et-n',t); feed.append(n); await sleep(650); }
      side.insertBefore(H('p','et-note','זו נבואה שמגשימה את עצמה: התחזית יצרה את הבהלה שהיא תיארה. וזה קרה באמת: ב-SVB, הודעות ברשתות החברתיות האיצו את ריצת המשיכות, ו-42 מיליארד דולר ביקשו לצאת ביום אחד.'),ch); ch.hidden=false; });
    const decide=pubIt=>{ ans.hidden=false; ans.innerHTML=''; ans.append(H('strong','',pubIt?'זה מה שרצינו למנוע.':'זו גם הבחירה שלנו.'),H('p','','לכן הכלי עובד רק על קרנות אנונימיות, בלי שמות של גופים אמיתיים. "קרן פנסיה מסוג א" ולא "קרן הנמל".'));
      head.querySelector('strong').textContent='סימולציה: "קרן פנסיה מסוג א תחת לחץ"'; head.classList.add('blur'); };
    pub.addEventListener('click',()=>decide(true)); anon.addEventListener('click',()=>decide(false));
    const w=H('div','et'); w.append(ph,side); s.append(w); ethS.replaceWith(s); }

  /* ---------- 7 · hand-off envelopes ---------- */
  const openS=secBy('מה עובר לאפיון');
  if(openS){ const s=H('section','pl-sec'); s.append(H('h5','pl-h','מה עובר לאפיון: שתי מעטפות חתומות'),H('p','lb-sub','מה שה-POC לא פתר לא נזרק. הוא נכנס למעטפה, ונמסר לשלב הבא. לחצו כדי לפתוח.'));
    const E=[['מאיפה המנוף?','התשובה תלויה כמעט לגמרי במנוף הממוצע בשוק, ואותו אנחנו לא רואים. מעבדה 4 הראתה שבתוך נקודה אחת התשובה קופצת מ"בטוח" ל"קריסה". האפיון יצטרך להחליט מאיפה מביאים את המספר הזה.'],
             ['שחזור "בעין"','"פי 1.88" הוא התאמה בעין לאירוע של 2022, לא כיול. כמו לכוון גיטרה לפי האוזן ולא לפי מכשיר כיוון: זה נשמע נכון, אבל זה לא מדויק. לכן אסור לקרוא את המספר הזה כאמירה על 2022.']];
    const g=H('div','env-g');
    E.forEach(([t,d],i)=>{ const e=H('button','env'); e.type='button'; e.style.setProperty('--i',i); e.setAttribute('aria-expanded','false');
      e.innerHTML='<span class="env-back"></span><span class="env-flap"></span><span class="env-seal">לאפיון</span><span class="env-letter"><b></b><span></span></span>';
      e.querySelector('.env-letter b').textContent=t; e.querySelector('.env-letter span').textContent=d;
      const lab=H('span','env-lab',t); e.append(lab);
      e.addEventListener('click',()=>{ const o=e.classList.toggle('open'); e.setAttribute('aria-expanded',o); }); g.append(e); });
    s.append(g); openS.replaceWith(s); }

  /* ---------- 8 · what's in the code: annotated snippets ---------- */
  const techS=secBy('מה בקוד');
  if(techS){ const s=H('section','pl-sec cd-sec'); s.append(H('h5','pl-h','מה בקוד'),H('p','lb-sub','שלושה קטעים מהקוד האמיתי. ליד כל שורה חשובה יש הסבר בעברית.'));
    const SN=[
     ['הקרנות: כל אחת עם כסף, מנוף וסף',[['e = rng.dirichlet(np.ones(n)) * equity_total','מחלקים את כל הכסף בשוק בין 60 קרנות, כל אחת בגודל אחר.'],['lev = np.clip(rng.normal(lev_mean, lev_sd, n), 1.05, None)','מגרילים לכל קרן מנוף סביב הממוצע, ולפחות 1.05.'],['lmax = lev * rng.uniform(1.2, 1.5, n)','הסף: מעליו הקרן חייבת למכור. בין 20% ל-50% מעל המנוף שלה.']]],
     ['הלב: מי עבר את הסף, ומה הוא מוכר',[['need = alive & ~dead & (lev > w["lmax"])','מסמנים כל קרן שהמנוף שלה עבר את הסף.'],['sell[need] = A[need] - target[need] * E[need]','כל אחת מוכרת בדיוק מספיק כדי לחזור למנוף המקורי שלה.'],['dy = (total - absorbed) / DEPTH','מה שלא נקנה על ידי הבנק המרכזי מזיז את התשואה.']]],
     ['ספירת הקופה',[['"conserved": abs(sold_total - (cb_used + to_market)) < 1e-6','כל יחידה שנמכרה חייבת להופיע אצל מי שקנה: הבנק המרכזי או השוק. אם לא, זה באג.']]]];
    SN.forEach(([h,rows])=>{ const c=H('div','cd-card'); c.append(H('p','cd-h',h)); rows.forEach(([code,he])=>{ const r=H('div','cd-row'); const cd=H('code','',code); cd.setAttribute('dir','ltr'); r.append(cd,H('span','cd-he',he)); c.append(r); }); s.append(c); });
    const chips=H('div','cd-chips');
    [['Python + NumPy','כל המאזנים במערכים, וכל סבב הוא כמה פעולות חשבון על כל הקרנות בבת אחת.'],['seed קבוע','כמו מתכון: אותו מתכון נותן אותה עוגה. אותה הרצה נותנת תמיד אותה תוצאה, וכך כל אחד יכול לבדוק.'],['בדיקת שימור','ספירת הקופה שמופיעה בכל הרצה, ומונעת מספרים שנוצרים יש מאין.']].forEach(([a,b])=>{ const d=H('div','cd-chip'); d.append(H('b','',a),H('span','',b)); chips.append(d); });
    const sw=H('div','cd-watch'); sw.innerHTML='<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="33" r="22"/><path d="M30 33 L30 16"/><rect x="26" y="4" width="8" height="6" rx="1"/></svg><span><b>0.28</b> שניות</span><small>ל-1,000 הרצות על מחשב רגיל</small>';
    chips.append(sw); s.append(chips);
    const det=techS.querySelector('details'); if(det) s.append(det);
    techS.replaceWith(s); }

  /* ---------- 9 · downloads ---------- */
  const dlS=secBy('הורדה');
  if(dlS&&window.fxDownloads){ const s=H('section','pl-sec'); s.append(H('h5','pl-h','הורדה')); s.append(window.fxDownloads('fire-sale','poc','מסמך ה-POC','The POC document','המטרה, הרכיבים, הגבולות והמסקנה.','Goal, components, limits and conclusion.',{he:3,en:4},[['../../assets/py/fire_sale_poc.py','קוד · fire_sale_poc.py']])); dlS.replaceWith(s); }
  if(window.TermWin) window.TermWin.wire(root);
})();
