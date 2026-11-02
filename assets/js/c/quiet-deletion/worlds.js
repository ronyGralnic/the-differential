/* Case 03 · the spec analogies as whole worlds (city-engine.js, C.world). Instead of the island and the ring road:
   Roll Transparency Log → the village clinic and its sewn appointment book (act 1 tells the story; act 2 the features stand in its rooms).
   Removal Sample Audit → the kitchen and the tasting test (the pot, the tasting table, the scale, the pass window).
   Each feature room opens with a small scene from the same world. */
(function(){
  const C=window.CITY||{}; if(!C['roll-log']||!C['sample-audit']) return;
  const st=document.createElement('style'); st.textContent=`
  .cy-world .cy-wf{transition:fill .2s}
  .cy-b.zap .cy-wf{fill:#ffb3a3!important}
  .cy-wlab{font-family:'TD Hebrew',sans-serif;font-size:15px;font-weight:700;fill:#5a4630;letter-spacing:.02em}
  .cy-wsub{font-family:'TD Hebrew',sans-serif;font-size:12px;fill:#7a6650}
  .cy-wroom{background:#fbf6ea;border:1px solid #e6dcc3;border-radius:14px;padding:6px;margin-top:6px}
  .cy-room .cy-r0{grid-column:1/-1}
  .cy-wroom svg{display:block;width:100%;height:auto;max-height:230px}
  .cy-wroom p{margin:6px 8px 4px;font-size:14px;line-height:1.6;color:#4b4330}
  .cy-stage.cy-w{background:#f3ead6;grid-template-columns:1fr}
  .cy-stage.cy-w .cy-bl{font-size:16px}
  .cy-stage.cy-w .cy-svg{min-height:0}`;
  document.head.append(st);
  const mini=(box,svg,cap)=>{ box.innerHTML=`<svg viewBox="0 0 400 170" role="img" aria-label="${cap}">${svg}</svg><p>${cap}</p>`; };
  const ap=(b,d)=>`<animate attributeName="opacity" values="0;1" begin="${b}s" dur="${d||.5}s" fill="freeze"/>`;
  const T=(x,y,s,o)=>`<text x="${x}" y="${y}" text-anchor="middle" font-family="TD Hebrew, sans-serif" font-size="${(o&&o.sz)||12}" fill="${(o&&o.c)||'#3b2f22'}" ${(o&&o.op!=null)?`opacity="${o.op}"`:''}>${s}${(o&&o.ap)||''}</text>`;
  const bg='<rect x="0" y="0" width="400" height="170" rx="10" fill="#fbf6ea"/>';

  /* =================== the village clinic (Roll Transparency Log) =================== */
  const clinic={
    aria:'מרפאת הכפר בחתך: עשרה פיצ\'רים עומדים בחדרים שלה ובכפר שמסביב',
    words:{area:'',back:'→ חזרה למרפאה',cut:'מאחורי הקיר: הטכנולוגיות שהפיצ\'ר בנוי מהן',roomK:'במרפאה',lm:{dc:'לוח ההחלטות',kn:'מגדל המים',cl:'התוספת שבבנייה'}},
    home:{desk:[0,0,1000,620],mob:[30,110,940,500]},
    scene({g}){
      g.innerHTML=`<defs><linearGradient id="clSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7e9c9"/><stop offset="1" stop-color="#f3ead6"/></linearGradient></defs>
      <rect x="-60" y="-40" width="1120" height="720" fill="url(#clSky)"/>
      <path d="M-60 430 Q120 380 300 420 T700 400 T1060 410 L1060 680 L-60 680Z" fill="#e3d3ab"/>
      <path d="M-60 500 L1060 500 L1060 680 L-60 680Z" fill="#d6c294"/>
      <circle cx="930" cy="80" r="34" fill="#f2c46b" opacity=".7"/>
      <g><rect x="60" y="150" width="580" height="320" fill="#efe3c8" stroke="#8a6d4a" stroke-width="3"/>
        <path d="M44 156 L350 70 L656 156Z" fill="#b5653d" stroke="#7a4228" stroke-width="3"/>
        <rect x="300" y="96" width="100" height="34" rx="6" fill="#fffaf0" stroke="#7a4228"/><path d="M342 104 h16 v8 h8 v16 h-8 v8 h-16 v-8 h-8 v-16 h8z" fill="#c23b2e" transform="scale(.6) translate(225 72)"/>
        <text x="350" y="120" text-anchor="middle" class="cy-wsub" fill="#7a4228">מרפאת הכפר</text>
        <line x1="330" y1="150" x2="330" y2="470" stroke="#8a6d4a" stroke-width="3"/>
        <rect x="90" y="190" width="70" height="50" fill="#cfe4ea" stroke="#8a6d4a" stroke-width="2"/><rect x="520" y="190" width="70" height="50" fill="#cfe4ea" stroke="#8a6d4a" stroke-width="2"/>
        <rect x="60" y="460" width="580" height="12" fill="#c9b38a"/></g>
      <text x="195" y="178" text-anchor="middle" class="cy-wlab">בכניסה</text>
      <text x="485" y="178" text-anchor="middle" class="cy-wlab">חדר הספר · היומן</text>
      <g><rect x="640" y="400" width="130" height="10" fill="#b8a07a"/><path d="M640 400 L700 360 L770 400" fill="none" stroke="#8a6d4a" stroke-width="3"/></g>
      <text x="725" y="350" text-anchor="middle" class="cy-wlab">אצל המטופלת</text>
      <text x="900" y="250" text-anchor="middle" class="cy-wlab">הכפר · המשגיחים</text>
      <path d="M95 456 L610 456 Q660 456 700 486 L790 526 Q830 540 860 505 L945 565" fill="none" stroke="#a88a5c" stroke-width="5" stroke-dasharray="2 10" stroke-linecap="round"/>`;
      return {path:'M95 456 L610 456 Q660 456 700 486 L790 526 Q830 540 860 505 L945 565',
        spots:{1:[120,456,.03],2:[205,456,.12],3:[290,456,.21],4:[395,456,.33],5:[480,456,.42],6:[570,456,.51],7:[700,486,.62],8:[790,526,.72],9:[870,500,.83],10:[935,560,.95]},
        lms:{dc:[440,260],kn:[725,262],cl:[600,140]}};
    },
    station(g,n){
      const W='class="cy-wf"';
      const s={
       1:`<rect x="-26" y="-34" width="52" height="34" rx="3" fill="#b07a4a" ${W}/><rect x="-14" y="-44" width="28" height="10" fill="#fffaf0" stroke="#8a6d4a"/><path d="M6 -46 l10 -10" stroke="#1e2422" stroke-width="3"/>`,
       2:`<rect x="-24" y="-70" width="48" height="56" rx="3" fill="#2f4a3a" ${W}/>${[0,1,2,3,4].map(i=>`<line x1="-16" y1="${-60+i*9}" x2="14" y2="${-60+i*9}" stroke="#f3ead6" stroke-width="2"/>`).join('')}<line x1="-18" y1="-14" x2="-22" y2="0" stroke="#5a4630" stroke-width="3"/><line x1="18" y1="-14" x2="22" y2="0" stroke="#5a4630" stroke-width="3"/>`,
       3:`<rect x="-22" y="-62" width="44" height="62" rx="2" fill="#7f8c8d" ${W}/>${[0,1,2].map(i=>`<rect x="-16" y="${-56+i*19}" width="32" height="14" fill="#9aa6a7" stroke="#5c6666"/><rect x="-5" y="${-51+i*19}" width="10" height="4" fill="#3b2f22"/>`).join('')}`,
       4:`<path d="M-8 0 L-4 -30 L4 -30 L8 0Z" fill="#7a4228"/><path d="M-30 -30 L0 -40 L30 -30 L30 -36 L0 -46 L-30 -36Z" fill="#f6efe0" stroke="#7a4228" stroke-width="2" ${W}/><path d="M0 -46 L0 -40" stroke="#c23b2e" stroke-width="3"/>${[-20,-12,12,20].map(x=>`<circle cx="${x}" cy="${x<0?-36-(x+30)/3:-36-(30-x)/3}" r="1.6" fill="#c23b2e"/>`).join('')}`,
       5:`<path d="M-14 0 L0 -26 L14 0 M0 -26 V0" stroke="#5a4630" stroke-width="3" fill="none"/><rect x="-18" y="-46" width="36" height="22" rx="4" fill="#2b2733" ${W}/><circle cx="0" cy="-35" r="7" fill="#9fd3e6" stroke="#1e2422" stroke-width="2"/><rect x="8" y="-52" width="8" height="6" fill="#2b2733"/>`,
       6:`<rect x="-26" y="-60" width="52" height="40" rx="3" fill="#f6efe0" stroke="#8a6d4a" stroke-width="2" ${W}/>${[0,1,2,3].map(i=>`<rect x="${-20+i*11}" y="${-50+((i*7)%10)}" width="8" height="${22-((i*7)%10)}" fill="#2f6f68"/>`).join('')}<line x1="0" y1="-20" x2="0" y2="0" stroke="#5a4630" stroke-width="3"/>`,
       7:`<rect x="-26" y="-58" width="52" height="58" rx="3" fill="#cfe4ea" stroke="#8a6d4a" stroke-width="3" ${W}/><circle cx="0" cy="-34" r="9" fill="#c98f63"/><path d="M-9 -38 q9 -14 18 0" fill="#1d1410"/><path d="M-14 0 q14 -20 28 0" fill="#3e7fa8"/>`,
       8:`<rect x="-16" y="-66" width="32" height="66" rx="4" fill="#c23b2e" ${W}/><rect x="-10" y="-58" width="20" height="26" fill="#f3ead6"/><path d="M-6 -24 h12 v8 h-12z" fill="#1e2422"/>`,
       9:`${[-26,0,26].map((x,i)=>`<g transform="translate(${x} ${i===1?-10:0})"><rect x="-11" y="-24" width="22" height="24" fill="#e9d9b6" stroke="#8a6d4a" ${W}/><path d="M-14 -24 L0 -36 L14 -24Z" fill="#b5653d"/><rect x="-5" y="-16" width="10" height="8" fill="#fffaf0" stroke="#8a6d4a"/></g>`).join('')}`,
       10:`<rect x="-28" y="-54" width="56" height="36" rx="3" fill="#fffaf0" stroke="#8a6d4a" stroke-width="2" ${W}/><path d="M-20 -24 v-6 M-10 -24 v-14 M0 -24 v-10 M10 -24 v-20 M20 -24 v-8" stroke="#2f6f68" stroke-width="5"/><line x1="-20" y1="-18" x2="-20" y2="0" stroke="#5a4630" stroke-width="3"/><line x1="20" y1="-18" x2="20" y2="0" stroke="#5a4630" stroke-width="3"/>`};
      g.innerHTML=s[n]; return ({1:46,2:70,3:62,4:46,5:52,6:60,7:58,8:66,9:46,10:54})[n];
    },
    lm(g,k){ g.innerHTML={dc:`<rect x="-34" y="-52" width="68" height="44" rx="4" fill="#2f4a3a" stroke="#5a4630" stroke-width="3"/><path d="M-24 -40 h20 l6 4 l-6 4 h-20z" fill="#f2c46b"/><path d="M24 -26 h-20 l-6 4 l6 4 h20z" fill="#efe3c8"/>`,
      kn:`<path d="M-16 0 L-10 -70 M16 0 L10 -70 M-14 -24 L14 -48 M14 -24 L-14 -48" stroke="#7a6650" stroke-width="3" fill="none"/><rect x="-22" y="-96" width="44" height="28" rx="6" fill="#9aa6a7" stroke="#5c6666" stroke-width="2"/>`,
      cl:`<path d="M-30 0 V-50 M10 0 V-50 M-30 -25 H10 M-30 -50 H10 M-30 0 L10 -25 M-30 -25 L10 -50" stroke="#a87b3a" stroke-width="3" fill="none"/><rect x="-36" y="-56" width="52" height="8" fill="#c9a347"/>`}[k]; },
    room(n,box){
      const R={
       1:[`${bg}<rect x="40" y="70" width="150" height="70" rx="6" fill="#b07a4a"/><rect x="70" y="52" width="90" height="26" fill="#fffaf0" stroke="#8a6d4a"/><path d="M80 66 h50" stroke="#2b2620" stroke-width="2" stroke-dasharray="50" stroke-dashoffset="50"><animate attributeName="stroke-dashoffset" to="0" dur="1.2s" fill="freeze"/></path>
          <g opacity="0">${ap(1.4)}<rect x="240" y="50" width="120" height="70" rx="6" fill="#fffaf0" stroke="#2f6f68" stroke-width="2"/>${T(300,78,'קבלה',{c:'#2f6f68',sz:14})}${T(300,100,'שורה 4,812,330',{sz:12})}</g>
          <path d="M195 85 L235 85" stroke="#2f6f68" stroke-width="2" opacity="0">${ap(1.2)}</path>`,'בעט, בספר, לא על פתק: השינוי נכנס לתוקף רק אחרי שהספר החזיר קבלה עם מספר שורה.'],
       2:[`${bg}<rect x="40" y="25" width="170" height="125" rx="6" fill="#2f4a3a"/>${['R-DEAD','R-DUP','R-SHIFT','R-ABSENT','…'].map((c,i)=>T(125,52+i*22,c,{c:i===2?'#f2c46b':'#f3ead6',sz:13})).join('')}
          <rect x="250" y="55" width="110" height="60" rx="6" fill="#fffaf0" stroke="#8a6d4a"/>${T(305,80,'פריה',{sz:13})}${T(305,100,'R-SHIFT · 14.11',{c:'#b1502e',sz:12,op:0,ap:ap(.8)})}`,'ליד כל שורה: למה, מתוך רשימה סגורה של 11 קודים. אין קוד "אחר".'],
       3:[`${bg}<rect x="40" y="30" width="110" height="120" rx="4" fill="#7f8c8d"/>${[0,1,2].map(i=>`<rect x="52" y="${40+i*36}" width="86" height="28" fill="#9aa6a7" stroke="#5c6666"/>`).join('')}
          ${T(270,60,'פריה ורמה',{sz:15})}<path d="M200 80 L340 80" stroke="#8a6d4a" stroke-dasharray="4 4"/>${T(270,110,'7c1e…',{sz:18,c:'#2f6f68',op:0,ap:ap(.9)})}`,'כשהספר פתוח לכולם, כתוב בו מספר תיק ולא שם. רק מי שמחזיק את המפתח יודע מי זה.'],
       4:[`${bg}<path d="M60 130 L200 100 L340 130 L340 120 L200 90 L60 120Z" fill="#f6efe0" stroke="#7a4228" stroke-width="2"/>${Array.from({length:9},(_,i)=>`<circle cx="${80+i*30}" cy="${i<5?118-(i*5):98+((i-4)*5)}" r="2.5" fill="#c23b2e"/>`).join('')}
          ${Array.from({length:6},(_,i)=>`<rect x="${70+i*44}" y="40" width="36" height="22" rx="3" fill="#fffaf0" stroke="#8a6d4a" opacity="0">${ap(.2+i*.25)}</rect>${T(88+i*44,56,String(330+i),{sz:11,op:0,ap:ap(.2+i*.25)})}`).join('')}`,'דפים ממוספרים ותפורים: שורה חדשה תמיד בסוף, ודף שנקרע משאיר חור במספור.'],
       5:[`${bg}<rect x="50" y="40" width="120" height="90" rx="6" fill="#fffaf0" stroke="#8a6d4a"/>${T(110,90,'הדף האחרון',{sz:13})}<rect x="50" y="40" width="120" height="90" rx="6" fill="#fff" opacity="0"><animate attributeName="opacity" values="0;.9;0" begin=".6s" dur=".5s"/></rect>
          ${[0,1,2,3,4].map(i=>`<g opacity="0">${ap(1.2+i*.2)}<rect x="${215+i*34}" y="${55+(i%2)*14}" width="28" height="36" rx="3" fill="#fffaf0" stroke="${i<3?'#2f6f68':'#b9ab84'}" stroke-width="2"/></g>`).join('')}${T(300,140,'3 מתוך 5 עדים חתמו',{c:'#2f6f68',sz:12,op:0,ap:ap(2.4)})}`,'כל ערב מצלמים את הדף האחרון ושולחים לחמישה אנשים בכפר. כאן: כל דקה, וחתימה של שלושה לפחות.'],
       6:[`${bg}<rect x="40" y="30" width="140" height="110" rx="6" fill="#f6efe0" stroke="#8a6d4a"/>${T(110,52,'הלוח במסדרון',{sz:12})}<rect x="220" y="30" width="140" height="110" rx="6" fill="#f6efe0" stroke="#8a6d4a"/>${T(290,52,'הספר',{sz:12})}
          ${[0,1,2].map(i=>T(110,80+i*20,['212: 41','213: 38','214: 52'][i],{sz:12})+T(290,80+i*20,['212: 41','213: 38','214: 51'][i],{sz:12,c:i===2?'#b1502e':'#3b2f22'})).join('')}<g opacity="0">${ap(1)}<circle cx="200" cy="120" r="12" fill="#b1502e"/>${T(200,124,'!',{c:'#fff',sz:14})}</g>`,'כל לילה בונים את הלוח מהספר ומשווים. קלפי שלא תואמת מדליקה התראה.'],
       7:[`${bg}<rect x="40" y="25" width="150" height="125" rx="6" fill="#cfe4ea" stroke="#8a6d4a" stroke-width="3"/><circle cx="115" cy="80" r="18" fill="#c98f63"/><path d="M97 74 q18 -26 36 0" fill="#1d1410"/>
          <rect x="230" y="30" width="130" height="110" rx="6" fill="#fffaf0" stroke="#2f6f68" stroke-width="2" opacity="0">${ap(.6)}</rect>${T(295,58,'נמחקת',{c:'#b1502e',sz:14,op:0,ap:ap(.8)})}${T(295,80,'R-SHIFT · 14.11',{sz:12,op:0,ap:ap(1)})}${T(295,100,'9 ימים לערעור',{sz:12,op:0,ap:ap(1.2)})}${T(295,124,'✓ מאומת',{c:'#2f6f68',sz:13,op:0,ap:ap(1.5)})}`,'מטופלת ששואלת בחלון "אני רשומה?" ומקבלת דף עם חותמת. פריה עושה את זה מהטלפון.'],
       8:[`${bg}<rect x="60" y="30" width="60" height="120" rx="6" fill="#c23b2e"/><rect x="72" y="44" width="36" height="44" fill="#f3ead6"/>
          <path d="M140 80 q60 -50 120 0" fill="none" stroke="#2f6f68" stroke-width="2" stroke-dasharray="4 6"><animate attributeName="stroke-dashoffset" from="40" to="0" dur="1.5s" repeatCount="indefinite"/></path>
          <rect x="270" y="40" width="70" height="110" rx="10" fill="#2b2733"/><rect x="278" y="56" width="54" height="70" rx="3" fill="#fffaf0" opacity="0">${ap(1)}</rect>${T(305,80,'SMS',{sz:12,op:0,ap:ap(1.2)})}${T(305,100,'לערער ←',{c:'#2f6f68',sz:11,op:0,ap:ap(1.4)})}`,'טלפון מהמרפאה ביום שהתור בוטל, עם טופס ערעור שכבר מולא. כאן: SMS ביום המחיקה.'],
       9:[`${bg}${[80,200,320].map((x,i)=>`<g transform="translate(${x} 110)"><rect x="-30" y="-50" width="60" height="50" fill="#e9d9b6" stroke="#8a6d4a"/><path d="M-36 -50 L0 -76 L36 -50Z" fill="#b5653d"/><rect x="-14" y="-40" width="28" height="22" fill="#fffaf0" stroke="#8a6d4a"/>${T(0,-24,'#'+(4812330+i*0),{sz:9})}</g>`).join('')}
          <g opacity="0">${ap(1.2)}${T(200,150,'שלושה צילומים, אותו דף. אם מישהו מראה דף אחר, רואים.',{sz:12,c:'#2f6f68'})}</g>`,'שלושה אנשים בכפר שומרים את הצילומים ומשווים ביניהם. כאן: עיתונים, ארגונים ומפלגות.'],
       10:[`${bg}<rect x="60" y="20" width="280" height="120" rx="6" fill="#fffaf0" stroke="#8a6d4a" stroke-width="2"/>${T(200,42,'השבוע במחוז',{sz:13})}
          ${[['R-SHIFT',70],['R-DEAD',40],['R-DUP',25],['M-FIX',15]].map(([k,v],i)=>`<rect x="${90+i*62}" y="${125-v}" width="34" height="${v}" fill="#2f6f68"><animate attributeName="height" from="0" to="${v}" dur=".8s"/><animate attributeName="y" from="125" to="${125-v}" dur=".8s"/></rect>${T(107+i*62,158,k,{sz:10})}`).join('')}`,'בלוח בכיכר: כמה, ולא מי. מחוז ושבוע, בלי שמות ובלי מספרים קטנים מ-10.']};
      const [svg,cap]=R[n]; mini(box,svg,cap);
    }};

  /* =================== the kitchen (Removal Sample Audit) =================== */
  const kitchen={
    aria:'מטבח בחתך: עשרה פיצ\'רים עומדים לאורך הדרך מהסיר ועד חלון ההגשה',
    words:{area:'',back:'→ חזרה למטבח',cut:'מאחורי הדלפק: הטכנולוגיות שהפיצ\'ר בנוי מהן',roomK:'במטבח',lm:{dc:'מדף התבלינים',kn:'מד החום',cl:'הכיסא הריק'}},
    home:{desk:[0,0,1000,620],mob:[30,110,940,500]},
    scene({g}){
      g.innerHTML=`<rect x="-60" y="-40" width="1120" height="720" fill="#f4ead2"/>
      ${Array.from({length:14},(_,i)=>`<rect x="${-40+i*80}" y="80" width="78" height="38" fill="${i%2?'#e9dcbd':'#efe4c8'}" stroke="#d9c79e"/>`).join('')}
      <rect x="-60" y="470" width="1120" height="210" fill="#b98a5a"/>${Array.from({length:16},(_,i)=>`<line x1="${-60+i*75}" y1="470" x2="${-60+i*75}" y2="680" stroke="#a8784a"/>`).join('')}
      <rect x="40" y="380" width="300" height="90" fill="#6b4a32"/><rect x="30" y="370" width="320" height="14" fill="#8a6d4a"/>
      <rect x="380" y="400" width="250" height="70" fill="#8a6d4a"/><rect x="370" y="390" width="270" height="14" fill="#a7835a"/>
      <rect x="680" y="200" width="300" height="270" fill="#efe3c8" stroke="#8a6d4a" stroke-width="3"/><rect x="720" y="230" width="220" height="110" fill="#f8d9a0" stroke="#8a6d4a" stroke-width="3"/><rect x="710" y="340" width="240" height="14" fill="#a7835a"/>
      <text x="190" y="360" text-anchor="middle" class="cy-wlab">ליד הסיר · ההגרלה</text>
      <text x="505" y="380" text-anchor="middle" class="cy-wlab">שולחן הטעימה · בשטח</text>
      <text x="830" y="190" text-anchor="middle" class="cy-wlab">הדלפק · החישוב והדוח</text>
      <path d="M90 376 L330 376 Q360 376 400 396 L620 396 Q660 396 700 350 L960 350" fill="none" stroke="#7a5a3a" stroke-width="4" stroke-dasharray="2 10" stroke-linecap="round"/>`;
      return {path:'M90 376 L330 376 Q360 376 400 396 L620 396 Q660 396 700 350 L960 350',
        spots:{1:[100,372,.04],2:[190,372,.13],3:[285,372,.22],4:[425,392,.34],5:[505,392,.42],6:[590,392,.5],7:[735,336,.64],8:[815,336,.74],9:[895,336,.84],10:[950,470,.97]},
        lms:{dc:[160,200],kn:[600,250],cl:[560,520]}};
    },
    station(g,n){
      const W='class="cy-wf"';
      const s={
       1:`<path d="M-28 -6 L-24 -40 L24 -40 L28 -6Z" fill="#5c6666" ${W}/><ellipse cx="0" cy="-42" rx="28" ry="7" fill="#7f8c8d"/><rect x="-6" y="-54" width="12" height="8" rx="2" fill="#3b2f22"/><rect x="-8" y="-38" width="16" height="12" fill="#c9a347"/>`,
       2:`<rect x="-22" y="-30" width="44" height="30" rx="4" fill="#efe3c8" stroke="#8a6d4a" ${W}/><rect x="-14" y="-52" width="20" height="20" rx="3" fill="#fffaf0" stroke="#3b2f22" transform="rotate(12 -4 -42)"/><circle cx="-8" cy="-46" r="2" fill="#3b2f22"/><circle cx="0" cy="-40" r="2" fill="#3b2f22"/>`,
       3:`<path d="M-26 0 L-22 -40 L22 -40 L26 0Z" fill="#7f8c8d" ${W}/><path d="M-22 -28 H22 M-23 -14 H23" stroke="#c9a347" stroke-width="3"/><path d="M14 -60 L4 -26" stroke="#5a4630" stroke-width="3"/><ellipse cx="3" cy="-24" rx="6" ry="3" fill="#5a4630"/>`,
       4:`<rect x="-20" y="-40" width="40" height="40" rx="3" fill="#fffaf0" stroke="#8a6d4a" ${W}/>${[0,1,2].map(i=>`<line x1="-12" y1="${-30+i*10}" x2="12" y2="${-30+i*10}" stroke="#b9ab84" stroke-width="2"/>`).join('')}<path d="M24 -36 L30 -4" stroke="#9aa6a7" stroke-width="3"/><ellipse cx="24" cy="-38" rx="4" ry="6" fill="#9aa6a7"/>`,
       5:`<circle cx="0" cy="-26" r="22" fill="#efe3c8" stroke="#8a6d4a" stroke-width="2" ${W}/><path d="M-10 -30 a10 10 0 1 1 3 8 M-12 -24 l2 -6 l6 2" stroke="#2f6f68" stroke-width="3" fill="none"/>`,
       6:`<rect x="-16" y="-50" width="32" height="8" fill="#a7835a" ${W}/><path d="M-14 -42 V0 M14 -42 V0 M-14 -20 H14" stroke="#7a5a3a" stroke-width="4"/><text x="0" y="-60" text-anchor="middle" font-size="22" fill="#b1502e" font-weight="700">?</text>`,
       7:`<path d="M0 -50 V-6 M-26 -40 H26" stroke="#5a4630" stroke-width="3"/><path d="M-26 -40 l-8 18 h16z M26 -40 l-8 18 h16z" fill="#c9a347" ${W}/><rect x="-14" y="-6" width="28" height="6" fill="#5a4630"/>`,
       8:`${[-22,0,22].map((x,i)=>`<g transform="translate(${x} 0)"><path d="M-10 -4 q10 10 20 0 L8 -14 H-8Z" fill="${i===1?'#b1502e':'#efe3c8'}" stroke="#8a6d4a" ${W}/>${i===1?'<path d="M0 -26 v-8" stroke="#b1502e" stroke-width="3"/><path d="M0 -34 l8 3 l-8 3z" fill="#b1502e"/>':''}</g>`).join('')}`,
       9:`<rect x="-24" y="-56" width="48" height="40" rx="3" fill="#fffaf0" stroke="#8a6d4a" stroke-width="2" ${W}/><text x="0" y="-38" text-anchor="middle" font-size="9" fill="#3b2f22">מלוח מדי</text><text x="0" y="-24" text-anchor="middle" font-size="9" fill="#2f6f68">בסדר</text><line x1="0" y1="-16" x2="0" y2="0" stroke="#5a4630" stroke-width="3"/>`,
       10:`<rect x="-22" y="-44" width="44" height="44" rx="3" fill="#fffaf0" stroke="#8a6d4a" stroke-width="2" ${W} transform="rotate(-4)"/>${[0,1,2,3].map(i=>`<line x1="-14" y1="${-34+i*9}" x2="14" y2="${-34+i*9}" stroke="#b9ab84" stroke-width="2"/>`).join('')}<text x="0" y="-50" text-anchor="middle" font-size="9" fill="#3b2f22">seed: 4471</text>`};
      g.innerHTML=s[n]; return ({1:54,2:52,3:60,4:40,5:48,6:66,7:50,8:34,9:56,10:50})[n];
    },
    lm(g,k){ g.innerHTML={dc:`<rect x="-46" y="-30" width="92" height="10" fill="#8a6d4a"/>${[-34,-17,0,17,34].map((x,i)=>`<rect x="${x-6}" y="-50" width="12" height="20" rx="2" fill="${['#c9a347','#b1502e','#2f6f68','#7a3b8f','#d9772f'][i]}"/>`).join('')}`,
      kn:`<rect x="-6" y="-80" width="12" height="70" rx="6" fill="#fffaf0" stroke="#5a4630" stroke-width="2"/><rect x="-3" y="-50" width="6" height="40" fill="#b1502e"/><circle cx="0" cy="-8" r="9" fill="#b1502e"/>`,
      cl:`<path d="M-16 -50 V0 M16 -50 V0 M-16 -24 H16" stroke="#7a5a3a" stroke-width="5"/><rect x="-18" y="-56" width="36" height="8" fill="#a7835a"/><text x="0" y="-62" text-anchor="middle" font-size="18" fill="#b1502e" font-weight="700">?</text>`}[k]; },
    room(n,box){
      const pot=(x,y,w)=>`<path d="M${x-w/2} ${y} L${x-w/2+6} ${y+70} L${x+w/2-6} ${y+70} L${x+w/2} ${y}Z" fill="#7f8c8d"/><ellipse cx="${x}" cy="${y}" rx="${w/2}" ry="10" fill="#9aa6a7"/>`;
      const R={
       1:[`${bg}${pot(110,60,120)}<g><ellipse cx="110" cy="60" rx="62" ry="12" fill="#5c6666"><animate attributeName="cy" from="20" to="60" dur=".8s" fill="freeze"/></ellipse></g><rect x="96" y="70" width="28" height="20" fill="#c9a347" opacity="0">${ap(.9)}</rect>
          ${T(290,70,'גיבוב: 9f2c…',{sz:14,c:'#2f6f68',op:0,ap:ap(1.2)})}${T(290,96,'פורסם לפני ההגרלה',{sz:12,op:0,ap:ap(1.4)})}`,'מכסים את הסיר לפני שטועמים: הרשימה ננעלת, והגיבוב שלה מתפרסם, כך שאי אפשר להוסיף או להוריד אחר כך.'],
       2:[`${bg}${pot(110,60,120)}<path d="M150 20 L105 90" stroke="#5a4630" stroke-width="5"><animateTransform attributeName="transform" type="rotate" values="0 110 80;14 110 80;-14 110 80;0 110 80" dur="1.6s" repeatCount="indefinite"/></path>
          <rect x="250" y="40" width="44" height="44" rx="6" fill="#fffaf0" stroke="#3b2f22" stroke-width="2"><animateTransform attributeName="transform" type="rotate" from="0 272 62" to="360 272 62" dur="1s" repeatCount="2"/></rect>${T(272,112,'seed: 4471',{sz:13})}${T(272,132,'מוכרז מראש, כולם רואים',{sz:11})}`,'מערבבים מול כולם: ה-seed הוכרז מראש, וכל אחד יכול להריץ את ההגרלה שוב ולקבל אותן 1,500 מחיקות.'],
       3:[`${bg}${pot(130,40,150)}<path d="M57 70 H203 M60 95 H200" stroke="#c9a347" stroke-width="3"/>${T(260,62,'למעלה: מתים',{sz:12})}${T(260,86,'באמצע: כפולים',{sz:12})}${T(260,110,'בתחתית: הסל המעורבב',{sz:12,c:'#b1502e'})}
          ${[60,84,108].map((y,i)=>`<circle cx="${130+(i-1)*30}" cy="${y-4}" r="6" fill="#5a4630" opacity="0">${ap(.4+i*.4)}</circle>`).join('')}`,'טועמים מכל שכבה בנפרד, ויותר מהתחתית: שם, בסל המעורבב, יושבות רוב הטעויות.'],
       4:[`${bg}<rect x="40" y="30" width="110" height="120" rx="4" fill="#fffaf0" stroke="#8a6d4a"/>${[0,1,2,3].map(i=>`<line x1="54" y1="${54+i*22}" x2="136" y2="${54+i*22}" stroke="#b9ab84" stroke-width="2"/><text x="70" y="${50+i*22}" font-size="11" fill="#2f6f68" opacity="0">✓ חתום${ap(.3+i*.3)}</text>`).join('')}
          <g transform="translate(270 80)"><rect x="-30" y="-50" width="60" height="100" rx="8" fill="#2b2733"/><rect x="-24" y="-38" width="48" height="66" fill="#fffaf0"/>${T(0,-10,'אין קליטה',{sz:10,c:'#b1502e'})}${T(0,12,'נשמר במכשיר',{sz:10,c:'#2f6f68'})}</g>`,'כף נקייה לכל טעימה, ורושמים מיד: כל ממצא נחתם במכשיר, גם בלי קליטה.'],
       5:[`${bg}${[0,1,2].map(i=>`<g transform="translate(${90+i*110} 85)" opacity="0">${ap(.2+i*.7)}<rect x="-26" y="-50" width="52" height="80" rx="4" fill="#b5653d"/><circle cx="16" cy="-8" r="3" fill="#f2c46b"/>${T(0,48,'ביקור '+(i+1),{sz:11})}</g>`).join('')}
          ${T(200,160,'רק אחרי שלושה: "לא ידוע". אף פעם לא "עבר".',{sz:12,c:'#2f6f68',op:0,ap:ap(2.4)})}`,'אם לא בטוחים, טועמים שוב: דלת שלא נפתחת מקבלת עוד שני ביקורים.'],
       6:[`${bg}<g transform="translate(110 120)"><path d="M-24 -60 V0 M24 -60 V0 M-24 -28 H24" stroke="#7a5a3a" stroke-width="6"/><rect x="-28" y="-66" width="56" height="10" fill="#a7835a"/>${T(0,-80,'?',{sz:28,c:'#b1502e'})}</g>
          <g opacity="0">${ap(.8)}${T(280,60,'מי טועם?',{sz:15})}${T(280,86,'הטבח עצמו: הוא כבר החליט שזה טעים',{sz:11,c:'#b1502e'})}${T(280,108,'טועם עצמאי: מאיפה יבוא?',{sz:11,c:'#2f6f68'})}</g>`,'מי טועם, ומה הקשר שלו לטבח. האפיון משבץ בודקים, אבל לא יודע מאיפה יבואו בודקים עצמאיים.'],
       7:[`${bg}<g transform="translate(200 120)"><path d="M0 -90 V0 M-110 -70 H110" stroke="#5a4630" stroke-width="4"><animateTransform attributeName="transform" type="rotate" values="0 0 -80;-6 0 -80;0 0 -80" dur="2s" repeatCount="indefinite"/></path><rect x="-30" y="0" width="60" height="10" fill="#5a4630"/></g>
          ${T(90,80,'1,500 כפות',{sz:13})}${T(310,80,'14% ±1.7',{sz:16,c:'#2f6f68'})}${T(310,104,'מתוקן לטעויות הטועמים',{sz:11})}`,'מכמה כפות מבינים את כל הסיר: אומדן עם טווח, ותיקון לטעויות של מי שטעם.'],
       8:[`${bg}${[0,1,2,3,4].map(i=>`<g transform="translate(${60+i*70} 100)"><path d="M-24 -6 q24 26 48 0 L20 -26 H-20Z" fill="${i===3?'#b1502e':'#efe3c8'}" stroke="#8a6d4a" stroke-width="2" opacity="${i===3?0:1}">${i===3?ap(1):''}</path>${T(0,40,'קלפי '+(210+i),{sz:10})}</g>`).join('')}`,'איזה חלק מהסיר מלוח במיוחד: 10 ביקורים לכל קלפי, ועד 30 כשלא ברור. קלפי חריגה מסומנת.'],
       9:[`${bg}<rect x="110" y="30" width="180" height="110" rx="6" fill="#fffaf0" stroke="#8a6d4a" stroke-width="2"/>${T(200,58,'מחוז 14',{sz:14})}${T(200,86,'גבול תחתון: 9.2%',{sz:13})}${T(200,108,'הסף: 5%',{sz:12})}
          <g opacity="0">${ap(1)}<rect x="140" y="116" width="120" height="20" rx="4" fill="#b1502e"/>${T(200,131,'לבדיקה מלאה',{sz:12,c:'#fff'})}</g>`,'"מלוח מדי, תוסיפו מים": מחוז שהגבול התחתון שלו מעל 5% נשלח לבדיקה מלאה.'],
       10:[`${bg}<rect x="60" y="25" width="140" height="125" rx="4" fill="#fffaf0" stroke="#8a6d4a" stroke-width="2" transform="rotate(-3 130 90)"/>${['seed: 4471','רשימה: 9f2c…','שיטה: v1.2','תוצאה: 11.2%'].map((t,i)=>T(130,55+i*24,t,{sz:11})).join('')}
          <path d="M215 85 H255" stroke="#2f6f68" stroke-width="2"/><g opacity="0">${ap(1)}<rect x="265" y="55" width="100" height="60" rx="6" fill="#e5f1ee" stroke="#2f6f68"/>${T(315,82,'הרצה חוזרת',{sz:11})}${T(315,102,'11.2% ✓',{sz:13,c:'#2f6f68'})}</g>`,'כתבו מה טעמתם, כדי שמישהו אחר יוכל לטעום שוב: קובץ אחד, ואותו מספר בדיוק אצל כל מי שמריץ.']};
      const [svg,cap]=R[n]; mini(box,svg,cap);
    }};

  const act2w=(world,what,hint)=>`<p class="cy-k">מערכה 2 · ${world}</p>
   <p>אותו מקום, שתי משמעויות. הדרך היא ${what}, ובכל תחנה לאורכה עומד פיצ'ר אחד של המוצר. ארבעה אזורים, ארבע שכבות.</p>
   <div class="cy-ctl"><button type="button" class="cy-btn go" data-a="play">▶ סיור מודרך</button><button type="button" class="cy-btn hot" data-a="shock">לשלוח שינוי אחד</button><button type="button" class="cy-btn" data-a="home">למבט על</button></div>
   <ol class="cy-list"></ol><p class="cy-hint">${hint}</p>`;
  const RL=C['roll-log'], SA=C['sample-audit'];
  RL.world=clinic;
  RL.act2=act2w('המרפאה של הפיצ\'רים','המסלול של שינוי אחד ברשימה, מהדלפק של הקבלה ועד הלוח בכיכר','לחצו על תחנה כדי להיכנס לחדר שלה. גם לוח ההחלטות, מגדל המים והתוספת שבבנייה נפתחים.');
  const ri=RL.intro; RL.intro=tm=>ri(tm).replace("<b>2</b> עיר הפיצ'רים","<b>2</b> המרפאה של הפיצ'רים");
  SA.world=kitchen;
  SA.act2=act2w('המטבח של הפיצ\'רים','הדרך של מחיקה אחת שנבחרה, מהסיר ועד חלון ההגשה','לחצו על תחנה כדי להיכנס לחדר שלה. גם מדף התבלינים, מד החום והכיסא הריק נפתחים.');
  const si=SA.intro; SA.intro=tm=>si(tm).replace("<b>2</b> עיר הפיצ'רים","<b>2</b> המטבח של הפיצ'רים");
  // act 1 draws its dots on the path: stamp them in the world colours
  [RL,SA].forEach(c=>{ const s0=c.act1.setup; c.act1.setup=ctx=>{ ctx.stage.classList.add('cy-w'); return s0(ctx); }; });
})();
