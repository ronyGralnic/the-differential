/* Case 05 · stage 02 cork-board content (the-funnel). Engine: cork.js. Same contract as Case 03/04: {CH,P,POL,POS,ROT,PEEK,DEC}. */
window.CORK=window.CORK||{};
window.CORK['the-funnel']=function(api){
  const {T}=api;
  const CH={
   gap:()=>`<svg viewBox="0 0 300 180" class="ck-svg" role="img" aria-label="מה נכנס היום לראש המשפך, מול מה שצריך ב-2030">
     ${T(150,18,'הכנסות שנתיות, מיליארדי דולרים','ck-th')}<line x1="30" y1="148" x2="285" y2="148" class="ck-ax"/>
     <rect x="60" y="${148-7}" width="60" height="7" rx="2" class="ck-bar"/>${T(90,134,'~200','ck-tl')}${T(90,166,'היום','ck-tl')}
     <rect x="180" y="${148-110}" width="60" height="110" rx="3" class="ck-bar hot"/>${T(210,30,'~3,000','ck-tl hot')}${T(210,166,'נדרש ב-2030','ck-tl hot')}
     <path d="M124 140 Q150 60 176 40" class="ck-brace"/>${T(150,84,'פי 15','ck-tl hot')}</svg>`,
   flow:()=>`<svg viewBox="0 0 300 180" class="ck-svg" role="img" aria-label="המשפך: הכסף נכנס למעלה ויורד לשבבים, זיכרון, דאטה סנטרים וחשמל">
     ${T(150,18,'מי חי מהזרם (המחשה)','ck-th')}
     <path d="M40 30 H260 L180 100 V160 H120 V100 Z" class="ck-hbar"/>
     ${[['מפתחי מודלים',46],['שבבים',72],['זיכרון',96],['דאטה סנטרים',122],['חשמל',146]].map(([l,y],i)=>T(150,y,l,i?'ck-tl':'ck-tl hot')).join('')}</svg>`,
   proxies:()=>`<svg viewBox="0 0 300 180" class="ck-svg" role="img" aria-label="צמיחה תלת-חודשית לפי מודל על מדדים עקיפים: מ-80-90% באביב ל-12% באוקטובר">
     ${T(150,18,'צמיחה תלת-חודשית, לפי מודל על מדדים עקיפים','ck-th')}<line x1="30" y1="148" x2="285" y2="148" class="ck-ax"/>
     <polyline points="50,${148-85} 110,${148-80} 170,${148-50} 230,${148-25} 270,${148-12}" fill="none" stroke="#c0392b" stroke-width="3"/>
     ${T(60,52,'80-90%','ck-tl hot')}${T(266,126,'12%','ck-tl hot')}${T(60,166,'אביב','ck-tl')}${T(266,166,'אוקטובר','ck-tl')}
     ${T(150,178,'מקור: The Economist, לפי Ramp ו-TickerTrends','ck-tl dim')}</svg>`,
   signals:()=>`<svg viewBox="0 0 300 180" class="ck-svg" role="img" aria-label="שלושה מדדים עקיפים שמצביעים לכיוונים שונים">
     ${T(150,18,'מה המדדים אומרים, באותו חודש','ck-th')}
     ${[['Ramp: כרטיסי אשראי','↘','hot'],['TickerTrends: פאנלים','↘','hot'],['OpenRouter: תנועת API','↗','']].map(([l,a,c],i)=>`<rect x="40" y="${36+i*40}" width="220" height="30" rx="5" class="ck-hbar"/>${T(250,56+i*40,l,'ck-tl','start')}${T(64,57+i*40,a,'ck-tl '+c)}`).join('')}
     ${T(150,170,'אותו שוק, שלוש תמונות','ck-tl hot')}</svg>`,
   router:()=>`<svg viewBox="0 0 300 180" class="ck-svg" role="img" aria-label="שורת קוד אחת שמחליפה ספק מודל">
     ${T(150,18,'כמה עולה לעבור ספק?','ck-th')}
     <rect x="30" y="50" width="240" height="60" rx="6" fill="#1e2422"/>
     <text x="44" y="76" fill="#e8e2d0" font-family="monospace" font-size="12" direction="ltr" text-anchor="start">model = "provider-a/model-x"</text>
     <text x="44" y="98" fill="#e0b45a" font-family="monospace" font-size="12" direction="ltr" text-anchor="start">model = "provider-b/model-y"</text>
     ${T(150,136,'שורה אחת. בלי חוזה, בלי מעבר נתונים','ck-tl hot')}${T(150,158,'OpenRouter · Cursor · Instinct','ck-tl dim')}</svg>`,
   lag:()=>`<svg viewBox="0 0 300 180" class="ck-svg" role="img" aria-label="המודל הסיני הטוב ביותר מגיע לרמה של המודל האמריקאי המוביל בערך חצי שנה אחריו">
     ${T(150,18,'מדד היכולות של Epoch (המחשה של הפער)','ck-th')}<line x1="30" y1="148" x2="285" y2="148" class="ck-ax"/>
     <polyline points="40,130 100,104 160,80 220,58 270,40" fill="none" stroke="#2f6f68" stroke-width="3"/>
     <polyline points="100,130 160,104 220,80 270,62" fill="none" stroke="#c0392b" stroke-width="3" stroke-dasharray="6 4"/>
     <path d="M160 80 H220" class="ck-brace"/>${T(190,72,'כחצי שנה','ck-tl hot')}
     ${T(60,166,'אמריקאי מוביל','ck-tl')}${T(220,166,'סיני מוביל','ck-tl hot')}</svg>`,
   cost:()=>`<svg viewBox="0 0 300 180" class="ck-svg" role="img" aria-label="עלות כוללת לפי מספר לקוחות: בתוכנה רגילה כמעט שטוחה, במודל עולה עם כל לקוח">
     ${T(150,18,'עלות כוללת, לפי מספר לקוחות (המחשה)','ck-th')}<line x1="30" y1="148" x2="285" y2="148" class="ck-ax"/>
     <polyline points="40,84 150,80 270,76" fill="none" stroke="#2f6f68" stroke-width="3"/>${T(250,68,'תוכנה: בונים פעם אחת','ck-tl')}
     <polyline points="40,140 150,98 270,44" fill="none" stroke="#c0392b" stroke-width="3"/>${T(230,36,'מודל: כל שאילתה עולה','ck-tl hot')}
     ${T(150,166,'מספר לקוחות ←','ck-tl dim')}</svg>`,
   margin:()=>`<svg viewBox="0 0 300 180" class="ck-svg" role="img" aria-label="שולי רווח גולמי של 85%, ומה נשאר מחוץ להם">
     ${T(150,18,'מכל 100 דולר הכנסה (חציון ראשון)','ck-th')}
     <rect x="40" y="50" width="220" height="34" rx="4" class="ck-hbar"/><rect x="40" y="50" width="${220*.15}" height="34" rx="4" class="ck-bar hot"/>
     ${T(57,72,'15','ck-tl inv')}${T(160,72,'85: רווח גולמי','ck-tl')}
     ${T(150,112,'ומחוץ לחשבון: האימון של המודל הבא','ck-tl hot')}${T(150,134,'שכל אחד יקר מהקודם','ck-tl')}
     ${T(150,170,'מקור: The Economist, נתוני Anthropic','ck-tl dim')}</svg>`,
   votes:()=>`<svg viewBox="0 0 300 180" class="ck-svg" role="img" aria-label="40 מתוך 41 משאלי עם הגבילו דאטה סנטרים">
     ${T(150,18,'משאלי עם מקומיים, נובמבר 2026','ck-th')}
     ${Array.from({length:41},(_,i)=>`<rect x="${26+(i%14)*18}" y="${34+Math.floor(i/14)*22}" width="13" height="16" rx="2" class="ck-coin ${i<40?'hot':''}"/>`).join('')}
     ${T(150,124,'40 מתוך 41: להגביל','ck-tl hot')}${T(150,146,'ליד אתרים: תנודה של כ-5 נקודות','ck-tl')}
     ${T(150,170,'מקור: The Economist','ck-tl dim')}</svg>`,
   gw:()=>`<svg viewBox="0 0 300 180" class="ck-svg" role="img" aria-label="25.6 ג'יגהוואט שעוד לא התחילו, מול קיבולת הדאטה סנטרים של אמריקה היום">
     ${T(150,18,'ג\'יגהוואט (בקירוב)','ck-th')}<line x1="30" y1="148" x2="285" y2="148" class="ck-ax"/>
     <rect x="60" y="${148-110}" width="70" height="110" rx="3" class="ck-bar"/>${T(95,30,'היום: כ-52 (נגזר)','ck-tl')}${T(95,166,'כל הקיבולת','ck-tl')}
     <rect x="180" y="${148-55}" width="70" height="55" rx="3" class="ck-bar hot"/>${T(215,84,'25.6','ck-tl hot')}${T(215,166,'בסיכון הקפאה','ck-tl hot')}
     ${T(150,178,'מקור: SemiAnalysis, לפי הדיווח','ck-tl dim')}</svg>`};
  const P=[
   {id:'main', tag:'הבעיה המרכזית', title:'זרם שאף אחד לא רואה', color:'yellow', q:'איך יודעים בזמן אם הכסף בראש המשפך יגיע, לפני שהחשבון בתחתית מגיע?',
    def:'בנייה של דאטה סנטרים, שבבים וחשמל מתוכננת לשנים קדימה, ומשלמים עליה עכשיו. ההכנסות שאמורות להחזיר אותה מגיעות טיפין טיפין, מלקוחות שיכולים לעבור לספק אחר בכל רגע. כדי שהחשבון ייסגר, הזרם בראש המשפך צריך לגדול פי 15 תוך ארבע שנים בערך. והבעיה: אף אחד מבחוץ לא רואה את הזרם הזה בזמן אמת. לא את הגודל שלו, לא את הקצב, ולא כמה עולה כל דולר שנכנס.',
    ev:[['chart','gap','גרף: היום מול 2030'],
        ['polar','both','ג\'ייק ורוזה','"אני מחליט כל חודש כמה כסף נכנס למשפך. היא מחכה למטה לדעת אם הוא יגיע. אף אחד מאיתנו לא רואה את הצינור."'],
        ['list','','מה כבר ידוע, ומה לא',['✓ כמה מתוכנן להיבנות, ובאיזה מחיר','✓ ההכנסות בקצב שנתי, כשהחברות בוחרות לפרסם','✗ כמה עולה באמת כל שאילתה, ולמי','✗ האם הצמיחה מאטה, עכשיו, ולא בעוד רבעון']],
        ['clip','','בשורה אחת','הבנייה נמדדת בבטון. ההכנסה נמדדת בניחושים.']]},
   {id:'fog', tag:'בעיה 01', title:'ערפל המספרים', color:'blue', q:'איך מודדים זרם, כשהצינור סגור?',
    def:'רוב השחקנים הגדולים פרטיים, ולכן קשה לעקוב אחרי ההכנסות שלהם. הם מפרסמים "הכנסה בקצב שנתי" מתי שנוח להם. כולם נשענים על מדדים עקיפים: Ramp עוקבת אחרי כרטיסי אשראי של חברות, TickerTrends אחרי פוסטים ודפוסי הוצאה. מודל שמחבר אותם מראה שהצמיחה התלת-חודשית ירדה מ-80-90% באביב ל-12% באוקטובר. אבל OpenRouter מראה באותו זמן זינוק. אותו שוק, שלוש תמונות.',
    ev:[['chart','proxies','גרף: הצמיחה לפי המדדים'],['chart','signals','איור: שלוש תמונות'],
        ['polar','chao','ד"ר הלן צ\'או, חזאית לשעבר (בדויה)','"בתחזית מזג אוויר בודקים כל ערב מה ירד בפועל. כאן התשובה הנכונה מגיעה פעם ברבעון, אם בכלל."'],
        ['sticky','','פתק','רמז הוא לא מספר.']]},
   {id:'moat', tag:'בעיה 02', title:'אין חפיר', color:'pink', q:'מה מחזיק לקוח, כשהמתחרה במרחק שורת קוד?',
    def:'תוכנה רגילה נשענה על עלות מעבר גבוהה ועל אפקט רשת. במודלים זה הפוך: מעבר הוא שינוי של שורה, וצ\'טבוט אחד נראה כמו אחר. מה שמחזיק את המחיר הוא רק להיות הכי טוב, וזה מחזיק שבועות או חודשים, עד שמודל חדש עוקף. ובינתיים, מודלים זולים, גם סיניים, נמצאים בערך חצי שנה מאחור, ומודל קטן ומכוונן כבר ניצח את הגדולים במשימה פיננסית.',
    ev:[['chart','router','איור: שורת המעבר'],['chart','lag','גרף: חצי שנה מאחור'],
        ['polar','jake','ג\'ייק מורנו, CTO באוסטין (בדוי)','"היינו נאמנים לספק אחד שלושה חודשים. זה שיא אצלנו."'],
        ['sticky','','פתק','חלון של שבועות להחזיר מיליארדים.']]},
   {id:'cost', tag:'בעיה 03', title:'כל שאילתה עולה כסף', color:'green', q:'כמה באמת עולה תשובה אחת, ומי יודע?',
    def:'בתוכנה רגילה, אחרי שבנית את המוצר, לקוח נוסף כמעט לא עולה. במודל, כל שאילתה רצה בדאטה סנטר יקר, על שבב נדיר. שולי הרווח הגולמי של Anthropic בחציון הראשון היו 85%, נתון של חברת תוכנה. אבל כל קפיצה ביכולת יקרה יותר מהקודמת, והמחירים יורדים. מי שמוכר, ומי שקונה, צריכים לדעת כמה עולה כל תשובה, לכל לקוח ולכל שימוש. רוב הזמן, אף אחד לא יודע.',
    ev:[['chart','cost','גרף: עוד לקוח'],['chart','margin','איור: מ-100 דולר'],
        ['polar','marco','מרקו ריצ\'י, שף לשעבר, היום מהנדס FinOps (בדוי)','"במסעדה ידעתי כמה עולה כל מנה, עד הגרם. בענן, הלקוחות שלי לא יודעים כמה עולה תשובה אחת."'],
        ['sticky','','פתק','85% של מה? ועל איזה שימוש?']]},
   {id:'ground', tag:'בעיה 04', title:'הקרקע זזה', color:'orange', q:'מה קורה לחשבון, כשהשכנים מצביעים נגד?',
    def:'בבחירות האמצע, ה-AI "עמד על הקלפי" והפסיד. ליד אתרי דאטה סנטר, בוחרים זזו בכ-5 נקודות לדמוקרטים, ו-40 מתוך 41 משאלי עם הגבילו בנייה. בטקסס, שבה כשליש מהבנייה, נבחרה מושלת שקראה להשהיה. במדינות כאלה יש 25.6 ג\'יגהוואט שעוד לא התחילו, ומתוכננים ל-2028. מצד שני, דאטה סנטרים רווחיים מספיק כדי לשלם לקהילות, ואפשר להגיע להסכמים.',
    ev:[['chart','votes','איור: 40 מתוך 41'],['chart','gw','גרף: מה בסיכון'],
        ['polar','rosa','רוזה דלגדו, חשמלאית וחברת מועצה (בדויה)','"הצבעתי בעד הקפאה, ואני עובדת באתר. אף אחד לא סיפר לנו כמה מים וחשמל זה ייקח, ומה העיר מקבלת בתמורה."'],
        ['clip','','גזיר מהעיתון','"לא שאני שונאת דאטה סנטרים" · ג\'ינה הינוחוסה, אחרי הבחירות']]}];
  const face=(x,y,hair,skin='#e3b48f',top='#2f6f68')=>`<circle cx="${x}" cy="${y}" r="14" fill="${skin}"/><path d="M${x-15} ${y-2} q1 -16 15 -16 q14 0 15 16 q-4 -7 -15 -7 q-11 0 -15 7z" fill="${hair}"/><circle cx="${x-5}" cy="${y}" r="1.8" fill="#1e2422"/><circle cx="${x+5}" cy="${y}" r="1.8" fill="#1e2422"/><path d="M${x-14} ${y+40} q2 -22 14 -22 q12 0 14 22z" fill="${top}"/>`;
  const POL={
   both:`<svg viewBox="0 0 120 90"><rect width="120" height="90" fill="#e3e6ee"/>${face(36,40,'#3a2a1e','#d9a77e','#2c3e5a')}${face(84,40,'#1e1a18','#c88f66','#7a5a3a')}<path d="M50 20 H70 L64 30 V36 H56 V30Z" fill="none" stroke="#c0392b" stroke-width="2"/></svg>`,
   chao:`<svg viewBox="0 0 120 90"><rect width="120" height="90" fill="#e6ecf2"/><circle cx="88" cy="34" r="14" fill="none" stroke="#3b5b8a" stroke-width="3"/><line x1="88" y1="34" x2="96" y2="26" stroke="#c0392b" stroke-width="3"/><path d="M70 66 q18 -16 36 0" stroke="#3b5b8a" stroke-width="2" fill="none"/>${face(38,38,'#111','#e9c4a2','#3b5b8a')}</svg>`,
   jake:`<svg viewBox="0 0 120 90"><rect width="120" height="90" fill="#e8ecef"/><rect x="66" y="22" width="44" height="30" rx="3" fill="#1e2422"/><text x="88" y="42" text-anchor="middle" font-size="9" fill="#e0b45a" font-family="monospace">model=B</text><rect x="80" y="52" width="16" height="6" fill="#1e2422"/>${face(36,38,'#3a2a1e','#d9a77e','#2c3e5a')}</svg>`,
   marco:`<svg viewBox="0 0 120 90"><rect width="120" height="90" fill="#efe9de"/><rect x="70" y="20" width="36" height="46" rx="3" fill="#fffaf0" stroke="#1e2422"/>${[0,1,2,3].map(i=>`<line x1="76" y1="${30+i*9}" x2="100" y2="${30+i*9}" stroke="#9aa" stroke-width="2"/>`).join('')}<text x="88" y="62" text-anchor="middle" font-size="8" fill="#c0392b">$0.0042</text><path d="M24 22 q12 -10 24 0 v6 h-24z" fill="#fffaf0" stroke="#1e2422"/>${face(36,40,'#5a3a22','#e3b48f','#fffaf0')}</svg>`,
   rosa:`<svg viewBox="0 0 120 90"><rect width="120" height="90" fill="#efe6d6"/><rect x="74" y="26" width="30" height="40" fill="#5a6378"/>${[0,1,2,3].map(i=>`<rect x="78" y="${30+i*9}" width="22" height="4" fill="#e0b45a" opacity=".8"/>`).join('')}<path d="M64 70 l6 -12 l-4 0 l6 -12" stroke="#c0392b" stroke-width="2" fill="none"/>${face(36,40,'#1e1a18','#c88f66','#7a5a3a')}<path d="M22 28 q14 -16 28 0 v2 h-28z" fill="#e0b45a"/></svg>`};
  const POS={main:[50,46],fog:[18,24],moat:[82,22],cost:[20,74],ground:[80,74]};
  const ROT={main:-1.5,fog:-4,moat:3,cost:2.5,ground:-3};
  const PEEK={main:'clip',fog:'polar',moat:'chart',cost:'chart',ground:'polar'};
  const DEC=[
   ['ck-coffee',{left:'60%',top:'6%'}],['ck-smear',{left:'30%',top:'48%'}],['ck-arrow',{left:'67%',top:'27%'},'!!'],
   ['ck-check',{left:'4%',top:'50%'},'לבדוק!'],['ck-stamp',{left:'70%',top:'47%'},'THE DIFFERENTIAL · CASE 05'],
   ['ck-circle',{left:'40%',top:'14%'},'פי 15']];
  return {CH,P,POL,POS,ROT,PEEK,DEC};
};
