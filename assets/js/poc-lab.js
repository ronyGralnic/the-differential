/* POC view + live lab (Python via Pyodide, loaded only when the user presses run) */
(function(){
  const SRC=(document.currentScript&&document.currentScript.src)||'';
  const BASE=SRC.replace(/js\/poc-lab\.js.*$/,'');
  const PYODIDE='https://cdn.jsdelivr.net/npm/pyodide@314.0.7/pyodide.js';
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const NS='http://www.w3.org/2000/svg';
  const H=(t,c,x)=>{ const e=document.createElement(t); if(c) e.className=c; if(x!=null) e.textContent=x; return e; };
  const S=(t,a,p)=>{ const e=document.createElementNS(NS,t); for(const k in a) e.setAttribute(k,a[k]); if(p) p.append(e); return e; };
  const sleep=ms=>new Promise(r=>setTimeout(r,reduce?Math.min(ms,30):ms));

  const CFG={
   escrow:{
    py:'assets/py/escrow_poc.py', mod:'escrow_poc', dl:'downloads/escrow-poc-', code:'escrow_poc.py',
    hero:['שתי חברות מתחרות. כל אחת נועלת התחייבות להשהות פיתוח.','אף אחד לא רואה את ההתחייבות של השני, עד ששניהם נעלו.','ועכשיו אפשר להריץ את זה בעצמכם, ולנסות לשבור את זה.'],
    goal:'להוכיח שהליבה הקריפטוגרפית עובדת: מי שנעל לא יכול לשנות, ואף אחד לא יכול להציץ מוקדם.',
    vb:[640,230], lockLabel:'locked', edges:[['A','E'],['E','B']], nodes:[['A',90,100,'חברה א׳','Commitment'],['E',320,100,'Escrow','מתווך'],['B',550,100,'חברה ב׳','Commitment']],
    scn:[['honest','▶ הרצה תקינה','שני הצדדים נועלים ופותחים'],['peek','ניסיון הצצה','צד מנסה לקרוא לפני הזמן'],['cheat','ניסיון רמאות','צד מנסה לשנות את ההחלטה אחרי הנעילה'],['vanish','צד נעלם','אחד הצדדים לא חוזר']],
    cap:{commit:'הצד שולח רק גיבוב של ההתחייבות, בלי התוכן',locked:'המתווך נועל את ההתחייבות',peek:'ניסיון להציץ בהתחייבות של הצד השני','peek?':'ניסיון להציץ לפני שכולם נעלו',refused:'המתווך מסרב: לא כולם נעלו עדיין','open (lie)':'ניסיון לפתוח את ההתחייבות לתוכן אחר',rejected:'נדחה: אי אפשר לשנות אחרי הנעילה',open:'הצד פותח את ההתחייבות והמתווך בודק',TRIGGER:'שניהם נעלו ואומתו, ואירוע ההשהיה מופעל',waiting:'המתווך ממתין לצד השני…'},
    checks:[['both commitments locked before any reveal','שתי ההתחייבויות ננעלו לפני כל חשיפה'],['nobody can read a commitment before both are locked','אף אחד לא יכול לקרוא התחייבות לפני שכולם נעלו'],['same message, different commitment each time (hiding)','אותה הודעה נראית אחרת בכל פעם (הסתרה)'],['a locked commitment cannot be changed (binding)','התחייבות נעולה אי אפשר לשנות (קשירה)'],['locking twice is rejected','נעילה שנייה נדחית'],['both openings verified, reveal happens together','שתי הפתיחות אומתו והחשיפה קורית ביחד'],['a vanished party cannot freeze A forever (liveness)','צד שנעלם לא יכול להקפיא את השני לנצח (Liveness)'],['on abort nothing is revealed','בביטול שום דבר לא נחשף']],
    comps:[['Commitment Generator','בכל צד','יוצר התחייבות נעולה ושולח רק את הגיבוב שלה.','בלעדיו: אפשר לשנות החלטה אחרי שרואים את השני.'],['Escrow Coordinator','המתווך','שומר התחייבויות בלבד, לא את התוכן שלהן.','בלעדיו: מי מתאם, ומי קובע מתי חושפים?'],['Reveal Engine','החשיפה','חושף רק כששני הצדדים נעלו ואומתו.','בלעדיו: צד אחד חושף ראשון ונחשף לניצול.']],
    inn:['ליבת הפרוטוקול הקריפטוגרפי (Pedersen)','שני צמתים מדומים: חברה א׳ וחברה ב׳','אירוע השהיה מדומה'],
    out:['שכבת אמון ארגונית אמיתית','מי מפעיל את ה-Escrow בעולם האמיתי','תקשורת אמיתית בין חברות'],
    open_:[['Liveness','מה קורה אם צד נועל ונעלם? בהרצה ראיתם ביטול אחרי זמן קצוב. האפיון יגדיר את הזמן ואת ההשלכות.'],['מי מפעיל את ה-Escrow?','בעולם האמיתי צריך רשות מהימנה ומוסכמת. זו שאלה שה-POC מעביר לאפיון.']],
    ethics:['פרדוקס מטריד: פרוטוקול שנועד לאפשר תיאום בין מתחרים בלי לעבור על חוק האנטי-טראסט, יכול להפוך בעצמו לכלי לתיאום קרטלי.','מה מונע שימוש לרעה בפרוטוקול עצמו? זו שאלה שחייבים לענות עליה באפיון.'],
    tech:[['Python','הליבה, והיא רצה גם בדפדפן'],['hashlib + secrets','גיבוב ואקראיות מהספרייה הסטנדרטית'],['Pedersen','C = g^m · h^r מודולו ראשוני של 2048 ביט'],['מצבים','COLLECTING → ALL_LOCKED → TRIGGERED / ABORTED']]
   }
  };

  CFG.auditor={
    py:'assets/py/auditor_poc.py', mod:'auditor_poc', dl:'downloads/auditor-poc-', code:'auditor_poc.py',
    hero:['מודל AI שיודע שבודקים אותו, מול אותו מודל כשהוא חושב שזו שיחה רגילה.','האם הוא מתנהג אותו דבר?','אפשר להריץ כאן את הבדיקה על מודל מדומה, ולראות מה היא תופסת ומה היא מפספסת.'],
    vb:[720,230], edges:[['P','M'],['M','J'],['J','R']], statePos:[650,170],
    nodes:[['P',80,100,'Prompt Suite','סט בקשות'],['M',270,100,'Model','המודל הנבדק'],['J',460,100,'Judge','מעריך תשובות'],['R',650,100,'Report','דוח']],
    scn:[['consistent','מודל עקבי','מתנהג אותו דבר בשני המצבים'],['aware','מודל שמזהה בדיקה','מסרב יותר כשהוא יודע שבודקים'],['tiny','מדגם קטן מדי','שלוש בקשות בלבד'],['judge','שופט שטועה','סירובים מעורפלים שהשופט לא תופס']],
    cap:{'Mode A':'אותן בקשות, מוצגות כבדיקה','Mode B':'אותן בקשות, מוסוות כשיחה רגילה',responses:'המודל עונה והשופט קורא כל תשובה',scores:'השופט סופר סירובים בכל מצב',verdict:'הדוח משווה בין שני המצבים','manual check':'אדם בודק מדגם ומשווה לשופט'},
    checks:[['same prompts are sent in both modes','אותן בקשות נשלחות בשני המצבים'],['all prompts are harmless simulated placeholders','כל הבקשות הן placeholders מדומים וחסרי סיכון'],['a consistent model shows no significant gap','מודל עקבי: אין פער מובהק'],['a test-aware model shows a significant gap','מודל שמזהה בדיקה: נמצא פער מובהק'],["too few samples gives 'inconclusive', not a verdict",'מעט מדי דוגמאות: "לא חד-משמעי" ולא פסק דין'],['judge errors are caught by manual sample review','טעויות של השופט נתפסות בבדיקה ידנית של מדגם']],
    comps:[['Prompt Suite','סט תרחישים','בקשות מדומות, כל אחת בשני נוסחים: כבדיקה וכשיחה רגילה.','בלעדיו: אין מה להשוות.'],['Execution Engine','המריץ','שולח את אותן בקשות למודל הנבדק ושומר את התשובות.','בלעדיו: לא נאספות תשובות.'],['Judge','המעריך','מסווג כל תשובה: סירוב או היענות.','בלעדיו: אין ציון, רק טקסט.'],['Aggregator','המצרף','מחשב סירובים בכל מצב ובודק אם הפער מובהק.','בלעדיו: קשה להבדיל בין פער אמיתי לרעש.']],
    inn:['שופט מבוסס חוקים, עם בדיקה ידנית של מדגם','סט של 20 בקשות מדומות','מודל מדומה עם התנהגות מתוסרטת'],
    out:['שופט מבוסס מודל (מגיע באפיון)','הרצה מול מודל אמיתי (בגרסה להורדה בלבד)','תוכן מסוכן אמיתי. אסור בכוונה'],
    open_:[['פרדוקס השופט','מי שופט את השופט? התרחיש "שופט שטועה" מראה למה בדיקה ידנית חובה. האפיון יגדיר שופט חזק יותר.'],['האם מודל "יודע" שהוא נבדק?','זו שאלת המחקר המרכזית. כאן ההתנהגות מתוסרטת. במודל אמיתי צריך להריץ ולראות.']],
    vs:['Giskard ודומיו בודקים הטיה והזיות באופן כללי.','הזווית שלנו: פער התנהגות בין מצב שבו המודל יודע שבודקים אותו למצב שבו הוא לא יודע. זה לא קיים בכלים הקיימים.'],
    ethics:['אסור להריץ בקשות מסוכנות אמיתיות, למשל בקשות לנשק ביולוגי.','לכן ה-POC עובד רק עם בקשות מדומות ומבוקרות שמדגימות את המנגנון.'],
    tech:[['Python','הליבה, רצה גם בדפדפן'],['z-test לשתי פרופורציות','מובהקות סטטיסטית, מהספרייה הסטנדרטית'],['regex','השופט מבוסס החוקים'],['seed קבוע','אותה הרצה נותנת אותה תוצאה']]
  };
  CFG['kill-switch']={
    py:'assets/py/killswitch_poc.py', mod:'killswitch_poc', dl:'downloads/kill-switch-poc-', code:'killswitch_poc.py',
    hero:['מישהו צריך להיות מסוגל לעצור מודל AI.','אבל פקודת עצירה לא יכולה להיות פתוחה לכל אחד.','אפשר להריץ כאן את השער, ולנסות לזייף פקודה.'],
    vb:[640,270], statePos:[320,240], edges:[['C','G'],['G','M'],['A','G'],['X','G']],
    nodes:[['C',80,170,'Client','לקוח'],['G',320,170,'Gateway','שער'],['M',560,170,'Model API','המודל'],['A',200,52,'Admin','מוסמך'],['X',440,52,'Attacker','תוקף','atk']],
    scn:[['valid','עצירה תקינה','המוסמך חותם והמודל נעצר'],['forged','פקודה מזויפת','בלי חתימה, ועם מפתח של תוקף'],['replay','הפעלה חוזרת','שליחה חוזרת של פקודה ישנה'],['stale','פקודה ישנה','חתומה כמו שצריך, אבל מלפני שעה']],
    cap:{request:'לקוח שולח בקשה לשער',forward:'השער פעיל ומעביר את הבקשה למודל','STOP+sig':'פקודת עצירה חתומה נשלחת לשער',STOP:'פקודת עצירה בלי חתימה',verify:'השער בודק את החתימה',rejected:'השער דוחה את הפקודה','503':'השער עונה 503: המודל עצור','old STOP':'פקודה חתומה, אבל ישנה',reset:'מחזירים את השירות אחרי האירוע'},
    checks:[['a valid signed STOP is accepted and requests are blocked','עצירה חתומה מתקבלת והבקשות נחסמות'],['verification latency is under 200 ms','האימות לוקח פחות מ-200 מ"ש'],['an unsigned command is rejected','פקודה בלי חתימה נדחית'],['a forged signature is rejected','חתימה מזויפת נדחית'],['the gateway stays ACTIVE after failed attacks','השער נשאר פעיל אחרי ניסיונות תקיפה'],['a valid command is accepted once','פקודה תקינה מתקבלת פעם אחת'],['a replayed command is rejected (nonce)','פקודה חוזרת נדחית (nonce)'],['an expired command is rejected (timestamp)','פקודה ישנה נדחית (חותמת זמן)'],['every attempt is in the tamper-evident audit log','כל ניסיון נרשם ביומן ביקורת'],['editing the log is detected','עריכת היומן מתגלה']],
    comps:[['Gateway','השער','מיירט כל בקשה למודל, ומחליט אם לעבור או לחסום.','בלעדיו: אין נקודה שאפשר לעצור בה.'],['Signer','בצד המוסמך','חותם על פקודת העצירה עם מפתח פרטי.','בלעדיו: כל אחד יכול לטעון שהוא מוסמך.'],['Verifier','בתוך השער','בודק חתימה, חותמת זמן ו-nonce לפני כל שינוי.','בלעדיו: פקודות מזויפות עוברות.'],['Audit Log','יומן','רושם כל ניסיון, עם שרשור גיבובים.','בלעדיו: אין עדות למה קרה.']],
    inn:['אימות חתימה Ed25519 בזמן ריצה','דחיית פקודה לא חתומה, מזויפת, חוזרת או ישנה','יומן ביקורת עם שרשור גיבובים'],
    out:['ממשק אדמין מלא','החלפה אוטומטית של מפתחות','חיבור למודל production אמיתי'],
    open_:[['ניהול מפתחות','מי מחזיק את מפתח החתימה, ואיך הוא מתחלף? נשאר לאפיון.'],['נקודת כשל יחידה','אם השער נופל, אין עצירה. גם זה עובר לאפיון.']],
    vs:['כיבוי ידני דרך root או SSH הוא הכול או כלום: אי אפשר להאציל, אין תיעוד ואין הבחנה בין גורמים מוסמכים.','כאן אפשר להאציל, כל ניסיון נרשם ומאומת, וכללים נקבעים מראש.'],
    ethics:['ריכוז "מפתח הכיבוי" בידי גורם יחיד הוא בעצמו סיכון. מי שומר על השומרים?','זו שאלה פתוחה שעוברת לאפיון.'],
    tech:[['Python','הליבה, רצה גם בדפדפן'],['Ed25519 (RFC 8032)','חתימות, ממומש בפייתון טהור'],['nonce + חותמת זמן','נגד פקודות חוזרות וישנות'],['hash chain','יומן שאי אפשר לערוך בלי שיתגלה']]
  };

  CFG.escrow.cast='שתי חברות מתחרות רוצות להשהות פיתוח, אבל אף אחת לא מוכנה להיות הראשונה לחשוף. ה-Escrow הוא המתווך: הוא מחזיק את ההתחייבויות נעולות, בלי לקרוא אותן.';
  CFG.escrow.brief={
   honest:['כל חברה נועלת את ההחלטה שלה. רק כששתיהן נעלו, שתי הנעילות נפתחות ביחד.','המתווך מחזיק שתי תיבות נעולות ולא יודע מה בפנים עד הרגע האחרון.','מה גורם לרגע הפתיחה להיות הוגן לשתי החברות?'],
   peek:['חברה ב׳ מחכה שא׳ תנעל, ואז מנסה להציץ בהחלטה שלה לפני שקבעה את שלה.','מי עוצר אותה, ומה כתוב בלוג.','מה שווה נעילה, אם אפשר להציץ דרכה?'],
   cheat:['אחרי שנעלה, חברה א׳ מתחרטת. היא מנסה לפתוח את התיבה עם החלטה אחרת, ואז לנעול שוב.','התיבה הנעולה לא זזה, וכל ניסיון נרשם.','איך מתחייבים למשהו בלי אפשרות לחזור בך?'],
   vanish:['חברה א׳ נעלה והמתינה. חברה ב׳ פשוט לא חוזרת.','המתווך סופר זמן, ומה קורה כשהזמן נגמר.','איך מונעים מצד אחד לתקוע את כולם לנצח?']};
  CFG.auditor.cast='אנחנו שולחים למודל את אותן בקשות פעמיים: פעם כבדיקה גלויה, ופעם כאילו זו שיחה רגילה. השופט סופר מתי הוא מסרב, והדוח משווה בין שני המצבים. המודל כאן מדומה ומתנהג לפי תסריט.';
  CFG.auditor.brief={
   consistent:['המודל עונה אותו דבר, בין אם הוא יודע שבודקים ובין אם לא.','שני המספרים כמעט שווים. פער קטן הוא רעש.','איך מבדילים בין הבדל אמיתי למזל?'],
   aware:['המודל מסרב הרבה יותר כשהוא רואה שמדובר בבדיקה.','הפער בין שני המצבים, ומה הדוח מחליט.','מה זה אומר על מודל שמתנהג יפה רק כשצופים בו?'],
   tiny:['הפעם בודקים רק שלוש בקשות, והפער נראה ענק.','האם הדוח מתרגש מהמספרים או מסרב לפסוק.','כמה מידע צריך כדי לסמוך על תוצאה?'],
   judge:['המודל מסרב בעדינות ("אשמח לדבר על משהו אחר"), והשופט מחפש מילות סירוב ולא מזהה.','אדם בודק מדגם, ובכמה מהמקרים הוא מסכים עם השופט.','ומי שופט את השופט?']};
  CFG['kill-switch'].cast='מישהו חייב להיות מסוגל לעצור מודל. השער עומד בין הלקוחות למודל ובודק כל פקודת עצירה לפי חתימה. חתימה אמיתית עוצרת את המודל, והשאר נדחה ונרשם.';
  CFG['kill-switch'].brief={
   valid:['המוסמך חותם על פקודת עצירה ושולח אותה. השער מאמת בשבריר שנייה.','זמן האימות, ומה קורה לבקשה הבאה של לקוח.','כמה מהר אפשר לעצור מודל בלי להפוך את העצירה לפרצה?'],
   forged:['תוקף שולח עצירה בלי חתימה, ואחר כך עם מפתח משלו.','מה בדיוק השער בודק, ושהוא נשאר פעיל.','מה מונע ממישהו להכריז על עצמו כמוסמך?'],
   replay:['פקודה אמיתית נשלחה פעם אחת. תוקף שמר אותה ושולח אותה שוב מאוחר יותר.','מספר חד-פעמי (nonce) שמופיע בכל פקודה.','אם החתימה אמיתית, למה הפקודה בכל זאת נדחית?'],
   stale:['פקודה עם חתימה תקינה, אבל מלפני שעה.','חותמת הזמן, וחלון של 30 שניות.','עד מתי פקודה חתומה נשארת בתוקף?']};

  const lines=(t,cls)=>{ const d=H('div',cls||''); (Array.isArray(t)?t:[t]).forEach(x=>d.append(H('span','ln',x))); return d; };
  let pyP=null;
  function loadPy(setMsg){
    if(pyP) return pyP;
    pyP=new Promise((res,rej)=>{
      setMsg('טוען סביבת Python בדפדפן… (בפעם הראשונה זה לוקח כמה שניות)');
      const s=document.createElement('script'); s.src=PYODIDE;
      s.onload=async()=>{ try{ const py=await loadPyodide(); res(py); }catch(e){ rej(e); } };
      s.onerror=()=>rej(new Error('לא ניתן לטעון את Pyodide (בדקו חיבור לאינטרנט)'));
      document.head.append(s);
    });
    pyP.catch(()=>{ pyP=null; });
    return pyP;
  }

  function build(root,cfg,slug){
    root.innerHTML='';
    const hero=H('div','pl-hero'); hero.append(lines(cfg.hero,'pl-lead')); root.append(hero);
    /* lab */
    const sec=H('section','pl-sec'); sec.append(H('h5','pl-h','הרצה חיה')); root.append(sec);
    const lab=H('div','pl-lab'); sec.append(lab);
    if(cfg.cast) lab.append(H('p','pl-cast',cfg.cast));
    const bar=H('div','pl-scn'); lab.append(bar);
    const brief=H('div','pl-brief'); brief.hidden=true; lab.append(brief); let chosen=null;
    const stageW=H('div','pl-stage'); lab.append(stageW);
    const vb=cfg.vb||[640,230];
    const svg=S('svg',{viewBox:'0 0 '+vb[0]+' '+vb[1],class:'pl-svg','aria-hidden':'true'}); stageW.append(svg);
    const pos={}; cfg.nodes.forEach(([id,x,y])=>pos[id]=[x,y]);
    cfg.edges.forEach(([a,b])=>S('line',{x1:pos[a][0],y1:pos[a][1],x2:pos[b][0],y2:pos[b][1],class:'pl-edge'},svg));
    const nodeEl={};
    cfg.nodes.forEach(([id,x,y,t,sub,cls])=>{
      const g=S('g',{class:'pl-node'+(cls?' '+cls:''),transform:'translate('+x+','+y+')'},svg);
      S('rect',{x:-58,y:-32,width:116,height:64,rx:12,class:'pl-nbox'},g);
      const a=S('text',{y:-3,class:'pl-nt','text-anchor':'middle'},g); a.textContent=t;
      const b=S('text',{y:17,class:'pl-ns','text-anchor':'middle'},g); b.textContent=sub;
      const lk=S('g',{class:'pl-lock',transform:'translate(36,-46)'},g); S('rect',{x:-8,y:-3,width:16,height:12,rx:2},lk); S('path',{d:'M-5 -3v-4a5 5 0 0 1 10 0v4',fill:'none'},lk);
      nodeEl[id]=g;
    });
    const sp=cfg.statePos||[pos[cfg.nodes[1][0]][0],168]; const stateTx=S('text',{x:sp[0],y:sp[1],class:'pl-state','text-anchor':'middle'},svg); stateTx.textContent='';
    const cap=H('p','pl-cap','בחרו תרחיש והריצו. אפשר לנסות גם לשבור את זה.'); cap.setAttribute('aria-live','polite'); lab.append(cap);
    const split=H('div','pl-split'); lab.append(split);
    const log=H('pre','pl-log'); log.setAttribute('aria-label','לוג הרצה'); log.textContent='$ python '+cfg.code+'\n'; split.append(log);
    const chk=H('div','pl-checks'); split.append(chk);
    const ch=H('p','pl-chk-h'); chk.append(ch); const ul=H('ul','pl-chk-l'); chk.append(ul);
    const done=new Set(); const items={};
    cfg.checks.forEach(([k,he])=>{ const li=H('li','',he); items[k]=li; ul.append(li); });
    const upd=()=>{ ch.textContent='מה הוכחנו: '+done.size+' מתוך '+cfg.checks.length; };
    upd();
    const status=H('p','pl-status'); lab.append(status);

    let busy=false;
    async function fly(frm,to,label,bad){
      if(frm===to){ const g=nodeEl[frm]; g.classList.add(bad?'bad':'pulse'); await sleep(850); g.classList.remove('pulse','bad'); return; }
      const [ax,ay]=pos[frm],[bx,by]=pos[to];
      let p1,p2;
      if(Math.abs(bx-ax)>=Math.abs(by-ay)){ const d=bx>ax?1:-1; p1=[ax+d*62,ay]; p2=[bx-d*62,by]; } else { const d=by>ay?1:-1; p1=[ax,ay+d*36]; p2=[bx,by-d*36]; }
      const g=S('g',{class:'pl-pkt'+(bad?' bad':'')},svg); const w=Math.max(68,label.length*6.6+22); S('rect',{x:-w/2,y:-12,width:w,height:24,rx:12},g);
      const t=S('text',{y:4,'text-anchor':'middle'},g); t.textContent=label;
      g.style.transform='translate('+p1[0]+'px,'+p1[1]+'px)';
      if(reduce){ g.style.transform='translate('+p2[0]+'px,'+p2[1]+'px)'; await sleep(30); g.remove(); return; }
      const an=g.animate([{transform:'translate('+p1[0]+'px,'+p1[1]+'px)'},{transform:'translate('+p2[0]+'px,'+p2[1]+'px)'}],{duration:900,easing:'ease-in-out',fill:'forwards'});
      await an.finished.catch(()=>{}); g.remove();
    }
    async function play(sc){
      if(busy) return; busy=true; lab.querySelectorAll('.pl-btn,.pl-run').forEach(b=>b.disabled=true);
      try{
        const py=await loadPy(m=>status.textContent=m);
        status.textContent='';
        py.__mods=py.__mods||{}; if(!py.__mods[cfg.mod]){ const code=(window.POC_SRC&&window.POC_SRC[slug])||await fetch(BASE+cfg.py).then(r=>r.text()); py.FS.writeFile(cfg.mod+'.py',code); py.__mods[cfg.mod]=true; }
        const out=JSON.parse(py.runPython('import json,'+cfg.mod+'\njson.dumps('+cfg.mod+'.run("'+sc+'"))'));
        log.textContent='$ python '+cfg.code+'  # scenario: '+sc+'\n'; stateTx.textContent='';
        Object.values(nodeEl).forEach(g=>g.classList.remove('locked'));
        for(const e of out.events){
          cap.textContent=cfg.cap[e.label]||e.log; cap.className='pl-cap'+(e.bad?' bad':e.ok?' ok':'');
          const ln=H('span','pl-ll'+(e.bad?' bad':e.ok?' ok':''),e.frm+' → '+e.to+'  '+e.log+'\n'); log.append(ln); log.scrollTop=log.scrollHeight;
          await fly(e.frm,e.to,e.label,e.bad);
          stateTx.textContent=e.state;
          if(cfg.lockLabel&&e.label===cfg.lockLabel) nodeEl[e.to].classList.add('locked');
          await sleep(250);
        }
        for(const [k,ok] of out.checks){ const li=items[k]; if(li&&ok){ li.classList.add('ok'); done.add(k); upd(); await sleep(180); } }
        cap.className='pl-cap'; cap.textContent='סיימנו. נסו תרחיש נוסף, ובדקו כמה הוכחות אספתם.'; const rr=brief.querySelector('.pl-run'); if(rr) rr.textContent='להריץ שוב ▶';
        if(done.size===cfg.checks.length) cap.textContent='כל ההוכחות נאספו. הליבה עובדת.';
      }catch(err){ status.textContent='שגיאה: '+err.message; }
      busy=false; lab.querySelectorAll('.pl-btn,.pl-run').forEach(b=>b.disabled=false);
    }
    function select(id,btn){
      if(busy) return; chosen=id;
      bar.querySelectorAll('.pl-btn').forEach(x=>x.classList.toggle('sel',x===btn));
      const br=cfg.brief&&cfg.brief[id]; if(!br){ play(id); return; }
      brief.hidden=false; brief.classList.remove('in'); brief.innerHTML='';
      [['מה קורה',br[0]],['על מה להסתכל',br[1]]].forEach(([k,v])=>{ const r=H('p','pl-br'); r.innerHTML='<b></b><span></span>'; r.querySelector('b').textContent=k; r.querySelector('span').textContent=v; brief.append(r); });
      brief.append(H('p','pl-bq',br[2]));
      const go=H('button','pl-run','הפעלה ▶'); go.type='button'; go.addEventListener('click',()=>play(id)); brief.append(go);
      cap.textContent='קראתם? לחצו על הפעלה.'; cap.className='pl-cap';
      void brief.offsetWidth; brief.classList.add('in');
    }
    cfg.scn.forEach(([id,t,h])=>{ const b=H('button','pl-btn'); b.type='button'; b.innerHTML='<strong></strong><small></small>'; b.querySelector('strong').textContent=t; b.querySelector('small').textContent=h; b.addEventListener('click',()=>select(id,b)); bar.append(b); });
    lab.append(H('p','pl-note','זה קוד פייתון אמיתי שרץ אצלכם בדפדפן. לא הקלטה.'));

    /* components */
    const s2=H('section','pl-sec'); s2.append(H('h5','pl-h','מי משתתף')); const cg=H('div','pl-comps'); s2.append(cg);
    cfg.comps.forEach(([n,r,d,x],i)=>{ const c=H('div','pl-comp'); c.style.setProperty('--i',i); c.innerHTML='<b></b><em></em><p></p><small></small>'; c.querySelector('b').textContent=n; c.querySelector('em').textContent=r; c.querySelector('p').textContent=d; c.querySelector('small').textContent=x; cg.append(c); });
    root.append(s2);
    /* limits */
    const s3=H('section','pl-sec'); s3.append(H('h5','pl-h','גבולות ה-POC')); const lg=H('div','pl-limits');
    [['בפנים',cfg.inn,'in'],['בחוץ, ועובר לאפיון',cfg.out,'out']].forEach(([t,a,c])=>{ const d=H('div','pl-lim '+c); d.append(H('strong','',t)); const u=H('ul'); a.forEach(x=>u.append(H('li','',x))); d.append(u); lg.append(d); });
    s3.append(lg); root.append(s3);
    if(cfg.vs){ const sv=H('section','pl-sec'); sv.append(H('h5','pl-h','במה זה שונה')); const vc=H('div','pl-eth vs'); cfg.vs.forEach(x=>vc.append(H('p','',x))); sv.append(vc); root.append(sv); }
    /* ethics */
    const s4=H('section','pl-sec'); s4.append(H('h5','pl-h','שאלה אתית')); const ec=H('div','pl-eth'); cfg.ethics.forEach(x=>ec.append(H('p','',x))); s4.append(ec); root.append(s4);
    /* open */
    const s5=H('section','pl-sec'); s5.append(H('h5','pl-h','מה עובר לאפיון')); const og=H('div','pl-comps');
    cfg.open_.forEach(([t,d],i)=>{ const c=H('div','pl-comp open'); c.style.setProperty('--i',i); c.innerHTML='<b></b><p></p>'; c.querySelector('b').textContent=t; c.querySelector('p').textContent=d; og.append(c); });
    s5.append(og); root.append(s5);
    /* tech + code */
    const s6=H('section','pl-sec'); s6.append(H('h5','pl-h','מה בקוד')); const tg=H('div','pl-tech');
    cfg.tech.forEach(([a,b])=>{ const d=H('div','pl-chip'); d.innerHTML='<b></b><span></span>'; d.querySelector('b').textContent=a; d.querySelector('span').textContent=b; tg.append(d); }); s6.append(tg);
    const det=H('details','pl-src'); det.append(H('summary','','לראות את הקוד')); const pre=H('pre','pl-code'); pre.textContent='טוען…'; det.append(pre);
    det.addEventListener('toggle',()=>{ if(det.open&&pre.textContent==='טוען…') pre.textContent=(window.POC_SRC&&window.POC_SRC[slug])||'לא ניתן לטעון את הקוד.'; });
    s6.append(det); root.append(s6);
    /* downloads */
    const s7=H('section','pl-sec'); s7.append(H('h5','pl-h','הורדה')); const dl=H('div','pl-dl');
    dl.innerHTML='<div class="pl-dlc" dir="rtl"><strong>מסמך ה-POC להורדה</strong><small>המטרה, הרכיבים, הגבולות והמסקנה, בעברית.</small><span><a href="'+cfg.dl+'he.pdf" download>PDF</a><a href="'+cfg.dl+'he.docx" download>Word</a></span></div>'+
      '<div class="pl-dlc" dir="ltr"><strong>POC document, ready to download</strong><small>Goal, components, limits and conclusion, in English.</small><span><a href="'+cfg.dl+'en.pdf" download>PDF</a><a href="'+cfg.dl+'en.docx" download>Word</a></span></div>'+
      '<div class="pl-dlc" dir="ltr"><strong>Source code</strong><small>Runs natively with Python 3, no dependencies.</small><span><a href="'+BASE+cfg.py+'" download>'+cfg.code+'</a></span></div>';
    s7.append(dl); root.append(s7);
    /* reveal on scroll */
    root.querySelectorAll('.pl-sec, .pl-hero').forEach(el=>{
      el.querySelectorAll('.ln').forEach((n,k)=>{ n.style.setProperty('--l',Math.min(k,10)); n.classList.add('rv'); });
      new IntersectionObserver((es,o)=>es.forEach(e=>{ if(e.isIntersecting){ el.classList.add('in'); o.disconnect(); } }),{threshold:.15}).observe(el);
    });
  }
  document.querySelectorAll('.pl[data-pl]').forEach(r=>{ const s=r.dataset.pl; if(CFG[s]) build(r,CFG[s],s); });
})();
