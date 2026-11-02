/* Case 03 · stage 01 story content (quiet-deletion). Engine: story.js. Same contract as Case 02:
   AV, CAST, castLabel, WHO, whoLabel, bothKeys, SC (scenes), interAt (index of the interactive scene), inter(sEls), tlSvg(), EV, ICO, QZ, qzFin. */
window.STORY=window.STORY||{};
window.STORY['quiet-deletion']=function(api){
  const {H,T,d,coin,NS,reduce}=api;
  const AV={
   priya:`<svg viewBox="0 0 60 60" class="st-av-svg" aria-hidden="true"><circle cx="30" cy="30" r="28" class="av-bg"/><path d="M15 30 q0 -20 15 -20 q15 0 15 20 q-2 10 -4 14 l-3 -16 q-8 -4 -16 0 l-3 16 q-4 -6 -4 -14z" class="av-hair"/><circle cx="30" cy="30" r="12" class="av-face"/><circle cx="26" cy="29" r="1.6" class="av-eye"/><circle cx="34" cy="29" r="1.6" class="av-eye"/><path d="M26 35 q4 3 8 0" class="av-mouth"/><circle cx="30" cy="22" r="1.4" class="av-eye"/><path d="M12 58 q4 -14 18 -14 q14 0 18 14z" class="av-body"/><path d="M27 48 h6 M30 45 v6" class="av-mouth"/></svg>`,
   arjun:`<svg viewBox="0 0 60 60" class="st-av-svg" aria-hidden="true"><circle cx="30" cy="30" r="28" class="av-bg"/><path d="M17 26 q1 -14 13 -14 q12 0 13 14 q-5 -7 -13 -7 q-8 0 -13 7z" class="av-hair"/><circle cx="30" cy="30" r="12" class="av-face"/><circle cx="26" cy="29" r="1.6" class="av-eye"/><circle cx="34" cy="29" r="1.6" class="av-eye"/><path d="M26 36 h8" class="av-mouth"/><path d="M12 58 q4 -14 18 -14 q14 0 18 14z" class="av-body"/><rect x="21" y="46" width="18" height="11" rx="1.5" class="av-doc"/><line x1="30" y1="46" x2="30" y2="57" class="av-mouth"/></svg>`
  };
  const CAST=[
   ['priya','פריה ורמה, 31, אחות מלקנאו','אחות במחלקה פנימית. עברה לעיר מכפר במחוז גונדה לפני ארבע שנים, ההורים נשארו בכפר. בסתיו 2026 היא מגלה שהשם שלה נעלם מרשימת הבוחרים, תחת סיבה אחת: "נעדר, עבר או אחר".'],
   ['arjun','ארג\'ון סינג, 21, מפטנה','בן לנהג ריקשה. התכונן שנתיים לבחינת הכניסה לרפואה בספרייה הציבורית. תשעה ימים אחרי הבחינה הוא שומע שהיא בוטלה, כי השאלון דלף.']];
  const WHO={
   1:['arjun','"יצאתי לרחוב בגלל בחינה אחת. אבל ברחוב הבנתי שכולם שם בגלל אותו דבר: מערכת שמחליטה עלינו, ואף אחד לא מסביר לנו איך."'],
   2:['priya','"נולדתי שנה אחרי רעידת האדמה. כל החיים שמעתי שהמנהיג הזה יוצא חזק מכל משבר."'],
   3:['priya','"בכפר של ההורים שלי, כל החלטה מגיעה מלמעלה. גם הטובות. אף פעם לא ברור מי החליט, ואיפה אפשר לשאול."'],
   4:['priya','"בגונדה יש היום חשמל כמעט כל היום, ואמא שלי מקבלת את הקצבה ישר לחשבון בבנק. זה אמיתי. הבנייה הזו אמיתית."'],
   5:['arjun','"אח שלי גדול ממני בחמש שנים. יש לו תואר בהנדסה, והוא עובד במשמרות במחסן. לכן אני בחרתי ברפואה: שם לפחות יש משרה בסוף."'],
   6:['priya','"במחלקה אני מטפלת בכולם, בלי לשאול מי הם. בחוץ, השאלה הזו נשאלת יותר ויותר."'],
   7:['arjun','"שנתיים ישבתי בספרייה עד שסגרו אותה בלילה. ואז, תשעה ימים אחרי הבחינה, בוטל הכול. מישהו קנה את השאלון. ואני? נבחן שוב, מאפס."'],
   8:['priya','"פתחתי את הטיוטה בטלפון, וחיפשתי את עצמי בכפר וגם בלקנאו. לא הייתי באף מקום. בשורה של הסיבה היה כתוב רק: נעדר, עבר או אחר. איזה מהשלושה? ומי קבע?"'],
   9:['both','פריה וארג\'ון לא מכירים זה את זה. היא נמחקה מרשימה, הוא נשאר בלי בחינה. מה שמשותף להם: מערכת גדולה החליטה עליהם, ואף אחד לא הסביר להם מה קרה ולמה. את שניהם תפגשו שוב בכל שלב.']};
  const SC=[];
  // 1 · a celebration that did not go to plan
  SC.push({n:'חגיגה שלא הלכה לפי התוכנית', svg:()=>
    T(200,30,'אוקטובר 2026: חודש חגיגות, חודש מחאה','sv-h')+
    `<g class="a-in-r"${d(.1)}><rect x="30" y="56" width="140" height="150" rx="8" class="sv-pod"/>${T(100,84,'11 עמודים','sv-l')}${T(100,102,'של שבחים','sv-l dim')}`+
    [0,1,2,3,4].map(i=>`<line x1="48" y1="${122+i*16}" x2="${150-(i%2)*24}" y2="${122+i*16}" class="sv-dc-l"/>`).join('')+`</g>`+
    `<g class="a-in-l"${d(.7)}>`+[0,1,2,3,4,5].map(i=>`<g transform="translate(${236+(i%3)*44} ${92+Math.floor(i/3)*64})"><circle r="11" class="sv-co"/><rect x="-11" y="12" width="22" height="26" rx="6" class="sv-co"/></g>`).join('')+
    `<rect x="230" y="60" width="140" height="20" rx="4" class="sv-giant"/>${T(300,74,'מחאה','sv-l inv')}</g>`+
    `<g class="a-pop"${d(1.6)}>${T(200,236,'האינטרנט הסלולרי נותק, רכבות בוטלו,','sv-l')}${T(200,254,'אלפים נעצרו','sv-l hot')}</g>`+
    T(200,278,'הכול צולם, והכול הופץ לכל העולם','sv-l dim')});
  // 2 · earthquake, then fire
  SC.push({n:'רעידה, ואז אש', svg:()=>
    T(200,30,'שתי שנים ראשונות, שני משברים','sv-h')+
    `<g class="a-up"${d(.2)}><path d="M30 150 L60 150 L70 120 L82 182 L94 108 L106 168 L116 150 L170 150" class="sv-rg"/>${T(100,206,'ינואר 2001','sv-l')}${T(100,224,'רעידת אדמה בקאץ\'','sv-l dim')}`+
    `<text x="100" y="96" text-anchor="middle" class="sv-v hot">+<tspan data-to="20000">0</tspan></text>${T(100,252,'הרוגים','sv-l sm')}</g>`+
    `<g class="a-up"${d(1.1)}><rect x="236" y="120" width="130" height="40" rx="6" class="sv-calc"/>`+[0,1,2,3].map(i=>`<rect x="${244+i*30}" y="128" width="20" height="14" rx="2" class="sv-co"/>`).join('')+
    `<path d="M250 118 q8 -22 18 -8 q6 -20 18 -4 q8 -18 18 0" class="sv-arrow hot a-blink"${d(1.6)}/>${T(300,206,'2002','sv-l')}${T(300,224,'רכבת עולי רגל, ואחריה מהומות','sv-l dim')}`+
    `<text x="300" y="96" text-anchor="middle" class="sv-v hot">+<tspan data-to="1000">0</tspan></text>${T(300,252,'הרוגים, רובם מוסלמים','sv-l sm')}</g>`+
    `<g class="a-pop"${d(2.2)}>${T(200,280,'ומאז: חמש בחירות ברציפות','sv-h sm')}</g>`});
  // 3 · one office
  SC.push({n:'משרד אחד', svg:()=>{ const pts=[]; for(let i=0;i<34;i++){ const a=i*2.4, r=60+((i*37)%70); pts.push([200+r*Math.cos(a),165+r*Math.sin(a)*.7]); }
    return T(200,30,'1.45 מיליארד אנשים, כמה עשרות מחליטים','sv-h')+
    pts.map(([x,y],i)=>`<line x1="200" y1="165" x2="${x.toFixed(0)}" y2="${y.toFixed(0)}" class="sv-dash a-draw"${d(.3+i*.03)}/><circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="4" class="sv-co a-pop"${d(.3+i*.03)}/>`).join('')+
    `<g class="a-pop"${d(.1)}><circle cx="200" cy="165" r="30" class="sv-center"/>${T(200,161,'משרד','sv-l inv')}${T(200,177,'ראש הממשלה','sv-l inv')}</g>`+
    `<g class="a-up"${d(1.6)}>${T(200,272,'יותר מ-70% מהאוכלוסייה במדינות שה-BJP שולט בהן','sv-l')}</g>`; }});
  // 4 · the build
  SC.push({n:'הבנייה', svg:()=>
    T(200,30,'מה נבנה: שלושה מספרים','sv-h')+
    `<line x1="40" y1="220" x2="360" y2="220" class="sv-base"/>`+
    `<rect x="60" y="${220-12.5*6}" width="60" height="${12.5*6}" rx="5" class="sv-bar cold a-grow"${d(.3)}/>`+
    `<rect x="130" y="${220-22.6*6}" width="60" height="${22.6*6}" rx="5" class="sv-bar warm a-grow"${d(.7)}/>`+
    `<text x="90" y="${210-12.5*6}" text-anchor="middle" class="sv-v cold a-up"${d(.5)}><tspan data-to="12.5" data-dec="1">0</tspan></text>`+
    `<text x="160" y="${210-22.6*6}" text-anchor="middle" class="sv-v warm a-up"${d(.9)}><tspan data-to="22.6" data-dec="1">0</tspan></text>`+
    T(125,244,'שעות חשמל ביום בכפר','sv-l')+T(125,262,'2014 מול היום','sv-l dim')+
    `<g class="a-up"${d(1.4)}><rect x="236" y="92" width="120" height="44" rx="6" class="sv-pod"/>${T(296,112,'17 מסים','sv-l')}${T(296,128,'במדינות','sv-l dim')}`+
    `<path d="M296 140 v18" class="sv-arrow"/><rect x="256" y="162" width="80" height="34" rx="6" class="sv-giant"/>${T(296,184,'מס אחד','sv-l inv')}</g>`+
    `<g class="a-up"${d(2)}>${T(296,232,'כבישים: +60%','sv-l hot')}${T(296,250,'צמיחה: כ-6% בשנה','sv-l')}</g>`});
  // 5 · who gained
  SC.push({n:'מי הרוויח', svg:()=>
    T(200,30,'שכר מול כלכלה, 2017=100 (בקירוב)','sv-h')+
    `<line x1="40" y1="210" x2="360" y2="210" class="sv-base"/>`+
    `<line x1="40" y1="160" x2="360" y2="160" class="sv-dash"/>${T(368,164,'100','sv-l sm','start')}`+
    `<polyline points="40,160 120,150 200,142 280,124 360,108" class="sv-rg a-draw"${d(.2)}/>`+
    `<polyline points="40,160 120,158 200,162 280,158 360,156" class="sv-rg cold a-draw"${d(.6)} style="stroke:var(--ink-3,#8a8a8a)"/>`+
    `<polyline points="40,160 120,164 200,170 280,172 360,170" class="sv-rg a-draw"${d(1)} style="stroke:var(--risk,#c0392b)"/>`+
    T(250,104,'תמ"ג לנפש','sv-l')+T(250,186,'שכר שכירים: -5%','sv-l hot')+T(110,140,'שכר מפעל','sv-l dim')+
    `<g class="a-pop"${d(1.8)}><rect x="40" y="226" width="320" height="50" rx="8" class="sv-pod"/>${T(200,246,'אדאני: מ-7 מיליארד דולר ב-2014','sv-l')}${T(200,264,'ליותר מ-100 מיליארד','sv-l hot')}</g>`});
  // 6 · the society
  SC.push({n:'רוב וכל השאר', svg:()=>
    T(200,30,'בערך אחד מכל שבעה: 200 מיליון מוסלמים','sv-h')+
    Array.from({length:7},(_,i)=>`<g class="a-up"${d(.2+i*.15)}><circle cx="${70+i*44}" cy="110" r="14" class="sv-co ${i===6?'hot':''}"/><rect x="${56+i*44}" y="128" width="28" height="34" rx="8" class="sv-co ${i===6?'hot':''}"/></g>`).join('')+
    `<line x1="40" y1="200" x2="360" y2="200" class="sv-base"/>`+
    `<g class="a-up"${d(1.4)}><polyline points="50,186 140,192 230,196 340,198" class="sv-rg cold"/>${T(110,220,'אלימות בין-עדתית רחבה: יורדת','sv-l')}</g>`+
    `<g class="a-up"${d(1.9)}><polyline points="50,198 140,194 230,186 340,174" class="sv-rg" style="stroke:var(--risk,#c0392b)"/>${T(290,244,'התקפות ממוקדות: עולות','sv-l hot')}</g>`+
    T(200,276,'(המחשה של כיוון המגמות, לא נתונים מדויקים)','sv-l dim')});
  // 7 · the leaked exam
  SC.push({n:'השאלון שדלף', svg:()=>
    T(200,30,'בחינת הכניסה לרפואה, מאי 2026','sv-h')+
    `<g class="a-up"${d(.2)}>`+Array.from({length:40},(_,i)=>`<circle cx="${40+(i%10)*14}" cy="${70+Math.floor(i/10)*14}" r="5" class="sv-co"/>`).join('')+`</g>`+
    `<g class="a-pop"${d(.8)}><circle cx="40" cy="70" r="6" class="sv-co hot"/><circle cx="54" cy="70" r="6" class="sv-co hot"/><circle cx="68" cy="70" r="6" class="sv-co hot"/></g>`+
    T(103,142,'יותר מ-2 מיליון נבחנים','sv-l')+T(103,160,'פחות מ-130 אלף מקומות','sv-l hot')+
    `<g class="a-in-l"${d(1.2)}><rect x="250" y="66" width="104" height="70" rx="6" class="sv-calc"/><path d="M250 66 L302 104 L354 66" class="sv-dash"/>${T(302,156,'שאלון סגור','sv-l')}</g>`+
    `<g class="a-in-l"${d(1.8)}><path d="M240 130 q-30 40 -110 70" class="sv-arrow hot"/>${T(196,206,'דליפה','sv-l hot')}</g>`+
    `<g class="a-pop"${d(2.4)}><rect x="96" y="222" width="208" height="46" rx="8" class="sv-giant"/>${T(200,242,'3.5: נבחנים · 12.5: מבוטל','sv-l inv')}${T(200,260,'21.6: שוב מההתחלה','sv-l inv')}</g>`});
  // 8 · 130 million names (interactive)
  SC.push({n:'130 מיליון שמות', inter:true, svg:()=>
    T(200,26,'כמה זמן ייקח לשמוע כל ערעור?','sv-h')+
    `<rect x="30" y="44" width="340" height="22" rx="6" class="sv-pod"/>`+
    `<rect id="st-ap-done" x="30" y="44" width="0" height="22" rx="6" class="sv-bar cold"/>`+
    T(200,60,'37 לאך ערעורים ממתינים בבנגל (3.7 מיליון)','sv-l sm')+
    `<line x1="40" y1="190" x2="360" y2="190" class="sv-base"/>`+
    `<line id="st-ap-elec" x1="120" y1="84" x2="120" y2="196" class="sv-dash"/>`+
    `<text id="st-ap-elec-t" x="116" y="98" text-anchor="start" class="sv-l sm hot">בחירות</text>`+
    `<rect id="st-ap-bar" x="40" y="150" width="0" height="34" rx="5" class="sv-bar warm"/>`+
    `<text id="st-ap-out" x="200" y="226" text-anchor="middle" class="sv-v md"></text>`+
    `<text id="st-ap-dir" x="200" y="252" text-anchor="middle" class="sv-l"></text>`+
    T(200,278,'19 בתי דין · חשבון פשוט, בקירוב','sv-l dim')});
  // 9 · the picture
  SC.push({n:'התמונה', svg:()=>
    `<g class="a-conv1"><rect x="44" y="46" width="52" height="60" rx="6" class="sv-calc"/>${T(70,82,'?','sv-qm')}${T(70,122,'רשימה שמשתנה בשקט','sv-l')}</g>`+
    `<g class="a-conv2"><rect x="302" y="46" width="56" height="60" rx="6" class="sv-pod"/>${T(330,82,'⌛','sv-l')}${T(330,122,'ערעור שמאחר','sv-l')}</g>`+
    `<g class="a-conv3"><rect x="44" y="196" width="52" height="52" rx="6" class="sv-calc"/><path d="M48 200 L70 222 L92 200" class="sv-dash"/>${T(70,268,'שאלון שדלף','sv-l')}</g>`+
    `<g class="a-conv4"><rect x="306" y="196" width="48" height="52" rx="6" class="sv-pod"/>${T(330,228,'🎓','sv-l')}${T(330,268,'תואר בלי משרה','sv-l')}</g>`+
    `<g class="a-pop"${d(1.6)}><circle cx="200" cy="150" r="46" class="sv-center"/>${T(200,145,'מה שבור','sv-h inv')}${T(200,166,'כאן?','sv-h inv')}</g>`});

  const Y0=2000, Y1=2028, X=y=>40+(y-Y0)/(Y1-Y0)*920;
  const EV=[
   [2001.05,'quake','ינואר 2001','רעידת אדמה בקאץ\', גוג\'אראט. יותר מ-20,000 הרוגים, והשר הראשי מוחלף במודי.',2],
   [2002.2,'fire','2002','רכבת עולי רגל נשרפת, ומהומות גובות יותר מ-1,000 חיים.',2],
   [2014.4,'flag','מאי 2014','מודי נבחר לראשות הממשלה.',3],
   [2017.5,'tax','יולי 2017','מס אחיד על סחורות ושירותים מחליף 17 מסים מדינתיים.',4],
   [2024.4,'vote','2024','בחירות ארציות: ה-BJP מאבד רוב ומקים קואליציה.',5],
   [2026.34,'exam','מאי 2026','בחינת הכניסה לרפואה מבוטלת אחרי דליפה.',7],
   [2026.6,'list','2026','הרוויזיה המיוחדת מוציאה יותר מ-130 מיליון שמות מטיוטות הרשימות.',8],
   [2026.78,'crowd','אוקטובר 2026','25 שנה בתפקיד ציבורי, וחודש של מחאה.',1],
   [2027.3,'urn','אביב 2027','בחירות במדינות, בהן אוטר פרדש, הגדולה מכולן.',9]];
  const ICO={
   quake:'<path d="M-12 0 L-6 0 L-3 -8 L1 8 L4 -4 L7 0 L12 0" class="ti-crack"/>',
   fire:'<path d="M0 -12 q8 8 4 14 q6 -2 4 -8 q6 8 0 14 h-16 q-6 -6 0 -14 q-2 6 4 8 q-4 -6 4 -14z" class="ti-hot"/>',
   flag:'<line x1="-8" y1="-12" x2="-8" y2="12" class="ti-line"/><rect x="-8" y="-12" width="18" height="12" class="ti-hot"/>',
   tax:'<rect x="-10" y="-11" width="20" height="22" rx="3" class="ti-doc"/><text y="5" text-anchor="middle" class="ti-txt">%</text>',
   vote:'<rect x="-10" y="-2" width="20" height="13" rx="2" class="ti-doc"/><rect x="-5" y="-12" width="10" height="12" class="ti-doc"/><line x1="-6" y1="-2" x2="6" y2="-2" class="ti-line"/>',
   exam:'<rect x="-9" y="-12" width="18" height="24" rx="2" class="ti-doc"/><path d="M-9 -12 L9 12 M9 -12 L-9 12" class="ti-crack"/>',
   list:'<rect x="-9" y="-12" width="18" height="24" rx="2" class="ti-doc"/>'+[0,1,2,3].map(i=>`<line x1="-5" y1="${-7+i*5}" x2="5" y2="${-7+i*5}" class="ti-line"/>`).join('')+'<line x1="-6" y1="-2" x2="6" y2="-2" class="ti-crack"/>',
   crowd:[-7,0,7].map(x=>`<circle cx="${x}" cy="-4" r="3.5" class="ti-doc"/><rect x="${x-3.5}" y="0" width="7" height="9" rx="3" class="ti-doc"/>`).join(''),
   urn:'<rect x="-10" y="-6" width="20" height="16" rx="2" class="ti-doc"/><rect x="-6" y="-12" width="12" height="3" class="ti-hot"/>'};
  const QZ=[
   ['הרוויזיה של 2026 הוציאה יותר מ-130 מיליון שמות מהטיוטות. לפי הדיווח, מה הבעיה העיקרית בה?',['עצם הרוויזיה, שלא הייתה נחוצה','הדרך: מהירה, אטומה ומרכזית, בלי שאפשר לדעת מי הוסר ולמה','שהיא הטתה את תוצאות הבחירות'],1,'רוויזיה הייתה מתבקשת אחרי יותר משני עשורים, ואין ראיה שהטתה בחירות. הבעיה היא שאי אפשר לראות מה קרה לכל שם ולמה. זה מה שקרה לפריה.'],
   ['מה מראה העובדה שרוב הערעורים שהוכרעו הצליחו?',['שהערעורים היו מיותרים','שהרבה מחיקות היו שגויות, ושהתיקון מגיע רק אם מספיקים לערער בזמן','שבתי הדין מקלים מדי'],1,'אם רוב הערעורים מתקבלים, הרבה מחיקות היו טעות. והתיקון תלוי בזמן: ערעור שמגיע אחרי הבחירות לא מחזיר את הקול.'],
   ['למה הבחינה של ארג\'ון בוטלה?',['בגלל מחאה ברחוב','השאלון דלף לפני הבחינה','בגלל תקלה במחשבים'],1,'השאלון דלף, והבחינה בוטלה תשעה ימים אחרי שנערכה. מכאן התחילה המחאה של אוקטובר.']];
  return {AV,CAST,WHO,SC,QZ,EV,ICO, interAt:7,
    castLabel:'שתי דמויות שילוו אתכם (בדויות, מבוססות על אירועים אמיתיים)',
    whoLabel:{priya:'ומה זה עושה לפריה',arjun:'ומה זה עושה לארג\'ון',both:'שתי הדמויות'},
    bothKeys:['priya','arjun'],
    inter(sEls){
  (function(){ const sc=sEls[7]; const box=H('div','st-rg');
    const mk=(lab,id,v,min,max,step)=>{ const l=H('label','st-rg-l'); const s=H('span','',lab); const o=H('b'); const r=H('input'); r.type='range'; r.min=min; r.max=max; r.step=step; r.value=v; r.id=id; r.setAttribute('aria-label',lab); l.append(s,o,r); box.append(l); return [r,o]; };
    const [ri,ro]=mk('ערעורים שבית דין אחד שומע ביום','st-ap-r',300,50,1500,50), [ei,eo]=mk('ימים עד הבחירות','st-ap-e',150,30,400,10);
    box.hidden=true; document.getElementById('st-stage').insertBefore(box,document.querySelector('.st-sbar')); window.__stRG=box;
    const bar=sc.querySelector('#st-ap-bar'), done=sc.querySelector('#st-ap-done'), el=sc.querySelector('#st-ap-elec'), elt=sc.querySelector('#st-ap-elec-t'), out=sc.querySelector('#st-ap-out'), dir=sc.querySelector('#st-ap-dir');
    const N=3700000, TRIB=19, MAXD=1400, xd=v=>40+Math.min(v,MAXD)/MAXD*320;
    function draw(){ const r=+ri.value, e=+ei.value; ro.textContent=r.toLocaleString('he-IL'); eo.textContent=e;
      const days=Math.ceil(N/(TRIB*r)); bar.setAttribute('width',(xd(days)-40).toFixed(0)); el.setAttribute('x1',xd(e)); el.setAttribute('x2',xd(e)); elt.setAttribute('x',xd(e)-4);
      const share=Math.min(1,e*TRIB*r/N); done.setAttribute('width',(340*share).toFixed(0));
      out.textContent='כל התור נשמע אחרי '+days.toLocaleString('he-IL')+' ימים';
      dir.textContent=days>e?'עד הבחירות יישמעו רק '+Math.round(share*100)+'% מהערעורים':'התור נגמר לפני הבחירות';
      bar.classList.toggle('hot',days>e); }
    ri.addEventListener('input',draw); ei.addEventListener('input',draw); draw(); })();
    },
    tlSvg(){
    let s=`<svg viewBox="0 0 1000 326" class="tl-svg" role="img" aria-label="ציר זמן מ-2000 עד 2027: 25 שנה של מודי בתפקיד ציבורי ואירועי הסיפור">`;
    s+=`<rect x="${X(2001.8)}" y="40" width="${X(2014.4)-X(2001.8)}" height="176" class="tl-band"/><text x="${(X(2001.8)+X(2014.4))/2}" y="58" text-anchor="middle" class="tl-band-t">שר ראשי בגוג'אראט</text>`;
    s+=`<rect x="${X(2014.4)}" y="40" width="${X(2026.82)-X(2014.4)}" height="176" class="tl-band" style="opacity:.55"/><text x="${(X(2014.4)+X(2026.82))/2}" y="58" text-anchor="middle" class="tl-band-t">ראש הממשלה</text>`;
    s+=`<rect x="${X(2026.82)}" y="40" width="${X(Y1)-X(2026.82)}" height="176" class="tl-future"/><text x="${(X(2026.82)+X(Y1))/2+8}" y="76" text-anchor="middle" class="tl-band-t dim">הבא</text>`;
    for(let y=Y0;y<=2026;y+=2) s+=`<text x="${X(y)}" y="234" text-anchor="middle" class="tl-ax">${y}</text>`;
    const W=[[2002,1],[2007,2],[2012,3],[2014.4,4],[2019.4,5],[2024.4,6]];
    W.forEach(([y,n])=>{ s+=`<line x1="${X(y)}" x2="${X(y)}" y1="200" y2="${200-n*20}" class="tl-line"/><circle cx="${X(y)}" cy="${200-n*20}" r="5" class="tl-now"/>`; });
    s+=`<text x="${X(2003)}" y="${78}" class="tl-cap" text-anchor="start">כל עמוד: עוד ניצחון בבחירות (שלוש בגוג'אראט, שלוש ארציות)</text>`;
    const LV=[262,288,262,286,262,288,262,306,280]; EV.forEach(([y,ic,lab],i)=>{ const x=X(y), yy=LV[i];
      s+=`<g class="tl-ev" data-i="${i}" tabindex="0" role="button" aria-label="${lab}: ${EV[i][3]}" style="--i:${i}"><line x1="${x}" y1="216" x2="${x}" y2="${yy-14}" class="tl-stem"/><g transform="translate(${x} ${yy})"><circle r="15" class="tl-ic-bg"/>${ICO[ic]}</g></g>`; });
    s+='</svg>';
      return s; },
    qzFin:'<p>ענית נכון על <b></b>. שימו לב: התשובות מצביעות על אותו דבר. מערכות שמחליטות על מיליוני אנשים, בלי שאדם אחד יכול לראות מה קרה אצלו. בשלב הבא נפרוש את זה על הלוח, עם הממצאים. מוכנים?</p><a class="qz-next" href="problems.html">לשלב 02: הבעיות ←</a>'};
};
