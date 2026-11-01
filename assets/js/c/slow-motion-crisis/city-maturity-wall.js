/* Case 02 · Maturity Wall spec city (config for city.js). Act 1 is a street of fixed-rate mortgages renewing at the bank.
   Keys: cls, intro html, lm (landmark texts), icons {1..10: svg inner}, modes [[key,label]], act1 {html, setup(ctx) -> {stop}}, act2 html,
   waze {1..10: the parallel in act 1}, wazeLabel, ex {1..10: a concrete example}, models(api) -> {1..10: fn(box)} */
window.CITY=window.CITY||{};
window.CITY['maturity-wall']={
 cls:'cy-mw',
 intro:tm=>`<p class="cy-k">פרק 3 · אפיון</p><h4 class="cy-h">עשרה פיצ'רים, וקיר אחד שכולם יכולים לראות</h4>
   <p>אחרי שה-POC הראה שהחישוב המלא משנה את התשובה, כותבים <b>אפיון</b>: מסמך שמתאר את המוצר המלא, פיצ'ר אחרי פיצ'ר, כאילו מחר מתחילים לבנות אותו. <b>פיצ'ר</b> הוא יכולת אחת של המוצר, למשל "לקרוא את הקובץ של משרד החוב הצרפתי" או "לצבוע כל אג"ח לפי כמה יקר להחליף אותה".</p>
   <div class="cy-emma"><span class="cy-av" aria-hidden="true"><svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="28" fill="#f3ecd8"/><circle cx="30" cy="27" r="12" fill="#d8a985"/><path d="M17 25 q1 -15 13 -15 q13 0 13 15 q-4 -6 -13 -6 q-9 0 -13 6z" fill="#1f1a17"/><circle cx="26" cy="27" r="1.5" fill="#1e2422"/><circle cx="34" cy="27" r="1.5" fill="#1e2422"/><path d="M26 33 q4 2.5 8 0" stroke="#1e2422" stroke-width="1.5" fill="none"/><path d="M12 58 q4 -16 18 -16 q14 0 18 16z" fill="#b1502e"/></svg></span>
   <div><span class="cy-k">בוקר של הצעת תקציב</span><p>נועה (בדויה), עיתונאית כלכלית, צריכה עד הצהריים מספר אחד: כמה מהתקציב החדש של צרפת ייבלע בגלל החלפת החוב הזול ביקר. ה-POC הראה שהחישוב עובד על מדינה מדומה. עכשיו צריך מוצר שלם: מי מביא את רשימת האג"ח האמיתית, איך יודעים שהיא נכונה, ואיך נועה יכולה לצטט תוצאה שכל קורא יוכל לבדוק.</p></div></div>
   <div class="cy-prom"><span>מה המוצר מבטיח:</span><p>לכל מדינה, ${tm('bond','אג"ח')} אחר אג"ח: כמה חוב פוקע בכל שנה, כמה יעלה להחליף אותו בכל תרחיש של ריבית, ומתי החוב מתחיל לגדול מעצמו. כל תוצאה עם ההנחות שלה, וקישור שמשחזר אותה. ומה שהוא לא מבטיח כתוב במפורש: הוא לא מנבא את הריבית. הוא מראה מה יקרה אם היא תהיה כך או אחרת.</p></div>
   <p class="cy-acts">שלוש מערכות: <b>1</b> סיפור מקביל שכולם מכירים · <b>2</b> עיר הפיצ'רים · <b>3</b> חדר לכל פיצ'ר. מוכנים?</p>`,
 lmKn:'המחוון החי: הקיר בפעולה',
 icons:{1:'<path d="M-10 -8 h14 l6 6 v14 h-20z M4 -8 v6 h6"/><path d="M-6 2 h10 M-6 6 h8"/>',2:'<path d="M0 -10 v18 M-10 -6 h20 M-10 -6 l-3 7 h6z M10 -6 l-3 7 h6z M-5 9 h10"/>',3:'<path d="M-10 -8 h20 v6 h-20z M-10 -2 h20 v6 h-20z M-10 4 h20 v6 h-20z"/>',4:'<path d="M-11 8 Q-4 -6 11 -8"/><path d="M-11 10 h22 M-11 10 v-20"/>',5:'<path d="M-8 -2 a8 8 0 1 1 3 7 M-10 2 l2 -4 l4 2"/>',6:'<circle cx="-5" cy="5" r="5"/><circle cx="7" cy="5" r="5"/><path d="M-5 5 l5 -10 h5 M2 5 l-2 -10"/>',7:'<path d="M-10 -6 h8 M2 -6 h8 M-6 -6 l-4 8 h8z M6 -6 l-4 8 h8z M0 -10 v18"/>',8:'<rect x="-10" y="2" width="9" height="6"/><rect x="1" y="2" width="9" height="6"/><rect x="-5" y="-5" width="9" height="6"/><rect x="-10" y="-12" width="9" height="6"/>',9:'<path d="M-8 -10 h16 v20 l-4 -3 l-4 3 l-4 -3 l-4 3z M-4 -4 h8 M-4 1 h6"/>',10:'<circle cx="0" cy="0" r="10"/><path d="M0 -6 v6 l4 3"/>'},
 modes:[['waze','הרחוב'],['market','המוצר'],['both','שניהם']],
 wazeLabel:'ברחוב',
 act1:{html:`<p class="cy-k">מערכה 1 · רחוב של משכנתאות</p>
   <p>דמיינו רחוב שבו לכל בית יש משכנתא בריבית קבועה. כל משפחה לקחה אותה בשנה אחרת, ולכן כל אחת נגמרת בשנה אחרת. כשהמשכנתא נגמרת והכסף עדיין חסר, המשפחה עוברת בבנק ולוקחת חדשה, בריבית של אותו יום. מה קורה להחזר של כל הרחוב, כשהריבית היום גבוהה מזו שהייתה פעם?</p>
   <div class="cy-ctl"><button type="button" class="cy-btn go" data-a="vote">▶ להריץ את השנים</button><button type="button" class="cy-btn" data-a="peek">מה אומר קיצור הדרך?</button></div>
   <label class="cy-dens">הריבית שהבנק מציע היום: <b>3.5%</b><input type="range" min="1" max="6" step="0.5" value="3.5" aria-label="ריבית היום"></label>
   <div class="cy-meters"><span><b class="m-v">2026</b>השנה</span><span><b class="m-s">0</b>משכנתאות חודשו</span><span class="cy-eta"><b class="m-r">?</b>הריבית הממוצעת ברחוב</span></div>
   <p class="rg-out" aria-live="polite">כל בית צבוע לפי הריבית שהוא משלם: כחול זול, אדום יקר. לחצו "להריץ את השנים".</p>
   <figure class="cy-nagoya"><svg viewBox="0 0 120 80" aria-hidden="true"><rect x="10" y="40" width="22" height="22" class="ng-track"/><path d="M6 40 l15 -12 l15 12z" class="ng-track"/><rect x="49" y="40" width="22" height="22" class="ng-track"/><path d="M45 40 l15 -12 l15 12z" class="ng-track"/><rect x="88" y="40" width="22" height="22" class="ng-track"/><path d="M84 40 l15 -12 l15 12z" class="ng-track"/><circle cx="60" cy="16" r="8" class="ng-car j"/></svg>
   <figcaption><b>זה קורה באמת.</b> בבריטניה רוב המשכנתאות קבועות לשנתיים או לחמש שנים. כשהריבית קפצה ב-2022, ההחזר לא קפץ אצל כולם באותו יום: הוא עלה בכל חודש אצל עוד משפחות, בדיוק כשהתקופה הקבועה שלהן נגמרה. נסו בעצמכם: הורידו את הריבית של היום ל-2%, ותראו אם הרחוב באמת מתקרר.</figcaption></figure>
   <details class="cy-map"><summary>מה ברחוב מקביל למה אצלנו</summary><table><tbody>
   <tr><td>בית עם משכנתא</td><td>אג"ח אחת של המדינה</td></tr><tr><td>הריבית הקבועה שנחתמה</td><td>הקופון של האג"ח</td></tr><tr><td>השנה שבה המשכנתא נגמרת</td><td>תאריך הפקיעה</td></tr><tr><td>הבנק שמציע ריבית חדשה</td><td>השוק, והתשואה של אותה שנה</td></tr><tr><td>ההחזר של כל הרחוב</td><td>הריבית על החוב, באחוזים מהתמ"ג</td></tr><tr><td>"הרחוב משלם בממוצע 1.5%"</td><td>קיצור הדרך של הריבית הקפואה</td></tr><tr><td>המשכורות של הרחוב</td><td>הצמיחה של המדינה</td></tr></tbody></table></details>
   <p class="cy-bridge">ברחוב יש 24 בתים, ואפשר לספור אותם בראש. למדינה יש מאות אג"ח, וכל אחת מתחדשת בתאריך אחר. כדי לחשב את זה בשביל מדינה אמיתית צריך מוצר: מי מביא את הרשימה, איך יודעים שהיא נכונה, ומה מראים לנועה.</p>
   <button type="button" class="cy-morph">עכשיו נחליף את הבתים באג"ח ←</button>`,
   setup(ctx){ const {S,H,iso,R,cam,ringPath,pW,stage,reduce}=ctx; const pathLen0=0;
  // households on the ring, and the bank where mortgages renew
  const W0=window.LAB_MW||{bonds:[]};
  const carG=S('g',{class:'cy-cars mw-homes',transform:'translate(0,-14)'},cam);
  const STN=[[90,'הבנק','bank']];
  const stG=S('g',{class:'rg-stns',transform:'translate(0,-14)'},cam);
  STN.forEach(([ang,lab])=>{ const t=ang*Math.PI/180; const [a,b]=iso(5+(R-0.9)*Math.cos(t),5+(R-0.9)*Math.sin(t)); const g=S('g',{class:'rg-stn mw-bank',transform:`translate(${a} ${b})`},stG);
    S('rect',{x:-16,y:-24,width:32,height:24,rx:2},g); S('path',{d:'M-20 -24 h40 l-20 -12z'},g); const tx=S('text',{x:0,y:14,'text-anchor':'middle'},g); tx.textContent=lab; });
  let cars=[];

  /* ---------- the street model ---------- */
  const pathLen=ringPath.getTotalLength(); const AT=STN.map(x=>x[0]/360);
  const pick=W0.bonds.filter(b=>b[1]>=2027&&b[1]<=2040); const HOMES=Array.from({length:24},(_,i)=>{ const b=pick[Math.floor(i*pick.length/24)]||[2000,2027+(i%14),1,1]; return {mat:b[1],cpn:Math.max(0,b[2])}; });
  const col=r=>{ const k=Math.max(0,Math.min(1,r/5)); const A=[36,64,142],B=[177,80,46]; return 'rgb('+A.map((v,i)=>Math.round(v+(B[i]-v)*k)).join(',')+')'; };
  let TODAY=3.5, year=2026, renewed=0, run=false, last=0, clock=0;
  const avg0=HOMES.reduce((a,h)=>a+h.cpn,0)/HOMES.length;
  function setHomes(){ carG.textContent=''; cars=[]; year=2026; renewed=0; clock=0; HOMES.forEach((h,i)=>{ const g=S('g',{class:'mw-h'},carG); const body=S('rect',{x:-5,y:-7,width:10,height:8},g); const roof=S('path',{d:'M-7 -7 l7 -6 l7 6z'},g);
      cars.push({f:(i/HOMES.length+AT[0]+0.002)%1,rate:h.cpn,mat:h.mat,g,body,roof}); }); paint(); place(); upd(); }
  function paint(){ cars.forEach(c=>{ c.body.setAttribute('fill',col(c.rate)); c.roof.setAttribute('fill',col(c.rate)); }); }
  function place(){ cars.forEach(c=>{ const p=ringPath.getPointAtLength(c.f*pathLen); c.g.setAttribute('transform',`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) scale(1.7)`); }); }
  const mv=pW.querySelector('.m-v'), ms=pW.querySelector('.m-s'), mr=pW.querySelector('.m-r'), out=pW.querySelector('.rg-out');
  const avg=()=>cars.reduce((a,c)=>a+c.rate,0)/cars.length;
  function upd(){ mv.textContent=year; ms.textContent=renewed+' / '+cars.length; mr.textContent=avg().toFixed(2)+'%'; }
  const SP=0.3;
  function step(dt){ clock+=SP*dt; const ny=2026+Math.min(10,Math.floor(clock)); if(ny!==year){ year=ny; }
    cars.forEach(c=>{ const before=c.f; c.f=(c.f+SP*dt)%1; const pass=before<AT[0]&&(c.f>=AT[0]||c.f<before)||(c.f<before&&AT[0]>before);
      if(pass&&c.mat<=year&&!c.done){ c.done=true; c.rate=TODAY; c.mat=year+10; renewed++; c.body.setAttribute('fill',col(c.rate)); c.roof.setAttribute('fill',col(c.rate)); c.g.classList.add('pop'); setTimeout(()=>c.g.classList.remove('pop'),600); } }); upd(); }
  function loop(t){ if(!run) return; const dt=Math.min(.05,(t-last)/1000||.016); last=t; step(dt); place(); if(clock>=10){ run=false; done(); return; } requestAnimationFrame(loop); }
  function done(){ year=2036; upd(); const a=avg(); out.textContent='עשר שנים עברו. '+renewed+' מתוך 24 משכנתאות חודשו, והריבית הממוצעת ברחוב עלתה מ-'+avg0.toFixed(2)+'% ל-'+a.toFixed(2)+'%.'+(TODAY<3?' גם כשהבנק מציע רק '+TODAY+'%, הרחוב משלם יותר, כי המשכנתאות הישנות היו זולות עוד יותר.':''); }
  function startLoop(){ if(run) return; if(reduce){ cars.forEach(c=>{ if(c.mat<=2036){ c.rate=TODAY; renewed++; } }); paint(); clock=10; done(); return; } run=true; last=performance.now(); requestAnimationFrame(loop); }
  function stopLoop(){ run=false; }
  let vis=false;
  new IntersectionObserver(es=>es.forEach(e=>{ vis=e.isIntersecting; if(!vis) stopLoop(); }),{threshold:.1}).observe(stage);
  setHomes();
  pW.querySelector('[data-a="vote"]').addEventListener('click',()=>{ if(clock>=10||run===false&&renewed>0) setHomes(); out.textContent='המשפחות נוסעות סביב הרחוב. כל פעם שמשפחה עוברת בבנק בשנה שבה המשכנתא שלה נגמרה, היא מחדשת אותה ב-'+TODAY+'%.'; startLoop(); });
  pW.querySelector('[data-a="peek"]').addEventListener('click',()=>{ out.textContent='קיצור הדרך אומר: "הרחוב משלם בממוצע '+avg0.toFixed(2)+'%, וימשיך לשלם את זה." הוא לא רואה שכל משכנתא מתחדשת בשנה שלה. בפועל, ב-'+year+' הממוצע הוא '+avg().toFixed(2)+'%.'; });
  const dens=pW.querySelector('.cy-dens input'); dens.addEventListener('input',()=>{ TODAY=+dens.value; pW.querySelector('.cy-dens b').textContent=TODAY+'%'; stopLoop(); setHomes(); out.textContent='הריבית של היום: '+TODAY+'%. לחצו "להריץ את השנים".'; });
  pW.querySelector('.cy-morph').addEventListener('click',()=>ctx.setMode('market'));

     return {stop:stopLoop}; }},
 act2:`<p class="cy-k">מערכה 2 · עיר הפיצ'רים</p>
   <p>אותו נוף, שתי משמעויות. הדרך היא המסלול של טעינה אחת של נתונים, מהקובץ של משרד החוב ועד הגרף של נועה, ובכל תחנה לאורכה עומד בניין: פיצ'ר אחד של המוצר. ארבע שכונות, ארבע שכבות: האיסוף, החישוב, התצוגה והאמון.</p>
   <div class="cy-ctl"><button type="button" class="cy-btn go" data-a="play">▶ סיור מודרך</button><button type="button" class="cy-btn hot" data-a="shock">לשלוח קובץ חדש</button><button type="button" class="cy-btn" data-a="home">למבט על</button></div>
   <ol class="cy-list"></ol><p class="cy-hint">לחצו על בניין כדי להיכנס לחדר שלו. גם הצומת, המגדל והגשר נפתחים.</p>`,
 waze:{1:'דף חשבון מכל בנק, כל אחד בפורמט אחר',2:'סך המשכנתאות חייב להתאים לרישום בטאבו',3:'תיקייה שבה כל דף חשבון נשמר כמו שהוא',4:'מה הבנק מציע היום, לכל אורך הלוואה',5:'משכנתא שנגמרת מתחדשת בריבית של היום',6:'האם המשכורת עולה מהר יותר מההחזר',7:'לשאול כמה יועצים, ולהשוות את התשובות',8:'לוח שנה עם כל מועדי החידוש של הרחוב',9:'קבלה חתומה על כל חישוב',10:'דף חשבון חדש שמגיע כל חודש לבד'},
 ex:{1:'הקובץ החודשי של משרד החוב הצרפתי נקרא לפי שמות הכותרות, ולא לפי מספר העמודה. אם מחר יזיזו עמודה, שום דבר לא יישבר.',2:'סכום כל האג"ח חייב לצאת בדיוק החוב שצרפת עצמה מצהירה. אילו עמודה אחת נקראה במיליארדים במקום במיליונים, הפער היה עוצר את הטעינה.',3:'הטעינה של אוקטובר מקבלת טביעת אצבע. גם בעוד שנה אפשר לחזור בדיוק אליה, ולראות מאיזה קובץ היא באה.',4:'העקום של היום: 3% לעשר שנים. תרחיש "עלייה": 4%. תרחיש "ירידה": 2%. ההנחות כתובות ליד כל אחד.',5:'ב-2027 פוקעות אג"ח בשווי 11.3% מהתמ"ג, ומוחלפות בחדשות בתשואה של אותה שנה.',6:'ב-3%, הריבית על החוב מגיעה ל-4.90% מהתמ"ג ב-2036, והחוב ל-157%. מכאן הוא גדל מעצמו.',7:'ב-2031: אג"ח אחר אג"ח 3.82%, ריבית קפואה 3.07%. פער של 0.74 נקודות תמ"ג בשנה.',8:'הלבנה של 2016, בחצי אחוז, היא האדומה ביותר: התשואה של היום גבוהה ממנה בשלוש נקודות.',9:'נועה מצטטת את הקישור בסיפור שלה. כל קורא שלוחץ עליו מקבל בדיוק אותו גרף, עם אותן הנחות.',10:'משרד החוב מפרסם קובץ חדש. הכלי טוען, בודק, ומתריע: שלוש אג"ח חדשות, ואחת נעלמה לפני זמנה.'},
 models(api){ const {H,S}=api; const W0=window.LAB_MW||{bonds:[]};
  
  const hex=async t=>{ try{ const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(t)); return [...new Uint8Array(b)].slice(0,8).map(x=>x.toString(16).padStart(2,'0')).join(''); }catch(e){ let h=0; for(const c of t) h=(h*31+c.charCodeAt(0))>>>0; return h.toString(16); } };
  const RUN=(W0.runs&&W0.runs['3'])||{bond:[],frozen:[],jump:[]};
  const MODEL={
   1(b){ b.innerHTML='<div class="md-rows mw-files"><span dir="ltr">US · {"maturity":"2031-05-15","amt":42.1,"cpn":1.25}</span><span dir="ltr">FR · Echéance | Encours | Coupon</span><span dir="ltr">IT · Scadenza ; Cedola ; Importo</span></div><button type="button" class="cy-btn go">לתרגם לשפה אחת ›</button><div class="md-cells"></div><p class="md-cap">שלושה משרדי חוב, שלוש שפות. המתאמים מחפשים כותרות לפי מילים.</p>';
     const bt=b.querySelector('button'), cells=b.querySelector('.md-cells'), cap=b.querySelector('.md-cap');
     bt.addEventListener('click',()=>{ cells.innerHTML=['ארה"ב','צרפת','איטליה'].map(c=>`<span><small>${c}</small><b dir="ltr">פקיעה · סכום · קופון</b></span>`).join(''); cap.textContent='אותה רשימה בדיוק, משלושה מקורות שונים. מכאן והלאה, המנוע לא יודע ולא צריך לדעת מאיזו מדינה הנתונים באו.'; }); },
   2(b){ b.innerHTML='<div class="md-ver"><span><small>החוב שצרפת מצהירה</small><b>115.5%</b></span><span class="sv"><small>סכום הרשימה שנטענה</small><b>115.5%</b></span></div><label class="md-tog"><input type="checkbox"> עמודה אחת נקראה במיליארדים במקום במיליונים</label><p class="md-cap">שווים. הטעינה מאושרת.</p>';
     const c=b.querySelector('input'), sv=b.querySelector('.sv b'), cap=b.querySelector('.md-cap'); c.addEventListener('change',()=>{ sv.textContent=c.checked?'115,470%':'115.5%'; b.querySelector('.md-ver').classList.toggle('bad',c.checked); cap.textContent=c.checked?'פער של פי אלף. הטעינה נעצרת לפני שמישהו רואה מספר, ומתאם הקובץ נבדק. כמו רואה חשבון שלא חותם כשהבנק לא מתאים לספרים.':'שווים. הטעינה מאושרת.'; }); },
   3(b){ b.innerHTML='<label>הטעינה של החודש (קופון של אג"ח אחת): <input type="number" value="0.50" step="0.01"></label><div class="md-com"><span>טביעת האצבע של הטעינה:</span><code dir="ltr"></code></div><button type="button" class="cy-btn hot">לתקן מספר אחד</button><div class="md-hist"></div><p class="md-cap"></p>';
     const inp=b.querySelector('input'), code=b.querySelector('code'), bt=b.querySelector('button'), hist=b.querySelector('.md-hist'), cap=b.querySelector('.md-cap');
     const draw=async()=>{ const h=await hex('FR|2026-10|'+inp.value); code.textContent=h; return h; }; draw().then(h=>{ hist.innerHTML='<span>'+h+'</span>'; cap.textContent='כל טעינה היא מהדורה בארכיון.'; });
     bt.addEventListener('click',async()=>{ inp.value=(+inp.value+0.01).toFixed(2); const h=await draw(); hist.innerHTML+='<span class="new">'+h+'</span>'; cap.textContent='תיקון לא דורס את הישן: נוצרה מהדורה חדשה עם טביעת אצבע חדשה, והישנה עדיין שם. גרף שצוטט אתמול עדיין ניתן לשחזור.'; }); },
   4(b){ b.innerHTML='<label>התרחיש: <b>כמו היום</b><input type="range" min="-1" max="2" step="1" value="0"></label><svg viewBox="0 0 300 120" class="md-curve"><polyline class="c0" points=""/><polyline class="c1" points=""/></svg><p class="md-cap">הקו המקווקו הוא העקום של היום. הקו המלא הוא התרחיש.</p>';
     const r=b.querySelector('input'), c0=b.querySelector('.c0'), c1=b.querySelector('.c1'); const M=[1,2,3,5,7,10,15,20,30]; const y0=m=>2.2+1.6*(1-Math.exp(-m/6)); const pts=s=>M.map(m=>(290-m*9.4).toFixed(0)+','+(110-(y0(m)+s)*18).toFixed(0)).join(' ');
     c0.setAttribute('points',pts(0)); const draw=()=>{ const s=+r.value; b.querySelector('label b').textContent=['ירידה של נקודה','כמו היום','עלייה של נקודה','עלייה של שתי נקודות'][s+1]; c1.setAttribute('points',pts(s)); }; r.addEventListener('input',draw); draw(); },
   5(b){ const B0=[[2027,0.5],[2028,0],[2029,1.2],[2030,2.5],[2031,0.8]]; b.innerHTML='<label>התשואה בשוק: <b>3%</b><input type="range" min="1" max="6" step="0.5" value="3"></label><div class="md-fund mw-roll"></div><button type="button" class="cy-btn go">שנה קדימה ›</button><p class="md-cap">חמש אג"ח בתיק. כל שנה, זו שפוקעת מוחלפת בחדשה, בתשואה של השוק.</p>';
     const r=b.querySelector('input'), box=b.querySelector('.mw-roll'), bt=b.querySelector('button'), cap=b.querySelector('.md-cap'); let bs=B0.map(x=>x.slice()), y=2026;
     const draw=()=>{ box.innerHTML=bs.map(([m,c])=>`<span class="${m>2031?'new':''}">${m}<b>${c.toFixed(1)}%</b></span>`).join(''); };
     r.addEventListener('input',()=>{ b.querySelector('label b').textContent=r.value+'%'; bs=B0.map(x=>x.slice()); y=2026; draw(); cap.textContent='מתחילים מחדש.'; });
     bt.addEventListener('click',()=>{ y++; const i=bs.findIndex(x=>x[0]===y); if(i>=0){ bs[i]=[y+10,+r.value]; } if(y>2031){ bs=B0.map(x=>x.slice()); y=2026; } draw(); const a=bs.reduce((s,x)=>s+x[1],0)/bs.length; cap.textContent=y===2026?'מתחילים מחדש.':'ב-'+y+' הריבית הממוצעת בתיק: '+a.toFixed(2)+'%.'; }); draw(); },
   6(b){ b.innerHTML='<label>הריבית על החוב: <b>4%</b><input class="r" type="range" min="1" max="7" step="0.5" value="4"></label><label>הצמיחה: <b>2%</b><input class="g" type="range" min="0" max="5" step="0.5" value="2"></label><div class="md-rep"><span><small>החוב בעוד עשר שנים, בלי עודף</small><b class="d"></b></span><span><small>העודף שמייצב אותו</small><b class="s"></b></span></div><p class="md-cap"></p>';
     const r=b.querySelector('.r'), g=b.querySelector('.g'), cap=b.querySelector('.md-cap'); const draw=()=>{ const R=+r.value, G=+g.value; b.querySelectorAll('label b')[0].textContent=R+'%'; b.querySelectorAll('label b')[1].textContent=G+'%'; let d=115.5; for(let i=0;i<10;i++) d=d*(1+R/100)/(1+G/100); b.querySelector('.d').textContent=d.toFixed(0)+'%'; b.querySelector('.s').textContent=((R-G)/(100+G)*115.5).toFixed(1)+'%'; cap.textContent=R>G?'הריבית עוקפת את הצמיחה: החוב גדל מעצמו, כמו אופניים בעלייה כשהרוח נגדך.':'הצמיחה עוקפת את הריבית: החוב מתכווץ לבד, גם בלי עודף.'; }; r.addEventListener('input',draw); g.addEventListener('input',draw); draw(); },
   7(b){ const v=[['אג"ח אחר אג"ח',(RUN.bond[4]||[0,3.82])[1]],['ריבית קפואה',(RUN.frozen[4]||[0,3.07])[1]],['קפיצה מיידית',(RUN.jump[4]||[0,4.26])[1]]]; b.innerHTML='<p>אותו תרחיש, 3% לעשר שנים, שלוש מאזניים. הריבית על החוב ב-2031, באחוזים מהתמ"ג:</p><div class="md-bars">'+v.map(([n,x],i)=>`<span class="${i?'':'ref'}"><small>${n}</small><i style="--w:${(x/5*100).toFixed(0)}%"></i><b>${x.toFixed(2)}%</b></span>`).join('')+'</div><p class="md-cap">המאזניים לא מסכימים. כל פער מוצג גלוי, גם אם יתברר שהוא קטן.</p>'; },
   8(b){ const bs=(W0.bonds||[]).filter(x=>x[1]<=2036).slice(0,30); b.innerHTML='<label>התשואה שבה יוחלפו: <b>3%</b><input type="range" min="1" max="6" step="0.5" value="3"></label><div class="md-wall"></div><p class="md-cap">כל לבנה היא אג"ח. ככל שהיא אדומה יותר, הקפיצה בין הקופון שלה לתשואה של היום גדולה יותר.</p>';
     const r=b.querySelector('input'), wall=b.querySelector('.md-wall'); const draw=()=>{ const y=+r.value; b.querySelector('label b').textContent=y+'%'; wall.innerHTML=bs.map(x=>{ const j=y-x[2]; const k=Math.max(0,Math.min(1,j/4)); return `<i title="${x[1]} · ${x[2].toFixed(2)}% → ${y}%" style="background:rgb(${Math.round(228-51*k)},${Math.round(236-156*k)},${Math.round(246-200*k)})"></i>`; }).join(''); }; r.addEventListener('input',draw); draw(); },
   9(b){ b.innerHTML='<label>התרחיש: <select><option>3% לעשר שנים</option><option>4% לעשר שנים</option><option>2% לעשר שנים</option></select></label><div class="md-com"><span>מזהה ההרצה:</span><code dir="ltr"></code></div><p class="md-cap">אותה טעינה, אותו תרחיש ואותה גרסה תמיד נותנים אותו מזהה. מזהה אחר, תוצאה אחרת.</p>';
     const s=b.querySelector('select'), code=b.querySelector('code'); const draw=async()=>{ code.textContent='differential.app/run/'+(await hex('FR|2026-10|engine-1.4|'+s.value)).slice(0,12); }; s.addEventListener('change',draw); draw(); },
   10(b){ b.innerHTML='<button type="button" class="cy-btn go">פרסום חדש של משרד החוב ›</button><div class="md-diff"></div><p class="md-cap">כל פרסום חדש נטען לבד, ומושווה לקודם.</p>';
     const bt=b.querySelector('button'), df=b.querySelector('.md-diff'), cap=b.querySelector('.md-cap'); let k=0;
     bt.addEventListener('click',()=>{ k++; const odd=k%2===0; df.innerHTML='<span class="ok">+3 אג"ח חדשות</span><span class="ok">−2 אג"ח פקעו בזמן</span>'+(odd?'<span class="bad">−1 אג"ח נעלמה לפני זמנה</span>':''); cap.textContent=odd?'התראה: אג"ח נעלמה לפני תאריך הפקיעה שלה. אולי פדיון מוקדם, אולי שגיאה בקובץ. מישהו בודק לפני שהיא נכנסת לחישוב.':'הכול צפוי. אין התראה.'; }); }
  };
   return MODEL; }
};
