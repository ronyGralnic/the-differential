/* Term windows: <button class="tm" data-t="bond">אג"ח</button> opens a floating window with
   one sentence, a small looping animation (SVG + SMIL), "from your life", an invented person, and the link to our story.
   Data: window.TERMS (terms-data.js). Desktop: popover near the word. Phone: bottom sheet. */
(function(){
  const T=window.TERMS||{}; if(!Object.keys(T).length) return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const H=(t,c,x)=>{ const e=document.createElement(t); if(c) e.className=c; if(x!=null) e.textContent=x; return e; };

  /* ---------- tiny SVG kit ---------- */
  const A=(attr,vals,dur,extra)=>`<animate attributeName="${attr}" values="${vals}" dur="${dur}s" repeatCount="indefinite"${extra||''}/>`;
  const TR=(vals,dur,extra)=>`<animateTransform attributeName="transform" type="translate" values="${vals}" dur="${dur}s" repeatCount="indefinite"${extra||''}/>`;
  const RO=(vals,dur,extra)=>`<animateTransform attributeName="transform" type="rotate" values="${vals}" dur="${dur}s" repeatCount="indefinite"${extra||''}/>`;
  const KT=(k)=>` keyTimes="${k}"`;
  const coin=(x,y,r=9,cls='tc')=>`<circle class="${cls}" cx="${x}" cy="${y}" r="${r}"/><text class="tcs" x="${x}" y="${y+3.5}" text-anchor="middle">₪</text>`;
  const txt=(x,y,s,cls='tl',a='middle')=>`<text class="${cls}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const person=(x,y,cls='tp')=>`<g class="${cls}"><circle cx="${x}" cy="${y-22}" r="8"/><path d="M${x-13} ${y+6} q0 -20 13 -20 q13 0 13 20 z"/></g>`;
  const bank=(x,y,w=58,lbl='')=>`<g class="tb"><path d="M${x-w/2-4} ${y-34} L${x} ${y-50} L${x+w/2+4} ${y-34} z"/><rect x="${x-w/2}" y="${y-34}" width="${w}" height="34" rx="2"/>${[0.2,0.5,0.8].map(k=>`<rect class="tbp" x="${x-w/2+w*k-3}" y="${y-30}" width="6" height="26"/>`).join('')}</g>${lbl?txt(x,y+16,lbl):''}`;
  const doc=(x,y,lbl,cls='td')=>`<g class="${cls}"><rect x="${x-20}" y="${y-26}" width="40" height="52" rx="4"/><line x1="${x-12}" x2="${x+12}" y1="${y-12}" y2="${y-12}"/><line x1="${x-12}" x2="${x+8}" y1="${y-4}" y2="${y-4}"/><line x1="${x-12}" x2="${x+10}" y1="${y+4}" y2="${y+4}"/>${lbl?`<text class="tdl" x="${x}" y="${y+19}" text-anchor="middle">${lbl}</text>`:''}</g>`;
  const svg=(inner,label)=>`<svg viewBox="0 0 320 150" class="tm-svg" role="img" aria-label="${label}">${inner}</svg>`;

  const ANIM={
   interest:()=>svg(
     bank(260,110,58,'המלווה')+person(60,110)+txt(60,128,'אתם')+
     `<g>${TR('0,0;-190,0;-190,0;0,0;0,0',5,KT('0;.3;.5;.85;1'))}${coin(250,62)}${coin(262,56)}${coin(274,62)}</g>`+
     `<g opacity="0">${A('opacity','0;0;1;1;0',5,KT('0;.5;.55;.9;1'))}<g>${TR('-178,0;-178,0;12,0;12,0',5,KT('0;.5;.85;1'))}${coin(262,40,9,'tc hot')}</g></g>`+
     `<text class="tl hot" x="160" y="30" text-anchor="middle" opacity="0">${A('opacity','0;0;1;1;0',5,KT('0;.55;.6;.9;1'))}+ ריבית: המחיר של הכסף</text>`,'כסף יוצא מהמלווה ומגיע אליכם, וחוזר אליו עם מטבע נוסף: הריבית'),
   bond:()=>svg(
     bank(260,112,58,'המדינה')+person(60,112)+txt(60,130,'המלווה')+
     `<g>${TR('0,0;190,0;190,0',6,KT('0;.25;1'))}${coin(64,58,11)}</g>`+
     `<g>${TR('0,0;-190,0;-190,0',6,KT('0;.25;1'))}${doc(252,62,'אג"ח')}</g>`+
     [0,1,2].map(i=>`<g opacity="0">${A('opacity',`0;0;1;1;0;0`,6,KT(`0;${.32+i*.12};${.34+i*.12};${.42+i*.12};${.44+i*.12};1`))}<g>${TR(`0,0;0,0;-170,0;-170,0`,6,KT(`0;${.34+i*.12};${.42+i*.12};1`))}${coin(240,96,6,'tc sm')}</g></g>`).join('')+
     `<text class="tl" x="160" y="24" text-anchor="middle" opacity="0">${A('opacity','0;0;1;1;0',6,KT('0;.3;.33;.7;.75'))}בכל שנה: תשלום ריבית קטן</text>`+
     `<text class="tl hot" x="160" y="24" text-anchor="middle" opacity="0">${A('opacity','0;0;1;1',6,KT('0;.78;.8;1'))}בסוף התקופה: כל הכסף חוזר</text>`,'המלווה נותן כסף למדינה ומקבל תעודה. בכל שנה מגיע תשלום ריבית קטן, ובסוף הכסף חוזר'),
   yield:()=>svg(
     `<polygon class="tb" points="160,120 148,140 172,140"/>`+
     `<g>${RO('-10 160 120;10 160 120;-10 160 120',4)}<line class="tbeam" x1="50" y1="120" x2="270" y2="120"/>`+
     `<g><rect class="tbox" x="40" y="88" width="64" height="30" rx="6"/>${txt(72,108,'מחיר')}</g>`+
     `<g><rect class="tbox hot" x="216" y="88" width="64" height="30" rx="6"/>${txt(248,108,'תשואה','tl hot')}</g></g>`+
     txt(160,28,'מחיר האג"ח יורד ⇠ התשואה עולה','tl'),'נדנדה: כשמחיר האג"ח יורד, התשואה עולה, וההפך'),
   rollover:()=>svg(
     `<line class="tbeam" x1="20" y1="118" x2="300" y2="118"/>`+txt(160,26,'הריבית הקבועה נגמרת ⇠ ממחזרים בריבית של היום')+
     `<g>${TR('0,0;0,0;140,0',5,KT('0;.4;.7'))}${A('opacity','1;1;0;0',5,KT('0;.55;.7;1'))}${doc(160,84,'0.5%')}</g>`+
     `<g opacity="0">${A('opacity','0;0;1;1',5,KT('0;.55;.75;1'))}<g>${TR('-140,0;-140,0;0,0;0,0',5,KT('0;.55;.85;1'))}${doc(160,84,'3.5%','td hot')}</g></g>`+
     `<g>${txt(60,140,'2016','tl dim')}${txt(260,140,'2026','tl dim')}</g>`,'תעודה ישנה עם ריבית של חצי אחוז יוצאת, ובמקומה נכנסת תעודה חדשה עם חמישה אחוז'),
   gdp:()=>svg(
     `<path class="tbask" d="M100 80 L220 80 L205 136 L115 136 Z"/>`+txt(160,26,'כל מה שהמדינה מייצרת בשנה אחת')+
     [['🍞',125],['💻',150],['🚗',175],['🏥',200],['🎓',140],['🧀',188]].map(([e,x],i)=>`<text class="temo" x="${x}" y="0" text-anchor="middle" opacity="0">${A('opacity',`0;0;1;1;0`,6,KT(`0;${i*.12};${i*.12+.02};.92;1`))}${A('y',`0;0;${118-(i%2)*18};${118-(i%2)*18}`,6,KT(`0;${i*.12};${i*.12+.1};1`))}${e}</text>`).join('')+
     `<rect class="tbar" x="250" y="136" width="18" height="0">${A('height','0;90;90;0',6,KT('0;.8;.95;1'))}${A('y','136;46;46;136',6,KT('0;.8;.95;1'))}</rect>`+txt(259,148,'תמ"ג','tl dim'),'סל שמתמלא בכל מה שהמדינה מייצרת בשנה: לחם, תוכנה, רכבים. הגובה הכולל הוא התמ"ג'),
   deficit:()=>svg(
     `<rect class="tbar" x="70" y="62" width="44" height="70"/>${txt(92,146,'הכנסות')}`+
     `<rect class="tbar hot" x="130" y="40" width="44" height="92"/>${txt(152,146,'הוצאות')}`+
     `<rect class="tgap" x="70" y="40" width="44" height="22">${A('opacity','.2;1;.2',2)}</rect>${txt(92,34,'גירעון','tl hot')}`+
     `<rect class="tbar debt" x="230" y="132" width="44" height="0">${A('height','10;40;70;90;10',8,KT('0;.25;.5;.75;1'))}${A('y','122;92;62;42;122',8,KT('0;.25;.5;.75;1'))}</rect>${txt(252,146,'החוב')}`+
     `<text class="tl dim" x="200" y="22" text-anchor="middle">בכל שנה ההפרש נוסף לחוב</text>`,'הוצאות גבוהות מההכנסות. ההפרש, הגירעון, נוסף לחוב, והחוב גדל משנה לשנה'),
   inflation:()=>{ const V=[['1;1;0;0','0;.32;.34;1'],['0;0;1;1;0;0','0;.32;.34;.65;.67;1'],['0;0;1;1','0;.65;.67;1']]; return svg(
     `<g class="tcart"><path d="M90 60 L110 60 L124 112 L214 112 L226 74 L116 74"/><circle cx="134" cy="126" r="7"/><circle cx="204" cy="126" r="7"/></g>`+
     ['₪600','₪640','₪680'].map((p,i)=>`<g opacity="${i?0:1}">${A('opacity',V[i][0],6,KT(V[i][1]))}<rect class="ttag ${i?'hot':''}" x="232" y="50" width="70" height="28" rx="6"/>${txt(267,69,p,'tl'+(i?' hot':''))}</g>`).join('')+
     txt(160,26,'אותה עגלה בדיוק, מחיר אחר')+
     `<circle class="tc" cx="60" cy="100" r="14">${A('r','14;11;8;14',6,KT('0;.33;.66;1'))}</circle><text class="tcs" x="60" y="104" text-anchor="middle">₪</text>`+txt(60,134,'כוח הקנייה','tl dim'),'אותה עגלת קניות עולה יותר בכל פעם, והמטבע קונה פחות'); },
   cbank:()=>svg(
     `<path class="tdial" d="M40 120 A70 70 0 0 1 180 120"/>`+[0,1,2,3,4].map(i=>{const a=Math.PI*(1-i/4);return `<line class="ttick" x1="${110+62*Math.cos(a)}" y1="${120-62*Math.sin(a)}" x2="${110+70*Math.cos(a)}" y2="${120-70*Math.sin(a)}"/>`;}).join('')+
     `<g>${RO('-60 110 120;40 110 120;40 110 120;-60 110 120',6,KT('0;.4;.8;1'))}<line class="tneedle" x1="110" y1="120" x2="110" y2="62"/></g><circle class="tb" cx="110" cy="120" r="6"/>`+txt(110,142,'הריבית של הבנק המרכזי')+
     [0,1,2].map(i=>`<g><rect class="ttag" x="226" y="${36+i*34}" width="72" height="24" rx="5"/><text class="tl" x="262" y="${53+i*34}" text-anchor="middle">${['משכנתא','הלוואה לעסק','אג"ח ממשלה'][i]}</text><text class="tl hot" x="218" y="${53+i*34}" text-anchor="start" opacity="0">${A('opacity','0;0;1;1;0',6,KT(`0;${.35+i*.06};${.4+i*.06};.8;1`))}↑</text></g>`).join(''),'מחוג הריבית של הבנק המרכזי עולה, ואחריו מתייקרות משכנתאות, הלוואות לעסקים ואג"ח'),
   leverage:()=>svg(
     `<line class="tdebt" x1="60" y1="70" x2="190" y2="70"/>${txt(245,74,'קו הכסף המושאל','tl dim')}${txt(245,110,'מושאל: 4 מתוך 5','tl dim')}`+
     `<rect class="tbar" x="80" y="70" width="80" height="58"/>`+
     `<rect class="tbar own" x="80" y="40" width="80" height="30">${A('height','30;30;0;0;30',6,KT('0;.2;.6;.85;1'))}${A('y','40;40;70;70;40',6,KT('0;.2;.6;.85;1'))}</rect>`+
     txt(120,32,'הכסף שלכם','tl own')+
     `<text class="tl hot" x="240" y="34" text-anchor="middle" opacity="0">${A('opacity','0;0;1;1;0',6,KT('0;.55;.6;.85;1'))}ירידה של 20% במחיר</text>`+
     `<text class="tl hot" x="240" y="52" text-anchor="middle" opacity="0">${A('opacity','0;0;1;1;0',6,KT('0;.6;.65;.85;1'))}מחקה את כל ההון</text>`+txt(120,146,'מנוף פי 5: מתוך 5 שקלים, רק 1 שלכם','tl dim'),'עמודה של השקעה: חלק קטן למעלה הוא הכסף שלכם, ורובה מושאל. ירידה קטנה במחיר מוחקת את החלק שלכם'),
   privcredit:()=>svg(
     bank(160,100,52,'בנק')+`<g class="tx"><line x1="138" y1="40" x2="182" y2="96"/><line x1="182" y1="40" x2="138" y2="96"/></g>`+
     `<rect class="tbox" x="20" y="84" width="60" height="34" rx="6"/>${txt(50,106,'קרן')}<rect class="tbox" x="240" y="84" width="60" height="34" rx="6"/>${txt(270,106,'חברה')}`+
     `<path class="tarc" d="M80 92 Q160 150 240 92"/>`+`<g>${TR('0,0;160,0',3)}${A('opacity','0;1;1;0',3,KT('0;.1;.85;1'))}${coin(84,122,7)}</g>`+
     [0,1,2].map(i=>`<circle class="tfog" cx="${100+i*60}" cy="${126}" r="26">${A('cx',`${100+i*60};${116+i*60};${100+i*60}`,5+i)}</circle>`).join('')+txt(160,22,'הלוואה ישירה, בלי בנק באמצע ובלי מבט מבחוץ'),'כסף עובר ישירות מקרן לחברה, עוקף את הבנק, וערפל מסתיר את הדרך'),
   default:()=>svg(
     `<g>${RO('0 140 80;0 140 80;-14 140 80;-14 140 80',6,KT('0;.6;.75;1'))}<path class="tdoc" d="M110 40 L160 40 L156 60 L162 80 L154 100 L160 120 L110 120 Z"/></g>`+
     `<g>${RO('0 170 80;0 170 80;14 170 80;14 170 80',6,KT('0;.6;.75;1'))}<path class="tdoc" d="M160 40 L210 40 L210 120 L160 120 L154 100 L162 80 L156 60 Z"/></g>`+txt(160,86,'חוב')+
     [0,1].map(i=>`<g opacity="0">${A('opacity','0;1;1;0;0',6,KT(`0;${.05+i*.2};${.15+i*.2};${.2+i*.2};1`))}<g>${TR(`-110,0;-110,0;0,0`,6,KT(`0;${.05+i*.2};${.18+i*.2}`))}${coin(250,80)}</g></g>`).join('')+
     `<text class="tl hot" x="260" y="40" text-anchor="middle" opacity="0">${A('opacity','0;0;1;1',6,KT('0;.55;.6;1'))}התשלום לא הגיע</text>`+txt(160,144,'חדלות פירעון: החוב לא נפרע בזמן','tl dim'),'תשלומים מגיעים לחוב, ואז מפסיקים, והתעודה נקרעת'),
   exposure:()=>svg(
     `<g><path class="tb" d="M40 70 L80 44 L120 70 Z"/><rect class="tb" x="48" y="70" width="64" height="56"/></g>${txt(80,144,'גג שלם')}`+
     `<g><path class="tb" d="M200 70 L240 44 L280 70 Z"/><rect class="tb" x="208" y="70" width="64" height="56"/><rect class="thole" x="234" y="50" width="12" height="10"/></g>${txt(240,144,'גג דולף')}`+
     `<rect class="twater" x="210" y="124" width="60" height="0">${A('height','0;0;40;40;0',6,KT('0;.2;.7;.9;1'))}${A('y','124;124;84;84;124',6,KT('0;.2;.7;.9;1'))}</rect>`+
     Array.from({length:14},(_,i)=>`<line class="train" x1="${30+i*20}" y1="0" x2="${26+i*20}" y2="8">${A('y1',`-${(i*7)%30};150`,1.2+((i*3)%5)/10)}${A('y2',`${8-(i*7)%30};158`,1.2+((i*3)%5)/10)}</line>`).join('')+txt(160,22,'אותה סערה, חשיפה אחרת','tl'),'שני בתים באותה סערה. בבית עם הגג הדולף המים עולים: זו חשיפה'),
   collateral:()=>svg(
     `<rect class="tbox" x="40" y="104" width="240" height="14" rx="3"/>`+
     `<g><circle class="twatch" cx="110" cy="80" r="22"/><line class="tneedle" x1="110" y1="80" x2="110" y2="64">${RO('0 110 80;360 110 80',4)}</line></g>`+
     `<g>${A('opacity','1;1;0;0;1',6,KT('0;.4;.45;.95;1'))}<rect class="ttag" x="146" y="60" width="64" height="24" rx="5"/>${txt(178,77,'₪5,000')}</g>`+
     `<g opacity="0">${A('opacity','0;0;1;1;0',6,KT('0;.4;.45;.95;1'))}<rect class="ttag hot" x="146" y="60" width="64" height="24" rx="5"/>${txt(178,77,'₪3,500','tl hot')}</g>`+
     `<g opacity="0">${A('opacity','0;0;1;1;0',6,KT('0;.55;.6;.95;1'))}<g>${RO('-8 250 60;8 250 60;-8 250 60',.3)}<rect class="tphone" x="238" y="40" width="24" height="40" rx="5"/></g>${txt(250,98,'"תביאו עוד עד מחר"','tl hot')}</g>`+txt(110,140,'המשכון אצל המלווה','tl dim'),'שעון מופקד כמשכון. כשהערך שלו יורד, הטלפון מצלצל: תביאו עוד'),
   balance:()=>svg(
     `<polygon class="tb" points="160,60 150,140 170,140"/>`+
     `<g>${RO('0 160 60;0 160 60;-9 160 60;-9 160 60;0 160 60',7,KT('0;.2;.6;.85;1'))}<line class="tbeam" x1="60" y1="60" x2="260" y2="60"/>`+
     `<rect class="tbar" x="70" y="62" width="60" height="44"/>${txt(100,122,'נכסים')}`+
     `<rect class="tbar debt" x="190" y="62" width="60" height="34"/><rect class="tbar own" x="190" y="96" width="60" height="10">${A('height','10;10;0;0;10',7,KT('0;.2;.6;.85;1'))}</rect>${txt(220,122,'חובות + הון')}</g>`+txt(160,24,'מה יש מול מה חייבים. ההפרש הוא ההון'),'מאזניים: נכסים מול חובות והון. כשהנכסים יורדים, ההון מתכווץ'),
   issuance:()=>svg(
     `<rect class="tbox hot" x="30" y="40" width="110" height="34" rx="6"/>${txt(85,62,'ענקית ענן','tl hot')}`+
     `<rect class="tbox" x="200" y="40" width="90" height="34" rx="6"/>${txt(245,62,'מפעל קטן')}`+
     Array.from({length:9},(_,i)=>`<circle class="tdot" cx="${160}" cy="140" r="6">${A('cx',`160;${60+(i%3)*20}`,3,` begin="${i*.3}s"`)}${A('cy',`140;${90+Math.floor(i/3)*14}`,3,` begin="${i*.3}s"`)}</circle>`).join('')+
     `<circle class="tdot" cx="245" cy="96" r="6"/>`+txt(160,22,'כשענק מנפיק, הקונים נוהרים אליו'),'משקיעים זורמים לדוכן של ענקית הענן, ורק אחד נשאר בתור של המפעל הקטן'),
   firesale:()=>svg(
     [0,1,2,3].map(i=>{ const k=3-i, px=62+i*55; return `<g>${RO(`0 ${px} 120;0 ${px} 120;-62 ${px} 120;-62 ${px} 120;0 ${px} 120`,6,KT(`0;${.1+k*.15};${.2+k*.15};.9;1`))}<rect class="tdom ${k?'':'hot'}" x="${px}" y="60" width="16" height="60" rx="2"/></g>`; }).join('')+
     `<line class="tbeam" x1="40" y1="120" x2="290" y2="120"/>`+
     `<path class="tarrow" d="M270 30 L60 50"/><text class="tl hot" x="56" y="44" text-anchor="end">המחיר יורד</text>`+txt(160,142,'מכירה אחת לוחצת על הבאה בתור','tl dim'),'ארבע אבני דומינו נופלות זו אחר זו מימין לשמאל, והמחיר יורד'),
  };

  /* ---------- the window ---------- */
  let pop=null, lastBtn=null;
  function close(){ if(!pop) return; pop.classList.remove('on'); const p=pop; setTimeout(()=>p.remove(),220); pop=null; document.removeEventListener('keydown',onKey); document.removeEventListener('pointerdown',onOut,true); if(lastBtn){ lastBtn.setAttribute('aria-expanded','false'); lastBtn.focus({preventScroll:true}); } }
  function onKey(e){ if(e.key==='Escape') close(); }
  function onOut(e){ if(pop && !pop.contains(e.target) && !e.target.closest('.tm')) close(); }
  function open(btn){
    const id=btn.dataset.t, d=T[id]; if(!d) return;
    try{ const o=JSON.parse(localStorage.getItem('td-terms')||'[]'); if(!o.includes(id)){ o.push(id); localStorage.setItem('td-terms',JSON.stringify(o)); } }catch(e){}
    if(pop) close();
    lastBtn=btn; btn.setAttribute('aria-expanded','true');
    pop=H('div','tm-pop'); pop.setAttribute('role','dialog'); pop.setAttribute('aria-modal','false'); pop.setAttribute('aria-label','מה זה '+d.t);
    const hd=H('div','tm-hd'); hd.append(H('span','tm-k','מה זה?'),H('h4','tm-t',d.t)); const x=H('button','tm-x','✕'); x.type='button'; x.setAttribute('aria-label','סגירה'); x.addEventListener('click',close); hd.append(x); pop.append(hd);
    pop.append(H('p','tm-one',d.one));
    if(d.anim&&ANIM[d.anim]){ const an=H('div','tm-anim'); an.innerHTML=ANIM[d.anim](); pop.append(an); const s=an.querySelector('svg'); if(reduce&&s&&s.pauseAnimations){ s.pauseAnimations(); s.setCurrentTime(4); } }
    const y=H('div','tm-sec tm-you'); y.append(H('span','tm-l','מהחיים שלכם'),H('p','',d.you)); pop.append(y);
    if(d.who){ const w=H('div','tm-sec tm-who'); const av=H('span','tm-av',d.who[0].trim().charAt(0)); const b=H('div'); b.append(H('span','tm-l','מכירים את'),H('strong','',d.who[0]),H('p','',d.who[1])); w.append(av,b); pop.append(w); }
    if(d.here){ const h=H('div','tm-sec tm-here'); h.append(H('span','tm-l','ובסיפור שלנו'),H('p','',d.here)); pop.append(h); }
    if(d.q) pop.append(H('p','tm-q',d.q));
    pop.append(H('p','tm-note','הדמויות בחלון הזה בדויות.'));
    document.body.append(pop);
    place(btn);
    requestAnimationFrame(()=>pop.classList.add('on'));
    x.focus({preventScroll:true});
    document.addEventListener('keydown',onKey); setTimeout(()=>document.addEventListener('pointerdown',onOut,true),0);
  }
  function place(btn){
    if(innerWidth<=700){ pop.classList.add('sheet'); return; }
    const r=btn.getBoundingClientRect(), w=Math.min(440,innerWidth-32);
    pop.style.width=w+'px';
    let left=Math.min(innerWidth-w-16, Math.max(16, r.left+r.width/2-w/2));
    pop.style.left=left+'px';
    const ph=Math.min(pop.scrollHeight, innerHeight*.8);
    let top=r.bottom+10; if(top+ph>innerHeight-12 && r.top-ph-10>12) top=r.top-ph-10; else if(top+ph>innerHeight-12) top=Math.max(12,innerHeight-ph-12);
    pop.style.top=top+'px';
  }
  function wire(root){
    (root||document).querySelectorAll('.tm[data-t]').forEach(b=>{
      if(b.dataset.tmw) return; b.dataset.tmw='1';
      if(b.tagName!=='BUTTON'){ b.setAttribute('role','button'); b.tabIndex=0; b.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); open(b); } }); }
      else b.type='button';
      b.setAttribute('aria-haspopup','dialog'); b.setAttribute('aria-expanded','false');
      b.addEventListener('click',e=>{ e.preventDefault(); e.stopPropagation(); if(pop&&lastBtn===b) close(); else open(b); });
    });
  }
  window.addEventListener('scroll',()=>{ if(pop&&!pop.classList.contains('sheet')) close(); },{passive:true});
  window.TermWin={ wire, open:(id,anchor)=>{ const b=anchor||document.querySelector('.tm[data-t="'+id+'"]'); if(b) open(b); }, ANIM };
  wire();
})();
