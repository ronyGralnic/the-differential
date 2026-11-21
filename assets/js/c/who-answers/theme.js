/* Case 06 · who-answers · themed backdrops (engine: case-theme.js) and animated fall figures (engine: reel-fx.js, cut.anim).
   Theme: a city of dark windows at night. Thousands of windows, one or two light up when a phone rings; ringing waves,
   a scatter of polling errors like chart 1 of the report, a likely-voter dial, ballot boxes, and the street below.
   Everything decorative, dark and quiet behind the text. */
(function(){
  const GOLD='#e0b45a', SKY='#6f8fc4', IVO='#e8e2d0', RED='#d8553a', TEAL='#4fb3a2', DIM='#8a93a8';
  const windows=(cols,rows,lit)=>`<svg viewBox="0 0 ${cols*22+20} ${rows*26+20}">${Array.from({length:cols*rows},(_,i)=>{ const x=10+(i%cols)*22, y=10+Math.floor(i/cols)*26, on=lit.includes(i);
    return `<rect x="${x}" y="${y}" width="14" height="18" rx="2" fill="${on?GOLD:'#1a2030'}" stroke="#262d40" opacity="${on?.95:.8}">${on?`<animate attributeName="opacity" values=".2;.95;.95;.2" dur="${5+i%4}s" repeatCount="indefinite"/>`:''}</rect>`; }).join('')}</svg>`;
  const ring=()=>`<svg viewBox="0 0 160 160"><rect x="66" y="58" width="28" height="46" rx="5" fill="#1c2233" stroke="${IVO}" stroke-width="2"/><circle cx="80" cy="96" r="3" fill="${GOLD}"/>${[0,1,2].map(i=>`<circle cx="80" cy="80" r="${36+i*18}" fill="none" stroke="${SKY}" stroke-width="2" opacity="0"><animate attributeName="opacity" values="0;.6;0" dur="3s" begin="${i*.6}s" repeatCount="indefinite"/><animate attributeName="r" values="${30+i*18};${44+i*18}" dur="3s" begin="${i*.6}s" repeatCount="indefinite"/></circle>`).join('')}</svg>`;
  const scatter=()=>`<svg viewBox="0 0 600 160"><line x1="10" y1="140" x2="590" y2="140" stroke="${DIM}" opacity=".5"/>${Array.from({length:110},(_,i)=>{ const x=14+i*5.2, y=140-(((i*37)%13)+((i*11)%7))*5.6*(i>80?.7:1); return `<circle cx="${x.toFixed(0)}" cy="${Math.max(20,y).toFixed(0)}" r="2.4" fill="${RED}" opacity=".55"/>`; }).join('')}<path d="M10 112 C160 108 300 104 420 110 S560 118 590 120" fill="none" stroke="${RED}" stroke-width="3" opacity=".9"/></svg>`;
  const dial=()=>`<svg viewBox="0 0 220 130"><path d="M20 120 A90 90 0 0 1 200 120" fill="none" stroke="#262d40" stroke-width="14" stroke-linecap="round"/><path d="M150 44 A90 90 0 0 1 200 120" fill="none" stroke="${GOLD}" stroke-width="14" stroke-linecap="round" opacity=".6"/>${Array.from({length:10},(_,i)=>{ const a=Math.PI-(i+.5)*Math.PI/10; return `<text x="${(110+72*Math.cos(a)).toFixed(0)}" y="${(124-72*Math.sin(a)).toFixed(0)}" fill="${DIM}" font-size="11" text-anchor="middle" font-family="IBM Plex Mono, monospace">${i+1}</text>`; }).join('')}<line x1="110" y1="120" x2="110" y2="56" stroke="${RED}" stroke-width="4" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" values="-50 110 120;60 110 120;35 110 120;60 110 120;-50 110 120" dur="9s" repeatCount="indefinite"/></line><circle cx="110" cy="120" r="7" fill="${RED}"/></svg>`;
  const ballot=(t)=>`<svg viewBox="0 0 120 110"><rect x="14" y="44" width="92" height="58" rx="5" fill="#1c2233" stroke="${IVO}" stroke-width="2"/><rect x="40" y="40" width="40" height="6" fill="${GOLD}"/><rect x="46" y="8" width="28" height="34" rx="2" fill="#efe6d3"><animateTransform attributeName="transform" type="translate" values="0,0;0,30;0,30" dur="4s" repeatCount="indefinite"/></rect><text x="60" y="84" fill="${DIM}" font-size="13" text-anchor="middle" font-family="TD Hebrew, sans-serif">${t}</text></svg>`;
  const pct=()=>`<svg viewBox="0 0 200 90"><rect x="4" y="10" width="192" height="70" rx="8" fill="#121826" stroke="${DIM}"/><text x="100" y="58" fill="${GOLD}" font-size="34" text-anchor="middle" font-family="IBM Plex Mono, monospace">1-2%</text></svg>`;
  const street=()=>`<svg viewBox="0 0 1060 150" preserveAspectRatio="none"><path d="M0 150 V96 h50 v-40 h70 v40 h40 v-70 h60 v70 h30 v-24 h80 v24 h20 v-90 h70 v90 h40 v-50 h60 v50 h50 v-34 h90 v34 h40 v-80 h60 v80 h30 v-30 h70 v30 h60 v-60 h50 v60 h40 V150z" fill="#0b0e18"/>${Array.from({length:60},(_,i)=>`<rect x="${12+i*17.5}" y="${104+(i%3)*12}" width="6" height="7" fill="${[7,23,41].includes(i)?GOLD:'#1a2030'}" opacity=".9"/>`).join('')}</svg>`;
  const stars=()=>`<svg viewBox="0 0 600 200">${Array.from({length:40},(_,i)=>`<circle cx="${(i*137)%600}" cy="${(i*71)%200}" r="${i%5===0?1.6:1}" fill="${IVO}" opacity="${.3+(i%4)*.15}"/>`).join('')}</svg>`;
  window.CASE_THEME=window.CASE_THEME||{};
  window.CASE_THEME['who-answers']={
    reel:{bg:'radial-gradient(120% 70% at 85% 0%, rgba(111,143,196,.14), transparent 55%), radial-gradient(110% 60% at 10% 100%, rgba(224,180,90,.10), transparent 60%), linear-gradient(#0b0f1c, #07080e 70%)',
      items:[
        {svg:stars(),at:0,x:'0%',y:'0%',w:620,op:.55,depth:-10,cls:'wide'},
        {svg:windows(12,8,[17,70]),at:0,x:'66%',y:'4%',w:300,op:.35,depth:50},
        {svg:ring(),at:.08,x:'4%',y:'16%',w:150,op:.45,depth:90,cls:'float'},
        {svg:pct(),at:.18,x:'82%',y:'34%',w:150,op:.35,depth:140,cls:'float'},
        {svg:scatter(),at:.3,x:'3%',y:'44%',w:560,op:.32,depth:60,cls:'wide'},
        {svg:dial(),at:.44,x:'58%',y:'58%',w:220,op:.35,depth:120},
        {svg:ballot('קלפי'),at:.56,x:'4%',y:'66%',w:100,op:.32,depth:100,cls:'float'},
        {svg:windows(9,5,[31]),at:.7,x:'70%',y:'76%',w:220,op:.35,depth:40},
        {svg:street(),at:.85,x:'0%',y:'86%',w:1060,op:.6,cls:'wide'}]},
    sky:{bg:'radial-gradient(90% 40% at 50% 100%, rgba(224,180,90,.12), transparent 70%), radial-gradient(60% 40% at 15% 15%, rgba(111,143,196,.16), transparent 70%), linear-gradient(#090c18, #0e1322 60%, #131929)',
      items:[
        {svg:stars(),at:0,x:'0%',y:'0%',w:620,op:.7,cls:'wide'},
        {svg:windows(12,8,[17,70]),at:0,x:'72%',y:'3%',w:220,op:.22},
        {svg:scatter(),at:.1,x:'8%',y:'10%',w:480,op:.25,depth:40,cls:'drift'},
        {svg:ring(),at:.25,x:'52%',y:'26%',w:140,op:.3,depth:60,cls:'float'},
        {svg:pct(),at:.38,x:'4%',y:'40%',w:130,op:.26,depth:80,cls:'float'},
        {svg:dial(),at:.5,x:'24%',y:'52%',w:200,op:.24},
        {svg:ballot('2026'),at:.65,x:'6%',y:'66%',w:90,op:.3,depth:50},
        {svg:street(),at:.85,x:'0%',b:'0%',w:1060,op:.6,cls:'wide'}]}
  };

  /* ---------- animated falls (cut.anim) ---------- */
  const FX=window.REEL_FX||{};
  const frame=(inner,label)=>`<svg viewBox="0 0 420 250" role="img" aria-label="${label}"><rect x="4" y="4" width="412" height="242" rx="12" fill="#121522" stroke="#323a52"/>${inner}</svg>`;
  const tx=(x,y,s,c,sz,extra)=>`<text x="${x}" y="${y}" fill="${c||IVO}" font-size="${sz||13}" text-anchor="middle" font-family="TD Hebrew, sans-serif" ${extra||''}>${s}</text>`;
  const appear=(b,d)=>`<animate attributeName="opacity" from="0" to="1" begin="${b}s" dur="${d||.5}s" fill="freeze"/>`;
  const cap=(fig,t)=>{ const p=document.createElement('p'); p.className='ct-cap'; p.style.cssText='text-align:center;margin:4px 0 0;font-size:14px;color:#c8cbd6;line-height:1.6'; p.textContent=t; fig.append(p); };
  const set=(name,fn)=>{ if(FX[name]&&FX[name].cut) FX[name].cut.anim=fn; };

  // Turnout Signal · falls at architecture: the voter file sits outside the lot, and in most countries it does not exist
  set('Turnout Signal',fig=>{ fig.innerHTML=frame(
    `${tx(210,28,'מאיפה מגיע קובץ הבוחרים?',IVO,13)}
     <rect x="150" y="48" width="250" height="150" rx="6" fill="none" stroke="${SKY}" stroke-dasharray="6 5"/>${tx(275,66,'בתוך הגבולות',SKY,11)}
     ${[['התאמה',210,100],['מודל',290,100],['שקלול',370,100],['דוח',290,160]].map(([t,x,y])=>`<rect x="${x-34}" y="${y-16}" width="68" height="32" rx="4" fill="#1c2233" stroke="${IVO}"/>${tx(x,y+5,t,IVO,12)}`).join('')}
     <rect x="20" y="84" width="100" height="56" rx="6" fill="#1c2233" stroke="${RED}" stroke-width="2"/>${tx(70,108,'קובץ',RED,12)}${tx(70,126,'בוחרים',RED,12)}
     <path d="M120 112 H176" stroke="${RED}" stroke-width="2" stroke-dasharray="4 4"/>
     <g opacity="0">${appear(1.2)}${[['ארה"ב','✓',TEAL],['ברזיל','✗',RED],['צרפת','✗',RED],['ספרד','✗',RED]].map(([c,m,col],i)=>tx(70,166+i*18,c+' '+m,col,12)).join('')}</g>
     <g opacity="0">${appear(2.4)}${tx(290,226,'ומי שלא הצביע קודם, ובא עכשיו?',GOLD,12)}</g>`,
    'שרטוט: המערכת בתוך גבולות, וקובץ הבוחרים מחוצה להם; רק בארה"ב יש קובץ, ובברזיל, צרפת וספרד לא');
    cap(fig,'הלב של המודל יושב מחוץ לגבולות, ובמרבית המדינות הוא בכלל לא קיים. ומי שבא בפעם הראשונה, אין לו היסטוריה.'); });

  // Synthetic Respondents · falls at POC: perfect in a steady year, blind in a year that moves
  set('Synthetic Respondents',fig=>{ fig.innerHTML=frame(
    `${tx(210,28,'2024 מול 2026 (בקירוב, מהמעבדה)',IVO,13)}
     <line x1="40" y1="200" x2="380" y2="200" stroke="${DIM}"/>
     <path d="M40 140 L380 140" stroke="${SKY}" stroke-width="3" stroke-dasharray="8 6"/>${tx(330,130,'הסינתטי: כמו 2024',SKY,12)}
     <path d="M40 140 L200 140 L380 82" stroke="${GOLD}" stroke-width="3" fill="none" stroke-dasharray="400" stroke-dashoffset="400"><animate attributeName="stroke-dashoffset" to="0" begin=".6s" dur="1.6s" fill="freeze"/></path>
     <g opacity="0">${appear(2.2)}${tx(300,70,'האמת: 2026 זזה',GOLD,12)}<line x1="380" y1="86" x2="380" y2="136" stroke="${RED}" stroke-width="3"/>${tx(396,116,'4.8',RED,12)}</g>
     <g opacity="0">${appear(3.2)}${tx(210,228,'כדי לתקן: 8,544 אנשים אמיתיים',RED,12)}</g>`,
    'קו מקווקו של הסינתטי נשאר שטוח כמו 2024, וקו האמת עולה ב-2026; הפער 4.8 נקודות');
    cap(fig,'מראה שמראה את הפנים של אתמול. ובשנה שבה משהו זז, היא מדויקת בדיוק בדבר הלא נכון.'); });

  // Panel Sentinel · falls at ideation: a clean panel is still the people who chose to join
  set('Panel Sentinel',fig=>{ fig.innerHTML=frame(
    `${tx(210,28,'לפני ניקוי, אחרי ניקוי, ומי לא שם בכלל',IVO,13)}
     ${Array.from({length:24},(_,i)=>`<circle cx="${50+(i%8)*22}" cy="${70+Math.floor(i/8)*24}" r="8" fill="${[3,11,18].includes(i)?RED:TEAL}"><animate attributeName="opacity" to="0" begin="${[3,11,18].includes(i)?1.2:99}s" dur=".5s" fill="freeze"/></circle>`).join('')}
     ${tx(127,160,'נוקו 3 מתוך 24',IVO,12)}
     <line x1="240" y1="50" x2="240" y2="200" stroke="#323a52"/>
     ${Array.from({length:6},(_,i)=>`<circle cx="${280+(i%3)*36}" cy="${84+Math.floor(i/3)*40}" r="10" fill="none" stroke="${GOLD}" stroke-dasharray="3 3" opacity="0">${appear(2+i*.15)}</circle>`).join('')}
     <g opacity="0">${appear(3)}${tx(316,180,'מי שלא נרשם',GOLD,12)}${tx(210,222,'נקי, ועדיין חסר',RED,13)}</g>`,
    'פאנל של עיגולים שחלקם נמחקים בניקוי, ולידו עיגולים מקווקווים של מי שלא נרשם בכלל');
    cap(fig,'הניקוי מוציא את מי שענה רע. הוא לא מכניס את מי שלא ענה.'); });

  // Herding Detector · on the board: everyone close to the average, and the average far from the truth
  set('Herding Detector',fig=>{ fig.innerHTML=frame(
    `<line x1="30" y1="100" x2="390" y2="100" stroke="${SKY}" stroke-dasharray="5 5"/>${tx(360,92,'ממוצע',SKY,11)}
     ${Array.from({length:9},(_,i)=>{ const y0=50+((i*37)%100); return `<circle cx="${50+i*38}" cy="${y0}" r="7" fill="${GOLD}"><animate attributeName="cy" to="100" begin=".5s" dur="1.2s" fill="freeze"/></circle>`; }).join('')}
     <g opacity="0">${appear(2)}<line x1="30" y1="180" x2="390" y2="180" stroke="${RED}" stroke-width="2"/>${tx(210,172,'התוצאה',RED,12)}${tx(210,222,'הגלאי רואה שכולם דומים. לא למה כולם טעו.',IVO,12)}</g>`,
    'נקודות מתכנסות לקו הממוצע, והתוצאה האמיתית בקו אחר');
    cap(fig,'ב-2026 כולם פספסו את אותם מצביעים. הגלאי היה מראה שהם דומים, ולא מה חסר.'); });

  // Social Listener · on the board: who writes is not who votes
  set('Social Listener',fig=>{ fig.innerHTML=frame(
    `${tx(210,28,'מי כותב ברשת, ומי מצביע (המחשה)',IVO,13)}
     ${Array.from({length:30},(_,i)=>`<rect x="${40+(i%10)*20}" y="${50+Math.floor(i/10)*22}" width="14" height="14" rx="3" fill="${i<4?GOLD:'#2a3146'}"/>`).join('')}${tx(130,134,'כמה כותבים הרבה',IVO,11)}
     <g opacity="0">${appear(1.4)}<text x="330" y="96" font-size="34" text-anchor="middle">🤖</text>${tx(330,134,'וחלקם בוטים',RED,11)}</g>
     <g opacity="0">${appear(2.6)}${tx(210,190,'אי אפשר לדעת מי הוא, איפה גר, ואם יצביע',RED,12)}${tx(210,214,'1936, בגרסת 2026',DIM,12)}</g>`,
    'רשת של ריבועים שרק מעטים מהם מוארים, ובוט');
    cap(fig,'מי שצועק הכי חזק בגלריה הוא לא כל האולם.'); });

  // Market Blend · on the board: the market reads the polls
  set('Market Blend',fig=>{ fig.innerHTML=frame(
    `<rect x="50" y="80" width="110" height="64" rx="8" fill="#1c2233" stroke="${IVO}"/>${tx(105,118,'סקר',IVO,14)}
     <rect x="260" y="80" width="110" height="64" rx="8" fill="#1c2233" stroke="${IVO}"/>${tx(315,118,'שוק',IVO,14)}
     <path d="M162 96 Q210 50 258 96" stroke="${GOLD}" stroke-width="2.5" fill="none" stroke-dasharray="120" stroke-dashoffset="120"><animate attributeName="stroke-dashoffset" to="0" dur="1s" fill="freeze"/></path>
     <path d="M258 128 Q210 174 162 128" stroke="${RED}" stroke-width="2.5" fill="none" stroke-dasharray="120" stroke-dashoffset="120"><animate attributeName="stroke-dashoffset" to="0" begin="1.1s" dur="1s" fill="freeze"/></path>
     <g opacity="0">${appear(2.3)}${tx(210,214,'מיזוג של סקר עם מי שקורא סקר',RED,12)}</g>`,
    'סקר ושוק, וחצים שהולכים וחוזרים ביניהם');
    cap(fig,'הלוויתן של 2024 הזמין סקר פרטי. השוק לא מחליף את הסקר. הוא קורא אותו.'); });
})();
