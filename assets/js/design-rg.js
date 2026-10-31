/* Case 02 · Registry · the design document, as an engineer's notebook (graph paper, UML in ink).
   Intro (what a design document is), four house rules you can try to break, twenty "employees" with job descriptions and lenses,
   the envelope and what the postman answers, the report's life as a live state machine, the batch's life with a live binary search,
   one reporting period as a step-by-step sequence, the kitchen (two waiters, one seat), two cabinets that cannot be joined,
   the build ladder with exit tests, and the full original text folded at the bottom. */
(function(){
  function boot(){
  const root=document.querySelector('.dz[data-dz="registry"]'); if(!root||root.dataset.on) return; root.dataset.on='1';
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const H=(t,c,x)=>{ const e=document.createElement(t); if(c) e.className=c; if(x!=null) e.textContent=x; return e; };
  const NS='http://www.w3.org/2000/svg'; const S=(t,a,p)=>{ const e=document.createElementNS(NS,t); for(const k in a) e.setAttribute(k,a[k]); if(p) p.append(e); return e; };
  const sleep=ms=>new Promise(r=>setTimeout(r,reduce?10:ms));
  const tm=(id,w)=>`<button class="tm" data-t="${id}">${w}</button>`;
  const EMMA='<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="28" fill="#f3ecd8"/><circle cx="30" cy="27" r="12" fill="#e9c6a8"/><path d="M17 25 q1 -15 13 -15 q13 0 13 15 q-4 -6 -13 -6 q-9 0 -13 6z" fill="#4a2f22"/><circle cx="26" cy="27" r="1.5" fill="#1e2422"/><circle cx="34" cy="27" r="1.5" fill="#1e2422"/><path d="M26 33 q4 2.5 8 0" stroke="#1e2422" stroke-width="1.5" fill="none"/><path d="M12 58 q4 -16 18 -16 q14 0 18 16z" fill="#2f5d8a"/></svg>';
  const sec=(h,sub,cls)=>{ const s=H('section','dz-s '+(cls||'')); s.append(H('h5','dz-h',h)); if(sub){ const p=H('p','dz-sub'); p.innerHTML=sub; s.append(p); } root.append(s); return s; };
  const emma=(s,t)=>{ const e=H('div','dz-emma'); const a=H('span','dz-av'); a.innerHTML=EMMA; const d=H('div'); d.append(H('span','dz-k','אמה (בדויה)'),H('p','',t)); e.append(a,d); s.append(e); };
  const ask=(s,t)=>s.append(H('p','dz-q',t));
  const what=(s,w,t)=>{ const b=H('div','dz-what'); b.innerHTML='<b>מה זה '+w+'?</b> '+t; s.append(b); };

  /* 0 · intro */
  const intro=H('div','dz-intro'); intro.innerHTML=`<p class="dz-k">פרק 5 · מסמך עיצוב</p><h4 class="dz-t">אין שדה שמחבר</h4>
   <p>הארכיטקטורה קבעה אילו רכיבים יש במרשם ומה עובר ביניהם. מסמך העיצוב יורד קומה אחת: מה יש <b>בתוך</b> כל רכיב. אם הארכיטקטורה היא התוכנית של הבית, העיצוב הוא חלוקת העבודה בתוך כל חדר: מי עושה מה, למה אסור לו לגעת, ומה קורה לכל חפץ מהרגע שהוא נכנס בדלת ועד שהוא יוצא.</p>
   <p>זה המסמך האחרון לפני שמתחילים לכתוב קוד. כל מה שנשאר פתוח כאן, יוכרע בידי מי שכותב את הקוד בשתיים בלילה. ולכן הוא מפורט.</p>`;
  root.append(intro); emma(intro,'"שמעתי שהמערכת מבטיחה שאף אחד לא יכול לחבר בין קרן לבין הדוח שלה. אבל איפה בדיוק זה כתוב? בנוהל? בהבטחה?"');
  intro.append(H('p','dz-q','מה ההבדל בין כלל שכתוב בנוהל, לכלל שכתוב בתוך התוכנה?'));

  /* 1 · four house rules */
  let s=sec('ארבעה כללי הבית','ארבעה כללים מכריעים כמעט כל החלטה במסמך. כשיש ספק איך לבנות משהו, חוזרים אליהם. לכל כלל יש כפתור: נסו לשבור אותו.');
  const RULES=[['אף אחד לא מחזיק גם זהות וגם תוכן','המחלקה שיודעת מי הקרן לא רואה אף פעם דוח. המחלקה שמקבלת דוחות לא יודעת מי שלח.','להוסיף לטבלת הדוחות עמודה של שם הקרן','נדחה. אין אף מחלקה שמחזיקה את שני הדברים, ולכן אין מי שימלא את העמודה. ההפרדה היא לא נוהל, היא המבנה.'],
    ['היומן קודם','כל שינוי חשוב נכתב קודם כאירוע ביומן השקיפות, ורק אחר כך משנה את המצב. אם הם לא מסכימים, היומן צודק.','לסמן דוח כ"התקבל" בלי לכתוב ביומן','נדחה. הקרן לא מקבלת אישור עד שהאירוע נכתב. אם הכתיבה נכשלה, היא מקבלת שגיאה ושולחת שוב.'],
    ['ממשק בכל גבול אמון','בכל מקום שבו עוברים בין גופים שלא סומכים זה על זה, יש "שקע" קבוע. מה שמחובר אליו יכול להתחלף.','להחליף את השרת האמיתי בשרת מזויף לבדיקה','עובד, וזה בדיוק הרעיון. כמו לחבר מכשיר אחר לאותו שקע חשמל: שאר הבית לא מרגיש. כך בודקים, וכך מוסיפים רשות רביעית.'],
    ['כשל סגור','סכום שלא אומת לא נגיש לאף שאלה. אין מצב של "כמעט מאומת".','לשאול על אצווה שעוד באמצע האימות','נדחה. כל ענף שלא מסתיים באימות מסתיים בדחייה או בהסגר. כמו דלת חסינת אש: כשמשהו לא בסדר, היא נסגרת, לא נפתחת.']];
  const rg=H('div','dz-rules'); RULES.forEach(([h,t,tr,res],i)=>{ const c=H('article','dz-rule'); c.append(H('span','dz-n','0'+(i+1)),H('b','',h),H('p','',t)); const b=H('button','dz-try','✎ נסו: '+tr); b.type='button'; const o=H('p','dz-res'); o.hidden=true; o.textContent=res; b.addEventListener('click',()=>{ o.hidden=false; c.classList.add(i===2?'ok':'no'); b.disabled=true; }); c.append(b,o); rg.append(c); }); s.append(rg);
  ask(s,'איזה מהכללים האלה הכי קשה לשמור, כשהלקוח לוחץ להוסיף "רק עוד שדה אחד"?');

  /* 2 · twenty employees */
  s=sec('עשרים עובדים, ולכל אחד תיאור תפקיד','');
  what(s,'מחלקה','חלק בתוכנה עם תפקיד אחד, כמו תיאור משרה. בדיאגרמת מחלקות רואים את כל "העובדים", באיזה מחלקה בארגון הם יושבים, ומי מדבר עם מי. החשוב כאן הוא העמודה השנייה בכל תיאור: מה הם <b>לא</b> עושים.');
  const CL=[['p','TokenWallet','ארנק האסימונים','מחזיק אסימונים עיוורים שהונפקו מראש, אחד לכל תקופת דיווח.','לא יודע לאיזה דוח ישויך כל אסימון, עד רגע השליחה.',['id']],
    ['p','ReportBuilder','בונה הדוח','אוסף את 33 התאים מהמערכות של הקרן ובודק שהם בטווח.','לא מצפין ולא שולח.',['data']],
    ['p','Encoder','המקודד','ממיר את התאים למספרים שלמים, בפורמט שהשרתים יודעים לחבר.','לא יודע על השרתים.',['data']],
    ['p','Committer','החותם','נועל כל תא בהתחייבות קריפטוגרפית, ושומר את הסוד שלה.','לא משתף את הסוד עם אף אחד.',['data']],
    ['p','Sharder','המפצל','מפצל כל מספר לשלושה חלקים אקראיים שסכומם הוא המספר, ומצרף הוכחה שהוא בטווח.','לא שולח.',['data']],
    ['p','Sealer','האורז','מצפין כל חלק במפתח של השרת שלו.','לא רואה את התוכן אחרי ההצפנה.',[]],
    ['a','LeaderAggregator','השרת המוביל','מקבל את הדוח, מעביר חלקים לעוזרים, ומנהל את עבודות החיבור.','לא מחזיק את המפתחות של העוזרים.',[]],
    ['a','HelperAggregator','שרת עוזר','פותח את החלק שלו, בודק את ההוכחה, ומחבר.','לא מקבל דוחות ישירות מקרנות.',[]],
    ['a','TokenGate','השוער','בודק שהאסימון אמיתי, ומסמן אותו כמשומש.','לא יודע מי קיבל את האסימון.',[]],
    ['a','ForwardOutbox','תיבת היוצאים','שומר כל העברה לעוזר באותה פעולה של הקבלה, ושולח שוב עד שהיא מגיעה.','לא מחליט אם דוח תקין.',[]],
    ['a','PrepCoordinator','המתאם','מריץ את הבדיקה המשותפת מול העוזרים, ומחליט על כל דוח: מתקבל או נדחה.','',[]],
    ['a','AggregateStore','המחסן','מחזיק את הסכום החלקי של כל אצווה בשרת הזה.','לא יכול לפתוח סכום של שרת אחר.',[]],
    ['r','IdentityService','שירות הזהות','מאמת שהקרן רשומה במאגר העולמי, ומנפיק לה אסימונים עיוורים.','לא רואה דוחות.',['id']],
    ['r','Verifier','המאמת','משווה את הסכום לסכום ההתחייבויות. אם לא תואם, מחפש בחציה.','',['ans']],
    ['r','Collector','האוסף','אוסף את שלושת הסכומים החלקיים ומחבר אותם.','לא רואה דוח בודד.',['ans']],
    ['r','BudgetLedger','פנקס התקציב','סופר כמה "פרטיות" כבר נוצלה בכל אצווה.','',[]],
    ['r','QueryGate','שער השאלות','מקבל שאלה מהקטלוג, בודק סף והפרשים, ומוסיף רעש.','לא עונה על שאלה שאינה בקטלוג.',['ans']],
    ['r','AuditService','הביקורת','מגריל קרנות לביקורת לפי מספר ציבורי, ומבקש מהן לפתוח התחייבות.','לא מגריל לפי שיקול דעת.',[]],
    ['r','Catalog','הקטלוג','רשימה סגורה של שאלות מותרות, מאושרת בשלוש חתימות.','',[]],
    ['x','ITransparencyLog','היומן','השקע ליומן השקיפות: הוספת אירוע, והוכחה שהוא שם.','',[]]];
  const ZN={p:'אצל הקרן',a:'שלושת השרתים',r:'הרגולטור',x:'משותף לכולם'};
  const lens=H('div','dz-lens'); const LS=[['all','כולם'],['id','מי יודע מי הקרן?'],['data','מי רואה מספר של קרן?'],['ans','מי מחזיק את התשובה?']];
  const LT={all:'',id:'רק שניים, ושניהם בקצוות: הארנק אצל הקרן, ושירות הזהות אצל הרגולטור. אף אחד מהם לא רואה דוח.',data:'רק המחלקות שרצות אצל הקרן עצמה. ברגע שהדוח יוצא מהמחשב שלה, אף אחד לא רואה מספר.',ans:'רק שלוש מחלקות אצל הרגולטור, ורק אחרי שהסכום אומת. אף אחת מהן לא רואה דוח בודד.'};
  const lt=H('p','dz-lt'); lt.setAttribute('aria-live','polite');
  const org=H('div','dz-org'); const cols={}; ['p','a','r'].forEach(z=>{ const c=H('div','dz-zone z-'+z); c.append(H('span','dz-zn',ZN[z])); org.append(c); cols[z]=c; }); const bar=H('div','dz-zone z-x'); bar.append(H('span','dz-zn',ZN.x));
  const card=H('div','dz-card'); card.hidden=true; card.setAttribute('aria-live','polite');
  const chips=CL.map(([z,en,he,does,not,tags])=>{ const b=H('button','dz-cl'); b.type='button'; b.append(H('b','',he),H('code','',en)); b.dataset.tags=tags.join(' ');
    b.addEventListener('click',()=>{ chips.forEach(x=>x.classList.toggle('sel',x===b)); card.hidden=false; card.innerHTML=''; card.append(H('span','dz-k',ZN[z]),H('b','',he+' · '+en)); const r1=H('p'); r1.innerHTML='<b>התפקיד:</b> '; r1.append(does); card.append(r1); if(not){ const r2=H('p','dz-not'); r2.innerHTML='<b>מה הוא לא עושה:</b> '; r2.append(not); card.append(r2); } });
    (z==='x'?bar:cols[z]).append(b); return b; });
  LS.forEach(([k,l])=>{ const b=H('button','dz-lb'+(k==='all'?' on':''),l); b.type='button'; b.addEventListener('click',()=>{ lens.querySelectorAll('.dz-lb').forEach(x=>x.classList.toggle('on',x===b)); org.dataset.lens=k; chips.forEach(c=>c.classList.toggle('lit',k!=='all'&&c.dataset.tags.split(' ').includes(k))); lt.textContent=LT[k]; }); lens.append(b); });
  s.append(lens,lt,org,bar,card);
  const net=H('p','dz-note'); net.innerHTML='בדיאגרמה המקורית, החצים שחוצים בין אזורים מקווקווים: הם לא קריאה בתוך אותה תוכנה, אלא הודעה ברשת שעוברת גבול אמון, ולכן כל אחת מהן מוצפנת וחתומה.'; s.append(net);
  ask(s,'אם הייתם צריכים לפרוץ למערכת כדי לגלות מה קרן אחת דיווחה, לאיזה עובד הייתם הולכים? ומה הוא היה יכול לספר לכם?');

  /* 3 · the envelope */
  s=sec('המעטפה, ומה הדוור מחזיר','');
  what(s,'פרוטוקול','סט כללים מוסכם מראש: איך נראית כל הודעה, ומה כל תשובה אומרת. כמו טופס בדואר: יודעים בדיוק איפה כותבים כל דבר, ומה אומרת כל חותמת שחוזרת.');
  const env=H('div','dz-env'); env.innerHTML=`<div class="dz-paper"><span class="dz-stamp">PUT /reports</span>
    ${[['מספר דוח וזמן','report_metadata','16 בתים אקראיים. לא שם, לא מספר קרן.'],['33 התחייבויות','public_share','טביעת אצבע נעולה לכל תא. הרחבה שלנו.'],['אסימון עיוור','token','מוכיח "גוף מפוקח אמיתי", בלי לומר איזה. הרחבה שלנו.'],['החלק של המוביל','leader_share','מוצפן. רק המוביל יכול לפתוח.'],['שני חלקים לעוזרים','helper_shares','מוצפנים במפתחות של העוזרים. המוביל מחזיק אותם ולא יכול לפתוח.']].map(([h,c,t])=>`<div class="dz-f"><b>${h}</b><code dir="ltr">${c}</code><span>${t}</span></div>`).join('')}</div>`;
  s.append(env);
  const RS=[['valid','דוח תקין','201','נקלט ונכתב ביומן','הקרן מקבלת קבלה חתומה עם הוכחה שהדוח ביומן, ושומרת אותה כראיה.','ok'],['bad','אסימון מזויף או מתקופה אחרת','400','אסימון לא תקף','הקרן מבקשת אסימון חדש משירות הזהות.','no'],['dup','אותו אסימון פעם שנייה','409','כפול','הקרן לא שולחת שוב: הדוח הקודם כבר נקלט.','no'],['late','תקופת הדיווח נסגרה','410','התקופה סגורה','הקרן פונה לרגולטור בערוץ הרגיל.','no']];
  const rr=H('div','dz-gr'); const ro=H('div','dz-resp'); ro.setAttribute('aria-live','polite');
  RS.forEach(([k,l,code,mean,doit,c])=>{ const b=H('button','dz-lb',l); b.type='button'; b.addEventListener('click',()=>{ rr.querySelectorAll('.dz-lb').forEach(x=>x.classList.toggle('on',x===b)); ro.className='dz-resp '+c; ro.innerHTML=''; ro.append(H('span','dz-code',code),H('b','',mean),H('p','',doit)); if(!reduce) ro.animate([{transform:'translateY(-14px) rotate(-3deg)',opacity:0},{transform:'none',opacity:1}],{duration:400,easing:'cubic-bezier(.3,1.4,.5,1)'}); }); rr.append(b); });
  s.append(H('p','dz-sub','בחרו מה קורה, ותראו איזו חותמת חוזרת:'),rr,ro);
  ask(s,'למה הקבלה של 201 נשלחת רק אחרי שהדוח נכתב ביומן, ולא רגע אחרי שהוא הגיע?');

  /* 4 · the report's life */
  s=sec('החיים של דוח אחד','');
  what(s,'מכונת מצבים','רשימה של כל המצבים שאובייקט יכול להיות בהם, ושל המעברים המותרים ביניהם. כמו מעקב משלוח: הוזמן, נארז, בדרך, נמסר. אי אפשר לקפוץ מ"הוזמן" ל"נמסר", ואי אפשר לחזור מ"נמסר" ל"בדרך".');
  const SM=[['RECEIVED','התקבל',600,60],['TOKEN_OK','אסימון תקין',480,60],['FORWARDED','בדרך לעוזרים',360,60],['PREPARED','שלושה אימתו',240,60],['AGGREGATED','בתוך סכום',120,60],['EXPIRED','נמחק',120,160],['REJECTED','נדחה, עם סיבה',360,170]];
  const box=H('div','dz-sm'); const sv=S('svg',{viewBox:'0 0 680 230',class:'dz-svg',role:'img','aria-label':'מכונת המצבים של דוח'}); box.append(sv);
  const P={}; SM.forEach(([k,h,x,y])=>P[k]=[x,y]);
  const ED=[['RECEIVED','TOKEN_OK'],['TOKEN_OK','FORWARDED'],['FORWARDED','PREPARED'],['PREPARED','AGGREGATED'],['AGGREGATED','EXPIRED'],['RECEIVED','REJECTED'],['FORWARDED','REJECTED']];
  S('circle',{cx:665,cy:60,r:7,class:'dz-st0'},sv); S('path',{d:'M658 60 H652',class:'dz-e'},sv);
  ED.forEach(([a,b])=>{ const [x1,y1]=P[a],[x2,y2]=P[b]; const d=a==='RECEIVED'&&b==='REJECTED'?`M600 82 V170 H412`:`M${x1-(y1===y2?52:0)} ${y1+(y1===y2?0:22)} L${x2+(y1===y2?52:0)} ${y2-(y1===y2?0:22)}`; S('path',{d,class:'dz-e'+(b==='REJECTED'?' r':''),'marker-end':'url(#dzar)'},sv); });
  S('path',{d:'M330 38 V14 H390 V38',class:'dz-e g','marker-end':'url(#dzar)'},sv); const lp=S('text',{x:360,y:10,class:'dz-el','text-anchor':'middle'},sv); lp.textContent='עוזר לא זמין: מחכה';
  sv.insertAdjacentHTML('afterbegin','<defs><marker id="dzar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="dz-mk"/></marker></defs>');
  const NODES={}; SM.forEach(([k,h,x,y])=>{ const g=S('g',{class:'dz-node'+(k==='REJECTED'?' bad':k==='AGGREGATED'?' ok':''),transform:`translate(${x} ${y})`},sv); S('rect',{x:-52,y:-22,width:104,height:44,rx:10},g); const t1=S('text',{y:-3,'text-anchor':'middle',class:'dz-sk'},g); t1.textContent=k; const t2=S('text',{y:13,'text-anchor':'middle',class:'dz-sh'},g); t2.textContent=h; NODES[k]=g; });
  const tok=S('circle',{r:9,class:'dz-tok',cx:665,cy:60},sv);
  const log=H('ol','dz-log'); const evb=H('div','dz-gr');
  const PATHS={ok:['שליחה רגילה',[['RECEIVED','הדוח הגיע למוביל.'],['TOKEN_OK','השוער בדק: אסימון אמיתי וחדש. נבדק לפני כל פענוח, כך שהצפה של דוחות מזויפים עולה לתוקף אסימון לכל אחד.'],['FORWARDED','נשמר יחד עם ההעברות לעוזרים, באותה פעולה.'],['PREPARED','שלושת השרתים בדקו את ההוכחה: המספר בטווח.'],['AGGREGATED','נכנס לסכום החלקי. מעכשיו הוא חלק מסכום, לא דוח.'],['EXPIRED','האצווה אומתה ונשמרה. החלקים הבודדים נמחקים: כל יום שהם קיימים הוא סיכון.']]],
    dup:['אסימון כפול',[['RECEIVED','הדוח הגיע למוביל.'],['REJECTED','האסימון כבר שומש. נדחה עוד לפני פענוח, והסיבה נכתבת ביומן.']]],
    down:['עוזר לא זמין',[['RECEIVED','הדוח הגיע.'],['TOKEN_OK','אסימון תקין.'],['FORWARDED','עוזר אחד לא עונה. הדוח לא נדחה ולא הולך לאיבוד: הוא מחכה בתיבת היוצאים.'],['FORWARDED','ניסיון חוזר... עדיין לא.'],['FORWARDED','העוזר חזר. ההעברה הגיעה.'],['PREPARED','שלושה אימתו.'],['AGGREGATED','נכנס לסכום. מאוחר, אבל שלם.']]],
    proof:['הוכחה נכשלה',[['RECEIVED','הדוח הגיע.'],['TOKEN_OK','אסימון תקין.'],['FORWARDED','החלקים בדרך.'],['REJECTED','ההוכחה נכשלה: המספר מחוץ לטווח. הדוח נדחה, לא נכנס לשום סכום, והסיבה ביומן.']]]};
  let running=false;
  Object.entries(PATHS).forEach(([k,[l,steps]])=>{ const b=H('button','dz-lb',l); b.type='button'; b.addEventListener('click',async()=>{ if(running) return; running=true; evb.querySelectorAll('.dz-lb').forEach(x=>{ x.disabled=true; x.classList.toggle('on',x===b); }); log.textContent=''; Object.values(NODES).forEach(n=>n.classList.remove('cur','was'));
      tok.setAttribute('cx',665); tok.setAttribute('cy',60); await sleep(200);
      for(const [st,t] of steps){ Object.values(NODES).forEach(n=>{ if(n.classList.contains('cur')){ n.classList.remove('cur'); n.classList.add('was'); } }); NODES[st].classList.add('cur'); const [x,y]=P[st]; tok.setAttribute('cx',x); tok.setAttribute('cy',y-30); const li=H('li'); li.append(H('code','',st),H('span','',t)); log.append(li); await sleep(1100); }
      running=false; evb.querySelectorAll('.dz-lb').forEach(x=>x.disabled=false); }); evb.append(b); });
  s.append(H('p','dz-sub','בחרו מה קורה לדוח, ועקבו אחריו:'),evb,box,log);
  emma(s,'"אז דוח לא יכול "להיעלם". הוא או בסכום, או נדחה עם סיבה ביומן. ואחרי האימות, גם החלקים שלו נמחקים."');
  ask(s,'למה למחוק את החלקים אחרי האימות, אם אף אחד ממילא לא יכול לפתוח אותם לבד?');

  /* 5 · the batch, and binary search */
  s=sec('החיים של אצווה, וחיפוש בחציה','אצווה היא כל הדוחות של תקופה אחת. היא האובייקט שהרגולטור רואה, והיא נפתחת לשאלות רק אחרי שהסכום שלה נבדק מול כל ההתחייבויות. ומה אם הבדיקה נכשלת?');
  const flow=H('div','dz-flow'); ['OPEN · מקבלת דוחות','CLOSING · התקופה נגמרה','AWAITING · ממתינה לשלושה','COLLECTED · שלושה סכומים','VERIFYING · מול ההתחייבויות','QUERYABLE · פתוחה לשאלות'].forEach((t,i)=>{ const c=H('span','dz-fs'+(i===5?' ok':i===4?' mid':''),t); flow.append(c); }); s.append(flow);
  what(s,'חיפוש בחציה','כמו למצוא נורה שרופה בשרשרת של 500 נורות: לא בודקים אחת אחת. מחלקים לשניים, בודקים איזה חצי לא תקין, ושוב מחלקים אותו. אחרי 9 חלוקות לכל היותר נשארת נורה אחת.');
  const bs=H('div','dz-bs'); const grid=H('div','dz-cells'); for(let i=0;i<500;i++) grid.append(H('i')); const bsc=H('div','dz-gr'); const go=H('button','dz-lb','שרת משבש דוח אחד, ומתחילים לחפש'); go.type='button'; const bo=H('p','dz-bo'); bo.setAttribute('aria-live','polite');
  const cells=[...grid.children];
  go.addEventListener('click',async()=>{ go.disabled=true; cells.forEach(c=>c.className=''); const bad=Math.floor(Math.random()*500); let lo=0,hi=500,r=0; bo.textContent='הסכום של האצווה לא תואם להתחייבויות. האצווה לא נפתחת, ומתחילים לחפש.'; await sleep(900);
    while(hi-lo>1){ r++; const mid=(lo+hi)>>1; const left=bad<mid; cells.forEach((c,i)=>{ c.className=(i>=lo&&i<hi)?((i<mid)===left?'in':'out'):'off'; }); bo.textContent='סבב '+r+': בודקים '+(mid-lo)+' דוחות מתוך '+(hi-lo)+'. '+(left?'החצי הראשון':'החצי השני')+' לא תואם.'; if(left) hi=mid; else lo=mid; await sleep(650); }
    cells.forEach((c,i)=>c.className=i===lo?'bad':'off'); bo.textContent='נמצא אחרי '+r+' סבבים: דוח מספר '+(lo+1)+'. הוא מוסר, הסכום נבדק שוב ותואם, והאצווה נפתחת. ואם המקור היה שרת שמשבש את הסכום שלו, האצווה הייתה נכנסת להסגר, עם הוכחה ביומן לכל שלוש הרשויות.'; go.disabled=false; go.textContent='עוד פעם, עם דוח אחר'; });
  bsc.append(go); bs.append(bsc,grid,bo); s.append(bs);
  ask(s,'500 דוחות, 9 סבבים. כמה סבבים היו צריכים בשביל 1,000 דוחות?');

  /* 6 · one period, step by step */
  s=sec('תקופת דיווח אחת, מקצה לקצה','');
  what(s,'דיאגרמת רצף','כל עמודה היא משתתף, והחיצים הם הודעות לפי סדר הזמן, מלמעלה למטה. כמו תסריט: מי אומר מה, למי, ומתי.');
  const LF=[['P','הקרן'],['I','זהות'],['L','מוביל'],['Hh','עוזרים'],['G','יומן'],['C','אימות'],['Q','שאלות']];
  const MS=[[0,['P','I','אסימון עיוור'],['I','P','חתימה']],[1,['P','P','קידוד · נעילה · פיצול · הצפנה']],[2,['P','L','PUT דוח'],['L','L','בדיקת אסימון']],[3,['L','G','ReportReceived'],['L','L','שמירה + תיבת יוצאים'],['L','P','201 קבלה']],[4,['L','Hh','העברת החלקים'],['L','Hh','הכנה'],['Hh','L','אישור הוכחה']],[5,['C','L','סכום חלקי'],['C','Hh','סכום חלקי'],['Hh','C','שני סכומים']],[6,['C','G','קריאת ההתחייבויות'],['C','C','בדיקה'],['C','G','BatchVerified']],[7,['Q','C','הסכום המאומת'],['Q','Q','סף · רעש · תקציב'],['Q','G','BudgetSpent']]];
  const CAP=[['הקרן מבקשת אסימון עיוור, הרבה לפני תקופת הדיווח. שירות הזהות חותם עליו בלי לראות אותו.','הפער בזמן הוא חלק מההגנה: גם אם שירות הזהות והשוער ישתפו פעולה, הם לא יוכלו לחבר אסימון לדוח לפי השעה.'],
    ['במחשב של הקרן: התאים מקודדים, ננעלים בהתחייבויות, מתפצלים לשלושה, וכל חלק מוצפן לשרת שלו.','זה הרגע האחרון שבו מישהו רואה מספר של הקרן. והמישהו הוא הקרן עצמה.'],
    ['הדוח נשלח למוביל, והשוער בודק את האסימון לפני כל דבר אחר.','דוח מזויף נעצר בכניסה, בלי שהשרת מבזבז עליו פענוח.'],
    ['קודם יומן, אחר כך שמירה, ורק אז קבלה לקרן.','אם הכתיבה ליומן נכשלה, הקרן מקבלת שגיאה ושולחת שוב. אין דוח "שהתקבל" בלי עקבות.'],
    ['המוביל מעביר לכל עוזר את החלק המוצפן שלו, ושלושתם בודקים יחד את ההוכחה.','דוח מתקבל רק אם שלושת השרתים הסכימו.'],
    ['בסוף התקופה, המאמת של הרגולטור אוסף שלושה סכומים חלקיים.','כל סכום חלקי לבדו נראה כמו רעש. רק השלושה יחד נותנים את הסכום.'],
    ['הסכום נבדק מול מכפלת כל ההתחייבויות מהיומן, ואם הוא תואם, נכתב BatchVerified.','זו הבדיקה שמבטיחה ששום שרת לא הוסיף או השמיט דוח.'],
    ['שאלה מהקטלוג: בדיקת סף, תוספת רעש, ורישום התקציב שנוצל.','רעש נוסף רק כאן, ביציאה. הסכום המאומת נשאר מדויק, ורק מה שיוצא החוצה מורעש. קודם מאמתים, ואחר כך מגינים.']];
  const sq=H('div','dz-seq'); const W=700, X=i=>W-50-i*((W-100)/6); const sv2=S('svg',{viewBox:`0 0 ${W} 330`,class:'dz-svg',role:'img','aria-label':'דיאגרמת רצף של תקופת דיווח'}); sq.append(sv2);
  const LX={}; LF.forEach(([k,n],i)=>{ LX[k]=X(i); S('line',{x1:X(i),y1:34,x2:X(i),y2:320,class:'dz-life'},sv2); const r=S('rect',{x:X(i)-34,y:6,width:68,height:24,rx:6,class:'dz-lh'},sv2); const t=S('text',{x:X(i),y:23,'text-anchor':'middle',class:'dz-lt2'},sv2); t.textContent=n; });
  const G=S('g',{},sv2); const ARS=[]; let y=48;
  MS.forEach(([si,...ms])=>{ ms.forEach(([a,b,l])=>{ const g=S('g',{class:'dz-m','data-s':si},G); if(a===b){ S('path',{d:`M${LX[a]} ${y} h-26 v12 h26`,class:'dz-ma'},g); const t=S('text',{x:LX[a]-30,y:y+9,class:'dz-ml','text-anchor':'start'},g); t.textContent=l; y+=20; }
      else { S('path',{d:`M${LX[a]} ${y} H${LX[b]}`,class:'dz-ma'+(b==='G'?' log':''),'marker-end':'url(#dzar2)'},g); const t=S('text',{x:(LX[a]+LX[b])/2,y:y-4,class:'dz-ml','text-anchor':'middle'},g); t.textContent=l; y+=16; } ARS.push(g); }); y+=4; });
  sv2.setAttribute('viewBox',`0 0 ${W} ${y+10}`); sv2.querySelectorAll('.dz-life').forEach(l=>l.setAttribute('y2',y+6));
  sv2.insertAdjacentHTML('afterbegin','<defs><marker id="dzar2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="dz-mk"/></marker></defs>');
  const cap=H('div','dz-cap'); cap.setAttribute('aria-live','polite'); const c1=H('p','dz-c1'), c2=H('p','dz-c2'); cap.append(c1,c2);
  const ctl=H('div','dz-ctl'); const pv=H('button','dz-lb','‹'), nx=H('button','dz-lb on','הצעד הבא ›'), num=H('span','dz-num'); pv.type=nx.type='button'; pv.setAttribute('aria-label','הצעד הקודם'); ctl.append(num,pv,nx);
  let cur=0; const show=i=>{ cur=i; ARS.forEach(g=>{ const k=+g.dataset.s; g.classList.toggle('now',k===i); g.classList.toggle('past',k<i); }); c1.textContent=CAP[i][0]; c2.textContent='לאמה: '+CAP[i][1]; num.textContent=(i+1)+' / 8'; pv.disabled=i===0; nx.disabled=i===7; };
  pv.addEventListener('click',()=>show(cur-1)); nx.addEventListener('click',()=>show(cur+1)); show(0);
  s.append(ctl,cap,sq); ask(s,'באיזה צעד בתסריט הזה הייתם מנסים לחבר בין קרן לדוח שלה, ומה הייתם צריכים בשביל זה?');

  /* 7 · the kitchen */
  s=sec('המטבח: הרבה הזמנות, מעט טבחים','');
  what(s,'תהליכון','שורת עבודה שרצה במקביל לאחרות בתוך אותה תוכנה. כמו מטבח של מסעדה: כמה טבחים, הרבה הזמנות, וכולם נוגעים באותו מקרר. העיצוב קובע מי לוקח מה, ואיך שני טבחים לא תופסים את אותה עגבנייה.');
  const kt=H('div','dz-kit'); kt.innerHTML=`<div class="dz-race"><div class="dz-w a"><b>בקשה א</b><span>אסימון 7f3a…</span></div><div class="dz-seat"><b>used_tokens</b><span>מקום אחד לכל אסימון</span></div><div class="dz-w b"><b>בקשה ב</b><span>אסימון 7f3a…</span></div></div><p class="dz-ro" aria-live="polite">שתי בקשות עם אותו אסימון מגיעות באותה אלפית שנייה. מה יקרה?</p>`;
  const rb=H('button','dz-lb on','להריץ את המרוץ'); rb.type='button'; rb.addEventListener('click',async()=>{ rb.disabled=true; kt.classList.remove('done'); kt.classList.add('run'); const ro=kt.querySelector('.dz-ro'); ro.textContent='שתיהן רצות לטבלה...'; await sleep(1100); kt.classList.add('done'); const w=Math.random()<.5?'א':'ב'; kt.dataset.win=w==='א'?'a':'b'; ro.textContent='בקשה '+w+' נכנסה וקיבלה 201. השנייה נתקלה באינדקס הייחודי וקיבלה 409. אין נעילה בקוד: מסד הנתונים הוא השופט.'; rb.disabled=false; rb.textContent='עוד פעם'; kt.classList.remove('run'); });
  kt.prepend(rb); s.append(kt);
  const kr=H('div','dz-krules'); [['אינדקס ייחודי','שתי בקשות עם אותו אסימון: אחת נכנסת, השנייה נכשלת. בדיוק מה שראיתם.'],['SERIALIZABLE','שתי עבודות שמוסיפות לאותה אצווה לא דורסות זו את זו. כמו שני קופאים שלא כותבים באותה שורה בספר.'],['תיבת היוצאים באותה פעולה','הדוח וההעברה לעוזר נשמרים יחד, או לא נשמרים בכלל. אין דוח שנקלט ולא יגיע.'],['אין זיכרון משותף','שלושת השרתים מדברים רק בהודעות. זו לא החלטה של מהירות. זו דרישה של פרטיות.']].forEach(([h,t])=>{ const c=H('div','dz-kr'); c.append(H('b','',h),H('p','',t)); kr.append(c); }); s.append(kr);
  ask(s,'ומה היה קורה בלי האינדקס הייחודי, אם שתי הבקשות היו נכנסות?');

  /* 8 · two cabinets */
  s=sec('שני ארונות, בלי חוט ביניהם','כאן העיקרון הראשון הופך לטבלאות: שני מסדי נתונים נפרדים לגמרי. אצל הרגולטור אין שום טבלה עם מספר דוח, ואצל השרתים אין שום טבלה עם מזהה של קרן.');
  const TB={srv:[['tasks','הגדרת המשימה: אופן החישוב, מפתחות, אורך תקופה',['task_id','period_id','vdaf_config']],['reports','הדוח: החלק המוצפן, המצב, ההתחייבויות',['report_id','encrypted_share','status','batch_id','expires_at']],['used_tokens','טביעת אצבע של כל אסימון שנוצל',['token_hash','period_id','used_at']],['aggregate_shares','הסכום החלקי של כל אצווה',['batch_id','share','report_count']],['pending_forwards','תיבת היוצאים: העברות שעוד לא אושרו',['report_id','helper_index','attempts']]],
    reg:[['participants','הקרן: מזהה, רשות, סטטוס',['lei','regulator_id','sector','status']],['token_issuance','כמה אסימונים הונפקו לכל קרן',['lei','period_id','issued_at']],['catalog_versions','גרסאות הקטלוג, שלוש חתימות',['version','queries','approved_by']],['batches','האצווה והסכום המאומת',['batch_id','n_reports','verified']],['budget_ledger','תקציב הפרטיות שנוצל',['period_id','query_id','rho']],['releases','תשובות ששוחררו, עם הרעש',['batch_id','catalog_version','values']],['audit_selections','הגרלות הביקורת',['period_id','drand_round','selected_ids']]]};
  const cab=H('div','dz-cabs'); const tcard=H('div','dz-tcard'); tcard.hidden=true;
  [['srv','בכל אחד משלושת השרתים'],['reg','אצל הרגולטור']].forEach(([k,l])=>{ const c=H('div','dz-cab '+k); c.append(H('span','dz-k',l)); TB[k].forEach(([n,d,cols])=>{ const b=H('button','dz-drawer'); b.type='button'; b.append(H('code','',n),H('span','',d)); b.addEventListener('click',()=>{ cab.querySelectorAll('.dz-drawer').forEach(x=>x.classList.toggle('on',x===b)); tcard.hidden=false; tcard.innerHTML=''; tcard.append(H('code','dz-tn',n)); const ul=H('div','dz-cols'); cols.forEach(x=>{ const s2=H('code','',x); if(/lei/.test(x)) s2.className='id'; if(/report_id|encrypted_share|share/.test(x)) s2.className='ct'; ul.append(s2); }); tcard.append(ul); }); c.append(b); }); cab.append(c); });
  s.append(cab,tcard);
  const jn=H('div','dz-join'); jn.innerHTML=`<pre dir="ltr"><code>SELECT p.lei, r.encrypted_share
FROM participants p JOIN reports r ON ???</code></pre>`; const jb=H('button','dz-lb','לנסות לחבר בין הארונות'); jb.type='button'; const jo=H('p','dz-jo'); jo.setAttribute('aria-live','polite'); jb.addEventListener('click',()=>{ jn.classList.add('err'); jo.textContent='שגיאה: אין עמודה משותפת. ואין גם דרך להוסיף אחת, כי אף מחלקה לא מחזיקה את שני הצדדים. גם מי שמחזיק את שני מסדי הנתונים לא יוכל לחבר אותם.'; }); jn.prepend(jb); jn.append(jo); s.append(jn);
  emma(s,'"אז זה מה שהיה חסר לי: התשובה ל"איפה זה כתוב". זה לא כתוב בנוהל. זה כתוב בזה שאין עמודה."');
  ask(s,'ואם מחר מישהו יבקש "רק עמודה אחת, לצורכי תמיכה", מי במערכת אמור לומר לא?');

  /* 9 · the build ladder */
  s=sec('סדר הבנייה: שבע גרסאות, שבעה מבחני יציאה','כל גרסה עומדת בפני עצמה ונבדקת לפני שממשיכים: קודם הליבה, שאם היא לא עובדת אין טעם בשאר, אחר כך מה שמגן עליה, ובסוף מה שמשתמש בה. לחצו על כל שלב כדי להריץ את מבחן היציאה שלו.');
  const VS=[['V0.1','ליבה: שני שרתים, דוח אחד וסכום אחד','500 דוחות מדומים, והסכום זהה לסכום הישיר'],['V0.2','שלושה שרתים, תיבת יוצאים, הצפנה','מכבים עוזר באמצע: אף דוח לא הולך לאיבוד'],['V0.3','התחייבויות, מאמת וחיפוש בחציה','שרת משמיט דוח בכוונה: נתפס, והדוח נמצא'],['V0.4','זיהוי, אסימונים עיוורים, שוער','אותו אסימון פעמיים: 409. אסימון מזויף: 400'],['V0.5','יומן שקיפות','כל אירוע עם הוכחה שהוא ביומן'],['V0.6','קטלוג, שער שאלות, רעש ותקציב','שתי שאלות שההפרש ביניהן חושף קרן: השנייה נחסמת'],['V1.0','דוחות, ביקורת מדגמית, ייצוא','תקופת דיווח מלאה, מקצה לקצה, עם שלוש רשויות']];
  const lad=H('ol','dz-lad'); let lv=0; const lis=VS.map(([v,w,t],i)=>{ const li=H('li'); const b=H('button','dz-rung'); b.type='button'; b.append(H('code','',v),H('b','',w),H('span','dz-ex','מבחן היציאה: '+t)); b.disabled=i>0; b.addEventListener('click',async()=>{ if(li.classList.contains('pass')) return; b.disabled=true; li.classList.add('test'); await sleep(900); li.classList.remove('test'); li.classList.add('pass'); lv=i+1; if(lis[i+1]) lis[i+1].querySelector('button').disabled=false; if(lv===7) lo.textContent='שבע מתוך שבע. המרשם מוכן לתקופת דיווח אמיתית.'; }); li.append(b); lad.append(li); return li; });
  const lo=H('p','dz-lo'); lo.setAttribute('aria-live','polite'); s.append(lad,lo);
  ask(s,'למה הזיהוי והאסימונים מגיעים רק בגרסה הרביעית, ולא בראשונה?');

  /* 10 · what this document closes */
  s=sec('מה המסמך הזה סוגר','');
  const cl=H('div','dz-close'); cl.innerHTML='<p>אחרי מסמך העיצוב, כל מחלקה יודעת מה היא עושה ומה היא לא עושה, כל אובייקט יודע לאן הוא יכול לעבור, וכל טבלה יודעת מה מותר לשמור בה.</p><p class="dz-big">ההבטחה "לחבר בלי לראות" מתורגמת כאן לשתי שורות: אין שדה שמחבר זהות לתוכן, ואין מעבר שמוביל לסכום לא מאומת.</p>';
  s.append(cl); ask(s,'המרשם מוכן לבנייה. אבל האם הוא עונה על השאלה ששלחה את כל התיק לדרך?');
  if(window.fxDownloads){ const d=sec('הורדה',''); d.append(window.fxDownloads('registry','design','מסמך העיצוב','The design document','מחלקות, מצבים, רצף, תהליכונים, טבלאות וסדר בנייה.','Classes, states, sequence, threads, tables and build order.')); }

  /* the full original, folded */
  const full=H('details','dz-full'); full.append(H('summary','','המסמך המלא, כמו שהוא: כל הטבלאות והתרשימים')); const fb=H('div','dz-md'); full.append(fb); root.append(full);
  let built=false; full.addEventListener('toggle',()=>{ if(built||!full.open) return; built=true; fb.innerHTML=md(window.DZ_RG_MD||''); });
  function esc(t){ return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function md(src){ const L=src.split('\n'); let o='', i=0; while(i<L.length){ let l=L[i];
      if(l.startsWith('```')){ let b=''; i++; while(i<L.length&&!L[i].startsWith('```')){ b+=L[i]+'\n'; i++; } o+='<pre dir="ltr"><code>'+esc(b)+'</code></pre>'; i++; continue; }
      if(l.startsWith('|')){ const rows=[]; while(i<L.length&&L[i].startsWith('|')){ rows.push(L[i]); i++; } const cells=r=>r.slice(1,-1).split('|').map(c=>esc(c.trim())); o+='<div class="dz-tw"><table><thead><tr>'+cells(rows[0]).map(c=>'<th>'+c+'</th>').join('')+'</tr></thead><tbody>'+rows.slice(2).map(r=>'<tr>'+cells(r).map(c=>'<td>'+c+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>'; continue; }
      if(l.startsWith('- ')){ o+='<ul>'; while(i<L.length&&L[i].startsWith('- ')){ o+='<li>'+esc(L[i].slice(2))+'</li>'; i++; } o+='</ul>'; continue; }
      if(l.startsWith('# ')) o+='<h4>'+esc(l.slice(2))+'</h4>'; else if(l.startsWith('## ')) o+='<h5>'+esc(l.slice(3))+'</h5>'; else if(l.startsWith('### ')) o+='<h6>'+esc(l.slice(4))+'</h6>';
      else if(l.startsWith('@img ')){ const f=l.slice(5).split('|')[0].replace('.png','.jpg'); o+='<img loading="lazy" alt="" src="../../assets/img/design/'+f+'">'; }
      else if(l.startsWith('@p ')||l.startsWith('@src ')) o+='<p>'+esc(l.replace(/^@\w+ /,''))+'</p>'; else if(l.trim()) o+='<p>'+esc(l)+'</p>';
      i++; } return o; }
  if(window.TermWin) window.TermWin.wire(root);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,0)); else setTimeout(boot,0);
})();
