/* Case 04 · spec cities for city-engine.js (desk-memory and crisis-rehearsal).
   Keys: cls, intro(tm) html, lmKn, icons {1..10}, modes, wazeLabel, act1 {html, setup(ctx)->{stop}}, act2 html, waze {1..10}, ex {1..10}, models(api)->{1..10: fn(box)} */
window.CITY=window.CITY||{};
(function(){
  const I={mail:'<path d="M-10 -7 h20 v14 h-20z M-10 -7 l10 8 l10 -8"/>',mic:'<rect x="-4" y="-11" width="8" height="14" rx="4"/><path d="M-8 1 a8 8 0 0 0 16 0 M0 9 v3"/>',check:'<path d="M-9 -9 h18 v18 h-18z M-5 -1 l3 3 l6 -6"/>',
   graph:'<circle cx="-7" cy="-5" r="3"/><circle cx="7" cy="-5" r="3"/><circle cx="0" cy="7" r="3"/><path d="M-5 -3 L-1 5 M5 -3 L1 5 M-4 -5 h8"/>',link:'<path d="M-10 0 h6 M4 0 h6 M-4 -4 a4 4 0 0 1 0 8 M4 -4 a4 4 0 0 0 0 8"/>',
   board:'<path d="M-10 -10 h20 v20 h-20z M-10 -3 h20 M-3 -10 v20"/>',door:'<path d="M-8 -10 h10 v20 h-10z M6 -4 l5 4 l-5 4 M2 0 h9"/>',brief:'<path d="M-9 -9 h18 v18 h-18z M-5 -4 h10 M-5 0 h10 M-5 4 h6"/>',
   lock:'<rect x="-8" y="-2" width="16" height="12" rx="2"/><path d="M-5 -2 v-4 a5 5 0 0 1 10 0 v4"/>',box:'<path d="M-10 -6 h20 v14 h-20z M-10 -6 l3 -4 h14 l3 4 M-3 1 h6"/>',
   script:'<path d="M-8 -11 h12 l4 4 v18 h-16z M-4 -3 h8 M-4 2 h8"/>',shelf:'<path d="M-10 -8 h20 M-10 0 h14 M-10 8 h8"/>',shuffle:'<path d="M-10 -6 h5 l10 12 h5 M-10 6 h5 l10 -12 h5"/>',
   clock:'<circle cx="0" cy="0" r="9"/><path d="M0 -6 v6 l4 3"/>',screen:'<rect x="-10" y="-8" width="20" height="13" rx="2"/><path d="M-4 9 h8"/>',fork:'<path d="M0 10 v-8 M0 2 L-8 -8 M0 2 L8 -8"/>',
   timer:'<circle cx="0" cy="2" r="8"/><path d="M0 2 v-5 M-2 -10 h4"/>',notes:'<path d="M-8 -11 h16 v22 h-16z M-4 -5 l2 2 l4 -4 M-4 3 h8"/>',cast:'<circle cx="-5" cy="-4" r="3"/><circle cx="5" cy="-4" r="3"/><path d="M-10 8 q5 -8 10 0 q5 -8 10 0"/>',
   cal:'<rect x="-9" y="-8" width="18" height="17" rx="2"/><path d="M-9 -3 h18 M-4 -11 v5 M4 -11 v5"/>'};
  function pick(box,H,q,opts){ box.append(H('p','cy-mq',q)); const row=H('div','cy-ctl'); const out=H('p','rg-out'); out.setAttribute('aria-live','polite');
    opts.forEach(([l,t,cls])=>{ const b=H('button','cy-btn'+(cls?' '+cls:''),l); b.type='button'; b.addEventListener('click',()=>{ row.querySelectorAll('.cy-btn').forEach(x=>x.classList.toggle('on',x===b)); out.textContent=t; }); row.append(b); }); box.append(row,out); }
  function slide(box,H,label,min,max,step,val,fmt){ const l=H('label','cy-dens'); const b=H('b'); l.append(document.createTextNode(label+': '),b); const r=H('input'); r.type='range'; r.min=min; r.max=max; r.step=step; r.value=val; r.setAttribute('aria-label',label); l.append(r); const out=H('p','rg-out'); out.setAttribute('aria-live','polite'); box.append(l,out);
    const go=()=>{ const [v,t]=fmt(+r.value); b.textContent=v; out.textContent=t; }; r.addEventListener('input',go); go(); }
  const AV=(skin,hair,shirt)=>`<span class="cy-av" aria-hidden="true"><svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="28" fill="#e7ecf3"/><circle cx="30" cy="28" r="12" fill="${skin}"/><path d="M16 28 q0 -18 14 -18 q14 0 14 18 q-3 -8 -14 -8 q-11 0 -14 8z" fill="${hair}"/><circle cx="26" cy="28" r="1.5" fill="#1e2422"/><circle cx="34" cy="28" r="1.5" fill="#1e2422"/><path d="M26 34 q4 2.5 8 0" stroke="#1e2422" stroke-width="1.5" fill="none"/><path d="M12 58 q4 -16 18 -16 q14 0 18 16z" fill="${shirt}"/></svg></span>`;
  const act2=(what)=>`<p class="cy-k">מערכה 2 · עיר הפיצ'רים</p>
   <p>אותו נוף, שתי משמעויות. הדרך היא ${what}, ובכל תחנה לאורכה עומד פיצ'ר אחד של המוצר. ארבע שכבות.</p>
   <div class="cy-ctl"><button type="button" class="cy-btn go" data-a="play">▶ סיור מודרך</button><button type="button" class="cy-btn hot" data-a="shock">לשלוח הבטחה אחת</button><button type="button" class="cy-btn" data-a="home">למבט על</button></div>
   <ol class="cy-list"></ol><p class="cy-hint">לחצו על תחנה כדי להיכנס לחדר שלה.</p>`;

  /* ================= Desk Memory ================= */
  window.CITY['desk-memory']={
   cls:'cy-dm',
   intro:tm=>`<p class="cy-k">פרק 3 · אפיון</p><h4 class="cy-h">עשרה פיצ'רים, ושולחן שזוכר</h4>
    <p>אחרי שה-POC הראה שגרף של חוטים עונה על כמעט כל מה שמחליף שואל, כותבים <b>אפיון</b>: מסמך שמתאר את המוצר המלא, פיצ'ר אחרי פיצ'ר, כאילו מחר מתחילים לבנות. <b>פיצ'ר</b> הוא יכולת אחת של המוצר, למשל "להקליט 30 שניות אחרי כל שיחה".</p>
    <div class="cy-emma">${AV('#c99068','#2a1d17','#2c3e5a')}<div><span class="cy-k">1 בנובמבר, בוקר</span><p>מרקוס (בדוי) נכנס לשולחן של דנה. יש לו מזכר של ארבעה עמודים, ושגריר שיתקשר עוד שבוע. ה-POC הראה שהגרף עובד. עכשיו צריך מוצר: מאיפה נכנסות ההבטחות, מי מאשר אותן, מה קורה ביום העזיבה, ומה מרקוס רואה כשהוא לא רשאי לקרוא.</p></div></div>
    <div class="cy-prom"><span>מה המוצר מבטיח:</span><p>כל התחייבות שנאמרה ב${tm('ep-nsc','שולחן')} נשמרת כחוט, עם מקור ואישור של מי שהבטיחה. ביום העזיבה החוטים עוברים, והמחליף מקבל תדריך. ומה שהוא לא מבטיח כתוב במפורש: הוא זוכר רק מה שסיפרו לו, ולא מחייב אף אחד לקיים.</p></div>
    <p class="cy-acts">שלוש מערכות: <b>1</b> סיפור מקביל שכולם מכירים · <b>2</b> הגשר של הפיצ'רים · <b>3</b> חדר לכל פיצ'ר. מוכנים?</p>`,
   lmKn:'המחוון החי: מזכר מול חוטים',
   icons:{1:I.mail,2:I.mic,3:I.check,4:I.graph,5:I.link,6:I.board,7:I.door,8:I.brief,9:I.lock,10:I.box},
   modes:[['waze','החלפת המשמרת'],['market','המוצר'],['both','שניהם']],
   wazeLabel:'על הגשר',
   act1:{html:`<p class="cy-k">מערכה 1 · החלפת משמרת על הגשר</p>
    <p>בספינה, קצין המשמרת רושם ביומן כל מה שקרה: כל שינוי כיוון, כל שיחת רדיו, כל הבטחה לספינה אחרת. ומשמרת לא יורדת מהגשר בלי למסור: הקצין הבא קורא את היומן, שואל, ורק אז מקבל את האחריות.</p>
    <div class="cy-ctl"><button type="button" class="cy-btn go" data-a="add">▶ לנווט משמרת</button><button type="button" class="cy-btn hot" data-a="tear">לרדת בלי למסור</button></div>
    <div class="cy-meters"><span><b class="m-v">0</b>רישומים ביומן</span><span><b class="m-s">0</b>משמרות שהוחלפו</span><span class="cy-eta"><b class="m-r">תקין</b>מה הבא יודע</span></div>
    <p class="rg-out" aria-live="polite">כל נקודה על הדרך היא רישום ביומן. לחצו "לנווט משמרת".</p>
    <figure class="cy-nagoya"><svg viewBox="0 0 120 80" aria-hidden="true"><path d="M10 50 h100 l-14 20 h-72z" class="ng-track"/><rect x="40" y="26" width="40" height="24" class="ng-track"/><circle cx="60" cy="18" r="5" class="ng-car j"/></svg>
    <figcaption><b>זה כלל אמיתי.</b> אמנת STCW של ארגון הספנות הבינלאומי (קוד A-VIII/2) קובעת שקצין לא מוסר משמרת עד שהמחליף מבין את המצב ומוכן לקבל אותו. אבל אין דבר כזה בחדר שבו מבטיחים לבעלות ברית.</figcaption></figure>
    <details class="cy-map"><summary>מה על הגשר מקביל למה אצלנו</summary><table><tbody>
    <tr><td>רישום ביומן אחרי שיחת רדיו</td><td>סיכום של 30 שניות אחרי שיחה</td></tr><tr><td>יומן הספינה, דף אחרי דף</td><td>גרף החוטים: אירוע אחרי אירוע</td></tr><tr><td>ליד כל שינוי כיוון: למה</td><td>קישור "למה" לכל התחייבות</td></tr><tr><td>לוח המשימות של המשמרת</td><td>לוח ההתחייבויות</td></tr><tr><td>"לא יורדים בלי למסור"</td><td>העזיבה היא אירוע שמעביר את החוטים</td></tr><tr><td>תדריך ההחלפה</td><td>תדריך היום הראשון</td></tr></tbody></table></details>
    <p class="cy-bridge">על גשר יש קצין אחד וקצין אחד שמחליף, באותו לילה. בממשל יש מאות שולחנות, והמחליף מגיע לפעמים שבועיים אחרי. כדי שזה יעבוד צריך מוצר.</p>
    <button type="button" class="cy-morph">עכשיו נחליף את היומן בחוטים ←</button>`,
    setup(ctx){ const {S,cam,ringPath,pW,reduce}=ctx; const L=ringPath.getTotalLength(); const g=S('g',{class:'cy-cars dm-log',transform:'translate(0,-14)'},cam);
     const out=pW.querySelector('.rg-out'), mv=pW.querySelector('.m-v'), ms=pW.querySelector('.m-s'), mr=pW.querySelector('.m-r'); let n=0, sw=0, timer=null, left=false; const dots=[];
     function add(){ if(n>=40){ stop(); out.textContent='40 רישומים. כל עשרה רישומים התחלפה משמרת, והבאה קראה את היומן. עכשיו נסו לרדת בלי למסור.'; return; } const p=ringPath.getPointAtLength(L*n/40); const c=S('circle',{cx:p.x,cy:p.y,r:6,class:'dm-dot'},g); c.style.fill=(n%7===3)?'#c47a12':'var(--accent, #2f6f68)'; dots.push(c); n++; mv.textContent=n; if(n%10===0){ sw++; ms.textContent=sw; c.setAttribute('r',9); } }
     function stop(){ if(timer){ clearInterval(timer); timer=null; } }
     pW.querySelector('[data-a="add"]').addEventListener('click',()=>{ if(timer) return; if(reduce){ while(n<40) add(); out.textContent='40 רישומים נוספו. הכתומים: הבטחות לספינות אחרות.'; return; } out.textContent='רישום אחרי רישום. הכתומים הם הבטחות: "נעבור משמאלכם", "נחכה לכם בנמל".'; timer=setInterval(add,140); });
     pW.querySelector('[data-a="tear"]').addEventListener('click',()=>{ if(n<12){ out.textContent='קודם נווטו קצת.'; return; } if(left) return; left=true; stop(); let lost=0; dots.forEach((d,i)=>{ if(i>n-12&&i%7===3){ d.style.fill='var(--risk, #b3261e)'; d.setAttribute('r',10); lost++; } else if(i>n-12) d.style.opacity=.35; });
       mr.textContent='חסר'; out.textContent='הקצין ירד מהגשר בלי למסור, ולא הספיק לרשום את המשמרת האחרונה. הקצין הבא לא יודע על '+Math.max(1,lost)+' הבטחות שניתנו בה. הספינה האחרת עדיין מחכה בנמל.'; });
     pW.querySelector('.cy-morph').addEventListener('click',()=>ctx.setMode('market'));
     return {stop}; }},
   act2:act2('המסלול של הבטחה אחת, מהשיחה של דנה ועד התדריך של מרקוס'),
   waze:{1:'כל מה שנכנס לגשר: רדיו, מכ"ם, הודעות',2:'הקצין רושם ביומן בסוף כל שיחת רדיו',3:'הקצין הבכיר חותם על כל רישום',4:'יומן הספינה: דף אחרי דף, לפי הסדר',5:'ליד כל שינוי כיוון: למה',6:'לוח המשימות של המשמרת',7:'משמרת לא יורדת בלי למסור',8:'תדריך ההחלפה, לפי רשימה קבועה',9:'דלת הקברניט: רואים שהיא קיימת',10:'היומן עובר לחברה בסוף המסע'},
   ex:{1:'מברק מ-28 בספטמבר עם המילים "we committed" נקלט, עם הסיווג שלו.',2:'דנה לוחצת על כפתור אחד אחרי השיחה, ומקליטה 30 שניות.',3:'המודל מציע 15 בדצמבר, עם הציטוט. דנה מאשרת בלחיצה.',4:'החוט T-114 מקבל אירוע חדש. התאריך זז? אירוע נוסף, והישן נשאר.',5:'ליד המיירטים: קישור לפגישה מ-28 בספטמבר שבה הוחלט עליהם.',6:'15 בנובמבר: התראה, 30 יום לפני היעד.',7:'17 באוקטובר: כוח אדם מודיע. 53 חוטים עוברים למרקוס באותו אירוע.',8:'1 בנובמבר: מרקוס פותח תדריך. המיירטים שלישיים.',9:'67 חוטים מעל הסיווג של מרקוס מוצגים כבדלים.',10:'20 בינואר: חבילה חתומה לארכיון הלאומי, עם 553 אירועים.'},
   models({H}){ return {
    1:b=>pick(b,H,'הקולט מוצא מברק חדש. מה הוא עושה במקור?',[['מסמן אותו "נקרא"','אם הקולט נוגע במקור, הוא כבר לא רק קורא. מישהו יגלה שמברק "נעלם" מהתור שלו.','hot'],['כלום','הוא קורא ומעתיק לתור, עם מזהה וסיווג. המקור לא יודע שקראו אותו.']]),
    2:b=>slide(b,H,'שיחות ביום שנגמרו בסיכום',0,100,5,80,v=>[v+'%',v>=95?'כמעט הכול נכנס. מה שנשאר בחוץ: שיחות במסדרון.':(v>=70?'רוב ההבטחות נכנסות. מה שלא סוכם לא קיים, ולכן המדד הזה עולה ליו"ר כל בוקר.':'הרבה הבטחות נשארות רק בראש. המערכת זוכרת רק מה שסיפרו לה.')]),
    3:b=>pick(b,H,'המודל מציע "15 בנובמבר". דנה אמרה "אמצע דצמבר". מה קורה?',[['ההצעה נכנסת','התחייבות עם תאריך שגוי נראית אמינה כמו כל השאר.','hot'],['דנה מתקנת','היא רואה את הציטוט, מתקנת ל-15 בדצמבר, ורק אז ההתחייבות נכנסת.']]),
    4:b=>pick(b,H,'התאריך של המיירטים זז ל-20 בדצמבר. מה קורה לרשומה הישנה?',[['מתעדכנת','ואז אף אחד לא יודע שהתאריך זז, או כמה פעמים.','hot'],['נשארת','נוסף אירוע DUE_CHANGED. מרקוס רואה: 15.12 ← 20.12, ומי שינה.']]),
    5:b=>pick(b,H,'מרקוס שואל "למה הבטחנו מיירטים?". מה הוא מקבל?',[['תקציר שהמודל כתב','תקציר נשמע בטוח, וקל לו לטעות.','hot'],['קישור למקור','קישור לפגישה מ-28 בספטמבר, ולמברק. הוא קורא בעצמו.']]),
    6:b=>slide(b,H,'ימים עד היעד',0,90,5,30,v=>[String(v),v===0?'היום. ואם עבר, ההתחייבות עוברת ל"הופרה", ונשארת על הלוח באדום.':(v<=30?'התראה: '+v+' ימים. מספיק זמן לבדוק, לתאם, או לבקש דחייה.':'פתוחה, בלי התראה. הלוח ממיין לפי יעד.')]),
    7:b=>pick(b,H,'דנה עוזבת, ועוד אין מחליף. מה קורה ל-53 החוטים?',[['נשארים אצלה','החשבון שלה נסגר, והחוטים בלי בעלים. אף אחד לא מקבל התראה.','hot'],['עוברים לראש הצוות','באותו אירוע. וחוט בלי בעלים קבוע מתריע ליו"ר כל בוקר, עד שמישהו לוקח.']]),
    8:b=>pick(b,H,'מה מופיע ראשון בתדריך של מרקוס?',[['מה שדנה חשבה שחשוב','זה מה שהמזכר עשה. 8 מתוך 60.','hot'],['מה שהיעד שלו הכי קרוב','תמיד לפי יעד. אחת באיחור של 6 ימים, ואז המיירטים.']]),
    9:b=>pick(b,H,'חוט SECRET, ומרקוס CONFIDENTIAL. מה הוא רואה?',[['כלום','הוא לא יודע שיש הבטחה, ולא יבקש גישה. היא תפוג בשקט.','hot'],['בדל','"יש כאן התחייבות, יעד 15.12, פנו לראש הצוות". בלי התוכן.']]),
    10:b=>pick(b,H,'20 בינואר. מה יוצא לארכיון?',[['מה שחשוב','מישהו בוחר מה חשוב, והשאר נשאר בשרת שנכבה.','hot'],['הכול, חתום','כל האירועים, לפי חוק הרשומות הנשיאותיות. המאגר נמחק רק אחרי אישור קבלה.']]) }; }
  };

  /* ================= Crisis Rehearsal Engine ================= */
  window.CITY['crisis-rehearsal']={
   cls:'cy-cr',
   intro:tm=>`<p class="cy-k">פרק 3 · אפיון</p><h4 class="cy-h">עשרה פיצ'רים, וצוות שפוגש משבר בפעם השנייה</h4>
    <p>אחרי שה-POC הראה שחזרה אחת חוסכת כמעט חצי מזמן ההחלטות, כותבים <b>אפיון</b>: מסמך שמתאר את המוצר המלא, פיצ'ר אחרי פיצ'ר. <b>פיצ'ר</b> הוא יכולת אחת, למשל "לשלוח אירוע לכיסא המדיני בדקה 45".</p>
    <div class="cy-emma">${AV('#e3b48f','#8a8a8a','#6b6b6b')}<div><span class="cy-k">בוקר של סייבר, תרגיל 3</span><p>טום (בדוי) מריץ חזרה לצוות של שמונה כיסאות. בחזרה הקודמת, לפני שנה, חצי שעה הלכה על השאלה מי בכלל מחליט. מאז התחלפו שלושה. ה-POC הראה שהחזרה עובדת. עכשיו צריך מוצר: מי כותב את התרחיש, איך הוא רץ, מה נמדד, ומי מתאמן מתי.</p></div></div>
    <div class="cy-prom"><span>מה המוצר מבטיח:</span><p>כל צוות נפגש עם ה${tm('ep-swan','משבר')} בפעם השנייה, לא בראשונה. המדידה כנה: צעד שנשכח שוקל יותר ממהירות. ומה שהוא לא מבטיח: הוא מלמד את מי שבחדר.</p></div>
    <p class="cy-acts">שלוש מערכות: <b>1</b> סיפור מקביל שכולם מכירים · <b>2</b> מאחורי הקלעים של הפיצ'רים · <b>3</b> חדר לכל פיצ'ר. מוכנים?</p>`,
   lmKn:'המחוון החי: החזרה מול התחלופה',
   icons:{1:I.script,2:I.shelf,3:I.shuffle,4:I.clock,5:I.screen,6:I.fork,7:I.timer,8:I.notes,9:I.cast,10:I.cal},
   modes:[['waze','החזרה הגנרלית'],['market','המוצר'],['both','שניהם']],
   wazeLabel:'מאחורי הקלעים',
   act1:{html:`<p class="cy-k">מערכה 1 · החזרה הגנרלית</p>
    <p>שום הצגה לא עולה בלי חזרות. מנהלת הבמה מחזיקה ספר הפקה שבו כל קיו כתוב, והשחקנים עוברים על ההצגה שוב ושוב עד שהיא יושבת. אבל מה קורה כשבערב הבכורה, שלושה מהשחקנים הם מחליפים?</p>
    <div class="cy-ctl"><button type="button" class="cy-btn go" data-a="add">▶ להריץ חזרה</button><button type="button" class="cy-btn hot" data-a="tear">להחליף שלושה שחקנים</button></div>
    <div class="cy-meters"><span><b class="m-v">0</b>קיוז שעברו</span><span><b class="m-s">0</b>החמצות</span><span class="cy-eta"><b class="m-r">מוכנים</b>הצוות</span></div>
    <p class="rg-out" aria-live="polite">כל נקודה על הדרך היא קיו בהצגה. לחצו "להריץ חזרה".</p>
    <figure class="cy-nagoya"><svg viewBox="0 0 120 80" aria-hidden="true"><path d="M10 70 h100 M20 70 v-50 h80 v50" class="ng-track"/><path d="M20 20 q20 20 40 0 q20 20 40 0" class="ng-track"/><circle cx="60" cy="50" r="5" class="ng-car j"/></svg>
    <figcaption><b>זה קורה באמת.</b> ממשלות מריצות תרגילי משבר: Cyber Storm בארה"ב מאז 2006, Locked Shields של נאט"ו מאז 2010. הם גדולים, מעמיקים, ונדירים. ותיאטרון יודע דבר אחד שהם שוכחים: מחליף חדש מקבל חזרה משלו, באותו שבוע.</figcaption></figure>
    <details class="cy-map"><summary>מה מאחורי הקלעים מקביל למה אצלנו</summary><table><tbody>
    <tr><td>ספר ההפקה</td><td>תרחיש כקוד</td></tr><tr><td>קיו: "אורות, עכשיו"</td><td>אירוע שנשלח לכיסא, בזמן שלו</td></tr><tr><td>דפי התפקיד</td><td>מסוף שמראה לכל כיסא רק את שלו</td></tr><tr><td>שעון העצר של מנהלת הבמה</td><td>מדידה של זמן וצעדי חובה</td></tr><tr><td>הערות הבמאית אחרי חזרה</td><td>תחקיר לפי כיסא</td></tr><tr><td>לוח המחליפים</td><td>לוח הצוות</td></tr></tbody></table></details>
    <p class="cy-bridge">בתיאטרון יש במאית אחת שזוכרת מה עבד בחזרה הקודמת. בממשל, גם היא מתחלפת. כדי שזה יעבוד צריך מוצר.</p>
    <button type="button" class="cy-morph">עכשיו נחליף את ההצגה במשבר ←</button>`,
    setup(ctx){ const {S,cam,ringPath,pW,reduce}=ctx; const L=ringPath.getTotalLength(); const g=S('g',{class:'cy-cars cr-cues',transform:'translate(0,-14)'},cam);
     const out=pW.querySelector('.rg-out'), mv=pW.querySelector('.m-v'), ms=pW.querySelector('.m-s'), mr=pW.querySelector('.m-r'); let n=0, miss=0, timer=null, swapped=false; const dots=[];
     function add(){ if(n>=36){ stop(); out.textContent=swapped?('36 קיוז. '+miss+' הוחמצו, כולם אצל המחליפים. הם לא היו בחזרות.'):'36 קיוז, אפס החמצות. הצוות הזה התאמן יחד. עכשיו נסו להחליף שחקנים.'; return; } const p=ringPath.getPointAtLength(L*n/36); const bad=swapped&&(n%4===1); const c=S('circle',{cx:p.x,cy:p.y,r:6,class:'cr-dot'},g); c.style.fill=bad?'var(--risk, #b3261e)':'var(--accent, #2f6f68)'; dots.push(c); n++; if(bad){ miss++; ms.textContent=miss; } mv.textContent=n; }
     function stop(){ if(timer){ clearInterval(timer); timer=null; } }
     function run(){ if(timer) return; dots.forEach(d=>d.remove()); dots.length=0; n=0; miss=0; mv.textContent=0; ms.textContent=0; if(reduce){ while(n<36) add(); return; } timer=setInterval(add,130); }
     pW.querySelector('[data-a="add"]').addEventListener('click',()=>{ out.textContent=swapped?'אותה הצגה, עם שלושה מחליפים...':'קיו אחרי קיו, בזמן.'; run(); });
     pW.querySelector('[data-a="tear"]').addEventListener('click',()=>{ swapped=true; mr.textContent='3 חדשים'; out.textContent='שלושה שחקנים עזבו. המחליפים קיבלו את הטקסט, אבל לא היו באף חזרה. הריצו שוב.'; });
     pW.querySelector('.cy-morph').addEventListener('click',()=>ctx.setMode('market'));
     return {stop}; }},
   act2:act2('המסלול של אירוע אחד, מספר ההפקה ועד ההערות של הבמאית'),
   waze:{1:'ספר ההפקה: כל קיו כתוב',2:'שולחן האביזרים, כל אביזר במקומו',3:'הבמאי מזיז את השחקנים בחזרה הרביעית',4:'מנהלת הבמה: "היכון לקיו 14... עכשיו"',5:'דפי התפקיד: רק השורות שלך',6:'קיו מוכן גם כששחקן מדלג על שורה',7:'שעון העצר מאחורי הקלעים',8:'הערות הבמאית אחרי החזרה',9:'לוח המחליפים בחדר השחקנים',10:'לוח החזרות של העונה'},
   ex:{1:'"בוקר של סייבר", גרסה 3: 12 אירועים, נבדק ונחתם.',2:'"שיחת וידאו מזויפת" נכנסת לספרייה, עם צעד חובה: אימות בקו המאובטח.',3:'הפעם הכופר 40 מיליון, והנמל אחר. ההחלטות זהות.',4:'00:45: השיחה נשלחת לכיסא המדיני. מחכים עד 40 דקות.',5:'הכיסא המדיני רואה את השיחה. הכיסא הצבאי לא.',6:'ההסלמה הובילה לאירוע הבא: "היו"ר שואל אם השיחה אומתה".',7:'31 דקות, וצעד אחד נשכח: אימות. אדום.',8:'"בכיסא המדיני: לאמת לפני הסלמה". בלי שמות.',9:'הכיסא המדיני: בעלים חדש מאתמול, אפס חזרות. אזהרה.',10:'דצמבר: חזרת הכנסה של 45 דקות לכיסא המדיני החדש.'},
   models({H}){ return {
    1:b=>pick(b,H,'בתרחיש יש כיסא "מתאם אנרגיה", שכבר לא קיים. מה קורה?',[['רץ בכל זאת','באמצע התרגיל מגיע אירוע שאין לו נמען, וכולם מחכים.','hot'],['נעצר בבדיקה','הבודק משווה ללוח הצוות, והתרחיש לא נטען עד שמתקנים.']]),
    2:b=>pick(b,H,'אירוע מפורט מגלה את תוכנית התגובה האמיתית. מי רואה אותו?',[['כולם','תרגיל הופך לדליפה.','hot'],['רק צוות עם הרשאה','לכל אירוע סיווג. צוות בלי הרשאה מקבל תרחיש בלעדיו.']]),
    3:b=>slide(b,H,'חזרה מספר',1,6,1,3,v=>[String(v),v===1?'בפעם הראשונה הכול חדש.':'בלי וריאציות, בחזרה '+v+' הצוות כבר יודע מה יגיע ב-00:45. עם וריאציות, הפרטים משתנים וההחלטות נשארות.']),
    4:b=>pick(b,H,'הצוות נתקע, והמנחה עוצר את השעון. מה נרשם?',[['כלום','והתחקיר יראה 31 דקות שהיו בעצם 37.','hot'],['העצירה','6 דקות עצירה, ליד הזמן. המספרים כנים.']]),
    5:b=>pick(b,H,'הכיסא המדיני מנסה לפתוח את הערוץ הצבאי. מה קורה?',[['רואה הכול','במשבר אמיתי אף אחד לא רואה הכול. תרגיל כזה מלמד משהו שלא קורה.','hot'],['נדחה ונרשם','ומופיע בתחקיר.']]),
    6:b=>pick(b,H,'הכיסא לא החליט בזמן. מה קורה לתרחיש?',[['נעצר','והתרגיל נתקע.','hot'],['ממשיך','"לא הוחלט" הוא גם החלטה. השיחה המזויפת ממשיכה לעבוד בתרחיש.']]),
    7:b=>slide(b,H,'דקות עד החלטה',5,60,1,31,v=>[String(v),v<15?'מהר מאוד. אם צעד האימות נשכח, זה עדיין אדום.':(v<=40?'בטווח. השאלה היא אם כל צעדי החובה בוצעו.':'עבר את הזמן המקסימלי: "לא הוחלט".')]),
    8:b=>pick(b,H,'מה כתוב בתחקיר?',[['"פלוני טעה"','ובחזרה הבאה פלוני לא יבוא.','hot'],['"בכיסא המדיני"','הלקח שייך לכיסא. אבל מי מעביר אותו לבא בתור?']]),
    9:b=>pick(b,H,'הכיסא המדיני התחלף אתמול. מה הלוח עושה?',[['כלום','מגלים בתרגיל הבא, או במשבר.','hot'],['אזהרה','"0 חזרות". עובר למתכנן.']]),
    10:b=>slide(b,H,'חודשים בין חזרות',1,12,1,1,v=>{ const sh=Math.round((1-Math.exp(-v/18))*100); return [String(v),'בוותק ממוצע של 18 חודשים, כ-'+sh+'% מהכיסאות מתחלפים בין חזרה לחזרה.']; }) }; }
  };
})();
