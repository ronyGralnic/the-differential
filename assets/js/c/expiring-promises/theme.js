/* Case 04 · expiring-promises · themed backdrops (engine: case-theme.js) and animated fall figures (engine: reel-fx.js, cut.anim).
   Theme: Washington at night. The Capitol dome, the Situation Room's time-zone clocks, flight arcs, satellite trails,
   sealed folders, and a two-year clock ticking down. Everything decorative, dark and quiet behind the text. */
(function(){
  const GOLD='#e0b45a', SKY='#6f8fc4', IVO='#e8e2d0', RED='#d8553a', TEAL='#4fb3a2', DIM='#8a93a8';
  const dome=()=>`<svg viewBox="0 0 300 200"><rect x="40" y="150" width="220" height="40" fill="#1c2233" stroke="${DIM}" stroke-width="2"/>${Array.from({length:11},(_,i)=>`<rect x="${52+i*20}" y="156" width="6" height="30" fill="${DIM}" opacity=".5"/>`).join('')}<rect x="90" y="120" width="120" height="30" fill="#1c2233" stroke="${DIM}" stroke-width="2"/><path d="M95 120 Q150 30 205 120Z" fill="#232b3f" stroke="${IVO}" stroke-width="2" opacity=".9"/>${[0,1,2,3].map(i=>`<path d="M${110+i*27} 120 Q150 ${50+i*0} ${110+i*27} 120" stroke="${DIM}" fill="none"/>`).join('')}<rect x="142" y="44" width="16" height="22" fill="#232b3f" stroke="${IVO}"/><circle cx="150" cy="40" r="5" fill="${GOLD}"/></svg>`;
  const clocks=()=>`<svg viewBox="0 0 420 110">${[['וושינגטון',0],['קייב',7],['טהרן',8.5],['הוואנה',0],['בייג\'ינג',13]].map(([c,o],i)=>{ const x=42+i*84, a=((o+21)%12)*30*Math.PI/180; return `<g><circle cx="${x}" cy="44" r="30" fill="#121826" stroke="${DIM}" stroke-width="2"/><line x1="${x}" y1="44" x2="${(x+18*Math.sin(a)).toFixed(1)}" y2="${(44-18*Math.cos(a)).toFixed(1)}" stroke="${IVO}" stroke-width="3"/><line x1="${x}" y1="44" x2="${x}" y2="20" stroke="${GOLD}" stroke-width="2"/><text x="${x}" y="98" text-anchor="middle" font-size="13" fill="${DIM}" font-family="TD Hebrew, sans-serif">${c}</text></g>`; }).join('')}</svg>`;
  const arcs=()=>`<svg viewBox="0 0 600 160"><path d="M20 140 Q160 10 300 120" fill="none" stroke="${SKY}" stroke-width="2" stroke-dasharray="4 7"/><path d="M300 120 Q440 0 580 130" fill="none" stroke="${SKY}" stroke-width="2" stroke-dasharray="4 7"/><path d="M60 150 Q300 -20 560 150" fill="none" stroke="${GOLD}" stroke-width="1.5" stroke-dasharray="2 8" opacity=".7"/>${[[20,140],[300,120],[580,130]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5" fill="${GOLD}"/>`).join('')}</svg>`;
  const sats=()=>`<svg viewBox="0 0 600 120">${Array.from({length:7},(_,i)=>`<g transform="translate(${40+i*82} ${30+(i%3)*24})"><rect x="-5" y="-3" width="10" height="6" fill="${IVO}"/><rect x="-16" y="-2" width="9" height="4" fill="${SKY}"/><rect x="7" y="-2" width="9" height="4" fill="${SKY}"/></g>`).join('')}<path d="M0 100 Q300 40 600 100" fill="none" stroke="${SKY}" stroke-width="1" opacity=".5"/></svg>`;
  const folder=(stamp)=>`<svg viewBox="0 0 120 90"><path d="M6 14 h38 l8 8 h62 v62 h-108z" fill="#3a2f1f" stroke="${GOLD}" stroke-width="2"/><rect x="24" y="40" width="72" height="20" rx="3" fill="none" stroke="${RED}" stroke-width="2" transform="rotate(-8 60 50)"/><text x="60" y="55" text-anchor="middle" font-size="12" fill="${RED}" font-family="IBM Plex Mono, monospace" transform="rotate(-8 60 50)">${stamp}</text></svg>`;
  const countdown=()=>`<svg viewBox="0 0 220 80"><rect x="4" y="10" width="212" height="60" rx="8" fill="#121826" stroke="${DIM}"/>${['8','0','4'].map((d,i)=>`<rect x="${20+i*62}" y="20" width="50" height="40" rx="4" fill="#1c2233"/><text x="${45+i*62}" y="50" text-anchor="middle" font-size="26" fill="${GOLD}" font-family="IBM Plex Mono, monospace">${d}</text>`).join('')}<text x="110" y="8" text-anchor="middle" font-size="9" fill="${DIM}" font-family="TD Hebrew, sans-serif">ימים מ-8.11.2026 עד 20.1.2029</text></svg>`;
  const skyline=()=>`<svg viewBox="0 0 1060 140" preserveAspectRatio="none"><path d="M0 140 V100 h60 v-20 h40 v20 h80 v-34 h30 v34 h120 v-14 h20 v-60 h10 v60 h20 v14 h90 Q560 40 600 76 v24 h120 v-30 h40 v30 h120 v-18 h60 v18 h110 v40z" fill="#0b0e16"/><rect x="514" y="20" width="8" height="66" fill="#141a28"/><circle cx="518" cy="18" r="3" fill="${RED}"/></svg>`;
  const stars=()=>`<svg viewBox="0 0 600 200">${Array.from({length:40},(_,i)=>`<circle cx="${(i*137)%600}" cy="${(i*71)%200}" r="${i%5===0?1.6:1}" fill="${IVO}" opacity="${.3+(i%4)*.15}"/>`).join('')}</svg>`;
  window.CASE_THEME=window.CASE_THEME||{};
  window.CASE_THEME['expiring-promises']={
    reel:{bg:'radial-gradient(120% 70% at 85% 0%, rgba(111,143,196,.16), transparent 55%), radial-gradient(110% 60% at 10% 100%, rgba(224,180,90,.10), transparent 60%), linear-gradient(#0c1020, #08090f 70%)',
      items:[
        {svg:stars(),at:0,x:'0%',y:'0%',w:620,op:.6,depth:-10,cls:'wide'},
        {svg:dome(),at:0,x:'68%',y:'4%',w:280,op:.22,depth:50},
        {svg:clocks(),at:.08,x:'2%',y:'18%',w:380,op:.25,depth:90,cls:'drift'},
        {svg:folder('SECRET'),at:.18,x:'86%',y:'34%',w:90,op:.3,depth:140,cls:'float'},
        {svg:arcs(),at:.3,x:'4%',y:'46%',w:560,op:.3,depth:60,cls:'wide'},
        {svg:sats(),at:.44,x:'40%',y:'60%',w:520,op:.3,depth:120,cls:'drift'},
        {svg:folder('T-114'),at:.56,x:'3%',y:'66%',w:80,op:.28,depth:100,cls:'float'},
        {svg:countdown(),at:.7,x:'70%',y:'76%',w:220,op:.4,depth:40},
        {svg:skyline(),at:.85,x:'0%',y:'86%',w:1060,op:.55,cls:'wide'}]},
    sky:{bg:'radial-gradient(90% 40% at 50% 100%, rgba(224,180,90,.14), transparent 70%), radial-gradient(60% 40% at 15% 15%, rgba(111,143,196,.18), transparent 70%), linear-gradient(#0a0d1a, #0f1424 60%, #141a2a)',
      items:[
        {svg:stars(),at:0,x:'0%',y:'0%',w:620,op:.7,cls:'wide'},
        {svg:dome(),at:0,x:'74%',y:'3%',w:200,op:.16},
        {svg:sats(),at:.1,x:'10%',y:'8%',w:480,op:.28,depth:40,cls:'drift'},
        {svg:clocks(),at:.25,x:'50%',y:'26%',w:360,op:.2,depth:60},
        {svg:folder('SECRET'),at:.38,x:'4%',y:'40%',w:76,op:.24,depth:80,cls:'float'},
        {svg:arcs(),at:.5,x:'20%',y:'52%',w:540,op:.24,cls:'wide'},
        {svg:countdown(),at:.65,x:'6%',y:'66%',w:200,op:.35,depth:50},
        {svg:skyline(),at:.85,x:'0%',b:'0%',w:1060,op:.6,cls:'wide'}]}
  };

  /* ---------- animated falls (cut.anim) ---------- */
  const FX=window.REEL_FX||{};
  const frame=(inner,label)=>`<svg viewBox="0 0 420 250" role="img" aria-label="${label}"><rect x="4" y="4" width="412" height="242" rx="12" fill="#121522" stroke="#323a52"/>${inner}</svg>`;
  const tx=(x,y,s,c,sz,extra)=>`<text x="${x}" y="${y}" fill="${c||IVO}" font-size="${sz||13}" text-anchor="middle" font-family="TD Hebrew, sans-serif" ${extra||''}>${s}</text>`;
  const appear=(b,d)=>`<animate attributeName="opacity" from="0" to="1" begin="${b}s" dur="${d||.5}s" fill="freeze"/>`;
  const cap=(fig,t)=>{ const p=document.createElement('p'); p.className='ct-cap'; p.style.cssText='text-align:center;margin:4px 0 0;font-size:14px;color:#c8cbd6;line-height:1.6'; p.textContent=t; fig.append(p); };
  const set=(name,fn)=>{ if(FX[name]&&FX[name].cut) FX[name].cut.anim=fn; };

  // Crisis Rehearsal · falls at architecture: the cast changes between rehearsals, and the lessons have no owner
  set('Crisis Rehearsal Engine',fig=>{ fig.innerHTML=frame(
    `${tx(110,30,'חזרה, ושנה אחרי',IVO,13)}
     ${Array.from({length:8},(_,i)=>`<g transform="translate(${30+(i%4)*42} ${70+Math.floor(i/4)*56})"><circle r="11" fill="${TEAL}"><animate attributeName="fill" to="${RED}" begin="${(1.2+i*.25).toFixed(2)}s" dur=".4s" fill="${[1,3,4,6].includes(i)?'freeze':'remove'}"/></circle><rect x="-11" y="13" width="22" height="18" rx="6" fill="${TEAL}" opacity=".7"/></g>`).join('')}
     ${tx(110,210,'4 מתוך 8 התחלפו',RED,12,'opacity="0"').replace('>4',`>${appear(3)}4`)}
     <line x1="230" y1="20" x2="230" y2="230" stroke="#323a52"/>
     ${tx(320,30,'מה החלטנו בפעם הקודמת?',IVO,13)}
     <rect x="262" y="60" width="116" height="80" rx="4" fill="none" stroke="${RED}" stroke-width="2" stroke-dasharray="6 5"/>
     <text x="320" y="112" text-anchor="middle" font-size="34" fill="${RED}" opacity="0">?${appear(2)}</text>
     <g opacity="0">${appear(3.6)}${tx(320,170,'אין רכיב, ואין בעלים',RED,12)}${tx(320,192,'הלקח יצא בדלת',IVO,12)}</g>`,
    'שמונה כיסאות, ארבעה מהם מתחלפים, וקופסה ריקה עם סימן שאלה: מה החלטנו בפעם הקודמת');
    cap(fig,'החזרה מלמדת את מי שבחדר. כשהם מתחלפים, הלקח הולך איתם, ואין במנוע מקום שמחזיק אותו.'); });

  // Comms Failover · falls at POC: the switch is fast, the backup is ~15x smaller
  set('Comms Failover Broker',fig=>{ fig.innerHTML=frame(
    `${tx(210,28,'מה נכנס בגיבוי (בקירוב)',IVO,13)}
     <rect x="40" y="50" width="340" height="40" rx="6" fill="#1c2233" stroke="${SKY}"/>${tx(210,76,'הקישור הראשי: 400',IVO,12)}
     <rect x="40" y="50" width="340" height="40" rx="6" fill="#121522" opacity="0"><animate attributeName="opacity" to=".92" begin="1s" dur=".4s" fill="freeze"/></rect>
     <g opacity="0">${appear(1.4)}<rect x="40" y="110" width="${(340*.065).toFixed(0)}" height="40" rx="4" fill="${GOLD}"/>${tx(210,136,'הגיבוי: כ-26, כ-6.5%',GOLD,12)}</g>
     <g opacity="0">${appear(2.4)}${Array.from({length:40},(_,i)=>`<rect x="${40+(i%20)*17}" y="${170+Math.floor(i/20)*20}" width="12" height="12" rx="2" fill="${i<3?TEAL:'#3a3346'}"/>`).join('')}</g>
     <g opacity="0">${appear(3.4)}${tx(210,232,'קול ✓ · רחפנים: 3 מתוך 40',RED,12)}</g>`,
    'פס רחב של הקישור הראשי נכבה, פס צר של הגיבוי נשאר, ומתוך 40 רחפנים רק 3 ממשיכים');
    cap(fig,'המעבר לוקח פחות מ-12 שניות. אבל גנרטור חירום שמדליק נורה אחת לא מחזיק בית חולים.'); });

  // Commitment Ledger · falls at ideation: a full record did not keep the deal
  set('Commitment Ledger',fig=>{ fig.innerHTML=frame(
    `<rect x="24" y="24" width="372" height="150" rx="8" fill="#efe6d3" transform="rotate(-1.5 210 100)"/>
     <g font-family="Caveat, TD Hebrew, cursive" fill="#2b2620" text-anchor="middle">
      <text x="210" y="62" font-size="20" opacity="0">הסכם הגרעין: מתועד לגמרי${appear(.3)}</text>
      <text x="210" y="96" font-size="20" opacity="0">2015 נחתם · 2018 בוטל${appear(1.2)}</text>
      <line x1="80" y1="110" x2="340" y2="110" stroke="#2b2620" stroke-width="2" opacity="0">${appear(2)}</line>
      <text x="210" y="144" font-size="22" fill="${RED}" opacity="0">רישום ≠ בסיס חוקי${appear(2.4)}</text></g>
     <g opacity="0">${appear(3.2)}<rect x="60" y="190" width="300" height="34" rx="6" fill="#1c2233" stroke="${DIM}"/>${tx(210,212,'אשרור אמנה: 67 מתוך 100 סנאטורים',GOLD,12)}</g>`,
    'חישוב על מפית: הסכם מתועד לגמרי, נחתם ב-2015 ובוטל ב-2018. רישום הוא לא בסיס חוקי');
    cap(fig,'התשובה התקבלה בלי לבנות כלום. פנקס היה מראה את הביטול, לא מונע אותו.'); });

  // Envoy Interest Tracker · falls on the board: private data, a political weapon
  set('Envoy Interest Tracker',fig=>{ fig.innerHTML=frame(
    `<circle cx="120" cy="100" r="34" fill="#1c2233" stroke="${DIM}"/>${tx(120,105,'שליח',IVO,13)}
     <path d="M156 100 H270" stroke="${GOLD}" stroke-width="2" stroke-dasharray="5 5" opacity="0">${appear(.6)}</path>
     <rect x="270" y="70" width="90" height="60" rx="6" fill="#1c2233" stroke="${DIM}"/>${tx(315,106,'עסקה ?',IVO,13)}
     <g opacity="0">${appear(1.6)}<path d="M210 150 q24 0 30 12 q-2 34 -30 52 q-28 -18 -30 -52 q6 -12 30 -12z" fill="none" stroke="${RED}" stroke-width="3"/>${tx(210,192,'!',RED,22)}</g>
     <g opacity="0">${appear(2.6)}${tx(210,236,'נתונים פרטיים, ונשק פוליטי',RED,13)}</g>`,
    'שליח ועסקה, מחוברים בקו מקווקו, ומגן עם סימן קריאה');
    cap(fig,'הכלי צריך נתונים שאי אפשר להשיג כחוק, ויהפוך מהר לנשק בידי צד אחד.'); });

  // Travel Forecaster · falls on the board: where he flies is not what stays
  set('Lame-Duck Travel Forecaster',fig=>{ fig.innerHTML=frame(
    `<path d="M40 190 Q210 20 380 190" fill="none" stroke="${SKY}" stroke-width="2" stroke-dasharray="5 6"/>
     <g><animateMotion dur="3s" fill="freeze" path="M40 190 Q210 20 380 190" rotate="auto"/><path d="M-12 0 L12 0 M2 -9 L7 0 L2 9 M-10 -5 L-7 0 L-10 5" stroke="${GOLD}" stroke-width="3" fill="none"/></g>
     <g opacity="0">${appear(3.1)}<rect x="330" y="150" width="70" height="44" rx="5" fill="#1c2233" stroke="${RED}"/>${tx(365,178,'?',RED,20)}${tx(210,232,'נחת. ומה הובטח?',IVO,13)}</g>`,
    'מטוס בקשת, נוחת ליד סימן שאלה');
    cap(fig,'החיזוי יכול להיות מדויק. הוא פשוט לא עונה על השאלה של הסיפור.'); });

  // Leader Call Authenticator · falls on the board: the hotline exists since 1963
  set('Leader Call Authenticator',fig=>{ fig.innerHTML=frame(
    `<rect x="40" y="80" width="90" height="70" rx="10" fill="#1c2233" stroke="${DIM}"/>${tx(85,122,'וושינגטון',IVO,12)}
     <rect x="290" y="80" width="90" height="70" rx="10" fill="#1c2233" stroke="${DIM}"/>${tx(335,122,'מוסקבה',IVO,12)}
     <path d="M130 115 H290" stroke="${TEAL}" stroke-width="3" stroke-dasharray="160" stroke-dashoffset="160"><animate attributeName="stroke-dashoffset" to="0" dur="1.2s" fill="freeze"/></path>
     <g opacity="0">${appear(1.3)}${tx(210,104,'1963',GOLD,16)}</g>
     <g opacity="0">${appear(2.2)}${tx(210,200,'הקו הישיר כבר קיים, ומוצפן',RED,13)}</g>`,
    'שני מסופים וקו ישיר ביניהם, מ-1963');
    cap(fig,'הבעיה אמיתית, אבל הפתרון קיים כבר שישה עשורים.'); });
})();
