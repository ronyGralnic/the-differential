/* Shared (any case): rich download cards (thumbnail, drawn icon, tags) for downloads/<slug>-<kind>-<he|en>.<pdf|docx>.
   Thumbnails: assets/img/peek/<prefix>-<kind>-p1.jpg, prefix from window.PEEK_PFX[slug] (set in c/<case>/case.js). */
function fxDownloads(slug,kind,heT,enT,heD,enD,pages,extra){
  const H=(t,c,x)=>{ const e=document.createElement(t); if(c) e.className=c; if(x!=null) e.textContent=x; return e; };
  const g=H('div','fx-dl'); const base='downloads/'+slug+'-'+kind+'-';
  const ico='<svg viewBox="0 0 40 40" class="fx-dlic" aria-hidden="true"><path d="M20 6 v18 M12 17 l8 8 8 -8" /><path d="M7 26 v6 h26 v-6"/></svg>';
  [['he',heT,heD,'עברית','rtl'],['en',enT,enD,'English','ltr']].forEach(([lg,t,dsc,ln,dir])=>{
    const c=H('div','fx-dlc'); c.setAttribute('dir',dir);
    const th=H('div','fx-th'); const PF=(window.PEEK_PFX||{})[slug]; if(PF){ const im=H('img'); im.src='../../assets/img/peek/'+PF+'-'+kind+'-p1.jpg'; im.alt=''; im.loading='lazy'; im.onerror=()=>{ im.remove(); th.classList.add('blank'); }; th.append(im); } else th.classList.add('blank');
    const b=H('div','fx-dlb'); b.append(H('strong','',t),H('small','',dsc));
    const row=H('div','fx-dlr');
    [['pdf','PDF',(pages&&pages[lg]?pages[lg]+(lg==='he'?' עמודים':' pages'):'')],['docx','Word','']].forEach(([ext,l,pg])=>{ const a=H('a','fx-dla'); a.href=base+lg+'.'+ext; a.setAttribute('download',''); a.innerHTML=ico; const tg=H('span','fx-tag',l+(pg?' · '+pg:'')+' · '+ln); a.append(tg); row.append(a); });
    (extra||[]).forEach(([href,l])=>{ const a=H('a','fx-dla'); a.href=href; a.setAttribute('download',''); a.innerHTML=ico; a.append(H('span','fx-tag',l)); row.append(a); });
    b.append(row); c.append(th,b); g.append(c); });
  return g;
}
