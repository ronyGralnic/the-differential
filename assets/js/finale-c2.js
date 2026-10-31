/* Case 02 · Stage 06: the decision, reframed (option A). The reader already knows who stopped where, so the question is why it matters.
   Two advocates (Sarah for the simulator, Emma for the registry), one bet ("which screen would you open on a crisis morning?"),
   a balance that takes a weight per round with a guess before each verdict, a simulated crisis morning in round 3, the missing box filled
   by animation, a devil's advocate pre-mortem for the winner, the cork board of stage 02, and the dossier with thumbnails.
   Round texts, win text, twist, back and honest come from window.FINALE['slow-motion-crisis']. */
(function(){
  const root=document.getElementById('finale'); if(!root||root.dataset.case!=='slow-motion-crisis') return;
  const F=window.FINALE&&window.FINALE['slow-motion-crisis']; if(!F) return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const H=(t,c,x)=>{ const e=document.createElement(t); if(c) e.className=c; if(x!=null) e.textContent=x; return e; };
  const sleep=ms=>new Promise(r=>setTimeout(r,reduce?10:ms));
  const tm=(id,w)=>`<button class="tm" data-t="${id}">${w}</button>`;
  const wire=el=>{ if(window.TermWin) window.TermWin.wire(el); };
  const go2=el=>el.scrollIntoView({block:'start',behavior:reduce?'auto':'smooth'});
  const A=F.a, K=F.k; root.classList.add('fz');
  const SARAH='<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="28" fill="#e4efec"/><path d="M14 26 q2 -16 16 -16 q14 0 16 16 q-4 -6 -16 -6 q-12 0 -16 6z" fill="#8a5a3b"/><circle cx="30" cy="30" r="12" fill="#f2d2b6"/><circle cx="26" cy="29" r="1.6" fill="#1e2422"/><circle cx="34" cy="29" r="1.6" fill="#1e2422"/><path d="M26 35 q4 3 8 0" stroke="#1e2422" stroke-width="1.6" fill="none"/><path d="M12 58 q4 -14 18 -14 q14 0 18 14z" fill="#2f6f68"/><rect x="22" y="26" width="7" height="5" rx="2" fill="none" stroke="#1e2422" stroke-width="1.2"/><rect x="31" y="26" width="7" height="5" rx="2" fill="none" stroke="#1e2422" stroke-width="1.2"/></svg>';
  const EMMA='<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="28" fill="#f3ecd8"/><circle cx="30" cy="27" r="12" fill="#e9c6a8"/><path d="M17 25 q1 -15 13 -15 q13 0 13 15 q-4 -6 -13 -6 q-9 0 -13 6z" fill="#4a2f22"/><circle cx="26" cy="27" r="1.5" fill="#1e2422"/><circle cx="34" cy="27" r="1.5" fill="#1e2422"/><path d="M26 33 q4 2.5 8 0" stroke="#1e2422" stroke-width="1.5" fill="none"/><path d="M12 58 q4 -16 18 -16 q14 0 18 16z" fill="#2f5d8a"/></svg>';
  const blk=(cls)=>{ const s=H('section','fz-b '+cls); root.append(s); return s; };

  /* 1 · the scene */
  let s=blk('fz-scene');
  s.innerHTML=`<p class="fz-k">${F.scene.kicker}</p>
   <p>אתם כבר יודעים מי נעצר איפה. Fire-Sale Cascade Simulator עבר ייזום, POC ואפיון, ונעצר בבדיקת הסגירה של הארכיטקטורה. Private Exposure Registry עבר את כולן.</p>
   <p>אז למה צריך עוד שלב? כי לעבור תחנות זה לא אותו דבר כמו לענות על השאלה ששלחה את כל התיק לדרך. שניהם עובדים, ושניהם נוגעים בחלק המהיר של המשבר. ההבדל ביניהם הוא לא ציון. הוא שאלה על איך רואים משבר.</p>
   <p></p><p class="fz-big"></p><p class="fz-def"></p>`;
  s.querySelectorAll('p')[3].textContent=F.scene.lines[2]; s.querySelector('.fz-big').textContent=F.scene.big; s.querySelector('.fz-def').textContent=F.scene.def;
  const adv=H('div','fz-adv');
  [[SARAH,'שרה, מורה ממנצ\'סטר (בדויה)',A,'הסימולציה מספרת את הסיפור שלי: איך מכירה אחת של הקרן שלי מפילה את הבאה. היא יודעת לשאול "מה אם".'],[EMMA,'אמה, אנליסטית ברשות פיקוח (בדויה)',K,'המרשם נותן לי מספר אחד על השוק של היום, בלי שאף קרן נחשפה. מספר שאני יכולה לפעול לפיו.']].forEach(([av,who,n,t],i)=>{ const c=H('div','fz-advc '+(i?'k':'a')); const a=H('span','fz-av'); a.innerHTML=av; const d=H('div'); d.append(H('small','',who),H('b','',n),H('p','','"'+t+'"')); c.append(a,d); adv.append(c); });
  s.append(adv,H('p','fz-q','לפני שנבדוק: אם הייתם הרגולטור, איזה מסך הייתם פותחים?'));

  /* 2 · the bet */
  s=blk('fz-bet'); s.append(H('h4','fz-h','ההימור שלכם'),H('p','','בוקר של משבר. השוק נפתח בירידה, והטלפון לא מפסיק לצלצל. מותר לכם לפתוח מסך אחד בלבד. איזה?'));
  const opts=H('div','fz-opts'); const note=H('p','fz-note','בחרו אחד. נחזור לזה בסוף.'); note.setAttribute('aria-live','polite');
  let bet=null; const BOPT=[[A,'הסימולציה','מה יקרה אם'],[K,'המרשם','מה המצב עכשיו']];
  const bb=BOPT.map(([n,l,sub])=>{ const b=H('button','fz-opt'); b.type='button'; b.append(H('b','',l),H('span','',sub),H('small','',n)); b.addEventListener('click',()=>{ bet=n; bb.forEach(x=>x.classList.toggle('on',x===b)); note.textContent='רשמנו: '+l+'. עכשיו שלושה סיבובים על המאזניים.'; start.disabled=false; try{ localStorage.setItem('td-bet-slow-motion-crisis',n); }catch(e){} }); opts.append(b); return b; });
  const start=H('button','fz-btn','לשים את המשקולות'); start.type='button'; start.disabled=true; s.append(opts,note,start);

  /* 3 · the balance and three rounds */
  const arena=blk('fz-arena'); arena.hidden=true;
  arena.innerHTML=`<div class="fz-scale"><svg viewBox="0 0 520 230" role="img" aria-label="מאזניים: הסימולציה מול המרשם">
    <rect x="252" y="40" width="16" height="170" rx="4" class="fz-post"/><path d="M200 214 h120 l-14 -14 h-92z" class="fz-post"/><circle cx="260" cy="42" r="9" class="fz-pivot"/>
    <g class="fz-beam"><rect x="70" y="36" width="380" height="10" rx="5" class="fz-bar"/></g>
      <g class="fz-pan r" transform="translate(410 41)"><path d="M0 0 L-38 70 M0 0 L38 70" class="fz-str"/><path d="M-52 70 h104 q-8 22 -52 22 q-44 0 -52 -22z" class="fz-dish"/><g class="fz-w"></g><text y="118" text-anchor="middle" class="fz-pl">הסימולציה</text></g>
      <g class="fz-pan l" transform="translate(110 41)"><path d="M0 0 L-38 70 M0 0 L38 70" class="fz-str"/><path d="M-52 70 h104 q-8 22 -52 22 q-44 0 -52 -22z" class="fz-dish"/><g class="fz-w"></g><text y="118" text-anchor="middle" class="fz-pl">המרשם</text></g></svg></div>
   <div class="fz-rounds"></div>`;
  const beam=arena.querySelector('.fz-beam'), pans={a:arena.querySelector('.fz-pan.r'),k:arena.querySelector('.fz-pan.l')}, rounds=arena.querySelector('.fz-rounds');
  let score={a:0,k:0};
  const NS='http://www.w3.org/2000/svg';
  function weight(side,label){ const g=pans[side].querySelector('.fz-w'); const n=g.childElementCount; const w=document.createElementNS(NS,'g'); w.setAttribute('class','fz-wt'); w.setAttribute('transform',`translate(${-30+n*30} 52)`); w.innerHTML=`<path d="M-12 16 h24 l-4 -16 h-16z"/><text y="12" text-anchor="middle">${label}</text>`; g.append(w); }
  function tilt(){ const d=Math.max(-9,Math.min(9,(score.a-score.k)*6)); pans.a.setAttribute('transform',`translate(410 ${41+d*3.3})`); pans.k.setAttribute('transform',`translate(110 ${41-d*3.3})`); beam.style.transform=`rotate(${d}deg)`; }
  // pans are inside the rotating beam group; keep pans level by counter-positioning (translate only)
  const RES=['tie','k','k']; let ri=0, gok=0;
  function round(){ const r=F.rounds[ri]; const i=ri; const c=H('div','fz-round'); c.append(H('p','fz-rk','סיבוב '+(i+1)+' מתוך 3'),H('p','fz-rq',r.q)); rounds.append(c);
    const after=()=>{ const g=H('div','fz-guess'); g.append(H('p','','לפני שנגלה: למי היתרון בסיבוב הזה?')); const row=H('div','fz-gr'); [['a','לסימולציה'],['tie','תיקו'],['k','למרשם']].forEach(([v,l])=>{ const b=H('button','fz-g',l); b.type='button'; b.addEventListener('click',()=>verdict(v)); row.append(b); }); g.append(row); c.append(g); };
    const verdict=(guess)=>{ const gEl=c.querySelector('.fz-guess'); if(gEl) gEl.remove(); const right=guess===RES[i]; if(right) gok++;
      c.append(H('p','fz-gres '+(right?'y':'n'),(right?'ניחשתם נכון.':'ניחשתם אחרת.')));
      const cols=H('div','fz-cols'); [['a',A,r.a,SARAH],['k',K,r.k,EMMA]].forEach(([k,n,[st,t],av])=>{ const x=H('div','fz-col '+k+' '+st); const hd=H('div','fz-ch'); const a=H('span','fz-av s'); a.innerHTML=av; hd.append(a,H('b','',n)); x.append(hd,H('p','',t)); cols.append(x); });
      c.append(cols,H('p','fz-v',r.v)); wire(c);
      if(RES[i]==='tie'){ weight('a','1'); weight('k','1'); score.a++; score.k++; } else { weight(RES[i],'+'); score[RES[i]]+=2; } tilt(); c.append(H('p','fz-tally','על המאזניים: המרשם '+score.k+' · הסימולציה '+score.a));
      ri++; if(ri<3){ const n=H('button','fz-btn','לסיבוב הבא'); n.type='button'; n.addEventListener('click',()=>{ n.remove(); round(); }); c.append(n); } else finish(); };
    if(i===2) morning(c,after); else after(); go2(c); }
  start.addEventListener('click',()=>{ arena.hidden=false; start.disabled=true; bb.forEach(b=>b.disabled=true); round(); });

  /* round 3: a simulated crisis morning */
  function morning(c,done){
    const m=H('div','fz-morn'); c.append(m);
    const EV=[['07:00','התשואה ל-30 שנה פותחת בעלייה של 0.2 נקודה.'],['08:00','עוד 0.2. שתי קרנות פנסיה מתקשרות למלווים שלהן.'],['09:00','המלווים דורשים ביטחונות נוספים עד הצהריים.'],['10:00','קרן ראשונה מוכרת אג"ח כדי להשיג מזומן. המחיר יורד עוד.'],['11:00','צריך להחליט: להתערב עכשיו, או לחכות למחר?']];
    m.innerHTML=`<p class="fz-mk">בוקר מדומה, בהשראת ספטמבר 2022. אתם הרגולטור. גררו את השעון, ותראו מה מראה כל מסך.</p>
     <label class="fz-clock"><b>07:00</b><input type="range" min="0" max="4" step="1" value="0" aria-label="השעה"></label><p class="fz-ev" aria-live="polite"></p>
     <div class="fz-screens"><div class="fz-scr a"><span class="fz-sk">המסך של הסימולציה</span><svg viewBox="0 0 260 130" aria-hidden="true"><line x1="10" y1="120" x2="250" y2="120" class="fz-ax"/><path class="fz-f f1" d=""/><path class="fz-f f2" d=""/><path class="fz-f f3" d=""/><text x="250" y="16" class="fz-ft t3" text-anchor="end">מנוף 5.5: ספירלה</text><text x="250" y="62" class="fz-ft t2" text-anchor="end">מנוף 5: כנראה ספירלה</text><text x="250" y="108" class="fz-ft t1" text-anchor="end">מנוף 4: שקט</text></svg><p>איזה קו נכון? תלוי ב${tm('leverage','מנוף')} של היום, שהסימולציה לא יודעת.</p></div>
      <div class="fz-scr k"><span class="fz-sk">המסך של המרשם</span><div class="fz-num"><b>1 מתוך 3</b><span>מהקרנות ממונפות מעל פי 4</span></div><div class="fz-num s"><b>17%</b><span>מה${tm('exposure','חשיפה')} בריבית מעל 5%</span></div><span class="fz-stamp">מאומת · רשום ביומן</span><p>במספרים המדומים של ה-POC. אותו מספר בכל שעה: הוא מצב, לא תחזית.</p></div></div>
     <div class="fz-dec" hidden><p>11:00. מה אתם עושים?</p><div class="fz-gr"><button type="button" class="fz-g" data-d="now">להתערב עכשיו</button><button type="button" class="fz-g" data-d="wait">לחכות למחר</button></div><p class="fz-dout" aria-live="polite"></p></div>`;
    const r=m.querySelector('input'), clk=m.querySelector('.fz-clock b'), ev=m.querySelector('.fz-ev'), dec=m.querySelector('.fz-dec');
    const fan=h=>{ const sp=8+h*9; const p=(k)=>{ const end=120-k*sp*(k===3?1.2:1); return `M10 118 C90 116 170 ${118-(k*sp)/3} 250 ${Math.max(14,end)}`; }; m.querySelector('.f1').setAttribute('d',`M10 118 C90 116 170 116 250 ${118-h*2}`); m.querySelector('.f2').setAttribute('d',p(2)); m.querySelector('.f3').setAttribute('d',p(3)); };
    const draw=()=>{ const h=+r.value; clk.textContent=EV[h][0]; ev.textContent=EV[h][1]; fan(h); if(h===4) dec.hidden=false; }; r.addEventListener('input',draw); draw();
    let decided=false; m.querySelectorAll('[data-d]').forEach(b=>b.addEventListener('click',()=>{ if(decided) return; decided=true; m.querySelectorAll('[data-d]').forEach(x=>x.disabled=true); b.classList.add('on');
      const o=m.querySelector('.fz-dout'); o.textContent=(b.dataset.d==='now'?'התערבתם. ':'חיכיתם. ')+(bet===K?'עם המסך של המרשם יש לכם נימוק: שליש מהשוק ממונף מעל פי 4, וזה מספר מאומת שאפשר להציג לשר ולשוק.':'עם המסך של הסימולציה, שתי ההחלטות סבירות באותה מידה, ולכן קשה להגן על כל אחת מהן. הכול תלוי במספר שלא היה לכם.')+' ועכשיו, הסיבוב עצמו:';
      wire(o); setTimeout(done,reduce?0:900); }));
    wire(m); }

  /* 4 · the reveal */
  const out=blk('fz-out'); out.hidden=true;
  async function finish(){ out.hidden=false; const w=H('div','fz-win'); w.append(H('p','fz-k','המאזניים נטו. '+F.win.kicker),H('h3','fz-name',K),H('p','',F.win.text),H('p','fz-own','את מי שעבר את כל התחנות ידעתם כבר. עכשיו אתם יודעים למה זה משנה: מי שרואה את המצב של היום יכול לפעול לפני שהשרשרת מתחילה.'));
    const bt=bet===K?'גם אתם פתחתם את המסך של המרשם, ובסיבובים צדקתם ב-'+gok+' מתוך 3.':'פתחתם את המסך של הסימולציה. זו בחירה שקל לעשות: הסימולציה נראית כמו הכלי החכם יותר, והיא באמת יודעת לחשב. אבל חישוב מצוין שמוזן בניחוש מוציא ניחוש מצוין. בסיבובים צדקתם ב-'+gok+' מתוך 3.';
    w.append(H('p','fz-bt',bt)); out.append(w); go2(w); if(window.gcEvent) gcEvent('finale-reveal'); await sleep(1400); twist(); }

  /* 5 · the missing box, filled */
  function twist(){ const T=F.twist; const b=H('section','fz-b fz-twist'); b.append(H('h4','fz-h',T.h),H('p','',T.text));
    b.insertAdjacentHTML('beforeend',`<div class="fz-bp"><svg viewBox="0 0 560 250" role="img" aria-label="התרשים של Fire-Sale: מנוע הסימולציה, וקופסה ריקה מחוץ לגבולות">
      <rect x="250" y="20" width="290" height="200" rx="6" class="fz-lot"/><text x="530" y="40" text-anchor="start" class="fz-bt2">המגרש של Fire-Sale</text>
      <rect x="330" y="80" width="170" height="70" rx="6" class="fz-box"/><text x="415" y="121" text-anchor="middle" class="fz-bl">${T.box1}</text>
      <path d="M230 115 H326" class="fz-arr"/><text x="278" y="104" text-anchor="middle" class="fz-al">חשיפות השוק היום</text>
      <rect x="40" y="80" width="170" height="70" rx="6" class="fz-hole"/><text x="125" y="125" text-anchor="middle" class="fz-hq">?</text>
      <g class="fz-rg"><rect x="40" y="80" width="170" height="70" rx="6"/><text x="125" y="121" text-anchor="middle">Private Exposure Registry</text></g>
      <g class="fz-fanw" transform="translate(330 160)"><path d="M0 50 C60 48 110 40 170 8" class="fz-fn x"/><path d="M0 50 C60 49 110 46 170 30" class="fz-fn keep"/><path d="M0 50 C60 50 110 50 170 48" class="fz-fn x"/></g></svg></div>`);
    const fill=H('button','fz-btn',T.btn); fill.type='button'; const msg=H('p','fz-msg',T.msg); msg.hidden=true; b.append(fill,msg); out.append(b); go2(b);
    fill.addEventListener('click',()=>{ fill.disabled=true; b.classList.add('filled'); setTimeout(()=>{ msg.hidden=false; back(); },reduce?0:1600); }); }
  function back(){ const T=F.back; const b=H('section','fz-b fz-back'); b.append(H('h4','fz-h',T.h),H('p','',T.text));
    const dg=H('div','fz-dg'); dg.append(H('span','fz-bx on',T.box1),H('span','fz-ar',T.arrow),H('span','fz-bx',T.box2)); const btn=H('button','fz-btn',T.btn); btn.type='button'; b.append(dg,btn);
    btn.addEventListener('click',async()=>{ btn.disabled=true; dg.classList.add('lit'); for(const m of T.msgs){ const p=H('p','fz-bm',m); b.append(p); if(!reduce) p.animate([{opacity:0},{opacity:1}],{duration:500}); await sleep(800); } devil(); });
    out.append(b); go2(b); }

  /* 6 · devil's advocate: a pre-mortem for the winner */
  function devil(){ const T=F.honest; const b=H('section','fz-b fz-devil'); b.append(H('p','fz-k','פרקליט השטן'),H('h4','fz-h','שנה מהיום. גם הזוכה נכשל. מה קרה?'),H('p','','ניצחון לא אומר שאין חורים. אלה שלוש כותרות שאנחנו לא רוצים לקרוא, וכל אחת מהן כתובה גם במסמכים שלו.'));
    const HL=['קרן דיווחה מנוף נמוך מהאמת, והמרשם הציג תמונה יפה מדי','שלוש רשויות לא הסכימו על הקטלוג, והמרשם עמד חצי שנה','המשבר הבא התחיל בקרן שאף רגולטור לא מפקח עליה'];
    const g=H('div','fz-pml'); T.items.forEach(([h,t],i)=>{ const c=H('article','fz-pm'); c.append(H('span','fz-date','חדשות · שנה מהיום'),H('h5','',HL[i])); const btn=H('button','fz-how','ומה האמת? ←'); btn.type='button'; const a=H('div','fz-ans'); a.hidden=true; a.append(H('b','',h),H('p','',t)); btn.addEventListener('click',()=>{ c.classList.add('open'); a.hidden=false; btn.remove(); }); c.append(btn,a); g.append(c); });
    b.append(g,H('p','fz-q','אם אלה החורים שלו, מי צריך לסתום אותם: קוד, או אנשים?')); out.append(b); setTimeout(()=>{ cork(); dossier(); },reduce?0:300); }

  /* 7 · and the slow part? the cork board of stage 02 */
  function cork(){ const b=H('section','fz-b fz-cork'); b.append(H('h4','fz-h','ומה עם החלק האיטי?'),H('p','','בשלב 02 פרשנו על לוח השעם ארבע בעיות. הזוכה פותר אחת מהן. ומה קרה לשלוש האחרות?'));
    const N=[['חומת הפקיעות','החוב הזול מתחלף ביקר, אג"ח אחר אג"ח.','Maturity Wall ראה את המחיר, ונפל באפיון: הוא לא ראה מי ייפגע.',0],['הענק שנכנס לתור','ענקיות ה-AI לוות, והכסף מתייקר לכולם.','Issuance נמחק על הלוח: הנתונים סגורים במנויים.',0],['הבטחה בלי מחיר','כל צד אומר שהמספרים שלו מסתדרים.','Fiscal Promise ו-Golden Rule נמחקו על הלוח: סיכון ופוליטיקה.',0],['החשיפה שאף אחד לא ראה','מנוף וחשיפות שאף אחד לא סופר.','את זה הזוכה פותר.',1]];
    const bd=H('div','fz-board'); N.forEach(([t,d,st,ok],i)=>{ const n=H('div','fz-note'+(ok?' ok':'')); n.style.setProperty('--r',((i*37)%5-2)+'deg'); n.append(H('i','fz-pin'),H('b','',t),H('p','',d),H('span','fz-st',(ok?'✓ ':'')+st)); bd.append(n); });
    const ln=H('a','fz-link','ללוח השעם של שלב 02 ←'); ln.href='problems.html';
    b.append(bd,ln,H('p','fz-q','שלוש בעיות נשארו פתוחות. מה עושים איתן, ומי ימשיך מכאן? על זה שלב 07.')); out.append(b); }

  /* 8 · the dossier */
  function dossier(){ const D=F.dossier; const b=H('section','fz-b fz-dos'); b.append(H('h4','fz-h',D.h),H('p','',D.p));
    const items=[['ייזום','registry-ideation','rg-ideation'],['מחקר ו-POC','registry-poc','rg-poc'],['אפיון','registry-spec','rg-spec'],['ארכיטקטורה','registry-arch','rg-arch'],['יומן ההחלטות','registry-adr-log','rg-adr-log'],['מסמך עיצוב','registry-design','rg-design'],['מודל האיום (שלושת השורדים)','slow-motion-crisis-threat-model','c2-threat-model'],['ההכרעה','slow-motion-crisis-decision','c2-decision']];
    const g=H('div','fz-shelf'); items.forEach(([n,base,pk])=>{ const c=H('div','fz-doc'); const im=H('img'); im.alt=''; im.loading='lazy'; im.src='../../assets/img/peek/'+pk+'-p1.jpg'; im.onerror=()=>im.remove(); const t=H('div'); t.append(H('b','',n)); const a=H('div','fz-da'); [['עברית','he'],['English','en']].forEach(([l,lg])=>{ const x=H('a','','PDF · '+l); x.href='downloads/'+base+'-'+lg+'.pdf'; x.setAttribute('download',''); a.append(x); }); t.append(a); c.append(im,t); g.append(c); });
    b.append(g,H('p','fz-learn',D.learn),H('p','fz-q',D.q)); out.append(b); wire(out); }

  wire(root);
})();
