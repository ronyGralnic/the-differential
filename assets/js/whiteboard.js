/* Stage 03 engine (any case). Content: window.WB[case] factory (c/<case>/whiteboard.js). the whiteboard. Funnel sketch, five questions, seven ideas in marker, guess first, then the verdict
   (green marker writes a question for survivors; red strike and eraser for the fallen). */
(function(){
  const wb=document.getElementById('wb'); if(!wb) return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const H=(t,c,x)=>{ const e=document.createElement(t); if(c) e.className=c; if(x!=null) e.textContent=x; return e; };

  /* ---------- marker sketches ---------- */
  const sketch=(a,b,c)=>`<svg viewBox="0 0 400 120" class="wb-sk" role="img" aria-label="${a}, נכנס ל${b}, ויוצא: ${c}">
   <rect x="294" y="30" width="100" height="60" rx="14" class="m-box blue"/>${wrapText(a,344,60,12)}
   <path d="M290 60 C276 56 270 64 256 60" class="m-arr"/><path d="M260 53 L252 60 L261 66" class="m-arr"/>
   <rect x="146" y="18" width="104" height="84" rx="16" class="m-box black"/>${wrapText(b,198,60,12)}
   <path d="M142 60 C128 56 122 64 108 60" class="m-arr"/><path d="M112 53 L104 60 L113 66" class="m-arr"/>
   <rect x="2" y="30" width="100" height="60" rx="14" class="m-box blue"/>${wrapText(c,52,60,12)}</svg>`;
  function wrapText(s,x,y,max){ const w=s.split(' '); const L=[]; let cur=''; w.forEach(t=>{ if((cur+' '+t).trim().length>max){ if(cur) L.push(cur); cur=t; } else cur=(cur+' '+t).trim(); }); if(cur) L.push(cur);
    const y0=y-(L.length-1)*8; return L.map((l,i)=>`<text x="${x}" y="${y0+i*16+4}" class="m-t sm" text-anchor="middle">${l}</text>`).join(''); }
  const CASE=document.body.dataset.case; const F=(window.WB||{})[CASE]; if(!F) return; const C=F({H,sketch,wrapText}); const {QS,PROB,I,FIG}=C; const NP=Object.keys(PROB).length-1;

  /* ---------- build ---------- */
  const surf=H('div','wb-surface'); wb.append(surf);
  // ghost residue + corner date + legend
  const ghost=H('div','wb-ghost'); ghost.setAttribute('aria-hidden','true'); ghost.innerHTML=C.ghost; surf.append(ghost);
  const old=H('a','wb-oldlink',C.old[0]); old.href=C.old[1]; surf.append(old);
  const top=H('div','wb-top'); top.append(H('span','wb-date',C.date),H('span','wb-brand','THE DIFFERENTIAL')); surf.append(top);
  // funnel
  const fn=H('div','wb-funnel'); fn.innerHTML=`<svg viewBox="0 0 720 170" class="wb-fsvg" role="img" aria-label="${NP} בעיות נכנסות, ${I.length} רעיונות יוצאים, וחמש שאלות מסננות אותם">
    ${['yellow','blue','pink','green','orange'].slice(1,NP+1).map((c,i)=>`<rect x="${640-i*8}" y="${20+i*30}" width="54" height="26" rx="2" class="wb-mini ${c}" transform="rotate(${[-4,3,-2,5][i]} ${667-i*8} ${33+i*30})"/>`).join('')}
    <text x="664" y="160" class="m-t sm" text-anchor="middle">${NP} בעיות</text>
    <path d="M600 84 C570 78 560 90 532 84" class="m-arr draw"/><path d="M538 76 L528 84 L539 92" class="m-arr draw"/>
    ${Array.from({length:I.length},(_,i)=>`<circle cx="${430+((i%3)-1)*34}" cy="${46+Math.floor(i/3)*38}" r="14" class="m-dot draw" style="--i:${i}"/>`).join('')}
    <text x="430" y="160" class="m-t sm" text-anchor="middle">${I.length} רעיונות</text>
    <path d="M370 84 C340 78 330 90 302 84" class="m-arr draw"/><path d="M308 76 L298 84 L309 92" class="m-arr draw"/>
    <path d="M286 24 L186 24 L226 92 L226 146 L246 146 L246 92 Z" class="m-funnel draw"/><text x="236" y="58" class="m-t" text-anchor="middle">5 שאלות</text>
    <path d="M216 140 C160 136 150 146 110 140" class="m-arr green draw"/><path d="M116 132 L106 140 L117 148" class="m-arr green draw"/>
    <text x="60" y="132" class="m-t green" text-anchor="middle">ממשיכים</text><text x="60" y="152" class="m-t green" text-anchor="middle">לחקירה</text>
    <path d="M232 24 L210 4" class="m-arr red draw"/><text x="204" y="16" class="m-t sm red" text-anchor="start">נמחקים</text></svg>`;
  surf.append(fn);
  // questions + legend
  const side=H('div','wb-side');
  const qs=H('div','wb-qs'); qs.append(H('p','wb-qh','חמש השאלות')); const ol=H('ol'); QS.forEach(q=>ol.append(H('li','',q))); qs.append(ol); side.append(qs);
  const lg=H('div','wb-legend'); lg.innerHTML='<p class="wb-qh">מקרא הטושים</p><span class="lk blue">כחול: הרעיון</span><span class="lk black">שחור: שאלות</span><span class="lk green">ירוק: ממשיך</span><span class="lk red">אדום: נפסל</span><span class="lk dim">✓ עובר · ~ חלקי · ✗ נכשל</span>';
  side.append(lg); surf.append(side);
  // ideas
  const grid=H('div','wb-grid'); surf.append(grid);
  let ok=0, done=0; const score=H('div','wb-score'); score.hidden=true;
  const cards=I.map((d,k)=>{
    const c=H('article','wb-card'); c.dataset.go=d.go?'1':'0'; c.style.setProperty('--r',([-.6,.5,-.4,.7,-.5,.4,-.7][k%7])+'deg');
    const pr=PROB[d.from]; const st=H('a','wb-sticky '+pr[1]); st.href='problems.html#'+d.from; st.append(H('span','','צמח מ:'),H('b','',pr[0])); c.append(st);
    const hd=H('div','wb-hd'); hd.append(H('span','wb-num',String(k+1)),H('h3','wb-name',d.n)); c.append(hd);
    c.append(H('p','wb-h',d.h));
    const body=H('div','wb-body'); body.append(H('p','wb-idea',d.idea));
    const sk=H('div','wb-skw'); sk.innerHTML=sketch(d.sk[0],d.sk[1],d.sk[2]); body.append(sk);
    const who=H('p','wb-who'); who.append(H('span','wb-wk','מי צריך את זה: '),H('b','',d.who[0]),document.createTextNode(', '+d.who[1])); body.append(who);
    c.append(body);
    const strike=document.createElementNS('http://www.w3.org/2000/svg','svg'); strike.setAttribute('class','wb-strike'); strike.setAttribute('viewBox','0 0 100 20'); strike.setAttribute('preserveAspectRatio','none'); strike.setAttribute('aria-hidden','true'); strike.innerHTML='<path pathLength="1" d="M2 12 C30 6 60 16 98 8"/>'; hd.append(strike);
    const ask=H('div','wb-ask'); ask.append(H('p','wb-askq','ממשיך איתנו?'));
    const b1=H('button','wb-g go','ממשיך ✓'), b2=H('button','wb-g out','נפסל ✗'); b1.type=b2.type='button';
    ask.append(b1,b2); c.append(ask);
    const ver=H('div','wb-ver'); ver.hidden=true;
    const marks=H('div','wb-marks'); QS.forEach((q,j)=>{ const m=H('span','wb-mk'); m.append(H('i','',''),H('span','',q)); m.dataset.v=d.ck[j]; m.style.setProperty('--j',j); marks.append(m); }); ver.append(marks);
    const vt=H('div','wb-vt '+(d.go?'green':'red'));
    if(d.go){ vt.append(H('p','wb-stamp','ממשיך לחקירה'),H('p','wb-why',d.v),H('p','wb-myst',d.q)); }
    else { vt.append(H('p','wb-stamp',d.fall)); const f=H('div','wb-fallfig'); f.innerHTML=FIG[d.fig]; vt.append(f,H('p','wb-why',d.v)); }
    ver.append(vt); c.append(ver);
    const reveal=(guess)=>{ if(c.classList.contains('done')) return; c.classList.add('done'); done++;
      const right=guess===null?null:(guess===d.go); if(right) ok++;
      if(guess!==null){ try{ const K='td-wb-'+CASE; const o=JSON.parse(localStorage.getItem(K)||'{}'); o[d.n]={g:guess,go:d.go}; localStorage.setItem(K,JSON.stringify(o)); }catch(e){} }
      ask.hidden=true; ver.hidden=false;
      if(guess!==null){ const r=H('p','wb-guess '+(right?'y':'n'),(right?'ניחשתם נכון':'ניחשתם אחרת')+': '+(guess?'"ממשיך"':'"נפסל"')); ver.prepend(r); }
      requestAnimationFrame(()=>c.classList.add(d.go?'is-go':'is-out'));
      if(done===I.length){ score.hidden=false; score.querySelector('b').textContent=ok+' מתוך '+I.length; } };
    b1.addEventListener('click',()=>reveal(true)); b2.addEventListener('click',()=>reveal(false));
    c._reveal=reveal; grid.append(c); return c; });
  score.innerHTML=C.score;
  surf.append(score);
  // tray
  const tray=H('div','wb-tray'); tray.setAttribute('role','toolbar'); tray.setAttribute('aria-label','מגש הטושים: סינון והסבר');
  const mk=(cls,lab,fn)=>{ const b=H('button','wb-marker '+cls); b.type='button'; b.setAttribute('aria-label',lab); b.title=lab; b.append(H('span','cap'),H('span','barrel')); b.addEventListener('click',fn); tray.append(b); return b; };
  const toast=H('span','wb-toast'); toast.setAttribute('aria-live','polite');
  const filt=v=>{ const anyDone=cards.some(c=>c.classList.contains('done')); if(!anyDone){ toast.textContent='קודם תנחשו, ואז אפשר לסנן'; return; }
    wb.dataset.f=wb.dataset.f===v?'':v; toast.textContent=wb.dataset.f==='go'?'מסומנים: מי שממשיך':wb.dataset.f==='out'?'מסומנים: מי שנמחק':''; };
  mk('blue','כחול: הרעיונות',()=>{ wb.dataset.f=''; toast.textContent='כחול: כל הרעיונות'; });
  mk('black','שחור: לחזור לחמש השאלות',()=>{ qs.scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'}); });
  mk('green','ירוק: מי שממשיך',()=>filt('go'));
  mk('red','אדום: מי שנמחק',()=>filt('out'));
  const er=H('button','wb-eraser'); er.type='button'; er.setAttribute('aria-label','מוחק: לנחש מחדש'); er.title='מוחק: לנחש מחדש'; er.addEventListener('click',()=>{ cards.forEach(c=>{ c.classList.remove('done','is-go','is-out'); c.querySelector('.wb-ask').hidden=false; const v=c.querySelector('.wb-ver'); v.hidden=true; const g=v.querySelector('.wb-guess'); if(g) g.remove(); }); ok=0; done=0; score.hidden=true; wb.dataset.f=''; toast.textContent='הלוח נמחק. אפשר לנחש מחדש'; }); tray.append(er,toast);
  surf.append(tray);
  document.getElementById('wb-all').addEventListener('click',()=>cards.forEach(c=>c._reveal(null)));
  // plain text toggle
  const pl=document.getElementById('wb-plain'); let plain=false; try{ plain=localStorage.getItem('td-wbplain')==='1'; }catch(e){}
  const setP=v=>{ plain=v; wb.classList.toggle('plain',v); pl.setAttribute('aria-pressed',String(v)); pl.textContent=v?'לחזור לכתב יד':'לקרוא בכתב רגיל'; try{ localStorage.setItem('td-wbplain',v?'1':'0'); }catch(e){} };
  setP(plain); pl.addEventListener('click',()=>setP(!plain));
  // write-in animations on view
  if('IntersectionObserver' in window && !reduce){ wb.classList.add('arm');
    const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }),{threshold:.25});
    [fn,...cards].forEach(x=>io.observe(x)); } else { fn.classList.add('in'); cards.forEach(c=>c.classList.add('in')); }
})();
