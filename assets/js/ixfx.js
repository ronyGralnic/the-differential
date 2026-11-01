/* Ideation engine (any case): upgrades the generic ideation page (.ix[data-ix=slug], rendered by main.js) with the shared pieces:
   a "from the field" clipping board + the character's opening, a two-layer stepper for the mechanism, personas with before/after mornings,
   a guess-first map, a pre-mortem, and downloads. Each candidate registers a builder: window.IXFX[slug]=function(root, api){...}
   (see c/<case>/ix-<slug>.js). api: {H, sleep, tm, T, face, reduce, secByIx, field, personas, mapGuess, premortem, downloads, stepper, mech}. */
(function(){
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const H=(t,c,x)=>{ const e=document.createElement(t); if(c) e.className=c; if(x!=null) e.textContent=x; return e; };
  const sleep=ms=>new Promise(r=>setTimeout(r,reduce?Math.min(ms,20):ms));
  const tm=(id,w)=>`<button class="tm" data-t="${id}">${w}</button>`;
  const T=(x,y,s,c,a)=>`<text x="${x}" y="${y}" class="${c||'fx-t'}" text-anchor="${a||'middle'}">${s}</text>`;
  const face=(hair,skin,shirt,acc)=>`<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="28" fill="#f3ecd8"/><circle cx="30" cy="27" r="12" fill="${skin}"/><path d="M17 25 q1 -15 13 -15 q13 0 13 15 q-4 -6 -13 -6 q-9 0 -13 6z" fill="${hair}"/><circle cx="26" cy="27" r="1.5" fill="#1e2422"/><circle cx="34" cy="27" r="1.5" fill="#1e2422"/><path d="M26 33 q4 2.5 8 0" stroke="#1e2422" stroke-width="1.5" fill="none"/><path d="M12 58 q4 -16 18 -16 q14 0 18 16z" fill="${shirt}"/>${acc||''}</svg>`;
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

  /* the mechanism section: replaces "איך זה עובד" with a box; build(section, box) fills it */
  function mech(root,build){ const old=secByIx(root,'איך זה עובד'); if(!old) return; const s=H('section','ix-sec fx-mech'); s.append(H('p','ix-kicker','איך זה עובד')); const box=H('div','fx-mbox'); s.append(box); old.replaceWith(s); build(s,box); }
  const api={H,sleep,tm,T,face,reduce,secByIx,field,personas,mapGuess,premortem,downloads,stepper,mech};
  function boot(){ document.querySelectorAll('.ix[data-ix]').forEach(root=>{ const f=(window.IXFX||{})[root.dataset.ix]; if(!f||root.dataset.fx) return; root.dataset.fx='1'; f(root,api); if(window.TermWin) window.TermWin.wire(root); }); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,0)); else setTimeout(boot,0);
})();
