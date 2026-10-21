/* Spec view v2: a guided build from an empty shelf to the full machine. */
(function(){
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const NS='http://www.w3.org/2000/svg';
  const H=(t,c,x)=>{ const e=document.createElement(t); if(c) e.className=c; if(x!=null) e.textContent=x; return e; };
  const S=(t,a,p)=>{ const e=document.createElementNS(NS,t); for(const k in a) e.setAttribute(k,a[k]); if(p) p.append(e); return e; };
  const sleep=ms=>new Promise(r=>setTimeout(r,reduce?10:ms));
  let tip=null;
  function showTip(el,txt){
    if(!tip){ tip=H('div','sp-tip'); tip.setAttribute('role','tooltip'); document.body.append(tip); }
    tip.textContent=txt; tip.classList.add('on');
    const r=el.getBoundingClientRect(), w=Math.min(280,innerWidth-24); tip.style.width=w+'px';
    let x=r.left+r.width/2-w/2; x=Math.max(12,Math.min(innerWidth-w-12,x)); tip.style.left=x+'px';
    const th=tip.offsetHeight; let y=r.top-th-10; if(y<8) y=r.bottom+10; tip.style.top=y+'px';
  }
  function hideTip(){ if(tip) tip.classList.remove('on'); }
  addEventListener('scroll',hideTip,true);
  function glossify(parent,text,G){
    const keys=Object.keys(G).sort((a,b)=>b.length-a.length).map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));
    const re=new RegExp('('+keys.join('|')+')','g'); const seen={}; let last=0,m;
    while((m=re.exec(text))){
      if(seen[m[1]]) continue; seen[m[1]]=1;
      parent.append(document.createTextNode(text.slice(last,m.index)));
      const b=H('button','sp-gl',m[1]); b.type='button'; const g=G[m[1]];
      b.addEventListener('mouseenter',()=>showTip(b,g)); b.addEventListener('focus',()=>showTip(b,g)); b.addEventListener('click',()=>showTip(b,g));
      b.addEventListener('mouseleave',hideTip); b.addEventListener('blur',hideTip);
      parent.append(b); last=m.index+m[1].length;
    }
    parent.append(document.createTextNode(text.slice(last)));
    return parent;
  }
  const rv=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('on'); rv.unobserve(e.target);} }),{threshold:0,rootMargin:'0px 0px -6% 0px'});
  const reveal=e=>{ e.classList.add('sp-rv'); if(reduce) e.classList.add('on'); else rv.observe(e); return e; };

  function mount(root){
    const D=window.SPEC&&window.SPEC[root.dataset.sp]; if(!D) return;
    const C=D.copy, G=D.gloss, F={}; D.features.forEach(f=>F[f.n]=f);
    root.textContent=''; root.classList.add('sp-root');
    const T=(n,a)=>{ const e=H(n||'p',a||'sp-p'); return e; };
    const gp=(txt,cls,tag)=>glossify(H(tag||'p',cls||'sp-p'),txt,G);
    const sec=(cls,h,p)=>{ const s=H('section','sp-sec '+cls); reveal(s); if(h) s.append(H('h4','sp-h',h)); if(p) s.append(gp(p)); root.append(s); return s; };
    const closeQ=(s,q)=>{ if(q) s.append(H('p','sp-q',q)); };
    const mono=(n,k)=>{ const m=n.match(/[A-Za-z0-9]/); return m?m[0].toUpperCase():(k==='ours'?'◆':'⊕'); };
    const logoSvg=(slug,cls)=>{ const p=D.logos[slug]; if(!p) return null; const s=S('svg',{viewBox:'0 0 24 24','aria-hidden':'true',class:cls||'sp-logo'}); S('path',{d:p},s); return s; };
    const techIcon=name=>{ const t=D.techs[name]; const ic=H('span','sp-bi'); const lg=t&&t.logo&&logoSvg(t.logo); if(lg) ic.append(lg); else ic.textContent=mono(name,t&&t.kind); return ic; };


    /* ---------- standalone illustrations ---------- */
    function laneViz(V){
      const box=H('div','sp-vz'); box.append(gp(V.intro,'sp-vzi'));
      const lane=H('div','sp-vl'); box.append(lane);
      const st=V.st.map(n=>{ const e=H('div','sp-vs'); e.append(H('b','',n)); lane.append(e); return e; });
      let endEl=null; if(V.end){ endEl=H('div','sp-vs end'); endEl.append(H('b','',V.end)); lane.append(endEl); }
      const tok=H('div','sp-vt'); lane.append(tok);
      const cap=H('p','sp-vc',''); cap.setAttribute('aria-live','polite'); box.append(cap);
      const btn=H('button','sp-btn sp-vb',C.play); btn.type='button'; box.append(btn);
      let token=0;
      const put=(el,anim)=>{ const lr=lane.getBoundingClientRect(); let x;
        if(!el) x=lr.width-62; else { const r=el.getBoundingClientRect(); x=r.left-lr.left+r.width/2; }
        x=Math.max(64,Math.min(lr.width-64,x)); if(!anim){ tok.style.transition='none'; } tok.style.left=x+'px'; if(!anim){ void tok.offsetWidth; tok.style.transition=''; } };
      const clear=()=>{ st.forEach(e=>e.classList.remove('ok','bad','now')); if(endEl) endEl.classList.remove('ok','bad'); };
      async function run(){
        const my=++token; btn.disabled=true; clear();
        for(const r of V.runs){
          if(my!==token) return; tok.className='sp-vt'+(r.ghost?' ghost':''); tok.textContent=r.t; put(null,false); tok.style.opacity=1; cap.textContent=''; cap.className='sp-vc'; await sleep(500);
          for(const [i,txt,state] of r.steps){
            if(my!==token) return; put(st[i],true); st.forEach(e=>e.classList.remove('now')); st[i].classList.add('now'); await sleep(750); if(my!==token) return;
            if(state) st[i].classList.add(state); cap.textContent=txt; cap.className='sp-vc '+(state||''); await sleep(1500);
          }
          if(my!==token) return;
          if(r.end==='ok'&&endEl){ put(endEl,true); endEl.classList.add('ok'); await sleep(800); }
          else if(r.end==='bad'){ tok.classList.add('bad'); await sleep(700); }
          await sleep(900); tok.style.opacity=0; await sleep(400); clear();
        }
        if(my===token){ btn.disabled=false; btn.textContent=C.replay; }
      }
      btn.addEventListener('click',run); return box;
    }
    function matchViz(M){
      const box=H('div','sp-vz'); box.append(H('h6','sp-vzh',M.h),gp(M.intro,'sp-vzi'));
      box.append(H('em','sp-vzk',M.rules_h)); const ul=H('ul','sp-mr');
      const lis=M.rules.map(r=>{ const li=H('li'); li.append(H('code','',r[0]),H('span','',r[1])); ul.append(li); return li; }); box.append(ul);
      box.append(H('em','sp-vzk',M.pick)); const row=H('div','sp-mq'); box.append(row);
      const attr=H('div','sp-ma2'); box.append(attr); const out=H('p','sp-mo'); out.setAttribute('aria-live','polite'); box.append(out); box.append(H('p','sp-vzn',M.hint));
      const test=(rule,req)=>{ const [k,p]=rule.split(':'); const re=new RegExp('^'+p.replace(/[.+?^${}()|[\]\\]/g,'\\$&').replace(/\*/g,'.*')+'$'); return re.test(req[k]||''); };
      M.reqs.forEach(([label,req])=>{ const b=H('button','sp-chip',label); b.type='button'; b.addEventListener('click',()=>{
        row.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b)); attr.textContent=''; Object.entries(req).forEach(([k,v])=>attr.append(H('code','',k+':'+v)));
        const hits=[]; M.rules.forEach((r,i)=>{ const h=test(r[0],req); lis[i].className=h?'hit':'miss'; if(h) hits.push(r[0]); });
        out.className='sp-mo '+(hits.length?'bad':'ok'); out.textContent=hits.length?M.blocked+' '+hits.join(', ')+'.':M.passed; }); row.append(b); });
      return box;
    }
    function vizFor(id){ const V=D.vizx[id]; if(!V) return null; return id==='match'?matchViz(V):laneViz(V); }
    function vizSlot(name){
      const t=D.techs[name]; if(!t||!t.viz||!D.vizx[t.viz]) return null;
      const slot=H('div','sp-vslot'); const b=H('button','sp-btn sp-vopen',D.vizx.run); b.type='button';
      b.addEventListener('click',()=>{ slot.textContent=''; const v=vizFor(t.viz); slot.append(v); const tcw=slot.closest('.sp-tc'); if(tcw) tcw.classList.add('wide'); const pb=v.querySelector('.sp-vb'); if(pb) pb.click(); });
      slot.append(b); return slot;
    }

    /* ---------- floating window ---------- */
    let modal=null, lastFocus=null;
    function closeModal(){ if(!modal) return; modal.remove(); modal=null; removeEventListener('keydown',escKey,true); if(lastFocus&&lastFocus.focus) lastFocus.focus(); }
    function escKey(e){ if(e.key==='Escape'){ e.stopImmediatePropagation(); e.preventDefault(); closeModal(); } }
    function showModal(node,onClose){
      lastFocus=document.activeElement; if(modal){ modal.remove(); }
      modal=H('div','sp-modal'); const back=H('div','sp-mback'); const card=H('div','sp-mcard'); card.setAttribute('role','dialog'); card.setAttribute('aria-modal','true');
      back.addEventListener('click',()=>{ closeModal(); if(onClose) onClose(); }); card.append(node); modal.append(back,card); document.body.append(modal);
      addEventListener('keydown',escKey,true); const x=node.querySelector('.sp-x'); if(x) x.focus();
      if(!reduce) card.animate([{opacity:0,transform:'translateY(14px) scale(.98)'},{opacity:1,transform:'none'}],{duration:220,easing:'ease-out'});
    }

    function techCard(name){
      const t=D.techs[name]; const X=D.techx; const c=H('div','sp-tc '+t.kind);
      const hd=H('div','sp-tch'); hd.append(techIcon(name)); const nm=H('b','',name); hd.append(nm,H('span','sp-bk',D.kinds[t.kind])); c.append(hd);
      [[X.lw,t.what],[X.lh,t.here],[X.ly,t.why]].forEach(([k,v])=>{ const r=H('div','sp-tr'); r.append(H('em','',k),gp(v,'sp-trv','span')); c.append(r); });
      const vs=vizSlot(name); if(vs) c.append(vs);
      return c;
    }

    /* ---------- overview map (also the growing mini map) ---------- */
    const VW=820,VH=410, ORDER=D.layers.map(l=>l[0]);
    function mapSvg(opt){
      opt=opt||{};
      const svg=S('svg',{viewBox:`0 0 ${VW} ${VH}`,class:'sp-svg'+(opt.mini?' sp-mm':''),role:'img','aria-label':C.map_h});
      const cx=i=>VW-150-i*173;
      D.layers.forEach((l,i)=>{ const band=S('g',{class:'sp-lb','data-l':l[0]},svg); S('rect',{x:cx(i)-80,y:8,width:160,height:VH-16,rx:14,class:'sp-band'},band); const t=S('text',{x:cx(i),y:34,class:'sp-lay','text-anchor':'middle'},band); t.textContent=l[1]; });
      const P={}; D.nodes.forEach(n=>P[n[0]]={x:cx(ORDER.indexOf(n[1])),y:n[4]+14,core:n[2]});
      const eg=S('g',{},svg), edges=[];
      D.edges.forEach(([a,b])=>{ const A=P[a],B=P[b],mx=(A.x+B.x)/2; const p=S('path',{d:`M${A.x},${A.y} C${mx},${A.y} ${mx},${B.y} ${B.x},${B.y}`,class:'sp-edge'},eg); edges.push([a,b,p]); });
      const N={};
      D.nodes.forEach(n=>{ const id=n[0],p=P[id],f=F[id];
        const g=S('g',{class:'sp-node'+(p.core?' core':''),transform:`translate(${p.x},${p.y})`},svg);
        if(opt.click){ g.setAttribute('tabindex','0'); g.setAttribute('role','button'); g.setAttribute('aria-label',f.title); }
        S('circle',{r:p.core?31:23,class:'sp-nc'},g);
        const t=S('text',{class:'sp-nn','text-anchor':'middle',dy:'.35em'},g); t.textContent=id;
        const lb=S('text',{class:'sp-nl','text-anchor':'middle',y:(p.core?31:23)+17},g); lb.textContent=f.title;
        if(opt.click){
          const on=()=>edges.forEach(([a,b,e])=>e.classList.toggle('hot',a===id||b===id)), off=()=>edges.forEach(([a,b,e])=>e.classList.remove('hot'));
          g.addEventListener('mouseenter',on); g.addEventListener('mouseleave',off); g.addEventListener('focus',on); g.addEventListener('blur',off);
          g.addEventListener('click',()=>opt.click(id)); g.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); opt.click(id);} });
        }
        if(opt.hidden) g.classList.add('off');
        N[id]=g; });
      const api={svg,N,shown:new Set(),
        show(n){ if(N[n]){ N[n].classList.remove('off'); N[n].classList.add('pop'); this.shown.add(n); edges.forEach(([a,b,e])=>e.classList.toggle('off',!(this.shown.has(a)&&this.shown.has(b)))); } },
        lit(set){ Object.keys(N).forEach(k=>N[k].classList.toggle('lit',set.includes(+k))); edges.forEach(([a,b,e])=>e.classList.toggle('hot',set.includes(a)&&set.includes(b))); },
        stage(id){ svg.querySelectorAll('.sp-lb').forEach(b=>b.classList.toggle('on',b.dataset.l===id||b.classList.contains('on'))); }};
      if(opt.hidden){ edges.forEach(([a,b,e])=>e.classList.add('off')); svg.querySelectorAll('.sp-lb').forEach(b=>b.classList.add('dim')); }
      return api;
    }

    /* ---------- internal diagram ---------- */
    function diagram(f,compact){
      const wrap=H('div','sp-dgm'+(compact?' compact':''));
      const ctl=H('div','sp-dc2'); wrap.append(ctl);
      const seg=H('div','sp-seg'); const bn=H('button','on',C.sc_good), bb=H('button','',null); bn.type='button'; bb.type='button';
      bb.append(H('b','',C.sc_bad),document.createTextNode(': '+f.bad.who)); seg.append(bn,bb); ctl.append(seg);
      const pl=H('button','sp-play',C.play); pl.type='button'; ctl.append(pl);
      const cols=Math.max(...f.sub.map(s=>s[3]))+1, L=f.lanes.length, CW=Math.max(108,Math.min(150,Math.floor(640/cols))), LH=128;
      const W=Math.max(cols*CW+30,640), OFF=(W-(cols*CW+30))/2, WR=Math.max(11,Math.floor(CW/8.4)), Hh=L*LH+8;
      const svg=S('svg',{viewBox:`0 0 ${W} ${Hh}`,class:'sp-dsvg',role:'img','aria-label':f.title}); const dsw=H('div','sp-dsw'); dsw.append(svg); wrap.append(dsw);
      const defs=S('defs',{},svg); const mk=(id,cl)=>{ const m=S('marker',{id,viewBox:'0 0 10 10',refX:'9',refY:'5',markerWidth:'7',markerHeight:'7',orient:'auto-start-reverse'},defs); S('path',{d:'M0,0L10,5L0,10z',class:cl},m); };
      const uid='m'+Math.random().toString(36).slice(2,7); mk(uid+'a','sp-ma'); mk(uid+'f','sp-mf');
      f.lanes.forEach((ln,i)=>{ S('rect',{x:4,y:i*LH+4,width:W-8,height:LH-8,rx:12,class:'sp-lane'},svg); const t=S('text',{x:W-14,y:i*LH+20,class:'sp-ll','text-anchor':'end'},svg); t.textContent=ln; });
      const pos={}; f.sub.forEach(s=>pos[s[0]]={x:W-OFF-15-CW/2-s[3]*CW,y:s[2]*LH+64,s});
      const goodIdx={}; f.good.path.forEach((id,i)=>goodIdx[id]=i+1);
      const R=24, E=[];
      f.edges2.forEach(([a,b])=>{ const A=pos[a],B=pos[b]; const dx=B.x-A.x,dy=B.y-A.y,d=Math.hypot(dx,dy)||1; const fail=B.s[4]==='bad'; const sx=A.x+dx/d*(R+3),sy=A.y+dy/d*(R+3),ex=B.x-dx/d*(R+7),ey=B.y-dy/d*(R+7);
        const p=S('line',{x1:sx,y1:sy,x2:ex,y2:ey,class:'sp-dee'+(fail?' fail':''),'marker-end':`url(#${uid}${fail?'f':'a'})`},svg); E.push([a,b,p]); });
      const NN={}; 
      const DOCKS=[[-33,-25],[33,-25],[0,-42],[-42,6],[42,6]];
      f.sub.forEach(s=>{ const [id,label,lane,col,kind]=s; const p=pos[id];
        const g=S('g',{class:'sp-dn '+kind,transform:`translate(${p.x},${p.y})`,tabindex:'0',role:'button','aria-label':label},svg);
        S('circle',{r:R,class:'sp-dcc'},g);
        const t=S('text',{class:'sp-dt','text-anchor':'middle',dy:'.35em'},g); t.textContent=kind==='ok'?'✓':kind==='bad'?'✕':(goodIdx[id]||(kind==='store'?'≣':'•'));
        const words=label.split(' '); let l1='',l2=''; words.forEach(w=>{ if((l1+' '+w).trim().length<=WR||!l1) l1=(l1+' '+w).trim(); else l2=(l2+' '+w).trim(); });
        const a=S('text',{class:'sp-dl2','text-anchor':'middle',y:R+17},g); a.textContent=l1; if(l2){ const b2=S('text',{class:'sp-dl2','text-anchor':'middle',y:R+31},g); b2.textContent=l2; }
        (f.tech[id]||[]).forEach((tn,i)=>{ const dp=DOCKS[i]||DOCKS[4]; const dk=S('g',{class:'sp-dk',transform:`translate(${dp[0]},${dp[1]})`,tabindex:'0',role:'button','aria-label':tn},g);
          S('circle',{r:12,class:'sp-dkc'},dk); const T0=D.techs[tn]; if(T0&&T0.logo&&D.logos[T0.logo]){ S('path',{d:D.logos[T0.logo],class:'sp-dkl',transform:'translate(-8,-8) scale(.667)'},dk); } else { const m=S('text',{class:'sp-dkm','text-anchor':'middle',dy:'.36em'},dk); m.textContent=mono(tn,T0&&T0.kind); }
          const ti=S('title',{},dk); ti.textContent=tn;
          const open=ev=>{ ev.stopPropagation(); openNode(id,tn); }; dk.addEventListener('click',open); dk.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); open(e);} }); });
        g.addEventListener('click',()=>openNode(id)); g.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); openNode(id);} });
        NN[id]=g; });
      const pk=S('circle',{r:8,class:'sp-pk',cx:0,cy:0},svg); pk.style.opacity=0;
      const cap=H('p','sp-cap',C.cap_hint); wrap.append(cap);
      function openNode(id,tn){
        const s=f.sub.find(x=>x[0]===id), inf=f.info[id]; Object.values(NN).forEach(g=>g.classList.toggle('sel',g===NN[id]));
        const bx=H('div','sp-info'); const hd=H('div','sp-ih'); hd.append(H('span','sp-in',String(goodIdx[id]||(s[4]==='ok'?'\u2713':s[4]==='bad'?'\u2715':'\u2022'))),H('b','',s[1]));
        const x=H('button','sp-x','\u2715'); x.type='button'; x.setAttribute('aria-label',C.close); const done=()=>{ Object.values(NN).forEach(g=>g.classList.remove('sel')); }; x.addEventListener('click',()=>{ closeModal(); done(); }); hd.append(x); bx.append(hd);
        [[C.i_what,inf[0],''],[C.i_why,inf[1],''],[C.i_without,inf[2],'wo']].forEach(([k,v,c])=>{ const r=H('div','sp-ir '+c); r.append(H('em','',k),gp(v,'sp-irv','span')); bx.append(r); });
        const ts=f.tech[id]||[];
        if(ts.length){ const tl=H('div','sp-itl'); tl.append(H('em','',C.i_tech)); const row=H('div','sp-itr'); const slot=H('div','sp-its');
          const sel=n=>{ slot.textContent=''; slot.append(techCard(n)); row.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.n===n)); };
          ts.forEach(n=>{ const b=H('button','sp-chip2'); b.type='button'; b.dataset.n=n; b.append(techIcon(n),document.createTextNode(n)); b.addEventListener('click',()=>sel(n)); row.append(b); });
          tl.append(row,slot); bx.append(tl); sel(tn||ts[0]); }
        const order=f.good.path.includes(id)?f.good.path:f.sub.map(q=>q[0]); const nxt=order[(order.indexOf(id)+1)%order.length];
        const ft=H('div','sp-mf'); const nb=H('button','sp-btn',C.next_node); nb.type='button'; nb.addEventListener('click',()=>openNode(nxt)); const cb=H('button','sp-btn ghost',C.close); cb.type='button'; cb.addEventListener('click',()=>{ closeModal(); done(); }); ft.append(nb,cb); bx.append(ft);
        showModal(bx,done);
      }
      let token=0, which='good';
      function resetViz(){ Object.values(NN).forEach(g=>g.classList.remove('lit','dim','boom','bad2')); E.forEach(([a,b,e])=>e.classList.remove('lit','bad2')); pk.style.opacity=0; }
      async function play(sc){
        which=sc||which; const my=++token; const S0=f[which]; const bad=which==='bad';
        seg.children[0].classList.toggle('on',!bad); seg.children[1].classList.toggle('on',bad);
        resetViz(); const set=new Set(S0.path); Object.keys(NN).forEach(k=>{ if(!set.has(k)) NN[k].classList.add('dim'); });
        cap.className='sp-cap run'+(bad?' bad':''); cap.textContent=bad?f.bad.who+'...':C.cap_run;
        pl.disabled=true; const first=pos[S0.path[0]]; pk.style.transition='none'; pk.setAttribute('cx',first.x); pk.setAttribute('cy',first.y); pk.style.opacity=1; void pk.getBoundingClientRect(); pk.style.transition=reduce?'none':'cx .6s ease, cy .6s ease';
        pk.classList.toggle('bad',bad);
        for(let i=0;i<S0.path.length;i++){
          if(my!==token) return; const id=S0.path[i], p=pos[id];
          if(i>0){ const pv=S0.path[i-1]; const e=E.find(([a,b])=>(a===pv&&b===id)||(a===id&&b===pv)); if(e) e[2].classList.add(bad?'bad2':'lit'); pk.setAttribute('cx',p.x); pk.setAttribute('cy',p.y); await sleep(650); if(my!==token) return; }
          NN[id].classList.add(bad&&i===S0.path.length-1?'boom':bad?'bad2':'lit'); await sleep(i===0?350:450);
        }
        if(my!==token) return;
        cap.className='sp-cap done'+(bad?' bad':''); cap.textContent=S0.cap; pl.disabled=false; pl.textContent=C.replay;
      }
      bn.addEventListener('click',()=>play('good')); bb.addEventListener('click',()=>play('bad')); pl.addEventListener('click',()=>play(which));
      wrap._play=play; wrap._stop=()=>{ token++; resetViz(); };
      let auto=false; new IntersectionObserver((es)=>es.forEach(e=>{ if(e.isIntersecting&&!auto&&!compact){ auto=true; setTimeout(()=>play('good'),500); } }),{threshold:.55}).observe(wrap);
      return wrap;
    }

    /* ---------- part block ---------- */
    function partBlock(f,stageIdx){
      const b=H('article','sp-part'); b.id='sp-p-'+f.n; reveal(b);
      const hd=H('div','sp-ph'); hd.append(H('span','sp-fn',String(f.n)));
      const ht=H('div','sp-pt'); ht.append(H('h5','',f.title),H('i','',f.line)); hd.append(ht); b.append(hd);
      b.append(gp(f.hook,'sp-hook'));
      if(f.explain){ const ex=H('aside','sp-ex'); ex.append(H('b','',f.explain[0]),gp(f.explain[1],'sp-exp')); b.append(ex); }
      b.append(H('p','sp-now',D.prep.now));
      b.append(H('p','sp-prep',D.prep.pre));
      b.append(H('p','sp-hint',C.dg_hint));
      b.append(diagram(f,false));
      const bl=H('details','sp-how2'); const sm=H('summary','',C.how_h); bl.append(sm); const ol=H('ol','sp-how'); f.how.forEach(h=>ol.append(gp(h,'','li'))); bl.append(ol); b.append(bl);
      const dm=H('div','sp-dm'); dm.append(H('h5','',C.data_h+': '+f.data.rec)); const dl=H('dl'); f.data.fields.forEach(([k,v])=>{ const dt=H('dt'); dt.append(H('code','',k)); dl.append(dt,H('dd','',v)); }); dm.append(dl);
      const io=H('div','sp-io'); [[C.io_in,f.io[0]],[C.io_out,f.io[1]]].forEach(([a,c])=>{ const d=H('div'); d.append(H('em','',a),H('span','',c)); io.append(d); }); dm.append(io); b.append(dm);
      const tn=[...new Set(Object.values(f.tech).flat())];
      if(tn.length){ const tw=H('div','sp-tw'); tw.append(H('h6','',C.tech_h)); const tg=H('div','sp-tg'); tn.forEach(n=>tg.append(techCard(n))); tw.append(tg); b.append(tw); }
      const br=H('p','sp-bridge'); br.append(gp(f.bridge,'','span')); b.append(br);
      return b;
    }

    /* ===== 1. hero ===== */
    const hero=H('section','sp-hero'); root.append(hero);
    hero.append(H('div','sp-kick',C.kicker));
    D.promise.forEach((l,i)=>{ const e=H('p','sp-line',l); e.style.setProperty('--i',i); hero.append(e); });
    reveal(hero);

    /* ===== 2. scene ===== */
    const sc=sec('sp-scene',D.scene.h);
    D.scene.lines.forEach((l,i)=>{ const p=gp(l,'sp-sl'); if(i===2) p.classList.add('big'); sc.append(p); });
    sc.append(H('p','sp-q',D.scene.q)); sc.append(gp(D.scene.how,'sp-how0'));

    /* ===== 3. build stages ===== */
    const stg=H('div','sp-stages'); root.append(stg);
    const strip=H('div','sp-strip'); stg.append(strip);
    const mm=mapSvg({mini:true,hidden:true}); const mw=H('div','sp-mmw'); mw.append(mm.svg); strip.append(mw);
    const st=H('div','sp-st'); const stK=H('em','',C.strip_k), stN=H('b','',C.strip_empty), stP=H('span','sp-stp',''); st.append(stK,stN,stP); strip.append(st);
    const built=[];
    D.stages.forEach((S0,si)=>{
      const sb=H('section','sp-stage'); sb.dataset.stage=S0.id; reveal(sb);
      const sh=H('div','sp-sh2'); sh.append(H('span','sp-sk',S0.k),H('h3','',S0.name)); sb.append(sh);
      sb.append(H('p','sp-defn',S0.defn)); sb.append(gp(S0.text,'sp-p')); sb.append(H('p','sp-sn',D.prep.stage_now+' '+S0.parts.map(n=>F[n].title).join(', ')+'.')); sb.append(H('p','sp-q',S0.q));
      stg.append(sb);
      S0.parts.forEach(n=>{ const pb=partBlock(F[n],si); stg.append(pb);
        new IntersectionObserver((es,o)=>es.forEach(e=>{ if(e.isIntersecting){ mm.stage(S0.id); mm.show(n); if(!built.includes(n)) built.push(n); stN.textContent=S0.name; stP.textContent=F[n].title; strip.classList.add('has'); pb.classList.add('seen'); } }),{threshold:.2}).observe(pb); });
      const sf=H('div','sp-sofar'); sf.append(H('em','',C.sofar)); S0.parts.forEach(n=>{ const c=H('span','sp-sfc'); c.append(H('b','',String(n)),document.createTextNode(' '+F[n].title)); sf.append(c); }); stg.append(sf);
    });

    /* ===== 4. full map ===== */
    const ms=sec('sp-map',C.map_h,D.br.map);
    const wrapM=H('div','sp-mapw'); ms.append(wrapM);
    const peekHost=H('div','sp-peek'); let peekN=null;
    const full=mapSvg({click:n=>{ if(peekN===n){ peekHost.textContent=''; peekN=null; return; } peekN=n; peekHost.textContent=''; const pk=peekBlock(n); peekHost.append(pk); pk.scrollIntoView({block:'nearest',behavior:reduce?'auto':'smooth'}); full.lit([n]); }});
    wrapM.append(full.svg); ms.append(peekHost);
    function peekBlock(n){ const f=F[n]; const b=H('div','sp-pkb'); const h=H('div','sp-pkh'); h.append(H('span','sp-fn',String(n)),H('b','',f.title)); const x=H('button','sp-x','✕'); x.type='button'; x.setAttribute('aria-label',C.close); x.addEventListener('click',()=>{ peekHost.textContent=''; peekN=null; full.lit([]); }); h.append(x); b.append(h,gp(f.line,'sp-pkl')); const dg=diagram(f,true); b.append(dg); setTimeout(()=>dg._play('good'),400); return b; }
    closeQ(ms,C.map_q);

    /* ===== 5. journey ===== */
    const js=sec('sp-jr',C.jr_h,D.br.journey); js.append(gp(D.jintro.p,'sp-p')); js.append(H('p','sp-hint',D.jintro.hint));
    const jl=H('ol','sp-jl'); js.append(jl);
    const jd=H('div','sp-jd'); js.append(jd);
    const jtx=H('div','sp-jtx'); const jt=H('p','sp-jt'), jw=H('p','sp-jy'), jwo=H('p','sp-jwo'); const jc=H('div','sp-jc'); jtx.append(jt,jw,jwo,jc);
    const jm=mapSvg({mini:true}); jm.svg.classList.add('sp-jmm'); const jmw=H('div','sp-jmw'); jmw.append(jm.svg); jd.append(jtx,jmw);
    const jpeek=H('div','sp-peek'); js.append(jpeek); let jpN=null;
    const steps=D.journey.map((s,i)=>{ const li=H('li','sp-js'); const b=H('button','',null); b.type='button'; b.append(H('span','sp-jn',String(i+1)),H('span','sp-jtt',s.name)); li.append(b); jl.append(li); b.addEventListener('click',()=>{ stop(); go(i,true); }); return li; });
    const replay=H('button','sp-btn',C.jr_play); replay.type='button'; js.append(replay);
    let timer=null; function stop(){ if(timer){ clearInterval(timer); timer=null; } }
    function go(i,manual){
      steps.forEach((s,k)=>{ s.classList.toggle('on',k<=i); s.classList.toggle('now',k===i); });
      const s=D.journey[i]; jt.textContent=''; glossify(jt,s.text,G); jw.textContent=''; jw.append(H('em','',C.jr_why),document.createTextNode(' '+s.why));
      jwo.textContent=''; jwo.append(H('em','',C.jr_without),document.createTextNode(' '+s.without)); jwo.classList.toggle('show',!!manual||true);
      jm.lit(s.refs); jc.textContent=''; s.refs.forEach(r=>{ const c=H('button','sp-chip'); c.type='button'; c.append(H('b','',String(r)),document.createTextNode(' '+F[r].title)); c.addEventListener('click',()=>{ stop(); if(jpN===r){ jpeek.textContent=''; jpN=null; return; } jpN=r; jpeek.textContent=''; const pk=peekBlock2(r); jpeek.append(pk); pk.scrollIntoView({block:'nearest',behavior:reduce?'auto':'smooth'}); }); jc.append(c); });
      jd.classList.remove('flash'); void jd.offsetWidth; jd.classList.add('flash');
    }
    function peekBlock2(n){ const f=F[n]; const b=H('div','sp-pkb'); const h=H('div','sp-pkh'); h.append(H('span','sp-fn',String(n)),H('b','',f.title)); const x=H('button','sp-x','✕'); x.type='button'; x.setAttribute('aria-label',C.close); x.addEventListener('click',()=>{ jpeek.textContent=''; jpN=null; }); h.append(x); b.append(h,gp(f.line,'sp-pkl')); const dg=diagram(f,true); b.append(dg); setTimeout(()=>dg._play('good'),400); return b; }
    function play(){ stop(); let i=0; go(0); if(reduce){ go(D.journey.length-1); return; } timer=setInterval(()=>{ i++; if(i>=D.journey.length){ stop(); return; } go(i); },3600); }
    replay.addEventListener('click',play);
    let jstarted=false; new IntersectionObserver((es)=>es.forEach(e=>{ if(e.isIntersecting&&!jstarted){ jstarted=true; play(); } }),{threshold:.4}).observe(jd);
    go(0);
    closeQ(js,C.jr_q);

    /* ===== 6. shelf ===== */
    const X=D.techx; const ss=sec('sp-sh',X.h,D.br.shelf); ss.append(gp(X.p,'sp-p'));
    const kb=H('div','sp-kt'); ss.append(kb); const kd=H('p','sp-kdesc'); ss.append(kd); const tg=H('div','sp-tgg'); ss.append(tg);
    const names=Object.keys(D.techs);
    function fill(k){ kd.textContent=X.kdesc[k]; tg.textContent=''; kb.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.k===k));
      names.filter(n=>k==='all'||D.techs[n].kind===k).forEach(n=>{ const c=techCard(n); const u=H('div','sp-tu'); u.append(H('em','',X.used)); D.techs[n].parts.forEach(p=>{ u.append(H('span','',p+' · '+F[p].title)); }); c.append(u); tg.append(c); }); }
    Object.keys(X.kinds).forEach(k=>{ const b=H('button','',X.kinds[k]); b.type='button'; b.dataset.k=k; b.addEventListener('click',()=>fill(k)); kb.append(b); }); fill('all');
    closeQ(ss,C.shelf_q);

    /* ===== 7. decisions ===== */
    const DX=D.decx; const ds=sec('sp-dc',C.dec_h,D.br.dec); ds.append(gp(DX.p,'sp-p'));
    const prog=H('div','sp-prog'); ds.append(prog); D.decisions.forEach(()=>prog.append(H('i'))); const scoreEl=H('p','sp-score'); 
    const dwrap=H('div','sp-dlist'); ds.append(dwrap); let answered=0, same=0;
    D.decisions.forEach((d,i)=>{
      const card=H('article','sp-fork'); card.append(H('div','sp-fq',null)); const hq=card.firstChild; hq.append(H('em','',String(i+1)),H('b','',d.q)); card.append(H('p','sp-fh2',d.hint));
      const opts=H('div','sp-fo'+(d.options.length>2?' three':'')); card.append(opts);
      const res=H('div','sp-fr'); res.hidden=true; card.append(res);
      d.options.forEach((o,k)=>{ const b=H('button','sp-opt'); b.type='button'; b.append(H('b','',o[0]),H('span','',o[1])); b.addEventListener('click',()=>{
        if(card.classList.contains('done')) return; card.classList.add('done'); answered++; const ok=k===d.chosen; if(ok) same++;
        [...opts.children].forEach((x,j)=>{ x.disabled=true; x.classList.toggle('picked',j===k); x.classList.toggle('ours',j===d.chosen); x.classList.toggle('lost',j!==d.chosen); });
        res.hidden=false; res.append(H('p','sp-verdict '+(ok?'y':'n'),(ok?DX.same:DX.diff)+'.'));
        const ch=H('div','sp-ch'); ch.append(H('em','',DX.reveal),H('b','',d.choice),gp(d.why,'sp-chw','p'),H('i','',d.price)); res.append(ch);
        d.stories.forEach((st,j)=>{ if(st){ const r=H('div','sp-rd'); r.append(H('em','',DX.road+': '+d.options[j][0]),gp(st,'','p')); res.append(r); } });
        prog.children[i].classList.add(ok?'y':'n'); if(!reduce) res.animate([{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'none'}],{duration:350});
        if(answered===D.decisions.length){ scoreEl.textContent=DX.score.replace('{a}',same).replace('{b}',D.decisions.length)+'. '+DX.fin; scoreEl.classList.add('on'); }
      }); opts.append(b); });
      dwrap.append(card); });
    ds.append(scoreEl); closeQ(ds,C.dec_q);

    /* ===== 8. knob (committee / reveal / judges) ===== */
    if(D.knob){
    const KX=D.knobx; const ks=sec('sp-kn',D.knob.title,D.br.knob); ks.append(gp(KX.intro,'sp-p'));
    const K=Object.assign({},C.knob_l,KX.K||{}); const mode=KX.mode||'committee'; const NM=D.knob.n||5; const st5=Array.from({length:NM},(_,i)=>mode==='judges'?0:(i===1?1:0)); let thr=D.knob.thr;
    const lg=H('div','sp-lg'); KX.legend.forEach((l,i)=>{ const d=H('div','s'+i); d.append(H('b','',l[0]),H('span','',l[1])); lg.append(d); }); ks.append(lg);
    const mem=H('div','sp-mem'); ks.append(mem);
    const row=H('div','sp-thr'); const lab=H('label','',K.thr+': '); const out=H('b','',String(thr)); lab.append(out); const rg=H('input'); rg.type='range'; rg.min=1; rg.max=NM; rg.value=thr; rg.setAttribute('aria-label',K.thr); row.append(lab,rg); if(mode!=='judges') ks.append(row);
    const vd=H('div','sp-vd'); vd.setAttribute('aria-live','polite'); ks.append(vd);
    const sn=H('p','sp-scn'); ks.append(sn);
    ks.append(H('p','sp-try',KX.try_)); const sb2=H('div','sp-scb'); ks.append(sb2);
    ks.append(gp(KX.dilemma,'sp-dil')); ks.append(H('p','sp-note',D.knob.note));
    const bs=st5.map((_,i)=>{ const b=H('button','sp-m'); b.type='button'; b.append(H('span','sp-mi','◆'),H('span','sp-ml','')); b.addEventListener('click',()=>{ st5[i]=(st5[i]+1)%3; sn.textContent=''; draw(); }); mem.append(b); return b; });
    function verdict(){
      const c=[0,1,2].map(v=>st5.filter(x=>x===v).length);
      if(mode==='reveal'){ const committed=c[1]+c[2]; if(committed<thr) return ['fail',K.fail,`${K.l1}: ${committed} · ${K.thr}: ${thr}`,K.w_fail]; if(c[2]>0) return ['forged',K.abort,`${K.l1}: ${committed} · ${K.l2}: ${c[2]}`,K.w_abort]; return ['pass',K.pass_,`${K.l1}: ${committed} · ${K.thr}: ${thr}`,'']; }
      if(mode==='judges'){ if(c[0]>0&&c[1]>0) return ['forged',K.human,K.l1+': '+c[0]+' · '+K.l2+': '+c[1]+' · '+K.l3+': '+c[2],K.w_split]; if(c[1]>0) return ['fail',K.fail,K.l1+': '+c[0]+' · '+K.l2+': '+c[1]+' · '+K.l3+': '+c[2],'']; if(c[2]>0) return ['forged',K.human,K.l1+': '+c[0]+' · '+K.l2+': '+c[1]+' · '+K.l3+': '+c[2],K.w_unsure]; return ['pass',K.pass_,K.l1+': '+c[0]+' · '+K.l2+': '+c[1]+' · '+K.l3+': '+c[2],'']; }
      const pass=c[1]+c[2]>=thr, forged=c[2]>=thr; return [forged?'forged':pass?'pass':'fail',pass?K.pass_:K.fail,` ${K.signed}: ${c[1]} · ${K.stolen}: ${c[2]} · ${K.thr}: ${thr}`,forged?K.warn:''];
    }
    function draw(){
      out.textContent=thr; rg.value=thr;
      bs.forEach((b,i)=>{ b.dataset.s=st5[i]; b.querySelector('.sp-ml').textContent=[K.n0,K.n1,K.n2][st5[i]]; });
      const [cls,head,detail,warn]=verdict(); vd.className='sp-vd '+cls; vd.textContent='';
      vd.append(H('b','',head),H('span','',' '+detail)); if(warn) vd.append(H('i','',warn));
    }
    KX.sc.forEach(s2=>{ const b=H('button','sp-btn',s2[0]); b.type='button'; b.addEventListener('click',()=>{ s2[1].forEach((v,i)=>st5[i]=v); thr=s2[2]; draw(); sn.textContent=s2[3]; }); sb2.append(b); });
    rg.addEventListener('input',()=>{ thr=+rg.value; sn.textContent=''; draw(); }); draw();
    }

    /* ===== 9. delta ===== */
    const de=sec('sp-de',C.delta_h,D.br.delta); de.append(gp(C.delta_p,'sp-p'));
    const dr=H('div','sp-dr'); de.append(dr);
    const hd=H('div','sp-drh'); hd.append(H('span','',C.delta_from),H('span','',''),H('span','',C.delta_to)); dr.append(hd);
    D.delta.forEach(([a,b],i)=>{ const r=H('div','sp-drw'); r.style.setProperty('--i',i); r.append(H('span','sp-da',a),H('span','sp-dar','←'),H('span','sp-db',b)); dr.append(r); });
    closeQ(de,C.delta_q);

    /* ===== 10. downloads ===== */
    const dd=sec('sp-dl',C.dl_h,D.br.dl);
    const dg2=H('div','sp-dlg'); dd.append(dg2);
    [[C.dl_he,C.dl_he_d,'he','HE'],[C.dl_en,C.dl_en_d,'en','EN'],[C.dl_one_he,'','onepager-he','HE'],[C.dl_one_en,'','onepager-en','EN']].filter(x=>!D.dlset||D.dlset.includes(x[2])).forEach(([t,d,k,lg2])=>{
      const c=H('div','sp-dlc'); if(lg2==='EN') c.setAttribute('dir','ltr'); c.append(H('span','sp-dlb',lg2),H('b','',t)); if(d) c.append(H('i','',d));
      const a=H('div','sp-dla'); ['pdf','docx'].forEach(x=>{ const l=H('a','',x.toUpperCase()); l.href=D.dl+k+'.'+x; l.setAttribute('download',''); a.append(l); }); c.append(a); dg2.append(c); });
    closeQ(dd,C.dl_q);
  }
  function init(){ document.querySelectorAll('.sp[data-sp]').forEach(mount); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
