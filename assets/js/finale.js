/* Stage 06: the decision. Bet, three rounds, reveal, the missing box, (optional) the other direction,
   (optional) honest limits, dossier. Data-driven: window.FINALE[<case-slug>] (see finale-data.js). */
(function(){
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const H=(t,c,x)=>{ const e=document.createElement(t); if(c) e.className=c; if(x!=null) e.textContent=x; return e; };
  const sleep=ms=>new Promise(r=>setTimeout(r,reduce?10:ms));
  const root=document.getElementById('finale'); if(!root) return;
  const F=window.FINALE&&window.FINALE[root.dataset.case||'model-kill-switch']; if(!F) return;
  const A=F.a, K=F.k, ORDER=F.order||[A,K], ROUNDS=F.rounds;
  const sec=(cls)=>{ const s=H('div','fn-b '+cls); root.append(s); return s; };
  const go2=el=>el.scrollIntoView({block:'center',behavior:reduce?'auto':'smooth'});

  /* A: scene */
  let s=sec('fn-scene'); s.append(H('p','fn-kicker',F.scene.kicker));
  F.scene.lines.forEach(t=>s.append(H('p','fn-p',t)));
  s.append(H('p','fn-big',F.scene.big));
  s.append(H('p','fn-p',F.scene.def));
  s.append(H('p','fn-q',F.scene.q));

  /* B: bet */
  s=sec('fn-bet'); s.append(H('h4','fn-h',F.bet.h));
  const bets=H('div','fn-opts'); const betMsg=H('p','fn-note',F.bet.note); betMsg.setAttribute('aria-live','polite');
  let bet=null; const bb=ORDER.map(n=>{ const b=H('button','fn-opt',n); b.type='button'; b.addEventListener('click',()=>{ bet=n; bb.forEach(x=>x.classList.toggle('on',x===b)); betMsg.textContent=F.bet.recorded.replace('{n}',n); go.disabled=false; }); bets.append(b); return b; });
  const go=H('button','fn-btn',F.bet.go); go.type='button'; go.disabled=true;
  s.append(bets,betMsg,go);

  /* C: rounds */
  const arena=sec('fn-arena'); arena.hidden=true;
  const head=H('div','fn-vs'); head.append(H('b','',ORDER[0]),H('i','','מול'),H('b','',ORDER[1])); arena.append(head);
  const list=H('div','fn-rounds'); arena.append(list);
  const nxt=H('button','fn-btn','הסיבוב הבא'); nxt.type='button'; arena.append(nxt);
  let ri=0;
  function round(){
    const r=ROUNDS[ri++]; const c=H('div','fn-round'); c.append(H('p','fn-rq',r.q));
    const cols=H('div','fn-cols'); ORDER.map(n=>[n,n===A?r.a:r.k]).forEach(([n,[st,t]])=>{ const x=H('div','fn-col '+st); x.append(H('b','',n),H('span','fn-st',st==='ok'?'עבר':'נפל'),H('p','',t)); cols.append(x); });
    c.append(cols,H('p','fn-v',r.v)); list.append(c); if(!reduce) c.animate([{opacity:0,transform:'translateY(14px)'},{opacity:1,transform:'none'}],{duration:500,easing:'ease-out'});
    go2(c);
    if(ri===ROUNDS.length){ nxt.hidden=true; reveal.hidden=false; revealWrap.hidden=false; }
  }
  go.addEventListener('click',()=>{ arena.hidden=false; go.disabled=true; bb.forEach(b=>b.disabled=true); round(); });
  nxt.addEventListener('click',round);

  /* D: reveal */
  const revealWrap=sec('fn-revealwrap'); revealWrap.hidden=true;
  revealWrap.append(H('p','fn-p',F.reveal.intro));
  const reveal=H('button','fn-btn big',F.reveal.btn); reveal.type='button'; reveal.hidden=true; revealWrap.append(reveal);
  const out=sec('fn-out'); out.hidden=true;
  reveal.addEventListener('click',async()=>{ if(window.gcEvent) gcEvent('finale-reveal');
    reveal.disabled=true; out.hidden=false; out.classList.add('dark');
    const t=H('p','fn-drum','…'); out.append(t); go2(out); await sleep(1100);
    t.remove(); const w=H('div','fn-win'); w.append(H('p','fn-kicker',F.win.kicker),H('h3','fn-name',K),H('p','fn-p',F.win.text));
    out.append(w); if(!reduce) w.animate([{opacity:0,transform:'scale(.96)'},{opacity:1,transform:'none'}],{duration:700,easing:'ease-out'});
    await sleep(900);
    out.append(H('p','fn-bet',bet===K?F.win.right:F.win.wrong.replace('{a}',A)));
    await sleep(900); twist(); });

  /* E: the missing box */
  function diag(T,hole){ const dg=H('div','fn-dg'); const x1=H('span','fn-bx',T.box1),ar=H('span','fn-ar',T.arrow),x2=H('span','fn-bx'+(hole?' fn-hole':''),hole?'?':T.box2); dg.append(x1,ar,x2); return [dg,x2]; }
  function twist(){
    const T=F.twist; const b=H('div','fn-twist'); b.append(H('h4','fn-h',T.h),H('p','fn-p',T.text));
    const [dg,x2]=diag(T,true);
    const fill=H('button','fn-btn',T.btn); fill.type='button'; fill.addEventListener('click',()=>{ x2.textContent=K; x2.classList.remove('fn-hole'); x2.classList.add('fn-filled'); fill.disabled=true; msg.hidden=false; });
    const msg=H('p','fn-p',T.msg); msg.hidden=true;
    b.append(dg,fill,msg); out.append(b); go2(b);
    fill.addEventListener('click',()=>setTimeout(F.back?back:after,reduce?0:1200)); }

  /* E2 (optional): the other direction */
  function back(){
    const T=F.back; const b=H('div','fn-twist fn-back'); b.append(H('h4','fn-h',T.h),H('p','fn-p',T.text));
    const dg=H('div','fn-dg'); const x1=H('span','fn-bx fn-filled',T.box1),ar=H('span','fn-ar',T.arrow),x2=H('span','fn-bx',T.box2); dg.append(x1,ar,x2);
    const btn=H('button','fn-btn',T.btn); btn.type='button';
    const msgs=T.msgs.map(m=>{ const p=H('p','fn-p',m); p.hidden=true; return p; });
    btn.addEventListener('click',async()=>{ btn.disabled=true; x2.classList.add('fn-lit'); for(const p of msgs){ p.hidden=false; if(!reduce) p.animate([{opacity:0},{opacity:1}],{duration:500}); await sleep(700); } setTimeout(after,reduce?0:900); });
    b.append(dg,btn,...msgs); out.append(b); go2(b); }

  function after(){ if(F.honest) honest(); else dossier(); }

  /* E3 (optional): what the winner does not solve */
  function honest(){
    const T=F.honest; const b=H('div','fn-honest'); b.append(H('h4','fn-h',T.h),H('p','fn-p',T.p));
    const ul=H('ul','fn-hl'); T.items.forEach(([h,t])=>{ const li=H('li'); li.append(H('b','',h),H('span','',t)); ul.append(li); }); b.append(ul);
    out.append(b); go2(b); setTimeout(dossier,reduce?0:1400); }

  /* F: dossier */
  function dossier(){
    const D=F.dossier; const d=H('div','fn-dos'); d.append(H('h4','fn-h',D.h),H('p','fn-p',D.p));
    const g=H('div','fn-dg2'); D.stages.forEach(([n,k])=>{ const c=H('div','fn-dc'); c.append(H('b','',n)); const a=H('div','fn-da'); [['HE','he'],['EN','en']].forEach(([l,lg])=>{ const x=H('a','',l+' · PDF'); x.href='downloads/'+D.slug+'-'+k+'-'+lg+'.pdf'; x.setAttribute('download',''); a.append(x); }); c.append(a); g.append(c); });
    (D.extra||[]).forEach(([n,base])=>{ const c=H('div','fn-dc fn-dx'); c.append(H('b','',n)); const a=H('div','fn-da'); [['HE','he'],['EN','en']].forEach(([l,lg])=>{ const x=H('a','',l+' · PDF'); x.href='downloads/'+base+'-'+lg+'.pdf'; x.setAttribute('download',''); a.append(x); }); c.append(a); g.append(c); });
    d.append(g,H('p','fn-p',D.learn),H('p','fn-q',D.q));
    out.append(d); go2(d); }
})();
