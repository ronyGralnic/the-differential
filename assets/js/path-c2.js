/* Case 02 · Stage 05: the path as a metro map. Seven lines leave one hub, each stops at the station where it fell.
   PLAY sends seven trains together; a station opens the document written there; a matrix of fall reasons; a "what would have saved it" switch;
   and the reader's own guesses from stage 03 (localStorage, optional). The original flow chart stays folded underneath. */
(function(){
  const wrap=document.getElementById('flow-wrap'); if(!wrap||document.body.dataset.case!=='slow-motion-crisis') return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const H=(t,c,x)=>{ const e=document.createElement(t); if(c) e.className=c; if(x!=null) e.textContent=x; return e; };
  const NS='http://www.w3.org/2000/svg'; const S=(t,a,p)=>{ const e=document.createElementNS(NS,t); for(const k in a) e.setAttribute(k,a[k]); if(p) p.append(e); return e; };
  const sleep=ms=>new Promise(r=>setTimeout(r,reduce?10:ms));
  const ST=[['board','הלוח','שבעה רעיונות, חמש שאלות'],['ideation','ייזום','למה שזה בכלל יהיה קיים?'],['poc','מחקר ו-POC','האם הליבה עובדת?'],['spec','אפיון','מה בדיוק בונים?'],['arch','ארכיטקטורה','איך בונים עד הסוף?'],['door','ההכרעה','שלב 06']];
  const CAT={risk:['סיכון משפטי ותדמיתי','#b1502e'],pol:['בעיה פוליטית, לא טכנית','#7a3b8f'],data:['הנתונים לא זמינים','#c08a1e'],exists:['כבר קיים','#2f5d8a'],part:['רואה רק חלק מהתמונה','#2f9b6e'],input:['הקלט המכריע מבחוץ','#5b6764']};
  const L=[
   {n:'Fiscal Promise Stress-Tester',he:'מבחן לחץ להבטחות',c:'#d18a2c',to:0,cat:'risk',why:'ציון לפוליטיקאים אמיתיים בשמם, בשנת בחירות, באתר אישי: הסיכון גדול מהתועלת.',save:'אם גוף רשמי ועצמאי היה עומד מאחוריו, ולא אתר אישי.'},
   {n:'Golden Rule as Code',he:'כלל הזהב כקוד',c:'#7a3b8f',to:0,cat:'pol',why:'פרלמנט ריבוני לא חייב לציית לשום תוכנה, והנתונים מגיעים מהממשלה עצמה.',save:'אם פרלמנט היה מתחייב בחוק לכלל שכתוב בקוד, ומישהו עצמאי היה מספק את הנתונים.'},
   {n:'Issuance Congestion Forecaster',he:'וייז לתור ההנפקות',c:'#c08a1e',to:0,cat:'data',why:'היסטוריית ההנפקות נמכרת רק במנויים יקרים. בלעדיה המודל לומד את מה שהמצאנו.',save:'אם היסטוריית ההנפקות הייתה פתוחה בחינם.'},
   {n:'Rate-Shock Early Warning',he:'התראה מוקדמת',c:'#2f5d8a',to:1,pfx:'rs',cat:'exists',why:'שלושה מדדי לחץ פיננסי ציבוריים כבר עושים את זה, בחינם.',save:'אם המדדים הציבוריים לא היו קיימים, או אם הוא היה מוסיף משהו שהם לא רואים.'},
   {n:'Maturity Wall Simulator',he:'קיר הפקיעות',c:'#2f9b6e',to:3,pfx:'mw',cat:'part',why:'הוא רואה כמה יעלה החוב ומתי, אבל לא מי ייפגע ראשון כשזה יקרה.',save:'אם היה מחובר לנתונים על מי מחזיק את החוב, ומה קורה לו כשהמחיר זז.'},
   {n:'Fire-Sale Cascade Simulator',he:'שרשרת המכירות',c:'#b1502e',to:4,pfx:'fs',cat:'input',why:'הנתון שהתשובה תלויה בו, המנוף של היום, מגיע מבחוץ, ואין רכיב שאוסף אותו.',save:'אם מישהו היה אוסף את החשיפות של היום, בלי לחשוף אף אחד. מישהו כן?'},
   {n:'Private Exposure Registry',he:'המרשם הפרטי',c:'#1e2422',to:5,pfx:'rg',cat:null,why:'עבר את כל התחנות. אבל לעבור תחנות זה לא אותו דבר כמו לענות על השאלה.',save:''}];
  const DOC={ideation:'מסמך הייזום',poc:'מסמך ה-POC',spec:'מסמך האפיון',arch:'מסמך הארכיטקטורה'};
  const SLUG={rs:'rate-shock',mw:'maturity-wall',fs:'fire-sale',rg:'registry'};
  const FALL_AT=['על הלוח','בייזום','ב-POC','באפיון','בארכיטקטורה'];

  /* keep the old chart folded */
  const sec=wrap.closest('section'); const legend=sec.querySelector('.flow-legend');
  const old=H('details','pm-old'); old.append(H('summary','','התרשים המקורי, כמו שהוא'));
  const host=H('div','pm'); wrap.parentNode.insertBefore(host,wrap); old.append(wrap); if(legend) old.append(legend);

  /* intro */
  const intro=H('div','pm-intro'); intro.innerHTML='<p>זו מפה של קווי רכבת. כל רעיון הוא קו בצבע משלו, וכל תחנה היא מסמך שהוא עבר. איפה שהקו נגמר, שם הרעיון נפל, ושם עומד פגוש עצירה אדום. שבעה קווים יצאו מאותה נקודה, מהבעיה. כמה מהם הגיעו רחוק?</p>';
  host.append(intro);
  const ctl=H('div','pm-ctl'); const play=H('button','pm-btn go','▶ לשלוח את שבע הרכבות'); play.type='button'; const sv=H('button','pm-btn','מה היה מציל אותו?'); sv.type='button'; sv.setAttribute('aria-pressed','false'); ctl.append(play,sv); host.append(ctl);

  /* the map */
  const MOB=innerWidth<700;
  const stage=H('div','pm-stage'); host.append(stage);
  const svg=S('svg',{class:'pm-svg',role:'img','aria-label':'מפת קווים: שבעה רעיונות ועד איזו תחנה כל אחד הגיע'}); stage.append(svg);
  const card=H('div','pm-card'); card.hidden=true; card.setAttribute('aria-live','polite'); stage.append(card);
  // geometry: along = stations, across = lines. Desktop: along runs right to left. Phone: top to bottom.
  const A0=MOB?130:850, DA=MOB?90:-136, C0=MOB?40:64, DC=MOB?40:54;
  const W=MOB?340:1000, Hh=MOB?A0+DA*5+70:C0+DC*6+110; svg.setAttribute('viewBox',`0 0 ${W} ${Hh}`);
  const P=(a,c)=>MOB?[c,a]:[a,c];
  const posA=i=>A0+DA*i, posC=j=>C0+DC*j+(MOB?20:40);
  const hubA=MOB?40:975, hubC=posC(3);
  // station guides
  ST.forEach(([k,n,q],i)=>{ const a=posA(i); const [x1,y1]=P(a,posC(0)-26), [x2,y2]=P(a,posC(6)+22); S('line',{x1,y1,x2,y2,class:'pm-guide'+(k==='door'?' door':'')},svg);
    const [tx,ty]=MOB?[W-4,a+4]:[a,22]; const t=S('text',{x:tx,y:ty,class:'pm-st','text-anchor':MOB?'start':'middle'},svg); t.textContent=n; });
  const [hx,hy]=P(hubA,hubC); S('circle',{cx:hx,cy:hy,r:16,class:'pm-hub'},svg); const ht=S('text',{x:hx,y:hy+(MOB?-24:34),class:'pm-st','text-anchor':'middle'},svg); ht.textContent='הבעיה';
  // door
  { const a=posA(5); const [dx,dy]=P(a,posC(6)); const g=S('g',{class:'pm-door',transform:`translate(${dx} ${dy})`},svg); S('rect',{x:-15,y:-22,width:30,height:40,rx:3},g); S('circle',{cx:8,cy:0,r:2.4,class:'knob'},g); const q=S('text',{x:0,y:6,'text-anchor':'middle',class:'pm-dq'},g); q.textContent='?'; }
  const lines=L.map((l,j)=>{ const c=posC(j); const pts=[P(hubA,hubC)]; const bend=hubA+(MOB?26:-30); pts.push(P(bend,hubC)); pts.push(P(bend+(MOB?40:-60),c)); for(let i=0;i<=l.to;i++) pts.push(P(posA(i),c));
    const d='M'+pts.map(p=>p.join(',')).join(' L');
    const g=S('g',{class:'pm-line',style:`--c:${l.c}`},svg);
    const path=S('path',{d,class:'pm-track'},g);
    // save dashes
    if(l.to<4){ const e1=P(posA(l.to),c), e2=P(posA(Math.min(5,l.to+1.6)),c); S('path',{d:`M${e1.join(',')} L${e2.join(',')}`,class:'pm-save'},g); }
    const sts=[]; for(let i=0;i<=l.to;i++){ const [x,y]=P(posA(i),c); const st=S('g',{class:'pm-stn'+(i===l.to&&l.to<5?' end':''),transform:`translate(${x} ${y})`,tabindex:'0',role:'button','aria-label':l.n+': '+ST[i][1]},g);
      S('circle',{r:i===0?7:9},st); if(i===l.to&&l.to<5){ S('path',{d:MOB?'M-11 13 h22':'M-13 -11 v22',class:'pm-buf'},st); }
      st.addEventListener('click',()=>show(j,i)); st.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); show(j,i); } }); sts.push(st); }
    const lab=S('text',{x:posA(l.to),y:c-15,class:'pm-ln','text-anchor':'middle'},g); lab.textContent=l.he;
    const train=S('g',{class:'pm-train'},g); S('rect',{x:-9,y:-6,width:18,height:12,rx:4},train);
    return {g,path,train,sts}; });

  const leg=H('div','pm-leg'); L.forEach((l,j)=>{ const b=H('button','pm-lg'); b.type='button'; b.style.setProperty('--c',l.c); b.append(H('i'),H('span','',l.he)); b.addEventListener('click',()=>show(j,l.to)); leg.append(b); }); stage.after(leg);
  /* station card */
  function show(j,i){ const l=L[j]; card.hidden=false; card.innerHTML=''; card.style.setProperty('--c',l.c);
    const hd=H('div','pm-ch'); hd.append(H('i','pm-sw'),H('strong','',l.n),H('small','',l.he)); const x=H('button','pm-x','✕'); x.type='button'; x.setAttribute('aria-label','סגירה'); x.addEventListener('click',()=>card.hidden=true); hd.append(x); card.append(hd);
    const k=ST[i][0];
    if(k==='board'){ card.append(H('p','pm-cs','תחנה: הלוח. כאן כל רעיון נשאל חמש שאלות.')); }
    else { const row=H('div','pm-doc'); const im=H('img'); im.alt=''; im.loading='lazy'; im.src='../../assets/img/peek/'+l.pfx+'-'+k+'-p1.jpg'; im.onerror=()=>im.remove(); const t=H('div'); t.append(H('b','',DOC[k]),H('span','',ST[i][2])); const a=H('a','pm-dl','לפתוח (PDF) ←'); a.href='downloads/'+SLUG[l.pfx]+'-'+k+'-he.pdf'; a.target='_blank'; a.rel='noopener'; t.append(a); row.append(im,t); card.append(row); }
    if(i===l.to){ if(l.to<5){ const f=H('p','pm-fall'); f.innerHTML='<b>נפל '+FALL_AT[l.to]+'.</b> '; f.append(l.why); card.append(f); const c=H('span','pm-cat',CAT[l.cat][0]); c.style.setProperty('--k',CAT[l.cat][1]); card.append(c); if(saveOn) card.append(H('p','pm-sv','מה היה מציל אותו: '+l.save)); }
      else card.append(H('p','pm-fall',l.why)); }
    const back=H('a','pm-back','לצפות בהקרנה שלו בשלב 04 ←'); back.href='journey.html'; card.append(back); }

  /* PLAY */
  let playing=false;
  play.addEventListener('click',async()=>{ if(playing) return; playing=true; play.disabled=true; card.hidden=true; host.classList.add('run');
    const T0=performance.now(), dur=reduce?1:5200; const lens=lines.map(o=>o.path.getTotalLength()); const maxL=Math.max(...lens);
    await new Promise(res=>{ const step=now=>{ const k=Math.min(1,(now-T0)/dur); lines.forEach((o,j)=>{ const d=Math.min(lens[j],k*maxL); const p=o.path.getPointAtLength(d); o.train.setAttribute('transform',`translate(${p.x} ${p.y})`); o.train.classList.add('on'); if(d>=lens[j]) o.g.classList.add('arrived'); }); if(k<1) requestAnimationFrame(step); else res(); }; requestAnimationFrame(step); });
    for(const j of [0,1,2,3,4,5,6]){ show(j,L[j].to); lines[j].g.classList.add('hl'); await sleep(2300); lines[j].g.classList.remove('hl'); }
    play.disabled=false; play.textContent='↻ שוב'; playing=false; host.classList.remove('run'); });

  /* what would have saved it */
  let saveOn=false; sv.addEventListener('click',()=>{ saveOn=!saveOn; sv.setAttribute('aria-pressed',saveOn); sv.classList.toggle('on',saveOn); host.classList.toggle('saves',saveOn); savesBox.hidden=!saveOn; });
  const savesBox=H('div','pm-saves'); savesBox.hidden=true; savesBox.append(H('p','pm-h','מה היה מציל כל אחד'),H('p','pm-sub','הקו המקווקו הוא המשך שלא קרה. לכל רעיון שנפל, התנאי שהיה נותן לו להמשיך. שימו לב כמה מהם בכלל לא תלויים בקוד.'));
  const sl=H('ul','pm-sl'); L.filter(l=>l.to<5).forEach(l=>{ const li=H('li'); li.style.setProperty('--c',l.c); li.append(H('b','',l.he),H('span','',l.save)); sl.append(li); }); savesBox.append(sl,H('p','pm-q','ואם אחד התנאים האלה היה מתקיים, מי היה מגיע עד הדלת?')); host.append(savesBox);

  /* why they fell: reason x stage */
  const mx=H('div','pm-mx'); mx.append(H('p','pm-h','למה הם נפלו'),H('p','pm-sub','כל נקודה היא רעיון אחד: באיזו תחנה הוא נפל, ומאיזה סוג סיבה.'));
  const tb=H('table','pm-tab'); const tr0=H('tr'); tr0.append(H('th','',''),...ST.slice(0,5).map(s=>H('th','',s[1]))); tb.append(tr0);
  Object.entries(CAT).forEach(([k,[n,c]])=>{ const tr=H('tr'); const th=H('th','',n); th.style.setProperty('--k',c); tr.append(th); for(let i=0;i<5;i++){ const td=H('td'); L.filter(l=>l.cat===k&&l.to===i).forEach(l=>{ const d=H('i','pm-dot'); d.style.background=l.c; d.title=l.n; td.append(d); }); tr.append(td); } tb.append(tr); });
  const scr=H('div','pm-tabw'); scr.append(tb); mx.append(scr);
  const tech=H('div','pm-tech'); tech.innerHTML='<b>ושורה אחת ריקה לגמרי: "הקוד לא עבד".</b> אף רעיון לא נפל כי הטכנולוגיה לא החזיקה. כולם נפלו על שאלות של נתונים, סיכון, פוליטיקה, או על מה שהם לא רואים.'; mx.append(tech,H('p','pm-q','אז מה בעצם מפיל רעיון טכנולוגי, אם לא הטכנולוגיה?')); host.append(mx);

  /* the reader's guesses */
  let G={}; try{ G=JSON.parse(localStorage.getItem('td-wb-slow-motion-crisis')||'{}'); }catch(e){}
  const gs=H('div','pm-gs'); gs.append(H('p','pm-h','הניחושים שלכם מהלוח'));
  const names=Object.keys(G);
  if(!names.length){ const p=H('p','pm-sub'); p.innerHTML='בשלב 03 אפשר היה לנחש, לפני כל הכרעה, אם רעיון ממשיך או נמחק. לא ניחשתם, או שניחשתם בדפדפן אחר? <a href="ideas.html">אפשר לחזור ללוח ולנסות</a>. מי לדעתכם הייתם מוחקים?'; gs.append(p); }
  else { const ok=names.filter(n=>G[n].g===G[n].go).length; gs.append(H('p','pm-sub','על הלוח צדקתם ב-'+ok+' מתוך '+names.length+'. אבל הלוח היה רק התחנה הראשונה. ככה זה נראה עד הסוף:'));
    const ul=H('ul','pm-gl'); L.forEach(l=>{ const g=G[l.n]; if(!g) return; const li=H('li'); li.style.setProperty('--c',l.c); li.append(H('b','',l.he),H('span','','ניחשתם: '+(g.g?'ממשיך':'נמחק')),H('em','',l.to===0?'נמחק על הלוח':l.to===5?'הגיע עד הדלת':'המשיך, ונפל '+FALL_AT[l.to])); ul.append(li); }); gs.append(ul,H('p','pm-q','מי מאלה שהמשיכו הפתיע אתכם הכי הרבה?')); }
  host.append(gs);
  host.append(old);
})();
