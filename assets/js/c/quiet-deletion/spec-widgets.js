/* Case 03 spec knob widgets: qdmerkle (roll-log) and qdsample (sample-audit).
   spec-lab.js calls SPEC_WIDGETS[name](section, knobx, helpers). */
window.SPEC_WIDGETS=window.SPEC_WIDGETS||{};
(function(){
  if(!document.getElementById('qd-wg-css')){
    const st=document.createElement('style'); st.id='qd-wg-css';
    st.textContent=`
.qm-wrap{margin:14px 0;display:flex;flex-direction:column;gap:10px}
.qm-tree{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:4px;direction:ltr}
.qm-n{border:1px solid var(--line,#ccd);border-radius:6px;padding:4px 2px;text-align:center;font:600 11px/1.3 ui-monospace,Consolas,monospace;background:var(--surface,#fff);color:var(--ink,#123);transition:background .25s,border-color .25s;min-width:0;overflow:hidden}
.qm-n small{display:block;font:500 9.5px/1.2 system-ui,sans-serif;opacity:.7}
.qm-n.ch{background:color-mix(in srgb,var(--risk,#d33) 22%,var(--surface,#fff));border-color:var(--risk,#d33)}
.qm-n.pf{background:color-mix(in srgb,#1a9a6a 22%,var(--surface,#fff));border-color:#1a9a6a}
.qm-n.me{outline:2px solid #1a9a6a;outline-offset:1px}
.qm-rows{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:4px;direction:ltr}
.qm-row{border:1px dashed var(--line,#ccd);border-radius:6px;padding:5px 2px;font:600 10.5px/1.3 ui-monospace,Consolas,monospace;background:transparent;color:inherit;cursor:pointer;min-width:0;overflow:hidden}
.qm-row.ed{border-style:solid;border-color:var(--risk,#d33);color:var(--risk,#d33)}
.qm-row span{display:block;font-weight:500;opacity:.75}
.qm-bar{display:flex;flex-wrap:wrap;gap:8px}
.qm-root{font:600 13px/1.5 ui-monospace,Consolas,monospace;direction:ltr;text-align:left}
.qm-root b.bad{color:var(--risk,#d33)} .qm-root b.ok{color:#1a9a6a}
.qm-cap{margin:0;font-size:14px}
.qs-wrap{margin:14px 0;display:flex;flex-direction:column;gap:10px}
.qs-who{display:flex;gap:8px;flex-wrap:wrap}
.qs-who button[aria-pressed=true]{background:var(--ink,#123);color:var(--surface,#fff)}
.qs-plot{position:relative;height:190px;border:1px solid var(--line,#ccd);border-radius:8px;direction:ltr;overflow:hidden;background:var(--surface,#fff)}
.qs-ax{position:absolute;bottom:2px;font:500 10px system-ui;opacity:.65;transform:translateX(-50%)}
.qs-truth{position:absolute;top:0;bottom:16px;width:2px;background:var(--risk,#d33)}
.qs-truth i{position:absolute;top:2px;left:5px;font:600 10px system-ui;color:var(--risk,#d33);white-space:nowrap;font-style:normal}
.qs-band{position:absolute;height:12px;border-radius:6px;transition:opacity .3s}
.qs-band.ind{background:color-mix(in srgb,#1a9a6a 55%,transparent)}
.qs-band.own{background:color-mix(in srgb,#c47a12 60%,transparent)}
.qs-band.miss{outline:2px solid var(--risk,#d33)}
.qs-band b{position:absolute;top:-1px;width:3px;height:14px;background:var(--ink,#123);left:50%;border-radius:2px}
.qs-out{margin:0;font-size:14px;min-height:2.6em}
.qs-tally{margin:0;font-size:13px;opacity:.85}
@media (max-width:520px){.qm-n{font-size:9.5px}.qm-n small{display:none}.qm-row{font-size:9px}}
`; document.head.append(st);
  }
})();

