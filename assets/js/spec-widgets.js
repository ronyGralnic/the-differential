/* Custom knob widgets for spec pages. spec-lab.js calls SPEC_WIDGETS[name](section, knobx, helpers). */
window.SPEC_WIDGETS=window.SPEC_WIDGETS||{};
window.SPEC_WIDGETS.wall=function(ks,KX,U){
  const H=U.H, K=KX.K, W=KX.data, G=W.grid, years=W.years;
  const fmt=v=>v.toFixed(2)+'%';
  const lg=H('div','sp-lg wl-lg'); KX.legend.forEach((l,i)=>{ const d=H('div','s'+(i?2:3)); d.append(H('b','',l[0]),H('span','',l[1])); lg.append(d); }); ks.append(lg);
  const row=H('div','sp-thr wl-thr'); const lab=H('label','',K.slider+': '); const out=H('b'); lab.append(out);
  const rg=H('input'); rg.type='range'; rg.min=0; rg.max=G.length-1; rg.step=1; rg.value=G.findIndex(g=>g.y===3)>=0?G.findIndex(g=>g.y===3):0; rg.setAttribute('aria-label',K.slider);
  row.append(lab,rg); ks.append(row);
  const wall=H('div','wl-wall'); wall.setAttribute('role','list'); ks.append(wall);
  const maxF=Math.max(...G[0].bricks.map(b=>b[0]));
  const cols=years.map((yr,i)=>{ const c=H('button','wl-col'); c.type='button'; c.setAttribute('role','listitem');
    const bar=H('span','wl-bar'); bar.style.height=(G[0].bricks[i][0]/maxF*100)+'%'; const j=H('span','wl-j');
    const bw=H('span','wl-bw'); bw.append(j,bar); c.append(bw,H('span','wl-yr'+(yr===2031?' y31':''),String(yr))); wall.append(c);
    c.addEventListener('click',()=>{ sel=i; draw(); }); return {c,bar,j}; });
  const det=H('p','wl-det'); det.setAttribute('aria-live','polite'); ks.append(det);
  const box=H('div','wl-m'); ks.append(box);
  const mrows=[['bond',K.m_bond],['frozen',K.m_frozen],['jump',K.m_jump]].map(([k,t])=>{ const r=H('div','wl-r '+k); const tr=H('span','wl-tr'); const fl=H('i'); tr.append(fl); const v=H('b'); r.append(H('span','wl-rl',t),tr,v); box.append(r); return {k,fl,v}; });
  const cap=H('p','wl-cap',K.int31); box.prepend(cap);
  const debt=H('p','wl-debt'); box.append(debt);
  const maxI=Math.max(...G.map(g=>Math.max(g.bond,g.frozen,g.jump)));
  let sel=0;
  function col(jp){ const a=Math.min(1,Math.abs(jp)/2.5); const pct=Math.round(25+a*75); return jp>=0?`color-mix(in srgb, var(--risk) ${pct}%, var(--surface))`:`color-mix(in srgb, var(--wl-cool) ${pct}%, var(--surface))`; }
  function draw(){
    const g=G[+rg.value]; out.textContent=g.y.toFixed(1)+'%';
    g.bricks.forEach((b,i)=>{ const jp=b[2]-b[1]; const C=cols[i]; C.bar.style.background=col(jp); C.j.textContent=(jp>=0?'+':'')+jp.toFixed(1);
      C.c.classList.toggle('on',i===sel); C.c.setAttribute('aria-label',`${years[i]}: ${K.face} ${b[0].toFixed(1)}% · ${K.cpn} ${fmt(b[1])} · ${K.rep} ${fmt(b[2])}`); });
    const b=g.bricks[sel]; det.textContent=`${years[sel]} · ${K.face}: ${b[0].toFixed(1)}% תמ"ג · ${K.cpn}: ${fmt(b[1])} · ${K.rep}: ${fmt(b[2])}`;
    mrows.forEach(m=>{ m.fl.style.width=(g[m.k]/maxI*100)+'%'; m.v.textContent=fmt(g[m.k]); });
    debt.textContent=`${K.debt}: ${g.debt.toFixed(0)}%`;
  }
  rg.addEventListener('input',draw); draw();
};

