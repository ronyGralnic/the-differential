/* Stage 04 · the reel, upgraded (Case 02, data in FX below):
   - every chapter looks like its document (ideation = napkin sketch, POC = lab bench, spec = feature cards, architecture = blueprint)
   - a live background per candidate, a peek at the real PDF, one interactive moment per chapter, and the recurring character
   - the journey tree fills its side branches as the reader finishes reels (stored per viewer, no spoilers up front) */
(function(){
  const reel=document.getElementById('reel'), scenes=document.getElementById('reel-scenes'), titleEl=document.getElementById('reel-title');
  if(!reel||!scenes) return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const H=(t,c,x)=>{ const e=document.createElement(t); if(c) e.className=c; if(x!=null) e.textContent=x; return e; };
  const KIND={'ייזום':'ideation','מחקר ו-POC':'poc','אפיון':'spec','ארכיטקטורה':'arch','מסמך עיצוב':'design','על הלוח':'board'};
  const KLAB={board:'על הלוח · כרטיס בטוש',ideation:'מסמך ייזום · שרטוט על מפית',poc:'מחקר ו-POC · שולחן המעבדה',spec:'אפיון · כרטיסי הפיצ\'רים',arch:'ארכיטקטורה · השרטוט ההנדסי',design:'מסמך עיצוב · מחברת המהנדס'};
  const SARAH='<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="28" fill="#2c3b3a"/><path d="M14 26 q2 -16 16 -16 q14 0 16 16 q-4 -6 -16 -6 q-12 0 -16 6z" fill="#8a5a3b"/><circle cx="30" cy="30" r="12" fill="#f2d2b6"/><circle cx="26" cy="29" r="1.6" fill="#1e2422"/><circle cx="34" cy="29" r="1.6" fill="#1e2422"/><path d="M26 35 q4 3 8 0" stroke="#1e2422" stroke-width="1.6" fill="none"/><path d="M12 58 q4 -14 18 -14 q14 0 18 14z" fill="#6fbdb3"/><rect x="22" y="26" width="7" height="5" rx="2" fill="none" stroke="#1e2422" stroke-width="1.2"/><rect x="31" y="26" width="7" height="5" rx="2" fill="none" stroke="#1e2422" stroke-width="1.2"/></svg>';
  const tm=(id,w)=>`<button class="tm" data-t="${id}">${w}</button>`;

  /* ---------------- Fire-Sale chapters ---------------- */
  const FS={
   peek:'../../assets/img/peek/fs-', pdf:'downloads/fire-sale-',
   ch:[
    {kind:'ideation', ctx:'שני משברים פרצו בשנים האחרונות כמעט בן לילה. ב-2022 בבריטניה, קרנות הפנסיה עמדו על סף קריסה בתוך ימים. ב-2023 בארה"ב, הבנק SVB קרס בתוך 48 שעות. בשני המקרים הריבית עלתה, אבל לא היא הפילה אותם.',
     ex:[`שרה, מורה למתמטיקה מבריטניה (דמות בדויה), חוסכת בקרן הפנסיה של מורי מנצ'סטר (גם היא בדויה). כדי להרוויח יותר, הקרן לוותה כסף וקנתה בו אג"ח, ובתמורה הפקידה אצל המלווה ${tm('collateral','ביטחונות')}, כמו משכון.`,
         'בוקר אחד הריבית קופצת. האג"ח שבידי הקרן שוות פתאום פחות, כי אג"ח חדשות משלמות יותר.',
         'המלווה מתקשר: "תוסיפו ביטחונות עד מחר". לקרן אין מזומן, אז היא מוכרת אג"ח.',
         'אבל עשרות קרנות קיבלו את אותה שיחה, וכולן מוכרות באותו יום. המחירים צונחים עוד, והשיחה הבאה מגיעה כבר בצהריים.'],
     punch:'זו תגובת שרשרת. מה שמפיל את הקרנות הוא לא הזעזוע הראשון, אלא המכירות שהזעזוע מכריח.',
     idea:[['השחקנים',`עשרות קרנות ובנקים מדומים. לכל אחד ${tm('balance','מאזן')}, כלומר רשימה של מה יש לו ומה הוא חייב, וכללים משלו: כמה ${tm('leverage','כסף מושאל')} מותר לו להחזיק, ומתי הוא נאלץ למכור.`],['הזעזוע','לוחצים על כפתור ומזריקים עליית ריבית.'],['המעקב','צופים בשוק סבב אחרי סבב: מי קיבל את השיחה, מי מכר, בכמה ירד המחיר, ומי נפל בעקבות זה.'],['הניסוי','בודקים מה היה קורה אילו הבנק המרכזי היה מתערב יום אחד קודם.']],
     sarah:'"אם היה כלי כזה ב-2022, מישהו היה רואה את השיחה לקרן שלי מגיעה?"'},
    {kind:'poc', ctx:'לפני שבונים מוצר שלם, בודקים אם הליבה בכלל עובדת. זה ה-POC, הוכחת היתכנות: גרסה קטנטנה שעונה על שאלה אחת. כמו לבנות דגם של גשר מקרשים לפני שיוצקים בטון. כאן השאלה: האם מעגל של מכירות כפויות באמת מגדיל זעזוע קטן?',
     ex:['בנינו 60 קרנות מדומות, כולן עם כסף מושאל, וכולן מחזיקות את אותה אג"ח ארוכה. הזרקנו עליית ריבית של 0.6 נקודת אחוז, כמו ביום שאחרי התקציב הבריטי.',
         'התוצאה הראשונה: הזעזוע הוגבר כמעט פי 2, מ-0.6 ל-1.13. המכירות עצמן הוסיפו עוד חצי נקודה.',
         'התוצאה השנייה: כשבנק מרכזי קנה חלק ממה שנמכר, המעגל נשבר באמצע.',
         'ואז הסריקה. במציאות אף אחד לא יודע כמה מנוף יש בשוק, אז הרצנו 300 עולמות אקראיים לכל רמת מנוף. עד מנוף ממוצע של 4 (על כל שקל של הקרן, עוד שלושה מושאלים) אין ספירלה באף עולם. ב-5.5 היא מופיעה כמעט בכולם.'],
     punch:'התשובה קופצת מ"בטוח" ל"קריסה" בתוך נקודה אחת של מנוף. הזיזו את המחוון ותראו בעצמכם.',
     sarah:'"אז השאלה אם הקרן שלי בסכנה תלויה במספר אחד, שאף אחד לא יודע?"'},
    {kind:'spec', ctx:'אחרי שהליבה עבדה, כותבים אפיון: מסמך שמתאר את המוצר המלא, פיצ\'ר אחרי פיצ\'ר, כאילו מחר מתחילים לבנות אותו. פיצ\'ר הוא יכולת אחת של המוצר, למשל "לבנות שוק מדומה" או "להראות טווח של תוצאות".',
     ex:['הסימולטור המלא יודע לבנות חמישה סוגי גופים: קרנות פנסיה, בנקים, מבטחים, קרנות כספיות וקרנות אשראי.',
         'הוא מעביר נזק בשני ערוצים: דרך מחירים שיורדים לכולם בבת אחת, ודרך חובות ישירים בין גופים, כשאחד לא מחזיר לשני.',
         'הוא בודק ארבע התערבויות שקרו באמת, כמו הקנייה של הבנק המרכזי הבריטי בספטמבר 2022.',
         'ועיקרון אחד מעל הכול: הוא אף פעם לא נותן מספר אחד. כל תוצאה יוצאת כטווח, כמו "תגיעו בעוד 25 עד 40 דקות" בוויז, יחד עם הפרמטר שהכי אחראי לאי-הוודאות.'],
     punch:'עשרה פיצ\'רים בארבע שכבות: העולם, המפל, השאלות והאמון. גררו את העכבר על הכרטיסים כדי לראות לאן כל אחד שייך.',
     sarah:'"כלומר אפשר לשאול אותו "מה אם" שוב ושוב, ולקבל טווח ולא הבטחה?"'},
    {kind:'arch', ctx:'האפיון אומר מה בונים. הארכיטקטורה אומרת איך: אילו תוכנות, איפה כל אחת רצה, ומה עובר ביניהן. כמו התוכנית של אדריכל, אחרי שכבר יודעים כמה חדרים יהיו בבית.',
     ex:['שרטטנו את הסימולטור מקצה לקצה. הכול רץ אצל המשתמש, בדפדפן שלו, ושום מאזן לא יוצא מהמחשב שלו. כך אפשר להזין אותו גם בנתונים רגישים.',
         'ואז הגיעה בדיקת הסגירה: עוברים על כל קלט שהמערכת צריכה, ושואלים מאיפה הוא מגיע ומי אחראי עליו.',
         'כמעט הכול נמצא בתוך הגבולות. חוץ מדבר אחד, הכי חשוב: מי מחזיק היום כמה אג"ח, ובאיזה מנוף.',
         'הנתון הזה לא נמצא אצל אף רכיב, ואין רכיב שיכול להביא אותו. בשרטוט הוא נשאר קופסה מקווקוות עם סימן שאלה, מחוץ לקו הגבול.'],
     punch:'לחצו על הקופסה עם סימן השאלה כדי לראות מה חסר בתוכה.',
     sarah:'"אז הכלי יודע מה יקרה לקרן שלי. רק אם מישהו יגיד לו מה יש בה."'}],
   cut:{lines:['למה? לא בגלל באג, ולא כי משהו לא עבד. כל מה שבתוך הגבולות שלו עובד היטב.',
               'הוא נפל כי ההבטחה המרכזית שלו היא לומר משהו על השוק של היום: אם הריבית תקפוץ מחר, מי ייפול? כדי לענות, הוא צריך לדעת כמה כסף מושאל יש היום בכל קרן.',
               'את זה אף אחד לא יודע, וגם הוא לא יכול לגלות. אז הוא יכול רק לנחש טווח, ולהריץ על הניחוש.',
               'דמיינו תחזית מזג אוויר מושלמת, שיודעת בדיוק איך עננים זזים ומתי הם הופכים לגשם. אבל אין לה מדחום ואין לה לוויין, אז היא לא יודעת מה קורה בשמיים עכשיו. היא יכולה לומר "אם עכשיו יש עננים כבדים, מחר יירד גשם", אבל לא אם מחר יירד גשם.',
               'והניחוש קובע הכול: ה-POC הראה שבין מנוף ממוצע של 4 ל-5.5 התשובה קופצת מ"שקט" ל"קריסה". על השאלה "מה המצב עכשיו?" הוא עונה "זה תלוי".'],
        punch:'סימולציה מצוינת שמוזנת בניחוש, מוציאה ניחוש מצוין.',
        sarah:'"הוא יכול להראות לי כל תרחיש אפשרי. רק לא את זה שבאמת קורה."',
        q:'ומי כן יכול לדעת מה יש בקופסה?'}};
  /* ---------------- Registry chapters (the recurring character is Emma, the regulator's analyst) ---------------- */
  const EMMA='<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="28" fill="#2c3b3a"/><circle cx="30" cy="28" r="12" fill="#e9c6a8"/><path d="M16 27 q1 -16 14 -16 q14 0 14 16 q-2 -8 -9 -9 q-6 4 -19 9z" fill="#4a2f22"/><path d="M16 27 q-2 12 2 18 M44 27 q2 12 -2 18" stroke="#4a2f22" stroke-width="4" fill="none"/><circle cx="26" cy="28" r="1.6" fill="#1e2422"/><circle cx="34" cy="28" r="1.6" fill="#1e2422"/><path d="M26 34 q4 2.5 8 0" stroke="#1e2422" stroke-width="1.6" fill="none"/><path d="M12 58 q4 -14 18 -14 q14 0 18 14z" fill="#2f5d8a"/><rect x="27" y="47" width="6" height="8" rx="1" fill="#e4efec"/></svg>';
  const RG={
   peek:'../../assets/img/peek/rg-', pdf:'downloads/registry-', char:{name:'אמה',svg:EMMA}, ideaH:'הרעיון: לחבר סודות בלי לפתוח אותם',
   ch:[
    {kind:'ideation', ctx:'אחרי כל משבר פיננסי גדול מתגלה אותו דבר: גופים רבים החזיקו את אותו סיכון בדיוק, וכל אחד מהם חשב שהוא לבד. הרגולטורים ראו כל גוף בנפרד, ואף אחד לא ראה את השלם. היום זה קורה שוב בשוק האשראי הפרטי: הלוואות שקרנות נותנות ישירות לחברות, בלי בנק ובלי בורסה, ובלי שמישהו רואה את כל התמונה.',
     ex:['תחשבו על עשר קרנות, וכל אחת מלווה לחברות תוכנה בריבית משתנה. כל קרן יודעת בדיוק כמה היא '+tm('exposure','חשופה')+'. אף אחת לא יודעת שגם תשע האחרות עשו את אותו הדבר.',
         'אם הריבית עולה, כל חברות התוכנה מתקשות לשלם באותו זמן. עשר הקרנות נפגעות יחד, ומה שנראה כמו עשרה סיכונים קטנים הוא בעצם סיכון אחד גדול.',
         'למה אף אחד לא רואה? כי הנתונים סודיים. קרן לא תחשוף את ההלוואות שלה למתחרים, והרגולטורים בשלוש מדינות לא מורשים להעביר נתונים זה לזה.',
         'זה פרדוקס הסודיות: כל אחד יודע הכול על עצמו, ואף אחד לא יודע כלום על השלם.'],
     punch:'הסכנה הגדולה היא לא הסיכון שכולם רואים. היא הסיכון שאף אחד לא יכול לראות, כי הוא מפוזר בין סודות.',
     idea:[['הפיצול','כל קרן לוקחת כל מספר שלה, למשל "100 מיליון בחברות תוכנה", ומפרקת אותו לשלושה מספרים אקראיים שסכומם 100. כל חלק לבדו הוא ג\'יבריש.'],['השרתים','כל חלק הולך לשרת אחר, אצל רשות אחרת. כל שרת מחבר רק את החלקים שקיבל מכל הקרנות.'],['התשובה','רק כששלושת הסכומים מתחברים, יוצא מספר אחד: החשיפה של כל השוק יחד. אף אחד לא ראה קרן בודדת.'],['ההגנה','שאלה שעלולה לחשוף קרן אחת, למשל ענף שיש בו רק שתי קרנות, לא נענית בכלל.']],
     sarah:'"אני רואה כל קרן בנפרד. מה שאני לא רואה זה שכולן עשו את אותו ההימור."'},
    {kind:'poc', ctx:'לפני שבונים מוצר שלם, בודקים אם הליבה בכלל עובדת. זה ה-POC, הוכחת היתכנות: גרסה קטנטנה שעונה על שאלה אחת. כאן השאלה: האם אפשר לחבר נתונים של מאות קרנות לתמונה אחת ומדויקת, בלי שאף שרת יראה נתון של קרן בודדת, ובזמן סביר?',
     ex:['בנינו 500 קרנות מדומות. לכל אחת ספר הלוואות: כמה כסף בכל ענף, ובאיזו ריבית. כל מספר התפצל לשלושה חלקים, וכל חלק הלך לשרת אחר.',
         'התוצאה הראשונה: הסכום יצא מדויק עד היחידה האחרונה, תוך 0.11 שניות.',
         'התוצאה השנייה: ניסינו להציץ. שרת אחד שמסתכל על החלק שלו לא יכול להבחין בין 0 למיליון. שני שרתים שמשתפים פעולה מקבלים מספר אקראי ענק. רק שלושתם יחד מקבלים את הערך.',
         'התוצאה השלישית: בענף נדיר עם שתי קרנות, אחת יכלה לגלות את השנייה מתוך הסכום. סף של חמש קרנות לתא חסם את זה, ורעש פרטיות קטן השאיר את התשובה המרכזית שימושית: 17.5% במקום 16.8% האמיתיים.'],
     punch:'החישוב עובד. אבל ה-POC חשף שאלה שהמתמטיקה לא עונה עליה: השיטה שומרת על סוד, לא על אמת. מה אם קרן משקרת?',
     sarah:'"כלומר אני יכולה לקבל את המספר של כל השוק, בלי לבקש מאף קרן לחשוף את עצמה?"'},
    {kind:'spec', ctx:'אחרי שהליבה עבדה, כותבים אפיון: מסמך שמתאר את המוצר המלא, פיצ\'ר אחרי פיצ\'ר, כאילו מחר מתחילים לבנות אותו. פיצ\'ר הוא יכולת אחת של המוצר, למשל "לזהות קרן בלי לדעת מי היא" או "לחסום שאלה מסוכנת".',
     ex:['כרטיס כניסה עיוור: כל קרן מקבלת אסימון שמוכיח שהיא גוף מפוקח אמיתי, בלי שהשרתים יודעים מי היא. כמו פתק הצבעה עם חותמת של ועדת הקלפי, בלי שם.',
         'מעטפה חתומה: לפני שהנתונים מתפצלים, הקרן נועלת אותם ב"התחייבות" ורושמת אותה ביומן ציבורי. כך אפשר לבדוק אחר כך שאף שרת לא שינה את הסכום.',
         'הליבה נשענת על סטנדרט בפיתוח של IETF, הגוף שקובע את תקני האינטרנט, ועל קוד שכבר רץ בשימוש אמיתי לספירה של נתונים פרטיים.',
         'ומה הוא לא עושה: הוא מראה את התמונה של היום, לא את מה שיקרה לה מחר.'],
     punch:'עשרה פיצ\'רים בארבע שכבות: אצל המשתתף, בין השרתים, השער והשקיפות. גררו את העכבר על הכרטיסים כדי לראות לאן כל אחד שייך.',
     sarah:'"ואם קרן תשקר? יש לי דרך לבדוק, בלי לראות?"'},
    {kind:'arch', ctx:'האפיון אומר מה בונים. הארכיטקטורה אומרת איך: אילו תוכנות, איפה כל אחת רצה, ומה עובר ביניהן. כמו התוכנית של אדריכל, אחרי שכבר יודעים כמה חדרים יהיו בבית.',
     ex:['שרטטנו את המרשם מקצה לקצה: אפליקציה אצל כל קרן, שלושה שרתים בשלוש רשויות, שער שאלות, ויומן ציבורי שאי אפשר למחוק ממנו.',
         'ואז הגיעה בדיקת הסגירה: עוברים על כל קלט שהמערכת צריכה, ושואלים מאיפה הוא מגיע ומי אחראי עליו.',
         'שלושה רכיבים יושבים בחוץ: מאגר הזיהוי העולמי, רשת אקראיות ציבורית, והדיווח הרגיל שהקרנות כבר מגישות. אבל אף אחד מהם לא נחוץ לתשובה עצמה, ולכל אחד יש תחליף.',
         'והקלט שהתשובה תלויה בו, מה כל גוף מחזיק, נכנס דרך המערכת עצמה, ויוצא ממנה מאומת.'],
     punch:'המעגל נסגר בתוך הגבולות. המרשם ממשיך הלאה.',
     sarah:'"אז בסוף הרבעון אני רואה את כל השוק, ואף קרן לא נחשפה. גם לא בפניי."'},
    {kind:'design', exH:'מה העיצוב קובע', ctx:'הארכיטקטורה קבעה אילו רכיבים יש ומה עובר ביניהם. מסמך העיצוב יורד קומה אחת: מה יש בתוך כל רכיב. אם הארכיטקטורה היא התוכנית של הבית, העיצוב הוא חלוקת העבודה בתוך כל חדר: מי עושה מה, למה אסור לו לגעת, ומה קורה לכל חפץ מהרגע שהוא נכנס בדלת ועד שהוא יוצא.',
     ex:['עשרים "עובדים", מחלקות בתוכנה, ולכל אחד תפקיד אחד ורשימה של מה שאסור לו לעשות. המחלקה שיודעת מי הקרן לא רואה אף פעם דוח, והמחלקה שמקבלת דוחות לא יודעת מי שלח.',
         'מחזור חיים לכל דוח: התקבל, אסימון תקין, בדרך לעוזרים, אומת, נצבר, נמחק. כל ענף שלא מסתיים באימות מסתיים בדחייה או בהסגר. אין "כמעט מאומת".',
         'שני מסדי נתונים בלי שום עמודה משותפת: אצל הרגולטור אין מספר דוח, ואצל השרתים אין שם של קרן. ההפרדה לא כתובה בנוהל. היא כתובה בטבלאות.',
         'וסדר בנייה בשבע גרסאות, משני שרתים וסכום אחד ועד תקופת דיווח מלאה בין שלוש רשויות. לכל גרסה מבחן יציאה.'],
     punch:'ההבטחה "לחבר בלי לראות" הפכה לשורות קונקרטיות: אין שדה שמחבר זהות לתוכן, ואין מעבר שמוביל לסכום לא מאומת.',
     sarah:'"כלומר גם אם מישהו ירצה, אין לו איפה לחפש מי שלח מה?"'}],
   vis:{
    design(box){ const ST=[['התקבל',350],['אסימון',270],['בדרך',190],['אומת',110],['בסכום',30]];
      box.innerHTML=`<svg viewBox="0 0 420 200" class="rx-svg nb" role="img" aria-label="מחברת המהנדס: דוח אחד עובר בין המצבים שלו"><defs><pattern id="nbg" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M12 0 L0 0 0 12" class="nb-grid"/></pattern></defs><rect width="420" height="200" fill="url(#nbg)" class="nb-paper"/>
       ${ST.map(([t,x],i)=>`<g class="nb-s" data-i="${i}"><rect x="${x}" y="40" width="64" height="34" rx="8"/><text x="${x+32}" y="62" text-anchor="middle">${t}</text></g>${i<4?`<path d="M${x} 57 L${x-14} 57" class="nb-e"/>`:''}`).join('')}
       <g class="nb-s bad" data-i="9"><rect x="180" y="130" width="84" height="34" rx="8"/><text x="222" y="152" text-anchor="middle">נדחה, עם סיבה</text></g><path d="M222 74 L222 128" class="nb-e r"/>
       <path d="M200 38 C200 14 246 14 246 38" class="nb-e g"/><text x="223" y="12" text-anchor="middle" class="nb-t">ממתין</text>
       <circle r="8" cx="382" cy="57" class="nb-tok"/><text x="210" y="192" text-anchor="middle" class="nb-t nb-cap"></text></svg>`;
      const tok=box.querySelector('.nb-tok'), cap=box.querySelector('.nb-cap'); const sl=ms=>new Promise(r=>setTimeout(r,ms)); let run=false;
      const go=async(path,msg)=>{ if(run) return; run=true; box.querySelectorAll('.nb-s').forEach(s=>s.classList.remove('on')); for(const i of path){ const s=box.querySelector('.nb-s[data-i="'+i+'"]'); s.classList.add('on'); const r=s.querySelector('rect'); tok.setAttribute('cx',+r.getAttribute('x')+32+(i===9?10:0)); tok.setAttribute('cy',+r.getAttribute('y')-6); await sl(520); } cap.textContent=msg; run=false; };
      const row=H('div','rx-acts'); [['דוח תקין',[0,1,2,3,4],'אומת, ונכנס לסכום.'],['עוזר נופל',[0,1,2,2,2,3,4],'חיכה, ולא הלך לאיבוד.'],['הוכחה נכשלה',[0,1,2,9],'נדחה. לא נכנס לשום סכום.']].forEach(([l,p,m])=>{ const b=H('button','rg-b',l); b.type='button'; b.addEventListener('click',()=>go(p,m)); row.append(b); }); box.append(row); },
    ideation(box){ const rnd=()=>Math.floor(Math.random()*19999)-9999;
      const L=x=>'\u2066'+x.toLocaleString('en-US')+'\u2069'; const draw=()=>{ const a=rnd(), b=rnd(), c=100-a-b; box.querySelectorAll('.rg-sh').forEach((t,i)=>t.textContent=L([a,b,c][i])); box.querySelector('.rg-sum').textContent='\u2066'+`(${a}) + (${b}) + (${c}) = 100`+'\u2069'; };
      box.innerHTML=`<svg viewBox="0 0 420 230" class="rx-svg napkin" role="img" aria-label="שרטוט על מפית: המספר 100 מתפצל לשלושה חלקים אקראיים, וכל חלק הולך לשרת אחר">
       <path d="M10 14 L410 8 L414 220 L6 224 Z" class="nk-paper"/><path d="M210 8 L212 222" class="nk-fold"/>
       <circle cx="360" cy="70" r="30" class="nk-l"/><text x="360" y="77" class="nk-t" text-anchor="middle">100</text><text x="360" y="122" class="nk-t sm" text-anchor="middle">הסוד של הקרן</text>
       ${[0,1,2].map(i=>`<path d="M330 ${70} C290 70 260 ${40+i*60} 220 ${40+i*60}" class="nk-l dash"/><rect x="120" y="${22+i*60}" width="100" height="36" rx="4" class="nk-l"/><text x="170" y="${46+i*60}" class="nk-t sm rg-sh" text-anchor="middle"></text><text x="70" y="${46+i*60}" class="nk-t sm" text-anchor="middle">${['שרת א','שרת ב','שרת ג'][i]}</text>`).join('')}
       <text x="210" y="212" class="nk-t sm hot rg-sum" text-anchor="middle"></text></svg>`;
      const b=H('button','rx-act','לפצל שוב'); b.type='button'; b.addEventListener('click',draw); box.append(b); draw(); },
    poc(box){ const P=2n**61n-1n; const r=()=>{ const a=new Uint32Array(2); crypto.getRandomValues(a); return ((BigInt(a[0])<<32n)|BigInt(a[1]))%P; };
      const share=v=>{ const x=r(), y=r(); return [x,y,((BigInt(v)-x-y)%P+P)%P]; };
      box.innerHTML=`<div class="lab-scope rg-peek"><p class="rg-pk">אתם שרת א. זה מה שהגיע אליכם:</p><code class="rg-big" dir="ltr"></code><div class="rg-q"><span>האם הקרן חשופה ב-0, או במיליון?</span><button type="button" class="rg-b">0</button><button type="button" class="rg-b">מיליון</button></div><p class="rg-ans" aria-live="polite"></p></div>`;
      const big=box.querySelector('.rg-big'), ans=box.querySelector('.rg-ans'); let v=0; const roll=()=>{ v=Math.random()<.5?0:1000000; big.textContent=share(v)[0].toString(); ans.textContent=''; };
      box.querySelectorAll('.rg-q button').forEach((b,i)=>b.addEventListener('click',()=>{ const ok=(i===0)===(v===0); ans.textContent=(ok?'ניחשתם נכון, ':'לא נכון, ')+'אבל זה היה מזל: חלק של 0 וחלק של מיליון נראים אותו הדבר. האמת: '+(v?'מיליון':'0')+'. נסו שוב.'; setTimeout(roll,2600); }));
      roll(); },
    spec(box){ const L=[['אצל המשתתף',['רישום וזהות','קידוד מקומי','התחייבות וקבלה']],['בין השרתים',['פיצול והוכחת תקינות','צבירה בשלושה שרתים','אימות התוצאה']],['השער',['קטלוג, סף ופרטיות','תקשורת ותפעול']],['השקיפות',['יומן ביקורת','דוחות ופרסום']]];
      const w=H('div','sx-shelves'); let n=0; L.forEach(([l,fs])=>{ const sh=H('div','sx-shelf'); sh.append(H('span','sx-l',l)); const row=H('div','sx-row'); fs.forEach(t=>{ n++; const c=H('span','sx-card',t); c.style.setProperty('--n',n); c.dataset.n=n; c.tabIndex=0; row.append(c); }); sh.append(row); w.append(sh); }); box.append(w); },
    arch(box){ box.innerHTML=`<svg viewBox="0 0 420 230" class="rx-svg bp" role="img" aria-label="שרטוט הנדסי: ארבעה מגרשים בתוך קו הגבול, ושלושה שירותים חיצוניים עם תחליף">
       <defs><pattern id="bpg2" width="14" height="14" patternUnits="userSpaceOnUse"><path d="M14 0 L0 0 0 14" class="bp-grid"/></pattern></defs><rect width="420" height="230" fill="url(#bpg2)"/>
       <rect x="120" y="22" width="284" height="186" rx="4" class="bp-lot"/><text x="398" y="40" class="bp-t sm" text-anchor="start">קו המגרש: בתוך הגבולות</text>
       ${[['הקרן',350,80],['שלושת השרתים',250,80],['הרגולטור',250,160],['היומן',350,160]].map(([t,x,y],i)=>`<g class="bp-c" style="--i:${i}"><rect x="${x-46}" y="${y-18}" width="92" height="36" rx="3" class="bp-box"/><text x="${x}" y="${y+5}" class="bp-t" text-anchor="middle">${t}</text></g>`).join('')}
       <path d="M304 80 L296 80 M250 98 L250 142 M296 160 L304 160" class="bp-wire"/>
       ${[['GLEIF',56,56],['drand',56,116],['Form PF',56,176]].map(([t,x,y])=>`<g class="bp-q ext" tabindex="0" role="button" aria-label="${t}: שירות חיצוני עם תחליף"><rect x="${x-40}" y="${y-16}" width="80" height="32" rx="3" class="bp-miss ok"/><text x="${x}" y="${y+5}" class="bp-t sm" text-anchor="middle">${t}</text></g>`).join('')}
       <text x="185" y="220" class="bp-t sm okc" text-anchor="middle">✓ המעגל סגור</text></svg>
       <p class="bp-pop" hidden>שלושת השירותים שבחוץ משמשים לזיהוי ולביקורת בלבד. לכל אחד יש תחליף, ואף אחד מהם לא נחוץ לתשובה עצמה.</p>`;
      const pop=box.querySelector('.bp-pop'); box.querySelectorAll('.bp-q').forEach(q=>{ const t=()=>{ pop.hidden=!pop.hidden; }; q.addEventListener('click',t); q.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); t(); } }); }); }
   }};
  const FX=Object.assign({'Fire-Sale Cascade Simulator':FS,'Private Exposure Registry':RG},window.REEL_FX_EXTRA||{});

  /* ---------------- chapter visuals ---------------- */
  const VIS={
   ideation(box){ // napkin sketch + push the first domino
     box.innerHTML=`<svg viewBox="0 0 420 230" class="rx-svg napkin" role="img" aria-label="שרטוט על מפית: עליית ריבית פוגעת בקרנות, והן נופלות כמו דומינו">
       <path d="M10 14 L410 8 L414 220 L6 224 Z" class="nk-paper"/><path d="M210 8 L212 222" class="nk-fold"/><path d="M8 118 L412 112" class="nk-fold"/>
       <text x="372" y="44" class="nk-t" text-anchor="middle">ריבית ↑</text><path d="M370 54 C350 80 330 96 300 110" class="nk-l"/><path d="M308 100 L298 112 L312 114" class="nk-l"/>
       ${[0,1,2,3,4].map(i=>`<g class="nk-dom" style="--k:${i}"><rect x="${250-i*44}" y="120" width="16" height="64" rx="2" class="nk-r ${i===0?'hot':''}"/></g>`).join('')}
       <line x1="40" y1="184" x2="290" y2="184" class="nk-l"/>
       <circle cx="70" cy="70" r="18" class="nk-l"/><text x="70" y="75" class="nk-t sm" text-anchor="middle">שרה</text><path d="M96 68 q20 -14 40 0" class="nk-l dash"/><text x="150" y="58" class="nk-t sm hot nk-ring">טרררר!</text>
       <text x="150" y="214" class="nk-t sm" text-anchor="middle">מכירה אחת → שלוש נוספות</text></svg>`;
     const b=H('button','rx-act','לדחוף את הדומינו הראשון'); b.type='button'; b.addEventListener('click',()=>{ box.classList.remove('push'); void box.offsetWidth; box.classList.add('push'); b.textContent='עוד פעם'; }); box.append(b); },
   poc(box){ // lab bench: leverage slider -> chance of spiral and final yield
     const G=(window.SPEC&&window.SPEC['fire-sale']&&window.SPEC['fire-sale'].knobx&&window.SPEC['fire-sale'].knobx.data.grid)||[];
     box.innerHTML=`<div class="lab-scope"><div class="lab-screen"><svg viewBox="0 0 300 140" class="rx-svg" aria-hidden="true"><g class="lab-grid">${[0,1,2,3,4].map(i=>`<line x1="0" x2="300" y1="${i*35}" y2="${i*35}"/>`).join('')}${[0,1,2,3,4,5,6].map(i=>`<line y1="0" y2="140" x1="${i*50}" x2="${i*50}"/>`).join('')}</g><polyline class="lab-trace" points=""/></svg><span class="lab-big"></span><span class="lab-lbl">סיכוי לספירלה, מתוך 300 עולמות</span></div>
       <div class="lab-knob"><label>מנוף ממוצע בשוק: <b></b></label><input type="range" min="0" max="${Math.max(0,G.length-1)}" step="1" value="2" aria-label="מנוף ממוצע בשוק"></div>
       <div class="lab-read"><span>תשואה סופית בעולם אחד: <b class="f"></b></span><span>עם בנק מרכזי: <b class="c"></b></span></div></div>`;
     const r=box.querySelector('input'), lb=box.querySelector('.lab-knob b'), big=box.querySelector('.lab-big'), tr=box.querySelector('.lab-trace'), f=box.querySelector('.f'), c=box.querySelector('.c');
     const draw=()=>{ const g=G[+r.value]; if(!g) return; lb.textContent=g.lev.toString(); big.textContent=Math.round(g.p*100)+'%'; big.classList.toggle('hot',g.p>=.5); f.textContent=g.final.toFixed(2)+'%'; c.textContent=g.cb_final.toFixed(2)+'%';
       const pts=G.map((x,i)=>(i*300/(G.length-1)).toFixed(0)+','+(135-x.p*125).toFixed(0)).slice(0,+r.value+1).join(' '); tr.setAttribute('points',pts); };
     r.addEventListener('input',draw); draw(); },
   spec(box){ // ten feature cards fly into four layers
     const L=[['העולם',['בניית העולם','מאזן ושערוך','כללי תגובה']],['המפל',['השפעת מחיר','מנוע המפל','רשת והדבקה']],['השאלות',['התערבות','סריקת אי-ודאות']],['האמון',['שחזור וכיול','תצוגה וקישור']]];
     const w=H('div','sx-shelves'); let n=0;
     L.forEach(([l,fs],li)=>{ const sh=H('div','sx-shelf'); sh.append(H('span','sx-l',l)); const row=H('div','sx-row'); fs.forEach(t=>{ n++; const c=H('span','sx-card',t); c.style.setProperty('--n',n); c.dataset.n=n; c.tabIndex=0; row.append(c); }); sh.append(row); w.append(sh); });
     box.append(w); },
   arch(box){ // blueprint with the box outside the property line
     box.innerHTML=`<svg viewBox="0 0 420 230" class="rx-svg bp" role="img" aria-label="שרטוט הנדסי: כל הרכיבים בתוך קו המגרש, וקופסה אחת עם סימן שאלה מחוצה לו">
       <defs><pattern id="bpg" width="14" height="14" patternUnits="userSpaceOnUse"><path d="M14 0 L0 0 0 14" class="bp-grid"/></pattern></defs>
       <rect width="420" height="230" fill="url(#bpg)"/>
       <rect x="120" y="22" width="284" height="186" rx="4" class="bp-lot"/><text x="398" y="40" class="bp-t sm" text-anchor="start">קו המגרש: בתוך הגבולות</text>
       ${[['דפדפן',330,70],['מנוע הסבבים',230,70],['ספריית עולמות',330,150],['סריקה',230,150],['תצוגה',150,110]].map(([t,x,y],i)=>`<g class="bp-c" style="--i:${i}"><rect x="${x-42}" y="${y-18}" width="84" height="36" rx="3" class="bp-box"/><text x="${x}" y="${y+5}" class="bp-t" text-anchor="middle">${t}</text></g>`).join('')}
       <path d="M288 70 L272 70 M330 88 L330 132 M230 88 L230 132 M188 70 L170 96 M188 150 L170 124" class="bp-wire"/>
       <g class="bp-q" tabindex="0" role="button" aria-label="הקופסה החסרה: חשיפות השוק היום"><rect x="14" y="88" width="84" height="56" rx="3" class="bp-miss"/><text x="56" y="124" class="bp-qm" text-anchor="middle">?</text></g>
       <path d="M98 116 L188 116" class="bp-wire miss"/><text x="56" y="164" class="bp-t sm hot" text-anchor="middle">מחוץ לגבולות</text></svg>
       <p class="bp-pop" hidden>בתוך הקופסה צריך להיות: מי מחזיק היום כמה אג"ח, ובאיזה מנוף. אף רכיב בשרטוט לא יודע את זה, ואין רכיב שיכול להביא את זה.</p>`;
     const q=box.querySelector('.bp-q'), pop=box.querySelector('.bp-pop'); const t=()=>{ pop.hidden=!pop.hidden; q.classList.toggle('open',!pop.hidden); };
     q.addEventListener('click',t); q.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); t(); } }); }
  };

  /* ---------------- decorate scenes as they appear ---------------- */
  function peek(cfg,kind){ const p=H('div','rx-peek'); const fr=H('button','rx-paper'); fr.type='button'; fr.setAttribute('aria-label','הצצה למסמך האמיתי: לחצו כדי להפוך את הדף');
    const a=H('img'); a.src=cfg.peek+kind+'-p1.jpg'; a.alt='העמוד הראשון של המסמך'; a.loading='lazy'; const b=H('img','back'); b.src=cfg.peek+kind+'-p2.jpg'; b.alt='עמוד מתוך המסמך'; b.loading='lazy';
    fr.append(a,b); fr.addEventListener('click',()=>fr.classList.toggle('flip')); const l=H('a','rx-open','לפתוח את המסמך (PDF) ←'); l.href=cfg.pdf+kind+'-he.pdf'; l.target='_blank'; l.rel='noopener';
    p.append(H('span','rx-pk','הצצה למסמך האמיתי'),fr,l); return p; }
  function enhance(scene,i){
    const name=titleEl.textContent, cfg=FX[name]; const kick=scene.querySelector('.reel-kicker'); const kk=kick?kick.textContent.split('·').pop().trim():''; const kind=KIND[kk]||'';
    if(kind) scene.classList.add('rk-'+kind);
    if(!cfg||!cfg.ch[i]) return;
    const c=cfg.ch[i]; scene.classList.add('rx');
    const brief=scene.querySelector('.reel-brief'); const wrap=H('div','rx-body');
    wrap.append(H('p','rx-lab',KLAB[c.kind]||''));
    const ctx=H('div','rx-blk'); ctx.append(H('span','rx-k','רקע, למי שמגיע לכאן ראשון'),H('p','',c.ctx)); wrap.append(ctx);
    const ex=H('div','rx-blk'); ex.append(H('span','rx-k',c.exH||(c.kind==='ideation'?'דוגמה':c.kind==='poc'?'הניסוי':c.kind==='spec'?'מה המוצר יודע':c.kind==='board'?'הרעיון, בפירוט':'מה גילינו'))); const ol=H('ol','rx-steps'); c.ex.forEach(t=>{ const li=H('li'); li.innerHTML=t; ol.append(li); }); ex.append(ol); wrap.append(ex);
    if(c.punch) wrap.append(H('p','rx-punch',c.punch));
    if(c.idea){ const id=H('div','rx-blk'); id.append(H('span','rx-k',c.ideaH||cfg.ideaH||'הרעיון: לבנות שוק שלם בתוך המחשב')); const g=H('div','rx-idea'); c.idea.forEach(([h,t])=>{ const d=H('div','rx-ic'); d.append(H('b','',h)); const p=H('p'); p.innerHTML=t; d.append(p); g.append(d); }); id.append(g); wrap.append(id); }
    const vis=H('div','rx-vis rx-'+c.kind); const VF=(cfg.vis&&cfg.vis[c.kind])||VIS[c.kind]; if(VF) VF(vis);
    const side=H('div','rx-side'); side.append(vis);
    const CH=cfg.char||{name:'שרה',svg:SARAH}; const sr=H('div','rx-sarah'); const av=H('span','rx-av'); av.innerHTML=CH.svg; const st=H('div'); st.append(H('span','rx-k',CH.name),H('p','',c.sarah)); sr.append(av,st);
    const grid=H('div','rx-grid'); grid.append(wrap,side);
    if(brief) brief.replaceWith(grid); else scene.append(grid);
    side.append(sr); if(cfg.peek) side.append(peek(cfg,c.kind));
    if(window.TermWin) window.TermWin.wire(scene);
  }
  function enhanceCut(cut){
    const cfg=FX[titleEl.textContent]; if(!cfg||!cfg.cut) return; const C=cfg.cut;
    const p=cut.querySelector('p:not(.kick)'); if(!p) return;
    const box=H('div','rx-cut'); C.lines.forEach(t=>box.append(H('p','',t))); if(C.like){ const lk=H('div','rx-like'); lk.append(H('span','rx-k','כמו ש...'),H('p','',C.like)); box.append(lk); }
    const fig=H('div','rx-cutfig'); fig.innerHTML=C.fig||`<svg viewBox="0 0 360 120" aria-hidden="true"><rect x="150" y="12" width="200" height="96" rx="4" class="cf-lot"/><text x="344" y="30" class="cf-t" text-anchor="start">הגבולות של הסימולטור</text>${[0,1,2].map(i=>`<rect x="${170+i*60}" y="54" width="48" height="30" rx="3" class="cf-ok"/><text x="${194+i*60}" y="74" class="cf-t" text-anchor="middle">✓</text>`).join('')}<rect x="14" y="40" width="96" height="52" rx="3" class="cf-miss"/><text x="62" y="72" class="cf-q" text-anchor="middle">?</text><path d="M110 66 L170 66" class="cf-w"/><text x="62" y="112" class="cf-t hot" text-anchor="middle">חשיפות השוק היום</text></svg>`;
    if(C.fig!==false) box.append(fig); box.append(H('p','rx-punch',C.punch));
    const CH=cfg.char||{name:'שרה',svg:SARAH}; const sr=H('div','rx-sarah dark'); const av=H('span','rx-av'); av.innerHTML=CH.svg; const st=H('div'); st.append(H('span','rx-k',CH.name),H('p','',C.sarah)); sr.append(av,st); box.append(sr,H('p','rx-q',C.q));
    p.replaceWith(box);
  }
  new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{ if(n.nodeType!==1) return;
    if(n.classList.contains('reel-scene')) enhance(n,[...scenes.querySelectorAll('.reel-scene')].indexOf(n));
    if(n.classList.contains('reel-cut')) enhanceCut(n); }))).observe(scenes,{childList:true});
  // live background per candidate
  const bg=H('div','rx-bg'); bg.setAttribute('aria-hidden','true'); reel.prepend(bg);
  new MutationObserver(()=>{ const nm=titleEl.textContent; bg.innerHTML=''; reel.dataset.cand='';
    if(nm==='Fire-Sale Cascade Simulator'){ reel.dataset.cand='fs';
      const tk=H('div','rx-ticker'); const row=H('div','rx-tk-row'); const items=['UK 30Y 4.52% ▲','קרן A ‎-12% ▼','קרן B ‎-9% ▼','מנוף ממוצע ?','UK 30Y 4.81% ▲','קרן C ‎-15% ▼','דרישת ביטחונות','UK 30Y 5.04% ▲','קרן D ‎-21% ▼','מכירה כפויה'];
      for(let k=0;k<2;k++) items.forEach((t,i)=>row.append(H('span',/▲|כפויה|דרישת/.test(t)?'hot':'',t))); tk.append(row); bg.append(tk);
      const dm=H('div','rx-doms'); for(let i=0;i<9;i++){ const d=H('i'); d.style.setProperty('--i',i); dm.append(d); } bg.append(dm); }
    else if(FX[nm]&&FX[nm].bg){ reel.dataset.cand=FX[nm].cand||'x'; FX[nm].bg(bg,H); }
    else if(nm==='Private Exposure Registry'){ reel.dataset.cand='rg';
      const tk=H('div','rx-ticker'); const row=H('div','rx-tk-row'); const hx=()=>Array.from({length:12},()=>'0123456789abcdef'[Math.floor(Math.random()*16)]).join('');
      const items=[]; for(let i=0;i<12;i++) items.push(i%4===3?'סכום מאומת ✓':('חלק '+'אבג'[i%3]+': '+hx()));
      for(let k=0;k<2;k++) items.forEach(t=>row.append(H('span',/✓/.test(t)?'okc':'',t))); tk.append(row); bg.append(tk); }
  }).observe(titleEl,{childList:true,characterData:true,subtree:true});

  /* ---------------- journey tree: fill branches from finished reels ---------------- */
  const jv=document.querySelector('.jv'); const caseSlug=document.body.dataset.case||'';
  const KEY='td-fell-'+caseSlug; let fell={}; try{ fell=JSON.parse(localStorage.getItem(KEY)||'{}'); }catch(e){ fell={}; }
  const STN=['לוח','ייזום','POC','אפיון','ארכיטקטורה'];
  function paint(){ if(!jv) return; jv.querySelectorAll('.jv-br[data-at]').forEach(br=>{ if(br.dataset.at==='board') return; br.textContent='';
      const at=+br.dataset.at; const here=Object.entries(fell).filter(([n,a])=>a===at).map(([n])=>n);
      if(!here.length){ const q=H('span','jv-leaf unknown','?'); q.title='צפו בהקרנות כדי לגלות'; br.append(q); }
      here.forEach(n=>br.append(H('span','jv-leaf',n))); });
    const cnt=Object.values(fell).filter(v=>v!=='board').length; let s=jv.querySelector('.jv-prog'); if(!s){ s=H('p','jv-prog'); jv.append(s); } s.textContent=cnt?('ענפים שנחשפו: '+cnt+' מתוך 4 הקרנות'):''; }
  document.addEventListener('reel:done',e=>{ const d=e.detail&&e.detail.data; if(!d||!d.st) return; const x=d.st.indexOf('x'); fell[e.detail.name]=x>0?x:(x===0?'board':'go');
    try{ localStorage.setItem(KEY,JSON.stringify(fell)); }catch(err){} paint(); });
  paint();
})();
