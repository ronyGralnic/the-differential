/* Design-document engine (any case): the winner's design document as an engineer's notebook (graph paper, UML in ink).
   Mount: <div class="dz" data-dz="<candidate slug>"></div> inside the "design" doc panel. Content: window.DZ[slug] (see c/<case>/design-<slug>.js).
   Config: { av (avatar svg), who (character name), intro:{html, emma, q}, sections:[ {type, h, sub, what:[term,def], emma, q, ...data} ], pdf:{slug, he, en, heD, enD}, md }
   Section types and their data:
     rules     items:[[title, text, try, result, ok?]]
     classes   zones:{key:label}, order:[keys in columns], shared:key, items:[[zone, EnName, heName, does, doesNot, tags[]]], lenses:[[key,label,text]], note
     protocol  stamp, fields:[[he, code, text]], pick, responses:[[key, label, code, meaning, whatNext, 'ok'|'no']]
     states    nodes:[[KEY, he, x, y, 'ok'|'bad'|'']], edges:[[from,to, optional custom path d]], start:[x,y], loop:{d, x, y, label}, paths:{key:[label, [[STATE, caption]...]]}, pick, view:[w,h]
     sequence  lifelines:[[key, label]], steps:[[ [from,to,label]... ]], captions:[[what, forTheCharacter]]
     race      html, run:[text while running, text when done ({w} = winner letter)], rules:[[title,text]]
     tables    cabinets:[[key,label,[[name, description, [columns]]]]], idPattern, contentPattern, join:{sql, btn, err}
     versions  items:[[version, what, exit test]], done
     custom    build(section, api)  (api: H, S, sleep, reduce, what, ask, emma)
     close     html
   The original document is rendered folded at the bottom from config.md (simple markdown: # ## ###, @p, @img, -, tables, ``` code). */
