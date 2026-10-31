window.QUICK=window.QUICK||{};
window.QUICK['model-kill-switch']={
 he:{kicker:'Case 01 · הסיכום הקצר (כולל ספוילר)',title:'מי מחזיק את המתג?',
  rows:[
   ['הבעיה','80% מהאמריקאים רוצים רגולציה על בינה מלאכותית, אבל אף אחד לא מסכים איזו. השאלה שנשארת פתוחה: אם מודל יצא משליטה, מי מחזיק את המתג, ומי יכול ללחוץ עליו?'],
   ['הדרך','שישה רעיונות לפתרון עברו אלימינציה, שלב אחרי שלב. שניים נפלו על הלוח, אחד בייזום, אחד באפיון ואחד בארכיטקטורה, ולכל נפילה יש סיבה הנדסית.'],
   ['מה שנשאר','Model Kill-Switch Protocol: ועדה חותמת על פקודת עצירה (M מתוך N), שער שמותקן ליד המודל מאמת את החתימות ואוכף את העצירה, ויומן ציבורי שאי אפשר למחוק ממנו מתעד כל פקודה, גם כשנדחתה.'],
   ['מה נבנה','מסמך ייזום, POC שרץ בדפדפן, אפיון פיצ\'רים, ארכיטקטורה אינטראקטיבית ומסמך עיצוב עם תרשימי מחלקות, מצבים ורצף.']],
  linksLabel:'שלושת התוצרים הכי חשובים (PDF)',
  links:[['מסמך האפיון','downloads/kill-switch-spec-he.pdf','פיצ\'רים, טכנולוגיות ובסיס נתונים'],['הארכיטקטורה','downloads/kill-switch-arch-he.pdf','רכיבים, תקשורת ועיצוב נתונים'],['מסמך העיצוב','downloads/kill-switch-design-he.pdf','מחלקות, מצבים, רצף ותהליכונים']],
  end:'רוצה לעבור את הדרך בעצמך? סגרו את החלון והתחילו משלב 01.'},
 en:{kicker:'Case 01 · The short version (spoilers)',title:'Who holds the switch?',
  rows:[
   ['The problem','80% of Americans want AI regulation, yet nobody agrees on which. The open question: if a model goes out of control, who holds the switch, and who is allowed to press it?'],
   ['The path','Six solution ideas went through a step-by-step elimination. Two fell at the board, one at ideation, one at specification and one at architecture, each for an engineering reason.'],
   ['What remained','Model Kill-Switch Protocol: a committee signs a halt command (M of N), a gateway next to the model verifies the signatures and enforces the halt, and a public append-only log records every command, including rejected ones.'],
   ['What was built','Ideation document, an in-browser PoC, a feature specification, an interactive architecture and a design document with class, state and sequence diagrams.']],
  linksLabel:'The three most important deliverables (PDF)',
  links:[['Specification','downloads/kill-switch-spec-en.pdf','Features, technologies and database'],['Architecture','downloads/kill-switch-arch-en.pdf','Components, communication and data design'],['Design document','downloads/kill-switch-design-en.pdf','Classes, states, sequences and threads']],
  end:'Want to walk the path yourself? Close this window and start at stage 01 (the site itself is in Hebrew).'}
};

/* Case 02 (slow-motion-crisis) */
window.QUICK['slow-motion-crisis']={
 he:{kicker:'Case 02 · הסיכום הקצר (כולל ספוילר)',title:'משבר בהילוך איטי: עידן הכסף הזול נגמר',
  rows:[['הבעיה','ממשלות העולם העשיר לוו עשור כמעט בחינם, ועכשיו החוב הזול מתחלף ביקר. הנזק מגיע לאט, ואז, כמו בבריטניה ב-2022 וב-SVB ב-2023, בבת אחת. החלק המהיר תמיד הגיע ממה שאף אחד לא ראה: מנוף סמוי וחשיפה סמויה.'],
        ['הדרך','שבעה רעיונות לפתרון עברו אלימינציה, שלב אחרי שלב. כל אחד נפל בשלב אחר, ולכל נפילה יש סיבה הנדסית. שניים הגיעו עד הארכיטקטורה: סימולטור של מכירות כפויות, ומרשם חשיפות פרטי.'],
        ['מה שנשאר','Private Exposure Registry: כל קרן ובנק מפוקח מפצלים את החשיפות שלהם לשלושה חלקים, שלוש רשויות פיקוח מחברות אותם בלי לראות אף גוף, והסכום נבדק מול התחייבויות קריפטוגרפיות לפני שהוא נפתח. הסימולטור נפל כי הנתון שהתשובה שלו תלויה בו נשאר מחוץ לגבולות שלו, והמרשם הוא בדיוק מי שאוסף אותו.'],
        ['מה נבנה','מסמכי ייזום, שלוש מעבדות POC שרצות בדפדפן, אפיונים עם הדגמות חיות, מודל איום, שתי ארכיטקטורות אינטראקטיביות ומסמכי עיצוב.']],
  linksLabel:'שלושת התוצרים הכי חשובים (PDF)',
  links:[['מסמך האפיון','downloads/registry-spec-he.pdf','עשרה פיצ\'רים על סטנדרט של IETF'],['הארכיטקטורה','downloads/registry-arch-he.pdf','ארבעה מישורי אמון ורכיבים'],['ההכרעה','downloads/slow-motion-crisis-decision-he.pdf','למה המרשם ניצח את הסימולטור']],
  end:'רוצה לעבור את הדרך בעצמך? סגרו את החלון והתחילו משלב 01.'},
 en:{kicker:'Case 02 · The short version (spoilers)',title:'A slow-motion crisis: the end of cheap money',
  rows:[['The problem','Rich-world governments borrowed almost for free for a decade; now cheap debt is rolling into expensive debt. The damage arrives slowly, then, as in the UK in 2022 and at SVB in 2023, all at once. The fast part always came from what nobody saw: hidden leverage and hidden exposure.'],
        ['The path','Seven solution ideas went through a step-by-step elimination, each falling at a different stage for an engineering reason. Two reached architecture: a fire-sale cascade simulator and a private exposure registry.'],
        ['What remained','Private Exposure Registry: supervised funds and banks split their exposures into three shares, three regulators add them up without seeing any institution, and every total is checked against cryptographic commitments before it opens. The simulator fell because the input its answer depends on lies outside its boundary, and the registry is exactly what collects it.'],
        ['What was built','Ideation documents, three in-browser PoC labs, specifications with live demos, a threat model, two interactive architectures and design documents.']],
  linksLabel:'The three most important deliverables (PDF)',
  links:[['Specification','downloads/registry-spec-en.pdf','Ten features on the IETF Prio3 draft'],['Architecture','downloads/registry-arch-en.pdf','Four trust planes and components'],['The decision','downloads/slow-motion-crisis-decision-en.pdf','Why the registry beat the simulator']],
  end:'Want to walk the path yourself? Close this window and start at stage 01 (the site itself is in Hebrew).'}
};
