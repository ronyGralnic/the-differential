/* Case 05 · the spec analogies as whole worlds (city-engine.js, C.world).
   Payback Meter → a restaurant kitchen at dinner service (the ticket rail, the menu, the gas meter and the oven on credit,
     the shared stove, the order book, the dish board, the chef's special, the fridge alarm, the itemised bill, the association survey).
   Revenue Nowcaster → a weather station (the instrument mast, the technician, the rain gauge out in the yard, the calibration bench,
     the forecast computer, the storm siren, the cone map, the fan of tracks, the scorecard, the satellite contract).
   Each feature room opens with a small scene from the same world. */
(function(){
  const C=window.CITY||{}; if(!C['payback-meter']||!C['revenue-nowcaster']) return;
  const st=document.createElement('style'); st.textContent=`
  .cy-world .cy-wf{transition:fill .2s}
  .cy-b.zap .cy-wf{fill:#ffb3a3!important}
  .cy-wlab{font-family:'TD Hebrew',sans-serif;font-size:15px;font-weight:700;fill:#3a2a1e;letter-spacing:.02em}
  .cy-wsub{font-family:'TD Hebrew',sans-serif;font-size:12px;fill:#5a4a3a}
  .cy-wroom{background:#f6efe6;border:1px solid #e3d3c0;border-radius:14px;padding:6px;margin-top:6px}
  .cy-room .cy-r0{grid-column:1/-1}
  .cy-wroom svg{display:block;width:100%;height:auto;max-height:230px}
  .cy-wroom p{margin:6px 8px 4px;font-size:14px;line-height:1.6;color:#3a2f26}
  .cy-stage.cy-w{background:#efe6d8;grid-template-columns:1fr}
  .cy-stage.cy-w .cy-bl{font-size:16px}
  .cy-stage.cy-w .cy-svg{min-height:0}
  .cy-rn .cy-stage.cy-w{background:#dfe7ee}
  .cy-rn .cy-wroom{background:#eef2f6;border-color:#d3dbe5}
  .cy-rn .cy-wroom p{color:#2f3a4c}
  .cy-rn .cy-wlab{fill:#22304a}`;
  document.head.append(st);
  const mini=(box,svg,cap)=>{ box.innerHTML=`<svg viewBox="0 0 400 170" role="img" aria-label="${cap}">${svg}</svg><p>${cap}</p>`; };
  const ap=(b,d)=>`<animate attributeName="opacity" values="0;1" begin="${b}s" dur="${d||.5}s" fill="freeze"/>`;
  const T=(x,y,s,o)=>`<text x="${x}" y="${y}" text-anchor="middle" font-family="TD Hebrew, sans-serif" font-size="${(o&&o.sz)||12}" fill="${(o&&o.c)||'#3a2a1e'}" ${(o&&o.op!=null)?`opacity="${o.op}"`:''}>${s}${(o&&o.ap)||''}</text>`;
  const bgK='<rect x="0" y="0" width="400" height="170" rx="10" fill="#f6efe6"/>';
  const bgW='<rect x="0" y="0" width="400" height="170" rx="10" fill="#eef2f6"/>';
  const TEAL='#2f6f68', NAVY='#2c3e5a', AMB='#c47a12', RED='#b3261e', STEEL='#8a96a3', WOOD='#8a6d4a';

  /* =================== the kitchen (Payback Meter) =================== */
  const kitchen={
    aria:'מטבח של מסעדה בשירות ערב בחתך: עשרה פיצ\'רים עומדים בעמדות שלו, ממסילת הבונים ועד תיבת הסקר של האיגוד',
    words:{area:'',back:'→ חזרה למטבח',cut:'מתחת לדלפק: הטכנולוגיות שהפיצ\'ר בנוי מהן',roomK:'במטבח',lm:{dc:'לוח ההחלטות של השף',kn:'המאזניים',cl:'הדלת לחדר האוכל'}},
    home:{desk:[0,0,1000,620],mob:[30,110,940,500]},
    scene({g}){
      g.innerHTML=`<rect x="-60" y="-40" width="1120" height="720" fill="#efe6d8"/>
      ${Array.from({length:14},(_,i)=>`<rect x="${-60+i*84}" y="-40" width="80" height="300" fill="${i%2?'#f6efe6':'#efe3d2'}"/>`).join('')}
      <rect x="-60" y="430" width="1120" height="260" fill="#cdbfae"/>
      ${Array.from({length:24},(_,i)=>`<rect x="${-60+i*48}" y="430" width="46" height="46" fill="${i%2?'#d9ccbb':'#c4b5a2'}"/>`).join('')}
      <rect x="40" y="250" width="920" height="40" rx="4" fill="${STEEL}"/><rect x="40" y="290" width="920" height="140" fill="#b8c1ca" stroke="#7d8893" stroke-width="2"/>
      ${[0,1,2,3,4,5,6,7].map(i=>`<rect x="${70+i*112}" y="305" width="90" height="110" rx="3" fill="#a7b1bb" stroke="#7d8893"/>`).join('')}
      <rect x="60" y="120" width="300" height="12" fill="${STEEL}"/>${[0,1,2,3,4,5].map(i=>`<path d="M${80+i*46} 132 v18 h26 v36 l-6 -4 l-6 4 l-6 -4 l-8 4 z" fill="#fffaf0" stroke="#b9a98f"/>`).join('')}
      <text x="210" y="112" text-anchor="middle" class="cy-wlab">המסילה · התפריט · הגז</text>
      <rect x="420" y="70" width="220" height="150" rx="6" fill="#3a2f26"/><path d="M430 210 h200" stroke="#e0b45a" stroke-width="2"/>${[0,1,2].map(i=>`<circle cx="${470+i*60}" cy="190" r="18" fill="#4a3c30" stroke="#e0b45a"/>`).join('')}
      ${[0,1,2].map(i=>`<path d="M${460+i*60} 170 q10 -14 20 0" fill="none" stroke="#c9c2b8" stroke-width="2" opacity=".6"><animate attributeName="opacity" values=".1;.7;.1" dur="${2+i*.5}s" repeatCount="indefinite"/></path>`).join('')}
      <text x="530" y="60" text-anchor="middle" class="cy-wlab">הכיריים · הפנקס · הלוח</text>
      <rect x="700" y="90" width="120" height="150" rx="6" fill="#dfe6ea" stroke="#7d8893" stroke-width="3"/><rect x="712" y="104" width="96" height="58" rx="3" fill="#cfd9df"/><rect x="712" y="170" width="96" height="58" rx="3" fill="#cfd9df"/>
      <text x="760" y="80" text-anchor="middle" class="cy-wlab">העונה · המקרר</text>
      <rect x="860" y="140" width="110" height="140" rx="4" fill="#7a5a3a"/><rect x="872" y="152" width="86" height="116" fill="#e9dcc6"/><text x="915" y="214" text-anchor="middle" class="cy-wsub">חדר האוכל</text>
      <path d="M100 452 L360 452 Q420 452 450 440 L640 440 Q700 440 740 452 L920 452" fill="none" stroke="${TEAL}" stroke-width="5" stroke-dasharray="2 10" stroke-linecap="round"/>`;
      return {path:'M100 452 L360 452 Q420 452 450 440 L640 440 Q700 440 740 452 L920 452',
        spots:{1:[110,452,.02],2:[190,452,.1],3:[270,452,.18],4:[360,452,.27],5:[450,440,.36],6:[540,440,.46],7:[630,440,.56],8:[720,450,.66],9:[810,452,.78],10:[905,452,.93]},
        lms:{dc:[160,240],kn:[600,250],cl:[915,280]}};
    },
    station(g,n){
      const W='class="cy-wf"';
      const s={
       1:`<rect x="-26" y="-58" width="52" height="6" fill="${STEEL}" ${W}/>${[0,1,2].map(i=>`<path d="M${-22+i*16} -52 v6 h12 v22 l-3 -2 l-3 2 l-3 -2 l-3 2z" fill="#fffaf0" stroke="#b9a98f"/>`).join('')}<line x1="0" y1="-24" x2="0" y2="0" stroke="${STEEL}" stroke-width="3"/>`,
       2:`<rect x="-20" y="-64" width="40" height="50" rx="3" fill="#3a2f26" ${W}/>${[0,1,2,3].map(i=>`<line x1="-12" y1="${-54+i*10}" x2="${12-(i%2)*8}" y2="${-54+i*10}" stroke="#e0b45a" stroke-width="2"/>`).join('')}<line x1="0" y1="-14" x2="0" y2="0" stroke="#3a2f26" stroke-width="3"/>`,
       3:`<rect x="-22" y="-56" width="44" height="44" rx="4" fill="#5d5049" ${W}/><circle cx="0" cy="-34" r="12" fill="#efe6d8" stroke="#3a2f26" stroke-width="2"/><line x1="0" y1="-34" x2="7" y2="-40" stroke="${RED}" stroke-width="2"><animateTransform attributeName="transform" type="rotate" values="0 0 -34;300 0 -34" dur="6s" repeatCount="indefinite"/></line><line x1="0" y1="-12" x2="0" y2="0" stroke="#3a2f26" stroke-width="3"/>`,
       4:`<rect x="-30" y="-30" width="60" height="22" rx="3" fill="#4a3c30" ${W}/><rect x="-26" y="-56" width="22" height="26" rx="3" fill="#8a96a3"/><rect x="2" y="-46" width="20" height="16" rx="3" fill="#8a96a3"/><path d="M-20 -64 q6 -8 12 0" stroke="#c9c2b8" fill="none" stroke-width="2"/><line x1="0" y1="-8" x2="0" y2="0" stroke="#4a3c30" stroke-width="3"/>`,
       5:`<rect x="-24" y="-46" width="48" height="36" rx="2" fill="${WOOD}" ${W}/><rect x="-20" y="-42" width="40" height="28" fill="#f3ead6"/>${[0,1,2].map(i=>`<line x1="-14" y1="${-36+i*8}" x2="14" y2="${-36+i*8}" stroke="${WOOD}" stroke-width="1.5"/>`).join('')}<line x1="0" y1="-10" x2="0" y2="0" stroke="${WOOD}" stroke-width="3"/>`,
       6:`<rect x="-26" y="-70" width="52" height="54" rx="3" fill="#fffaf0" stroke="#3a2f26" stroke-width="2" ${W}/>${[[14,TEAL],[22,TEAL],[18,TEAL],[9,RED]].map(([h,c],i)=>`<rect x="${-18+i*10}" y="${-22-h}" width="7" height="${h}" fill="${c}"/>`).join('')}<line x1="-22" y1="-46" x2="22" y2="-46" stroke="#3a2f26" stroke-dasharray="3 3"/><line x1="0" y1="-16" x2="0" y2="0" stroke="#3a2f26" stroke-width="3"/>`,
       7:`<ellipse cx="0" cy="-28" rx="24" ry="10" fill="#fffaf0" stroke="#3a2f26" stroke-width="2" ${W}/><path d="M-12 -32 q12 -16 24 0" fill="${AMB}"/><rect x="-6" y="-62" width="12" height="16" rx="2" fill="#efe6d8" stroke="#3a2f26"/><path d="M0 -58 v4 l3 2" stroke="${RED}" fill="none"/><line x1="0" y1="-18" x2="0" y2="0" stroke="#3a2f26" stroke-width="3"/>`,
       8:`<rect x="-16" y="-66" width="32" height="56" rx="4" fill="#dfe6ea" stroke="#7d8893" stroke-width="2" ${W}/><circle cx="0" cy="-74" r="6" fill="${RED}"><animate attributeName="opacity" values="1;.2;1" dur="1.2s" repeatCount="indefinite"/></circle><line x1="-10" y1="-40" x2="10" y2="-40" stroke="#7d8893"/><line x1="0" y1="-10" x2="0" y2="0" stroke="#7d8893" stroke-width="3"/>`,
       9:`<path d="M-14 -60 h28 v44 l-5 -3 l-5 3 l-4 -3 l-4 3 l-5 -3 l-5 3z" fill="#fffaf0" stroke="#3a2f26" stroke-width="2" ${W}/>${[0,1,2,3].map(i=>`<line x1="-9" y1="${-52+i*8}" x2="${9-(i===3?6:0)}" y2="${-52+i*8}" stroke="#7a6650"/>`).join('')}<line x1="0" y1="-16" x2="0" y2="0" stroke="#3a2f26" stroke-width="3"/>`,
       10:`<rect x="-18" y="-50" width="36" height="34" rx="4" fill="#2f6f68" ${W}/><rect x="-10" y="-40" width="20" height="4" fill="#efe6d8"/><path d="M-8 -66 h16 v12 h-16z" fill="#fffaf0" stroke="#3a2f26"/><line x1="0" y1="-16" x2="0" y2="0" stroke="#2f6f68" stroke-width="3"/>`};
      g.innerHTML=s[n]; return ({1:58,2:64,3:56,4:64,5:46,6:70,7:62,8:80,9:60,10:66})[n];
    },
    lm(g,k){ g.innerHTML={dc:`<rect x="-40" y="-60" width="80" height="52" rx="4" fill="#3a2f26" stroke="#e0b45a" stroke-width="2"/>${[0,1,2,3].map(i=>`<line x1="-30" y1="${-50+i*10}" x2="${26-(i%2)*14}" y2="${-50+i*10}" stroke="#efe6d8" stroke-width="2"/>`).join('')}`,
      kn:`<line x1="0" y1="-8" x2="0" y2="-56" stroke="#3a2f26" stroke-width="3"/><g><animateTransform attributeName="transform" type="rotate" values="-8 0 -54;8 0 -54;-8 0 -54" dur="4s" repeatCount="indefinite"/><line x1="-30" y1="-54" x2="30" y2="-54" stroke="#3a2f26" stroke-width="3"/><path d="M-40 -34 h20 l-10 -20z" fill="${AMB}"/><path d="M20 -34 h20 l-10 -20z" fill="${TEAL}"/></g><rect x="-14" y="-10" width="28" height="8" fill="#3a2f26"/>`,
      cl:`<rect x="-22" y="-70" width="44" height="70" rx="2" fill="#7a5a3a"/><rect x="-16" y="-62" width="32" height="24" fill="#e9dcc6"/><circle cx="12" cy="-30" r="3" fill="#e0b45a"/>`}[k]; },
    room(n,box){
      const R={
       1:[`${bgK}<rect x="30" y="30" width="200" height="8" fill="${STEEL}"/>${[0,1,2,3,4].map(i=>`<g opacity="0">${ap(.2+i*.3)}<path d="M${40+i*38} 38 v8 h28 v40 l-4 -3 l-4 3 l-4 -3 l-4 3 l-4 -3 l-4 3 l-4 -3z" fill="#fffaf0" stroke="#b9a98f"/>${T(54+i*38,64,'#'+(41+i),{sz:10})}</g>`).join('')}
          <path d="M240 70 L280 70" stroke="${TEAL}" stroke-width="2" stroke-dasharray="4 4"><animate attributeName="stroke-dashoffset" from="16" to="0" dur="1s" repeatCount="indefinite"/></path>
          <rect x="285" y="40" width="100" height="70" rx="6" fill="#fffaf0" stroke="${TEAL}" stroke-width="2"/>${T(335,64,'צעד 1,204',{sz:12,c:TEAL})}${T(335,84,'32 שאילתות',{sz:11})}${T(335,100,'30 אלפיות',{sz:11})}`,'כל הזמנה נתלית ברגע שהיא נכנסת, וכל מנה מסומנת מולה. כאן: כל צעד בשרת נרשם, עם השאילתות שרצו בו ומשך הזמן, ונשלח באצווה.'],
       2:[`${bgK}<rect x="40" y="20" width="150" height="130" rx="6" fill="#3a2f26"/>${[['פסטה','$18'],['סלט','$14'],['צלי של השף','$34'],['מנת ערב','$22']].map(([a,b],i)=>`${T(150,50+i*26,a,{sz:12,c:'#efe6d8'})}${T(70,50+i*26,b,{sz:12,c:'#e0b45a'})}`).join('')}
          <rect x="230" y="40" width="140" height="80" rx="6" fill="#fffaf0" stroke="#3a2f26"/>${T(300,64,'גרסה 12 · מ-1.11',{sz:11})}${T(300,86,'קלט $3 · מטמון $0.30',{sz:11})}${T(300,106,'פלט $15 (למיליון)',{sz:11,c:RED})}`,'בתפריט יש מחיר לכל מנה, ומחיר אחר לאורח קבוע. כאן: מחירון בגרסאות, חוזים והנחות, וכל שאילתה נושאת את הגרסה שלה.'],
       3:[`${bgK}<rect x="40" y="40" width="110" height="90" rx="6" fill="#5d5049"/><circle cx="95" cy="85" r="30" fill="#efe6d8" stroke="#3a2f26" stroke-width="3"/><line x1="95" y1="85" x2="112" y2="70" stroke="${RED}" stroke-width="3"><animateTransform attributeName="transform" type="rotate" values="0 95 85;270 95 85" dur="5s" repeatCount="indefinite"/></line>
          ${T(270,44,'שעת שבב, מדומה:',{sz:12})}${[['חלק השבב','$1.40'],['חשמל וקירור','$0.35'],['אירוח ורשת','$0.35']].map(([a,b],i)=>`<g opacity="0">${ap(.4+i*.5)}${T(300,70+i*22,a,{sz:11})}${T(220,70+i*22,b,{sz:11,c:TEAL})}</g>`).join('')}<g opacity="0">${ap(2)}${T(260,140,'סה"כ $2.10',{sz:13,c:RED})}</g>`,'מונה הגז, והתנור שנקנה בהלוואה: כל שעת בישול נושאת חלק מהם. כאן: תעריף לשעת שבב, מחלק השבב, החשמל והאירוח. חלוקת הסכום היא המחשה.'],
       4:[`${bgK}<rect x="40" y="110" width="320" height="24" rx="4" fill="#4a3c30"/><rect x="70" y="40" width="90" height="70" rx="6" fill="#8a96a3"/>${T(115,80,'60K',{sz:16,c:'#fffaf0'})}<rect x="200" y="84" width="40" height="26" rx="4" fill="#8a96a3"/>${T(220,102,'300',{sz:11,c:'#fffaf0'})}<rect x="270" y="80" width="50" height="30" rx="4" fill="#8a96a3"/>${T(295,100,'3K',{sz:11,c:'#fffaf0'})}
          ${T(200,156,'הסיר הגדול מחזיק את האש הכי הרבה זמן',{sz:12,c:RED,op:0,ap:ap(1.2)})}`,'כיריים אחת, שלושה סירים: מי שמבשל סיר ענק שעתיים משלם יותר על הגז. כאן: הצעד מתחלק, והשאילתה עם 60 אלף טוקנים בזיכרון נושאת את החלק הגדול.'],
       5:[`${bgK}<rect x="60" y="20" width="280" height="130" rx="4" fill="${WOOD}"/><rect x="70" y="28" width="260" height="114" fill="#f3ead6"/>${[0,1,2,3].map(i=>`<g opacity="0">${ap(.2+i*.4)}${T(200,52+i*24,['#41 · צלי · $34 · עלות $11.2','#42 · סלט · $14 · עלות $3.1','#43 · פסטה · $18 · עלות $4.0','תיקון ל-#41: גז +$0.4'][i],{sz:11,c:i===3?RED:'#3a2a1e'})}</g>`).join('')}`,'פנקס ההזמנות: כל הזמנה נרשמת, ותיקון הוא שורה חדשה. כאן: שורה לכל שאילתה, אין עדכון ואין מחיקה, וחתימה שעתית.'],
       6:[`${bgK}<rect x="40" y="20" width="320" height="130" rx="6" fill="#fffaf0" stroke="#3a2f26"/>${[['צ\'אט',96],['חיפוש',97],['מסמכים',96],['מטמון',85],['קוד',61]].map(([l,v],i)=>`${T(330,46+i*22,l,{sz:11})}<rect x="${300-v*2.4}" y="${36+i*22}" width="${v*2.4}" height="14" rx="3" fill="${v<70?RED:TEAL}" opacity="0">${ap(.3+i*.3)}</rect>`).join('')}<line x1="${300-84.3*2.4}" y1="30" x2="${300-84.3*2.4}" y2="146" stroke="#3a2f26" stroke-dasharray="4 4"/>${T(300-84.3*2.4,160,'ממוצע 84.3%',{sz:10})}`,'לוח הרווחיות של המנות: הסטייק מוכר הכי הרבה, ויש לו את הרווח הכי דק. כאן: רווח לכל שימוש, והדליל תמיד ליד הממוצע (נתוני ה-POC).'],
       7:[`${bgK}${Array.from({length:12},(_,i)=>`<rect x="${40+(i%6)*52}" y="${30+Math.floor(i/6)*56}" width="44" height="46" rx="3" fill="${i<6?'#e9dcc6':'#efe6d8'}" stroke="#b9a98f"/>${T(62+(i%6)*52,58+Math.floor(i/6)*56,'ש'+(i*2+2),{sz:10})}`).join('')}
          <rect x="40" y="30" width="0" height="46" fill="${TEAL}" opacity=".5"><animate attributeName="width" values="0;150" dur="2s" fill="freeze"/></rect>${T(200,158,'מחליפה בשבוע 8: חזרו 73% בשנה (POC)',{sz:12,c:RED,op:0,ap:ap(2)})}`,'מנת השף החדשה צריכה להחזיר את הפיתוח לפני שהתפריט מתחלף. כאן: שעון החזר לכל גרסת מודל, שמחושב מחדש כשמחליפה מוכרזת.'],
       8:[`${bgK}<rect x="60" y="30" width="80" height="120" rx="6" fill="#dfe6ea" stroke="#7d8893" stroke-width="2"/><circle cx="100" cy="22" r="8" fill="${RED}"><animate attributeName="opacity" values="1;.2;1" dur="1s" repeatCount="indefinite"/></circle>
          <polyline points="180,60 220,64 260,70 300,80 340,92" fill="none" stroke="${RED}" stroke-width="3"/>${T(260,110,'קוד: 61% ← 58%',{sz:12,c:RED})}${T(260,134,'התראה אחת, למרקו',{sz:11})}`,'אזעקת המקרר: לא מחכים לסוף הערב. כאן: כלל שבודק כל שעה, מקבץ, ושולח לבעלים, עם קישור לשורות.'],
       9:[`${bgK}<path d="M150 14 h100 v140 l-10 -6 l-10 6 l-10 -6 l-10 6 l-10 -6 l-10 6 l-10 -6 l-10 6 l-10 -6z" fill="#fffaf0" stroke="#3a2f26"/>${[['סוכן קוד','$26,700'],['סוכן חשבוניות','$7,900'],['צ\'אט','$3,600']].map(([a,b],i)=>`<g opacity="0">${ap(.3+i*.4)}${T(225,44+i*24,a,{sz:11})}${T(175,44+i*24,b,{sz:11,c:i?'#3a2a1e':RED})}</g>`).join('')}${T(200,128,'FOCUS ↓',{sz:11,c:TEAL})}`,'קבלה מפורטת לשולחן, כדי שתדע מה הזמנת. כאן: ג\'ייק רואה כמה עלה כל סוכן שלו, ומוריד קובץ בפורמט פתוח. הסכומים בדויים.'],
       10:[`${bgK}<rect x="150" y="40" width="100" height="90" rx="8" fill="${TEAL}"/><rect x="170" y="60" width="60" height="8" fill="#efe6d8"/>${[0,1,2,3,4].map(i=>`<rect x="${40+i*14}" y="${50+i*10}" width="40" height="28" rx="2" fill="#fffaf0" stroke="#3a2f26" opacity="0">${ap(.2+i*.25)}</rect>`).join('')}
          ${T(320,70,'מפתחים: 70%',{sz:12})}${T(320,92,'צרכנים: 97%',{sz:12})}${T(320,114,'ארגונים: ⦸',{sz:12,c:RED})}`,'סקר העלויות של האיגוד: כל מסעדה מוסרת, אף אחת לא נחשפת. כאן: מדד ענפי מצטבר, רק מפלחים עם מספיק לקוחות, ורעש מדוד.']};
      const [svg,cap]=R[n]; mini(box,svg,cap);
    }};

  /* =================== the weather station (Revenue Nowcaster) =================== */
  const station={
    aria:'תחנה מטאורולוגית בחתך: עשרה פיצ\'רים עומדים לאורך השביל, מעמוד המכשירים ועד החוזה עם שירות הלוויינים. מד הגשם עומד לבד, מחוץ לגדר',
    words:{area:'',back:'→ חזרה לתחנה',cut:'מתחת לרצפה: הטכנולוגיות שהפיצ\'ר בנוי מהן',roomK:'בתחנה',lm:{dc:'לוח ההחלטות',kn:'הקונוס',cl:'האנטנה'}},
    home:{desk:[0,0,1000,620],mob:[30,110,940,500]},
    scene({g}){
      g.innerHTML=`<defs><linearGradient id="rnSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9d7e4"/><stop offset="1" stop-color="#e8eef4"/></linearGradient></defs>
      <rect x="-60" y="-40" width="1120" height="720" fill="url(#rnSky)"/>
      ${[[160,90],[420,60],[720,100]].map(([x,y],i)=>`<g opacity=".85"><ellipse cx="${x}" cy="${y}" rx="60" ry="20" fill="#fff"/><ellipse cx="${x+40}" cy="${y-10}" rx="40" ry="18" fill="#fff"/><animateTransform attributeName="transform" type="translate" values="0,0;30,0;0,0" dur="${18+i*4}s" repeatCount="indefinite"/></g>`).join('')}
      <path d="M-60 430 Q200 400 500 420 T1140 410 L1140 680 L-60 680Z" fill="#a8b98f"/>
      <path d="M-60 470 Q260 450 560 466 T1140 460 L1140 680 L-60 680Z" fill="#94a87b"/>
      <rect x="380" y="250" width="260" height="170" fill="#f3f5f8" stroke="${NAVY}" stroke-width="3"/><path d="M370 250 L510 190 L650 250Z" fill="#5d6b7e"/>
      ${[0,1,2].map(i=>`<rect x="${400+i*80}" y="280" width="60" height="44" rx="3" fill="#cfe0ec" stroke="${NAVY}"/>`).join('')}
      <text x="510" y="380" text-anchor="middle" class="cy-wsub">משרד התחזית</text>
      <line x1="120" y1="420" x2="120" y2="200" stroke="${NAVY}" stroke-width="4"/>${[0,1,2].map(i=>`<line x1="100" y1="${220+i*30}" x2="140" y2="${220+i*30}" stroke="${NAVY}" stroke-width="3"/>`).join('')}
      <g><animateTransform attributeName="transform" type="rotate" values="0 120 196;360 120 196" dur="3s" repeatCount="indefinite"/>${[0,1,2].map(i=>`<line x1="120" y1="196" x2="${120+18*Math.cos(i*2.09)}" y2="${196+18*Math.sin(i*2.09)}" stroke="${NAVY}" stroke-width="2"/><circle cx="${120+18*Math.cos(i*2.09)}" cy="${196+18*Math.sin(i*2.09)}" r="4" fill="${AMB}"/>`).join('')}</g>
      <path d="M30 470 L900 470" stroke="#7a6650" stroke-width="2" stroke-dasharray="10 6"/>
      ${Array.from({length:18},(_,i)=>`<line x1="${40+i*48}" y1="462" x2="${40+i*48}" y2="478" stroke="#7a6650" stroke-width="3"/>`).join('')}
      <text x="230" y="182" text-anchor="middle" class="cy-wlab">המכשירים · המודל</text><text x="760" y="226" text-anchor="middle" class="cy-wlab">התחזית · השומרים</text>
      <text x="960" y="560" text-anchor="middle" class="cy-wsub">מחוץ לגדר</text>
      <path d="M100 452 L360 452 Q420 452 450 440 L640 440 Q700 440 740 452 L900 452" fill="none" stroke="${TEAL}" stroke-width="5" stroke-dasharray="2 10" stroke-linecap="round"/>`;
      return {path:'M100 452 L360 452 Q420 452 450 440 L640 440 Q700 440 740 452 L900 452',
        spots:{1:[110,452,.02],2:[200,452,.12],3:[960,540,.98],4:[290,452,.22],5:[380,452,.32],6:[470,440,.42],7:[560,440,.52],8:[650,440,.62],9:[740,452,.74],10:[840,452,.88]},
        lms:{dc:[250,300],kn:[700,300],cl:[850,250]}};
    },
    station(g,n){
      const W='class="cy-wf"';
      const s={
       1:`<line x1="0" y1="0" x2="0" y2="-70" stroke="${NAVY}" stroke-width="3"/><rect x="-14" y="-56" width="28" height="14" rx="3" fill="#cfe0ec" stroke="${NAVY}" ${W}/><path d="M-10 -70 l10 -8 l10 8" fill="none" stroke="${AMB}" stroke-width="3"/>`,
       2:`<rect x="-20" y="-34" width="40" height="24" rx="3" fill="${RED}" ${W}/><path d="M-10 -34 v-6 h20 v6" fill="none" stroke="${NAVY}" stroke-width="2"/><path d="M-6 -24 l12 0 M-6 -18 l8 0" stroke="#fff" stroke-width="2"/><line x1="0" y1="-10" x2="0" y2="0" stroke="${NAVY}" stroke-width="3"/>`,
       3:`<rect x="-10" y="-60" width="20" height="46" rx="3" fill="#fff" stroke="${NAVY}" stroke-width="2" ${W}/><rect x="-8" y="-30" width="16" height="14" fill="#6f8fc4"/><path d="M-14 -60 h28" stroke="${NAVY}" stroke-width="3"/><line x1="0" y1="-14" x2="0" y2="0" stroke="${NAVY}" stroke-width="3"/>`,
       4:`<rect x="-26" y="-26" width="52" height="8" fill="${WOOD}" ${W}/><line x1="-20" y1="-18" x2="-20" y2="0" stroke="${WOOD}" stroke-width="3"/><line x1="20" y1="-18" x2="20" y2="0" stroke="${WOOD}" stroke-width="3"/><rect x="-16" y="-46" width="10" height="20" fill="#cfe0ec" stroke="${NAVY}"/><rect x="6" y="-46" width="10" height="20" fill="#fff" stroke="${NAVY}"/>`,
       5:`<rect x="-24" y="-60" width="48" height="36" rx="3" fill="#1f2b3d" ${W}/><polyline points="-18,-34 -8,-40 2,-38 12,-48 18,-46" fill="none" stroke="#7ee0a9" stroke-width="2"/><rect x="-6" y="-24" width="12" height="8" fill="#5d6b7e"/><line x1="0" y1="-16" x2="0" y2="0" stroke="${NAVY}" stroke-width="3"/>`,
       6:`<line x1="0" y1="0" x2="0" y2="-56" stroke="${NAVY}" stroke-width="3"/><path d="M-14 -56 a14 14 0 0 1 28 0z" fill="${AMB}" ${W}/><circle cx="0" cy="-64" r="5" fill="${RED}"><animate attributeName="opacity" values="1;.25;1" dur="1.4s" repeatCount="indefinite"/></circle>`,
       7:`<rect x="-26" y="-64" width="52" height="40" rx="3" fill="#e8eef4" stroke="${NAVY}" stroke-width="2" ${W}/><path d="M-18 -30 L16 -58 L16 -38 Z" fill="${AMB}" opacity=".5"/><polyline points="-18,-30 -4,-40 10,-48" fill="none" stroke="${RED}" stroke-width="2"/><line x1="0" y1="-24" x2="0" y2="0" stroke="${NAVY}" stroke-width="3"/>`,
       8:`<rect x="-26" y="-64" width="52" height="40" rx="3" fill="#e8eef4" stroke="${NAVY}" stroke-width="2" ${W}/>${[-14,-6,2,10].map(y=>`<path d="M-18 -30 L18 ${-44+y*.8}" stroke="${NAVY}" opacity=".7"/>`).join('')}<line x1="0" y1="-24" x2="0" y2="0" stroke="${NAVY}" stroke-width="3"/>`,
       9:`<rect x="-22" y="-62" width="44" height="46" rx="3" fill="#fffaf0" stroke="${NAVY}" stroke-width="2" ${W}/>${[0,1,2].map(i=>`<path d="M-14 ${-52+i*12} l3 3 l5 -5" stroke="${i===2?RED:TEAL}" stroke-width="2" fill="none"/><line x1="0" y1="${-50+i*12}" x2="14" y2="${-50+i*12}" stroke="#7a6650"/>`).join('')}<line x1="0" y1="-16" x2="0" y2="0" stroke="${NAVY}" stroke-width="3"/>`,
       10:`<path d="M-18 -40 a22 22 0 0 1 36 -10z" fill="#cfe0ec" stroke="${NAVY}" stroke-width="2" ${W}/><line x1="0" y1="-44" x2="12" y2="-62" stroke="${NAVY}" stroke-width="2"/><circle cx="12" cy="-62" r="3" fill="${AMB}"/><line x1="0" y1="-30" x2="0" y2="0" stroke="${NAVY}" stroke-width="3"/>`};
      g.innerHTML=s[n]; return ({1:78,2:40,3:60,4:46,5:60,6:70,7:64,8:64,9:62,10:62})[n];
    },
    lm(g,k){ g.innerHTML={dc:`<rect x="-40" y="-60" width="80" height="52" rx="4" fill="#fffaf0" stroke="${NAVY}" stroke-width="3"/>${[0,1,2,3].map(i=>`<line x1="-30" y1="${-50+i*10}" x2="${26-(i%2)*14}" y2="${-50+i*10}" stroke="${NAVY}" stroke-width="2"/>`).join('')}`,
      kn:`<path d="M-40 -10 L40 -60 L40 -10 Z" fill="${AMB}" opacity=".45"/><polyline points="-40,-10 -10,-24 20,-40" fill="none" stroke="${RED}" stroke-width="3"/><circle cx="-40" cy="-10" r="5" fill="${NAVY}"/>`,
      cl:`<line x1="0" y1="0" x2="0" y2="-70" stroke="${NAVY}" stroke-width="3"/><path d="M-20 -60 a26 26 0 0 1 40 0" fill="none" stroke="${NAVY}" stroke-width="3"/><circle cx="0" cy="-72" r="4" fill="${RED}"><animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite"/></circle>`}[k]; },
    room(n,box){
      const R={
       1:[`${bgW}<line x1="80" y1="150" x2="80" y2="30" stroke="${NAVY}" stroke-width="3"/>${[['כרטיסים',50],['נתב',80],['פאנלים',110]].map(([l,y],i)=>`<rect x="66" y="${y-10}" width="28" height="18" rx="3" fill="#cfe0ec" stroke="${NAVY}"/><g opacity="0">${ap(.3+i*.4)}${T(200,y+4,l+' · אוקטובר · התקבל',{sz:11,c:TEAL})}<path d="M100 ${y} L130 ${y}" stroke="${TEAL}" stroke-dasharray="3 3"/></g>`).join('')}`,'עמוד המכשירים: כל מכשיר רואה משהו אחר, וכולם נקראים כל בוקר. כאן: שלושה קווים של מדדים, כל חודש, עם גרסת השיטה של כל ספק.'],
       2:[`${bgW}<polyline points="40,120 100,116 160,112 220,60 280,104 340,100" fill="none" stroke="${NAVY}" stroke-width="2"/><circle cx="220" cy="60" r="8" fill="none" stroke="${RED}" stroke-width="2"/>${T(220,40,'קפיצה לבד: לבדוק',{sz:12,c:RED})}${T(200,150,'המשקל של המדד יורד עד בדיקה',{sz:11,op:0,ap:ap(1.2)})}`,'הטכנאי בודק שהמדחום לא עומד בשמש. כאן: בריאות המדד, קפיצה שלא מופיעה במדדים האחרים, ומשקל נמוך עד שנבדק.'],
       3:[`${bgW}<rect x="180" y="40" width="40" height="100" rx="4" fill="#fff" stroke="${NAVY}" stroke-width="2"/><rect x="183" y="110" width="34" height="28" fill="#6f8fc4"><animate attributeName="height" values="4;28;28" dur="3s" fill="freeze"/><animate attributeName="y" values="134;110;110" dur="3s" fill="freeze"/></rect>
          ${T(310,60,'אוקטובר: הכרזה',{sz:11})}${T(310,80,'"קצב שנתי"',{sz:11,c:RED})}${T(90,60,'יולי: כלום',{sz:11,c:RED})}${T(90,80,'אף אחד לא פרסם',{sz:11})}${T(200,160,'מד גשם שמתמלא רק כשמישהו רוצה',{sz:12,c:RED,op:0,ap:ap(1.5)})}`,'מד הגשם בחצר אומר מה ירד בפועל. כאן: רשם האמת מתמלא רק כשחברה בוחרת לפרסם, ובהגדרה שהיא בוחרת. לכן הוא עומד מחוץ לגדר.'],
       4:[`${bgW}<rect x="60" y="100" width="280" height="12" fill="${WOOD}"/><rect x="100" y="50" width="30" height="50" fill="#cfe0ec" stroke="${NAVY}"/><rect x="260" y="50" width="30" height="50" fill="#fff" stroke="${NAVY}"/>${T(115,40,'המדד',{sz:11})}${T(275,40,'המכויל',{sz:11})}
          <path d="M135 75 L255 75" stroke="${TEAL}" stroke-dasharray="4 4"/>${T(195,68,'הטיה: -2.5% לחודש',{sz:11,c:TEAL})}${T(200,140,'כמה הוא טועה, וכמה זה זז',{sz:11,op:0,ap:ap(1)})}`,'משווים כל מדחום למדחום מכויל, ורושמים בכמה הוא טועה. כאן: הטיה, סחף ורעש לכל מדד, מול נקודות האמת.'],
       5:[`${bgW}<path d="M40 130 L200 70 L360 40 L360 100 L200 96 Z" fill="${AMB}" opacity=".25"/><polyline points="40,130 120,100 200,84 280,72 360,70" fill="none" stroke="${NAVY}" stroke-width="3"/>${[60,140,220,300].map((x,i)=>`<circle cx="${x}" cy="${124-i*14}" r="4" fill="${TEAL}" opacity="0">${ap(.3+i*.3)}</circle>`).join('')}${T(300,140,'⁦33.6 ± 1.2⁩',{sz:14,c:NAVY})}`,'מודל התחזית שוקל כל מכשיר לפי כמה אפשר לסמוך עליו. כאן: מסנן קלמן, רמה וקצב, עם טווח של 90%.'],
       6:[`${bgW}<polyline points="40,120 100,90 160,70 220,60 280,58 340,57" fill="none" stroke="${NAVY}" stroke-width="2"/><line x1="40" y1="80" x2="360" y2="80" stroke="${RED}" stroke-dasharray="5 5"/>${T(320,96,'סף: 15% לחודש',{sz:11,c:RED})}<circle cx="190" cy="64" r="10" fill="none" stroke="${AMB}" stroke-width="2"><animate attributeName="r" values="6;14;6" dur="1.6s" repeatCount="indefinite"/></circle>${T(190,40,'יוני: התראה',{sz:12,c:AMB})}`,'צופר הסערה מתריע כשהלחץ צונח, לא כשהגשם כבר יורד. כאן: גלאי האטה על הקצב, רק כשגם הגבול העליון מתחת לסף.'],
       7:[`${bgW}<rect x="40" y="20" width="320" height="130" rx="6" fill="#e8eef4" stroke="${NAVY}"/><path d="M60 120 L330 40 L330 110 Z" fill="${AMB}" opacity=".35"/><polyline points="60,120 200,90 330,76" fill="none" stroke="${RED}" stroke-width="3"/>${T(200,140,'הקו תמיד עם הקונוס',{sz:12})}`,'מפת התחזית בחדשות, עם קונוס אי הוודאות. כאן: הלוח מציג תמיד מספר עם טווח, ואף פעם לא קו לבד.'],
       8:[`${bgW}${Array.from({length:9},(_,i)=>`<path d="M40 130 Q200 ${100-i*6} 360 ${120-i*12}" fill="none" stroke="${NAVY}" opacity=".5"/>`).join('')}<line x1="40" y1="30" x2="360" y2="30" stroke="${RED}" stroke-dasharray="5 5"/>${T(300,22,'3 טריליון',{sz:11,c:RED})}${T(200,160,'"אם הקצב יימשך"',{sz:12})}`,'מניפת המסלולים של הוריקן: לא קו אחד, אלא אלומה. כאן: מהקצב של היום, מסלולים עד 2030, וכמה מהם עוברים את היעד.'],
       9:[`${bgW}<rect x="100" y="20" width="200" height="130" rx="6" fill="#fffaf0" stroke="${NAVY}"/>${[['אמת חודשית','כיסוי 100%',TEAL],['16 הכרזות','כיסוי 66%',RED],['6 הכרזות','כיסוי 62%',RED],['4 הכרזות','כיסוי 41%',RED]].map(([a,b,c],i)=>`${T(250,48+i*26,a,{sz:11})}${T(150,48+i*26,b,{sz:11,c})}`).join('')}`,'כרטיס הציונים של החזאים: אחוז הימים שבהם צדקו. כאן: בדיקה לאחור, ועל כמה נקודות אמת היא נשענת (מה-POC).'],
       10:[`${bgW}<path d="M150 110 a50 50 0 0 1 100 -30z" fill="#cfe0ec" stroke="${NAVY}" stroke-width="2"/><line x1="200" y1="100" x2="230" y2="50" stroke="${NAVY}" stroke-width="2"/>${T(320,60,'רישיון: עד 3.2027',{sz:11})}${T(320,82,'התראה 60 יום לפני',{sz:11,c:AMB})}${T(80,70,'בלעדיו:',{sz:11})}${T(80,92,'שני מדדים, טווח רחב',{sz:11})}`,'החוזה עם שירות הלוויינים: מותר להשתמש לתחזית, אסור למכור. כאן: רישיון ותוכנית חלופית לכל מדד.']};
      const [svg,cap]=R[n]; mini(box,svg,cap);
    }};

  const act2w=(world,what,hint,shock)=>`<p class="cy-k">מערכה 2 · ${world}</p>
   <p>אותו מקום, שתי משמעויות. הדרך היא ${what}, ובכל תחנה לאורכה עומד פיצ'ר אחד של המוצר. ארבעה אזורים, ארבע שכבות.</p>
   <div class="cy-ctl"><button type="button" class="cy-btn go" data-a="play">▶ סיור מודרך</button><button type="button" class="cy-btn hot" data-a="shock">${shock}</button><button type="button" class="cy-btn" data-a="home">למבט על</button></div>
   <ol class="cy-list"></ol><p class="cy-hint">${hint}</p>`;
  const PM=C['payback-meter'], RN=C['revenue-nowcaster'];
  PM.world=kitchen;
  PM.act2=act2w('המטבח של הפיצ\'רים','המסלול של הזמנה אחת, מהמסילה ועד תיבת הסקר של האיגוד','לחצו על תחנה כדי להיכנס לפינה שלה. גם לוח ההחלטות, המאזניים והדלת לחדר האוכל נפתחים.','לשלוח שאילתה אחת');
  RN.world=station;
  RN.act2=act2w('התחנה של הפיצ\'רים','הדרך של חודש אחד, מעמוד המכשירים ועד החוזה עם הלוויינים. ומד הגשם עומד לבד, מחוץ לגדר','לחצו על תחנה כדי להיכנס למכשיר שלה. גם לוח ההחלטות, הקונוס והאנטנה נפתחים.','לשלוח חודש אחד');
  [PM,RN].forEach(c=>{ const s0=c.act1.setup; c.act1.setup=ctx=>{ ctx.stage.classList.add('cy-w'); return s0(ctx); }; });
})();
