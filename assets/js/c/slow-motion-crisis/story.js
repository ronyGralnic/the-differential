/* Case 02 · stage 01 story content. Engine: story.js. Factory gets helpers {H,T,d,coin,NS,reduce} and returns the content:
   AV avatars, CAST [key,name,line], castLabel, WHO {chapter:[key,text]}, whoLabel {key:label}, SC scenes [{n, svg(), inter?}],
   inter(sEls, api) optional interactive scene, tl {svg(), EV [year,icon,label,text,chapter], ICO}, QZ [question,options,answer,why], qzFin html. */
window.STORY=window.STORY||{};
window.STORY['slow-motion-crisis']=function(api){
  const {H,T,d,coin,NS,reduce}=api;
  const AV={
   bond:`<svg viewBox="0 0 60 60" class="st-av-svg" aria-hidden="true"><rect x="12" y="6" width="36" height="48" rx="5" class="av-doc"/><circle cx="24" cy="24" r="3" class="av-eye"/><circle cx="36" cy="24" r="3" class="av-eye"/><path d="M23 34 q7 6 14 0" class="av-mouth"/><text x="30" y="48" text-anchor="middle" class="av-tag">0.5%</text></svg>`,
   sarah:`<svg viewBox="0 0 60 60" class="st-av-svg" aria-hidden="true"><circle cx="30" cy="30" r="28" class="av-bg"/><path d="M14 26 q2 -16 16 -16 q14 0 16 16 q-4 -6 -16 -6 q-12 0 -16 6z" class="av-hair"/><circle cx="30" cy="30" r="12" class="av-face"/><circle cx="26" cy="29" r="1.6" class="av-eye"/><circle cx="34" cy="29" r="1.6" class="av-eye"/><path d="M26 35 q4 3 8 0" class="av-mouth"/><path d="M12 58 q4 -14 18 -14 q14 0 18 14z" class="av-body"/><rect x="22" y="26" width="7" height="5" rx="2" class="av-glass"/><rect x="31" y="26" width="7" height="5" rx="2" class="av-glass"/></svg>`
  };
  const CAST=[
   ['bond','האג"ח של 2016','אג"ח של ממשלת צרפת. נולדה ב-2016, כשצרפת לוותה לעשר שנים בריבית של חצי אחוז בשנה. ב-2026 היא פוקעת, וצרפת צריכה ללוות במקומה בריבית של היום. היא תספר לכם את החלק האיטי.'],
   ['sarah','שרה, 52, מורה למתמטיקה ממנצ\'סטר','חוסכת בקרן הפנסיה של המורים, ומשלמת משכנתא שהריבית הקבועה שלה נגמרת בשנה הבאה. היא תספר לכם את החלק המהיר.']];
  const WHO={
   1:['bond','"נולדתי כשהכסף היה כמעט חינם. צרפת לוותה אותי ב-0.5% לעשר שנים. היום, מי שמלווה לארה"ב לעשור דורש פי עשרה."'],
   2:['sarah','"הדלק, החשמל והסופר התייקרו. וכדי לעצור את זה מעלים ריבית, אז גם המשכנתא שלי תתייקר כשהריבית הקבועה תיגמר."'],
   3:['bond','"השנה אני פוקעת, וצרפת תצטרך למכור אג"ח חדשה במקומי. בדיוק כשהענקיות עומדות באותו תור של משקיעים."'],
   4:['bond','"מי שיקנה את המחליפה שלי יבדוק קודם אם צרפת מסוגלת לשלם. כל הבטחה פוליטית בלי מספרים מזיזה את הריבית שלה."'],
   5:['bond','"אני בדיוק החוב שמתייקר רק כשמחליפים אותו. עשר שנים עליתי לצרפת חצי אחוז בשנה. המחליפה שלי תעלה פי שבעה בערך, וזה כבר ידוע היום."'],
   6:['bond','"ואם הריבית על המחליפה שלי גבוהה מקצב הצמיחה של צרפת, החוב שאני חלק ממנו גדל מעצמו, גם בלי לווה חדש אחד."'],
   7:['sarah','"ב-23 בספטמבר 2022 הקרן שלי קיבלה את השיחה: תוסיפו ביטחונות עד מחר. אני שמעתי על זה רק בחדשות. אף אחד לא ידע כמה הקרן שלי חשופה, גם לא אני."'],
   8:['sarah','"חלק מהחיסכון של הקרן שלי מושקע היום באשראי פרטי. כמה בדיוק, ומה יקרה אם החברות האלה לא יחזירו? אין לי מושג. ואני לא בטוחה שלמישהו יש."'],
   9:['both','האג"ח של 2016 מראה את החלק האיטי, שאפשר לחשב מראש. שרה מראה את החלק המהיר, שמגיע בבוקר אחד. את שניהם תפגשו שוב בשלבים הבאים.']};
  const SC=[];
  // 1 · the price of money
  SC.push({n:'המחיר של הכסף', svg:()=>{ const B=[['2020: השפל',0.6,'cold'],['יפן היום',3.1,'warm'],['ארה"ב, 5.10.2026',5.3,'hot']];
    return T(200,40,'כמה דורשים כדי להלוות לממשלה לעשר שנים?','sv-h')+
    `<line x1="40" y1="250" x2="360" y2="250" class="sv-base"/>`+
    B.map(([l,v,c],i)=>{ const h=v*32, x=70+i*105; return `<rect x="${x}" y="${250-h}" width="60" height="${h}" rx="5" class="sv-bar ${c} a-grow"${d(.3+i*.35)}/>`+
      `<text x="${x+30}" y="${240-h}" text-anchor="middle" class="sv-v ${c} a-up"${d(.5+i*.35)}><tspan data-to="${v}" data-dec="1">0</tspan>%</text>`+T(x+30,272,l,'sv-l'); }).join('')+
    `<g class="a-pop"${d(1.6)}>${T(205,74,'השיא ביותר','sv-note')}${T(205,90,'מ-20 שנה','sv-note')}</g>`; }});
  // 2 · three forces
  SC.push({n:'שלושה כוחות', svg:()=>{ const tk=[0,1,2,3,4,5,6].map(i=>{const a=Math.PI*(1-i/6);return `<line x1="${200+92*Math.cos(a)}" y1="${215-92*Math.sin(a)}" x2="${200+104*Math.cos(a)}" y2="${215-104*Math.sin(a)}" class="sv-tick"/>`;}).join('');
    return `<path d="M90 215 A110 110 0 0 1 310 215" class="sv-dial"/>${tk}`+
    `<g class="sv-needle-g"><line x1="200" y1="215" x2="200" y2="125" class="sv-needle a-needle"${d(1.6)}/></g><circle cx="200" cy="215" r="9" class="sv-hub"/>`+T(200,248,'מחיר הכסף','sv-h')+
    `<g class="a-in-r"${d(.2)}><rect x="18" y="70" width="44" height="58" rx="8" class="sv-barrel"/><line x1="18" y1="88" x2="62" y2="88" class="sv-barrel-l"/><line x1="18" y1="110" x2="62" y2="110" class="sv-barrel-l"/>${T(40,148,'נפט','sv-l')}${T(40,164,'יקר בכ-40%','sv-l dim')}<path d="M72 110 L128 150" class="sv-arrow a-draw"${d(.7)}/></g>`+
    `<g class="a-in-l"${d(.6)}><path d="M332 62 L362 46 L392 62 z" class="sv-bank"/><rect x="336" y="62" width="52" height="40" class="sv-bank"/><rect x="344" y="68" width="6" height="30" class="sv-bank-p"/><rect x="359" y="68" width="6" height="30" class="sv-bank-p"/><rect x="374" y="68" width="6" height="30" class="sv-bank-p"/>${T(362,122,'בנקים מרכזיים','sv-l')}${T(362,138,'מעלים ריבית','sv-l dim')}<path d="M328 110 L272 150" class="sv-arrow a-draw"${d(1.1)}/></g>`+
    `<g class="a-in-d"${d(1)}><rect x="166" y="18" width="68" height="44" rx="5" class="sv-dc"/>${[0,1,2].map(i=>`<line x1="174" y1="${30+i*11}" x2="226" y2="${30+i*11}" class="sv-dc-l"/><circle cx="220" cy="${30+i*11}" r="2" class="sv-led"/>`).join('')}${T(200,80,'בום ה-AI בולע הון','sv-l')}<path d="M200 88 L200 110" class="sv-arrow a-draw"${d(1.4)}/></g>`; }});
  // 3 · the giant in the queue
  SC.push({n:'הענק בתור', svg:()=>{
    return `<rect x="16" y="70" width="58" height="96" rx="8" class="sv-booth"/>`+T(45,112,'משקיעים','sv-l')+T(45,128,'עם כסף','sv-l dim')+
    [0,1,2,3].map(i=>`<g class="a-shift"${d(1.4)}><rect x="${200+i*48}" y="120" width="40" height="46" rx="6" class="sv-co"/>${T(220+i*48,148,'חברה','sv-l sm')}</g>`).join('')+
    `<g class="a-drop"${d(.4)}><rect x="92" y="60" width="96" height="106" rx="10" class="sv-giant"/>${T(140,104,'ענקיות','sv-l inv')}${T(140,122,'הענן','sv-l inv')}</g>`+
    T(200,30,'כל מי שמנפיק עומד באותו תור','sv-h')+
    Array.from({length:10},(_,i)=>i===9?`<g class="a-eaten"${d(2.2)}>${coin(40+i*36,232,11,'hot')}</g>`:coin(40+i*36,232,11)).join('')+
    T(200,272,'מכל 10 יורו שחברות גייסו באירו, כמעט אחד הלך לענקיות','sv-l')+
    `<text x="300" y="78" text-anchor="middle" class="sv-v hot a-up"${d(1.8)}>$<tspan data-to="230">0</tspan>B</text>`+T(300,96,'השנה, פי 2','sv-l dim'); }});
  // 4 · promises nobody checks
  SC.push({n:'מי בודק?', svg:()=>{ const P=['תקציב קיצוצים','"כלל זהב"','"לשרוף" חוב'];
    return T(200,30,'שלוש תוכניות, וכולן "מסתדרות"','sv-h')+
    P.map((p,i)=>{ const x=70+i*130; return `<g class="a-up"${d(.2+i*.3)}><rect x="${x-46}" y="150" width="92" height="60" rx="6" class="sv-pod"/><rect x="${x-26}" y="82" width="52" height="62" rx="7" class="sv-calc"/><rect x="${x-19}" y="89" width="38" height="16" rx="3" class="sv-calc-s"/>${T(x,102,'✓','sv-ok')}${[0,1,2].map(r=>[0,1,2].map(c=>`<rect x="${x-19+c*14}" y="${110+r*10}" width="10" height="7" rx="1.5" class="sv-key"/>`).join('')).join('')}${T(x,186,p,'sv-l')}</g>`; }).join('')+
    `<g class="a-sweep"${d(1.3)}><circle cx="0" cy="0" r="26" class="sv-glass"/><line x1="18" y1="18" x2="40" y2="40" class="sv-glass-h"/>${T(0,8,'?','sv-q')}</g>`+
    T(200,236,'הריבית שהמשקיעים דורשים (המחשה של הסדר)','sv-l dim')+
    [['צרפת',62,'hot'],['איטליה',52,''],['יוון',46,'']].map(([l,w,c],i)=>`<rect x="${120}" y="${246+i*16}" width="${w*2.4}" height="11" rx="3" class="sv-hbar ${c} a-grow-x"${d(1.8+i*.2)}/>${T(112,256+i*16,l,'sv-l sm','start')}`).join(''); }});
  // 5 · the slow wall
  SC.push({n:'חומת הפקיעות', svg:()=>{ const Y=['2026','2027','2028'];
    return T(200,30,'החוב שפוקע ומתגלגל לריבית של היום','sv-h')+
    Y.map((y,c)=>[0,1,2,3,4,5].map(r=>`<rect x="${40+c*70}" y="${222-r*28}" width="62" height="24" rx="3" class="sv-brick a-heat"${d(.3+c*.7+r*.12)}/>`).join('')+T(71+c*70,268,y,'sv-l')).join('')+
    `<g class="a-up"${d(2.6)}>${T(312,64,'ארה"ב, בשנה:','sv-l sm')}`+
    `<rect x="268" y="96" width="38" height="134" class="sv-bar hot" />${T(287,248,'ריבית','sv-l sm')}${T(287,88,'$1T+','sv-v sm hot')}`+
    `<rect x="316" y="110" width="38" height="120" class="sv-bar cold"/>${T(335,248,'ביטחון','sv-l sm')}</g>`+
    `<g class="a-up"${d(3.2)}>${T(312,272,'בתוך עשור: עד 2.8 טריליון','sv-l sm hot')}</g>`; }});
  // 6 · r versus g (interactive)
  SC.push({n:'ריבית מול צמיחה', inter:true, svg:()=>
    T(200,28,'הזיזו את המחוונים: מה קורה לחוב בלי לווה שקל?','sv-h')+
    `<line x1="30" y1="200" x2="370" y2="200" class="sv-base"/>`+
    `<g id="st-rg-years">${Array.from({length:11},(_,i)=>`<line x1="${40+i*32}" y1="200" x2="${40+i*32}" y2="206" class="sv-tick"/>`).join('')}</g>`+
    `<polyline id="st-rg-line" class="sv-rg" points=""/>`+
    `<circle id="st-rg-ball" cx="360" cy="150" r="20" class="sv-ball"/>`+
    T(40,222,'היום','sv-l sm')+T(360,222,'בעוד 10 שנים','sv-l sm')+
    `<text id="st-rg-out" x="200" y="252" text-anchor="middle" class="sv-v md"></text>`+
    `<text id="st-rg-dir" x="200" y="276" text-anchor="middle" class="sv-l"></text>`});
  // 7 · the fast part
  SC.push({n:'החלק המהיר', svg:()=>{ const n=5;
    return T(200,30,'ספטמבר 2022: מכירה אחת לוחצת על הבאה','sv-h')+
    `<line x1="20" y1="170" x2="300" y2="170" class="sv-base"/>`+
    `<g class="a-up"${d(.1)}><path d="M290 70 L280 100" class="sv-arrow hot"/>${T(290,62,'23.9: התקציב','sv-l sm hot')}</g>`+
    Array.from({length:n},(_,i)=>{ const k=n-1-i, px=96+i*44; return `<rect x="${px}" y="104" width="16" height="66" rx="2" class="sv-dom ${k===0?'hot':''} a-topple" style="--d:${.6+k*.35}s"/>`; }).join('')+
    `<g class="a-up"${d(2.6)}><path d="M14 176 q34 30 68 0" class="sv-hand"/>${T(64,222,'28.9: הבנק המרכזי קונה','sv-l sm')}${T(64,238,'והשרשרת נעצרת','sv-l sm')}</g>`+
    `<g transform="translate(340 140)"><circle r="42" class="sv-clock"/><path d="M0 0 L0 -36 A36 36 0 1 1 -0.1 -36 Z" class="sv-clock-f a-sweep-clock"${d(1)}/><circle r="4" class="sv-hub"/>${T(0,64,'SVB, מרץ 2023','sv-l sm')}${T(0,80,'קרס תוך 48 שעות','sv-l sm hot')}</g>`+
    T(200,276,'לא הריבית לבדה. חשיפה שאף אחד לא ראה.','sv-h sm'); }});
  // 8 · the fog
  SC.push({n:'האשראי הפרטי', svg:()=>
    T(200,30,'חדלות פירעון באשראי הפרטי, בתוך הערפל','sv-h')+
    `<line x1="40" y1="230" x2="360" y2="230" class="sv-base"/>`+
    [18,22,20,30,38,52,70].map((h,i)=>`<rect x="${58+i*44}" y="${230-h*2}" width="28" height="${h*2}" rx="3" class="sv-bar ${i>4?'hot':''} a-grow"${d(.2+i*.18)}/>`).join('')+
    [[110,150,70],[230,120,80],[320,170,62],[170,200,58]].map(([x,y,r],i)=>`<circle cx="${x}" cy="${y}" r="${r}" class="sv-fog a-drift"${d(i*.7)}/>`).join('')+
    [[120,110],[250,90],[300,150],[190,170]].map(([x,y],i)=>`<text x="${x}" y="${y}" text-anchor="middle" class="sv-qm a-blink"${d(.5+i*.4)}>?</text>`).join('')+
    T(200,262,'(המחשה: המגמה עולה, אבל איש לא רואה את כל התמונה)','sv-l dim')});
  // 9 · the picture
  SC.push({n:'התמונה', svg:()=>
    `<g class="a-conv1"><circle cx="200" cy="150" r="0"/>${coin(70,70,22,'hot')}${T(70,108,'כסף שהתייקר','sv-l')}</g>`+
    `<g class="a-conv2"><rect x="300" y="44" width="56" height="52" rx="8" class="sv-giant"/>${T(328,114,'ענק בתור','sv-l')}</g>`+
    `<g class="a-conv3"><rect x="46" y="196" width="48" height="56" rx="6" class="sv-calc"/>${T(70,226,'✓','sv-ok')}${T(70,270,'הבטחות בלי בדיקה','sv-l')}</g>`+
    `<g class="a-conv4"><circle cx="328" cy="222" r="30" class="sv-fog"/>${T(328,230,'?','sv-qm')}${T(328,270,'חשיפות שאף אחד לא סופר','sv-l')}</g>`+
    `<g class="a-pop"${d(1.6)}><circle cx="200" cy="150" r="46" class="sv-center"/>${T(200,145,'מה שבור','sv-h inv')}${T(200,166,'כאן?','sv-h inv')}</g>`});
  const Y0=2012, Y1=2029, X=y=>40+(y-Y0)/(Y1-Y0)*920, YV=v=>210-v*30;
  const YLD=[[2012,1.8],[2013,2.35],[2014,2.54],[2015,2.14],[2016,1.84],[2017,2.33],[2018,2.91],[2019,2.14],[2020,0.89],[2020.6,0.6],[2021,1.45],[2022,2.95],[2023,3.96],[2023.8,4.9],[2024,4.21],[2025,4.3],[2026,4.5],[2026.77,5.3]];
  const EV=[
   [2016,'bond','2016','האג"ח של 2016 נולדת: צרפת לווה לעשר שנים בחצי אחוז.',1],
   [2020.3,'virus','2020','הקורונה: ריבית אפס, ובנקים מרכזיים קונים אג"ח בעצמם.',1],
   [2022.72,'pension','ספטמבר 2022','בריטניה: קרנות הפנסיה נגררות לשרשרת של מכירות כפויות.',7],
   [2023.2,'bank','מרץ 2023','SVB קורס תוך 48 שעות.',7],
   [2026.1,'barrel','2026','המלחמה באיראן: נפט יקר בכ-40%, והאינפלציה לא יורדת.',2],
   [2026.4,'server','2026','ענקיות הענן מנפיקות אג"ח ב-230 מיליארד דולר.',3],
   [2026.77,'flag','5.10.2026','התשואה על אג"ח ארה"ב ל-10 שנים עוברת 5.3%.',1],
   [2028,'wall','עד 2028','שליש מהחוב הממשלתי בעולם העשיר פוקע ומתגלגל.',5]];
  const ICO={
   bond:'<rect x="-9" y="-12" width="18" height="24" rx="3" class="ti-doc"/><circle cx="-3.5" cy="-3" r="1.6" class="ti-eye"/><circle cx="3.5" cy="-3" r="1.6" class="ti-eye"/><path d="M-4 4 q4 3 8 0" class="ti-line"/>',
   virus:'<circle r="8" class="ti-vir"/>'+[0,1,2,3,4,5,6,7].map(i=>{const a=i*Math.PI/4;return `<line x1="${8*Math.cos(a)}" y1="${8*Math.sin(a)}" x2="${12*Math.cos(a)}" y2="${12*Math.sin(a)}" class="ti-line"/><circle cx="${13*Math.cos(a)}" cy="${13*Math.sin(a)}" r="1.8" class="ti-vir"/>`;}).join(''),
   pension:'<rect x="-11" y="-6" width="22" height="16" rx="7" class="ti-pig"/><circle cx="8" cy="-2" r="1.5" class="ti-eye"/><rect x="-3" y="-11" width="7" height="3" rx="1" class="ti-line-f"/>',
   bank:'<path d="M-12 -4 L0 -12 L12 -4 z" class="ti-doc"/><rect x="-10" y="-4" width="20" height="14" class="ti-doc"/><path d="M-2 -4 L3 2 L-1 6 L3 10" class="ti-crack"/>',
   barrel:'<rect x="-8" y="-11" width="16" height="22" rx="4" class="ti-bar"/><line x1="-8" y1="-3" x2="8" y2="-3" class="ti-line"/><line x1="-8" y1="5" x2="8" y2="5" class="ti-line"/>',
   server:'<rect x="-11" y="-11" width="22" height="22" rx="3" class="ti-doc"/>'+[0,1,2].map(i=>`<line x1="-7" y1="${-6+i*6}" x2="5" y2="${-6+i*6}" class="ti-line"/><circle cx="7" cy="${-6+i*6}" r="1.3" class="ti-led"/>`).join(''),
   flag:'<circle r="12" class="ti-hot"/><text y="4" text-anchor="middle" class="ti-txt">5.3</text>',
   wall:[0,1,2].map(r=>[0,1].map(c=>`<rect x="${-11+c*11+(r%2?5:0)}" y="${-10+r*7}" width="10" height="6" rx="1" class="ti-brick"/>`).join('')).join('')};
  const QZ=[
   ['ממשלה לא לווה אף שקל נוסף, אבל הריבית על החוב שלה גבוהה מקצב הצמיחה. מה קורה לחוב ביחס לכלכלה?',['נשאר אותו דבר','מתכווץ','תופח'],2,'כשהריבית גבוהה מהצמיחה, החוב גדל מהר יותר מהכלכלה, גם בלי הלוואה חדשה. זה הכלל מפרק 6.'],
   ['למה הנזק של ריבית גבוהה מגיע לאט?',['כי ממשלות מסתירות אותו','כי רוב החוב נושא ריבית קבועה, ומתייקר רק כשמגלגלים אותו','כי הריבית עולה בהדרגה'],1,'כל עוד החוב הישן לא פקע, הריבית שלו לא זזה. הנזק מגיע בקצב שבו החוב מתגלגל, כמו האג"ח של 2016.'],
   ['מה הפיל את קרנות הפנסיה בבריטניה ב-2022?',['עליית הריבית לבדה','תגובת שרשרת של מכירות כפויות, בגלל כסף מושאל שאף אחד לא ראה','הונאה של מנהלי הקרנות'],1,'הריבית הייתה הזעזוע הראשון, אבל השרשרת והחשיפה הסמויה הפכו אותו למשבר. זה מה שקרה לקרן של שרה.']];
  return {AV,CAST,WHO,SC,QZ,EV,ICO,
    castLabel:'שתי דמויות שילוו אתכם (בדויות, מבוססות על אירועים אמיתיים)',
    whoLabel:{bond:'ומה זה עושה לאג"ח של 2016',sarah:'ומה זה עושה לשרה',both:'שתי הדמויות'},
    bothKeys:['bond','sarah'],
    inter(sEls){
  (function(){ const sc=sEls[5]; const box=H('div','st-rg');
    const mk=(lab,id,v,min,max)=>{ const l=H('label','st-rg-l'); const s=H('span','',lab); const o=H('b'); const r=H('input'); r.type='range'; r.min=min; r.max=max; r.step=.5; r.value=v; r.id=id; r.setAttribute('aria-label',lab); l.append(s,o,r); box.append(l); return [r,o]; };
    const [ri,ro]=mk('ריבית על החוב','st-r',5,0,8), [gi,go]=mk('צמיחה של הכלכלה','st-g',2,0,8);
    box.hidden=true; document.getElementById('st-stage').insertBefore(box,document.querySelector('.st-sbar')); window.__stRG=box;
    const line=sc.querySelector('#st-rg-line'), ball=sc.querySelector('#st-rg-ball'), out=sc.querySelector('#st-rg-out'), dir=sc.querySelector('#st-rg-dir');
    function draw(){ const r=+ri.value/100, g=+gi.value/100; ro.textContent=ri.value+'%'; go.textContent=gi.value+'%';
      const pts=[]; let dd=110; const yv=v=>200-Math.min(170,v)*.9;
      for(let t=0;t<=10;t++){ pts.push((40+t*32)+','+yv(dd)); if(t<10) dd=dd*(1+r)/(1+g); }
      line.setAttribute('points',pts.join(' ')); ball.setAttribute('cy',yv(dd)); ball.setAttribute('r',Math.max(8,Math.min(34,Math.sqrt(dd)*2)));
      out.textContent='בעוד 10 שנים: '+Math.round(dd)+'% מהתמ"ג (היום 110%)';
      dir.textContent=r>g?'הריבית גבוהה מהצמיחה: החוב תופח מעצמו':r<g?'הצמיחה גבוהה מהריבית: החוב מתכווץ מעצמו':'שוויון: החוב נשאר במקום';
      ball.classList.toggle('hot',r>g); }
    ri.addEventListener('input',draw); gi.addEventListener('input',draw); draw(); })();
    },
    tlSvg(){
    const path=YLD.map(([y,v],i)=>(i?'L':'M')+X(y).toFixed(1)+' '+YV(v).toFixed(1)).join(' ');
    let s=`<svg viewBox="0 0 1000 326" class="tl-svg" role="img" aria-label="ציר זמן מ-2012 עד 2028 עם התשואה על אג"ח ארה"ב ל-10 שנים ואירועי הסיפור">`;
    s+=`<rect x="${X(2012)}" y="40" width="${X(2021.9)-X(2012)}" height="176" class="tl-band"/><text x="${(X(2012)+X(2021.9))/2}" y="58" text-anchor="middle" class="tl-band-t">עידן הכסף הזול</text>`;
    s+=`<rect x="${X(2026.85)}" y="40" width="${X(Y1)-X(2026.85)}" height="176" class="tl-future"/><text x="${(X(2026.85)+X(Y1))/2+8}" y="76" text-anchor="middle" class="tl-band-t dim">ידוע מראש</text>`;
    [0,1,2,3,4,5].forEach(v=>{ s+=`<line x1="40" x2="960" y1="${YV(v)}" y2="${YV(v)}" class="tl-grid"/><text x="34" y="${YV(v)+4}" text-anchor="start" class="tl-ax">${v}%</text>`; });
    for(let y=Y0;y<=2028;y+=2) s+=`<text x="${X(y)}" y="234" text-anchor="middle" class="tl-ax">${y}</text>`;
    s+=`<path d="${path}" class="tl-line"/><circle cx="${X(2026.77)}" cy="${YV(5.3)}" r="6" class="tl-now"/>`;
    s+=`<text x="${X(2016)}" y="${YV(5.6)}" class="tl-cap" text-anchor="start">התשואה על אג"ח ארה"ב ל-10 שנים (בקירוב)</text>`;
    const LV=[262,286,262,286,256,282,306,272]; EV.forEach(([y,ic,lab],i)=>{ const x=X(y), yy=LV[i];
      s+=`<g class="tl-ev" data-i="${i}" tabindex="0" role="button" aria-label="${lab}: ${EV[i][3]}" style="--i:${i}"><line x1="${x}" y1="216" x2="${x}" y2="${yy-14}" class="tl-stem"/><g transform="translate(${x} ${yy})"><circle r="15" class="tl-ic-bg"/>${ICO[ic]}</g></g>`; });
    s+='</svg>';
      return s; },
    qzFin:'<p>ענית נכון על <b></b>. שימו לב: שלוש התשובות הן בדיוק שלושה מקומות שבהם משהו שבור. בשלב הבא נפרוש אותם על הלוח, עם הממצאים. מוכנים?</p><a class="qz-next" href="problems.html">לשלב 02: הבעיות ←</a>'};
};
