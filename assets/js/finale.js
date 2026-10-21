/* Stage 06: the decision. Bet, three rounds, reveal, the missing box, dossier. */
(function(){
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const H=(t,c,x)=>{ const e=document.createElement(t); if(c) e.className=c; if(x!=null) e.textContent=x; return e; };
  const sleep=ms=>new Promise(r=>setTimeout(r,reduce?10:ms));
  const root=document.getElementById('finale'); if(!root) return;
  const A='Automated Model Risk Auditor', K='Model Kill-Switch Protocol';
  const ROUNDS=[
   {q:'הסיבוב הראשון: זיהוי. האם הוא מבחין שמשהו השתבש?',a:['ok','כן. שלושה שופטים בודקים כל תשובה, ובדיקה אחרי שחרור משווה את מה שנבדק למה שקורה בשטח.'],k:['ok','כן. ניטור עצמי מחשב כמה משהו חריג ביחס לרגיל, ושומר כל חריגה ביומן.'],v:'תיקו. וזה לא מפתיע: לזהות בעיה זה החלק הקל.'},
   {q:'הסיבוב השני: אכיפה. האם הוא יכול לעצור מודל בלי לבקש רשות מאף אחד?',a:['bad','לא. כשהוא מזהה סטייה הוא שולח בקשת השעיה למנגנון חיצוני, ומקווה שיענו לו.'],k:['ok','כן. אחרי שהפקודה עברה חתימות, בדיקת מדיניות ויומן, השער שליד השרת חוסם. אין עוד מי שיכול לעכב.'],v:'כאן הדרכים נפרדות. אחד מהם יודע, והשני גם פועל.'},
   {q:'הסיבוב השלישי: כשאף אחד לא מקשיב. מה נשאר בידיים?',a:['bad','דוח חתום ומסודר. מי שמחליט להתעלם ממנו, ממשיך כרגיל.'],k:['ok','חסימה שכבר קרתה. ואם הקשר למרכז נופל, השער עובר למצב כשל בטוח לפי כלל שנקבע מראש.'],v:'דוח אפשר לקרוא או לא לקרוא. חסימה אי אפשר להתעלם ממנה.'}
  ];
  const sec=(cls)=>{ const s=H('div','fn-b '+cls); root.append(s); return s; };

  /* A: scene */
  let s=sec('fn-scene'); s.append(H('p','fn-kicker','הדלת האחרונה'));
  ['כל הבדיקות מאחורינו. אפיון, תרשימי רכיבים, מבחן סגירה. כל רעיון נאלץ להסביר את עצמו שוב ושוב.','ובכל זאת, לא ראינו אותם זה מול זה. כל אחד נבחן לבד, מול הדרישות שלו.','עכשיו אנחנו שואלים שאלה אחת, והיא אותה שאלה ששלחה אותנו לדרך.'].forEach(t=>s.append(H('p','fn-p',t)));
  s.append(H('p','fn-big','מי מחזיק את המתג?'));
  s.append(H('p','fn-p','מתג הוא היכולת לעצור מודל. מי שמזהה בעיה לא בהכרח מחזיק מתג: אולי הוא רק מתקשר למי שמחזיק. ההבדל בין "רואה" לבין "יכול לעצור" הוא כל הסיפור.'));
  s.append(H('p','fn-q','לפני שנבדוק: מי לדעתכם?'));

  /* B: bet */
  s=sec('fn-bet'); s.append(H('h4','fn-h','ההימור שלכם'));
  const bets=H('div','fn-opts'); const betMsg=H('p','fn-note','בחרו אחד. נחזור לזה בסוף.'); betMsg.setAttribute('aria-live','polite');
  let bet=null; const bb=[A,K].map(n=>{ const b=H('button','fn-opt',n); b.type='button'; b.addEventListener('click',()=>{ bet=n; bb.forEach(x=>x.classList.toggle('on',x===b)); betMsg.textContent='רשמנו: '+n+'. עכשיו נבדוק.'; go.disabled=false; }); bets.append(b); return b; });
  const go=H('button','fn-btn','התחילו את ההכרעה'); go.type='button'; go.disabled=true;
  s.append(bets,betMsg,go);

  /* C: rounds */
  const arena=sec('fn-arena'); arena.hidden=true;
  const head=H('div','fn-vs'); head.append(H('b','',A),H('i','','מול'),H('b','',K)); arena.append(head);
  const list=H('div','fn-rounds'); arena.append(list);
  const nxt=H('button','fn-btn','הסיבוב הבא'); nxt.type='button'; arena.append(nxt);
  let ri=0;
  function round(){
    const r=ROUNDS[ri++]; const c=H('div','fn-round'); c.append(H('p','fn-rq',r.q));
    const cols=H('div','fn-cols'); [[A,r.a],[K,r.k]].forEach(([n,[st,t]])=>{ const x=H('div','fn-col '+st); x.append(H('b','',n),H('span','fn-st',st==='ok'?'עבר':'נפל'),H('p','',t)); cols.append(x); });
    c.append(cols,H('p','fn-v',r.v)); list.append(c); if(!reduce) c.animate([{opacity:0,transform:'translateY(14px)'},{opacity:1,transform:'none'}],{duration:500,easing:'ease-out'});
    c.scrollIntoView({block:'center',behavior:reduce?'auto':'smooth'});
    if(ri===ROUNDS.length){ nxt.hidden=true; reveal.hidden=false; revealWrap.hidden=false; }
  }
  go.addEventListener('click',()=>{ arena.hidden=false; go.disabled=true; bb.forEach(b=>b.disabled=true); round(); });
  nxt.addEventListener('click',round);

  /* D: reveal */
  const revealWrap=sec('fn-revealwrap'); revealWrap.hidden=true;
  revealWrap.append(H('p','fn-p','שלושה סיבובים. תיקו אחד ושני הפרשים. נשארה שאלה אחת.'));
  const reveal=H('button','fn-btn big','מי מחזיק את המתג?'); reveal.type='button'; reveal.hidden=true; revealWrap.append(reveal);
  const out=sec('fn-out'); out.hidden=true;
  reveal.addEventListener('click',async()=>{ if(window.gcEvent) gcEvent('finale-reveal');
    reveal.disabled=true; out.hidden=false; out.classList.add('dark');
    const t=H('p','fn-drum','…'); out.append(t); out.scrollIntoView({block:'center',behavior:reduce?'auto':'smooth'}); await sleep(1100);
    t.remove(); const w=H('div','fn-win'); w.append(H('p','fn-kicker','המתג נמצא אצל'),H('h3','fn-name',K),H('p','fn-p','מנגנון עצירת חירום שבו הפקודה נחתמת בידי ועדה, נרשמת ביומן ציבורי, מופצת לכל שער, ונאכפת ליד כל שרת שמגיש את המודל. הוא לא מבקש מאף אחד לעצור. הוא עוצר.'));
    out.append(w); if(!reduce) w.animate([{opacity:0,transform:'scale(.96)'},{opacity:1,transform:'none'}],{duration:700,easing:'ease-out'});
    await sleep(900);
    out.append(H('p','fn-bet',bet===K?'ההימור שלכם היה נכון.':'ההימור שלכם היה '+A+'. זו טעות שקל לעשות: מי שרואה הכול נראה כמי שמחזיק הכול.'));
    await sleep(900); twist(); });

  /* E: the missing box */
  function twist(){
    const b=H('div','fn-twist'); b.append(H('h4','fn-h','והחלק שהכי מפתיע'),H('p','fn-p','זוכרים את התרשים של '+A+'? בקצה שלו יש קופסה מקווקוות: "מנגנון עצירה חיצוני". זה המקום שאליו הוא שולח כל בקשת השעיה. הוא לא בנה אותו, כי זה לא התפקיד שלו.'));
    const dg=H('div','fn-dg'); const x1=H('span','fn-bx','ניטור אחרי שחרור'),ar=H('span','fn-ar','בקשת השעיה ←'),x2=H('span','fn-bx fn-hole','?'); dg.append(x1,ar,x2);
    const fill=H('button','fn-btn','מלאו את החור'); fill.type='button'; fill.addEventListener('click',()=>{ x2.textContent=K; x2.classList.remove('fn-hole'); x2.classList.add('fn-filled'); fill.disabled=true; msg.hidden=false; });
    const msg=H('p','fn-p','הרעיון שנפל חיפש בדיוק את מה שהזוכה בנה. הם לא יריבים. אחד מהם פשוט נעצר בלי החלק החסר שלו.'); msg.hidden=true;
    b.append(dg,fill,msg); out.append(b); b.scrollIntoView({block:'center',behavior:reduce?'auto':'smooth'});
    fill.addEventListener('click',()=>setTimeout(dossier,reduce?0:1200)); }

  /* F: dossier */
  function dossier(){
    const d=H('div','fn-dos'); d.append(H('h4','fn-h','התיק המלא של הזוכה'),H('p','fn-p','כל מה שהוא עבר, בכל השלבים, להורדה. בעברית ובאנגלית.'));
    const g=H('div','fn-dg2'); [['ייזום','ideation'],['מחקר ו-POC','poc'],['אפיון','spec'],['ארכיטקטורה','arch'],['מסמך עיצוב','design']].forEach(([n,k])=>{ const c=H('div','fn-dc'); c.append(H('b','',n)); const a=H('div','fn-da'); [['HE','he'],['EN','en']].forEach(([l,lg])=>{ const x=H('a','',l+' · PDF'); x.href='downloads/kill-switch-'+k+'-'+lg+'.pdf'; x.setAttribute('download',''); a.append(x); }); c.append(a); g.append(c); });
    d.append(g,H('p','fn-p','מה למדנו: מערכת שרואה בלי יכולת לפעול היא דוח. מערכת שפועלת בלי שקיפות היא סיכון. ההבדל הוא באיזה צד של המתג עומדים.'),H('p','fn-q','ואם המתג קיים, מי מורשה ללחוץ עליו, ומי שומר על מי שלוחץ?'));
    out.append(d); d.scrollIntoView({block:'center',behavior:reduce?'auto':'smooth'}); }
})();
