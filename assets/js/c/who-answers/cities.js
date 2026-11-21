/* Case 06 · spec cities for city-engine.js (second-call and turnout-signal).
   Keys: cls, intro(tm) html, lmKn, icons {1..10}, modes, wazeLabel, act1 {html, setup(ctx)->{stop}}, act2 html, waze {1..10}, ex {1..10}, models(api)->{1..10: fn(box)}
   The worlds themselves (a kitchen with a pot of soup; a wedding hall) are in worlds.js. */
window.CITY=window.CITY||{};
(function(){
  const I={pot:'<path d="M-10 -4 h20 v8 q0 6 -6 6 h-8 q-6 0 -6 -6z M-12 -4 h24"/>',ledger:'<path d="M-8 -11 h16 v22 h-16z M-4 -5 h8 M-4 0 h8 M-4 5 h5"/>',dice:'<rect x="-9" y="-9" width="18" height="18" rx="3"/><circle cx="-4" cy="-4" r="1.6"/><circle cx="4" cy="4" r="1.6"/><circle cx="0" cy="0" r="1.6"/>',
   gauge:'<path d="M-10 4 a10 10 0 0 1 20 0"/><path d="M0 4 L6 -5"/>',ladle:'<path d="M-10 -10 L4 4"/><circle cx="6" cy="6" r="5"/>',swap:'<path d="M-10 -4 h16 l-4 -4 M10 4 h-16 l4 4"/>',
   sieve:'<path d="M-10 -4 h20 q-2 12 -10 12 q-8 0 -10 -12z M-6 0 h12 M-4 4 h8"/>',scale:'<path d="M0 -10 v18 M-10 -4 h20 M-10 -4 l-3 7 h6z M10 -4 l-3 7 h6z"/>',wave:'<path d="M-10 0 q3 -6 6 0 t6 0 t6 0 t3 0"/>',
   menu:'<path d="M-8 -11 h16 v22 h-16z M-4 -6 h8 M-4 -2 h8 M-4 2 h8 M-4 6 h5"/>',list:'<path d="M-8 -10 h16 v20 h-16z M-5 -5 h2 M-1 -5 h6 M-5 0 h2 M-1 0 h6 M-5 5 h2 M-1 5 h6"/>',
   match:'<circle cx="-4" cy="0" r="6"/><circle cx="4" cy="0" r="6"/>',check:'<path d="M-9 -9 h18 v18 h-18z M-5 -1 l3 3 l6 -6"/>',model:'<path d="M0 -10 v20 M0 -2 L-8 6 M0 -2 L8 6 M0 -10 L-6 -4 M0 -10 L6 -4"/>',
   cal:'<rect x="-9" y="-8" width="18" height="17" rx="2"/><path d="M-9 -3 h18 M-4 -11 v5 M4 -11 v5"/>',seat:'<path d="M-6 -10 v12 h12 v8 M-6 2 v8"/>',bell:'<path d="M-8 6 q0 -14 8 -14 q8 0 8 14z M-10 6 h20 M0 9 v2"/>',
   ghost:'<path d="M-8 10 v-12 a8 8 0 0 1 16 0 v12 l-4 -3 l-4 3 l-4 -3z"/>',lock:'<rect x="-8" y="-2" width="16" height="12" rx="2"/><path d="M-5 -2 v-4 a5 5 0 0 1 10 0 v4"/>',doc:'<path d="M-8 -11 h12 l4 4 v18 h-16z M-4 -3 h8 M-4 2 h8"/>'};
  function pick(box,H,q,opts){ box.append(H('p','cy-mq',q)); const row=H('div','cy-ctl'); const out=H('p','rg-out'); out.setAttribute('aria-live','polite');
    opts.forEach(([l,t,cls])=>{ const b=H('button','cy-btn'+(cls?' '+cls:''),l); b.type='button'; b.addEventListener('click',()=>{ row.querySelectorAll('.cy-btn').forEach(x=>x.classList.toggle('on',x===b)); out.textContent=t; }); row.append(b); }); box.append(row,out); }
  function slide(box,H,label,min,max,step,val,fmt){ const l=H('label','cy-dens'); const b=H('b'); l.append(document.createTextNode(label+': '),b); const r=H('input'); r.type='range'; r.min=min; r.max=max; r.step=step; r.value=val; r.setAttribute('aria-label',label); l.append(r); const out=H('p','rg-out'); out.setAttribute('aria-live','polite'); box.append(l,out);
    const go=()=>{ const [v,t]=fmt(+r.value); b.textContent=v; out.textContent=t; }; r.addEventListener('input',go); go(); }
  const AV=(skin,hair,shirt)=>`<span class="cy-av" aria-hidden="true"><svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="28" fill="#e7ecf3"/><circle cx="30" cy="28" r="12" fill="${skin}"/><path d="M16 28 q0 -18 14 -18 q14 0 14 18 q-3 -8 -14 -8 q-11 0 -14 8z" fill="${hair}"/><circle cx="26" cy="28" r="1.5" fill="#1e2422"/><circle cx="34" cy="28" r="1.5" fill="#1e2422"/><path d="M26 34 q4 2.5 8 0" stroke="#1e2422" stroke-width="1.5" fill="none"/><path d="M12 58 q4 -16 18 -16 q14 0 18 16z" fill="${shirt}"/></svg></span>`;

  /* ================= Second Call · the kitchen ================= */
  window.CITY['second-call']={
   cls:'cy-sc',
   intro:tm=>`<p class="cy-k">פרק 3 · אפיון</p><h4 class="cy-h">עשרה פיצ'רים, ומרק שבוחשים עד התחתית</h4>
    <p>אחרי שה-POC הראה שעוגן קטן ואקראי מוריד את הטעות מ-3.1 ל-0.8 נקודות, כותבים <b>אפיון</b>: מסמך שמתאר את המוצר המלא, פיצ'ר אחרי פיצ'ר, כאילו מחר מתחילים לבנות. <b>פיצ'ר</b> הוא יכולת אחת של המוצר, למשל "להעביר את הניסיונות של מחר לתא שחסר".</p>
    <div class="cy-emma">${AV('#c99068','#2e1a12','#b34a2a')}<div><span class="cy-k">יום 3 בשטח, 18:00</span><p>חואנה (בדויה) מסתכלת על הלוח: 412 תשובות, רובן ממבוגרים עם תואר. ה-POC הראה שאפשר לתקן תוך כדי. עכשיו צריך מוצר: מאיפה מגרילים, מה נרשם על כל ניסיון, מי מחליט לאן עובר המאמץ, ואיך לא מטרידים את דרנל.</p></div></div>
    <div class="cy-prom"><span>מה המוצר מבטיח:</span><p>הסקר רואה מי חסר בזמן שהוא בשטח, ומחזיר אותו פנימה: ב${tm('wa-responsive','תכנון מסתגל')}, ב${tm('wa-paradata','נתוני תהליך')} ובעוגן אקראי. ומה שהוא לא מבטיח כתוב במפורש: מי שהחליט ביום הבחירות עצמו, הוא לא רואה.</p></div>
    <p class="cy-acts">שלוש מערכות: <b>1</b> סיפור מקביל שכולם מכירים · <b>2</b> המטבח של הפיצ'רים · <b>3</b> חדר לכל פיצ'ר. מוכנים?</p>`,
   lmKn:'המחוון החי: כמה לעוגן',
   icons:{1:I.dice,2:I.ledger,3:I.model,4:I.gauge,5:I.ladle,6:I.swap,7:I.sieve,8:I.scale,9:I.wave,10:I.menu},
   modes:[['waze','המטבח'],['market','המוצר'],['both','שניהם']],
   wazeLabel:'במטבח',
   act1:{html:`<p class="cy-k">מערכה 1 · המרק של גאלופ</p>
    <p>ג'ורג' גאלופ, מחלוצי הסקרים, אמר שסקר הוא כמו טעימה ממרק: אם המרק מעורבב היטב, כף אחת מספיקה. אבל מה קורה כשהמרק לא מעורבב, והכף תמיד עולה מהשכבה העליונה?</p>
    <div class="cy-ctl"><button type="button" class="cy-btn go" data-a="add">▶ לטעום מלמעלה</button><button type="button" class="cy-btn hot" data-a="tear">לבחוש עד התחתית</button></div>
    <div class="cy-meters"><span><b class="m-v">0</b>טעימות</span><span><b class="m-s">0%</b>מהשכבה התחתונה</span><span class="cy-eta"><b class="m-r">?</b>מה הטבח חושב</span></div>
    <p class="rg-out" aria-live="polite">כל נקודה על הדרך היא כף אחת. לחצו "לטעום מלמעלה".</p>
    <figure class="cy-nagoya"><svg viewBox="0 0 120 80" aria-hidden="true"><path d="M20 30 h80 v28 q0 14 -14 14 h-52 q-14 0 -14 -14z" class="ng-track"/><path d="M16 30 h88" class="ng-track"/><circle cx="60" cy="40" r="5" class="ng-car j"/></svg>
    <figcaption><b>זה רעיון אמיתי.</b> גאלופ השווה סקר לטעימה ממרק מעורבב, והסוקרים חוזרים על זה עד היום. ותכנון מסתגל של סקרים, שבו משנים את המאמץ תוך כדי לפי מי שחסר, פורסם ב-2006 (Groves ו-Heeringa). אבל אצל סוקרי בחירות, רוב הזמן, טועמים מלמעלה ומתבלים בסוף.</figcaption></figure>
    <details class="cy-map"><summary>מה במטבח מקביל למה אצלנו</summary><table><tbody>
    <tr><td>הסיר והכף העמוקה</td><td>פאנל ועוגן אקראי</td></tr><tr><td>פנקס הטעימות</td><td>תיק משיב ונתוני תהליך</td></tr><tr><td>כרטיס הטעימה: "תפל בתחתית"</td><td>מדד הפיזור כל שש שעות</td></tr><tr><td>לשלוח את המצקת לתחתית</td><td>מקצה המאמץ</td></tr><tr><td>כף ארוכה יותר</td><td>ערוץ אחר: מכתב, מסרון</td></tr><tr><td>לטעום מלמעלה ומלמטה ולהשוות</td><td>כיול לעוגן</td></tr><tr><td>לטעום שוב רגע לפני ההגשה</td><td>גל שני</td></tr><tr><td>התפריט על הקיר</td><td>הצהרת מתודולוגיה</td></tr></tbody></table></details>
    <p class="cy-bridge">במטבח יש סיר אחד וטבח אחד. בסקר, הסיר הוא מדינה, והכף היא טלפון שרוב האנשים לא עונים לו. כדי שזה יעבוד צריך מוצר.</p>
    <button type="button" class="cy-morph">עכשיו נחליף את המצקת במערכת ←</button>`,
    setup(ctx){ const {S,cam,ringPath,pW,reduce}=ctx; const L=ringPath.getTotalLength(); const g=S('g',{class:'cy-cars dm-log',transform:'translate(0,-14)'},cam);
     const out=pW.querySelector('.rg-out'), mv=pW.querySelector('.m-v'), ms=pW.querySelector('.m-s'), mr=pW.querySelector('.m-r'); let n=0, deep=0, stirred=false, timer=null; const dots=[];
     function add(){ if(n>=40){ stop(); out.textContent='40 כפות, כולן מלמעלה. הטבח בטוח שהמרק מלוח ושמנוני. עכשיו נסו לבחוש עד התחתית.'; return; }
       const p=ringPath.getPointAtLength(L*n/40); const low=stirred&&(n%2===1); const c=S('circle',{cx:p.x,cy:p.y,r:6,class:'dm-dot'},g); c.style.fill=low?'#2f6f68':'#c47a12'; dots.push(c); n++; if(low) deep++;
       mv.textContent=n; ms.textContent=Math.round(100*deep/n)+'%'; mr.textContent=stirred?(deep/n>.3?'מאוזן':'משתפר'):'מלוח'; }
     function stop(){ if(timer){ clearInterval(timer); timer=null; } }
     pW.querySelector('[data-a="add"]').addEventListener('click',()=>{ if(timer) return; if(n>=40){ n=0; deep=0; dots.forEach(d=>d.remove()); dots.length=0; }
       if(reduce){ while(n<40) add(); return; } out.textContent=stirred?'כף מלמעלה, כף מהתחתית. הירוקים הם הגזר שתמיד שקע.':'כף אחרי כף, כולן מהשכבה העליונה. הכתומים: שמן ומלח.'; timer=setInterval(add,140); });
     pW.querySelector('[data-a="tear"]').addEventListener('click',()=>{ if(stirred) return; stirred=true; stop(); dots.forEach((d,i)=>{ if(i%2===1){ d.style.fill='#2f6f68'; deep++; } }); if(n) { ms.textContent=Math.round(100*deep/n)+'%'; mr.textContent='משתנה'; }
       out.textContent='הטבח שלח את המצקת לתחתית. חצי מהכפות מגיעות עכשיו מהשכבה ששקעה, והטעם שהוא מדווח משתנה לגמרי. אותו סיר, אותה מצקת, מקום אחר.'; });
     pW.querySelector('.cy-morph').addEventListener('click',()=>ctx.setMode('market'));
     return {stop}; }},
   act2:'',
   waze:{1:'הסיר הגדול, וכף עמוקה בצד',2:'פנקס שבו נרשמת כל טעימה, גם כשהכף חזרה ריקה',3:'הטבח הוותיק יודע מה שוקע',4:'כרטיס הטעימה: איפה מלוח, איפה תפל',5:'המצקת נשלחת לתחתית',6:'כף ארוכה יותר, כשהקצרה לא מגיעה',7:'מסננת: רכיב רקוב לא נכנס',8:'טועמים מלמעלה ומלמטה, ומתבלים עד שזה אותו טעם',9:'טעימה אחרונה רגע לפני ההגשה',10:'התפריט על הקיר: מה במרק ואיך בושל'},
   ex:{1:'12 באוקטובר: 30,000 מהפאנל, ו-2,200 כתובות אקראיות לעוגן. ה-seed נשמר.',2:'שיחה שלישית לבית בכפר: אין מענה. נרשם עם מזהה מהמרכזייה.',3:'הלילה: 0.9% לטלפון, 2.4% למסרון, בתא הכפרי בלי תואר.',4:'יום 3, 18:00: CV 0.52, והתא הכפרי בלי תואר מושך הכי הרבה.',5:'משמרת בוקר: 38% מהניסיונות לתאים הכפריים בלי תואר, במקום 14%.',6:'דרנל מקבל מכתב עם קוד אישי ו-10 דולר. ממלא בהפסקה.',7:'טיילר: 70 שניות, 12 שורות זהות. לא נספר.',8:'בלי כיול 53.3%, אחרי כיול לעוגן 50.8%.',9:'27 באוקטובר: 71% חוזרים, 64 עוברים מ"אולי" ל"בטוח".',10:'ההצהרה מתפרסמת: 52,000 ניסיונות, 1,374 תשובות, 6.8% הוצאו, ומה לא ראינו.'},
   models({H}){ return {
    1:b=>pick(b,H,'העוגן מתקדם לאט. מישהו מציע להוסיף לו 50 משיבים מהפאנל. מה קורה?',[['נכנסים','ואז העוגן הוא עוד פאנל קטן, עם אותה הטיה. אין יותר למה לכייל.','hot'],['נדחה','המקור ננעל ברגע ההגרלה. מי שלא הוגרל, לא בעוגן. העוגן איטי, ובשביל זה הוא שווה.']]),
    2:b=>pick(b,H,'מוקדן מסמן "אין מענה" לשיחה שלא בוצעה. מה קורה?',[['נספר','ואז התא נראה "קשה" יותר ממה שהוא, והמקצה שולח לשם מאמץ על בסיס שקר.','hot'],['מסומן חשוד','בלי מזהה מהמרכזייה, הניסיון לא נספר, וחואנה רואה אותו בלוח החריגים.']]),
    3:b=>slide(b,H,'סיכוי שהמודל נותן לתא',0,10,1,1,v=>[v+'%',v===0?'גם בסיכוי אפס, הרצפה נותנת לתא ניסיונות. אחרת המודל מוותר על אנשים, ואז הם באמת לא עונים.':(v<3?'סיכוי נמוך: בדיוק לשם המקצה ישלח יותר, עם ערוץ אחר.':'סיכוי סביר: התא מקבל את החלק הרגיל.')]),
    4:b=>slide(b,H,'CV של שיעורי ההיענות',0,80,5,52,v=>[(v/100).toFixed(2),v<=30?'מתחת לסף: אין סיבה להזיז מאמץ. ובכל זאת, מה שבתוך התאים לא נמדד כאן.':'מעל 0.3: המקצה מתעורר במשמרת הבאה, והתא שמושך הכי הרבה מופיע ראשון בלוח.']),
    5:b=>pick(b,H,'התא הכפרי בלי תואר הכי חסר. כמה מהמשמרת הבאה הולך אליו?',[['הכול','ואז כל שאר התאים נעצרים, ומחר הם החסרים. וגם, אנשים בתא הזה מקבלים טלפון שישי.','hot'],['עד פי 3 מהחלק שלו','והשאר ממשיכים. ואף אדם לא מקבל יותר מ-4 פניות.']]),
    6:b=>pick(b,H,'דרנל כותב "הסר" במסרון. מה קורה בשאר הערוצים?',[['המכתב כבר בדרך, אז יוצא','והוא מקבל מכתב יומיים אחרי שביקש לא. זה בדיוק חוסר האמון שמנסים למדוד.','hot'],['הכול נעצר','"הסר אותי" סוגר את התיק בכל הערוצים מיד, ונספר כסירוב בתא שלו.']]),
    7:b=>slide(b,H,'כמה מהמשיבים נפסלים',0,20,1,7,v=>[v+'%',v>12?'יותר מדי: קוראים מהירים ועונים מהטלפון נפסלים, והתאים החסרים נעשים חסרים יותר.':(v<3?'מעט: אולי הספים רכים מדי, ובוטים נכנסים.':'בטווח של רוב הסקרים. ומה שבאמצע נכנס עם דגל.')]),
    8:b=>pick(b,H,'בתא אחד יש בעוגן רק 22 איש. איך מכיילים?',[['לפי ה-22','ואז אדם אחד בעוגן מזיז את כל התא, והמשקלות מתנפחים.','hot'],['מאחדים עם תא שכן','תא עם פחות מ-30 בעוגן מכויל יחד עם שכן. פחות מדויק, הרבה פחות רועש.']]),
    9:b=>pick(b,H,'בגל השני חזרו 71%. מי חזר יותר?',[['זה לא משנה','אם חוזרים בעיקר המבוגרים, הגל השני מחזיר את ההטיה שתוקנה בגל הראשון.','hot'],['זה משנה, ומתפרסם','מי שחזר משוקלל לפי מי שהיה, ושיעור החזרה לכל תא כתוב בהצהרה.']]),
    10:b=>pick(b,H,'מנהל מבקש להוריד מההצהרה את 6.8% שהוצאו. מה קורה?',[['יורד','ואז קורא לא יודע שמישהו סינן, וגם לא כמה.','hot'],['נשאר, ואפשר להסביר','המספר נשלף מהטבלה ונחתם. אפשר להוסיף הסבר, אי אפשר למחוק שורה.']]) }; }
  };

  /* ================= Turnout Signal · the wedding hall ================= */
  window.CITY['turnout-signal']={
   cls:'cy-ts',
   intro:tm=>`<p class="cy-k">פרק 3 · אפיון</p><h4 class="cy-h">עשרה פיצ'רים, ורשימת מוזמנים</h4>
    <p>אחרי שה-POC הראה שבשנה רגילה ההיסטוריה מנבאת טוב מהסולם, כותבים <b>אפיון</b>: מסמך שמתאר את המוצר המלא, פיצ'ר אחרי פיצ'ר. <b>פיצ'ר</b> הוא יכולת אחת של המוצר, למשל "למצוא כל משיב בקובץ הבוחרים".</p>
    <div class="cy-emma">${AV('#7a4b32','#1d1410','#5a3d7a')}<div><span class="cy-k">ספטמבר 2026</span><p>מרים (בדויה) מחזיקה את ${tm('wa-voterfile','קובץ הבוחרים')} הארצי. רות רוצה לספור רק את מי שבאמת יבוא. ה-POC הראה שזה עובד בשנה רגילה. עכשיו צריך מוצר: מאיפה הקובץ, איך מוצאים בו משיב, מה עושים עם מי שלא נמצא, ואיך יודעים שהשנה לא רגילה.</p></div></div>
    <div class="cy-prom"><span>מה המוצר מבטיח:</span><p>כל משיב נשקל לפי מה שעשה, לא לפי מה שהבטיח ב${tm('wa-likely','סולם 1-10')}. ומה שהוא לא מבטיח כתוב במפורש: מי שלא הצביע בעבר ובא עכשיו, הוא כמעט לא רואה.</p></div>
    <p class="cy-acts">שלוש מערכות: <b>1</b> סיפור מקביל שכולם מכירים · <b>2</b> האולם של הפיצ'רים · <b>3</b> חדר לכל פיצ'ר. מוכנים?</p>`,
   lmKn:'המחוון החי: כמה באים בלי היסטוריה',
   icons:{1:I.list,2:I.match,3:I.check,4:I.model,5:I.cal,6:I.seat,7:I.bell,8:I.ghost,9:I.lock,10:I.doc},
   modes:[['waze','החתונה'],['market','המוצר'],['both','שניהם']],
   wazeLabel:'באולם',
   act1:{html:`<p class="cy-k">מערכה 1 · כמה מנות להזמין?</p>
    <p>כל קייטרינג יודע: לא מזמינים אוכל לפי מי שאמר שיבוא. מזמינים לפי מי שבא לאירועים דומים. דודים שבאו לכל חתונה יבואו גם לזו; חברים שאישרו, אולי חצי. וזה עובד מצוין, עד החתונה שבה מגיעים פתאום בני דודים שאף פעם לא באו.</p>
    <div class="cy-ctl"><button type="button" class="cy-btn go" data-a="add">▶ חתונה רגילה</button><button type="button" class="cy-btn hot" data-a="tear">חתונה מפתיעה</button></div>
    <div class="cy-meters"><span><b class="m-v">0</b>מנות שהוזמנו</span><span><b class="m-s">0</b>אורחים שהגיעו</span><span class="cy-eta"><b class="m-r">?</b>האוכל</span></div>
    <p class="rg-out" aria-live="polite">כל נקודה על הדרך היא אורח. לחצו "חתונה רגילה".</p>
    <figure class="cy-nagoya"><svg viewBox="0 0 120 80" aria-hidden="true"><rect x="20" y="30" width="80" height="40" class="ng-track"/><path d="M14 30 L60 10 L106 30Z" class="ng-track"/><circle cx="60" cy="50" r="5" class="ng-car j"/></svg>
    <figcaption><b>זה הכלל של כל קייטרינג.</b> לפי מי שבא, לא לפי מי שאישר. וקובצי בוחרים, שבהם רשום מי הצביע בכל בחירות (לא למי), משמשים מטות בארה"ב שנים. אבל ברוב המדינות אין רשימה כזו בכלל.</figcaption></figure>
    <details class="cy-map"><summary>מה באולם מקביל למה אצלנו</summary><table><tbody>
    <tr><td>רשימת המוזמנים</td><td>קובץ הבוחרים</td></tr><tr><td>"משפ' כהן": איזה כהן?</td><td>התאמה הסתברותית</td></tr><tr><td>מי מהרשימה בא לאירועים קודמים</td><td>מודל ההגעה</td></tr><tr><td>אמצע שבוע מול יום שישי</td><td>כיול לפי סוג הבחירות</td></tr><tr><td>תוכנית ההושבה</td><td>שקלול לפי מי שיבוא</td></tr><tr><td>"אפשר להוסיף עוד שניים?"</td><td>התראת רישומים חדשים</td></tr><tr><td>אורחים שלא היו ברשימה</td><td>מי לא בקובץ</td></tr></tbody></table></details>
    <p class="cy-bridge">בחתונה יש רשימה אחת, ובעלי שמחה שמכירים את כולם. בסקר, הרשימה היא של מדינה, ובחלק מהמדינות היא בכלל לא קיימת. כדי שזה יעבוד צריך מוצר.</p>
    <button type="button" class="cy-morph">עכשיו נחליף את הרשימה בקובץ ←</button>`,
    setup(ctx){ const {S,cam,ringPath,pW,reduce}=ctx; const L=ringPath.getTotalLength(); const g=S('g',{class:'cy-cars dm-log',transform:'translate(0,-14)'},cam);
     const out=pW.querySelector('.rg-out'), mv=pW.querySelector('.m-v'), ms=pW.querySelector('.m-s'), mr=pW.querySelector('.m-r'); let n=0, timer=null; const dots=[];
     const clear=()=>{ dots.forEach(d=>d.remove()); dots.length=0; n=0; };
     function run(total,surprise){ clear(); mv.textContent=36; let k=0; const step=()=>{ if(k>=total){ stop(); ms.textContent=total; mr.textContent=total>36?'חסר':'מספיק';
         out.textContent=surprise?'הוזמנו 36 מנות, לפי החתונות הקודמות. הגיעו 44: שמונה בני דודים שאף פעם לא באו, והפעם כן. הם לא היו בשום היסטוריה, ולא היה להם אוכל.':'הוזמנו 36 מנות, הגיעו 35. ההיסטוריה עבדה, כמו כמעט תמיד.'; return; }
       const p=ringPath.getPointAtLength(L*k/44); const c=S('circle',{cx:p.x,cy:p.y,r:6,class:'dm-dot'},g); c.style.fill=(surprise&&k>=36)?'#b3261e':'#2f6f68'; dots.push(c); k++; ms.textContent=k; };
       if(reduce){ while(k<total) step(); step(); return; } timer=setInterval(step,90); }
     function stop(){ if(timer){ clearInterval(timer); timer=null; } }
     pW.querySelector('[data-a="add"]').addEventListener('click',()=>{ stop(); run(35,false); });
     pW.querySelector('[data-a="tear"]').addEventListener('click',()=>{ stop(); run(44,true); });
     pW.querySelector('.cy-morph').addEventListener('click',()=>ctx.setMode('market'));
     return {stop}; }},
   act2:'',
   waze:{1:'רשימת המוזמנים, מהמשפחה',2:'"משפ\' כהן": איזה מהכהנים?',3:'כמה אישורים חזרו מכל צד',4:'מי מהרשימה בא לאירועים קודמים',5:'חתונה באמצע שבוע מול יום שישי',6:'תוכנית ההושבה: מי מקבל כיסא',7:'"אפשר להוסיף עוד שניים?"',8:'אורחים שלא היו ברשימה',9:'הרשימה נשארת במשרד, לא על הדלת',10:'הודעה לקייטרינג: לכמה הזמנו, ולמה'},
   ex:{1:'ספטמבר: קובץ ארצי של 210 מיליון שורות, כל המדינות.',2:'דרנל הייז, 39203, 1975: ציון 0.97. נמצא.',3:'84% נמצאו; בלא רגילים להצביע, 66%.',4:'דרנל: 2020 ✓ 2022 ✗ 2024 ✓. סיכוי 0.31.',5:'יעד בחירות אמצע: 52%, כמו 2022.',6:'משוקלל לפי מי שיבוא; מי שלא נמצא מקבל את ממוצע התא.',7:'במיסיסיפי, נרשמים חדשים פי 1.8. ודרנל, רשום מ-1993, לא נראה בשום אזעקה.',8:'בתא הצעירים בלי תואר, 31% לא נמצאו.',9:'בקשה לייצא 4,000 שורות של לא מצביעים: נדחתה.',10:'"המודל לא רואה מצביעים חדשים": שורה קבועה בדוח.'},
   models({H}){ return {
    1:b=>pick(b,H,'הקובץ של החודש הגיע בלי מדינה אחת. מה קורה?',[['נטען','ואז המודל לומד על ארץ בלי מדינה שלמה, ואף אחד לא שם לב.','hot'],['נעצר','ירידה של יותר מ-5% במדינה עוצרת את הטעינה. עובדים עם הקובץ הקודם.']]),
    2:b=>pick(b,H,'שני אחים, אותה כתובת, שנים סמוכות. מה עושים?',[['לוקחים את הציון הגבוה','ואז אחד מהם מקבל את ההיסטוריה של השני.','hot'],['"לא נמצא"','כששני מועמדים קרובים, אין התאמה. עדיף לא לדעת מאשר לדעת לא נכון.']]),
    3:b=>slide(b,H,'שיעור ההתאמה אצל לא רגילים להצביע',40,100,2,66,v=>[v+'%',v<75?'פער גדול מהרגילים (91%). אזהרה בדוח: מי שלא נמצא הוא בדיוק מי שיכול להפתיע.':'קרוב לרגילים. ההתאמה לא מטה את התמונה הרבה.']),
    4:b=>pick(b,H,'דרנל הצביע ב-2020 וב-2024, לא ב-2022. כמה הוא שווה בסקר של בחירות אמצע?',[['קול שלם','ואז המודל לא שונה מסולם 1-10.','hot'],['בערך שליש','כמו אלפי אנשים עם אותה היסטוריה. ובשנה רגילה, זה נכון.']]),
    5:b=>slide(b,H,'יעד אחוז ההצבעה',40,70,1,52,v=>[v+'%',v>60?'יעד גבוה מאוד לבחירות אמצע. אם יש לזה סיבה, היא צריכה להיכתב בדוח.':'בטווח של בחירות אמצע. אבל כל היעד מניח שהשנה דומה לקודמת.']),
    6:b=>pick(b,H,'משיבה עם משקל דמוגרפי גבוה וסיכוי גבוה: פי 14 מהממוצע. מה קורה?',[['נשאר','ואז אדם אחד מזיז את כל הסקר.','hot'],['נחתך לפי 5','ונרשם בדוח. אדם אחד לא קובע.']]),
    7:b=>pick(b,H,'דרנל, רשום מ-1993, מחליט לבוא. מה האזעקה רואה?',[['נרשם חדש','הוא לא נרשם מחדש. הוא כבר רשום.','hot'],['כלום','וזה החור: האזעקה רואה נרשמים חדשים, לא רשומים ותיקים שמחליטים לבוא.']]),
    8:b=>slide(b,H,'כמה מהצעירים לא נמצאו',0,50,1,31,v=>[v+'%',v>20?'תא אדום: מספיק כדי לשנות את התוצאה. מסומן בדוח.':'בטווח הרגיל.']),
    9:b=>pick(b,H,'עובד מבקש לייצא את כל הלא מצביעים בשכונה. מה קורה?',[['מקבל','ואז רשימה כזו יכולה להגיע למטה, ולשמש ללחץ.','hot'],['נדחה','רק סיכומים יוצאים. שורות דורשות שני אנשים, וכל בקשה נרשמת.']]),
    10:b=>pick(b,H,'מישהו מבקש למחוק את השורה "המודל לא רואה מצביעים חדשים". מה קורה?',[['נמחקת','והקורא בטוח שהמודל רואה הכול.','hot'],['נשארת','השורה קבועה בתבנית. בשנה כמו 2026, היא השורה הכי חשובה בדוח.']]) }; }
  };
})();
