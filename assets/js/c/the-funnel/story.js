/* Case 05 · stage 01 story content (the-funnel). Engine: story.js. Same contract as Case 03/04:
   AV, CAST, castLabel, WHO, whoLabel, bothKeys, SC (scenes), interAt (index of the interactive scene), inter(sEls), tlSvg(), EV, ICO, QZ, qzFin.
   Timeline: a non-linear axis (2026 is stretched) and three marker rows, so close events never pile up. */
window.STORY=window.STORY||{};
window.STORY['the-funnel']=function(api){
  const {H,T,d}=api;
  const AV={
   jake:`<svg viewBox="0 0 60 60" class="st-av-svg" aria-hidden="true"><circle cx="30" cy="30" r="28" class="av-bg"/><path d="M18 26 q0 -14 12 -14 q12 0 12 14 q-4 -6 -12 -6 q-8 0 -12 6z" class="av-hair"/><circle cx="30" cy="30" r="12" class="av-face"/><rect x="21" y="26" width="8" height="6" rx="2" class="av-doc"/><rect x="31" y="26" width="8" height="6" rx="2" class="av-doc"/><path d="M26 36 q4 2 8 0" class="av-mouth"/><path d="M12 58 q4 -14 18 -14 q14 0 18 14z" class="av-body"/><rect x="22" y="47" width="16" height="10" rx="1" class="av-doc"/></svg>`,
   rosa:`<svg viewBox="0 0 60 60" class="st-av-svg" aria-hidden="true"><circle cx="30" cy="30" r="28" class="av-bg"/><path d="M15 30 q0 -20 15 -20 q15 0 15 20 q-2 -10 -15 -10 q-13 0 -15 10z" class="av-hair"/><path d="M16 22 q14 -14 28 0 v2 h-28z" class="av-doc"/><circle cx="30" cy="31" r="11" class="av-face"/><circle cx="26" cy="30" r="1.6" class="av-eye"/><circle cx="34" cy="30" r="1.6" class="av-eye"/><path d="M26 36 h8" class="av-mouth"/><path d="M12 58 q4 -14 18 -14 q14 0 18 14z" class="av-body"/><path d="M44 44 l4 -8 l-3 0 l3 -8" class="av-mouth"/></svg>`
  };
  const CAST=[
   ['jake','ג\'ייק מורנו, 36, CTO של Ledgerly, סטארטאפ באוסטין','בראש המשפך. החברה שלו, 40 עובדים, בונה סוכני AI שקוראים חשבוניות ומשלמים ספקים. החשבון שלו על טוקנים: כ-38 אלף דולר בחודש. כל חודש הוא בודק איזה מודל הכי משתלם, ומחליף בשורת קוד.'],
   ['rosa','רוזה דלגדו, 51, חשמלאית ראשית וחברת מועצת עיר במערב טקסס','בתחתית המשפך. כבר שנה וחצי היא מושכת כבלים באתר בנייה של דאטה סנטר ליד העיר הקטנה שלה. זו העבודה הכי טובה שהייתה באזור מאז שסגרו את בארות הנפט. בנובמבר 2026 העיר שלה מצביעה על הקפאה.']];
  const WHO={
   1:['jake','"כולם במשרד מדברים על ההנפקה. אני שואל שאלה אחרת: כמה אני משלם החודש, ומה קיבלתי בשביל זה."'],
   2:['rosa','"כשהמניות יורדות בניו יורק, אצלנו באתר מישהו תמיד שואל בהפסקה: \'זה אומר שיפסיקו לבנות?\'."'],
   3:['rosa','"שלושה טריליון. אני לא יודעת כמה זה. אני יודעת שהבניין שלנו צורך יותר חשמל מכל העיר."'],
   4:['jake','"38 אלף דולר בחודש שלנו נכנסים למשפך הזה. אם היה לי מושג לאן הם מגיעים בסוף, אולי הייתי מנהל אותם אחרת."'],
   5:['jake','"בשנה שעברה החשבון שלנו הוכפל כל רבעון. השנה הוא כמעט לא זז. לא כי אנחנו משתמשים פחות. כי המחירים יורדים."'],
   6:['jake','"אני כבר כמעט לא כותב קוד. אני מפקח על עשרים סוכנים. אבל אשתי, רואת חשבון, עדיין לא נגעה ב-AI בעבודה."'],
   7:['jake','"בשבוע שעבר עברנו לספק אחר. זה לקח עשר דקות. המודל הקודם היה מעולה. השני היה מעולה וזול יותר."'],
   8:['jake','"המודל שבחרנו בספטמבר כבר לא הכי טוב. מישהו שילם מיליארדים לאמן אותו, ואנחנו השתמשנו בו שישה שבועות."'],
   9:['both','ג\'ייק ורוזה לא מכירים. הוא בראש המשפך, ומחליט כל חודש כמה כסף נכנס. היא בתחתית, ומחכה לדעת אם הכסף יגיע עד אליה. את שניהם תפגשו שוב בכל שלב.']};
  const SC=[];
  // 1 · picking a number
  SC.push({n:'לבחור מספר', svg:()=>
    T(200,30,'בין אוטופיה לארמגדון, צריך מספר אחד','sv-h')+
    `<g class="a-up"${d(.1)}><line x1="50" y1="200" x2="350" y2="200" class="sv-base"/><path d="M60 200 Q200 40 340 200" class="sv-dash" style="fill:none"/></g>`+
    `<g class="a-pop"${d(.6)}><circle cx="70" cy="196" r="9" class="sv-co cold"/>${T(70,226,'ארמגדון','sv-l')}</g>`+
    `<g class="a-pop"${d(.9)}><circle cx="330" cy="196" r="9" class="sv-co warm"/>${T(330,226,'אוטופיה','sv-l')}</g>`+
    `<g class="a-in-l"${d(1.4)}><rect x="140" y="104" width="120" height="50" rx="8" class="sv-giant"/>${T(200,126,'שווי מבוקש','sv-l inv')}<text x="200" y="146" text-anchor="middle" class="sv-v hot inv">~$<tspan data-to="1.5" data-dec="1">0</tspan> טריליון</text></g>`+
    T(200,262,'אחת מ-15 החברות הגדולות בעולם, אם תצליח','sv-l dim')});
  // 2 · a precarious moment
  SC.push({n:'רגע רעוע', svg:()=>
    T(200,30,'השבוע של ההנפקה, במספרים','sv-h')+
    `<line x1="40" y1="150" x2="360" y2="150" class="sv-base"/>`+
    `<rect x="60" y="150" width="56" height="${30*2}" rx="4" class="sv-bar cold a-grow"${d(.3)}/>`+T(88,232,'Nvidia','sv-l')+`<text x="88" y="140" text-anchor="middle" class="sv-v cold a-up"${d(.5)}>-<tspan data-to="30">0</tspan>%</text>`+
    `<rect x="150" y="150" width="56" height="${66*1.6}" rx="4" class="sv-bar cold a-grow"${d(.6)}/>`+T(178,272,'CoreWeave','sv-l')+`<text x="178" y="140" text-anchor="middle" class="sv-v cold a-up"${d(.8)}>-<tspan data-to="66">0</tspan>%</text>`+T(178,256,'מהשיא (מאי)','sv-l dim')+
    `<g class="a-up"${d(1.4)}><rect x="240" y="${150-25*2}" width="56" height="${25*2}" rx="4" class="sv-bar warm"/>${T(268,92,'+25%','sv-v warm')}${T(268,170,'11 בנובמבר','sv-l')}${T(268,186,'CoreWeave','sv-l dim')}</g>`+
    `<g class="a-pop"${d(2)}>${T(330,110,'OpenAI:','sv-l')}${T(330,128,'נדחה לשנה','sv-l hot')}${T(330,146,'הבאה','sv-l hot')}</g>`});
  // 3 · three trillion
  SC.push({n:'שלושה טריליון', svg:()=>
    T(200,30,'כמה הכנסות צריך ב-2030?','sv-h')+
    `<line x1="40" y1="230" x2="360" y2="230" class="sv-base"/>`+
    `<rect x="70" y="${230-6}" width="60" height="6" rx="2" class="sv-bar warm a-grow"${d(.3)}/>`+T(100,252,'היום: ~0.2','sv-l')+
    `<rect x="170" y="${230-90}" width="60" height="90" rx="4" class="sv-bar hot a-grow"${d(.7)}/>`+`<text x="200" y="128" text-anchor="middle" class="sv-v hot a-up"${d(1)}><tspan data-to="3">0</tspan></text>`+T(200,252,'נדרש ב-2030','sv-l')+
    `<rect x="270" y="${230-180*.55}" width="60" height="${180*.55}" rx="4" class="sv-bar cold a-grow"${d(1.2)}/>`+T(300,252,'כל השכר בארה"ב','sv-l')+`<text x="300" y="${222-99}" text-anchor="middle" class="sv-v cold a-up"${d(1.5)}><tspan data-to="16.5" data-dec="1">0</tspan></text>`+
    T(200,276,'טריליוני דולרים בשנה · המחשה בקנה מידה חלקי','sv-l dim')});
  // 4 · the funnel
  SC.push({n:'המשפך', svg:()=>{ const rows=[['מפתחי מודלים','~200 מיליארד'],['שבבים: Nvidia, TSMC',''],['זיכרון: Samsung, SK Hynix',''],['דאטה סנטרים',''],['חשמל: טורבינות גז','']];
    return T(200,24,'כל הכסף נכנס למעלה ויורד למטה','sv-h')+
    `<path d="M70 44 H330 L240 150 V262 H160 V150 Z" class="sv-pod a-up"${d(.1)}/>`+
    rows.map(([a,b],i)=>`<g class="a-up"${d(.4+i*.35)}>${T(200,74+i*40,a,i?'sv-l':'sv-l hot')}${b?T(200,92,b,'sv-l dim'):''}</g>`).join('')+
    [0,1,2,3].map(i=>`<circle cx="${180+i*12}" cy="60" r="5" class="sv-co warm"><animate attributeName="cy" values="56;250" dur="${2.4+i*.3}s" begin="${i*.5}s" repeatCount="indefinite"/></circle>`).join(''); }});
  // 5 · one order of magnitude (interactive)
  SC.push({n:'סדר גודל אחד', inter:true, svg:()=>
    T(200,26,'מתי מגיעים ל-3 טריליון?','sv-h')+
    `<line x1="40" y1="236" x2="360" y2="236" class="sv-base"/>`+
    `<g id="st-oom-bars">`+[2026,2027,2028,2029,2030].map((y,i)=>`<rect x="${52+i*62}" y="226" width="44" height="10" rx="3" class="sv-bar warm"/><text x="${74+i*62}" y="256" text-anchor="middle" class="sv-l">${y}</text><text x="${74+i*62}" y="220" text-anchor="middle" class="sv-l sm" data-v="1"></text>`).join('')+`</g>`+
    `<line id="st-oom-goal" x1="40" y1="60" x2="360" y2="60" class="sv-dash"/>${T(320,52,'3 טריליון','sv-l hot')}`+
    `<text id="st-oom-out" x="200" y="84" text-anchor="middle" class="sv-l"></text>`+
    `<text id="st-oom-dir" x="200" y="280" text-anchor="middle" class="sv-l dim"></text>`});
  // 6 · outside the bubble
  SC.push({n:'מחוץ לבועה', svg:()=>
    T(200,30,'הוצאה חודשית על AI לעובד','sv-h')+
    `<line x1="60" y1="220" x2="340" y2="220" class="sv-base"/>`+
    `<rect x="100" y="${220-150}" width="70" height="150" rx="5" class="sv-bar hot a-grow"${d(.3)}/><text x="135" y="62" text-anchor="middle" class="sv-v hot a-up"${d(.6)}>~$<tspan data-to="100">0</tspan></text>`+T(135,244,'חברה מגובת','sv-l')+T(135,260,'הון סיכון','sv-l')+
    `<rect x="230" y="${220-15}" width="70" height="15" rx="4" class="sv-bar cold a-grow"${d(.8)}/><text x="265" y="196" text-anchor="middle" class="sv-v cold a-up"${d(1)}>~$<tspan data-to="10">0</tspan></text>`+T(265,244,'חברה רגילה','sv-l')+
    T(200,282,'לפי נתוני Ramp, כפי שמובאים בדיווח','sv-l dim')});
  // 7 · upside-down software
  SC.push({n:'תוכנה הפוכה', svg:()=>
    T(200,26,'תוכנה רגילה מול מודל','sv-h')+
    T(110,56,'תוכנה רגילה','sv-l')+T(290,56,'מודל AI','sv-l hot')+`<line x1="200" y1="44" x2="200" y2="262" class="sv-base"/>`+
    [['מעבר לספק אחר','יקר וכואב','שורת קוד'],['אפקט רשת','חזק','כמעט אין'],['לקוח נוסף עולה','כמעט אפס','שאילתה על שבב']].map(([k,a,b],i)=>
      `<g class="a-up"${d(.4+i*.5)}>${T(200,90+i*64,k,'sv-l dim')}<rect x="50" y="${98+i*64}" width="120" height="30" rx="6" class="sv-pod"/>${T(110,118+i*64,a,'sv-l')}<rect x="230" y="${98+i*64}" width="120" height="30" rx="6" class="sv-calc"/>${T(290,118+i*64,b,'sv-l hot')}</g>`).join('')+
    T(200,284,'שולי רווח גולמי של 85% הם רק חצי מהסיפור','sv-l dim')});
  // 8 · a window of weeks
  SC.push({n:'חלון של שבועות', svg:()=>
    T(200,28,'כל מודל חי עד שהבא עוקף אותו','sv-h')+
    `<line x1="30" y1="200" x2="370" y2="200" class="sv-base"/>`+
    [0,1,2,3].map(i=>`<g class="a-in-l"${d(.3+i*.5)}><path d="M${40+i*80} 200 q30 -${90+i*14} 70 -${70+i*12} l10 ${70+i*12}" class="sv-rg"/>${T(70+i*80,224,'מודל '+(i+1),'sv-l')}</g>`).join('')+
    `<g class="a-pop"${d(2.4)}><rect x="96" y="236" width="208" height="30" rx="8" class="sv-giant"/>${T(200,256,'שבועות, לכל היותר חודשים','sv-l inv')}</g>`+
    T(200,284,'ובחלון הזה צריך להחזיר את עלות האימון','sv-l dim')});
  // 9 · midterm mayhem
  SC.push({n:'מהומת האמצע', svg:()=>
    T(200,28,'משאלי עם מקומיים על דאטה סנטרים','sv-h')+
    `<g>`+Array.from({length:41},(_,i)=>`<rect x="${40+(i%14)*23}" y="${56+Math.floor(i/14)*30}" width="17" height="22" rx="3" class="sv-co ${i===40?'cold':'hot'} a-pop"${d(.2+i*.03)}/>`).join('')+`</g>`+
    `<g class="a-up"${d(1.8)}><rect x="70" y="160" width="260" height="40" rx="8" class="sv-pod"/><text x="200" y="186" text-anchor="middle" class="sv-v hot"><tspan data-to="40">0</tspan> מתוך 41: להגביל</text></g>`+
    `<g class="a-up"${d(2.4)}>${T(200,230,'25.6 ג\'יגהוואט שעוד לא התחילו, ב-2028','sv-l')}${T(200,250,'כמעט חצי מכל הקיבולת של היום','sv-l hot')}</g>`+
    T(200,280,'לפי The Economist ו-SemiAnalysis','sv-l dim')});
  const EV=[
   [2025.2,'up','מרץ 2025','ההכנסות המשותפות של Anthropic, OpenAI ומפתחות קטנות חוצות 10 מיליארד דולר בשנה (בקירוב, לפי הדיווח).',5],
   [2026.05,'drop','תחילת 2026','ה-SaaSpocalypse: מניות תוכנה צונחות מחשש שכלי קוד ישכפלו כל מוצר. רובן התאוששו מאז.',6],
   [2026.32,'mem','אביב 2026','מחסור בזיכרון RAM מקפיץ את Samsung ו-SK Hynix. צמיחת ההכנסות התלת-חודשית: 80-90%.',4],
   [2026.42,'peak','מאי 2026','CoreWeave בשיא של השנה. מאז ירדה בשני שלישים.',2],
   [2026.72,'chip','ספטמבר 2026','OpenAI: הכנסה בקצב שנתי של 50 מיליארד דולר.',4],
   [2026.8,'ban','אוקטובר 2026','Anthropic: 81 מיליארד בקצב שנתי. הצמיחה התלת-חודשית: 12%. Goldman Sachs אוסרת כלי קוד על לא מהנדסים.',5],
   [2026.82,'doc','26 באוקטובר 2026','Anthropic מגישה בפומבי את מסמכי ההנפקה.',1],
   [2026.84,'vote','3 בנובמבר 2026','בחירות האמצע: 40 מתוך 41 משאלי עם מגבילים דאטה סנטרים. ג\'ינה הינוחוסה נבחרת למושלת טקסס.',9],
   [2026.86,'up','11 בנובמבר 2026','CoreWeave קופצת 25% אחרי דוח חזק.',2],
   [2026.89,'bell','נובמבר 2026','ההנפקה של Anthropic: היעד כ-1.5 טריליון דולר.',1],
   [2028.5,'pause','2028','25.6 ג\'יגהוואט של דאטה סנטרים שעוד לא התחילו, במדינות שבחרו מושלים בעד השהיה.',9],
   [2030,'target','2030','היעד: כ-3 טריליון דולר הכנסות, כדי שהבנייה תניב תשואה רגילה.',3]];
  const ICO={
   up:'<path d="M-10 8 L-2 0 L3 4 L10 -6" class="ti-line"/><path d="M4 -7 L10 -7 L10 -1" class="ti-line"/>',
   drop:'<path d="M-10 -6 L-2 2 L3 -2 L10 8" class="ti-line"/><circle cx="10" cy="8" r="3" class="ti-hot"/>',
   mem:'<rect x="-11" y="-6" width="22" height="12" rx="2" class="ti-doc"/>'+[-6,-1,4].map(x=>`<rect x="${x}" y="-3" width="3" height="6" class="ti-hot"/>`).join(''),
   peak:'<path d="M-11 9 L-3 -9 L3 1 L11 -5" class="ti-line"/><circle cx="-3" cy="-9" r="3" class="ti-hot"/>',
   chip:'<rect x="-8" y="-8" width="16" height="16" rx="2" class="ti-doc"/><rect x="-4" y="-4" width="8" height="8" class="ti-hot"/>',
   ban:'<circle r="10" class="ti-doc"/><line x1="-7" y1="7" x2="7" y2="-7" class="ti-crack"/>',
   doc:'<rect x="-9" y="-12" width="18" height="24" rx="2" class="ti-doc"/>'+[0,1,2,3].map(i=>`<line x1="-5" y1="${-7+i*5}" x2="5" y2="${-7+i*5}" class="ti-line"/>`).join(''),
   vote:'<rect x="-10" y="-2" width="20" height="13" rx="2" class="ti-doc"/><rect x="-5" y="-12" width="10" height="12" class="ti-doc"/><line x1="-6" y1="-2" x2="6" y2="-2" class="ti-line"/>',
   bell:'<path d="M-8 6 q0 -16 8 -16 q8 0 8 16z" class="ti-hot"/><line x1="-10" y1="7" x2="10" y2="7" class="ti-line"/>',
   pause:'<rect x="-8" y="-9" width="5" height="18" class="ti-hot"/><rect x="3" y="-9" width="5" height="18" class="ti-hot"/>',
   target:'<circle r="11" class="ti-doc"/><circle r="6" class="ti-doc"/><circle r="2.5" class="ti-hot"/>'};
  const QZ=[
   ['לפי הדיווח, כמה הכנסות צריך ה-AI ב-2030 כדי שהבנייה המתוכננת תניב תשואה רגילה?',['כ-200 מיליארד דולר, כמו היום','כ-3 טריליון דולר, כמעט עשירית מהשכר בעולם העשיר','כ-35 טריליון דולר'],1,'היום נכנסים כ-200 מיליארד. כדי להגיע ל-3 טריליון צריך יותר מסדר גודל אחד, תוך ארבע שנים בערך.'],
   ['למה מכירת מודלים שונה מתוכנה רגילה, לפי הדיווח?',['כי מודלים זולים יותר לפיתוח','כי מעבר בין ספקים טריוויאלי, ולכל שאילתה יש עלות אמיתית על שבב','כי אין בהם שולי רווח'],1,'בתוכנה רגילה המעבר יקר ולקוח נוסף כמעט לא עולה כלום. במודלים זה הפוך: שורת קוד מחליפה ספק, וכל שאילתה רצה בדאטה סנטר.'],
   ['מה קרה במשאלי העם המקומיים על דאטה סנטרים בבחירות האמצע?',['רובם אישרו בנייה','40 מתוך 41 בחרו להגביל דאטה סנטרים','הם בוטלו'],1,'ובטקסס, שבה כשליש מהבנייה, נבחרה מושלת שקראה להשהיה. הקרקע בתחתית המשפך זזה.']];
  // non-linear axis: 2025 is compressed, 2026 is stretched (most events), 2027-2030 compressed again
  const X=y=>y<2026?40+(y-2025)*160:(y<2026.75?200+(y-2026)/.75*320:(y<2027?520+(y-2026.75)/.25*360:880+(y-2027)/(2030.2-2027)*85));
  return {AV,CAST,WHO,SC,QZ,EV,ICO, interAt:4,
    castLabel:'שתי דמויות שילוו אתכם (בדויות, מבוססות על אירועים אמיתיים)',
    whoLabel:{jake:'ומה זה עושה לג\'ייק',rosa:'ומה זה עושה לרוזה',both:'שתי הדמויות'},
    bothKeys:['jake','rosa'],
    inter(sEls){
  (function(){ const sc=sEls[4]; const box=H('div','st-rg');
    const mk=(lab,id,v,min,max,step)=>{ const l=H('label','st-rg-l'); const s=H('span','',lab); const o=H('b'); const r=H('input'); r.type='range'; r.min=min; r.max=max; r.step=step; r.value=v; r.id=id; r.setAttribute('aria-label',lab); l.append(s,o,r); box.append(l); return [r,o]; };
    const [gi,go]=mk('צמיחה שנתית של ההכנסות','st-oom-g',80,10,200,5), [si,so]=mk('נקודת פתיחה ב-2026 (מיליארדי דולרים)','st-oom-s',200,100,300,10);
    box.hidden=true; document.getElementById('st-stage').insertBefore(box,document.querySelector('.st-sbar')); window.__stRG=box;
    const bars=[...sc.querySelectorAll('#st-oom-bars rect')], vals=[...sc.querySelectorAll('#st-oom-bars text[data-v]')], out=sc.querySelector('#st-oom-out'), dir=sc.querySelector('#st-oom-dir');
    const fmt=v=>v>=1000?(v/1000).toLocaleString('he-IL',{maximumFractionDigits:1})+' טריליון':Math.round(v)+' מיליארד';
    function draw(){ const g=+gi.value/100, s0=+si.value; go.textContent=gi.value+'%'; so.textContent=s0;
      let hit=null; bars.forEach((b,i)=>{ const v=s0*Math.pow(1+g,i); const h=Math.max(6,Math.min(166,v/3000*166)); b.setAttribute('y',236-h); b.setAttribute('height',h); b.classList.toggle('hot',v>=3000); vals[i].textContent=fmt(v); vals[i].setAttribute('y',230-h); if(v>=3000&&hit==null) hit=2026+i; });
      out.textContent=hit?('מגיעים ל-3 טריליון ב-'+hit):'עד 2030 לא מגיעים ל-3 טריליון';
      const need=Math.pow(3000/s0,1/4)-1; dir.textContent='כדי להגיע בדיוק ב-2030 צריך צמיחה של כ-'+Math.round(need*100)+'% בכל שנה, ארבע שנים ברצף'; }
    gi.addEventListener('input',draw); si.addEventListener('input',draw); draw(); })();
    },
    tlSvg(){
    let s=`<svg viewBox="0 0 1000 340" class="tl-svg" role="img" aria-label="ציר זמן מ-2025 עד 2030: ההכנסות, השוק, הבחירות והיעד">`;
    s+=`<rect x="${X(2025)}" y="40" width="${X(2026)-X(2025)}" height="176" class="tl-band"/><text x="${(X(2025)+X(2026))/2}" y="58" text-anchor="middle" class="tl-band-t">הקפיצה הקודמת</text>`;
    s+=`<rect x="${X(2026)}" y="40" width="${X(2026.75)-X(2026)}" height="176" class="tl-band" style="opacity:.75"/><text x="${(X(2026)+X(2026.75))/2}" y="58" text-anchor="middle" class="tl-band-t">2026</text>`;
    s+=`<rect x="${X(2026.75)}" y="40" width="${X(2027)-X(2026.75)}" height="176" class="tl-band" style="opacity:.5"/><text x="${(X(2026.75)+X(2027))/2}" y="58" text-anchor="middle" class="tl-band-t">סתיו 2026, בזכוכית מגדלת</text>`;
    s+=`<rect x="${X(2027)}" y="40" width="${X(2030.2)-X(2027)}" height="176" class="tl-future"/><text x="${(X(2027)+X(2030.2))/2}" y="58" text-anchor="middle" class="tl-band-t dim">הבאה?</text>`;
    [2025,2026,2027,2030].forEach(y=>{ s+=`<text x="${X(y)}" y="234" text-anchor="middle" class="tl-ax">${y}</text>`; });
    [['אפר',2026.25],['יול',2026.5],['אוק',2026.75],['נוב',2026.833],['דצמ',2026.917]].forEach(([m,y])=>{ s+=`<text x="${X(y)+4}" y="206" text-anchor="start" class="tl-cap">${m}</text>`; });
    // revenue line: ~10bn (Mar 2025) -> ~130bn (now) -> needed ~3,000bn (2030), drawn on a log scale (illustration)
    const Yv=v=>200-Math.log10(v/5)/Math.log10(3000/5)*120;
    s+=`<polyline points="${X(2025.2)},${Yv(10)} ${X(2026.32)},${Yv(60)} ${X(2026.84)},${Yv(130)}" class="tl-line" style="fill:none"/>`;
    s+=`<polyline points="${X(2026.84)},${Yv(130)} ${X(2030)},${Yv(3000)}" class="tl-line" style="fill:none;stroke-dasharray:6 6;opacity:.7"/>`;
    s+=`<text x="${X(2026.4)}" y="${Yv(60)-14}" class="tl-cap" text-anchor="start">ההכנסות (סקאלה לוגריתמית, המחשה)</text>`;
    const LV=[262,262,290,318,262,290,318,262,290,318,276,300]; EV.forEach(([y,ic,lab],i)=>{ const x=X(y), yy=LV[i];
      s+=`<g class="tl-ev" data-i="${i}" tabindex="0" role="button" aria-label="${lab}: ${EV[i][3]}" style="--i:${i}"><line x1="${x}" y1="216" x2="${x}" y2="${yy-14}" class="tl-stem"/><g transform="translate(${x} ${yy})"><circle r="13" class="tl-ic-bg"/>${ICO[ic]}</g></g>`; });
    s+='</svg>';
      return s; },
    qzFin:'<p>ענית נכון על <b></b>. שימו לב לחוט שמחבר את שלוש התשובות: הכסף צריך לגדול פי עשרה ויותר, הלקוחות יכולים לעבור בשורת קוד, והקרקע מתחת לבנייה זזה. ואף אחד מבחוץ לא רואה בזמן אמת אם הזרם בראש המשפך מתחזק או נחלש. בשלב הבא נפרוש את זה על הלוח, עם הממצאים. מוכנים?</p><a class="qz-next" href="problems.html">לשלב 02: הבעיות ←</a>'};
};
