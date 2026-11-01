/* Case 02 · stage 07 extra content for the night-sky engine (sky.js). Adds window.EPILOGUE['slow-motion-crisis'].v2.
   start: the brightest star · cast: [avatar svg, name, from, closing line, message id] · lessons: [title, what happened, question]
   quiz: [question, options, correct index, why] · docs: [candidate, pdf slug, peek prefix, kinds] · betLabel: winner name -> label · bridge: html */
(function(){
  const E=window.EPILOGUE&&window.EPILOGUE['slow-motion-crisis']; if(!E) return;
  const BOND='<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="28" fill="#e4efec"/><rect x="17" y="9" width="26" height="40" rx="4" fill="#fffdf8" stroke="#8a7f66" stroke-width="1.4"/><circle cx="25" cy="24" r="2.2" fill="#1e2422"/><circle cx="35" cy="24" r="2.2" fill="#1e2422"/><path d="M25 31 q5 4 10 0" stroke="#1e2422" stroke-width="1.6" fill="none"/><text x="30" y="44" text-anchor="middle" font-size="8" font-weight="700" fill="#b1502e">0.5%</text></svg>';
  const face=(hair,skin,shirt,acc)=>`<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="28" fill="#f3ecd8"/><circle cx="30" cy="27" r="12" fill="${skin}"/><path d="M17 25 q1 -15 13 -15 q13 0 13 15 q-4 -6 -13 -6 q-9 0 -13 6z" fill="${hair}"/><circle cx="26" cy="27" r="1.5" fill="#1e2422"/><circle cx="34" cy="27" r="1.5" fill="#1e2422"/><path d="M26 33 q4 2.5 8 0" stroke="#1e2422" stroke-width="1.5" fill="none"/><path d="M12 58 q4 -16 18 -16 q14 0 18 16z" fill="${shirt}"/>${acc||''}</svg>`;
  const SARAH=face('#8a5a3b','#f2d2b6','#2f6f68','<rect x="22" y="24" width="7" height="5" rx="2" fill="none" stroke="#1e2422" stroke-width="1.2"/><rect x="31" y="24" width="7" height="5" rx="2" fill="none" stroke="#1e2422" stroke-width="1.2"/>');
  E.v2={
   start:'s1',
   castIntro:'ארבע דמויות ליוו את התיק, כולן בדויות. לפני שהאור כבה לגמרי, כל אחת אומרת משפט אחד.', castQ:'ואתם, עם איזו מהן הייתם רוצים לשבת לקפה?',
   cast:[[BOND,'האג"ח של 2016','מתחילת הסיפור','פקעתי. מי שהחליפה אותי משלמת בערך פי שבעה, ומאחוריי עומדות עוד מאות כמוני. את החשבון הזה אפשר היה לחשב מראש, אג"ח אחר אג"ח.','s2'],
    [SARAH,'שרה, מורה ממנצ\'סטר','מהחלק המהיר','הפנסיה שלי שרדה את 2022 כי מישהו התערב בזמן. בפעם הבאה הייתי רוצה שמישהו יראה את זה עוד לפני, ולא יגלה את זה ממני.','s1'],
    [face('#4a2f22','#e9c6a8','#2f5d8a'),'אמה, אנליסטית ברשות פיקוח','מהמרשם','אני עדיין לא רואה אף קרן בודדת. אבל בבוקר של משבר אני יודעת מה המצב של השוק היום, ולא מנחשת אותו.','s13'],
    [face('#1f1a17','#d8a985','#b1502e'),'נועה ברק, עיתונאית כלכלית','מקיר הפקיעות','הכלי שלי נפל באפיון, אבל השאלה שלו נשארה: כמה יעלה החוב, ומתי. ואת זה עוד אפשר לשאול כל בוקר.','s9']],
   lessons:[['לבדוק מה קיים, לפני שכותבים ייזום','Rate-Shock Early Warning נפל בייזום, כשגילינו ששלושה מדדים ציבוריים כבר עושים את זה. חיפוש של שעה לפני הכתיבה היה חוסך מסמך שלם.','מה עוד אפשר לבדוק בשעה, לפני שמשקיעים שבוע?'],
    ['לשאול "מאיפה הנתון?" כבר בייזום','Fire-Sale הגיע עד הארכיטקטורה לפני שהתברר שהקלט המכריע מגיע מבחוץ. השאלה הזו הייתה יכולה להישאל בעמוד הראשון.','כמה רעיונות טובים נשענים על נתון שאף אחד לא אוסף?'],
    ['לכתוב מודל איום מוקדם','מודל האיום שינה את התכנון של שלושת השורדים יותר מכל רעיון אחר. כשהוא מגיע אחרי האפיון, חלק מהעבודה נכתב פעמיים.','מה עוד כדאי לדמיין שמשתבש, לפני שמתחילים?']],
   quiz:[['למה ריבית יורדת יכולה דווקא לייקר חוב של מדינה?',['כי הבנק המרכזי מעלה מסים','כי האג"ח שפוקעות עכשיו הונפקו בריבית נמוכה עוד יותר','כי מדינות לווים יותר כשהריבית יורדת'],1,'החוב שמוחלף עכשיו נלקח בעשור של הכסף הזול. גם ריבית "נמוכה" של היום גבוהה ממנו.'],
    ['מה היה חסר בבריטניה ב-2022 וב-SVB ב-2023, לפי התיק?',['מידע','כסף בבנק המרכזי','מישהו שיחבר את המידע בזמן'],2,'הקרנות ידעו כמה הן ממונפות, והבנק ידע מה יש לו. אף אחד לא ראה את כולם יחד.'],
    ['למה Fire-Sale Cascade Simulator נעצר בבדיקת הסגירה?',['הקוד שלו היה איטי מדי','הנתון שהתשובה תלויה בו מגיע מבחוץ','הוא חשף נתונים של קרנות'],1,'הסימולציה מצוינת, אבל המנוף של היום הוא קופסה ריקה מחוץ לגבולות שלה.']],
   docs:[['Private Exposure Registry','registry','rg',['ideation','poc','spec','arch','adr-log','design']],['Fire-Sale Cascade Simulator','fire-sale','fs',['ideation','poc','spec','arch','adr-log','design']],['Maturity Wall Simulator','maturity-wall','mw',['ideation','poc','spec']],['Rate-Shock Early Warning','rate-shock','rs',['ideation']],['התיק כולו','slow-motion-crisis','c2',['threat-model','decision']]],
   betLabel:{'Private Exposure Registry':'המרשם','Fire-Sale Cascade Simulator':'הסימולציה'},
   bridge:'<p class="ep-kicker">ומכאן</p><h4 class="ep-h">אותו דפוס, תיק אחר</h4><p class="ep-p">בתיק הראשון השאלה הייתה מי עוצר מודל AI שיצא משליטה. גם שם המידע היה מפוזר בין מי שלא סומכים זה על זה, וגם שם הרעיון ששרד הוא כזה שמשאיר עדות שאי אפשר לזייף, במקום לבקש מכולם לסמוך זה על זה. מקרה, או דפוס?</p><a class="ec-go" href="../model-kill-switch/index.html">לתיק הראשון: מי מחזיק את המתג? ←</a>'
  };
})();
