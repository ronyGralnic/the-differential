/* Architecture view: levels, packet, break-it, messages, terms, decisions, sprints, closure. */
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
    const D=window.ARCH&&window.ARCH[root.dataset.ar]; if(!D) return;
    const C=D.copy, G=D.gloss; const PI={}; D.planes.forEach((p,i)=>PI[p[0]]=i);
    root.textContent=''; root.classList.add('sp-root','ar-root');
    const gp=(txt,cls,tag)=>glossify(H(tag||'p',cls||'sp-p'),txt,G);
    const sec=(cls,h,p)=>{ const s=H('section','sp-sec '+cls); reveal(s); if(h) s.append(H('h4','sp-h',h)); if(p) s.append(gp(p)); root.append(s); return s; };
    const closeQ=(s,q)=>{ if(q) s.append(H('p','sp-q',q)); };

    /* ---------- floating window ---------- */
    let modal=null, lastFocus=null;
    function closeModal(){ if(!modal) return; modal.remove(); modal=null; removeEventListener('keydown',escKey,true); if(lastFocus&&lastFocus.focus) lastFocus.focus(); }
    function escKey(e){ if(e.key==='Escape'){ e.stopImmediatePropagation(); e.preventDefault(); closeModal(); } }
    function showModal(node){
      lastFocus=document.activeElement; if(modal) modal.remove();
      modal=H('div','sp-modal'); const back=H('div','sp-mback'); const card=H('div','sp-mcard'); card.setAttribute('role','dialog'); card.setAttribute('aria-modal','true');
      back.addEventListener('click',closeModal); card.append(node); modal.append(back,card); document.body.append(modal);
      addEventListener('keydown',escKey,true); const x=node.querySelector('.sp-x'); if(x) x.focus();
      if(!reduce) card.animate([{opacity:0,transform:'translateY(14px) scale(.98)'},{opacity:1,transform:'none'}],{duration:220,easing:'ease-out'});
    }
    function cardModal(c,extra){
      const bx=H('div','ar-card'); const hd=H('div','ar-ch'); const tt=H('div','ar-ct'); tt.append(H('b','',c.name)); if(c.en) tt.append(H('span','ar-en',c.en)); hd.append(tt);
      const x=H('button','sp-x','✕'); x.type='button'; x.setAttribute('aria-label',C.close); x.addEventListener('click',closeModal); hd.append(x); bx.append(hd);
      const badges=H('div','ar-bd'); if(c.plane&&PI[c.plane]!=null){ const p=D.planes[PI[c.plane]]; badges.append(H('span','ar-pb pc'+PI[c.plane],p[1])); }
      badges.append(H('span','ar-kb '+(c.kind==='ext'?'ext':'sys'),c.kind==='ext'?C.kind_ext:C.kind_sys)); if(c.kind!=='actor'&&c.kind!=='step') bx.append(badges);
      bx.append(gp(c.role,'ar-role'));
      [[C.in_,c.inn],[C.out,c.out],[C.never,c.never]].forEach(([k,v])=>{ if(!v) return; const r=H('div','ar-row'+(k===C.never?' nv':'')); r.append(H('em','',k),gp(v,'ar-rv','span')); bx.append(r); });
      if(c.tech&&c.tech.length){ const r=H('div','ar-row'); r.append(H('em','',C.tech)); const t=H('span','ar-tch'); c.tech.forEach(n=>t.append(H('span','ar-tc',n))); r.append(t); bx.append(r); }
      if(extra) bx.append(extra);
      return bx;
    }

    /* ---------- diagram engine ---------- */
    const VW=1000,VH=540;
    function wrap(t){ if(t.length<=15) return [t]; const w=t.split(' '); let a='',b=''; w.forEach(x=>{ if((a+' '+x).trim().length<=15||!b&&!a) a=(a+' '+x).trim(); else b=(b+' '+x).trim(); }); if(!b){ const m=Math.ceil(t.length/2); return [t.slice(0,m),t.slice(m)]; } return [a,b]; }
    function diagram(spec,o){
      o=o||{}; const wrapEl=H('div','ar-dgw'); const svg=S('svg',{viewBox:`0 0 ${VW} ${VH}`,class:'ar-dg',role:'img'}); wrapEl.append(svg);
      const N={},Lk={}; const lg=S('g',{},svg), ng=S('g',{},svg), mg=S('g',{},svg);
      spec.nodes.forEach(n=>{ const [id,label,x,y,kind,plane]=n; const sz=kind==='system'?[210,120]:(kind==='actor'||kind==='ext1')?[170,64]:[142,64];
        N[id]={x,y,w:sz[0],h:sz[1],kind,label,plane}; });
      const clip=(a,b)=>{ const dx=b.x-a.x,dy=b.y-a.y; const sx=dx?(a.w/2)/Math.abs(dx):1e9, sy=dy?(a.h/2)/Math.abs(dy):1e9; const t=Math.min(sx,sy)+0.012; return [a.x+dx*t,a.y+dy*t]; };
      const head=(x,y,ang)=>{ const s=9; const pts=[[0,0],[-s*1.5,-s*0.6],[-s*1.5,s*0.6]].map(([px,py])=>[x+px*Math.cos(ang)-py*Math.sin(ang),y+px*Math.sin(ang)+py*Math.cos(ang)].join(',')).join(' '); return pts; };
      spec.edges.forEach(e=>{ const [a,b,label,id,kind,two]=e; const A=N[a],B=N[b]; if(!A||!B) return;
        const p1=clip(A,B),p2=clip(B,A); const g=S('g',{class:'ar-lk'+(kind==='support'?' sup':''),'data-id':id||''},lg);
        S('path',{d:`M${p1[0]},${p1[1]} L${p2[0]},${p2[1]}`,class:'ar-ln'},g);
        const ang=Math.atan2(p2[1]-p1[1],p2[0]-p1[0]); S('polygon',{points:head(p2[0],p2[1],ang),class:'ar-hd'},g); if(two) S('polygon',{points:head(p1[0],p1[1],ang+Math.PI),class:'ar-hd'},g);
        if(label){ const mx=(p1[0]+p2[0])/2,my=(p1[1]+p2[1])/2; const t=S('text',{x:mx,y:my-7,class:'ar-ll','text-anchor':'middle'},g); t.textContent=label; }
        if(id&&o.linkClick){ const h=S('path',{d:`M${p1[0]},${p1[1]} L${p2[0]},${p2[1]}`,class:'ar-hit'},g); g.setAttribute('tabindex','0'); g.setAttribute('role','button'); g.setAttribute('aria-label',label||id); const open=()=>o.linkClick(id); g.addEventListener('click',open); g.addEventListener('keydown',ev=>{ if(ev.key==='Enter'||ev.key===' '){ ev.preventDefault(); open(); } }); }
        if(id) Lk[id]={g,a,b};
      });
      Object.keys(N).forEach(id=>{ const n=N[id]; const g=S('g',{class:'ar-n k-'+n.kind+(n.plane!=null?' pc'+n.plane:''),transform:`translate(${n.x},${n.y})`,'data-id':id},ng);
        S('rect',{x:-n.w/2,y:-n.h/2,width:n.w,height:n.h,rx:n.kind==='system'?18:12,class:'ar-r'},g);
        const lines=wrap(n.label); const lh=17; lines.forEach((ln,i)=>{ const t=S('text',{x:0,y:(i-(lines.length-1)/2)*lh+5,class:'ar-t','text-anchor':'middle'},g); t.textContent=ln; });
        const mk=S('text',{x:0,y:n.h/2+16,class:'ar-mk','text-anchor':'middle'},g); const nm=S('g',{class:'ar-nm',transform:`translate(${n.w/2-4},${-n.h/2+4})`},g);
        n.g=g; n.mk=mk; n.nm=nm;
        if(o.click){ g.setAttribute('tabindex','0'); g.setAttribute('role','button'); g.setAttribute('aria-label',n.label); const open=()=>o.click(id); g.addEventListener('click',open); g.addEventListener('keydown',ev=>{ if(ev.key==='Enter'||ev.key===' '){ ev.preventDefault(); open(); } }); }
      });
      const tok=S('g',{class:'ar-tok'},mg); S('circle',{r:11,class:'ar-tc1'},tok); S('circle',{r:4,class:'ar-tc2'},tok); tok.style.opacity=0;
      const api={el:wrapEl,svg,N,Lk,
        node(id,cls,on){ if(N[id]) N[id].g.classList.toggle(cls,on!==false); },
        link(id,cls,on){ if(Lk[id]) Lk[id].g.classList.toggle(cls,on!==false); },
        mark(id,txt){ if(N[id]) N[id].mk.textContent=txt||''; },
        num(id,n){ const nm=N[id].nm; nm.textContent=''; if(n!=null){ S('circle',{r:12,class:'ar-nmc'},nm); const t=S('text',{y:4,'text-anchor':'middle',class:'ar-nmt'},nm); t.textContent=n; } },
        clear(){ Object.values(N).forEach(n=>{ n.g.setAttribute('class','ar-n k-'+n.kind+(n.plane!=null?' pc'+n.plane:'')); n.mk.textContent=''; n.nm.textContent=''; }); Object.values(Lk).forEach(l=>l.g.classList.remove('lit','cut','dim')); tok.style.opacity=0; },
        tok(id,anim){ const n=N[id]; if(!n) return; if(!anim){ tok.style.transition='none'; } tok.style.transform=`translate(${n.x}px,${n.y-n.h/2+2}px)`; tok.style.opacity=1; if(!anim){ void tok.getBoundingClientRect(); tok.style.transition=''; } },
        tokHide(){ tok.style.opacity=0; }};
      return api;
    }
    function mainSpec(o){ o=o||{};
      return {nodes:Object.keys(D.pos).map(id=>[id,D.cards[id].name,D.pos[id][0],D.pos[id][1],D.cards[id].kind==='ext'?'ext':'sys',PI[D.cards[id].plane]]),
       edges:D.links.map(l=>[l.a,l.b,o.noLabels?'':l.label,l.id,l.kind,l.two])}; }
    function levelSpec(L){ return {nodes:L.nodes.map(n=>[n[0],(L.cards[n[0]]||{}).name||n[1],n[2],n[3],n[4]==='actor'?'actor':n[4]==='system'?'system':n[4]==='ext'?'ext1':n[4],(L.cards[n[0]]&&L.cards[n[0]].plane!=null)?PI[L.cards[n[0]].plane]:null]),edges:L.edges.map(e=>[e[0],e[1],e[2]])}; }
    const note=(txt)=>H('p','ar-sw',txt);

    /* ===== 1. scene ===== */
    const sc=H('section','sp-sec sp-scene'); reveal(sc); sc.append(H('p','sp-kicker',D.intro.h)); D.intro.lines.forEach(l=>sc.append(gp(l,'sp-p'))); sc.append(H('p','sp-q',D.intro.q)); sc.append(gp(D.intro.how,'sp-p')); root.append(sc);

    /* ===== 2. levels ===== */
    const lv=sec('ar-lv',C.lv_h,C.lv_p);
    const tabs=H('div','ar-tabs'); lv.append(tabs); const lvbody=H('div','ar-lvb'); lv.append(lvbody);
    const legend=H('div','ar-leg'); legend.append(H('em','',C.lv_leg)); D.planes.forEach((p,i)=>{ const c=H('span','ar-pb pc'+i,p[1]); c.title=p[2]; legend.append(c); });
    let curLv=0; const lvTab=[];
    function showLevel(i){
      curLv=i; lvTab.forEach((b,j)=>b.classList.toggle('on',j===i)); lvbody.textContent='';
      const L=D.levels[i]; lvbody.append(gp(L.intro,'sp-p'));
      const spec=L.main?mainSpec():levelSpec(L); const cards=L.main?D.cards:L.cards;
      const dg=diagram(spec,{click:id=>{ const c=cards[id]; if(!c) return; let ex=null;
        if(i===0&&c.kind==='system'){ ex=H('div','sp-mf'); const b=H('button','sp-btn',D.copy.next); b.type='button'; b.textContent='← '+D.levels[1].name; b.addEventListener('click',()=>{ closeModal(); showLevel(1); }); ex.append(b); }
        if(i===1&&id===D.close.openId){ }
        showModal(cardModal(c,ex)); }});
      lvbody.append(dg.el); if(L.main){ lvbody.append(legend); } if(innerWidth<760) lvbody.append(note('גללו הצידה כדי לראות את כל המפה. לחצו על קופסה כדי לקרוא עליה.'));
    }
    D.levels.forEach((L,i)=>{ const b=H('button','ar-tab',C.nv_tab[i]); b.type='button'; b.addEventListener('click',()=>showLevel(i)); tabs.append(b); lvTab.push(b); });
    showLevel(1); closeQ(lv,C.lv_q);

    /* ===== 3. feature map ===== */
    const mp=sec('ar-mp',C.mp_h,C.mp_p);
    const mdg=diagram(mainSpec({noLabels:true}),{}); const mrow=H('div','ar-chips'); mp.append(H('em','sp-vzk',C.mp_pick),mrow,mdg.el); const mnote=H('div','ar-mn'); mp.append(mnote);
    const mchips=D.map.map(m=>{ const b=H('button','sp-chip'); b.type='button'; b.append(H('b','',String(m[0])),document.createTextNode(m[1])); b.addEventListener('click',()=>{ mchips.forEach(x=>x.classList.toggle('on',x===b)); mdg.clear();
      m[2].forEach((id,k)=>{ mdg.node(id,'lit'); mdg.num(id,k+1); }); Object.keys(mdg.N).forEach(id=>{ if(!m[2].includes(id)) mdg.node(id,'dim'); });
      Object.values(mdg.Lk).forEach(l=>{ if(m[2].includes(l.a)&&m[2].includes(l.b)) l.g.classList.add('lit'); else l.g.classList.add('dim'); });
      mnote.textContent=''; mnote.append(H('b','',m[1]+': '),document.createTextNode(m[3])); }); mrow.append(b); return b; });
    mchips[0].click(); closeQ(mp,C.mp_q);

    /* ===== 4. follow one packet ===== */
    const pk=sec('ar-pk',C.pk_h,C.pk_p);
    const pdg=diagram(mainSpec(),{}); const prow=H('div','ar-chips'); pk.append(H('em','sp-vzk',C.pk_pick),prow);
    const pcap=H('p','sp-vc',''); pcap.setAttribute('aria-live','polite'); const pbtn=H('button','sp-btn',C.pk_play); pbtn.type='button'; const pin=H('p','sp-vzn',''); const pend=H('p','ar-end','');
    pk.append(pin,pdg.el,pcap,pend,pbtn); let psc=D.scen[0], ptk=0;
    async function runPacket(){
      const my=++ptk; pbtn.disabled=true; pdg.clear(); pcap.textContent=''; pcap.className='sp-vc'; pend.textContent=''; pend.className='ar-end'; let cur=null;
      for(const [k,ref,cap,state] of psc.steps){
        if(my!==ptk) return;
        if(k==='n'){ pdg.node(ref,'now'); pdg.tok(ref,cur!=null); await sleep(cur!=null?750:300); if(my!==ptk) return; Object.keys(pdg.N).forEach(i=>pdg.node(i,'now',i===ref)); if(state) pdg.node(ref,state); cur=ref; }
        else { const l=pdg.Lk[ref]; pdg.link(ref,'lit'); const dest=(cur===l.b)?l.a:l.b; if(cur==null){ pdg.tok(l.a,false); await sleep(250); } pdg.tok(dest,true); await sleep(900); cur=dest; }
        if(my!==ptk) return; pcap.textContent=cap; pcap.className='sp-vc '+(state||''); await sleep(1500);
      }
      if(my!==ptk) return; pend.textContent=psc.endtxt; pend.className='ar-end '+psc.end; await sleep(600); pdg.tokHide(); pbtn.disabled=false; pbtn.textContent=C.pk_again;
    }
    const pchips=D.scen.map(s=>{ const b=H('button','sp-chip',s.name); b.type='button'; b.addEventListener('click',()=>{ ptk++; psc=s; pchips.forEach(x=>x.classList.toggle('on',x===b)); pin.textContent=s.intro; pdg.clear(); pcap.textContent=''; pcap.className='sp-vc'; pend.textContent=''; pbtn.disabled=false; pbtn.textContent=C.pk_play; }); prow.append(b); return b; });
    pchips[0].click(); pbtn.addEventListener('click',runPacket); closeQ(pk,C.pk_q);

    /* ===== 5. break it ===== */
    const bk=sec('ar-bk',C.bk_h,C.bk_p);
    const bleg=H('div','ar-leg'); C.bk_leg.forEach(([k,t])=>{ bleg.append(H('span','ar-st '+k,t)); }); bk.append(bleg);
    let bsel=null; const bdg=diagram(mainSpec({noLabels:true}),{click:id=>breakNode(id)}); bk.append(bdg.el);
    const bout=H('div','ar-bo'); const bbtn=H('button','sp-btn ghost',C.bk_reset); bbtn.type='button'; bk.append(bout,bbtn); bout.textContent=C.bk_hint;
    function breakNode(id){ const f=D.fail[id]; if(!f) return; bdg.clear(); bdg.node(id,'down'); bdg.mark(id,'✕');
      Object.entries(f.marks).forEach(([k,[st,txt]])=>{ bdg.node(k,st); bdg.mark(k,txt); });
      Object.values(bdg.Lk).forEach(l=>{ if(l.a===id||l.b===id) l.g.classList.add('cut'); });
      bout.textContent=''; bout.append(H('b','',C.bk_down+' '+D.cards[id].name+'. '),document.createTextNode(f.text)); bout.className='ar-bo on'; }
    bbtn.addEventListener('click',()=>{ bdg.clear(); bout.textContent=C.bk_hint; bout.className='ar-bo'; });
    closeQ(bk,C.bk_q);

    /* ===== 6. messages and data ===== */
    const ms=sec('ar-ms',C.ms_h,C.ms_p);
    const mrow2=H('div','ar-chips'); const mdg2=diagram(mainSpec(),{linkClick:id=>pickMsg(id)});
    Object.keys(D.msgs).forEach(id=>mdg2.link(id,'has'));
    ms.append(H('em','sp-vzk',C.ms_pick),mrow2,mdg2.el); const mpan=H('div','ar-mpan'); ms.append(mpan); mpan.textContent=C.ms_hint;
    const mchips2={};
    function pickMsg(id){ const m=D.msgs[id]; if(!m) return; Object.entries(mchips2).forEach(([k,b])=>b.classList.toggle('on',k===id)); Object.keys(D.msgs).forEach(k=>mdg2.link(k,'lit',k===id));
      mpan.textContent=''; const hd=H('div','ar-mh'); hd.append(H('code','ar-mn2',m.name),H('span','ar-mw',C.ms_who+' '+m.who)); mpan.append(hd);
      const pre=H('pre','ar-pre'); pre.textContent=m.ex; pre.setAttribute('dir','ltr'); mpan.append(pre);
      mpan.append(H('em','sp-vzk',C.ms_try)); const res=H('div','ar-mres',''); const tb=H('div','ar-ft');
      m.fields.forEach(f=>{ const r=H('div','ar-fr'); r.append(H('code','',f[0]),H('span','ar-fty',f[1]),H('span','ar-fw',f[2]));
        if(f[3]){ const b=H('button','sp-chip ar-brk',C.ms_break); b.type='button'; b.addEventListener('click',()=>{ tb.querySelectorAll('.ar-fr').forEach(x=>x.classList.remove('bad')); r.classList.add('bad'); res.textContent=''; res.className='ar-mres on'; res.append(H('b','',f[3][0]+': '),document.createTextNode(f[3][1])); }); r.append(b); } tb.append(r); });
      mpan.append(tb,res); }
    Object.keys(D.msgs).forEach(id=>{ const l=D.links.find(x=>x.id===id); const b=H('button','sp-chip',D.msgs[id].name); b.type='button'; b.addEventListener('click',()=>pickMsg(id)); mrow2.append(b); mchips2[id]=b; });
    pickMsg(Object.keys(D.msgs)[0]);
    const dt=H('div','ar-dt'); dt.append(H('h5','ar-dh',C.dt_h),gp(C.dt_p,'sp-p')); const dgr=H('div','ar-dgr');
    [[C.dt_tr,D.data.transient,'tr'],[C.dt_ps,D.data.persisted,'ps']].forEach(([h,list,k])=>{ const c=H('div','ar-dc2 '+k); c.append(H('b','',h)); list.forEach(([n,d])=>{ const r=H('div','ar-dr'); r.append(H('code','',n),gp(d,'ar-dd','span')); c.append(r); }); dgr.append(c); });
    dt.append(dgr); ms.append(dt); closeQ(ms,C.ms_q);

    /* ===== 7. terms ===== */
    function laneViz(V){
      const box=H('div','sp-vz'); box.append(gp(V.intro,'sp-vzi'));
      const lane=H('div','sp-vl'); box.append(lane);
      const st=V.st.map(n=>{ const e=H('div','sp-vs'); e.append(H('b','',n)); lane.append(e); return e; });
      let endEl=null; if(V.end){ endEl=H('div','sp-vs end'); endEl.append(H('b','',V.end)); lane.append(endEl); }
      const tok=H('div','sp-vt'); lane.append(tok); const cap=H('p','sp-vc',''); cap.setAttribute('aria-live','polite'); box.append(cap);
      const btn=H('button','sp-btn sp-vb',C.tm_play); btn.type='button'; box.append(btn); let token=0;
      const put=(el,anim)=>{ const lr=lane.getBoundingClientRect(); let x; if(!el) x=lr.width-62; else { const r=el.getBoundingClientRect(); x=r.left-lr.left+r.width/2; } x=Math.max(64,Math.min(lr.width-64,x)); if(!anim){ tok.style.transition='none'; } tok.style.left=x+'px'; if(!anim){ void tok.offsetWidth; tok.style.transition=''; } };
      const clear=()=>{ st.forEach(e=>e.classList.remove('ok','bad','now')); if(endEl) endEl.classList.remove('ok','bad'); };
      async function run(){ const my=++token; btn.disabled=true; clear();
        for(const r of V.runs){ if(my!==token) return; tok.className='sp-vt'; tok.textContent=r.t; put(null,false); tok.style.opacity=1; cap.textContent=''; cap.className='sp-vc'; await sleep(500);
          for(const [i,txt,state] of r.steps){ if(my!==token) return; put(st[i],true); st.forEach(e=>e.classList.remove('now')); st[i].classList.add('now'); await sleep(750); if(my!==token) return; if(state) st[i].classList.add(state); cap.textContent=txt; cap.className='sp-vc '+(state||''); await sleep(1500); }
          if(my!==token) return; if(r.end==='ok'&&endEl){ put(endEl,true); endEl.classList.add('ok'); await sleep(800); } else if(r.end==='bad'){ tok.classList.add('bad'); await sleep(700); }
          await sleep(900); tok.style.opacity=0; await sleep(400); clear(); }
        if(my===token){ btn.disabled=false; btn.textContent=C.pk_again; } }
      btn.addEventListener('click',run); return box;
    }
    const tm=sec('ar-tm',C.tm_h,C.tm_p); const tg=H('div','ar-tg'); tm.append(tg);
    D.terms.forEach(t=>{ const c=H('div','ar-tcd'); c.append(H('b','ar-tn',t.name),H('p','ar-tw',t.what)); const slot=H('div','sp-vslot'); const b=H('button','sp-btn sp-vopen',C.tm_play); b.type='button'; b.addEventListener('click',()=>{ slot.textContent=''; const v=laneViz(t.viz); slot.append(v); c.classList.add('wide'); const pb=v.querySelector('.sp-vb'); if(pb) pb.click(); }); slot.append(b); c.append(slot); tg.append(c); });
    closeQ(tm,C.tm_q);

    /* ===== 8. decisions ===== */
    const dc=sec('ar-dc',C.dc_h,C.dc_p);
    D.decisions.forEach((d,di)=>{ const card=H('div','ar-dcc'); card.append(H('h5','ar-dq',d.q)); card.append(H('p','ar-dhint',C.dc_hint+' '+d.hint));
      const row=H('div','ar-opts'); const out=H('div','ar-dout'); const btns=[];
      d.options.forEach((op,i)=>{ const b=H('button','ar-opt'); b.type='button'; b.append(H('b','',op[0]),H('span','',op[1])); b.addEventListener('click',()=>{ btns.forEach((x,j)=>x.classList.toggle('on',j===i)); out.textContent=''; out.className='ar-dout on';
        btns[d.chosen].classList.add('chosen'); if(!btns[d.chosen].querySelector('.ar-star')) btns[d.chosen].append(H('i','ar-star',C.dc_chosen));
        if(i===d.chosen){ out.append(H('b','',C.dc_why+' '),document.createTextNode(d.why+' '),H('span','ar-price',d.price)); }
        else { out.append(H('b','',C.dc_other+': '),document.createTextNode(d.stories[i])); out.classList.add('alt'); } }); row.append(b); btns.push(b); });
      card.append(row,out); dc.append(card); });
    closeQ(dc,C.dc_q);

    /* ===== 9. sprints ===== */
    const sp=sec('ar-sp',C.sp_h,C.sp_p); const srow=H('div','ar-chips'); const sdg=diagram(mainSpec({noLabels:true}),{}); const span=H('div','ar-spn'); sp.append(srow,sdg.el,span);
    const sbtn=D.sprints.map((s,i)=>{ const b=H('button','sp-chip'); b.type='button'; b.append(H('b','',String(i+1)),document.createTextNode(s.name.replace(/^ספרינט \d+: /,''))); b.addEventListener('click',()=>{ sbtn.forEach((x,j)=>x.classList.toggle('on',j===i)); sdg.clear(); const prev=i?D.sprints[i-1].comps:[];
      Object.keys(sdg.N).forEach(id=>{ if(s.comps.includes(id)){ sdg.node(id,'lit'); if(!prev.includes(id)) sdg.node(id,'new'); } else sdg.node(id,'dim'); });
      Object.values(sdg.Lk).forEach(l=>{ if(s.comps.includes(l.a)&&s.comps.includes(l.b)) l.g.classList.add('lit'); else l.g.classList.add('dim'); });
      span.textContent=''; const nw=s.comps.filter(c=>!prev.includes(c)).map(c=>D.cards[c].name).join(', ');
      [[C.sp_new,nw],[C.sp_goal,s.goal],[C.sp_works,s.works],[C.sp_why,s.why]].forEach(([k,v])=>{ if(!v) return; const r=H('div','ar-row'); r.append(H('em','',k),H('span','ar-rv',v)); span.append(r); }); }); srow.append(b); return b; });
    sbtn[0].click(); closeQ(sp,C.sp_q);

    /* ===== 10. closure ===== */
    const cl=sec('ar-cl',D.close.h,D.close.text); const cdg=diagram(mainSpec({noLabels:true}),{}); const cb=H('button','sp-btn',C.cl_btn); cb.type='button'; const cres=H('div','ar-cres'); cl.append(cdg.el,cb,cres);
    cb.addEventListener('click',()=>{ cdg.clear(); Object.keys(cdg.N).forEach(id=>{ if(D.close.ext.includes(id)){ cdg.node(id,'out'); cdg.mark(id,C.cl_out); } else cdg.node(id,'in'); });
      Object.values(cdg.Lk).forEach(l=>{ if(D.close.ext.includes(l.a)||D.close.ext.includes(l.b)) l.g.classList.add('cut'); });
      cres.textContent=''; cres.append(gp(D.close.result,'sp-p'),H('p','ar-vd',D.close.verdict)); cres.className='ar-cres on'; });
    closeQ(cl,C.cl_q);

    /* ===== 11. downloads ===== */
    const dd=sec('sp-dl',C.dl_h,C.dl_p); const dg2=H('div','sp-dlg'); dd.append(dg2);
    [[C.dl_he,C.dl_he_d,'he','HE','-arch-'],[C.dl_en,C.dl_en_d,'en','EN','-arch-'],['מסמך עיצוב מלא: מחלקות, מצבים, רצף, תהליכונים וטבלאות','','he','HE','-design-'],['Full design document: classes, states, sequence, threads and tables','','en','EN','-design-']].forEach(([t,d,k,lg2,kind])=>{ const c=H('div','sp-dlc'); if(lg2==='EN') c.setAttribute('dir','ltr'); c.append(H('span','sp-dlb',lg2),H('b','',t)); if(d) c.append(H('i','',d));
      const a=H('div','sp-dla'); ['pdf','docx'].forEach(x=>{ const l=H('a','',x.toUpperCase()); l.href=D.dl.replace('-arch-',kind)+k+'.'+x; l.setAttribute('download',''); a.append(l); }); c.append(a); dg2.append(c); });
    closeQ(dd,C.dl_q);
  }
  function init(){ document.querySelectorAll('.ar[data-ar]').forEach(mount); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