/* Fire-Sale: leverage slider -> one world's yield path (with/without CB) + 300-world odds */
window.SPEC_WIDGETS.spiral=function(ks,KX,U){
  const H=U.H, K=KX.K, G=KX.data.grid, NS='http://www.w3.org/2000/svg';
  const S=(t,a,p)=>{ const e=document.createElementNS(NS,t); for(const k in a) e.setAttribute(k,a[k]); if(p) p.append(e); return e; };
  const lg=H('div','sp-lg wl-lg'); KX.legend.forEach((l,i)=>{ const d=H('div','s'+(i?1:2)); d.append(H('b','',l[0]),H('span','',l[1])); lg.append(d); }); ks.append(lg);
  const row=H('div','sp-thr wl-thr'); const lab=H('label','',K.slider+': '); const out=H('b'); lab.append(out);
  const rg=H('input'); rg.type='range'; rg.min=0; rg.max=G.length-1; rg.step=1; rg.value=Math.max(0,G.findIndex(g=>g.lev===4)); rg.setAttribute('aria-label',K.slider);
  row.append(lab,rg); ks.append(row);
  const W=600,Hh=250,L=46,R=16,T=14,B=36, YM=2.0;
  const XM=Math.max(...G.map(g=>Math.max(g.path.length,g.cb_path.length)))-1;
  const x=i=>L+i*(W-L-R)/XM, y=v=>T+(1-Math.min(v,YM)/YM)*(Hh-T-B);
  const box=H('div','fs-ch'); box.setAttribute('dir','ltr'); ks.append(box);
  const svg=S('svg',{viewBox:`0 0 ${W} ${Hh}`,class:'fs-svg',role:'img','aria-label':K.y}); box.append(svg);
  [0,0.5,1,1.5,2].forEach(v=>{ S('line',{x1:L,x2:W-R,y1:y(v),y2:y(v),class:'fs-grid'},svg); const t=S('text',{x:L-8,y:y(v)+4,class:'fs-tk','text-anchor':'end'},svg); t.textContent=v.toFixed(1); });
  for(let i=0;i<=XM;i++){ const t=S('text',{x:x(i),y:Hh-B+18,class:'fs-tk','text-anchor':'middle'},svg); t.textContent=i===0?K.start:String(i); }
  const xl=S('text',{x:(L+W-R)/2,y:Hh-4,class:'fs-tk','text-anchor':'middle'},svg); xl.textContent=K.round;
  S('line',{x1:L,x2:W-R,y1:y(1.5),y2:y(1.5),class:'fs-thr'},svg); const tl=S('text',{x:W-R-4,y:y(1.5)-6,class:'fs-thl','text-anchor':'end'},svg); tl.textContent=K.line;
  const pN=S('polyline',{class:'fs-ln nocb'},svg), pC=S('polyline',{class:'fs-ln cb'},svg); const dN=S('g',{class:'fs-dt nocb'},svg), dC=S('g',{class:'fs-dt cb'},svg);
  const yl=H('p','fs-yl',K.y); box.prepend(yl);
  const st=H('div','fs-st'); ks.append(st);
  const one=H('div','fs-one'); const many=H('div','fs-many'); st.append(one,many);
  const live=H('p','wl-det'); live.setAttribute('aria-live','polite'); ks.append(live);
  const pct=v=>Math.round(v*100)+'%';
  function line(pl,dg,path){ pl.setAttribute('points',path.map((v,i)=>x(i)+','+y(v)).join(' ')); dg.textContent=''; path.forEach((v,i)=>S('circle',{cx:x(i),cy:y(v),r:4},dg)); }
  function draw(){
    const g=G[+rg.value]; out.textContent=g.lev.toFixed(2).replace(/0$/,'');
    line(pN,dN,g.path); line(pC,dC,g.cb_path);
    one.textContent=''; [[K.nocb,g.final,g.forced,'nocb'],[K.cb,g.cb_final,g.cb_forced,'cb']].forEach(([t,f,fo,c])=>{ const r=H('div','fs-r '+c); r.append(H('em','',t),H('b','',K.final+': '+f.toFixed(2)),H('span','',pct(fo)+' '+K.forced)); one.append(r); });
    many.textContent=''; many.append(H('em','',K.worlds));
    const big=H('div','fs-p'+(g.p>=0.5?' hot':'')); big.append(H('b','',pct(g.p)),H('span','',K.p)); many.append(big);
    const rr=H('div','fs-rng'); const tr=H('span','fs-tr'); const fill=H('i'); fill.style.insetInlineStart=(g.p10/YM*100)+'%'; fill.style.width=((g.p90-g.p10)/YM*100)+'%'; const mk=H('i','fs-th'); mk.style.insetInlineStart=(1.5/YM*100)+'%'; tr.append(fill,mk); tr.setAttribute('dir','ltr');
    rr.append(H('span','',K.range+': '+g.p10.toFixed(2)+' עד '+g.p90.toFixed(2)),tr); many.append(rr);
    live.textContent=`${K.slider} ${out.textContent}: ${K.nocb} ${g.final.toFixed(2)}, ${K.cb} ${g.cb_final.toFixed(2)}, ${K.p} ${pct(g.p)}.`;
  }
  rg.addEventListener('input',draw); draw();
};

