/* Stage 07: what remains. Messages board, thread by stage, pick-a-message, open questions, closing monologue. */
(function(){
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const H=(t,c,x)=>{ const e=document.createElement(t); if(c) e.className=c; if(x!=null) e.textContent=x; return e; };
  const sleep=ms=>new Promise(r=>setTimeout(r,reduce?10:ms));
  const root=document.getElementById('epilogue'); if(!root) return;
  const D=window.EPILOGUE&&window.EPILOGUE[root.dataset.case]; if(!D) return;
  root.classList.add('ep');
  if(!reduce) root.addEventListener('pointermove',e=>{ const r=root.getBoundingClientRect(); root.style.setProperty('--mx',(e.clientX-r.left)+'px'); root.style.setProperty('--my',(e.clientY-r.top)+'px'); });
  const byId={}; D.msgs.forEach(m=>byId[m.id]=m);
  const stageName={}; D.stages.forEach(s=>stageName[s[0]]=s[1]);
  const dName={}; D.domains.forEach(d=>dName[d[0]]=d[1]);
  const blk=cls=>{ const s=H('div','ep-b '+cls); const o=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ s.classList.add('on'); o.disconnect(); } })); o.observe(s); if(reduce) s.classList.add('on'); root.append(s); return s; };

  /* modal */
  let modal=null,last=null;
  const esc=e=>{ if(e.key==='Escape'){ e.stopImmediatePropagation(); e.preventDefault(); closeM(); } };
  function closeM(){ if(!modal) return; modal.remove(); modal=null; removeEventListener('keydown',esc,true); if(last&&last.focus) last.focus(); }
  function openM(m){
    last=document.activeElement; if(modal) modal.remove();
    modal=H('div','ep-modal'); const back=H('div','ep-mback'); back.addEventListener('click',closeM);
    const c=H('div','ep-mcard'); c.setAttribute('role','dialog'); c.setAttribute('aria-modal','true'); c.setAttribute('aria-label',m.t);
    const x=H('button','ep-x','✕'); x.type='button'; x.setAttribute('aria-label','סגירה'); x.addEventListener('click',closeM);
    c.append(x,H('p','ep-tag',dName[m.d]+' · שלב 0'+m.st),H('h4','ep-mt',m.t),H('p','ep-ms',m.s),H('p','ep-ev','הרגע שבו זה קרה: '+m.ev));
    const rel=m.ln.map(i=>byId[i]).filter(Boolean);
    if(rel.length){ c.append(H('p','ep-rl','מדבר עם:')); const row=H('div','ep-chips'); rel.forEach(r=>{ const b=H('button','ep-chip',r.t); b.type='button'; b.addEventListener('click',()=>openM(r)); row.append(b); }); c.append(row); }
    modal.append(back,c); document.body.append(modal); addEventListener('keydown',esc,true); x.focus();
    if(!reduce) c.animate([{opacity:0,transform:'translateY(14px) scale(.98)'},{opacity:1,transform:'none'}],{duration:260,easing:'ease-out'});
  }

  /* 1. intro */
  let s=blk('ep-intro'); s.append(H('p','ep-kicker',D.intro.kicker));
  D.intro.lines.forEach(l=>s.append(H('p','ep-p',l))); s.append(H('p','ep-q',D.intro.q));

  /* 2. thread */
  s=blk('ep-thread'); s.append(H('h4','ep-h','החוט'),H('p','ep-p','כל מסר נולד בתחנה אחת בדרך. לחצו על תחנה כדי לראות מה נולד בה.'));
  const line=H('div','ep-line'); s.append(line); let stageSel=null, domSel='all';
  const stBtn={}; D.stages.forEach(([n,name])=>{ const cnt=D.msgs.filter(m=>m.st===n).length; const b=H('button','ep-node'); b.type='button'; b.append(H('i','ep-dot','0'+n),H('span','ep-nn',name),H('em','ep-nc',cnt?cnt+' מסרים':'שקט')); b.addEventListener('click',()=>{ stageSel=stageSel===n?null:n; render(); markSt(); }); line.append(b); stBtn[n]=b; });
  const markSt=()=>Object.entries(stBtn).forEach(([n,b])=>b.classList.toggle('on',+n===stageSel));

  /* 3. board */
  s=blk('ep-board'); s.append(H('h4','ep-h','לוח המסרים'),H('p','ep-p','כל פתק הוא מסקנה אחת. לחצו על פתק כדי לקרוא את הסיפור שמאחוריו.'));
  const tabs=H('div','ep-tabs'); s.append(tabs); const grid=H('div','ep-grid'); s.append(grid);
  const tb=D.domains.map(([id,name])=>{ const b=H('button','ep-tab',name); b.type='button'; b.addEventListener('click',()=>{ domSel=id; render(); tb.forEach(x=>x.classList.toggle('on',x===b)); }); tabs.append(b); return b; }); tb[0].classList.add('on');
  function render(){
    grid.textContent=''; const list=D.msgs.filter(m=>(domSel==='all'||m.d===domSel)&&(stageSel==null||m.st===stageSel));
    if(!list.length){ grid.append(H('p','ep-empty','אין כאן מסרים. הדממה גם היא מסר.')); return; }
    list.forEach((m,i)=>{ const b=H('button','ep-note d-'+m.d); b.type='button'; b.style.setProperty('--r',((i*37)%7-3)*.5+'deg'); b.style.setProperty('--i',i);
      b.append(H('span','ep-nt',dName[m.d]),H('b','',m.t),H('i','ep-nstage','שלב 0'+m.st)); b.addEventListener('click',()=>openM(m)); grid.append(b); });
  }
  render();

  /* 4. pick one */
  s=blk('ep-pick'); s.append(H('h4','ep-h','המסר שלכם'),H('p','ep-p','בחרו את המסר שתפס אתכם יותר מכולם. נראה מי עוד מדבר איתו.'));
  const pr=H('div','ep-chips'); const pout=H('div','ep-pout'); pout.setAttribute('aria-live','polite');
  D.msgs.forEach(m=>{ const b=H('button','ep-chip',m.t); b.type='button'; b.addEventListener('click',()=>{ pr.querySelectorAll('.ep-chip').forEach(x=>x.classList.toggle('on',x===b)); pout.textContent=''; const rel=m.ln.map(i=>byId[i]).filter(Boolean);
    pout.append(H('p','ep-p','בחרתם: '+m.t+' ('+dName[m.d]+', שלב 0'+m.st+').'));
    pout.append(H('p','ep-p',rel.length?'הוא קשור ל:':'המסר הזה עומד לבד.'));
    rel.forEach(r=>{ const c=H('button','ep-rel'); c.type='button'; c.append(H('b','',r.t),H('span','',dName[r.d]+' · שלב 0'+r.st)); c.addEventListener('click',()=>openM(r)); pout.append(c); }); }); pr.append(b); });
  s.append(pr,pout);

  /* 5. open questions */
  s=blk('ep-open'); s.append(H('h4','ep-h','מה לא פתרנו'),H('p','ep-p','כמה שאלות נשארו פתוחות. זה לא כישלון. זו הסיבה שהתיק הבא יהיה מעניין.'));
  const ol=H('ul','ep-ql'); D.open.forEach(q=>ol.append(H('li','',q))); s.append(ol);

  /* 6. monologue */
  s=blk('ep-mono'); s.append(H('h4','ep-h','הסוף'));
  const btn=H('button','ep-btn','כבו את האורות'); btn.type='button'; const stage=H('div','ep-stage'); stage.setAttribute('aria-live','polite'); s.append(btn,stage);
  let run=0;
  btn.addEventListener('click',async()=>{ if(window.gcEvent) gcEvent('epilogue-lights-off'); const my=++run; btn.disabled=true; stage.textContent=''; stage.classList.add('lit'); root.classList.add('dim'); stage.scrollIntoView({block:'center',behavior:reduce?'auto':'smooth'});
    await sleep(700);
    for(const l of D.mono){ if(my!==run) return; const p=H('p','ep-ml',l); stage.append(p); if(!reduce) p.animate([{opacity:0,transform:'translateY(10px)',filter:'blur(6px)'},{opacity:1,transform:'none',filter:'none'}],{duration:900,easing:'ease-out'}); await sleep(1700); }
    const q=H('p','ep-mq',D.monoQ); stage.append(q); if(!reduce) q.animate([{opacity:0},{opacity:1}],{duration:1400}); btn.disabled=false; btn.textContent='שוב'; root.classList.remove('dim'); });
})();
