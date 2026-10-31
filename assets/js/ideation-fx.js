/* Fire-Sale ideation, upgraded: "from the field" clipping, Sarah opens, a two-layer mechanism with an amplification meter and
   two endings, persona profiles with before/after, a guess on the map, a pre-mortem instead of flip cards, richer downloads. */
(function(){
  const root=document.querySelector('.ix[data-ix="fire-sale"]'); if(!root) return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const H=(t,c,x)=>{ const e=document.createElement(t); if(c) e.className=c; if(x!=null) e.textContent=x; return e; };
  const secBy=k=>[...root.querySelectorAll('.ix-sec')].find(s=>{ const p=s.querySelector('.ix-kicker'); return p&&p.textContent.startsWith(k); });
  const T=(x,y,s,c,a)=>`<text x="${x}" y="${y}" class="${c||'fx-t'}" text-anchor="${a||'middle'}">${s}</text>`;

  /* 1 · from the field + Sarah opens */
  const hero=root.querySelector('.ix-hero');
  const field=H('section','fx-field'); field.append(H('p','ix-kicker','מהשטח'));
  const P=[[0,3.5],[1,3.6],[2,3.75],[3,4.3],[4,4.5],[5,5.0],[6,4.0],[7,3.9],[8,3.95]]; const X=i=>40+i*32, Y=v=>150-(v-3)*55;
  const clip=H('div','fx-clips');
  clip.innerHTML=`<figure class="fx-clip"><svg viewBox="0 0 320 180" role="img" aria-label="התשואה הבריטית ל-30 שנה בספטמבר 2022: זינוק מ-3.5% ל-5%, וירידה אחרי שהבנק המרכזי התערב">
     ${T(160,18,'בריטניה, אג"ח ל-30 שנה, ספטמבר 2022 (בקירוב)','fx-th')}
     ${[3,4,5].map(v=>`<line x1="36" x2="310" y1="${Y(v)}" y2="${Y(v)}" class="fx-gl"/>${T(32,Y(v)+4,v+'%','fx-t dim','start')}`).join('')}
     <polyline points="${P.map(([i,v])=>X(i)+','+Y(v)).join(' ')}" class="fx-line"/>
     <circle cx="${X(3)}" cy="${Y(4.3)}" r="5" class="fx-dot"/>${T(X(3)-4,Y(4.3)-12,'23.9: התקציב','fx-t hot','start')}
     <circle cx="${X(6)}" cy="${Y(4)}" r="5" class="fx-dot ok"/>${T(X(6)+4,Y(4)+22,'28.9: הבנק המרכזי קונה','fx-t ok','end')}</svg><figcaption>הגזיר: חמישה ימים שבהם הריבית קפצה כמו שלא קפצה עשרות שנים. נתוני שוק ציבוריים, בקירוב.</figcaption></figure>
   <figure class="fx-clip"><svg viewBox="0 0 320 180" role="img" aria-label="SVB, מרץ 2023: 48 שעות מהודעה על הפסד ועד סגירת הבנק">
     ${T(160,18,'SVB, מרץ 2023: 48 שעות','fx-th')}<line x1="34" y1="96" x2="290" y2="96" class="fx-ax"/>
     ${[['8.3','הודעה על הפסד',266],['9.3','המפקידים בורחים',162],['10.3','הבנק נסגר',58]].map(([d,l,x],i)=>`<circle cx="${x}" cy="96" r="9" class="fx-dot ${i===2?'':'warn'}"/>${T(x,74,d,'fx-t')}${T(x,124,l,'fx-t '+(i===2?'hot':''))}`).join('')}
     ${T(160,162,'שנה אחרי בריטניה, אותו סיפור בבנק אחד','fx-t dim')}</svg><figcaption>הגזיר השני: בנק שקנה אג"ח כשהריבית הייתה נמוכה, והפסד שהתגלה בבת אחת.</figcaption></figure>`;
  field.append(clip);
  const sarah=H('div','fx-sarah'); sarah.innerHTML='<span class="fx-av" aria-hidden="true"><svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="28" fill="#e4efec"/><path d="M14 26 q2 -16 16 -16 q14 0 16 16 q-4 -6 -16 -6 q-12 0 -16 6z" fill="#8a5a3b"/><circle cx="30" cy="30" r="12" fill="#f2d2b6"/><circle cx="26" cy="29" r="1.6" fill="#1e2422"/><circle cx="34" cy="29" r="1.6" fill="#1e2422"/><path d="M26 35 q4 3 8 0" stroke="#1e2422" stroke-width="1.6" fill="none"/><path d="M12 58 q4 -14 18 -14 q14 0 18 14z" fill="#2f6f68"/><rect x="22" y="26" width="7" height="5" rx="2" fill="none" stroke="#1e2422" stroke-width="1.2"/><rect x="31" y="26" width="7" height="5" rx="2" fill="none" stroke="#1e2422" stroke-width="1.2"/></svg></span>';
  const st=H('div'); st.append(H('span','fx-k','שרה פותחת (דמות בדויה)'),H('p','','קוראים לי שרה, ואני מורה למתמטיקה במנצ\'סטר. ב-23 בספטמבר 2022 קרן הפנסיה שלי קיבלה שיחה: להוסיף ביטחונות עד מחר. עד הצהריים היא כבר מכרה אג"ח, ביחד עם עשרות קרנות אחרות, ואף אחד לא ראה את זה מגיע. האם מישהו יכול היה לראות?')); sarah.append(st); field.append(sarah);
  root.insertBefore(field,hero);

  /* 2 · mechanism: icons, two captions, amplification meter, two endings */
  const oldM=secBy('איך זה עובד');
  if(oldM){
    const s=H('section','ix-sec fx-mech'); s.append(H('p','ix-kicker','איך זה עובד'));
    const box=H('div','fx-mbox');
    const ICO={
     R:'<path d="M-14 10 L14 -14" class="fx-ic hot"/><path d="M2 -15 L15 -15 L15 -2" class="fx-ic hot"/>',
     P:'<rect x="-12" y="-16" width="24" height="32" rx="3" class="fx-ic"/><line x1="-6" y1="-6" x2="6" y2="-6" class="fx-ic"/><line x1="-6" y1="2" x2="4" y2="2" class="fx-ic"/><path d="M14 4 L14 18 M9 13 L14 18 L19 13" class="fx-ic hot"/>',
     F:'<path d="M-18 -4 L0 -18 L18 -4 Z" class="fx-ic"/><rect x="-15" y="-4" width="30" height="20" class="fx-ic"/><circle cx="0" cy="6" r="4" class="fx-ic-f"/>',
     S:'<rect x="-16" y="-10" width="32" height="20" rx="3" class="fx-ic hot"/><text x="0" y="5" text-anchor="middle" class="fx-sale">מכירה</text>',
     B:'<path d="M-16 -6 L0 -18 L16 -6 Z" class="fx-ic ok"/><rect x="-13" y="-6" width="26" height="20" class="fx-ic ok"/><line x1="-6" y1="-2" x2="-6" y2="12" class="fx-ic ok"/><line x1="6" y1="-2" x2="6" y2="12" class="fx-ic ok"/>'};
    const MOB=innerWidth<700;
    const N=MOB?{R:[290,48,'ריבית עולה'],P:[290,180,'מחיר האג"ח יורד'],F:[185,300,'קרן ממונפת: דרישת ביטחונות'],S:[80,180,'מכירה כפויה'],B:[80,48,'בנק מרכזי']}
               :{R:[560,50,'ריבית עולה'],P:[560,170,'מחיר האג"ח יורד'],F:[350,170,'קרן ממונפת: דרישת ביטחונות'],S:[350,50,'מכירה כפויה'],B:[140,50,'בנק מרכזי']};
    const E=[['R','P'],['P','F'],['F','S'],['S','P'],['B','S']];
    let svg=`<svg viewBox="${MOB?'0 0 360 450':'0 0 700 290'}" class="fx-msvg${MOB?' mob':''}" role="img" aria-label="מנגנון המכירות הכפויות, שלב אחר שלב"><defs><marker id="fxa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="12" markerHeight="12" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="fx-mk"/></marker></defs>`;
    const pos=k=>N[k];
    E.forEach(([a,b],i)=>{ const [x1,y1]=pos(a),[x2,y2]=pos(b); const dx=x2-x1, dy=y2-y1, L=Math.hypot(dx,dy), ux=dx/L, uy=dy/L;
      const bend=(!MOB&&a==='S'&&b==='P')?' Q455 120 ':' L '; const sx=x1+ux*38, sy=y1+uy*30, ex=x2-ux*42, ey=y2-uy*32;
      svg+=`<path d="M${sx} ${sy}${bend==' L '?' L ':bend}${ex} ${ey}" class="fx-e" data-e="${i}" marker-end="url(#fxa)"/>`; });
    Object.entries(N).forEach(([k,[x,y,l]])=>{ svg+=`<g class="fx-n" data-n="${k}" transform="translate(${x} ${y})"><circle r="30" class="fx-nb"/>${ICO[k]}<text y="52" text-anchor="middle" class="fx-nl">${l}</text></g>`; });
    svg+=`<g class="fx-funds">${Array.from({length:6},(_,i)=>`<g class="fx-fund" data-i="${i}" transform="translate(${MOB?55+i*50:60+i*48} ${MOB?400:252})"><rect x="-12" y="-22" width="24" height="22" rx="2" class="fx-ic"/><path d="M-14 -22 L0 -32 L14 -22" class="fx-ic"/></g>`).join('')}<text x="${MOB?180:190}" y="${MOB?432:284}" text-anchor="middle" class="fx-nl dim">קרנות בשוק</text></g>`;
    svg+=`<g class="fx-meter" transform="translate(${MOB?185:640} ${MOB?140:160}) scale(${MOB?.72:1})"><rect x="-14" y="-100" width="28" height="150" rx="14" class="fx-mt"/><rect x="-9" y="45" width="18" height="0" rx="9" class="fx-mf"/><text y="74" text-anchor="middle" class="fx-mv">0.60</text><text y="92" text-anchor="middle" class="fx-nl dim">מד הגברה</text></g></svg>`;
    box.innerHTML=svg;
    const bar=H('div','fx-mbar'); const n=H('span','fx-mstep','1'); const cap=H('div','fx-mcap'); cap.setAttribute('aria-live','polite'); const c1=H('p','fx-c1'), c2=H('p','fx-c2'); cap.append(c1,c2);
    const ctr=H('div','fx-mctl'); const pv=H('button','fx-b','‹'), nx=H('button','fx-b go','הצעד הבא ›'); pv.type=nx.type='button'; pv.setAttribute('aria-label','צעד קודם'); ctr.append(pv,nx);
    const alt=H('button','fx-alt','ומה אם הבנק המרכזי לא מתערב?'); alt.type='button'; alt.hidden=true;
    bar.append(n,cap,ctr); box.append(bar,alt);
    s.append(box); s.append(H('p','fx-note','הצבע הזהוב מסמן מה פעיל עכשיו. המספרים במד ההגברה לקוחים מהרצת ה-POC: זעזוע של 0.6 נקודת אחוז, 60 קרנות מדומות.'));
    oldM.replaceWith(s);
    const ST=[
     {on:['R'],e:[],a:'הריבית עולה ב-0.6 נקודת אחוז, כמו ביום שאחרי התקציב הבריטי.',b:'שרה: "עוד לא קרה כלום לקרן שלי. רק המספר בחדשות זז."',m:.6},
     {on:['R','P'],e:[0],a:'מחירי האג"ח יורדים, כי אג"ח חדשות משלמות עכשיו יותר.',b:'שרה: "האג"ח שהקרן שלי מחזיקה שוות פחות, בלי שמישהו מכר משהו."',m:.6},
     {on:['P','F'],e:[1],a:'קרן שעובדת עם כסף מושאל מקבלת דרישה: להוסיף ביטחונות עד מחר.',b:'שרה: "זו השיחה של הבוקר ההוא."',m:.6,f:[0]},
     {on:['F','S'],e:[2],a:'אין לה מזומן, אז היא מוכרת אג"ח. וכמוה עוד עשרות קרנות, באותו יום.',b:'שרה: "הקרן שלי מוכרת, ביחד עם כל השאר. וכולם מוכרים לאותם קונים."',m:.75,f:[0,1]},
     {on:['S','P','F'],e:[3,1],a:'המכירה מורידה את המחיר עוד, והקרן הבאה בתור מקבלת דרישה משלה.',b:'שרה: "עכשיו גם קרנות שהיו בסדר בבוקר נכנסות לסבב."',m:.9,f:[0,1,2]},
     {on:['B','S'],e:[4],a:'בנק מרכזי קונה חלק ממה שנמכר. יש קונה, המחיר מפסיק לצנוח, והמעגל נשבר.',b:'שרה: "ב-28 בספטמבר זה בדיוק מה שקרה. הזעזוע נעצר ב-0.78."',m:.78,f:[0,1,2],ok:true}];
    const ALT=[
     {on:['S','P','F'],e:[3,1,2],a:'בלי קונה גדול, הלולאה ממשיכה: מכירה, ירידת מחיר, עוד דרישה, עוד מכירה.',b:'שרה: "וכל סבב תופס עוד קרנות."',m:1.02,f:[0,1,2,3,4]},
     {on:['S','P','F'],e:[3,1,2],a:'בסוף המפל הזעזוע הוא 1.13 במקום 0.6: כמעט פי 2, רק בגלל המכירות.',b:'שרה: "הזעזוע הראשון היה קטן. השרשרת הפכה אותו לגדול."',m:1.13,f:[0,1,2,3,4,5],hot:true}];
    let cur=0, seq=ST;
    const nodes=s.querySelectorAll('.fx-n'), edges=s.querySelectorAll('.fx-e'), funds=s.querySelectorAll('.fx-fund'), mf=s.querySelector('.fx-mf'), mv=s.querySelector('.fx-mv');
    function go(i){ cur=i; const x=seq[i];
      nodes.forEach(g=>g.classList.toggle('on',x.on.includes(g.dataset.n))); edges.forEach(e=>e.classList.toggle('on',x.e.includes(+e.dataset.e)));
      funds.forEach(f=>f.classList.toggle('fell',(x.f||[]).includes(+f.dataset.i)));
      const h=Math.min(140,(x.m/1.2)*140); mf.setAttribute('y',45-h); mf.setAttribute('height',h); mf.classList.toggle('hot',x.m>1); mf.classList.toggle('ok',!!x.ok); mv.textContent=x.m.toFixed(2);
      n.textContent=(seq===ALT?'ב':'')+(i+1); c1.textContent=x.a; c2.textContent=x.b;
      pv.disabled=(i===0&&seq===ST); nx.disabled=(i===seq.length-1); nx.textContent=i===seq.length-1?'סוף':'הצעד הבא ›';
      alt.hidden=!(seq===ST&&i===ST.length-1); if(seq===ALT&&i===ALT.length-1){ alt.hidden=false; alt.textContent='לחזור לסוף שבו הבנק המרכזי מתערב'; } }
    nx.addEventListener('click',()=>{ if(cur<seq.length-1) go(cur+1); });
    pv.addEventListener('click',()=>{ if(cur>0) go(cur-1); else if(seq===ALT){ seq=ST; go(ST.length-1); } });
    alt.addEventListener('click',()=>{ if(seq===ST){ seq=ALT; alt.textContent='ומה אם הבנק המרכזי לא מתערב?'; go(0); } else { seq=ST; alt.textContent='ומה אם הבנק המרכזי לא מתערב?'; go(ST.length-1); } });
    go(0);
  }

  /* 3 · who needs it: profiles with before / after */
  const oldA=secBy('מי צריך את זה');
  if(oldA){
    const s=H('section','ix-sec fx-aud'); s.append(H('p','ix-kicker','מי צריך את זה'),H('p','fx-sub','שלוש דמויות בדויות, ושלושה בקרים: בלי הכלי ועם הכלי.'));
    const face=(hair,skin,shirt,acc)=>`<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="28" fill="#f3ecd8"/><circle cx="30" cy="27" r="12" fill="${skin}"/><path d="M17 25 q1 -15 13 -15 q13 0 13 15 q-4 -6 -13 -6 q-9 0 -13 6z" fill="${hair}"/><circle cx="26" cy="27" r="1.5" fill="#1e2422"/><circle cx="34" cy="27" r="1.5" fill="#1e2422"/><path d="M26 33 q4 2.5 8 0" stroke="#1e2422" stroke-width="1.5" fill="none"/><path d="M12 58 q4 -16 18 -16 q14 0 18 16z" fill="${shirt}"/>${acc||''}</svg>`;
    const PP=[
     ['אמה ריד, 38','אנליסטית ברשות פיקוח פיננסי',face('#4a2f22','#e9c6a8','#2f5d8a'),'"אני קוראת כל בוקר שחדלות הפירעון עולות. מה שאני לא יודעת זה מי ייפול ראשון."','קוראת שחדלות הפירעון באשראי הפרטי עולות, ונשארת עם תחושת בטן ושאלה שאין לה תשובה.','תוך שעה יש לה מפה: איזה סוג קרנות יגיע ראשון למכירה כפויה, ובאיזה טווח של תרחישים.'],
     ['פרופ\' דניאל אורן, 54','מרצה לכלכלה פיננסית',face('#9a9a9a','#e2b896','#7a3b8f','<rect x="21" y="24" width="8" height="6" rx="2" fill="none" stroke="#1e2422" stroke-width="1.2"/><rect x="31" y="24" width="8" height="6" rx="2" fill="none" stroke="#1e2422" stroke-width="1.2"/>'),'"הסטודנטים שלי מבינים משוואה. הם לא מרגישים אותה."','מסביר מכירות כפויות במשוואה על הלוח, ורואה עיניים מזוגגות בשורה השלישית.','הסטודנטים מזיזים מחוון בעצמם, ורואים את הדומינו נופל בסבב השני.'],
     ['נועה ברק, 33','עיתונאית כלכלית',face('#1f1a17','#d8a985','#b1502e'),'"הקוראים שואלים אותי: איך ירידה קטנה הפכה למשבר?"','שלוש פסקאות של הסברים על מנוף וביטחונות, והקוראים נוטשים באמצע.','גרף אחד בכתבה: זעזוע של 0.6 שנהיה 1.13, וסבב אחרי סבב של מי מכר.']];
    const g=H('div','fx-pg');
    PP.forEach(([nm,role,av,q,bf,af],i)=>{ const c=H('article','fx-p'); c.style.setProperty('--i',i);
      const hd=H('div','fx-ph'); const a=H('span','fx-pav'); a.innerHTML=av; const t=H('div'); t.append(H('strong','',nm),H('span','fx-role',role)); hd.append(a,t); c.append(hd,H('blockquote','fx-q',q));
      const ba=H('div','fx-ba'); const b=H('div','fx-bf'); b.append(H('span','fx-k','הבוקר בלי הכלי'),H('p','',bf)); const f=H('div','fx-af'); f.append(H('span','fx-k','הבוקר עם הכלי'),H('p','',af)); ba.append(b,f); c.append(ba); g.append(c); });
    s.append(g);
    const fin=H('div','fx-final'); fin.innerHTML='<span class="fx-k">ובסוף, מי מרוויח באמת</span><p><b>שרה.</b> כשמישהו רואה את השרשרת מראש, יש פחות סיכוי שהקרן שלה תקבל שוב את השיחה של הבוקר ההוא.</p>'; s.append(fin);
    oldA.replaceWith(s);
  }

  /* 4 · the map: guess first, then our dot flies to the empty corner */
  const mapS=secBy('איפה אנחנו על המפה');
  if(mapS){ const svg=mapS.querySelector('svg.ixmap'), ours=svg&&svg.querySelector('.ixdot.ours'), wrap=mapS.querySelector('.ix-mapw');
    if(svg&&ours&&wrap){ ours.classList.add('fx-hide');
      const tip=H('div','fx-guess'); tip.innerHTML='<b>רגע לפני:</b> איפה לדעתכם ייפול הכלי שלנו? לחצו על המקום במפה. <button type="button" class="fx-skip">לדלג</button>'; wrap.append(tip);
      const ring=svg.querySelector('.ixdot.ours circle.pt'); const tx=+ring.getAttribute('cx'), ty=+ring.getAttribute('cy');
      const NS='http://www.w3.org/2000/svg';
      const corner=document.createElementNS(NS,'g'); corner.setAttribute('class','fx-corner'); corner.innerHTML=`<rect x="${tx-70}" y="${ty-26}" width="104" height="70" rx="10"/><text x="${tx-18}" y="${ty+60}" text-anchor="middle">כאן אין אף אחד. למה?</text>`; svg.insertBefore(corner,svg.firstChild.nextSibling);
      let done=false;
      function reveal(gx,gy){ if(done) return; done=true; tip.remove();
        if(gx!=null){ const gh=document.createElementNS(NS,'circle'); gh.setAttribute('cx',gx); gh.setAttribute('cy',gy); gh.setAttribute('r',9); gh.setAttribute('class','fx-ghost'); svg.append(gh);
          const lab=document.createElementNS(NS,'text'); lab.setAttribute('x',gx); lab.setAttribute('y',gy-14); lab.setAttribute('text-anchor','middle'); lab.setAttribute('class','fx-ghost-t'); lab.textContent='הניחוש שלכם'; svg.append(lab); }
        ours.classList.remove('fx-hide'); if(gx!=null&&!reduce){ ours.style.transform=`translate(${gx-tx}px,${gy-ty}px)`; ours.getBoundingClientRect(); ours.style.transition='transform 1s cubic-bezier(.3,1.3,.5,1)'; ours.style.transform=''; }
        setTimeout(()=>corner.classList.add('on'),reduce?0:900); }
      svg.addEventListener('click',e=>{ if(done) return; const pt=svg.createSVGPoint(); pt.x=e.clientX; pt.y=e.clientY; const p=pt.matrixTransform(svg.getScreenCTM().inverse()); reveal(p.x,p.y); e.stopPropagation(); },true);
      tip.querySelector('.fx-skip').addEventListener('click',e=>{ e.stopPropagation(); reveal(null,null); });
    } }

  /* 5 · pre-mortem instead of flip cards */
  const oldC=secBy('אתגרים');
  if(oldC){
    const s=H('section','ix-sec fx-pm'); s.append(H('p','ix-kicker','אתגרים: תחקיר מקדים'));
    s.append(H('h5','fx-pmh','שנה מהיום. הפרויקט נכשל. מה קרה?'));
    s.append(H('p','fx-sub','תחקיר מקדים (pre-mortem) הוא טכניקה אמיתית: מדמיינים שהפרויקט כבר נכשל, וכותבים את הכותרות של הכישלון, לפני שהוא קורה. ככה רואים את הסכנות כשעוד אפשר להתגונן מפניהן.'));
    const PM=[
     ['הסימולטור צייר שוק רגוע. שבוע אחר כך הוא קרס.','גבוהה','מי מחזיק כמה ובאיזה מנוף זה בדיוק החלק הסמוי, והתשובה תלויה בו. לכן לא נותנים מספר אחד: עובדים עם טווחים ומראים את כל טווח התוצאות.','דוגמה: "בין 20% ל-40% מהקרנות ממונפות מעל פי 3", והתוצאה מוצגת כטווח, לא כהבטחה.'],
     ['שינוי של ספרה אחת הפך שקט לספירלה.','בינונית','מודלים כאלה יכולים להיות רגישים מאוד לפרמטר אחד. לכן מראים במפורש איזה פרמטר אחראי לאי-הוודאות, ומריצים סריקה עליו, כדי שאף אחד לא יסמוך על הרצה בודדת.','דוגמה: שינוי קטן בעומק השוק יכול להפוך שקט לספירלה, וזה מופיע ליד כל תוצאה.'],
     ['קרנות נבהלו מתחזית שפורסמה ברשת.','גבוהה','תוצאה שמראה "קרן X תקרוס" יכולה לגרום בדיוק לבהלה שהיא מתארת. לכן הכלי עובד רק על קרנות אנונימיות, ולא מציג שמות של גופים אמיתיים.','דוגמה: בכלי יש "קרן פנסיה מסוג א", לעולם לא שם של קרן אמיתית.']];
    const list=H('div','fx-pml');
    PM.forEach(([h,sev,ans,ex],i)=>{ const c=H('article','fx-pmc'); c.style.setProperty('--i',i);
      const np=H('div','fx-paper'); np.append(H('span','fx-date','חדשות · שנה מהיום'),H('h6','fx-hl',h),H('span','fx-sev '+(sev==='גבוהה'?'hi':'mid'),'חומרה: '+sev)); c.append(np);
      const b=H('button','fx-how','איך מונעים את זה? ←'); b.type='button'; const a=H('div','fx-ans'); a.hidden=true; a.append(H('span','fx-k','התשובה שלנו'),H('p','',ans),H('p','fx-ex',ex));
      b.addEventListener('click',()=>{ c.classList.add('solved'); a.hidden=false; b.remove(); }); c.append(b,a); list.append(c); });
    s.append(list); oldC.replaceWith(s);
  }

  /* 6 · downloads, richer */
  const oldD=secBy('הורדה');
  if(oldD){ const s=H('section','ix-sec'); s.append(H('p','ix-kicker','הורדה')); s.append(fxDownloads('fire-sale','ideation','מסמך הייזום','The ideation document','הרעיון, איך הוא עובד, למי הוא מיועד ומה יכול להשתבש.','The idea, how it works, who needs it and what could go wrong.',{he:3,en:3})); oldD.replaceWith(s); }
})();