/* ---------- Roll log: 8 rows, a real SHA-256 Merkle tree (RFC 6962 prefixes) ---------- */
window.SPEC_WIDGETS.qdmerkle=function(ks,KX,U){
  const H=U.H, K=KX.K, en=(document.documentElement.lang||'').startsWith('en');
  const base=KX.data.rows.map(r=>r.slice()); let rows=base.map(r=>r.slice()); let proof=false;
  const alt={'R-SHIFT':'R-DEAD','R-DEAD':'R-DUP','A-NEW':'R-DUP','R-DUP':'R-DEAD','M-MOVE':'R-SHIFT','R-ABSENT':'R-DEAD','A-RESTORE':'R-ABSENT','R-NOFORM':'R-DEAD'};
  const lg=H('div','sp-lg'); KX.legend.forEach((l,i)=>{ const d=H('div','s'+(i?2:1)); d.append(H('b','',l[0]),H('span','',l[1])); lg.append(d); }); ks.append(lg);
  const w=H('div','qm-wrap'); ks.append(w);
  const tree=H('div','qm-tree'); tree.setAttribute('aria-hidden','true'); w.append(tree);
  const rowsEl=H('div','qm-rows'); w.append(rowsEl);
  const bar=H('div','qm-bar'); const bP=H('button','sp-btn',K.proof); bP.type='button'; const bR=H('button','sp-btn',K.reset); bR.type='button'; bar.append(bP,bR); w.append(bar);
  const rootP=H('p','qm-root'); rootP.setAttribute('aria-live','polite'); w.append(rootP);
  const cap=H('p','qm-cap'); cap.setAttribute('aria-live','polite'); w.append(cap);
  const enc=new TextEncoder();
  async function sha(bytes){ const d=await crypto.subtle.digest('SHA-256',bytes); return new Uint8Array(d); }
  const cat=(...a)=>{ const n=a.reduce((s,x)=>s+x.length,0); const o=new Uint8Array(n); let p=0; a.forEach(x=>{o.set(x,p);p+=x.length;}); return o; };
  const hex=b=>[...b.slice(0,3)].map(x=>x.toString(16).padStart(2,'0')).join('');
  async function levels(rs){
    const L=[[]]; for(const r of rs) L[0].push(await sha(cat(new Uint8Array([0]),enc.encode(JSON.stringify({voter:r[0],reason:r[1],booth:r[2]})))));
    while(L[L.length-1].length>1){ const p=L[L.length-1], n=[]; for(let i=0;i<p.length;i+=2) n.push(await sha(cat(new Uint8Array([1]),p[i],p[i+1]))); L.push(n); }
    return L;
  }
  let baseL=null;
  const cells=[]; // level 3..0 => rows of the grid
  const spans=[8,4,2,1];
  for(let lv=3;lv>=0;lv--){ const n=8>>lv; cells[lv]=[]; for(let i=0;i<n;i++){ const c=H('div','qm-n'); c.style.gridColumn='span '+(1<<lv); tree.append(c); cells[lv].push(c);} }
  const rb=rows.map((r,i)=>{ const b=H('button','qm-row'); b.type='button'; b.addEventListener('click',()=>{ rows[i][1]=rows[i][1]===base[i][1]?(alt[base[i][1]]||'R-DEAD'):base[i][1]; draw(); }); rowsEl.append(b); return b; });
  function pathSet(){ const s=new Set(); let idx=0; for(let lv=0;lv<3;lv++){ s.add(lv+':'+(idx^1)); idx>>=1; } return s; }
  async function draw(){
    if(!baseL) baseL=await levels(base);
    const L=await levels(rows); const ps=proof?pathSet():new Set();
    for(let lv=0;lv<4;lv++) L[lv].forEach((h,i)=>{ const c=cells[lv][i]; c.textContent=''; c.append(document.createTextNode(hex(h)));
      c.append(H('small','',lv===3?(en?'root':'ראש'):lv===0?(en?'leaf '+i:'עלה '+i):''));
      c.classList.toggle('ch',hex(h)!==hex(baseL[lv][i])); c.classList.toggle('pf',ps.has(lv+':'+i)); c.classList.toggle('me',proof&&lv===0&&i===0); });
    rows.forEach((r,i)=>{ const b=rb[i]; b.textContent=''; b.append(document.createTextNode(r[1]),H('span','',r[0]+(i===0?(en?' · Priya':' · פריה'):''))); b.classList.toggle('ed',r[1]!==base[i][1]);
      b.setAttribute('aria-label',(en?'Row ':'שורה ')+i+': '+r[1]+'. '+K.edit); });
    const changed=rows.some((r,i)=>r[1]!==base[i][1]); const rt=hex(L[3][0]), r0=hex(baseL[3][0]);
    rootP.textContent=''; rootP.append(document.createTextNode((en?'Published head: ':'ראש שפורסם אתמול: ')+r0+'   ·   '+(en?'Head now: ':'ראש עכשיו: ')),H('b',changed?'bad':'ok',rt));
    if(changed) cap.textContent=en?'One row changed, and the head no longer matches the one everybody kept. The rewrite is visible.':'שורה אחת השתנתה, וראש העץ כבר לא תואם את זה שכולם שמרו. השכתוב גלוי.';
    else if(proof) cap.textContent=en?'Priya needs only 3 green hashes (27 in a 130-million log) to rebuild the head on her phone.':'לפריה מספיקים 3 גיבובים ירוקים (27 ביומן של 130 מיליון) כדי לבנות מחדש את הראש בטלפון שלה.';
    else cap.textContent=en?'Tap a row to edit its reason code.':'לחצו על שורה כדי לשנות לה את קוד הסיבה.';
  }
  bP.addEventListener('click',()=>{ proof=!proof; bP.setAttribute('aria-pressed',String(proof)); draw(); });
  bR.addEventListener('click',()=>{ rows=base.map(r=>r.slice()); proof=false; bP.setAttribute('aria-pressed','false'); draw(); });
  if(window.crypto&&crypto.subtle) draw(); else cap.textContent=en?'This browser cannot compute SHA-256 here.':'הדפדפן הזה לא יכול לחשב כאן SHA-256.';
};