/* Registry: split one value into 3 additive shares mod 2^61-1, pick servers, see what they learn; plus K=5 threshold */
window.SPEC_WIDGETS.shares=function(ks,KX,U){
  const H=U.H, K=KX.K, P=(1n<<61n)-1n;
  const rnd=()=>{ const a=new Uint32Array(2); try{ crypto.getRandomValues(a); }catch(e){ a[0]=Math.random()*2**32; a[1]=Math.random()*2**32; } return ((BigInt(a[0])<<32n)|BigInt(a[1]))%P; };
  const fmt=b=>b.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
  const lg=H('div','sp-lg wl-lg'); KX.legend.forEach((l,i)=>{ const d=H('div','s'+(i?1:2)); d.append(H('b','',l[0]),H('span','',l[1])); lg.append(d); }); ks.append(lg);
  const row=H('div','sp-thr wl-thr'); const lab=H('label','',K.value+': '); const out=H('b'); lab.append(out);
  const rg=H('input'); rg.type='range'; rg.min=0; rg.max=400; rg.step=5; rg.value=120; rg.setAttribute('aria-label',K.value);
  const again=H('button','sp-btn',K.again); again.type='button'; row.append(lab,rg,again); ks.append(row);
  ks.append(H('p','rg-pick',K.pick));
  const grid=H('div','rg-srv'); ks.append(grid);
  const on=[true,false,false]; let sh=[];
  const cards=K.srv.map((n,i)=>{ const c=H('button','rg-c'); c.type='button'; c.setAttribute('aria-pressed','false'); const t=H('b','',n); const v=H('code'); v.setAttribute('dir','ltr'); c.append(t,v); c.addEventListener('click',()=>{ on[i]=!on[i]; draw(); }); grid.append(c); return {c,v}; });
  const res=H('div','rg-res'); res.setAttribute('aria-live','polite'); ks.append(res);
  const cellBox=H('div','rg-cell'); ks.append(cellBox);
  const crow=H('div','sp-thr wl-thr'); const clab=H('label','',K.cell+': '); const cout=H('b'); clab.append(cout);
  const cr=H('input'); cr.type='range'; cr.min=1; cr.max=8; cr.step=1; cr.value=2; cr.setAttribute('aria-label',K.cell); crow.append(clab,cr); cellBox.append(crow);
  const dots=H('div','rg-dots'); const cst=H('p','rg-cst'); cst.setAttribute('aria-live','polite'); cellBox.append(dots,cst);
  function split(){ const v=BigInt(+rg.value); const a=rnd(), b=rnd(); sh=[a,b,((v-a-b)%P+P+P)%P]; }
  function draw(){
    out.textContent=rg.value;
    cards.forEach((c,i)=>{ c.v.textContent=fmt(sh[i]).replace(/,/g,',\u200b'); c.c.classList.toggle('on',on[i]); c.c.setAttribute('aria-pressed',String(on[i])); });
    const n=on.filter(Boolean).length; let s=0n; on.forEach((x,i)=>{ if(x) s=(s+sh[i])%P; });
    res.textContent=''; res.className='rg-res'+(n===3?' ok':n?' nz':'');
    res.append(H('em','',K.sum));
    if(!n){ res.append(H('span','',K.none)); }
    else { const v=H('code',''); v.setAttribute('dir','ltr'); v.textContent=fmt(s); res.append(v,H('span','',n===3?K.full:K.noise)); }
    const k=+cr.value; cout.textContent=k; dots.textContent=''; for(let i=0;i<8;i++){ const d=H('i',i<k?'f':''); if(i===4) d.classList.add('k'); dots.append(d); }
    cst.className='rg-cst '+(k>=5?'ok':'bad'); cst.textContent=(k>=5?K.open:K.blocked)+' · '+K.k;
  }
  rg.addEventListener('input',()=>{ split(); draw(); }); again.addEventListener('click',()=>{ split(); draw(); }); cr.addEventListener('input',draw);
  split(); draw();
};
