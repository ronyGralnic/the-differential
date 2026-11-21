/* Case 06 · stage 01 story content (who-answers). Engine: story.js. Same contract as Case 03/04:
   AV, CAST, castLabel, WHO, whoLabel, bothKeys, SC (scenes), interAt (index of the interactive scene), inter(sEls), tlSvg(), EV, ICO, QZ, qzFin.
   Timeline: a broken axis (1930-2010 compressed, 2012-2028 wide) so the recent events never crowd. */
window.STORY=window.STORY||{};
window.STORY['who-answers']=function(api){
  const {H,T,d}=api;
  const AV={
   ruth:`<svg viewBox="0 0 60 60" class="st-av-svg" aria-hidden="true"><circle cx="30" cy="30" r="28" class="av-bg"/><path d="M15 34 q-2 -24 15 -24 q17 0 15 24 q-2 -14 -15 -14 q-13 0 -15 14z" class="av-hair" style="fill:#5b3a2a"/><circle cx="30" cy="30" r="12" class="av-face"/><circle cx="25.5" cy="29" r="4" class="av-glass"/><circle cx="34.5" cy="29" r="4" class="av-glass"/><circle cx="25.5" cy="29" r="1.3" class="av-eye"/><circle cx="34.5" cy="29" r="1.3" class="av-eye"/><path d="M26 36 q4 2 8 0" class="av-mouth"/><path d="M12 58 q4 -14 18 -14 q14 0 18 14z" class="av-body"/><rect x="36" y="44" width="12" height="12" rx="1" class="av-doc"/><path d="M38 53 l2 -4 l2 2 l3 -5" class="av-mouth"/></svg>`,
   darnell:`<svg viewBox="0 0 60 60" class="st-av-svg" aria-hidden="true"><circle cx="30" cy="30" r="28" class="av-bg"/><path d="M18 26 q2 -12 12 -12 q10 0 12 12 q-5 -4 -12 -4 q-7 0 -12 4z" class="av-hair" style="fill:#2a1d17"/><circle cx="30" cy="30" r="12" class="av-face" style="fill:#8a5a3c"/><circle cx="26" cy="29" r="1.6" class="av-eye"/><circle cx="34" cy="29" r="1.6" class="av-eye"/><path d="M26 36 h8" class="av-mouth"/><path d="M24 40 q6 3 12 0" class="av-mouth" style="stroke:#3b2a20"/><path d="M12 58 q4 -14 18 -14 q14 0 18 14z" class="av-body" style="fill:#d4a72c"/><rect x="40" y="8" width="10" height="16" rx="2" class="av-doc"/><path d="M41 10 L49 22" class="av-mouth" style="stroke:#c0392b"/></svg>`,
   camila:`<svg viewBox="0 0 60 60" class="st-av-svg" aria-hidden="true"><circle cx="30" cy="30" r="28" class="av-bg"/><path d="M14 40 q-3 -30 16 -30 q19 0 16 30 q-3 -18 -16 -18 q-13 0 -16 18z" class="av-hair" style="fill:#2e1a12"/><circle cx="30" cy="30" r="12" class="av-face" style="fill:#d9a87e"/><circle cx="26" cy="29" r="1.6" class="av-eye"/><circle cx="34" cy="29" r="1.6" class="av-eye"/><path d="M26 35 q4 3 8 0" class="av-mouth"/><path d="M12 58 q4 -14 18 -14 q14 0 18 14z" class="av-body" style="fill:#2f8f5b"/></svg>`
  };
  const CAST=[
   ['ruth','רות אלפרט, 46, מתודולוגית במכון סקרים בפילדלפיה','הקול שמודד. 20 שנה בתחום. היא זו שמחליטה כמה "שווה" כל משיב, כלומר על המשקלות. בסתיו 2026 היא מקבלת מכל סקר כמה מאות תשובות, ויודעת שמאחורי כל אחת יש עשרות שלא ענו.'],
   ['darnell','דרנל הייז, 51, נהג אוטובוס בית ספר בג\'קסון, מיסיסיפי','הקול שלא נשמע. רשום להצבעה מ-1993, מצביע לנשיא, אף פעם לא בבחירות אמצע. לא עונה למספרים שהוא לא מכיר. בנובמבר 2026, בפעם הראשונה, הוא יוצא להצביע גם בבחירות האמצע.'],
   ['camila','קמילה רושה, 33, מורה בפאתי סאו פאולו','הקול שהגיע מאוחר. בסיבוב הראשון של הבחירות בברזיל נשארה בבית. שלושה שבועות אחר כך, בסיבוב השני, יצאה להצביע עם כל המשפחה.']];
  const WHO={
   1:['ruth','"כל סוקר מכיר את הבוקר שאחרי. אתה פותח את התוצאות, ומחפש את המספר שלך. השנה, בהרבה מקומות, המספר שלנו היה רחוק."'],
   2:['ruth','"שתי נקודות זה נשמע מעט. אבל בבחירות צמודות, שתי נקודות הן ההבדל בין \'צדקנו\' לבין כותרת על \'הכישלון של הסקרים\'."'],
   3:['ruth','"המרק של גאלופ הוא הדבר הראשון שלמדתי. הבעיה היא שהיום המרק לא מעורבב, ואני לא יכולה להחליט מי עולה בכף."'],
   4:['darnell','"הטלפון מצלצל, כתוב עליו מספר מפנסילבניה. אני לא מכיר אף אחד בפנסילבניה. אני לוחץ על אדום, וממשיך לנסוע."'],
   5:['darnell','"אז אף סקר לא יודע מה אני חושב. וגם, אני לא בטוח שזה עניין שלהם."'],
   6:['ruth','"נתתי לשני אנליסטים שלי את אותו קובץ. אחד שקלל לפי השכלה, השני לפי הצבעה קודמת. הפער ביניהם: שלוש נקודות. מאותם 800 אנשים."'],
   7:['camila','"בסיבוב הראשון חשבתי שזה כבר סגור, אז נשארתי בבית. ואז ראיתי את התוצאה, ואת הרשתות. בסיבוב השני הסעתי את אמא שלי לקלפי. היא לא הצביעה עשר שנים."'],
   8:['darnell','"בכנסייה אמרו: הפעם כולם הולכים. אז הלכתי. שאלו אותי ביציאה מה הצבעתי. אמרתי להם. בפעם הראשונה בחיים שעניתי לסוקר."'],
   9:['both','רות מודדת. דרנל וקמילה הם מה שהיא מנסה למדוד, ולא מצליחה לתפוס. הם לא מכירים זה את זה. את שלושתם תפגשו שוב בכל שלב.']};
  const SC=[];
  // 1 · the pollster's fear
  SC.push({n:'הפחד של הסוקר', svg:()=>
    T(200,30,'סוקר אחד, שלוש הכרעות','sv-h')+
    [['ארה"ב','בחירות האמצע','✓',0],['ברזיל','סיבוב ראשון','✗',1],['ברזיל','סיבוב שני','✗',1]].map(([c,e,m,bad],i)=>
      `<g class="a-up"${d(.2+i*.5)}><rect x="${30+i*120}" y="66" width="100" height="120" rx="10" class="${bad?'sv-calc':'sv-pod'}"/>${T(80+i*120,96,c,'sv-l')}${T(80+i*120,116,e,'sv-l dim')}${T(80+i*120,160,m,bad?'sv-qm hot':'sv-qm')}</g>`).join('')+
    `<g class="a-pop"${d(1.9)}><rect x="60" y="208" width="280" height="40" rx="8" class="sv-giant"/>${T(200,233,'"תמיד צריך לפחד מהרבה דברים"','sv-l inv')}</g>`+
    T(200,274,'אנדריי רומן, AtlasIntel, בדיווח של The Economist','sv-l dim')});
  // 2 · 469 elections
  SC.push({n:'469 בחירות', svg:()=>{
    const dots=Array.from({length:70},(_,i)=>{ const x=40+i*4.6, y=220-(((i*37)%13)+((i*11)%7))*7.2*(i>50?.75:1); return `<circle cx="${x.toFixed(0)}" cy="${Math.max(70,y).toFixed(0)}" r="3.5" class="sv-co a-pop"${d(.1+i*.015)}/>`; }).join('');
    return T(200,28,'הטעות של הסקרים, 1946 עד 2026','sv-h')+
    `<line x1="36" y1="220" x2="370" y2="220" class="sv-base"/>`+dots+
    `<path d="M40 184 C120 180 200 176 260 182 S340 190 368 192" class="sv-rg a-draw"${d(1.2)}/>`+
    `<g class="a-up"${d(1.6)}>${T(80,252,'בחירות','sv-l dim')}<text x="80" y="236" text-anchor="middle" class="sv-v md"><tspan data-to="469">0</tspan></text>${T(200,252,'מדינות','sv-l dim')}<text x="200" y="236" text-anchor="middle" class="sv-v md"><tspan data-to="49">0</tspan></text>${T(320,252,'נקודות טעות בממוצע','sv-l dim')}<text x="320" y="236" text-anchor="middle" class="sv-v md hot">~<tspan data-to="2">0</tspan></text></g>`+
    T(200,280,'כל נקודה: בחירות (המחשה של תרשים 1 בדיווח). הקו: הממוצע','sv-l dim'); }});
  // 3 · Gallup's soup
  SC.push({n:'המרק של גאלופ', svg:()=>
    T(200,28,'כף אחת מספיקה, אם המרק מעורבב','sv-h')+
    `<g class="a-up"${d(.1)}><path d="M40 90 h130 v60 q0 26 -26 26 h-78 q-26 0 -26 -26z" class="sv-pod"/>`+Array.from({length:21},(_,i)=>`<circle cx="${56+(i%7)*17}" cy="${104+Math.floor(i/7)*20}" r="5" class="sv-co ${i%3===0?'hot':''}"/>`).join('')+`</g>`+
    T(105,206,'מדגם אקראי: כף מכל מקום','sv-l')+
    `<g class="a-in-l"${d(.9)}><rect x="220" y="70" width="150" height="100" rx="8" class="sv-calc"/>${T(295,96,'1936 · Literary Digest','sv-l')}<text x="295" y="128" text-anchor="middle" class="sv-v md"><tspan data-to="2.4" data-dec="1">0</tspan>M</text>${T(295,152,'גלויות חזרו','sv-l dim')}</g>`+
    `<g class="a-pop"${d(1.8)}>${T(295,196,'תחזית: לנדון','sv-l')}${T(295,216,'בפועל: רוזוולט, בענק','sv-l hot')}</g>`+
    T(200,268,'"המדגם היה ענק, אבל הוא לא היה אקראי"','sv-l dim')});
  // 4 · one percent answers
  SC.push({n:'אחוז אחד עונה', svg:()=>
    T(200,28,'מתוך כל 100 שיחות, כמה עונים?','sv-h')+
    `<line x1="40" y1="200" x2="200" y2="200" class="sv-base"/>`+
    `<rect x="60" y="${200-50*2.6}" width="50" height="${50*2.6}" rx="5" class="sv-bar cold a-grow"${d(.3)}/><text x="85" y="${190-50*2.6}" text-anchor="middle" class="sv-v cold a-up"${d(.5)}><tspan data-to="50">0</tspan>%</text>`+
    `<rect x="130" y="${200-2*2.6}" width="50" height="${2*2.6}" rx="2" class="sv-bar warm a-grow"${d(.9)}/><text x="155" y="182" text-anchor="middle" class="sv-v warm a-up"${d(1.1)}>1-2%</text>`+
    T(85,222,'פעם','sv-l')+T(155,222,'היום','sv-l')+
    `<g class="a-in-l"${d(1.4)}><rect x="226" y="62" width="150" height="150" rx="8" class="sv-pod"/>${T(301,86,'סקר של לז\'ה','sv-l')}${T(301,116,'בני 55+ במדגם','sv-l dim')}<text x="301" y="144" text-anchor="middle" class="sv-v md hot"><tspan data-to="60">0</tspan>%</text>${T(301,168,'אחרי שקלול','sv-l dim')}<text x="301" y="196" text-anchor="middle" class="sv-v md"><tspan data-to="41">0</tspan>%</text></g>`+
    T(200,262,'דאג ריברס, YouGov: "פעם 50% היענות בטלפון. היום 1-2%"','sv-l dim')});
  // 5 · who does not want to answer (interactive)
  SC.push({n:'מי שלא רוצה לענות', inter:true, svg:()=>
    T(200,24,'חצי אוכלוסייה כחולה, חצי אדומה. מי עונה?','sv-h')+
    `<g id="st-nr-pop">`+Array.from({length:40},(_,i)=>`<g transform="translate(${44+(i%10)*35} ${62+Math.floor(i/10)*38})"><circle r="8" class="sv-co ${i%2?'hot':''}"/><rect x="-8" y="10" width="16" height="13" rx="5" class="sv-co ${i%2?'hot':''}"/></g>`).join('')+`</g>`+
    `<text id="st-nr-out" x="200" y="236" text-anchor="middle" class="sv-v md"></text>`+
    `<text id="st-nr-dir" x="200" y="258" text-anchor="middle" class="sv-l"></text>`+
    T(200,282,'40 אנשים (המחשה) · באמת: 50% כחול, 50% אדום','sv-l dim')});
  // 6 · complicated weights
  SC.push({n:'משקלים מסובכים', svg:()=>
    T(200,28,'אותם נתונים, ארבעה סוקרים, ארבע תשובות','sv-h')+
    `<g class="a-up"${d(.1)}><rect x="160" y="48" width="80" height="40" rx="6" class="sv-calc"/>${T(200,73,'פלורידה 2016','sv-l')}</g>`+
    [['+1',0],['-1',1],['-3',2],['-4',3]].map(([v,i])=>`<path d="M200 90 L${70+i*86} 132" class="sv-dash a-draw"${d(.5+i*.15)}/><g class="a-pop"${d(.9+i*.2)}><rect x="${40+i*86}" y="134" width="60" height="44" rx="6" class="sv-pod"/>${T(70+i*86,162,v,i===0?'sv-l':'sv-l hot')}</g>`).join('')+
    T(200,198,'הפער של טראמפ אחרי השקלול, לפי כל סוקר','sv-l dim')+
    `<g class="a-in-l"${d(1.9)}><rect x="40" y="214" width="320" height="40" rx="8" class="sv-giant"/>${T(200,239,'2026: שיטה חדשה, energy balancing · הטיה: 3 ⇠ כמעט 0','sv-l inv')}</g>`+
    T(200,276,'מקור: New York Times (2016) ו-Siena (2026), לפי הדיווח','sv-l dim')});
  // 7 · Brazil: who showed up
  SC.push({n:'ברזיל: מי שבא', svg:()=>
    T(200,28,'בין הסיבובים הגיעו 5 מיליון מצביעים נוספים','sv-h')+
    `<line x1="40" y1="190" x2="200" y2="190" class="sv-base"/>`+
    `<rect x="60" y="${190-119}" width="50" height="119" rx="5" class="sv-bar cold a-grow"${d(.3)}/><text x="85" y="62" text-anchor="middle" class="sv-v cold a-up"${d(.5)}><tspan data-to="119">0</tspan>M</text>`+
    `<rect x="130" y="${190-124}" width="50" height="124" rx="5" class="sv-bar warm a-grow"${d(.7)}/><text x="155" y="57" text-anchor="middle" class="sv-v warm a-up"${d(.9)}><tspan data-to="124">0</tspan>M</text>`+
    T(85,210,'סיבוב ראשון','sv-l')+T(155,210,'סיבוב שני','sv-l')+
    `<g class="a-in-l"${d(1.3)}><rect x="226" y="66" width="150" height="124" rx="8" class="sv-pod"/>${T(301,90,'לולה, סיבוב שני','sv-l')}${T(301,118,'סקרים','sv-l dim')}<text x="301" y="138" text-anchor="middle" class="sv-v md"><tspan data-to="48">0</tspan>%</text>${T(301,160,'בפועל','sv-l dim')}<text x="301" y="182" text-anchor="middle" class="sv-v md hot"><tspan data-to="52">0</tspan>%</text></g>`+
    T(200,240,'יותר מצביעים בערים הגדולות, שבהן לולה ניצח','sv-l')+
    T(200,266,'"הגיוס היה מרכיב עצום, כמו שלא היה אף פעם"','sv-l dim')});
  // 8 · America: who showed up
  SC.push({n:'אמריקה: מי שבא', svg:()=>{
    const Y=v=>92-v*7; // republican margin, points
    return T(200,24,'בחירות לקונגרס: הפער של הרפובליקנים','sv-h')+
    `<line x1="40" y1="92" x2="370" y2="92" class="sv-base"/>`+T(376,96,'0','sv-l dim','start')+
    [[2016,-3,1.4],[2018,-8.2,-7.4],[2020,-7.9,-2.2],[2022,1.1,1.8],[2024,-.2,2.2],[2026,-9.3,-13.7]].map(([yr,p,r],i)=>{ const x=66+i*58;
      return `<g class="a-up"${d(.2+i*.22)}><line x1="${x}" y1="${Y(p)}" x2="${x}" y2="${Y(r)}" class="sv-dash"/><circle cx="${x}" cy="${Y(p)}" r="6" class="sv-co"/><circle cx="${x}" cy="${Y(r)}" r="6" class="sv-co hot"/>${T(x,256,String(yr),'sv-l dim')}</g>`; }).join('')+
    `<g class="a-pop"${d(1.8)}>${T(66,40,'● ממוצע הסקרים','sv-l','start')}${T(66,58,'● התוצאה','sv-l hot','start')}</g>`+
    T(200,280,'2026: סקרים 9.3-, בפועל 13.7- (תרשים 2 בדיווח)','sv-l dim'); }});
  // 9 · better than the alternatives
  SC.push({n:'טובים מהחלופות', svg:()=>
    `<g class="a-conv1"><rect x="40" y="44" width="60" height="56" rx="6" class="sv-calc"/>${T(70,78,'☎','sv-l')}${T(70,120,'מי שלא עונה','sv-l')}</g>`+
    `<g class="a-conv2"><rect x="300" y="44" width="60" height="56" rx="6" class="sv-pod"/>${T(330,78,'⚑','sv-l')}${T(330,120,'מי שבאמת יבוא','sv-l')}</g>`+
    `<g class="a-conv3"><rect x="40" y="194" width="60" height="52" rx="6" class="sv-calc"/>${T(70,226,'⚙','sv-l')}${T(70,266,'משיבים מזויפים','sv-l')}</g>`+
    `<g class="a-conv4"><rect x="300" y="194" width="60" height="52" rx="6" class="sv-pod"/>${T(330,226,'⚖','sv-l')}${T(330,266,'שיפוט ועדר','sv-l')}</g>`+
    `<g class="a-pop"${d(1.6)}><circle cx="200" cy="150" r="46" class="sv-center"/>${T(200,145,'מה שבור','sv-h inv')}${T(200,166,'כאן?','sv-h inv')}</g>`});

  // broken axis with anchors: 1930-2010 compressed, the last decade normal, and Oct-Nov 2026 zoomed in so the four autumn events never crowd
  const AX=[[1930,40],[2010,240],[2013,262],[2016,300],[2017,380],[2024,470],[2025.5,520],[2026.7,560],[2026.95,880],[2027.5,935],[2028,970]];
  const X=y=>{ for(let i=1;i<AX.length;i++){ const [y0,x0]=AX[i-1],[y1,x1]=AX[i]; if(y<=y1) return x0+(y-y0)/(y1-y0)*(x1-x0); } return 970; };
  const EV=[
   [1936,'card','1936','ה-Literary Digest: כ-2.4 מיליון גלויות, ותחזית הפוכה. גאלופ צודק עם מדגם קטן בהרבה.',3],
   [1975,'phone','שנות ה-70 וה-80','רוב הסוקרים עוברים מראיונות בבתים לשיחות טלפון למספרים אקראיים.',4],
   [2016.4,'brexit','יוני 2016','משאל הברקזיט: 32 מתוך 33 עיתונאים צפו שבריטניה תישאר. הסקרים היו קרובים יותר.',9],
   [2016.86,'vote','נובמבר 2016','הניצחון הראשון של טראמפ. ה-New York Times נותן לארבעה סוקרים אותם נתונים מפלורידה.',6],
   [2024.85,'vote','נובמבר 2024','שוב הערכת חסר לטראמפ. ה"לוויתן" מרוויח 80 מיליון דולר בשוק תחזיות.',8],
   [2026.76,'br','4 באוקטובר 2026','ברזיל, סיבוב ראשון: פלביו בולסונרו מנצח; חלק מהסוקרים צפו את לולה.',7],
   [2026.82,'br2','25 באוקטובר 2026','ברזיל, סיבוב שני: לולה מנצח עם 52%, 4 נקודות מעל הסקרים.',7],
   [2026.86,'cap','3 בנובמבר 2026','בחירות האמצע בארה"ב: הדמוקרטים מנצחים ב-14 נקודות; הסקרים אמרו כ-9.',8],
   [2026.91,'es','29 בנובמבר 2026','ספרד הולכת לבחירות. בסקרים: הימין 50%, השמאל 35%.',9],
   [2027.3,'fr','2027','הבחירות לנשיאות בצרפת. מרין לה פן מובילה בסקרים של הסיבוב הראשון.',9]];
  const ICO={
   card:'<rect x="-11" y="-8" width="22" height="16" rx="2" class="ti-doc"/><line x1="-6" y1="-2" x2="6" y2="-2" class="ti-line"/><line x1="-6" y1="3" x2="3" y2="3" class="ti-line"/>',
   phone:'<rect x="-7" y="-11" width="14" height="22" rx="3" class="ti-doc"/><circle cx="0" cy="7" r="1.6" class="ti-hot"/>',
   brexit:'<rect x="-10" y="-8" width="20" height="16" class="ti-doc"/><path d="M-10 -8 L10 8 M10 -8 L-10 8" class="ti-line"/><circle cx="0" cy="0" r="3" class="ti-hot"/>',
   vote:'<rect x="-10" y="-2" width="20" height="13" rx="2" class="ti-doc"/><rect x="-5" y="-12" width="10" height="12" class="ti-doc"/><line x1="-6" y1="-2" x2="6" y2="-2" class="ti-line"/>',
   br:'<rect x="-11" y="-8" width="22" height="16" class="ti-doc"/><path d="M-9 0 L0 -6 L9 0 L0 6Z" class="ti-hot"/>',
   br2:'<rect x="-11" y="-8" width="22" height="16" class="ti-doc"/><path d="M-9 0 L0 -6 L9 0 L0 6Z" class="ti-hot"/><text x="0" y="3" text-anchor="middle" style="font-size:7px;fill:#fff">2</text>',
   cap:'<path d="M-11 9 v-6 q11 -16 22 0 v6z" class="ti-doc"/><rect x="-2" y="-12" width="4" height="6" class="ti-hot"/>',
   es:'<rect x="-11" y="-8" width="22" height="16" class="ti-doc"/><rect x="-11" y="-3" width="22" height="6" class="ti-hot"/>',
   fr:'<rect x="-11" y="-8" width="22" height="16" class="ti-doc"/><rect x="-11" y="-8" width="7" height="16" class="ti-line"/><rect x="4" y="-8" width="7" height="16" class="ti-hot"/>'};
  const QZ=[
   ['לפי הניתוח בדיווח, מה קרה לדיוק של הסקרים לאורך 80 שנה?',['הוא קרס בעשור האחרון','הוא השתפר מעט: טעות ממוצעת של כ-2 נקודות בסקרים של 10 הימים האחרונים','הוא נשאר בדיוק אותו דבר בכל מדינה'],1,'על פני 469 בחירות ב-49 מדינות, הסקרים נהיו קצת מדויקים יותר. אבל "ממוצע" מסתיר שנים כמו 2026, שבהן רוב הסוקרים טעו לאותו כיוון.'],
   ['למה ה-Literary Digest טעה ב-1936, אף שקיבל כ-2.4 מיליון תשובות?',['כי המדגם היה קטן מדי','כי המדגם לא היה אקראי: מי שענה היה שונה ממי שלא','כי גאלופ חיבל בו'],1,'גודל לא מתקן הטיה. מיליוני תשובות ממי שבחר לענות עדיין מספרות רק על מי שבחר לענות. זו בדיוק הבעיה של רות, עם 1-2% היענות.'],
   ['לפי הדיווח, מה הסביר בערך חצי מהטעות של הסקרים בבחירות האמצע של 2026?',['בוטים בפאנלים','המצביעים בפועל היו שונים ממה שהסוקרים הניחו: יותר מצביעי הריס מ-2024 הגיעו','שוק התחזיות'],1,'במדגמים היה יתרון של 2 נקודות למצביעי הריס; בפועל, לפי סקרי היציאה, 5. תיקון לבד מעלה את הדמוקרטים מ-9.5 ל-11.5, מתוך 14. מי שבא, כמו דרנל, הוא חצי מהסיפור.']];
  return {AV,CAST,WHO,SC,QZ,EV,ICO, interAt:4,
    castLabel:'שלוש דמויות שילוו אתכם (בדויות, מבוססות על אירועים אמיתיים)',
    whoLabel:{ruth:'ומה זה עושה לרות',darnell:'ומה זה עושה לדרנל',camila:'ומה זה עושה לקמילה',both:'שלוש הדמויות'},
    bothKeys:['ruth','darnell','camila'],
    inter(sEls){
  (function(){ const sc=sEls[4]; const box=H('div','st-rg');
    const mk=(lab,id,v,min,max,step)=>{ const l=H('label','st-rg-l'); const s=H('span','',lab); const o=H('b'); const r=H('input'); r.type='range'; r.min=min; r.max=max; r.step=step; r.value=v; r.id=id; r.setAttribute('aria-label',lab); l.append(s,o,r); box.append(l); return [r,o]; };
    const [ai,ao]=mk('כמה מהכחולים עונים לסקר','st-nr-a',32,1,60,1), [bi,bo]=mk('כמה מהאדומים עונים לסקר','st-nr-b',12,1,60,1);
    box.hidden=true; document.getElementById('st-stage').insertBefore(box,document.querySelector('.st-sbar')); window.__stRG=box;
    const people=[...sc.querySelectorAll('#st-nr-pop > g')], out=sc.querySelector('#st-nr-out'), dir=sc.querySelector('#st-nr-dir');
    function draw(){ const a=+ai.value, b=+bi.value; ao.textContent=a+'%'; bo.textContent=b+'%';
      const blue=a/(a+b)*100; const nb=Math.round(20*a/60), nr=Math.round(20*b/60); let kb=0,kr=0;
      people.forEach((g,i)=>{ const red=i%2===1; const on=red?(kr++<nr):(kb++<nb); g.style.opacity=on?1:.22; });
      out.textContent='הסקר יראה: '+blue.toFixed(0)+'% כחול';
      const gap=Math.abs(blue-50); dir.textContent=gap<2?'כמעט אמת: שני הצדדים עונים באותו קצב':(gap<15?'הטיה של '+gap.toFixed(0)+' נקודות, בלי שאף אחד שיקר':'הטיה ענקית: הסקר מספר בעיקר על מי שאוהב לענות'); }
    ai.addEventListener('input',draw); bi.addEventListener('input',draw); draw(); })();
    },
    tlSvg(){
    let s=`<svg viewBox="0 0 1000 326" class="tl-svg" role="img" aria-label="ציר זמן מ-1936 עד 2027: מהגלויות של 1936 ועד הבחירות של 2026. החלק של 1930 עד 2010 מכווץ, כדי שהאירועים האחרונים לא יצטופפו">`;
    s+=`<rect x="${X(1930)}" y="40" width="${X(2010)-X(1930)}" height="176" class="tl-band"/><text x="${(X(1930)+X(2010))/2}" y="58" text-anchor="middle" class="tl-band-t">80 שנה (מכווץ)</text>`;
    s+=`<rect x="${X(2013)}" y="40" width="${X(2026.7)-X(2013)}" height="176" class="tl-band"/><text x="${(X(2013)+X(2026.7))/2}" y="58" text-anchor="middle" class="tl-band-t">העשור האחרון</text>`;
    s+=`<rect x="${X(2026.7)}" y="40" width="${X(2026.95)-X(2026.7)}" height="176" class="tl-future"/><text x="${(X(2026.7)+X(2026.95))/2}" y="58" text-anchor="middle" class="tl-band-t dim">אוקטובר-נובמבר 2026 (מוגדל)</text>`;
    [X(2010)+11,X(2026.7)-4].forEach(x=>{ s+=`<path d="M${x-5} 200 l7 -14 M${x+3} 200 l7 -14" stroke="var(--ink-dim)" stroke-width="2"/>`; });
    [[1940,'1940'],[1970,'1970'],[2000,'2000'],[2016,'2016'],[2020,'2020'],[2024,'2024'],[2026.75,'אוקטובר'],[2026.84,'נובמבר'],[2027.5,'2027']].forEach(([y,l])=>{ s+=`<text x="${X(y)}" y="234" text-anchor="middle" class="tl-ax">${l}</text>`; });
    // response rate line: illustrative, from "50% then" to "1-2% now" (Rivers, in the report)
    s+=`<polyline points="${X(1936)},96 ${X(1975)},100 ${X(1995)},128 ${X(2010)},170 ${X(2016)},190 ${X(2026)},206 ${X(2028)},207" class="tl-line" style="fill:none"/>`;
    s+=`<text x="${X(2026.94)}" y="190" class="tl-cap" text-anchor="start">שיעור ההיענות (המחשה): מכ-50% לכ-1-2%</text>`;
    const LV=[262,262,262,296,262,262,296,262,296,262]; EV.forEach(([y,ic,lab],i)=>{ const x=X(y), yy=LV[i];
      s+=`<g class="tl-ev" data-i="${i}" tabindex="0" role="button" aria-label="${lab}: ${EV[i][3]}" style="--i:${i}"><line x1="${x}" y1="216" x2="${x}" y2="${yy-14}" class="tl-stem"/><g transform="translate(${x} ${yy})"><circle r="15" class="tl-ic-bg"/>${ICO[ic]}</g></g>`; });
    s+='</svg>';
      return s; },
    qzFin:'<p>ענית נכון על <b></b>. שימו לב: כל התשובות מצביעות על אותו מקום. הבעיה היא לא כמה שואלים, אלא מי עונה, ומי באמת בא. בשלב הבא נפרוש את זה על הלוח, עם הממצאים. מוכנים?</p><a class="qz-next" href="problems.html">לשלב 02: הבעיות ←</a>'};
};
