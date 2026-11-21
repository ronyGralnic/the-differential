/* Case 05 · the-funnel · themed backdrops (engine: case-theme.js) and animated fall figures (engine: reel-fx.js, cut.anim).
   Theme: the funnel at night. An amber ticker tape over Wall Street, server-rack lights on the West Texas plain,
   steam plumes from gas turbines, power lines, and a funnel of light with coins sliding down it. Dark and quiet behind the text. */
(function(){
  const GOLD='#e0b45a', SKY='#6f8fc4', IVO='#e8e2d0', RED='#d8553a', TEAL='#4fb3a2', DIM='#8a93a8', GRN='#59b37a';
  const stars=()=>`<svg viewBox="0 0 600 200">${Array.from({length:40},(_,i)=>`<circle cx="${(i*137)%600}" cy="${(i*71)%200}" r="${i%5===0?1.6:1}" fill="${IVO}" opacity="${.3+(i%4)*.15}"/>`).join('')}</svg>`;
  const ticker=()=>`<svg viewBox="0 0 900 40"><rect width="900" height="40" fill="#120f08" opacity=".7"/><g fill="${GOLD}" font-family="monospace" font-size="16"><text x="0" y="26">NVDA ▼30%   CRWV ▲25%   AI-REV $200B → $3T?   RUN-RATE $81B   Q/Q 12%   IPO $1.5T   OOM?   NVDA ▼30%   CRWV ▲25%<animateTransform attributeName="transform" type="translate" values="0,0;-450,0" dur="22s" repeatCount="indefinite"/></text></g></svg>`;
  const funnel=()=>`<svg viewBox="0 0 300 260"><path d="M20 10 H280 L180 120 V250 H120 V120 Z" fill="none" stroke="${GOLD}" stroke-width="2" opacity=".8"/>${[0,1,2,3,4].map(i=>`<circle cx="${110+i*20}" cy="20" r="6" fill="${GOLD}"><animate attributeName="cy" values="16;240" dur="${3+i*.4}s" begin="${i*.7}s" repeatCount="indefinite"/><animate attributeName="cx" values="${110+i*20};150" dur="${3+i*.4}s" begin="${i*.7}s" repeatCount="indefinite"/></circle>`).join('')}</svg>`;
  const racks=()=>`<svg viewBox="0 0 520 140"><rect x="0" y="40" width="520" height="100" fill="#0e1220"/>${Array.from({length:12},(_,j)=>`<rect x="${12+j*42}" y="54" width="30" height="80" fill="#151b2e" stroke="#2a3350"/>`+Array.from({length:6},(_,i)=>`<rect x="${17+j*42}" y="${62+i*12}" width="20" height="3" fill="${(i+j)%4?TEAL:GOLD}" opacity=".8"><animate attributeName="opacity" values=".8;.15;.8" dur="${(1.4+((i*j)%5)*.4).toFixed(1)}s" repeatCount="indefinite"/></rect>`).join('')).join('')}</svg>`;
  const turbine=()=>`<svg viewBox="0 0 200 200"><rect x="40" y="120" width="120" height="50" rx="20" fill="#1c2233" stroke="${DIM}"/><rect x="120" y="60" width="18" height="62" fill="#1c2233" stroke="${DIM}"/>${[0,1,2].map(i=>`<circle cx="129" cy="56" r="${10+i*6}" fill="${IVO}" opacity="0"><animate attributeName="cy" values="56;0" dur="5s" begin="${i*1.6}s" repeatCount="indefinite"/><animate attributeName="opacity" values=".25;0" dur="5s" begin="${i*1.6}s" repeatCount="indefinite"/></circle>`).join('')}</svg>`;
  const lines=()=>`<svg viewBox="0 0 700 160">${[0,1,2,3].map(i=>`<g transform="translate(${30+i*180} 20)"><path d="M0 130 L20 0 L40 130 M6 40 H34 M10 70 H30" stroke="${DIM}" fill="none"/></g>`).join('')}<path d="M50 40 Q140 80 230 40 Q320 80 410 40 Q500 80 590 40" stroke="${GOLD}" fill="none" opacity=".6"/><path d="M50 60 Q140 100 230 60 Q320 100 410 60 Q500 100 590 60" stroke="${DIM}" fill="none"/></svg>`;
  const skyline=()=>`<svg viewBox="0 0 1060 120"><path d="M0 120 V80 h40 v-30 h30 v-20 h20 v20 h30 v50 h60 v-40 h24 v-36 h10 v36 h24 v40 h80 v-20 h60 v20 h120 V86 h80 v-26 h40 v26 h120 v-10 h90 v44 Z" fill="#0b0e18"/>${Array.from({length:30},(_,i)=>`<rect x="${20+i*34}" y="${92+(i%3)*8}" width="4" height="4" fill="${GOLD}" opacity="${.3+(i%4)*.15}"/>`).join('')}</svg>`;
  const chart=()=>`<svg viewBox="0 0 260 120"><polyline points="10,100 50,80 90,70 120,40 150,46 190,60 230,74 250,90" fill="none" stroke="${RED}" stroke-width="2" opacity=".9"/><polyline points="10,110 250,110" stroke="${DIM}"/></svg>`;
  const coin=(l)=>`<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="26" fill="#2a2210" stroke="${GOLD}" stroke-width="2"/><text x="30" y="38" text-anchor="middle" fill="${GOLD}" font-size="22" font-family="serif">${l||'$'}</text></svg>`;
  window.CASE_THEME=window.CASE_THEME||{};
  window.CASE_THEME['the-funnel']={
    reel:{bg:'radial-gradient(120% 70% at 85% 0%, rgba(224,180,90,.14), transparent 55%), radial-gradient(110% 60% at 10% 100%, rgba(79,179,162,.10), transparent 60%), linear-gradient(#0d0f1a, #08090f 70%)',
      items:[
        {svg:stars(),at:0,x:'0%',y:'0%',w:620,op:.55,depth:-10,cls:'wide'},
        {svg:ticker(),at:0,x:'0%',y:'2%',w:1100,op:.35,cls:'wide'},
        {svg:funnel(),at:.06,x:'74%',y:'10%',w:220,op:.3,depth:60,cls:'float'},
        {svg:chart(),at:.18,x:'4%',y:'24%',w:260,op:.3,depth:90,cls:'drift'},
        {svg:coin('$'),at:.28,x:'88%',y:'38%',w:56,op:.35,depth:140,cls:'float'},
        {svg:turbine(),at:.38,x:'6%',y:'46%',w:170,op:.3,depth:80},
        {svg:lines(),at:.5,x:'24%',y:'58%',w:640,op:.28,depth:60,cls:'wide'},
        {svg:coin('¢'),at:.62,x:'3%',y:'68%',w:48,op:.3,depth:110,cls:'float'},
        {svg:racks(),at:.74,x:'46%',y:'74%',w:520,op:.4,depth:40},
        {svg:skyline(),at:.86,x:'0%',y:'86%',w:1060,op:.55,cls:'wide'}]},
    sky:{bg:'radial-gradient(90% 40% at 50% 100%, rgba(224,180,90,.14), transparent 70%), radial-gradient(60% 40% at 15% 15%, rgba(79,179,162,.14), transparent 70%), linear-gradient(#0a0c16, #0f1322 60%, #141826)',
      items:[
        {svg:stars(),at:0,x:'0%',y:'0%',w:620,op:.7,cls:'wide'},
        {svg:funnel(),at:0,x:'78%',y:'3%',w:180,op:.22,cls:'float'},
        {svg:ticker(),at:.12,x:'0%',y:'14%',w:1100,op:.22,cls:'wide'},
        {svg:turbine(),at:.26,x:'6%',y:'28%',w:150,op:.25,depth:60},
        {svg:coin('$'),at:.38,x:'50%',y:'40%',w:52,op:.3,depth:80,cls:'float'},
        {svg:lines(),at:.5,x:'10%',y:'52%',w:620,op:.22,cls:'wide'},
        {svg:racks(),at:.68,x:'40%',y:'68%',w:500,op:.32,depth:40},
        {svg:skyline(),at:.85,x:'0%',b:'0%',w:1060,op:.6,cls:'wide'}]}
  };

  /* ---------- animated falls (cut.anim) ---------- */
  const FX=window.REEL_FX||{};
  const frame=(inner,label)=>`<svg viewBox="0 0 420 250" role="img" aria-label="${label}"><rect x="4" y="4" width="412" height="242" rx="12" fill="#121522" stroke="#323a52"/>${inner}</svg>`;
  const tx=(x,y,s,c,sz,extra)=>`<text x="${x}" y="${y}" fill="${c||IVO}" font-size="${sz||13}" text-anchor="middle" font-family="TD Hebrew, sans-serif" ${extra||''}>${s}</text>`;
  const appear=(b,d)=>`<animate attributeName="opacity" from="0" to="1" begin="${b}s" dur="${d||.5}s" fill="freeze"/>`;
  const cap=(fig,t)=>{ const p=document.createElement('p'); p.className='ct-cap'; p.style.cssText='text-align:center;margin:4px 0 0;font-size:14px;color:#c8cbd6;line-height:1.6'; p.textContent=t; fig.append(p); };
  const set=(name,fn)=>{ if(FX[name]&&FX[name].cut) FX[name].cut.anim=fn; };

  // Revenue Nowcaster · falls at architecture: the calibration box has no source of truth
  set('Revenue Nowcaster',fig=>{ fig.innerHTML=frame(
    `${tx(120,28,'התחזית: כל יום',IVO,13)}
     <polyline points="30,150 70,140 110,128 150,120 190,110" fill="none" stroke="${TEAL}" stroke-width="3" stroke-dasharray="300" stroke-dashoffset="300"><animate attributeName="stroke-dashoffset" to="0" dur="1.6s" fill="freeze"/></polyline>
     <path d="M30 130 L190 80 L190 140 L30 170Z" fill="${TEAL}" opacity="0">${appear(1)}</path>
     ${tx(120,200,'365 תחזיות בשנה',TEAL,12)}
     <line x1="230" y1="20" x2="230" y2="230" stroke="#323a52"/>
     ${tx(320,28,'האמת: מתי שמפרסמים',IVO,13)}
     ${[0,1,2,3].map(i=>`<circle cx="${262+i*30}" cy="${150-i*14}" r="6" fill="${GOLD}" opacity="0">${appear(1.6+i*.4)}</circle>`).join('')}
     <rect x="262" y="58" width="116" height="40" rx="4" fill="none" stroke="${RED}" stroke-width="2" stroke-dasharray="6 5" opacity="0">${appear(3.2)}</rect>
     <g opacity="0">${appear(3.4)}${tx(320,84,'מקור האמת: ?',RED,13)}</g>
     <g opacity="0">${appear(4)}${tx(320,200,'כתריסר נקודות בשנתיים',RED,12)}${tx(320,220,'בהגדרות שונות',IVO,12)}</g>`,
    'תחזית יומית רציפה מול כמה נקודות אמת בודדות, וקופסה ריקה: מקור האמת');
    cap(fig,'המכ"ם יודע לנחש כל יום. אבל כדי לדעת אם הוא צודק צריך את המספר האמיתי, ולקופסה הזאת אין מקור ואין בעלים.'); });

  // Distillation Watermark · falls at POC: the watermark lives in free text, the money lives in code
  set('Distillation Watermark',fig=>{ fig.innerHTML=frame(
    `${tx(210,28,'כמה פעמים הסימן התגלה, מתוך 100 בדיקות',IVO,13)}
     <line x1="40" y1="200" x2="380" y2="200" stroke="#323a52"/>
     ${[['פרוזה',100,TEAL],['פרוזה, אחרי ניסוח מחדש',51,GOLD],['קוד',24,RED]].map(([l,v,c],i)=>`<rect x="${70+i*110}" y="200" width="70" height="0" rx="4" fill="${c}"><animate attributeName="height" to="${v*1.5}" begin="${.4+i*.6}s" dur=".8s" fill="freeze"/><animate attributeName="y" to="${200-v*1.5}" begin="${.4+i*.6}s" dur=".8s" fill="freeze"/></rect><g opacity="0">${appear(1.2+i*.6)}${tx(105+i*110,192-v*1.5,v,c,15)}</g>${tx(105+i*110,220,l,IVO,11)}`).join('')}
     <g opacity="0">${appear(3.2)}${tx(210,244,'הכסף נמצא בקוד, והסימן לא שורד שם',RED,12)}</g>`,
    'שלוש עמודות: 100 בפרוזה, 51 אחרי ניסוח מחדש, 24 בקוד');
    cap(fig,'סימן מים צריך מקום לנוע: מילים שאפשר להחליף. בקוד כמעט אין כזה מקום, ותלמיד שלמד מהקוד שלנו לא ירש ממנו כלום (0 מתוך 20). ושם בדיוק הכסף.'); });

  // Community Power Ledger · falls at ideation: the numbers belong to others
  set('Community Power Ledger',fig=>{ fig.innerHTML=frame(
    `<rect x="40" y="24" width="340" height="170" rx="8" fill="#efe6d3" transform="rotate(-1 210 110)"/>
     <g font-family="Caveat, TD Hebrew, cursive" fill="#2b2620" text-anchor="middle">
      <text x="210" y="56" font-size="20">פנקס השכנים · אתר 7</text>
      ${[['חשמל',80],['מים',108],['מסים לעיר',136],['משרות',164]].map(([l,y],i)=>`<text x="362" y="${y}" font-size="17" text-anchor="start">${l}</text><rect x="70" y="${y-14}" width="190" height="18" fill="#1e2422" opacity="0">${appear(.6+i*.5)}</rect>`).join('')}</g>
     <g opacity="0">${appear(2.8)}${tx(210,222,'הנתונים: אצל חברת החשמל והמפעיל, תחת סודיות',RED,12)}</g>`,
    'פנקס עם ארבע שורות שכל אחת מושחרת');
    cap(fig,'הלוח הוא החלק הקל. המספרים שייכים לאחרים, ומה שמכריע הוא חוק ומשא ומתן, לא קוד.'); });

  // Break-even Simulator · falls on the board: everyone already did the sum
  set('Buildout Break-even Simulator',fig=>{ fig.innerHTML=frame(
    `${[['The Economist',70],['קולומביה',210],['סטנפורד',350]].map(([l,x],i)=>`<g opacity="0">${appear(.3+i*.6)}<rect x="${x-56}" y="60" width="112" height="90" rx="8" fill="#1c2233" stroke="${DIM}"/>${tx(x,92,l,IVO,12)}${tx(x,128,'~$3T',GOLD,20)}</g>`).join('')}
     <g opacity="0">${appear(2.4)}${tx(210,200,'מחשבון רביעי היה מגיע לאותו מספר',RED,13)}</g>`,
    'שלושה כרטיסים עם אותה תוצאה: כ-3 טריליון');
    cap(fig,'השאלה איפה היעד כבר נענתה. מה שחסר הוא לדעת איפה אנחנו עכשיו.'); });

  // Switching-Cost Kit · falls on the board: a lock that harms customers
  set('Switching-Cost Kit',fig=>{ fig.innerHTML=frame(
    `<rect x="150" y="80" width="120" height="90" rx="10" fill="#1c2233" stroke="${GOLD}" stroke-width="2"/><path d="M175 80 v-24 q35 -46 70 0 v24" stroke="${GOLD}" stroke-width="6" fill="none"/>
     <g opacity="0">${appear(1)}<path d="M175 56 l-10 -14" stroke="${RED}" stroke-width="5"/></g>
     <g opacity="0">${appear(1.6)}${tx(80,110,'הגבלים',RED,14)}${tx(340,110,'לקוחות כועסים',RED,14)}</g>
     <g opacity="0">${appear(2.4)}${tx(210,214,'ו-AI עצמו מקל על המעבר',IVO,13)}</g>`,
    'מנעול שהקשת שלו נשברת');
    cap(fig,'מנעול שפוגע בלקוח נשבר מהר: ברגולציה, בתביעה, או ביום שהמתחרה מציע לעבור בהנחיה אחת.'); });

  // Grid-Flex Scheduler · falls on the board: saves power, adds no revenue
  set('Grid-Flex Scheduler',fig=>{ fig.innerHTML=frame(
    `<polyline points="30,170 90,120 150,150 210,90 270,130 330,80 390,120" fill="none" stroke="${SKY}" stroke-width="2"/>
     ${[60,180,300].map((x,i)=>`<rect x="${x}" y="190" width="40" height="20" rx="3" fill="${TEAL}" opacity="0">${appear(.5+i*.5)}</rect>`).join('')}
     ${tx(210,40,'עומס על הרשת, ועבודות שזזות לשעות ריקות',IVO,12)}
     <g opacity="0">${appear(2.2)}<rect x="150" y="56" width="120" height="30" rx="6" fill="#1c2233" stroke="${RED}"/>${tx(210,76,'הכנסה: + $0',RED,14)}</g>`,
    'גרף עומס ברשת ועבודות שזזות, וכיתוב: הכנסה פלוס אפס');
    cap(fig,'שכן טוב יותר וחשמל זול יותר. אבל אף דולר נוסף לא נכנס לראש המשפך.'); });
})();
