/* Case 02 · Stage 07 additions, after epilogue.js has rendered. "After the lights went out": the messages as a night sky
   (stars by stage and domain, constellation lines from the existing links), where the characters are now, what we would do differently,
   the reader's own recap (stages, guesses, bet, terms opened; localStorage only), the case glossary (printable), a three-question check,
   the shelf of every Case 02 document, and a bridge to Case 01. The old notes board stays, folded. */
(function(){
  function boot(){
  const root=document.getElementById('epilogue'); if(!root||root.dataset.case!=='slow-motion-crisis'||root.dataset.c2) return;
  if(!root.querySelector('.ep-mono')){ setTimeout(boot,60); return; } root.dataset.c2='1';
  const D=window.EPILOGUE['slow-motion-crisis']; const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const H=(t,c,x)=>{ const e=document.createElement(t); if(c) e.className=c; if(x!=null) e.textContent=x; return e; };
  const NS='http://www.w3.org/2000/svg'; const S=(t,a,p)=>{ const e=document.createElementNS(NS,t); for(const k in a) e.setAttribute(k,a[k]); if(p) p.append(e); return e; };
  const ls=(k,d)=>{ try{ const v=localStorage.getItem(k); return v==null?d:JSON.parse(v); }catch(e){ return d; } };
  const byId={}; D.msgs.forEach(m=>byId[m.id]=m); const dName={}; D.domains.forEach(([k,n])=>dName[k]=n); const stName={}; D.stages.forEach(([n,t])=>stName[n]=t);
  const blk=cls=>{ const s=H('div','ep-b on ec '+cls); return s; };
  const $=c=>root.querySelector(c);
  const intro=$('.ep-intro'), thread=$('.ep-thread'), board=$('.ep-board'), pick=$('.ep-pick'), open=$('.ep-open'), mono=$('.ep-mono');
  const COL={tech:'#7fc8f8',soc:'#f4a259',law:'#c3a6ff',hum:'#8ee3a8'};

  /* 1 · the night sky */
  const sky=blk('ec-sky'); sky.append(H('h4','ep-h','שמי הלילה של התיק'),H('p','ep-p','כל כוכב הוא מסר אחד שנשאר אחרי שהאור כבה. מימין לשמאל: התחנה שבה הוא נולד, מהסיפור ועד ההכרעה. הקווים מחברים מסרים שמדברים זה עם זה. לחצו על כוכב.'));
  const chips=H('div','ec-dom'); sky.append(chips);
  const W=900, Hh=400; const svg=S('svg',{viewBox:`0 0 ${W} ${Hh}`,class:'ec-svg',role:'img','aria-label':'שמי לילה: מסרי התיק ככוכבים'}); sky.append(svg);
  for(let i=0;i<90;i++){ S('circle',{cx:(i*137.5)%W,cy:(i*71.3)%(Hh-40),r:(i%5===0?1.4:.8),class:'ec-bg',style:`--d:${(i%9)*.4}s`},svg); }
  const BAND={tech:70,soc:150,law:230,hum:310};
  const pos={}; const cnt={}; D.msgs.forEach(m=>{ const key=m.st+m.d; cnt[key]=(cnt[key]||0)+1; const k=cnt[key]; pos[m.id]=[W-60-(m.st-1)*150-(k-1)*34*((k%2)?1:-1)*.8, BAND[m.d]+((k*29)%40)-20]; });
  D.stages.forEach(([n,t])=>{ const x=W-60-(n-1)*150; const tx=S('text',{x,y:Hh-12,class:'ec-stl','text-anchor':'middle'},svg); tx.textContent='0'+n+' '+t; });
  const lg=S('g',{class:'ec-lines'},svg); const seen=new Set(); const LN=[];
  D.msgs.forEach(m=>m.ln.forEach(o=>{ if(!byId[o]) return; const k=[m.id,o].sort().join('-'); if(seen.has(k)) return; seen.add(k); const [x1,y1]=pos[m.id],[x2,y2]=pos[o]; LN.push([S('line',{x1,y1,x2,y2,class:'ec-ln'},lg),m.id,o]); }));
  const stars={}; D.msgs.forEach((m,i)=>{ const [x,y]=pos[m.id]; const g=S('g',{class:'ec-star d-'+m.d,transform:`translate(${x} ${y})`,tabindex:'0',role:'button','aria-label':m.t,style:`--c:${COL[m.d]};--d:${(i%7)*.5}s`},svg);
    S('circle',{r:14,class:'ec-halo'},g); S('path',{d:'M0 -8 L2 -2 L8 0 L2 2 L0 8 L-2 2 L-8 0 L-2 -2z',class:'ec-sp'},g);
    g.addEventListener('click',()=>sel(m.id)); g.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); sel(m.id); } }); stars[m.id]=g; });
  const info=H('div','ec-info'); info.setAttribute('aria-live','polite'); info.innerHTML='<p class="ep-p">בחרו כוכב, או התחילו מהבהיר ביותר: <button type="button" class="ec-chip" data-id="s1">המידע היה שם. אף אחד לא חיבר אותו.</button></p>'; sky.append(info);
  info.querySelector('[data-id]').addEventListener('click',()=>sel('s1'));
  let dom='all'; D.domains.forEach(([k,n])=>{ const b=H('button','ec-dc'+(k==='all'?' on':''),n); b.type='button'; if(COL[k]) b.style.setProperty('--c',COL[k]); b.addEventListener('click',()=>{ dom=k; chips.querySelectorAll('.ec-dc').forEach(x=>x.classList.toggle('on',x===b)); D.msgs.forEach(m=>stars[m.id].classList.toggle('dim',dom!=='all'&&m.d!==dom)); }); chips.append(b); });
  function sel(id){ const m=byId[id]; Object.values(stars).forEach(s=>s.classList.remove('sel','rel')); stars[id].classList.add('sel'); m.ln.forEach(o=>stars[o]&&stars[o].classList.add('rel'));
    LN.forEach(([l,a,b])=>l.classList.toggle('on',a===id||b===id));
    info.textContent=''; info.style.setProperty('--c',COL[m.d]); info.append(H('p','ec-tag',dName[m.d]+' · נולד בשלב 0'+m.st+', '+stName[m.st]),H('h5','ec-t',m.t),H('p','ep-p',m.s),H('p','ec-ev','הרגע שבו זה קרה: '+m.ev));
    const rel=m.ln.map(o=>byId[o]).filter(Boolean); if(rel.length){ const r=H('div','ec-rel'); r.append(H('span','','מדבר עם:')); rel.forEach(x=>{ const b=H('button','ec-chip',x.t); b.type='button'; b.addEventListener('click',()=>sel(x.id)); r.append(b); }); info.append(r); } }
  sky.append(H('p','ep-q','איזה כוכב הייתם לוקחים איתכם מהתיק הזה?'));
  intro.after(sky);
  const fold=H('details','ec-fold'); fold.append(H('summary','','המסרים כפתקים על לוח, עם סינון לפי תחנה')); thread.before(fold); fold.append(thread,board);

  /* 2 · where are they now */
  const BOND='<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="28" fill="#e4efec"/><rect x="17" y="9" width="26" height="40" rx="4" fill="#fffdf8" stroke="#8a7f66" stroke-width="1.4"/><circle cx="25" cy="24" r="2.2" fill="#1e2422"/><circle cx="35" cy="24" r="2.2" fill="#1e2422"/><path d="M25 31 q5 4 10 0" stroke="#1e2422" stroke-width="1.6" fill="none"/><text x="30" y="44" text-anchor="middle" font-size="8" font-weight="700" fill="#b1502e">0.5%</text></svg>';
  const face=(hair,skin,shirt,acc)=>`<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="28" fill="#f3ecd8"/><circle cx="30" cy="27" r="12" fill="${skin}"/><path d="M17 25 q1 -15 13 -15 q13 0 13 15 q-4 -6 -13 -6 q-9 0 -13 6z" fill="${hair}"/><circle cx="26" cy="27" r="1.5" fill="#1e2422"/><circle cx="34" cy="27" r="1.5" fill="#1e2422"/><path d="M26 33 q4 2.5 8 0" stroke="#1e2422" stroke-width="1.5" fill="none"/><path d="M12 58 q4 -16 18 -16 q14 0 18 16z" fill="${shirt}"/>${acc||''}</svg>`;
  const SARAH=face('#8a5a3b','#f2d2b6','#2f6f68','<rect x="22" y="24" width="7" height="5" rx="2" fill="none" stroke="#1e2422" stroke-width="1.2"/><rect x="31" y="24" width="7" height="5" rx="2" fill="none" stroke="#1e2422" stroke-width="1.2"/>');
  const wn=blk('ec-now'); wn.append(H('h4','ep-h','איפה הם עכשיו'),H('p','ep-p','ארבע דמויות ליוו את התיק, כולן בדויות. לפני שהאור כבה לגמרי, כל אחת אומרת משפט אחד.'));
  const g=H('div','ec-cast'); [[BOND,'האג"ח של 2016','מתחילת הסיפור','פקעתי. מי שהחליפה אותי משלמת בערך פי שבעה, ומאחוריי עומדות עוד מאות כמוני. את החשבון הזה אפשר היה לחשב מראש, אג"ח אחר אג"ח.','s2'],
    [SARAH,'שרה, מורה ממנצ\'סטר','מהחלק המהיר','הפנסיה שלי שרדה את 2022 כי מישהו התערב בזמן. בפעם הבאה הייתי רוצה שמישהו יראה את זה עוד לפני, ולא יגלה את זה ממני.','s1'],
    [face('#4a2f22','#e9c6a8','#2f5d8a'),'אמה, אנליסטית ברשות פיקוח','מהמרשם','אני עדיין לא רואה אף קרן בודדת. אבל בבוקר של משבר אני יודעת מה המצב של השוק היום, ולא מנחשת אותו.','s13'],
    [face('#1f1a17','#d8a985','#b1502e'),'נועה ברק, עיתונאית כלכלית','מקיר הפקיעות','הכלי שלי נפל באפיון, אבל השאלה שלו נשארה: כמה יעלה החוב, ומתי. ואת זה עוד אפשר לשאול כל בוקר.','s9']].forEach(([av,n,from,t,id])=>{ const c=H('article','ec-p'); const a=H('span','ec-av'); a.innerHTML=av; const d=H('div'); d.append(H('b','',n),H('small','',from),H('p','','"'+t+'"')); const b=H('button','ec-chip','הכוכב שלה: '+byId[id].t); b.type='button'; b.addEventListener('click',()=>{ sel(id); sky.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'}); }); d.append(b); c.append(a,d); g.append(c); });
  wn.append(g,H('p','ep-q','ואתם, עם איזו מהן הייתם רוצים לשבת לקפה?')); fold.after(wn);

  /* 3 · what we would do differently */
  const lw=blk('ec-less'); lw.append(H('h4','ep-h','מה היינו עושים אחרת'),H('p','ep-p','תהליך טוב לומד גם מעצמו. שלושה דברים שהיינו משנים, אם היינו מתחילים את התיק מחדש מחר בבוקר.'));
  const ul=H('div','ec-lg'); [['לבדוק מה קיים, לפני שכותבים ייזום','Rate-Shock Early Warning נפל בייזום, כשגילינו ששלושה מדדים ציבוריים כבר עושים את זה. חיפוש של שעה לפני הכתיבה היה חוסך מסמך שלם.','מה עוד אפשר לבדוק בשעה, לפני שמשקיעים שבוע?'],
    ['לשאול "מאיפה הנתון?" כבר בייזום','Fire-Sale הגיע עד הארכיטקטורה לפני שהתברר שהקלט המכריע מגיע מבחוץ. השאלה הזו הייתה יכולה להישאל בעמוד הראשון.','כמה רעיונות טובים נשענים על נתון שאף אחד לא אוסף?'],
    ['לכתוב מודל איום מוקדם','מודל האיום שינה את התכנון של שלושת השורדים יותר מכל רעיון אחר. כשהוא מגיע אחרי האפיון, חלק מהעבודה נכתב פעמיים.','מה עוד כדאי לדמיין שמשתבש, לפני שמתחילים?']].forEach(([h,t,q],i)=>{ const c=H('article','ec-l'); c.append(H('span','ec-ln2','0'+(i+1)),H('b','',h),H('p','',t),H('p','ec-lq',q)); ul.append(c); });
  lw.append(ul); pick.after(lw);

  /* 4 · your recap + glossary + check */
  const rc=blk('ec-rec'); rc.append(H('h4','ep-h','הדרך שלכם'),H('p','ep-p','מה עשיתם בתיק הזה. הכול נשמר רק בדפדפן שלכם.'));
  const seenSt=ls('td-seen-slow-motion-crisis',[]).map(Number); const G=ls('td-wb-slow-motion-crisis',{}); const bet=ls('td-bet-slow-motion-crisis',null); const T=window.TERMS||{}; const opened=ls('td-terms',[]).filter(k=>T[k]);
  const tiles=H('div','ec-tiles');
  const st=H('div','ec-tile'); const dots=H('div','ec-sd'); for(let n=1;n<=7;n++){ const d=H('i',seenSt.includes(n)?'on':'','0'+n); dots.append(d); } st.append(H('small','','שלבים שביקרתם בהם'),H('b','',seenSt.filter(n=>n>=1&&n<=7).length+' מתוך 7'),dots); tiles.append(st);
  const gn=Object.keys(G); const gk=gn.filter(n=>G[n].g===G[n].go).length; const t2=H('div','ec-tile'); t2.append(H('small','','ניחושים על הלוח, שלב 03'),H('b','',gn.length?gk+' מתוך '+gn.length:'עוד לא')); if(!gn.length){ const a=H('a','','לנחש ←'); a.href='ideas.html'; t2.append(a); } tiles.append(t2);
  const t3=H('div','ec-tile'); t3.append(H('small','','ההימור שלכם, שלב 06'),H('b','',bet?(bet==='Private Exposure Registry'?'המרשם':'הסימולציה'):'עוד לא')); if(!bet){ const a=H('a','','להמר ←'); a.href='decision.html'; t3.append(a); } tiles.append(t3);
  const t4=H('div','ec-tile'); t4.append(H('small','','מונחים שפתחתם'),H('b','',opened.length+' מתוך '+Object.keys(T).length)); tiles.append(t4);
  rc.append(tiles);
  // glossary
  const gl=H('div','ec-gloss'); gl.append(H('h5','ec-gh','מילון התיק'),H('p','ep-p','כל המונחים של התיק במקום אחד: משפט אחד, ודוגמה מהחיים. מה שפתחתם בדרך מסומן.'));
  const gct=H('div','ec-gct'); const fAll=H('button','ec-dc on','הכול'), fMine=H('button','ec-dc','רק מה שפתחתי'), pr=H('button','ec-dc','להדפסה'); [fAll,fMine,pr].forEach(b=>b.type='button'); gct.append(fAll,fMine,pr); gl.append(gct);
  const gli=H('dl','ec-gl'); Object.entries(T).forEach(([k,d])=>{ const w=H('div','ec-gi'+(opened.includes(k)?' mine':'')); w.append(H('dt','',d.t),H('dd','',d.one),H('dd','ec-you',d.you)); gli.append(w); }); gl.append(gli);
  fAll.addEventListener('click',()=>{ gl.classList.remove('only'); fAll.classList.add('on'); fMine.classList.remove('on'); }); fMine.addEventListener('click',()=>{ gl.classList.add('only'); fMine.classList.add('on'); fAll.classList.remove('on'); });
  pr.addEventListener('click',()=>{ document.documentElement.classList.add('pg'); setTimeout(()=>{ window.print(); document.documentElement.classList.remove('pg'); },50); });
  rc.append(gl);
  // three questions
  const qz=H('div','ec-quiz'); qz.append(H('h5','ec-gh','שלוש שאלות לסיום'),H('p','ep-p','כמו בסוף הסיפור, רק שעכשיו אתם יודעים הכול.'));
  const QS=[['למה ריבית יורדת יכולה דווקא לייקר חוב של מדינה?',['כי הבנק המרכזי מעלה מסים','כי האג"ח שפוקעות עכשיו הונפקו בריבית נמוכה עוד יותר','כי מדינות לווים יותר כשהריבית יורדת'],1,'החוב שמוחלף עכשיו נלקח בעשור של הכסף הזול. גם ריבית "נמוכה" של היום גבוהה ממנו.'],
    ['מה היה חסר בבריטניה ב-2022 וב-SVB ב-2023, לפי התיק?',['מידע','כסף בבנק המרכזי','מישהו שיחבר את המידע בזמן'],2,'הקרנות ידעו כמה הן ממונפות, והבנק ידע מה יש לו. אף אחד לא ראה את כולם יחד.'],
    ['למה Fire-Sale Cascade Simulator נעצר בבדיקת הסגירה?',['הקוד שלו היה איטי מדי','הנתון שהתשובה תלויה בו מגיע מבחוץ','הוא חשף נתונים של קרנות'],1,'הסימולציה מצוינת, אבל המנוף של היום הוא קופסה ריקה מחוץ לגבולות שלה.']];
  let qok=0, qdone=0; const qres=H('p','ec-qres'); QS.forEach(([q,o,c,why],i)=>{ const w=H('div','ec-q'); w.append(H('p','ec-qq',(i+1)+'. '+q)); const row=H('div','ec-qo'); const ex=H('p','ec-qx'); ex.hidden=true; o.forEach((t,j)=>{ const b=H('button','ec-qb',t); b.type='button'; b.addEventListener('click',()=>{ if(w.dataset.done) return; w.dataset.done='1'; qdone++; if(j===c) qok++; b.classList.add(j===c?'y':'n'); row.children[c].classList.add('y'); ex.hidden=false; ex.textContent=(j===c?'נכון. ':'לא בדיוק. ')+why; if(qdone===3) qres.textContent='ענית נכון על '+qok+' מתוך 3. ומה הייתם שואלים את מי שקורא את התיק אחריכם?'; }); row.append(b); }); w.append(row,ex); qz.append(w); });
  qz.append(qres); rc.append(qz); open.after(rc);

  /* 5 · the shelf */
  const sh=blk('ec-shelf'); sh.append(H('h4','ep-h','מדף המסמכים'),H('p','ep-p','כל מסמך שנכתב בתיק, של כל רעיון, עד התחנה שבה הוא נעצר. בעברית ובאנגלית.'));
  const DOCS=[['Private Exposure Registry','registry','rg',['ideation','poc','spec','arch','adr-log','design']],['Fire-Sale Cascade Simulator','fire-sale','fs',['ideation','poc','spec','arch','adr-log','design']],['Maturity Wall Simulator','maturity-wall','mw',['ideation','poc','spec']],['Rate-Shock Early Warning','rate-shock','rs',['ideation']],['התיק כולו','slow-motion-crisis','c2',['threat-model','decision']]];
  const KN={ideation:'ייזום',poc:'POC',spec:'אפיון',arch:'ארכיטקטורה','adr-log':'יומן החלטות',design:'מסמך עיצוב','threat-model':'מודל האיום',decision:'ההכרעה'};
  DOCS.forEach(([n,slug,pk,ks])=>{ const row=H('div','ec-row'); row.append(H('b','ec-rn',n)); const shelf=H('div','ec-books'); ks.forEach(k=>{ const c=H('div','ec-book'); const im=H('img'); im.alt=''; im.loading='lazy'; im.src='../../assets/img/peek/'+pk+'-'+k+'-p1.jpg'; im.onerror=()=>im.remove(); const t=H('div'); t.append(H('span','',KN[k])); const a=H('span','ec-bl'); [['עב','he'],['EN','en']].forEach(([l,lg])=>{ const x=H('a','',l); x.href='downloads/'+slug+'-'+k+'-'+lg+'.pdf'; x.setAttribute('download',''); x.setAttribute('aria-label',KN[k]+' · '+n+' · '+(lg==='he'?'עברית':'English')); a.append(x); }); t.append(a); c.append(im,t); shelf.append(c); }); row.append(shelf); sh.append(row); });
  sh.append(H('p','ep-q','איזה מסמך הייתם קוראים ראשון, ולמה דווקא אותו?')); rc.after(sh);

  /* 6 · bridge to Case 01 */
  const br=blk('ec-bridge'); br.innerHTML='<p class="ep-kicker">ומכאן</p><h4 class="ep-h">אותו דפוס, תיק אחר</h4><p class="ep-p">בתיק הראשון השאלה הייתה מי עוצר מודל AI שיצא משליטה. גם שם המידע היה מפוזר בין מי שלא סומכים זה על זה, וגם שם הרעיון ששרד הוא כזה שמשאיר עדות שאי אפשר לזייף, במקום לבקש מכולם לסמוך זה על זה. מקרה, או דפוס?</p><a class="ec-go" href="../model-kill-switch/index.html">לתיק הראשון: מי מחזיק את המתג? ←</a>';
  sh.after(br);
  if(window.TermWin) window.TermWin.wire(root);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,0)); else setTimeout(boot,0);
})();
