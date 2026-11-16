/* Case 04 · the spec analogies as whole worlds (city-engine.js, C.world).
   Desk Memory → a ship's bridge at the change of watch (logbook, standing orders, chart table, radar, the captain's door, the company office ashore).
   Crisis Rehearsal Engine → the backstage of a theatre (prompt book, props table, the stage manager's desk, cue lights, the understudies' board).
   Each feature room opens with a small scene from the same world. */
(function(){
  const C=window.CITY||{}; if(!C['desk-memory']||!C['crisis-rehearsal']) return;
  const st=document.createElement('style'); st.textContent=`
  .cy-world .cy-wf{transition:fill .2s}
  .cy-b.zap .cy-wf{fill:#ffb3a3!important}
  .cy-wlab{font-family:'TD Hebrew',sans-serif;font-size:15px;font-weight:700;fill:#2c3e5a;letter-spacing:.02em}
  .cy-wlab.lt{fill:#e8e2d0}
  .cy-wsub{font-family:'TD Hebrew',sans-serif;font-size:12px;fill:#56627a}
  .cy-wroom{background:#eef2f6;border:1px solid #d3dbe5;border-radius:14px;padding:6px;margin-top:6px}
  .cy-room .cy-r0{grid-column:1/-1}
  .cy-wroom svg{display:block;width:100%;height:auto;max-height:230px}
  .cy-wroom p{margin:6px 8px 4px;font-size:14px;line-height:1.6;color:#2f3a4c}
  .cy-stage.cy-w{background:#e6ecf2;grid-template-columns:1fr}
  .cy-stage.cy-w .cy-bl{font-size:16px}
  .cy-stage.cy-w .cy-svg{min-height:0}
  .cy-cr .cy-stage.cy-w{background:#2a2026}
  .cy-cr .cy-wroom{background:#f6efe6;border-color:#e3d3c0}`;
  document.head.append(st);
  const mini=(box,svg,cap)=>{ box.innerHTML=`<svg viewBox="0 0 400 170" role="img" aria-label="${cap}">${svg}</svg><p>${cap}</p>`; };
  const ap=(b,d)=>`<animate attributeName="opacity" values="0;1" begin="${b}s" dur="${d||.5}s" fill="freeze"/>`;
  const T=(x,y,s,o)=>`<text x="${x}" y="${y}" text-anchor="middle" font-family="TD Hebrew, sans-serif" font-size="${(o&&o.sz)||12}" fill="${(o&&o.c)||'#22304a'}" ${(o&&o.op!=null)?`opacity="${o.op}"`:''}>${s}${(o&&o.ap)||''}</text>`;
  const bg='<rect x="0" y="0" width="400" height="170" rx="10" fill="#eef2f6"/>';
  const bgw='<rect x="0" y="0" width="400" height="170" rx="10" fill="#f6efe6"/>';
  const TEAL='#2f6f68', NAVY='#2c3e5a', AMB='#c47a12', RED='#b3261e';

  /* =================== the ship's bridge (Desk Memory) =================== */
  const bridge={
    aria:'גשר הפיקוד של ספינה בחתך: עשרה פיצ\'רים עומדים בעמדות שלו, מהרדיו ועד משרד החברה בנמל',
    words:{area:'',back:'→ חזרה לגשר',cut:'מתחת לסיפון: הטכנולוגיות שהפיצ\'ר בנוי מהן',roomK:'על הגשר',lm:{dc:'הפקודות הקבועות',kn:'הרדאר',cl:'הנמל הבא'}},
    home:{desk:[0,0,1000,620],mob:[30,110,940,500]},
    scene({g}){
      g.innerHTML=`<defs><linearGradient id="dmSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dbe5ef"/><stop offset="1" stop-color="#eef2f6"/></linearGradient></defs>
      <rect x="-60" y="-40" width="1120" height="720" fill="url(#dmSky)"/>
      <path d="M-60 520 Q60 500 180 520 T420 520 T660 520 T900 520 T1140 520 L1140 680 L-60 680Z" fill="#9fb6c9"/>
      <path d="M-60 560 Q80 545 220 560 T500 560 T780 560 T1060 560 L1060 680 L-60 680Z" fill="#7f9bb3"/>
      <circle cx="120" cy="80" r="26" fill="#f4e3b5" opacity=".7"/>
      <path d="M30 470 L680 470 L640 525 L80 525Z" fill="#5d6b7e"/>
      <g><rect x="80" y="170" width="560" height="300" fill="#f3f5f8" stroke="${NAVY}" stroke-width="3"/>
        <rect x="70" y="150" width="580" height="24" fill="${NAVY}"/>
        ${[0,1,2,3,4,5].map(i=>`<rect x="${100+i*88}" y="188" width="70" height="56" rx="4" fill="#cfe0ec" stroke="${NAVY}" stroke-width="2"/>`).join('')}
        <rect x="300" y="120" width="120" height="30" rx="4" fill="#fffaf0" stroke="${NAVY}"/><text x="360" y="141" text-anchor="middle" class="cy-wsub">גשר הפיקוד</text>
        <line x1="360" y1="40" x2="360" y2="120" stroke="${NAVY}" stroke-width="3"/><path d="M360 50 l26 8 l-26 8z" fill="${AMB}"/>
        <line x1="360" y1="260" x2="360" y2="470" stroke="${NAVY}" stroke-width="2" stroke-dasharray="6 6"/></g>
      <text x="220" y="282" text-anchor="middle" class="cy-wlab">בכניסה · החוטים</text>
      <text x="500" y="282" text-anchor="middle" class="cy-wlab">ההחלפה · השומרים</text>
      <g><rect x="770" y="300" width="160" height="150" fill="#e7e1d2" stroke="#7a6650" stroke-width="3"/><path d="M760 300 L850 250 L940 300Z" fill="#8a6d4a"/><text x="850" y="380" text-anchor="middle" class="cy-wsub">משרד החברה</text><text x="850" y="398" text-anchor="middle" class="cy-wsub">בנמל</text></g>
      <path d="M680 470 L770 450" stroke="#7a6650" stroke-width="4"/>
      <path d="M110 452 L610 452 Q660 452 700 470 L780 455 Q820 450 860 452 L930 452" fill="none" stroke="${TEAL}" stroke-width="5" stroke-dasharray="2 10" stroke-linecap="round"/>`;
      return {path:'M110 452 L610 452 Q660 452 700 470 L780 455 Q820 450 860 452 L930 452',
        spots:{1:[130,452,.03],2:[195,452,.1],3:[260,452,.17],4:[330,452,.25],5:[400,452,.33],6:[470,452,.42],7:[545,452,.5],8:[610,452,.58],9:[700,470,.7],10:[880,452,.92]},
        lms:{dc:[220,330],kn:[500,330],cl:[850,250]}};
    },
    station(g,n){
      const W='class="cy-wf"';
      const s={
       1:`<rect x="-20" y="-56" width="40" height="40" rx="3" fill="#5d6b7e" ${W}/><circle cx="-8" cy="-36" r="5" fill="#cfe0ec"/><circle cx="8" cy="-36" r="5" fill="#cfe0ec"/><path d="M0 -56 v-16 M-6 -72 h12" stroke="${NAVY}" stroke-width="3"/><line x1="0" y1="-16" x2="0" y2="0" stroke="${NAVY}" stroke-width="3"/>`,
       2:`<rect x="-14" y="-62" width="28" height="44" rx="12" fill="${NAVY}" ${W}/><path d="M-20 -36 a20 20 0 0 0 40 0" fill="none" stroke="${NAVY}" stroke-width="3"/><line x1="0" y1="-16" x2="0" y2="0" stroke="${NAVY}" stroke-width="3"/>`,
       3:`<rect x="-22" y="-54" width="44" height="36" rx="3" fill="#fffaf0" stroke="${NAVY}" stroke-width="2" ${W}/><path d="M-10 -36 l6 6 l12 -12" stroke="${TEAL}" stroke-width="4" fill="none"/><line x1="0" y1="-18" x2="0" y2="0" stroke="${NAVY}" stroke-width="3"/>`,
       4:`<rect x="-26" y="-48" width="52" height="40" rx="3" fill="#8a5a3a" ${W}/><rect x="-22" y="-44" width="44" height="32" fill="#f3ead6"/>${[0,1,2,3].map(i=>`<line x1="-16" y1="${-38+i*7}" x2="16" y2="${-38+i*7}" stroke="#8a6d4a" stroke-width="1.5"/>`).join('')}<line x1="0" y1="-8" x2="0" y2="0" stroke="${NAVY}" stroke-width="3"/>`,
       5:`<rect x="-26" y="-40" width="52" height="30" fill="#e9dfc5" stroke="#8a6d4a" stroke-width="2" ${W}/><path d="M-18 -18 L-4 -32 L8 -22 L20 -34" stroke="${RED}" stroke-width="2" fill="none"/><line x1="-20" y1="-10" x2="-20" y2="0" stroke="${NAVY}" stroke-width="3"/><line x1="20" y1="-10" x2="20" y2="0" stroke="${NAVY}" stroke-width="3"/>`,
       6:`<rect x="-24" y="-66" width="48" height="50" rx="3" fill="#22304a" ${W}/>${[0,1,2,3].map(i=>`<rect x="-18" y="${-60+i*11}" width="${30-(i*5)}" height="7" fill="${i===1?AMB:'#cfe0ec'}"/>`).join('')}<line x1="0" y1="-16" x2="0" y2="0" stroke="${NAVY}" stroke-width="3"/>`,
       7:`<rect x="-14" y="-62" width="28" height="62" rx="2" fill="#5d6b7e" ${W}/><circle cx="8" cy="-30" r="2.5" fill="#f4e3b5"/><path d="M18 -34 l10 4 l-10 4z" fill="${AMB}"/>`,
       8:`<rect x="-24" y="-60" width="48" height="44" rx="3" fill="#fffaf0" stroke="${NAVY}" stroke-width="2" ${W}/>${[0,1,2,3].map(i=>`<line x1="-16" y1="${-50+i*9}" x2="${12-(i%2)*8}" y2="${-50+i*9}" stroke="${NAVY}" stroke-width="2"/>`).join('')}<line x1="0" y1="-16" x2="0" y2="0" stroke="${NAVY}" stroke-width="3"/>`,
       9:`<rect x="-20" y="-70" width="40" height="70" rx="2" fill="#7a4228" ${W}/><circle cx="12" cy="-34" r="3" fill="#f2c46b"/><rect x="-12" y="-62" width="24" height="12" fill="#fffaf0"/><text x="0" y="-53" text-anchor="middle" font-size="8" fill="${NAVY}">קברניט</text>`,
       10:`<rect x="-26" y="-44" width="52" height="34" rx="3" fill="#8a6d4a" ${W}/><path d="M-26 -44 l6 -10 h40 l6 10" fill="#a8865a"/><rect x="-8" y="-32" width="16" height="10" fill="#f3ead6"/><line x1="0" y1="-10" x2="0" y2="0" stroke="#7a6650" stroke-width="3"/>`};
      g.innerHTML=s[n]; return ({1:72,2:62,3:54,4:48,5:40,6:66,7:62,8:60,9:70,10:54})[n];
    },
    lm(g,k){ g.innerHTML={dc:`<rect x="-36" y="-56" width="72" height="48" rx="4" fill="#fffaf0" stroke="${NAVY}" stroke-width="3"/>${[0,1,2,3].map(i=>`<line x1="-26" y1="${-46+i*10}" x2="${24-(i%2)*14}" y2="${-46+i*10}" stroke="${NAVY}" stroke-width="2"/>`).join('')}`,
      kn:`<circle cx="0" cy="-40" r="28" fill="#1f2b3d" stroke="${NAVY}" stroke-width="3"/><circle cx="0" cy="-40" r="18" fill="none" stroke="#3f8f6a" stroke-width="1.5"/><line x1="0" y1="-40" x2="20" y2="-56" stroke="#7ee0a9" stroke-width="2"><animateTransform attributeName="transform" type="rotate" values="0 0 -40;360 0 -40" dur="4s" repeatCount="indefinite"/></line><circle cx="10" cy="-50" r="3" fill="${AMB}"/>`,
      cl:`<path d="M-30 0 V-46 M10 0 V-46 M-30 -23 H10 M-30 -46 H10" stroke="#a87b3a" stroke-width="3" fill="none"/><path d="M-6 -60 l0 -16 l14 6z" fill="${AMB}"/>`}[k]; },
    room(n,box){
      const R={
       1:[`${bg}<rect x="40" y="40" width="120" height="90" rx="6" fill="#5d6b7e"/>${['מייל','יומן','מברק'].map((t,i)=>`<g opacity="0">${ap(.3+i*.4)}<rect x="${60+i*0}" y="${50+i*26}" width="80" height="20" rx="3" fill="#fffaf0"/>${T(100,64+i*26,t,{sz:11})}</g>`).join('')}
          <path d="M170 85 L230 85" stroke="${TEAL}" stroke-width="2" stroke-dasharray="4 4"><animate attributeName="stroke-dashoffset" from="16" to="0" dur="1s" repeatCount="indefinite"/></path>
          <rect x="240" y="55" width="120" height="60" rx="6" fill="#fffaf0" stroke="${TEAL}" stroke-width="2"/>${T(300,80,'בתור, עם סיווג',{sz:12,c:TEAL})}${T(300,100,'המקור לא נגע',{sz:11})}`,'כל מה שנכנס לגשר נרשם: רדיו, מכ"ם, הודעות. כאן: דואר, יומן ומברקים נקראים ונכנסים לתור, והמקור לא נוגע.'],
       2:[`${bg}<rect x="50" y="40" width="70" height="100" rx="30" fill="${NAVY}"/><path d="M36 90 a50 50 0 0 0 98 0" fill="none" stroke="${NAVY}" stroke-width="4"/>
          ${Array.from({length:12},(_,i)=>`<rect x="${160+i*16}" y="${85-((i*37)%30)}" width="8" height="${2*((i*37)%30)+6}" rx="3" fill="${TEAL}" opacity="0">${ap(.2+i*.12)}</rect>`).join('')}${T(260,150,'30 שניות: מה, למי, עד מתי',{sz:12,op:0,ap:ap(1.8)})}`,'בסוף כל שיחת רדיו, הקצין רושם ביומן. כאן: כפתור אחד, 30 שניות. לא את השיחה, רק את ההבטחה.'],
       3:[`${bg}<rect x="40" y="30" width="150" height="110" rx="6" fill="#fffaf0" stroke="${NAVY}"/>${T(115,55,'הצעה',{sz:13})}${T(115,80,'מיירטים · 15.11',{sz:12,c:RED})}${T(115,100,'"אמצע דצמבר..."',{sz:11})}
          <g opacity="0">${ap(1)}<path d="M200 85 L230 85" stroke="${TEAL}" stroke-width="2"/><rect x="240" y="30" width="130" height="110" rx="6" fill="#fffaf0" stroke="${TEAL}" stroke-width="2"/>${T(305,55,'אושר',{sz:13,c:TEAL})}${T(305,80,'מיירטים · 15.12',{sz:12})}${T(305,104,'✓ דנה',{sz:12,c:TEAL})}</g>`,'הקצין הבכיר חותם על כל רישום. כאן: המודל מציע, דנה רואה את הציטוט ומתקנת את התאריך, ורק אז זה נכנס.'],
       4:[`${bg}<rect x="40" y="30" width="320" height="110" rx="6" fill="#f3ead6" stroke="#8a6d4a"/>${T(200,50,'T-114',{sz:13})}
          ${[['2.10 · הובטח',90],['17.10 · בעלים: מרקוס',190],['3.11 · 15.12 ← 20.12',300]].map(([t,x],i)=>`<g opacity="0">${ap(.4+i*.5)}<circle cx="${x}" cy="90" r="8" fill="${i===2?AMB:TEAL}"/>${T(x,120,t,{sz:10})}</g>`).join('')}<path d="M90 90 H300" stroke="#8a6d4a" stroke-width="2" stroke-dasharray="3 4"/>`,'יומן הספינה: כל רישום חדש בסוף, ושום דף לא נקרע. התאריך זז? רישום חדש, והישן נשאר.'],
       5:[`${bg}<rect x="40" y="40" width="110" height="70" rx="6" fill="#fffaf0" stroke="${NAVY}"/>${T(95,70,'מיירטים',{sz:13})}${T(95,92,'15.12',{sz:12})}
          <path d="M150 75 C200 40 220 40 250 60" fill="none" stroke="${TEAL}" stroke-width="2" stroke-dasharray="120" stroke-dashoffset="120"><animate attributeName="stroke-dashoffset" to="0" dur="1s" fill="freeze"/></path>
          <rect x="250" y="40" width="120" height="70" rx="6" fill="#fffaf0" stroke="${TEAL}" stroke-width="2" opacity="0">${ap(1)}</rect>${T(310,68,'פגישה 28.9',{sz:12,op:0,ap:ap(1.1)})}${T(310,90,'למה: הבקשה של ג\'',{sz:11,op:0,ap:ap(1.2)})}`,'ליד כל שינוי כיוון: למה. כאן: קישור מההבטחה לפגישה שבה הוחלט עליה, ולא תקציר.'],
       6:[`${bg}<rect x="40" y="25" width="320" height="120" rx="6" fill="#22304a"/>${[['אישור ייצוא','-6',RED],['מיירטים','30',AMB],['מכתב לשגריר','52','#cfe0ec'],['ביקור','78','#cfe0ec']].map(([t,d,c],i)=>`<g opacity="0">${ap(.2+i*.3)}${T(270,52+i*24,t,{sz:12,c:'#e8eef5'})}${T(110,52+i*24,d+' ימים',{sz:12,c})}</g>`).join('')}`,'לוח המשימות של המשמרת. כאן: כל מה שפתוח, לפי יעד, עם התראה 30 יום לפני. ואחת כבר באיחור.'],
       7:[`${bg}<rect x="70" y="30" width="60" height="110" rx="3" fill="#5d6b7e"/><circle cx="118" cy="85" r="4" fill="#f4e3b5"/>
          ${Array.from({length:8},(_,i)=>`<rect x="${170+(i%4)*48}" y="${40+Math.floor(i/4)*44}" width="40" height="32" rx="4" fill="#fffaf0" stroke="${TEAL}" stroke-width="2"><animate attributeName="x" from="100" to="${170+(i%4)*48}" begin="${(.2+i*.1).toFixed(1)}s" dur=".6s" fill="freeze"/></rect>`).join('')}${T(270,150,'53 חוטים עוברים, באותו אירוע',{sz:12,c:TEAL})}`,'משמרת לא יורדת מהגשר בלי למסור. כאן: העזיבה היא אירוע מכוח אדם, וכל החוטים עוברים בו. אף אחד לא צריך לזכור לכתוב מזכר.'],
       8:[`${bg}<rect x="40" y="25" width="150" height="120" rx="6" fill="#fffaf0" stroke="${NAVY}"/>${T(115,46,'תדריך יום ראשון',{sz:12})}${['1. אישור ייצוא · באיחור','2. ביקור · 9 ימים','3. מיירטים · 44 ימים'].map((t,i)=>T(115,72+i*22,t,{sz:11,c:i===2?AMB:'#22304a'})).join('')}
          <circle cx="290" cy="80" r="26" fill="#c99068"/><path d="M266 72 q24 -30 48 0" fill="#2a1d17"/><path d="M250 150 q40 -40 80 0" fill="${NAVY}"/>${T(290,30,'מרקוס',{sz:12,op:0,ap:ap(.8)})}`,'תדריך ההחלפה לפי רשימה קבועה. כאן: מה פתוח, לפי דחיפות, עם קישור "למה" לכל שורה.'],
       9:[`${bg}<rect x="60" y="25" width="90" height="125" rx="3" fill="#7a4228"/><circle cx="135" cy="90" r="5" fill="#f2c46b"/>
          <rect x="190" y="45" width="180" height="80" rx="6" fill="#fffaf0" stroke="${AMB}" stroke-width="2"/>${T(280,72,'יש כאן התחייבות',{sz:12})}${T(280,92,'יעד 15.12',{sz:12,c:AMB})}${T(280,112,'פנו לראש הצוות',{sz:11})}`,'רואים שדלת הקברניט קיימת, גם בלי להיכנס. כאן: מי שלא רשאי רואה בדל, ויודע למי לפנות.'],
       10:[`${bg}<path d="M40 120 Q120 100 200 120 T360 120" fill="none" stroke="#7f9bb3" stroke-width="3"/><rect x="60" y="70" width="70" height="40" rx="4" fill="#8a6d4a"/>${T(95,95,'יומן',{sz:11,c:'#f3ead6'})}
          <g><animateTransform attributeName="transform" type="translate" values="0 0;180 -20" dur="1.6s" fill="freeze"/><rect x="60" y="70" width="70" height="40" rx="4" fill="#a8865a" opacity=".85"/></g>
          <rect x="250" y="30" width="110" height="80" rx="4" fill="#e7e1d2" stroke="#7a6650"/>${T(305,60,'הארכיון',{sz:12})}${T(305,82,'553 אירועים',{sz:11,op:0,ap:ap(1.7)})}${T(305,100,'✓ גיבוב תואם',{sz:11,c:TEAL,op:0,ap:ap(2)})}`,'בסוף המסע, היומן עובר לחברה בנמל. כאן: בסוף הכהונה, הכול עובר לארכיון הלאומי, חתום.']};
      const [svg,cap]=R[n]; mini(box,svg,cap);
    }};

  /* =================== the theatre backstage (Crisis Rehearsal Engine) =================== */
  const backstage={
    aria:'מאחורי הקלעים של תיאטרון בחתך: עשרה פיצ\'רים עומדים בעמדות שלו, מספר ההפקה ועד לוח החזרות',
    words:{area:'',back:'→ חזרה מאחורי הקלעים',cut:'מתחת לבמה: הטכנולוגיות שהפיצ\'ר בנוי מהן',roomK:'מאחורי הקלעים',lm:{dc:'שולחן הבמאית',kn:'שעון החזרות',cl:'הכיסא הריק'}},
    home:{desk:[0,0,1000,620],mob:[30,110,940,500]},
    scene({g}){
      g.innerHTML=`<rect x="-60" y="-40" width="1120" height="720" fill="#2a2026"/>
      <rect x="40" y="60" width="920" height="420" fill="#3a2c33" stroke="#5a4450" stroke-width="3"/>
      <path d="M40 60 Q160 130 120 480 L40 480Z" fill="#7a2230"/><path d="M960 60 Q840 130 880 480 L960 480Z" fill="#7a2230"/>
      ${Array.from({length:7},(_,i)=>`<circle cx="${180+i*110}" cy="80" r="7" fill="#f2c46b" opacity=".6"/>`).join('')}
      <rect x="40" y="480" width="920" height="40" fill="#5a3e2b"/>
      <rect x="200" y="320" width="600" height="160" fill="#4a3a40" opacity=".6"/>
      <text x="300" y="140" text-anchor="middle" class="cy-wlab lt">התרחיש · ההרצה</text>
      <text x="700" y="140" text-anchor="middle" class="cy-wlab lt">המדידה · הצוות</text>
      <line x1="500" y1="100" x2="500" y2="470" stroke="#5a4450" stroke-width="2" stroke-dasharray="6 6"/>
      <path d="M100 462 L900 462" fill="none" stroke="#f2c46b" stroke-width="5" stroke-dasharray="2 10" stroke-linecap="round"/>`;
      return {path:'M100 462 L900 462',
        spots:{1:[130,462,.04],2:[210,462,.14],3:[290,462,.24],4:[370,462,.34],5:[450,462,.44],6:[540,462,.55],7:[620,462,.65],8:[700,462,.75],9:[780,462,.85],10:[860,462,.95]},
        lms:{dc:[300,250],kn:[700,250],cl:[500,200]}};
    },
    station(g,n){
      const W='class="cy-wf"';
      const s={
       1:`<rect x="-20" y="-50" width="40" height="34" rx="2" fill="#f3ead6" ${W}/><path d="M0 -50 v34" stroke="#7a2230" stroke-width="2"/><line x1="0" y1="-16" x2="0" y2="0" stroke="#c9b38a" stroke-width="3"/>`,
       2:`<rect x="-26" y="-30" width="52" height="8" fill="#8a6d4a" ${W}/><circle cx="-14" cy="-38" r="6" fill="#f2c46b"/><rect x="-2" y="-46" width="10" height="16" fill="#cfe0ec"/><path d="M14 -42 l8 10 h-16z" fill="#b5653d"/><line x1="-22" y1="-22" x2="-22" y2="0" stroke="#8a6d4a" stroke-width="3"/><line x1="22" y1="-22" x2="22" y2="0" stroke="#8a6d4a" stroke-width="3"/>`,
       3:`<circle cx="-10" cy="-40" r="7" fill="#e3b48f" ${W}/><circle cx="12" cy="-34" r="7" fill="#e3b48f"/><path d="M-4 -46 l10 6" stroke="#f2c46b" stroke-width="2" stroke-dasharray="3 3"/><line x1="0" y1="-24" x2="0" y2="0" stroke="#c9b38a" stroke-width="3"/>`,
       4:`<rect x="-24" y="-44" width="48" height="28" rx="3" fill="#1e1a1d" stroke="#f2c46b" stroke-width="2" ${W}/><circle cx="-10" cy="-30" r="5" fill="#7ee0a9"/><circle cx="10" cy="-30" r="5" fill="${RED}"/><line x1="0" y1="-16" x2="0" y2="0" stroke="#c9b38a" stroke-width="3"/>`,
       5:`<rect x="-16" y="-54" width="32" height="40" rx="2" fill="#fffaf0" ${W}/><path d="M-10 -44 h20 M-10 -36 h14" stroke="#7a2230" stroke-width="2"/><path d="M-10 -28 h20" stroke="#f2c46b" stroke-width="3"/><line x1="0" y1="-14" x2="0" y2="0" stroke="#c9b38a" stroke-width="3"/>`,
       6:`<path d="M0 0 v-24 M0 -24 L-16 -50 M0 -24 L16 -50" stroke="#f2c46b" stroke-width="4" fill="none" ${W}/><circle cx="-16" cy="-52" r="5" fill="#7ee0a9"/><circle cx="16" cy="-52" r="5" fill="${RED}"/>`,
       7:`<circle cx="0" cy="-32" r="18" fill="#fffaf0" stroke="#7a2230" stroke-width="3" ${W}/><line x1="0" y1="-32" x2="0" y2="-44" stroke="#7a2230" stroke-width="3"><animateTransform attributeName="transform" type="rotate" values="0 0 -32;360 0 -32" dur="3s" repeatCount="indefinite"/></line><rect x="-4" y="-56" width="8" height="6" fill="#7a2230"/>`,
       8:`<rect x="-22" y="-56" width="44" height="44" rx="2" fill="#f3ead6" ${W}/>${[0,1,2].map(i=>`<path d="M-14 ${-46+i*12} l3 3 l6 -6" stroke="#2f6f68" stroke-width="2" fill="none"/><line x1="0" y1="${-44+i*12}" x2="14" y2="${-44+i*12}" stroke="#7a2230" stroke-width="2"/>`).join('')}<line x1="0" y1="-12" x2="0" y2="0" stroke="#c9b38a" stroke-width="3"/>`,
       9:`<rect x="-26" y="-60" width="52" height="44" rx="2" fill="#5a3e2b" ${W}/>${[0,1,2,3].map(i=>`<circle cx="${-16+(i%2)*32}" cy="${-48+Math.floor(i/2)*20}" r="6" fill="${i===3?RED:'#e3b48f'}"/>`).join('')}<line x1="0" y1="-16" x2="0" y2="0" stroke="#c9b38a" stroke-width="3"/>`,
       10:`<rect x="-24" y="-56" width="48" height="42" rx="2" fill="#fffaf0" ${W}/><rect x="-24" y="-56" width="48" height="10" fill="#7a2230"/>${[0,1,2,3,4,5].map(i=>`<rect x="${-18+(i%3)*14}" y="${-42+Math.floor(i/3)*12}" width="8" height="8" fill="${i===4?'#f2c46b':'#cfe0ec'}"/>`).join('')}<line x1="0" y1="-14" x2="0" y2="0" stroke="#c9b38a" stroke-width="3"/>`};
      g.innerHTML=s[n]; return ({1:50,2:48,3:48,4:44,5:54,6:58,7:58,8:56,9:60,10:56})[n];
    },
    lm(g,k){ g.innerHTML={dc:`<rect x="-36" y="-50" width="72" height="34" rx="3" fill="#8a6d4a" stroke="#f2c46b" stroke-width="2"/><circle cx="-18" cy="-58" r="8" fill="#f2c46b" opacity=".8"/><rect x="-4" y="-46" width="30" height="20" fill="#fffaf0"/>`,
      kn:`<circle cx="0" cy="-40" r="26" fill="#fffaf0" stroke="#f2c46b" stroke-width="3"/>${[0,1,2,3,4,5,6,7,8,9,10,11].map(i=>`<circle cx="${(20*Math.sin(i*Math.PI/6)).toFixed(1)}" cy="${(-40-20*Math.cos(i*Math.PI/6)).toFixed(1)}" r="2" fill="${i<5?RED:'#7a2230'}"/>`).join('')}`,
      cl:`<path d="M-16 0 v-26 h32 v26 M-16 -26 v-20 h32 v20" fill="#7a2230" stroke="#f2c46b" stroke-width="2"/><text x="0" y="-30" text-anchor="middle" font-size="16" fill="#f2c46b">?</text>`}[k]; },
    room(n,box){
      const R={
       1:[`${bgw}<rect x="40" y="25" width="150" height="120" rx="4" fill="#fffaf0" stroke="#7a2230"/>${T(115,46,'ספר ההפקה',{sz:12})}${['קיו 13 · אורות','קיו 14 · טלפון מצלצל','קיו 15 · דלת'].map((t,i)=>T(115,72+i*22,t,{sz:11,c:i===1?'#7a2230':'#22304a'})).join('')}
          <g opacity="0">${ap(.9)}<rect x="220" y="40" width="150" height="90" rx="4" fill="#1e1a1d"/>${T(295,66,'injects:',{sz:11,c:'#7ee0a9'})}${T(295,88,'- at: 00:45',{sz:11,c:'#e8e2d0'})}${T(295,108,'  seat: diplomatic',{sz:11,c:'#e8e2d0'})}</g>`,'בספר ההפקה כל קיו כתוב, עם השורה שבה הוא נופל ומי מבצע. כאן: התרחיש כקובץ YAML, שנבדק לפני כל הרצה.'],
       2:[`${bgw}<rect x="40" y="100" width="320" height="10" fill="#8a6d4a"/>${[['שיחה מזויפת',90],['פתק כופר',170],['התראת חשמל',250],['מצור',330]].map(([t,x],i)=>`<g opacity="0">${ap(.2+i*.3)}<rect x="${x-34}" y="60" width="68" height="36" rx="4" fill="#fffaf0" stroke="#7a2230"/>${T(x,82,t,{sz:10})}</g>`).join('')}${T(200,140,'כל אביזר: מתי נכנס, למי, ואיזה סיווג',{sz:11})}`,'שולחן האביזרים: כל אביזר במקומו, עם פתק באיזו סצנה הוא נכנס. כאן: ספריית אירועים מוכנים, עם צעדי חובה וסיווג.'],
       3:[`${bgw}<rect x="40" y="40" width="140" height="90" rx="6" fill="#fffaf0" stroke="#7a2230"/>${T(110,66,'חזרה 3',{sz:12})}${T(110,90,'כופר: 20 מיליון',{sz:11})}${T(110,110,'נמל א\'',{sz:11})}
          <g opacity="0">${ap(1)}<rect x="220" y="40" width="140" height="90" rx="6" fill="#fffaf0" stroke="#2f6f68" stroke-width="2"/>${T(290,66,'חזרה 4',{sz:12})}${T(290,90,'כופר: 40 מיליון',{sz:11,c:'#2f6f68'})}${T(290,110,'נמל ב\'',{sz:11,c:'#2f6f68'})}</g>${T(200,155,'ההחלטות אותן החלטות',{sz:11})}`,'הבמאי מזיז את השחקנים בחזרה הרביעית, כדי שלא ינועו על טייס אוטומטי. כאן: הפרטים משתנים, השלד נעול.'],
       4:[`${bgw}<rect x="40" y="40" width="130" height="90" rx="6" fill="#1e1a1d"/><circle cx="80" cy="85" r="12" fill="#7ee0a9"><animate attributeName="fill" values="#7ee0a9;#b3261e;#7ee0a9" dur="2s" repeatCount="indefinite"/></circle>${T(130,90,'00:45',{sz:13,c:'#f2c46b'})}
          ${T(280,70,'"היכון לקיו 14..."',{sz:13})}${T(280,100,'"עכשיו"',{sz:14,c:'#7a2230',op:0,ap:ap(1.2)})}`,'מנהלת הבמה עם האוזניות: "היכון לקיו 14... עכשיו". כאן: שעון משחק אחד, וכל אירוע יוצא לכיסא שלו בזמן.'],
       5:[`${bgw}${[0,1,2].map(i=>`<rect x="${50+i*110}" y="40" width="90" height="100" rx="4" fill="#fffaf0" stroke="${i===1?'#2f6f68':'#c9b38a'}" stroke-width="2" opacity="${i===1?1:.45}"/>${T(95+i*110,62,['צבאי','מדיני','אנרגיה'][i],{sz:12})}`).join('')}${T(205,95,'שיחה מ"מנהיג"',{sz:11,c:'#7a2230',op:0,ap:ap(.8)})}${T(205,118,'לאמת? להסלים?',{sz:11,op:0,ap:ap(1.2)})}`,'דפי התפקיד: כל שחקן מקבל רק את השורות שלו. כאן: כל כיסא רואה רק את מה שמגיע אליו.'],
       6:[`${bgw}<path d="M80 85 H180" stroke="#7a2230" stroke-width="3"/><path d="M180 85 L260 45 M180 85 L260 125" stroke="#7a2230" stroke-width="3"/>${T(120,72,'החלטה',{sz:12})}
          <rect x="262" y="28" width="110" height="34" rx="4" fill="#fffaf0" stroke="#2f6f68"/>${T(317,50,'היו"ר שואל',{sz:11})}<rect x="262" y="108" width="110" height="34" rx="4" fill="#fffaf0" stroke="${RED}"/>${T(317,130,'לא הוחלט',{sz:11,c:RED})}`,'קיו מוכן גם כששחקן מדלג על שורה: ההצגה ממשיכה, בכיוון אחר. כאן: כל החלטה מובילה לאירוע הבא, וגם שתיקה.'],
       7:[`${bgw}<circle cx="110" cy="85" r="50" fill="#fffaf0" stroke="#7a2230" stroke-width="3"/><path d="M110 85 L110 45 A40 40 0 0 1 148 98 Z" fill="${RED}" opacity=".35"/>${T(110,90,'31 דק\'',{sz:13})}
          <rect x="210" y="45" width="160" height="80" rx="6" fill="#fffaf0" stroke="#7a2230"/>${T(290,70,'אימות בקו מאובטח',{sz:11})}${T(290,96,'✗ נשכח',{sz:13,c:RED,op:0,ap:ap(1)})}`,'שעון העצר מאחורי הקלעים, וגם הפתק "הכיסא נשכח על הבמה". כאן: זמן, וצעדי חובה, וצעד שנשכח שוקל יותר.'],
       8:[`${bgw}<rect x="60" y="25" width="280" height="120" rx="4" fill="#fffaf0" stroke="#7a2230"/>${T(200,48,'הערות אחרי חזרה',{sz:12})}${['הכיסא המדיני: לאמת לפני הסלמה','הכיסא הצבאי: בזמן','היו"ר: לשאול "מי אימת?"'].map((t,i)=>T(200,76+i*22,t,{sz:11,op:0,ap:ap(.4+i*.4)})).join('')}`,'הבמאית מדברת לתפקיד, לא לשחקן. כאן: תחקיר לפי כיסא, בלי שמות.'],
       9:[`${bgw}<rect x="50" y="25" width="300" height="120" rx="4" fill="#5a3e2b"/>${['מדיני','צבאי','סייבר','אנרגיה'].map((t,i)=>`${T(300,52+i*26,t,{sz:11,c:'#f3ead6'})}${T(200,52+i*26,i===0?'חדש · 0 חזרות':'✓',{sz:11,c:i===0?'#ff9c8a':'#7ee0a9'})}`).join('')}`,'לוח המחליפים בחדר השחקנים, ומחליף שעוד לא עשה חזרה מסומן. כאן: לוח צוות שמתעדכן מכוח אדם כל יום.'],
       10:[`${bgw}<rect x="50" y="25" width="300" height="120" rx="4" fill="#fffaf0" stroke="#7a2230"/>${Array.from({length:12},(_,i)=>`<rect x="${66+(i%6)*46}" y="${45+Math.floor(i/6)*50}" width="36" height="36" rx="3" fill="${i===2?'#f2c46b':'#efe6d6'}"/>${T(84+(i%6)*46,68+Math.floor(i/6)*50,['ינו','פבר','מרץ','אפר','מאי','יונ','יול','אוג','ספט','אוק','נוב','דצמ'][i],{sz:9})}`).join('')}`,'לוח החזרות של העונה: מחליף חדש מקבל חזרה משלו באותו שבוע. כאן: 45 דקות בכל חודש, וכיסא חדש תוך שבועיים.']};
      const [svg,cap]=R[n]; mini(box,svg,cap);
    }};

  const act2w=(world,what,hint)=>`<p class="cy-k">מערכה 2 · ${world}</p>
   <p>אותו מקום, שתי משמעויות. הדרך היא ${what}, ובכל תחנה לאורכה עומד פיצ'ר אחד של המוצר. ארבעה אזורים, ארבע שכבות.</p>
   <div class="cy-ctl"><button type="button" class="cy-btn go" data-a="play">▶ סיור מודרך</button><button type="button" class="cy-btn hot" data-a="shock">לשלוח הבטחה אחת</button><button type="button" class="cy-btn" data-a="home">למבט על</button></div>
   <ol class="cy-list"></ol><p class="cy-hint">${hint}</p>`;
  const DM=C['desk-memory'], CR=C['crisis-rehearsal'];
  DM.world=bridge;
  DM.act2=act2w('הגשר של הפיצ\'רים','המסלול של הבטחה אחת, מהרדיו ועד משרד החברה בנמל','לחצו על תחנה כדי להיכנס לעמדה שלה. גם הפקודות הקבועות, הרדאר והנמל הבא נפתחים.');
  CR.world=backstage;
  CR.act2=act2w('מאחורי הקלעים של הפיצ\'רים','הדרך של אירוע אחד, מספר ההפקה ועד לוח החזרות','לחצו על תחנה כדי להיכנס לעמדה שלה. גם שולחן הבמאית, שעון החזרות והכיסא הריק נפתחים.').replace('לשלוח הבטחה אחת','לשלוח אירוע אחד');
  [DM,CR].forEach(c=>{ const s0=c.act1.setup; c.act1.setup=ctx=>{ ctx.stage.classList.add('cy-w'); return s0(ctx); }; });
})();
