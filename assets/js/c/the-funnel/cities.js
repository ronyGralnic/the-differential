/* Case 05 · spec cities for city-engine.js (payback-meter and revenue-nowcaster). Worlds (the analogy scenes) are in worlds.js.
   Keys: cls, intro(tm) html, lmKn, icons {1..10}, modes, wazeLabel, act1 {html, setup(ctx)->{stop}}, act2 html, waze {1..10}, ex {1..10}, models(api)->{1..10: fn(box)} */
window.CITY=window.CITY||{};
(function(){
  const I={ticket:'<path d="M-9 -11 h18 v22 l-3 -2 l-3 2 l-3 -2 l-3 2 l-3 -2 l-3 2z M-5 -5 h10 M-5 0 h10"/>',menu:'<path d="M-9 -11 h18 v22 h-18z M-5 -6 h10 M-5 -1 h10 M-5 4 h6"/>',flame:'<path d="M0 -11 q8 8 4 14 q-2 4 -4 4 q-6 0 -6 -6 q0 -6 6 -12z"/>',
   pots:'<path d="M-11 -2 h9 v8 h-9z M2 -5 h9 v11 h-9z M-11 8 h22"/>',book:'<path d="M-10 -9 h9 q1 0 1 1 v18 q0 -1 -1 -1 h-9z M10 -9 h-9 q-1 0 -1 1 v18 q0 -1 1 -1 h9z"/>',bars:'<path d="M-9 9 v-6 M-3 9 v-12 M3 9 v-8 M9 9 v-15"/>',
   clock:'<circle cx="0" cy="0" r="9"/><path d="M0 -6 v6 l4 3"/>',bell:'<path d="M-7 5 q0 -12 7 -12 q7 0 7 12z M-9 6 h18 M0 9 v2"/>',receipt:'<path d="M-7 -11 h14 v22 l-3 -2 l-4 2 l-4 -2 l-3 2z M-4 -5 h8 M-4 0 h8 M-4 5 h5"/>',
   mail:'<path d="M-10 -7 h20 v14 h-20z M-10 -7 l10 8 l10 -8"/>',mast:'<path d="M0 10 v-20 M-7 -6 h14 M-4 -10 l4 -3 l4 3"/>',wrench:'<path d="M-8 8 l10 -10 M3 -9 a5 5 0 1 0 6 6 l-3 -1 l-1 -3z"/>',gauge:'<path d="M-6 -10 h12 v20 h-12z M-6 4 h12"/>',
   bench:'<path d="M-10 4 h20 M-8 4 v6 M8 4 v6 M-6 -6 l4 10 M2 -8 l4 12"/>',chip:'<rect x="-8" y="-8" width="16" height="16" rx="2"/><path d="M-4 -12 v4 M4 -12 v4 M-4 8 v4 M4 8 v4"/>',siren:'<path d="M-7 6 v-6 a7 7 0 0 1 14 0 v6z M-10 8 h20 M0 -11 v-2 M-9 -7 l-2 -2 M9 -7 l2 -2"/>',
   map:'<path d="M-10 -8 l6 -2 l8 2 l6 -2 v16 l-6 2 l-8 -2 l-6 2z M-4 -10 v16 M4 -8 v16"/>',fan:'<path d="M-10 6 L10 -8 M-10 6 L10 0 M-10 6 L10 8"/>',score:'<path d="M-9 -9 h18 v18 h-18z M-5 -3 l2 2 l4 -4 M-5 5 h10"/>',dish:'<path d="M-9 4 a9 9 0 0 1 18 0z M0 -5 v-4 M-11 6 h22"/>'};
  function pick(box,H,q,opts){ box.append(H('p','cy-mq',q)); const row=H('div','cy-ctl'); const out=H('p','rg-out'); out.setAttribute('aria-live','polite');
    opts.forEach(([l,t,cls])=>{ const b=H('button','cy-btn'+(cls?' '+cls:''),l); b.type='button'; b.addEventListener('click',()=>{ row.querySelectorAll('.cy-btn').forEach(x=>x.classList.toggle('on',x===b)); out.textContent=t; }); row.append(b); }); box.append(row,out); }
  function slide(box,H,label,min,max,step,val,fmt){ const l=H('label','cy-dens'); const b=H('b'); l.append(document.createTextNode(label+': '),b); const r=H('input'); r.type='range'; r.min=min; r.max=max; r.step=step; r.value=val; r.setAttribute('aria-label',label); l.append(r); const out=H('p','rg-out'); out.setAttribute('aria-live','polite'); box.append(l,out);
    const go=()=>{ const [v,t]=fmt(+r.value); b.textContent=v; out.textContent=t; }; r.addEventListener('input',go); go(); }
  const AV=(skin,hair,shirt,extra)=>`<span class="cy-av" aria-hidden="true"><svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="28" fill="#e7ecf3"/><circle cx="30" cy="28" r="12" fill="${skin}"/><path d="M16 28 q0 -18 14 -18 q14 0 14 18 q-3 -8 -14 -8 q-11 0 -14 8z" fill="${hair}"/><circle cx="26" cy="28" r="1.5" fill="#1e2422"/><circle cx="34" cy="28" r="1.5" fill="#1e2422"/><path d="M26 34 q4 2.5 8 0" stroke="#1e2422" stroke-width="1.5" fill="none"/><path d="M12 58 q4 -16 18 -16 q14 0 18 16z" fill="${shirt}"/>${extra||''}</svg></span>`;

  /* ================= Payback Meter ================= */
  window.CITY['payback-meter']={
   cls:'cy-pm',
   intro:tm=>`<p class="cy-k">פרק 3 · אפיון</p><h4 class="cy-h">עשרה פיצ'רים, ומטבח שיודע כמה עולה כל מנה</h4>
    <p>אחרי שה-POC הראה שמדידה בתוך השרת רואה את מה ש"ממוצע לטוקן" מפספס, כותבים <b>אפיון</b>: מסמך שמתאר את המוצר המלא, פיצ'ר אחרי פיצ'ר, כאילו מחר מתחילים לבנות. <b>פיצ'ר</b> הוא יכולת אחת של המוצר, למשל "למדוד כל צעד של כתיבת תשובה".</p>
    <div class="cy-emma">${AV('#e3b48f','#5a3a22','#fffaf0')}<div><span class="cy-k">יום שלישי, 10:02</span><p>מרקו (בדוי), מהנדס FinOps אצל ספק מודלים, מסתכל על לוח שאומר 84%. הוא יודע שמתחת לממוצע מסתתר משהו. ה-POC הראה שהמדידה עובדת. עכשיו צריך מוצר: מה נמדד, איך מחלקים, איפה נשמר, מה רואה ג'ייק, ומה יוצא החוצה בלי לחשוף אף אחד.</p></div></div>
    <div class="cy-prom"><span>מה המוצר מבטיח:</span><p>לכל שאילתה עלות מדודה מתוך השרת, וליד העלות המחיר ששולם. מזה ${tm('fn-margin','רווח')} לכל לקוח ושימוש, ושעון החזר לכל גרסת מודל. ומה שהוא לא מבטיח כתוב במפורש: הוא מודד עלות והכנסה, לא את הערך שהתשובה יצרה.</p></div>
    <p class="cy-acts">שלוש מערכות: <b>1</b> סיפור מקביל שכולם מכירים · <b>2</b> המטבח של הפיצ'רים · <b>3</b> פינה לכל פיצ'ר. מוכנים?</p>`,
   lmKn:'המחוון החי: שלוש דרכים לחלק',
   icons:{1:I.ticket,2:I.menu,3:I.flame,4:I.pots,5:I.book,6:I.bars,7:I.clock,8:I.bell,9:I.receipt,10:I.mail},
   modes:[['waze','המטבח'],['market','המוצר'],['both','שניהם']],
   wazeLabel:'במטבח',
   act1:{html:`<p class="cy-k">מערכה 1 · שירות ערב במטבח</p>
    <p>במסעדה טובה, כל הזמנה נתלית על המסילה ברגע שהיא נכנסת, ולכל מנה יש כרטיס עלות: כמה מצרכים, כמה זמן על הכיריים, כמה גז. השף יודע איזו מנה מרוויחה ואיזו רק נראית טוב בתפריט.</p>
    <div class="cy-ctl"><button type="button" class="cy-btn go" data-a="add">▶ שירות ערב</button><button type="button" class="cy-btn hot" data-a="tear">לחלק את הגז שווה בשווה</button></div>
    <div class="cy-meters"><span><b class="m-v">0</b>מנות יצאו</span><span><b class="m-s">0</b>שעות כיריים</span><span class="cy-eta"><b class="m-r">נראה</b>מה השף רואה</span></div>
    <p class="rg-out" aria-live="polite">כל נקודה על המסילה היא מנה. הכתומות: הצלי של השף, שמבשל שלוש שעות. לחצו "שירות ערב".</p>
    <figure class="cy-nagoya"><svg viewBox="0 0 120 80" aria-hidden="true"><path d="M10 60 h100" class="ng-track"/><rect x="30" y="30" width="24" height="30" class="ng-track"/><rect x="66" y="40" width="24" height="20" class="ng-track"/><circle cx="42" cy="22" r="5" class="ng-car j"/></svg>
    <figcaption><b>זה כלל אצבע אמיתי.</b> בענף המסעדות נהוג לחשב "עלות מנה" לכל פריט בתפריט, ומסעדות רבות מכוונות לכך שעלות המצרכים תהיה בערך שליש ממחיר המנה. מי שלא יודע את המספר הזה, מגלה בסוף השנה שהמנה הכי פופולרית הפסידה.</figcaption></figure>
    <details class="cy-map"><summary>מה במטבח מקביל למה אצלנו</summary><table><tbody>
    <tr><td>הזמנה שנתלית על המסילה</td><td>שאילתה שהשרת מתחיל לכתוב</td></tr><tr><td>זמן על הכיריים, לכל סיר</td><td>זמן שבב וזיכרון, לכל שאילתה</td></tr><tr><td>חשבון הגז של הכיריים המשותפות</td><td>צעד פענוח שכמה שאילתות חולקות</td></tr><tr><td>התפריט והמחירים</td><td>המחירון והחוזים</td></tr><tr><td>לוח הרווחיות של המנות</td><td>לוח הרווח לכל לקוח ושימוש</td></tr><tr><td>מנת השף שצריכה להחזיר את הפיתוח</td><td>גרסת מודל שצריכה להחזיר את האימון</td></tr></tbody></table></details>
    <p class="cy-bridge">במטבח יש עשרים מנות בערב, ושף אחד שזוכר. בשרת יש מיליוני שאילתות ביום, ושלושים מהן חולקות כל צעד. כדי שזה יעבוד צריך מוצר.</p>
    <button type="button" class="cy-morph">עכשיו נחליף את המנות בשאילתות ←</button>`,
    setup(ctx){ const {S,cam,ringPath,pW,reduce}=ctx; const L=ringPath.getTotalLength(); const g=S('g',{class:'cy-cars pm-svc',transform:'translate(0,-14)'},cam);
     const out=pW.querySelector('.rg-out'), mv=pW.querySelector('.m-v'), ms=pW.querySelector('.m-s'), mr=pW.querySelector('.m-r'); let n=0, hours=0, timer=null, flat=false; const dots=[];
     function add(){ if(n>=36){ stop(); out.textContent='36 מנות יצאו. ארבע מהן צלי של שלוש שעות. עכשיו נסו לחלק את חשבון הגז שווה בשווה.'; return; } const p=ringPath.getPointAtLength(L*n/36); const slow=(n%9===4); const c=S('circle',{cx:p.x,cy:p.y,r:slow?9:6,class:'pm-dot'},g); c.style.fill=slow?'#c47a12':'var(--accent, #2f6f68)'; dots.push([c,slow]); n++; hours+=slow?3:.25; mv.textContent=n; ms.textContent=hours.toLocaleString('he-IL',{maximumFractionDigits:1}); }
     function stop(){ if(timer){ clearInterval(timer); timer=null; } }
     pW.querySelector('[data-a="add"]').addEventListener('click',()=>{ if(timer) return; if(reduce){ while(n<36) add(); out.textContent='36 מנות יצאו. הכתומות: הצלי, שלוש שעות כל אחת.'; return; } out.textContent='מנה אחרי מנה. רוב המנות לוקחות רבע שעה על האש. הכתומות לוקחות שלוש שעות.'; timer=setInterval(add,140); });
     pW.querySelector('[data-a="tear"]').addEventListener('click',()=>{ if(n<12){ out.textContent='קודם הגישו כמה מנות.'; return; } if(flat) return; flat=true; stop(); dots.forEach(([d,slow])=>{ if(slow){ d.style.fill='var(--risk, #b3261e)'; d.setAttribute('r',11); } else d.style.opacity=.45; });
       mr.textContent='מטעה'; const share=Math.round(hours/n*100)/100; out.textContent='חילקנו את הגז שווה: '+share.toLocaleString('he-IL')+' שעות כיריים לכל מנה. ככה הצלי נראה זול פי '+Math.round(3/share)+' ממה שהוא באמת, ונכנס לתפריט במחיר שמפסיד בכל צלחת. זה בדיוק "ממוצע לטוקן".'; });
     pW.querySelector('.cy-morph').addEventListener('click',()=>ctx.setMode('market'));
     return {stop}; }},
   act2:'',
   waze:{1:'מסילת הבונים: כל הזמנה נתלית',2:'התפריט: מחיר לכל מנה, ומנות במחיר מיוחד',3:'מונה הגז, והתנור שנקנה בהלוואה',4:'כיריים משותפות: מי מחזיק סיר כמה זמן',5:'פנקס ההזמנות: תיקון בשורה חדשה',6:'לוח הרווחיות של המנות',7:'מנת השף, ולוח העונות',8:'אזעקת המקרר',9:'הקבלה המפורטת לשולחן',10:'סקר העלויות של איגוד המסעדות'},
   ex:{1:'השאילתה של סוכן הקוד: 1,500 צעדים נמדדים, כל אחד עם 60 אלף טוקנים בזיכרון.',2:'ג\'ייק: 10% הנחה, וחצי מהשאלה מהמטמון. 12.4 סנט.',3:'2.10 דולר לשעת שבב, כולל חשמל ואירוח (מדומה).',4:'סוכן הקוד מקבל את רוב חלק הזיכרון: 4.8 סנט לשאילתה.',5:'שורה בפנקס, עם גרסת מחירון, תעריף ושיטה. אין DELETE.',6:'84.3% בממוצע. 61% בסוכן הקוד, מוצג ליד.',7:'גרסה v7: חזרו 38%. מחליפה בעוד שבועיים.',8:'סוכן הקוד ירד ל-58%: מרקו מקבל התראה.',9:'ג\'ייק רואה: סוכן הקוד הוא 70% מהחשבון.',10:'מפתחים 70%, צרכנים 97%. ארגונים: מוסתר.'},
   models({H}){ return {
    1:b=>pick(b,H,'המדידה מוסיפה תקורה לשרת. מה עושים?',[['מודדים כל צעד ושולחים מיד','כל צעד מחכה לרשת. השרת מאט, ומישהו מכבה את המדידה.','hot'],['רושמים לזיכרון ושולחים באצווה','תקורה קטנה, והמדידה נשארת דולקת.']]),
    2:b=>pick(b,H,'המחירון יורד ב-14:00. שאילתה מ-13:59 מסתיימת ב-14:03. באיזה מחיר?',[['במחיר החדש','ההיסטוריה זזה, והרווח של אתמול משתנה היום.','hot'],['במחיר שהיה כשנכנסה','השאילתה נושאת את גרסת המחירון שלה.']]),
    3:b=>slide(b,H,'שנות שימוש בשבב',2,8,1,4,v=>[String(v),v<=3?'כל שעה נושאת חלק גדול מהשבב. העלות נראית גבוהה.':(v<=5?'הנחה מקובלת. התעריף כתוב כגרסה, עם נימוק.':'השבב "חי" הרבה שנים, והעלות נראית נמוכה. אם זה לא נכון, הרווח מנופח. לכן כל שינוי גלוי בלוח.')]),
    4:b=>pick(b,H,'באותו צעד: שאילתה עם 60 אלף טוקנים ושאילתה עם 300. איך מחלקים?',[['חצי חצי','הקשר הארוך נראה זול בחצי, והשימוש הכי יקר מתומחר כאילו הוא רגיל.','hot'],['קבוע שווה, זיכרון לפי מי שהחזיק','הארוכה נושאת את מה שהיא באמת מאטה.']]),
    5:b=>pick(b,H,'תעריף החשמל של ספטמבר התברר כגבוה ב-3%. מה קורה לשורות?',[['מעדכנים אותן','ומי שקרא את הדוח בספטמבר רואה מספר אחר בנובמבר, בלי לדעת למה.','hot'],['שורת תיקון חדשה','המקור נשאר, התיקון לידו, עם הפניה.']]),
    6:b=>pick(b,H,'הלוח מציג 84%. מה עוד חייב להופיע?',[['כלום, זה המספר','והסוכן של ג\'ייק ב-61% מתחבא בממוצע.','hot'],['הנמוך, הגבוה, והמגמה','61% עומד ליד 84%, עם חץ למטה.']]),
    7:b=>slide(b,H,'שבועות עד שמחליפה יוצאת',4,30,2,8,v=>{ const back=v>=16; return [String(v),back?'הגרסה מחזירה את עלות האימון בשבוע 16 (POC, מדומה).':'הגרסה לא מחזירה את עצמה: לפי ה-POC, מחליפה אחרי 8 שבועות משאירה 73% בשנה.']; }),
    8:b=>pick(b,H,'עשר התראות על אותה ירידה ביום. מה עושים?',[['שולחים את כולן','אחרי שבוע אף אחד לא קורא.','hot'],['מקבצים לאחת, עם בעלים','התראה אחת, למי שיכול לפעול.']]),
    9:b=>pick(b,H,'ג\'ייק רוצה לדעת כמה הספק מרוויח עליו. מה הוא רואה?',[['את העלות של הספק','סוד מסחרי יצא, והמחירון הופך למשא ומתן על עלות פלוס.','hot'],['מה ששילם ומה שצרך','לפי סוכן ופרויקט. מספיק כדי להחליט.']]),
    10:b=>slide(b,H,'כמה לקוחות בפלח',1,12,1,1,v=>[String(v),v<5?'פחות מ-5: הפלח לא מתפרסם. כל מספר עליו הוא מספר על לקוח.':'5 ומעלה: מתפרסם, עם רעש מדוד שמונע לשחזר לקוח מהפרש בין דוחות.'])}; }
  };

  /* ================= Revenue Nowcaster ================= */
  window.CITY['revenue-nowcaster']={
   cls:'cy-rn',
   intro:tm=>`<p class="cy-k">פרק 3 · אפיון</p><h4 class="cy-h">עשרה פיצ'רים, ותחנה שמנבאת את הזרם</h4>
    <p>אחרי שה-POC הראה שמסנן אחד מאחד ${tm('fn-proxy','מדדים עקיפים')} סותרים להערכה מדויקת, כותבים <b>אפיון</b>: מסמך שמתאר את המוצר המלא, פיצ'ר אחרי פיצ'ר. <b>פיצ'ר</b> הוא יכולת אחת, למשל "להתריע כשהקצב יורד".</p>
    <div class="cy-emma">${AV('#e9c4a2','#111','#3b5b8a')}<div><span class="cy-k">5 בנובמבר, בוקר</span><p>הלן (בדויה) הייתה חזאית עשרים שנה. עכשיו היא צריכה לחזות זרם של כסף: שלושה קבצים מגיעים, שלושה סיפורים. ה-POC הראה שהמסנן עובד, כשיש מול מה לכייל. עכשיו צריך מוצר: מכשירים, מודל, לוח, ומקור אמת.</p></div></div>
    <div class="cy-prom"><span>מה המוצר מבטיח:</span><p>הערכה חודשית של הכנסות מפתחי המודלים, עם טווח כן, והתראה על האטה לפני הדוח. ומה שהוא לא מבטיח כתוב במפורש: הוא מכויל מול מה שחברות בוחרות לפרסם.</p></div>
    <p class="cy-acts">שלוש מערכות: <b>1</b> סיפור מקביל שכולם מכירים · <b>2</b> התחנה של הפיצ'רים · <b>3</b> מכשיר לכל פיצ'ר. מוכנים?</p>`,
   lmKn:'המחוון החי: כמה אמת צריך',
   icons:{1:I.mast,2:I.wrench,3:I.gauge,4:I.bench,5:I.chip,6:I.siren,7:I.map,8:I.fan,9:I.score,10:I.mail},
   modes:[['waze','התחנה'],['market','המוצר'],['both','שניהם']],
   wazeLabel:'בתחנה',
   act1:{html:`<p class="cy-k">מערכה 1 · יום בתחנה המטאורולוגית</p>
    <p>חזאים מאחדים מכשירים כבר מאה שנה: מד לחץ, שבשבת, לוויין, בלון. כל אחד רואה חלק, אף אחד לא שלם. מודל מאחד אותם לתחזית, עם טווח. ובכל ערב, מד הגשם בחצר אומר מה ירד בפועל, ומולו בודקים.</p>
    <div class="cy-ctl"><button type="button" class="cy-btn go" data-a="add">▶ חודש של תחזיות</button><button type="button" class="cy-btn hot" data-a="tear">להוריד את מד הגשם</button></div>
    <div class="cy-meters"><span><b class="m-v">0</b>תחזיות</span><span><b class="m-s">0</b>נבדקו מול גשם</span><span class="cy-eta"><b class="m-r">כן</b>מה הטווח שווה</span></div>
    <p class="rg-out" aria-live="polite">כל נקודה היא תחזית של יום. וי ירוק: נבדקה מול מד הגשם. לחצו "חודש של תחזיות".</p>
    <figure class="cy-nagoya"><svg viewBox="0 0 120 80" aria-hidden="true"><path d="M20 66 L100 30 L100 70 Z" class="ng-track"/><circle cx="24" cy="66" r="5" class="ng-car j"/></svg>
    <figcaption><b>זה נוהג אמיתי.</b> "קונוס אי הוודאות" של המרכז הלאומי להוריקנים בארה"ב נבנה מהטעויות של התחזיות בשנים הקודמות, כך שמרכז הסערה נשאר בתוכו בערך שני שלישים מהזמן. הקונוס כן, כי כל תחזית נבדקת אחר כך מול מה שקרה.</figcaption></figure>
    <details class="cy-map"><summary>מה בתחנה מקביל למה אצלנו</summary><table><tbody>
    <tr><td>מד לחץ, שבשבת, לוויין</td><td>כרטיסי אשראי, נתב API, פאנלים</td></tr><tr><td>טכנאי שבודק את המכשירים</td><td>בריאות המדד</td></tr><tr><td>מד הגשם בחצר</td><td>רשם האמת</td></tr><tr><td>מודל התחזית</td><td>מסנן קלמן</td></tr><tr><td>קונוס אי הוודאות</td><td>טווח של 90%</td></tr><tr><td>כרטיס הציונים של החזאי</td><td>בדיקה לאחור</td></tr></tbody></table></details>
    <p class="cy-bridge">לתחנה יש מד גשם בחצר, וכל ערב יורד גשם או לא. למכ"ם של הכסף, האמת מגיעה כשחברה בוחרת לפרסם. כדי שזה יעבוד צריך מוצר, וצריך מישהו שימלא את מד הגשם.</p>
    <button type="button" class="cy-morph">עכשיו נחליף את המכשירים במדדים ←</button>`,
    setup(ctx){ const {S,cam,ringPath,pW,reduce}=ctx; const L=ringPath.getTotalLength(); const g=S('g',{class:'cy-cars rn-day',transform:'translate(0,-14)'},cam);
     const out=pW.querySelector('.rg-out'), mv=pW.querySelector('.m-v'), ms=pW.querySelector('.m-s'), mr=pW.querySelector('.m-r'); let n=0, chk=0, timer=null, gone=false; const dots=[];
     function add(){ if(n>=30){ stop(); out.textContent='30 תחזיות, 30 בדיקות. כשהטווח אומר 90%, הוא באמת מכיל את מה שירד 9 פעמים מתוך 10. עכשיו נסו להוריד את מד הגשם.'; return; } const p=ringPath.getPointAtLength(L*n/30); const c=S('circle',{cx:p.x,cy:p.y,r:6,class:'rn-dot'},g); const ok=!gone; c.style.fill=ok?'#1a9a6a':'#9aa3b2'; dots.push(c); n++; if(ok){ chk++; } mv.textContent=n; ms.textContent=chk; }
     function stop(){ if(timer){ clearInterval(timer); timer=null; } }
     pW.querySelector('[data-a="add"]').addEventListener('click',()=>{ if(timer) return; if(reduce){ while(n<30) add(); return; } out.textContent='כל בוקר תחזית, כל ערב בדיקה מול מד הגשם.'; timer=setInterval(add,160); });
     pW.querySelector('[data-a="tear"]').addEventListener('click',()=>{ if(gone) return; gone=true; mr.textContent='לא ידוע'; out.textContent='מד הגשם ירד. התחנה ממשיכה לנבא כל בוקר, והטווח עדיין אומר 90%. אבל אף אחד כבר לא יודע אם זה נכון. הנקודות האפורות: תחזיות שאף אחד לא בדק.'; if(n>=30){ n=0; dots.forEach(d=>d.remove()); dots.length=0; chk=0; mv.textContent=0; ms.textContent=0; } if(!timer&&!reduce) timer=setInterval(add,160); else if(reduce) while(n<30) add(); });
     pW.querySelector('.cy-morph').addEventListener('click',()=>ctx.setMode('market'));
     return {stop}; }},
   act2:'',
   waze:{1:'עמוד המכשירים: לחץ, רוח, לוויין',2:'הטכנאי עם ארגז הכלים',3:'מד הגשם בחצר',4:'שולחן הכיול',5:'מחשב התחזית',6:'צופר הסערה',7:'מפת התחזית עם הקונוס',8:'מניפת המסלולים',9:'לוח הציונים של החזאים',10:'החוזה עם שירות הלוויינים'},
   ex:{1:'שלושה קבצים של אוקטובר הגיעו עד ה-5 בחודש.',2:'אף מדד לא קפץ לבד באוקטובר: כולם במשקל רגיל.',3:'סוף אוקטובר: קצב שנתי של 81 מיליארד, עם ההגדרה.',4:'הכרטיסים מתחת ב-2.5% לחודש, הנתב מעל ב-4%.',5:'אוקטובר: ⁦33.6 ± 1.2⁩ מיליארד לחודש.',6:'ההאטה התחילה במאי; ההתראה ביוני.',7:'קלייר רואה את הקו, תמיד עם הטווח.',8:'מהקצב של היום: רוב המסלולים לא מגיעים ל-3 טריליון ב-2030.',9:'שש נקודות אמת בשנתיים: כיסוי 62%.',10:'שלושה מדדים, שלושה רישיונות, ותוכנית חלופית לכל אחד.'},
   models({H}){ return {
    1:b=>pick(b,H,'קובץ הפאנלים לא הגיע. מה המסנן עושה?',[['מחכה לו','והתחזית של החודש תקועה.','hot'],['ממשיך בלעדיו','עם שני מדדים, וטווח רחב יותר.']]),
    2:b=>pick(b,H,'הנתב קפץ ב-60% בחודש, והאחרים לא. מה עושים?',[['מאמינים לו','שוק לא זז במדד אחד. כנראה לקוח חדש אצל הספק.','hot'],['מורידים משקל עד בדיקה','עדיף להאט מלטעות.']]),
    3:b=>pick(b,H,'שני מספרים של אותה חברה, באותו חודש: "קצב שנתי" ו"הכנסה רשומה". מה עושים?',[['ממוצע','שני מספרים במשמעות שונה, וממוצע של שניהם הוא שום דבר.','hot'],['שומרים את ההגדרה של כל אחד','ומתרגמים להגדרה אחת, עם טווח.']]),
    4:b=>slide(b,H,'נקודות אמת בשנתיים',2,22,2,6,v=>[String(v),v>=20?'אמת מדויקת כל חודש: הכיול חזק.':'הכרזות של קצב שנתי: גם עם '+v+', הכיסוי נשאר מתחת להבטחה, כי ההגדרה עצמה מוטה.']),
    5:b=>pick(b,H,'מה המסנן מוציא?',[['מספר','33.6 מיליארד. נשמע בטוח.','hot'],['מספר עם טווח','⁦33.6 ± 1.2⁩. כמה לסמוך.']]),
    6:b=>pick(b,H,'הקצב ירד מתחת ל-15% חודש אחד, רק בגלל מדד אחד. התראה?',[['כן','התראות שווא, וכולם מפסיקים לקרוא.','hot'],['רק אם גם הגבול העליון מתחת','מדד אחד לא מפעיל צופר.']]),
    7:b=>pick(b,H,'קלייר רוצה רק את הקו. מה מקבלת?',[['רק את הקו','והקו נראה בטוח מדי.','hot'],['קו וטווח, תמיד','"⁦33.6 ± 1.2⁩", לא "33.6".']]),
    8:b=>pick(b,H,'המניפה מראה שרוב המסלולים לא מגיעים ל-3 טריליון. מה זה?',[['תחזית','לא. זה "אם הקצב יימשך".','hot'],['תרחיש מהקצב של היום','כתוב על כל ציר.']]),
    9:b=>pick(b,H,'הכרטיס מראה כיסוי של 100%, על שתי נקודות אמת. מה עושים?',[['מתגאים','שתי נקודות זה לא כרטיס.','hot'],['כותבים על כמה זה נשען','בגדול, ליד המספר.']]),
    10:b=>pick(b,H,'ספק הכרטיסים לא מחדש. מה קורה?',[['המכ"ם נעצר','רק אם הוא היה הכרחי.','hot'],['ממשיך בלעדיו','שני מדדים, טווח רחב יותר, והתראה 60 יום לפני.']])}; }
  };
})();
