/* Maturity Wall (ideation + POC lab) and Rate-Shock (ideation), upgraded with the same principles as Fire-Sale and Registry.
   Maturity Wall numbers come from assets/py/maturity_wall_poc.py (window.LAB_MW); the "check" lab computes its formula live. */
(function(){
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const H=(t,c,x)=>{ const e=document.createElement(t); if(c) e.className=c; if(x!=null) e.textContent=x; return e; };
  const sleep=ms=>new Promise(r=>setTimeout(r,reduce?Math.min(ms,20):ms));
  const tm=(id,w)=>`<button class="tm" data-t="${id}">${w}</button>`;
  const T=(x,y,s,c,a)=>`<text x="${x}" y="${y}" class="${c||'fx-t'}" text-anchor="${a||'middle'}">${s}</text>`;
  const face=(hair,skin,shirt,acc)=>`<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="28" fill="#f3ecd8"/><circle cx="30" cy="27" r="12" fill="${skin}"/><path d="M17 25 q1 -15 13 -15 q13 0 13 15 q-4 -6 -13 -6 q-9 0 -13 6z" fill="${hair}"/><circle cx="26" cy="27" r="1.5" fill="#1e2422"/><circle cx="34" cy="27" r="1.5" fill="#1e2422"/><path d="M26 33 q4 2.5 8 0" stroke="#1e2422" stroke-width="1.5" fill="none"/><path d="M12 58 q4 -16 18 -16 q14 0 18 16z" fill="${shirt}"/>${acc||''}</svg>`;
  const BOND='<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="28" fill="#e4efec"/><rect x="17" y="9" width="26" height="40" rx="4" fill="#fffdf8" stroke="#8a7f66" stroke-width="1.4"/><circle cx="25" cy="24" r="2.2" fill="#1e2422"/><circle cx="35" cy="24" r="2.2" fill="#1e2422"/><path d="M25 31 q5 4 10 0" stroke="#1e2422" stroke-width="1.6" fill="none"/><text x="30" y="44" text-anchor="middle" font-size="8" font-weight="700" fill="#b1502e">0.5%</text></svg>';
  const SARAH='<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="28" fill="#e4efec"/><path d="M14 26 q2 -16 16 -16 q14 0 16 16 q-4 -6 -16 -6 q-12 0 -16 6z" fill="#8a5a3b"/><circle cx="30" cy="30" r="12" fill="#f2d2b6"/><circle cx="26" cy="29" r="1.6" fill="#1e2422"/><circle cx="34" cy="29" r="1.6" fill="#1e2422"/><path d="M26 35 q4 3 8 0" stroke="#1e2422" stroke-width="1.6" fill="none"/><path d="M12 58 q4 -14 18 -14 q14 0 18 14z" fill="#2f6f68"/><rect x="22" y="26" width="7" height="5" rx="2" fill="none" stroke="#1e2422" stroke-width="1.2"/><rect x="31" y="26" width="7" height="5" rx="2" fill="none" stroke="#1e2422" stroke-width="1.2"/></svg>';

  /* ---------- shared ideation pieces ---------- */
  const secByIx=(root,k)=>[...root.querySelectorAll('.ix-sec')].find(s=>{ const p=s.querySelector('.ix-kicker'); return p&&p.textContent.startsWith(k); });
  function field(root,clips,av,who,text){ const hero=root.querySelector('.ix-hero'); const f=H('section','fx-field'); f.append(H('p','ix-kicker','מהשטח'));
    const c=H('div','fx-clips'); c.innerHTML=clips; f.append(c); const o=H('div','fx-sarah'); o.innerHTML='<span class="fx-av" aria-hidden="true">'+av+'</span>'; const st=H('div'); st.append(H('span','fx-k',who),H('p','',text)); o.append(st); f.append(o);
    if(hero) root.insertBefore(f,hero); else root.prepend(f); }
  function personas(root,PP,fin){ const old=secByIx(root,'מי צריך את זה'); if(!old) return; const s=H('section','ix-sec fx-aud'); s.append(H('p','ix-kicker','מי צריך את זה'),H('p','fx-sub','שלוש דמויות בדויות, ושלושה בקרים: בלי הכלי ועם הכלי.'));
    const g=H('div','fx-pg'); PP.forEach(([nm,role,av,q,bf,af],i)=>{ const c=H('article','fx-p'); c.style.setProperty('--i',i); const hd=H('div','fx-ph'); const a=H('span','fx-pav'); a.innerHTML=av; const t=H('div'); t.append(H('strong','',nm),H('span','fx-role',role)); hd.append(a,t); c.append(hd,H('blockquote','fx-q',q));
      const ba=H('div','fx-ba'); const b=H('div','fx-bf'); b.append(H('span','fx-k','הבוקר בלי הכלי'),H('p','',bf)); const f=H('div','fx-af'); f.append(H('span','fx-k','הבוקר עם הכלי'),H('p','',af)); ba.append(b,f); c.append(ba); g.append(c); });
    s.append(g); const fn=H('div','fx-final'); fn.innerHTML='<span class="fx-k">ובסוף, מי מרוויח באמת</span><p>'+fin+'</p>'; s.append(fn); old.replaceWith(s); }
  function mapGuess(root){ const mapS=secByIx(root,'איפה אנחנו על המפה'); if(!mapS) return; const svg=mapS.querySelector('svg.ixmap'), ours=svg&&svg.querySelector('.ixdot.ours'), wrap=mapS.querySelector('.ix-mapw'); if(!(svg&&ours&&wrap)) return;
    ours.classList.add('fx-hide'); const tip=H('div','fx-guess'); tip.innerHTML='<b>רגע לפני:</b> איפה לדעתכם ייפול הכלי שלנו? לחצו על המקום במפה. <button type="button" class="fx-skip">לדלג</button>'; wrap.append(tip);
    const ring=svg.querySelector('.ixdot.ours circle.pt'); const tx=+ring.getAttribute('cx'), ty=+ring.getAttribute('cy'); const NS='http://www.w3.org/2000/svg';
    const corner=document.createElementNS(NS,'g'); corner.setAttribute('class','fx-corner'); corner.innerHTML=`<rect x="${tx-70}" y="${ty-26}" width="104" height="70" rx="10"/><text x="${tx-18}" y="${ty+60}" text-anchor="middle">כאן אין אף אחד. למה?</text>`; svg.insertBefore(corner,svg.firstChild.nextSibling);
    let done=false; const reveal=(gx,gy)=>{ if(done) return; done=true; tip.remove();
      if(gx!=null){ const gh=document.createElementNS(NS,'circle'); gh.setAttribute('cx',gx); gh.setAttribute('cy',gy); gh.setAttribute('r',9); gh.setAttribute('class','fx-ghost'); svg.append(gh); const lab=document.createElementNS(NS,'text'); lab.setAttribute('x',gx); lab.setAttribute('y',gy-14); lab.setAttribute('text-anchor','middle'); lab.setAttribute('class','fx-ghost-t'); lab.textContent='הניחוש שלכם'; svg.append(lab); }
      ours.classList.remove('fx-hide'); if(gx!=null&&!reduce){ ours.style.transform=`translate(${gx-tx}px,${gy-ty}px)`; ours.getBoundingClientRect(); ours.style.transition='transform 1s cubic-bezier(.3,1.3,.5,1)'; ours.style.transform=''; } setTimeout(()=>corner.classList.add('on'),reduce?0:900); };
    svg.addEventListener('click',e=>{ if(done) return; const pt=svg.createSVGPoint(); pt.x=e.clientX; pt.y=e.clientY; const p=pt.matrixTransform(svg.getScreenCTM().inverse()); reveal(p.x,p.y); e.stopPropagation(); },true);
    tip.querySelector('.fx-skip').addEventListener('click',e=>{ e.stopPropagation(); reveal(null,null); }); }
  function premortem(root,PM){ const old=secByIx(root,'אתגרים'); if(!old) return; const s=H('section','ix-sec fx-pm'); s.append(H('p','ix-kicker','אתגרים: תחקיר מקדים'),H('h5','fx-pmh','שנה מהיום. הפרויקט נכשל. מה קרה?'),H('p','fx-sub','תחקיר מקדים (pre-mortem) הוא טכניקה אמיתית: מדמיינים שהפרויקט כבר נכשל, וכותבים את הכותרות של הכישלון, לפני שהוא קורה. ככה רואים את הסכנות כשעוד אפשר להתגונן מפניהן.'));
    const list=H('div','fx-pml'); PM.forEach(([h,sev,ans,ex],i)=>{ const c=H('article','fx-pmc'); c.style.setProperty('--i',i); const np=H('div','fx-paper'); np.append(H('span','fx-date','חדשות · שנה מהיום'),H('h6','fx-hl',h),H('span','fx-sev '+(sev==='גבוהה'?'hi':'mid'),'חומרה: '+sev)); c.append(np);
      const b=H('button','fx-how','איך מונעים את זה? ←'); b.type='button'; const a=H('div','fx-ans'); a.hidden=true; a.append(H('span','fx-k','התשובה שלנו'),H('p','',ans),H('p','fx-ex',ex)); b.addEventListener('click',()=>{ c.classList.add('solved'); a.hidden=false; b.remove(); }); c.append(b,a); list.append(c); });
    s.append(list); old.replaceWith(s); }
  function downloads(root,slug){ const old=secByIx(root,'הורדה'); if(!old||!window.fxDownloads) return; const s=H('section','ix-sec'); s.append(H('p','ix-kicker','הורדה'),window.fxDownloads(slug,'ideation','מסמך הייזום','The ideation document','הרעיון, איך הוא עובד, למי הוא מיועד ומה יכול להשתבש.','The idea, how it works, who needs it and what could go wrong.')); old.replaceWith(s); }
  /* a stepper with two captions, used by both mechanisms */
  function stepper(box,ST,ALT,altLabels,render){ const bar=H('div','fx-mbar'); const n=H('span','fx-mstep','1'); const cap=H('div','fx-mcap'); cap.setAttribute('aria-live','polite'); const c1=H('p','fx-c1'), c2=H('p','fx-c2'); cap.append(c1,c2);
    const ctr=H('div','fx-mctl'); const pv=H('button','fx-b','‹'), nx=H('button','fx-b go','הצעד הבא ›'); pv.type=nx.type='button'; pv.setAttribute('aria-label','צעד קודם'); ctr.append(pv,nx);
    const alt=H('button','fx-alt',altLabels[0]); alt.type='button'; alt.hidden=true; bar.append(n,cap,ctr); box.append(bar,alt);
    let cur=0, seq=ST; const go=i=>{ cur=i; const x=seq[i]; render(x,seq===ALT); n.textContent=(seq===ALT?'ב':'')+(i+1); c1.textContent=x.a; c2.textContent=x.b;
      pv.disabled=(i===0&&seq===ST); nx.disabled=(i===seq.length-1); nx.textContent=i===seq.length-1?'סוף':'הצעד הבא ›'; alt.hidden=!(seq===ST&&i===ST.length-1); if(seq===ALT&&i===ALT.length-1){ alt.hidden=false; alt.textContent=altLabels[1]; } };
    nx.addEventListener('click',()=>{ if(cur<seq.length-1) go(cur+1); }); pv.addEventListener('click',()=>{ if(cur>0) go(cur-1); else if(seq===ALT){ seq=ST; go(ST.length-1); } });
    alt.addEventListener('click',()=>{ if(seq===ST){ seq=ALT; go(0); } else { seq=ST; alt.textContent=altLabels[0]; go(ST.length-1); } }); go(0); }

  /* ======================= MATURITY WALL · IDEATION ======================= */
  (function(){
    const root=document.querySelector('.ix[data-ix="maturity-wall"]'); const W=window.LAB_MW; if(!root||!W) return;
    const yrs=Object.keys(W.wall); const mx=Math.max(...yrs.map(y=>W.wall[y]));
    field(root,`<figure class="fx-clip"><svg viewBox="0 0 320 180" role="img" aria-label="צרפת: ריבית לעשר שנים, 2016 מול 2026">${T(160,18,'צרפת, תשואה לעשר שנים (בקירוב)','fx-th')}
        <rect x="70" y="${150-0.5*28}" width="60" height="${0.5*28}" class="fx-bar0"/>${T(100,150-0.5*28-8,'0.5%','fx-t')}${T(100,168,'2016','fx-t')}
        <rect x="190" y="${150-3.5*28}" width="60" height="${3.5*28}" class="fx-dot"/>${T(220,150-3.5*28-8,'3.5%','fx-t hot')}${T(220,168,'2026','fx-t')}
        <path d="M134 140 C160 120 170 80 186 60" class="fx-line"/>${T(160,96,'פי 7','fx-t hot')}</svg><figcaption>הגזיר: ב-2016 צרפת לוותה לעשר שנים כמעט בחינם. ההלוואה הזו פוקעת עכשיו, ובמקומה לווים בריבית של היום.</figcaption></figure>
      <figure class="fx-clip"><svg viewBox="0 0 320 180" role="img" aria-label="קיר הפקיעות של מדינה מדומה בסגנון צרפת">${T(160,18,'קיר הפקיעות: כמה חוב פוקע בכל שנה','fx-th')}
        ${yrs.map((y,i)=>{ const h=W.wall[y]/mx*110; return `<rect x="${292-i*27}" y="${150-h}" width="20" height="${h}" rx="2" class="${i<5?'fx-dot':'fx-bar0'}"/>${T(302-i*27,166,String(y).slice(2),'fx-t dim')}`; }).join('')}</svg><figcaption>הגזיר השני: מדינה מדומה בסגנון צרפת, מתוך ה-POC. חמש השנים הקרובות כבדות במיוחד.</figcaption></figure>`,
      BOND,'האג"ח של 2016 פותחת (דמות בדויה)','אני האג"ח של 2016. נולדתי כשצרפת לוותה לעשר שנים בחצי אחוז בשנה. ב-2026 אני פוקעת, וצרפת צריכה ללוות במקומי בריבית של היום, בערך פי שבעה. ואני לא לבד: מאחוריי עומד תור של אג"ח זולות, כל אחת בשנה שלה. כמה זה יעלה, ומתי?');
    const oldM=secByIx(root,'איך זה עובד');
    if(oldM){ const s=H('section','ix-sec fx-mech'); s.append(H('p','ix-kicker','איך זה עובד')); const box=H('div','fx-mbox');
      const sh=yrs.slice(0,10); box.innerHTML=`<div class="fx-hs"><svg viewBox="0 0 700 270" class="fx-msvg mw-wall" role="img" aria-label="קיר הפקיעות, שנה אחרי שנה">
        ${sh.map((y,i)=>{ const n=Math.max(1,Math.round(W.wall[y]/1.6)); return `<g class="mw-c" data-i="${i}">${Array.from({length:n},(_,k)=>`<rect x="${630-i*62}" y="${210-(k+1)*20}" width="50" height="17" rx="2" class="mw-b"/>`).join('')}${T(655-i*62,232,y,'fx-nl')}</g>`; }).join('')}
        <g class="fx-meter" transform="translate(40 120)"><rect x="-14" y="-100" width="28" height="150" rx="14" class="fx-mt"/><rect x="-9" y="45" width="18" height="0" rx="9" class="fx-mf"/><text y="74" text-anchor="middle" class="fx-mv">2.75%</text><text y="92" text-anchor="middle" class="fx-nl dim">ריבית/תמ"ג</text></g></svg></div>`;
      s.append(box); s.append(H('p','fx-note','כל לבנה היא חוב שפוקע באותה שנה. לבנה אדומה הוחלפה בחדשה, בריבית של אותה שנה. המספרים מהרצת ה-POC: מדינה מדומה בסגנון צרפת, 63 אג"ח, חוב של 115.5% מהתמ"ג.'));
      oldM.replaceWith(s);
      const cols=s.querySelectorAll('.mw-c'), mf=s.querySelector('.fx-mf'), mv=s.querySelector('.fx-mv');
      const R3=W.runs['3'].bond, R2=W.runs['2'].bond; const val=(R,y)=>R.find(r=>r[0]===y)[1];
      const ST=[{upto:-1,m:val(R3,2027),a:'זה הקיר: כמה חוב פוקע בכל שנה, באחוזים מהתמ"ג. הלבנות הכחולות הן אג"ח זולות מהעשור של הריבית האפסית.',b:'האג"ח: "אני שם, ממש לפני הקיר. ב-2026 כבר מחליפים אותי."'},
        {upto:0,m:val(R3,2027),a:'ב-2027 פוקעות אג"ח בשווי 11.3% מהתמ"ג. כל אחת מוחלפת בחדשה, בתשואה של היום: 3% לעשר שנים.',b:'האג"ח: "כל אחיותיי מאותו מחזור מוחלפות עכשיו ביקרות."'},
        {upto:2,m:val(R3,2029),a:'2028, 2029: עוד לבנות מוחלפות. הריבית על החוב עולה, בלי שאף אחד החליט להוציא יותר.',b:'האג"ח: "זה החלק האיטי. אף כותרת, רק מספר שמטפס."'},
        {upto:4,m:val(R3,2031),a:'עד 2031 כמעט חצי מהחוב הוחלף. הריבית על החוב: '+val(R3,2031).toFixed(2)+'% מהתמ"ג, מול 2.75% ב-2027.',b:'האג"ח: "וקיצור הדרך של "ריבית קפואה" עדיין אומר 3.07%. הוא פשוט לא רואה את ההחלפות."'},
        {upto:9,m:val(R3,2036),a:'ב-2036 הקיר כולו אדום. הריבית על החוב: '+val(R3,2036).toFixed(2)+'% מהתמ"ג. מכאן החוב גדל מעצמו, כי הריבית עוקפת את הצמיחה.',b:'האג"ח: "כמו אופניים בעלייה כשהרוח נגדך: גם בלי לעשות כלום, נסוגים."',hot:true}];
      const ALT=[{upto:-1,m:val(R2,2027),a:'עכשיו נניח שהתשואות יורדות בנקודה, ל-2%. נשמע כמו חדשות טובות.',b:'האג"ח: "סוף סוף, החלפה זולה?"',alt:true},
        {upto:4,m:val(R2,2031),a:'אבל האג"ח שפוקעות שילמו עוד פחות: חצי אחוז, אפס, אפילו פחות. גם ב-2% כל החלפה מייקרת.',b:'האג"ח: "אני שילמתי חצי אחוז. כל מחליפה שלי תהיה יקרה ממני."',alt:true},
        {upto:9,m:val(R2,2036),a:'ב-2036: '+val(R2,2036).toFixed(2)+'% מהתמ"ג. עדיין יותר מ-2.75% של היום. קיצור הדרך של "קפיצה מיידית" היה אומר שהתשלומים יורדים, וטועה בכיוון.',b:'האג"ח: "ריבית יורדת, וחוב שעדיין מתייקר. זה מה שהפירוט מגלה."',alt:true,hot:true}];
      stepper(box,ST,ALT,['ומה אם הריבית תרד?','לחזור לתרחיש שבו התשואות נשארות'],(x)=>{ cols.forEach(g=>{ const i=+g.dataset.i; g.classList.toggle('on',i<=x.upto); g.classList.toggle('alt',!!x.alt); }); const h=Math.min(140,(x.m-2)/3.2*140); mf.setAttribute('y',45-h); mf.setAttribute('height',Math.max(0,h)); mf.classList.toggle('hot',!!x.hot); mv.textContent=x.m.toFixed(2)+'%'; });
    }
    personas(root,[
      ['נועה ברק, 33','עיתונאית כלכלית',face('#1f1a17','#d8a985','#b1502e'),'"כולם כותבים שהחוב של צרפת יקר. אף אחד לא כותב כמה, ומתי."','מקבלת בבוקר את הצעת התקציב של צרפת, ומנסה להבין לבד מתוך טבלאות Excel כמה ממנה ייבלע בגלל החלפת החוב.','תוך עשר דקות יש לה מספר, גרף של הקיר, והנחות כתובות לצידו. הסיפור שלה מתפרסם לפני הצהריים.'],
      ['אנטואן ברנאר, 29','עוזר לחבר פרלמנט',face('#3a2a1e','#e2b896','#2f5d8a'),'"מחר בבוקר יש נאום, ואני צריך מספר אחד שאפשר להגן עליו."','מחפש מספר בדוחות של קרן המטבע, ומוצא מספר מצרפי משנה שעברה, בלי הסבר איך הגיעו אליו.','מזיז את מחוון התשואה, ורואה כמה תעלה כל נקודת ריבית. הקישור המשחזר נכנס לנאום, כדי שכל אחד יוכל לבדוק.'],
      ['תום לוי, 23','סטודנט לכלכלה',face('#6b4a2b','#e9c6a8','#2f9b6e'),'"למדתי את משוואת החוב. לא הבנתי למה ריבית יורדת יכולה לייקר אותו."','פותר תרגיל על הלוח עם ריבית אחת לכל החוב, ומקבל תשובה שלא מסתדרת עם מה שקורא בעיתון.','מזיז את התשואה ל-2%, ורואה את הקיר עדיין מאדים. עכשיו הוא מבין מה זה "קופון ישן".']],
      '<b>שרה,</b> כמשלמת מסים. כשמחיר החוב גלוי מראש, הוויכוח על התקציב קורה לפני שהחשבון מגיע, ולא אחריו.');
    mapGuess(root);
    premortem(root,[
      ['קרן המטבע פרסמה את אותו מספר. הפרויקט מיותר.','גבוהה','קרן המטבע ומשרדי אוצר כבר מריצים חישובים כאלה. לכן ה-POC בודק דבר אחד: האם הפירוט ברמת אג"ח משנה את התשובה, ולא רק את הדיוק.','דוגמה: כשהתשואות יורדות, קיצור דרך מקובל אומר שהתשלומים יורדים. החישוב המלא אומר שהם עולים. זה שינוי כיוון, לא רק דיוק.'],
      ['שורה אחת בקובץ צרפתי נקראה במיליארדים במקום במיליונים.','בינונית','כל מדינה מפרסמת בפורמט אחר. לכן לכל משרד חוב יש מתאם משלו, והרשימה חייבת להסתכם לחוב שהמדינה עצמה מצהירה, אחרת הטעינה נעצרת.','דוגמה: עמודה של מיליונים שנקראה כמיליארדים מכפילה את החוב פי אלף, והבדיקה תופסת את זה מיד.'],
      ['הגרף "צרפת תגיע ל-160%" צוטט בכותרות, והתשואות קפצו.','גבוהה','תחזית חוב פומבית יכולה להשפיע על השוק בעצמה. לכן כל תוצאה מוצגת כתרחיש, עם ההנחות לצידה, ובלי ציון למדינה.','דוגמה: "אם התשואה תהיה 4%, החוב יגיע ל-164%", ולא "צרפת תגיע ל-164%".']]);
    downloads(root,'maturity-wall');
    if(window.TermWin) window.TermWin.wire(root);
  })();

  /* ======================= MATURITY WALL · POC LAB ======================= */
  (function(){
    const root=document.querySelector('.pl[data-pl="maturity-wall"]'); const W=window.LAB_MW; if(!root||!W) return;
    const secBy=k=>[...root.querySelectorAll('.pl-sec')].find(s=>{ const h=s.querySelector('.pl-h'); return h&&h.textContent.startsWith(k); });
    const hero=root.querySelector('.pl-hero'); const intro=H('div','lb-intro');
    intro.innerHTML=`<div class="lb-what"><span class="lb-k">מה זה POC?</span><p>הוכחת היתכנות היא הגרסה הכי קטנה של הרעיון שעדיין בודקת את הדבר החשוב. כמו לבנות דגם של גשר מקרשים לפני שיוצקים בטון: לא בודקים איך הגשר ייראה, רק אם הוא מחזיק.</p></div>
      <div class="lb-what"><span class="lb-k">מה בודקים כאן?</span><p>שאלה אחת: האם לחשב את החוב ${tm('bond','אג"ח')} אחר אג"ח נותן תשובה אחרת מקיצורי הדרך המקובלים, או רק תשובה מדויקת יותר. בנינו מדינה מדומה בסגנון צרפת: ${W.n} אג"ח, חוב של ${W.debt0}% מה${tm('gdp','תמ"ג')}.</p></div>
      <div class="lb-sarah"><span class="lb-av" aria-hidden="true">${BOND}</span><div><span class="lb-k">האג"ח של 2016 מסבירה מה זה קופון</span><p>"הקופון הוא הריבית שכתובה עליי מהיום שנולדתי: חצי אחוז בשנה, עד הסוף. גם אם הריבית בשוק קופצת, אני ממשיכה לשלם חצי אחוז. רק כשאני פוקעת, מישהו צריך ללוות במקומי, בריבית של אותו יום."</p>
      <div class="lb-lev" aria-hidden="true"><span class="own" style="flex:1">0.5% עד 2026</span><span class="bor" style="flex:2">המחליפה: ~3.5%</span></div></div></div>`;
    if(hero) hero.replaceWith(intro); else root.prepend(intro);
    const LABS=[
     {id:'3',n:'מעבדה 1',t:'התשואות נשארות',hyp:'חישוב אג"ח אחר אג"ח ייתן ריבית גבוהה יותר מ"ריבית קפואה", בפער של יותר מחצי אחוז תמ"ג בשנה.',var:'תשואה של 3% לעשר שנים, כמו היום. כל אג"ח שפוקעת מוחלפת בחדשה, באותו אורך.',who:['מישל, 47, כלכלן במשרד האוצר הצרפתי (בדוי)','מישל מכין את תחזית החוב לשנה הבאה. הנוהל אומר להשתמש בריבית הממוצעת של היום. הוא יודע שזה לא נכון, אבל אין לו כלי אחר.'],proves:[0,3,4]},
     {id:'4',n:'מעבדה 2',t:'עלייה של נקודה',hyp:'כשהתשואות עולות, "ריבית קפואה" לא תזוז בכלל, והחישוב המלא יזוז.',var:'4% לעשר שנים. אותה מדינה ואותו קיר.',who:['נועה, 33, עיתונאית כלכלית (בדויה)','נועה שואלת את השאלה שכל קורא שואל: "ומה אם הריבית תעלה עוד?" קיצור הדרך עונה לה: כלום לא ישתנה.'],proves:[1]},
     {id:'2',n:'מעבדה 3',t:'ירידה של נקודה',hyp:'גם כשהתשואות יורדות, החשבון המלא ימשיך לעלות, כי האג"ח שפוקעות זולות עוד יותר.',var:'2% לעשר שנים. קפיצה מיידית תגיד שהתשלומים יורדים.',who:['תום, 23, סטודנט לכלכלה (בדוי)','תום בטוח שריבית יורדת זה חדשות טובות לחוב. המעבדה הזו נבנתה בשבילו.'],proves:[2],sci:'למה זה קורה? כי הריבית "של היום" היא לא נקודת ההתחלה. נקודת ההתחלה היא הקופונים הישנים, חצי אחוז, אפס, ולפעמים פחות. כל עוד הריבית החדשה גבוהה מהקופון של האג"ח שפוקעת, כל החלפה מייקרת, גם אם הריבית ירדה מאתמול.'},
     {id:'check',n:'מעבדה 4',t:'בדיקה מול The Economist',hyp:'אם המנוע מחשב נכון, הוא יגיע לאותו סדר גודל כמו החישוב של The Economist לצרפת האמיתית: עודף של כ-1.8% מהתמ"ג.',var:'כל החוב מוחזר ב-3.5%, עם צמיחה של 2%. כמה עודף תקציבי צריך כדי שהחוב לא יגדל?',who:['קבוצת ביקורת חיצונית','הפעם לא בודקים רעיון, אלא את המנוע עצמו: אם הוא לא מגיע למספר שמישהו אחר כבר חישב, שום דבר אחר שהוא אומר לא שווה כלום.'],proves:[5]}];
    const CL=[['החישוב המלא שונה מהריבית הקפואה ביותר מחצי אחוז תמ"ג','אם אין פער, אין סיבה לפירוט.',0],['הריבית הקפואה לא מגיבה לתשואות בכלל','קיצור דרך שלא מגיב לשינוי לא שווה הרבה בתחזית.',1],['גם כשהתשואות יורדות, החשבון המלא עולה','שינוי כיוון, לא רק דיוק.',2],['אין דליפות: זהות החוב מתקיימת בכל שנה','כמו לספור את הקופה: כל שקל שהולווה נספר פעם אחת.',0],['הקיר לא אחיד: 2027 עד 2031 כבדות מהשנים שאחריהן','מכאן שהעיתוי חשוב, לא רק הסכום.',0],['העודף הנדרש קרוב ל-1.8% של The Economist','בדיקת שפיות חיצונית למנוע.',3]];
    const labS=secBy('הרצה חיה'); const sec=H('section','pl-sec lb-sec'); sec.append(H('h5','pl-h','ארבע מעבדות'),H('p','lb-sub','כל מעבדה היא עמוד במחברת: השערה, מה משנים, מי עומד מאחורי הניסוי, ואז מרימים את מכסה הבטיחות ומפעילים. המספרים יוצאים מאותו קוד פייתון שאפשר להוריד למטה.'));
    const tabs=H('div','lb-tabs'); sec.append(tabs); const page=H('div','lb-page'); sec.append(page);
    const journal=H('div','lb-journal'); journal.append(H('p','lb-jh','יומן מעבדה'),H('ol','lb-jl')); journal.querySelector('ol').append(H('li','lb-jempty','עוד לא הורצו ניסויים.'));
    const claims=H('div','lb-claims'); claims.append(H('p','lb-jh','לוח ההשערות')); const proved=new Set();
    const cEls=CL.map(([t,why,lab])=>{ const r=H('div','lb-claim'); r.append(H('span','lb-cst','ממתין'),H('b','',t),H('span','lb-cwhy',why)); const a=H('button','lb-cgo','נבדק במעבדה '+(lab+1)+' ←'); a.type='button'; a.addEventListener('click',()=>open(lab)); r.append(a); claims.append(r); return r; });
    const prove=i=>{ if(proved.has(i)) return; proved.add(i); cEls[i].classList.add('ok'); cEls[i].querySelector('.lb-cst').textContent='הוכח ✓'; };
    sec.append(claims,journal); if(labS) labS.replaceWith(sec); else root.append(sec); root.querySelectorAll('.pl-checks').forEach(x=>x.remove());
    LABS.forEach((lb,i)=>{ const b=H('button','lb-tab'); b.type='button'; b.append(H('small','',lb.n),H('strong','',lb.t)); b.addEventListener('click',()=>open(i)); tabs.append(b); });
    function open(i,quiet){ [...tabs.children].forEach((b,j)=>b.classList.toggle('on',j===i)); build(LABS[i]); if(!quiet) page.scrollIntoView({behavior:reduce?'auto':'smooth',block:'nearest'}); }
    const yrs=Object.keys(W.wall);
    function build(lb){ page.innerHTML=''; const nb=H('div','lb-nb'); const left=H('div','lb-notes'); left.append(H('p','lbx-title',lb.n+' · '+lb.t));
      [['השערה',lb.hyp],['מה משנים',lb.var]].forEach(([k,v])=>{ const r=H('div','lb-row'); r.append(H('span','lb-k',k),H('p','',v)); left.append(r); });
      const wh=H('div','lb-who'); wh.append(H('strong','',lb.who[0]),H('p','',lb.who[1])); left.append(wh); if(lb.sci){ const sc=H('div','lb-sci'); sc.append(H('span','lb-k','רגע של מדע'),H('p','',lb.sci)); left.append(sc); }
      const ctl=H('div','lb-ctl'); const cover=H('button','lb-cover'); cover.type='button'; cover.innerHTML='<span class="lid">להרים מכסה</span><span class="btn">הפעלה</span>'; const again=H('button','lb-again','↻ להריץ שוב'); again.type='button'; again.hidden=true; ctl.append(cover,again);
      if(lb.id==='check'){ const fr=H('div','lb-free'); fr.innerHTML='<label>ניסוי חופשי: הריבית שבה מוחזר כל החוב <b>3.5%</b><input type="range" min="2" max="5" step="0.1" value="3.5"></label>'; ctl.append(fr); }
      left.append(ctl); const panel=H('div','lb-panel rgl mwl'); nb.append(left,panel); page.append(nb);
      panel.innerHTML=lb.id==='check'?`<div class="mwl-eq"><span>עודף נדרש = (ריבית − צמיחה) ÷ (100 + צמיחה) × חוב</span><b class="mwl-big">?</b><small>מול The Economist, צרפת האמיתית: כ-1.8%</small></div><div class="ip-tape" aria-live="polite"><p class="ip-th">THE DIFFERENTIAL · LAB</p></div>`
        :`<div class="mwl-wall">${yrs.map((y,i)=>`<div class="mwl-c" data-i="${i}"><i style="height:${W.wall[y]/12*100}%"></i><small>${String(y).slice(2)}</small></div>`).join('')}</div><svg viewBox="0 0 320 130" class="mwl-ch" aria-label="ריבית על החוב, אחוז מהתמ\"ג, 2027 עד 2036"><g class="lab-grid">${[0,1,2,3].map(i=>`<line x1="0" x2="320" y1="${10+i*36}" y2="${10+i*36}"/>`).join('')}</g><polyline class="mw-l b" points=""/><polyline class="mw-l f" points=""/><polyline class="mw-l j" points=""/></svg><div class="rgl-leg"><span class="a">אג"ח אחר אג"ח</span><span class="b">ריבית קפואה</span><span class="c">קפיצה מיידית</span></div><div class="ip-tape" aria-live="polite"><p class="ip-th">THE DIFFERENTIAL · LAB</p></div>`;
      const tape=panel.querySelector('.ip-tape'); const add=(t,c)=>{ const l=H('p','ip-l '+(c||''),t); tape.append(l); tape.scrollTop=tape.scrollHeight; };
      const stamp=(c,t)=>{ let s=panel.querySelector('.ip-stamp'); if(!s){ s=H('div','ip-stamp'); panel.append(s); } s.hidden=false; s.className='ip-stamp '+c; s.textContent=t; };
      const runLab=async(rate)=>{ tape.querySelectorAll('.ip-l').forEach(x=>x.remove()); panel.querySelectorAll('.ip-stamp').forEach(x=>x.hidden=true);
        add('$ python maturity_wall_poc.py  # '+(lb.id==='check'?'check':lb.id==='3'?'stay':lb.id==='4'?'up':'down')); add(W.n+' אג"ח, חוב '+W.debt0+'% מהתמ"ג, ריבית ממוצעת '+W.eff0+'%');
        if(lb.id==='check'){ const r=rate||3.5; const need=(r-2)/(100+2)*W.debt0; await sleep(500); add('אם כל החוב מוחזר ב-'+r.toFixed(1)+'%, עם צמיחה של 2%'); await sleep(500); panel.querySelector('.mwl-big').textContent=need.toFixed(1)+'%'; add('עודף נדרש כדי לייצב את החוב: '+need.toFixed(1)+'% מהתמ"ג','ok');
          if(Math.abs(r-3.5)<1e-9){ add('The Economist, צרפת האמיתית: כ-1.8%. אותו סדר גודל.','ok'); stamp('ok','אותו סדר גודל · הוכח'); } return need.toFixed(1)+'% (ב-'+r.toFixed(1)+'%)'; }
        const R=W.runs[lb.id]; const cs=panel.querySelectorAll('.mwl-c');
        add('קיר הפקיעות: '+yrs.slice(0,6).map(y=>String(y).slice(2)+':'+W.wall[y].toFixed(1)).join(', ')); const X=i=>8+i*33, Y=v=>130-(v-1.5)*26; const lines={b:R.bond,f:R.frozen,j:R.jump};
        for(let i=0;i<10;i++){ cs[i].classList.add('on'); Object.entries(lines).forEach(([k,a])=>panel.querySelector('.mw-l.'+k).setAttribute('points',a.slice(0,i+1).map((r,j)=>X(j)+','+Y(r[1]).toFixed(1)).join(' '))); await sleep(260); }
        const b31=R.bond[4][1], f31=R.frozen[4][1], j27=R.jump[0][1];
        add('אג"ח אחר אג"ח: '+R.bond[0][1].toFixed(2)+'% (2027) → '+b31.toFixed(2)+'% (2031) → '+R.bond[9][1].toFixed(2)+'% (2036)');
        add('ריבית קפואה: '+f31.toFixed(2)+'% ב-2031 · קפיצה מיידית: '+j27.toFixed(2)+'% ב-2027');
        if(lb.id==='2'){ add('התשואות ירדו, אבל החשבון המלא עדיין עולה: '+R.bond[0][1].toFixed(2)+'% → '+R.bond[9][1].toFixed(2)+'%','bad'); stamp('hot','עולה גם בירידה · הוכח'); return 'עולה ל-'+R.bond[9][1].toFixed(2)+'%'; }
        add('הפער ב-2031: '+(b31-f31).toFixed(2)+' נקודות תמ"ג. חוב 2036: '+R.bond[9][2].toFixed(0)+'%',(b31-f31)>.5?'bad':'ok'); add('אין דליפות ✓','ok');
        if(lb.id==='4'){ add('הריבית הקפואה ב-4%: '+f31.toFixed(2)+'%, בדיוק כמו ב-3%. היא לא זזה בכלל.','bad'); }
        stamp('hot','פער של '+(b31-f31).toFixed(2)+' · הוכח'); return 'פער 2031: '+(b31-f31).toFixed(2); };
      let armed=false; const go=async(rate)=>{ const res=await runLab(rate); lb.proves.forEach(prove); const jl=journal.querySelector('ol'); const em=jl.querySelector('.lb-jempty'); if(em) em.remove(); const t=new Date(); jl.prepend(H('li','',[t.getHours(),t.getMinutes(),t.getSeconds()].map(x=>String(x).padStart(2,'0')).join(':')+' · '+lb.t+' · '+res)); };
      cover.addEventListener('click',async()=>{ if(!armed){ armed=true; cover.classList.add('open'); return; } if(cover.disabled) return; cover.disabled=true; await go(); cover.disabled=false; again.hidden=false; });
      again.addEventListener('click',async()=>{ again.disabled=true; panel.querySelectorAll('.mwl-c').forEach(c=>c.classList.remove('on')); await go(); again.disabled=false; });
      const fr=page.querySelector('.lb-free input'); if(fr){ fr.addEventListener('input',()=>{ page.querySelector('.lb-free b').textContent=(+fr.value).toFixed(1)+'%'; }); fr.addEventListener('change',()=>go(+fr.value)); }
    }
    open(0,true);
    /* machine */
    const compS=secBy('מי משתתף');
    if(compS){ const s=H('section','pl-sec mc-sec'); s.append(H('h5','pl-h','מי משתתף: מכונה של ארבע תחנות'),H('p','lb-sub','בתוך הקוד עובדות ארבע תחנות, ממש כמו מכונה. לחצו על תחנה כדי לקרוא מה היא עושה, ונסו להוציא אותה מהמכונה.'));
      const ST=[['list','מדף האג"ח','Bond List','לכל אג"ח סכום, ריבית (קופון) ותאריך פקיעה. כאן מדומה, במערכת אמיתית ממשרד החוב.','בלעדיו אין מה לחשב. המכונה עומדת ריקה.'],['engine','מכונת ההחלפה','Rollover Engine','מחליפה כל אג"ח שפוקעת בחדשה, באותו אורך, בתשואה של אותה שנה.','בלעדיה חוזרים לקיצורי הדרך, ורואים רק ממוצע.'],['short','שני קיצורי הדרך','Shortcuts','ריבית קפואה וקפיצה מיידית, כמו בחישובים המקובלים.','בלעדיהם אין למה להשוות, ואין דרך לדעת אם הפירוט שווה משהו.'],['eq','מאזני החוב','Debt Equation','מחשבים את יחס החוב לתמ"ג, ואת העודף שנדרש כדי לייצב אותו.','בלעדיהם יש תשלומים, אבל אין תמונה.']];
      const ICO={list:'<rect x="8" y="8" width="36" height="8" rx="2"/><rect x="8" y="22" width="36" height="8" rx="2"/><rect x="8" y="36" width="36" height="8" rx="2"/>',engine:'<circle cx="26" cy="26" r="17"/><path d="M26 9 v8 M26 35 v8 M9 26 h8 M35 26 h8"/><path d="M20 26 l6 -6 l6 6 l-6 6z"/>',short:'<path d="M8 40 L44 12 M8 40 h36" /><path d="M36 12 h8 v8"/>',eq:'<path d="M26 8 v34 M14 42 h24 M8 16 h36"/><path d="M8 16 l-5 10 h10z M44 16 l-5 10 h10z"/>'};
      const m=H('div','mc'); const det=H('div','mc-det'); det.setAttribute('aria-live','polite'); det.innerHTML='<p>לחצו על תחנה.</p>'; const out=new Set();
      ST.forEach(([k,he,en,what,without],i)=>{ const st=H('div','mc-st'); st.style.setProperty('--i',i); const b=H('button','mc-b'); b.type='button'; b.innerHTML=`<svg viewBox="0 0 52 52" aria-hidden="true">${ICO[k]}</svg>`; b.append(H('strong','',he),H('small','',en)); const pull=H('button','mc-pull','להוציא מהמכונה'); pull.type='button';
        b.addEventListener('click',()=>{ m.querySelectorAll('.mc-st').forEach(x=>x.classList.toggle('sel',x===st)); det.innerHTML=''; det.append(H('strong','',he+' · '+en),H('p','',what)); if(out.has(k)) det.append(H('p','mc-bad',without)); });
        pull.addEventListener('click',()=>{ if(out.has(k)){ out.delete(k); st.classList.remove('out'); pull.textContent='להוציא מהמכונה'; } else { out.add(k); st.classList.add('out'); pull.textContent='להחזיר'; } m.classList.toggle('broken',out.size>0); det.innerHTML=''; det.append(H('strong','',out.has(k)?'הוצאתם את '+he:'החזרתם את '+he),H('p',out.has(k)?'mc-bad':'',out.has(k)?without:'המכונה עובדת שוב.')); });
        st.append(b,pull); m.append(st); if(i<ST.length-1) m.append(H('span','mc-belt')); });
      s.append(m,det); compS.replaceWith(s); }
    /* fence */
    const limS=secBy('גבולות ה-POC');
    if(limS){ const s=H('section','pl-sec fn-sec'); s.append(H('h5','pl-h','גבולות ה-POC'),H('p','lb-sub','POC בודק דבר אחד, ומשאיר בכוונה את כל השאר בחוץ. מה שבחוץ לא נשכח: הוא רק נדחה לשלב הבא, לאפיון.'));
      const f=H('div','fn'); const inside=H('div','fn-in'); inside.append(H('span','fn-tag','בתוך הגדר: מה שבדקנו'));
      [['מנוע מחזור אג"ח אחר אג"ח','הלב: כל אג"ח שפוקעת מוחלפת בחדשה.'],['שני קיצורי דרך על אותו קלט','ריבית קפואה וקפיצה מיידית.'],['בדיקת דליפות בכל שנה','כל שקל שהולווה נספר פעם אחת.']].forEach(([a,b])=>{ const c=H('div','fn-item'); c.append(H('b','',a),H('span','',b)); inside.append(c); });
      const outside=H('div','fn-out'); [['רשימת האג"ח האמיתית של צרפת','כאן הרשימה מדומה. הרשימה האמיתית מגיעה בקובצי Excel חודשיים, וצריך לקרוא אותם בלי טעויות. באפיון.'],['אג"ח צמודות מדד וחוב בריבית משתנה','חלק מהחוב לא משלם קופון קבוע. אג"ח צמודה למדד מתייקרת עם האינפלציה. באפיון.'],['השוואה לכלי המלא של קרן המטבע','כאן השווינו לקיצורי דרך פשוטים. האם הפער נשאר גם מול הכלי המקצועי? באפיון.']].forEach(([a,b],i)=>{ const c=H('div','fn-note'); c.style.setProperty('--i',i); c.append(H('span','fn-stk','לאפיון'),H('b','',a),H('span','',b)); outside.append(c); });
      f.append(outside,inside); s.append(f); limS.replaceWith(s); }
    /* split screen */
    const vsS=secBy('במה זה שונה');
    if(vsS){ const s=H('section','pl-sec'); s.append(H('h5','pl-h','במה זה שונה')); const g=H('div','vs2');
      const a=H('div','vs-side official'); a.innerHTML='<span class="vs-k">ניתוח החוב של קרן המטבע</span><div class="vs-pics"><span class="vs-cal" aria-hidden="true"><i></i><i></i><i></i><b>פעם בשנה</b></span><span class="vs-safe" aria-hidden="true"><i></i><b>חוב מצרפי</b></span></div><p>מחשב ברמת החוב כולו, ומתעדכן פעם בשנה. חזק מאוד, אבל רואה ממוצע.</p>';
      const b=H('div','vs-side ours'); b.innerHTML='<span class="vs-k">המעבדה שלנו</span><div class="vs-pics"><span class="vs-watch" aria-hidden="true"><b>63</b><small>אג"ח, אחת אחת</small></span><span class="vs-box" aria-hidden="true"><i></i><b>פתוח לכולם</b></span></div><p>יורד לכל אג"ח, והפער לפעמים הופך את הכיוון, לא רק את הדיוק.</p>';
      g.append(a,H('span','vs-vs','מול'),b); s.append(g,H('p','vs-q','כמה מהיתרון נשאר, כשמשווים לכלי המלא ולא לקיצור דרך?')); vsS.replaceWith(s); }
    /* ethics */
    const ethS=secBy('שאלה אתית');
    if(ethS){ const s=H('section','pl-sec et-sec'); s.append(H('h5','pl-h','שאלה אתית: מה הייתם עושים?'));
      const ph=H('div','et-phone'); const sc=H('div','et-screen'); ph.append(sc); const head=H('div','et-news'); head.append(H('span','et-src','חדשות · עכשיו'),H('strong','','"מודל חדש: צרפת תגיע ל-164% חוב"')); sc.append(head); const feed=H('div','et-feed'); sc.append(feed);
      const side=H('div','et-side'); side.append(H('p','','דמיינו שהכלי מפרסם תחזית חוב למדינה אמיתית, ברגע של לחץ בשוק. מה קורה בבוקר שאחרי?')); const play=H('button','et-play','לראות מה קורה ←'); play.type='button'; side.append(play);
      const ch=H('div','et-choice'); ch.hidden=true; ch.append(H('p','','אתם מחליטים: איך הכלי צריך להציג תוצאה?')); const a=H('button','et-c','מספר אחד, עם שם המדינה'), b=H('button','et-c','תרחיש, עם ההנחות לצידו'); a.type=b.type='button'; ch.append(a,b); side.append(ch); const ans=H('div','et-ans'); ans.hidden=true; side.append(ans);
      play.addEventListener('click',async()=>{ play.disabled=true; for(const t of ['📲 "ראית? 164%"','📲 משקיעים מוכרים אג"ח צרפתיות','📲 התשואה הצרפתית עולה ב-0.2','📲 "המודל צדק!" (כי השוק עשה את מה שהוא אמר)']){ feed.append(H('p','et-n',t)); await sleep(650); } side.insertBefore(H('p','et-note','תחזית יכולה להגשים את עצמה: המספר שפורסם גרם למכירות, והמכירות העלו את הריבית שהמספר תיאר.'),ch); ch.hidden=false; });
      const decide=x=>{ ans.hidden=false; ans.innerHTML=''; ans.append(H('strong','',x?'זה מה שרצינו למנוע.':'זו גם הבחירה שלנו.'),H('p','','לכן כל תוצאה מוצגת כתרחיש, עם ההנחות לצידה, ובלי ציון למדינה: "אם התשואה תהיה 4%, החוב יגיע ל-164%".')); head.querySelector('strong').textContent='"תרחיש: אם התשואה תהיה 4%, החוב יגיע ל-164%"'; };
      a.addEventListener('click',()=>decide(true)); b.addEventListener('click',()=>decide(false)); const w=H('div','et'); w.append(ph,side); s.append(w); ethS.replaceWith(s); }
    /* envelopes */
    const openS=secBy('מה עובר לאפיון');
    if(openS){ const s=H('section','pl-sec'); s.append(H('h5','pl-h','מה עובר לאפיון: שתי מעטפות חתומות'),H('p','lb-sub','מה שה-POC לא פתר לא נזרק. הוא נכנס למעטפה, ונמסר לשלב הבא. לחצו כדי לפתוח.')); const g=H('div','env-g');
      [['מול הכלים המקצועיים','השווינו לשני קיצורי דרך פשוטים. האם הפער נשאר גם מול הכלי של קרן המטבע? אם לא, אין לפרויקט סיבה להתקיים.'],['נתונים אמיתיים','כל משרד חוב מפרסם בפורמט אחר: ממשק נתונים בארה"ב, קובצי Excel בצרפת ובאיטליה. איך טוענים אותם בלי טעויות?']].forEach(([t,d],i)=>{ const e=H('button','env'); e.type='button'; e.style.setProperty('--i',i); e.innerHTML='<span class="env-back"></span><span class="env-flap"></span><span class="env-seal">לאפיון</span><span class="env-letter"><b></b><span></span></span>'; e.querySelector('.env-letter b').textContent=t; e.querySelector('.env-letter span').textContent=d; e.append(H('span','env-lab',t)); e.addEventListener('click',()=>e.classList.toggle('open')); g.append(e); });
      s.append(g); openS.replaceWith(s); }
    /* code */
    const techS=secBy('מה בקוד');
    if(techS){ const s=H('section','pl-sec cd-sec'); s.append(H('h5','pl-h','מה בקוד'),H('p','lb-sub','שלושה קטעים מהקוד האמיתי. ליד כל שורה חשובה יש הסבר בעברית.'));
      [['ההחלפה: כל אג"ח שפוקעת מוחלפת',[['maturing = [b for b in bs if b["mat"] == y]','אוספים את כל האג"ח שפוקעות השנה.'],['need = sum(face of maturing) + interest - PB / 100 * gdp','כמה צריך ללוות: את מה שפוקע, ואת הריבית, פחות העודף.'],['"cpn": max(mkt + SLOPE[m] + 0.5, 0)','האג"ח החדשה מקבלת את הריבית של אותה שנה, לפי האורך שלה.']]],
       ['קיצורי הדרך',[['r = eff0 if mode == "frozen"','ריבית קפואה: כל החוב משלם לנצח את הממוצע של היום.'],['else sum(w * max(mkt + SLOPE[m] + 0.5, 0) ...)','קפיצה מיידית: כל החוב עובר מיד לריבית השוק.']]],
       ['ספירת הקופה',[['leak = max(leak, abs(after - (before + interest - PB / 100 * gdp)))','החוב בסוף השנה חייב להיות בדיוק החוב בתחילתה, ועוד ריבית, פחות עודף. כל פער הוא באג.']]]].forEach(([h,rows])=>{ const c=H('div','cd-card'); c.append(H('p','cd-h',h)); rows.forEach(([code,he])=>{ const r=H('div','cd-row'); const cd=H('code','',code); cd.setAttribute('dir','ltr'); r.append(cd,H('span','cd-he',he)); c.append(r); }); s.append(c); });
      const chips=H('div','cd-chips'); [['Python, ספרייה סטנדרטית','בלי חבילות חיצוניות, כדי שירוץ גם בדפדפן.'],['stock-flow','משוואת החוב: חוב קודם, ועוד ריבית, פחות עודף.'],['זהות החוב','בדיקה בכל שנה שאין דליפה בגלגול.']].forEach(([a,b])=>{ const d=H('div','cd-chip'); d.append(H('b','',a),H('span','',b)); chips.append(d); }); s.append(chips);
      const det=techS.querySelector('details'); if(det) s.append(det); techS.replaceWith(s); }
    const dlS=secBy('הורדה'); if(dlS&&window.fxDownloads){ const s=H('section','pl-sec'); s.append(H('h5','pl-h','הורדה'),window.fxDownloads('maturity-wall','poc','מסמך ה-POC','The POC document','המטרה, הרכיבים, הגבולות והמסקנה.','Goal, components, limits and conclusion.',null,[['../../assets/py/maturity_wall_poc.py','קוד · maturity_wall_poc.py']])); dlS.replaceWith(s); }
    if(window.TermWin) window.TermWin.wire(root);
  })();

  /* ======================= RATE-SHOCK · IDEATION ======================= */
  (function(){
    const root=document.querySelector('.ix[data-ix="rate-shock"]'); if(!root) return;
    field(root,`<figure class="fx-clip"><svg viewBox="0 0 320 180" role="img" aria-label="בריטניה, ספטמבר 2022: כמה סימנים זזו יחד לפני הקפיצה">${T(160,18,'בריטניה, ספטמבר 2022: שלושה סימנים','fx-th')}
        <polyline points="30,120 80,118 130,116 180,110 220,96 250,60 290,40" class="fx-line"/>${T(300,36,'תשואה','fx-t','start')}
        <polyline points="30,70 80,72 130,76 180,84 220,98 250,130 290,150" class="fx-line ok2"/>${T(300,158,'פאונד','fx-t','start')}
        <line x1="250" y1="28" x2="250" y2="168" class="fx-gl"/>${T(246,176,'23.9','fx-t hot','start')}</svg><figcaption>הגזיר: התשואה עלתה והפאונד ירד כבר ימים לפני ה-23 בספטמבר. אחרי מעשה, הסימנים היו ברורים. לפני, הם היו מפוזרים. נתונים בקירוב.</figcaption></figure>
      <figure class="fx-clip"><svg viewBox="0 0 320 180" role="img" aria-label="עשרים לשוניות פתוחות">${T(160,18,'הבוקר של מנהלת סיכונים','fx-th')}
        ${Array.from({length:12},(_,i)=>`<rect x="${30+(i%4)*68}" y="${36+Math.floor(i/4)*42}" width="58" height="32" rx="3" class="fx-tab"/>${T(59+(i%4)*68,57+Math.floor(i/4)*42,['תשואות','פערים','מטבעות','חוזים','אשראי','מניות','סחורות','חדשות','בנקים','קרנות','נזילות','עוד...'][i],'fx-t dim')}`).join('')}</svg><figcaption>הגזיר השני: הסימנים קיימים, בעשרים מקורות שונים. אף אחד לא מחבר אותם בשבילה.</figcaption></figure>`,
      SARAH,'שרה פותחת (דמות בדויה)','קוראים לי שרה, ואני מורה ממנצ\'סטר. בקרן הפנסיה שלי עובדת מנהלת סיכונים, ואני תמיד שואלת את עצמי מה היא ראתה בבוקר של 23 בספטמבר. אחרי מעשה, כולם אמרו שהסימנים היו שם. אז למה אף אחד לא שלח הודעה?');
    const oldM=secByIx(root,'איך זה עובד');
    if(oldM){ const s=H('section','ix-sec fx-mech'); s.append(H('p','ix-kicker','איך זה עובד')); const box=H('div','fx-mbox');
      box.innerHTML=`<div class="fx-hs"><svg viewBox="0 0 700 260" class="fx-msvg rs-mech" role="img" aria-label="שני מדדים, ומתי נשלחת התראה">
        <text x="660" y="40" class="fx-nl" text-anchor="start">פער ריבית איטליה-גרמניה</text><rect x="40" y="52" width="620" height="60" rx="8" class="rs-lane"/><polyline class="rs-ln a" points=""/>
        <text x="660" y="140" class="fx-nl" text-anchor="start">תשואה בריטית ל-30 שנה</text><rect x="40" y="152" width="620" height="60" rx="8" class="rs-lane"/><polyline class="rs-ln b" points=""/>
        <g class="rs-bellg" transform="translate(60 236)"><circle r="14" class="fx-nb"/><path d="M-7 4 q0 -12 7 -13 q7 1 7 13 z M-4 8 h8" class="fx-ic"/></g><text x="84" y="242" class="fx-nl rs-bt" text-anchor="end"></text></svg></div>`;
      s.append(box); s.append(H('p','fx-note','זו הדגמה עם מספרים בדויים. בכלי האמיתי, כל קו הוא נתון ציבורי שמתעדכן פעם ביום.')); oldM.replaceWith(s);
      const la=s.querySelector('.rs-ln.a'), lb=s.querySelector('.rs-ln.b'), bell=s.querySelector('.rs-bellg'), bt=s.querySelector('.rs-bt');
      const A0=[0,1,0,1,0,1,0,0,1,0], B0=[0,0,1,0,0,1,0,1,0,0];
      const line=(el,arr,y0,up)=>el.setAttribute('points',arr.map((v,i)=>(640-i*64)+','+(y0+48-(up?v:v)*8).toFixed(0)).join(' '));
      const ST=[{a:'נתוני שוק ציבוריים זורמים פנימה, פעם ביום. כל קו הוא מדד אחד.',b:'שרה: "זה מה שהמנהלת רואה כל בוקר: הרבה קווים שזזים קצת."',A:A0,B:B0},
        {a:'פער הריבית בין איטליה לגרמניה מתרחב. מדד בודד זז, ועדיין שקט: זה קורה כל שבוע.',b:'שרה: "אם הייתה התראה על כל תזוזה, אף אחד לא היה קורא אותן."',A:[0,1,1,2,3,3,4,4,5,5],B:B0},
        {a:'עכשיו גם התשואה הבריטית עולה, באותם ימים. שני מדדים זזים יחד, בכיוון מסוכן.',b:'שרה: "זה השילוב. כמו חום וגם שיעול, ולא רק אחד מהם."',A:[0,1,1,2,3,3,4,4,5,5],B:[0,0,1,1,2,3,3,4,5,5]},
        {a:'נשלחת התראה, עם הסבר: מה זז, כמה, ולמה השילוב מדאיג.',b:'שרה: "המנהלת שלי מקבלת הודעה לפני שהשוק נפתח."',A:[0,1,1,2,3,3,4,4,5,5],B:[0,0,1,1,2,3,3,4,5,5],bell:'התראה: שני מדדים זזים יחד, שלושה ימים ברציפות'},
        {a:'ההתראה הגיעה. אבל המערכת עצמה לא עושה איתה כלום: היא לא יודעת מי ייפגע, ומה צריך לעשות עכשיו.',b:'שרה: "ואז מה? מה היא אמורה לעשות עם ההודעה הזו?"',A:[0,1,1,2,3,3,4,4,5,5],B:[0,0,1,1,2,3,3,4,5,5],bell:'ההתראה נשלחה. ומה עכשיו?',hot:true}];
      const ALT=[{a:'ומה אם רק מדד אחד זז, אבל חזק? המערכת לא מתריעה. מדד בודד יכול לזוז מסיבה תמימה.',b:'שרה: "כמו חום בלי שום סימן אחר. כדאי לשים לב, לא להיבהל."',A:[0,2,3,5,6,7,7,8,8,9],B:B0},
        {a:'זה מה שמונע עשר התראות שווא בשבוע: מתריעים רק על שילוב, ומסבירים אותו.',b:'שרה: "ככה כשמגיעה התראה, מישהו באמת קורא אותה."',A:[0,2,3,5,6,7,7,8,8,9],B:B0,bell:'אין התראה: רק מדד אחד זז'}];
      stepper(box,ST,ALT,['ומה אם רק מדד אחד זז?','לחזור לשילוב'],x=>{ line(la,x.A,52); line(lb,x.B,152); bell.classList.toggle('on',!!x.bell); bell.classList.toggle('hot',!!x.hot); bt.textContent=x.bell||''; });
    }
    personas(root,[
      ['מיכל דור, 44','מנהלת סיכונים בקרן פנסיה בינונית',face('#3a2a1e','#e9c6a8','#2f5d8a'),'"אני לא צריכה עוד נתון. אני צריכה שמישהו יגיד לי מתי שני נתונים מספרים אותו סיפור."','פותחת עשרים לשוניות, ומחפשת בעיניים אם משהו זז יחד. בבוקר רגוע זה לוקח שעה. בבוקר לחוץ אין לה שעה.','מקבלת הודעה אחת: הפער האיטלקי מתרחב שלושה ימים ברציפות, ובאותם ימים התשואה הבריטית עולה. היא בודקת את החשיפה של הקרן לפני שהשוק נפתח.'],
      ['אורי קרמר, 37','עיתונאי כלכלי',face('#1f1a17','#d8a985','#7a3b8f'),'"אני תמיד כותב על המשבר יום אחרי. הייתי רוצה לכתוב עליו יום לפני."','מגלה את הסיפור כשהוא כבר כותרת אצל כולם.','רואה שהשוק "מבין משהו" לפני שזה הופך לכותרת, ומתחיל לברר.'],
      ['דני לוין, 61','משקיע פרטי',face('#9a9a9a','#e2b896','#2f9b6e'),'"אין לי מנוי של עשרות אלפי דולרים. יש לי טלפון."','שומע על הלחץ בשוק בחדשות של שמונה בערב.','מקבל התראה על שילוב מסוכן בנתונים ציבוריים, עם הסבר במילים פשוטות.']],
      '<b>שרה.</b> אם מישהו בקרן שלה רואה את השילוב מוקדם, יש לו כמה שעות להתכונן לפני הבוקר הבא.');
    mapGuess(root);
    premortem(root,[
      ['המערכת "בזמן אמת" קיבלה מספר חדש פעם ביום.','בינונית','נתונים ציבוריים וחינמיים מתעדכנים בדרך כלל פעם ביום. לכן לא מבטיחים "זמן אמת", אלא התראה כל בוקר לפני פתיחת השוק.','דוגמה: מערכת "בזמן אמת" שמקבלת מספר חדש פעם ב-24 שעות מאכזבת. "דוח בוקר" שמגיע בזמן לא מאכזב.'],
      ['עשר התראות שווא בשבוע. בשבוע האחד-עשר התעלמו גם מהאמיתית.','גבוהה','מערכת שמתריעה כל יום מפסיקה לעניין מישהו. לכן מתריעים רק על שילוב של כמה מדדים, ולא על כל תזוזה.','דוגמה: מדד אחד שזז חזק זה סימן לשים לב. שני מדדים שזזים יחד שלושה ימים זו התראה.'],
      ['ההתראה הגיעה בשלוש לפנות בוקר. אף אחד לא ידע מה לעשות איתה.','גבוהה','המערכת מזהה, אבל לא עושה דבר בעצמה. לכן כל התראה מגיעה עם הסבר: מה זז, כמה, ומה היה הסיפור בפעמים הקודמות שזה קרה.','דוגמה: "הפער האיטלקי מתרחב שלושה ימים. בפעם האחרונה זה קרה באוקטובר 2018."']]);
    downloads(root,'rate-shock');
    if(window.TermWin) window.TermWin.wire(root);
  })();
})();
