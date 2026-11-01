/* Architecture engine (any case): the architecture chapter as a blueprint sheet set. Profiles: window.BP_PROFILES[slug] (c/<case>/blueprint.js).
   Runs after arch-lab.js has mounted the plain chapter; the plain chapter is kept, folded, under the sheets. */
(function(){
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const NS='http://www.w3.org/2000/svg';
  const H=(t,c,x)=>{ const e=document.createElement(t); if(c) e.className=c; if(x!=null) e.textContent=x; return e; };
  const S=(t,a,p)=>{ const e=document.createElementNS(NS,t); for(const k in a) e.setAttribute(k,a[k]); if(p) p.append(e); return e; };
  const sleep=ms=>new Promise(r=>setTimeout(r,reduce?10:ms));
  const sm=(t,a,b)=>{ const x=Math.max(0,Math.min(1,(t-a)/(b-a))); return x*x*(3-2*x); };

  /* ================= content ================= */
  const PRO=window.BP_PROFILES||{};

  /* ================= helpers ================= */
  let tip=null;
  function showTip(el,txt){ if(!tip){ tip=H('div','sp-tip'); tip.setAttribute('role','tooltip'); document.body.append(tip); }
    tip.textContent=txt; tip.classList.add('on'); const r=el.getBoundingClientRect(), w=Math.min(280,innerWidth-24); tip.style.width=w+'px';
    let x=r.left+r.width/2-w/2; x=Math.max(12,Math.min(innerWidth-w-12,x)); tip.style.left=x+'px'; const th=tip.offsetHeight; let y=r.top-th-10; if(y<8) y=r.bottom+10; tip.style.top=y+'px'; }
  function hideTip(){ if(tip) tip.classList.remove('on'); }
  addEventListener('scroll',hideTip,true);

  function bootAll(){ document.querySelectorAll('.ar[data-ar]').forEach(r=>{ if(PRO[r.dataset.ar]) boot(r); }); }
  function boot(root){
    const slug=root.dataset.ar; const PR=PRO[slug]; const D=window.ARCH&&window.ARCH[slug];
    if(!root||!D||root.dataset.bp) return; root.dataset.bp='1';
    const {bp:BP,L2POS,LOTS,PC,L1POS,ICON}=PR; const EXT=Object.keys(D.cards).filter(k=>D.cards[k].kind==='ext'); const IDP=slug==='fire-sale'?'bp-':'bp-'+slug+'-';
    const C=D.copy; const G=Object.assign({},D.gloss,BP.gloss);
    const gkeys=Object.keys(G).sort((a,b)=>b.length-a.length).map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')); const gre=new RegExp('('+gkeys.join('|')+')','g');
    function gloss(parent,text){ let last=0,m; gre.lastIndex=0; const seen=parent.__seen||(parent.__seen={});
      while((m=gre.exec(text))){ if(seen[m[1]]) continue; seen[m[1]]=1; parent.append(document.createTextNode(text.slice(last,m.index)));
        const b=H('button','sp-gl',m[1]); b.type='button'; const g=G[m[1]];
        b.addEventListener('mouseenter',()=>showTip(b,g)); b.addEventListener('focus',()=>showTip(b,g)); b.addEventListener('click',()=>showTip(b,g)); b.addEventListener('mouseleave',hideTip); b.addEventListener('blur',hideTip);
        parent.append(b); last=m.index+m[1].length; }
      parent.append(document.createTextNode(text.slice(last))); return parent; }
    /* [[termId|word]] opens a term window; everything else is glossified */
    function rich(el,text){ const parts=String(text).split(/\[\[(\w+)\|([^\]]+)\]\]/); for(let i=0;i<parts.length;i++){ if(i%3===0) gloss(el,parts[i]); else if(i%3===1){ const b=H('button','tm',parts[i+1]); b.type='button'; b.dataset.t=parts[i]; el.append(b); i++; } } return el; }
    const P=(text,cls,tag)=>rich(H(tag||'p',cls||'bp-p'),text);

    /* ---------- modal ---------- */
    let modal=null,lastFocus=null;
    function closeModal(){ if(!modal) return; modal.remove(); modal=null; removeEventListener('keydown',escKey,true); if(lastFocus&&lastFocus.focus) lastFocus.focus(); }
    function escKey(e){ if(e.key==='Escape'){ e.stopImmediatePropagation(); e.preventDefault(); closeModal(); } }
    function showModal(node){ lastFocus=document.activeElement; if(modal) modal.remove();
      modal=H('div','sp-modal bp-modal'); const back=H('div','sp-mback'); const card=H('div','sp-mcard'); card.setAttribute('role','dialog'); card.setAttribute('aria-modal','true');
      back.addEventListener('click',closeModal); card.append(node); modal.append(back,card); document.body.append(modal); addEventListener('keydown',escKey,true);
      const x=node.querySelector('.sp-x'); if(x) x.focus(); if(window.TermWin) window.TermWin.wire(card);
      if(!reduce) card.animate([{opacity:0,transform:'translateY(14px) scale(.98)'},{opacity:1,transform:'none'}],{duration:220,easing:'ease-out'}); }
    function cardBox(c,extra){
      const bx=H('div','ar-card bp-cardm'); const hd=H('div','ar-ch'); const tt=H('div','ar-ct'); tt.append(H('b','',c.name)); if(c.en) tt.append(H('span','ar-en',c.en)); hd.append(tt);
      const x=H('button','sp-x','✕'); x.type='button'; x.setAttribute('aria-label',C.close); x.addEventListener('click',closeModal); hd.append(x); bx.append(hd);
      if(c.kind!=='actor'&&c.kind!=='step'&&c.kind!=='ok'&&c.kind!=='bad'&&c.kind!=='system'){ const bd=H('div','ar-bd'); if(c.plane&&PC[c.plane]!=null){ const lot=LOTS[PC[c.plane]]; bd.append(H('span','bp-lb l'+PC[c.plane],lot[5])); } bd.append(H('span','ar-kb '+(c.kind==='ext'?'ext':'sys'),c.kind==='ext'?C.kind_ext:C.kind_sys)); bx.append(bd); }
      bx.append(P(c.role,'ar-role'));
      [[C.in_,c.inn],[C.out,c.out],[C.never,c.never]].forEach(([k,v])=>{ if(!v) return; const r=H('div','ar-row'+(k===C.never?' nv':'')); r.append(H('em','',k),P(v,'ar-rv','span')); bx.append(r); });
      if(c.tech&&c.tech.length){ const r=H('div','ar-row'); r.append(H('em','',C.tech)); const t=H('span','ar-tch'); c.tech.forEach(n=>t.append(H('span','ar-tc',n))); r.append(t); bx.append(r); }
      if(extra) bx.append(extra); return bx; }

    /* ---------- graph drawing ---------- */
    function wrap(t,max){ max=max||13; if(t.length<=max) return [t]; const w=t.split(' '); let a='',b=''; w.forEach(x=>{ if(!b&&((a+' '+x).trim().length<=max||!a)) a=(a+' '+x).trim(); else b=(b+' '+x).trim(); }); if(!b){ const m=Math.ceil(t.length/2); return [t.slice(0,m),t.slice(m)]; } return [a,b]; }
    const clip=(a,b)=>{ const dx=b.x-a.x,dy=b.y-a.y; const sx=dx?(a.w/2+4)/Math.abs(dx):1e9, sy=dy?(a.h/2+4)/Math.abs(dy):1e9; const t=Math.min(sx,sy); return [a.x+dx*t,a.y+dy*t]; };
    const head=(x,y,ang,s)=>{ s=s||8; return [[0,0],[-s*1.6,-s*.65],[-s*1.6,s*.65]].map(([px,py])=>[x+px*Math.cos(ang)-py*Math.sin(ang),y+px*Math.sin(ang)+py*Math.cos(ang)].map(v=>v.toFixed(1)).join(',')).join(' '); };
    function drawGraph(g,nodes,edges,o){ o=o||{}; const N={},Lk={}; const lg=S('g',{class:'bp-links'},g), ng=S('g',{class:'bp-nodes'},g);
      nodes.forEach(n=>{ N[n.id]=Object.assign({},n); });
      edges.forEach(e=>{ const A=N[e.a],B=N[e.b]; if(!A||!B) return; const p1=clip(A,B),p2=clip(B,A); const gg=S('g',{class:'bp-lk'+(e.kind==='support'?' sup':'')+(e.two?' two':''),'data-id':e.id||''},lg);
        const d=`M${p1[0].toFixed(1)},${p1[1].toFixed(1)} L${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
        S('path',{d,class:'bp-pipe'},gg); S('path',{d,class:'bp-ln bp-draw',pathLength:1},gg);
        const ang=Math.atan2(p2[1]-p1[1],p2[0]-p1[0]); S('polygon',{points:head(p2[0],p2[1],ang),class:'bp-hd'},gg); if(e.two) S('polygon',{points:head(p1[0],p1[1],ang+Math.PI),class:'bp-hd'},gg);
        if(e.label&&e.label!=='?'&&!o.noLabels){ const mx=(p1[0]+p2[0])/2,my=(p1[1]+p2[1])/2; const t=S('text',{x:mx.toFixed(1),y:(my-8).toFixed(1),class:'bp-ll','text-anchor':'middle'},gg); t.textContent=e.label; }
        if(e.id&&o.linkClick){ S('path',{d,class:'bp-hit'},gg); gg.setAttribute('tabindex','0'); gg.setAttribute('role','button'); gg.setAttribute('aria-label',e.label||e.id); const open=()=>o.linkClick(e.id); gg.addEventListener('click',open); gg.addEventListener('keydown',ev=>{ if(ev.key==='Enter'||ev.key===' '){ ev.preventDefault(); open(); } }); }
        if(e.id) Lk[e.id]={g:gg,a:e.a,b:e.b,p1,p2}; });
      Object.values(N).forEach(n=>{ const gg=S('g',{class:'bp-n k-'+n.kind+(n.plane!=null?' pc'+n.plane:''),transform:`translate(${n.x},${n.y})`,'data-id':n.id},ng);
        S('rect',{x:-n.w/2,y:-n.h/2,width:n.w,height:n.h,rx:n.kind==='system'?10:4,class:'bp-r'},gg);
        if(n.kind==='actor'){ S('circle',{cx:-n.w/2+18,cy:-6,r:6,class:'bp-ic'},gg); S('path',{d:`M${-n.w/2+8},12 q10 -14 20 0`,class:'bp-ic'},gg); }
        if(PR.q.includes(n.id)||n.q){ const qg=S('g',{class:'bp-q',transform:`translate(${n.w/2-2},${-n.h/2+2})`},gg); S('circle',{r:13},qg); const qt=S('text',{y:6,'text-anchor':'middle'},qg); qt.textContent='?'; }
        const lines=wrap(n.label,n.max); const lh=n.fs?n.fs*1.15:18; lines.forEach((ln,i)=>{ const t=S('text',{x:n.kind==='actor'?10:0,y:((i-(lines.length-1)/2)*lh+6).toFixed(1),class:'bp-t','text-anchor':'middle'},gg); if(n.fs) t.style.fontSize=n.fs+'px'; t.textContent=ln; });
        const mk=S('text',{x:0,y:n.h/2+18,class:'bp-mk','text-anchor':'middle'},gg); const nm=S('g',{class:'bp-nm',transform:`translate(${-n.w/2+2},${-n.h/2+2})`},gg);
        n.g=gg; n.mk=mk; n.nm=nm;
        if(o.click){ gg.setAttribute('tabindex','0'); gg.setAttribute('role','button'); gg.setAttribute('aria-label',n.label); gg.addEventListener('click',ev=>{ if(o.guard&&o.guard()) return; o.click(n.id,ev); }); gg.addEventListener('keydown',ev=>{ if(ev.key==='Enter'||ev.key===' '){ ev.preventDefault(); o.click(n.id,ev); } }); } });
      return {N,Lk}; }
    function lotsInto(g,o){ o=o||{}; const lg=S('g',{class:'bp-lots'},g); const out={};
      LOTS.forEach(([k,x,y,w,h,label],i)=>{ const gg=S('g',{class:'bp-lot l'+i,'data-lot':k},lg); S('rect',{x,y,width:w,height:h,class:'bp-lotr'},gg);
        const t=S('text',{x:x+w-12,y:y+20,class:'bp-lotl','text-anchor':'start'},gg); t.textContent=label;
        [[x,y],[x+w,y],[x,y+h],[x+w,y+h]].forEach(([cx,cy])=>S('circle',{cx,cy,r:3.5,class:'bp-pin'},gg)); out[k]=gg; });
      const st=S('text',{x:PR.street[0],y:PR.street[1],class:'bp-street','text-anchor':'middle'},lg); st.textContent='מחוץ לגבולות'; return out; }
    function planSpec(){ return {nodes:Object.keys(L2POS).map(id=>{ const c=D.cards[id]; return {id,label:c.name,x:L2POS[id][0],y:L2POS[id][1],w:PR.q.includes(id)?150:(c.plane===PR.wide?128:112),h:60,kind:c.kind==='ext'?'ext':'sys',plane:PC[c.plane],max:c.plane===PR.wide?12:10}; }),
      edges:D.links.map(l=>({a:l.a,b:l.b,label:l.label,id:l.id,kind:l.kind,two:l.two})) }; }
    /* a floor plan with an api for lighting things */
    function plan(o){ o=o||{}; const w=H('div','bp-plan'); const svg=S('svg',{viewBox:'0 0 1000 600',class:'bp-svg',role:'img','aria-label':o.aria||'תוכנית הקומה של המערכת'}); w.append(svg);
      defs(svg); const cam=S('g',{},svg); paper(cam,0,0,1000,600); cam.__grid=svg.__grid;
      const pz=panZoom(svg,cam,w,1000,600,null,o.btns); o.guard=o.guard||(()=>pz.dragged);
      const lots=lotsInto(cam); const sp=planSpec(); const gr=drawGraph(cam,sp.nodes,sp.edges,o); const mg=S('g',{class:'bp-fx'},cam);
      const tok=S('g',{class:'bp-tok'},mg); S('circle',{r:16,class:'bp-tg'},tok); S('circle',{r:6,class:'bp-tc'},tok); tok.style.opacity=0;
      const api={el:w,svg,N:gr.N,Lk:gr.Lk,lots,fx:mg,pz,
        node(id,c,on){ if(gr.N[id]) gr.N[id].g.classList.toggle(c,on!==false); },
        link(id,c,on){ if(gr.Lk[id]) gr.Lk[id].g.classList.toggle(c,on!==false); },
        mark(id,t){ if(gr.N[id]) gr.N[id].mk.textContent=t||''; },
        num(id,n){ const nm=gr.N[id].nm; nm.textContent=''; if(n!=null){ S('circle',{r:13,class:'bp-nmc'},nm); const t=S('text',{y:5,'text-anchor':'middle',class:'bp-nmt'},nm); t.textContent=n; } },
        clear(){ Object.values(gr.N).forEach(n=>{ n.g.setAttribute('class','bp-n k-'+n.kind+(n.plane!=null?' pc'+n.plane:'')); n.mk.textContent=''; n.nm.textContent=''; }); Object.values(gr.Lk).forEach(l=>l.g.classList.remove('lit','cut','dim','hl')); Object.values(lots).forEach(l=>l.classList.remove('hl','dim')); tok.style.opacity=0; mg.querySelectorAll('.bp-tmp').forEach(e=>e.remove()); },
        tok(id,anim,pt){ const n=gr.N[id]; const p=pt||(n&&[n.x,n.y]); if(!p) return; if(!anim) tok.style.transition='none'; tok.style.transform=`translate(${p[0]}px,${p[1]}px)`; tok.style.opacity=1; if(!anim){ void tok.getBoundingClientRect(); tok.style.transition=''; } },
        tokHide(){ tok.style.opacity=0; } };
      return api; }
    let defsDone=0;
    function defs(svg){ const d=S('defs',{},svg); const id='bpg'+(defsDone++); const p=S('pattern',{id,width:20,height:20,patternUnits:'userSpaceOnUse'},d); S('path',{d:'M20 0 H0 V20',class:'bp-g1'},p);
      const p2=S('pattern',{id:id+'b',width:100,height:100,patternUnits:'userSpaceOnUse'},d); S('rect',{width:100,height:100,fill:`url(#${id})`},p2); S('path',{d:'M100 0 H0 V100',class:'bp-g2'},p2);
      svg.style.setProperty('--grid',`url(#${id}b)`); svg.__grid=`url(#${id}b)`; }
    /* paper rect uses the grid */
    const paper=(svg,x,y,w,h)=>S('rect',{x,y,width:w,height:h,class:'bp-paper',fill:svg.__grid||(svg.ownerSVGElement&&svg.ownerSVGElement.__grid)},svg);


    /* ---------- pan and zoom (fits the screen; on phones the map is cropped square and dragged sideways) ---------- */
    const MOB=matchMedia('(max-width:700px)').matches;
    function panZoom(svg,cam,wrapEl,VW,VH,onView,btns){
      const U={k:1,x:0,y:0}; let dragged=false, drag=null; const pts=new Map();
      if(MOB){ svg.setAttribute('preserveAspectRatio','xMidYMid slice'); svg.classList.add('pz'); wrapEl.classList.add('pzw'); }
      const view=()=>{ const W=svg.clientWidth||VW, Hh=svg.clientHeight||VH; const sc=MOB?Math.max(W/VW,Hh/VH):Math.min(W/VW,Hh/VH); return [W/sc,Hh/sc,sc]; };
      function clamp(){ const [vw,vh]=view(); let lo=VW/2+vw/2-VW*U.k, hi=VW/2-vw/2; U.x=lo>hi?(lo+hi)/2:Math.min(hi,Math.max(lo,U.x)); lo=VH/2+vh/2-VH*U.k; hi=VH/2-vh/2; U.y=lo>hi?(lo+hi)/2:Math.min(hi,Math.max(lo,U.y)); }
      function apply(){ clamp(); cam.setAttribute('transform',`translate(${U.x.toFixed(1)},${U.y.toFixed(1)}) scale(${U.k.toFixed(3)})`); const free=U.k>1.01; svg.style.touchAction=free?'none':(MOB?'pan-y':'auto'); wrapEl.classList.toggle('zoomed',free||MOB); if(onView){ const [vw,vh]=view(); onView(VW/2-vw/2,VH/2-vh/2,vw,vh); } }
      function zoomAt(nk,cx,cy){ nk=Math.max(1,Math.min(4,nk)); U.x=cx-(cx-U.x)*nk/U.k; U.y=cy-(cy-U.y)*nk/U.k; U.k=nk; apply(); }
      const toUnits=(cx,cy)=>{ const r=svg.getBoundingClientRect(); const [vw,vh,sc]=view(); return [VW/2-vw/2+(cx-r.left)/sc, VH/2-vh/2+(cy-r.top)/sc]; };
      svg.addEventListener('pointerdown',e=>{ pts.set(e.pointerId,[e.clientX,e.clientY]); dragged=false; if(U.k>1.01||MOB||pts.size===2) drag={x:e.clientX,y:e.clientY,ux:U.x,uy:U.y,k:U.k,d0:null}; });
      svg.addEventListener('pointermove',e=>{ if(!pts.has(e.pointerId)) return; pts.set(e.pointerId,[e.clientX,e.clientY]); if(!drag) return; const sc=view()[2];
        if(pts.size===2){ const [a,c]=[...pts.values()]; const dd=Math.hypot(a[0]-c[0],a[1]-c[1]); if(!drag.d0){ drag.d0=dd; drag.k=U.k; drag.ux=U.x; drag.uy=U.y; return; } const [cx,cy]=toUnits((a[0]+c[0])/2,(a[1]+c[1])/2); U.x=drag.ux; U.y=drag.uy; U.k=drag.k; zoomAt(drag.k*dd/drag.d0,cx,cy); dragged=true; return; }
        const dx=(e.clientX-drag.x)/sc, dy=(e.clientY-drag.y)/sc; if(Math.abs(dx)+Math.abs(dy)>6/sc) dragged=true; if(!dragged) return; U.x=drag.ux+dx; U.y=drag.uy+(U.k>1.01?dy:0); apply(); });
      const up=e=>{ pts.delete(e.pointerId); if(pts.size<2&&drag) drag.d0=null; if(!pts.size){ drag=null; setTimeout(()=>dragged=false,30); } };
      svg.addEventListener('pointerup',up); svg.addEventListener('pointercancel',up); svg.addEventListener('pointerleave',up);
      svg.addEventListener('wheel',e=>{ if(!(e.ctrlKey||e.metaKey)) return; e.preventDefault(); const [cx,cy]=toUnits(e.clientX,e.clientY); zoomAt(U.k*(e.deltaY<0?1.15:1/1.15),cx,cy); },{passive:false});
      if(btns||(MOB&&btns!==false)){ const zb=H('div','bp-pzb'); [['+',1],['−',-1],['↺',0]].forEach(([t,d])=>{ const x=H('button','bp-zbt',t); x.type='button'; x.setAttribute('aria-label',d>0?'התקרבו':d<0?'התרחקו':'איפוס'); x.addEventListener('click',()=>{ if(!d){ U.k=1;U.x=0;U.y=0; apply(); } else { const [vw,vh]=view(); zoomAt(U.k*(d>0?1.45:1/1.45),VW/2-vw/2+vw/2-0,VH/2); } }); zb.append(x); }); wrapEl.append(zb); }
      if(MOB){ const h=H('span','bp-pzh','⟷ גררו'); wrapEl.append(h); }
      addEventListener('resize',()=>apply());
      requestAnimationFrame(()=>apply());
      return {U,apply,zoom:d=>{ const [vw,vh]=view(); zoomAt(U.k*(d>0?1.45:1/1.45),VW/2,VH/2); },reset(){ U.k=1;U.x=0;U.y=0; apply(); },get dragged(){ return dragged; }};
    }
    /* ---------- generic cross-section: one building per plane, transient messages on the road above ---------- */
    function storeGeneric(b){ const K=BP.store; b.append(P(K.p)); b.append(P(C.dt_p,'bp-p dim'));
      const svg=S('svg',{viewBox:'0 0 1000 560',class:'bp-svg bp-sect',role:'img','aria-label':'חתך של הבניינים: מה נשמר אצל מי'}); defs(svg); paper(svg,0,0,1000,560); const fx=S('g',{},svg);
      S('path',{d:'M0 470 H1000',class:'bp-ground'},fx); for(let x=0;x<1000;x+=18) S('path',{d:`M${x} 470 l-10 12`,class:'bp-hatch'},fx);
      S('rect',{x:20,y:40,width:960,height:100,rx:6,class:'bp-lane'},fx); const tl=S('text',{x:968,y:60,'text-anchor':'start',class:'bp-flr'},fx); tl.textContent=K.transit;
      const info=H('div','bp-sinfo'); info.setAttribute('aria-live','polite'); info.textContent=K.tap; const items=[];
      const mk=(x,y,w,label,desc,cls,grp)=>{ const g=S('g',{class:'bp-item '+cls,tabindex:0,role:'button','aria-label':label},fx); S('rect',{x:x-w/2,y:y-15,width:w,height:30,rx:4},g); const t=S('text',{x,y:y+5,'text-anchor':'middle'},g); t.textContent=label;
        const show=()=>{ info.textContent=''; info.append(H('b','',label+': ')); rich(info,desc); }; g.addEventListener('click',show); g.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); show(); } }); items.push({g,grp}); return g; };
      const B=K.bld.map(([label,x,w,plane],i)=>{ const top=[250,200,230,280][i]||240; const g=S('g',{class:'bp-bld bp-lot l'+PC[plane]},fx);
        if(plane==='agg'){ [0,1,2].forEach(k=>{ const tw=(w-20)/3; S('rect',{x:x+k*(tw+10),y:top,width:tw,height:470-top,class:'bp-wall2 bp-draw',pathLength:1},g); const t=S('text',{x:x+k*(tw+10)+tw/2,y:top+22,'text-anchor':'middle',class:'bp-flr'},g); t.textContent=['שרת א','שרת ב','שרת ג'][k]; }); }
        else S('rect',{x,y:top,width:w,height:470-top,class:(plane==='log'?'bp-glass2':'bp-wall2')+' bp-draw',pathLength:1},g);
        const t=S('text',{x:x+w/2,y:top-14,'text-anchor':'middle',class:'bp-cap2'},g); t.textContent=label;
        const f=S('text',{x:x+w/2,y:452,'text-anchor':'middle',class:'bp-flr'},g); f.textContent=K.bld[i][4]; return {x,w,top}; });
      for(let i=0;i<B.length-1;i++){ const a=B[i],c=B[i+1]; S('path',{d:`M${a.x+12} ${a.top+40} C${a.x-20} ${a.top-30} ${c.x+c.w+20} ${c.top-30} ${c.x+c.w-12} ${c.top+40}`,class:'bp-ro'},fx); }
      D.data.transient.forEach(([n,d],i)=>mk(900-i*190,90,170,n,d,'tr','tr'));
      D.data.persisted.forEach(([n,d])=>{ const k=K.where[n]; if(k==null) return; const bb=B[k]; mk(bb.x+bb.w/2,bb.top+(470-bb.top)/2+10,Math.min(bb.w-16,190),n,d,'ps',k===1?'srv':'keep'); });
      const sw=H('div','bp-plan'); sw.append(svg); panZoom(svg,fx,sw,1000,560,null); b.append(sw,info);
      const ctl=H('div','bp-ctl'); const msg=P('','bp-smsg');
      const btns=K.acts.map(([t,groups,m],i)=>{ const x=H('button','sp-btn'+(i?' ghost':''),t); x.type='button'; x.addEventListener('click',()=>{ items.forEach(it=>{ if(groups.includes(it.grp)) it.g.classList.add('evap'); }); msg.textContent=''; rich(msg,m); x.disabled=true; if(btns[i+1]) btns[i+1].disabled=false; }); if(i) x.disabled=true; ctl.append(x); return x; });
      const rb=H('button','sp-btn ghost',K.reset); rb.type='button'; rb.addEventListener('click',()=>{ items.forEach(it=>it.g.classList.remove('evap')); msg.textContent=''; btns.forEach((x,i)=>x.disabled=!!i); }); ctl.append(rb);
      b.append(ctl,msg); const lg=H('div','bp-dkeys'); [[C.dt_tr,'tr'],[C.dt_ps,'ps']].forEach(([t,k])=>lg.append(H('span','bp-dk '+k,t))); b.append(lg);
      Q(b,'ואם צריך להסביר את כל הסמלים האלה למי שמצטרף לפרויקט מחר?'); }

    /* ---------- sheet frame ---------- */
    const bp=H('div','bp'); const sheets=[];
    function sheet(i,scale){ const [no,name]=BP.sheets[i]; const s=H('section','bp-sheet'); s.id=IDP+no; s.dataset.no=no;
      const hd=H('header','bp-sh'); hd.append(H('span','bp-no',no),H('h4','bp-h',name)); s.append(hd);
      const body=H('div','bp-body'); s.append(body);
      const tb=H('footer','bp-tb'); [['פרויקט',PR.name],['גיליון',no+' · '+name],['קנה מידה',scale||'ללא'],['שרטט','צוות הפרויקט'],['גרסה','1.0']].forEach(([k,v])=>{ const c=H('div','bp-tbc'); c.append(H('em','',k),H('b','',v)); tb.append(c); }); s.append(tb);
      bp.append(s); sheets.push(s); revealS(s); return body; }
    const ro=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('on'); ro.unobserve(e.target); } }),{threshold:0.08});
    function revealS(s){ if(reduce) s.classList.add('on'); else ro.observe(s); }
    const Q=(el,q)=>{ if(q) el.append(P(q,'bp-qq')); };

    /* ---------- drawer (sheet index) ---------- */
    const drawer=H('nav','bp-drawer'); drawer.setAttribute('aria-label','מפתח הגיליונות'); const dtabs=[];
    BP.sheets.forEach(([no,name],i)=>{ const b=H('button','bp-dt'); b.type='button'; b.append(H('b','',no),H('span','',name)); b.addEventListener('click',()=>{ const s=document.getElementById(IDP+no); if(s) s.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'}); }); drawer.append(b); dtabs.push(b); });
    const actObs=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ const i=sheets.indexOf(e.target); dtabs.forEach((b,j)=>b.classList.toggle('on',j===i)); const b=dtabs[i]; if(b&&b.scrollIntoView&&drawer.scrollWidth>drawer.clientWidth){ drawer.scrollTo({left:b.offsetLeft-drawer.clientWidth/2+b.offsetWidth/2,behavior:reduce?'auto':'smooth'}); } } }),{rootMargin:'-40% 0px -55% 0px'});
    bp.append(drawer);

    /* ============ A-00 house plan ============ */
    { const b=sheet(0); const O=BP.open;
      b.append(H('p','bp-kick',O.kick));
      const grid=H('div','bp-2col'); const txt=H('div'); O.house.forEach(t=>txt.append(P(t)));
      const svg=S('svg',{viewBox:'0 0 420 300',class:'bp-house',role:'img','aria-label':'תוכנית של בית: חדרים, צינורות וחשמל'}); defs(svg); paper(svg,0,0,420,300);
      const g=S('g',{class:'bp-hs'},svg);
      [['M30 30 H390 V270 H30 Z','w'],['M210 30 V170','w'],['M30 170 H300','w'],['M300 170 V270','w'],['M120 170 V270','w']].forEach(([d,c])=>S('path',{d,class:'bp-wall bp-draw',pathLength:1},g));
      [['M150 170 a28 28 0 0 1 28 -28','door'],['M300 220 a26 26 0 0 0 -26 26','door']].forEach(([d])=>S('path',{d,class:'bp-door bp-draw',pathLength:1},g));
      [[115,105,'סלון'],[300,105,'מטבח'],[75,225,'חדר'],[210,225,'חדר שינה'],[345,225,'מרפסת']].forEach(([x,y,t])=>{ const e=S('text',{x,y,class:'bp-room','text-anchor':'middle'},g); e.textContent=t; });
      S('path',{d:'M380 60 H330 V140 H230',class:'bp-water'},g); S('path',{d:'M45 255 L60 200 L52 200 L68 150',class:'bp-elec'},g);
      const w1=S('text',{x:340,y:52,class:'bp-mini','text-anchor':'middle'},g); w1.textContent='צינור מים'; const w2=S('text',{x:80,y:145,class:'bp-mini','text-anchor':'middle'},g); w2.textContent='חשמל';
      S('path',{d:'M30 288 H390',class:'bp-dim'},g); S('path',{d:'M30 282 V294 M390 282 V294',class:'bp-dim'},g); const dm=S('text',{x:210,y:284,class:'bp-mini','text-anchor':'middle'},g); dm.textContent='12.40 מ\'';
      const fig=H('figure','bp-fig'); fig.append(svg); const mp=H('div','bp-mapk'); O.map.forEach(([a,c])=>{ const r=H('div','bp-mkr'); r.append(H('b','',a),H('span','',c)); mp.append(r); }); fig.append(mp);
      grid.append(txt,fig); b.append(grid);
      const em=H('div','bp-emma'); const av=H('div','bp-av'); av.innerHTML='<svg viewBox="0 0 120 150" aria-hidden="true"><rect x="22" y="8" width="76" height="134" rx="12" class="ph"/><rect x="32" y="22" width="56" height="26" rx="4" class="scr"/><text x="82" y="42" text-anchor="start" class="dig">4.7</text>'+[0,1,2].map(r=>[0,1,2].map(c=>`<rect x="${32+c*20}" y="${58+r*20}" width="16" height="16" rx="3" class="key"/>`).join('')).join('')+'<path d="M74 120 l14 14 M88 120 l-14 14" class="nox"/><path d="M30 126 q6 -8 12 0 q6 8 12 0" class="wave"/></svg>';
      const et=H('div'); et.append(H('h5','bp-eh',O.emmaH)); O.emma.forEach(t=>et.append(P(t))); em.append(av,et); b.append(em);
      const pro=H('div','bp-pro'); pro.append(H('em','',O.pro)); D.intro.lines.forEach(l=>pro.append(P(l))); b.append(pro);
      b.append(P(D.intro.q,'bp-bigq')); b.append(P(O.how)); b.append(P(D.intro.how,'bp-p dim'));
      const idx=H('ol','bp-idx'); BP.sheets.slice(1).forEach(([no,name])=>{ const li=H('li'); const a=H('a','',''); a.href='#'+IDP+no; a.append(H('b','',no),H('span','',name)); a.addEventListener('click',ev=>{ ev.preventDefault(); document.getElementById(IDP+no).scrollIntoView({behavior:reduce?'auto':'smooth'}); }); li.append(a); idx.append(li); }); b.append(idx);
    }

    /* ============ A-01 C4 zoom ============ */
    { const b=sheet(1,'משתנה'); const K=BP.c4; b.append(P(K.p)); b.append(P(C.lv_p,'bp-p dim'));
      const bar=H('div','bp-c4bar'); const lvB=K.names.map((n,i)=>{ const x=H('button','bp-lvb'); x.type='button'; x.append(H('b','',String(i+1)),H('span','',n)); x.addEventListener('click',()=>zoomTo(i)); bar.append(x); return x; });
      const zb=H('div','bp-zb'); [['−',-1],['+',1],['↺',0]].forEach(([t,d])=>{ const x=H('button','bp-zbt',t); x.type='button'; x.setAttribute('aria-label',d>0?'התקרבו':d<0?'התרחקו':'איפוס'); x.addEventListener('click',()=>userZoom(d)); zb.append(x); }); bar.append(zb); b.append(bar);
      const lvIntro=H('p','bp-lvi'); lvIntro.setAttribute('aria-live','polite');
      const wrapEl=H('div','bp-c4'); const svg=S('svg',{viewBox:'0 0 1000 600',class:'bp-svg c4',role:'img','aria-label':'מפת המערכת בשלוש רמות'}); wrapEl.append(svg); defs(svg); paper(svg,0,0,1000,600);
      const cam=S('g',{},svg); const G=[S('g',{class:'bp-lv'},cam),S('g',{class:'bp-lv'},cam),S('g',{class:'bp-lv'},cam)];
      /* level 1 */
      { const L=D.levels[0]; S('rect',{x:300,y:160,width:400,height:280,class:'bp-sysb'},G[0]); const tl=S('text',{x:688,y:180,class:'bp-lotl','text-anchor':'start'},G[0]); tl.textContent='גבול המערכת';
        const nodes=L.nodes.map(n=>{ const id=n[0]; const p=L1POS[id]; const k=n[4]; return {id,label:(L.cards[id]||{}).name||n[1],x:p[0],y:p[1],w:k==='system'?340:180,h:k==='system'?240:70,kind:k==='system'?'system':k==='actor'?'actor':'ext',max:16}; });
        const edges=L.edges.map(e=>({a:e[0],b:e[1],label:e[2],kind:PR.l1sup.includes(e[0])?'support':''}));
        drawGraph(G[0],nodes,edges,{click:id=>openCard(0,id),guard:()=>dragged0()}); }
      /* level 2 */
      { lotsInto(G[1]); const sp=planSpec(); drawGraph(G[1],sp.nodes,sp.edges,{click:id=>openCard(1,id),guard:()=>dragged0()}); }
      /* level 3 */
      { const L=D.levels[2]; const fr=S('rect',{x:20,y:20,width:960,height:560,class:'bp-roomf'},G[2]); const t=S('text',{x:965,y:48,class:'bp-lotl','text-anchor':'start'},G[2]); t.textContent='פרט: בתוך מנוע הסימולציה, סבב אחד';
        const nodes=L.nodes.map(n=>({id:n[0],label:(L.cards[n[0]]||{}).name||n[1],x:n[2],y:n[3]*1+40,w:150,h:62,kind:n[4]==='step'?'step':n[4],max:12}));
        const edges=L.edges.map(e=>({a:e[0],b:e[1],label:e[2]})); drawGraph(G[2],nodes,edges,{click:id=>openCard(2,id),guard:()=>dragged0()}); }
      /* fixed overlay: north arrow + scale bar */
      const ov=S('g',{class:'bp-ovl'},svg); const na=S('g',{transform:'translate(50,62)'},ov); S('circle',{r:22,class:'bp-na'},na); S('path',{d:'M0 -18 L7 8 L0 3 L-7 8 Z',class:'bp-naf'},na); const nt=S('text',{y:-26,'text-anchor':'middle',class:'bp-mini'},na); nt.textContent='N';
      const sb=S('g',{transform:'translate(40,560)'},ov); [0,1,2,3].forEach(i=>S('rect',{x:i*40,y:0,width:40,height:8,class:i%2?'bp-sb1':'bp-sb0'},sb)); const sbt=S('text',{x:80,y:-8,'text-anchor':'middle',class:'bp-mini'},sb);
      const zp=L2POS[PR.zoom], zsc=Math.min(116/1000,52/600); const PL=[null,{ox:330,oy:198,sc:.34},{ox:zp[0]-500*zsc,oy:zp[1]-300*zsc,sc:zsc}];
      let z=0, zAnim=null;
      const pz=panZoom(svg,cam,wrapEl,1000,600,(vx,vy)=>ov.setAttribute('transform',`translate(${vx.toFixed(1)},${vy.toFixed(1)})`),false); const dragged0=()=>pz.dragged;
      function setZ(v){ z=v; const i=Math.min(1,Math.floor(v)); const t=v-i; const p=PL[i+1]; const s1=p.sc; const s=Math.pow(s1,t);
        const f=s1===1?0:(1-s)/(1-s1); const cx=500+(p.ox+500*s1-500)*f, cy=300+(p.oy+300*s1-300)*f; const Vw=1000*s,Vh=600*s,Vx=cx-Vw/2,Vy=cy-Vh/2,k=1/s;
        const Ti=`translate(${(-Vx*k).toFixed(2)},${(-Vy*k).toFixed(2)}) scale(${k.toFixed(5)})`;
        G.forEach((g,j)=>{ if(j===i){ g.setAttribute('transform',Ti); const o=1-sm(t,.45,.85); g.style.opacity=o; g.style.display=o<.01?'none':''; g.style.pointerEvents=o<.5?'none':''; }
          else if(j===i+1){ g.setAttribute('transform',Ti+` translate(${p.ox},${p.oy}) scale(${p.sc})`); const o=sm(t,.3,.75); g.style.opacity=o; g.style.display=o<.01?'none':''; g.style.pointerEvents=o<.5?'none':''; }
          else { g.style.display='none'; } });
        const r=Math.round(v); sbt.textContent=K.scale[r]; lvB.forEach((x,j)=>{ x.classList.toggle('on',j===r); x.setAttribute('aria-pressed',j===r); }); }
      function showIntro(i){ lvIntro.textContent=''; lvIntro.append(H('b','',K.names[i]+'. ')); rich(lvIntro,D.levels[i].intro); }
      function zoomTo(lv){ cancelAnimationFrame(zAnim); pz.reset(); const from=z, to=lv, dur=reduce?1:700+500*Math.abs(to-from); const t0=performance.now();
        showIntro(lv); const st=n=>{ const q=Math.min(1,(n-t0)/dur); const e=q<.5?2*q*q:1-Math.pow(-2*q+2,2)/2; setZ(from+(to-from)*e); if(q<1) zAnim=requestAnimationFrame(st); }; zAnim=requestAnimationFrame(st); }
      const userZoom=d=>d===0?pz.reset():pz.zoom(d);
      function openCard(lv,id){ const cards=lv===0?D.levels[0].cards:lv===1?D.cards:D.levels[2].cards; const c=cards[id]; if(!c) return; let ex=null;
        if(lv===0&&id==='sys'){ ex=H('div','sp-mf'); const x=H('button','sp-btn',K.enter); x.type='button'; x.addEventListener('click',()=>{ closeModal(); zoomTo(1); }); ex.append(x); }
        if(lv===1&&id===PR.zoom){ ex=H('div','sp-mf'); const x=H('button','sp-btn',K.room); x.type='button'; x.addEventListener('click',()=>{ closeModal(); zoomTo(2); }); ex.append(x); }
        showModal(cardBox(c,ex)); }
      b.append(lvIntro,wrapEl);
      const leg=H('div','bp-lotleg'); LOTS.forEach(([k,,,,,lab],i)=>{ const c=H('span','bp-lb l'+i,lab); c.title=D.planes[i][2]; leg.append(c); }); leg.append(H('span','bp-lb ext','קופסה מקווקוות עם ?: מחוץ למערכת')); b.append(leg);
      b.append(P(K.lots,'bp-p dim')); b.append(H('p','bp-hint',K.hint)); Q(b,C.lv_q);
      setZ(0); showIntro(0); pz.reset();
      /* start at the floor plan once the sheet is on screen, so the zoom itself is the first thing the reader sees */
      const zo=new IntersectionObserver(es=>{ if(es[0].isIntersecting){ zo.disconnect(); setTimeout(()=>zoomTo(1),reduce?0:700); } },{threshold:.45}); zo.observe(wrapEl);
    }

    /* ============ A-02 room allocation ============ */
    { const b=sheet(2,'1:200'); const R=BP.rooms; b.append(P(R.p)); b.append(P(C.mp_p,'bp-p dim'));
      const lay=H('div','bp-rooms'); const tray=H('div','bp-tray'); tray.append(H('em','bp-k',R.pick)); const chips=[];
      const pl=plan({click:id=>tapRoom(id),aria:'תוכנית קומה: לאן שייך כל פיצ\'ר'});
      const score=H('div','bp-score'); let hits=0,tries=0; const upd=()=>{ score.textContent=R.score+' '+hits+' / '+tries; }; upd();
      const note=H('div','bp-note'); note.setAttribute('aria-live','polite'); note.textContent=R.sel.replace('עכשיו ','');
      let sel=-1, ghost=null; const done=new Set();
      D.map.forEach((m,fi)=>{ const c=H('button','bp-fc'); c.type='button'; c.innerHTML=`<svg viewBox="-14 -14 28 28" aria-hidden="true" class="bp-fi">${ICON[m[0]]||''}</svg>`; c.append(H('b','',String(m[0])),H('span','',m[1]));
        let st=null;
        c.addEventListener('pointerdown',e=>{ if(done.has(fi)) return; st={x:e.clientX,y:e.clientY,moved:false}; c.setPointerCapture(e.pointerId); });
        c.addEventListener('pointermove',e=>{ if(!st) return; if(!st.moved&&Math.hypot(e.clientX-st.x,e.clientY-st.y)>8){ st.moved=true; ghost=c.cloneNode(true); ghost.className='bp-fc bp-ghost'; document.body.append(ghost); }
          if(st.moved){ ghost.style.left=(e.clientX-50)+'px'; ghost.style.top=(e.clientY-20)+'px'; const el=document.elementFromPoint(e.clientX,e.clientY); const n=el&&el.closest&&el.closest('.bp-n'); Object.values(pl.N).forEach(x=>x.g.classList.toggle('over',x.g===n)); } });
        const end=e=>{ if(!st) return; const mv=st.moved; st=null; if(ghost){ ghost.remove(); ghost=null; } Object.values(pl.N).forEach(x=>x.g.classList.remove('over'));
          if(mv){ const el=document.elementFromPoint(e.clientX,e.clientY); const n=el&&el.closest&&el.closest('.bp-n'); if(n&&pl.svg.contains(n)) guess(fi,n.dataset.id); }
          else { sel=sel===fi?-1:fi; chips.forEach((x,j)=>x.classList.toggle('sel',j===sel)); note.textContent=sel>=0?R.sel:''; } };
        c.addEventListener('pointerup',end); c.addEventListener('pointercancel',()=>{ st=null; if(ghost){ ghost.remove(); ghost=null; } });
        c.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); sel=fi; chips.forEach((x,j)=>x.classList.toggle('sel',j===sel)); note.textContent=R.sel; } });
        tray.append(c); chips.push(c); });
      function tapRoom(id){ if(sel<0) return; guess(sel,id); }
      let flying=0;
      async function guess(fi,id){ if(done.has(fi)) return; done.add(fi); sel=-1; chips.forEach(x=>x.classList.remove('sel')); const m=D.map[fi]; const ok=m[2].includes(id); tries++; if(ok) hits++; upd();
        chips[fi].classList.add(ok?'hit':'miss'); await reveal(fi,id,ok); }
      async function reveal(fi,from,ok){ const m=D.map[fi]; const my=++flying; pl.clear(); chips.forEach((x,j)=>x.classList.toggle('cur',j===fi));
        Object.keys(pl.N).forEach(id=>{ if(!m[2].includes(id)) pl.node(id,'dim'); });
        Object.values(pl.Lk).forEach(l=>{ if(m[2].includes(l.a)&&m[2].includes(l.b)) l.g.classList.add('lit'); else l.g.classList.add('dim'); });
        if(from&&!ok){ pl.node(from,'wrong'); pl.mark(from,'✕'); }
        const fl=S('g',{class:'bp-fly bp-tmp'},pl.fx); S('circle',{r:20},fl); const ic=S('g',{class:'bp-fi'},fl); ic.innerHTML=ICON[m[0]]||'';
        const start=from?[pl.N[from].x,pl.N[from].y]:[500,-30]; fl.style.transition='none'; fl.style.transform=`translate(${start[0]}px,${start[1]}px)`; void fl.getBoundingClientRect(); fl.style.transition='';
        note.textContent=''; const hd=H('div','bp-nh'); hd.append(H('b','',(from?(ok?R.yes:R.no)+' ':'')+m[1]+'. '+R.lives+' '),document.createTextNode(m[2].map(i=>D.cards[i].name).join(' ← '))); note.append(hd,P(m[3]));
        for(let k=0;k<m[2].length;k++){ if(my!==flying) return; const n=pl.N[m[2][k]]; fl.style.transform=`translate(${n.x}px,${n.y-36}px)`; await sleep(650); if(my!==flying) return; pl.node(m[2][k],'lit'); pl.num(m[2][k],k+1); }
        await sleep(500); if(my===flying) fl.classList.add('gone'); }
      const allB=H('button','sp-btn ghost',R.all); allB.type='button'; allB.addEventListener('click',async()=>{ allB.disabled=true; for(let fi=0;fi<D.map.length;fi++){ if(done.has(fi)) continue; done.add(fi); chips[fi].classList.add('seen'); await reveal(fi,null,true); await sleep(900); } allB.disabled=false; });
      const side=H('div','bp-rside'); side.append(tray,score,allB); lay.append(side,pl.el); b.append(lay,note); Q(b,C.mp_q);
    }

    /* ============ A-03 one movement + sequence ============ */
    { const b=sheet(3,'1:200'); const T=BP.trace; b.append(P(T.p)); b.append(P(C.pk_p,'bp-p dim'));
      const row=H('div','bp-chips'); b.append(H('em','bp-k',C.pk_pick),row); const intro=P('','bp-lvi'); b.append(intro);
      const lay=H('div','bp-trace'); const pl=plan({aria:'תוכנית קומה עם נקודת אור שזזה בצנרת'});
      const sq=H('div','bp-seq'); sq.append(H('em','bp-k',T.seq)); const ssvg=S('svg',{class:'bp-seqs',role:'img','aria-label':'תרשים רצף'}); sq.append(ssvg);
      const low=H('div','bp-tlow'); lay.append(pl.el,low); b.append(lay);
      const cap=H('div','bp-cap'); cap.setAttribute('aria-live','polite'); const c1=H('div','bp-c1'), c2=H('div','bp-c2'); c1.append(H('em','',T.what),H('p','','')); c2.append(H('em','',T.emma),H('p','','')); cap.append(c1,c2);
      const end=H('p','bp-end',''); const ctl=H('div','bp-ctl'); const play=H('button','sp-btn',C.pk_play); play.type='button'; const stepB=H('button','sp-btn ghost',T.step); stepB.type='button'; ctl.append(play,stepB); const capCol=H('div','bp-tcap'); capCol.append(cap,end,ctl); low.append(capCol,sq);
      let sc=D.scen[0], tk=0, si=0, cur=null, seq=null;
      function buildSeq(){ const parts=[]; sc.steps.forEach(([k,ref])=>{ if(k==='n'){ if(!parts.includes(ref)) parts.push(ref); } else { const l=D.links.find(x=>x.id===ref); [l.a,l.b].forEach(x=>{ if(!parts.includes(x)) parts.push(x); }); } });
        const cw=118, W=Math.max(420,parts.length*cw+20), rowH=40, Ht=96+sc.steps.length*rowH+20; ssvg.setAttribute('viewBox',`0 0 ${W} ${Ht}`); ssvg.textContent=''; defs(ssvg); paper(ssvg,0,0,W,Ht);
        const X={}; parts.forEach((p,i)=>{ X[p]=W-10-cw/2-i*cw; const g=S('g',{class:'bp-sqh'},ssvg); S('rect',{x:X[p]-cw/2+6,y:14,width:cw-12,height:50,rx:4},g); wrap(D.cards[p].name,11).forEach((ln,j,a)=>{ const t=S('text',{x:X[p],y:44+(j-(a.length-1)/2)*16,'text-anchor':'middle'},g); t.textContent=ln; }); S('path',{d:`M${X[p]} 64 V${Ht-14}`,class:'bp-life'},ssvg); });
        seq={X,rowH,y0:96,g:S('g',{},ssvg),W}; }
      function seqStep(i,from,to,label,state,dashed){ if(!seq) return; const y=seq.y0+i*seq.rowH; const g=S('g',{class:'bp-sqr '+(state||'')},seq.g);
        if(from&&to&&from!==to){ const x1=seq.X[from],x2=seq.X[to]; const p=S('path',{d:`M${x1} ${y} H${x2}`,class:'bp-sqa'+(dashed?' dash':''),pathLength:1},g); const ang=x2>x1?0:Math.PI; S('polygon',{points:head(x2,y,ang,6),class:'bp-sqhd'},g);
          if(label){ const t=S('text',{x:(x1+x2)/2,y:y-7,'text-anchor':'middle',class:'bp-sql'},g); t.textContent=label; } if(!dashed) p.classList.add('draw'); }
        else if(to){ S('rect',{x:seq.X[to]-6,y:y-12,width:12,height:24,rx:3,class:'bp-act'},g); const t=S('text',{x:seq.X[to]-12,y:y+5,'text-anchor':'end',class:'bp-sqn'},g); t.textContent=String(i+1); }
        const r=ssvg.getBoundingClientRect(); }
      function reset(){ tk++; si=0; cur=null; pl.clear(); buildSeq(); c1.lastChild.textContent=''; c2.lastChild.textContent=''; end.textContent=''; end.className='bp-end'; play.disabled=false; stepB.disabled=false; play.textContent=C.pk_play; }
      async function doStep(my,anim){ const st=sc.steps[si]; if(!st) return false; const [k,ref,capT,state]=st; const ix=si; si++;
        if(k==='n'){ const prev=cur; Object.keys(pl.N).forEach(i=>pl.node(i,'now',i===ref)); pl.tok(ref,prev!=null&&anim); if(prev&&prev!==ref) seqStep(ix,prev,ref,'',state,true); else seqStep(ix,null,ref,'',state); if(anim) await sleep(prev!=null?700:250); if(state) pl.node(ref,state); cur=ref; }
        else { const l=pl.Lk[ref]; pl.link(ref,'lit'); const dest=(cur===l.b)?l.a:l.b; const src=dest===l.a?l.b:l.a; if(cur==null){ pl.tok(src,false); } pl.tok(dest,anim); seqStep(ix,src,dest,(D.links.find(x=>x.id===ref)||{}).label,state); if(anim) await sleep(850); cur=dest; }
        if(my!==tk) return false; c1.lastChild.textContent=''; rich(c1.lastChild,capT); c2.lastChild.textContent=''; rich(c2.lastChild,(BP.emma[sc.id]||[])[ix]||''); cap.className='bp-cap '+(state||''); if(window.TermWin) window.TermWin.wire(c2);
        if(si>=sc.steps.length){ end.textContent=sc.endtxt; end.className='bp-end '+sc.end; play.textContent=C.pk_again; stepB.disabled=true; }
        return true; }
      play.addEventListener('click',async()=>{ if(si>=sc.steps.length) reset(); const my=++tk; play.disabled=true; stepB.disabled=true; while(my===tk&&si<sc.steps.length){ const ok=await doStep(my,true); if(!ok) return; await sleep(1700); } if(my===tk){ play.disabled=false; play.textContent=C.pk_again; } });
      stepB.addEventListener('click',async()=>{ const my=++tk; play.disabled=false; await doStep(my,true); });
      const chips=D.scen.map(s=>{ const x=H('button','sp-chip',s.name); x.type='button'; x.addEventListener('click',()=>{ sc=s; chips.forEach(y=>y.classList.toggle('on',y===x)); intro.textContent=''; rich(intro,s.intro); reset(); }); row.append(x); return x; });
      chips[0].click(); Q(b,C.pk_q);
    }

    /* ============ A-04 chaos drill ============ */
    { const b=sheet(4,'1:200'); const K=BP.chaos; b.append(P(K.p)); b.append(P(C.bk_p,'bp-p dim'));
      const leg=H('div','bp-sleg'); K.leg.forEach(([k,t])=>leg.append(H('span','bp-st '+k,t))); b.append(leg);
      const lay=H('div','bp-chaos'); const pl=plan({click:id=>pick(id),aria:'תוכנית קומה לתרגיל כאוס'}); const side=H('div','bp-cside');
      const s1=H('p','bp-step on',K.pick), s2=H('div','bp-stepb'); s2.append(H('p','bp-step',K.guess)); const gr=H('div','bp-guess'); s2.append(gr); const drop=H('button','sp-btn bp-drop',K.drop); drop.type='button'; drop.disabled=true;
      const out=H('div','bp-cout'); out.setAttribute('aria-live','polite'); const rec=H('button','sp-btn ghost',K.rec); rec.type='button'; rec.hidden=true; const again=H('button','sp-btn ghost',K.again); again.type='button'; again.hidden=true;
      side.append(s1,s2,drop,out,rec,again); lay.append(pl.el,side); b.append(lay);
      let id=null, hyp=null, phase=0;
      const gbs=K.opts.map(([k,t])=>{ const x=H('button','bp-gb',t); x.type='button'; x.disabled=true; x.addEventListener('click',()=>{ hyp=k; gbs.forEach(y=>y.classList.toggle('on',y===x)); drop.disabled=false; }); gr.append(x); return x; });
      function actual(f){ const v=Object.values(f.marks).map(m=>m[0]); return (v.includes('bad')||v.filter(x=>x==='warn').length>=2)?'part':(v.includes('warn')?'part':'none'); }
      function pick(n){ if(phase===2) return; if(!D.fail[n]) return; id=n; phase=1; pl.clear(); pl.node(n,'sel'); pl.mark(n,'?'); s1.textContent=K.pick+' '+D.cards[n].name; gbs.forEach(x=>{ x.disabled=false; x.classList.remove('on'); }); hyp=null; drop.disabled=true; out.textContent=''; out.className='bp-cout'; rec.hidden=true; again.hidden=true; }
      drop.addEventListener('click',async()=>{ if(!id||!hyp) return; phase=2; drop.disabled=true; gbs.forEach(x=>x.disabled=true); const f=D.fail[id]; const n=pl.N[id];
        pl.node(id,'sel',false); pl.node(id,'down'); pl.mark(id,'✕'); Object.values(pl.Lk).forEach(l=>{ if(l.a===id||l.b===id) l.g.classList.add('cut'); });
        let R=60; Object.keys(f.marks).forEach(k=>{ const m=pl.N[k]; R=Math.max(R,Math.hypot(m.x-n.x,m.y-n.y)+60); });
        const ring=S('circle',{cx:n.x,cy:n.y,r:R,class:'bp-blast bp-tmp'},pl.fx); ring.style.transformOrigin=`${n.x}px ${n.y}px`; ring.style.transform='scale(.05)'; void ring.getBoundingClientRect(); ring.style.transform='scale(1)';
        await sleep(650);
        Object.keys(pl.N).forEach(k=>{ if(k===id) return; const m=f.marks[k]; if(m){ pl.node(k,m[0]); pl.mark(k,m[1]); } else if(!PR.q.includes(k)) pl.node(k,'ok'); });
        const a=actual(f); out.textContent=''; const hd=H('p','bp-res '+(hyp===a?'yes':'no'),(hyp===a?K.right:K.wrong)+' '+K.res[a]); out.append(hd);
        const t=H('p','',''); t.append(H('b','',C.bk_down+' '+D.cards[id].name+'. ')); rich(t,f.text); out.append(t); if(hyp==='all') out.append(P(K.all,'bp-p dim')); out.className='bp-cout on'; rec.hidden=false; });
      rec.addEventListener('click',async()=>{ rec.hidden=true; const n=pl.N[id]; pl.fx.querySelectorAll('.bp-blast').forEach(e=>e.classList.add('fade')); await sleep(300); pl.node(id,'down',false); pl.node(id,'back'); pl.mark(id,'✓'); Object.values(pl.Lk).forEach(l=>l.g.classList.remove('cut'));
        await sleep(500); Object.keys(pl.N).forEach(k=>{ ['bad','warn'].forEach(c=>pl.node(k,c,false)); if(k!==id&&!PR.q.includes(k)) { pl.node(k,'ok'); pl.mark(k,''); } if(PR.q.includes(k)&&k!==id) pl.mark(k,''); }); const p=H('p','bp-recv',''); p.append(H('b','','התאוששות: ')); rich(p,K.recov[id]||''); out.append(p); again.hidden=false; });
      again.addEventListener('click',()=>{ phase=0; id=null; pl.clear(); s1.textContent=K.pick; gbs.forEach(x=>{ x.disabled=true; x.classList.remove('on'); }); out.textContent=''; out.className='bp-cout'; again.hidden=true; });
      Q(b,C.bk_q);
    }

    /* ============ A-05 x-ray ============ */
    { const b=sheet(5,'ללא'); const X=BP.xray; b.append(P(X.p)); b.append(P(C.ms_p,'bp-p dim'));
      const pl=plan({linkClick:id=>pickM(id),aria:'הקווים שבהם עוברות הודעות'}); pl.el.classList.add('mini'); Object.keys(D.msgs).forEach(id=>pl.link(id,'has'));
      const row=H('div','bp-chips'); const chips={}; Object.keys(D.msgs).forEach(id=>{ const x=H('button','sp-chip',D.msgs[id].name); x.type='button'; x.addEventListener('click',()=>pickM(id)); row.append(x); chips[id]=x; });
      const top=H('div','bp-xtop'); const tl=H('div'); tl.append(H('em','bp-k',C.ms_pick),row); top.append(tl,pl.el); b.append(top);
      const st=H('div','bp-xst'); const belt=H('div','bp-belt'); const pkg=H('div','bp-pkg'); pkg.innerHTML='<svg viewBox="0 0 60 50" aria-hidden="true"><path d="M5 15 L30 5 L55 15 L55 42 L30 48 L5 42 Z"/><path d="M5 15 L30 24 L55 15 M30 24 V48"/></svg>'; belt.append(pkg);
      const scn=H('div','bp-scan'); const scr=H('div','bp-screen'); scn.append(H('div','bp-sbeam'),scr); st.append(belt,scn); b.append(st);
      const ctl=H('div','bp-ctl'); const go=H('button','sp-btn',X.scan); go.type='button'; const rs=H('button','sp-btn ghost',X.reset); rs.type='button'; ctl.append(go,rs); b.append(ctl);
      let cur=null, fakeI=-1, tk=0;
      function form(m,faked){ scr.textContent=''; const f=H('div','bp-form'); const hd=H('div','bp-fh'); hd.append(H('b','',X.form+': '),H('code','',m.name)); f.append(hd,H('p','bp-fw',X.from+' '+m.who));
        const tb=H('div','bp-ft'); const hr=H('div','bp-fr h'); C.ms_tab.forEach(t=>hr.append(H('span','',t))); hr.append(H('span','','')); tb.append(hr);
        m.fields.forEach((fl,i)=>{ const r=H('div','bp-fr'+(i===faked?' fake':'')); r.append(H('code','',fl[0]),H('span','',fl[1]),P(fl[2],'bp-fd','span'));
          if(fl[3]){ const x=H('button','bp-fk',i===faked?X.faked:X.fake); x.type='button'; x.disabled=i===faked; x.addEventListener('click',()=>scan(i)); r.append(x); } else r.append(H('span','bp-fn','·')); r.title=fl[3]?'':X.none; tb.append(r); });
        f.append(tb); const insd=H('details','bp-ins'); insd.append(H('summary','',X.inside)); const pre=H('pre','ar-pre'); pre.setAttribute('dir','ltr'); pre.textContent=m.ex; insd.append(pre); f.append(insd); scr.append(f); return f; }
      function pickM(id){ cur=id; fakeI=-1; tk++; Object.entries(chips).forEach(([k,x])=>x.classList.toggle('on',k===id)); Object.keys(D.msgs).forEach(k=>pl.link(k,'lit',k===id)); scr.textContent=''; scr.append(H('p','bp-xh',X.start)); st.classList.remove('in','passed','failed'); pkg.dataset.n=D.msgs[id].name; }
      async function scan(fi){ if(!cur) return; const my=++tk; fakeI=fi==null?-1:fi; const m=D.msgs[cur]; st.classList.remove('in','passed','failed'); scr.textContent=''; await sleep(60); st.classList.add('in'); go.disabled=true; await sleep(1100); if(my!==tk) return;
        const f=form(m,fakeI); const stamp=H('div','bp-xstamp'); if(fakeI<0){ stamp.textContent=X.pass; st.classList.add('passed'); f.append(stamp); }
        else { const fl=m.fields[fakeI]; stamp.textContent=X.fail; st.classList.add('failed'); const why=H('div','bp-xwhy'); why.append(H('b','',X.clerk+' '+fl[3][0]+'. ')); rich(why,fl[3][1]); f.append(stamp,why); }
        go.disabled=false; }
      go.addEventListener('click',()=>scan(null)); rs.addEventListener('click',()=>{ if(cur) pickM(cur); });
      pickM(Object.keys(D.msgs)[0]); Q(b,C.ms_q==='ואילו מילים חדשות עוד כדאי להכיר?'?'ואם כל חבילה נבדקת בדרך, מה מכל זה נשאר אחרי שהיא מגיעה?':C.ms_q);
    }

    /* ============ A-06 cross-section ============ */
    if(PR.store!=='fs') storeGeneric(sheet(6,'1:50')); else { const b=sheet(6,'1:50'); const K=BP.store; b.append(P(K.p)); b.append(P(C.dt_p,'bp-p dim'));
      const svg=S('svg',{viewBox:'0 0 1000 560',class:'bp-svg bp-sect',role:'img','aria-label':'חתך של שני בניינים: מה נשמר ואיפה'}); defs(svg); paper(svg,0,0,1000,560);
      const fx=S('g',{},svg);
      S('path',{d:'M0 330 H1000',class:'bp-ground'},fx); for(let x=0;x<1000;x+=18) S('path',{d:`M${x} 330 l-10 12`,class:'bp-hatch'},fx);
      /* Emma's house (right) */
      const eh=S('g',{class:'bp-bld'},fx); S('path',{d:'M560 120 L760 40 L960 120 V330 H560 Z',class:'bp-wall bp-draw',pathLength:1},eh); S('path',{d:'M560 225 H960',class:'bp-wall bp-draw',pathLength:1},eh);
      const t1=S('text',{x:760,y:30,'text-anchor':'middle',class:'bp-cap2'},eh); t1.textContent=K.houses[0];
      const fl1=S('text',{x:950,y:142,'text-anchor':'start',class:'bp-flr'},eh); fl1.textContent=K.floors.board; const fl2=S('text',{x:950,y:248,'text-anchor':'start',class:'bp-flr'},eh); fl2.textContent=K.floors.drawer;
      S('rect',{x:600,y:152,width:320,height:62,rx:4,class:'bp-wb'},eh); const lamp=S('g',{class:'bp-lamp'},eh); S('path',{d:'M760 120 v14'},lamp); S('path',{d:'M748 134 h24 l-6 10 h-12z'},lamp);
      S('rect',{x:600,y:262,width:320,height:56,rx:4,class:'bp-drw'},eh); S('path',{d:'M740 290 h40',class:'bp-hdl'},eh);
      /* project building (left) */
      const ph=S('g',{class:'bp-bld'},fx); S('path',{d:'M60 100 H440 V330 H60 Z',class:'bp-wall bp-draw',pathLength:1},ph); S('path',{d:'M40 330 H460 V530 H40 Z',class:'bp-wall bp-draw',pathLength:1},ph);
      const t2=S('text',{x:250,y:88,'text-anchor':'middle',class:'bp-cap2'},ph); t2.textContent=K.houses[1];
      const fl3=S('text',{x:430,y:124,'text-anchor':'start',class:'bp-flr'},ph); fl3.textContent=K.floors.shop; const fl4=S('text',{x:450,y:356,'text-anchor':'start',class:'bp-flr'},ph); fl4.textContent=K.floors.vault;
      S('rect',{x:80,y:138,width:340,height:170,rx:4,class:'bp-glass'},ph); S('rect',{x:70,y:372,width:360,height:140,rx:6,class:'bp-vault'},ph); S('circle',{cx:400,cy:442,r:16,class:'bp-dial'},ph);
      /* pipes */
      S('path',{d:'M420 180 C500 180 500 290 600 290',class:'bp-ro'},fx); const ro=S('text',{x:470,y:268,'text-anchor':'middle',class:'bp-mini'},fx); ro.textContent='← '+K.readOnly;
      S('path',{d:'M600 200 C520 200 520 120 440 120',class:'bp-nop'},fx); const nx=S('g',{transform:'translate(520,160)',class:'bp-nox'},fx); S('path',{d:'M-10 -10 L10 10 M10 -10 L-10 10'},nx); const np=S('text',{x:520,y:112,'text-anchor':'middle',class:'bp-mini red'},fx); np.textContent=K.noPipe;
      /* items */
      const info=H('div','bp-sinfo'); info.setAttribute('aria-live','polite'); info.textContent=K.tap;
      const items=[]; const mk=(x,y,w,label,desc,cls,grp)=>{ const g=S('g',{class:'bp-item '+cls,tabindex:0,role:'button','aria-label':label},fx); S('rect',{x:x-w/2,y:y-15,width:w,height:30,rx:4},g); const t=S('text',{x,y:y+5,'text-anchor':'middle'},g); t.textContent=label;
        const show=()=>{ info.textContent=''; info.append(H('b','',label+': ')); rich(info,desc); }; g.addEventListener('click',show); g.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); show(); } }); items.push({g,grp}); return g; };
      D.data.transient.forEach(([n,d],i)=>mk(680+(i%2)*160,168+Math.floor(i/2)*32,148,n,d,'tr','board'));
      const br=D.data.persisted.find(x=>x[0]==='בדפדפן'); mk(760,290,250,'היסטוריה ועולמות פרטיים',(br?br[1]:'')+' (IndexedDB)','ps','drawer');
      D.data.persisted.filter(x=>x!==br).forEach(([n,d],i)=>{ if(i===0) mk(250,200,250,n,d,'pub','shop'); else mk(250,410+(i-1)*52,250,n,d,'ps','vault'); });
      const nb=S('text',{x:800,y:400,'text-anchor':'middle',class:'bp-mini'},fx); nb.textContent='אין כאן מרתף: שום דבר לא נשלח לאחסון רחוק';
      const sw=H('div','bp-plan'); sw.append(svg); panZoom(svg,fx,sw,1000,560,null); b.append(sw,info);
      const ctl=H('div','bp-ctl'); const cb=H('button','sp-btn',K.close); cb.type='button'; const wb=H('button','sp-btn ghost',K.wipe); wb.type='button'; wb.disabled=true; const rb=H('button','sp-btn ghost',K.reopen); rb.type='button'; ctl.append(cb,wb,rb); b.append(ctl);
      const msg=P('','bp-smsg'); b.append(msg);
      cb.addEventListener('click',()=>{ svg.classList.add('closed'); items.forEach(it=>{ if(it.grp==='board') it.g.classList.add('evap'); }); msg.textContent=''; rich(msg,K.afterClose); wb.disabled=false; cb.disabled=true; });
      wb.addEventListener('click',()=>{ svg.classList.add('wiped'); items.forEach(it=>{ if(it.grp==='drawer') it.g.classList.add('evap'); }); msg.textContent=''; rich(msg,K.afterWipe); wb.disabled=true; });
      rb.addEventListener('click',()=>{ svg.classList.remove('closed','wiped'); items.forEach(it=>it.g.classList.remove('evap')); msg.textContent=''; cb.disabled=false; wb.disabled=true; });
      const lg=H('div','bp-dkeys'); [[C.dt_tr,'tr'],[C.dt_ps,'ps']].forEach(([t,k])=>lg.append(H('span','bp-dk '+k,t))); b.append(lg);
      Q(b,'ואם צריך להסביר את כל הסמלים האלה למי שמצטרף לפרויקט מחר?');
    }

    /* ============ A-07 legend ============ */
    { const b=sheet(7,'ללא'); const K=BP.legend; b.append(P(K.p));
      const lay=H('div','bp-legend'); const list=H('div','bp-sym'); const pl=plan({aria:'מפה שמדליקה את הסמל הנבחר'}); pl.el.classList.add('mini');
      function light(k){ pl.clear(); const dimAll=()=>{ Object.keys(pl.N).forEach(i=>pl.node(i,'dim')); Object.values(pl.Lk).forEach(l=>l.g.classList.add('dim')); };
        if(k==='box'){ Object.keys(pl.N).forEach(i=>{ if(!EXT.includes(i)) pl.node(i,'lit'); else pl.node(i,'dim'); }); }
        else if(k==='lot'){ dimAll(); Object.values(pl.lots).forEach(l=>l.classList.add('hl')); }
        else if(k==='ext'){ dimAll(); EXT.forEach(i=>{ pl.node(i,'dim',false); pl.node(i,'lit'); }); }
        else if(k==='pipe'){ dimAll(); D.links.forEach(l=>{ if(!l.two&&l.kind!=='support'){ pl.link(l.id,'dim',false); pl.link(l.id,'hl'); } }); }
        else if(k==='two'){ dimAll(); D.links.forEach(l=>{ if(l.two){ pl.link(l.id,'dim',false); pl.link(l.id,'hl'); } }); }
        else if(k==='sup'){ dimAll(); D.links.forEach(l=>{ if(l.kind==='support'){ pl.link(l.id,'dim',false); pl.link(l.id,'hl'); } }); }
        else if(k==='dot'){ pl.tok(PR.dot[0],false); pl.tok(PR.dot[1],true); }
        else if(k==='scale'){ dimAll(); } }
      const icon=k=>{ const s=S('svg',{viewBox:'0 0 70 40',class:'bp-symi','aria-hidden':'true'}); const g=S('g',{},s);
        if(k==='box') S('rect',{x:8,y:8,width:54,height:24,rx:3,class:'s-box'},g);
        if(k==='lot'){ S('rect',{x:6,y:6,width:58,height:28,class:'s-lot'},g); [[6,6],[64,6],[6,34],[64,34]].forEach(([x,y])=>S('circle',{cx:x,cy:y,r:2.5,class:'s-pin'},g)); }
        if(k==='ext'){ S('rect',{x:8,y:8,width:54,height:24,rx:3,class:'s-ext'},g); S('circle',{cx:60,cy:10,r:7,class:'s-q'},g); }
        if(k==='pipe'){ S('path',{d:'M8 20 H56',class:'s-pipe'},g); S('path',{d:'M8 20 H56',class:'s-ln'},g); S('polygon',{points:'62,20 52,15 52,25',class:'s-hd'},g); }
        if(k==='two'){ S('path',{d:'M14 20 H56',class:'s-pipe'},g); S('path',{d:'M14 20 H56',class:'s-ln'},g); S('polygon',{points:'62,20 52,15 52,25',class:'s-hd'},g); S('polygon',{points:'8,20 18,15 18,25',class:'s-hd'},g); }
        if(k==='sup'){ S('path',{d:'M8 20 H56',class:'s-sup'},g); S('polygon',{points:'62,20 52,15 52,25',class:'s-hd'},g); }
        if(k==='dot'){ S('path',{d:'M8 20 H62',class:'s-pipe'},g); S('circle',{cx:35,cy:20,r:9,class:'s-glow'},g); S('circle',{cx:35,cy:20,r:4,class:'s-dot'},g); }
        if(k==='scale'){ [0,1,2].forEach(i=>S('rect',{x:6+i*14,y:26,width:14,height:6,class:i%2?'s-sb1':'s-sb0'},g)); S('path',{d:'M56 6 L61 22 L56 18 L51 22 Z',class:'s-na'},g); }
        return s; };
      K.sym.forEach(([k,n,t])=>{ const r=H('button','bp-symr'); r.type='button'; r.append(icon(k)); const tx=H('span'); tx.append(H('b','',n),H('small','',t)); r.append(tx);
        const on=()=>{ list.querySelectorAll('.bp-symr').forEach(x=>x.classList.toggle('on',x===r)); light(k); }; r.addEventListener('mouseenter',on); r.addEventListener('focus',on); r.addEventListener('click',on); list.append(r); });
      lay.append(list,pl.el); b.append(lay);
      b.append(H('h5','bp-sub',K.terms)); b.append(P(C.tm_p,'bp-p dim'));
      const tg=H('div','bp-terms'); D.terms.forEach(t=>{ const c=H('button','bp-term'); c.type='button'; c.append(H('b','',t.name),H('span','',t.viz.intro)); c.addEventListener('click',()=>{ const bx=H('div','ar-card bp-cardm'); const hd=H('div','ar-ch'); hd.append(H('div','ar-ct',t.name)); const x=H('button','sp-x','✕'); x.type='button'; x.addEventListener('click',closeModal); hd.append(x); bx.append(hd,P(t.what),laneViz(t.viz)); showModal(bx); const pb=bx.querySelector('.sp-vb'); if(pb) pb.click(); }); tg.append(c); }); b.append(tg);
      const dict=H('div','bp-dict'); dict.append(H('em','bp-k',K.dict)); const dd=H('p','bp-dictp'); Object.keys(G).forEach(k=>{ gloss(dd,k); dd.append(document.createTextNode(' ')); }); dict.append(dd); b.append(dict);
      Q(b,C.tm_q);
    }
    function laneViz(V){ const box=H('div','sp-vz'); box.append(P(V.intro,'sp-vzi')); const lane=H('div','sp-vl'); box.append(lane);
      const st=V.st.map(n=>{ const e=H('div','sp-vs'); e.append(H('b','',n)); lane.append(e); return e; }); let endEl=null; if(V.end){ endEl=H('div','sp-vs end'); endEl.append(H('b','',V.end)); lane.append(endEl); }
      const tok=H('div','sp-vt'); lane.append(tok); const cap=H('p','sp-vc',''); cap.setAttribute('aria-live','polite'); box.append(cap); const btn=H('button','sp-btn sp-vb',C.tm_play); btn.type='button'; box.append(btn); let token=0;
      const put=(el,anim)=>{ const lr=lane.getBoundingClientRect(); let x; if(!el) x=lr.width-62; else { const r=el.getBoundingClientRect(); x=r.left-lr.left+r.width/2; } x=Math.max(64,Math.min(lr.width-64,x)); if(!anim) tok.style.transition='none'; tok.style.left=x+'px'; if(!anim){ void tok.offsetWidth; tok.style.transition=''; } };
      const clear=()=>{ st.forEach(e=>e.classList.remove('ok','bad','now')); if(endEl) endEl.classList.remove('ok','bad'); };
      async function run(){ const my=++token; btn.disabled=true; clear();
        for(const r of V.runs){ if(my!==token) return; tok.className='sp-vt'; tok.textContent=r.t; put(null,false); tok.style.opacity=1; cap.textContent=''; cap.className='sp-vc'; await sleep(500);
          for(const [i,txt,state] of r.steps){ if(my!==token) return; put(st[i],true); st.forEach(e=>e.classList.remove('now')); st[i].classList.add('now'); await sleep(750); if(my!==token) return; if(state) st[i].classList.add(state); cap.textContent=txt; cap.className='sp-vc '+(state||''); await sleep(1500); }
          if(my!==token) return; if(r.end==='ok'&&endEl){ put(endEl,true); endEl.classList.add('ok'); await sleep(800); } else if(r.end==='bad'){ tok.classList.add('bad'); await sleep(700); }
          await sleep(900); tok.style.opacity=0; await sleep(400); clear(); }
        if(my===token){ btn.disabled=false; btn.textContent=C.pk_again; } }
      btn.addEventListener('click',run); return box; }

    /* ============ A-08 ADR ============ */
    { const b=sheet(8,'ללא'); const K=BP.adr; b.append(P(K.p)); b.append(P(C.dc_p,'bp-p dim'));
      const fork=(opts)=>{ const s=S('svg',{viewBox:'0 0 300 120',class:'bp-fork','aria-hidden':'true'}); S('path',{d:'M290 60 H190',class:'bp-fk0'},s); const br=opts.map((o,i)=>{ const y=opts.length===2?(i?92:28):[18,60,102][i]; const p=S('path',{d:`M190 60 C150 60 150 ${y} 110 ${y} H12`,class:'bp-fkb'},s); const t=S('text',{x:60,y:y-8,'text-anchor':'middle',class:'bp-fkt'},s); t.textContent=o[0]; return p; }); S('circle',{cx:190,cy:60,r:6,class:'bp-fkn'},s); return {s,br}; };
      D.decisions.forEach((d,di)=>{ const c=H('article','bp-adr'); const hd=H('header','bp-adrh'); hd.append(H('code','','ADR-00'+(di+1)),H('h5','',d.q)); const stt=H('span','bp-adrs',K.k.status+': '+K.k.acc); hd.append(stt); c.append(hd);
        const g=H('div','bp-adrg'); const L=H('div'); const r1=H('div','bp-af'); r1.append(H('em','',K.k.ctx),P(K.ctx[di]||'')); L.append(r1); const r2=H('div','bp-af'); r2.append(H('em','',K.k.you),P(C.dc_hint+' '+d.hint,'bp-p dim')); L.append(r2);
        const opts=H('div','bp-opts'); const f=fork(d.options); const out=H('div','bp-adro'); const bs=[];
        d.options.forEach((op,i)=>{ const x=H('button','bp-opt'); x.type='button'; x.append(H('b','',op[0]),H('span','',op[1])); x.addEventListener('click',()=>{ bs.forEach((y,j)=>{ y.classList.toggle('on',j===i); y.classList.toggle('chosen',j===d.chosen); }); c.classList.add('done');
          f.br.forEach((p,j)=>{ p.classList.toggle('win',j===d.chosen); p.classList.toggle('lose',j!==d.chosen); });
          out.textContent=''; out.append(H('p','bp-adrv '+(i===d.chosen?'yes':'no'),i===d.chosen?K.k.same:K.k.diff));
          const a=H('div','bp-af'); a.append(H('em','',K.k.dec),P(d.choice+' '+d.why)); const rj=d.options.map((o,j)=>j).filter(j=>j!==d.chosen); const r=H('div','bp-af rej'); r.append(H('em','',K.k.rej)); rj.forEach(j=>{ r.append(P(d.options[j][0]+': '+(d.stories[j]||''))); });
          const pr=H('div','bp-af price'); pr.append(H('em','',K.k.price),P(d.price.replace(/^המחיר: /,''))); out.append(a,r,pr); }); opts.append(x); bs.push(x); });
        L.append(opts); g.append(L,f.s); c.append(g,out); b.append(c); });
      if(K.open){ const O=K.open; const oc=H('article','bp-adr open'); const oh=H('header','bp-adrh'); oh.append(H('code','',O.id),H('h5','',O.q),H('span','bp-adrs open',K.k.status+': '+K.k.open)); oc.append(oh); const og=H('div','bp-adrg'); const oL=H('div'); const or1=H('div','bp-af'); or1.append(H('em','',K.k.ctx),P(O.ctx)); oL.append(or1);
      const oo=H('div','bp-opts'); const of=fork(O.opts); const oout=H('div','bp-adro'); O.opts.forEach((op,i)=>{ const x=H('button','bp-opt'); x.type='button'; x.append(H('b','',op[0]),H('span','',op[1])); x.addEventListener('click',()=>{ oo.querySelectorAll('.bp-opt').forEach(y=>y.classList.toggle('on',y===x)); of.br.forEach((p,j)=>p.classList.toggle('maybe',j===i)); oout.textContent=''; oout.append(P(O.after,'bp-adrv open')); }); oo.append(x); }); oL.append(oo); og.append(oL,of.s); oc.append(og,oout); b.append(oc); }
      b.append(P(K.more,'bp-p dim')); Q(b,C.dc_q);
    }

    /* ============ A-09 construction site ============ */
    { const b=sheet(9,'1:100'); const K=BP.build; b.append(P(K.p)); b.append(P(C.sp_p,'bp-p dim'));
      const lay=H('div','bp-build'); const svg=S('svg',{viewBox:'0 0 520 560',class:'bp-svg bp-site',role:'img','aria-label':'בניין שנבנה קומה אחרי קומה'}); defs(svg); paper(svg,0,0,520,560);
      S('path',{d:'M0 520 H520',class:'bp-ground'},svg); for(let x=0;x<520;x+=18) S('path',{d:`M${x} 520 l-10 12`,class:'bp-hatch'},svg);
      S('rect',{x:120,y:500,width:280,height:20,class:'bp-found'},svg); const ft=S('text',{x:260,y:514,'text-anchor':'middle',class:'bp-mini'},svg); ft.textContent='יסודות: ה-POC';
      const crane=S('g',{class:'bp-crane'},svg); S('path',{d:'M455 520 V40 M445 520 V40 M445 40 H470 M445 60 H140 M445 40 L300 60 M455 40 L470 60 H445'},crane); for(let y=500;y>60;y-=40) S('path',{d:`M445 ${y} L455 ${y-40}`},crane);
      const hook=S('g',{class:'bp-hook'},svg); const cable=S('path',{d:'M0 0 V0',class:'bp-cable'},hook); const load=S('rect',{x:-140,y:0,width:280,height:56,class:'bp-load'},hook); load.style.opacity=0;
      const FH=60; const floors=[]; D.sprints.forEach((s,i)=>{ const y=500-(i+1)*FH; const g=S('g',{class:'bp-floor'},svg); S('rect',{x:120,y,width:280,height:FH},g); const t=S('text',{x:260,y:y+26,'text-anchor':'middle',class:'bp-fl1'},g); t.textContent=s.name.replace(/^ספרינט \d+: /,'');
        const n=S('text',{x:112,y:y+36,'text-anchor':'start',class:'bp-mini'},g); n.textContent='ספרינט '+(i+1); for(let k=0;k<4;k++) S('rect',{x:150+k*62,y:y+34,width:30,height:16,class:'bp-win'},g);
        const tag=S('g',{class:'bp-tag',transform:`translate(410,${y+12})`},g); S('path',{d:'M0 0 l10 6 v24 h-34 v-24 z'},tag); const tt=S('text',{x:-7,y:23,'text-anchor':'middle'},tag); tt.textContent='✓';
        g.style.opacity=0; g.addEventListener('click',()=>show(i)); floors.push({g,y}); });
      const side=H('div','bp-bside'); const row=H('div','bp-chips'); const pnl=H('div','bp-bpnl'); const mini=plan({aria:'אילו רכיבים קיימים אחרי הספרינט'}); mini.el.classList.add('mini');
      const play=H('button','sp-btn',K.play); play.type='button'; side.append(row,pnl,mini.el,play); lay.append(svg,side); b.append(lay);
      let built=-1, busy=0;
      async function lift(i){ const f=floors[i]; const hx=260; hook.setAttribute('transform',`translate(${hx},60)`); load.style.opacity=1; load.setAttribute('y',0); cable.setAttribute('d','M0 0 V0');
        const yTo=f.y-60; const t0=performance.now(), dur=reduce?1:700; await new Promise(res=>{ const st=n=>{ const q=Math.min(1,(n-t0)/dur); const yy=q*yTo; load.setAttribute('y',yy); cable.setAttribute('d',`M0 0 V${yy}`); if(q<1) requestAnimationFrame(st); else res(); }; requestAnimationFrame(st); });
        f.g.style.opacity=1; f.g.classList.add('set'); load.style.opacity=0; cable.setAttribute('d','M0 0 V0'); }
      async function show(i){ if(busy) return; busy=1; while(built<i){ built++; await lift(built); await sleep(150); } busy=0;
        floors.forEach((f,j)=>f.g.classList.toggle('cur',j===i)); chips.forEach((x,j)=>x.classList.toggle('on',j===i));
        const s=D.sprints[i]; const prev=i?D.sprints[i-1].comps:[]; mini.clear();
        Object.keys(mini.N).forEach(id=>{ if(s.comps.includes(id)){ mini.node(id,'lit'); if(!prev.includes(id)) mini.node(id,'new'); } else mini.node(id,'dim'); });
        Object.values(mini.Lk).forEach(l=>{ if(s.comps.includes(l.a)&&s.comps.includes(l.b)) l.g.classList.add('lit'); else l.g.classList.add('dim'); });
        pnl.textContent=''; pnl.append(H('h5','',s.name)); const nw=s.comps.filter(c=>!prev.includes(c)).map(c=>D.cards[c].name).join(', ');
        [[C.sp_new,nw],[C.sp_goal,s.goal],[C.sp_why,s.why]].forEach(([k,v])=>{ if(!v) return; const r=H('div','ar-row'); r.append(H('em','',k),P(v,'ar-rv','span')); pnl.append(r); });
        const tg=H('div','bp-btag'); tg.append(H('em','',K.tag+' · '+C.sp_works),P(s.works,'','span')); pnl.append(tg); }
      const chips=D.sprints.map((s,i)=>{ const x=H('button','sp-chip'); x.type='button'; x.append(H('b','',String(i+1)),document.createTextNode(s.name.replace(/^ספרינט \d+: /,''))); x.addEventListener('click',()=>show(i)); row.append(x); return x; });
      play.addEventListener('click',async()=>{ play.disabled=true; for(let i=Math.max(0,built+1);i<D.sprints.length;i++){ await show(i); await sleep(900); } if(built>=D.sprints.length-1) await show(D.sprints.length-1); play.disabled=false; });
      const so=new IntersectionObserver(es=>{ if(es[0].isIntersecting){ so.disconnect(); show(0); } },{threshold:.3}); so.observe(svg);
      Q(b,C.sp_q);
    }

    /* ============ A-10 inspector ============ */
    { const b=sheet(10,'1:200'); const K=BP.insp; b.append(H('h5','bp-sub',D.close.h)); b.append(P(K.lead)); b.append(P(D.close.text,'bp-p dim'));
      const lay=H('div','bp-insp'); const clip=H('div','bp-clip'); clip.append(H('div','bp-clipt',K.inspector)); const ol=H('ol','bp-chk'); const lis=K.list.map(([t,ref])=>{ const li=H('li'); li.append(H('i','bp-box',''),H('span','',t),H('a','bp-ref',ref)); li.lastChild.href='#'+IDP+ref; li.lastChild.addEventListener('click',e=>{ e.preventDefault(); document.getElementById(IDP+ref).scrollIntoView({behavior:reduce?'auto':'smooth'}); }); ol.append(li); return li; }); clip.append(ol);
      const pl=plan({aria:'בדיקת גבולות המגרש'}); const wrapM=H('div','bp-inm'); wrapM.append(pl.el); const stamp=H('div','bp-stamp'); stamp.append(H('b','',K.stamp[0]),H('span','',K.stamp[1])); wrapM.append(stamp);
      lay.append(clip,wrapM); b.append(lay); const btn=H('button','sp-btn',K.btn); btn.type='button'; const res=H('div','bp-ires'); b.append(btn,res);
      btn.addEventListener('click',async()=>{ btn.disabled=true; pl.clear(); stamp.classList.remove('on'); res.className='bp-ires'; res.textContent=''; lis.forEach(li=>li.className='');
        for(let i=0;i<K.list.length;i++){ const ok=K.list[i][2]; lis[i].classList.add('now'); await sleep(700); lis[i].classList.remove('now'); lis[i].classList.add(ok?'ok':'no'); if(ok) await sleep(250); }
        Object.values(pl.lots).forEach(l=>l.classList.add('hl')); Object.keys(pl.N).forEach(id=>{ if(D.close.ext.includes(id)){ pl.node(id,'out'); } else pl.node(id,'in'); });
        Object.values(pl.Lk).forEach(l=>{ if(D.close.ext.includes(l.a)||D.close.ext.includes(l.b)) l.g.classList.add('cut'); });
        if(PR.pass){ D.close.ext.forEach(id=>{ pl.node(id,'out',false); pl.node(id,'opt'); pl.mark(id,K.optMark); }); Object.values(pl.Lk).forEach(l=>l.g.classList.remove('cut')); Object.values(pl.Lk).forEach(l=>{ if(D.close.ext.includes(l.a)||D.close.ext.includes(l.b)) l.g.classList.add('opt'); }); stamp.classList.add('pass'); }
        else { const m=pl.N[PR.q[0]]; const dl=S('g',{class:'bp-tmp bp-dimln'},pl.fx); S('path',{d:`M${m.x+m.w/2+6} ${m.y+52} H180`},dl); S('path',{d:`M${m.x+m.w/2+6} ${m.y+44} v16 M180 ${m.y+44} v16`},dl); const tt=S('text',{x:(m.x+m.w/2+186)/2,y:m.y+76,'text-anchor':'middle'},dl); tt.textContent='מחוץ לקו המגרש'; }
        pl.pz.U.x=1e4; pl.pz.apply(); await sleep(500); stamp.classList.add('on'); await sleep(400);
        res.append(P(D.close.result)); res.append(H('p','ar-vd',D.close.verdict)); const mn=H('div','bp-mean'); mn.append(H('em','',K.mean),P(K.meanTxt)); res.append(mn); res.className='bp-ires on'; if(window.TermWin) window.TermWin.wire(res); btn.disabled=false; btn.textContent=C.pk_again; });
      Q(b,C.cl_q);
    }

    /* ============ A-11 downloads ============ */
    const dlBody=sheet(11,'ללא'); dlBody.append(P(C.dl_p));
    if(window.fxDownloads){
      PR.dl.forEach(([h,kind,heT,enT,heD,enD])=>dlBody.append(H('h5','bp-sub',h),window.fxDownloads(slug,kind,heT,enT,heD,enD)));
    }
    Q(dlBody,C.dl_q);

    /* ---------- assemble ---------- */
    const orig=[...root.children]; const dl=orig.find(e=>e.classList.contains('sp-dl'));
    const full=H('details','bp-full'); full.append(H('summary','','הפרק המלא בגרסת טקסט: כל הסעיפים כמו שנכתבו')); orig.forEach(e=>{ if(e!==dl) full.append(e); });
    root.textContent=''; root.classList.add('bp-root'); root.append(bp,full);
    sheets.forEach(s=>actObs.observe(s));
    if(window.TermWin) window.TermWin.wire(bp);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',bootAll); else bootAll();
})();