(function(){
  function mount(root){
  const slug=root.dataset.dz; const Z=(window.DZ||{})[slug]; if(!Z||root.dataset.on) return; root.dataset.on='1';
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const H=(t,c,x)=>{ const e=document.createElement(t); if(c) e.className=c; if(x!=null) e.textContent=x; return e; };
  const NS='http://www.w3.org/2000/svg'; const S=(t,a,p)=>{ const e=document.createElementNS(NS,t); for(const k in a) e.setAttribute(k,a[k]); if(p) p.append(e); return e; };
  const sleep=ms=>new Promise(r=>setTimeout(r,reduce?10:ms));
  const sec=(h,sub,cls)=>{ const s=H('section','dz-s '+(cls||'')); s.append(H('h5','dz-h',h)); if(sub){ const p=H('p','dz-sub'); p.innerHTML=sub; s.append(p); } root.append(s); return s; };
  const emma=(s,t)=>{ const e=H('div','dz-emma'); const a=H('span','dz-av'); a.innerHTML=Z.av; const d=H('div'); d.append(H('span','dz-k',Z.who),H('p','',t)); e.append(a,d); s.append(e); };
  const ask=(s,t)=>s.append(H('p','dz-q',t));
  const what=(s,w,t)=>{ const b=H('div','dz-what'); b.innerHTML='<b>מה זה '+w+'?</b> '+t; s.append(b); };
  const API={H,S,sleep,reduce,what,ask,emma,root};
  let mk=0; const marker=()=>{ const id='dzar'+slug.replace(/\W/g,'')+(mk++); return [id,`<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="dz-mk"/></marker></defs>`]; };

  /* intro */
  const intro=H('div','dz-intro'); intro.innerHTML=Z.intro.html; root.append(intro); if(Z.intro.emma) emma(intro,Z.intro.emma); if(Z.intro.q) intro.append(H('p','dz-q',Z.intro.q));

  const R={
  rules(s,c){ const rg=H('div','dz-rules'); c.items.forEach(([h,t,tr,res,ok],i)=>{ const card=H('article','dz-rule'); card.append(H('span','dz-n','0'+(i+1)),H('b','',h),H('p','',t)); const b=H('button','dz-try','✎ נסו: '+tr); b.type='button'; const o=H('p','dz-res'); o.hidden=true; o.textContent=res; b.addEventListener('click',()=>{ o.hidden=false; card.classList.add(ok?'ok':'no'); b.disabled=true; }); card.append(b,o); rg.append(card); }); s.append(rg); },

  classes(s,c){ const lens=H('div','dz-lens'); const lt=H('p','dz-lt'); lt.setAttribute('aria-live','polite');
    const org=H('div','dz-org'); const cols={}; c.order.forEach(z=>{ const col=H('div','dz-zone z-'+z); col.append(H('span','dz-zn',c.zones[z])); org.append(col); cols[z]=col; }); org.style.setProperty('--n',c.order.length);
    let bar=null; if(c.shared){ bar=H('div','dz-zone z-x'); bar.append(H('span','dz-zn',c.zones[c.shared])); }
    const card=H('div','dz-card'); card.hidden=true; card.setAttribute('aria-live','polite');
    const chips=c.items.map(([z,en,he,does,not,tags])=>{ const b=H('button','dz-cl'); b.type='button'; b.append(H('b','',he),H('code','',en)); b.dataset.tags=(tags||[]).join(' ');
      b.addEventListener('click',()=>{ chips.forEach(x=>x.classList.toggle('sel',x===b)); card.hidden=false; card.innerHTML=''; card.append(H('span','dz-k',c.zones[z]),H('b','',he+' · '+en)); const r1=H('p'); r1.innerHTML='<b>התפקיד:</b> '; r1.append(does); card.append(r1); if(not){ const r2=H('p','dz-not'); r2.innerHTML='<b>מה הוא לא עושה:</b> '; r2.append(not); card.append(r2); } });
      (z===c.shared?bar:cols[z]).append(b); return b; });
    const LT={}; c.lenses.forEach(([k,l,t])=>{ LT[k]=t||''; const b=H('button','dz-lb'+(k==='all'?' on':''),l); b.type='button'; b.addEventListener('click',()=>{ lens.querySelectorAll('.dz-lb').forEach(x=>x.classList.toggle('on',x===b)); org.dataset.lens=k; chips.forEach(ch=>ch.classList.toggle('lit',k!=='all'&&ch.dataset.tags.split(' ').includes(k))); if(bar) bar.dataset.lens=k; lt.textContent=LT[k]; }); lens.append(b); });
    s.append(lens,lt,org); if(bar) s.append(bar); s.append(card); if(c.note){ const n=H('p','dz-note'); n.innerHTML=c.note; s.append(n); } },

  protocol(s,c){ const env=H('div','dz-env'); env.innerHTML=`<div class="dz-paper"><span class="dz-stamp">${c.stamp}</span>${c.fields.map(([h,cd,t])=>`<div class="dz-f"><b>${h}</b><code dir="ltr">${cd}</code><span>${t}</span></div>`).join('')}</div>`; s.append(env);
    const rr=H('div','dz-gr'); const ro=H('div','dz-resp'); ro.setAttribute('aria-live','polite');
    c.responses.forEach(([k,l,code,mean,doit,cl])=>{ const b=H('button','dz-lb',l); b.type='button'; b.addEventListener('click',()=>{ rr.querySelectorAll('.dz-lb').forEach(x=>x.classList.toggle('on',x===b)); ro.className='dz-resp '+cl; ro.innerHTML=''; ro.append(H('span','dz-code',code),H('b','',mean),H('p','',doit)); if(!reduce) ro.animate([{transform:'translateY(-14px) rotate(-3deg)',opacity:0},{transform:'none',opacity:1}],{duration:400,easing:'cubic-bezier(.3,1.4,.5,1)'}); }); rr.append(b); });
    s.append(H('p','dz-sub',c.pick||'בחרו מה קורה, ותראו איזו חותמת חוזרת:'),rr,ro); },

  states(s,c){ const [VW,VH]=c.view||[680,230]; const box=H('div','dz-sm'); const sv=S('svg',{viewBox:`0 0 ${VW} ${VH}`,class:'dz-svg',role:'img','aria-label':c.aria||'מכונת מצבים'}); box.append(sv);
    const [mid,defs]=marker(); sv.insertAdjacentHTML('afterbegin',defs);
    const P={}; c.nodes.forEach(([k,h,x,y])=>P[k]=[x,y]);
    const [sx,sy]=c.start; S('circle',{cx:sx,cy:sy,r:7,class:'dz-st0'},sv);
    c.edges.forEach(([a,b,d])=>{ let path=d; if(!path){ const [x1,y1]=P[a],[x2,y2]=P[b]; path=y1===y2?`M${x1+(x2<x1?-52:52)} ${y1} L${x2+(x2<x1?52:-52)} ${y2}`:`M${x1} ${y1+(y2>y1?22:-22)} L${x2} ${y2+(y2>y1?-22:22)}`; } const bad=(c.nodes.find(n=>n[0]===b)||[])[4]==='bad'; S('path',{d:path,class:'dz-e'+(bad?' r':''),'marker-end':`url(#${mid})`},sv); });
    if(c.loop){ S('path',{d:c.loop.d,class:'dz-e g','marker-end':`url(#${mid})`},sv); const lp=S('text',{x:c.loop.x,y:c.loop.y,class:'dz-el','text-anchor':'middle'},sv); lp.textContent=c.loop.label; }
    const NODES={}; c.nodes.forEach(([k,h,x,y,kind])=>{ const g=S('g',{class:'dz-node'+(kind?' '+kind:''),transform:`translate(${x} ${y})`},sv); S('rect',{x:-52,y:-22,width:104,height:44,rx:10},g); const t1=S('text',{y:-3,'text-anchor':'middle',class:'dz-sk'},g); t1.textContent=k; const t2=S('text',{y:13,'text-anchor':'middle',class:'dz-sh'},g); t2.textContent=h; NODES[k]=g; });
    const tok=S('circle',{r:9,class:'dz-tok',cx:sx,cy:sy},sv);
    const log=H('ol','dz-log'); const evb=H('div','dz-gr'); let running=false;
    Object.entries(c.paths).forEach(([k,[l,steps]])=>{ const b=H('button','dz-lb',l); b.type='button'; b.addEventListener('click',async()=>{ if(running) return; running=true; evb.querySelectorAll('.dz-lb').forEach(x=>{ x.disabled=true; x.classList.toggle('on',x===b); }); log.textContent=''; Object.values(NODES).forEach(n=>n.classList.remove('cur','was'));
        tok.setAttribute('cx',sx); tok.setAttribute('cy',sy); await sleep(200);
        for(const [st,t] of steps){ Object.values(NODES).forEach(n=>{ if(n.classList.contains('cur')){ n.classList.remove('cur'); n.classList.add('was'); } }); NODES[st].classList.add('cur'); const [x,y]=P[st]; tok.setAttribute('cx',x); tok.setAttribute('cy',y-30); const li=H('li'); li.append(H('code','',st),H('span','',t)); log.append(li); await sleep(1100); }
        running=false; evb.querySelectorAll('.dz-lb').forEach(x=>x.disabled=false); }); evb.append(b); });
    s.append(H('p','dz-sub',c.pick||'בחרו מה קורה, ועקבו:'),evb,box,log); },

  sequence(s,c){ const LF=c.lifelines, MS=c.steps, CAP=c.captions, N=MS.length; const sq=H('div','dz-seq'); const W=700, X=i=>W-50-i*((W-100)/Math.max(1,LF.length-1)); const sv2=S('svg',{viewBox:`0 0 ${W} 330`,class:'dz-svg',role:'img','aria-label':c.aria||'דיאגרמת רצף'}); sq.append(sv2);
    const [mid,defs]=marker(); sv2.insertAdjacentHTML('afterbegin',defs);
    const LX={}; LF.forEach(([k,n],i)=>{ LX[k]=X(i); S('line',{x1:X(i),y1:34,x2:X(i),y2:320,class:'dz-life'},sv2); S('rect',{x:X(i)-34,y:6,width:68,height:24,rx:6,class:'dz-lh'},sv2); const t=S('text',{x:X(i),y:23,'text-anchor':'middle',class:'dz-lt2'},sv2); t.textContent=n; });
    const G=S('g',{},sv2); const ARS=[]; let y=48;
    MS.forEach((ms,si)=>{ ms.forEach(([a,b,l])=>{ const g=S('g',{class:'dz-m','data-s':si},G); if(a===b){ S('path',{d:`M${LX[a]} ${y} h-26 v12 h26`,class:'dz-ma'},g); const t=S('text',{x:LX[a]-30,y:y+9,class:'dz-ml','text-anchor':'start'},g); t.textContent=l; y+=20; }
        else { S('path',{d:`M${LX[a]} ${y} H${LX[b]}`,class:'dz-ma'+(c.logKey&&b===c.logKey?' log':''),'marker-end':`url(#${mid})`},g); const t=S('text',{x:(LX[a]+LX[b])/2,y:y-4,class:'dz-ml','text-anchor':'middle'},g); t.textContent=l; y+=16; } ARS.push(g); }); y+=4; });
    sv2.setAttribute('viewBox',`0 0 ${W} ${y+10}`); sv2.querySelectorAll('.dz-life').forEach(l=>l.setAttribute('y2',y+6));
    const cap=H('div','dz-cap'); cap.setAttribute('aria-live','polite'); const c1=H('p','dz-c1'), c2=H('p','dz-c2'); cap.append(c1,c2);
    const ctl=H('div','dz-ctl'); const pv=H('button','dz-lb','‹'), nx=H('button','dz-lb on','הצעד הבא ›'), num=H('span','dz-num'); pv.type=nx.type='button'; pv.setAttribute('aria-label','הצעד הקודם'); ctl.append(num,pv,nx);
    let cur=0; const show=i=>{ cur=i; ARS.forEach(g=>{ const k=+g.dataset.s; g.classList.toggle('now',k===i); g.classList.toggle('past',k<i); }); c1.textContent=CAP[i][0]; c2.textContent=(c.forWho||'')+CAP[i][1]; num.textContent=(i+1)+' / '+N; pv.disabled=i===0; nx.disabled=i===N-1; };
    pv.addEventListener('click',()=>show(cur-1)); nx.addEventListener('click',()=>show(cur+1)); show(0); s.append(ctl,cap,sq); },

  race(s,c){ const kt=H('div','dz-kit'); kt.innerHTML=c.html;
    const rb=H('button','dz-lb on',c.btn||'להריץ את המרוץ'); rb.type='button'; rb.addEventListener('click',async()=>{ rb.disabled=true; kt.classList.remove('done'); kt.classList.add('run'); const ro=kt.querySelector('.dz-ro'); ro.textContent=c.run[0]; await sleep(1100); kt.classList.add('done'); const w=Math.random()<.5?'א':'ב'; kt.dataset.win=w==='א'?'a':'b'; ro.textContent=c.run[1].replace('{w}',w); rb.disabled=false; rb.textContent='עוד פעם'; kt.classList.remove('run'); });
    kt.prepend(rb); s.append(kt);
    if(c.rules){ const kr=H('div','dz-krules'); c.rules.forEach(([h,t])=>{ const d=H('div','dz-kr'); d.append(H('b','',h),H('p','',t)); kr.append(d); }); s.append(kr); } },

  tables(s,c){ const cab=H('div','dz-cabs'); const tcard=H('div','dz-tcard'); tcard.hidden=true; const idRe=new RegExp(c.idPattern||'^$'), ctRe=new RegExp(c.contentPattern||'^$');
    c.cabinets.forEach(([k,l,tabs])=>{ const col=H('div','dz-cab '+k); col.append(H('span','dz-k',l)); tabs.forEach(([n,d,cols])=>{ const b=H('button','dz-drawer'); b.type='button'; b.append(H('code','',n),H('span','',d)); b.addEventListener('click',()=>{ cab.querySelectorAll('.dz-drawer').forEach(x=>x.classList.toggle('on',x===b)); tcard.hidden=false; tcard.innerHTML=''; tcard.append(H('code','dz-tn',n)); const ul=H('div','dz-cols'); cols.forEach(x=>{ const s2=H('code','',x); if(idRe.test(x)) s2.className='id'; else if(ctRe.test(x)) s2.className='ct'; ul.append(s2); }); tcard.append(ul); }); col.append(b); }); cab.append(col); });
    s.append(cab,tcard);
    if(c.join){ const jn=H('div','dz-join'); const pre=H('pre'); pre.setAttribute('dir','ltr'); pre.append(H('code','',c.join.sql)); jn.append(pre); const jb=H('button','dz-lb',c.join.btn); jb.type='button'; const jo=H('p','dz-jo'); jo.setAttribute('aria-live','polite'); jb.addEventListener('click',()=>{ jn.classList.add('err'); jo.textContent=c.join.err; }); jn.prepend(jb); jn.append(jo); s.append(jn); } },

  versions(s,c){ const lad=H('ol','dz-lad'); const lo=H('p','dz-lo'); lo.setAttribute('aria-live','polite'); const N=c.items.length;
    const lis=c.items.map(([v,w,t],i)=>{ const li=H('li'); const b=H('button','dz-rung'); b.type='button'; b.append(H('code','',v),H('b','',w),H('span','dz-ex','מבחן היציאה: '+t)); b.disabled=i>0; b.addEventListener('click',async()=>{ if(li.classList.contains('pass')) return; b.disabled=true; li.classList.add('test'); await sleep(900); li.classList.remove('test'); li.classList.add('pass'); if(lis[i+1]) lis[i+1].querySelector('button').disabled=false; if(i===N-1) lo.textContent=c.done||''; }); li.append(b); lad.append(li); return li; });
    s.append(lad,lo); },

  custom(s,c){ c.build(s,API); },
  close(s,c){ const cl=H('div','dz-close'); cl.innerHTML=c.html; s.append(cl); }
  };

  Z.sections.forEach(c=>{ const s=sec(c.h,c.sub||''); if(c.what) what(s,c.what[0],c.what[1]); R[c.type](s,c); if(c.emma) emma(s,c.emma); if(c.q) ask(s,c.q); });
  if(window.fxDownloads&&Z.pdf){ const d=sec('הורדה',''); d.append(window.fxDownloads(Z.pdf.slug,'design','מסמך העיצוב','The design document',Z.pdf.heD||'',Z.pdf.enD||'')); }

  /* the full original, folded */
  if(Z.md){ const full=H('details','dz-full'); full.append(H('summary','','המסמך המלא, כמו שהוא: כל הטבלאות והתרשימים')); const fb=H('div','dz-md'); full.append(fb); root.append(full);
    let built=false; full.addEventListener('toggle',()=>{ if(built||!full.open) return; built=true; fb.innerHTML=md(Z.md()); }); }
  function esc(t){ return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function md(src){ const L=src.split('\n'); let o='', i=0; while(i<L.length){ let l=L[i];
      if(l.startsWith('```')){ let b=''; i++; while(i<L.length&&!L[i].startsWith('```')){ b+=L[i]+'\n'; i++; } o+='<pre dir="ltr"><code>'+esc(b)+'</code></pre>'; i++; continue; }
      if(l.startsWith('|')){ const rows=[]; while(i<L.length&&L[i].startsWith('|')){ rows.push(L[i]); i++; } const cells=r=>r.slice(1,-1).split('|').map(c=>esc(c.trim())); o+='<div class="dz-tw"><table><thead><tr>'+cells(rows[0]).map(c=>'<th>'+c+'</th>').join('')+'</tr></thead><tbody>'+rows.slice(2).map(r=>'<tr>'+cells(r).map(c=>'<td>'+c+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>'; continue; }
      if(l.startsWith('- ')){ o+='<ul>'; while(i<L.length&&L[i].startsWith('- ')){ o+='<li>'+esc(L[i].slice(2))+'</li>'; i++; } o+='</ul>'; continue; }
      if(l.startsWith('# ')) o+='<h4>'+esc(l.slice(2))+'</h4>'; else if(l.startsWith('## ')) o+='<h5>'+esc(l.slice(3))+'</h5>'; else if(l.startsWith('### ')) o+='<h6>'+esc(l.slice(4))+'</h6>';
      else if(l.startsWith('@img ')){ const f=l.slice(5).split('|')[0].replace('.png','.jpg'); o+='<img loading="lazy" alt="" src="../../assets/img/design/'+f+'">'; }
      else if(l.startsWith('@p ')||l.startsWith('@src ')) o+='<p>'+esc(l.replace(/^@\w+ /,''))+'</p>'; else if(l.trim()) o+='<p>'+esc(l)+'</p>';
      i++; } return o; }
  if(window.TermWin) window.TermWin.wire(root);
  }
  function boot(){ document.querySelectorAll('.dz[data-dz]').forEach(mount); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,0)); else setTimeout(boot,0);
})();
