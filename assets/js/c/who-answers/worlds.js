/* Case 06 · the spec analogies as whole worlds (city-engine.js, C.world).
   Second Call → a kitchen with one big pot of soup (Gallup's soup): the pot, the tasting notebook, the ladle, the sieve, the menu on the wall.
   Turnout Signal → a wedding hall the week before (the guest list, RSVP cards, past events, the seating plan, the caterer's order).
   Each feature room opens with a small scene from the same world. */
(function(){
  const C=window.CITY||{}; if(!C['second-call']||!C['turnout-signal']) return;
  const st=document.createElement('style'); st.textContent=`
  .cy-world .cy-wf{transition:fill .2s}
  .cy-b.zap .cy-wf{fill:#ffb3a3!important}
  .cy-wlab{font-family:'TD Hebrew',sans-serif;font-size:15px;font-weight:700;fill:#5a3a20;letter-spacing:.02em}
  .cy-wsub{font-family:'TD Hebrew',sans-serif;font-size:12px;fill:#6a5a4a}
  .cy-wroom{background:#f7f0e4;border:1px solid #e6d6bd;border-radius:14px;padding:6px;margin-top:6px}
  .cy-room .cy-r0{grid-column:1/-1}
  .cy-wroom svg{display:block;width:100%;height:auto;max-height:230px}
  .cy-wroom p{margin:6px 8px 4px;font-size:14px;line-height:1.6;color:#3d3326}
  .cy-stage.cy-w{background:#efe5d4;grid-template-columns:1fr}
  .cy-stage.cy-w .cy-bl{font-size:16px}
  .cy-stage.cy-w .cy-svg{min-height:0}
  .cy-ts .cy-stage.cy-w{background:#efe8f1}
  .cy-ts .cy-wroom{background:#f6f0f6;border-color:#e2d3e4}`;
  document.head.append(st);
  const mini=(box,svg,cap)=>{ box.innerHTML=`<svg viewBox="0 0 400 170" role="img" aria-label="${cap}">${svg}</svg><p>${cap}</p>`; };
  const ap=(b,d)=>`<animate attributeName="opacity" values="0;1" begin="${b}s" dur="${d||.5}s" fill="freeze"/>`;
  const T=(x,y,s,o)=>`<text x="${x}" y="${y}" text-anchor="middle" font-family="TD Hebrew, sans-serif" font-size="${(o&&o.sz)||12}" fill="${(o&&o.c)||'#3d3326'}" ${(o&&o.op!=null)?`opacity="${o.op}"`:''}>${s}${(o&&o.ap)||''}</text>`;
  const bg='<rect x="0" y="0" width="400" height="170" rx="10" fill="#f7f0e4"/>';
  const bgw='<rect x="0" y="0" width="400" height="170" rx="10" fill="#f6f0f6"/>';
  const TEAL='#2f6f68', BROWN='#5a3a20', AMB='#c47a12', RED='#b3261e', COP='#b86b3a', PLUM='#6b3d6e';
  const W='class="cy-wf"';

  /* =================== the kitchen (Second Call) =================== */
  const kitchen={
    aria:'מטבח בחתך: סיר מרק גדול באמצע, ועשרה פיצ\'רים עומדים בעמדות שלו, מהמגירה של הכפות ועד התפריט על הקיר',
    words:{area:'',back:'→ חזרה למטבח',cut:'מתחת לשיש: הטכנולוגיות שהפיצ\'ר בנוי מהן',roomK:'במטבח',lm:{dc:'ספר המתכונים',kn:'כף הטעימה',cl:'חלון ההגשה'}},
    home:{desk:[0,0,1000,620],mob:[30,110,940,500]},
    scene({g}){
      g.innerHTML=`<rect x="-60" y="-40" width="1120" height="720" fill="#efe5d4"/>
      ${Array.from({length:14},(_,i)=>`<rect x="${-60+i*80}" y="-40" width="78" height="300" fill="${i%2?'#e8dcc6':'#ece1cd'}"/>`).join('')}
      <rect x="-60" y="400" width="1120" height="280" fill="#cfb895"/><rect x="-60" y="400" width="1120" height="16" fill="#a98c64"/>
      <g><rect x="380" y="250" width="240" height="40" rx="6" fill="#4a4a4a"/>${[0,1,2].map(i=>`<path d="M${420+i*60} 250 q10 -16 0 -30" stroke="#d9a35a" stroke-width="5" fill="none" opacity=".7"><animate attributeName="d" values="M${420+i*60} 250 q10 -16 0 -30;M${420+i*60} 250 q-10 -16 0 -30;M${420+i*60} 250 q10 -16 0 -30" dur="${1.4+i*.3}s" repeatCount="indefinite"/></path>`).join('')}
        <path d="M360 140 h280 v110 q0 30 -30 30 h-220 q-30 0 -30 -30z" fill="#8a8f96" stroke="#4a4f56" stroke-width="4"/><rect x="350" y="130" width="300" height="16" rx="6" fill="#6a6f76"/>
        <ellipse cx="500" cy="146" rx="138" ry="10" fill="#d48a3a"/>
        ${Array.from({length:18},(_,i)=>`<circle cx="${390+(i%9)*28}" cy="${170+Math.floor(i/9)*46}" r="7" fill="${i<9?'#e0a050':'#2f6f68'}" opacity=".85"/>`).join('')}
        <text x="500" y="240" text-anchor="middle" class="cy-wsub" fill="#fff">השכבה ששקעה</text></g>
      <path d="M640 60 L560 200" stroke="${BROWN}" stroke-width="7" stroke-linecap="round"/><ellipse cx="556" cy="206" rx="18" ry="10" fill="#8a8f96"/>
      <text x="170" y="190" text-anchor="middle" class="cy-wlab">הסיר · המצקת</text>
      <text x="830" y="190" text-anchor="middle" class="cy-wlab">התיבול · על השולחן</text>
      <g><rect x="770" y="40" width="150" height="110" rx="4" fill="#2c2620" stroke="#6a5a4a" stroke-width="4"/>${[0,1,2,3].map(i=>`<line x1="790" y1="${66+i*20}" x2="${900-(i%2)*30}" y2="${66+i*20}" stroke="#e8dcc6" stroke-width="3"/>`).join('')}<text x="845" y="168" text-anchor="middle" class="cy-wsub">התפריט</text></g>
      <path d="M90 452 L900 452" fill="none" stroke="${TEAL}" stroke-width="5" stroke-dasharray="2 10" stroke-linecap="round"/>`;
      return {path:'M90 452 L900 452',
        spots:{1:[110,452,.02],2:[190,452,.12],3:[270,452,.22],4:[350,452,.32],5:[430,452,.42],6:[510,452,.52],7:[600,452,.63],8:[690,452,.74],9:[780,452,.85],10:[870,452,.96]},
        lms:{dc:[160,330],kn:[500,330],cl:[840,330]}};
    },
    station(g,n){
      const s={
       1:`<path d="M-24 -50 h48 v26 q0 10 -10 10 h-28 q-10 0 -10 -10z" fill="#8a8f96" ${W}/><path d="M18 -70 L4 -40" stroke="${BROWN}" stroke-width="4"/><circle cx="2" cy="-36" r="6" fill="${TEAL}"/><line x1="0" y1="-14" x2="0" y2="0" stroke="${BROWN}" stroke-width="3"/>`,
       2:`<rect x="-20" y="-60" width="40" height="46" rx="3" fill="#fffaf0" stroke="${BROWN}" stroke-width="2" ${W}/>${[0,1,2,3].map(i=>`<line x1="-12" y1="${-50+i*9}" x2="${12-(i%2)*8}" y2="${-50+i*9}" stroke="${BROWN}" stroke-width="2"/>`).join('')}<line x1="0" y1="-14" x2="0" y2="0" stroke="${BROWN}" stroke-width="3"/>`,
       3:`<circle cx="0" cy="-44" r="16" fill="#efc8a8" ${W}/><rect x="-14" y="-66" width="28" height="12" rx="4" fill="#fffaf0" stroke="${BROWN}"/><path d="M-14 -24 q14 10 28 0 v20 h-28z" fill="#fffaf0" stroke="${BROWN}"/>`,
       4:`<rect x="-22" y="-56" width="44" height="40" rx="3" fill="#fffaf0" stroke="${BROWN}" stroke-width="2" ${W}/><path d="M-14 -24 a14 14 0 0 1 28 0" fill="none" stroke="${AMB}" stroke-width="3"/><line x1="0" y1="-24" x2="8" y2="-34" stroke="${RED}" stroke-width="2"/><line x1="0" y1="-16" x2="0" y2="0" stroke="${BROWN}" stroke-width="3"/>`,
       5:`<path d="M-4 -80 L4 -24" stroke="${BROWN}" stroke-width="5" ${W}/><ellipse cx="6" cy="-18" rx="14" ry="8" fill="#8a8f96"/><line x1="0" y1="-10" x2="0" y2="0" stroke="${BROWN}" stroke-width="3"/>`,
       6:`<rect x="-24" y="-56" width="20" height="34" rx="3" fill="#fffaf0" stroke="${BROWN}" ${W}/><path d="M-22 -54 l8 8 l8 -8" stroke="${BROWN}" fill="none"/><rect x="4" y="-60" width="18" height="30" rx="4" fill="#2c3e5a"/><rect x="8" y="-56" width="10" height="18" fill="#cfe0ec"/><line x1="0" y1="-22" x2="0" y2="0" stroke="${BROWN}" stroke-width="3"/>`,
       7:`<path d="M-24 -44 h48 q-4 26 -24 26 q-20 0 -24 -26z" fill="#8a8f96" ${W}/>${[0,1,2].map(i=>`<line x1="${-14+i*14}" y1="-40" x2="${-14+i*14}" y2="-26" stroke="#4a4f56"/>`).join('')}<line x1="0" y1="-18" x2="0" y2="0" stroke="${BROWN}" stroke-width="3"/>`,
       8:`<path d="M0 -70 v52 M-24 -58 h48" stroke="${BROWN}" stroke-width="3" ${W}/><path d="M-24 -58 l-8 18 h16z M24 -58 l-8 18 h16z" fill="${COP}"/><line x1="0" y1="-18" x2="0" y2="0" stroke="${BROWN}" stroke-width="3"/>`,
       9:`<circle cx="0" cy="-40" r="20" fill="#fffaf0" stroke="${BROWN}" stroke-width="2" ${W}/><path d="M0 -40 v-12 M0 -40 l8 5" stroke="${RED}" stroke-width="2"/><line x1="0" y1="-20" x2="0" y2="0" stroke="${BROWN}" stroke-width="3"/>`,
       10:`<rect x="-24" y="-66" width="48" height="48" rx="3" fill="#2c2620" ${W}/>${[0,1,2,3].map(i=>`<line x1="-16" y1="${-56+i*10}" x2="${14-(i%2)*10}" y2="${-56+i*10}" stroke="#e8dcc6" stroke-width="2"/>`).join('')}<line x1="0" y1="-18" x2="0" y2="0" stroke="${BROWN}" stroke-width="3"/>`};
      g.innerHTML=s[n]; return ({1:70,2:60,3:66,4:56,5:80,6:60,7:44,8:70,9:60,10:66})[n];
    },
    lm(g,k){ g.innerHTML={dc:`<rect x="-34" y="-58" width="68" height="50" rx="3" fill="${COP}"/><rect x="-30" y="-54" width="60" height="42" fill="#f3ead6"/><line x1="0" y1="-54" x2="0" y2="-12" stroke="${COP}" stroke-width="2"/>`,
      kn:`<path d="M-30 -70 L10 -24" stroke="${BROWN}" stroke-width="5"/><ellipse cx="14" cy="-20" rx="16" ry="9" fill="#8a8f96"/><circle cx="14" cy="-22" r="4" fill="${AMB}"/>`,
      cl:`<rect x="-40" y="-60" width="80" height="50" rx="4" fill="#3a2f26"/><rect x="-34" y="-54" width="68" height="38" fill="#f3d9a8" opacity=".8"/><path d="M-30 -10 h60" stroke="${BROWN}" stroke-width="6"/>`}[k]; },
    room(n,box){
      const R={
       1:[`${bg}<path d="M40 50 h150 v60 q0 20 -20 20 h-110 q-20 0 -20 -20z" fill="#8a8f96"/>${T(115,88,'פאנל: 30,000',{sz:12,c:'#fff'})}
          <path d="M250 40 L300 120" stroke="${BROWN}" stroke-width="5"/><ellipse cx="304" cy="126" rx="18" ry="9" fill="#8a8f96"/><g opacity="0">${ap(.8)}${T(320,60,'עוגן: 2,200',{sz:12,c:TEAL})}${T(320,78,'כתובות אקראיות',{sz:11})}</g>
          <g opacity="0">${ap(1.6)}<rect x="230" y="140" width="150" height="22" rx="4" fill="#fffaf0" stroke="${TEAL}"/>${T(305,155,'המקור ננעל בהגרלה',{sz:11,c:TEAL})}</g>`,'הסיר הגדול, וכף עמוקה בצד. כאן: פאנל זול וגדול, ועוגן של כתובות אקראיות שנשאר נקי.'],
       2:[`${bg}<rect x="40" y="25" width="200" height="120" rx="4" fill="#fffaf0" stroke="${BROWN}"/>${[['18:02 · טלפון · אין מענה','#3d3326'],['18:40 · טלפון · תפוס','#3d3326'],['19:15 · טלפון · אין מענה','#3d3326'],['ללא מזהה ✗',RED]].map(([t,c],i)=>`<g opacity="0">${ap(.3+i*.4)}${T(140,50+i*26,t,{sz:11,c})}</g>`).join('')}
          <g opacity="0">${ap(2)}<rect x="260" y="55" width="120" height="50" rx="6" fill="#fffaf0" stroke="${TEAL}" stroke-width="2"/>${T(320,78,'התא יודע:',{sz:11})}${T(320,96,'48 ניסיונות, 2 תשובות',{sz:11,c:TEAL})}</g>`,'פנקס הטעימות: גם כף שחזרה ריקה נרשמת. כאן: כל ניסיון קשר, עם מזהה מהמרכזייה. וניסיון בלי מזהה לא נספר.'],
       3:[`${bg}<circle cx="90" cy="70" r="30" fill="#efc8a8"/><rect x="66" y="34" width="48" height="16" rx="5" fill="#fffaf0" stroke="${BROWN}"/><path d="M60 110 q30 20 60 0 v40 h-60z" fill="#fffaf0" stroke="${BROWN}"/>
          ${[['טלפון','0.9%',RED],['מסרון','2.4%',TEAL],['מכתב','3.1%',TEAL]].map(([a,b,c],i)=>`<g opacity="0">${ap(.4+i*.4)}${T(290,50+i*30,a+': '+b,{sz:13,c})}</g>`).join('')}${T(260,150,'רצפה: אף תא לא נזנח',{sz:11,op:0,ap:ap(1.8)})}`,'הטבח הוותיק יודע מה שוקע. כאן: מודל שמנבא לכל תא ולכל ערוץ את הסיכוי, ורצפה שלא נותנת לו לוותר על אף אחד.'],
       4:[`${bg}<rect x="40" y="25" width="320" height="120" rx="6" fill="#fffaf0" stroke="${BROWN}"/>${T(200,46,'כרטיס הטעימה · יום 3',{sz:12})}
          ${[['תואר · מבוגרים',92],['תואר · צעירים',58],['בלי תואר · מבוגרים',46],['בלי תואר · צעירים · כפר',18]].map(([l,v],i)=>`<rect x="60" y="${58+i*20}" width="0" height="12" rx="3" fill="${v<30?RED:TEAL}"><animate attributeName="width" to="${v*1.6}" begin="${(.2+i*.2).toFixed(1)}s" dur=".6s" fill="freeze"/></rect>${T(330,68+i*20,l,{sz:10})}`).join('')}${T(120,140,'CV 0.52',{sz:12,c:RED,op:0,ap:ap(1.5)})}`,'כרטיס הטעימה: איפה מלוח, איפה תפל. כאן: מדד אחד כל שש שעות, והתא שמושך הכי הרבה בראש.'],
       5:[`${bg}<path d="M60 50 h200 v60 q0 20 -20 20 h-160 q-20 0 -20 -20z" fill="#8a8f96"/>${Array.from({length:10},(_,i)=>`<circle cx="${80+i*18}" cy="${i<5?70:112}" r="6" fill="${i<5?'#e0a050':TEAL}"/>`).join('')}
          <g><animateTransform attributeName="transform" type="translate" values="0 0;-60 60" dur="1.4s" fill="freeze"/><path d="M300 20 L250 60" stroke="${BROWN}" stroke-width="5"/><ellipse cx="246" cy="64" rx="16" ry="8" fill="#5a5f66"/></g>${T(330,150,'38% מהמשמרת לתחתית',{sz:12,c:TEAL,op:0,ap:ap(1.5)})}`,'המצקת נשלחת לתחתית. כאן: המקצה מעביר את הניסיונות של המשמרת הבאה לתאים החסרים, עם תקרה לכל אדם.'],
       6:[`${bg}<rect x="40" y="50" width="70" height="70" rx="8" fill="#2c3e5a"/>${T(75,92,'☎ ✗',{sz:16,c:'#fff'})}
          <path d="M120 85 H170" stroke="${BROWN}" stroke-width="2" stroke-dasharray="4 4"/><g opacity="0">${ap(.7)}<rect x="180" y="45" width="90" height="70" rx="4" fill="#fffaf0" stroke="${BROWN}"/><path d="M180 45 l45 34 l45 -34" stroke="${BROWN}" fill="none"/>${T(225,135,'מכתב + קוד',{sz:11})}</g>
          <g opacity="0">${ap(1.5)}<rect x="290" y="55" width="80" height="40" rx="6" fill="#fffaf0" stroke="${RED}" stroke-width="2"/>${T(330,80,'"הסר"',{sz:13,c:RED})}${T(330,120,'סוגר הכול',{sz:11,c:RED})}</g>`,'כף ארוכה יותר, כשהקצרה לא מגיעה. כאן: מי שלא עונה לטלפון מקבל מכתב או מסרון. ו"הסר אותי" חזק מכל דבר.'],
       7:[`${bg}<path d="M100 50 h200 q-10 60 -100 60 q-90 0 -100 -60z" fill="#8a8f96"/>${Array.from({length:8},(_,i)=>`<circle cx="${130+i*20}" cy="${40}" r="7" fill="${i===2||i===6?RED:TEAL}"><animate attributeName="cy" to="${i===2||i===6?60:140}" begin="${(.3+i*.1).toFixed(1)}s" dur=".8s" fill="freeze"/></circle>`).join('')}${T(200,30,'מהירות · שורות · בדיקה · מכשיר',{sz:11})}${T(200,160,'6.8% נשארו במסננת',{sz:11,c:RED,op:0,ap:ap(1.8)})}`,'מסננת: רכיב רקוב לא נכנס לסיר. כאן: שומר האיכות, הרעיון של Panel Sentinel, כחלק אחד מתוך עשרה.'],
       8:[`${bg}<path d="M200 20 v120 M100 50 h200" stroke="${BROWN}" stroke-width="4"/><g><animateTransform attributeName="transform" type="rotate" values="-8 200 50;0 200 50" dur="1.6s" fill="freeze"/><path d="M100 50 l-30 50 h60z" fill="${COP}"/><path d="M300 50 l-30 50 h60z" fill="${COP}"/></g>
          ${T(100,120,'פאנל: 53.3%',{sz:12})}${T(300,120,'עוגן',{sz:12,c:TEAL})}${T(200,160,'אחרי כיול: 50.8%',{sz:12,c:TEAL,op:0,ap:ap(1.6)})}`,'טועמים מלמעלה ומלמטה, ומתבלים עד שזה אותו טעם. כאן: המשקלות של הפאנל מכוילים למה שהעוגן אומר, בתוך כל תא.'],
       9:[`${bg}<circle cx="100" cy="85" r="50" fill="#fffaf0" stroke="${BROWN}" stroke-width="2"/><path d="M100 85 v-34 M100 85 l24 14" stroke="${RED}" stroke-width="3"/>${T(100,160,'7 ימים לפני',{sz:11})}
          ${[['גל 1: "אולי"','#3d3326'],['גל 2: "בטוח"',TEAL],['64 זזו',TEAL],['29% לא חזרו',RED]].map(([t,c],i)=>`<g opacity="0">${ap(.4+i*.4)}${T(280,46+i*28,t,{sz:12,c})}</g>`).join('')}`,'טעימה אחרונה רגע לפני ההגשה, כי מרק משנה טעם על האש. כאן: שלוש שאלות, שבוע לפני הבחירות, למי שכבר ענה.'],
       10:[`${bg}<rect x="100" y="20" width="200" height="130" rx="4" fill="#2c2620"/>${[['52,000 ניסיונות'],['1,374 תשובות · 800 בעוגן'],['6.8% הוצאו · CV 0.34'],['לא ראינו: מי שהחליט ביום עצמו']].map(([t],i)=>`<g opacity="0">${ap(.3+i*.4)}${T(200,50+i*26,t,{sz:11,c:i===3?'#f3b8a8':'#e8dcc6'})}</g>`).join('')}`,'התפריט על הקיר: מה במרק ואיך בושל. כאן: הצהרת מתודולוגיה, מהטבלאות עצמן, חתומה, כולל מה שלא ראינו.']};
      const [svg,cap]=R[n]; mini(box,svg,cap);
    }};

  /* =================== the wedding hall (Turnout Signal) =================== */
  const hall={
    aria:'אולם אירועים בחתך שבוע לפני חתונה: עשרה פיצ\'רים עומדים בעמדות שלו, מרשימת המוזמנים ועד ההודעה לקייטרינג',
    words:{area:'',back:'→ חזרה לאולם',cut:'מאחורי הבמה: הטכנולוגיות שהפיצ\'ר בנוי מהן',roomK:'באולם',lm:{dc:'שולחן בעלי השמחה',kn:'הדלת',cl:'הכיסאות הריקים'}},
    home:{desk:[0,0,1000,620],mob:[30,110,940,500]},
    scene({g}){
      g.innerHTML=`<rect x="-60" y="-40" width="1120" height="720" fill="#efe8f1"/>
      <rect x="40" y="60" width="920" height="380" fill="#faf6fb" stroke="${PLUM}" stroke-width="3"/>
      ${Array.from({length:6},(_,i)=>`<path d="M${80+i*150} 60 q75 40 150 0" fill="none" stroke="#e2c7a8" stroke-width="3"/>`).join('')}
      ${Array.from({length:8},(_,i)=>`<g transform="translate(${140+(i%4)*200} ${180+Math.floor(i/4)*120})"><ellipse cx="0" cy="0" rx="56" ry="18" fill="#fffaf0" stroke="#c9b3cf" stroke-width="2"/>${Array.from({length:6},(_,j)=>`<circle cx="${Math.cos(j)*64}" cy="${Math.sin(j)*24}" r="8" fill="${(i*6+j)%9===4?'#d8c7dc':PLUM}" opacity="${(i*6+j)%9===4?.5:.75}"/>`).join('')}</g>`).join('')}
      <text x="250" y="110" text-anchor="middle" class="cy-wlab" fill="${PLUM}">הרשימה · הניחוש</text>
      <text x="760" y="110" text-anchor="middle" class="cy-wlab" fill="${PLUM}">האזעקות · האמון</text>
      <rect x="440" y="80" width="120" height="40" rx="6" fill="${PLUM}"/><text x="500" y="106" text-anchor="middle" class="cy-wsub" fill="#fff">חופה</text>
      <path d="M90 452 L900 452" fill="none" stroke="${TEAL}" stroke-width="5" stroke-dasharray="2 10" stroke-linecap="round"/>`;
      return {path:'M90 452 L900 452',
        spots:{1:[110,452,.02],2:[190,452,.12],3:[270,452,.22],4:[350,452,.32],5:[430,452,.42],6:[510,452,.52],7:[600,452,.63],8:[690,452,.74],9:[780,452,.85],10:[870,452,.96]},
        lms:{dc:[200,520],kn:[500,520],cl:[800,520]}};
    },
    station(g,n){
      const s={
       1:`<rect x="-18" y="-62" width="36" height="48" rx="2" fill="#fffaf0" stroke="${PLUM}" stroke-width="2" ${W}/>${[0,1,2,3].map(i=>`<line x1="-10" y1="${-52+i*9}" x2="10" y2="${-52+i*9}" stroke="${PLUM}" stroke-width="2"/>`).join('')}<line x1="0" y1="-14" x2="0" y2="0" stroke="${PLUM}" stroke-width="3"/>`,
       2:`<circle cx="-8" cy="-40" r="14" fill="#fffaf0" stroke="${PLUM}" stroke-width="2" ${W}/><circle cx="8" cy="-40" r="14" fill="none" stroke="${TEAL}" stroke-width="2"/><line x1="0" y1="-26" x2="0" y2="0" stroke="${PLUM}" stroke-width="3"/>`,
       3:`<rect x="-22" y="-56" width="44" height="36" rx="3" fill="#fffaf0" stroke="${PLUM}" stroke-width="2" ${W}/><path d="M-10 -38 l6 6 l12 -12" stroke="${TEAL}" stroke-width="4" fill="none"/><line x1="0" y1="-20" x2="0" y2="0" stroke="${PLUM}" stroke-width="3"/>`,
       4:`<rect x="-24" y="-64" width="48" height="44" rx="3" fill="#f3ead6" stroke="${PLUM}" ${W}/>${[0,1,2].map(i=>`<rect x="${-16+i*12}" y="${-34-i*8}" width="8" height="${10+i*8}" fill="${PLUM}"/>`).join('')}<line x1="0" y1="-20" x2="0" y2="0" stroke="${PLUM}" stroke-width="3"/>`,
       5:`<rect x="-20" y="-56" width="40" height="38" rx="3" fill="#fffaf0" stroke="${PLUM}" stroke-width="2" ${W}/><path d="M-20 -46 h40" stroke="${PLUM}" stroke-width="2"/><text x="0" y="-26" text-anchor="middle" font-size="12" fill="${PLUM}">52%</text><line x1="0" y1="-18" x2="0" y2="0" stroke="${PLUM}" stroke-width="3"/>`,
       6:`<ellipse cx="0" cy="-36" rx="24" ry="10" fill="#fffaf0" stroke="${PLUM}" stroke-width="2" ${W}/>${[0,1,2,3].map(i=>`<circle cx="${-18+i*12}" cy="-52" r="5" fill="${i===3?'#d8c7dc':PLUM}"/>`).join('')}<line x1="0" y1="-26" x2="0" y2="0" stroke="${PLUM}" stroke-width="3"/>`,
       7:`<path d="M-16 -24 q0 -34 16 -34 q16 0 16 34z" fill="${AMB}" ${W}/><path d="M-20 -24 h40" stroke="${PLUM}" stroke-width="3"/><circle cx="0" cy="-18" r="3" fill="${PLUM}"/><line x1="0" y1="-14" x2="0" y2="0" stroke="${PLUM}" stroke-width="3"/>`,
       8:`<path d="M-14 -16 v-34 a14 14 0 0 1 28 0 v34 l-7 -6 l-7 6 l-7 -6z" fill="#fffaf0" stroke="${PLUM}" stroke-width="2" stroke-dasharray="4 3" ${W}/><line x1="0" y1="-14" x2="0" y2="0" stroke="${PLUM}" stroke-width="3"/>`,
       9:`<rect x="-18" y="-46" width="36" height="28" rx="3" fill="${PLUM}" ${W}/><path d="M-10 -46 v-8 a10 10 0 0 1 20 0 v8" stroke="${PLUM}" stroke-width="3" fill="none"/><line x1="0" y1="-18" x2="0" y2="0" stroke="${PLUM}" stroke-width="3"/>`,
       10:`<rect x="-20" y="-64" width="40" height="48" rx="2" fill="#fffaf0" stroke="${PLUM}" stroke-width="2" ${W}/>${[0,1,2].map(i=>`<line x1="-12" y1="${-54+i*10}" x2="12" y2="${-54+i*10}" stroke="${PLUM}" stroke-width="2"/>`).join('')}<line x1="-12" y1="-24" x2="12" y2="-24" stroke="${RED}" stroke-width="2"/><line x1="0" y1="-16" x2="0" y2="0" stroke="${PLUM}" stroke-width="3"/>`};
      g.innerHTML=s[n]; return ({1:62,2:54,3:56,4:64,5:56,6:56,7:58,8:66,9:54,10:64})[n];
    },
    lm(g,k){ g.innerHTML={dc:`<rect x="-40" y="-40" width="80" height="28" rx="4" fill="${PLUM}"/><rect x="-34" y="-12" width="6" height="12" fill="${PLUM}"/><rect x="28" y="-12" width="6" height="12" fill="${PLUM}"/>`,
      kn:`<rect x="-22" y="-70" width="44" height="70" rx="3" fill="#b89a7a"/><circle cx="12" cy="-34" r="3" fill="${AMB}"/>`,
      cl:`${[0,1,2].map(i=>`<path d="M${-30+i*22} -10 v-26 h14 v26 M${-30+i*22} -22 h14" stroke="#c9b3cf" stroke-width="3" fill="none"/>`).join('')}`}[k]; },
    room(n,box){
      const R={
       1:[`${bgw}<rect x="60" y="20" width="140" height="130" rx="4" fill="#fffaf0" stroke="${PLUM}"/>${['ש. כהן · 2020 ✓ 2022 ✓','ר. לוי · 2024 ✓','ד. הייז · 2020 ✓ 2024 ✓','מ. סעדה · —'].map((t,i)=>`<g opacity="0">${ap(.3+i*.3)}${T(130,46+i*26,t,{sz:10})}</g>`).join('')}${T(290,70,'210 מיליון שורות',{sz:12,c:PLUM,op:0,ap:ap(1.5)})}${T(290,94,'כל המדינות ✓',{sz:11,c:TEAL,op:0,ap:ap(1.8)})}`,'רשימת המוזמנים. כאן: קובץ הבוחרים, עם מי הצביע בכל בחירות (לא למי), נטען כל חודש.'],
       2:[`${bgw}<rect x="40" y="50" width="110" height="60" rx="6" fill="#fffaf0" stroke="${PLUM}"/>${T(95,76,'"ד. הייז"',{sz:12})}${T(95,96,'39203 · 1975',{sz:11})}
          ${[['דרנל הייז · 0.97',TEAL],['דניאל הייז · 0.41','#3d3326']].map(([t,c],i)=>`<g opacity="0">${ap(.6+i*.4)}<path d="M150 80 L210 ${60+i*40}" stroke="${c}" stroke-width="2"/><rect x="210" y="${46+i*40}" width="150" height="28" rx="4" fill="#fffaf0" stroke="${c}"/>${T(285,64+i*40,t,{sz:11,c})}</g>`).join('')}`,'"משפ\' הייז": איזה הייז? כאן: ציון התאמה לכל מועמד, ושני ספים. רק אחד בטוח, אז נמצא.'],
       3:[`${bgw}${[['רגילים להצביע',91],['לא רגילים',66],['מבוגרים',88],['צעירים',75]].map(([l,v],i)=>`<rect x="60" y="${30+i*28}" width="0" height="16" rx="3" fill="${v<80?RED:TEAL}"><animate attributeName="width" to="${v*2.2}" begin="${(.2+i*.2).toFixed(1)}s" dur=".6s" fill="freeze"/></rect>${T(60+v*2.2+30,43+i*28,v+'%',{sz:11})}${T(350,43+i*28,l,{sz:11})}`).join('')}`,'כמה אישורים חזרו מכל צד של המשפחה. כאן: שיעור ההתאמה לכל תא, ואזהרה כשהפער גדול.'],
       4:[`${bgw}${[['2020 ✓',TEAL],['2022 ✗',RED],['2024 ✓',TEAL]].map(([t,c],i)=>`<g opacity="0">${ap(.3+i*.3)}<rect x="${50+i*70}" y="50" width="60" height="34" rx="5" fill="#fffaf0" stroke="${c}" stroke-width="2"/>${T(80+i*70,72,t,{sz:12,c})}</g>`).join('')}<path d="M260 67 H300" stroke="${PLUM}" stroke-width="2"/>${T(345,72,'0.31',{sz:20,c:PLUM,op:0,ap:ap(1.4)})}${T(200,130,'דרנל, בבחירות אמצע',{sz:12})}`,'מי מהרשימה בא לאירועים קודמים. כאן: המודל לומד מאלפי אנשים עם אותה היסטוריה, ונותן לכל משיב סיכוי.'],
       5:[`${bgw}<rect x="60" y="40" width="120" height="80" rx="6" fill="#fffaf0" stroke="${PLUM}"/>${T(120,70,'אמצע שבוע',{sz:12})}${T(120,96,'פחות באים',{sz:11})}<rect x="220" y="40" width="120" height="80" rx="6" fill="#fffaf0" stroke="${PLUM}"/>${T(280,70,'יום שישי',{sz:12})}${T(280,96,'יותר באים',{sz:11})}${T(200,150,'בחירות אמצע: יעד 52%',{sz:12,c:PLUM,op:0,ap:ap(1)})}`,'חתונה באמצע שבוע מול יום שישי. כאן: הסיכויים מכוילים לאחוז ההצבעה של בחירות מאותו סוג.'],
       6:[`${bgw}<ellipse cx="200" cy="90" rx="90" ry="30" fill="#fffaf0" stroke="${PLUM}" stroke-width="2"/>${Array.from({length:8},(_,i)=>`<circle cx="${200+Math.cos(i*.785)*110}" cy="${90+Math.sin(i*.785)*44}" r="11" fill="${PLUM}" opacity="0">${ap(.2+i*.15)}<animate attributeName="opacity" values="0;${[1,1,.35,1,.6,1,.35,1][i]}" begin="${(.2+i*.15).toFixed(2)}s" dur=".4s" fill="freeze"/></circle>`).join('')}${T(200,95,'שווה כמו הסיכוי',{sz:12})}`,'תוכנית ההושבה: מי שבטוח יבוא מקבל כיסא, מי שאולי, חצי. כאן: כל משיב שווה כמו הסיכוי שלו לבוא.'],
       7:[`${bgw}<path d="M60 120 q0 -60 40 -60 q40 0 40 60z" fill="${AMB}"/><path d="M50 120 h100" stroke="${PLUM}" stroke-width="4"/>${T(100,145,'נרשמים חדשים: ×1.8',{sz:11,c:AMB})}
          <g opacity="0">${ap(1.2)}<circle cx="290" cy="70" r="22" fill="#8a5a3c"/><path d="M260 140 q30 -40 60 0" fill="#d4a72c"/>${T(290,160,'רשום מ-1993: לא נראה',{sz:11,c:RED})}</g>`,'"אפשר להוסיף עוד שניים?" סימן שיגיעו יותר. כאן: קפיצה בנרשמים חדשים. אבל דרנל, שרשום מזמן, לא מצלצל באף פעמון.'],
       8:[`${bgw}${Array.from({length:12},(_,i)=>`<circle cx="${60+(i%6)*50}" cy="${60+Math.floor(i/6)*50}" r="16" fill="${i%4===1?'none':PLUM}" stroke="${PLUM}" stroke-width="2" stroke-dasharray="${i%4===1?'4 3':'0'}" opacity="${i%4===1?1:.6}"/>`).join('')}${T(200,160,'31% מהצעירים: לא ברשימה',{sz:12,c:RED,op:0,ap:ap(.8)})}`,'אורחים שלא היו ברשימה. כאן: מדד של מי שלא נמצא בקובץ, לפי תא. הם לא נעלמים.'],
       9:[`${bgw}<rect x="60" y="40" width="120" height="90" rx="6" fill="#fffaf0" stroke="${PLUM}"/>${T(120,80,'הרשימה',{sz:12})}<rect x="96" y="96" width="48" height="26" rx="3" fill="${PLUM}"/>
          <g opacity="0">${ap(.8)}<rect x="230" y="60" width="130" height="40" rx="6" fill="#fffaf0" stroke="${RED}" stroke-width="2"/>${T(295,85,'ייצוא שורות ✗',{sz:12,c:RED})}</g>${T(295,130,'רק סיכומים יוצאים',{sz:11,c:TEAL,op:0,ap:ap(1.4)})}`,'הרשימה נשארת במשרד, לא על הדלת. כאן: רק סיכומים יוצאים, ושורות דורשות שני אנשים.'],
       10:[`${bgw}<rect x="100" y="20" width="200" height="130" rx="4" fill="#fffaf0" stroke="${PLUM}"/>${[['הותאמו: 84%','#3d3326'],['יעד: 52%','#3d3326'],['לא נמצאו: 16%','#3d3326'],['לא רואה מצביעים חדשים',RED]].map(([t,c],i)=>`<g opacity="0">${ap(.3+i*.4)}${T(200,50+i*26,t,{sz:12,c})}</g>`).join('')}`,'הודעה לקייטרינג: לכמה הזמנו, ולמה. כאן: דוח עם כל סקר, ושורה קבועה על מה שהמודל לא רואה.']};
      const [svg,cap]=R[n]; mini(box,svg,cap);
    }};

  const act2w=(world,what,hint,btn)=>`<p class="cy-k">מערכה 2 · ${world}</p>
   <p>אותו מקום, שתי משמעויות. הדרך היא ${what}, ובכל תחנה לאורכה עומד פיצ'ר אחד של המוצר. ארבעה אזורים, ארבע שכבות.</p>
   <div class="cy-ctl"><button type="button" class="cy-btn go" data-a="play">▶ סיור מודרך</button><button type="button" class="cy-btn hot" data-a="shock">${btn}</button><button type="button" class="cy-btn" data-a="home">למבט על</button></div>
   <ol class="cy-list"></ol><p class="cy-hint">${hint}</p>`;
  const SC=C['second-call'], TS=C['turnout-signal'];
  SC.world=kitchen;
  SC.act2=act2w('המטבח של הפיצ\'רים','המסלול של סקר אחד, מההגרלה ועד התפריט על הקיר','לחצו על תחנה כדי להיכנס לעמדה שלה. גם ספר המתכונים, כף הטעימה וחלון ההגשה נפתחים.','לשלוח סקר אחד');
  TS.world=hall;
  TS.act2=act2w('האולם של הפיצ\'רים','המסלול של סקר אחד, מרשימת המוזמנים ועד ההודעה לקייטרינג','לחצו על תחנה כדי להיכנס לעמדה שלה. גם שולחן בעלי השמחה, הדלת והכיסאות הריקים נפתחים.','לשלוח סקר אחד');
  [SC,TS].forEach(c=>{ const s0=c.act1.setup; c.act1.setup=ctx=>{ ctx.stage.classList.add('cy-w'); return s0(ctx); }; });
})();
