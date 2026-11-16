/* Case 04 · stage 01 story content (expiring-promises). Engine: story.js. Same contract as Case 03:
   AV, CAST, castLabel, WHO, whoLabel, bothKeys, SC (scenes), interAt (index of the interactive scene), inter(sEls), tlSvg(), EV, ICO, QZ, qzFin. */
window.STORY=window.STORY||{};
window.STORY['expiring-promises']=function(api){
  const {H,T,d}=api;
  const AV={
   dana:`<svg viewBox="0 0 60 60" class="st-av-svg" aria-hidden="true"><circle cx="30" cy="30" r="28" class="av-bg"/><path d="M16 32 q-1 -22 14 -22 q15 0 14 22 q-3 -12 -14 -12 q-11 0 -14 12z" class="av-hair"/><circle cx="30" cy="30" r="12" class="av-face"/><circle cx="26" cy="29" r="1.6" class="av-eye"/><circle cx="34" cy="29" r="1.6" class="av-eye"/><path d="M26 35 q4 2 8 0" class="av-mouth"/><path d="M12 58 q4 -14 18 -14 q14 0 18 14z" class="av-body"/><rect x="26" y="46" width="8" height="10" rx="1" class="av-doc"/></svg>`,
   sasha:`<svg viewBox="0 0 60 60" class="st-av-svg" aria-hidden="true"><circle cx="30" cy="30" r="28" class="av-bg"/><path d="M18 24 q2 -12 12 -12 q10 0 12 12 q-5 -5 -12 -5 q-7 0 -12 5z" class="av-hair"/><circle cx="30" cy="30" r="12" class="av-face"/><circle cx="26" cy="29" r="1.6" class="av-eye"/><circle cx="34" cy="29" r="1.6" class="av-eye"/><path d="M26 36 h8" class="av-mouth"/><path d="M12 58 q4 -14 18 -14 q14 0 18 14z" class="av-body"/><path d="M40 10 v10 M36 12 h8" class="av-mouth"/><circle cx="40" cy="22" r="2" class="av-eye"/></svg>`
  };
  const CAST=[
   ['dana','דנה מילר, 44, קצינת דסק במועצה לביטחון לאומי','בתוך החדר. 16 שנה בממשל, ובשנים האחרונות אחראית על תיק איראן. היא זוכרת מה הובטח בכל שיחה, למי ועד מתי. באוקטובר 2026 היא מקבלת הודעה שהשיבוץ שלה נגמר בסוף החודש.'],
   ['sasha','סשה (אולקסנדר) קובאל, 29, טכנאי קשר ליד חרקוב','בקצה הקו. אחראי על הקישור שמעביר וידאו מהרחפנים של היחידה שלו לחמ"ל. הקישור עובר דרך לוויין. באוקטובר 2026 הוא נעלם לשעות, באמצע משמרת.']];
  const WHO={
   1:['dana','"16 שנה אני בבניין הזה. אף פעם לא ראיתי שעון שמתקתק ככה. כולם פתאום ממהרים, ואף אחד לא מספיק לכתוב מה סגר אתמול."'],
   2:['sasha','"פה, בחרקוב, בחירות בארה"ב נשמעות רחוקות. ואז מישהו ביחידה אמר: \'מהיום, כל מה שהם מבטיחים לנו הוא עם תאריך תפוגה\'."'],
   3:['dana','"כשהקונגרס מתחיל לזמן מסמכים, אנשים מפסיקים לכתוב. כל הבטחה עוברת לשיחת טלפון. ומה שלא כתוב, לא נשאר."'],
   4:['sasha','"כל טיסה של נשיא מביאה איתה הבטחה חדשה. השאלה אצלנו היא תמיד אותה שאלה: מי יהיה שם כשצריך לקיים אותה?"'],
   5:['dana','"ב-2 באוקטובר אמרתי בטלפון למדינה במפרץ שהמיירטים יגיעו עד אמצע דצמבר. לא נכתב על זה מסמך. זה היה אצלי בראש."'],
   6:['sasha','"באמצע אוקטובר המסך שלי החשיך. לא הפצצה, לא תקלה אצלנו. פשוט, מישהו רחוק החליט. עברנו לקשר אלחוטי ישן, והקול עבר. הווידאו לא."'],
   7:['dana','"יש לי חבר מהתקופה של קובה הקודמת, של 2015. הוא אמר לי: כל מה שבנינו אז, נמחק בחתימה אחת. כי אף אחד לא זכר למה זה היה חשוב."'],
   8:['dana','"17 באוקטובר: \'השיבוץ שלך מסתיים ב-31\'. שבועיים. המחליף שלי, מרקוס, בן 27. כתבתי לו מזכר של ארבעה עמודים, בלילה. המיירטים לא נכנסו אליו."'],
   9:['both','דנה וסשה לא מכירים זה את זה. היא יושבת בחדר שבו מבטיחים, ועוזבת אותו. הוא חי בקצה הקו עם מה שהובטח, ולא יודע מי זוכר את זה. את שניהם תפגשו שוב בכל שלב.']};
  const SC=[];
  // 1 · eighteen hours a day
  SC.push({n:'שמונה עשרה שעות ביום', svg:()=>
    T(200,30,'השעון של השנתיים האחרונות','sv-h')+
    `<g class="a-up"${d(.1)}><circle cx="110" cy="150" r="78" class="sv-pod"/>`+[0,1,2,3,4,5,6,7,8,9,10,11].map(i=>{ const a=i*Math.PI/6; return `<line x1="${(110+66*Math.sin(a)).toFixed(0)}" y1="${(150-66*Math.cos(a)).toFixed(0)}" x2="${(110+74*Math.sin(a)).toFixed(0)}" y2="${(150-74*Math.cos(a)).toFixed(0)}" class="sv-base"/>`; }).join('')+
    `<line x1="110" y1="150" x2="110" y2="94" class="sv-arrow hot"><animateTransform attributeName="transform" type="rotate" values="0 110 150;360 110 150" dur="6s" repeatCount="indefinite"/></line><circle cx="110" cy="150" r="5" class="sv-co hot"/></g>`+
    `<g class="a-in-l"${d(.8)}><rect x="220" y="80" width="150" height="54" rx="8" class="sv-giant"/>${T(295,104,'"יש לי את כל החיים','sv-l inv')}${T(295,122,'לישון"','sv-l inv')}</g>`+
    `<g class="a-pop"${d(1.6)}>${T(295,158,'קלינטון, בשנה האחרונה','sv-l dim')}</g>`+
    `<g class="a-up"${d(2.2)}>${T(295,206,'אותו שעון,','sv-l')}${T(295,226,'עכשיו לטראמפ','sv-l hot')}</g>`+
    T(200,274,'נשיא בקדנציה שנייה יודע בדיוק מתי הוא עוזב','sv-l dim')});
  // 2 · November 3rd
  SC.push({n:'3 בנובמבר', svg:()=>{ const arc=(cx,blue)=>Array.from({length:15},(_,i)=>{ const a=Math.PI-i*Math.PI/14, x=cx+62*Math.cos(a), y=150-62*Math.sin(a); return `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="6" class="sv-co ${i<blue?'cold':'hot'} a-pop"${d(.3+i*.05)}/>`; }).join('');
    return T(200,30,'בחירות האמצע: שני הבתים מתהפכים','sv-h')+
    arc(110,9)+arc(290,8)+`<line x1="30" y1="158" x2="370" y2="158" class="sv-base"/>`+T(110,180,'בית הנבחרים','sv-l')+T(290,180,'הסנאט','sv-l')+
    `<g class="a-up"${d(1.4)}><rect x="96" y="204" width="208" height="40" rx="8" class="sv-pod"/>${T(200,229,'"וואו. זה מדהים."','sv-l hot')}</g>`+
    T(200,272,'רק פעם אחת קודם: בוש, 2006 (המחשה של המושבים)','sv-l dim'); }});
  // 3 · the home front
  SC.push({n:'החזית בבית', svg:()=>
    T(200,30,'בבית: מגבלות. בחוץ: כמעט אין','sv-h')+
    `<g class="a-in-r"${d(.1)}><path d="M40 210 v-70 q70 -70 140 0 v70z" class="sv-pod"/><rect x="104" y="96" width="12" height="16" class="sv-co"/>${T(110,236,'קונגרס','sv-l')}</g>`+
    [0,1,2].map(i=>`<g class="a-pop"${d(.6+i*.3)}><rect x="${60+i*36}" y="${150+i*10}" width="30" height="38" rx="3" class="sv-calc"/>${T(75+i*36,174+i*10,['זימון','שימוע','וטו'][i],'sv-l sm')}</g>`).join('')+
    `<g class="a-in-l"${d(1.5)}><circle cx="300" cy="140" r="56" class="sv-dash"/><path d="M260 140 Q300 90 340 140" class="sv-rg"/>${T(300,214,'מדיניות חוץ','sv-l hot')}${T(300,232,'"שם יש הכי מעט מגבלות"','sv-l dim')}</g>`+
    T(200,274,'יובל לוין, American Enterprise Institute','sv-l dim')});
  // 4 · the travel map
  SC.push({n:'המפה של הנסיעות', svg:()=>
    T(200,30,'ימים בחו"ל בשנתיים האחרונות של הקדנציה','sv-h')+
    `<line x1="40" y1="220" x2="360" y2="220" class="sv-base"/>`+
    `<rect x="70" y="${220-25*3}" width="60" height="${25*3}" rx="5" class="sv-bar cold a-grow"${d(.3)}/>`+
    `<rect x="160" y="${220-50*3}" width="60" height="${50*3}" rx="5" class="sv-bar warm a-grow"${d(.7)}/>`+
    `<text x="100" y="${208-25*3}" text-anchor="middle" class="sv-v cold a-up"${d(.5)}>~<tspan data-to="25">0</tspan></text>`+
    `<text x="190" y="${208-50*3}" text-anchor="middle" class="sv-v warm a-up"${d(.9)}><tspan data-to="50">0</tspan></text>`+
    T(145,244,'בוש: ממוצע שנתי מול 2008','sv-l')+
    `<g class="a-up"${d(1.4)}><path d="M260 110 Q300 60 350 110" class="sv-dash"/><path d="M262 150 Q300 110 348 150" class="sv-dash"/><circle cx="350" cy="110" r="5" class="sv-co hot"/><circle cx="348" cy="150" r="5" class="sv-co hot"/>${T(305,186,'אובמה: פי שניים','sv-l')}${T(305,204,'והסכם עם איראן','sv-l hot')}</g>`+
    T(200,272,'מקור: The Economist, לפי רישומי מחלקת המדינה','sv-l dim')});
  // 5 · Iran
  SC.push({n:'איראן', svg:()=>
    T(200,30,'מיירטים: כל יירוט הוא אחד פחות במלאי','sv-h')+
    `<g class="a-up"${d(.2)}><path d="M30 110 Q120 130 170 140 Q210 148 250 136 Q300 120 370 116" class="sv-rg"/><path d="M30 190 Q120 170 170 162 Q210 156 250 166 Q300 180 370 190" class="sv-rg"/>${T(200,154,'מצר הורמוז','sv-l')}</g>`+
    Array.from({length:12},(_,i)=>`<rect x="${70+i*22}" y="214" width="14" height="28" rx="3" class="sv-co ${i<7?'':'hot'} a-pop"${d(.6+i*.08)}/>`).join('')+
    `<g class="a-pop"${d(1.8)}>${T(200,262,'מלאי מיירטים (המחשה, לא נתון)','sv-l dim')}</g>`+
    `<g class="a-in-l"${d(1.2)}><rect x="250" y="56" width="120" height="40" rx="6" class="sv-giant"/>${T(310,80,'"שלום מכובד"','sv-l inv')}</g>`+
    `<g class="a-in-r"${d(1)}><rect x="30" y="56" width="120" height="40" rx="6" class="sv-calc"/>${T(90,80,'תוכניות: בהקפאה','sv-l')}</g>`});
  // 6 · Ukraine
  SC.push({n:'אוקראינה', svg:()=>
    T(200,30,'הקישור נעלם, ומה עובר בגיבוי?','sv-h')+
    `<g class="a-up"${d(.1)}><rect x="160" y="52" width="80" height="16" class="sv-co"/><rect x="128" y="56" width="28" height="8" class="sv-pod"/><rect x="244" y="56" width="28" height="8" class="sv-pod"/></g>`+
    `<line x1="200" y1="72" x2="200" y2="160" class="sv-dash a-blink"${d(.8)}/>`+
    `<g class="a-up"${d(.4)}><rect x="160" y="160" width="80" height="44" rx="6" class="sv-calc"/>${T(200,187,'החמ"ל','sv-l')}</g>`+
    `<g class="a-pop"${d(1.4)}>${T(80,120,'קול ✓','sv-l')}${T(80,140,'פקודות ✓','sv-l')}${T(320,120,'וידאו ✗','sv-l hot')}${T(320,140,'רחפנים: עיוורים','sv-l hot')}</g>`+
    `<g class="a-up"${d(2)}><rect x="40" y="222" width="320" height="34" rx="8" class="sv-pod"/>${T(200,244,'סטארלינק ~10,000 לוויינים · OneWeb ~650','sv-l')}</g>`+
    T(200,276,'מרץ 2026, לפי ספירה של האסטרונום ג\'ונתן מקדואל','sv-l dim')});
  // 7 · Cuba
  SC.push({n:'קובה', svg:()=>
    T(200,30,'מה שנבנה ב-2015, ומה שנשאר','sv-h')+
    `<g class="a-up"${d(.2)}><rect x="50" y="70" width="120" height="120" rx="8" class="sv-pod"/>${T(110,98,'2015','sv-l')}${T(110,118,'שגרירות נפתחת','sv-l')}${T(110,138,'טיסות, מסחר','sv-l dim')}</g>`+
    `<path d="M178 130 h44" class="sv-arrow a-draw"${d(.9)}/>`+
    `<g class="a-in-l"${d(1.1)}><rect x="230" y="70" width="120" height="120" rx="8" class="sv-calc"/>${T(290,98,'יורש','sv-l')}${T(290,118,'מבטל','sv-l hot')}${T(290,138,'בחתימה אחת','sv-l dim')}<path d="M240 80 L340 180" class="sv-arrow hot"/></g>`+
    `<g class="a-pop"${d(1.9)}>${T(200,230,'"נטפל בקובה בדרך חזרה מאיראן"','sv-l hot')}${T(200,252,'מתוך נאום בקמפיין, אוקטובר 2026','sv-l dim')}</g>`});
  // 8 · the thinning herd (interactive)
  SC.push({n:'העדר שמידלדל', inter:true, svg:()=>
    T(200,26,'כמה מהצוות עוד יהיה בחדר בסוף?','sv-h')+
    `<g id="st-hd-team">`+Array.from({length:40},(_,i)=>`<g transform="translate(${52+(i%10)*33} ${66+Math.floor(i/10)*40})"><circle r="8" class="sv-co"/><rect x="-8" y="10" width="16" height="14" rx="5" class="sv-co"/></g>`).join('')+`</g>`+
    `<text id="st-hd-out" x="200" y="246" text-anchor="middle" class="sv-v md"></text>`+
    `<text id="st-hd-dir" x="200" y="268" text-anchor="middle" class="sv-l"></text>`+
    T(200,290,'צוות של 40 (המחשה) · חישוב פשוט, לא תחזית','sv-l dim')});
  // 9 · peace with conditions
  SC.push({n:'שלום על תנאי', svg:()=>
    `<g class="a-conv1"><rect x="40" y="44" width="60" height="56" rx="6" class="sv-calc"/>${T(70,78,'?','sv-qm')}${T(70,120,'הבטחה בלי זיכרון','sv-l')}</g>`+
    `<g class="a-conv2"><rect x="300" y="44" width="60" height="56" rx="6" class="sv-pod"/>${T(330,78,'✎','sv-l')}${T(330,120,'הסכם על חול','sv-l')}</g>`+
    `<g class="a-conv3"><rect x="40" y="194" width="60" height="52" rx="6" class="sv-calc"/>${T(70,226,'⏻','sv-l')}${T(70,266,'מתג ביד פרטית','sv-l')}</g>`+
    `<g class="a-conv4"><rect x="300" y="194" width="60" height="52" rx="6" class="sv-pod"/>${T(330,226,'⚑','sv-l')}${T(330,266,'משבר בלי חזרה','sv-l')}</g>`+
    `<g class="a-pop"${d(1.6)}><circle cx="200" cy="150" r="46" class="sv-center"/>${T(200,145,'מה שבור','sv-h inv')}${T(200,166,'כאן?','sv-h inv')}</g>`});

  const Y0=2025, Y1=2029.3, X=y=>40+(y-Y0)/(Y1-Y0)*920;
  const EV=[
   [2025.05,'flag','ינואר 2025','תחילת הקדנציה השנייה.',1],
   [2025.39,'desk','מאי 2025','צוות המועצה לביטחון לאומי מקוצץ לפחות בחצי (לפי AP).',8],
   [2025.88,'doc','נובמבר 2025','תוכנית 28 הנקודות לאוקראינה; רוביו ובעלות ברית גוזמים אותה.',6],
   [2026.03,'cuba','ינואר 2026','מדורו נחטף מוונצואלה.',7],
   [2026.79,'sat','אוקטובר 2026','קישורי לוויין חיוניים לאוקראינה נראים מנותקים בזמן ריב.',6],
   [2026.84,'vote','3 בנובמבר 2026','בחירות האמצע: מפלגת הנשיא מפסידה את שני הבתים.',2],
   [2026.88,'meet','18-19 בנובמבר','פסגה בשנג\'ן, בהשתתפות פוטין ושי.',6],
   [2028.84,'urn','נובמבר 2028','בחירות לנשיאות.',9],
   [2029.05,'clock','20 בינואר 2029','סוף הקדנציה.',1]];
  const ICO={
   flag:'<line x1="-8" y1="-12" x2="-8" y2="12" class="ti-line"/><rect x="-8" y="-12" width="18" height="12" class="ti-hot"/>',
   desk:[-8,0,8].map((x,i)=>`<circle cx="${x}" cy="-4" r="3.5" class="${i===1?'ti-hot':'ti-doc'}"/><rect x="${x-3.5}" y="0" width="7" height="9" rx="3" class="${i===1?'ti-hot':'ti-doc'}"/>`).join(''),
   doc:'<rect x="-9" y="-12" width="18" height="24" rx="2" class="ti-doc"/>'+[0,1,2,3].map(i=>`<line x1="-5" y1="${-7+i*5}" x2="5" y2="${-7+i*5}" class="ti-line"/>`).join(''),
   cuba:'<path d="M-12 2 q6 -8 14 -6 q6 2 10 -2" class="ti-line"/><circle cx="0" cy="6" r="3" class="ti-hot"/>',
   sat:'<rect x="-4" y="-4" width="8" height="8" class="ti-doc"/><rect x="-13" y="-2" width="7" height="4" class="ti-doc"/><rect x="6" y="-2" width="7" height="4" class="ti-doc"/><path d="M-8 10 L8 -10" class="ti-crack"/>',
   vote:'<rect x="-10" y="-2" width="20" height="13" rx="2" class="ti-doc"/><rect x="-5" y="-12" width="10" height="12" class="ti-doc"/><line x1="-6" y1="-2" x2="6" y2="-2" class="ti-line"/>',
   meet:'<circle cx="-6" cy="-3" r="5" class="ti-doc"/><circle cx="6" cy="-3" r="5" class="ti-doc"/><rect x="-11" y="5" width="22" height="5" rx="2" class="ti-hot"/>',
   urn:'<rect x="-10" y="-6" width="20" height="16" rx="2" class="ti-doc"/><rect x="-6" y="-12" width="12" height="3" class="ti-hot"/>',
   clock:'<circle r="11" class="ti-doc"/><line x1="0" y1="0" x2="0" y2="-7" class="ti-line"/><line x1="0" y1="0" x2="5" y2="0" class="ti-crack"/>'};
  const QZ=[
   ['לפי הדיווח, למה נשיאים בסוף קדנציה שנייה פונים לחוץ?',['כי שם הם הכי פופולריים','כי בבית הקונגרס מגביל אותם, ובמדיניות חוץ יש הכי מעט מגבלות','כי החוק מחייב אותם לנסוע'],1,'יובל לוין: "מדיניות חוץ היא המקום שבו יש הכי מעט מגבלות". ולכן גם הבטחות רבות נאמרות בדיוק שם, בשיחות ובפגישות.'],
   ['מה קרה להסכם הגרעין עם איראן ולפתיחה לקובה, לפי הדיווח?',['הם אושרו בסנאט ועדיין בתוקף','הם נשענו על בסיס חקיקתי חלש, ויורש ביטל אותם','הם הוחלפו בהסכמים טובים יותר'],1,'שניהם היו הסכמים של הממשל, לא אמנות שאושרו. יורש יכול לבטל אותם בחתימה. זה מה שהופך הבטחה של אדם לשונה מהבטחה של מדינה.'],
   ['מה הדיווח אומר על המועצה לביטחון לאומי?',['שהיא גדלה לקראת המשברים','שהיא רוקנה ברובה, ומומחים פוטרו, מה שגורם להכנה גרועה לפגישות ולמשא ומתן','שהיא עברה למשרד החוץ'],1,'כשהאנשים שהכינו את הפגישות עוזבים, הזיכרון של מה הוחלט ולמה עוזב איתם. זה מה שמרקוס פוגש ביום הראשון שלו.']];
  return {AV,CAST,WHO,SC,QZ,EV,ICO, interAt:7,
    castLabel:'שתי דמויות שילוו אתכם (בדויות, מבוססות על אירועים אמיתיים)',
    whoLabel:{dana:'ומה זה עושה לדנה',sasha:'ומה זה עושה לסשה',both:'שתי הדמויות'},
    bothKeys:['dana','sasha'],
    inter(sEls){
  (function(){ const sc=sEls[7]; const box=H('div','st-rg');
    const mk=(lab,id,v,min,max,step)=>{ const l=H('label','st-rg-l'); const s=H('span','',lab); const o=H('b'); const r=H('input'); r.type='range'; r.min=min; r.max=max; r.step=step; r.value=v; r.id=id; r.setAttribute('aria-label',lab); l.append(s,o,r); box.append(l); return [r,o]; };
    const [pi,po]=mk('אחוז מהצוות שעוזב בכל חודש','st-hd-p',3,0,8,.5), [mi,mo]=mk('חודשים עד סוף הקדנציה','st-hd-m',26,6,26,1);
    box.hidden=true; document.getElementById('st-stage').insertBefore(box,document.querySelector('.st-sbar')); window.__stRG=box;
    const people=[...sc.querySelectorAll('#st-hd-team > g')], out=sc.querySelector('#st-hd-out'), dir=sc.querySelector('#st-hd-dir');
    function draw(){ const p=+pi.value/100, m=+mi.value; po.textContent=(+pi.value).toLocaleString('he-IL')+'%'; mo.textContent=m;
      const left=Math.round(40*Math.pow(1-p,m));
      people.forEach((g,i)=>{ g.querySelectorAll('.sv-co').forEach(e=>e.classList.toggle('hot',i>=left)); g.style.opacity=i>=left?.35:1; });
      out.textContent=left+' מתוך 40 עוד יושבים בחדר';
      dir.textContent=left<20?'יותר ממחצית הכיסאות כבר בידי מישהו שלא היה שם כשהבטיחו':(left<40?'כל כיסא שהתחלף: עוד מישהו שלא יודע מה הובטח':'אף אחד לא עזב. נדיר מאוד בשנתיים האחרונות'); }
    pi.addEventListener('input',draw); mi.addEventListener('input',draw); draw(); })();
    },
    tlSvg(){
    let s=`<svg viewBox="0 0 1000 326" class="tl-svg" role="img" aria-label="ציר זמן מ-2025 עד 2029: הקדנציה השנייה ואירועי הסיפור">`;
    s+=`<rect x="${X(2025.05)}" y="40" width="${X(2026.84)-X(2025.05)}" height="176" class="tl-band"/><text x="${(X(2025.05)+X(2026.84))/2}" y="58" text-anchor="middle" class="tl-band-t">הקדנציה השנייה, עם שני הבתים</text>`;
    s+=`<rect x="${X(2026.84)}" y="40" width="${X(2029.05)-X(2026.84)}" height="176" class="tl-future"/><text x="${(X(2026.84)+X(2029.05))/2}" y="58" text-anchor="middle" class="tl-band-t dim">השנתיים האחרונות: ברווז צולע</text>`;
    for(let y=2025;y<=2029;y+=1) s+=`<text x="${X(y)}" y="234" text-anchor="middle" class="tl-ax">${y}</text>`;
    // the NSC staff line: illustrative shape based on "cut at least in half" (AP, May 2025)
    s+=`<polyline points="${X(2025.05)},90 ${X(2025.38)},90 ${X(2025.42)},150 ${X(2026.84)},158 ${X(2029.05)},178" class="tl-line" style="fill:none"/>`;
    s+=`<text x="${X(2025.5)}" y="${142}" class="tl-cap" text-anchor="start">צוות המועצה לביטחון לאומי (המחשה: קוצץ לפחות בחצי)</text>`;
    const LV=[262,288,262,288,262,306,280,262,288]; EV.forEach(([y,ic,lab],i)=>{ const x=X(y), yy=LV[i];
      s+=`<g class="tl-ev" data-i="${i}" tabindex="0" role="button" aria-label="${lab}: ${EV[i][3]}" style="--i:${i}"><line x1="${x}" y1="216" x2="${x}" y2="${yy-14}" class="tl-stem"/><g transform="translate(${x} ${yy})"><circle r="15" class="tl-ic-bg"/>${ICO[ic]}</g></g>`; });
    s+='</svg>';
      return s; },
    qzFin:'<p>ענית נכון על <b></b>. שימו לב: התשובות מצביעות על אותו דבר. הבטחות נאמרות בחדר, והחדר מתרוקן. מה שלא נכתב, ומי שלא נשאר, לוקחים איתם את הזיכרון. בשלב הבא נפרוש את זה על הלוח, עם הממצאים. מוכנים?</p><a class="qz-next" href="problems.html">לשלב 02: הבעיות ←</a>'};
};