/* ---------- Sample audit: sample size + who knocks -> Wilson interval vs hidden truth ---------- */
window.SPEC_WIDGETS.qdsample=function(ks,KX,U){
  const H=U.H, K=KX.K, D=KX.data, en=(document.documentElement.lang||'').startsWith('en');
  const lg=H('div','sp-lg'); KX.legend.forEach((l,i)=>{ const d=H('div','s'+(i?2:1)); d.append(H('b','',l[0]),H('span','',l[1])); lg.append(d); }); ks.append(lg);
  const w=H('div','qs-wrap'); ks.append(w);
  const row=H('div','sp-thr'); const lab=H('label','',K.n+': '); const out=H('b'); lab.append(out);
  const rg=H('input'); rg.type='range'; rg.min=100; rg.max=3000; rg.step=100; rg.value=1500; rg.setAttribute('aria-label',K.n); row.append(lab,rg); w.append(row);
  const who=H('div','qs-who'); w.append(H('p','qs-tally',K.who+':'));
  let mode='ind'; const bI=H('button','sp-btn',K.ind), bO=H('button','sp-btn',K.own); [bI,bO].forEach(b=>{b.type='button';who.append(b);});
  const setMode=m=>{ mode=m; bI.setAttribute('aria-pressed',String(m==='ind')); bO.setAttribute('aria-pressed',String(m==='own')); };
  bI.addEventListener('click',()=>setMode('ind')); bO.addEventListener('click',()=>setMode('own')); setMode('ind'); w.append(who);
  const go=H('button','sp-btn',K.go); go.type='button'; w.append(go);
  const plot=H('div','qs-plot'); w.append(plot);
  const MAX=25; const X=v=>(v/MAX*100)+'%';
  [0,5,10,15,20,25].forEach(v=>{ const a=H('span','qs-ax',v+'%'); a.style.left=X(v); if(v===0) a.style.transform='none'; if(v===25) a.style.transform='translateX(-100%)'; plot.append(a); });
  const tr=H('div','qs-truth'); tr.style.left=X(D.truth); tr.append(H('i','',(en?'truth ':'האמת ')+D.truth.toFixed(1)+'%')); plot.append(tr);
  const outP=H('p','qs-out'); outP.setAttribute('aria-live','polite'); w.append(outP);
  const tal=H('p','qs-tally'); w.append(tal);
  const hist=[]; let hit=0, tot=0;
  function wilson(k,n){ const z=1.96,p=k/n,d=1+z*z/n,c=(p+z*z/(2*n))/d,h=z*Math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d; return [c-h,c+h,p]; }
  function draw(){ out.textContent=rg.value; }
  rg.addEventListener('input',draw); draw();
  go.addEventListener('click',()=>{
    const n=+rg.value, t=D.truth/100; let k=0;
    for(let i=0;i<n;i++){ const wrong=Math.random()<t; let seen;
      if(mode==='ind') seen=Math.random()<D.e?!wrong:wrong; else seen=wrong&&Math.random()>=D.bias;
      if(seen) k++; }
    const [lo,hi,p]=wilson(k,n); const ok=lo<=t&&t<=hi; tot++; if(ok) hit++;
    hist.unshift({lo,hi,p,mode,ok}); if(hist.length>9) hist.pop();
    plot.querySelectorAll('.qs-band').forEach(e=>e.remove());
    hist.forEach((h,i)=>{ const b=H('div','qs-band '+h.mode+(h.ok?'':' miss')); b.style.left=X(h.lo*100); b.style.width=`calc(${X((h.hi-h.lo)*100)} + 2px)`; b.style.top=(8+i*18)+'px'; b.style.opacity=String(1-i*0.08);
      const m=H('b'); m.style.left=((h.p-h.lo)/Math.max(1e-9,h.hi-h.lo)*100)+'%'; b.append(m); plot.append(b); });
    const f=v=>(v*100).toFixed(1)+'%';
    outP.textContent=en?`${n} cases · ${mode==='ind'?K.ind:K.own}: estimate ${f(p)}, between ${f(lo)} and ${f(hi)}. ${ok?'The band contains the truth.':'The band misses the truth, and nothing in the number says so.'}`
      :`${n} מקרים · ${mode==='ind'?K.ind:K.own}: הערכה ${f(p)}, בין ${f(lo)} ל-${f(hi)}. ${ok?'הרצועה מכילה את האמת.':'הרצועה מפספסת את האמת, ושום דבר במספר לא אומר את זה.'}`;
    tal.textContent=en?`Bands that contained the truth so far: ${hit} of ${tot}.`:`רצועות שהכילו את האמת עד עכשיו: ${hit} מתוך ${tot}.`;
  });
};
