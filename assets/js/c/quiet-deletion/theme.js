/* Case 03 · quiet-deletion · themed backdrops (engine: case-theme.js) and animated fall figures (engine: reel-fx.js, cut.anim).
   Theme: an Indian night. Ashoka chakra, marigold strings, ballot papers, the inked finger of a voter, a voting machine,
   a night train, oil lamps, the roll registers. Everything decorative, dark and quiet behind the text. */
(function(){
  const SAF='#e8a33d', GRN='#4fa36a', NAV='#5b74c9', IVO='#efe6d3', RED='#d8553a', INK='#7c5cc4';
  const chakra=(r,c)=>{ let s=`<svg viewBox="-60 -60 120 120"><circle r="54" fill="none" stroke="${c}" stroke-width="4"/><circle r="8" fill="${c}"/>`; for(let i=0;i<24;i++){ const a=i*15*Math.PI/180; s+=`<line x1="0" y1="0" x2="${(50*Math.cos(a)).toFixed(1)}" y2="${(50*Math.sin(a)).toFixed(1)}" stroke="${c}" stroke-width="2"/>`; } return s+'</svg>'; };
  const garland=()=>{ let s=`<svg viewBox="0 0 600 80"><path d="M0 8 Q150 70 300 20 Q450 -20 600 30" fill="none" stroke="#6b5a2a" stroke-width="2"/>`; for(let i=0;i<=24;i++){ const t=i/24, x=t*600; const y=t<.5? 8+ (Math.sin(t*2*Math.PI)*0+ (t*2)*(1-t*2)*4*31) : 20+((t-.5)*2)*(1-(t-.5)*2)*4*-18+ (t-.5)*20; s+=`<circle cx="${x.toFixed(0)}" cy="${(y+6).toFixed(0)}" r="7" fill="${i%2?SAF:'#d9772f'}"/><circle cx="${x.toFixed(0)}" cy="${(y+6).toFixed(0)}" r="3" fill="#f5d27a"/>`; } return s+'</svg>'; };
  const ballot=(mark)=>`<svg viewBox="0 0 80 100"><rect x="4" y="4" width="72" height="92" rx="4" fill="${IVO}"/><g stroke="#9a907e" stroke-width="2">${[22,38,54,70].map(y=>`<line x1="14" y1="${y}" x2="52" y2="${y}"/><rect x="58" y="${y-6}" width="10" height="10" fill="none"/>`).join('')}</g>${mark?`<path d="M59 35 l4 4 l8 -10" stroke="${NAV}" stroke-width="3" fill="none"/>`:''}</svg>`;
  const finger=()=>`<svg viewBox="0 0 90 140"><path d="M30 138 L30 50 Q30 20 45 20 Q60 20 60 50 L60 138 Z" fill="#c08a62"/><path d="M36 30 Q45 24 54 30 L54 40 Q45 36 36 40Z" fill="#e7c3a3"/><line x1="45" y1="48" x2="45" y2="76" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M60 80 Q80 70 84 90 L84 138 L60 138Z" fill="#b9805a"/></svg>`;
  const evm=()=>`<svg viewBox="0 0 120 150"><rect x="6" y="6" width="108" height="138" rx="8" fill="#2a2f3a" stroke="${NAV}" stroke-width="2"/>${[0,1,2,3,4,5].map(i=>`<rect x="18" y="${20+i*20}" width="60" height="12" rx="2" fill="#3c4352"/><circle cx="96" cy="${26+i*20}" r="6" fill="${i===2?'#3fa2ff':'#1d2330'}" stroke="#5c6680"/>`).join('')}</svg>`;
  const train=()=>`<svg viewBox="0 0 520 90"><line x1="0" y1="78" x2="520" y2="78" stroke="#5a5040" stroke-width="3"/>${Array.from({length:26},(_,i)=>`<line x1="${i*20+4}" y1="74" x2="${i*20+14}" y2="84" stroke="#3d362b" stroke-width="3"/>`).join('')}<g><rect x="40" y="30" width="110" height="40" rx="6" fill="#2b3f8f"/><rect x="155" y="30" width="110" height="40" rx="6" fill="#2b3f8f"/><rect x="270" y="30" width="110" height="40" rx="6" fill="#2b3f8f"/>${[0,1,2].map(k=>[0,1,2,3].map(j=>`<rect x="${52+k*115+j*24}" y="38" width="16" height="12" rx="2" fill="#f5d27a" opacity=".85"/>`).join('')).join('')}<animateTransform attributeName="transform" type="translate" values="-420 0; 520 0" dur="22s" repeatCount="indefinite"/></g></svg>`;
  const diyas=()=>`<svg viewBox="0 0 300 70">${[0,1,2,3,4].map(i=>`<g transform="translate(${30+i*60} 40)"><path d="M-22 0 Q0 22 22 0Z" fill="#a8562a"/><path d="M0 -4 Q-7 -16 0 -28 Q7 -16 0 -4Z" fill="${SAF}"><animate attributeName="opacity" values="1;.6;1" dur="${1.4+i*.2}s" repeatCount="indefinite"/></path></g>`).join('')}</svg>`;
  const registers=()=>`<svg viewBox="0 0 140 120">${[0,1,2,3].map(i=>`<rect x="${10+i*3}" y="${90-i*22}" width="110" height="20" rx="3" fill="${['#5a3a2a','#4a3a5a','#2f4a3a','#5a4a2a'][i]}" stroke="#2a2018"/><line x1="${22+i*3}" y1="${100-i*22}" x2="${70+i*3}" y2="${100-i*22}" stroke="${IVO}" stroke-width="2" opacity=".6"/>`).join('')}</svg>`;
  const skyline=()=>`<svg viewBox="0 0 900 160" preserveAspectRatio="none"><path d="M0 160 L0 120 L60 120 L60 100 L90 100 L90 120 L150 120 L150 80 Q175 50 200 80 L200 120 L250 120 L262 70 L274 120 L330 120 L330 96 L380 96 L380 60 L392 48 L404 60 L404 120 L470 120 Q500 70 530 120 L600 120 L600 88 L640 88 L640 120 L700 120 L712 64 L724 120 L790 120 L790 100 L840 100 L840 120 L900 120 L900 160Z" fill="#0a0910"/><g fill="#f5d27a" opacity=".5">${Array.from({length:22},(_,i)=>`<rect x="${20+i*40}" y="${126+(i%3)*8}" width="4" height="5"/>`).join('')}</g></svg>`;
  const kite=c=>`<svg viewBox="0 0 60 110"><path d="M30 2 L56 34 L30 66 L4 34Z" fill="${c}"/><line x1="30" y1="2" x2="30" y2="66" stroke="#0b0a09" stroke-width="1.5" opacity=".5"/><path d="M30 66 Q20 82 34 92 Q44 100 30 108" fill="none" stroke="${IVO}" stroke-width="1.2" opacity=".6"/></svg>`;

  window.CASE_THEME=window.CASE_THEME||{};
  window.CASE_THEME['quiet-deletion']={
    reel:{bg:'radial-gradient(120% 70% at 85% 0%, rgba(232,163,61,.13), transparent 55%), radial-gradient(110% 60% at 10% 100%, rgba(79,163,106,.12), transparent 60%), linear-gradient(#100d1a, #0b0a09 70%)',
      items:[
        {svg:chakra(1,NAV),at:0,x:'70%',y:'6%',w:260,op:.14,depth:60,cls:'spin'},
        {svg:garland(),at:0,x:'0%',y:'0%',w:620,op:.35,depth:-20,cls:'sway wide'},
        {svg:ballot(true),at:.06,x:'6%',y:'24%',w:70,op:.28,depth:120,cls:'drift'},
        {svg:ballot(false),at:.12,x:'86%',y:'40%',w:60,op:.22,depth:160,cls:'drift'},
        {svg:finger(),at:.22,x:'3%',y:'52%',w:70,op:.3,depth:90,cls:'float'},
        {svg:evm(),at:.36,x:'88%',y:'62%',w:80,op:.24,depth:140,cls:'float'},
        {svg:registers(),at:.5,x:'2%',y:'72%',w:110,op:.28,depth:100},
        {svg:train(),at:.62,x:'10%',y:'84%',w:560,op:.3,depth:40,cls:'wide'},
        {svg:diyas(),at:.78,x:'60%',y:'86%',w:240,op:.45,depth:30},
        {svg:chakra(1,SAF),at:.9,x:'4%',y:'10%',w:120,op:.12,depth:40,cls:'spin'}]},
    sky:{bg:'radial-gradient(90% 40% at 50% 100%, rgba(232,163,61,.18), transparent 70%), radial-gradient(60% 40% at 15% 15%, rgba(91,116,201,.18), transparent 70%), linear-gradient(#0c0b16, #120e1f 60%, #1a1220)',
      items:[
        {svg:chakra(1,IVO),at:0,x:'78%',y:'2%',w:150,op:.08,cls:'spin'},
        {svg:kite(SAF),at:.05,x:'8%',y:'4%',w:46,op:.35,depth:40,cls:'sway'},
        {svg:kite(GRN),at:.15,x:'90%',y:'14%',w:40,op:.3,depth:60,cls:'sway'},
        {svg:garland(),at:.25,x:'20%',y:'30%',w:520,op:.18,cls:'sway'},
        {svg:ballot(true),at:.35,x:'5%',y:'40%',w:60,op:.2,depth:80,cls:'drift'},
        {svg:finger(),at:.45,x:'91%',y:'50%',w:56,op:.22,depth:60,cls:'float'},
        {svg:registers(),at:.55,x:'3%',y:'62%',w:100,op:.2,depth:50},
        {svg:diyas(),at:.9,x:'62%',b:'7%',w:240,op:.45},
        {svg:skyline(),at:.85,x:'0%',b:'0%',w:1060,op:.6,cls:'wide'}]}
  };

  /* ---------- animated falls (cut.anim) ---------- */
  const FX=window.REEL_FX||{};
  const frame=(inner,label)=>`<svg viewBox="0 0 420 250" role="img" aria-label="${label}"><rect x="4" y="4" width="412" height="242" rx="12" fill="#15131c" stroke="#3a3346"/>${inner}</svg>`;
  const tx=(x,y,s,c,sz,extra)=>`<text x="${x}" y="${y}" fill="${c||IVO}" font-size="${sz||13}" text-anchor="middle" font-family="TD Hebrew, sans-serif" ${extra||''}>${s}</text>`;
  const appear=(b,d)=>`<animate attributeName="opacity" from="0" to="1" begin="${b}s" dur="${d||.5}s" fill="freeze"/>`;
  const cap=(fig,t)=>{ const p=document.createElement('p'); p.className='ct-cap'; p.style.cssText='text-align:center;margin:4px 0 0;font-size:14px;color:#cfc6b4;line-height:1.6'; p.textContent=t; fig.append(p); };
  const set=(name,fn)=>{ if(FX[name]&&FX[name].cut) FX[name].cut.anim=fn; };

  // Sample Audit · falls at architecture: the checker comes from the same machine, the narrow band misses the truth
  set('Removal Sample Audit',fig=>{ fig.innerHTML=frame(
    `${tx(110,30,'הבודק בשטח',IVO,13)}
     ${[0,1,2,3].map(i=>`<g transform="translate(${40+i*40} 70)"><rect x="-14" y="0" width="28" height="30" fill="#2b2733" stroke="#4b4458"/><path d="M-16 0 L0 -14 L16 0Z" fill="#3b3446"/><text y="22" text-anchor="middle" font-size="16" fill="${GRN}" opacity="0">✓${appear(1+i*.45)}</text></g>`).join('')}
     <g opacity="0">${appear(.3)}<circle cx="40" cy="140" r="9" fill="#c08a62"/><rect x="31" y="150" width="18" height="24" rx="4" fill="#7a3b3b"/><text x="40" y="190" text-anchor="middle" font-size="11" fill="${RED}">מהמנגנון שמחק</text><animateTransform attributeName="transform" type="translate" values="0 0;120 0" begin="1s" dur="1.8s" fill="freeze"/></g>
     ${tx(110,225,'מאשר בלי לבקר',RED,12,'opacity="0"').replace('>מאשר',`>${appear(2.8)}מאשר`)}
     <line x1="230" y1="20" x2="230" y2="230" stroke="#3a3346"/>
     ${tx(320,30,'האומדן מול האמת',IVO,13)}
     <line x1="250" y1="200" x2="400" y2="200" stroke="#6b6380"/>
     ${[5,10,15,20].map(v=>`<text x="${250+v*7}" y="218" font-size="10" fill="#8f87a3" text-anchor="middle">${v}%</text>`).join('')}
     <g><line x1="${250+14.8*7}" y1="60" x2="${250+14.8*7}" y2="200" stroke="${SAF}" stroke-width="2" stroke-dasharray="4 4"/>${tx(250+14.8*7,54,'האמת 14.8%',SAF,11)}</g>
     <g><rect x="${250+13*7}" y="120" width="${3.6*7}" height="26" rx="4" fill="${GRN}" opacity=".55"><animate attributeName="x" from="${250+13*7}" to="${250+9.2*7}" begin="3.2s" dur="1.6s" fill="freeze"/></rect>
       <text x="${250+14.8*7}" y="112" font-size="11" fill="${GRN}" text-anchor="middle">אומדן ±1.8<animate attributeName="x" from="${250+14.8*7}" to="${250+11*7}" begin="3.2s" dur="1.6s" fill="freeze"/></text></g>
     <g opacity="0">${appear(5)}<text x="300" y="240" font-size="12" fill="${RED}" text-anchor="middle">הטווח צר, והאמת מחוצה לו</text></g>`,
    'בודק מאותו מנגנון מסמן וי על ארבעה בתים בלי לבקר, והאומדן זז מ-14.8% ל-11%: טווח צר שהאמת מחוצה לו');
    cap(fig,'הבודק שמגיע מאותו מנגנון מאשר בלי לבקר. האומדן נשאר בטוח בעצמו, ומפספס את האמת.'); });

  // Time-Lock · falls at POC: the watermark survives a photo, not a retyped text, and printing comes before unlocking
  set('Exam Paper Time-Lock',fig=>{ fig.innerHTML=frame(
    `<g><rect x="30" y="40" width="90" height="110" rx="6" fill="${IVO}"/><text x="75" y="70" text-anchor="middle" font-size="11" fill="#5c5446">שאלון</text>${[84,98,112,126].map(y=>`<line x1="44" y1="${y}" x2="106" y2="${y}" stroke="#a89e8a" stroke-width="2"/>`).join('')}<text x="75" y="142" text-anchor="middle" font-size="10" fill="${NAV}" opacity=".7">412 · סימן מים</text></g>
     <g opacity="0">${appear(.8)}<rect x="160" y="30" width="80" height="60" rx="8" fill="#23202b" stroke="#4b4458"/><text x="200" y="66" text-anchor="middle" font-size="12" fill="${IVO}">📷 צילום</text><text x="200" y="110" text-anchor="middle" font-size="12" fill="${GRN}">נעקב: מרכז 412 ✓</text></g>
     <g opacity="0">${appear(2.2)}<rect x="160" y="135" width="80" height="60" rx="8" fill="#23202b" stroke="#4b4458"/><text x="200" y="170" text-anchor="middle" font-size="12" fill="${IVO}">⌨ הוקלד</text><text x="200" y="215" text-anchor="middle" font-size="12" fill="${RED}">סימן המים נעלם ?</text></g>
     <path d="M122 80 L158 60" stroke="#6b6380" stroke-dasharray="4 4"/><path d="M122 120 L158 160" stroke="#6b6380" stroke-dasharray="4 4"/>
     <g opacity="0">${appear(3.6)}<circle cx="335" cy="95" r="44" fill="none" stroke="${SAF}" stroke-width="3"/><line x1="335" y1="95" x2="335" y2="62" stroke="${SAF}" stroke-width="3"><animateTransform attributeName="transform" type="rotate" from="0 335 95" to="-1080 335 95" begin="3.6s" dur="2s" fill="freeze"/></line><text x="335" y="160" text-anchor="middle" font-size="12" fill="${IVO}">ההדפסה: 36 שעות</text><text x="335" y="176" text-anchor="middle" font-size="12" fill="${IVO}">לפני שהמנעול נפתח</text><text x="335" y="205" text-anchor="middle" font-size="13" fill="${RED}">הדליפה עוקפת את המנעול</text></g>`,
    'השאלון המסומן: צילום נעקב, טקסט מוקלד לא נעקב, והנייר מודפס 36 שעות לפני שהמנעול נפתח');
    cap(fig,'בניסוי: 0 מתוך 200 דליפות מוקלדות נעקבו. והחלון בין ההדפסה לבחינה נשאר פתוח.'); });

  // Appeal Clock · falls at ideation: the napkin answers before any product
  set('Appeal Clock Simulator',fig=>{ fig.innerHTML=frame(
    `<rect x="24" y="24" width="372" height="150" rx="8" fill="#efe6d3" transform="rotate(-1.5 210 100)"/>
     <g font-family="Caveat, TD Hebrew, cursive" fill="#2b2620" text-anchor="middle">
      <text x="210" y="62" font-size="20" opacity="0">ערעורים תלויים: 3,700,000${appear(.3)}</text>
      <text x="210" y="96" font-size="20" opacity="0">חלקי 19 בתי דין × ~300 דיונים ביום${appear(1.2)}</text>
      <line x1="80" y1="110" x2="340" y2="110" stroke="#2b2620" stroke-width="2" opacity="0">${appear(2)}</line>
      <text x="210" y="144" font-size="24" fill="${RED}" opacity="0">≈ 650 ימי עבודה${appear(2.4)}</text></g>
     <g opacity="0">${appear(3.3)}${Array.from({length:12},(_,i)=>`<rect x="${40+i*29}" y="190" width="24" height="24" rx="3" fill="${i<4?'#3a3346':'#4b2a2a'}" stroke="#6b6380"/>`).join('')}
      <text x="${40+3*29+12}" y="236" text-anchor="middle" font-size="11" fill="${SAF}">בחירות</text><path d="M${40+3*29+12} 186 L${40+3*29+12} 176" stroke="${SAF}" stroke-width="2"/>
      <text x="300" y="236" text-anchor="middle" font-size="11" fill="${RED}">התור עוד לא נגמר</text></g>`,
    'חישוב על מפית: 3.7 מיליון ערעורים חלקי 19 בתי דין כפול 300 דיונים ביום, בערך 650 ימי עבודה, והבחירות מגיעות קודם');
    cap(fig,'התשובה התקבלה בלי לבנות כלום. מוצר שרק מאשר אותה לא משנה את התור.'); });

  // Duplicate Matcher · falls on the board: another black box, like the one that deleted
  set('Duplicate Voter Matcher',fig=>{ fig.innerHTML=frame(
    `${[0,1].map(k=>`<g transform="translate(${k?235:45} 60)" opacity="${k?0:1}">${k?appear(1.6):''}<rect width="140" height="100" rx="10" fill="#0d0c12" stroke="${k?RED:'#5c5470'}" stroke-width="2"/><text x="70" y="44" text-anchor="middle" font-size="13" fill="${IVO}">${k?'המאתר החדש':'התוכנה שמחקה'}</text><text x="70" y="70" text-anchor="middle" font-size="22" fill="#6b6380">?</text></g>`).join('')}
     <g opacity="0">${appear(.6)}<text x="115" y="190" text-anchor="middle" font-size="13" fill="${IVO}">"נמחק: כפול"</text></g>
     <g opacity="0">${appear(2.2)}<text x="305" y="190" text-anchor="middle" font-size="13" fill="${IVO}">"התאמה 0.91"</text></g>
     <g opacity="0">${appear(3)}<text x="210" y="225" text-anchor="middle" font-size="14" fill="${RED}">עוד קופסה שחורה לא מסבירה כלום</text></g>`,
    'שתי קופסאות שחורות זו ליד זו: התוכנה שמחקה והמאתר החדש, ושתיהן לא מסבירות למה');
    cap(fig,'גם המודל החדש מחליט בשקט שמישהו כפול. ומנועים כאלה כבר קיימים כמוצר מדף.'); });

  // Offline Mesh · falls on the board: risky for users, and the roll stays untouched
  set('Offline Mesh Messenger',fig=>{ fig.innerHTML=frame(
    `${[[70,80],[150,50],[150,130],[230,90]].map(([x,y],i)=>`<g transform="translate(${x} ${y})"><rect x="-14" y="-24" width="28" height="48" rx="5" fill="#2a2733" stroke="#5c5470"/><g opacity="0">${appear(1.6+i*.3)}<circle cy="-34" r="11" fill="${RED}"/><text y="-30" text-anchor="middle" font-size="13" fill="#fff">!</text></g></g>`).join('')}
     <g stroke="${NAV}" stroke-width="2" stroke-dasharray="4 4" opacity="0">${appear(.5)}<line x1="84" y1="78" x2="136" y2="54"/><line x1="84" y1="84" x2="136" y2="128"/><line x1="164" y1="54" x2="216" y2="86"/><line x1="164" y1="128" x2="216" y2="94"/></g>
     <g opacity="0">${appear(2.9)}<text x="150" y="205" text-anchor="middle" font-size="13" fill="${RED}">כל משתמש חשוף לסיכון משפטי</text></g>
     <g transform="translate(330 70)"><rect x="-40" y="0" width="80" height="100" rx="6" fill="#3a2a2a" stroke="#6b5040"/><text y="40" text-anchor="middle" font-size="12" fill="${IVO}">הרשימה</text><text y="60" text-anchor="middle" font-size="11" fill="#a89e8a">130 מיליון</text><g opacity="0">${appear(3.6)}<text y="130" text-anchor="middle" font-size="12" fill="${SAF}">לא נגעה בה</text></g></g>`,
    'טלפונים שמתחברים בלי אינטרנט, סימני אזהרה משפטית על כל אחד, והרשימה בצד בלי שינוי');
    cap(fig,'הרשת עוקפת את הניתוק, אבל מסכנת את מי שמשתמש בה. ובשמות שנמחקו היא לא נוגעת.'); });

  // Degree-to-Job Radar · falls on the board: most work is never recorded
  set('Degree-to-Job Radar',fig=>{ fig.innerHTML=frame(
    `${tx(210,30,'איפה עובדים בוגרי התארים?',IVO,13)}
     <g>${Array.from({length:60},(_,i)=>{ const x=40+(i%12)*28, y=55+Math.floor(i/12)*26; const rec=i%5===0; return `<circle cx="${x}" cy="${y}" r="7" fill="${rec?GRN:'#3a3346'}" opacity="0">${appear(.2+i*.03,.3)}</circle>`; }).join('')}</g>
     <g opacity="0">${appear(2.4)}<rect x="40" y="200" width="${340*.2}" height="18" fill="${GRN}"/><rect x="${40+340*.2}" y="200" width="${340*.8}" height="18" fill="#3a3346"/>
      <text x="${40+340*.1}" y="236" text-anchor="middle" font-size="11" fill="${GRN}">נרשם</text><text x="${40+340*.6}" y="236" text-anchor="middle" font-size="11" fill="${RED}">לא נרשם בשום מקום (בקירוב)</text></g>`,
    'שישים נקודות: רק מעטות מסומנות כמשרה רשומה, ורוב התעסוקה לא נרשמת');
    cap(fig,'מפה יפה של מה שבמקרה נמדד, ושקט בדיוק איפה שרוב האנשים עובדים. (היחס להמחשה.)'); });
})();
