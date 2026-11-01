/* Stage 06 engine (any case), "option A": the reader already knows who stopped where, so the question is why it matters.
   Two advocates, one bet, a balance with a weight per round and a guess before each verdict, a live scenario inside one round (hook),
   the missing box filled by animation, a devil's advocate pre-mortem for the winner, the cork board of stage 02, and the dossier.
   Content: window.FINALE[case] (scene, rounds, win, twist, back, honest, dossier) + window.FINALE[case].v2 (see c/<case>/finale2.js). */
(function(){
  const root=document.getElementById('finale'); if(!root) return; const CASE=root.dataset.case;
  const F=window.FINALE&&window.FINALE[CASE]; if(!F||!F.v2) return; const V=F.v2; const fill2=(t,o)=>t.replace(/\{(\w+)\}/g,(m,k)=>o[k]!=null?o[k]:m);
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const H=(t,c,x)=>{ const e=document.createElement(t); if(c) e.className=c; if(x!=null) e.textContent=x; return e; };
  const sleep=ms=>new Promise(r=>setTimeout(r,reduce?10:ms));
  const tm=(id,w)=>`<button class="tm" data-t="${id}">${w}</button>`;
  const wire=el=>{ if(window.TermWin) window.TermWin.wire(el); };
  const go2=el=>el.scrollIntoView({block:'start',behavior:reduce?'auto':'smooth'});
  const A=F.a, K=F.k; root.classList.add('fz');
  const AVA=V.adv[0].av, AVK=V.adv[1].av;
  const blk=(cls)=>{ const s=H('section','fz-b '+cls); root.append(s); return s; };

  /* 1 · the scene */
  let s=blk('fz-scene');
  s.innerHTML=`<p class="fz-k">${F.scene.kicker}</p>`+V.known.map(t=>'<p>'+t+'</p>').join('')+'<p class="fz-l3"></p><p class="fz-big"></p><p class="fz-def"></p>';
  s.querySelector('.fz-l3').textContent=V.lesson||F.scene.lines[F.scene.lines.length-1]; s.querySelector('.fz-big').textContent=F.scene.big; s.querySelector('.fz-def').textContent=F.scene.def;
  const adv=H('div','fz-adv');
  V.adv.forEach((x,i)=>{ const c=H('div','fz-advc '+(i?'k':'a')); const a=H('span','fz-av'); a.innerHTML=x.av; const d=H('div'); d.append(H('small','',x.who),H('b','',i?K:A),H('p','','"'+x.quote+'"')); c.append(a,d); adv.append(c); });
  s.append(adv,H('p','fz-q',V.advQ));

  /* 2 · the bet */
  s=blk('fz-bet'); s.append(H('h4','fz-h','ההימור שלכם'),H('p','',V.bet.q));
  const opts=H('div','fz-opts'); const note=H('p','fz-note','בחרו אחד. נחזור לזה בסוף.'); note.setAttribute('aria-live','polite');
  let bet=null; const BOPT=[[A,V.bet.opts[0][0],V.bet.opts[0][1]],[K,V.bet.opts[1][0],V.bet.opts[1][1]]];
  const bb=BOPT.map(([n,l,sub])=>{ const b=H('button','fz-opt'); b.type='button'; b.append(H('b','',l),H('span','',sub),H('small','',n)); b.addEventListener('click',()=>{ bet=n; bb.forEach(x=>x.classList.toggle('on',x===b)); note.textContent='רשמנו: '+l+'. עכשיו '+F.rounds.length+' סיבובים על המאזניים.'; start.disabled=false; try{ localStorage.setItem('td-bet-'+CASE,n); }catch(e){} }); opts.append(b); return b; });
  const start=H('button','fz-btn','לשים את המשקולות'); start.type='button'; start.disabled=true; s.append(opts,note,start);

  /* 3 · the balance and three rounds */
  const arena=blk('fz-arena'); arena.hidden=true;
  arena.innerHTML=`<div class="fz-scale"><svg viewBox="0 0 520 230" role="img" aria-label="מאזניים: ${V.bet.opts[0][0]} מול ${V.bet.opts[1][0]}">
    <rect x="252" y="40" width="16" height="170" rx="4" class="fz-post"/><path d="M200 214 h120 l-14 -14 h-92z" class="fz-post"/><circle cx="260" cy="42" r="9" class="fz-pivot"/>
    <g class="fz-beam"><rect x="70" y="36" width="380" height="10" rx="5" class="fz-bar"/></g>
      <g class="fz-pan r" transform="translate(410 41)"><path d="M0 0 L-38 70 M0 0 L38 70" class="fz-str"/><path d="M-52 70 h104 q-8 22 -52 22 q-44 0 -52 -22z" class="fz-dish"/><g class="fz-w"></g><text y="118" text-anchor="middle" class="fz-pl">${V.bet.opts[0][0]}</text></g>
      <g class="fz-pan l" transform="translate(110 41)"><path d="M0 0 L-38 70 M0 0 L38 70" class="fz-str"/><path d="M-52 70 h104 q-8 22 -52 22 q-44 0 -52 -22z" class="fz-dish"/><g class="fz-w"></g><text y="118" text-anchor="middle" class="fz-pl">${V.bet.opts[1][0]}</text></g></svg></div>
   <div class="fz-rounds"></div>`;
  const beam=arena.querySelector('.fz-beam'), pans={a:arena.querySelector('.fz-pan.r'),k:arena.querySelector('.fz-pan.l')}, rounds=arena.querySelector('.fz-rounds');
  let score={a:0,k:0};
  const NS='http://www.w3.org/2000/svg';
  function weight(side,label){ const g=pans[side].querySelector('.fz-w'); const n=g.childElementCount; const w=document.createElementNS(NS,'g'); w.setAttribute('class','fz-wt'); w.setAttribute('transform',`translate(${-30+n*30} 52)`); w.innerHTML=`<path d="M-12 16 h24 l-4 -16 h-16z"/><text y="12" text-anchor="middle">${label}</text>`; g.append(w); }
  function tilt(){ const d=Math.max(-9,Math.min(9,(score.a-score.k)*6)); pans.a.setAttribute('transform',`translate(410 ${41+d*3.3})`); pans.k.setAttribute('transform',`translate(110 ${41-d*3.3})`); beam.style.transform=`rotate(${d}deg)`; }
  // pans are inside the rotating beam group; keep pans level by counter-positioning (translate only)
  const RES=V.res; const NR=F.rounds.length; let ri=0, gok=0;
  function round(){ const r=F.rounds[ri]; const i=ri; const c=H('div','fz-round'); c.append(H('p','fz-rk','סיבוב '+(i+1)+' מתוך '+NR),H('p','fz-rq',r.q)); rounds.append(c);
    const after=()=>{ const g=H('div','fz-guess'); g.append(H('p','','לפני שנגלה: למי היתרון בסיבוב הזה?')); const row=H('div','fz-gr'); [['a',V.bet.to[0]],['tie','תיקו'],['k',V.bet.to[1]]].forEach(([v,l])=>{ const b=H('button','fz-g',l); b.type='button'; b.addEventListener('click',()=>verdict(v)); row.append(b); }); g.append(row); c.append(g); };
    const verdict=(guess)=>{ const gEl=c.querySelector('.fz-guess'); if(gEl) gEl.remove(); const right=guess===RES[i]; if(right) gok++;
      c.append(H('p','fz-gres '+(right?'y':'n'),(right?'ניחשתם נכון.':'ניחשתם אחרת.')));
      const cols=H('div','fz-cols'); [['a',A,r.a,AVA],['k',K,r.k,AVK]].forEach(([k,n,[st,t],av])=>{ const x=H('div','fz-col '+k+' '+st); const hd=H('div','fz-ch'); const a=H('span','fz-av s'); a.innerHTML=av; hd.append(a,H('b','',n)); x.append(hd,H('p','',t)); cols.append(x); });
      c.append(cols,H('p','fz-v',r.v)); wire(c);
      if(RES[i]==='tie'){ weight('a','1'); weight('k','1'); score.a++; score.k++; } else { weight(RES[i],'+'); score[RES[i]]+=2; } tilt(); c.append(H('p','fz-tally','על המאזניים: '+V.bet.opts[1][0]+' '+score.k+' · '+V.bet.opts[0][0]+' '+score.a));
      ri++; if(ri<NR){ const n=H('button','fz-btn','לסיבוב הבא'); n.type='button'; n.addEventListener('click',()=>{ n.remove(); round(); }); c.append(n); } else finish(); };
    if(V.live&&i===V.live.round) morning(c,after); else after(); go2(c); }
  start.addEventListener('click',()=>{ arena.hidden=false; start.disabled=true; bb.forEach(b=>b.disabled=true); round(); });

  /* a live scenario inside one round: content and behaviour come from V.live (html, ev, draw(m,h), decide(choice,betIsK)) */
  function morning(c,done){ const LV=V.live;
    const m=H('div','fz-morn'); c.append(m); const EV=LV.ev;
    m.innerHTML=`<p class="fz-mk">${LV.note}</p><label class="fz-clock"><b>${EV[0][0]}</b><input type="range" min="0" max="${EV.length-1}" step="1" value="0" aria-label="${LV.aria||'הזמן'}"></label><p class="fz-ev" aria-live="polite"></p>`+LV.html(tm)+`<div class="fz-dec" hidden><p>${LV.ask}</p><div class="fz-gr">${LV.choices.map(([k,l])=>`<button type="button" class="fz-g" data-d="${k}">${l}</button>`).join('')}</div><p class="fz-dout" aria-live="polite"></p></div>`;
    const r=m.querySelector('input'), clk=m.querySelector('.fz-clock b'), ev=m.querySelector('.fz-ev'), dec=m.querySelector('.fz-dec');
    const draw=()=>{ const h=+r.value; clk.textContent=EV[h][0]; ev.textContent=EV[h][1]; if(LV.draw) LV.draw(m,h); if(h===EV.length-1) dec.hidden=false; }; r.addEventListener('input',draw); draw();
    let decided=false; m.querySelectorAll('[data-d]').forEach(b=>b.addEventListener('click',()=>{ if(decided) return; decided=true; m.querySelectorAll('[data-d]').forEach(x=>x.disabled=true); b.classList.add('on');
      const o=m.querySelector('.fz-dout'); o.textContent=LV.decide(b.dataset.d,bet===K);
      wire(o); setTimeout(done,reduce?0:900); }));
    wire(m); }

  /* 4 · the reveal */
  const out=blk('fz-out'); out.hidden=true;
  async function finish(){ out.hidden=false; const w=H('div','fz-win'); w.append(H('p','fz-k','המאזניים נטו. '+F.win.kicker),H('h3','fz-name',K),H('p','',F.win.text),H('p','fz-own',V.own));
    const bt=fill2(bet===K?V.betRight:V.betWrong,{g:gok,n:NR});
    w.append(H('p','fz-bt',bt)); out.append(w); go2(w); if(window.gcEvent) gcEvent('finale-reveal'); await sleep(1400); twist(); }

  /* 5 · the missing box, filled */
  function twist(){ const T=F.twist; const b=H('section','fz-b fz-twist'); b.append(H('h4','fz-h',T.h),H('p','',T.text));
    b.insertAdjacentHTML('beforeend',V.twistSvg(T));
    const fill=H('button','fz-btn',T.btn); fill.type='button'; const msg=H('p','fz-msg',T.msg); msg.hidden=true; b.append(fill,msg); out.append(b); go2(b);
    fill.addEventListener('click',()=>{ fill.disabled=true; b.classList.add('filled'); setTimeout(()=>{ msg.hidden=false; back(); },reduce?0:1600); }); }
  function back(){ const T=F.back; const b=H('section','fz-b fz-back'); b.append(H('h4','fz-h',T.h),H('p','',T.text));
    const dg=H('div','fz-dg'); dg.append(H('span','fz-bx on',T.box1),H('span','fz-ar',T.arrow),H('span','fz-bx',T.box2)); const btn=H('button','fz-btn',T.btn); btn.type='button'; b.append(dg,btn);
    btn.addEventListener('click',async()=>{ btn.disabled=true; dg.classList.add('lit'); for(const m of T.msgs){ const p=H('p','fz-bm',m); b.append(p); if(!reduce) p.animate([{opacity:0},{opacity:1}],{duration:500}); await sleep(800); } devil(); });
    out.append(b); go2(b); }

  /* 6 · devil's advocate: a pre-mortem for the winner */
  function devil(){ const T=F.honest, DV=V.devil; const b=H('section','fz-b fz-devil'); b.append(H('p','fz-k','פרקליט השטן'),H('h4','fz-h','שנה מהיום. גם הזוכה נכשל. מה קרה?'),H('p','',DV.p));
    const g=H('div','fz-pml'); T.items.forEach(([h,t],i)=>{ const c=H('article','fz-pm'); c.append(H('span','fz-date','חדשות · שנה מהיום'),H('h5','',DV.hl[i])); const btn=H('button','fz-how','ומה האמת? ←'); btn.type='button'; const a=H('div','fz-ans'); a.hidden=true; a.append(H('b','',h),H('p','',t)); btn.addEventListener('click',()=>{ c.classList.add('open'); a.hidden=false; btn.remove(); }); c.append(btn,a); g.append(c); });
    b.append(g,H('p','fz-q',DV.q)); out.append(b); setTimeout(()=>{ cork(); dossier(); },reduce?0:300); }

  /* 7 · and the slow part? the cork board of stage 02 */
  function cork(){ const CK=V.cork; const b=H('section','fz-b fz-cork'); b.append(H('h4','fz-h',CK.h),H('p','',CK.p));
    const bd=H('div','fz-board'); CK.notes.forEach(([t,d,st,ok],i)=>{ const n=H('div','fz-note'+(ok?' ok':'')); n.style.setProperty('--r',((i*37)%5-2)+'deg'); n.append(H('i','fz-pin'),H('b','',t),H('p','',d),H('span','fz-st',(ok?'✓ ':'')+st)); bd.append(n); });
    const ln=H('a','fz-link','ללוח השעם של שלב 02 ←'); ln.href='problems.html';
    b.append(bd,ln,H('p','fz-q',CK.q)); out.append(b); }

  /* 8 · the dossier */
  function dossier(){ const D=F.dossier; const b=H('section','fz-b fz-dos'); b.append(H('h4','fz-h',D.h),H('p','',D.p));
    const items=V.dossier;
    const g=H('div','fz-shelf'); items.forEach(([n,base,pk])=>{ const c=H('div','fz-doc'); const im=H('img'); im.alt=''; im.loading='lazy'; im.src='../../assets/img/peek/'+pk+'-p1.jpg'; im.onerror=()=>im.remove(); const t=H('div'); t.append(H('b','',n)); const a=H('div','fz-da'); [['עברית','he'],['English','en']].forEach(([l,lg])=>{ const x=H('a','','PDF · '+l); x.href='downloads/'+base+'-'+lg+'.pdf'; x.setAttribute('download',''); a.append(x); }); t.append(a); c.append(im,t); g.append(c); });
    b.append(g,H('p','fz-learn',D.learn),H('p','fz-q',D.q)); out.append(b); wire(out); }

  wire(root);
})();
