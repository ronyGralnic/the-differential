/* Case 03 · spec cities for city-engine.js (roll-log and sample-audit).
   Keys: cls, intro(tm) html, lmKn, icons {1..10}, modes, wazeLabel, act1 {html, setup(ctx)->{stop}}, act2 html, waze {1..10}, ex {1..10}, models(api)->{1..10: fn(box)} */
window.CITY=window.CITY||{};
(function(){
  const I={doc:'<path d="M-9 -10 h12 l6 6 v14 h-18z M3 -10 v6 h6"/>',tag:'<path d="M-10 -2 l8 -8 h10 v10 l-8 8z"/><circle cx="4" cy="-4" r="2"/>',mask:'<path d="M-11 -4 c0 -4 22 -4 22 0 v4 c0 7 -6 10 -11 10 s-11 -3 -11 -10z"/><circle cx="-5" cy="0" r="2"/><circle cx="5" cy="0" r="2"/>',
   tree:'<circle cx="0" cy="-8" r="3"/><circle cx="-7" cy="2" r="3"/><circle cx="7" cy="2" r="3"/><path d="M0 -5 L-7 -1 M0 -5 L7 -1 M-7 5 v5 M7 5 v5"/>',seal:'<circle cx="0" cy="-2" r="8"/><path d="M-5 5 l-3 7 l5 -2 l3 3 M5 5 l3 7 l-5 -2"/>',scale:'<path d="M0 -10 v18 M-10 -6 h20 M-10 -6 l-3 7 h6z M10 -6 l-3 7 h6z"/>',
   phone:'<rect x="-6" y="-11" width="12" height="22" rx="2"/><path d="M-2 7 h4"/>',bell:'<path d="M-7 4 v-5 a7 7 0 0 1 14 0 v5 l2 3 h-18z M-2 9 a2 2 0 0 0 4 0"/>',eye:'<path d="M-11 0 q11 -10 22 0 q-11 10 -22 0z"/><circle cx="0" cy="0" r="3"/>',bars:'<path d="M-9 9 v-6 M-3 9 v-12 M3 9 v-8 M9 9 v-15"/>',
   lock:'<rect x="-8" y="-2" width="16" height="12" rx="2"/><path d="M-5 -2 v-4 a5 5 0 0 1 10 0 v4"/>',dice:'<rect x="-9" y="-9" width="18" height="18" rx="3"/><circle cx="-4" cy="-4" r="1.5"/><circle cx="4" cy="4" r="1.5"/><circle cx="0" cy="0" r="1.5"/>',layers:'<path d="M0 -10 l11 5 l-11 5 l-11 -5z M-11 1 l11 5 l11 -5 M-11 6 l11 5 l11 -5"/>',
   app:'<rect x="-7" y="-11" width="14" height="22" rx="2"/><path d="M-3 -3 h6 M-3 1 h6 M-3 5 h3"/>',repeat:'<path d="M-8 -2 a8 8 0 1 1 3 7 M-10 2 l2 -4 l4 2"/>',people:'<circle cx="-5" cy="-4" r="3"/><circle cx="5" cy="-4" r="3"/><path d="M-10 8 q5 -8 10 0 q5 -8 10 0"/>',
   calc:'<rect x="-8" y="-11" width="16" height="22" rx="2"/><path d="M-5 -7 h10 M-4 0 h2 M2 0 h2 M-4 5 h2 M2 5 h2"/>',pin:'<path d="M0 10 c-6 -8 -8 -11 -8 -15 a8 8 0 0 1 16 0 c0 4 -2 7 -8 15z"/><circle cx="0" cy="-5" r="2.5"/>',report:'<path d="M-9 -10 h18 v20 h-18z M-5 4 v3 M0 0 v7 M5 -3 v10"/>',box:'<path d="M-10 -4 l10 -6 l10 6 v10 l-10 6 l-10 -6z M-10 -4 l10 6 l10 -6 M0 2 v10"/>'};
  /* a small model: a question and a few buttons, each showing what happens */
  function pick(box,H,q,opts){ box.append(H('p','cy-mq',q)); const row=H('div','cy-ctl'); const out=H('p','rg-out'); out.setAttribute('aria-live','polite');
    opts.forEach(([l,t,cls])=>{ const b=H('button','cy-btn'+(cls?' '+cls:''),l); b.type='button'; b.addEventListener('click',()=>{ row.querySelectorAll('.cy-btn').forEach(x=>x.classList.toggle('on',x===b)); out.textContent=t; }); row.append(b); }); box.append(row,out); }
  function slide(box,H,label,min,max,step,val,fmt){ const l=H('label','cy-dens'); const b=H('b'); l.append(document.createTextNode(label+': '),b); const r=H('input'); r.type='range'; r.min=min; r.max=max; r.step=step; r.value=val; r.setAttribute('aria-label',label); l.append(r); const out=H('p','rg-out'); out.setAttribute('aria-live','polite'); box.append(l,out);
    const go=()=>{ const [v,t]=fmt(+r.value); b.textContent=v; out.textContent=t; }; r.addEventListener('input',go); go(); }
  const AV=(skin,hair,shirt)=>`<span class="cy-av" aria-hidden="true"><svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="28" fill="#f3ecd8"/><circle cx="30" cy="28" r="12" fill="${skin}"/><path d="M16 28 q0 -18 14 -18 q14 0 14 18 q-3 -8 -14 -8 q-11 0 -14 8z" fill="${hair}"/><circle cx="26" cy="28" r="1.5" fill="#1e2422"/><circle cx="34" cy="28" r="1.5" fill="#1e2422"/><path d="M26 34 q4 2.5 8 0" stroke="#1e2422" stroke-width="1.5" fill="none"/><path d="M12 58 q4 -16 18 -16 q14 0 18 16z" fill="${shirt}"/></svg></span>`;
  const act2=(what)=>`<p class="cy-k">מערכה 2 · עיר הפיצ'רים</p>
   <p>אותו נוף, שתי משמעויות. הדרך היא ${what}, ובכל תחנה לאורכה עומד בניין: פיצ'ר אחד של המוצר. ארבע שכונות, ארבע שכבות.</p>
   <div class="cy-ctl"><button type="button" class="cy-btn go" data-a="play">▶ סיור מודרך</button><button type="button" class="cy-btn hot" data-a="shock">לשלוח שינוי אחד</button><button type="button" class="cy-btn" data-a="home">למבט על</button></div>
   <ol class="cy-list"></ol><p class="cy-hint">לחצו על בניין כדי להיכנס לחדר שלו. גם הצומת, המגדל והגשר נפתחים.</p>`;

  /* ================= Roll Transparency Log ================= */
  window.CITY['roll-log']={
   cls:'cy-rl',
   intro:tm=>`<p class="cy-k">פרק 3 · אפיון</p><h4 class="cy-h">עשרה פיצ'רים, ויומן אחד שאי אפשר לשכתב</h4>
    <p>אחרי שה-POC הראה שהיומן מחזיק מדינה שלמה, כותבים <b>אפיון</b>: מסמך שמתאר את המוצר המלא, פיצ'ר אחרי פיצ'ר, כאילו מחר מתחילים לבנות. <b>פיצ'ר</b> הוא יכולת אחת של המוצר, למשל "לשלוח לפריה הודעה ביום שנמחקה".</p>
    <div class="cy-emma">${AV('#c98f63','#1d1410','#3e7fa8')}<div><span class="cy-k">בוקר של טיוטה</span><p>פריה (בדויה) נמחקה בקלפי 212 בכפר של ההורים, בקוד R-SHIFT, ב-14.11. היא אחות בלקנאו, ואין לה זמן לחפש את עצמה ב-PDF. ה-POC הראה שהעץ עובד. עכשיו צריך מוצר: מי כותב את השורה, מי מעיד על העץ, איך ההודעה מגיעה אליה, ומה השכנים לא יראו.</p></div></div>
    <div class="cy-prom"><span>מה המוצר מבטיח:</span><p>כל שינוי ב${tm('qd-roll','רשימת הבוחרים')} נרשם ביומן שאפשר רק להוסיף לו, עם קוד סיבה מתוך 11. כל אדם יכול לבדוק בעצמו מה קרה לשם שלו, ומקבל הודעה ביום שזה קרה. ומה שהוא לא מבטיח כתוב במפורש: הוא לא יודע אם הקצין כתב סיבה נכונה. הוא רק מבטיח שזה גלוי, ושלא ישתנה בשקט.</p></div>
    <p class="cy-acts">שלוש מערכות: <b>1</b> סיפור מקביל שכולם מכירים · <b>2</b> עיר הפיצ'רים · <b>3</b> חדר לכל פיצ'ר. מוכנים?</p>`,
   lmKn:'המחוון החי: העץ בפעולה',
   icons:{1:I.doc,2:I.tag,3:I.mask,4:I.tree,5:I.seal,6:I.scale,7:I.phone,8:I.bell,9:I.eye,10:I.bars},
   modes:[['waze','הספר התפור'],['market','המוצר'],['both','שניהם']],
   wazeLabel:'בספר',
   act1:{html:`<p class="cy-k">מערכה 1 · ספר התורים התפור</p>
    <p>במרפאה בכפר יש ספר תורים. הדפים ממוספרים ותפורים, וכותבים בו בעט. אפשר להוסיף שורה בסוף, אבל אי אפשר לקרוע דף בלי שיראו שהמספור קופץ. וכל ערב, האחות מצלמת את הדף האחרון ושולחת לשלושה אנשים בכפר.</p>
    <div class="cy-ctl"><button type="button" class="cy-btn go" data-a="add">▶ להוסיף שורות</button><button type="button" class="cy-btn hot" data-a="tear">לנסות לקרוע דף</button></div>
    <div class="cy-meters"><span><b class="m-v">0</b>שורות בספר</span><span><b class="m-s">0</b>צילומי ערב</span><span class="cy-eta"><b class="m-r">תקין</b>המספור</span></div>
    <p class="rg-out" aria-live="polite">כל נקודה על הדרך היא שורה בספר. לחצו "להוסיף שורות".</p>
    <figure class="cy-nagoya"><svg viewBox="0 0 120 80" aria-hidden="true"><rect x="20" y="14" width="80" height="56" rx="4" class="ng-track"/><path d="M60 14 v56" class="ng-track"/><path d="M28 28 h24 M28 38 h24 M68 28 h24 M68 38 h24" class="ng-track"/><circle cx="60" cy="8" r="5" class="ng-car j"/></svg>
    <figcaption><b>זה קיים באמת, בקנה מידה ענק.</b> מאז 2013, כל תעודת אבטחה של אתר אינטרנט נרשמת ביומנים ציבוריים מהסוג הזה (Certificate Transparency), וגופים עצמאיים שומרים את "הדף האחרון" ומשווים. כך נתפסו תעודות שהונפקו בטעות.</figcaption></figure>
    <details class="cy-map"><summary>מה בספר מקביל למה אצלנו</summary><table><tbody>
    <tr><td>שורה בספר</td><td>שינוי אחד ברשימה, עם קוד סיבה</td></tr><tr><td>הדפים הממוספרים והתפורים</td><td>עץ מרקל שאפשר רק להוסיף לו</td></tr><tr><td>צילום הדף האחרון כל ערב</td><td>ראש עץ חתום</td></tr><tr><td>שלושת האנשים שמקבלים את הצילום</td><td>המשגיחים</td></tr><tr><td>מטופל שבודק שהתור שלו רשום</td><td>פריה שבודקת את עצמה</td></tr><tr><td>שם המטופל בספר</td><td>כינוי, לא שם</td></tr></tbody></table></details>
    <p class="cy-bridge">בספר של מרפאה יש מאות שורות, ואפשר לבדוק בעיניים. ברשימת בוחרים יש מאות מיליונים, ופריה לא תגיע לכפר כדי לדפדף. כדי שזה יעבוד בשבילה צריך מוצר.</p>
    <button type="button" class="cy-morph">עכשיו נחליף את הספר ביומן ←</button>`,
    setup(ctx){ const {S,cam,ringPath,pW,reduce}=ctx; const L=ringPath.getTotalLength(); const g=S('g',{class:'cy-cars rl-book',transform:'translate(0,-14)'},cam);
     const out=pW.querySelector('.rg-out'), mv=pW.querySelector('.m-v'), ms=pW.querySelector('.m-s'), mr=pW.querySelector('.m-r'); let n=0, snaps=0, timer=null, torn=false; const dots=[];
     function add(){ if(n>=40){ stop(); out.textContent='40 שורות. כל ערב צולם הדף האחרון ונשלח לשלושה אנשים. עכשיו נסו לקרוע דף.'; return; } const p=ringPath.getPointAtLength(L*n/40); const c=S('circle',{cx:p.x,cy:p.y,r:6,class:'rl-dot'},g); c.style.fill='var(--accent, #2f6f68)'; dots.push(c); n++; mv.textContent=n; if(n%8===0){ snaps++; ms.textContent=snaps; c.setAttribute('r',9); } }
     function stop(){ if(timer){ clearInterval(timer); timer=null; } }
     pW.querySelector('[data-a="add"]').addEventListener('click',()=>{ if(timer) return; if(reduce){ while(n<40) add(); out.textContent='40 שורות נוספו.'; return; } out.textContent='שורה אחרי שורה, תמיד בסוף. כל שמונה שורות: צילום ערב.'; timer=setInterval(add,140); });
     pW.querySelector('[data-a="tear"]').addEventListener('click',()=>{ if(n<10){ out.textContent='קודם הוסיפו כמה שורות.'; return; } if(torn) return; torn=true; stop(); const k=Math.floor(n/3); dots[k].style.fill='var(--risk, #b3261e)'; dots[k].setAttribute('r',10);
       mr.textContent='קופץ'; out.textContent='מישהו קרע את הדף עם שורה '+(k+1)+'. אבל המספור קופץ מ-'+k+' ל-'+(k+2)+', והצילום מאותו ערב, אצל שלושה אנשים, עדיין מראה את השורה. אי אפשר להעלים אותה בשקט.'; });
     pW.querySelector('.cy-morph').addEventListener('click',()=>ctx.setMode('market'));
     return {stop}; }},
   act2:act2('המסלול של שינוי אחד ברשימה, מהמסוף של הקצין ועד הטלפון של פריה'),
   waze:{1:'כותבים בעט, בספר, ולא על פתק',2:'ליד כל שורה: למה הגיע המטופל, מתוך רשימה קבועה',3:'מספר תיק במקום שם, כשהספר פתוח',4:'דפים ממוספרים ותפורים',5:'צילום הדף האחרון כל ערב',6:'הלוח במסדרון חייב להתאים לספר',7:'מטופל ששואל "אני רשום?" ומקבל דף עם חותמת',8:'טלפון מהמרפאה: התור שלך בוטל, ואפשר לערער',9:'שלושה אנשים בכפר ששומרים את הצילומים',10:'"השבוע: 40 ביקורים" על לוח המודעות'},
   ex:{1:'המסוף של רוהיני (בדויה) לא שומר מחיקה עד שהיומן מחזיר קבלה.',2:'פריה נמחקה בקוד R-SHIFT, לא בסל "נעדר, עבר או נמחק".',3:'ביומן כתוב 7c1e…, לא מספר תעודת הבוחר של פריה.',4:'שורה 4,812,330 נכנסת כעלה, והעץ גדל.',5:'כל דקה: גודל, ראש, וחתימה של שלושה מחמישה עדים.',6:'כל לילה בונים את הפנקס מהיומן ומשווים לפנקס של הקלפי.',7:'פריה שולחת SMS ומקבלת: נמחקת, R-SHIFT, 14.11, מאומת.',8:'SMS ביום המחיקה, עם 9 ימים לערעור וקישור לטופס.',9:'עיתונאי, מפלגה וארגון חברה אזרחית מריצים משגיח.',10:'ביומן הציבורי: מחוז לקנאו, שבוע 46, 312 מחיקות R-SHIFT.'},
   models({H}){ return {
    1:b=>pick(b,H,'הקצין לוחץ "מחק". מה המסוף עושה?',[['שומר מיד','אם המסוף שומר לפני שהיומן מאשר, יש שינוי בלי שורה. זה בדיוק מה שאסור.','hot'],['מחכה לקבלה','השינוי נשמר רק כשהיומן מחזיר קבלה עם מספר השורה. אין מסלול שינוי אחר.']]),
    2:b=>pick(b,H,'איזה קוד יקבל מי שעבר לעיר אחרת?',[['R-SHIFT','"עבר דירה". פריה יודעת בדיוק מה לערער: היא עדיין גרה כאן.'],['"נעדר, עבר או נמחק"','שלוש סיבות בסל אחד. פריה לא יודעת על מה לערער. באפיון אין קוד "אחר".','hot']]),
    3:b=>pick(b,H,'מה רואים ביומן הציבורי במקום מספר תעודת הבוחר?',[['את המספר','כל אחד היה יכול לחפש אנשים ביומן.','hot'],['כינוי','HMAC עם מפתח שיושב בכספת חומרה. בלי המפתח, אי אפשר להפוך כינוי לאדם.']]),
    4:b=>slide(b,H,'גודל היומן',3,9,1,6,v=>{ const n=Math.round(Math.pow(10,v)); const h=Math.ceil(Math.log2(n)); return [n.toLocaleString('he-IL'),'כדי להוכיח שורה אחת ביומן של '+n.toLocaleString('he-IL')+' שורות צריך '+h+' גיבובים, '+(h*32)+' בתים.']; }),
    5:b=>slide(b,H,'עדים שחתמו',0,5,1,3,v=>[v+' מתוך 5',v>=3?'ראש העץ תקף: לפחות שלושה עדים, מגופים שונים, ראו אותו.':'פחות משלושה: הראש לא נחשב, והטלפון של פריה לא יקבל אותו.']),
    6:b=>pick(b,H,'בלילה, הפנקס של קלפי 212 לא תואם ליומן. מה קורה?',[['מתעלמים','אם הפנקס יכול לסטות מהיומן, היומן הוא תפאורה.','hot'],['התראה','הפנקס נבנה מהיומן. כל סטייה היא התראה למשגיחים ולוועדה, עם מספר הקלפי.']]),
    7:b=>pick(b,H,'איך פריה בודקת את עצמה?',[['SMS','שולחת את המספר שלה, ומקבלת את הקוד, התאריך, ו"מאומת".'],['אפליקציה','הטלפון מקבל הוכחה ובונה ממנה את ראש העץ בעצמו.'],['קיוסק בקלפי','עובד קלפי עוזר, והמסך מדפיס קבלה.']]),
    8:b=>slide(b,H,'ימים מהמחיקה',0,30,1,5,v=>{ const left=Math.max(0,14-v); return [String(v),left>0?'נותרו '+left+' ימים לערעור. ההודעה נשלחה ביום 0, ותזכורת ביום 7.':'חלון הערעור נסגר. לכן ההודעה נשלחת ביום המחיקה, ולא כשהטיוטה מתפרסמת.']; }),
    9:b=>pick(b,H,'המפעיל מראה לפריה עץ אחד, ולעיתונאי עץ אחר. מי תופס?',[['אף אחד','בלי עדים שמשווים, תצוגה מפוצלת לא נתפסת.','hot'],['העדים','העדים משווים ראשים ביניהם. שני ראשים חתומים לאותו גודל הם הוכחה לזיוף.']]),
    10:b=>pick(b,H,'מה מתפרסם לכולם?',[['קלפי ותאריך','ב-POC: כמעט בכל קלפי פחות מחמישה שינויים. השכנים היו יודעים מי עזב.','hot'],['מחוז ושבוע','מספיק כדי לראות דפוסים, למשל קפיצה במחיקות R-SHIFT במחוז אחד, בלי לזהות אף אחד.']]) }; }
  };

  /* ================= Removal Sample Audit ================= */
  window.CITY['sample-audit']={
   cls:'cy-sa',
   intro:tm=>`<p class="cy-k">פרק 3 · אפיון</p><h4 class="cy-h">עשרה פיצ'רים, ומספר אחד לכל מחוז</h4>
    <p>אחרי שה-POC הראה ש-1,500 מקרים נותנים מספר מדויק, כותבים <b>אפיון</b>: מסמך שמתאר את המוצר המלא, פיצ'ר אחרי פיצ'ר. <b>פיצ'ר</b> הוא יכולת אחת, למשל "להגריל 1,500 מחיקות מ-seed שהוכרז מראש".</p>
    <div class="cy-emma">${AV('#b9805a','#1a1512','#8a5a2b')}<div><span class="cy-k">שבועיים לפני הטיוטה הסופית</span><p>ארג'ון (בדוי), סטודנט, רוצה לדעת מי צודק בבית: אבא, שאומר שהרשימות היו מלאות מתים, או הדודה, שאומרת שמחקו את השכונה. ה-POC הראה שהסטטיסטיקה עובדת. עכשיו צריך מוצר: מי מגריל, מי דופק בדלת, ומה מתפרסם.</p></div></div>
    <div class="cy-prom"><span>מה המוצר מבטיח:</span><p>לכל מחוז: כמה מהמחיקות שגויות, עם טווח טעות, שיטה ו-seed שכל אחד יכול לשחזר. מחוז מעל הסף נכנס לבדיקה מלאה. ומה שהוא לא מבטיח: הוא טוב בדיוק כמו מי שבודק בשטח.</p></div>
    <p class="cy-acts">שלוש מערכות: <b>1</b> סיפור מקביל שכולם מכירים · <b>2</b> עיר הפיצ'רים · <b>3</b> חדר לכל פיצ'ר. מוכנים?</p>`,
   lmKn:'המחוון החי: מי דופק בדלת',
   icons:{1:I.lock,2:I.dice,3:I.layers,4:I.app,5:I.repeat,6:I.people,7:I.calc,8:I.pin,9:I.report,10:I.box},
   modes:[['waze','מבחן הטעימה'],['market','המוצר'],['both','שניהם']],
   wazeLabel:'במטבח',
   act1:{html:`<p class="cy-k">מערכה 1 · מבחן הטעימה</p>
    <p>טבח לא אוכל את כל הסיר כדי לדעת אם יש מספיק מלח. הוא מערבב, טועם כף אחת, ויודע. אבל זה עובד רק אם הוא מערבב קודם, ורק אם מי שטועם לא מפחד להגיד שזה מלוח.</p>
    <div class="cy-ctl"><button type="button" class="cy-btn go" data-a="taste">▶ לטעום 12 כפות</button><button type="button" class="cy-btn hot" data-a="chef">שהטבח עצמו יטעם</button></div>
    <div class="cy-meters"><span><b class="m-v">0</b>כפות</span><span><b class="m-s">?</b>מלוחות לפי הטועם</span><span class="cy-eta"><b class="m-r">25%</b>מלוחות באמת</span></div>
    <p class="rg-out" aria-live="polite">כל נקודה על הדרך היא כף מהסיר. רבע מהכפות מלוחות מדי.</p>
    <figure class="cy-nagoya"><svg viewBox="0 0 120 80" aria-hidden="true"><path d="M20 30 h80 l-8 40 h-64z" class="ng-track"/><path d="M60 10 v24" class="ng-track"/><circle cx="60" cy="8" r="5" class="ng-car j"/></svg>
    <figcaption><b>זה קורה באמת.</b> בכמה מדינות בארה"ב בודקים תוצאות בחירות בדיוק כך: מגרילים פתקים, בודקים אותם ביד, ומחשבים אם התוצאה הרשמית מחזיקה. השיטה עובדת, כשמי שבודק לא קשור למי שספר.</figcaption></figure>
    <details class="cy-map"><summary>מה במטבח מקביל למה אצלנו</summary><table><tbody>
    <tr><td>הסיר</td><td>כל המחיקות של מחוז</td></tr><tr><td>לערבב לפני שטועמים</td><td>הגרלה אקראית מ-seed פומבי</td></tr><tr><td>כף אחת</td><td>ביקור בכתובת אחת</td></tr><tr><td>"מלוח מדי"</td><td>מחיקה שגויה</td></tr><tr><td>הטועם</td><td>הבודק בשטח</td></tr><tr><td>הטבח שטועם את הסיר של עצמו</td><td>עובד קלפי שבודק מחיקות שהוא סימן</td></tr></tbody></table></details>
    <p class="cy-bridge">בסיר אחד יש טבח אחד. במדינה יש מאות מחוזות, וכל אחד צריך הגרלה, בודקים וחישוב. כדי שזה יעבוד צריך מוצר.</p>
    <button type="button" class="cy-morph">עכשיו נחליף את הכפות במחיקות ←</button>`,
    setup(ctx){ const {S,cam,ringPath,pW}=ctx; const L=ringPath.getTotalLength(); const g=S('g',{class:'cy-cars sa-pot',transform:'translate(0,-14)'},cam);
     const out=pW.querySelector('.rg-out'), mv=pW.querySelector('.m-v'), ms=pW.querySelector('.m-s'); const salty=[1,0,0,0,1,0,0,1,0,0,0,1]; let drawn=[];
     function clear(){ drawn.forEach(d=>d.remove()); drawn=[]; }
     function taste(chef){ clear(); let seen=0; salty.forEach((s,i)=>{ const p=ringPath.getPointAtLength(L*(i+0.5)/12); const said=chef&&s&&i!==11?0:s; seen+=said; const c=S('circle',{cx:p.x,cy:p.y,r:8},g); c.style.fill=said?'var(--risk, #b3261e)':s?'#c47a12':'var(--accent, #2f6f68)'; drawn.push(c); });
      mv.textContent='12'; ms.textContent=Math.round(seen/12*100)+'%';
      out.textContent=chef?'הטבח טעם את הסיר של עצמו, ואמר שרק כף אחת מלוחה: 8%. שלוש כפות מלוחות (בכתום) עברו כ"בסדר". והמספר נשמע מדויק בדיוק כמו קודם.':'טועם מבחוץ: 3 מתוך 12, כלומר 25%, בדיוק כמו בסיר כולו. בלי לאכול את כל הסיר.'; }
     pW.querySelector('[data-a="taste"]').addEventListener('click',()=>taste(false));
     pW.querySelector('[data-a="chef"]').addEventListener('click',()=>taste(true));
     pW.querySelector('.cy-morph').addEventListener('click',()=>ctx.setMode('market'));
     return {stop(){}}; }},
   act2:act2('המסלול של ביקורת אחת, מרשימת המחיקות של מחוז ועד הדוח שמתפרסם'),
   waze:{1:'מכסים את הסיר לפני שטועמים',2:'מערבבים מול כולם',3:'טועמים גם מלמעלה וגם מהתחתית',4:'כף נקייה לכל טעימה',5:'אם לא בטוחים, טועמים שוב',6:'מי טועם, ומה הקשר שלו לטבח',7:'מכמה כפות מבינים את כל הסיר',8:'איזה חלק מהסיר מלוח במיוחד',9:'"מלוח מדי, תוסיפו מים" או "בסדר"',10:'כתבו מה טעמתם, כדי שמישהו אחר יוכל לטעום שוב'},
   ex:{1:'רשימת המחיקות של מחוז נחתמת לפני ההגרלה, כדי שלא יוסיפו או יורידו אחר כך.',2:'ה-seed נגזר ממספרי הגרלה שפורסמו מראש. כל אחד מריץ ומקבל אותם 1,500 שמות.',3:'מתים, כפולים והסל המעורבב נדגמים בנפרד.',4:'הבודק עובד גם בכפר בלי קליטה, וכל ביקור נחתם בזמן ובמיקום.',5:'דלת סגורה? חוזרים פעמיים, בשעות שונות.',6:'הבודק חייב להיות עצמאי מהמחיקה. ומאיפה יבואו אלפי בודקים כאלה? באפיון, זו שאלה פתוחה.',7:'11.2% ±1.8 מהמחיקות שגויות, עם תיקון למי שלא נמצא.',8:'קלפיות שבהן שיעור השגיאה חריג מסומנות במפה.',9:'מעל 5%: המחוז נכנס לבדיקה מלאה לפני הבחירות.',10:'ה-seed, הרשימה המוקפאת והתוצאות, בקובץ אחד שכל אחד יכול להריץ.'},
   models({H}){ const W=(k,n)=>{ const z=1.96,p=k/n,d=1+z*z/n,c=(p+z*z/(2*n))/d,h=z*Math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d; return [c-h,c+h]; }; return {
    1:b=>pick(b,H,'ההגרלה כבר רצה, ואז מוסיפים לרשימה 2,000 מחיקות "נכונות". מה קורה?',[['בלי הקפאה','המדגם כבר לא מייצג את הרשימה, והשיעור יורד.','hot'],['עם הקפאה','הרשימה נחתמה לפני ההגרלה. שינוי אחריה נראה מיד.']]),
    2:b=>pick(b,H,'מי בוחר אילו 1,500 מחיקות נבדקות?',[['פקיד','מי שבוחר את המדגם בוחר את התוצאה.','hot'],['seed פומבי','ה-seed הוכרז מראש. כל אחד מריץ את אותה פקודה ומקבל את אותם שמות.']]),
    3:b=>pick(b,H,'איפה רוב הטעויות?',[['מתים','ב-POC: כ-3% שגויות.'],['כפולים','ב-POC: כ-9%.'],['הסל המעורבב','ב-POC: כ-19%. וזה גם הסל הגדול ביותר.','hot']]),
    4:b=>pick(b,H,'הבודק בכפר בלי קליטה. מה קורה לביקור?',[['נשמר בטלפון','הביקור נשמר מוצפן ונשלח כשיש רשת, עם זמן ומיקום חתומים.'],['הולך לאיבוד','בלי אפליקציה לא מקוונת, כפרים שלמים נעלמים מהמדגם.','hot']]),
    5:b=>slide(b,H,'כמה ביקורים חוזרים',0,3,1,2,v=>[String(v),['רבע מהדלתות נשארות סגורות, ומי שעבר נספר כ"לא נמצא".','כ-12% נשארות סגורות.','כ-6% נשארות סגורות. זה הנוהל באפיון.','כ-3%, אבל העלות עולה.'][v]]),
    6:b=>slide(b,H,'כמה מהמחיקות השגויות הבודק "מאשר"',0,60,5,0,v=>{ const est=(14.8*(1-v/100)).toFixed(1); return [v+'%','האמת: 14.8%. האומדן: '+est+'%. '+(v===0?'בודק עצמאי.':v<15?'הרצועה כבר מתחילה לפספס.':'הרצועה צרה ומשכנעת, ובמקום הלא נכון.')]; }),
    7:b=>slide(b,H,'גודל המדגם',100,3000,100,1500,v=>{ const k=Math.round(v*0.112); const [lo,hi]=W(k,v); return [String(v),'אם '+k+' מתוך '+v+' שגויות: '+(k/v*100).toFixed(1)+'%, בין '+(lo*100).toFixed(1)+'% ל-'+(hi*100).toFixed(1)+'%.']; }),
    8:b=>pick(b,H,'בקלפי אחת 9 מתוך 20 מחיקות שגויות. מה עושים?',[['מסמנים','הקלפי מסומנת במפה, ונבדקת ראשונה.'],['מתעלמים','20 זה מעט, אבל 9 מתוך 20 הוא חריג גם במדגם קטן.','hot']]),
    9:b=>slide(b,H,'שיעור השגיאה במחוז',0,20,0.5,11,v=>[v+'%',v>5?'מעל הסף: בדיקה מלאה של כל המחיקות לפני הבחירות.':'מתחת לסף: מפרסמים את המספר, והמחוז ממשיך.']),
    10:b=>pick(b,H,'מפלגה טוענת שהמספר מזויף. מה עונים?',[['"תסמכו עלינו"','זו בדיוק התשובה שהמוצר בא להחליף.','hot'],['"תריצו בעצמכם"','החבילה כוללת seed, רשימה מוקפאת ותוצאות. כל אחד מקבל את אותו מספר.']]) }; }
  };
})();