/* shared: rich download cards (thumbnail, drawn icon, tags) */
function fxDownloads(slug,kind,heT,enT,heD,enD,pages,extra){
  const H=(t,c,x)=>{ const e=document.createElement(t); if(c) e.className=c; if(x!=null) e.textContent=x; return e; };
  const g=H('div','fx-dl'); const base='downloads/'+slug+'-'+kind+'-';
  const ico='<svg viewBox="0 0 40 40" class="fx-dlic" aria-hidden="true"><path d="M20 6 v18 M12 17 l8 8 8 -8" /><path d="M7 26 v6 h26 v-6"/></svg>';
  [['he',heT,heD,'עברית','rtl'],['en',enT,enD,'English','ltr']].forEach(([lg,t,dsc,ln,dir])=>{
    const c=H('div','fx-dlc'); c.setAttribute('dir',dir);
    const th=H('div','fx-th'); const PF={'fire-sale':'fs',registry:'rg','maturity-wall':'mw','rate-shock':'rs'}[slug]; if(PF){ const im=H('img'); im.src='../../assets/img/peek/'+PF+'-'+kind+'-p1.jpg'; im.alt=''; im.loading='lazy'; im.onerror=()=>{ im.remove(); th.classList.add('blank'); }; th.append(im); } else th.classList.add('blank');
    const b=H('div','fx-dlb'); b.append(H('strong','',t),H('small','',dsc));
    const row=H('div','fx-dlr');
    [['pdf','PDF',(pages&&pages[lg]?pages[lg]+(lg==='he'?' עמודים':' pages'):'')],['docx','Word','']].forEach(([ext,l,pg])=>{ const a=H('a','fx-dla'); a.href=base+lg+'.'+ext; a.setAttribute('download',''); a.innerHTML=ico; const tg=H('span','fx-tag',l+(pg?' · '+pg:'')+' · '+ln); a.append(tg); row.append(a); });
    (extra||[]).forEach(([href,l])=>{ const a=H('a','fx-dla'); a.href=href; a.setAttribute('download',''); a.innerHTML=ico; a.append(H('span','fx-tag',l)); row.append(a); });
    b.append(row); c.append(th,b); g.append(c); });
  return g;
}
